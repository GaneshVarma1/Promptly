import { FC } from "react";
import { Brain, Target, Zap, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WhyChooseSectionProps {
  isVisible: boolean;
}

export const WhyChooseSection: FC<WhyChooseSectionProps> = ({ isVisible }) => {
  return (
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
  );
}; 