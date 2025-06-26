import { FC } from "react";
import { Settings, Activity, Star, Check, Archive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WhyChooseSectionProps {
  isVisible: boolean;
}

export const WhyChooseSection: FC<WhyChooseSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/30 dark:bg-black/90">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
            Why Choose <span className="text-slate-700 dark:text-slate-300">Promptly</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Move beyond basic prompting to professional-grade AI workflow management
          </p>
        </div>

        {/* True Bento Grid Layout */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(180px,auto)] gap-2 md:gap-3 mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 2x2 Card: End Shallow Prompting */}
          <div className="group md:col-span-2 md:row-span-2">
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/60 dark:bg-slate-800/60 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-700/60 transition-colors duration-300 backdrop-blur-sm border border-white/30 dark:border-white/15">
                <Settings size={32} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                End Shallow Prompting
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Replace one-off prompting with systematic, reusable templates designed for consistent enterprise results.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">Structured Templates</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Pre-built professional frameworks</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">Variable Management</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Dynamic, context-aware prompts</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">Quality Standards</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Enterprise-grade consistency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1x2 Card: Performance Analytics */}
          <div className="group md:col-span-1 md:row-span-2">
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <div className="w-12 h-12 bg-slate-100/60 dark:bg-slate-800/60 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-700/60 transition-colors duration-300 backdrop-blur-sm border border-white/30 dark:border-white/15">
                <Activity size={28} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
                Performance Analytics
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Comprehensive metrics and insights for data-driven optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Quality scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">ROI tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Custom dashboards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Exportable reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Real-time monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1x1 Card: Build Critical Thinking */}
          <div className="group md:col-span-1 md:row-span-1">
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <div className="w-12 h-12 bg-slate-100/60 dark:bg-slate-800/60 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-700/60 transition-colors duration-300 backdrop-blur-sm border border-white/30 dark:border-white/15">
                <Activity size={28} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
                Build Critical Thinking
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Develop analytical skills through multi-model testing and systematic optimization approaches.
              </p>
            </div>
          </div>

          {/* 1x1 Card: Professional Development */}
          <div className="group md:col-span-1 md:row-span-1">
            <div className="p-4 md:p-6 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <div className="w-10 h-10 bg-slate-100/60 dark:bg-slate-800/60 rounded-lg flex items-center justify-center mb-3 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-700/60 transition-colors duration-300 backdrop-blur-sm border border-white/30 dark:border-white/15">
                <Star size={24} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
                Professional Development
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Advance your AI expertise with enterprise tools.
              </p>
            </div>
          </div>

          {/* 2x1 Card: Multi-Model Testing */}
          <div className="group md:col-span-2 md:row-span-1">
            <div className="p-4 md:p-6 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <div className="w-10 h-10 bg-slate-100/60 dark:bg-slate-800/60 rounded-lg flex items-center justify-center mb-3 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-700/60 transition-colors duration-300 backdrop-blur-sm border border-white/30 dark:border-white/15">
                <Archive size={24} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
                Multi-Model Testing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Test across GPT-4, Claude, Gemini, and many free models from Hugging Face and Together AI. Access a wide range of open-source and community models for maximum flexibility.
              </p>
            </div>
          </div>

          {/* 2x1 Card: Platform Comparison */}
          <div className="group md:col-span-2 md:row-span-1">
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/20 dark:bg-black/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 rounded-2xl hover:bg-white/25 dark:hover:bg-black/80">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                Platform Comparison
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                See how Promptly compares to consumer AI interfaces
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 dark:text-orange-400 text-lg">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">No prompt organization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 dark:text-orange-400 text-lg">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Single model lock-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 dark:text-orange-400 text-lg">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">No analytics</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Professional templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Multi-model testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Advanced analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 