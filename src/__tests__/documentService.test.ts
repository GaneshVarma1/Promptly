import { vi, describe, it, expect, beforeEach } from "vitest";
import { Document } from "@/types";

// Create a more comprehensive mock
const mockSelect = vi.fn();
const mockSingle = vi.fn();
const mockInsert = vi.fn();
const mockEq = vi.fn();
const mockFrom = vi.fn();
const mockOrder = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();

// Add these new mocks for the delete chain
const mockDeleteEq1 = vi.fn(); // First eq call in delete chain
const mockDeleteEq2 = vi.fn(); // Second eq call in delete chain

vi.mock("../lib/ai-client", () => ({
  supabase: {
    from: mockFrom,
  },
}));

describe("DocumentService @unit", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup the mock chain for different operations
    mockFrom.mockReturnValue({
      insert: mockInsert,
      select: mockSelect,
      update: mockUpdate,
      delete: mockDelete,
    });

    // For create operations
    mockInsert.mockReturnValue({
      select: mockSelect,
    });

    // For update operations
    mockUpdate.mockReturnValue({
      eq: mockEq,
    });

    // For delete operations - use separate chain
    mockDelete.mockReturnValue({
      eq: mockDeleteEq1,
    });

    // First eq in delete chain returns second eq
    mockDeleteEq1.mockReturnValue({
      eq: mockDeleteEq2,
    });

    // Second eq in delete chain resolves the promise
    mockDeleteEq2.mockResolvedValue({
      data: null,
      error: null,
    });

    // For select operations
    mockSelect.mockReturnValue({
      single: mockSingle,
      eq: mockEq,
    });

    // For eq operations (chaining for non-delete operations)
    mockEq.mockReturnValue({
      eq: mockEq,
      single: mockSingle,
      order: mockOrder,
      select: mockSelect,
    });

    // For order operations
    mockOrder.mockResolvedValue({
      data: [],
      error: null,
    });
  });

  describe("createDocument", () => {
    it("should create a document with correct arguments", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockData = {
        id: "1",
        title: "Test Document",
        content: "Test Content",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "completed" as const,
        score: 85,
        lastModified: new Date().toDateString(),
        userId: "user-123",
      };

      // Mock successful response
      mockSingle.mockResolvedValue({
        data: { ...mockData, user_id: "user-123" },
        error: null,
      });

      const documentService = new DocumentService();
      const document: Document = {
        id: "1",
        title: "Test Document",
        content: "Test Content",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "completed",
        score: 85,
        lastModified: new Date().toDateString(),
        userId: "user-123",
      };

      const userId = "user-123";

      // Call the method
      const result = await documentService.createDocument(document, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockInsert).toHaveBeenCalledWith([
        {
          ...document,
          user_id: userId,
        },
      ]);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...mockData, user_id: "user-123" });
      expect(result.timestamp).toBeDefined();
    });

    it("should handle errors when creating a document", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockError = new Error("Database connection failed");

      // Mock error response
      mockSingle.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();
      const document: Document = {
        id: "1",
        title: "Test Document",
        content: "Test Content",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "completed",
        score: 85,
        lastModified: new Date().toDateString(),
        userId: "user-123",
      };

      const userId = "user-123";

      // Call the method
      const result = await documentService.createDocument(document, userId);

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Database connection failed");
      expect(result.timestamp).toBeDefined();
    });
  });

  describe("getDocumentById", () => {
    it("should get a document by id", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockDocument = {
        id: "test-id-123",
        title: "Retrieved Document",
        content: "Retrieved Content",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        status: "completed" as const,
        score: 90,
        lastModified: "Mon Jan 01 2024",
        userId: "user-456",
        user_id: "user-456", // Database field
      };

      // Mock successful response for getDocumentById
      mockSingle.mockResolvedValue({
        data: mockDocument,
        error: null,
      });

      const documentService = new DocumentService();
      const documentId = "test-id-123";
      const userId = "user-456";

      // Call the method
      const result = await documentService.getDocumentById(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockDocument);
      expect(result.timestamp).toBeDefined();
    });

    it("should handle errors when getting a document by id", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockError = new Error("Document not found");

      // Mock error response
      mockSingle.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();
      const documentId = "non-existent-id";
      const userId = "user-456";

      // Call the method
      const result = await documentService.getDocumentById(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Document not found");
      expect(result.timestamp).toBeDefined();
    });
  });

  describe("getAllDocuments", () => {
    it("should return empty array when no documents exist", async () => {
      const { DocumentService } = await import("@/services/documentService");

      // Mock empty response
      mockOrder.mockResolvedValue({
        data: [],
        error: null,
      });

      const documentService = new DocumentService();
      const userId = "user-123";

      // Call the method
      const result = await documentService.getAllDocuments(userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockOrder).toHaveBeenCalledWith("created_at", {
        ascending: false,
      });

      // Assert the result is an empty array
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it("should return array of documents when documents exist", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockDocuments = [
        {
          id: "doc-1",
          title: "First Document",
          content: "Content of first document",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
          status: "completed" as const,
          score: 85,
          lastModified: "Mon Jan 01 2024",
          userId: "user-123",
          user_id: "user-123",
          created_at: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "doc-2",
          title: "Second Document",
          content: "Content of second document",
          createdAt: "2024-01-02T00:00:00.000Z",
          updatedAt: "2024-01-02T00:00:00.000Z",
          status: "draft" as const,
          score: 70,
          lastModified: "Tue Jan 02 2024",
          userId: "user-123",
          user_id: "user-123",
          created_at: "2024-01-02T00:00:00.000Z",
        },
        {
          id: "doc-3",
          title: "Third Document",
          content: "Content of third document",
          createdAt: "2024-01-03T00:00:00.000Z",
          updatedAt: "2024-01-03T00:00:00.000Z",
          status: "in_progress" as const,
          score: 92,
          lastModified: "Wed Jan 03 2024",
          userId: "user-123",
          user_id: "user-123",
          created_at: "2024-01-03T00:00:00.000Z",
        },
      ];

      // Mock response with documents
      mockOrder.mockResolvedValue({
        data: mockDocuments,
        error: null,
      });

      const documentService = new DocumentService();
      const userId = "user-123";

      // Call the method
      const result = await documentService.getAllDocuments(userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockOrder).toHaveBeenCalledWith("created_at", {
        ascending: false,
      });

      // Assert the result contains the expected documents
      expect(result).toEqual(mockDocuments);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);

      // Verify the documents are in the expected order (newest first)
      expect(result[0].id).toBe("doc-1");
      expect(result[1].id).toBe("doc-2");
      expect(result[2].id).toBe("doc-3");

      // Verify each document has the expected structure
      result.forEach((doc) => {
        expect(doc).toHaveProperty("id");
        expect(doc).toHaveProperty("title");
        expect(doc).toHaveProperty("content");
        expect(doc).toHaveProperty("user_id", userId);
      });
    });

    it("should handle errors when getting all documents", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const mockError = new Error("Database connection failed");

      // Mock error response
      mockOrder.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();
      const userId = "user-123";

      // Call the method and expect it to throw
      await expect(documentService.getAllDocuments(userId)).rejects.toThrow(
        "Database connection failed"
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockOrder).toHaveBeenCalledWith("created_at", {
        ascending: false,
      });
    });

    it("should return empty array when data is null", async () => {
      const { DocumentService } = await import("@/services/documentService");

      // Mock null data response (edge case)
      mockOrder.mockResolvedValue({
        data: null,
        error: null,
      });

      const documentService = new DocumentService();
      const userId = "user-123";

      // Call the method
      const result = await documentService.getAllDocuments(userId);

      // Assert the result handles null data gracefully
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("updateDocument", () => {
    it("should update a document with correct arguments", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-123";
      const userId = "user-456";
      const updates = {
        title: "Updated Title",
        content: "Updated content for the document",
        score: 95,
        status: "completed" as const,
      };

      const mockUpdatedDocument = {
        id: documentId,
        title: "Updated Title",
        content: "Updated content for the document",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z",
        status: "completed" as const,
        score: 95,
        lastModified: "Mon Jan 15 2024",
        userId: userId,
        user_id: userId,
      };

      // Mock successful update response
      mockSingle.mockResolvedValue({
        data: mockUpdatedDocument,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.updateDocument(
        documentId,
        updates,
        userId
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockUpdate).toHaveBeenCalledWith(updates);
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUpdatedDocument);
      expect(result.timestamp).toBeDefined();
    });

    it("should update only specified fields", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-456";
      const userId = "user-789";
      const partialUpdates = {
        title: "New Title Only",
      };

      const mockUpdatedDocument = {
        id: documentId,
        title: "New Title Only",
        content: "Original content remains",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z",
        status: "draft" as const,
        score: 75,
        lastModified: "Mon Jan 15 2024",
        userId: userId,
        user_id: userId,
      };

      // Mock successful partial update response
      mockSingle.mockResolvedValue({
        data: mockUpdatedDocument,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method with partial updates
      const result = await documentService.updateDocument(
        documentId,
        partialUpdates,
        userId
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockUpdate).toHaveBeenCalledWith(partialUpdates);
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUpdatedDocument);
      expect(result.data.title).toBe("New Title Only");
      expect(result.timestamp).toBeDefined();
    });

    it("should handle errors when updating a document", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "non-existent-doc";
      const userId = "user-123";
      const updates = {
        title: "This will fail",
      };

      const mockError = new Error("Document not found or access denied");

      // Mock error response
      mockSingle.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.updateDocument(
        documentId,
        updates,
        userId
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockUpdate).toHaveBeenCalledWith(updates);
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Document not found or access denied");
      expect(result.timestamp).toBeDefined();
    });

    it("should handle updates with multiple field types", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-789";
      const userId = "user-456";
      const complexUpdates: Partial<Document> = {
        title: "Complex Update",
        content: "Updated content with new information",
        score: 88,
        status: "analyzing",
        lastModified: "Tue Jan 16 2024",
      };

      const mockUpdatedDocument: Document = {
        id: documentId,
        title: "Complex Update",
        content: "Updated content with new information",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-16T14:45:00.000Z",
        status: "draft" as const,
        score: 88,
        lastModified: "Tue Jan 16 2024",
        userId: userId,
      };

      // Mock successful complex update response
      mockSingle.mockResolvedValue({
        data: mockUpdatedDocument,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.updateDocument(
        documentId,
        complexUpdates,
        userId
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockUpdate).toHaveBeenCalledWith(complexUpdates);
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result with all updated fields
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUpdatedDocument);
      expect(result.data.title).toBe("Complex Update");
      expect(result.data.score).toBe(88);
      expect(result.data.status).toBe("draft");
      expect(result.timestamp).toBeDefined();
    });

    it("should handle empty updates object", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-empty";
      const userId = "user-123";
      const emptyUpdates = {};

      const mockOriginalDocument = {
        id: documentId,
        title: "Original Title",
        content: "Original content",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        status: "draft" as const,
        score: 60,
        lastModified: "Mon Jan 01 2024",
        userId: userId,
        user_id: userId,
      };

      // Mock response with no changes
      mockSingle.mockResolvedValue({
        data: mockOriginalDocument,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method with empty updates
      const result = await documentService.updateDocument(
        documentId,
        emptyUpdates,
        userId
      );

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockUpdate).toHaveBeenCalledWith(emptyUpdates);
      expect(mockEq).toHaveBeenCalledWith("id", documentId);
      expect(mockEq).toHaveBeenCalledWith("user_id", userId);
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledWith();

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockOriginalDocument);
      expect(result.timestamp).toBeDefined();
    });
  });

  describe("deleteDocument", () => {
    it("should delete a document successfully", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-to-delete";
      const userId = "user-123";

      // Mock successful delete response
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockDelete).toHaveBeenCalledWith();
      expect(mockDeleteEq1).toHaveBeenCalledWith("id", documentId);
      expect(mockDeleteEq2).toHaveBeenCalledWith("user_id", userId);

      // Assert the result
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
      expect(result.timestamp).toBeDefined();
    });

    it("should handle errors when deleting a document", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "non-existent-doc";
      const userId = "user-456";

      const mockError = new Error("Document not found or access denied");

      // Mock error response
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockDelete).toHaveBeenCalledWith();
      expect(mockDeleteEq1).toHaveBeenCalledWith("id", documentId);
      expect(mockDeleteEq2).toHaveBeenCalledWith("user_id", userId);

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Document not found or access denied");
      expect(result.timestamp).toBeDefined();
    });

    it("should handle database connection errors", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "doc-123";
      const userId = "user-789";

      const mockError = new Error("Database connection failed");

      // Mock database error response
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockDelete).toHaveBeenCalledWith();
      expect(mockDeleteEq1).toHaveBeenCalledWith("id", documentId);
      expect(mockDeleteEq2).toHaveBeenCalledWith("user_id", userId);

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Database connection failed");
      expect(result.timestamp).toBeDefined();
    });

    it("should handle permission errors", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "protected-doc";
      const userId = "unauthorized-user";

      const mockError = new Error("Insufficient permissions");

      // Mock permission error response
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const documentService = new DocumentService();

      // Call the method
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert the Supabase chain was called correctly
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockDelete).toHaveBeenCalledWith();
      expect(mockDeleteEq1).toHaveBeenCalledWith("id", documentId);
      expect(mockDeleteEq2).toHaveBeenCalledWith("user_id", userId);

      // Assert the error handling
      expect(result.success).toBe(false);
      expect(result.error).toBe("Insufficient permissions");
      expect(result.timestamp).toBeDefined();
    });

    it("should verify correct method call sequence", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "sequence-test-doc";
      const userId = "user-sequence";

      // Mock successful delete response
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method
      await documentService.deleteDocument(documentId, userId);

      // Verify the exact sequence of calls
      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDeleteEq1).toHaveBeenCalledTimes(1);
      expect(mockDeleteEq2).toHaveBeenCalledTimes(1);

      // Verify the order of calls
      expect(mockFrom).toHaveBeenCalledBefore(mockDelete);
      expect(mockDelete).toHaveBeenCalledBefore(mockDeleteEq1);
      expect(mockDeleteEq1).toHaveBeenCalledBefore(mockDeleteEq2);

      // Verify no unnecessary methods were called
      expect(mockSelect).not.toHaveBeenCalled();
      expect(mockSingle).not.toHaveBeenCalled();
      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("should handle edge case with empty string parameters", async () => {
      const { DocumentService } = await import("@/services/documentService");

      const documentId = "";
      const userId = "";

      // Mock response for edge case
      mockDeleteEq2.mockResolvedValue({
        data: null,
        error: null,
      });

      const documentService = new DocumentService();

      // Call the method with empty strings
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert the Supabase chain was called with empty strings
      expect(mockFrom).toHaveBeenCalledWith("documents");
      expect(mockDelete).toHaveBeenCalledWith();
      expect(mockDeleteEq1).toHaveBeenCalledWith("id", "");
      expect(mockDeleteEq2).toHaveBeenCalledWith("user_id", "");

      // Assert the result (should still succeed if no error from DB)
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
      expect(result.timestamp).toBeDefined();
    });
  });
});
