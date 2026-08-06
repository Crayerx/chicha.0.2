import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { accentClasses, type LoreSlide } from '@/data/lessonArgentina';

interface LoreSlidesProps {
  slides: LoreSlide[];
  onComplete: () => void;
}

export default function LoreSlides({ slides, onComplete }: LoreSlidesProps) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const a = accentClasses[slide.accent];
  const isLast = current === slides.length - 1;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          CONTEXTO HISTÓRICO
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide */}
      <div className="relative flex-1">
        <div
          key={slide.id}
          className={`animate-[flicker_0.4s_ease] border-2 ${a.border} bg-ink-800 p-5 shadow-pixel`}
        >
          <div className="flex items-center gap-3">
            <div className={`grid h-12 w-12 shrink-0 place-items-center border-2 ${a.border} ${a.bgSoft}`}>
              <slide.icon className={`h-6 w-6 ${a.text}`} />
            </div>
            <div>
              <span
                className={`inline-block border-2 ${a.borderSoft} ${a.bgSoft} px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${a.textSoft}`}
              >
                {slide.tag}
              </span>
              <h4 className={`mt-1.5 font-pixel text-xs leading-tight ${a.text} text-shadow-pixel`}>
                {slide.title}
              </h4>
            </div>
          </div>

          <p className="mt-4 font-terminal text-lg leading-snug text-slate2-300">
            {slide.body}
          </p>
        </div>

        {/* Slide dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 border-2 transition-all ${
                i === current
                  ? 'border-gold-300 bg-gold-400'
                  : i < current
                    ? 'border-jade-400 bg-jade-400/50'
                    : 'border-ink-500 bg-ink-700'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-gold-400 hover:text-gold-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        {isLast ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 border-2 border-jade-400 bg-jade-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-[4px_4px_0_0_#16a06b] transition-all hover:-translate-y-0.5 hover:bg-jade-300"
          >
            <Check className="h-4 w-4" />
            Continuar
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))}
            className="flex items-center gap-1.5 border-2 border-gold-400 bg-gold-400 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
