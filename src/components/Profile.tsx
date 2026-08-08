import { ArrowLeft, Flame, Sparkles, Trophy, Star, Award, LogOut, LogIn, Snowflake, Lock, RotateCcw, Target } from 'lucide-react';
import { courses } from '@/data/courses';
import { getLesson } from '@/data/lessons';
import { useAllProgress } from '@/hooks/useAllProgress';
import { useUserStats } from '@/hooks/useUserStats';
import { useAchievements } from '@/hooks/useAchievements';
import { useAuth } from '@/contexts/AuthContext';
import DailyGoalBar from './DailyGoalBar';
import Leaderboard from './Leaderboard';
import UsernameEditor from './UsernameEditor';

/** Opciones de meta diaria: minutos aproximados de estudio -> XP objetivo. */
const DAILY_GOAL_OPTIONS = [
  { minutes: 10, xp: 80 },
  { minutes: 20, xp: 160 },
  { minutes: 30, xp: 240 },
];

export default function Profile({
  onBack,
  onReview,
}: {
  onBack: () => void;
  onReview?: (lessonId: string) => void;
}) {
  const { user, isAuthenticated, signOut } = useAuth();
  const { byLesson, loaded: progressLoaded } = useAllProgress();
  const { stats, xpToday, loaded: statsLoaded, setDailyGoal } = useUserStats();
  const { achievements, unlockedCount, totalCount, loaded: achievementsLoaded } = useAchievements();

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

  const loading = !progressLoaded || !statsLoaded || !achievementsLoaded;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink-900 text-slate2-300">
        <div className="grid min-h-screen place-items-center px-4">
          <div className="max-w-sm border-4 border-gold-400 bg-ink-800 p-6 text-center shadow-pixel-xl">
            <p className="font-terminal text-lg text-slate2-300">
              Necesitás iniciar sesión para ver tu perfil.
            </p>
            <button
              onClick={onBack}
              className="mt-5 flex w-full items-center justify-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-pixel-gold"
            >
              <LogIn className="h-4 w-4" />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="ml-auto flex items-center gap-3">
            {user?.email && (
              <span className="hidden max-w-[180px] truncate font-mono text-[10px] uppercase tracking-widest text-slate2-500 sm:inline">
                {user.email}
              </span>
            )}
            <button
              onClick={() => signOut()}
              className="flex shrink-0 items-center gap-1.5 border-2 border-ink-500 bg-ink-800 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-ruby-400 hover:text-ruby-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
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
              <div className="mt-2 flex items-center gap-3 border-2 border-jade-400/30 bg-jade-400/5 px-4 py-2.5">
                <Snowflake className="h-4 w-4 shrink-0 text-jade-300" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
                  Streak freeze:{' '}
                  <span className={stats.freeze_available ? 'text-jade-300' : 'text-slate2-500'}>
                    {stats.freeze_available ? 'disponible esta semana' : 'usado esta semana'}
                  </span>{' '}
                  — perdona un día salteado sin cortar la racha
                </p>
              </div>

              {/* Objetivo diario */}
              <div className="mt-4 border-2 border-gold-400/40 bg-ink-800/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-pixel text-xs text-gold-300 text-shadow-pixel">
                    <Target className="h-3.5 w-3.5" />
                    OBJETIVO DIARIO
                  </h2>
                  <div className="flex gap-1.5">
                    {DAILY_GOAL_OPTIONS.map((opt) => (
                      <button
                        key={opt.minutes}
                        onClick={() => setDailyGoal(opt.xp)}
                        className={`border-2 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                          stats.daily_goal_xp === opt.xp
                            ? 'border-gold-400 bg-gold-400 text-ink-900'
                            : 'border-ink-500 bg-ink-700 text-slate2-300 hover:border-gold-400/60 hover:text-gold-200'
                        }`}
                      >
                        {opt.minutes} min
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <DailyGoalBar xpToday={xpToday} goalXp={stats.daily_goal_xp} compact />
                </div>
              </div>

              <UsernameEditor />

              {/* Liga semanal */}
              <Leaderboard />

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

              {/* Achievements */}
              <section className="mt-10">
                <h2 className="mb-4 flex items-center justify-between font-pixel text-sm text-gold-300 text-shadow-pixel">
                  <span className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    LOGROS
                  </span>
                  <span className="font-mono text-[10px] text-slate2-400">
                    {unlockedCount} / {totalCount}
                  </span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`flex items-start gap-3 border-2 p-3.5 transition-all ${
                        ach.unlocked
                          ? 'border-gold-300 bg-gradient-to-b from-gold-400/10 to-ink-900 shadow-pixel-gold'
                          : 'border-ink-600 bg-ink-800/40 opacity-60'
                      }`}
                    >
                      <div
                        className={`grid h-10 w-10 shrink-0 place-items-center border-2 ${
                          ach.unlocked ? 'border-gold-300 bg-ink-900' : 'border-ink-500 bg-ink-800'
                        }`}
                      >
                        {ach.unlocked ? (
                          <ach.icon className="h-5 w-5 text-gold-300" />
                        ) : (
                          <Lock className="h-4 w-4 text-slate2-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4
                          className={`font-pixel text-[10px] leading-tight ${
                            ach.unlocked ? 'text-gold-200' : 'text-slate2-400'
                          }`}
                        >
                          {ach.title}
                        </h4>
                        <p className="mt-1.5 font-terminal text-sm leading-snug text-slate2-400">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                        {saved?.is_finished && course.lessonId && onReview && (
                          <button
                            onClick={() => onReview(course.lessonId!)}
                            className="mt-3 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-jade-300 transition-colors hover:text-jade-200"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Repasar contenido
                          </button>
                        )}
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
