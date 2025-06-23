import { FC } from "react";
import { TrendingUp, Clock, Shield, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GradientButton } from "../ui/gradient-button";

interface BenefitsSectionProps {
  isVisible: boolean;
  onGetStarted: () => void;
}

export const BenefitsSection: FC<BenefitsSectionProps> = ({ isVisible, onGetStarted }) => {
  return (
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
                  Save Time, Improve Efficiency
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Well-crafted prompts reduce back-and-forth iterations, saving you hours of revision time and delivering better results on the first try.
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-900`}>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex-shrink-0 group-hover:bg-purple-100 dark:group-hover:bg-purple-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Shield className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  Future-Proof Your Skills
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  As AI becomes ubiquitous, advanced prompting skills will become essential. Learn the strategic approaches that will set you apart tomorrow.
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-1100`}>
              <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex-shrink-0 group-hover:bg-orange-100 dark:group-hover:bg-orange-950/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Users className="w-6 h-6 text-orange-600 group-hover:animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground font-sussie mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  Gain Competitive Advantage
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  While others rely on basic prompts, you'll have access to advanced techniques that produce superior results and professional-quality outputs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <Card className={`p-6 bg-card border border-border text-center hover:shadow-lg hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
              <div className="text-4xl font-bold text-blue-600 mb-2 hover:scale-110 transition-transform duration-300">90%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Improvement Rate</div>
              <div className="text-sm text-muted-foreground">Users report better AI outputs after using our analysis</div>
            </Card>

            <Card className={`p-6 bg-card border border-border text-center hover:shadow-lg hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
              <div className="text-4xl font-bold text-green-600 mb-2 hover:scale-110 transition-transform duration-300">5s</div>
              <div className="text-lg font-semibold text-foreground mb-2">Analysis Time</div>
              <div className="text-sm text-muted-foreground">Get comprehensive feedback in seconds</div>
            </Card>

            <Card className={`p-6 bg-card border border-border text-center hover:shadow-lg hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-900`}>
              <div className="text-4xl font-bold text-purple-600 mb-2 hover:scale-110 transition-transform duration-300">8+</div>
              <div className="text-lg font-semibold text-foreground mb-2">AI Models</div>
              <div className="text-sm text-muted-foreground">Cross-model compatibility testing</div>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-foreground font-sussie mb-4 hover:scale-105 transition-transform duration-300">
            Optimize Your AI Workflows Today
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their AI communication. Start analyzing your prompts now and see the difference strategic prompting makes.
          </p>

                     <GradientButton
             onClick={onGetStarted}
             className="group inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-white dark:text-white rounded-md sm:rounded-lg font-medium sm:font-semibold text-sm sm:text-base lg:text-lg hover:scale-105 hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 w-full sm:w-auto justify-center"
           >
             <span className="hidden sm:inline">Get Started Free</span>
             <span className="sm:hidden">Start Free</span>
             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
           </GradientButton>
        </div>
      </div>
    </section>
  );
}; 