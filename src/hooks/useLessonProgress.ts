import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type LessonProgress } from '@/lib/supabase';

const EMPTY: LessonProgress = {
  lesson_id: 'argentina',
  current_step: 1,
  total_xp: 0,
  completed_steps: [],
  is_finished: false,
  quiz_score: 0,
};

export function useLessonProgress(lessonId: string = 'argentina') {
  const [progress, setProgress] = useState<LessonProgress>({ ...EMPTY, lesson_id: lessonId });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('lesson_id, current_step, total_xp, completed_steps, is_finished, quiz_score')
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
    return () => { cancelled = true; };
  }, [lessonId]);

  const save = useCallback(
    async (partial: Partial<LessonProgress>) => {
      setProgress((prev) => {
        const next = { ...prev, ...partial, lesson_id: lessonId };
        if (isSupabaseConfigured && supabase) {
          supabase
            .from('lesson_progress')
            .upsert({
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
    [lessonId],
  );

  const reset = useCallback(async () => {
    setProgress({ ...EMPTY, lesson_id: lessonId });
    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('lesson_progress')
        .upsert({
          lesson_id: lessonId,
          current_step: 1,
          total_xp: 0,
          completed_steps: [],
          is_finished: false,
          quiz_score: 0,
          updated_at: new Date().toISOString(),
        });
    }
  }, [lessonId]);

  return { progress, loaded, save, reset };
}
