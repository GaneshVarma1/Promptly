import { FC } from "react";
import { MessageSquare, Clock, Lightbulb, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

export const HowItWorksSection: FC<HowItWorksSectionProps> = ({ isVisible }) => {
  return (
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
  );
}; 