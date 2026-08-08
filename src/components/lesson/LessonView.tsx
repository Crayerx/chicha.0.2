import { useState, useEffect, useCallback } from 'react';
import {
  Compass,
  MapPin,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { getLesson, type LessonConfig, type StepType } from '@/data/lessons';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useUserStats } from '@/hooks/useUserStats';
import XPBar from './XPBar';
import LoreSlides from './LoreSlides';
import TimelineGame from './TimelineGame';
import MatchPairs from './MatchPairs';
import FillBlanks from './FillBlanks';
import Categorize from './Categorize';
import TrueFalseGrid from './TrueFalseGrid';
import MapHotspot from './MapHotspot';
import MemoryCards from './MemoryCards';
import SliderEstimate from './SliderEstimate';
import QuizSection from './QuizSection';
import VictoryModal from './VictoryModal';

interface LessonViewProps {
  lessonId?: string;
  onExit: () => void;
  /**
   * Modo repaso: la lección ya está terminada y el usuario solo quiere
   * releer/rejugar el contenido para reforzarlo. En este modo no se
   * persisten cambios de XP/pasos/is_finished — el progreso guardado queda
   * intacto — pero sí se registra la actividad del día para la racha.
   */
  reviewMode?: boolean;
}

export default function LessonView({ lessonId = 'argentina', onExit, reviewMode = false }: LessonViewProps) {
  const lesson: LessonConfig = getLesson(lessonId) ?? getLesson('argentina')!;
  const { progress, loaded, save, reset: resetProgress } = useLessonProgress(lessonId);
  const { recordActivity } = useUserStats();
  const [step, setStep] = useState(1);
  const [xp, setXp] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const maxXp = lesson.totalXp;
  const totalSteps = lesson.steps.length;
  const [localReview, setLocalReview] = useState(false);
  const isReviewing = reviewMode || localReview;

  useEffect(() => {
    if (!loaded) return;
    setXp(progress.total_xp);
    setQuizScore(progress.quiz_score);
    setCompletedSteps(progress.completed_steps ?? []);
    if (reviewMode) {
      // Arranca desde el principio para poder repasar todo el contenido,
      // sin tocar el progreso ya guardado.
      setStep(1);
      setShowVictory(false);
    } else {
      setStep(progress.current_step);
      if (progress.is_finished) setShowVictory(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, reviewMode]);

  const completeStep = useCallback(
    (
      completedStep: number,
      nextStep: number,
      extraXp: number,
      extra?: { quizScore?: number; finished?: boolean },
    ) => {
      if (isReviewing) {
        // Solo navegación local: no persiste XP/pasos ni marca victoria de
        // nuevo, para no pisar el progreso ya guardado de esta lección.
        recordActivity();
        setStep(nextStep);
        return;
      }
      setCompletedSteps((prev) => {
        if (prev.includes(completedStep)) return prev;
        const next = [...prev, completedStep];
        const newXp = Math.min(maxXp, xp + extraXp);
        save({
          current_step: nextStep,
          total_xp: newXp,
          completed_steps: next,
          is_finished: extra?.finished ?? false,
          quiz_score: extra?.quizScore ?? quizScore,
        });
        recordActivity();
        return next;
      });
      setXp((prev) => Math.min(maxXp, prev + extraXp));
      setStep(nextStep);
      if (extra?.finished) setShowVictory(true);
      if (extra?.quizScore !== undefined) setQuizScore(extra.quizScore);
    },
    [xp, quizScore, maxXp, save, recordActivity, isReviewing],
  );

  const stepType = (s: number): StepType | undefined => lesson.stepTypes[s - 1];

  const handleStepComplete = (currentStep: number) => {
    const xpForStep = lesson.stepXp[currentStep] ?? 0;
    const isLast = currentStep >= totalSteps;
    const next = isLast ? currentStep : currentStep + 1;
    if (stepType(currentStep) === 'quiz') {
      // quiz passes score separately via handleQuizComplete
      completeStep(currentStep, next, xpForStep, { finished: isLast });
    } else {
      completeStep(currentStep, next, xpForStep, isLast ? { finished: true } : undefined);
    }
  };

  const handleQuizComplete = (score: number) => {
    const xpForStep = lesson.stepXp[totalSteps] ?? 0;
    completeStep(totalSteps, totalSteps, xpForStep, {
      quizScore: score,
      finished: true,
    });
  };

  const reset = () => {
    resetProgress();
    setStep(1);
    setXp(0);
    setQuizScore(0);
    setShowVictory(false);
    setCompletedSteps([]);
  };

  const startReview = () => {
    setLocalReview(true);
    setShowVictory(false);
    setStep(1);
  };

  if (!loaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-900">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin border-4 border-gold-400 border-t-transparent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate2-400">
            Cargando progreso...
          </p>
        </div>
      </div>
    );
  }

  const sidebarItems = lesson.steps;

  return (
    <div className="min-h-screen bg-ink-900">
      {isReviewing && (
        <div className="flex items-center justify-center gap-2 border-b-2 border-jade-400/40 bg-jade-400/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-jade-300">
          Modo repaso — tu XP y progreso ya guardados no se van a modificar
        </div>
      )}
      <XPBar
        xp={xp}
        maxXp={maxXp}
        module={lesson.module}
        currentStep={step}
        steps={lesson.steps}
        onExit={onExit}
      />

      {/* Split-screen: 30% narrative / 70% workspace */}
      <div className="mx-auto grid max-w-7xl gap-0 px-0 lg:grid-cols-[30%_70%] lg:gap-0 lg:px-8 lg:py-6">
        {/* Left — narrative sidebar (30%) */}
        <aside className="border-r-0 border-ink-600 bg-ink-800/40 p-5 lg:border-r-2 lg:p-6">
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 border-2 border-gold-400/40 bg-ink-800 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
              <Compass className="h-3 w-3" />
              Lección Interactiva
            </span>
            <h2 className="mt-3 font-pixel text-base leading-tight text-gold-300 text-shadow-pixel">
              {lesson.title}
            </h2>
            <p className="mt-2 font-terminal text-lg leading-snug text-slate2-300">
              {lesson.subtitle}
            </p>
          </div>

          {/* Step list — scrollable */}
          <div className="max-h-[460px] space-y-2.5 overflow-y-auto pr-1">
            {sidebarItems.map((item) => {
              const isActive = step === item.id;
              const isDone = completedSteps.includes(item.id);
              const Icon = item.icon as LucideIcon;
              return (
                <div
                  key={item.id}
                  className={`border-2 p-2.5 transition-all ${
                    isActive
                      ? 'border-gold-400 bg-gold-400/5'
                      : isDone
                        ? 'border-jade-400/40 bg-jade-400/5'
                        : 'border-ink-600 bg-ink-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center border-2 ${
                        isActive
                          ? 'border-gold-400 bg-gold-400/10'
                          : isDone
                            ? 'border-jade-400 bg-jade-400/10'
                            : 'border-ink-500 bg-ink-700'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? 'text-gold-300' : isDone ? 'text-jade-300' : 'text-slate2-400'
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                          isActive ? 'text-gold-200' : isDone ? 'text-jade-300' : 'text-slate2-400'
                        }`}
                      >
                        {item.id}. {item.label}
                      </p>
                    </div>
                    {isDone && (
                      <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-widest text-jade-300">
                        +{lesson.stepXp[item.id] ?? 0}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Era badge */}
          <div className="mt-5 border-2 border-ink-600 bg-ink-800 p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
              Módulo
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-400" />
              <span className="font-pixel text-[10px] text-gold-200">{lesson.module}</span>
            </div>
            <p className="mt-2 font-terminal text-base text-slate2-400">{lesson.title}</p>
          </div>

          {/* Reset progress */}
          {!isReviewing && completedSteps.length > 0 && (
            <button
              onClick={() => {
                if (confirm('¿Seguro que quieres reiniciar el progreso de esta lección?')) {
                  reset();
                }
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-ruby-400/40 bg-ink-800 px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ruby-300 transition-all hover:border-ruby-400 hover:bg-ruby-400/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reiniciar progreso
            </button>
          )}
        </aside>

        {/* Right — workspace (70%) */}
        <main className="bg-ink-900 p-5 lg:p-8">
          <div className="mx-auto max-w-2xl">
            {stepType(step) === 'lore' && (
              <LoreSlides slides={lesson.lore} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'timeline' && (
              <TimelineGame events={lesson.timeline} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'match' && lesson.matchPairs && (
              <MatchPairs pairs={lesson.matchPairs} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'fill' && lesson.fillBlank && (
              <FillBlanks exercise={lesson.fillBlank} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'categorize' && lesson.categories && lesson.categoryItems && (
              <Categorize
                categories={lesson.categories}
                items={lesson.categoryItems}
                onComplete={() => handleStepComplete(step)}
              />
            )}
            {stepType(step) === 'truefalse' && lesson.trueFalseGrid && (
              <TrueFalseGrid items={lesson.trueFalseGrid} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'map' && lesson.mapHotspots && (
              <MapHotspot hotspots={lesson.mapHotspots} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'memory' && lesson.memoryCards && (
              <MemoryCards cards={lesson.memoryCards} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'slider' && lesson.sliderQuestions && (
              <SliderEstimate questions={lesson.sliderQuestions} onComplete={() => handleStepComplete(step)} />
            )}
            {stepType(step) === 'quiz' && (
              <QuizSection questions={lesson.quiz} onComplete={handleQuizComplete} />
            )}
          </div>
        </main>
      </div>

      {showVictory && (
        <VictoryModal
          xp={xp}
          maxXp={maxXp}
          score={quizScore}
          maxScore={lesson.quiz.length * 50}
          module={lesson.module}
          title={lesson.title}
          artifact={lesson.artifact}
          onRetry={reset}
          onHome={onExit}
          onReview={progress.is_finished && !isReviewing ? startReview : undefined}
        />
      )}
    </div>
  );
}
