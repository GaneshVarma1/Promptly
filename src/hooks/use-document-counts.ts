import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/ai-client';

export interface DocumentCounts {
  documents: number;
  saved: number;
  trash: number;
}

export function useDocumentCounts() {
  const { user, isLoaded } = useUser();
  const [counts, setCounts] = useState<DocumentCounts>({ documents: 0, saved: 0, trash: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('status', { count: 'exact', head: false })
        .eq('user_id', user.id);
      if (error) throw error;
      const documents = data.filter((d: any) => d.status === 'active').length;
      const saved = data.filter((d: any) => d.status === 'saved').length;
      const trash = data.filter((d: any) => d.status === 'trash').length;
      setCounts({ documents, saved, trash });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch document counts');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchCounts();
    }
  }, [isLoaded, user?.id, fetchCounts]);

  return { ...counts, loading, error, reload: fetchCounts };
} 