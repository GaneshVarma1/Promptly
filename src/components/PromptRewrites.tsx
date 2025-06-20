import { FC, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Props for the PromptRewrites component.
 */
export interface PromptRewritesProps {
  rewrites: string[];
  onSelectRewrite: (rewrite: string) => void;
  tone: string;
  isLoading: boolean;
}

/**
 * Displays AI-generated prompt rewrites with copy and select actions.
 * Handles loading, empty, and populated states.
 */
const PromptRewrites: FC<PromptRewritesProps> = ({ rewrites, onSelectRewrite, tone, isLoading }) => {
  const { toast } = useToast();

  // Memoized copy handler
  const copyRewrite = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Rewrite copied to clipboard",
    });
  }, [toast]);

  if (isLoading) {
    return (
      <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-800">AI Rewrites</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (rewrites.length === 0) {
    return (
      <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-800">AI Rewrites</h3>
        </div>
        <div className="text-center py-8">
          <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            Type more to see AI-generated improvements of your prompt
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-800">AI Rewrites</h3>
          <Badge variant="outline" className="text-xs capitalize">
            {tone}
          </Badge>
        </div>
      </div>
      <div className="space-y-4">
        {rewrites.map((rewrite, index) => (
          <div
            key={index}
            className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-all group bg-white/50"
          >
            <p className="text-sm text-white mb-3 leading-relaxed">
              {rewrite}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                Version {index + 1}
              </Badge>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyRewrite(rewrite)}
                  className="text-xs"
                  aria-label="Copy rewrite"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  onClick={() => onSelectRewrite(rewrite)}
                  className="text-xs bg-gradient-to-r from-purple-500 to-blue-500"
                  aria-label="Use this rewrite"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Use This
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptRewrites;
