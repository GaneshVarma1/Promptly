import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    passWithNoTests: true,
    // Test environment configuration
    environment: "jsdom",

    // Global test settings
    globals: true,

    // Setup files
    setupFiles: ["./vitest.setup.ts"],

    // Include patterns
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "src/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],

    // Exclude patterns
    exclude: ["node_modules", "dist", ".next", "coverage", "**/*.d.ts"],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "**/.next/**",
        "src/types/**",
        "src/constants/**",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },

    // Test timeout
    testTimeout: 10000,

    // Hook timeout
    hookTimeout: 10000,

    // Retry configuration
    retry: 2,

    // Reporter configuration
    reporters: ["verbose", "json", "html"],

    // Output configuration
    outputFile: {
      json: "./coverage/test-results.json",
      html: "./coverage/test-results.html",
    },

    // Mock configuration
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,

    // Watch configuration
    watch: false,

    // Pool configuration for better performance
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
      },
    },

    // Add CSS handling
    css: true,

    // Add server configuration for better performance
    server: {
      deps: {
        inline: ["@testing-library/react", "@testing-library/jest-dom"],
      },
    },

    // Add environment variables
    env: {
      NODE_ENV: "test",
      NEXT_PUBLIC_SUPABASE_URL: "test-url",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-key",
    },
  },

  // Resolve configuration
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/lib": resolve(__dirname, "./src/lib"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/services": resolve(__dirname, "./src/services"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/constants": resolve(__dirname, "./src/constants"),
      "@/app": resolve(__dirname, "./src/app"),
    },
  },

  // Define configuration
  define: {
    "process.env.NODE_ENV": '"test"',
    "process.env.NEXT_PUBLIC_SUPABASE_URL": '"test-url"',
    "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": '"test-key"',
  },

  // ESBuild configuration
  esbuild: {
    target: "es2020",
  },
});
