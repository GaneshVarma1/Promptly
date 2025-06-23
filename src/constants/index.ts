/**
 * Application Constants
 * @fileoverview Centralized constants for the entire application
 * @version 1.0.0
 */

// ============================================================================
// API Configuration
// ============================================================================

export const API_CONFIG = {
  TOGETHER_AI: {
    BASE_URL: 'https://api.together.ai',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RATE_LIMIT_DELAY: 1000, // 1 second
  },
  ENDPOINTS: {
    CHAT_COMPLETIONS: '/chat/completions',
    MODELS: '/models',
  },
} as const;

// ============================================================================
// AI Models Configuration
// ============================================================================

export const AI_MODELS = {
  LLAMA_70B: {
    id: 'llama-70b',
    name: 'Meta Llama 3.1 70B',
    provider: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.9,
  },
  EXAONE_32B: {
    id: 'exaone-32b',
    name: 'EXAONE 3.5 32B',
    provider: 'lgai/exaone-3-5-32b-instruct',
    maxTokens: 2048,
    temperature: 0.7,
    topP: 0.9,
  },
  AFM_4_5B: {
    id: 'afm-4.5b',
    name: 'AFM 4.5B Preview',
    provider: 'arcee-ai/AFM-4.5B-Preview',
    maxTokens: 1024,
    temperature: 0.7,
    topP: 0.9,
  },
  LLAMA_3B: {
    id: 'llama-3b',
    name: 'Llama 3.2 3B',
    provider: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
    maxTokens: 2048,
    temperature: 0.6,
    topP: 0.85,
  },
  LLAMA_8B: {
    id: 'llama-8b',
    name: 'Llama 3.1 8B',
    provider: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    maxTokens: 3072,
    temperature: 0.65,
    topP: 0.9,
  },
  LLAMA_11B_VISION: {
    id: 'llama-11b-vision',
    name: 'Llama 3.2 11B Vision',
    provider: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
    maxTokens: 2048,
    temperature: 0.7,
    topP: 0.9,
  },
  MIXTRAL_8X7B: {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    provider: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    maxTokens: 4096,
    temperature: 0.8,
    topP: 0.95,
  },
  DIALOGPT_MEDIUM: {
    id: 'dialogpt-medium',
    name: 'DialoGPT Medium',
    provider: 'microsoft/DialoGPT-medium',
    maxTokens: 1024,
    temperature: 0.9,
    topP: 0.9,
  },
} as const;

export const MODEL_FALLBACKS = {
  'llama-70b': 'exaone-32b',
  'exaone-32b': 'afm-4.5b',
  'afm-4.5b': 'afm-4.5b', // No fallback for smallest model
  'llama-3b': 'afm-4.5b',
  'llama-8b': 'exaone-32b', 
  'llama-11b-vision': 'llama-8b',
  'mixtral-8x7b': 'llama-70b',
  'dialogpt-medium': 'llama-3b',
} as const;

// ============================================================================
// Scoring Configuration
// ============================================================================

export const SCORING_CONFIG = {
  WEIGHTS: {
    CLARITY: 0.3,
    CONTEXT: 0.25,
    FORMAT: 0.25,
    OVERALL: 0.2,
  },
  THRESHOLDS: {
    EXCELLENT: 90,
    GOOD: 75,
    FAIR: 60,
    POOR: 0,
  },
  CONTENT_LENGTH_MULTIPLIERS: {
    SHORT: { min: 0, max: 50, scoreRange: [40, 70] },
    MEDIUM: { min: 51, max: 200, scoreRange: [70, 90] },
    LONG: { min: 201, max: Infinity, scoreRange: [85, 100] },
  },
} as const;

// ============================================================================
// UI Configuration
// ============================================================================

export const UI_CONFIG = {
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    EASING: {
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  Z_INDEX: {
    HEADER: 50,
    SIDEBAR: 40,
    MODAL: 100,
    TOOLTIP: 200,
    TOAST: 300,
  },
} as const;

// ============================================================================
// Theme Configuration
// ============================================================================

export const THEME_CONFIG = {
  STORAGE_KEY: 'promptly-theme',
  DEFAULT_THEME: 'light',
  THEMES: ['light', 'dark', 'system'] as const,
  CSS_VARIABLES: {
    LIGHT: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%',
      secondary: '210 40% 96.1%',
    },
    DARK: {
      background: '0 0% 0%',
      foreground: '0 0% 100%',
      primary: '0 0% 100%',
      secondary: '0 0% 12%',
    },
  },
} as const;

// ============================================================================
// Local Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  THEME: 'promptly-theme',
  PENDING_PROMPT: 'pendingPrompt',
  DOCUMENT_PREFIX: 'document-',
  USER_PREFERENCES: 'user-preferences',
  ANALYTICS_ID: 'analytics-session-id',
} as const;

// ============================================================================
// Document Configuration
// ============================================================================

export const DOCUMENT_CONFIG = {
  LIMITS: {
    MAX_TITLE_LENGTH: 100,
    MAX_CONTENT_LENGTH: 10000,
    MAX_DOCUMENTS_PER_USER: 1000,
    MIN_CONTENT_LENGTH: 10,
  },
  AUTO_SAVE: {
    INTERVAL: 5000, // 5 seconds
    DEBOUNCE_DELAY: 1000, // 1 second
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    DEBOUNCE_DELAY: 300,
    MAX_RESULTS: 50,
  },
} as const;

