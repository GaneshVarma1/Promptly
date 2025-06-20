"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Star, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { analyzePrompt } from "@/lib/ai-service-simple";
import { type AIAnalysisResult, type ModelType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Validate document ID format
 */
function isValidDocumentId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  // Allow various formats: doc-timestamp-random, doc_timestamp_random, or simple alphanumeric
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length >= 3 && id.length <= 50;
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>('llama-70b');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = params?.id as string;
    
    // Validate the document ID
    if (!id || !isValidDocumentId(id)) {
      console.error('Invalid document ID:', id);
      setError('Invalid document ID format');
      setIsLoading(false);
      return;
    }

    try {
      // Get prompt from localStorage
      const savedPrompt = localStorage.getItem(`document-${id}`);
      
      if (savedPrompt) {
        const doc = {
          id: id,
          title: savedPrompt.substring(0, 50) + (savedPrompt.length > 50 ? '...' : ''),
          content: savedPrompt
        };
        setDocument(doc);
        setContent(savedPrompt);
      } else {
        // Document not found, might be a timing issue or invalid ID
        console.warn('Document not found for ID:', id);
        setError('Document not found');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      setError('Error loading document');
    } finally {
      setIsLoading(false);
    }
  }, [params?.id]);

  useEffect(() => {
    const analyzeContent = async () => {
      if (!content) return;
      
      setIsAnalyzing(true);
      setError(null);
      try {
        const result = await analyzePrompt(content, selectedModel);
        setAnalysis(result);
      } catch (error) {
        console.error('Error analyzing content:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while analyzing the prompt');
        setAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    };

    const debounceTimer = setTimeout(analyzeContent, 1000);
    return () => clearTimeout(debounceTimer);
  }, [content, selectedModel]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-zinc-400">Loading document...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !document) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unable to Load Document</h1>
          <p className="text-gray-500 dark:text-zinc-400 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document Not Found</h1>
          <p className="text-gray-500 dark:text-zinc-400">No document data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex">
      {/* Left: Document Editor */}
      <div className="flex-1 flex flex-col px-12 py-10 border-r border-gray-200 dark:border-zinc-800 min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{document.title}</h1>
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              // Save changes to localStorage
              localStorage.setItem(`document-${document.id}`, e.target.value);
            }}
            className="w-full h-full p-6 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-zinc-700 text-lg leading-relaxed"
            placeholder="Enter your prompt here..."
          />
        </div>
      </div>

      {/* Right: Options & Suggestions Panel */}
      <aside className="w-[400px] bg-gray-50 dark:bg-zinc-950 px-6 py-10 min-h-screen overflow-y-auto">
        {/* Model Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-2">
            AI Model
          </label>
          <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as ModelType)}>
            <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llama-70b">Llama 2 70B (Best Quality)</SelectItem>
              <SelectItem value="exaone-32b">ExaOne 32B (Balanced)</SelectItem>
              <SelectItem value="afm-4.5b">AFM 4.5B (Fast)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isAnalyzing ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-gray-500 dark:text-zinc-400">Analyzing your prompt...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-500 mb-2">Configuration Error</h3>
                <div className="text-red-600 dark:text-red-200 whitespace-pre-line">{error}</div>
              </div>
            </div>
          </div>
        ) : analysis ? (
          <>
            {/* Score Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Score</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.score.overall}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(analysis.score).filter(([key]) => key !== 'overall').map(([metric, value]) => (
                  <div key={metric} className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <div className="text-sm text-gray-500 dark:text-zinc-400 mb-1 capitalize">{metric}</div>
                    <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Status Message */}
            {analysis.score.overall >= 80 && (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 dark:text-green-300 text-sm font-medium">Excellent! Your prompt scores {analysis.score.overall}/100</span>
                </div>
                <p className="text-green-600 dark:text-green-200 text-xs mt-1">No improvements needed - your prompt is already high quality!</p>
              </div>
            )}

            {/* Rewrites Section */}
            {analysis.rewrites && analysis.rewrites.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alternative Rewrites</h2>
                  <span className="text-sm text-gray-500 dark:text-zinc-400">{analysis.rewrites.length} options</span>
                </div>
                <div className="space-y-3">
                  {analysis.rewrites.map((rewrite, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Alternative #{index + 1}</h3>
                            <div className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                              Rewrite
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-zinc-800 rounded p-3">
                            <div className="text-xs text-gray-500 dark:text-zinc-400 mb-1">Alternative Prompt:</div>
                            <div className="text-sm text-gray-700 dark:text-zinc-200 leading-relaxed">{rewrite}</div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              setContent(rewrite);
                              localStorage.setItem(`document-${document.id}`, rewrite);
                            }}
                            className="px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                          >
                            Use This
                          </button>
                          <button 
                            onClick={() => {
                              // Add to existing content with a separator
                              const newContent = content ? 
                                `${content}\n\n--- Alternative ${index + 1} ---\n${rewrite}` :
                                rewrite;
                              setContent(newContent);
                              localStorage.setItem(`document-${document.id}`, newContent);
                            }}
                            className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                          >
                            Add Below
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions Section - Only show if there are suggestions */}
            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Improvement Suggestions</h2>
                  <span className="text-sm text-gray-500 dark:text-zinc-400">{analysis.suggestions.length} improvements</span>
                </div>
                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-1 text-blue-500" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-sm text-gray-600 dark:text-zinc-300">Suggestion #{index + 1}</div>
                            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300">
                              Improvement
                            </div>
                          </div>
                          <div className="text-gray-900 dark:text-white whitespace-pre-line mb-3">{suggestion}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements Section */}
            {analysis.improvements && analysis.improvements.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Improvements</h2>
                  <span className="text-sm text-gray-500 dark:text-zinc-400">{analysis.improvements.length} tips</span>
                </div>
                <div className="space-y-3">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-1 text-yellow-600 dark:text-yellow-400" />
                        <div className="text-sm text-yellow-800 dark:text-yellow-200">{improvement}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Metadata */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
              <div className="text-xs text-gray-500 dark:text-zinc-400 space-y-1">
                <div>Model: {analysis.model}</div>
                <div>Processing Time: {analysis.processingTime}ms</div>
                <div>Confidence: {Math.round(analysis.confidence * 100)}%</div>
                <div>Category: {analysis.category}</div>
                <div>Tone: {analysis.tone}</div>
                <div>Word Count: {analysis.metadata.wordCount}</div>
                <div>Readability Score: {analysis.metadata.readabilityScore}</div>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}