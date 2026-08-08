import { useState } from 'react';
import { Check, X, RotateCcw, Trophy, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { TrueFalseItem } from '@/data/lessonArgentina';
import { STEP_TYPE_XP } from '@/data/lessons';

interface TrueFalseGridProps {
  items: TrueFalseItem[];
  onComplete: () => void;
}

export default function TrueFalseGrid({ items: trueFalseGrid, onComplete }: TrueFalseGridProps) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(trueFalseGrid.map((t) => [t.id, null])),
  );
  const [validated, setValidated] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  const allAnswered = trueFalseGrid.every((t) => answers[t.id] !== null);

  const setAnswer = (id: string, val: boolean) => {
    if (validated) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const validate = () => {
    setValidated(true);
    const allCorrect = trueFalseGrid.every((t) => answers[t.id] === t.answer);
    if (allCorrect) {
      setShowVictory(true);
      setTimeout(() => onComplete(), 2200);
    }
  };

  const reset = () => {
    setAnswers(Object.fromEntries(trueFalseGrid.map((t) => [t.id, null])));
    setValidated(false);
    setShowVictory(false);
  };

  const correctCount = trueFalseGrid.filter((t) => answers[t.id] === t.answer).length;
  // Proporcional al XP real que otorga este paso (STEP_TYPE_XP.truefalse).
  const earnedXp = Math.round((correctCount / trueFalseGrid.length) * STEP_TYPE_XP.truefalse);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          VERDADERO O FALSO
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {correctCount}/{trueFalseGrid.length} correctos
        </span>
      </div>

      <p className="mb-4 font-terminal text-lg text-slate2-300">
        Marca cada afirmación como Verdadera o Falsa. ¡Responde todas para validar!
      </p>

      {/* Grid */}
      <div className="flex-1 space-y-2.5">
        {trueFalseGrid.map((item) => {
          const ans = answers[item.id];
          const isCorrect = validated && ans === item.answer;
          const isWrong = validated && ans !== null && ans !== item.answer;
          return (
            <div
              key={item.id}
              className={`border-2 p-3 transition-all ${
                isCorrect
                  ? 'border-jade-400 bg-jade-400/10'
                  : isWrong
                    ? 'border-ruby-400 bg-ruby-400/10'
                    : 'border-ink-500 bg-ink-800'
              }`}
            >
              <p className="mb-3 font-terminal text-lg leading-snug text-slate2-200">
                {item.statement}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAnswer(item.id, true)}
                  disabled={validated}
                  className={`flex items-center gap-1.5 border-2 px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                    ans === true
                      ? isCorrect || !validated
                        ? 'border-jade-400 bg-jade-400/15 text-jade-300'
                        : 'border-ruby-400 bg-ruby-400/15 text-ruby-300'
                      : 'border-ink-500 bg-ink-700 text-slate2-300 hover:border-jade-400'
                  } ${!validated ? 'hover:-translate-y-0.5' : ''}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  V
                </button>
                <button
                  onClick={() => setAnswer(item.id, false)}
                  disabled={validated}
                  className={`flex items-center gap-1.5 border-2 px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                    ans === false
                      ? isCorrect || !validated
                        ? 'border-jade-400 bg-jade-400/15 text-jade-300'
                        : 'border-ruby-400 bg-ruby-400/15 text-ruby-300'
                      : 'border-ink-500 bg-ink-700 text-slate2-300 hover:border-ruby-400'
                  } ${!validated ? 'hover:-translate-y-0.5' : ''}`}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  F
                </button>
                {validated && (
                  <span className="ml-auto flex items-center gap-1.5">
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-jade-300" />
                    ) : (
                      <X className="h-4 w-4 text-ruby-300" />
                    )}
                  </span>
                )}
              </div>
              {validated && (
                <p className="mt-2 border-t border-ink-600 pt-2 font-terminal text-base leading-snug text-slate2-400">
                  <span className={`font-bold ${isCorrect ? 'text-jade-300' : 'text-ruby-300'}`}>
                    {isCorrect ? 'Correcto. ' : `Era ${item.answer ? 'Verdadero' : 'Falso'}. `}
                  </span>
                  {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ember-400 hover:text-ember-300"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>
        <button
          onClick={validate}
          disabled={!allAnswered || showVictory}
          className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-4 w-4" />
          Verificar (+{earnedXp} XP)
        </button>
      </div>

      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡PERFECTO!</h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{earnedXp} XP
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">Todas correctas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
