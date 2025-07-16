/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Improve dynamic route handling
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
    return "build-" + Date.now().toString(36);
  },
};

export default nextConfig;
