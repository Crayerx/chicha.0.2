import { useState } from 'react';
import { Check, X, RotateCcw, Trophy, MapPin, Target } from 'lucide-react';
import type { MapHotspot as MapHotspotData } from '@/data/lessonArgentina';

interface MapHotspotProps {
  hotspots: MapHotspotData[];
  onComplete: () => void;
}

const POINTS_PER_HIT = 25;

export default function MapHotspot({ hotspots: mapHotspots, onComplete }: MapHotspotProps) {
  const [current, setCurrent] = useState(0);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [hits, setHits] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [completed, setCompleted] = useState<boolean[]>(Array(mapHotspots.length).fill(false));

  const hotspot = mapHotspots[current];

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (result) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setClickPos({ x, y });

    const dx = x - hotspot.x;
    const dy = y - hotspot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const isCorrect = dist <= hotspot.radius;
    setResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setHits((h) => h + 1);
      setCompleted((prev) => {
        const next = [...prev];
        next[current] = true;
        return next;
      });
    }
  };

  const nextQuestion = () => {
    if (current < mapHotspots.length - 1) {
      setCurrent(current + 1);
      setClickPos(null);
      setResult(null);
    } else {
      setShowVictory(true);
      setTimeout(() => onComplete(), 2400);
    }
  };

  const reset = () => {
    setCurrent(0);
    setClickPos(null);
    setResult(null);
    setHits(0);
    setShowVictory(false);
    setCompleted(Array(mapHotspots.length).fill(false));
  };

  const earnedXp = hits * POINTS_PER_HIT;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          MAPA INTERACTIVO
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {current + 1}/{mapHotspots.length} · Aciertos: {hits}
        </span>
      </div>

      <p className="mb-4 font-terminal text-lg text-gold-200">
        {hotspot.prompt}
      </p>

      {/* Pixel map */}
      <div className="flex-1">
        <div
          onClick={handleMapClick}
          className={`relative mx-auto aspect-[4/5] w-full max-w-sm cursor-crosshair border-2 border-gold-400 bg-ink-800 bg-grid ${
            result ? 'pointer-events-none' : ''
          }`}
        >
          {/* Stylized Argentina silhouette (simplified pixel shape) */}
          <svg
            viewBox="0 0 100 125"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M22 18 L30 14 L36 20 L34 28 L40 35 L38 42 L33 48 L36 55 L34 62 L30 68 L28 75 L26 82 L24 88 L22 95 L20 100 L24 105 L22 110 L18 108 L16 100 L18 90 L20 80 L18 70 L20 60 L18 50 L20 40 L22 30 Z"
              fill="rgba(255,204,51,0.08)"
              stroke="rgba(255,204,51,0.3)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Target hint when answered */}
          {result && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <div
                className={`rounded-full border-2 ${
                  result === 'correct' ? 'border-jade-400 bg-jade-400/20' : 'border-gold-400 bg-gold-400/20'
                }`}
                style={{
                  width: `${hotspot.radius * 3}%`,
                  height: `${hotspot.radius * 3}%`,
                  minWidth: '24px',
                  minHeight: '24px',
                }}
              />
              <MapPin
                className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 ${
                  result === 'correct' ? 'text-jade-400' : 'text-gold-400'
                }`}
              />
            </div>
          )}

          {/* Click marker */}
          {clickPos && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${clickPos.x}%`, top: `${clickPos.y}%` }}
            >
              <Target
                className={`h-7 w-7 ${
                  result === 'correct' ? 'text-jade-400' : 'text-ruby-400'
                } drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
              />
            </div>
          )}

          {/* Scan line */}
          {!result && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-6 animate-scan bg-gradient-to-b from-transparent via-gold-300/10 to-transparent" />
            </div>
          )}

          {/* Label when answered */}
          {result && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 border-2 border-gold-400 bg-ink-900 px-3 py-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
                {hotspot.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      {result && (
        <div
          className={`mt-4 border-2 p-3 ${
            result === 'correct'
              ? 'border-jade-400/40 bg-jade-400/5'
              : 'border-ruby-400/40 bg-ruby-400/5'
          }`}
        >
          <p
            className={`font-mono text-xs font-bold uppercase tracking-widest ${
              result === 'correct' ? 'text-jade-300' : 'text-ruby-300'
            }`}
          >
            {result === 'correct' ? `¡Correcto! +${POINTS_PER_HIT} XP` : 'Incorrecto — intenta de nuevo'}
          </p>
          <p className="mt-1 font-terminal text-base leading-snug text-slate2-300">
            {hotspot.explanation}
          </p>
        </div>
      )}

      {/* Progress dots */}
      <div className="my-3 flex items-center justify-center gap-2">
        {mapHotspots.map((h, i) => (
          <div
            key={h.id}
            className={`h-2.5 w-2.5 border-2 transition-all ${
              completed[i]
                ? 'border-jade-400 bg-jade-400'
                : i === current
                  ? 'border-gold-300 bg-gold-400'
                  : 'border-ink-500 bg-ink-700'
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ember-400 hover:text-ember-300"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>
        {result && (
          <button
            onClick={nextQuestion}
            className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300"
          >
            {result === 'wrong' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            {current < mapHotspots.length - 1 ? 'Siguiente' : 'Finalizar'}
          </button>
        )}
      </div>

      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡EXPLORACIÓN!</h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{earnedXp} XP · {hits}/{mapHotspots.length} aciertos
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">Mapa completado</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
