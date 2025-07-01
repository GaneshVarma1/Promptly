import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// Try to load fonts with fallbacks
let inter: any = null;
let jetbrainsMono: any = null;

try {
  const { Inter } = require("next/font/google");
  inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'Arial', 'sans-serif'],
  });
} catch (error) {
  console.warn('Inter font failed to load, using fallback:', error);
  inter = {
    variable: "--font-inter",
    style: { fontFamily: 'system-ui, Arial, sans-serif' }
  };
}

try {
  const { JetBrains_Mono } = require("next/font/google");
  jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: 'swap',
    fallback: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
  });
} catch (error) {
  console.warn('JetBrains Mono font failed to load, using fallback:', error);
  jetbrainsMono = {
    variable: "--font-jetbrains-mono",
    style: { fontFamily: 'SF Mono, Monaco, Consolas, monospace' }
  };
}

// Simplified font handling to prevent SSR issues
const leagueSpartan = {
  variable: "--font-league-spartan",
  style: { fontFamily: 'var(--font-league-spartan)' }
};

export const metadata: Metadata = {
  title: {
    default: "Promptly - Professional AI Prompt Engineering Platform | Enterprise Prompt Development",
    template: "%s | Promptly - AI Prompt Engineering Platform"
  },
  description: "Promptly is the leading enterprise AI prompt engineering platform. Build, test, and optimize professional AI prompts with systematic development tools, analytics, and collaboration features. Transform your AI workflows with Promptly.",
  keywords: [
    "Promptly",
    "AI prompt engineering",
    "prompt development",
    "enterprise AI",
    "AI workflow management",
    "prompt optimization",
    "AI development platform",
    "professional prompts",
    "AI engineering tools",
    "prompt testing",
    "AI collaboration",
    "prompt analytics",
    "AI workflow automation",
    "enterprise prompt platform",
    "AI development tools"
  ],
  authors: [{ name: "Promptly Team" }],
  creator: "Promptly",
  publisher: "Promptly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://beta.promptly.diy'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://beta.promptly.diy',
    siteName: 'Promptly',
    title: 'Promptly - Professional AI Prompt Engineering Platform',
    description: 'Enterprise-grade AI prompt engineering platform for systematic prompt development, testing, and optimization. Transform your AI workflows with Promptly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Promptly - Professional AI Prompt Engineering Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptly - Professional AI Prompt Engineering Platform',
    description: 'Enterprise-grade AI prompt engineering platform for systematic prompt development, testing, and optimization.',
    images: ['/og-image.png'],
    creator: '@promptly',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
};

// Error boundary component
function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html
        lang="en"
        suppressHydrationWarning
        style={{ backgroundColor: "#020617", colorScheme: "dark" }}
      >
        <head>
          {/* Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Promptly",
                "description": "Professional AI prompt engineering platform for enterprise prompt development, testing, and optimization",
                "url": "https://beta.promptly.diy",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "150"
                },
                "author": {
                  "@type": "Organization",
                  "name": "Promptly"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Promptly",
                  "url": "https://beta.promptly.diy"
                }
              })
            }}
          />
          
          {/* Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Promptly",
                "url": "https://beta.promptly.diy",
                "logo": "https://beta.promptly.diy/favicon.png",
                "description": "Leading enterprise AI prompt engineering platform",
                "sameAs": [
                  "https://twitter.com/promptly",
                  "https://linkedin.com/company/promptly"
                ]
              })
            }}
          />
          
          <Script
            id="theme-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('promptly-theme');
                    // Default to dark mode unless user explicitly chose light
                    const shouldUseDark = theme !== 'light';
                    if (shouldUseDark) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.style.colorScheme = 'dark';
                    } else {
                      document.documentElement.classList.remove('dark');
                      document.documentElement.style.colorScheme = 'light';
                    }
                    document.documentElement.style.setProperty('--initial-theme', shouldUseDark ? 'dark' : 'light');
                  } catch (e) {
                    console.warn('Theme initialization failed:', e);
                  }
                })();
              `,
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Prevent flash of unstyled content */
              html {
                visibility: hidden;
              }
              
              html.fonts-loaded {
                visibility: visible;
              }
              
              /* Ensure immediate theme application */
              html:not(.dark) {
                --background: 0 0% 100%;
                --foreground: 222.2 84% 4.9%;
                --card: 0 0% 100%;
                --card-foreground: 222.2 84% 4.9%;
                --border: 214.3 31.8% 91.4%;
                --muted: 210 40% 96.1%;
                --muted-foreground: 215.4 16.3% 46.9%;
              }
              
              html.dark {
                --background: 0 0% 0%;
                --foreground: 0 0% 100%;
                --card: 0 0% 6%;
                --card-foreground: 0 0% 100%;
                --border: 0 0% 20%;
                --muted: 0 0% 16%;
                --muted-foreground: 0 0% 60%;
              }
              

            `
          }} />
          <Script
            id="font-loaded"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                document.fonts.ready.then(function() {
                  document.documentElement.classList.add('fonts-loaded');
                  document.documentElement.style.visibility = 'visible';
                });
                
                // Fallback in case font loading takes too long
                setTimeout(function() {
                  document.documentElement.classList.add('fonts-loaded');
                  document.documentElement.style.visibility = 'visible';
                }, 100);
              `,
            }}
          />
          <Script
            id="error-handler"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // Handle chunk loading errors
                window.addEventListener('unhandledrejection', function(event) {
                  if (event.reason && event.reason.name === 'ChunkLoadError') {
                    console.warn('Chunk load error detected, reloading page...');
                    window.location.reload();
                  }
                });
                
                // Handle other dynamic import errors
                window.addEventListener('error', function(event) {
                  if (event.message && event.message.includes('Loading chunk')) {
                    console.warn('Chunk loading failed, reloading page...');
                    window.location.reload();
                  }
                });
              `,
            }}
          />
        </head>
        <body
          className={`${inter?.variable} ${jetbrainsMono?.variable} antialiased bg-white dark:bg-slate-950 text-foreground font-sussie`}
          style={{ 
            backgroundColor: "#020617",
            fontFamily: 'var(--font-league-spartan)'
          }}
        >
          <Suspense fallback={
            <LoadingFallback />
          }>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
