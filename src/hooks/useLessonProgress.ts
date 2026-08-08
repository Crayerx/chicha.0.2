import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type LessonProgress } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

function emptyProgress(userId: string, lessonId: string): LessonProgress {
  return {
    user_id: userId,
    lesson_id: lessonId,
    current_step: 1,
    total_xp: 0,
    completed_steps: [],
    is_finished: false,
    quiz_score: 0,
  };
}

/**
 * Per-lesson progress, scoped to the signed-in user. Without a session there
 * is no row to read or write (RLS would reject it anyway), so the hook just
 * returns a fresh, unsaved, in-memory progress object — enough to preview a
 * lesson, but nothing persists until the user signs in.
 */
export function useLessonProgress(lessonId: string = 'argentina') {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [progress, setProgress] = useState<LessonProgress>(
    emptyProgress(userId ?? 'anonymous', lessonId),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(emptyProgress(userId ?? 'anonymous', lessonId));

    if (!userId || !isSupabaseConfigured || !supabase) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('user_id, lesson_id, current_step, total_xp, completed_steps, is_finished, quiz_score')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.warn('No se pudo cargar el progreso:', error.message);
        setLoaded(true);
        return;
      }
      if (data) {
        setProgress(data as LessonProgress);
      }
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId, userId]);

  const save = useCallback(
    async (partial: Partial<LessonProgress>) => {
      setProgress((prev) => {
        const next = { ...prev, ...partial, lesson_id: lessonId, user_id: userId ?? prev.user_id };
        if (userId && isSupabaseConfigured && supabase) {
          supabase
            .from('lesson_progress')
            .upsert({
              user_id: userId,
              lesson_id: lessonId,
              current_step: next.current_step,
              total_xp: next.total_xp,
              completed_steps: next.completed_steps,
              is_finished: next.is_finished,
              quiz_score: next.quiz_score,
              updated_at: new Date().toISOString(),
            })
            .then(({ error }) => {
              if (error) console.warn('No se pudo guardar el progreso:', error.message);
            });
        }
        return next;
      });
    },
    [lessonId, userId],
  );

  const reset = useCallback(async () => {
    setProgress(emptyProgress(userId ?? 'anonymous', lessonId));
    if (userId && isSupabaseConfigured && supabase) {
      await supabase.from('lesson_progress').upsert({
        user_id: userId,
        lesson_id: lessonId,
        current_step: 1,
        total_xp: 0,
        completed_steps: [],
        is_finished: false,
        quiz_score: 0,
        updated_at: new Date().toISOString(),
      });
    }
  }, [lessonId, userId]);

  return { progress, loaded, save, reset, isAuthenticated: !!userId };
}
