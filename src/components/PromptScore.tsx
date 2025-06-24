import { FC, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, FileText, Award } from "lucide-react";

/**
 * Scoring structure for prompt analysis.
 */
export interface PromptScoreValue {
  clarity: number;
  context: number;
  format: number;
  overall: number;
}

/**
 * Props for the PromptScore component.
 */
export interface PromptScoreProps {
  score: PromptScoreValue;
}

/**
 * Displays prompt scoring metrics and overall quality.
 * Uses color and badge indicators for clarity.
 */
const PromptScore: FC<PromptScoreProps> = ({ score }) => {
  // Ensure score object has all required properties with fallbacks
  const safeScore = {
    clarity: score?.clarity ?? 0,
    context: score?.context ?? 0,
    format: score?.format ?? 0,
    overall: score?.overall ?? 0,
  };

  // Color for score value
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-green-600 dark:text-green-400";
    if (value >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  // Badge for score value
  const getScoreBadge = (value: number) => {
    if (value >= 80) return { 
      label: "Excellent", 
      className: "bg-green-500 dark:bg-green-600 text-white dark:text-white" 
    };
    if (value >= 60) return { 
      label: "Good", 
      className: "bg-yellow-500 dark:bg-yellow-600 text-white dark:text-white" 
    };
    return { 
      label: "Needs Work", 
      className: "bg-red-500 dark:bg-red-600 text-white dark:text-white" 
    };
  };

  // Memoized metrics for performance
  const metrics = useMemo(() => [
    {
      name: "Clarity",
      value: safeScore.clarity,
      icon: Eye,
      description: "How clear and specific your prompt is",
    },
    {
      name: "Context",
      value: safeScore.context,
      icon: Target,
      description: "Sufficient background information provided",
    },
    {
      name: "Format",
      value: safeScore.format,
      icon: FileText,
      description: "Structure and desired output format",
    },
  ], [safeScore]);

  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg transition-colors">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 font-sussie">See how your prompt scores today!</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">Prompt Score</h3>
      </div>
      {safeScore.overall > 0 ? (
        <>
          <div className="text-center mb-6">
            <div className={`text-3xl font-bold ${getScoreColor(safeScore.overall)} mb-2 font-sussie`}>
              {safeScore.overall}%
            </div>
            <Badge className={`mb-2 ${getScoreBadge(safeScore.overall).className} font-sussie`}>
              {getScoreBadge(safeScore.overall).label}
            </Badge>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-sussie">Overall prompt quality</p>
          </div>
          <div className="space-y-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 font-sussie">
                        {metric.name}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${getScoreColor(metric.value)} font-sussie`}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <p className="text-xs text-gray-500 dark:text-zinc-400 font-sussie">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-sussie">
            Your prompt will be scored as you type
          </p>
        </div>
      )}
    </Card>
  );
};

export default PromptScore;
