/**
 * Simplified AI Analysis Service for Development
 * Provides mock responses when API key is not available
 */

import { type AIAnalysisResult, type ModelType } from '@/types';

/**
 * Generate mock AI analysis for development
 */
function generateMockAnalysis(text: string, model: ModelType): AIAnalysisResult {
  const length = text.length;
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  // Generate realistic scores based on content length and complexity
  const baseScore = length < 50 ? 65 : length < 200 ? 78 : 87;
  const variation = Math.random() * 10 - 5; // ±5 variation
  
  const clarity = Math.round(Math.max(40, Math.min(100, baseScore + variation)));
  const context = Math.round(Math.max(40, Math.min(100, baseScore + variation + 2)));
  const format = Math.round(Math.max(40, Math.min(100, baseScore + variation - 1)));
  const overall = Math.round((clarity + context + format) / 3);

  return {
    score: {
      clarity,
      context,
      format,
      overall,
    },
    suggestions: [
      'Consider adding more specific details to improve clarity',
      'Provide additional context for better AI understanding',
      'Define the desired output format more clearly',
      ...(length < 50 ? ['Your prompt could benefit from more detail'] : []),
      ...(wordCount < 5 ? ['Try expanding your prompt with more descriptive language'] : []),
    ].slice(0, 3),
    improvements: [
      'Be more specific about expected results',
      'Include relevant background information',
      'Add examples of desired output',
      ...(sentenceCount === 1 ? ['Consider breaking your request into multiple sentences'] : []),
    ].slice(0, 3),
    rewrites: [
      `Please provide a detailed analysis of the following topic: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`,
      `Analyze and explain in detail: ${text}`,
      ...(length > 50 ? [`Create a comprehensive breakdown of: ${text.substring(0, 80)}...`] : []),
    ].slice(0, 2),
    tone: length > 100 ? 'professional' : 'casual',
    category: 'general',
    confidence: Math.round(Math.max(60, Math.min(90, 75 + (wordCount / 10)))),
    processingTime: Math.round(Math.random() * 300 + 150),
    model,
    metadata: {
      wordCount,
      characterCount: text.length,
      sentenceCount,
      readabilityScore: Math.round(Math.max(30, Math.min(100, 90 - (wordCount / sentenceCount || 1) * 2))),
    },
  };
}

/**
 * Analyze prompt with fallback to mock data
 */
export async function analyzePrompt(text: string, model: ModelType = 'llama-70b'): Promise<AIAnalysisResult> {
  // Check if API key is available
  const apiKey = process.env.TOGETHER_API_KEY;
  
  if (!apiKey || apiKey === 'mock_for_development' || apiKey === 'your_together_ai_api_key_here') {
    console.warn('⚠️ Using mock AI analysis for development');
    console.warn('   Set TOGETHER_API_KEY in .env.local for real AI functionality');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    return generateMockAnalysis(text, model);
  }

  // If we have a real API key, try to use the actual service
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, model }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn('AI service unavailable, using mock response:', error);
    return generateMockAnalysis(text, model);
  }
}

/**
 * Get available models (simplified)
 */
export async function getAvailableModels() {
  return [
    { model: 'llama-70b', available: true, lastChecked: new Date().toISOString() },
    { model: 'exaone-32b', available: true, lastChecked: new Date().toISOString() },
    { model: 'afm-4.5b', available: true, lastChecked: new Date().toISOString() },
  ];
} 