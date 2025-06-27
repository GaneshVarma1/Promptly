// Global type definitions for the application

declare global {
  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HUGGING_FACE_API_KEY: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

  // Window object extensions
  interface Window {
    // Add any global window properties here
    __NEXT_DATA__: any;
  }

  // Document types
  interface Document {
    // Add any document extensions here
  }
}

// Export to make this a module
export {} 