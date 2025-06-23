import { FC } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export const AnimatedBackground: FC = () => {
  return (
    <>
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
    </>
  );
}; 