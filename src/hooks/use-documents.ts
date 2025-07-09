import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/ai-client';

export type DocumentStatus = 'active' | 'saved' | 'trash';

export interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  status: DocumentStatus;
  user_id: string;
  [key: string]: any;
}

export function useDocuments() {
  const { user, isLoaded } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setDocuments(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded && user?.id) {
      loadDocuments();
    }
  }, [isLoaded, user?.id, loadDocuments]);

  const createDocument = async (title = 'Untitled', content = '') => {
    if (!user?.id) return null;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{ title, content, status: 'active', user_id: user.id, lastModified: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      setDocuments((prev) => [data, ...prev]);
      return data.id;
    } catch (err: any) {
      setError(err.message || 'Failed to create document');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (error) throw error;
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id: string, status: DocumentStatus) => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('documents')
        .update({ status, lastModified: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, status } : doc)));
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return {
    documents,
    loading,
    error,
    createDocument,
    deleteDocument,
    setStatus,
    reload: loadDocuments,
  };
} 