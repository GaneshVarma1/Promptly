"use client";

import { useState, useMemo } from 'react';
import { SearchIcon, TrashIcon, AlertTriangleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DocumentGrid } from './DocumentGrid';
import { useDocuments } from '@/hooks/use-documents';

export function TrashTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, setStatus, deleteDocument, deleteAllSaved } = useDocuments();

  const trashedDocuments = useMemo(() => {
    const trashed = documents.filter(doc => {
      const status = localStorage.getItem(`status-${doc.id}`);
      return status === 'trash';
    });
    
    if (!searchQuery.trim()) return trashed;
    
    return trashed.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const getIsSaved = (id: string) => {
    return localStorage.getItem(`status-${id}`) === 'saved';
  };

  const handleRestore = (id: string) => {
    setStatus(id, 'active');
  };

  const handleOpen = (id: string) => {
    router.push(`/results?id=${id}`);
  };

  const handlePermanentDelete = () => {
    if (confirm('Are you sure you want to permanently delete all documents in trash? This action cannot be undone.')) {
      // Delete all trashed documents permanently
      trashedDocuments.forEach(doc => {
        localStorage.removeItem(`document-${doc.id}`);
        localStorage.removeItem(`status-${doc.id}`);
        localStorage.removeItem(`score-${doc.id}`);
        localStorage.removeItem(`title-${doc.id}`);
      });
      // Trigger documents update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('documents-updated'));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Trash
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Deleted documents (can be restored)
          </p>
        </div>
        {trashedDocuments.length > 0 && (
          <Button 
            onClick={handlePermanentDelete}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Empty Trash
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search deleted documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
        />
      </div>

      {/* Documents Grid */}
      {trashedDocuments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrashIcon className="w-8 h-8 text-gray-400 dark:text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No deleted documents found' : 'Trash is empty'}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Documents you delete will appear here and can be restored.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Warning banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Documents in trash
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  These documents are deleted but can still be restored. Use "Empty Trash" to permanently delete them.
                </p>
              </div>
            </div>
          </div>
          
          <DocumentGrid 
            documents={trashedDocuments}
            getIsSaved={getIsSaved}
            onDelete={deleteDocument}
            onOpen={handleOpen}
            onToggleSave={handleRestore}
          />
        </div>
      )}
    </div>
  );
} 