'use client';

import { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "./ui/theme-switcher";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * App header with logo and status.
 * Sticky, responsive, and accessible.
 */
const Header: FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [clerkError, setClerkError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    
    // Check if Clerk is properly configured
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      console.error('❌ Clerk publishable key is missing!');
      setClerkError(true);
    }
  }, []);

  // Show error state if Clerk is not configured
  if (clerkError) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white font-league-spartan">Promptly.</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </Link>
          <div className="text-red-600 dark:text-red-400 text-sm">
            Authentication Error - Check Configuration
          </div>
        </div>
      </header>
    );
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground font-league-spartan">
              Promptly.
            </span>
          </Link>
        </div>
        
        {/* Mobile logo */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-base font-bold text-foreground font-league-spartan">
              Promptly.
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-6">
              {isSignedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/prompt-gallery" 
                    className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Gallery
                  </Link>
                  <Link 
                    href="/dashboard/saved" 
                    className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Saved
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs px-2 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                Beta
              </Badge>
            </div>
            {!isSignedIn ? (
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size={isMobile ? "sm" : "sm"} className="text-xs sm:text-sm px-2.5 sm:px-3">
                    {isMobile ? "Sign In" : "Sign In"}
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size={isMobile ? "sm" : "sm"} className="text-xs sm:text-sm px-2.5 sm:px-3">
                    {isMobile ? "Sign Up" : "Sign Up"}
                  </Button>
                </SignUpButton>
              </div>
            ) : (
              <UserButton 
                afterSignOutUrl="/"
              />
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
