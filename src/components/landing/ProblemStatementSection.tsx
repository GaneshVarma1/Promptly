import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProblemStatementSectionProps {
  isVisible: boolean;
}

export const ProblemStatementSection: FC<ProblemStatementSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Problem Statement */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-sussie mb-6 hover:scale-105 transition-transform duration-300 leading-tight">
            Stop Wasting Time with <span className="text-red-600 relative">Shallow Prompting</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            While others struggle with generic, ineffective prompts, you'll master the art of precise AI communication that delivers professional-grade results every time.
          </p>
        </div>

        {/* Before vs After Comparison - Enhanced Professional Design */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} lg:items-start`}>
          {/* BEFORE - Poor Example */}
          <div className="relative group h-full">
            {/* Futuristic Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500 opacity-60 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl transform group-hover:scale-[1.02] transition-all duration-500"></div>
            
            {/* Futuristic Grid Pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            <Card className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-2 border-red-200/50 dark:border-red-800/50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
              {/* Status Badge - Mobile Responsive */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10">
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-red-50/95 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>AVOID</span>
                </div>
              </div>

              {/* Warning Icon */}
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-full group-hover:animate-pulse">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-700 dark:text-red-400 font-sussie">
                  Shallow Prompting
                </h3>
              </div>

              {/* Prompt Example */}
              <div className="mb-4 sm:mb-6 relative">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 sm:p-4 lg:p-6 rounded-lg border border-red-200/50 dark:border-red-700/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs sm:text-sm font-bold">✗</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-red-700 dark:text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2">Poor Example</div>
                      <div className="font-mono text-xs sm:text-sm text-muted-foreground italic leading-relaxed bg-white dark:bg-zinc-900 p-2 sm:p-3 rounded border border-red-200/30 dark:border-red-700/30 break-words">
                        "Write an email to my team about the project update"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues List */}
              <div className="space-y-3 flex-1">
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide">Critical Issues</h4>
                {[
                  'No context or specifics provided',
                  'Vague, unfocused output expected',
                  'Requires multiple revision cycles',
                  'Unprofessional, generic results'
                ].map((issue, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-red-600 dark:text-red-400 transform group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div className="flex-shrink-0 w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>

              {/* Quality Score */}
              <div className="mt-6 pt-6 border-t border-red-200/50 dark:border-red-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">Quality Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                      <div className="w-3 h-full bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-red-600">2/10</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AFTER - Good Example */}
          <div className="relative group h-full">
            {/* Futuristic Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500 opacity-60 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl transform group-hover:scale-[1.02] transition-all duration-500"></div>
            
            {/* Futuristic Grid Pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            <Card className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-2 border-green-200/50 dark:border-green-800/50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
              {/* Status Badge - Mobile Responsive */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10">
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-green-50/95 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">RECOMMENDED</span>
                  <span className="sm:hidden">✓ GOOD</span>
                </div>
              </div>

              {/* Success Icon */}
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:animate-pulse">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700 dark:text-green-400 font-sussie">
                  Strategic Prompting
                </h3>
              </div>

              {/* Prompt Example */}
              <div className="mb-4 sm:mb-6 relative">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 sm:p-4 lg:p-6 rounded-lg border border-green-200/50 dark:border-green-700/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs sm:text-sm font-bold">✓</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-green-700 dark:text-green-400 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2">Best Practice</div>
                      <div className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed bg-white dark:bg-zinc-900 p-2 sm:p-3 lg:p-4 rounded border border-green-200/30 dark:border-green-700/30 break-words">
                        "Draft a project status email for my development team (8 engineers) about our Q4 mobile app release. Include: current sprint progress, 3 key blockers we resolved this week, upcoming milestone deadlines, and action items for each team member. Tone: professional but encouraging, as we're slightly behind schedule but making good progress."
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 flex-1">
                <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Key Strengths</h4>
                {[
                  'Specific context & target audience',
                  'Clear structure & requirements',
                  'Defined tone & communication style',
                  'Professional, ready-to-use output'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-green-600 dark:text-green-400 transform group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Quality Score */}
              <div className="mt-6 pt-6 border-t border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Quality Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div className="w-14 h-full bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">9/10</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="p-6 text-center bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">5x</div>
            <div className="text-sm font-medium text-foreground mb-1">Better Results</div>
            <div className="text-xs text-muted-foreground">With structured prompts</div>
          </Card>
          <Card className="p-6 text-center bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">80%</div>
            <div className="text-sm font-medium text-foreground mb-1">Less Revision</div>
            <div className="text-xs text-muted-foreground">Time saved on edits</div>
          </Card>
          <Card className="p-6 text-center bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
            <div className="text-sm font-medium text-foreground mb-1">Satisfaction Rate</div>
            <div className="text-xs text-muted-foreground">User reported improvement</div>
          </Card>
        </div>

        {/* Call to Action for This Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to upgrade from shallow prompting to strategic AI communication?
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-300">
            <span className="text-sm font-medium">Try the analyzer below and see the difference</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
}; 