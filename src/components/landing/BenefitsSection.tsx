import { FC } from "react";
import { Activity, Lock, Star, Heart, ArrowUp, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface BenefitsSectionProps {
  isVisible: boolean;
}

export const BenefitsSection: FC<BenefitsSectionProps> = ({ isVisible }) => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      {/* Removed the top gradient overlay for smooth Silk blend */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative bg-white/80 dark:bg-black/90">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
              Professional <span className="text-slate-700 dark:text-slate-300">Benefits</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real advantages that separate professional AI developers from casual users
            </p>
          </div>

          {/* Professional Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
            {/* Benefit 1: Consistent Results */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-200`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <Activity size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Consistent Results
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Eliminate the variability of ad-hoc prompting with systematic, tested templates that deliver reliable outputs every time.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Standardized prompt patterns</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Quality control frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Validated performance metrics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 2: Time Efficiency */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-400`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <ArrowUp size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Time Efficiency
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Skip the trial-and-error phase with pre-built, optimized templates. Start with proven patterns instead of building from scratch.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Ready-to-use templates</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Rapid deployment workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Automated optimization tools</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 3: Enterprise Security */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-600`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <Lock size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Enterprise Security
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Professional-grade security and compliance features that protect your intellectual property and sensitive data.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">SOC 2 Type II compliance</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Private cloud deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Audit logs and monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 4: Team Collaboration */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-800`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <Heart size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Team Collaboration
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Share templates, collaborate on improvements, and maintain organizational knowledge with advanced team features.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Shared libraries and collections</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Permission management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Team analytics dashboard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 5: Cost Optimization */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1000`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <Star size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Cost Optimization
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Reduce AI usage costs through optimized prompts and smart model selection. Track ROI with detailed analytics.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Usage analytics and insights</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Model cost comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">ROI tracking and reporting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 6: Professional Growth */}
            <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1200`}>
              <div className="p-6 md:p-8 h-full backdrop-blur-xl bg-white/25 dark:bg-black/70 border border-slate-200 dark:border-white/20 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 rounded-2xl hover:bg-white/35 dark:hover:bg-black/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 transition-colors duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/20">
                  <Eye size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                  Professional Growth
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                  Develop advanced AI engineering skills that distinguish you in the market. Learn from best practices and proven patterns.
                </p>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Professional certification path</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Industry best practices library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">Expert community access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Excellence Comparison */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1400`}>
            <div className="backdrop-blur-xl bg-white/25 dark:bg-black/25 border border-white/35 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                  Technical Excellence Comparison
                </h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  See how professional tooling elevates your AI development capabilities
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Consumer Approach */}
                <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <h4 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200">Consumer Approach</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">One-off prompting without structure</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">No version control or iteration tracking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Limited to single AI model testing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">No performance metrics or optimization</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 text-lg mt-0.5">✗</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Inconsistent results and quality</span>
                    </div>
                  </div>
                </div>
                
                {/* Professional Approach */}
                <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <h4 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200">Professional Approach</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Systematic template-based development</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Git-style version control with change tracking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Multi-model testing and comparison</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Advanced analytics and optimization tools</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Reproducible, enterprise-grade results</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1600`}>
            <div className="backdrop-blur-xl bg-white/25 dark:bg-black/25 border border-white/35 dark:border-white/20 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-2xl">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
                  Return on Investment
                </h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Quantifiable benefits that justify the investment in professional AI tooling
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl">
                  <ArrowUp size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">75%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Development Time Reduction</div>
                </div>
                
                <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl">
                  <Activity size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">4x</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Output Quality Improvement</div>
                </div>
                
                <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl">
                  <Star size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">60%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">AI Cost Reduction</div>
                </div>
                
                <div className="text-center p-4 md:p-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-xl">
                  <Heart size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 md:mb-2">95%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Team Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1800`}>
            <div className="backdrop-blur-xl bg-white/25 dark:bg-black/25 border border-white/35 dark:border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 tracking-tight">
                Start Your Professional AI Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join the professionals who've upgraded from basic prompting to systematic AI development
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg shadow-sm transition-all duration-300"
                  onClick={() => router.push("/sign-in")}
                >
                  Get Started Free
                  <ArrowUp size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 