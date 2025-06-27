'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with basic configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      // Prevent Lenis from interfering with nested scrolling containers
      prevent: (node) => {
        // Check if the element or any of its parents has overflow-y-auto
        let current = node;
        while (current && current !== document.body) {
          const style = window.getComputedStyle(current);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            console.log('Lenis prevented on element:', current);
            return true; // Prevent Lenis from controlling this element
          }
          current = current.parentElement;
        }
        return false;
      },
    });

    // Make Lenis globally accessible
    (window as any).lenis = lenisRef.current;

    console.log('Lenis initialized successfully');

    // RAF loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Optional: Log scroll events for debugging
    lenisRef.current.on('scroll', (e: any) => {
      // You can add custom scroll handling here if needed
      // console.log('Scroll event:', e);
    });

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        delete (window as any).lenis;
        console.log('Lenis destroyed');
      }
    };
  }, []);

  return <>{children}</>;
}; 