# Testing Guide

This document explains our testing setup, configuration, and best practices for writing and running tests in this Next.js project.

## Overview

We use **Vitest** as our testing framework, which provides a fast, modern testing experience with excellent TypeScript support and compatibility with the Vite ecosystem.

### Key Benefits of Vitest

- ⚡ **Fast**: Leverages Vite's transformation pipeline for rapid test execution
- 🔧 **Modern**: Native TypeScript support with ESM-first approach
- 🧪 **Compatible**: Jest-compatible API for easy migration and familiar syntax
- 📊 **Coverage**: Built-in code coverage reporting with multiple providers
- 🔄 **Watch Mode**: Intelligent file watching for rapid development cycles

## Configuration Files

### `vitest.config.ts`

Our main Vitest configuration file sets up the testing environment:

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Browser-like environment for React testing
    globals: true, // Enable global test functions (describe, it, expect)
    setupFiles: ["./vitest.setup.ts"], // Global setup file
    coverage: {
      provider: "v8", // Fast native V8 coverage
      reporter: ["text", "json", "html"], // Multiple report formats
      exclude: [
        // Exclude unnecessary files from coverage
        "node_modules/",
        "src/__tests__/",
        "**/*.d.ts",
        "**/*.config.*",
      ],
      thresholds: {
        // Enforce minimum coverage requirements
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
    // ... additional configuration
  },
  resolve: {
    alias: {
      // Path aliases matching Next.js configuration
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/lib": resolve(__dirname, "./src/lib"),
      // ... more aliases
    },
  },
});
```

**Key Features:**

- **jsdom environment**: Simulates browser APIs for React component testing
- **Global functions**: Use `describe`, `it`, `expect` without imports
- **Path aliases**: Same `@/` imports as your Next.js app
- **Coverage thresholds**: Enforces 70% minimum coverage across all metrics
- **Multiple reporters**: Text output for CLI, JSON for CI/CD, HTML for detailed viewing

### `vitest.setup.ts`

Global test setup file that runs before all tests:

```typescript
import { vi } from "vitest";

// Mock Next.js navigation hooks globally
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    // ... other router methods
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));
```

**Purpose:**

- **Global mocks**: Set up mocks that apply to all tests
- **Next.js compatibility**: Mock navigation hooks that don't work in test environment
- **Consistent behavior**: Ensure predictable mock responses across all tests

## Test Modules

### `documentService.test.ts` - Database Service Testing

This test file demonstrates comprehensive mocking of the Supabase client and testing of CRUD operations.

#### Supabase Mocking Strategy

**The Challenge**: Supabase uses method chaining (fluent interface) that makes mocking complex:

```typescript
// Real Supabase usage
const { data, error } = await supabase
  .from("documents")
  .select("*")
  .eq("user_id", userId)
  .single();
```

**Our Solution**: Create individual mocks for each method in the chain:

```typescript
// Create separate mocks for each method
const mockSelect = vi.fn();
const mockSingle = vi.fn();
const mockInsert = vi.fn();
const mockEq = vi.fn();
const mockFrom = vi.fn();
const mockOrder = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();

// Special mocks for delete operations (which need separate chains)
const mockDeleteEq1 = vi.fn(); // First eq call in delete chain
const mockDeleteEq2 = vi.fn(); // Second eq call in delete chain
```

#### Mock Chain Setup

In `beforeEach`, we configure the mock chains for different operations:

```typescript
beforeEach(() => {
  vi.clearAllMocks();

  // Setup base mock returns
  mockFrom.mockReturnValue({
    insert: mockInsert,
    select: mockSelect,
    update: mockUpdate,
    delete: mockDelete,
  });

  // Configure create operation chain: from → insert → select → single
  mockInsert.mockReturnValue({
    select: mockSelect,
  });

  // Configure read operation chain: from → select → eq → single
  mockSelect.mockReturnValue({
    single: mockSingle,
    eq: mockEq,
  });

  // Configure delete operation chain: from → delete → eq → eq
  mockDelete.mockReturnValue({
    eq: mockDeleteEq1,
  });
  mockDeleteEq1.mockReturnValue({
    eq: mockDeleteEq2,
  });

  // Configure final resolvers
  mockSingle.mockResolvedValue({ data: mockData, error: null });
  mockDeleteEq2.mockResolvedValue({ data: null, error: null });
});
```

#### Test Structure

Each test follows this pattern:

1. **Setup**: Configure mock responses for the specific test case
2. **Execute**: Call the method being tested
3. **Assert Chain**: Verify the correct Supabase methods were called with correct parameters
4. **Assert Result**: Verify the return value matches expectations

```typescript
it("should create a document with correct arguments", async () => {
  // 1. Setup: Configure successful response
  mockSingle.mockResolvedValue({
    data: { ...mockData, user_id: "user-123" },
    error: null,
  });

  // 2. Execute: Call the method
  const result = await documentService.createDocument(document, userId);

  // 3. Assert Chain: Verify Supabase calls
  expect(mockFrom).toHaveBeenCalledWith("documents");
  expect(mockInsert).toHaveBeenCalledWith([{ ...document, user_id: userId }]);
  expect(mockSelect).toHaveBeenCalledWith();
  expect(mockSingle).toHaveBeenCalledWith();

  // 4. Assert Result: Verify response
  expect(result.success).toBe(true);
  expect(result.data).toEqual({ ...mockData, user_id: "user-123" });
});
```

### `ai-service.test.ts` - AI Service Testing

This test file demonstrates testing of external API calls and complex business logic.

#### Environment Variable Mocking

Uses `vi.hoisted()` to mock environment variables before module imports:

```typescript
// Must come before any imports
vi.hoisted(() => {
  process.env.TOGETHER_API_KEY = "test-api-key";
});

