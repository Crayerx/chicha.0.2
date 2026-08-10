import { useState } from 'react';
import { ArrowLeft, Code2, ChevronDown, Lock, Play, CheckCircle2, RotateCcw, Trophy, Star, User, BookOpen } from 'lucide-react';
import { csharpChapters, csharpTotals } from '@/data/csharpChapters';
import { useAllProgress } from '@/hooks/useAllProgress';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function CSharpView({
  onOpenExercise,
  onOpenIntro,
  onBack,
}: {
  onOpenExercise: (chapterId: string, exerciseNumber: number) => void;
  onOpenIntro: (chapterId: string) => void;
  onBack: () => void;
}) {
  const { isAuthenticated } = useAuth();
  const { username } = useProfile();
  const { byLesson } = useAllProgress();
  const [openChapterId, setOpenChapterId] = useState<string | null>(csharpChapters[0]?.id ?? null);

  const totalDone = csharpChapters.reduce(
    (sum, c) => sum + (byLesson[c.id]?.completed_steps?.length ?? 0),
    0,
  );
  const totalXp = csharpChapters.reduce((sum, c) => sum + (byLesson[c.id]?.total_xp ?? 0), 0);

  return (
    <section className="relative min-h-screen border-b-2 border-ink-600 bg-ink-900">
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al catálogo
        </button>

        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center border-2 border-ruby-400 bg-ruby-400/10">
            <Code2 className="h-7 w-7 text-ruby-300" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">Programación</p>
            <h2 className="font-pixel text-lg leading-tight text-gold-300 text-shadow-pixel sm:text-xl md:text-2xl">
              CONCEPTOS DE <span className="text-ruby-400">C#</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Chapters accordion */}
          <div className="space-y-3">
            {csharpChapters.map((chapter) => {
              const locked = chapter.status === 'locked';
              const saved = byLesson[chapter.id];
              const completedCount = saved?.completed_steps?.length ?? 0;
              const isOpen = openChapterId === chapter.id;

              return (
                <div key={chapter.id} className="border-2 border-ink-600 bg-ink-800">
                  <button
                    onClick={() => !locked && setOpenChapterId(isOpen ? null : chapter.id)}
                    disabled={locked}
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left ${locked ? 'cursor-not-allowed opacity-60' : 'hover:bg-ink-700'}`}
                  >
                    <div
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 font-mono text-sm font-bold ${
                        locked ? 'border-ink-500 text-slate2-500' : 'border-gold-400 text-gold-300'
                      }`}
                    >
                      {locked ? <Lock className="h-4 w-4" /> : chapter.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-pixel text-sm leading-tight ${locked ? 'text-slate2-400' : 'text-gold-200'}`}>
                        {chapter.title}
                      </h3>
                      <p className="mt-1.5 font-terminal text-lg leading-snug text-slate2-400">
                        {chapter.description}
                      </p>
                    </div>
                    {!locked && chapter.exercises.length > 0 && (
                      <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-widest text-slate2-500 sm:inline">
                        {completedCount}/{chapter.exercises.length}
                      </span>
                    )}
                    {!locked && (
                      <ChevronDown className={`h-4 w-4 shrink-0 text-slate2-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {isOpen && !locked && (
                    <div className="border-t-2 border-ink-600 px-5 py-3">
                      {chapter.exercises.length === 0 ? (
                        <p className="py-3 font-mono text-xs uppercase tracking-widest text-slate2-500">
                          Todavía no hay ejercicios acá.
                        </p>
                      ) : (
                        <ul className="divide-y divide-ink-600">
                          {chapter.intro && (
                            <li className="flex items-center gap-4 py-2.5">
                              <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-slate2-500">
                                Lectura
                              </span>
                              <span className="flex-1 font-terminal text-lg text-slate2-200">
                                Introducción: {chapter.intro.title}
                              </span>
                              <button
                                onClick={() => onOpenIntro(chapter.id)}
                                className="inline-flex items-center gap-1.5 border-2 border-jade-400 bg-jade-400/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-jade-300 hover:bg-jade-400/20"
                              >
                                <BookOpen className="h-3 w-3" />
                                Leer
                              </button>
                            </li>
                          )}
                          {chapter.exercises.map((ex) => {
                            const done = saved?.completed_steps?.includes(ex.number) ?? false;
                            const unlockedExercise = ex.number === 1 || (saved?.completed_steps?.includes(ex.number - 1) ?? false) || done;
                            return (
                              <li key={ex.id} className="flex items-center gap-4 py-2.5">
                                <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-slate2-500">
                                  Ejercicio {ex.number}
                                </span>
                                <span className={`flex-1 font-terminal text-lg ${done ? 'text-jade-400' : 'text-slate2-200'}`}>
                                  {ex.title}
                                </span>
                                <button
                                  onClick={() => unlockedExercise && onOpenExercise(chapter.id, ex.number)}
                                  disabled={!unlockedExercise}
                                  className={`inline-flex items-center gap-1.5 border-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest ${
                                    done
                                      ? 'border-jade-400 bg-jade-400/10 text-jade-300 hover:bg-jade-400/20'
                                      : unlockedExercise
                                        ? 'border-gold-400 bg-gold-400 text-ink-900 hover:bg-gold-300'
                                        : 'cursor-not-allowed border-ink-500 bg-ink-700 text-slate2-500'
                                  }`}
                                >
                                  {done ? (
                                    <>
                                      <RotateCcw className="h-3 w-3" />
                                      Repasar
                                    </>
                                  ) : unlockedExercise ? (
                                    <>
                                      <Play className="h-3 w-3 fill-current" />
                                      Empezar
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="h-3 w-3" />
                                      Bloqueado
                                    </>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="border-2 border-ink-600 bg-ink-800 p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center border-2 border-gold-400 bg-gold-400/10">
                  <User className="h-4 w-4 text-gold-300" />
                </div>
                <span className="truncate font-mono text-xs font-bold uppercase tracking-widest text-slate2-200">
                  {isAuthenticated ? (username ?? 'Vos') : 'Invitado'}
                </span>
              </div>
              {!isAuthenticated && (
                <p className="mt-3 font-terminal text-base leading-snug text-ember-400">
                  Iniciá sesión para guardar tu progreso.
                </p>
              )}
            </div>

            <div className="border-2 border-ink-600 bg-ink-800 p-4">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                Progreso del curso
              </p>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate2-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-jade-400" />
                      Ejercicios
                    </span>
                    <span>{totalDone}/{csharpTotals.exercises}</span>
                  </div>
                  <div className="h-2 w-full border border-ink-500 bg-ink-700">
                    <div
                      className="h-full bg-jade-400 opacity-80"
                      style={{ width: `${csharpTotals.exercises ? (totalDone / csharpTotals.exercises) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate2-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-3 w-3 text-gold-300" />
                    XP ganado
                  </span>
                  <span className="text-gold-200">{totalXp}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-ink-600 bg-ink-800 p-4">
              <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                <Trophy className="h-3.5 w-3.5" />
                Capítulos
              </p>
              <p className="font-terminal text-lg leading-snug text-slate2-400">
                {csharpChapters.filter((c) => c.status === 'unlocked').length} de {csharpChapters.length} desbloqueados —
                se van abriendo a medida que terminás el anterior.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
