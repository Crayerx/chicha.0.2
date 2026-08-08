import { useEffect, useRef, useState } from 'react';

import frameSleep from '../assets/dragon-frames/sleep.png';
import frameWakeStartle from '../assets/dragon-frames/wake_startle.png';
import frameWakeAlert from '../assets/dragon-frames/wake_alert.png';
import frameWakeCalm from '../assets/dragon-frames/wake_calm.png';
import frameYawn from '../assets/dragon-frames/yawn.png';
import frameYawn2 from '../assets/dragon-frames/yawn2.png';
import frameDrowsy from '../assets/dragon-frames/drowsy.png';
import frameSleepy from '../assets/dragon-frames/sleepy.png';
import frameClosing from '../assets/dragon-frames/closing.png';
import frameSettling from '../assets/dragon-frames/settling.png';

// Timeline of poses shown after a tap. Mirrors the reference clip:
// startled awake -> alert -> calm -> yawn -> drowsy -> back asleep.
// Total run time is 5s, matching "se vuelve a dormir a los 5 segundos".
const WAKE_SEQUENCE: { src: string; at: number; label: string }[] = [
  { src: frameWakeStartle, at: 0, label: '¡despierto!' },
  { src: frameWakeAlert, at: 350, label: '¡despierto!' },
  { src: frameWakeCalm, at: 750, label: '¡despierto!' },
  { src: frameYawn, at: 1600, label: 'bostezando...' },
  { src: frameYawn2, at: 2000, label: 'bostezando...' },
  { src: frameDrowsy, at: 2600, label: 'con sueño...' },
  { src: frameSleepy, at: 3300, label: 'con sueño...' },
  { src: frameClosing, at: 4000, label: 'durmiendo' },
  { src: frameSettling, at: 4450, label: 'durmiendo' },
];
const TOTAL_WAKE_MS = 5000;

export default function DragonCompanion() {
  const [isAwake, setIsAwake] = useState(false);
  const [frameSrc, setFrameSrc] = useState(frameSleep);
  const [label, setLabel] = useState('durmiendo');
  const [burstKey, setBurstKey] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearScheduled() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  useEffect(() => clearScheduled, []);

  function handleWake() {
    clearScheduled();
    setIsAwake(true);
    setBurstKey((k) => k + 1);

    WAKE_SEQUENCE.forEach(({ src, at, label: stepLabel }) => {
      const id = setTimeout(() => {
        setFrameSrc(src);
        setLabel(stepLabel);
      }, at);
      timeoutsRef.current.push(id);
    });

    const sleepId = setTimeout(() => {
      setFrameSrc(frameSleep);
      setLabel('durmiendo');
      setIsAwake(false);
    }, TOTAL_WAKE_MS);
    timeoutsRef.current.push(sleepId);
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
            src={frameSrc}
            alt="Dragoncito guardián de Chronos"
            className={[
              'h-full w-full object-cover',
              isAwake ? '' : 'animate-dragon-sleep',
              'group-hover:scale-110 transition-transform duration-300',
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
              'font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap',
              isAwake ? 'text-jade-300' : 'text-gold-200',
            ].join(' ')}
          >
            {label}
          </span>
        </div>
      </button>
    </div>
  );
}
