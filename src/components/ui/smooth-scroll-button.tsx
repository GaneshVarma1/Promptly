'use client';

import { Button } from '@/components/ui/button';
import { useLenis } from '@/hooks/useLenis';
import { ChevronDown } from 'lucide-react';

interface SmoothScrollButtonProps {
  target: string | number;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const SmoothScrollButton: React.FC<SmoothScrollButtonProps> = ({
  target,
  children,
  className,
  variant = 'default',
  size = 'default',
}) => {
  const lenis = useLenis();

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback to native smooth scroll
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
};

// Convenience component for scrolling down
export const ScrollDownButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <SmoothScrollButton
      target={window.innerHeight}
      className={className}
      variant="ghost"
      size="icon"
    >
      <ChevronDown className="h-6 w-6" />
    </SmoothScrollButton>
  );
}; 