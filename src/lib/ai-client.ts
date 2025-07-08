import { AIAnalysisResult, ModelType } from '@/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AnalyzePromptResponse {
  success: boolean;
  data?: AIAnalysisResult;
  error?: string;
}

// Cache for storing analysis results
interface CacheEntry {
  result: AIAnalysisResult;
  timestamp: number;
  model: ModelType;
}

const analysisCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generate cache key based on text content and model
 */
function generateCacheKey(text: string, model: ModelType): string {
  // Create a simple hash of the text + model
  const content = `${text.trim().toLowerCase()}_${model}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

/**
 * Check if cache entry is still valid
 */
function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_DURATION;
}

/**
 * Get analysis from cache if available and valid
 */
function getCachedAnalysis(text: string, model: ModelType): AIAnalysisResult | null {
  const cacheKey = generateCacheKey(text, model);
  const cached = analysisCache.get(cacheKey);
  
  if (cached && isCacheValid(cached)) {
    return cached.result;
  }
  
  // Remove expired cache entry
  if (cached) {
    analysisCache.delete(cacheKey);
  }
  
  return null;
}

/**
 * Store analysis result in cache
 */
function setCachedAnalysis(text: string, model: ModelType, result: AIAnalysisResult): void {
  const cacheKey = generateCacheKey(text, model);
  analysisCache.set(cacheKey, {
    result,
    timestamp: Date.now(),
    model
  });
  
  // Clean up old cache entries (keep max 50 entries)
  if (analysisCache.size > 50) {
    const entries = Array.from(analysisCache.entries());
    const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toDelete = sortedEntries.slice(0, analysisCache.size - 50);
    toDelete.forEach(([key]) => analysisCache.delete(key));
  }
}

/**
 * Client-side AI analysis service that calls the API route with caching
 */
export async function analyzePromptClient(
  text: string, 
  model: ModelType = 'llama-70b'
): Promise<AIAnalysisResult> {
  // Check cache first
  const cached = getCachedAnalysis(text, model);
  if (cached) {
    console.log('📝 Returning cached analysis result');
    return cached;
  }

  try {
    console.log('🤖 Fetching new analysis from API...');
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result: AnalyzePromptResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Analysis failed');
    }

    // Cache the successful result
    setCachedAnalysis(text, model, result.data);
    console.log('✅ Analysis complete and cached');

    return result.data;
  } catch (error) {
    console.error('Client analysis error:', error);
    
    // Return fallback analysis if API fails
    const fallbackResult = createFallbackAnalysis(text);
    
    // Don't cache fallback results
    console.log('⚠️ Using fallback analysis');
    
    return fallbackResult;
  }
}

/**
 * Clear analysis cache (useful for debugging or manual refresh)
 */
export function clearAnalysisCache(): void {
  analysisCache.clear();
  console.log('🗑️ Analysis cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: analysisCache.size,
    entries: Array.from(analysisCache.keys())
  };
}

/**
 * Creates a fallback analysis when API fails
 */
function createFallbackAnalysis(text: string): AIAnalysisResult {
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const characterCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  // Simple scoring based on content analysis
  const clarityScore = Math.min(100, Math.max(20, wordCount * 2));
  const contextScore = text.includes('context') || text.includes('background') ? 80 : 50;
  const formatScore = text.includes('format') || text.includes('example') ? 85 : 60;
  const overallScore = Math.round((clarityScore + contextScore + formatScore) / 3);

  return {
    score: {
      clarity: clarityScore,
      context: contextScore,
      format: formatScore,
      overall: overallScore
    },
    suggestions: [
      "Add more specific details to improve clarity",
      "Include relevant context or background information",
      "Specify the desired format for the response"
    ],
    improvements: [
      "Consider breaking down complex requests into steps",
      "Provide examples of what you're looking for"
    ],
    rewrites: [
      `${text.trim()}. Please provide a detailed response with specific examples and clear explanations.`,
      `Acting as an expert, ${text.toLowerCase().trim()}. Break down your response into clear sections with actionable recommendations.`
    ],
    tone: "professional",
    category: "general",
    confidence: 0.7,
    processingTime: 100,
    model: 'fallback' as ModelType,
    metadata: {
      wordCount,
      characterCount,
      sentenceCount,
      readabilityScore: Math.min(100, Math.max(30, 100 - wordCount))
    }
  };
} 