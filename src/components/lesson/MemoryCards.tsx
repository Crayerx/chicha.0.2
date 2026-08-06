import { useState, useCallback } from 'react';
import { RotateCcw, Trophy, Check, Brain } from 'lucide-react';
import { memoryCards, type MemoryCardData } from '@/data/lessonArgentina';

interface MemoryCardsProps {
  onComplete: () => void;
}

const POINTS_PER_PAIR = 30;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): MemoryCardData[] {
  return shuffle(memoryCards);
}

export default function MemoryCards({ onComplete }: MemoryCardsProps) {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [showVictory, setShowVictory] = useState(false);

  const allMatched = matched.size === memoryCards.length / 2;

  const handleFlip = useCallback(
    (cardId: string) => {
      if (flipped.includes(cardId) || matched.has(cardId) || wrongPair.length > 0) return;
      if (flipped.length >= 2) return;

      const newFlipped = [...flipped, cardId];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = newFlipped;
        const cardA = deck.find((c) => c.id === a)!;
        const cardB = deck.find((c) => c.id === b)!;

        if (cardA.pairId === cardB.pairId) {
          setTimeout(() => {
            setMatched((prev) => new Set(prev).add(cardA.pairId));
            setFlipped([]);
          }, 500);
        } else {
          setWrongPair(newFlipped);
          setTimeout(() => {
            setWrongPair([]);
            setFlipped([]);
          }, 900);
        }
      }
    },
    [flipped, matched, wrongPair, deck],
  );

  const handleFinish = () => {
    setShowVictory(true);
    setTimeout(() => onComplete(), 2400);
  };

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setWrongPair([]);
    setMoves(0);
    setShowVictory(false);
  };

  const earnedXp = (matched.size * POINTS_PER_PAIR) - (moves - matched.size) * 5;
  const finalXp = Math.max(earnedXp, matched.size * POINTS_PER_PAIR - 30);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          MEMORIA HISTÓRICA
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {matched.size}/{memoryCards.length / 2} pares · {moves} jugadas
        </span>
      </div>

      <p className="mb-4 font-terminal text-lg text-slate2-300">
        Toca las tarjetas para voltearlas. Encuentra los pares que se corresponden:
        concepto y su definición. ¡Menos jugadas = más XP!
      </p>

      {/* Card grid */}
      <div className="grid flex-1 grid-cols-3 gap-2.5 sm:gap-3">
        {deck.map((card) => {
          const isFlipped = flipped.includes(card.id) || wrongPair.includes(card.id);
          const isMatched = matched.has(card.pairId);
          const isWrong = wrongPair.includes(card.id);
          const showFront = isFlipped || isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              disabled={isMatched}
              className={`relative aspect-square border-2 p-2 transition-all duration-200 ${
                isMatched
                  ? 'border-jade-400 bg-jade-400/10'
                  : isWrong
                    ? 'border-ruby-400 bg-ruby-400/15'
                    : showFront
                      ? 'border-gold-400 bg-ink-700'
                      : 'border-ink-500 bg-ink-800 hover:border-gold-400 hover:-translate-y-0.5'
              }`}
            >
              {showFront ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {isMatched && <Check className="absolute right-1.5 top-1.5 h-3 w-3 text-jade-300" />}
                  <p
                    className={`font-mono text-[10px] font-bold leading-tight ${
                      isMatched
                        ? 'text-jade-300'
                        : isWrong
                          ? 'text-ruby-300'
                          : 'text-gold-200'
                    }`}
                  >
                    {card.text}
                  </p>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Brain className="h-6 w-6 text-ink-500" />
                </div>
              )}
            </button>
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
          onClick={handleFinish}
          disabled={!allMatched || showVictory}
          className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-4 w-4" />
          Continuar (+{finalXp} XP)
        </button>
      </div>

      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡MEMORIA!</h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{finalXp} XP · {moves} jugadas
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">Todos los pares encontrados</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
