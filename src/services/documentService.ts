/**
 * Document Service
 * @fileoverview Enterprise-level document management service
 * @version 1.0.0
 */

import { 
  Document, 
  CreateDocumentRequest, 
  UpdateDocumentRequest, 
  DocumentStatusType,
  ApiResponse,
  PaginatedResponse 
} from '@/types';
import { 
  STORAGE_KEYS, 
  DOCUMENT_CONFIG, 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES,
  REGEX_PATTERNS 
} from '@/constants';
import { generateId, formatDate, sanitizeInput } from '@/lib/utils';

/**
 * Document query parameters for filtering and pagination
 */
export interface DocumentQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: DocumentStatusType;
  readonly search?: string;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'score';
  readonly sortOrder?: 'asc' | 'desc';
  readonly userId?: string;
}

/**
 * Document statistics interface
 */
export interface DocumentStats {
  readonly total: number;
  readonly byStatus: Record<DocumentStatusType, number>;
  readonly averageScore: number;
  readonly totalWordCount: number;
  readonly recentActivity: number;
}

/**
 * Enterprise-level Document Service Class
 * Implements SOLID principles and design patterns
 */
export class DocumentService {
  private readonly storagePrefix = STORAGE_KEYS.DOCUMENT_PREFIX;
  private readonly cache = new Map<string, Document>();
  private readonly eventListeners = new Map<string, Set<(document: Document) => void>>();

