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
      <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-slate-100">Suggestions</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-slate-100">Suggestions</h3>
        </div>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            Start typing to get AI-powered suggestions for improving your prompt
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold text-slate-100">Suggestions</h3>
        <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
          {suggestions.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg hover:bg-yellow-900/30 transition-colors cursor-pointer group"
          >
            <p className="text-sm text-white group-hover:text-zinc-200">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptSuggestions;
