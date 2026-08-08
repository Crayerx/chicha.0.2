import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type WeeklyXpEntry } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const TOP_N = 20;

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Monday (ISO week start) of the week containing today, as 'YYYY-MM-DD'. */
function mondayOfToday(): string {
  const d = new Date(`${todayStr()}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 = domingo … 6 = sábado
  const diffToMonday = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - diffToMonday);
  return d.toISOString().slice(0, 10);
}

export interface LeaderboardRow {
  userId: string;
  username: string;
  xp: number;
  rank: number;
  isMe: boolean;
}

/**
 * Leaderboard semanal de XP. Lee `weekly_xp` (con `profiles` embebido para
 * el username) filtrado a la semana ISO actual, y expone `addXp` para
 * sumar XP vía la función `increment_weekly_xp` — nunca escribe la tabla
 * directamente, así el ranking no se puede falsear desde el cliente.
 */
export function useWeeklyLeaderboard() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [myRow, setMyRow] = useState<LeaderboardRow | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refetch = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setRows([]);
      setMyRow(null);
      setLoaded(true);
      return;
    }
    const weekStart = mondayOfToday();

    const { data, error } = await supabase
      .from('weekly_xp')
      .select('user_id, xp, profiles(username)')
      .eq('week_start', weekStart)
      .order('xp', { ascending: false })
      .limit(TOP_N);

    if (error) {
      console.warn('No se pudo cargar el leaderboard semanal:', error.message);
      setLoaded(true);
      return;
    }

    const entries = (data ?? []) as unknown as WeeklyXpEntry[];
    const ranked: LeaderboardRow[] = entries.map((e, i) => ({
      userId: e.user_id,
      username: e.profiles?.username ?? 'Jugador',
      xp: e.xp,
      rank: i + 1,
      isMe: e.user_id === userId,
    }));
    setRows(ranked);

    const mine = ranked.find((r) => r.isMe) ?? null;
    if (mine || !userId) {
      setMyRow(mine);
      setLoaded(true);
      return;
    }

    // El usuario no entró en el top N: buscamos su fila y su posición aparte.
    const { data: mineData, error: mineError } = await supabase
      .from('weekly_xp')
      .select('user_id, xp, profiles(username)')
      .eq('week_start', weekStart)
      .eq('user_id', userId)
      .maybeSingle();

    if (mineError || !mineData) {
      setMyRow(null);
      setLoaded(true);
      return;
    }

    const myEntry = mineData as unknown as WeeklyXpEntry;
    const { count } = await supabase
      .from('weekly_xp')
      .select('user_id', { count: 'exact', head: true })
      .eq('week_start', weekStart)
      .gt('xp', myEntry.xp);

    setMyRow({
      userId: myEntry.user_id,
      username: myEntry.profiles?.username ?? 'Jugador',
      xp: myEntry.xp,
      rank: (count ?? 0) + 1,
      isMe: true,
    });
    setLoaded(true);
  }, [userId]);

  useEffect(() => {
    setLoaded(false);
    refetch();
  }, [refetch]);

  const addXp = useCallback(
    async (delta: number) => {
      if (!userId || delta <= 0 || !isSupabaseConfigured || !supabase) return;
      const { error } = await supabase.rpc('increment_weekly_xp', { delta });
      if (error) console.warn('No se pudo sumar XP semanal:', error.message);
    },
    [userId],
  );

  return { rows, myRow, loaded, addXp, refetch, isAuthenticated: !!userId };
}
