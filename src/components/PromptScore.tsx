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
  // Color for score value
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Badge for score value
  const getScoreBadge = (value: number) => {
    if (value >= 80) return { label: "Excellent", variant: "default" as const, className: "bg-green-500" };
    if (value >= 60) return { label: "Good", variant: "secondary" as const, className: "bg-yellow-500" };
    return { label: "Needs Work", variant: "destructive" as const, className: "bg-red-500" };
  };

  // Memoized metrics for performance
  const metrics = useMemo(() => [
    {
      name: "Clarity",
      value: score.clarity,
      icon: Eye,
      description: "How clear and specific your prompt is",
    },
    {
      name: "Context",
      value: score.context,
      icon: Target,
      description: "Sufficient background information provided",
    },
    {
      name: "Format",
      value: score.format,
      icon: FileText,
      description: "Structure and desired output format",
    },
  ], [score]);

  return (
    <Card className="p-6 bg-black border border-zinc-800 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-6">See how your prompt scores today!</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Award className="w-5 h-5 text-purple-500" />
        <h3 className="font-semibold text-white">Prompt Score</h3>
      </div>
      {score.overall > 0 ? (
        <>
          <div className="text-center mb-6">
            <div className={`text-3xl font-bold ${getScoreColor(score.overall)} mb-2`}>
              {score.overall}%
            </div>
            <Badge {...getScoreBadge(score.overall)} className="mb-2">
              {getScoreBadge(score.overall).label}
            </Badge>
            <p className="text-xs text-slate-500">Overall prompt quality</p>
          </div>
          <div className="space-y-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {metric.name}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${getScoreColor(metric.value)}`}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <p className="text-xs text-slate-500">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            Your prompt will be scored as you type
          </p>
        </div>
      )}
    </Card>
  );
};

export default PromptScore;
