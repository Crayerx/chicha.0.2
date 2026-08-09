import { useState, useCallback } from 'react';
import { GripVertical, Check, RotateCcw, Trophy, X } from 'lucide-react';
import type { TimelineEvent } from '@/data/lessonArgentina';
import { STEP_TYPE_XP } from '@/data/lessons';

interface TimelineGameProps {
  events: TimelineEvent[];
  onComplete: () => void;
}

/**
 * Selección activa: un evento del pool o el contenido de un slot que el
 * usuario tocó y quiere mover. Este modelo de "tocar origen, tocar
 * destino" reemplaza al drag & drop nativo de HTML5, que no dispara
 * eventos en dispositivos táctiles (iOS Safari / Chrome Android) sin un
 * polyfill. Con onClick funciona igual con mouse y con el dedo.
 */
type Selection = { from: 'pool'; id: string } | { from: 'slot'; index: number } | null;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TimelineGame({ events, onComplete }: TimelineGameProps) {
  const [pool, setPool] = useState<TimelineEvent[]>(() => shuffle(events));
  const [slots, setSlots] = useState<(TimelineEvent | null)[]>(
    Array(events.length).fill(null),
  );
  const [selection, setSelection] = useState<Selection>(null);
  const [validated, setValidated] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  const correctOrder = [...events].sort((x, y) => x.year - y.year);
  const allFilled = slots.every((s) => s !== null);

  const returnFromSlot = (arr: (TimelineEvent | null)[], slotIndex: number) => {
    const item = arr[slotIndex];
    if (item) {
      setPool((prev) => [...prev, item]);
      arr[slotIndex] = null;
    }
  };

  const placeInSlot = useCallback((slotIndex: number, event: TimelineEvent) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[slotIndex]) {
        returnFromSlot(next, slotIndex);
      }
      next[slotIndex] = event;
      return next;
    });
    setPool((prev) => prev.filter((e) => e.id !== event.id));
  }, []);

  const swapSlots = (a: number, b: number) => {
    setSlots((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  };

  // Tocar un evento del pool: si no había nada seleccionado, lo selecciona;
  // si ya estaba seleccionado, lo deselecciona; si había otro seleccionado,
  // cambia la selección a este.
  const tapPoolItem = (event: TimelineEvent) => {
    if (validated) return;
    setSelection((prev) =>
      prev?.from === 'pool' && prev.id === event.id ? null : { from: 'pool', id: event.id },
    );
  };

  // Tocar un slot: coloca la selección activa ahí (desde el pool o desde
  // otro slot), o si no hay selección y el slot tiene algo, lo devuelve al
  // pool (toque simple para deshacer).
  const tapSlot = (slotIndex: number) => {
    if (validated) return;

    if (selection?.from === 'pool') {
      const event = pool.find((e) => e.id === selection.id);
      if (event) placeInSlot(slotIndex, event);
      setSelection(null);
      return;
    }

    if (selection?.from === 'slot') {
      if (selection.index !== slotIndex) {
        swapSlots(selection.index, slotIndex);
      }
      setSelection(null);
      return;
    }

    // Nada seleccionado: tocar un slot lleno lo saca al pool; tocar uno
    // vacío no hace nada.
    if (slots[slotIndex]) {
      setSlots((prev) => {
        const next = [...prev];
        returnFromSlot(next, slotIndex);
        return next;
      });
    }
  };

  // Tocar el contenido de un slot lleno (en vez del slot vacío alrededor):
  // arranca a moverlo a otro lugar en vez de sacarlo directo.
  const tapFilledSlot = (slotIndex: number) => {
    if (validated) return;
    setSelection((prev) =>
      prev?.from === 'slot' && prev.index === slotIndex ? null : { from: 'slot', index: slotIndex },
    );
  };

  const validate = () => {
    const isCorrect = slots.every(
      (s, i) => s !== null && s.id === correctOrder[i].id,
    );
    setValidated(true);
    setSelection(null);
    if (isCorrect) {
      setShowVictory(true);
      setTimeout(() => {
        onComplete();
      }, 2600);
    }
  };

  const reset = () => {
    setPool(shuffle(events));
    setSlots(Array(events.length).fill(null));
    setSelection(null);
    setValidated(false);
    setShowVictory(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          LÍNEA DE TIEMPO
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          Ordena los eventos
        </span>
      </div>

      <p className="mb-4 font-terminal text-lg text-slate2-300">
        Toca un evento y luego el lugar donde quieras colocarlo, en orden cronológico.
        ¡Completa la línea para ganar <span className="text-gold-300">+{STEP_TYPE_XP.timeline} XP</span>!
      </p>

      {/* Timeline slots */}
      <div className="relative mb-6">
        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gold-400/30" />
        <div className="space-y-3">
          {slots.map((slot, i) => {
            const correct = validated && slot?.id === correctOrder[i].id;
            const wrong = validated && slot !== null && slot?.id !== correctOrder[i].id;
            const isSelected = selection?.from === 'slot' && selection.index === i;
            const isDropTarget = selection !== null && !isSelected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => tapSlot(i)}
                disabled={validated}
                className={`flex w-full touch-manipulation items-center gap-3 border-2 p-2.5 text-left transition-all ${
                  correct
                    ? 'border-jade-400 bg-jade-400/10'
                    : wrong
                      ? 'border-ruby-400 bg-ruby-400/10'
                      : isSelected
                        ? 'border-gold-300 bg-gold-400/15 shadow-pixel-gold'
                        : isDropTarget
                          ? 'border-gold-400/70 bg-ink-700 ring-2 ring-gold-400/30'
                          : slot
                            ? 'border-gold-400/60 bg-ink-700'
                            : 'border-dashed border-ink-500 bg-ink-800/50'
                } ${validated ? 'cursor-default' : ''}`}
              >
                {/* Timeline node */}
                <div
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center border-2 font-pixel text-[10px] ${
                    correct
                      ? 'border-jade-400 bg-jade-400 text-ink-900'
                      : wrong
                        ? 'border-ruby-400 bg-ruby-400 text-ink-900'
                        : 'border-gold-400 bg-ink-900 text-gold-300'
                  }`}
                >
                  {correct ? <Check className="h-4 w-4" /> : i + 1}
                </div>

                {slot ? (
                  <span
                    onClick={(e) => {
                      // Tocar el contenido en sí arranca a moverlo, en vez
                      // de sacarlo directo como hace tocar el slot vacío.
                      e.stopPropagation();
                      tapFilledSlot(i);
                    }}
                    className="flex flex-1 items-center gap-2"
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-slate2-500" />
                    <span className="flex-1 font-terminal text-base text-slate2-200">
                      {slot.label}
                    </span>
                    <span className="border-2 border-gold-400/40 bg-ink-900 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-gold-200">
                      {slot.date}
                    </span>
                    {wrong && <X className="h-4 w-4 text-ruby-400" />}
                  </span>
                ) : (
                  <span className="flex-1 font-mono text-xs uppercase tracking-widest text-slate2-500">
                    {isDropTarget ? '— Tocá para colocar aquí —' : '— Vacío —'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pool */}
      <div className="mb-4 border-2 border-ink-500 bg-ink-800/70 p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          Eventos disponibles
        </p>
        {pool.length === 0 ? (
          <p className="py-2 text-center font-mono text-xs uppercase tracking-widest text-slate2-500">
            Todos colocados
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pool.map((event) => {
              const isSelected = selection?.from === 'pool' && selection.id === event.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => tapPoolItem(event)}
                  disabled={validated}
                  className={`flex touch-manipulation items-center gap-2 border-2 px-3 py-2 transition-all ${
                    isSelected
                      ? 'border-gold-300 bg-gold-400/20 shadow-pixel-gold'
                      : 'border-gold-400/50 bg-ink-700'
                  }`}
                >
                  <GripVertical className="h-3.5 w-3.5 text-slate2-500" />
                  <span className="font-terminal text-base text-slate2-200">
                    {event.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ember-400 hover:text-ember-300"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>
        <button
          onClick={validate}
          disabled={!allFilled || showVictory}
          className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-4 w-4" />
          Verificar
        </button>
      </div>

      {/* Victory flash */}
      {showVictory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 backdrop-blur-sm">
          <div className="border-4 border-gold-300 bg-ink-800 p-8 shadow-pixel-xl animate-[pulseGlow_0.6s_ease-in-out_infinite]">
            <div className="text-center">
              <Trophy className="mx-auto h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_16px_rgba(255,204,51,0.7)]" />
              <h3 className="mt-4 font-pixel text-xl text-gold-300 text-shadow-pixel">
                ¡VICTORIA!
              </h3>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-jade-300">
                +{STEP_TYPE_XP.timeline} XP
              </p>
              <p className="mt-2 font-terminal text-lg text-slate2-300">
                Línea de tiempo completada
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Wrong feedback */}
      {validated && !showVictory && (
        <div className="mt-3 border-2 border-ruby-400 bg-ruby-400/10 p-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ruby-300">
            Hay eventos en orden incorrecto. Revisa e inténtalo de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
