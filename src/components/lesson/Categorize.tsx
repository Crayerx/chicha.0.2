import { useState } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { accentClasses, type CategoryDef, type CategoryItem } from '@/data/lessonArgentina';

interface CategorizeProps {
  categories: CategoryDef[];
  items: CategoryItem[];
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

const POINTS_PER_ITEM = 12;

export default function Categorize({ categories, items: categoryItems, onComplete }: CategorizeProps) {
  const [pool, setPool] = useState(() => shuffle(categoryItems));
  const [buckets, setBuckets] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, []])),
  );
  const [validated, setValidated] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const allPlaced = pool.length === 0;

  const assignItem = (itemId: string, catId: string) => {
    const item = pool.find((i) => i.id === itemId);
    if (!item) return;
    setBuckets((prev) => ({ ...prev, [catId]: [...prev[catId], itemId] }));
    setPool((prev) => prev.filter((i) => i.id !== itemId));
    setSelectedItem(null);
  };

  const removeFromBucket = (itemId: string, catId: string) => {
    setBuckets((prev) => ({ ...prev, [catId]: prev[catId].filter((id) => id !== itemId) }));
    const item = categoryItems.find((i) => i.id === itemId);
    if (item) setPool((prev) => [...prev, item]);
  };

  const validate = () => {
    const allCorrect = categoryItems.every((item) => buckets[item.categoryId].includes(item.id));
    setValidated(true);
    if (allCorrect) {
      setShowVictory(true);
      setTimeout(() => onComplete(), 2200);
    }
  };

  const reset = () => {
    setPool(shuffle(categoryItems));
    setBuckets(Object.fromEntries(categories.map((c) => [c.id, []])));
    setValidated(false);
    setShowVictory(false);
    setSelectedItem(null);
  };

  const correctCount = categoryItems.filter((item) => buckets[item.categoryId].includes(item.id)).length;
  const earnedXp = correctCount * POINTS_PER_ITEM;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          CLASIFICAR
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {correctCount}/{categoryItems.length} correctos
        </span>
      </div>

      <p className="mb-4 font-terminal text-lg text-slate2-300">
        Selecciona un ítem y luego toca la categoría correspondiente. Arrastra cada concepto
        a su grupo: {categories.map((c) => c.label).join(', ')}.
      </p>

      {/* Pool */}
      <div className="mb-4 border-2 border-ink-500 bg-ink-800/70 p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          Ítems {selectedItem && '— toca una categoría'}
        </p>
        {pool.length === 0 ? (
          <p className="py-2 text-center font-mono text-xs uppercase tracking-widest text-slate2-500">
            Todos clasificados
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pool.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`border-2 px-3 py-2 font-mono text-xs font-bold transition-all ${
                  selectedItem === item.id
                    ? 'border-gold-300 bg-gold-400/15 text-gold-200 animate-pulse-glow'
                    : 'border-ink-500 bg-ink-700 text-slate2-300 hover:border-gold-400 hover:-translate-y-0.5'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buckets */}
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
        {categories.map((cat) => {
          const a = accentClasses[cat.accent];
          const items = buckets[cat.id].map((id) => categoryItems.find((i) => i.id === id)!).filter(Boolean);
          return (
            <button
              key={cat.id}
              onClick={() => selectedItem && assignItem(selectedItem, cat.id)}
              disabled={!selectedItem}
              className={`border-2 ${a.border} bg-ink-800 p-3 text-left transition-all ${
                selectedItem ? 'hover:bg-ink-700 hover:-translate-y-0.5' : 'opacity-80'
              }`}
            >
              <p className={`mb-3 font-mono text-xs font-bold uppercase tracking-widest ${a.text}`}>
                {cat.label}
              </p>
              <div className="space-y-2">
                {items.map((item) => {
                  const isCorrect = validated && item.categoryId === cat.id;
                  const isWrong = validated && item.categoryId !== cat.id;
                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!validated) removeFromBucket(item.id, cat.id);
                      }}
                      className={`flex items-center justify-between border-2 px-2 py-1.5 font-mono text-[11px] transition-all ${
                        isCorrect
                          ? 'border-jade-400 bg-jade-400/10 text-jade-300'
                          : isWrong
                            ? 'border-ruby-400 bg-ruby-400/10 text-ruby-300'
                            : `${a.borderSoft} ${a.bgSoft} ${a.textSoft}`
                      }`}
                    >
                      <span>{item.text}</span>
                      {isCorrect && <Check className="h-3 w-3" />}
                      {isWrong && <X className="h-3 w-3" />}
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <p className="py-2 text-center font-mono text-[10px] uppercase tracking-widest text-slate2-500">
                    — vacío —
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {validated && !showVictory && (
        <div className="mt-3 border-2 border-ruby-400 bg-ruby-400/10 p-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ruby-300">
            Algunos ítems están mal clasificados. Toca un ítem rojo para devolverlo.
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

      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">¡PERFECTO!</h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{earnedXp} XP
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">Todo clasificado correctamente</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
