import { useState } from 'react';
import { ArrowLeft, Layers, Lock, Unlock } from 'lucide-react';
import { phaCourses } from '@/data/courses';
import { phaModules } from '@/data/modules';
import { getLesson } from '@/data/lessons';
import { useAllProgress } from '@/hooks/useAllProgress';
import CourseCard from './CourseCard';

export default function PhaView({
  onPlay,
  onReview,
  onBack,
}: {
  onPlay?: (lessonId: string) => void;
  onReview?: (lessonId: string) => void;
  onBack: () => void;
}) {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const { byLesson } = useAllProgress();

  const selectedModule = phaModules.find((m) => m.id === selectedModuleId) ?? null;

  // Vista de detalle: cursos dentro del módulo seleccionado.
  if (selectedModule) {
    const moduleCourses = phaCourses.filter((c) => selectedModule.courseIds.includes(c.id));

    return (
      <section className="relative min-h-screen border-b-2 border-ink-600 bg-ink-900">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <button
            onClick={() => setSelectedModuleId(null)}
            className="mb-8 inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a PHA
          </button>

          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800 px-3 py-1.5">
              <Layers className="h-4 w-4 text-gold-300" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                PHA — Problemas de Historia Argentina
              </span>
            </div>
            <h2 className="font-pixel text-xl leading-tight text-gold-300 text-shadow-pixel sm:text-2xl md:text-3xl">
              {selectedModule.title.toUpperCase()}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate2-300">
              {selectedModule.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {moduleCourses.map((course) => {
              const saved = course.lessonId ? byLesson[course.lessonId] : undefined;
              const totalSteps = course.lessonId ? getLesson(course.lessonId)?.steps.length : undefined;
              const progressPct =
                saved && totalSteps
                  ? saved.is_finished
                    ? 100
                    : ((saved.completed_steps?.length ?? 0) / totalSteps) * 100
                  : 0;
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  progressPct={progressPct}
                  isFinished={!!saved?.is_finished}
                  onPlay={onPlay}
                  onReview={onReview}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Vista principal: Módulo 1 / 2 / 3.
  return (
    <section className="relative min-h-screen border-b-2 border-ink-600 bg-ink-900">
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al catálogo
        </button>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800 px-3 py-1.5">
            <Layers className="h-4 w-4 text-gold-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
              Módulo de estudio
            </span>
          </div>
          <h2 className="font-pixel text-xl leading-tight text-gold-300 text-shadow-pixel sm:text-2xl md:text-3xl">
            PHA — <span className="text-ember-400">PROBLEMAS DE HISTORIA ARGENTINA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate2-300">
            Elegí un módulo para empezar a jugar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phaModules.map((mod) => {
            const locked = mod.status === 'locked';
            const StatusIcon = locked ? Lock : Unlock;
            return (
              <button
                key={mod.id}
                disabled={locked}
                onClick={() => !locked && setSelectedModuleId(mod.id)}
                className={`group relative flex flex-col border-2 bg-ink-800 p-5 text-left shadow-pixel transition-all duration-200 ${
                  locked
                    ? 'cursor-not-allowed border-ink-600 opacity-70'
                    : 'border-gold-400 hover:-translate-y-1 hover:border-gold-300 hover:shadow-pixel-gold'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`grid h-14 w-14 place-items-center border-2 transition-transform group-hover:scale-110 ${
                      locked ? 'border-ink-500 bg-ink-700' : 'border-gold-400 bg-gold-400/10'
                    }`}
                  >
                    <Layers className={`h-7 w-7 ${locked ? 'text-slate2-400' : 'text-gold-300'}`} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 border-2 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest ${
                      locked
                        ? 'border-ink-500 bg-ink-700 text-slate2-400'
                        : 'border-gold-400/40 bg-gold-400/15 text-gold-200'
                    }`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {locked ? 'BLOQUEADO' : 'DESBLOQUEADO'}
                  </span>
                </div>

                <h3
                  className={`font-pixel text-sm leading-tight text-shadow-pixel ${
                    locked ? 'text-slate2-400' : 'text-gold-300'
                  }`}
                >
                  {mod.title}
                </h3>

                <p className="mt-3 flex-1 font-terminal text-lg leading-snug text-slate2-300">
                  {mod.description}
                </p>

                {!locked && (
                  <p className="mt-4 border-t-2 border-ink-600 pt-4 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
                    {mod.courseIds.length} eras
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
