'use client';

import { FC } from "react";
import { ThemeSwitcher } from "./ui/theme-switcher";
import Link from "next/link";
import { Badge } from "./ui/badge";
import dynamic from 'next/dynamic';
const SignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), { ssr: false });
const SignUpButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignUpButton), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from '@clerk/nextjs';

/**
 * App header with logo and status.
 * Sticky, responsive, and accessible with glass effect.
 */
const Header: FC = () => {
  const { isSignedIn } = useUser();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 dark:bg-black backdrop-blur-xl supports-[backdrop-filter]:bg-white/5 dark:supports-[backdrop-filter]:bg-black">
      <div className="container flex h-12 sm:h-14 max-w-screen-2xl items-center px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop Logo */}
        <div className="mr-3 sm:mr-4 hidden md:flex">
          <Link href="/" className="mr-4 sm:mr-6 flex items-center space-x-2">
            <span className="text-base sm:text-lg font-bold text-foreground font-league-spartan">
              Promptly.
            </span>
          </Link>
        </div>
        
        {/* Mobile/Tablet Logo */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-sm sm:text-base font-bold text-foreground font-league-spartan">
              Promptly.
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1.5 sm:space-x-2 md:space-x-3">
          {/* Beta Badge - Hidden on very small screens */}
          <div className="hidden sm:flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-white/20 dark:bg-black/20 border-white/20 dark:border-black/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
              Beta
            </Badge>
          </div>

          {/* Authentication Buttons */}
          {!isSignedIn ? (
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
              <SignInButton mode="modal">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 border border-white/20 dark:border-black/20 backdrop-blur-sm h-8 sm:h-9"
                >
                  <span className="hidden xs:inline">Sign In</span>
                  <span className="xs:hidden">Login</span>
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button 
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 bg-black hover:bg-gray-800 text-white backdrop-blur-sm shadow-lg h-8 sm:h-9"
                >
                  <span className="hidden xs:inline">Sign Up</span>
                  <span className="xs:hidden">Join</span>
                </Button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
            />
          )}

          {/* Theme Switcher */}
          <div className="ml-1 sm:ml-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
