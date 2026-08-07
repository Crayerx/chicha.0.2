import { useState } from 'react';
import { Check, X, RotateCcw, Trophy, SlidersHorizontal } from 'lucide-react';
import type { SliderQuestion } from '@/data/lessonArgentina';

interface SliderEstimateProps {
  questions: SliderQuestion[];
  onComplete: () => void;
}

const POINTS_PER_QUESTION = 40;
const PENALTY = 10;

export default function SliderEstimate({ questions: sliderQuestions, onComplete }: SliderEstimateProps) {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<number[]>(
    sliderQuestions.map((q) => Math.round((q.min + q.max) / 2)),
  );
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(sliderQuestions.length).fill(false),
  );
  const [showVictory, setShowVictory] = useState(false);

  const q = sliderQuestions[current];
  const isLast = current === sliderQuestions.length - 1;

  const handleChange = (val: number) => {
    if (revealed[current]) return;
    setValues((prev) => {
      const next = [...prev];
      next[current] = val;
      return next;
    });
  };

  const reveal = () => {
    setRevealed((prev) => {
      const next = [...prev];
      next[current] = true;
      return next;
    });
  };

  const next = () => {
    if (isLast) {
      setShowVictory(true);
      setTimeout(() => onComplete(), 2600);
    } else {
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setValues(sliderQuestions.map((q) => Math.round((q.min + q.max) / 2)));
    setRevealed(Array(sliderQuestions.length).fill(false));
    setShowVictory(false);
  };

  const isRevealed = revealed[current];
  const isCorrect = isRevealed && Math.abs(values[current] - q.correct) <= q.tolerance;
  const distance = Math.abs(values[current] - q.correct);

  const score = sliderQuestions.reduce<number>((acc, sq, i) => {
    if (!revealed[i]) return acc;
    const dist = Math.abs(values[i] - sq.correct);
    if (dist <= sq.tolerance) return acc + POINTS_PER_QUESTION;
    return acc + Math.max(0, POINTS_PER_QUESTION - dist * PENALTY);
  }, 0);

  const sliderPct = ((values[current] - q.min) / (q.max - q.min)) * 100;
  const correctPct = ((q.correct - q.min) / (q.max - q.min)) * 100;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          ESTIMACIÓN
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {current + 1}/{sliderQuestions.length} · Score: {score}
        </span>
      </div>

      <p className="mb-6 font-terminal text-xl text-gold-200">
        {q.prompt}
      </p>

      {/* Slider display */}
      <div className="flex-1">
        <div className="flex flex-col items-center">
          {/* Big number */}
          <div
            className={`mb-8 grid h-24 w-24 place-items-center border-4 font-pixel text-2xl text-shadow-pixel transition-all ${
              isRevealed
                ? isCorrect
                  ? 'border-jade-400 bg-jade-400/10 text-jade-300'
                  : 'border-ruby-400 bg-ruby-400/10 text-ruby-300'
                : 'border-gold-400 bg-ink-800 text-gold-300'
            }`}
          >
            {values[current]}
          </div>

          {/* Slider track */}
          <div className="relative w-full max-w-md">
            {/* Correct marker (revealed) */}
            {isRevealed && (
              <div
                className="absolute -top-2 z-10 flex flex-col items-center"
                style={{ left: `${correctPct}%`, transform: 'translateX(-50%)' }}
              >
                <div className="border-2 border-jade-400 bg-ink-900 px-2 py-0.5 font-pixel text-[10px] text-jade-300">
                  {q.correct}
                </div>
                <div className="h-3 w-0.5 bg-jade-400" />
              </div>
            )}

            {/* Track */}
            <div className="relative h-6 w-full border-2 border-ink-500 bg-ink-700">
              <div
                className={`h-full transition-all duration-150 ${
                  isRevealed
                    ? isCorrect
                      ? 'bg-jade-400/60'
                      : 'bg-ruby-400/40'
                    : 'bg-gold-400/60'
                }`}
                style={{ width: `${sliderPct}%` }}
              />
            </div>

            {/* Native range input */}
            <input
              type="range"
              min={q.min}
              max={q.max}
              value={values[current]}
              onChange={(e) => handleChange(Number(e.target.value))}
              disabled={isRevealed}
              className="pointer-events-auto absolute -top-1 left-0 h-8 w-full cursor-pointer opacity-0"
              style={{ accentColor: '#ffcc33' }}
            />

            {/* Custom thumb */}
            <div
              className="pointer-events-none absolute top-0 h-6 w-2 border-2 border-gold-300 bg-gold-400"
              style={{ left: `calc(${sliderPct}% - 4px)` }}
            />

            {/* Min / Max labels */}
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-slate2-400">
              <span>{q.min}</span>
              <SlidersHorizontal className="h-3 w-3 text-gold-400" />
              <span>{q.max}</span>
            </div>
          </div>

          {/* Feedback */}
          {isRevealed && (
            <div
              className={`mt-8 w-full max-w-md border-2 p-4 ${
                isCorrect
                  ? 'border-jade-400/40 bg-jade-400/5'
                  : 'border-ruby-400/40 bg-ruby-400/5'
              }`}
            >
              <p
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest ${
                  isCorrect ? 'text-jade-300' : 'text-ruby-300'
                }`}
              >
                {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                {isCorrect
                  ? `¡Exacto! +${POINTS_PER_QUESTION} XP`
                  : `Estuviste a ${distance} año(s). +${Math.max(0, POINTS_PER_QUESTION - distance * PENALTY)} XP`}
              </p>
              <p className="mt-2 font-terminal text-base leading-snug text-slate2-300">
                {q.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="my-4 flex items-center justify-center gap-2">
        {sliderQuestions.map((sq, i) => (
          <div
            key={sq.id}
            className={`h-2.5 w-2.5 border-2 transition-all ${
              revealed[i]
                ? Math.abs(values[i] - sq.correct) <= sq.tolerance
                  ? 'border-jade-400 bg-jade-400'
                  : 'border-ruby-400 bg-ruby-400/50'
                : i === current
                  ? 'border-gold-300 bg-gold-400'
                  : 'border-ink-500 bg-ink-700'
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ember-400 hover:text-ember-300"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        {!isRevealed ? (
          <button
            onClick={reveal}
            className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300"
          >
            <Check className="h-4 w-4" />
            Confirmar
          </button>
        ) : (
          <button
            onClick={next}
            className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300"
          >
            {isLast ? 'Finalizar' : 'Siguiente'}
            {isLast ? <Trophy className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          </button>
        )}
      </div>

      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡PRECISO!</h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{score} XP
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">Estimaciones completadas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
