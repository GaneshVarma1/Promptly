import { useState, useEffect, useCallback } from 'react';

export interface DocumentCounts {
  documents: number;
  saved: number;
  trash: number;
}

export function useDocumentCounts() {
  const [counts, setCounts] = useState<DocumentCounts>({ documents: 0, saved: 0, trash: 0 });

  const cleanupAndCalculateCounts = useCallback(() => {
    let documents = 0;
    let saved = 0;
    let trash = 0;
    const validIds = new Set<string>();
    
    // First, collect all valid document IDs
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('document-')) {
        const documentId = key.replace('document-', '');
        const value = localStorage.getItem(key);
        if (value !== null) { // Allow empty strings as valid documents
          validIds.add(documentId);
        } else {
          localStorage.removeItem(key);
        }
      }
    }
    
    // Count documents by their status (or default to 'active')
    validIds.forEach(documentId => {
      const status = localStorage.getItem(`status-${documentId}`) || 'active';
      if (status === 'active') documents++;
      else if (status === 'saved') saved++;
      else if (status === 'trash') trash++;
    });
    
    // Clean up orphaned status keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('status-')) {
        const documentId = key.replace('status-', '');
        if (!validIds.has(documentId)) {
          localStorage.removeItem(key);
        }
      }
    }
    
    setCounts({ documents, saved, trash });
  }, []);

  useEffect(() => {
    cleanupAndCalculateCounts();
    const handleUpdate = () => cleanupAndCalculateCounts();
    window.addEventListener('documents-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('documents-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [cleanupAndCalculateCounts]);

  return counts;
} 