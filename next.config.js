/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HUGGING_FACE_API_KEY: process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Improve dynamic route handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Add headers for proper file serving
  async headers() {
    return [
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/favicon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  // Better chunk handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Ensure proper dynamic route generation
  generateBuildId: async () => {
    return 'build-' + Date.now().toString(36);
  },
}

module.exports = nextConfig 