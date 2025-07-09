import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "Promptly - Professional AI Prompt Engineering Platform",
    short_name: "Promptly",
    description: "Enterprise-grade AI prompt engineering platform for systematic prompt development, testing, and optimization",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0ea5e9",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon"
      }
    ],
    categories: ["productivity", "developer-tools", "business"],
    lang: "en-US",
    scope: "/",
    prefer_related_applications: false
  };

  return new NextResponse(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
} 