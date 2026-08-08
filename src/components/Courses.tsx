import { courses, catalogStats } from '@/data/courses';
import { getLesson } from '@/data/lessons';
import { useAllProgress } from '@/hooks/useAllProgress';
import CourseCard from './CourseCard';
import { Library } from 'lucide-react';

export default function Courses({
  onPlay,
  onReview,
  onOpenGroup,
}: {
  onPlay?: (lessonId: string) => void;
  onReview?: (lessonId: string) => void;
  onOpenGroup?: (courseId: string) => void;
}) {
  const { byLesson } = useAllProgress();

  return (
    <section id="cursos" className="relative border-b-2 border-ink-600 bg-ink-900">
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800 px-3 py-1.5">
            <Library className="h-4 w-4 text-gold-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
              Catálogo de Eras
            </span>
          </div>
          <h2 className="font-pixel text-xl leading-tight text-gold-300 text-shadow-pixel sm:text-2xl md:text-3xl">
            ELIGE TU <span className="text-ember-400">ERA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate2-300">
            {catalogStats.totalEras} eras te esperan — {catalogStats.unlockedEras} listas para
            jugar ahora, {catalogStats.lockedEras} por desbloquear. Cada curso combina narrativa,
            decisiones de impacto y mapas interactivos para que aprendas historia como nunca antes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {courses.map((course) => {
            const saved = course.lessonId ? byLesson[course.lessonId] : undefined;
            const totalSteps = course.lessonId ? getLesson(course.lessonId)?.steps.length : undefined;
            const progressPct =
              saved && totalSteps
                ? (saved.is_finished ? 100 : (saved.completed_steps?.length ?? 0) / totalSteps * 100)
                : 0;
            return (
              <CourseCard
                key={course.id}
                course={course}
                progressPct={progressPct}
                isFinished={!!saved?.is_finished}
                onPlay={onPlay}
                onReview={onReview}
                onOpenGroup={onOpenGroup}
              />
            );
          })}
        </div>

        {/* Hint */}
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-slate2-400">
          Completa una era para <span className="text-gold-300">desbloquear</span> la siguiente
        </p>
      </div>
    </section>
  );
}
