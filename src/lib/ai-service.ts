/**
 * AI Analysis Service
 * @fileoverview Enterprise-level AI service for prompt analysis
 * @version 2.0.0
 */

import { 
  AIAnalysisResult, 
  AnalysisRequest, 
  AnalysisOptions, 
  ModelType,
  ApiResponse 
} from '@/types';
import { 
  API_CONFIG, 
  AI_MODELS, 
  MODEL_FALLBACKS, 
  ERROR_MESSAGES, 
  SCORING_CONFIG 
} from '@/constants';

/**
 * AI Service Configuration Interface
 */
interface AIServiceConfig {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly timeout: number;
  readonly maxRetries: number;
}

/**
 * Response from Together AI API
 */
interface TogetherAIResponse {
  readonly choices: ReadonlyArray<{
    readonly message: {
      readonly content: string;
    };
  }>;
  readonly usage?: {
    readonly prompt_tokens: number;
    readonly completion_tokens: number;
    readonly total_tokens: number;
  };
}

/**
 * Rate limiting and retry configuration
 */
interface RetryConfig {
  readonly maxAttempts: number;
  readonly baseDelay: number;
  readonly maxDelay: number;
  readonly backoffMultiplier: number;
}

/**
 * Enterprise AI Analysis Service
 * Implements circuit breaker, retry logic, and fallback mechanisms
 */
export class AIAnalysisService {
  private readonly config: AIServiceConfig;
  private readonly retryConfig: RetryConfig;
  private readonly circuitBreaker: Map<ModelType, { failures: number; lastFailure: number }>;
  private readonly rateLimiter: Map<ModelType, number>;

  constructor(config: Partial<AIServiceConfig> = {}) {
    this.config = {
      apiKey: process.env.TOGETHER_API_KEY || '',
      baseUrl: API_CONFIG.TOGETHER_AI.BASE_URL,
      timeout: API_CONFIG.TOGETHER_AI.TIMEOUT,
      maxRetries: API_CONFIG.TOGETHER_AI.RETRY_ATTEMPTS,
      ...config,
    };

    this.retryConfig = {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      backoffMultiplier: 2,
    };

    this.circuitBreaker = new Map();
    this.rateLimiter = new Map();

    this.validateConfiguration();
  }

