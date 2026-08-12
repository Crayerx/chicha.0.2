import { useState } from 'react';
import { ArrowLeft, Layers, Lock, Unlock, Brain, BookOpen, Map, PenTool, ScrollText, Lightbulb, DeckCards, TestTube, GraduationCap, CheckSquare, BarChart3 } from 'lucide-react';
import { culturaCoursesModulo1 } from '@/data/courses';
import { culturaModules } from '@/data/modules';
import { getLesson } from '@/data/lessons';
import { useAllProgress } from '@/hooks/useAllProgress';
import CourseCard from './CourseCard';
import culturaHackHtml from '@/assets/cultura-hack.html?raw';

/**
 * Submódulo 1 de Prácticas Culturales: la app "Cultura Hack" original del
 * usuario (Aprender, Misiones, Actividades, Guías, Conceptos, Cartas, Quiz,
 * Examen, Checklist y Progreso), embebida tal cual en un iframe.
 *
 * No pasa por el motor de lecciones (lore+quiz) de PHA/C# porque esta app
 * tiene su propia lógica, su propio sistema de XP y guarda el progreso en
 * el localStorage del iframe (`culturaHackFullV1`), igual que en el
 * archivo .html original.
 */
function CulturaHackEmbedded() {
  return (
    <iframe
      title="Cultura Hack — Fascículo 1"
      srcDoc={culturaHackHtml}
      className="h-full w-full border-0 bg-white"
      sandbox="allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-same-origin"
    />
  );
}

export default function CulturaView({
  onPlay,
  onReview,
  onBack,
}: {
  onPlay?: (lessonId: string) => void;
  onReview?: (lessonId: string) => void;
  onBack: () => void;
}) {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [showCulturaHack, setShowCulturaHack] = useState(false);
  const { byLesson } = useAllProgress();

  const selectedModule = culturaModules.find((m) => m.id === selectedModuleId) ?? null;

  // Vista de Cultura Hack embebido dentro del módulo seleccionado.
  if (showCulturaHack && selectedModule) {
    return (
      <section className="relative min-h-screen border-b-2 border-ink-600 bg-ink-900">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <button
            onClick={() => setShowCulturaHack(false)}
            className="mb-6 inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Prácticas Culturales — Módulo 1
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center border-2 border-gold-400 bg-gold-400/10">
              <Brain className="h-7 w-7 text-gold-300" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">Fascículo 1</p>
              <h2 className="font-pixel text-lg leading-tight text-gold-300 text-shadow-pixel sm:text-xl md:text-2xl">
                CULTURA HACK — <span className="text-gold-400">Eje Temático Cultura</span>
              </h2>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border-2 border-ink-600 bg-ink-800 shadow-pixel">
            <div className="h-[calc(100vh-280px)] min-h-[600px] w-full bg-white">
              <CulturaHackEmbedded />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Vista de detalle: cursos dentro del módulo seleccionado.
  if (selectedModule) {
    const allModuleCourses = [...culturaCoursesModulo1];
    const moduleCourses = allModuleCourses.filter((c) => selectedModule.courseIds.includes(c.id));

    return (
      <section className="relative min-h-screen border-b-2 border-ink-600 bg-ink-900">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <button
            onClick={() => setSelectedModuleId(null)}
            className="mb-8 inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Prácticas Culturales
          </button>

          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800 px-3 py-1.5">
              <Layers className="h-4 w-4 text-gold-300" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                Prácticas Culturales
              </span>
            </div>
            <h2 className="font-pixel text-xl leading-tight text-gold-300 text-shadow-pixel sm:text-2xl md:text-3xl">
              {selectedModule.title.toUpperCase()}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate2-300">
              {selectedModule.description}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Lista de cursos/actividades del módulo */}
            <div className="space-y-4">
              {moduleCourses.map((course) => {
                const saved = course.lessonId ? byLesson[course.lessonId] : undefined;
                const totalSteps = course.lessonId ? getLesson(course.lessonId)?.steps.length : undefined;
                const progressPct =
                  saved && totalSteps
                    ? saved.is_finished
                      ? 100
                      : ((saved.completed_steps?.length ?? 0) / totalSteps) * 100
                    : 0;
                
                // Para Cultura Hack, mostramos una tarjeta especial que abre el iframe embebido
                if (course.id === 'culturahack') {
                  return (
                    <div key={course.id} className="border-2 border-gold-400 bg-ink-800 p-5 shadow-pixel">
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-gold-400 bg-gold-400/10">
                          <Brain className="h-6 w-6 text-gold-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-pixel text-sm leading-tight text-gold-200">
                            {course.title}
                          </h3>
                          <p className="mt-2 font-terminal text-lg leading-snug text-slate2-300">
                            {course.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => setShowCulturaHack(true)}
                              className="inline-flex items-center gap-1.5 border-2 border-gold-400 bg-gold-400 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 hover:bg-gold-300"
                            >
                              <BookOpen className="h-3 w-3" />
                              Abrir Cultura Hack
                            </button>
                            <span className="inline-flex items-center gap-1.5 border-2 border-ink-500 bg-ink-700 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-slate2-400">
                              <BarChart3 className="h-3 w-3" />
                              Sistema completo de XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // Para otros cursos (si los hubiera), usamos CourseCard
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

            {/* Sidebar informativo */}
            <aside className="space-y-4">
              <div className="border-2 border-ink-600 bg-ink-800 p-4">
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                  Contenido del módulo
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Aprender: todo el contenido del fascículo</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <Map className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Misiones: actividades guiadas</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <PenTool className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Actividades: ejercicios prácticos</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <ScrollText className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Guías: preguntas para responder</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Conceptos: definiciones clave</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <DeckCards className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Cartas: repaso con flashcards</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <TestTube className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Quiz: práctica de autoevaluación</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Examen: evaluación final</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Checklist: control de avance</span>
                  </li>
                  <li className="flex items-start gap-2 font-terminal text-base text-slate2-300">
                    <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <span>Progreso: seguimiento de XP</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-ink-600 bg-ink-800 p-4">
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                  Sobre este módulo
                </p>
                <p className="font-terminal text-lg leading-snug text-slate2-400">
                  Cultura Hack es un sistema completo para estudiar el Fascículo 1 de Prácticas Culturales. 
                  Tiene su propio sistema de XP y guardado de progreso.
                </p>
              </div>
            </aside>
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
            <span className="text-ember-400">PRÁCTICAS CULTURALES</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate2-300">
            Elegí un módulo para empezar a jugar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {culturaModules.map((mod) => {
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
                    {mod.courseIds.length} lecciones
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
