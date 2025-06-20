import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refine AI Write - Prompt Analysis Tool",
  description: "AI-powered prompt analysis and improvement tool",
};

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
        elements: {
          // Main containers
          formButtonPrimary: 
            "bg-blue-600 hover:bg-blue-700 text-white text-sm normal-case",
          card: "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800",
          rootBox: "bg-white dark:bg-zinc-900",
          modalContent: "bg-white dark:bg-zinc-900",
          pageScrollBox: "bg-white dark:bg-zinc-900",
          
          // Headers and titles
          headerTitle: "text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-600 dark:text-zinc-400",
          
          // Form elements
          formFieldLabel: "text-gray-900 dark:text-white",
          formFieldInput: 
            "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-zinc-400",
          formFieldInputShowPasswordButton: "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200",
          
          // Text elements
          alertText: "text-gray-900 dark:text-white",
          formFieldErrorText: "text-red-600 dark:text-red-400",
          formFieldSuccessText: "text-green-600 dark:text-green-400",
          formFieldHintText: "text-gray-500 dark:text-zinc-400",
          formFieldWarningText: "text-amber-600 dark:text-amber-400",
          identityPreviewText: "text-gray-900 dark:text-white",
          profileSectionTitle: "text-gray-900 dark:text-white",
          profileSectionContent: "text-gray-600 dark:text-zinc-400",
          
          // Buttons
          formButtonReset: "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white",
          socialButtonsBlockButton: 
            "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800",
          socialButtonsBlockButtonText: "text-gray-900 dark:text-white",
          
          // Links and interactive elements
          footerActionLink: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
          
          // Dividers
          dividerLine: "bg-gray-200 dark:bg-zinc-800",
          dividerText: "text-gray-500 dark:text-zinc-400",
          
          // OTP and special inputs
          otpCodeFieldInput: 
            "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white",
          
          // Modal and popover elements
          modalCloseButton: "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200",
          userButtonPopoverCard: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
          userButtonPopoverText: "text-gray-900 dark:text-white",
          
          // Navigation elements
          breadcrumbs: "text-gray-500 dark:text-zinc-400",
          breadcrumbsItem: "text-gray-500 dark:text-zinc-400",
          breadcrumbsItemDivider: "text-gray-300 dark:text-zinc-600",
          navbar: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
          navbarButton: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
          
          // Additional text elements that might be missing
          formHeaderTitle: "text-gray-900 dark:text-white",
          formHeaderSubtitle: "text-gray-600 dark:text-zinc-400",
          selectButton: "text-gray-900 dark:text-white bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
          selectOption: "text-gray-900 dark:text-white",
          selectOptionText: "text-gray-900 dark:text-white",
          menuButton: "text-gray-900 dark:text-white",
          menuItem: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
          menuItemText: "text-gray-900 dark:text-white",
          userPreviewMainIdentifier: "text-gray-900 dark:text-white",
          userPreviewSecondaryIdentifier: "text-gray-600 dark:text-zinc-400",
          userButtonOuterIdentifier: "text-gray-900 dark:text-white",
          userButtonInnerIdentifier: "text-gray-600 dark:text-zinc-400",
          
          // Form control elements
          phoneInputBox: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white",
          formControlLabel: "text-gray-900 dark:text-white",
          formControlInput: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white",
          
          // File upload elements
          fileDropAreaBox: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
          fileDropAreaButtonPrimary: "text-blue-600 dark:text-blue-400",
          fileDropAreaHint: "text-gray-500 dark:text-zinc-400",
          
          // Tab elements
          tabButton: "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
          tabPanel: "text-gray-900 dark:text-white",
          
          // Badge and tag elements
          badge: "text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800",
          tag: "text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800",
        },
        variables: {
          colorPrimary: "#2563eb", // blue-600
          colorDanger: "#dc2626", // red-600
          colorSuccess: "#16a34a", // green-600
          colorWarning: "#d97706", // amber-600
          colorTextOnPrimaryBackground: "#ffffff", // white text on primary buttons
          colorTextSecondary: "#6b7280", // gray-500 for light mode, will be overridden by CSS
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
                try {
                  const theme = localStorage.getItem('promptly-theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  console.log('Theme initialized:', theme);
                } catch (e) {
                  console.log('Theme initialization failed:', e);
                }
              `,
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
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
        </head>
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
