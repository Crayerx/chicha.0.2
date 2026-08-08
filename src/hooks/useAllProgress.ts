import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type LessonProgress } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Fetches lesson_progress rows for every lesson of the SIGNED-IN user at
 * once — used by the course catalog (per-card progress bars) and the
 * profile/stats page (aggregate totals). Returns an empty map when signed
 * out, since RLS wouldn't return anything anyway.
 */
export function useAllProgress() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [byLesson, setByLesson] = useState<Record<string, LessonProgress>>({});
  const [loaded, setLoaded] = useState(false);

  const refetch = useCallback(async () => {
    if (!userId || !isSupabaseConfigured || !supabase) {
      setByLesson({});
      setLoaded(true);
      return;
    }
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('user_id, lesson_id, current_step, total_xp, completed_steps, is_finished, quiz_score')
      .eq('user_id', userId);

    if (error) {
      console.warn('No se pudo cargar el progreso general:', error.message);
      setLoaded(true);
      return;
    }
    const map: Record<string, LessonProgress> = {};
    for (const row of (data ?? []) as LessonProgress[]) {
      map[row.lesson_id] = row;
    }
    setByLesson(map);
    setLoaded(true);
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refetch();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [refetch]);

  return { byLesson, loaded, refetch, isAuthenticated: !!userId };
}
