import { FC, useEffect, useState } from "react";
import {
  HeroSection,
  ProblemStatementSection,
  WhyChooseSection,
  HowItWorksSection,
  BenefitsSection,
  AnimatedBackground
} from "@/components/landing";

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
      <AnimatedBackground />
      
      <HeroSection isVisible={isVisible} onPromptSubmit={onPromptSubmit} />
      
      <ProblemStatementSection isVisible={isVisible} />
      
      <WhyChooseSection isVisible={isVisible} />
      
      <HowItWorksSection isVisible={isVisible} />
      
      <BenefitsSection isVisible={isVisible} onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;
