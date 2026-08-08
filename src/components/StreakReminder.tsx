import { useEffect, useState } from 'react';
import { Flame, Snowflake, X } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';

/**
 * Banner que aparece cuando el usuario tiene una racha activa pero todavía
 * no completó nada hoy, para incentivarlo a no cortarla. También avisa
 * cuando se acaba de gastar un streak freeze para salvar la racha.
 * No renderiza nada si no está autenticado, no tiene racha, o ya jugó hoy.
 */
export default function StreakReminder({ onPlay }: { onPlay?: () => void }) {
  const { stats, loaded, isAuthenticated, freezeJustUsed, clearFreezeNotice } = useUserStats();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
  }, [stats.last_active_date]);

  if (!isAuthenticated || !loaded || dismissed) return null;

  const today = new Date().toISOString().slice(0, 10);
  const playedToday = stats.last_active_date === today;

  if (freezeJustUsed) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 border-2 border-jade-400/50 bg-jade-400/10 px-4 py-3 shadow-pixel-sm">
          <Snowflake className="h-5 w-5 shrink-0 text-jade-300" />
          <p className="flex-1 font-terminal text-lg leading-snug text-slate2-200">
            Usamos un <span className="text-jade-300">streak freeze</span> para salvar tu racha de{' '}
            {stats.current_streak} {stats.current_streak === 1 ? 'día' : 'días'}. ¡Volvés a tener una
            para la próxima semana!
          </p>
          <button
            onClick={clearFreezeNotice}
            className="shrink-0 text-slate2-400 transition-colors hover:text-slate2-200"
            aria-label="Cerrar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (playedToday || stats.current_streak <= 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 border-2 border-ember-400/50 bg-ember-400/10 px-4 py-3 shadow-pixel-sm">
        <Flame className="h-5 w-5 shrink-0 animate-pulse-glow text-ember-400" />
        <p className="flex-1 font-terminal text-lg leading-snug text-slate2-200">
          ¡No perdés tu racha de {stats.current_streak} {stats.current_streak === 1 ? 'día' : 'días'}
          , jugá hoy!
        </p>
        {onPlay && (
          <button
            onClick={onPlay}
            className="shrink-0 border-2 border-ember-400 bg-ember-400/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ember-300 transition-all hover:bg-ember-400/25"
          >
            Jugar
          </button>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-slate2-400 transition-colors hover:text-slate2-200"
          aria-label="Cerrar aviso"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
