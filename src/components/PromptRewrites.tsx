import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Copy, Check, Wand2 } from "lucide-react";

/**
 * Props for the PromptRewrites component.
 */
export interface PromptRewritesProps {
  rewrites: string[];
  isLoading: boolean;
  onUseRewrite?: (rewrite: string) => void;
}

/**
 * Displays AI-generated alternative versions of the prompt.
 * Includes "Use This" functionality for easy adoption.
 */
const PromptRewrites: FC<PromptRewritesProps> = ({ rewrites, isLoading, onUseRewrite }) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Rewrites</h3>
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

  if (rewrites.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Rewrites</h3>
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

  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
      <div className="flex items-center space-x-2 mb-4">
        <RefreshCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Rewrites</h3>
        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 font-sussie">
          {rewrites.length}
        </Badge>
      </div>
      <div className="space-y-4">
        {rewrites.map((rewrite, index) => (
          <div
            key={index}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
          >
            <div className="flex justify-between items-start mb-3">
              <Badge variant="outline" className="text-xs bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 font-sussie">
                Version {index + 1}
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
            <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed font-sussie">
              {rewrite}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptRewrites;