import { AIAnalysisService } from "@/lib/ai-service";
```

**Why `vi.hoisted()`?**: The AI service creates a module-level instance that reads environment variables during import. We need to set the environment variable before the module is loaded.

#### Fetch API Mocking

```typescript
beforeEach(() => {
  mockFetch = vi.fn();
  global.fetch = mockFetch; // Override global fetch

  aiService = new AIAnalysisService({
    apiKey: "test-api-key",
    timeout: 5000,
    maxRetries: 2,
  });
});
```

#### Test Scenarios Covered

1. **Happy Path**: Successful API responses with score normalization
2. **Validation**: Input validation (empty text, text too long)
3. **Error Handling**: Network errors, malformed responses, API failures
4. **Fallback Logic**: Testing the AI service's robust fallback mechanisms
5. **Options Handling**: Testing various configuration options

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test
# or
npx vitest run

# Run tests in watch mode (re-runs on file changes)
npx vitest
# or
npx vitest --watch

# Run specific test file
npx vitest src/__tests__/documentService.test.ts

# Run tests matching a pattern
npx vitest --grep "DocumentService"

# Run tests with verbose output
npx vitest --reporter verbose
```

### Watch Mode Features

When running in watch mode, Vitest provides an interactive interface:

- **`a`** - Run all tests
- **`f`** - Run only failed tests
- **`t`** - Filter by test name pattern
- **`q`** - Quit watch mode
- **`h`** - Show help with all options

### Coverage Commands

```bash
# Run tests with coverage
npx vitest run --coverage

# Run tests with coverage in watch mode
npx vitest --coverage

# Generate coverage for specific files
npx vitest run --coverage --coverage.include="src/services/**"
```

## Viewing Coverage Reports

After running tests with coverage, multiple report formats are generated:

### 1. Terminal Output

```bash
npx vitest run --coverage
```

Shows a summary table directly in your terminal with coverage percentages.

### 2. HTML Coverage Report

```bash
# Generate coverage (creates coverage/ directory)
npx vitest run --coverage

# Serve the HTML report
npx vite preview --outDir coverage
```

Then open `http://localhost:4173` in your browser to view the interactive coverage report.

**HTML Report Features:**

- 📊 **Visual Coverage**: Color-coded coverage visualization
- 🔍 **Line-by-Line**: See exactly which lines are covered/uncovered
- 📈 **Metrics**: Detailed coverage metrics for each file
- 🌐 **Interactive**: Click through files and directories
- 📱 **Responsive**: Works on desktop and mobile devices

### 3. Coverage Files

The coverage command generates these files in the `coverage/` directory:

- **`index.html`** - Main coverage report (open this in browser)
- **`coverage-final.json`** - Raw coverage data for CI/CD
- **`test-results.json`** - Test execution results
- **`src/`** - Per-file coverage details

## Best Practices

### 1. Test Organization

```typescript
describe("ServiceName", () => {
  describe("methodName", () => {
    it("should handle happy path", () => {});
    it("should handle error cases", () => {});
    it("should validate input", () => {});
  });
});
```

### 2. Mock Management

```typescript
beforeEach(() => {
  vi.clearAllMocks(); // Reset mock call counts
  // Setup fresh mock implementations
});

afterEach(() => {
  vi.restoreAllMocks(); // Restore original implementations
});
```

### 3. Descriptive Test Names

- ✅ `"should create a document with correct arguments"`
- ✅ `"should handle database connection errors"`
- ❌ `"test create document"`
- ❌ `"error handling"`

### 4. Comprehensive Error Testing

Always test both success and failure scenarios:

```typescript
it("should handle success case", async () => {
  mockFunction.mockResolvedValue({ data: mockData, error: null });
  // ... test success
});

it("should handle error case", async () => {
  mockFunction.mockResolvedValue({ data: null, error: new Error("Failed") });
  // ... test error handling
});
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure path aliases in `vitest.config.ts` match your `tsconfig.json`
2. **Mock Not Working**: Check if mocks are set up before imports using `vi.hoisted()`
3. **Environment Variables**: Use `vi.hoisted()` for env vars that affect module loading
4. **Async Issues**: Always `await` async operations in tests
5. **Coverage Missing**: Check that files are not excluded in coverage configuration

### Debug Mode

```bash
# Run with debug logging
npx vitest --reporter verbose --no-coverage

# Run single test file with debugging
npx vitest src/__tests__/documentService.test.ts --reporter verbose
```

This testing setup provides a robust foundation for maintaining code quality and catching regressions early in the development process.
