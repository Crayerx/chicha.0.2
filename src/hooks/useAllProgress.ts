import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type LessonProgress } from '@/lib/supabase';

/**
 * Fetches lesson_progress rows for every lesson at once — used by the course
 * catalog (per-card progress bars) and the profile/stats page (aggregate
 * totals), so we don't fire one query per card.
 */
export function useAllProgress() {
  const [byLesson, setByLesson] = useState<Record<string, LessonProgress>>({});
  const [loaded, setLoaded] = useState(false);

  const refetch = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoaded(true);
      return;
    }
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('lesson_id, current_step, total_xp, completed_steps, is_finished, quiz_score');

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
  }, []);

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

  return { byLesson, loaded, refetch };
}
