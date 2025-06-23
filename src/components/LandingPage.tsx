import { FC } from "react";
import { PromptlyChat } from "@/components/ui/promptly-chat";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

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
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full bg-background relative flex items-center justify-center py-8">
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
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <PromptlyChat onPromptSubmit={onPromptSubmit} />
      </div>
    </div>
  );
};

export default LandingPage;
