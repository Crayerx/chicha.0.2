import { Target, Check } from 'lucide-react';

interface DailyGoalBarProps {
  xpToday: number;
  goalXp: number;
  /** Versión compacta para el menú mobile / espacios chicos. */
  compact?: boolean;
}

/**
 * Barra de progreso del objetivo diario de XP. Puramente presentacional —
 * recibe `xpToday`/`goalXp` ya resueltos por `useUserStats` (que se encarga
 * de resetear `xpToday` cuando cambia el día calendario).
 */
export default function DailyGoalBar({ xpToday, goalXp, compact = false }: DailyGoalBarProps) {
  const pct = goalXp > 0 ? Math.min(100, Math.round((xpToday / goalXp) * 100)) : 0;
  const done = xpToday >= goalXp && goalXp > 0;

  return (
    <div className={compact ? 'w-full' : 'w-40 shrink-0 lg:w-52'}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest text-slate2-400">
          {done ? (
            <Check className="h-3 w-3 text-jade-300" />
          ) : (
            <Target className="h-3 w-3 text-gold-300" />
          )}
          Meta de hoy
        </span>
        <span
          className={`font-mono text-[9px] uppercase tracking-widest ${
            done ? 'text-jade-300' : 'text-slate2-400'
          }`}
        >
          {Math.min(xpToday, goalXp)}/{goalXp} XP
        </span>
      </div>
      <div className="h-2 w-full border border-ink-500 bg-ink-700">
        <div
          className={`h-full transition-all duration-500 ${
            done ? 'bg-jade-400' : 'bg-gold-400 opacity-80'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
