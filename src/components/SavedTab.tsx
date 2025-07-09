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
  const { documents, setStatus, deleteDocument, loading, error } = useDocuments();

  const savedDocuments = useMemo(() => {
    const saved = documents.filter(doc => doc.status === 'saved');
    if (!searchQuery.trim()) return saved;
    return saved.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const getIsSaved = (id: string) => {
    const doc = documents.find(d => d.id === id);
    return doc?.status === 'saved';
  };

  const handleToggleSave = async (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      await setStatus(id, doc.status === 'saved' ? 'active' : 'saved');
    }
  };

  const handleDelete = async (id: string) => {
    await setStatus(id, 'trash');
  };

  const handleOpen = (id: string) => {
    router.push(`/results?id=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300 dark:border-gray-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Saved Prompts
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Your curated prompt collection and bookmarks
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search saved prompts..."
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
            {searchQuery ? 'No saved prompts found' : 'No saved prompts yet'}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Save prompts by clicking the star icon on any prompt card.'
            }
          </p>
        </div>
      ) : (
        <DocumentGrid 
          documents={savedDocuments}
          getIsSaved={getIsSaved}
          onDelete={handleDelete}
          onOpen={handleOpen}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
} 