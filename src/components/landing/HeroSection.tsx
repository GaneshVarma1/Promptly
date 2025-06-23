import { FC } from "react";
import { PromptlyChat } from "@/components/ui/promptly-chat";

interface HeroSectionProps {
  isVisible: boolean;
  onPromptSubmit: (prompt: string) => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ isVisible, onPromptSubmit }) => {
  return (
    <div className={`relative z-10 min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="w-full max-w-5xl mx-auto">
        <PromptlyChat onPromptSubmit={onPromptSubmit} />
      </div>
    </div>
  );
}; 