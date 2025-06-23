import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Copy, Check, Wand2, Zap } from "lucide-react";

export type PromptType = "image" | "text" | "code" | "general";

export interface PromptRewritesProps {
  rewrites: string[];
  isLoading: boolean;
  onUseRewrite?: (rewrite: string) => void;
  promptType?: PromptType;
  originalPrompt?: string;
}

const getPowerfulPrompts = (promptType: PromptType, originalPrompt: string): string[] => {
  if (!originalPrompt) return [];
  switch (promptType) {
    case "image":
      return [
        `Highly detailed, cinematic, ultra-realistic: ${originalPrompt} | Add: lighting, camera angle, mood, style, color grading, 8k, trending on ArtStation`,
        `Masterpiece, award-winning, photorealistic: ${originalPrompt} | Specify: lens, time of day, environment, atmosphere, composition, depth of field`,
        `Professional studio quality: ${originalPrompt} | Include: subject, background, texture, lighting, perspective, post-processing, sharp focus`,
      ];
    case "text":
      return [
        `Expert-level: ${originalPrompt} | Request: clear structure, examples, actionable steps, and summary.`,
        `Comprehensive: ${originalPrompt} | Ask for: bullet points, real-world use cases, and concise explanations.`,
        `High-impact: ${originalPrompt} | Require: clarity, context, and a call to action at the end.`,
      ];
    case "code":
      return [
        `Write robust, production-ready code for: ${originalPrompt} | Include: comments, error handling, and test cases.`,
        `Best practices: ${originalPrompt} | Request: optimized, readable, and maintainable code with explanations.`,
        `Step-by-step: ${originalPrompt} | Ask for: code, sample input/output, and edge case discussion.`,
      ];
    default:
      return [
        `Enhanced: ${originalPrompt} | Add: clarity, context, and specific requirements for best results.`,
        `Structured: ${originalPrompt} | Request: organized response with examples and actionable insights.`,
        `Powerful: ${originalPrompt} | Ask for: expert advice, step-by-step guidance, and summary.`,
      ];
  }
};

const PromptRewrites: FC<PromptRewritesProps> = ({ rewrites, isLoading, onUseRewrite, promptType = "general", originalPrompt = "" }) => {
  // Use powerful prompts if promptType and originalPrompt are provided
  const powerfulPrompts = originalPrompt ? getPowerfulPrompts(promptType, originalPrompt) : [];
  const showPowerful = powerfulPrompts.length > 0;

  if (isLoading) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggested Prompts</h3>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!showPowerful && rewrites.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggested Prompts</h3>
        </div>
        <div className="text-center py-8">
          <Wand2 className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-sussie">
            AI will generate improved versions of your prompt
          </p>
        </div>
      </Card>
    );
  }

  // Show powerful prompts first, then fallback to rewrites
  const allPrompts = showPowerful ? powerfulPrompts : rewrites;

  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
        <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggested Prompts</h3>
        <Badge variant="secondary" className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-sussie animate-pulse">
          100% Score
        </Badge>
      </div>
      <div className="space-y-4">
        {allPrompts.map((rewrite, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-yellow-50 via-blue-50 to-green-50 dark:from-yellow-900/20 dark:via-blue-900/20 dark:to-green-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 shadow-md hover:shadow-lg hover:bg-yellow-100/60 dark:hover:bg-yellow-900/40 transition-colors group relative"
          >
            <div className="flex justify-between items-start mb-3">
              <Badge variant="outline" className="text-xs bg-white dark:bg-zinc-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 font-sussie flex items-center gap-1">
                <Zap className="w-3 h-3 mr-1 text-yellow-500" />
                Power Prompt
              </Badge>
              {onUseRewrite && (
                <Button
                  size="sm"
                  onClick={() => onUseRewrite(rewrite)}
                  className="text-xs bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-sussie"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Use This
                </Button>
              )}
            </div>
            <p className="text-base text-blue-900 dark:text-blue-100 leading-relaxed font-sussie">
              {rewrite}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptRewrites;
