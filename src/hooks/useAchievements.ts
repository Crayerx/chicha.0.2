import { useMemo } from 'react';
import { courses } from '@/data/courses';
import { getLesson } from '@/data/lessons';
import { achievementDefs } from '@/data/achievements';
import { useAllProgress } from './useAllProgress';
import { useUserStats } from './useUserStats';

/**
 * Deriva qué logros están desbloqueados a partir del progreso guardado y la
 * racha. No persiste nada nuevo: todo se recalcula en cada render a partir de
 * `lesson_progress` + `user_stats`, que ya se guardan por otras vías.
 */
export function useAchievements() {
  const { byLesson, loaded: progressLoaded } = useAllProgress();
  const { stats, loaded: statsLoaded } = useUserStats();

  const unlocked = useMemo(() => {
    const trackedCourses = courses.filter((c) => c.lessonId);
    const ids = new Set<string>();

    const bestStreak = Math.max(stats.current_streak, stats.longest_streak);
    if (bestStreak >= 3) ids.add('racha_3');
    if (bestStreak >= 7) ids.add('racha_7');
    if (bestStreak >= 30) ids.add('racha_30');

    const finished = trackedCourses
      .map((c) => (c.lessonId ? byLesson[c.lessonId] : undefined))
      .filter((p): p is NonNullable<typeof p> => !!p?.is_finished);

    if (finished.length >= 1) ids.add('primera_era');
    if (finished.length >= trackedCourses.length && trackedCourses.length > 0) {
      ids.add('coleccionista');
    }

    const startedCount = trackedCourses.filter((c) => c.lessonId && byLesson[c.lessonId]).length;
    if (startedCount >= 3) ids.add('explorador');

    const isPerfect = (lessonId: string, score: number) => {
      const lesson = getLesson(lessonId);
      if (!lesson) return false;
      const maxScore = lesson.quiz.length * 50;
      return maxScore > 0 && score >= maxScore;
    };

    if (finished.some((p) => isPerfect(p.lesson_id, p.quiz_score))) {
      ids.add('perfeccionista');
    }

    // 3 lecciones seguidas sin fallar el quiz, en el orden en que se
    // terminaron (por updated_at). Sin timestamp, no se puede establecer
    // orden, así que esas lecciones no cuentan para esta racha.
    const ordered = finished
      .filter((p) => p.updated_at)
      .sort((a, b) => new Date(a.updated_at!).getTime() - new Date(b.updated_at!).getTime());

    let streak = 0;
    for (const p of ordered) {
      if (isPerfect(p.lesson_id, p.quiz_score)) {
        streak += 1;
        if (streak >= 3) {
          ids.add('trilogia_perfecta');
          break;
        }
      } else {
        streak = 0;
      }
    }

    return ids;
  }, [byLesson, stats.current_streak, stats.longest_streak]);

  const achievements = achievementDefs.map((def) => ({
    ...def,
    unlocked: unlocked.has(def.id),
  }));

  return {
    achievements,
    unlockedCount: unlocked.size,
    totalCount: achievementDefs.length,
    loaded: progressLoaded && statsLoaded,
  };
}
