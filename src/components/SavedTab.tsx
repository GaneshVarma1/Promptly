"use client";

import { useState, useMemo } from 'react';
import { SearchIcon, StarIcon, BookOpenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { DocumentGrid } from './DocumentGrid';
import { useDocuments } from '@/hooks/use-documents';

export function SavedTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, setStatus, deleteDocument } = useDocuments();

  const savedDocuments = useMemo(() => {
    const saved = documents.filter(doc => {
      const status = localStorage.getItem(`status-${doc.id}`);
      return status === 'saved';
    });
    
    if (!searchQuery.trim()) return saved;
    
    return saved.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const getIsSaved = (id: string) => {
    return localStorage.getItem(`status-${id}`) === 'saved';
  };

  const handleToggleSave = (id: string) => {
    const currentStatus = localStorage.getItem(`status-${id}`) || 'active';
    setStatus(id, currentStatus === 'saved' ? 'active' : 'saved');
  };

  const handleOpen = (id: string) => {
    router.push(`/results?id=${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Saved Documents
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Your saved documents and bookmarks
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search saved documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
        />
      </div>

      {/* Documents Grid */}
      {savedDocuments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <StarIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No saved documents found' : 'No saved documents yet'}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Save documents by clicking the star icon on any document.'
            }
          </p>
        </div>
      ) : (
        <DocumentGrid 
          documents={savedDocuments}
          getIsSaved={getIsSaved}
          onDelete={deleteDocument}
          onOpen={handleOpen}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
} 