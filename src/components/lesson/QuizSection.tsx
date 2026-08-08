import { useState } from 'react';
import {
  Check,
  X,
  RotateCcw,
  Award,
  Eye,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { accentClasses, type QuizQuestion } from '@/data/lessonArgentina';

interface QuizSectionProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const POINTS_PER_QUESTION = 50;

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const total = questions.length;
  const MAX_SCORE = total * POINTS_PER_QUESTION;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(total).fill(null),
  );
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(total).fill(false),
  );
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);
  const [flashcardCorrect, setFlashcardCorrect] = useState(false);

  const q = questions[current];

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    if (revealed[qIndex]) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
    setRevealed((prev) => {
      const next = [...prev];
      next[qIndex] = true;
      return next;
    });
  };

  const handleFlashcardReveal = () => {
    setFlashcardRevealed(true);
  };

  const handleFlashcardCorrect = () => {
    setFlashcardCorrect(true);
    setRevealed((prev) => {
      const next = [...prev];
      next[current] = true;
      return next;
    });
  };

  const score = answers.reduce<number>((acc, ans, i) => {
    const question = questions[i];
    if (question.type === 'flashcard') {
      return flashcardCorrect && i === current ? acc + POINTS_PER_QUESTION : acc;
    }
    return ans === question.correctIndex ? acc + POINTS_PER_QUESTION : acc;
  }, 0);

  const allDone = revealed.every((r) => r);
  const isLast = current === total - 1;

  const goNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setFlashcardRevealed(false);
      setFlashcardCorrect(false);
    }
  };
  const goPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setFlashcardRevealed(false);
      setFlashcardCorrect(false);
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers(Array(total).fill(null));
    setRevealed(Array(total).fill(false));
    setFlashcardRevealed(false);
    setFlashcardCorrect(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-pixel text-sm text-gold-300 text-shadow-pixel">
          DESAFÍO FINAL
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
          {current + 1} / {total} · Score: {score}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1">
        <QuizCard
          key={q.id}
          question={q}
          selectedIndex={answers[current]}
          revealed={revealed[current]}
          flashcardRevealed={flashcardRevealed}
          flashcardCorrect={flashcardCorrect}
          onAnswer={(idx) => handleAnswer(current, idx)}
          onFlashcardReveal={handleFlashcardReveal}
          onFlashcardCorrect={handleFlashcardCorrect}
        />
      </div>

      {/* Progress dots */}
      <div className="my-4 flex items-center justify-center gap-2">
        {questions.map((qq, i) => {
          const answered = revealed[i];
          const correct =
            answered &&
            (qq.type === 'flashcard' ? flashcardCorrect && i === current : answers[i] === qq.correctIndex);
          return (
            <div
              key={qq.id}
              className={`h-2.5 w-2.5 border-2 transition-all ${
                correct
                  ? 'border-jade-400 bg-jade-400'
                  : answered
                    ? 'border-ruby-400 bg-ruby-400/50'
                    : i === current
                      ? 'border-gold-300 bg-gold-400'
                      : 'border-ink-500 bg-ink-700'
              }`}
            />
          );
        })}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-gold-400 hover:text-gold-200 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ember-400 hover:text-ember-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {isLast && allDone ? (
          <button
            onClick={() => onComplete(score)}
            className="flex items-center gap-2 border-2 border-jade-400 bg-jade-400 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-[4px_4px_0_0_#16a06b] transition-all hover:-translate-y-0.5 hover:bg-jade-300"
          >
            <Award className="h-4 w-4" />
            Finalizar ({score}/{MAX_SCORE})
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={current === total - 1}
            className="flex items-center gap-1.5 border-2 border-gold-400 bg-gold-400 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:opacity-40"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

interface QuizCardProps {
  question: QuizQuestion;
  selectedIndex: number | null;
  revealed: boolean;
  flashcardRevealed: boolean;
  flashcardCorrect: boolean;
  onAnswer: (idx: number) => void;
  onFlashcardReveal: () => void;
  onFlashcardCorrect: () => void;
}

function QuizCard({
  question,
  selectedIndex,
  revealed,
  flashcardRevealed,
  flashcardCorrect,
  onAnswer,
  onFlashcardReveal,
  onFlashcardCorrect,
}: QuizCardProps) {
  const a = accentClasses[question.accent];

  if (question.type === 'flashcard') {
    return (
      <div className={`border-2 ${a.border} bg-ink-800 p-5 shadow-pixel`}>
        <span
          className={`inline-block border-2 ${a.borderSoft} ${a.bgSoft} px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${a.textSoft}`}
        >
          FLASHCARD
        </span>
        <h4 className="mt-3 font-terminal text-xl leading-snug text-slate2-200">
          {question.question}
        </h4>

        {/* Flashcard */}
        <div className="mt-5">
          {!flashcardRevealed ? (
            <button
              onClick={onFlashcardReveal}
              className={`flex w-full items-center justify-center gap-2 border-2 ${a.border} bg-ink-700 px-4 py-6 font-mono text-sm font-bold uppercase tracking-widest ${a.text} transition-all hover:-translate-y-0.5 hover:bg-ink-600`}
            >
              <Eye className="h-5 w-5" />
              Revelar respuesta
            </button>
          ) : (
            <div className={`animate-[flicker_0.4s_ease] border-2 ${a.border} ${a.bgSoft} p-4`}>
              <p className="font-terminal text-lg leading-snug text-slate2-100">
                {question.answer}
              </p>
              {!flashcardCorrect ? (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={onFlashcardCorrect}
                    className="flex items-center gap-1.5 border-2 border-jade-400 bg-jade-400/15 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-jade-300 transition-all hover:bg-jade-400/25"
                  >
                    <Check className="h-4 w-4" />
                    ¡La sabía!
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-jade-300">
                  <Check className="h-4 w-4" />
                  +{POINTS_PER_QUESTION} pts
                </div>
              )}
            </div>
          )}
        </div>

        {revealed && flashcardCorrect && (
          <div className="mt-4 flex items-start gap-2 border-2 border-gold-400/30 bg-gold-400/5 p-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
            <p className="font-terminal text-base leading-snug text-slate2-300">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`border-2 ${a.border} bg-ink-800 p-5 shadow-pixel`}>
      <span
        className={`inline-block border-2 ${a.borderSoft} ${a.bgSoft} px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${a.textSoft}`}
      >
        {question.type === 'multiple' ? `OPCIÓN MÚLTIPLE` : 'VERDADERO / FALSO'}
      </span>
      <h4 className="mt-3 font-terminal text-xl leading-snug text-slate2-200">
        {question.question}
      </h4>

      <div className="mt-5 space-y-2.5">
        {question.options?.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selectedIndex;
          let state: 'idle' | 'correct' | 'wrong' | 'muted' = 'idle';
          if (revealed) {
            if (isCorrect) state = 'correct';
            else if (isSelected) state = 'wrong';
            else state = 'muted';
          }

          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-3 border-2 px-4 py-3 text-left transition-all ${
                state === 'correct'
                  ? 'border-jade-400 bg-jade-400/15'
                  : state === 'wrong'
                    ? 'border-ruby-400 bg-ruby-400/15'
                    : state === 'muted'
                      ? 'border-ink-600 bg-ink-700/50 opacity-50'
                      : 'border-ink-500 bg-ink-700 hover:border-gold-400 hover:bg-ink-600'
              } ${!revealed ? 'hover:-translate-y-0.5' : ''}`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center border-2 font-mono text-xs font-bold ${
                  state === 'correct'
                    ? 'border-jade-400 bg-jade-400 text-ink-900'
                    : state === 'wrong'
                      ? 'border-ruby-400 bg-ruby-400 text-ink-900'
                      : 'border-ink-500 bg-ink-900 text-slate2-400'
                }`}
              >
                {state === 'correct' ? (
                  <Check className="h-4 w-4" />
                ) : state === 'wrong' ? (
                  <X className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1 font-terminal text-lg leading-snug text-slate2-200">
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          className={`mt-4 flex items-start gap-2 border-2 p-3 ${
            selectedIndex === question.correctIndex
              ? 'border-jade-400/40 bg-jade-400/5'
              : 'border-ruby-400/40 bg-ruby-400/5'
          }`}
        >
          <Lightbulb
            className={`mt-0.5 h-4 w-4 shrink-0 ${
              selectedIndex === question.correctIndex ? 'text-jade-300' : 'text-ruby-300'
            }`}
          />
          <div>
            <p
              className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                selectedIndex === question.correctIndex ? 'text-jade-300' : 'text-ruby-300'
              }`}
            >
              {selectedIndex === question.correctIndex ? `¡Correcto! +${POINTS_PER_QUESTION} pts` : 'Incorrecto'}
            </p>
            <p className="mt-1 font-terminal text-base leading-snug text-slate2-300">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
