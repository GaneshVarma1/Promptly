"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PromptScore, { PromptScoreValue } from "@/components/PromptScore";
import PromptSuggestions from "@/components/PromptSuggestions";
import PromptRewrites from "@/components/PromptRewrites";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Lightbulb } from "lucide-react";

/**
 * Validate document ID format
 */
function isValidDocumentId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  // Allow various formats: doc-timestamp-random or simple alphanumeric
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length >= 3 && id.length <= 50;
}

interface DocumentData {
  content: string;
  timestamp: number;
}

export default function ResultsPage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  
  const [content, setContent] = useState("");
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

  // Generate document title from content
  const documentTitle = content.length > 0 
    ? content.substring(0, 50) + (content.length > 50 ? '...' : '')
    : 'Untitled Document';

  // Load document on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem("saved_documents");
    if (savedDocs) {
      try {
        const docs = JSON.parse(savedDocs);
        const doc = docs[id] as DocumentData;
        if (doc) {
          setContent(doc.content || "");
        }
      } catch (error) {
        console.error("Error loading document:", error);
      }
    }
  }, [id]);

  // Auto-save content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Save to localStorage
    const savedDocs = localStorage.getItem("saved_documents");
    const docs = savedDocs ? JSON.parse(savedDocs) : {};
    docs[id] = {
      content: newContent,
      timestamp: Date.now()
    };
    localStorage.setItem("saved_documents", JSON.stringify(docs));
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
      // Calculate scores based on content analysis
      const wordCount = text.split(/\s+/).length;
      const hasSpecificity = /\b(specific|detailed|exactly|precisely|particular)\b/i.test(text);
      const hasContext = /\b(because|context|background|situation|scenario)\b/i.test(text);
      const hasFormat = /\b(format|structure|output|result|response)\b/i.test(text);
      const hasQuestions = text.includes("?");
      
      // Scoring algorithm
      const clarity = Math.min(100, 30 + (wordCount > 10 ? 20 : 0) + (hasSpecificity ? 25 : 0) + (hasQuestions ? 25 : 0));
      const context = Math.min(100, 40 + (hasContext ? 30 : 0) + (wordCount > 20 ? 20 : 0) + (text.length > 100 ? 10 : 0));
      const format = Math.min(100, 35 + (hasFormat ? 35 : 0) + (text.includes("example") ? 15 : 0) + (text.includes("list") || text.includes("bullet") ? 15 : 0));
      const overall = Math.round((clarity + context + format) / 3);

      setScore({ clarity, context, format, overall });

      // Generate suggestions based on analysis
      const newSuggestions = [];
      if (wordCount < 10) newSuggestions.push("Add more details to make your prompt clearer and more specific.");
      if (!hasContext) newSuggestions.push("Provide background context to help the AI understand your needs better.");
      if (!hasFormat) newSuggestions.push("Specify the desired output format (e.g., list, paragraph, table).");
      if (!hasSpecificity) newSuggestions.push("Use more specific language to get more accurate results.");
      if (!hasQuestions && wordCount < 15) newSuggestions.push("Consider adding clarifying questions to guide the response.");

      setSuggestions(newSuggestions);

      // Generate rewrites
      const newRewrites = [];
      if (text.length > 0) {
        newRewrites.push(`Enhanced version: Please provide a detailed and comprehensive response about ${text.toLowerCase().replace(/[.!?]+$/, "")}. Include specific examples and explain the reasoning behind your recommendations.`);
        newRewrites.push(`Structured approach: Break down the topic of "${text.replace(/[.!?]+$/, "")}" into clear sections. For each section, provide actionable insights with practical examples.`);
      }
      
      setRewrites(newRewrites);

      // Set AI insights
      setAiInsights({
        category: text.includes("write") || text.includes("create") ? "Creative Writing" :
                 text.includes("analyze") || text.includes("explain") ? "Analysis" :
                 text.includes("list") || text.includes("steps") ? "Instructional" : "General Query",
        tone: hasQuestions ? "Inquisitive" : 
              text.includes("please") || text.includes("help") ? "Polite" : 
              text.includes("!") ? "Enthusiastic" : "Professional",
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-sussie">{documentTitle}</h1>
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
                <p className="text-gray-500 dark:text-zinc-400 font-sussie">Running advanced analysis...</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-sussie">Advanced Analysis</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 transition-colors">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Category</div>
                  <div className="text-gray-900 dark:text-white font-sussie">{aiInsights.category || "Not analyzed"}</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 transition-colors">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Tone</div>
                  <div className="text-gray-900 dark:text-white font-sussie">{aiInsights.tone || "Neutral"}</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 transition-colors">
                  <div className="text-sm text-gray-500 dark:text-zinc-400 font-sussie">Confidence</div>
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
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors">
                    <div className="text-sm text-blue-800 dark:text-blue-200 font-sussie">
                      Your prompt shows <strong>{aiInsights.confidence >= 80 ? "excellent" : aiInsights.confidence >= 60 ? "good" : "basic"}</strong> structure
                      {aiInsights.category && ` and appears to be a ${aiInsights.category.toLowerCase()} request`}.
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors">
                    <div className="text-sm text-blue-800 dark:text-blue-200 font-sussie">
                      The tone is <strong>{aiInsights.tone.toLowerCase()}</strong>, which 
                      {aiInsights.tone === "Polite" ? " is great for getting helpful responses" :
                       aiInsights.tone === "Professional" ? " maintains a formal approach" :
                       aiInsights.tone === "Enthusiastic" ? " shows engagement with the topic" :
                       " works well for most queries"}.
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-zinc-400 text-sm font-sussie">
                  Start typing to see AI-powered insights about your prompt.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 