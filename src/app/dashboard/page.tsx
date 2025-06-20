"use client";

import { useState, useEffect } from "react";
import { PlusIcon, Search, FileText, Download, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  score?: number;
}

function generateDocumentId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `doc_${timestamp}_${randomStr}`;
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<'documents' | 'saved' | 'trash' | 'prompt-gallery'>('documents');
  const router = useRouter();

  const handleTabChange = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery') => {
    setCurrentTab(tab);
  };

  const generateScore = (content: string): number => {
    if (!content || content.length < 10) return Math.floor(Math.random() * 30) + 40;
    if (content.length < 100) return Math.floor(Math.random() * 20) + 70;
    return Math.floor(Math.random() * 15) + 85;
  };

  useEffect(() => {
    const loadDocuments = () => {
      const loadedDocs: Document[] = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('document-')) {
            const value = localStorage.getItem(key);
            if (value) {
              try {
                const doc = JSON.parse(value);
                if (typeof doc === 'object' && doc !== null && doc.title) {
                  if (!doc.score) {
                    doc.score = generateScore(doc.content || '');
                  }
                  loadedDocs.push({ ...doc, id: key.replace('document-', '') });
                }
              } catch (e) {
                loadedDocs.push({
                  id: key.replace('document-', ''),
                  title: value.substring(0, 50) || 'Untitled Document',
                  content: value,
                  lastModified: new Date().toISOString(),
                  score: generateScore(value),
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      }
      setDocuments(loadedDocs);
      setIsLoading(false);
    };

    loadDocuments();
  }, [currentTab]);

  const handleCreateNewDocument = () => {
    const newId = generateDocumentId();
    const newDoc: Document = {
      id: newId,
      title: 'Untitled Document',
      content: '',
      lastModified: new Date().toISOString(),
      score: generateScore(''),
    };
    localStorage.setItem(`document-${newId}`, JSON.stringify(newDoc));
    localStorage.setItem(`status-${newId}`, 'active');
    router.push(`/results/${newId}`);
  };

  const handleDelete = (id: string) => {
    localStorage.setItem(`status-${id}`, 'trash');
    setDocuments(documents.filter(d => d.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
        <DashboardSidebar currentTab={'documents'} onTabChange={handleTabChange} />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="w-8 h-8 border-2 border-gray-300 dark:border-zinc-600 border-t-gray-600 dark:border-t-zinc-300 rounded-full animate-spin" />
        </main>
      </div>
    );
  }
  
  const filteredDocs = documents.filter(doc => {
    const status = localStorage.getItem(`status-${doc.id}`) || 'active';
    if (currentTab === 'documents') return status === 'active' || status === 'saved';
    if (currentTab === 'saved') return status === 'saved';
    if (currentTab === 'trash') return status === 'trash';
    return false;
  }).filter(doc => {
    if (!search) return true;
    return doc.title.toLowerCase().includes(search.toLowerCase()) || 
           doc.content.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      <DashboardSidebar currentTab={currentTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {currentTab === 'documents' ? 'Documents' : 
               currentTab === 'saved' ? 'Saved Documents' :
               currentTab === 'trash' ? 'Trash' : 'Prompt Gallery'}
            </h1>
            <p className="text-gray-600 dark:text-zinc-400 mt-1">
              {currentTab === 'documents' ? 'All your documents and saved items' : 
               currentTab === 'saved' ? 'Your starred documents' :
               currentTab === 'trash' ? 'Recently deleted documents' : 'Ready-to-use prompt templates'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            
            <button
              onClick={handleCreateNewDocument}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <PlusIcon className="w-4 h-4" />
              New Document
            </button>
          </div>
        </div>
        
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const status = localStorage.getItem(`status-${doc.id}`) || 'active';
              const isSaved = status === 'saved';
              
              return (
                <div key={doc.id} className="group relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-800 transition-all duration-200 overflow-hidden flex flex-col h-full">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1">
                            {new Date(doc.lastModified).toLocaleDateString()}
                          </span>
                          {doc.score && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              Score: {doc.score}
                            </span>
                          )}
                        </div>
                      </div>
                      {isSaved && (
                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-current" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
                        {doc.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                        {doc.content.substring(0, 120)}...
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                          className="p-2 text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
                          title="Move to trash"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <Link 
                        href={`/results/${doc.id}`}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Open
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 mb-6">
              {currentTab === 'documents' ? 'Create your first document to get started' :
               currentTab === 'saved' ? 'No saved documents yet' :
               'No documents in trash'}
            </p>
            {currentTab === 'documents' && (
              <button
                onClick={handleCreateNewDocument}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Create your first document
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
