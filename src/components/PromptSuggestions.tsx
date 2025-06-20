import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Clock } from "lucide-react";

/**
 * Props for the PromptSuggestions component.
 */
export interface PromptSuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
}

/**
 * Displays AI-powered suggestions for improving prompts.
 * Handles loading, empty, and populated states.
 */
const PromptSuggestions: FC<PromptSuggestionsProps> = ({ suggestions, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggestions</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggestions</h3>
        </div>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-sussie">
            Start typing to get AI-powered suggestions for improving your prompt
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Suggestions</h3>
        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 font-sussie">
          {suggestions.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors cursor-pointer group"
          >
            <p className="text-sm text-yellow-800 dark:text-yellow-200 group-hover:text-yellow-900 dark:group-hover:text-yellow-100 font-sussie">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptSuggestions;
