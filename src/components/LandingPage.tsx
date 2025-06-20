import { FC } from "react";
import { PromptlyChat } from "@/components/ui/promptly-chat";

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
    <div className="min-h-[calc(100vh-4rem)] w-full bg-background flex items-center justify-center py-8">
      <PromptlyChat onPromptSubmit={onPromptSubmit} />
    </div>
  );
};

export default LandingPage;
