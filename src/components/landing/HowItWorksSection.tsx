import { FC } from "react";
import { Plus, Archive, Settings, Activity, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

export const HowItWorksSection: FC<HowItWorksSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/80 dark:bg-black/90">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
            How <span className="text-slate-700 dark:text-slate-300">It Works</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transform your AI workflow with professional prompt engineering tools
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {/* Step 1: Create & Organize */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-200`}>
            <div className="relative p-6 md:p-8 h-full backdrop-blur-xl bg-white/30 dark:bg-black/70 border border-slate-300 dark:border-white/20 hover:shadow-2xl hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/40 dark:hover:bg-black/80">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">1</div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-300 dark:border-white/20">
                <Plus size={32} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                Create & Organize
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Build structured prompt templates with variables, organize them into collections, and create reusable frameworks for your team.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Template builder with variable management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Organized collections and folders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Team collaboration features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Test & Optimize */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-400`}>
            <div className="relative p-6 md:p-8 h-full backdrop-blur-xl bg-white/30 dark:bg-black/70 border border-slate-300 dark:border-white/20 hover:shadow-2xl hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/40 dark:hover:bg-black/80">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-300 dark:border-white/20">
                <Settings size={32} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                Test & Optimize
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Run your prompts across multiple AI models simultaneously. Compare results, gather metrics, and optimize for the best performance.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Multi-model testing (GPT-4, Claude, Gemini, Hugging Face, Together AI, and more)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">A/B testing and comparison tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Quality scoring and metrics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Deploy & Scale */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-600`}>
            <div className="relative p-6 md:p-8 h-full backdrop-blur-xl bg-white/30 dark:bg-black/70 border border-slate-300 dark:border-white/20 hover:shadow-2xl hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/40 dark:hover:bg-black/80">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">3</div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-300 dark:border-white/20">
                <Archive size={32} className="text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                Deploy & Scale
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Save your optimized prompts to your library, share with your team, and scale your AI operations with proven, tested templates.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Persistent library storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Team sharing and collaboration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">API access for automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-800`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                The Promptly Advantage
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                See the immediate benefits of professional prompt engineering
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <Activity size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">3x</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Better Results</div>
              </div>
              
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <Archive size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">5x</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Faster Iteration</div>
              </div>
              
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <Settings size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">90%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Consistency</div>
              </div>
              
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <ArrowUp size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">50%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1000`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
              Ready to Transform Your AI Workflow?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join professionals who are building better AI applications with systematic prompt engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg shadow-sm transition-all duration-300">
                Start Building
                <ArrowUp size={20} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 