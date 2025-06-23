import { FC, useEffect, useState } from "react";
import { PromptlyChat } from "@/components/ui/promptly-chat";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  MessageSquare,
  Clock,
  Award
} from "lucide-react";

/**
 * Props for the LandingPage component.
 */
export interface LandingPageProps {
  onGetStarted: () => void;
  onPromptSubmit: (prompt: string) => void;
}

/**
 * Landing page with hero, features, and CTA.
 * Handles prompt input and demo navigation.
 */
const LandingPage: FC<LandingPageProps> = ({ onGetStarted, onPromptSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="rgb(107, 114, 128)" // gray-500 for light mode
        maxOpacity={0.1}
        flickerChance={0.05}
      />
      
      {/* Dark mode grid overlay */}
      <FlickeringGrid
        className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
        squareSize={4}
        gridGap={6}
        color="rgb(156, 163, 175)" // gray-400 for dark mode
        maxOpacity={0.15}
        flickerChance={0.08}
      />


      
      {/* Hero Section */}
      <div className={`relative z-10 min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full max-w-5xl mx-auto">
          <PromptlyChat onPromptSubmit={onPromptSubmit} />
        </div>
      </div>

      {/* Problem Statement & Solution Section */}
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

      {/* Why Choose Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-foreground font-sussie mb-4 hover:scale-105 transition-transform duration-300">
              Why Choose This Tool?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't become another casualty of poor AI practices. Master strategic prompting to future-proof your career and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards with stagger animation */}
            <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-950/40 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Brain className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-sussie group-hover:text-blue-600 transition-colors duration-300">
                  End Shallow Prompting
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                Move beyond basic "write this email" requests. Our analysis ensures your prompts include critical business context, specific requirements, and measurable outcomes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Real-time scoring system
                </li>
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Multi-model compatibility
                </li>
              </ul>
            </Card>

            <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:border-green-300 dark:hover:border-green-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-950/40 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Target className="w-6 h-6 text-green-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-sussie group-hover:text-green-600 transition-colors duration-300">
                  Build Critical Thinking
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                Don't just use AI—understand it. Learn to craft prompts that encourage deeper analysis, challenge assumptions, and produce thoughtful, nuanced responses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Detailed improvement suggestions
                </li>
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Context-aware recommendations
                </li>
              </ul>
            </Card>

            <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-900`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-950/40 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-sussie group-hover:text-purple-600 transition-colors duration-300">
                  Professional Development
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                Accelerate your career with advanced AI skills. Master sophisticated prompting techniques that set you apart in a competitive job market.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Multiple rewrite variations
                </li>
                <li className="flex items-center text-sm text-muted-foreground group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Performance tracking
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What It Does Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-foreground font-sussie mb-4 hover:scale-105 transition-transform duration-300">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive analysis process ensures your prompts achieve maximum effectiveness across all AI models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Process Steps */}
            <div className="space-y-8">
              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-500`}>
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-950/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-950/40 transition-all duration-300 group-hover:animate-bounce">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Submit Your Prompt
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Paste or type your prompt into our intelligent analyzer. Our system accepts prompts of any length and complexity.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-700`}>
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-950/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-green-200 dark:group-hover:bg-green-950/40 transition-all duration-300 group-hover:animate-bounce">
                  <span className="text-sm font-semibold text-green-600">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-green-600 transition-colors duration-300">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Multiple AI models evaluate your prompt across key metrics: clarity, context, format, and overall effectiveness.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-900`}>
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-950/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-950/40 transition-all duration-300 group-hover:animate-bounce">
                  <span className="text-sm font-semibold text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    Get Detailed Results
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Receive comprehensive scores, specific improvement suggestions, and optimized prompt rewrites.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-1100`}>
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-950/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-200 dark:group-hover:bg-orange-950/40 transition-all duration-300 group-hover:animate-bounce">
                  <span className="text-sm font-semibold text-orange-600">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Implement & Track
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Use the optimized prompts and track their performance. Save successful prompts for future reference.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className={`group p-4 bg-card border border-border text-center hover:shadow-lg hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:animate-bounce group-hover:scale-110 transition-all duration-300" />
                <h4 className="font-semibold text-foreground font-sussie mb-2 group-hover:text-blue-600 transition-colors duration-300">Multi-Model Testing</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Test across 8+ AI models simultaneously</p>
              </Card>

              <Card className={`group p-4 bg-card border border-border text-center hover:shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer hover:border-green-300 dark:hover:border-green-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:animate-spin group-hover:scale-110 transition-all duration-300" />
                <h4 className="font-semibold text-foreground font-sussie mb-2 group-hover:text-green-600 transition-colors duration-300">Real-Time Analysis</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Get results in seconds, not minutes</p>
              </Card>

              <Card className={`group p-4 bg-card border border-border text-center hover:shadow-lg hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-900`}>
                <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
                <h4 className="font-semibold text-foreground font-sussie mb-2 group-hover:text-purple-600 transition-colors duration-300">Smart Suggestions</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">AI-generated improvement recommendations</p>
              </Card>

              <Card className={`group p-4 bg-card border border-border text-center hover:shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer hover:border-orange-300 dark:hover:border-orange-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1100`}>
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-3 group-hover:animate-bounce group-hover:scale-110 transition-all duration-300" />
                <h4 className="font-semibold text-foreground font-sussie mb-2 group-hover:text-orange-600 transition-colors duration-300">Performance Scores</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Detailed metrics and benchmarks</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-foreground font-sussie mb-4 hover:scale-105 transition-transform duration-300">
              Don't Let AI Trends Derail Your Career
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Industry leaders are raising concerns about shallow prompting and over-reliance on AI. Position yourself as someone who uses AI strategically, not as a crutch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Benefits */}
            <div className="space-y-6">
              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-500`}>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Avoid Career-Limiting Mistakes
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Shallow prompting is becoming a red flag for employers. Demonstrate advanced AI literacy and avoid being seen as someone who lacks critical thinking skills.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-700`}>
                <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg flex-shrink-0 group-hover:bg-green-100 dark:group-hover:bg-green-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Clock className="w-6 h-6 text-green-600 group-hover:animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-green-600 transition-colors duration-300">
                    Create Business-Context Prompts
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Learn to include company history, industry dynamics, and strategic context in your prompts. Generate AI responses that understand your business environment.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-900`}>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex-shrink-0 group-hover:bg-purple-100 dark:group-hover:bg-purple-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Shield className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    Professional Results
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Ensure consistent, professional-quality outputs across all your AI interactions with scientifically-backed optimization techniques.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-1100`}>
                <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex-shrink-0 group-hover:bg-orange-100 dark:group-hover:bg-orange-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="w-6 h-6 text-orange-600 group-hover:animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Future-Proof Your Skills
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    As AI becomes ubiquitous, the ability to prompt effectively will separate the leaders from the followers. Master advanced techniques now before they become table stakes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-125 group-hover:animate-pulse transition-all duration-300">8+</div>
                  <div className="text-sm font-medium text-foreground mb-1 group-hover:text-blue-600 transition-colors duration-300">AI Models</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Comprehensive cross-model analysis
                  </div>
                </div>
              </Card>

              <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer hover:border-green-300 dark:hover:border-green-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-125 group-hover:animate-bounce transition-all duration-300">90%</div>
                  <div className="text-sm font-medium text-foreground mb-1 group-hover:text-green-600 transition-colors duration-300">Improvement Rate</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Users see better AI responses
                  </div>
                </div>
              </Card>

              <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-900`}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-125 group-hover:animate-pulse transition-all duration-300">&lt;5s</div>
                  <div className="text-sm font-medium text-foreground mb-1 group-hover:text-purple-600 transition-colors duration-300">Analysis Time</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Instant feedback and optimization
                  </div>
                </div>
              </Card>

              <Card className={`group p-6 bg-card border border-border hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer hover:border-orange-300 dark:hover:border-orange-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1100`}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-125 group-hover:animate-bounce transition-all duration-300">10+</div>
                  <div className="text-sm font-medium text-foreground mb-1 group-hover:text-orange-600 transition-colors duration-300">Metrics Analyzed</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Comprehensive scoring system
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-foreground font-sussie mb-4 hover:scale-105 transition-transform duration-300">
            Master Advanced Prompting Before It's Too Late
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While others fall behind with shallow prompting habits, gain the competitive edge with sophisticated AI communication skills that impress employers and deliver exceptional results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 group-hover:animate-pulse transition-all duration-300" />
            </button>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="px-3 py-1 hover:scale-110 hover:bg-green-100 dark:hover:bg-green-950/20 hover:text-green-700 dark:hover:text-green-400 transition-all duration-300 cursor-pointer">
                Free to Try
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer">
                No Credit Card
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:scale-110 hover:bg-purple-100 dark:hover:bg-purple-950/20 hover:text-purple-700 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer">
                Instant Results
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
