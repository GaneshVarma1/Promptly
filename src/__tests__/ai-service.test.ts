// src/__tests__/ai-service.test.ts

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the environment variable BEFORE importing the module
vi.hoisted(() => {
  process.env.TOGETHER_API_KEY = "test-api-key";
});

import { AIAnalysisService } from "@/lib/ai-service";
import { AnalysisRequest } from "@/types";

describe("AIAnalysisService", () => {
  let aiService: AIAnalysisService;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock fetch globally
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Initialize service with test config
    aiService = new AIAnalysisService({
      apiKey: "test-api-key",
      timeout: 5000,
      maxRetries: 2,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe("analyzePrompt", () => {
    it("should successfully analyze a prompt with default settings", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                score: { clarity: 85, context: 80, format: 90, overall: 85 },
                suggestions: ["Add more specific examples"],
                improvements: ["Use active voice"],
                rewrites: ["Improved version of the prompt"],
                tone: "professional",
                category: "business",
                confidence: 0.9,
              }),
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const request: AnalysisRequest = {
        text: "Write a professional email about project delays",
        model: "llama-70b",
      };

      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(true);
      // Account for score adjustment based on text length (SHORT category: 40-70 range)
      // Original score 85 gets adjusted to ~66 for short text
      expect(result.data?.score.overall).toBeGreaterThan(60);
      expect(result.data?.score.overall).toBeLessThan(70);
      expect(result.data?.model).toBe("llama-70b");
      expect(result.data?.metadata.wordCount).toBeGreaterThan(0);
      expect(result.data?.processingTime).toBeGreaterThan(0);
    });

    it("should successfully analyze longer text with higher scores", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                score: { clarity: 85, context: 80, format: 90, overall: 85 },
                suggestions: ["Add more specific examples"],
                improvements: ["Use active voice"],
                rewrites: ["Improved version of the prompt"],
                tone: "professional",
                category: "business",
                confidence: 0.9,
              }),
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      // Use longer text (>200 chars) to test LONG category scoring (85-100 range)
      const longText =
        "Please analyze this comprehensive business proposal for our new product launch strategy. The proposal includes market research, competitive analysis, financial projections, and implementation timeline. We need detailed feedback on methodology, feasibility, and potential risks.";

      const request: AnalysisRequest = {
        text: longText,
        model: "llama-70b",
      };

      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(true);
      // Long text gets scores in 85-100 range
      expect(result.data?.score.overall).toBeGreaterThan(80);
      expect(result.data?.score.overall).toBeLessThan(100);
      expect(result.data?.model).toBe("llama-70b");
    });

    it("should reject empty text", async () => {
      const request: AnalysisRequest = { text: "" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toContain("required");
    });

    it("should reject text that is too long", async () => {
      const request: AnalysisRequest = {
        text: "x".repeat(10001), // Exceeds max length
      };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toContain("too long");
    });

    it("should use default model when not specified", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                score: { clarity: 75, context: 70, format: 80, overall: 75 },
                suggestions: ["Test suggestion"],
                improvements: ["Test improvement"],
                rewrites: ["Test rewrite"],
                tone: "professional",
                category: "general",
                confidence: 0.8,
              }),
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(true);
      expect(result.data?.model).toBe("llama-70b"); // Default model
    });

    it("should handle network errors gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });

    it("should handle malformed API responses", async () => {
      // Mock a response that will cause JSON parsing to fail and bypass fallback
      mockFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content:
                    "This is not JSON at all and cannot be parsed in any way: {{invalid}}",
                },
              },
            ],
          }),
      });

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      // This should succeed because the AI service has fallback logic
      // that generates a response even when JSON parsing fails
      expect(result.success).toBe(true);
      expect(result.data?.confidence).toBeLessThan(100); // Fallback responses have lower confidence
    });

    it("should handle API responses with no choices", async () => {
      // Mock a response that will cause the "No response from AI model" error
      mockFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [], // Empty choices array
          }),
      });

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should handle HTTP error responses", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: () => Promise.resolve("Internal Server Error"), // Add the text() method
        json: () => Promise.resolve({ error: "Server error" }),
      });

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should handle analysis options correctly", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                score: { clarity: 80, context: 75, format: 85, overall: 80 },
                suggestions: ["Suggestion 1", "Suggestion 2"],
                improvements: ["Improvement 1"],
                rewrites: ["Rewrite 1", "Rewrite 2"],
                tone: "formal",
                category: "business",
                confidence: 0.85,
              }),
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const request: AnalysisRequest = {
        text: "Test prompt with analysis options",
        options: {
          includeRewrites: true,
          maxSuggestions: 5,
          targetTone: "formal",
        },
      };

      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(true);
      expect(result.data?.rewrites).toBeDefined();
      expect(result.data?.suggestions.length).toBeLessThanOrEqual(5);
    });

    it("should complete analysis within reasonable time", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                score: { clarity: 70, context: 65, format: 75, overall: 70 },
                suggestions: ["Test suggestion"],
                improvements: ["Test improvement"],
                rewrites: ["Test rewrite"],
                tone: "professional",
                category: "general",
                confidence: 0.7,
              }),
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const startTime = Date.now();

      const request: AnalysisRequest = { text: "Test prompt" };
      await aiService.analyzePrompt(request);

      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(10000); // Should complete within 10 seconds
    });

    it("should handle API timeout errors", async () => {
      mockFetch.mockRejectedValue(new Error("Request timeout"));

      const request: AnalysisRequest = { text: "Test prompt" };
      const result = await aiService.analyzePrompt(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
