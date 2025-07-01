import { FC, useState, useEffect } from "react";
import { ArrowRight, Save, TestTube, Database, BarChart3, Users, GitBranch, Target, Copy, Star, Zap, Brain, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import Silk from "@/components/ui/silk";

interface HeroSectionProps {
  isVisible: boolean;
  onPromptSubmit: (prompt: string) => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ isVisible, onPromptSubmit }) => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'professional'>('basic');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto-switch between demos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedDemo((prev) => (prev === 'basic' ? 'professional' : 'basic'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Initial check
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Check immediately and also after a small delay
          checkDarkMode();
          setTimeout(checkDarkMode, 100);
        }
      });
    });

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative z-10 min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8 md:py-12 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Silk Background with animated fade out */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        <Silk
          key={isDarkMode ? 'dark' : 'light'}
          speed={4}
          scale={1.1}
          color={isDarkMode ? "#212022" : "#f8fafc"}
          noiseIntensity={0.8}
          rotation={0}
        />
      </div>
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Beta Badge */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Badge variant="outline" className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2" />
              Beta • Enterprise Prompt Engineering Platform
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 md:mb-6 leading-tight tracking-tight px-4">
            <span className="inline-block overflow-hidden">
              <span className="inline-block animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                Promptly
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden">
              <span className="inline-block animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                AI
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden">
              <span className="inline-block animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
                Prompt
              </span>
            </span>
            <br />
            <span className="text-slate-700 dark:text-slate-300 inline-block overflow-hidden">
              <span className="inline-block animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
                Engineering Platform
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium px-4">
            The leading enterprise AI prompt engineering platform. Build, test, and optimize professional AI prompts with 
            <span className="text-slate-900 dark:text-slate-100 font-semibold"> systematic development tools</span>, analytics, and collaboration features.
          </p>
        </div>

        {/* Interactive Demo Toggle */}
        <div className="flex justify-center mb-8 md:mb-12 px-4">
          <div
            className="
              relative flex w-full sm:w-auto p-1
              rounded-full
              bg-white/60 dark:bg-black/40
              backdrop-blur-md
              border border-white/30 dark:border-white/10
              shadow-lg
              transition-all
              duration-300
            "
          >
            <button
              onClick={() => setSelectedDemo('basic')}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold flex-1 sm:flex-none transition-all duration-300 flex items-center gap-2
                ${selectedDemo === 'basic'
                  ? 'bg-gradient-to-tr from-red-100/80 via-white/80 to-red-50/80 dark:from-red-900/60 dark:via-black/60 dark:to-red-800/60 text-red-800 dark:text-red-200 shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-200'}
              `}
              style={{
                boxShadow: selectedDemo === 'basic'
                  ? '0 2px 12px 0 rgba(239,68,68,0.10)'
                  : undefined,
              }}
            >
              <span className={`w-2.5 h-2.5 rounded-full mr-1 ${selectedDemo === 'basic' ? 'bg-red-500 animate-blink' : 'bg-red-300 opacity-60'}`}></span>
              Basic Consumer Approach
            </button>
            <button
              onClick={() => setSelectedDemo('professional')}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold flex-1 sm:flex-none transition-all duration-300 flex items-center gap-2
                ${selectedDemo === 'professional'
                  ? 'bg-gradient-to-tr from-sky-100/80 via-white/80 to-sky-50/80 dark:from-sky-900/60 dark:via-black/60 dark:to-sky-800/60 text-sky-800 dark:text-sky-200 shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-200'}
              `}
              style={{
                boxShadow: selectedDemo === 'professional'
                  ? '0 2px 12px 0 rgba(56,189,248,0.10)'
                  : undefined,
              }}
            >
              <span className={`w-2.5 h-2.5 rounded-full mr-1 ${selectedDemo === 'professional' ? 'bg-sky-500 animate-blink' : 'bg-sky-300 opacity-60'}`}></span>
              Enterprise Platform
            </button>
          </div>
        </div>

        {/* Demo Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-16 px-4">
          {/* Basic ChatGPT Style Demo */}
          <div className={`transition-all duration-500 ${selectedDemo === 'basic' ? 'opacity-100 scale-100' : selectedDemo === 'professional' ? 'opacity-60 scale-98' : 'opacity-100 scale-100'}`}>
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8 h-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200">Consumer Chat Interface</h3>
                <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 dark:border-orange-700 dark:text-orange-400">Limited</Badge>
              </div>
              
              {/* Mock Chat Interface */}
              <div className="bg-white/20 dark:bg-black/20 rounded-lg border border-white/30 dark:border-white/20 p-4 md:p-6 mb-4 md:mb-6 backdrop-blur-sm shadow-lg">
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-3 md:p-4 text-sm backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <div className="text-slate-500 dark:text-slate-400 text-xs mb-2 font-medium">User Input:</div>
                    <div className="text-slate-800 dark:text-slate-200 text-sm">"Write an email to my team about the project update"</div>
                  </div>
                  <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-lg p-3 md:p-4 text-sm backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <div className="text-slate-600 dark:text-slate-400 text-xs mb-2 font-medium">AI Response:</div>
                    <div className="text-slate-700 dark:text-slate-300 font-mono text-xs leading-relaxed">
                      Subject: Project Update<br/><br/>
                      Hi team,<br/><br/>
                      I wanted to give you an update on our project...
                    </div>
                  </div>
                </div>
              </div>

              {/* Limitations List */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Limitations</h4>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span>No persistent storage or organization</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span>Cannot iterate or improve systematically</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span>Single model testing only</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span>No performance metrics or analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Promptly Demo */}
          <div className={`transition-all duration-500 ${selectedDemo === 'professional' ? 'opacity-100 scale-100' : selectedDemo === 'basic' ? 'opacity-60 scale-98' : 'opacity-100 scale-100'}`}>
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8 h-full shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200">Promptly Enterprise</h3>
                <Badge variant="default" className="text-xs bg-emerald-600 hover:bg-emerald-700">Professional</Badge>
              </div>
              
              {/* Mock Promptly Interface */}
              <div className="bg-white/20 dark:bg-black/20 rounded-lg border border-white/30 dark:border-white/20 p-4 md:p-6 mb-4 md:mb-6 backdrop-blur-sm shadow-lg">
                <div className="space-y-3 md:space-y-4">
                  {/* Prompt with metadata */}
                  <div className="border border-white/30 dark:border-white/20 rounded-lg p-3 md:p-4 text-sm backdrop-blur-sm bg-white/10 dark:bg-black/10">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wider">TEMPLATE v2.1</span>
                        <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">Email Communication</Badge>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                        <Save className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                        <Copy className="w-3 h-3 md:w-4 md:h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-slate-50/50 dark:bg-slate-800/50 p-2 md:p-3 rounded border border-white/20 dark:border-white/10 text-slate-700 dark:text-slate-300 leading-relaxed backdrop-blur-sm">
                      "Draft a &#123;EMAIL_TYPE&#125; email for my &#123;TEAM_SIZE&#125; &#123;TEAM_ROLE&#125; team regarding &#123;PROJECT_NAME&#125;. Include: &#123;KEY_POINTS&#125;. Tone: &#123;COMMUNICATION_STYLE&#125;"
                    </div>
                  </div>

                  {/* Multi-model results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg p-2 md:p-3 text-xs border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">GPT-4: 9.2/10</div>
                      <div className="text-emerald-600 dark:text-emerald-400">Professional, structured</div>
                    </div>
                    <div className="bg-slate-50/50 dark:bg-slate-950/30 rounded-lg p-2 md:p-3 text-xs border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
                      <div className="font-semibold text-slate-700 dark:text-slate-400 mb-1">Claude: 8.8/10</div>
                      <div className="text-slate-600 dark:text-slate-400">Detailed, empathetic</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Enterprise Capabilities</h4>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <Database className="w-3 h-3 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Organized in "Communication Templates" library</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <GitBranch className="w-3 h-3 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Version controlled with change tracking</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <TestTube className="w-3 h-3 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Tested across multiple AI models</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Performance analytics and optimization</span>
                </div>
              </div>
              <BorderBeam duration={10} size={380} colorFrom="#38bdf8" colorTo="#a5b4fc" />
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 px-4">
          {/* Feature 1: Develop */}
          <div className="group p-4 md:p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BorderBeam duration={8} size={120} colorFrom="#38bdf8" colorTo="#a5b4fc" />
            </div>
            <div className="text-center space-y-3 md:space-y-4 relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center mx-auto group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50 transition-colors duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <GitBranch className="w-5 h-5 md:w-7 md:h-7 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 md:mb-2 text-sm md:text-base">
                  Develop
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Build with templates and variables
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Store */}
          <div className="group p-4 md:p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BorderBeam duration={8} size={120} colorFrom="#34d399" colorTo="#6ee7b7" />
            </div>
            <div className="text-center space-y-3 md:space-y-4 relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center mx-auto group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50 transition-colors duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <Database className="w-5 h-5 md:w-7 md:h-7 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 md:mb-2 text-sm md:text-base">
                  Organize
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Library with version control
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Test */}
          <div className="group p-4 md:p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BorderBeam duration={8} size={120} colorFrom="#f59e42" colorTo="#fbbf24" />
            </div>
            <div className="text-center space-y-3 md:space-y-4 relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center mx-auto group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50 transition-colors duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <TestTube className="w-5 h-5 md:w-7 md:h-7 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 md:mb-2 text-sm md:text-base">
                  Test
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Compare across AI models
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Analyze */}
          <div className="group p-4 md:p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BorderBeam duration={8} size={120} colorFrom="#f472b6" colorTo="#a78bfa" />
            </div>
            <div className="text-center space-y-3 md:space-y-4 relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center mx-auto group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50 transition-colors duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <BarChart3 className="w-5 h-5 md:w-7 md:h-7 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 md:mb-2 text-sm md:text-base">
                  Optimize
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Performance analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                  
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white flex items-center transition-all duration-300"
              onClick={() => window.location.href = "/sign-in"}
            >
              Start Professional Development
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
          
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            • Enterprise-grade security • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}; 