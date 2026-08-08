import { useState, useCallback } from 'react';
import { Check, X, RotateCcw, Link2, Trophy } from 'lucide-react';
import type { MatchPair } from '@/data/lessonArgentina';
import { STEP_TYPE_XP } from '@/data/lessons';

interface MatchPairsProps {
  pairs: MatchPair[];
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

interface Side {
  pairId: string;
  text: string;
  side: 'left' | 'right';
}

function buildSides(pairs: MatchPair[]): { left: Side[]; right: Side[] } {
  const left: Side[] = pairs.map((p) => ({ pairId: p.id, text: p.concept, side: 'left' }));
  const right: Side[] = pairs.map((p) => ({ pairId: p.id, text: p.match, side: 'right' }));
  return { left, right: shuffle(right) };
}

export default function MatchPairs({ pairs, onComplete }: MatchPairsProps) {
  const [{ left, right }, setSides] = useState(() => buildSides(pairs));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const allMatched = matched.size === pairs.length;

  const tryMatch = useCallback(
    (lId: string, rId: string) => {
      if (matched.has(lId) || matched.has(rId)) return;
      if (lId === rId) {
        setMatched((prev) => new Set(prev).add(lId));
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        setWrongPair({ left: lId, right: rId });
        setWrongCount((c) => c + 1);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 700);
      }
    },
    [matched],
  );

  const handleLeftClick = (pairId: string) => {
    if (matched.has(pairId)) return;
    setSelectedLeft(pairId);
    if (selectedRight) tryMatch(pairId, selectedRight);
  };

  const handleRightClick = (pairId: string) => {
    if (matched.has(pairId)) return;
    setSelectedRight(pairId);
    if (selectedLeft) tryMatch(selectedLeft, pairId);
  };

  const handleFinish = () => {
    setShowVictory(true);
    setTimeout(() => onComplete(), 2400);
  };

  const reset = () => {
    setSides(buildSides(pairs));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched(new Set());
    setWrongPair(null);
    setWrongCount(0);
    setShowVictory(false);
  };

  // Proporcional al XP real que otorga este paso (STEP_TYPE_XP.match).
  const earnedXp = Math.round((matched.size / pairs.length) * STEP_TYPE_XP.match);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          EMPAREJAR CONCEPTOS
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {matched.size}/{pairs.length} · +{earnedXp} XP
        </span>
      </div>

      <p className="mb-5 font-terminal text-lg text-slate2-300">
        Selecciona un concepto de la izquierda y su definición correspondiente
        a la derecha. ¡Encuentra los <span className="text-gold-300">{pairs.length} pares</span>!
      </p>

      {/* Match board */}
      <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
        {/* Left column — concepts */}
        <div className="space-y-2.5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
            Concepto
          </p>
          {left.map((item) => {
            const isMatched = matched.has(item.pairId);
            const isSelected = selectedLeft === item.pairId;
            const isWrong = wrongPair?.left === item.pairId;
            return (
              <button
                key={item.pairId}
                onClick={() => handleLeftClick(item.pairId)}
                disabled={isMatched}
                className={`flex w-full items-center gap-2 border-2 px-3 py-3 text-left font-terminal text-base leading-snug transition-all ${
                  isMatched
                    ? 'border-jade-400 bg-jade-400/10 text-jade-300'
                    : isWrong
                      ? 'border-ruby-400 bg-ruby-400/15 text-ruby-300'
                      : isSelected
                        ? 'border-gold-300 bg-gold-400/15 text-gold-200'
                        : 'border-ink-500 bg-ink-700 text-slate2-200 hover:border-gold-400 hover:bg-ink-600'
                } ${!isMatched && !isSelected && !isWrong ? 'hover:-translate-y-0.5' : ''}`}
              >
                {isMatched ? (
                  <Check className="h-4 w-4 shrink-0 text-jade-300" />
                ) : isWrong ? (
                  <X className="h-4 w-4 shrink-0 text-ruby-400" />
                ) : (
                  <Link2 className="h-4 w-4 shrink-0 text-slate2-500" />
                )}
                <span className="flex-1">{item.text}</span>
              </button>
            );
          })}
        </div>

        {/* Right column — definitions */}
        <div className="space-y-2.5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ember-300">
            Definición
          </p>
          {right.map((item) => {
            const isMatched = matched.has(item.pairId);
            const isSelected = selectedRight === item.pairId;
            const isWrong = wrongPair?.right === item.pairId;
            return (
              <button
                key={item.pairId}
                onClick={() => handleRightClick(item.pairId)}
                disabled={isMatched}
                className={`flex w-full items-center gap-2 border-2 px-3 py-3 text-left font-terminal text-base leading-snug transition-all ${
                  isMatched
                    ? 'border-jade-400 bg-jade-400/10 text-jade-300'
                    : isWrong
                      ? 'border-ruby-400 bg-ruby-400/15 text-ruby-300'
                      : isSelected
                        ? 'border-ember-300 bg-ember-400/15 text-ember-300'
                        : 'border-ink-500 bg-ink-700 text-slate2-200 hover:border-ember-400 hover:bg-ink-600'
                } ${!isMatched && !isSelected && !isWrong ? 'hover:-translate-y-0.5' : ''}`}
              >
                {isMatched ? (
                  <Check className="h-4 w-4 shrink-0 text-jade-300" />
                ) : isWrong ? (
                  <X className="h-4 w-4 shrink-0 text-ruby-400" />
                ) : (
                  <Link2 className="h-4 w-4 shrink-0 text-slate2-500" />
                )}
                <span className="flex-1">{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wrong count */}
      {wrongCount > 0 && !allMatched && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ruby-300">
          Errores: {wrongCount}
        </p>
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
          onClick={handleFinish}
          disabled={!allMatched || showVictory}
          className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-4 w-4" />
          Continuar
        </button>
      </div>

      {/* Victory flash */}
      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">
                ¡PERFECTO!
              </h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{earnedXp} XP
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">
                Todos los conceptos emparejados
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
