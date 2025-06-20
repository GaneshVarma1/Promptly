/**
 * Core Application Types and Interfaces
 * @fileoverview Centralized type definitions for the entire application
 * @version 1.0.0
 */

// ============================================================================
// Base Types
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: string;
}

/**
 * Generic paginated response
 */
export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ============================================================================
// Document Management Types
// ============================================================================

/**
 * Document status enumeration
 */
export const DocumentStatus = {
  DRAFT: 'draft',
  ANALYZING: 'analyzing',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
} as const;

export type DocumentStatusType = typeof DocumentStatus[keyof typeof DocumentStatus];

/**
 * Core document interface
 */
export interface Document {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly status: DocumentStatusType;
  readonly score?: number;
  readonly summary?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastModified: string;
  readonly userId: string;
  readonly metadata?: DocumentMetadata;
}

/**
 * Document metadata for extended properties
 */
export interface DocumentMetadata {
  readonly tags?: readonly string[];
  readonly category?: string;
  readonly language?: string;
  readonly wordCount?: number;
  readonly readingTime?: number;
  readonly isPublic?: boolean;
  readonly collaborators?: readonly string[];
}

/**
 * Document creation payload
 */
export interface CreateDocumentRequest {
  readonly title: string;
  readonly content: string;
  readonly metadata?: Partial<DocumentMetadata>;
}

/**
 * Document update payload
 */
export interface UpdateDocumentRequest {
  readonly title?: string;
  readonly content?: string;
  readonly status?: DocumentStatusType;
  readonly metadata?: Partial<DocumentMetadata>;
}

// ============================================================================
// AI Analysis Types
// ============================================================================

/**
 * Available AI models for analysis
 */
export const AIModels = {
  LLAMA_70B: 'llama-70b',
  EXAONE_32B: 'exaone-32b',
  AFM_4_5B: 'afm-4.5b'
} as const;

export type ModelType = typeof AIModels[keyof typeof AIModels];

/**
 * Prompt analysis scoring structure
 */
export interface PromptScoreValue {
  readonly clarity: number;
  readonly context: number;
  readonly format: number;
  readonly overall: number;
}

/**
 * Comprehensive AI analysis result
 */
export interface AIAnalysisResult {
  readonly score: PromptScoreValue;
  readonly suggestions: readonly string[];
  readonly improvements: readonly string[];
  readonly rewrites: readonly string[];
  readonly tone: string;
  readonly category: string;
  readonly confidence: number;
  readonly processingTime: number;
  readonly model: ModelType;
  readonly metadata: {
    readonly wordCount: number;
    readonly characterCount: number;
    readonly sentenceCount: number;
    readonly readabilityScore: number;
  };
}

/**
 * Analysis request payload
 */
export interface AnalysisRequest {
  readonly text: string;
  readonly model?: ModelType;
  readonly options?: AnalysisOptions;
}

/**
 * Analysis configuration options
 */
export interface AnalysisOptions {
  readonly includeRewrites?: boolean;
  readonly includeSuggestions?: boolean;
  readonly targetTone?: string;
  readonly maxSuggestions?: number;
  readonly detailedAnalysis?: boolean;
}

// ============================================================================
// User Interface Types
// ============================================================================

/**
 * Dashboard tab types
 */
export const DashboardTabs = {
  DOCUMENTS: 'documents',
  SAVED: 'saved',
  TRASH: 'trash',
  PROMPT_GALLERY: 'prompt-gallery',
  ACCOUNT: 'account'
} as const;

export type DashboardTabType = typeof DashboardTabs[keyof typeof DashboardTabs];

/**
 * Theme configuration
 */
export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

export type ThemeType = typeof Themes[keyof typeof Themes];

/**
 * Tone selector options
 */
export const ToneOptions = {
  PROFESSIONAL: 'professional',
  CASUAL: 'casual',
  CREATIVE: 'creative',
  TECHNICAL: 'technical',
  FRIENDLY: 'friendly',
  FORMAL: 'formal'
} as const;

export type ToneType = typeof ToneOptions[keyof typeof ToneOptions];

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Base component props with common properties
 */
export interface BaseComponentProps {
  readonly className?: string;
  readonly testId?: string;
  readonly 'data-testid'?: string;
}

/**
 * Props for components that handle loading states
 */
export interface LoadingProps {
  readonly isLoading?: boolean;
  readonly loadingText?: string;
}

/**
 * Props for components that handle errors
 */
export interface ErrorProps {
  readonly error?: Error | string | null;
  readonly onRetry?: () => void;
}

/**
 * Combined props for robust components
 */
export type RobustComponentProps = BaseComponentProps & LoadingProps & ErrorProps;

// ============================================================================
// Event Handler Types
// ============================================================================

/**
 * Generic event handler types
 */
export type EventHandler<T = void> = () => T;
export type EventHandlerWithPayload<P, T = void> = (payload: P) => T;
export type AsyncEventHandler<T = void> = () => Promise<T>;
export type AsyncEventHandlerWithPayload<P, T = void> = (payload: P) => Promise<T>;

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Extract keys of T that are of type U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Omit keys and make remaining optional
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Non-empty array type
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * String literal union for better type safety
 */
export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * Range type for numeric constraints
 */
export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Application configuration
 */
export interface AppConfig {
  readonly api: {
    readonly baseUrl: string;
    readonly timeout: number;
    readonly retryAttempts: number;
  };
  readonly features: {
    readonly analytics: boolean;
    readonly beta: boolean;
    readonly debugMode: boolean;
  };
  readonly limits: {
    readonly maxDocuments: number;
    readonly maxFileSize: number;
    readonly maxPromptLength: number;
  };
}

/**
 * Environment configuration
 */
export interface EnvironmentConfig {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly CLERK_SECRET_KEY: string;
  readonly TOGETHER_API_KEY: string;
} 