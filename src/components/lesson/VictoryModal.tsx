import { Trophy, X, Star, RotateCcw, Chrome as Home } from 'lucide-react';
import type { Artifact } from '@/data/lessonArgentina';

interface VictoryModalProps {
  xp: number;
  maxXp: number;
  score: number;
  maxScore: number;
  module: string;
  title: string;
  artifact: Artifact;
  onRetry: () => void;
  onHome: () => void;
}

export default function VictoryModal({
  xp,
  maxXp,
  score,
  maxScore,
  module,
  title,
  artifact,
  onRetry,
  onHome,
}: VictoryModalProps) {
  const pct = Math.round((xp / maxXp) * 100);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/85 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md border-4 border-gold-300 bg-ink-800 shadow-pixel-xl">
        {/* Close */}
        <button
          onClick={onHome}
          className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center border-2 border-gold-400 bg-ink-900 text-gold-300 shadow-pixel-sm transition-colors hover:bg-ruby-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 text-center sm:p-8">
          {/* Trophy */}
          <div className="mx-auto mb-4 grid h-20 w-20 place-items-center border-4 border-gold-300 bg-ink-900 shadow-pixel-gold animate-pulse-glow">
            <Trophy className="h-10 w-10 text-gold-300 drop-shadow-[0_0_12px_rgba(255,204,51,0.7)]" />
          </div>

          {/* Title */}
          <h2 className="font-pixel text-xl text-gold-300 text-shadow-pixel sm:text-2xl">
            MISIÓN
          </h2>
          <h3 className="mt-2 font-pixel text-2xl text-jade-300 text-shadow-pixel sm:text-3xl">
            CUMPLIDA
          </h3>

          <p className="mt-4 font-terminal text-xl text-slate2-300">
            Has completado {module}: {title}
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            <StatBox label="XP" value={`${xp}`} highlight />
            <StatBox label="SCORE" value={`${score}/${maxScore}`} />
            <StatBox label="PROGRESO" value={`${pct}%`} />
          </div>

          {/* Artifact reward */}
          <div className="mt-6">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
              Artefacto desbloqueado
            </p>
            <div className="border-4 border-gold-300 bg-gradient-to-b from-gold-400/10 to-ink-900 p-4 shadow-pixel-gold">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center border-2 border-gold-300 bg-ink-900">
                  <artifact.icon className="h-7 w-7 animate-pulse-glow text-gold-300" />
                </div>
                <div className="text-left">
                  <span className="inline-flex items-center gap-1 border-2 border-gold-300 bg-gold-400/15 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-gold-200">
                    <Star className="h-2.5 w-2.5 fill-gold-300 text-gold-300" />
                    {artifact.rarity}
                  </span>
                  <h4 className="mt-1.5 font-pixel text-xs text-gold-200">
                    {artifact.name}
                  </h4>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate2-400">
                    {artifact.era}
                  </p>
                </div>
              </div>
              <p className="mt-3 font-terminal text-base leading-snug text-slate2-300">
                {artifact.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <div className="flex gap-3">
              <button
                onClick={onRetry}
                className="flex flex-1 items-center justify-center gap-2 border-2 border-ink-500 bg-ink-700 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-gold-400 hover:text-gold-200"
              >
                <RotateCcw className="h-4 w-4" />
                Repetir
              </button>
              <button
                onClick={onHome}
                className="flex flex-1 items-center justify-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300"
              >
                <Home className="h-4 w-4" />
                Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border-2 p-2 ${
        highlight
          ? 'border-gold-400 bg-gold-400/10'
          : 'border-ink-500 bg-ink-700'
      }`}
    >
      <div
        className={`font-pixel text-sm ${highlight ? 'text-gold-300' : 'text-slate2-200'}`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-slate2-400">
        {label}
      </div>
    </div>
  );
}