  /**
   * Create a new document
   */
  async createDocument(
    request: CreateDocumentRequest, 
    userId: string
  ): Promise<ApiResponse<Document>> {
    try {
      this.validateCreateRequest(request);
      
      const document: Document = {
        id: this.generateDocumentId(),
        title: sanitizeInput(request.title),
        content: sanitizeInput(request.content),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        userId,
        metadata: {
          wordCount: this.countWords(request.content),
          readingTime: this.calculateReadingTime(request.content),
          ...request.metadata,
        },
      };

      await this.saveDocument(document);
      this.updateCache(document);
      this.notifyListeners('created', document);

      return {
        success: true,
        data: document,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update an existing document
   */
  async updateDocument(
    id: string, 
    request: UpdateDocumentRequest, 
    userId: string
  ): Promise<ApiResponse<Document>> {
    try {
      const existingDocument = await this.getDocumentById(id, userId);
      if (!existingDocument.success || !existingDocument.data) {
        return {
          success: false,
          error: 'Document not found',
          timestamp: new Date().toISOString(),
        };
      }

      this.validateUpdateRequest(request);

      const updatedDocument: Document = {
        ...existingDocument.data,
        ...request,
        title: request.title ? sanitizeInput(request.title) : existingDocument.data.title,
        content: request.content ? sanitizeInput(request.content) : existingDocument.data.content,
        updatedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        metadata: {
          ...existingDocument.data.metadata,
          ...request.metadata,
          wordCount: request.content ? this.countWords(request.content) : existingDocument.data.metadata?.wordCount,
          readingTime: request.content ? this.calculateReadingTime(request.content) : existingDocument.data.metadata?.readingTime,
        },
      };

      await this.saveDocument(updatedDocument);
      this.updateCache(updatedDocument);
      this.notifyListeners('updated', updatedDocument);

      return {
        success: true,
        data: updatedDocument,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get document by ID
   */
  async getDocumentById(id: string, userId: string): Promise<ApiResponse<Document>> {
    try {
      // Check cache first
      const cachedDocument = this.cache.get(id);
      if (cachedDocument && cachedDocument.userId === userId) {
        return {
          success: true,
          data: cachedDocument,
          timestamp: new Date().toISOString(),
        };
      }

      // Load from storage
      const documentData = localStorage.getItem(`${this.storagePrefix}${id}`);
      if (!documentData) {
        return {
          success: false,
          error: 'Document not found',
          timestamp: new Date().toISOString(),
        };
      }

      const document: Document = JSON.parse(documentData);
      
      // Verify ownership
      if (document.userId !== userId) {
        return {
          success: false,
          error: 'Unauthorized access',
          timestamp: new Date().toISOString(),
        };
      }

      this.updateCache(document);

      return {
        success: true,
        data: document,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get paginated documents with filtering
   */
  async getDocuments(
    params: DocumentQueryParams = {}
  ): Promise<ApiResponse<PaginatedResponse<Document>>> {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        search,
        sortBy = 'updatedAt',
        sortOrder = 'desc',
        userId
      } = params;

      if (!userId) {
        throw new Error('User ID is required');
      }

      let documents = await this.getAllDocuments(userId);

      // Apply filters
      if (status) {
        documents = documents.filter(doc => doc.status === status);
      }

      if (search) {
        const searchTerm = search.toLowerCase();
        documents = documents.filter(doc => 
          doc.title.toLowerCase().includes(searchTerm) ||
          doc.content.toLowerCase().includes(searchTerm)
        );
      }

      // Apply sorting
      documents.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortOrder === 'asc' ? comparison : -comparison;
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDocuments = documents.slice(startIndex, endIndex);

      const response: PaginatedResponse<Document> = {
        items: paginatedDocuments,
        total: documents.length,
        page,
        limit,
        hasNext: endIndex < documents.length,
        hasPrev: page > 1,
      };

      return {
        success: true,
        data: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete a document (soft delete by changing status)
   */
  async deleteDocument(id: string, userId: string): Promise<ApiResponse<void>> {
    try {
      const result = await this.updateDocument(id, { status: 'deleted' }, userId);
      
      if (result.success && result.data) {
        this.notifyListeners('deleted', result.data);
      }

      return {
        success: result.success,
        error: result.error,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Permanently delete a document
   */
  async permanentlyDeleteDocument(id: string, userId: string): Promise<ApiResponse<void>> {
    try {
      const document = await this.getDocumentById(id, userId);
      if (!document.success || !document.data) {
        return {
          success: false,
          error: 'Document not found',
          timestamp: new Date().toISOString(),
        };
      }

      localStorage.removeItem(`${this.storagePrefix}${id}`);
      this.cache.delete(id);
      this.notifyListeners('permanently_deleted', document.data);

      return {
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get document statistics
   */
  async getDocumentStats(userId: string): Promise<ApiResponse<DocumentStats>> {
    try {
      const documents = await this.getAllDocuments(userId);
      
      const stats: DocumentStats = {
        total: documents.length,
        byStatus: documents.reduce((acc, doc) => {
          acc[doc.status] = (acc[doc.status] || 0) + 1;
          return acc;
        }, {} as Record<DocumentStatusType, number>),
        averageScore: this.calculateAverageScore(documents),
        totalWordCount: documents.reduce((total, doc) => total + (doc.metadata?.wordCount || 0), 0),
        recentActivity: this.calculateRecentActivity(documents),
      };

      return {
        success: true,
        data: stats,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Search documents with advanced filtering
   */
  async searchDocuments(
    query: string, 
    userId: string, 
    options: {
      includeContent?: boolean;
      fuzzySearch?: boolean;
      maxResults?: number;
    } = {}
  ): Promise<ApiResponse<Document[]>> {
    try {
      const { includeContent = true, fuzzySearch = false, maxResults = 50 } = options;
      
      if (query.length < DOCUMENT_CONFIG.SEARCH.MIN_QUERY_LENGTH) {
        return {
          success: false,
          error: `Search query must be at least ${DOCUMENT_CONFIG.SEARCH.MIN_QUERY_LENGTH} characters`,
          timestamp: new Date().toISOString(),
        };
      }

      const documents = await this.getAllDocuments(userId);
      const searchTerm = query.toLowerCase();
      
      let results = documents.filter(doc => {
        const titleMatch = doc.title.toLowerCase().includes(searchTerm);
        const contentMatch = includeContent && doc.content.toLowerCase().includes(searchTerm);
        
        return titleMatch || contentMatch;
      });

      // Apply fuzzy search if enabled
      if (fuzzySearch) {
        results = this.applyFuzzySearch(results, searchTerm);
      }

      // Limit results
      results = results.slice(0, maxResults);

      return {
        success: true,
        data: results,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Subscribe to document events
   */
  public addEventListener(
    event: 'created' | 'updated' | 'deleted' | 'permanently_deleted',
    callback: (document: Document) => void
  ): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    
    this.eventListeners.get(event)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.eventListeners.get(event)?.delete(callback);
    };
  }

  // Private helper methods

  private generateDocumentId(): string {
    return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private validateCreateRequest(request: CreateDocumentRequest): void {
    if (!request.title || request.title.trim().length === 0) {
      throw new Error(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD);
    }

    if (request.title.length > DOCUMENT_CONFIG.LIMITS.MAX_TITLE_LENGTH) {
      throw new Error(`Title must be less than ${DOCUMENT_CONFIG.LIMITS.MAX_TITLE_LENGTH} characters`);
    }

    if (!request.content || request.content.trim().length < DOCUMENT_CONFIG.LIMITS.MIN_CONTENT_LENGTH) {
      throw new Error(`Content must be at least ${DOCUMENT_CONFIG.LIMITS.MIN_CONTENT_LENGTH} characters`);
    }

    if (request.content.length > DOCUMENT_CONFIG.LIMITS.MAX_CONTENT_LENGTH) {
      throw new Error(`Content must be less than ${DOCUMENT_CONFIG.LIMITS.MAX_CONTENT_LENGTH} characters`);
    }
  }

  private validateUpdateRequest(request: UpdateDocumentRequest): void {
    if (request.title !== undefined) {
      if (request.title.trim().length === 0) {
        throw new Error(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD);
      }
      if (request.title.length > DOCUMENT_CONFIG.LIMITS.MAX_TITLE_LENGTH) {
        throw new Error(`Title must be less than ${DOCUMENT_CONFIG.LIMITS.MAX_TITLE_LENGTH} characters`);
      }
    }

    if (request.content !== undefined) {
      if (request.content.trim().length < DOCUMENT_CONFIG.LIMITS.MIN_CONTENT_LENGTH) {
        throw new Error(`Content must be at least ${DOCUMENT_CONFIG.LIMITS.MIN_CONTENT_LENGTH} characters`);
      }
      if (request.content.length > DOCUMENT_CONFIG.LIMITS.MAX_CONTENT_LENGTH) {
        throw new Error(`Content must be less than ${DOCUMENT_CONFIG.LIMITS.MAX_CONTENT_LENGTH} characters`);
      }
    }
  }

  private async saveDocument(document: Document): Promise<void> {
    try {
      localStorage.setItem(`${this.storagePrefix}${document.id}`, JSON.stringify(document));
    } catch (error) {
      throw new Error('Failed to save document. Storage might be full.');
    }
  }

  private async getAllDocuments(userId: string): Promise<Document[]> {
    const documents: Document[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.storagePrefix)) {
        try {
          const documentData = localStorage.getItem(key);
          if (documentData) {
            const document: Document = JSON.parse(documentData);
            if (document.userId === userId) {
              documents.push(document);
            }
          }
        } catch (error) {
          // Skip invalid documents
          console.warn(`Failed to parse document: ${key}`);
        }
      }
    }
    
    return documents;
  }

  private updateCache(document: Document): void {
    this.cache.set(document.id, document);
    
    // Limit cache size
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  private notifyListeners(event: string, document: Document): void {
    this.eventListeners.get(event)?.forEach(callback => {
      try {
        callback(document);
      } catch (error) {
        console.error('Error in document event listener:', error);
      }
    });
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private calculateReadingTime(text: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = this.countWords(text);
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private calculateAverageScore(documents: Document[]): number {
    const documentsWithScores = documents.filter(doc => doc.score !== undefined);
    if (documentsWithScores.length === 0) return 0;
    
    const totalScore = documentsWithScores.reduce((sum, doc) => sum + (doc.score || 0), 0);
    return Math.round(totalScore / documentsWithScores.length);
  }

  private calculateRecentActivity(documents: Document[]): number {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    return documents.filter(doc => doc.updatedAt > oneDayAgo).length;
  }

  private applyFuzzySearch(documents: Document[], searchTerm: string): Document[] {
    // Simple fuzzy search implementation
    return documents.filter(doc => {
      const title = doc.title.toLowerCase();
      const content = doc.content.toLowerCase();
      
      // Check for partial matches and character similarity
      const titleDistance = this.levenshteinDistance(title, searchTerm);
      const contentDistance = this.levenshteinDistance(content.substring(0, 100), searchTerm);
      
      const maxDistance = Math.floor(searchTerm.length * 0.3); // Allow 30% character difference
      
      return titleDistance <= maxDistance || contentDistance <= maxDistance;
    });
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + substitutionCost // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  private handleError(error: unknown): ApiResponse<never> {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    console.error('DocumentService Error:', error);
    
    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const documentService = new DocumentService(); 