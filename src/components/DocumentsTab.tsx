"use client";

import { useState, useMemo } from 'react';
import { PlusIcon, SearchIcon, FileTextIcon, BookOpenIcon, ClockIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DocumentGrid } from './DocumentGrid';
import { useDocuments } from '@/hooks/use-documents';
import { useDocumentCounts } from '@/hooks/use-document-counts';
import { GetStartedSection } from './GetStartedSection';

interface DocumentsTabProps {
  onTabChange?: (tab: 'prompt-gallery' | 'models') => void;
}

export function DocumentsTab({ onTabChange }: DocumentsTabProps = {}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, setStatus, deleteDocument, createDocument, loading, error } = useDocuments();
  const { documents: docCount, saved, trash, loading: countsLoading, error: countsError } = useDocumentCounts();

  const filteredDocuments = useMemo(() => {
    const activeDocuments = documents.filter(doc => doc.status === 'active' || doc.status === 'saved');
    if (!searchQuery.trim()) return activeDocuments;
    return activeDocuments.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const handleNewDocument = async () => {
    const newId = await createDocument();
    if (newId) {
      router.push(`/results?id=${newId}`);
    }
  };

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

  if (loading || countsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300 dark:border-gray-600"></div>
      </div>
    );
  }

  if (error || countsError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || countsError}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Get Started Section */}
      <GetStartedSection 
        onNewPrompt={handleNewDocument}
        onTabChange={onTabChange || (() => {})}
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            All Prompts
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Manage and organize your enterprise prompt library
          </p>
        </div>
        <Button onClick={handleNewDocument} className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm">
          <PlusIcon className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">New Prompt</span>
          <span className="xs:hidden">New</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{docCount + saved}</div>
              <div className="text-sm text-gray-500 dark:text-zinc-400">Total Prompts</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{saved}</div>
              <div className="text-sm text-gray-500 dark:text-zinc-400">Saved</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{trash}</div>
              <div className="text-sm text-gray-500 dark:text-zinc-400">Recent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
        />
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpenIcon className="w-8 h-8 text-gray-400 dark:text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No prompts found' : 'No prompts yet'}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Create your first prompt to get started with professional AI development.'
            }
          </p>
          {!searchQuery && (
            <Button onClick={handleNewDocument} className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New Prompt
            </Button>
          )}
        </div>
      ) : (
        <DocumentGrid 
          documents={filteredDocuments}
          getIsSaved={getIsSaved}
          onDelete={handleDelete}
          onOpen={handleOpen}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
} 