// ============================================================================
// Validation Rules
// ============================================================================

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 254,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
  },
  PROMPT: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 5000,
    FORBIDDEN_PATTERNS: [
      /(<script|<\/script>)/gi,
      /(<iframe|<\/iframe>)/gi,
      /(javascript:|data:)/gi,
    ],
  },
} as const;

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION_FAILED: 'Failed to connect to the server. Please check your internet connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    RATE_LIMITED: 'Too many requests. Please wait a moment before trying again.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    PROMPT_TOO_SHORT: 'Prompt must be at least 10 characters long.',
    PROMPT_TOO_LONG: 'Prompt must be less than 5000 characters.',
  },
  AI: {
    ANALYSIS_FAILED: 'Failed to analyze the prompt. Please try again.',
    MODEL_UNAVAILABLE: 'The selected AI model is currently unavailable.',
    INVALID_RESPONSE: 'Received invalid response from AI service.',
  },
  AUTH: {
    UNAUTHORIZED: 'You must be signed in to perform this action.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  },
} as const;

// ============================================================================
// Success Messages
// ============================================================================

export const SUCCESS_MESSAGES = {
  DOCUMENT: {
    CREATED: 'Document created successfully.',
    UPDATED: 'Document updated successfully.',
    DELETED: 'Document deleted successfully.',
    SAVED: 'Document saved successfully.',
  },
  ANALYSIS: {
    COMPLETED: 'Prompt analysis completed successfully.',
    SAVED: 'Analysis results saved successfully.',
  },
  GENERAL: {
    COPIED_TO_CLIPBOARD: 'Copied to clipboard successfully.',
    SETTINGS_SAVED: 'Settings saved successfully.',
  },
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURE_FLAGS = {
  ANALYTICS: true,
  BETA_FEATURES: true,
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  ADVANCED_ANALYSIS: true,
  COLLABORATION: false,
  EXPORT_FUNCTIONALITY: true,
  REAL_TIME_SYNC: false,
} as const;

// ============================================================================
// Prompt Gallery Templates
// ============================================================================

export const PROMPT_GALLERY_TEMPLATES = {
  PRODUCT_DESCRIPTION: {
    title: 'Product Description',
    description: 'Create compelling product descriptions',
    color: 'blue',
    icon: 'package',
    templates: [
      'Write a compelling product description for a [product type] that highlights its key features and benefits.',
      'Create a detailed product listing for an e-commerce site selling [product name].',
      'Generate product copy that converts browsers into buyers for [product category].',
    ],
  },
  EMAIL_WRITING: {
    title: 'Email Writing',
    description: 'Professional email templates',
    color: 'green',
    icon: 'mail',
    templates: [
      'Write a professional follow-up email to a potential client about [subject].',
      'Create a warm outreach email for [purpose] that gets responses.',
      'Draft a polite email declining [request] while maintaining good relationships.',
    ],
  },
  CONTENT_SUMMARY: {
    title: 'Content Summary',
    description: 'Summarize complex content',
    color: 'purple',
    icon: 'file-text',
    templates: [
      'Summarize this [content type] in 3 key points: [content]',
      'Create an executive summary of [document/article] focusing on actionable insights.',
      'Extract the main takeaways from [content] for a busy executive.',
    ],
  },
  SOCIAL_MEDIA: {
    title: 'Social Media',
    description: 'Engaging social content',
    color: 'pink',
    icon: 'share-2',
    templates: [
      'Create an engaging social media post about [topic] for [platform].',
      'Write a viral Twitter thread about [subject] that educates and entertains.',
      'Generate Instagram captions for [content type] that drive engagement.',
    ],
  },
  CREATIVE_WRITING: {
    title: 'Creative Writing',
    description: 'Stories and creative content',
    color: 'orange',
    icon: 'feather',
    templates: [
      'Write a short story beginning with: [opening line]',
      'Create a compelling character description for [character type] in [setting].',
      'Generate creative headlines for [topic] that grab attention.',
    ],
  },
  TECHNICAL_WRITING: {
    title: 'Technical Writing',
    description: 'Documentation and tutorials',
    color: 'gray',
    icon: 'code',
    templates: [
      'Write technical documentation for [feature/API] that developers can easily follow.',
      'Create a step-by-step tutorial for [process] aimed at [audience level].',
      'Generate clear error messages and troubleshooting steps for [technical issue].',
    ],
  },
} as const;

// ============================================================================
// Regular Expressions
// ============================================================================

export const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  PHONE: /^[+]?[\d\s\-()]+$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  DOCUMENT_ID: /^doc-\d{13}-[a-z0-9]{9}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;

// ============================================================================
// Date/Time Configuration
// ============================================================================

export const DATE_CONFIG = {
  FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    FULL: 'MMMM dd, yyyy h:mm a',
    SHORT: 'MM/dd/yyyy',
    ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    TIME_ONLY: 'h:mm a',
  },
  RELATIVE_TIME_THRESHOLDS: {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000,
  },
} as const; 