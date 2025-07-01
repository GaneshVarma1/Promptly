import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title = "Promptly - Professional AI Prompt Engineering Platform",
  description = "The leading enterprise AI prompt engineering platform. Build, test, and optimize professional AI prompts with systematic development tools, analytics, and collaboration features.",
  keywords = [
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
  ogImage = "/og-image.png",
  canonical = "https://beta.promptly.diy",
  noIndex = false
}: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Promptly" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://beta.promptly.diy${ogImage}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Promptly" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://beta.promptly.diy${ogImage}`} />
      <meta name="twitter:creator" content="@promptly" />
      <meta name="twitter:site" content="@promptly" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Promptly" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Additional Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Promptly",
            "url": "https://beta.promptly.diy",
            "description": description,
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://beta.promptly.diy/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://beta.promptly.diy"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Dashboard",
                "item": "https://beta.promptly.diy/dashboard"
              }
            ]
          })
        }}
      />
    </Head>
  );
} 