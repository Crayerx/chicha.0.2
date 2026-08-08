import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type UserStats } from '@/lib/supabase';

const STATS_ID = 'default';
const LOCAL_KEY = 'chicha_user_stats';

const EMPTY: UserStats = {
  id: STATS_ID,
  current_streak: 0,
  longest_streak: 0,
  last_active_date: null,
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

function readLocal(): UserStats {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return { ...EMPTY };
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY };
  }
}

function writeLocal(stats: UserStats) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(stats));
  } catch {
    // localStorage no disponible — no es crítico, seguimos en memoria
  }
}

/**
 * Global streak tracker (independent from any single lesson). Call
 * `recordActivity()` whenever the user completes a step in any lesson.
 * - Same day as last activity → streak unchanged.
 * - Exactly one day after last activity → streak +1.
 * - Any bigger gap (or first ever activity) → streak resets to 1.
 */
export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured || !supabase) {
        setStats(readLocal());
        setLoaded(true);
        return;
      }
      const { data, error } = await supabase
        .from('user_stats')
        .select('id, current_streak, longest_streak, last_active_date')
        .eq('id', STATS_ID)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.warn('No se pudo cargar la racha:', error.message);
        setStats(readLocal());
        setLoaded(true);
        return;
      }
      setStats(data ? (data as UserStats) : { ...EMPTY });
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: UserStats) => {
    writeLocal(next);
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('user_stats')
        .upsert({
          id: STATS_ID,
          current_streak: next.current_streak,
          longest_streak: next.longest_streak,
          last_active_date: next.last_active_date,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.warn('No se pudo guardar la racha:', error.message);
        });
    }
  }, []);

  const recordActivity = useCallback(() => {
    const today = todayStr();
    setStats((prev) => {
      if (prev.last_active_date === today) {
        // Ya se registró actividad hoy — no tocar la racha.
        return prev;
      }
      const gap = prev.last_active_date ? daysBetween(prev.last_active_date, today) : null;
      const nextStreak = gap === 1 ? prev.current_streak + 1 : 1;
      const next: UserStats = {
        id: STATS_ID,
        current_streak: nextStreak,
        longest_streak: Math.max(prev.longest_streak, nextStreak),
        last_active_date: today,
      };
      persist(next);
      return next;
    });
  }, [persist]);

  return { stats, loaded, recordActivity };
}
