import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Loader2,
  Lightbulb,
  ChevronDown,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { getChapter, getExercise, EXERCISE_XP } from '@/data/csharpChapters';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useUserStats } from '@/contexts/UserStatsContext';
import { useWeeklyLeaderboard } from '@/hooks/useWeeklyLeaderboard';
import { useAuth } from '@/contexts/AuthContext';
import { runCSharp, ranSuccessfully, type RunResult } from '@/lib/runCode';
import CodeEditor from './CodeEditor';

type RunState = 'idle' | 'running' | 'ran' | 'error';

export default function CSharpExerciseView({
  chapterId,
  exerciseNumber,
  onExit,
  onNavigateExercise,
}: {
  chapterId: string;
  exerciseNumber: number;
  onExit: () => void;
  /** Navega a otro ejercicio del mismo capítulo (ej. "Siguiente ejercicio"). */
  onNavigateExercise: (chapterId: string, exerciseNumber: number) => void;
}) {
  const chapter = getChapter(chapterId);
  const exercise = getExercise(chapterId, exerciseNumber);

  const { isAuthenticated } = useAuth();
  const { progress, save } = useLessonProgress(chapterId);
  const { recordActivity } = useUserStats();
  const { addXp } = useWeeklyLeaderboard();

  const [code, setCode] = useState(exercise?.starterCode ?? '');
  const [runState, setRunState] = useState<RunState>('idle');
  const [result, setResult] = useState<RunResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setCode(exercise?.starterCode ?? '');
    setRunState('idle');
    setResult(null);
    setErrorMsg(null);
    setShowHint(false);
    setPassed(progress.completed_steps?.includes(exerciseNumber) ?? false);
  }, [chapterId, exerciseNumber, exercise, progress.completed_steps]);

  const totalExercises = chapter?.exercises.length ?? 0;
  const isLastExercise = exerciseNumber >= totalExercises;

  const handleRun = useCallback(
    async (checkAnswer: boolean) => {
      if (!exercise) return;
      setRunState('running');
      setErrorMsg(null);
      try {
        const res = await runCSharp(code);
        setResult(res);

        if (!ranSuccessfully(res)) {
          setRunState('error');
          return;
        }
        setRunState('ran');

        if (checkAnswer) {
          const ok = res.stdout.trim() === exercise.expectedOutput.trim();
          if (ok) {
            setPassed(true);
            const already = progress.completed_steps?.includes(exerciseNumber) ?? false;
            if (!already) {
              const nextCompleted = [...(progress.completed_steps ?? []), exerciseNumber];
              const nextXp = (progress.total_xp ?? 0) + EXERCISE_XP;
              save({
                current_step: Math.min(exerciseNumber + 1, totalExercises),
                completed_steps: nextCompleted,
                total_xp: nextXp,
                is_finished: nextCompleted.length >= totalExercises,
              });
              recordActivity(EXERCISE_XP);
              addXp(EXERCISE_XP);
            }
          }
        }
      } catch (err) {
        setRunState('error');
        setErrorMsg(err instanceof Error ? err.message : 'Error inesperado al compilar.');
      }
    },
    [code, exercise, progress, exerciseNumber, totalExercises, save, recordActivity, addXp],
  );

  if (!chapter || !exercise) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-900 px-4 text-center text-slate2-300">
        <div>
          <p className="font-terminal text-xl">Este ejercicio todavía no existe.</p>
          <button
            onClick={onExit}
            className="mt-4 border-2 border-gold-400 bg-ink-800 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-gold-200"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((exerciseNumber - 1) / totalExercises * 100);

  return (
    <div className="flex h-screen flex-col bg-ink-900 text-slate2-300">
      {/* Top bar */}
      <header className="flex items-center gap-4 border-b-2 border-ink-600 bg-ink-800 px-4 py-2.5">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 hover:text-gold-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Salir
        </button>
        <span className="font-mono text-xs uppercase tracking-widest text-slate2-400">
          C# / {chapter.title}
        </span>
        <div className="ml-2 h-2 w-40 max-w-[30vw] border border-ink-500 bg-ink-700">
          <div
            className="h-full bg-gold-400 opacity-80 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-500">
          {exerciseNumber} / {totalExercises}
        </span>
        {!isAuthenticated && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ember-400">
            Sin cuenta — el progreso no se guarda
          </span>
        )}
      </header>

      {/* Body: instructions | editor | output */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Instructions */}
        <aside className="min-h-0 overflow-y-auto border-b-2 border-ink-600 bg-ink-800 p-6 lg:w-[26%] lg:border-b-0 lg:border-r-2">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-300">
            {String(exerciseNumber).padStart(2, '0')}. {exercise.title}
          </p>
          <div className="mt-4 space-y-3">
            {exercise.instructions.map((p, i) => (
              <p key={i} className="font-terminal text-lg leading-snug text-slate2-300">
                {p}
              </p>
            ))}
          </div>

          <button
            onClick={() => setShowHint((v) => !v)}
            className="mt-6 flex w-full items-center justify-between border-2 border-ink-500 bg-ink-700 px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 hover:border-gold-300"
          >
            <span className="inline-flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-gold-300" />
              Pista
            </span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showHint ? 'rotate-180' : ''}`} />
          </button>
          {showHint && (
            <pre className="mt-2 whitespace-pre-wrap border-2 border-ink-500 bg-ink-900 p-3 font-mono text-xs text-slate2-300">
              {exercise.hint}
            </pre>
          )}
        </aside>

        {/* Editor */}
        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b-2 border-ink-600 bg-ink-800 px-4 py-1.5">
            <span className="font-mono text-xs text-slate2-400">programa.cs</span>
          </div>
          <div className="min-h-0 flex-1">
            <CodeEditor value={code} onChange={setCode} disabled={runState === 'running'} />
          </div>
          <div className="flex items-center gap-3 border-t-2 border-ink-600 bg-ink-800 px-4 py-3">
            <button
              onClick={() => handleRun(false)}
              disabled={runState === 'running'}
              className="inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate2-200 hover:border-gold-300 disabled:opacity-60"
            >
              {runState === 'running' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
              Ejecutar
            </button>
            <button
              onClick={() => handleRun(true)}
              disabled={runState === 'running'}
              className="inline-flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-sm hover:bg-gold-300 disabled:opacity-60"
            >
              {runState === 'running' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
              Verificar
            </button>

            {passed && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-jade-400">
                <CheckCircle2 className="h-4 w-4" />
                Resuelto
              </span>
            )}

            {passed && !isLastExercise && (
              <button
                onClick={() => onNavigateExercise(chapterId, exerciseNumber + 1)}
                className="ml-auto inline-flex items-center gap-2 border-2 border-jade-400 bg-jade-400 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 hover:bg-jade-300"
              >
                Siguiente ejercicio
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            {passed && isLastExercise && (
              <button
                onClick={onExit}
                className="ml-auto inline-flex items-center gap-2 border-2 border-jade-400 bg-jade-400 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 hover:bg-jade-300"
              >
                Terminar capítulo
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </main>

        {/* Output */}
        <section className="flex min-h-[220px] flex-col border-t-2 border-ink-600 bg-ink-900 lg:min-h-0 lg:w-[28%] lg:border-l-2 lg:border-t-0">
          <div className="flex items-center gap-2 border-b-2 border-ink-600 bg-ink-800 px-4 py-1.5">
            <TerminalIcon className="h-3.5 w-3.5 text-slate2-400" />
            <span className="font-mono text-xs text-slate2-400">Resultado</span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 font-mono text-sm">
            {runState === 'idle' && (
              <p className="text-slate2-500">Tu resultado va a aparecer acá cuando toques Ejecutar o Verificar.</p>
            )}
            {runState === 'running' && (
              <p className="inline-flex items-center gap-2 text-slate2-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Compilando...
              </p>
            )}
            {runState === 'error' && (
              <div className="space-y-2">
                <p className="inline-flex items-center gap-1.5 font-bold text-ruby-400">
                  <XCircle className="h-4 w-4" />
                  {errorMsg ? 'No se pudo ejecutar' : result?.statusDescription}
                </p>
                <pre className="whitespace-pre-wrap text-ruby-300">
                  {errorMsg || result?.compileOutput || result?.stderr || 'Revisá tu código y probá de nuevo.'}
                </pre>
              </div>
            )}
            {runState === 'ran' && result && (
              <div className="space-y-3">
                <pre className="whitespace-pre-wrap text-slate2-100">{result.stdout || '(sin salida)'}</pre>
                {result.stderr && (
                  <pre className="whitespace-pre-wrap text-ember-400">{result.stderr}</pre>
                )}
                <div className="border-t-2 border-ink-600 pt-3">
                  {result.stdout.trim() === exercise.expectedOutput.trim() ? (
                    <p className="inline-flex items-center gap-1.5 font-bold text-jade-400">
                      <CheckCircle2 className="h-4 w-4" />
                      ¡Coincide con lo esperado!
                    </p>
                  ) : (
                    <div>
                      <p className="inline-flex items-center gap-1.5 font-bold text-ember-400">
                        <XCircle className="h-4 w-4" />
                        Todavía no es lo esperado
                      </p>
                      <p className="mt-1 text-xs text-slate2-400">
                        Esperado: <span className="text-slate2-200">{exercise.expectedOutput}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
