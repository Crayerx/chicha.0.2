import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Username público del usuario (visible en el leaderboard). Se crea solo la
 * primera vez que el usuario se registra (trigger en la base), así que acá
 * solo lo leemos y permitimos editarlo.
 */
export function useProfile() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [username, setUsername] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsername(null);
    if (!userId || !isSupabaseConfigured || !supabase) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', userId)
        .maybeSingle();
      if (cancelled) return;
      if (fetchError) {
        console.warn('No se pudo cargar el nombre de usuario:', fetchError.message);
      } else {
        setUsername(data?.username ?? null);
      }
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const updateUsername = useCallback(
    async (next: string) => {
      const trimmed = next.trim();
      if (!userId || !isSupabaseConfigured || !supabase) return false;
      if (trimmed.length < 3 || trimmed.length > 20) {
        setError('El nombre debe tener entre 3 y 20 caracteres.');
        return false;
      }
      setSaving(true);
      setError(null);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username: trimmed, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
      setSaving(false);
      if (updateError) {
        setError('Ese nombre no se pudo guardar, probá con otro.');
        return false;
      }
      setUsername(trimmed);
      return true;
    },
    [userId],
  );

  return { username, loaded, saving, error, updateUsername };
}
