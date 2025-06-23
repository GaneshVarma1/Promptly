import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Refine AI Write - Prompt Analysis Tool",
  description: "AI-powered prompt analysis and improvement tool",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorPrimary: "#2563eb", // Promptly blue
          colorText: "#1f2937", // Dark gray for better readability
          colorTextSecondary: "#6b7280", // Medium gray
          colorBackground: "#ffffff", // White background
          colorInputBackground: "#f9fafb", // Light gray input background
          colorInputText: "#1f2937", // Dark text in inputs
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            id="theme-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('promptly-theme');
                    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const shouldUseDark = theme === 'dark' || (!theme && prefersDark);
                    
                    if (shouldUseDark) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.style.colorScheme = 'dark';
                    } else {
                      document.documentElement.classList.remove('dark');
                      document.documentElement.style.colorScheme = 'light';
                    }
                    
                    // Set initial variables to prevent flash
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
              
              /* Ensure all Clerk text elements inherit proper colors in dark mode */
              .dark .cl-rootBox *,
              .dark .cl-modalContent *,
              .dark .cl-card *,
              .dark .cl-userButtonPopoverCard * {
                color: white !important;
              }
              
              /* Override for specific elements that should have different colors */
              .dark .cl-formFieldErrorText,
              .dark .cl-formFieldErrorText * {
                color: #f87171 !important; /* red-400 */
              }
              
              .dark .cl-formFieldSuccessText,
              .dark .cl-formFieldSuccessText * {
                color: #4ade80 !important; /* green-400 */
              }
              
              .dark .cl-formFieldWarningText,
              .dark .cl-formFieldWarningText * {
                color: #fbbf24 !important; /* amber-400 */
              }
              
              .dark .cl-formFieldHintText,
              .dark .cl-headerSubtitle,
              .dark .cl-profileSectionContent,
              .dark .cl-dividerText,
              .dark .cl-userPreviewSecondaryIdentifier,
              .dark .cl-userButtonInnerIdentifier {
                color: #a1a1aa !important; /* zinc-400 */
              }
              
              .dark .cl-footerActionLink {
                color: #60a5fa !important; /* blue-400 */
              }
              
              /* Ensure input placeholders are properly styled */
              .dark .cl-formFieldInput::placeholder {
                color: #a1a1aa !important; /* zinc-400 */
              }
              
              /* Fix button text colors */
              .dark .cl-formButtonPrimary * {
                color: white !important;
              }
              
              .dark .cl-socialButtonsBlockButton * {
                color: white !important;
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
          className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sussie`}
        >
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
