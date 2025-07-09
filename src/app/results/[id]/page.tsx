"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PromptScore, { PromptScoreValue } from "@/components/PromptScore";
import PromptSuggestions from "@/components/PromptSuggestions";
import PromptRewrites from "@/components/PromptRewrites";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, Lightbulb } from "lucide-react";
import { supabase } from '@/lib/ai-client';

export default function ResultsPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const params = useParams();
  const router = useRouter();
  
  // Simple state management
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<PromptScoreValue>({ clarity: 0, context: 0, format: 0, overall: 0 });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState("llama-2-70b");
  const [aiInsights, setAiInsights] = useState({
    category: "",
    tone: "",
    confidence: 0
  });

  // Get document ID from URL
  const documentId = params?.id as string;

  // Redirect to home page if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // Load document content from Supabase
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId || !user?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('content')
          .eq('id', documentId)
          .eq('user_id', user.id)
          .single();
        if (error) throw error;
        setContent(data?.content || '');
      } catch (err: any) {
        setError(err.message || 'Failed to load document');
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoaded && isSignedIn) {
      fetchDocument();
    }
  }, [documentId, user?.id, isLoaded, isSignedIn]);

  // Save content to Supabase on change (debounced)
  useEffect(() => {
    if (!documentId || !user?.id) return;
    const timeoutId = setTimeout(async () => {
      console.log('Attempting to update document:', { documentId, userId: user.id, content });
      const { error, data } = await supabase
        .from('documents')
        .update({ content, lastModified: new Date().toISOString() })
        .eq('id', documentId)
        .eq('user_id', user.id)
        .select();
      if (error) {
        console.error('Failed to save document:', error.message);
      } else {
        console.log('Save successful:', data);
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [content, documentId, user?.id]);

  // Auto-save content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // Analyze content with debounce
  useEffect(() => {
    if (!content.trim()) {
      setScore({ clarity: 0, context: 0, format: 0, overall: 0 });
      setSuggestions([]);
      setRewrites([]);
      setAiInsights({ category: "", tone: "", confidence: 0 });
      return;
    }

    const timeoutId = setTimeout(() => {
      analyzeContent(content);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const analyzeContent = async (text: string) => {
    setIsAnalyzing(true);
    
    try {
      const wordCount = text.split(/\s+/).length;
      const hasSpecificity = /\b(specific|detailed|exactly|precisely|particular)\b/i.test(text);
      const hasContext = /\b(because|context|background|situation|scenario)\b/i.test(text);
      const hasFormat = /\b(format|structure|output|result|response)\b/i.test(text);
      const hasQuestions = text.includes("?");
      
      const clarity = Math.min(100, 30 + (wordCount > 10 ? 20 : 0) + (hasSpecificity ? 25 : 0) + (hasQuestions ? 25 : 0));
      const context = Math.min(100, 40 + (hasContext ? 30 : 0) + (wordCount > 20 ? 20 : 0) + (text.length > 100 ? 10 : 0));
      const format = Math.min(100, 35 + (hasFormat ? 35 : 0) + (text.includes("example") ? 15 : 0) + (text.includes("list") || text.includes("bullet") ? 15 : 0));
      const overall = Math.round((clarity + context + format) / 3);

      setScore({ clarity, context, format, overall });

      const newSuggestions = [];
      if (wordCount < 10) newSuggestions.push("Add more details to make your prompt clearer and more specific.");
      if (!hasContext) newSuggestions.push("Provide background context to help the AI understand your needs better.");
      if (!hasFormat) newSuggestions.push("Specify the desired output format (e.g., list, paragraph, table).");

      setSuggestions(newSuggestions);

      const newRewrites = [];
      if (text.length > 0) {
        newRewrites.push(`Enhanced: ${text} Please provide detailed examples and explanations.`);
        newRewrites.push(`Structured: Break down \"${text}\" into clear sections with actionable insights.`);
      }
      
      setRewrites(newRewrites);

      setAiInsights({
        category: text.includes("write") ? "Creative" : text.includes("analyze") ? "Analysis" : "General",
        tone: hasQuestions ? "Inquisitive" : text.includes("please") ? "Polite" : "Professional",
        confidence: overall
      });

    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseRewrite = (rewrite: string) => {
    handleContentChange(rewrite);
  };

  // Generate title from content
  const title = content.trim() 
    ? content.substring(0, 50) + (content.length > 50 ? '...' : '')
    : 'Untitled Document';

  // Show loading spinner while checking authentication or loading document
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // Don't render the page if user is not signed in
  if (!isSignedIn) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-sussie">Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-sussie">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Side - Document Editor */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1 mb-6">
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-full p-6 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-lg leading-relaxed font-sussie min-h-[400px] transition-colors"
              placeholder="Enter your prompt here..."
            />
          </div>

          {/* AI Analysis Components */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PromptScore score={score} />
            <PromptSuggestions suggestions={suggestions} isLoading={isAnalyzing} />
            <PromptRewrites 
              rewrites={rewrites} 
              isLoading={isAnalyzing}
              onUseRewrite={handleUseRewrite}
            />
          </div>
        </div>

        {/* Right Side - Advanced Analysis */}
        <aside className="w-[400px] bg-gray-50 dark:bg-zinc-900 px-6 py-6 border-l border-gray-200 dark:border-zinc-800 overflow-y-auto transition-colors">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 font-sussie">
                AI Model
              </label>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                <SelectItem value="llama-2-70b" className="text-gray-900 dark:text-white">Llama 2 70B (Best Quality)</SelectItem>
                <SelectItem value="exaone-32b" className="text-gray-900 dark:text-white">ExaOne 32B (Balanced)</SelectItem>
                <SelectItem value="afm-4.5b" className="text-gray-900 dark:text-white">AFM 4.5B (Fast)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isAnalyzing && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 dark:text-zinc-400 font-sussie">Analyzing...</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-sussie">Analysis</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Category</div>
                  <div className="text-gray-900 dark:text-white font-sussie">{aiInsights.category || "General"}</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Tone</div>
                  <div className="text-gray-900 dark:text-white font-sussie">{aiInsights.tone || "Neutral"}</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Score</div>
                  <div className="text-gray-900 dark:text-white font-sussie">{aiInsights.confidence}%</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-sussie">AI Insights</h2>
              </div>
              {content ? (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="text-sm text-blue-800 dark:text-blue-200 font-sussie">
                    Your prompt shows <strong>{aiInsights.confidence >= 70 ? "good" : "basic"}</strong> structure
                    and appears to be a <strong>{aiInsights.category.toLowerCase()}</strong> request
                    with a <strong>{aiInsights.tone.toLowerCase()}</strong> tone.
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-zinc-400 text-sm font-sussie">
                 
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}