  /**
   * Analyze a prompt with comprehensive error handling and fallbacks
   */
  async analyzePrompt(request: AnalysisRequest): Promise<ApiResponse<AIAnalysisResult>> {
    const startTime = Date.now();
    
    try {
      this.validateRequest(request);
      
      const model = request.model || 'llama-70b';
      const options = this.mergeOptions(request.options);
      
      // Check circuit breaker
      if (this.isCircuitOpen(model)) {
        throw new Error(`Circuit breaker open for model: ${model}`);
      }

      // Apply rate limiting
      await this.applyRateLimit(model);

      let result = await this.performAnalysisWithRetry(request.text, model, options);
      
      if (!result) {
        // Try fallback model
        const fallbackModel = MODEL_FALLBACKS[model];
        if (fallbackModel && fallbackModel !== model) {
          console.warn(`Primary model ${model} failed, trying fallback: ${fallbackModel}`);
          result = await this.performAnalysisWithRetry(request.text, fallbackModel, options);
        }
      }

      if (!result) {
        throw new Error(ERROR_MESSAGES.AI.ANALYSIS_FAILED);
      }

      // Record success
      this.recordSuccess(model);

      const processingTime = Date.now() - startTime;
      
      const analysisResult: AIAnalysisResult = {
        ...result,
        processingTime,
        model,
        metadata: {
          wordCount: this.countWords(request.text),
          characterCount: request.text.length,
          sentenceCount: this.countSentences(request.text),
          readabilityScore: this.calculateReadabilityScore(request.text),
        },
      };

      return {
        success: true,
        data: analysisResult,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      this.recordFailure(request.model || 'llama-70b');
      return this.handleError(error);
    }
  }

  /**
   * Get available models with their current status
   */
  async getAvailableModels(): Promise<ApiResponse<Array<{ model: ModelType; available: boolean; lastChecked: string }>>> {
    try {
      const models = Object.keys(AI_MODELS) as ModelType[];
      const modelStatus = await Promise.allSettled(
        models.map(async (model) => {
          const isAvailable = !this.isCircuitOpen(model);
          return {
            model,
            available: isAvailable,
            lastChecked: new Date().toISOString(),
          };
        })
      );

      const results = modelStatus
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value);

      return {
        success: true,
        data: results,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Batch analyze multiple prompts
   */
  async batchAnalyze(
    requests: AnalysisRequest[]
  ): Promise<ApiResponse<AIAnalysisResult[]>> {
    try {
      if (requests.length === 0) {
        throw new Error('No requests provided for batch analysis');
      }

      if (requests.length > 10) {
        throw new Error('Batch size limited to 10 requests');
      }

      const results = await Promise.allSettled(
        requests.map(request => this.analyzePrompt(request))
      );

      const successfulResults: AIAnalysisResult[] = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          successfulResults.push(result.value.data!);
        } else {
          const error = result.status === 'rejected' 
            ? result.reason 
            : result.value.error || 'Unknown error';
          errors.push(`Request ${index + 1}: ${error}`);
        }
      });

      if (successfulResults.length === 0) {
        throw new Error(`All batch requests failed: ${errors.join('; ')}`);
      }

      return {
        success: true,
        data: successfulResults,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      return this.handleError(error);
    }
  }

  // Private helper methods

  private async performAnalysisWithRetry(
    text: string, 
    model: ModelType, 
    options: AnalysisOptions
  ): Promise<Omit<AIAnalysisResult, 'processingTime' | 'model' | 'metadata'> | null> {
    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        return await this.callAIAPI(text, model, options);
      } catch (error) {
        console.warn(`Analysis attempt ${attempt} failed for model ${model}:`, error);
        
        if (attempt === this.retryConfig.maxAttempts) {
          throw error;
        }

        // Calculate exponential backoff delay
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1),
          this.retryConfig.maxDelay
        );
        
        await this.sleep(delay);
      }
    }
    
    return null;
  }

  /**
   * Call AI API with fallback to mock data for development
   */
  private async callAIAPI(
    text: string, 
    model: ModelType, 
    options: AnalysisOptions
  ): Promise<Omit<AIAnalysisResult, 'processingTime' | 'model' | 'metadata'>> {
    // If no API key, return mock data for development
    if (!this.config.apiKey) {
      console.log('🔧 Using mock AI response for development');
      return this.generateFallbackAnalysis(text, model);
    }

    const prompt = this.buildAnalysisPrompt(text, options, model);
    
    const response = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.getModelProvider(model),
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.getModelConfig(model).maxTokens,
        temperature: this.getModelConfig(model).temperature,
      }),
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorData}`);
    }

    const data: TogetherAIResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from AI model');
    }

    const content = data.choices[0].message.content;
    const parsed = this.parseAnalysisResponse(content, text, model);
    this.validateAnalysisResponse(parsed);
    
    return parsed;
  }

  private buildAnalysisPrompt(text: string, options: AnalysisOptions, model: ModelType = 'llama-70b'): string {
    const modelConfig = this.getModelConfig(model);
    const modelSpecificInstructions = this.getModelSpecificInstructions(model);
    
    const basePrompt = `
${modelSpecificInstructions}

Analyze the following prompt and provide a comprehensive analysis in JSON format:

"${text}"

Please provide your analysis as a valid JSON object with this exact structure:
{
  "score": {
    "clarity": <number 0-100>,
    "context": <number 0-100>, 
    "format": <number 0-100>,
    "overall": <number 0-100>
  },
  "suggestions": [<array of specific improvement suggestions>],
  "improvements": [<array of concrete improvements>],
  "rewrites": [<array of improved versions>],
  "tone": "<identified tone>",
  "category": "<prompt category>",
  "confidence": <number 0-100>
}

