'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the Lenis instance from the window object
    // This assumes Lenis is initialized globally
    const lenis = (window as any).lenis;
    if (lenis) {
      lenisRef.current = lenis;
    }
  }, []);

  return lenisRef.current;
}; 