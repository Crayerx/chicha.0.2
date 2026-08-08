import { useEffect, useRef, useState } from 'react';
import dragonSleeping from '../assets/dragon-sleeping.png';

const WAKE_DURATION_MS = 5000;

export default function DragonCompanion() {
  const [isAwake, setIsAwake] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleWake() {
    setIsAwake(true);
    setBurstKey((k) => k + 1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAwake(false);
    }, WAKE_DURATION_MS);
  }

  return (
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
      <button
        type="button"
        onClick={handleWake}
        aria-label={isAwake ? 'Dragoncito despierto' : 'Tocar para despertar al dragoncito'}
        className="group relative flex flex-col items-center focus:outline-none"
      >
        {/* Ring pulse burst on wake */}
        {isAwake && (
          <span
            key={burstKey}
            className="pointer-events-none absolute top-2 h-16 w-16 animate-ring-pulse rounded-full border-2 border-jade-400"
          />
        )}

        {/* Sparkles on wake */}
        {isAwake && (
          <span key={`s-${burstKey}`} className="pointer-events-none absolute inset-0">
            <span className="absolute -left-2 top-0 h-2 w-2 animate-sparkle-pop bg-gold-300" />
            <span
              className="absolute -right-2 top-3 h-1.5 w-1.5 animate-sparkle-pop bg-ember-400"
              style={{ animationDelay: '0.08s' }}
            />
            <span
              className="absolute left-1/2 -top-3 h-1.5 w-1.5 animate-sparkle-pop bg-jade-300"
              style={{ animationDelay: '0.15s' }}
            />
          </span>
        )}

        {/* Zzz while sleeping */}
        {!isAwake && (
          <span className="pointer-events-none absolute -top-3 right-0 font-pixel text-[9px] text-slate2-400">
            <span className="inline-block animate-zzz-float">z</span>
          </span>
        )}

        {/* Dragon portrait */}
        <div
          className={[
            'h-16 w-16 overflow-hidden rounded-full border-2 shadow-pixel-sm transition-colors duration-300',
            isAwake
              ? 'border-jade-400 shadow-[0_0_14px_rgba(43,201,138,0.55)]'
              : 'border-gold-400',
          ].join(' ')}
        >
          <img
            src={dragonSleeping}
            alt="Dragoncito guardián de Chronos, durmiendo sobre un almohadón"
            className={[
              'h-full w-full object-cover transition-transform duration-300',
              isAwake ? 'animate-dragon-wake scale-105' : 'animate-dragon-sleep',
              'group-hover:scale-110',
            ].join(' ')}
            draggable={false}
          />
        </div>

        {/* Status label */}
        <div
          className={[
            'mt-2 flex items-center gap-2 border-2 bg-ink-900 px-4 py-1.5 shadow-pixel-sm transition-colors duration-300',
            isAwake ? 'border-jade-400' : 'border-gold-400',
          ].join(' ')}
        >
          <span
            className={[
              'h-2 w-2',
              isAwake ? 'animate-dragon-alert bg-jade-400' : 'animate-blink bg-jade-400',
            ].join(' ')}
          />
          <span
            className={[
              'font-mono text-[10px] font-bold uppercase tracking-widest',
              isAwake ? 'text-jade-300' : 'text-gold-200',
            ].join(' ')}
          >
            {isAwake ? '¡despierto!' : 'durmiendo'}
          </span>
        </div>
      </button>
    </div>
  );
}
