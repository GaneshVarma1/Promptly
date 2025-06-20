/**
 * Utility Functions
 * @fileoverview Comprehensive utility functions for the application
 * @version 2.0.0
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { REGEX_PATTERNS, DATE_CONFIG, VALIDATION_RULES } from '@/constants';

// ============================================================================
// Styling Utilities
// ============================================================================

/**
 * Utility function to merge Tailwind CSS classes conditionally and efficiently.
 * @param inputs - List of class values (strings, arrays, objects, etc.)
 * @returns A single merged className string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates an email address using RFC-compliant regex
 */
export function isValidEmail(email: string): boolean {
  return REGEX_PATTERNS.EMAIL.test(email);
}

/**
 * Validates a URL format
 */
export function isValidUrl(url: string): boolean {
  return REGEX_PATTERNS.URL.test(url);
}

/**
 * Validates a phone number format
 */
export function isValidPhone(phone: string): boolean {
  return REGEX_PATTERNS.PHONE.test(phone);
}

/**
 * Validates a UUID format
 */
export function isValidUUID(uuid: string): boolean {
  return REGEX_PATTERNS.UUID.test(uuid);
}

/**
 * Validates a document ID format
 */
export function isValidDocumentId(id: string): boolean {
  return REGEX_PATTERNS.DOCUMENT_ID.test(id);
}

/**
 * Validates prompt content according to application rules
 */
export function validatePrompt(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!content || content.trim().length === 0) {
    errors.push('Prompt content is required');
  }
  
  if (content.length < VALIDATION_RULES.PROMPT.MIN_LENGTH) {
    errors.push(`Prompt must be at least ${VALIDATION_RULES.PROMPT.MIN_LENGTH} characters long`);
  }
  
  if (content.length > VALIDATION_RULES.PROMPT.MAX_LENGTH) {
    errors.push(`Prompt must be less than ${VALIDATION_RULES.PROMPT.MAX_LENGTH} characters long`);
  }
  
  // Check for forbidden patterns
  for (const pattern of VALIDATION_RULES.PROMPT.FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      errors.push('Prompt contains potentially unsafe content');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Sanitizes input by removing potentially harmful characters
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/data:/gi, '') // Remove data: protocols
    .trim();
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Converts string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Extracts initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

/**
 * Generates a random string of specified length
 */
export function generateRandomString(length: number, charset = 'abcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Counts words in a text string
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Counts sentences in a text string
 */
export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}

/**
 * Calculates estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
}

// ============================================================================
// ID Generation Utilities
// ============================================================================

/**
 * Generates a unique document ID
 */
export function generateDocumentId(): string {
  return `doc-${Date.now()}-${generateRandomString(9)}`;
}

/**
 * Generates a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generates a short unique ID
 */
export function generateShortId(length = 8): string {
  return generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

/**
 * Generates a simple numeric ID
 */
export function generateNumericId(): string {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// ============================================================================
// Date and Time Utilities
// ============================================================================

/**
 * Formats a date according to the specified format
 */
export function formatDate(date: Date | string, format: keyof typeof DATE_CONFIG.FORMATS = 'DISPLAY'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Simple formatter - in a real app, you'd use date-fns or similar
  switch (format) {
    case 'DISPLAY':
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
      });
    case 'FULL':
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    case 'SHORT':
      return dateObj.toLocaleDateString('en-US');
    case 'TIME_ONLY':
      return dateObj.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    default:
      return dateObj.toISOString();
  }
}

/**
 * Returns relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  
  const { MINUTE, HOUR, DAY, WEEK, MONTH } = DATE_CONFIG.RELATIVE_TIME_THRESHOLDS;
  
  if (diffMs < MINUTE) return 'Just now';
  if (diffMs < HOUR) return `${Math.floor(diffMs / MINUTE)} minutes ago`;
  if (diffMs < DAY) return `${Math.floor(diffMs / HOUR)} hours ago`;
  if (diffMs < WEEK) return `${Math.floor(diffMs / DAY)} days ago`;
  if (diffMs < MONTH) return `${Math.floor(diffMs / WEEK)} weeks ago`;
  
  return formatDate(dateObj, 'DISPLAY');
}

/**
 * Checks if a date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
}

/**
 * Checks if a date is within the last week
 */
export function isWithinLastWeek(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const weekAgo = new Date(Date.now() - DATE_CONFIG.RELATIVE_TIME_THRESHOLDS.WEEK);
  
  return dateObj >= weekAgo;
}

// ============================================================================
// Number and Math Utilities
// ============================================================================

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to specified decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Generates a random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats a number with commas as thousands separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Converts bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculates percentage with optional decimal places
 */
export function calculatePercentage(value: number, total: number, decimals = 1): number {
  if (total === 0) return 0;
  return roundTo((value / total) * 100, decimals);
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Removes duplicate items from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Removes duplicate objects from an array based on a key
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Groups array items by a key function
 */
export function groupBy<T, K extends string | number>(
  array: T[], 
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

// ============================================================================
// Object Utilities
// ============================================================================

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Checks if an object is empty
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Omits specified keys from an object
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Picks specified keys from an object
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}

// ============================================================================
// Storage Utilities
// ============================================================================

/**
 * Safe localStorage getItem with JSON parsing
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to parse localStorage item "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safe localStorage setItem with JSON stringification
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to set localStorage item "${key}":`, error);
    return false;
  }
}

/**
 * Removes an item from localStorage
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove localStorage item "${key}":`, error);
  }
}

/**
 * Clears all items from localStorage with optional prefix filter
 */
export function clearStorage(prefix?: string): void {
  try {
    if (prefix) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } else {
      localStorage.clear();
    }
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
}

// ============================================================================
// Browser and Environment Utilities
// ============================================================================

/**
 * Checks if code is running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Checks if device supports touch
 */
export function isTouchDevice(): boolean {
  return isBrowser() && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

/**
 * Gets the current viewport dimensions
 */
export function getViewportSize(): { width: number; height: number } {
  if (!isBrowser()) return { width: 0, height: 0 };
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser()) return false;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.warn('Failed to copy to clipboard:', error);
    return false;
  }
}

// ============================================================================
// Async Utilities
// ============================================================================

/**
 * Creates a delay/sleep function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Retries an async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
  } = options;
  
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const delay = Math.min(
        baseDelay * Math.pow(backoffMultiplier, attempt - 1),
        maxDelay
      );
      
      await sleep(delay);
    }
  }
  
  throw lastError!;
}
