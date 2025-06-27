'use client';

import { useLenis } from '@/hooks/useLenis';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const SmoothScrollTest: React.FC = () => {
  const lenis = useLenis();

  const testScroll = () => {
    if (lenis) {
      console.log('Testing smooth scroll with Lenis');
      lenis.scrollTo(500, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      console.log('Lenis not available, using native scroll');
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (lenis) {
      lenis.scrollTo(document.body.scrollHeight, { duration: 2 });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        onClick={testScroll}
        size="sm"
        className="bg-blue-600 hover:bg-blue-700"
      >
        Test Scroll
      </Button>
      <Button
        onClick={scrollToTop}
        size="sm"
        className="bg-green-600 hover:bg-green-700"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button
        onClick={scrollToBottom}
        size="sm"
        className="bg-purple-600 hover:bg-purple-700"
      >
        <ArrowDown className="w-4 h-4" />
      </Button>
      <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
        Lenis: {lenis ? '✅' : '❌'}
      </div>
    </div>
  );
}; 