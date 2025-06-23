import { useState, useEffect, useCallback } from 'react';

export type DocumentStatus = 'active' | 'saved' | 'trash';

export interface Document {
  id: string; // will be a number as string, e.g. '1', '2', ...
  title: string;
  content: string;
  lastModified: string;
  score?: number;
}

function generateNextDocumentId(): string {
  // Find the highest numeric id and increment
  let maxId = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('document-')) {
      const id = key.replace('document-', '');
      const num = parseInt(id, 10);
      if (!isNaN(num) && num > maxId) {
        maxId = num;
      }
    }
  }
  return String(maxId + 1);
}

function getStoredScore(documentId: string, content: string): number {
  // Try to get the real AI score first
  const storedScore = localStorage.getItem(`score-${documentId}`);
  if (storedScore) {
    const score = parseInt(storedScore, 10);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      return score;
    }
  }
  
  // Fall back to content-based estimation for documents that haven't been analyzed yet
  if (!content || content.length < 10) return 0; // Show 0 for empty/very short content
  if (content.length < 50) return Math.floor(Math.random() * 20) + 30; // 30-49 for short content
  if (content.length < 200) return Math.floor(Math.random() * 25) + 50; // 50-74 for medium content
  return Math.floor(Math.random() * 25) + 60; // 60-84 for longer content (encourage analysis)
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load and clean documents
  const loadDocuments = useCallback(() => {
    // Migration: convert 'doc-' keys to 'document-' keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('doc-') && !key.startsWith('document-')) {
        const value = localStorage.getItem(key);
        if (value && value.trim() !== '') {
          const newKey = key.replace(/^doc-/, 'document-');
          localStorage.setItem(newKey, value);
          // Migrate status if exists
          const status = localStorage.getItem(`status-${key}`);
          if (status) {
            localStorage.setItem(`status-${newKey.replace('document-', '')}`, status);
            localStorage.removeItem(`status-${key}`);
          }
        }
        localStorage.removeItem(key);
      }
    }
    const loadedDocs: Document[] = [];
    let cleaned = false;
    const validIds = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('document-')) {
        const documentId = key.replace('document-', '');
        const value = localStorage.getItem(key);
        if (value !== null) {
          validIds.add(documentId);
          
          // Check for custom title first, then fall back to content-based title
          const customTitle = localStorage.getItem(`title-${documentId}`);
          let title: string;
          
          if (customTitle) {
            title = customTitle;
          } else if (value.trim()) {
            title = value.substring(0, 50) || 'Untitled Document';
          } else {
            title = 'New Document';
          }
          
          loadedDocs.push({
            id: documentId,
            title: title,
            content: value,
            lastModified: new Date().toISOString(),
            score: getStoredScore(documentId, value),
          });
        } else {
          localStorage.removeItem(key);
          cleaned = true;
        }
      }
    }
    // Clean up orphaned status, score, and title keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('status-') || key.startsWith('score-') || key.startsWith('title-'))) {
        const documentId = key.replace(/^(status-|score-|title-)/, '');
        if (!validIds.has(documentId)) {
          localStorage.removeItem(key);
          cleaned = true;
        }
      }
    }
    setDocuments(loadedDocs);
    if (cleaned) dispatchDocumentsUpdated();
  }, []);

  useEffect(() => {
    loadDocuments();
    const handleUpdate = () => loadDocuments();
    window.addEventListener('documents-updated', handleUpdate);
    return () => window.removeEventListener('documents-updated', handleUpdate);
  }, [loadDocuments]);

  function dispatchDocumentsUpdated() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('documents-updated'));
    }
  }

  function createDocument() {
    const newId = generateNextDocumentId();
    localStorage.setItem(`document-${newId}`, '');
    console.log(`Created document with ID: ${newId}, content:`, localStorage.getItem(`document-${newId}`));
    dispatchDocumentsUpdated();
    loadDocuments();
    return newId;
  }

  function deleteDocument(id: string) {
    localStorage.setItem(`status-${id}`, 'trash');
    dispatchDocumentsUpdated();
    loadDocuments();
  }

  function deleteAllSaved() {
    const idsToDelete: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('status-') && localStorage.getItem(key) === 'saved') {
        const id = key.replace('status-', '');
        idsToDelete.push(id);
      }
    }
    idsToDelete.forEach((id) => {
      localStorage.removeItem(`document-${id}`);
      localStorage.removeItem(`status-${id}`);
      localStorage.removeItem(`score-${id}`); // Clean up scores too
      localStorage.removeItem(`title-${id}`); // Clean up titles too
    });
    dispatchDocumentsUpdated();
    loadDocuments();
  }

  function setStatus(id: string, status: DocumentStatus) {
    localStorage.setItem(`status-${id}`, status);
    dispatchDocumentsUpdated();
    loadDocuments();
  }

  function getFilteredDocuments(tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery', search: string = ''): Document[] {
    return documents.filter(doc => {
      const status = localStorage.getItem(`status-${doc.id}`) || 'active';
      if (tab === 'documents') return status === 'active' || status === 'saved';
      if (tab === 'saved') return status === 'saved';
      if (tab === 'trash') return status === 'trash';
      return false;
    }).filter(doc => {
      if (!search) return true;
      return doc.title.toLowerCase().includes(search.toLowerCase()) || doc.content.toLowerCase().includes(search.toLowerCase());
    });
  }

  function deleteAllDocuments() {
    const keysToDelete: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('document-') || key.startsWith('status-') || key.startsWith('score-') || key.startsWith('title-') || key.startsWith('doc-'))) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => localStorage.removeItem(key));
    dispatchDocumentsUpdated();
    loadDocuments();
  }

  return {
    documents,
    createDocument,
    deleteDocument,
    deleteAllSaved,
    setStatus,
    getFilteredDocuments,
    reload: loadDocuments,
    deleteAllDocuments,
  };
} 