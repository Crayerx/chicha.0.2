import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type UserStats } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

function emptyStats(userId: string): UserStats {
  return {
    user_id: userId,
    current_streak: 0,
    longest_streak: 0,
    last_active_date: null,
  };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

/**
 * Global streak tracker, scoped to the signed-in user. Call
 * `recordActivity()` whenever the user completes a step in any lesson.
 * - Same day as last activity → streak unchanged.
 * - Exactly one day after last activity → streak +1.
 * - Any bigger gap (or first ever activity) → streak resets to 1.
 * Signed-out visitors get a static zeroed object and recordActivity() is a
 * no-op — there is no row to attach the streak to without an account.
 */
export function useUserStats() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [stats, setStats] = useState<UserStats>(emptyStats(userId ?? 'anonymous'));
  const [loaded, setLoaded] = useState(false);

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
        .select('user_id, current_streak, longest_streak, last_active_date')
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
    setStats((prev) => {
      if (prev.last_active_date === today) {
        return prev; // ya se registró actividad hoy
      }
      const gap = prev.last_active_date ? daysBetween(prev.last_active_date, today) : null;
      const nextStreak = gap === 1 ? prev.current_streak + 1 : 1;
      const next: UserStats = {
        user_id: userId,
        current_streak: nextStreak,
        longest_streak: Math.max(prev.longest_streak, nextStreak),
        last_active_date: today,
      };
      persist(next);
      return next;
    });
  }, [userId, persist]);

  return { stats, loaded, recordActivity, isAuthenticated: !!userId };
}
