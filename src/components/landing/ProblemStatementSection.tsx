import { FC, useState, useEffect } from "react";
import { AlertTriangle, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Silk from "@/components/ui/silk";

interface ProblemStatementSectionProps {
  isVisible: boolean;
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  isVisible?: boolean;
}

const CountUp: FC<CountUpProps> = ({ end, duration = 2000, suffix = "%", isVisible = false }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      setCount(0); // Reset to 0 when starting
      
      // Small delay to ensure proper timing
      setTimeout(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeOutQuart * end);
          
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        // Start animation immediately
        animationFrame = requestAnimationFrame(animate);

        return () => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        };
      }, 100); // Small delay to ensure proper timing
    }
  }, [isVisible, hasStarted, end, duration]);

  // Reset when section becomes invisible
  useEffect(() => {
    if (!isVisible) {
      setHasStarted(false);
      setCount(0);
    }
  }, [isVisible]);

  return <span>{count}{suffix}</span>;
};

export const ProblemStatementSection: FC<ProblemStatementSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative -mt-12 z-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50/50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
            The <span className="text-slate-700 dark:text-slate-300">Problem</span> with Current AI Tools
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Most professionals are stuck using consumer-grade AI interfaces that weren't designed for serious development work
          </p>
        </div>

        {/* Problem Identification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {/* Problem 1: No Structure */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-200`}>
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-orange-100/80 dark:bg-black/60 border border-orange-200/60 dark:border-red-700/60 hover:shadow-2xl hover:border-orange-300 dark:hover:border-red-500 transition-all duration-300 rounded-2xl hover:bg-orange-200/80 dark:hover:bg-black/80">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-200/80 dark:bg-red-800/80 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-300/80 dark:group-hover:bg-red-700/80 transition-colors duration-300 backdrop-blur-sm border border-orange-300/60 dark:border-red-600/60">
                <AlertTriangle size={32} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                No Structure or Organization
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Chat interfaces encourage one-off conversations without any way to organize, save, or systematically improve your prompts.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Lost conversations and prompts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">No reusable templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Constant reinvention of the wheel</span>
                </div>
              </div>
            </div>
            </div>
            
          {/* Problem 2: Limited Testing */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-400`}>
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-orange-100/80 dark:bg-black/60 border border-orange-200/60 dark:border-red-700/60 hover:shadow-2xl hover:border-orange-300 dark:hover:border-red-500 transition-all duration-300 rounded-2xl hover:bg-orange-200/80 dark:hover:bg-black/80">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-200/80 dark:bg-red-800/80 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-300/80 dark:group-hover:bg-red-700/80 transition-colors duration-300 backdrop-blur-sm border border-orange-300/60 dark:border-red-600/60">
                <Heart size={32} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                Single-Model Limitations
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Consumer tools lock you into one AI model, preventing you from finding the best AI for each specific task or use case.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">No model comparison</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Suboptimal results</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Vendor lock-in dependency</span>
                </div>
              </div>
            </div>
                </div>

          {/* Problem 3: No Analytics */}
          <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-600`}>
            <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-orange-100/80 dark:bg-black/60 border border-orange-200/60 dark:border-red-700/60 hover:shadow-2xl hover:border-orange-300 dark:hover:border-red-500 transition-all duration-300 rounded-2xl hover:bg-orange-200/80 dark:hover:bg-black/80">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-200/80 dark:bg-red-800/80 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-300/80 dark:group-hover:bg-red-700/80 transition-colors duration-300 backdrop-blur-sm border border-orange-300/60 dark:border-red-600/60">
                <AlertTriangle size={32} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                No Performance Insights
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                Without analytics or metrics, you can't improve systematically or prove ROI to stakeholders and clients.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">No quality metrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Can't track improvements</span>
                    </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">No ROI visibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        {/* Enterprise Solution Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-800`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                The Enterprise Solution
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Promptly addresses these fundamental limitations with professional-grade tooling
              </p>
                    </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Solution 1 */}
              <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl p-6 md:p-8 text-center">
                <Check size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 md:mb-4">
                  Organized Libraries
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Systematic organization with collections, tags, and version control for all your AI assets
                </p>
                  </div>
              
              {/* Solution 2 */}
              <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl p-6 md:p-8 text-center">
                <Check size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 md:mb-4">
                  Multi-Model Testing
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Test across GPT-4, Claude, Gemini, and more to find the optimal AI for each task
                </p>
              </div>

              {/* Solution 3 */}
              <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl p-6 md:p-8 text-center">
                <Check size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 md:mb-4">
                  Advanced Analytics
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Comprehensive metrics, performance tracking, and ROI analysis for data-driven optimization
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Showcase */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1000`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                The Cost of Inefficiency
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                See how much time and money professionals waste with amateur AI approaches
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <AlertTriangle size={40} className="text-orange-600 dark:text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">
                  <CountUp end={70} isVisible={isVisible} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Time Wasted on Recreation</div>
                </div>
              
              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <Heart size={40} className="text-orange-600 dark:text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">
                  <CountUp end={40} isVisible={isVisible} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Higher AI Costs</div>
              </div>

              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <AlertTriangle size={40} className="text-orange-600 dark:text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">
                  <CountUp end={60} isVisible={isVisible} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Inconsistent Quality</div>
              </div>

              <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl">
                <Heart size={40} className="text-orange-600 dark:text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">
                  <CountUp end={0} isVisible={isVisible} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">ROI Visibility</div>
              </div>
                    </div>
                      </div>
                    </div>

        {/* Solution Benefits */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1200`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                Transform Your AI Workflow
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Move from amateur experimentation to professional AI development
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Before */}
              <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200">Before: Amateur Approach</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Recreate prompts from memory</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Limited to one AI model</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">No quality measurements</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Trial and error optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">No team collaboration</span>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-white/15 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200">After: Professional Method</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Reusable template library</span>
                    </div>
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Multi-model testing and comparison</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Performance analytics and metrics</span>
              </div>
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Data-driven optimization</span>
                    </div>
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Enterprise team collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1400`}>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
              Stop Wasting Time on Amateur Tools
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Upgrade to professional AI development tools and see immediate improvements in quality, efficiency, and results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg shadow-sm transition-all duration-300">
                Start Professional Development
                <Check size={20} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                See the Difference
              </Button>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 