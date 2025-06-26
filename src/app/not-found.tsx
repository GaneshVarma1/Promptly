"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-league-spartan">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-league-spartan">Page Not Found</h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 font-sussie">
            Sorry, the page you are looking for does not exist or has been moved.<br />
            Let&apos;s get you back to safety!
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base md:text-lg transition-colors shadow-md">
            <ArrowLeft className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
