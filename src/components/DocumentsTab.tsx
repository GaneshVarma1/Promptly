"use client";

import { useState, useMemo } from 'react';
import { PlusIcon, SearchIcon, FileTextIcon, BookOpenIcon, ClockIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DocumentGrid } from './DocumentGrid';
import { useDocuments } from '@/hooks/use-documents';
import { useDocumentCounts } from '@/hooks/use-document-counts';

export function DocumentsTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, setStatus, deleteDocument, createDocument } = useDocuments();
  const counts = useDocumentCounts();

  const filteredDocuments = useMemo(() => {
    const activeDocuments = documents.filter(doc => {
      const status = localStorage.getItem(`status-${doc.id}`) || 'active';
      return status === 'active' || status === 'saved';
    });
    
    if (!searchQuery.trim()) return activeDocuments;
    
    return activeDocuments.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const handleNewDocument = () => {
    const newId = createDocument();
    console.log(`About to navigate to document ${newId}`);
    
    // Verify the document exists before navigating
    const verifyDocument = () => {
      const exists = localStorage.getItem(`document-${newId}`) !== null;
      console.log(`Document ${newId} exists: ${exists}`);
      
      if (exists) {
        router.push(`/results?id=${newId}`);
      } else {
        console.error(`Document ${newId} was not created properly, retrying...`);
        // Try creating again
        localStorage.setItem(`document-${newId}`, '');
        setTimeout(() => router.push(`/results?id=${newId}`), 100);
      }
    };
    
    // Small delay to ensure the document is properly created before navigation
    setTimeout(verifyDocument, 50);
  };

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
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            All Documents
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Manage and organize your AI-generated content
          </p>
        </div>
        <Button onClick={handleNewDocument} className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm">
          <PlusIcon className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">New Document</span>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts.documents + counts.saved}</div>
              <div className="text-sm text-gray-500 dark:text-zinc-400">Total Documents</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts.saved}</div>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts.trash}</div>
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
          placeholder="Search documents..."
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
            {searchQuery ? 'No documents found' : 'No documents yet'}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Create your first document to get started with AI-powered writing assistance.'
            }
          </p>
          {!searchQuery && (
            <Button onClick={handleNewDocument} className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New Document
            </Button>
          )}
        </div>
      ) : (
        <DocumentGrid 
          documents={filteredDocuments}
          getIsSaved={getIsSaved}
          onDelete={deleteDocument}
          onOpen={handleOpen}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
} 