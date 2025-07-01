import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

// SEO metadata for the homepage
export const metadata: Metadata = {
  title: "Promptly - Professional AI Prompt Engineering Platform | Enterprise Prompt Development",
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
    "prompt analytics"
  ],
  openGraph: {
    title: "Promptly - Professional AI Prompt Engineering Platform",
    description: "Enterprise-grade AI prompt engineering platform for systematic prompt development, testing, and optimization. Transform your AI workflows with Promptly.",
    url: "https://beta.promptly.diy",
    siteName: "Promptly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Promptly - Professional AI Prompt Engineering Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptly - Professional AI Prompt Engineering Platform",
    description: "Enterprise-grade AI prompt engineering platform for systematic prompt development, testing, and optimization.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://beta.promptly.diy",
  },
};

export default function Home() {
  return <HomePageClient />;
}
