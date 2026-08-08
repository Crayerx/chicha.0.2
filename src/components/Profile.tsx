import { ArrowLeft, Flame, Sparkles, Trophy, Star, Award } from 'lucide-react';
import { courses } from '@/data/courses';
import { getLesson } from '@/data/lessons';
import { useAllProgress } from '@/hooks/useAllProgress';
import { useUserStats } from '@/hooks/useUserStats';

export default function Profile({ onBack }: { onBack: () => void }) {
  const { byLesson, loaded: progressLoaded } = useAllProgress();
  const { stats, loaded: statsLoaded } = useUserStats();

  const trackedCourses = courses.filter((c) => c.lessonId);

  const totalXp = trackedCourses.reduce((sum, c) => {
    const saved = c.lessonId ? byLesson[c.lessonId] : undefined;
    return sum + (saved?.total_xp ?? 0);
  }, 0);

  const maxTotalXp = trackedCourses.reduce((sum, c) => {
    const lesson = c.lessonId ? getLesson(c.lessonId) : undefined;
    return sum + (lesson?.totalXp ?? 0);
  }, 0);

  const collectedArtifacts = trackedCourses
    .map((c) => {
      const saved = c.lessonId ? byLesson[c.lessonId] : undefined;
      const lesson = c.lessonId ? getLesson(c.lessonId) : undefined;
      if (!saved?.is_finished || !lesson) return null;
      return { course: c, artifact: lesson.artifact };
    })
    .filter((x): x is { course: (typeof courses)[number]; artifact: NonNullable<ReturnType<typeof getLesson>>['artifact'] } => x !== null);

  const loading = !progressLoaded || !statsLoaded;

  return (
    <div className="min-h-screen bg-ink-900 text-slate2-300">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b-2 border-ink-600 bg-ink-900/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex shrink-0 items-center gap-1.5 border-2 border-ink-500 bg-ink-800 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-gold-400 hover:bg-ink-700 hover:text-gold-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Menú</span>
          </button>
          <h1 className="font-pixel text-sm text-gold-300 text-shadow-pixel sm:text-base">
            MI PERFIL
          </h1>
        </div>
      </div>

      <main className="relative">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {loading ? (
            <div className="grid place-items-center py-24">
              <div className="h-10 w-10 animate-spin border-4 border-gold-400 border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Top stats grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  icon={Sparkles}
                  color="gold"
                  label="XP TOTAL"
                  value={`${totalXp}`}
                  sub={maxTotalXp > 0 ? `de ${maxTotalXp} posibles` : undefined}
                />
                <StatCard
                  icon={Flame}
                  color="ember"
                  label="RACHA ACTUAL"
                  value={`${stats.current_streak} ${stats.current_streak === 1 ? 'día' : 'días'}`}
                  sub={stats.longest_streak > 0 ? `récord: ${stats.longest_streak} días` : undefined}
                />
                <StatCard
                  icon={Trophy}
                  color="jade"
                  label="ARTEFACTOS"
                  value={`${collectedArtifacts.length} / ${trackedCourses.length}`}
                  sub="coleccionados"
                />
              </div>

              {/* Streak explainer / encouragement */}
              <div className="mt-4 flex items-center gap-3 border-2 border-ember-400/40 bg-ember-400/5 px-4 py-3">
                <Flame className="h-5 w-5 shrink-0 text-ember-400" />
                <p className="font-terminal text-lg leading-snug text-slate2-300">
                  {stats.current_streak > 0
                    ? `Llevás ${stats.current_streak} ${stats.current_streak === 1 ? 'día seguido' : 'días seguidos'} completando pasos. ¡No la cortes hoy!`
                    : 'Completá un paso de cualquier lección hoy para empezar tu racha.'}
                </p>
              </div>

              {/* Artifacts collection */}
              <section className="mt-10">
                <h2 className="mb-4 flex items-center gap-2 font-pixel text-sm text-gold-300 text-shadow-pixel">
                  <Award className="h-4 w-4" />
                  COLECCIÓN DE ARTEFACTOS
                </h2>

                {collectedArtifacts.length === 0 ? (
                  <div className="border-2 border-dashed border-ink-500 bg-ink-800/40 p-8 text-center">
                    <p className="font-terminal text-lg text-slate2-400">
                      Todavía no completaste ninguna era. Terminá una lección para desbloquear tu
                      primer artefacto.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {collectedArtifacts.map(({ course, artifact }) => (
                      <div
                        key={course.id}
                        className="border-4 border-gold-300 bg-gradient-to-b from-gold-400/10 to-ink-900 p-4 shadow-pixel-gold"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-14 w-14 shrink-0 place-items-center border-2 border-gold-300 bg-ink-900">
                            <artifact.icon className="h-7 w-7 text-gold-300" />
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="inline-flex items-center gap-1 border-2 border-gold-300 bg-gold-400/15 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-gold-200">
                              <Star className="h-2.5 w-2.5 fill-gold-300 text-gold-300" />
                              {artifact.rarity}
                            </span>
                            <h4 className="mt-1.5 truncate font-pixel text-xs text-gold-200">
                              {artifact.name}
                            </h4>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate2-400">
                              {artifact.era}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 font-terminal text-base leading-snug text-slate2-300">
                          {artifact.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Per-course XP breakdown */}
              <section className="mt-10">
                <h2 className="mb-4 font-pixel text-sm text-gold-300 text-shadow-pixel">
                  PROGRESO POR ERA
                </h2>
                <div className="space-y-3">
                  {trackedCourses.map((course) => {
                    const saved = course.lessonId ? byLesson[course.lessonId] : undefined;
                    const lesson = course.lessonId ? getLesson(course.lessonId) : undefined;
                    const totalSteps = lesson?.steps.length ?? 0;
                    const done = saved?.completed_steps?.length ?? 0;
                    const pct = totalSteps > 0 ? Math.round((done / totalSteps) * 100) : 0;
                    return (
                      <div key={course.id} className="border-2 border-ink-600 bg-ink-800/50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate2-200">
                            {course.title}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
                            {saved?.total_xp ?? 0} XP · {pct}%
                          </span>
                        </div>
                        <div className="h-2 w-full border border-ink-500 bg-ink-700">
                          <div
                            className="h-full bg-gold-400 opacity-80 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const colorMap = {
  gold: { border: 'border-gold-400', bg: 'bg-gold-400/10', text: 'text-gold-300' },
  ember: { border: 'border-ember-400', bg: 'bg-ember-400/10', text: 'text-ember-300' },
  jade: { border: 'border-jade-400', bg: 'bg-jade-400/10', text: 'text-jade-300' },
} as const;

function StatCard({
  icon: Icon,
  color,
  label,
  value,
  sub,
}: {
  icon: typeof Sparkles;
  color: keyof typeof colorMap;
  label: string;
  value: string;
  sub?: string;
}) {
  const c = colorMap[color];
  return (
    <div className={`border-2 ${c.border} bg-ink-800 p-5 shadow-pixel`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center border-2 ${c.border} ${c.bg}`}>
          <Icon className={`h-6 w-6 ${c.text}`} />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate2-400">
            {label}
          </p>
          <p className={`font-pixel text-lg ${c.text} text-shadow-pixel`}>{value}</p>
        </div>
      </div>
      {sub && (
        <p className="mt-3 border-t-2 border-ink-600 pt-2 font-mono text-[9px] uppercase tracking-widest text-slate2-500">
          {sub}
        </p>
      )}
    </div>
  );
}
