import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type UserStats } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

function emptyStats(userId: string): UserStats {
  return {
    user_id: userId,
    current_streak: 0,
    longest_streak: 0,
    last_active_date: null,
    freeze_available: true,
    freeze_week_start: null,
  };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

/** Monday (ISO week start) of the week containing `dateStr`, as 'YYYY-MM-DD'. */
function mondayOf(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 = domingo … 6 = sábado
  const diffToMonday = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - diffToMonday);
  return d.toISOString().slice(0, 10);
}

/**
 * Global streak tracker, scoped to the signed-in user. Call
 * `recordActivity()` whenever the user completes a step in any lesson.
 * - Same day as last activity → streak unchanged.
 * - Exactly one day after last activity → streak +1.
 * - Two days after last activity (missed exactly one day) AND a streak
 *   freeze is available this week → the freeze is spent, the streak is
 *   forgiven and continues (+1) instead of resetting.
 * - Any bigger gap (or first ever activity, or a missed day with no freeze
 *   left) → streak resets to 1.
 * One freeze is granted per calendar week (Monday-Sunday) and is restored
 * automatically the first time `recordActivity()` runs in a new week.
 * Signed-out visitors get a static zeroed object and recordActivity() is a
 * no-op — there is no row to attach the streak to without an account.
 */
export function useUserStats() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [stats, setStats] = useState<UserStats>(emptyStats(userId ?? 'anonymous'));
  const [loaded, setLoaded] = useState(false);
  const [freezeJustUsed, setFreezeJustUsed] = useState(false);

  useEffect(() => {
    setStats(emptyStats(userId ?? 'anonymous'));

    if (!userId || !isSupabaseConfigured || !supabase) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('user_stats')
        .select('user_id, current_streak, longest_streak, last_active_date, freeze_available, freeze_week_start')
        .eq('user_id', userId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.warn('No se pudo cargar la racha:', error.message);
        setLoaded(true);
        return;
      }
      setStats(data ? (data as UserStats) : emptyStats(userId));
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const persist = useCallback(
    (next: UserStats) => {
      if (userId && isSupabaseConfigured && supabase) {
        supabase
          .from('user_stats')
          .upsert({
            user_id: userId,
            current_streak: next.current_streak,
            longest_streak: next.longest_streak,
            last_active_date: next.last_active_date,
            freeze_available: next.freeze_available,
            freeze_week_start: next.freeze_week_start,
            updated_at: new Date().toISOString(),
          })
          .then(({ error }) => {
            if (error) console.warn('No se pudo guardar la racha:', error.message);
          });
      }
    },
    [userId],
  );

  const recordActivity = useCallback(() => {
    if (!userId) return; // sin cuenta no hay dónde guardar la racha
    const today = todayStr();
    const currentWeek = mondayOf(today);

    setStats((prev) => {
      if (prev.last_active_date === today) {
        return prev; // ya se registró actividad hoy
      }

      // El freeze se repone una vez por semana calendario.
      const freezeAvailable =
        prev.freeze_week_start === currentWeek ? prev.freeze_available : true;

      const gap = prev.last_active_date ? daysBetween(prev.last_active_date, today) : null;

      let nextStreak: number;
      let freezeAfter = freezeAvailable;
      if (gap === 1) {
        nextStreak = prev.current_streak + 1;
      } else if (gap === 2 && freezeAvailable) {
        nextStreak = prev.current_streak + 1; // se perdona el día salteado
        freezeAfter = false;
        setFreezeJustUsed(true);
      } else {
        nextStreak = 1;
      }

      const next: UserStats = {
        user_id: userId,
        current_streak: nextStreak,
        longest_streak: Math.max(prev.longest_streak, nextStreak),
        last_active_date: today,
        freeze_available: freezeAfter,
        freeze_week_start: currentWeek,
      };
      persist(next);
      return next;
    });
  }, [userId, persist]);

  const clearFreezeNotice = useCallback(() => setFreezeJustUsed(false), []);

  return { stats, loaded, recordActivity, isAuthenticated: !!userId, freezeJustUsed, clearFreezeNotice };
}
