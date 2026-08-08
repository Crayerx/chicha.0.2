import { useState } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import type { FillBlankExercise } from '@/data/lessonArgentina';
import { STEP_TYPE_XP } from '@/data/lessons';

interface FillBlanksProps {
  exercise: FillBlankExercise;
  onComplete: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FillBlanks({ exercise, onComplete }: FillBlanksProps) {
  const blanks = exercise.blanks;
  const [bank, setBank] = useState(() => shuffle(exercise.bank));
  const [placed, setPlaced] = useState<Record<string, string | null>>(
    Object.fromEntries(blanks.map((b) => [b.id, null])),
  );
  const [validated, setValidated] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [selectedBlank, setSelectedBlank] = useState<string | null>(null);

  const allPlaced = blanks.every((b) => placed[b.id] !== null);

  const placeWord = (blankId: string, word: string) => {
    setPlaced((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k] === word) next[k] = null;
      });
      next[blankId] = word;
      return next;
    });
    setBank((prev) => prev.filter((w) => w !== word));
    setSelectedBlank(null);
  };

  const removeWord = (blankId: string) => {
    const word = placed[blankId];
    if (!word) return;
    setPlaced((prev) => ({ ...prev, [blankId]: null }));
    setBank((prev) => [...prev, word]);
  };

  const handleBankClick = (word: string) => {
    if (selectedBlank) {
      placeWord(selectedBlank, word);
    }
  };

  const validate = () => {
    const allCorrect = blanks.every((b) => placed[b.id] === b.correct);
    setValidated(true);
    if (allCorrect) {
      setShowVictory(true);
      setTimeout(() => onComplete(), 2200);
    }
  };

  const reset = () => {
    setBank(shuffle(exercise.bank));
    setPlaced(Object.fromEntries(blanks.map((b) => [b.id, null])));
    setValidated(false);
    setShowVictory(false);
    setSelectedBlank(null);
  };

  const correctCount = blanks.filter((b) => placed[b.id] === b.correct).length;
  // Proporcional al XP real que otorga este paso (STEP_TYPE_XP.fill).
  const earnedXp = Math.round((correctCount / blanks.length) * STEP_TYPE_XP.fill);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          COMPLETAR ESPACIOS
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {correctCount}/{blanks.length} correctos
        </span>
      </div>

      <p className="mb-5 font-terminal text-lg text-slate2-300">
        {exercise.prompt}
      </p>

      {/* Text with blanks */}
      <div className="flex-1 border-2 border-ink-500 bg-ink-800 p-5">
        <p className="font-terminal text-lg leading-relaxed text-slate2-200">
          {blanks.map((b, i) => {
            const word = placed[b.id];
            const isCorrect = validated && word === b.correct;
            const isWrong = validated && word !== null && word !== b.correct;
            return (
              <span key={b.id}>
                {b.textBefore}
                <button
                  onClick={() => (word ? removeWord(b.id) : setSelectedBlank(b.id))}
                  disabled={validated && isCorrect}
                  className={`mx-1 inline-flex min-w-[100px] items-center justify-center border-2 px-2 py-0.5 font-mono text-sm font-bold transition-all ${
                    isCorrect
                      ? 'border-jade-400 bg-jade-400/15 text-jade-300'
                      : isWrong
                        ? 'border-ruby-400 bg-ruby-400/15 text-ruby-300'
                        : word
                          ? 'border-gold-400 bg-gold-400/10 text-gold-200'
                          : selectedBlank === b.id
                            ? 'border-ember-400 bg-ember-400/10 text-ember-300 animate-pulse-glow'
                            : 'border-dashed border-ink-500 text-slate2-500 hover:border-gold-400'
                  }`}
                >
                  {word || (selectedBlank === b.id ? '...' : '_____')}
                </button>
                {b.textAfter}
                {i < blanks.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>
      </div>

      {/* Word bank */}
      <div className="mt-4 border-2 border-ink-500 bg-ink-800/70 p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          Palabras disponibles {selectedBlank && '— selecciona una'}
        </p>
        {bank.length === 0 ? (
          <p className="py-2 text-center font-mono text-xs uppercase tracking-widest text-slate2-500">
            Todas colocadas
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {bank.map((word) => (
              <button
                key={word}
                onClick={() => handleBankClick(word)}
                className={`border-2 px-3 py-2 font-mono text-xs font-bold transition-all ${
                  selectedBlank
                    ? 'border-gold-400 bg-gold-400/10 text-gold-200 hover:-translate-y-0.5 hover:bg-gold-400/20'
                    : 'border-ink-500 bg-ink-700 text-slate2-300 opacity-60'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>

      {validated && !showVictory && (
        <div className="mt-3 border-2 border-ruby-400 bg-ruby-400/10 p-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ruby-300">
            Algunas respuestas son incorrectas. Toca una palabra roja para quitarla y reintentar.
          </p>
        </div>
      )}

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
          disabled={!allPlaced || showVictory}
          className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-4 w-4" />
          Verificar (+{earnedXp} XP)
        </button>
      </div>

      {showVictory && <VictoryFlash xp={earnedXp} label="¡Texto completado!" />}
    </div>
  );
}

function VictoryFlash({ xp, label }: { xp: number; label: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
      <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
        <div className="text-center">
          <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
          <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡PERFECTO!</h3>
          <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
            +{xp} XP
          </p>
          <p className="mt-2 font-terminal text-lg text-slate2-300">{label}</p>
        </div>
      </div>
    </div>
  );
}
