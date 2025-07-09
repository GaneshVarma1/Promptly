import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ToneSelector from "./ToneSelector";
import PromptSuggestions from "./PromptSuggestions";
import PromptRewrites from "./PromptRewrites";
import PromptScore from "./PromptScore";
import { Wand2, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/ai-client';
import { useUser } from '@clerk/nextjs';

export interface PromptEditorProps {
  documentId: string;
}

interface Score {
  clarity: number;
  context: number;
  format: number;
  overall: number;
}

const PromptEditor: FC<PromptEditorProps> = ({ documentId }) => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<"friendly" | "formal" | "creative">("friendly");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [score, setScore] = useState<Score>({ clarity: 0, context: 0, format: 0, overall: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load document from Supabase on mount
  useEffect(() => {
    const fetchDoc = async () => {
      if (!documentId || !user?.id) return;
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();
      if (data?.content) setPrompt(data.content);
    };
    fetchDoc();
  }, [documentId, user?.id]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  // Simulate AI analysis with debounce
  useEffect(() => {
    if (prompt.length < 10) {
      setSuggestions([]);
      setRewrites([]);
      setScore({ clarity: 0, context: 0, format: 0, overall: 0 });
      return;
    }
    const timer = setTimeout(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        // Mock suggestions based on prompt content
        const mockSuggestions: string[] = [
          "Be more specific about the desired output format",
          "Add context about your target audience",
          "Include examples for better results",
        ].filter(() => Math.random() > 0.3);
        // Mock rewrites
        const mockRewrites: string[] = [
          `${prompt} Please provide a detailed response with examples and actionable steps.`,
          `Acting as an expert, ${prompt.toLowerCase()} Make sure to include specific examples and format the response clearly.`,
          `${prompt} Structure your response with clear headings and bullet points for easy reading.`,
        ];
        // Mock scoring
        const mockScore: Score = {
          clarity: Math.floor(Math.random() * 40) + 60,
          context: Math.floor(Math.random() * 30) + 50,
          format: Math.floor(Math.random() * 35) + 45,
          overall: 0,
        };
        mockScore.overall = Math.floor((mockScore.clarity + mockScore.context + mockScore.format) / 3);
        setSuggestions(mockSuggestions);
        setRewrites(mockRewrites);
        setScore(mockScore);
        setIsAnalyzing(false);
      }, 1500);
    }, 800);
    return () => clearTimeout(timer);
  }, [prompt]);

  // Save prompt to Supabase on change (debounced)
  useEffect(() => {
    if (!documentId || !user?.id) return;
    const timeout = setTimeout(async () => {
      await supabase
        .from('documents')
        .update({ content: prompt, lastModified: new Date().toISOString() })
        .eq('id', documentId)
        .eq('user_id', user.id);
    }, 800);
    return () => clearTimeout(timeout);
  }, [prompt, documentId, user?.id]);

  const handlePromptChange = useCallback((value: string) => {
    setPrompt(value);
  }, []);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  }, [prompt, toast]);

  const sharePrompt = useCallback(() => {
    const shareData = {
      title: "My AI Prompt",
      text: prompt,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      copyPrompt();
    }
  }, [prompt, copyPrompt]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-bold text-center text-white mb-6 font-sussie">Start crafting your perfect prompt!</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-slate-100">Your Prompt</h2>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyPrompt} className="border-slate-600 text-slate-300 hover:bg-slate-700" aria-label="Copy prompt">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={sharePrompt} className="border-slate-600 text-slate-300 hover:bg-slate-700" aria-label="Share prompt">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            placeholder="Describe what you want the AI to do... Be specific about your goals, context, and desired output format."
            className="w-full min-h-[120px] p-4 border border-slate-600 bg-slate-700/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-100 placeholder-slate-400"
            aria-label="Prompt input"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <ToneSelector tone={tone} onToneChange={setTone} />
              {prompt.length > 0 && (
                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                  {prompt.length} characters
                </Badge>
              )}
            </div>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                Analyzing...
              </div>
            )}
          </div>
        </Card>
        <PromptRewrites
          rewrites={rewrites}
          onUseRewrite={setPrompt}
          isLoading={isAnalyzing}
        />
      </div>
      {/* Sidebar */}
      <div className="space-y-6">
        <PromptScore score={score} />
        <PromptSuggestions suggestions={suggestions} isLoading={isAnalyzing} />
      </div>
    </div>
  );
};

export default PromptEditor;