Focus on:
- Clarity and specificity of instructions
- Appropriate context and background information
- Proper formatting and structure
- Overall effectiveness for AI interaction
${options.targetTone ? `\n- Target tone: ${options.targetTone}` : ''}
${options.detailedAnalysis ? '\n- Provide detailed explanations for each score' : ''}
`;

    return basePrompt.trim();
  }

  private getModelSpecificInstructions(model: ModelType): string {
    const instructions = {
      'llama-70b': 'You are an expert prompt engineer with deep expertise in large language models. Provide comprehensive, detailed analysis with sophisticated insights.',
      'llama-8b': 'You are a skilled prompt analyst focused on practical improvements. Provide balanced analysis with actionable recommendations.',
      'llama-3b': 'You are a helpful prompt assistant. Provide clear, straightforward analysis with simple, easy-to-understand suggestions.',
      'llama-11b-vision': 'You are a multimodal AI expert specializing in visual and text prompts. Consider both textual clarity and potential visual elements in your analysis.',
      'exaone-32b': 'You are a methodical prompt evaluator with strong analytical skills. Provide structured, logical analysis with data-driven insights.',
      'afm-4.5b': 'You are a fast, efficient prompt optimizer. Provide quick, focused analysis with high-impact improvement suggestions.',
      'mixtral-8x7b': 'You are a creative prompt specialist with expertise in diverse domains. Provide innovative analysis with unique perspectives and creative suggestions.',
      'dialogpt-medium': 'You are a conversational AI expert. Analyze prompts with focus on dialogue quality, engagement, and conversational flow.'
    };
    
    return instructions[model] || instructions['afm-4.5b'];
  }

  private parseAnalysisResponse(
    content: string, 
    originalText: string,
    model: ModelType = 'afm-4.5b'
  ): Omit<AIAnalysisResult, 'processingTime' | 'model' | 'metadata'> {
    try {
      console.log('🔧 Raw AI response content:', content);
      
      // Extract JSON from response (handle cases where AI adds extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('🔧 No JSON found in AI response');
        throw new Error('No valid JSON found in response');
      }

      console.log('🔧 Extracted JSON:', jsonMatch[0]);
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('🔧 Parsed AI response:', parsed);
      
      // Validate required fields
      this.validateAnalysisResponse(parsed);
      
      // Apply content-length based scoring adjustments
      const adjustedScore = this.adjustScoreForLength(parsed.score, originalText);
      console.log('🔧 Adjusted score:', adjustedScore);
      
      const result = {
        score: adjustedScore,
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
        rewrites: Array.isArray(parsed.rewrites) ? parsed.rewrites : [],
        tone: parsed.tone || 'neutral',
        category: parsed.category || 'general',
        confidence: Math.max(0, Math.min(100, parsed.confidence || 75)),
      };
      
      console.log('🔧 Final parsed result:', result);
      return result;

    } catch (error) {
      console.error('🔧 Failed to parse AI response:', error);
      console.log('🔧 Using fallback analysis');
      
      // Return fallback analysis
      return this.generateFallbackAnalysis(originalText, model);
    }
  }

  private validateAnalysisResponse(parsed: any): void {
    if (!parsed.score || typeof parsed.score !== 'object') {
      throw new Error('Invalid score object');
    }

    const requiredScoreFields = ['clarity', 'context', 'format', 'overall'];
    for (const field of requiredScoreFields) {
      if (typeof parsed.score[field] !== 'number' || 
          parsed.score[field] < 0 || 
          parsed.score[field] > 100) {
        throw new Error(`Invalid score field: ${field}`);
      }
    }
  }

  private adjustScoreForLength(score: any, text: string): any {
    const length = text.length;
    const config = SCORING_CONFIG.CONTENT_LENGTH_MULTIPLIERS;
    
    let lengthCategory: keyof typeof config;
    if (length <= config.SHORT.max) {
      lengthCategory = 'SHORT';
    } else if (length <= config.MEDIUM.max) {
      lengthCategory = 'MEDIUM';
    } else {
      lengthCategory = 'LONG';
    }
    
    const [minScore, maxScore] = config[lengthCategory].scoreRange;
    
    // Normalize scores to the appropriate range for the content length
    const normalizeScore = (originalScore: number) => {
      const normalizedScore = (originalScore / 100) * (maxScore - minScore) + minScore;
      return Math.min(100, Math.max(0, Math.round(normalizedScore)));
    };
    
    return {
      clarity: normalizeScore(score.clarity || 0),
      context: normalizeScore(score.context || 0),
      format: normalizeScore(score.format || 0),
      overall: normalizeScore(score.overall || 0),
    };
  }

  private generateFallbackAnalysis(text: string, model: ModelType = 'afm-4.5b'): Omit<AIAnalysisResult, 'processingTime' | 'model' | 'metadata'> {
    const length = text.length;
    const baseScore = length < 50 ? 60 : length < 200 ? 75 : 85;
    
    // Model-specific scoring variations
    const modelMultipliers = {
      'llama-70b': { clarity: 1.1, context: 1.15, format: 1.1, suggestions: 4 },
      'llama-8b': { clarity: 1.05, context: 1.1, format: 1.05, suggestions: 3 },
      'llama-3b': { clarity: 0.95, context: 0.95, format: 0.9, suggestions: 2 },
      'llama-11b-vision': { clarity: 1.0, context: 1.2, format: 1.1, suggestions: 3 },
      'exaone-32b': { clarity: 1.08, context: 1.05, format: 1.12, suggestions: 4 },
      'afm-4.5b': { clarity: 0.9, context: 0.85, format: 0.9, suggestions: 2 },
      'mixtral-8x7b': { clarity: 1.12, context: 1.1, format: 1.05, suggestions: 5 },
      'dialogpt-medium': { clarity: 0.95, context: 1.0, format: 0.85, suggestions: 3 }
    };

    const multiplier = modelMultipliers[model] || modelMultipliers['afm-4.5b'];
    
    // Model-specific suggestions
    const modelSuggestions = {
      'llama-70b': [
        'Consider implementing advanced prompt engineering techniques for optimal results',
        'Leverage sophisticated context framing to enhance AI comprehension',
        'Incorporate domain-specific terminology for precision',
        'Structure your request with hierarchical information layers'
      ],
      'llama-8b': [
        'Balance specificity with clarity for effective communication',
        'Provide structured context to guide AI reasoning',
        'Use practical examples to illustrate your requirements'
      ],
      'llama-3b': [
        'Keep instructions simple and direct',
        'Add basic context to help understanding',
        'Use clear, everyday language'
      ],
      'llama-11b-vision': [
        'Consider visual elements that could enhance your prompt',
        'Structure information with visual hierarchy in mind',
        'Include descriptions of visual context when relevant'
      ],
      'exaone-32b': [
        'Organize your prompt with logical structure and clear sequence',
        'Provide systematic context with methodical approach',
        'Use analytical frameworks to structure requirements',
        'Include measurable criteria for evaluation'
      ],
      'afm-4.5b': [
        'Focus on essential information for quick processing',
        'Use concise, action-oriented language'
      ],
      'mixtral-8x7b': [
        'Explore creative approaches to prompt formulation',
        'Consider multiple perspectives and domain intersections',
        'Leverage diverse expertise areas in your request',
        'Think outside conventional prompting patterns',
        'Incorporate innovative framing techniques'
      ],
      'dialogpt-medium': [
        'Frame your prompt as a natural conversation',
        'Consider the conversational flow and engagement',
        'Use dialogue-friendly language and tone'
      ]
    };
    
    const suggestions = modelSuggestions[model] || modelSuggestions['afm-4.5b'];
    
    return {
      score: {
        clarity: Math.min(100, Math.round(baseScore * multiplier.clarity + Math.random() * 10)),
        context: Math.min(100, Math.round(baseScore * multiplier.context + Math.random() * 10)),
        format: Math.min(100, Math.round(baseScore * multiplier.format + Math.random() * 10)),
        overall: Math.min(100, Math.round(baseScore * ((multiplier.clarity + multiplier.context + multiplier.format) / 3) + Math.random() * 10)),
      },
      suggestions: suggestions.slice(0, multiplier.suggestions),
      improvements: [
        'Be more specific about expected results',
        'Include relevant background information',
        'Add examples of desired output',
      ].slice(0, Math.max(2, multiplier.suggestions - 1)),
      rewrites: [
        `Enhanced prompt: ${text.substring(0, 80)}${text.length > 80 ? '...' : ''} - Please provide detailed analysis with specific examples.`,
        `${model.includes('dialog') ? 'Conversational approach: ' : model.includes('vision') ? 'Multimodal request: ' : 'Optimized version: '}${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`
      ],
      tone: model.includes('dialog') ? 'conversational' : model.includes('70b') ? 'professional' : model.includes('mixtral') ? 'creative' : 'practical',
      category: model.includes('vision') ? 'multimodal' : model.includes('dialog') ? 'conversational' : 'general',
      confidence: Math.min(100, Math.round(70 * multiplier.clarity)),
    };
  }

  private getModelProvider(model: ModelType): string {
    const modelKey = this.getModelKey(model);
    return AI_MODELS[modelKey]?.provider || AI_MODELS.AFM_4_5B.provider;
  }

  private getModelConfig(model: ModelType) {
    const modelKey = this.getModelKey(model);
    return AI_MODELS[modelKey] || AI_MODELS.AFM_4_5B;
  }

  private getModelKey(model: ModelType): keyof typeof AI_MODELS {
    const keyMap: Record<ModelType, keyof typeof AI_MODELS> = {
      'llama-70b': 'LLAMA_70B',
      'exaone-32b': 'EXAONE_32B',
      'afm-4.5b': 'AFM_4_5B',
      'llama-3b': 'LLAMA_3B',
      'llama-8b': 'LLAMA_8B',
      'llama-11b-vision': 'LLAMA_11B_VISION',
      'mixtral-8x7b': 'MIXTRAL_8X7B',
      'dialogpt-medium': 'DIALOGPT_MEDIUM'
    };
    return keyMap[model] || 'AFM_4_5B';
  }

  /**
   * Validate configuration
   */
  private validateConfiguration(): void {
    if (!this.config.apiKey) {
      throw new Error('AI service API key is required');
    }
  }

  private validateRequest(request: AnalysisRequest): void {
    if (!request.text || request.text.trim().length === 0) {
      throw new Error('Text is required for analysis');
    }

    if (request.text.length > 10000) {
      throw new Error('Text too long for analysis (max 10,000 characters)');
    }

    if (request.model && !Object.values(AI_MODELS).some(m => m.id === request.model)) {
      throw new Error(`Invalid model: ${request.model}`);
    }
  }

  private mergeOptions(options?: AnalysisOptions): AnalysisOptions {
    return {
      includeRewrites: true,
      includeSuggestions: true,
      maxSuggestions: 5,
      detailedAnalysis: false,
      ...options,
    };
  }

  private isCircuitOpen(model: ModelType): boolean {
    const state = this.circuitBreaker.get(model);
    if (!state) return false;

    const timeSinceLastFailure = Date.now() - state.lastFailure;
    const cooldownPeriod = 60000; // 1 minute

    if (timeSinceLastFailure > cooldownPeriod) {
      this.circuitBreaker.delete(model);
      return false;
    }

    return state.failures >= 3;
  }

  private recordSuccess(model: ModelType): void {
    this.circuitBreaker.delete(model);
  }

  private recordFailure(model: ModelType): void {
    const state = this.circuitBreaker.get(model) || { failures: 0, lastFailure: 0 };
    state.failures += 1;
    state.lastFailure = Date.now();
    this.circuitBreaker.set(model, state);
  }

  private async applyRateLimit(model: ModelType): Promise<void> {
    const lastCall = this.rateLimiter.get(model) || 0;
    const timeSinceLastCall = Date.now() - lastCall;
    const minInterval = API_CONFIG.TOGETHER_AI.RATE_LIMIT_DELAY;

    if (timeSinceLastCall < minInterval) {
      const delay = minInterval - timeSinceLastCall;
      await this.sleep(delay);
    }

    this.rateLimiter.set(model, Date.now());
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private countSentences(text: string): number {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  }

  private calculateReadabilityScore(text: string): number {
    const words = this.countWords(text);
    const sentences = this.countSentences(text);
    
    if (sentences === 0) return 0;
    
    const avgWordsPerSentence = words / sentences;
    
    // Simple readability score based on average sentence length
    if (avgWordsPerSentence <= 15) return 90;
    if (avgWordsPerSentence <= 20) return 75;
    if (avgWordsPerSentence <= 25) return 60;
    return 45;
  }

  private handleError(error: unknown): ApiResponse<never> {
    const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.AI.ANALYSIS_FAILED;
    
    console.error('AI Service Error:', error);
    
    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export service instance and legacy functions for backward compatibility
export const aiAnalysisService = new AIAnalysisService();

/**
 * @deprecated Use aiAnalysisService.analyzePrompt instead
 */
export async function analyzePrompt(text: string, model: ModelType = 'llama-70b'): Promise<AIAnalysisResult> {
  // Check if API key is available
  const apiKey = process.env.TOGETHER_API_KEY;
  
  if (!apiKey || apiKey === 'your_together_ai_api_key_here') {
    console.warn('⚠️ TOGETHER_API_KEY not configured. Using mock AI response for development.');
    console.warn('   Set TOGETHER_API_KEY environment variable for real AI functionality.');
    console.warn('   Get your API key from: https://api.together.ai/');
    
    // Return mock response for development
    const length = text.length;
    const baseScore = length < 50 ? 60 : length < 200 ? 75 : 85;
    
    return {
      score: {
        clarity: Math.round(baseScore + Math.random() * 15),
        context: Math.round(baseScore + Math.random() * 15), 
        format: Math.round(baseScore + Math.random() * 15),
        overall: Math.round(baseScore + Math.random() * 15),
      },
      suggestions: [
        'Consider adding more specific details to improve clarity',
        'Provide additional context for better AI understanding',
        'Define the desired output format more clearly',
      ],
      improvements: [
        'Be more specific about expected results',
        'Include relevant background information',
        'Add examples of desired output',
      ],
      rewrites: [
        `Please provide a detailed analysis of the following topic: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`,
        `Analyze and explain: ${text}`,
      ],
      tone: 'professional',
      category: 'general',
      confidence: 75,
      processingTime: Math.round(Math.random() * 500 + 200),
      model,
      metadata: {
        wordCount: text.trim().split(/\s+/).length,
        characterCount: text.length,
        sentenceCount: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
        readabilityScore: Math.round(Math.random() * 30 + 70),
      },
    };
  }

  // Use the actual service if API key is available
  try {
    const result = await aiAnalysisService.analyzePrompt({ text, model });
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data!;
  } catch (error) {
    console.error('AI service error, falling back to mock response:', error);
    
    // Fallback to mock response on error
    const length = text.length;
    const baseScore = length < 50 ? 60 : length < 200 ? 75 : 85;
    
    return {
      score: {
        clarity: Math.round(baseScore + Math.random() * 15),
        context: Math.round(baseScore + Math.random() * 15), 
        format: Math.round(baseScore + Math.random() * 15),
        overall: Math.round(baseScore + Math.random() * 15),
      },
      suggestions: [
        'Service temporarily unavailable - using mock analysis',
        'Consider adding more specific details to improve clarity',
        'Provide additional context for better AI understanding',
      ],
      improvements: [
        'Be more specific about expected results',
        'Include relevant background information',
      ],
      rewrites: [
        `Please provide a detailed analysis of: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`,
      ],
      tone: 'professional',
      category: 'general',
      confidence: 65,
      processingTime: Math.round(Math.random() * 500 + 200),
      model,
      metadata: {
        wordCount: text.trim().split(/\s+/).length,
        characterCount: text.length,
        sentenceCount: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
        readabilityScore: Math.round(Math.random() * 30 + 70),
      },
    };
  }
}

/**
 * @deprecated Use aiAnalysisService.getAvailableModels instead
 */
export async function getAvailableModels() {
  const result = await aiAnalysisService.getAvailableModels();
  return result.success ? result.data : [];
}

// Re-export types for backward compatibility
export type { ModelType, AIAnalysisResult }; 