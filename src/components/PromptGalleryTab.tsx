"use client";

import { GradientButton } from "@/components/ui/gradient-button";
import { Sparkles } from "lucide-react";

export default function PromptGalleryTab() {
  return (
    <div className="h-screen w-full bg-white dark:bg-black relative overflow-hidden">
      {/* Grid background - light mode (grey lines) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(107, 114, 128, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 114, 128, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Grid background - dark mode (white lines) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Coming Soon content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Icon with gradient */}
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
              <path 
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
                fill="url(#sparkleGradient)"
              />
            </svg>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-sussie">
            Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We're building a comprehensive prompt gallery to enhance your writing workflow.
          </p>
          
          {/* CTA Button */}
          <GradientButton className="px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Notify Me
          </GradientButton>

          {/* Additional info */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Be the first to know when it launches
          </p>
        </div>
      </div>
    </div>
  );
} 