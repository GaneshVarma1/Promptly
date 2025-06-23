import React from 'react';
import { Document } from '@/hooks/use-documents';
import { DocumentCard } from './DocumentCard';

interface DocumentGridProps {
  documents: Document[];
  getIsSaved: (id: string) => boolean;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({ documents, getIsSaved, onDelete, onOpen, onToggleSave }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          isSaved={getIsSaved(doc.id)}
          onDelete={onDelete}
          onOpen={onOpen}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}; 