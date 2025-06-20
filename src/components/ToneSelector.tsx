import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Building, Palette } from "lucide-react";

/**
 * Supported tone values for prompt editing.
 */
export type Tone = "friendly" | "formal" | "creative";

/**
 * Props for the ToneSelector component.
 */
export interface ToneSelectorProps {
  tone: Tone;
  onToneChange: (tone: Tone) => void;
}

/**
 * Tone selector for prompt editing. Allows switching between friendly, formal, and creative tones.
 */
const ToneSelector: FC<ToneSelectorProps> = ({ tone, onToneChange }) => {
  const tones = [
    { value: "friendly" as const, label: "Friendly", icon: Smile },
    { value: "formal" as const, label: "Formal", icon: Building },
    { value: "creative" as const, label: "Creative", icon: Palette },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-white">Tone:</span>
      <div className="flex space-x-1">
        {tones.map((t) => {
          const Icon = t.icon;
          const isActive = tone === t.value;
          return (
            <Button
              key={t.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onToneChange(t.value)}
              className={`text-xs border-zinc-800 rounded-lg px-3 py-1 transition-colors
                ${isActive ? "bg-white text-black" : "bg-black text-white hover:bg-zinc-900"}
              `}
              aria-pressed={isActive}
              aria-label={`Set tone to ${t.label}`}
            >
              <Icon className={`w-3 h-3 mr-1 ${isActive ? "text-black" : "text-white"}`} />
              {t.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ToneSelector;
