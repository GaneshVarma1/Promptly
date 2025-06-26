import React from 'react';
import { FileText, Star, Download, Trash2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Document } from '@/hooks/use-documents';

interface DocumentCardProps {
  document: Document;
  isSaved: boolean;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
  isTrashMode?: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  isSaved, 
  onDelete, 
  onOpen, 
  onToggleSave, 
  isTrashMode = false 
}) => {
  const handleDownload = (doc: Document) => {
    const blob = new Blob([doc.content], { type: 'text/plain;charset=utf-8' });
    const link = window.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.title.replace(/ /g, '_')}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-800 transition-all duration-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 md:p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1">
                {new Date(document.lastModified).toLocaleDateString()}
              </span>
              {document.score && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Score: {document.score}
                </span>
              )}
            </div>
          </div>
          {isTrashMode ? (
            <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          ) : (
            isSaved && (
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-current" />
              </div>
            )
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
            {document.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3 leading-relaxed min-h-[4.5rem]">
            {document.content.substring(0, 120)}...
          </p>
        </div>
      </div>
      <div className="px-4 md:px-6 py-3 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {isTrashMode ? (
              <button 
                onClick={() => onToggleSave(document.id)}
                aria-label="Restore prompt"
                className="p-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                title="Restore to prompts"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => onToggleSave(document.id)}
                aria-label={isSaved ? 'Unsave prompt' : 'Save prompt'}
                className={`p-2 rounded-lg transition-colors ${isSaved ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'} hover:bg-gray-100 dark:hover:bg-zinc-800`}
                title={isSaved ? 'Remove from collection' : 'Add to collection'}
              >
                <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
            <button 
              onClick={() => handleDownload(document)}
              className="p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
              title="Download prompt"
              aria-label="Download prompt"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(document.id)}
              className="p-2 text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
              title={isTrashMode ? "Delete permanently" : "Move to trash"}
              aria-label={isTrashMode ? "Delete prompt permanently" : "Move prompt to trash"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => onOpen(document.id)}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors shadow-sm border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600"
            aria-label="Open prompt"
          >
            Open
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 