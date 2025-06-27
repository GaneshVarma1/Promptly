"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  const handlePromptSubmit = (prompt: string) => {
    // For prompt submission, redirect to dashboard where they can create docs
    // The header sign-in buttons will handle authentication via modals
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      // User will need to sign in via header buttons first
      return;
    }
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
    // User will need to sign in via header buttons first
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-300 dark:border-slate-600"></div>
      </div>
    );
  }

  // If user is signed in, they'll be redirected to dashboard
  // This page only shows for non-authenticated users
  return (
    <div className="min-h-screen bg-background" style={{ overscrollBehavior: 'none' }}>
      <Header />
      <main className="bg-background" style={{ overscrollBehavior: 'none' }}>
        <LandingPage 
          onGetStarted={handleGetStarted}
          onPromptSubmit={handlePromptSubmit}
        />
      </main>
    </div>
  );
}
