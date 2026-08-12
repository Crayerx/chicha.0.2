import { Clock, BookOpen, ArrowRight, Play, RotateCcw, Layers } from 'lucide-react';
import type { Course } from '@/data/courses';
import { statusLabel, statusIcon } from '@/data/courses';

const accentMap = {
  gold: {
    border: 'border-gold-400',
    text: 'text-gold-300',
    badgeBg: 'bg-gold-400/15',
    badgeText: 'text-gold-200',
    badgeBorder: 'border-gold-400/40',
    iconBg: 'bg-gold-400/10',
    hoverBorder: 'hover:border-gold-300',
    hoverShadow: 'hover:shadow-pixel-gold',
    cta: 'text-gold-200',
    bar: 'bg-gold-400',
  },
  ember: {
    border: 'border-ember-400',
    text: 'text-ember-300',
    badgeBg: 'bg-ember-400/15',
    badgeText: 'text-ember-300',
    badgeBorder: 'border-ember-400/40',
    iconBg: 'bg-ember-400/10',
    hoverBorder: 'hover:border-ember-300',
    hoverShadow: 'hover:shadow-[4px_4px_0_0_#b8430e]',
    cta: 'text-ember-300',
    bar: 'bg-ember-400',
  },
  jade: {
    border: 'border-jade-400',
    text: 'text-jade-300',
    badgeBg: 'bg-jade-400/15',
    badgeText: 'text-jade-300',
    badgeBorder: 'border-jade-400/40',
    iconBg: 'bg-jade-400/10',
    hoverBorder: 'hover:border-jade-300',
    hoverShadow: 'hover:shadow-[4px_4px_0_0_#16a06b]',
    cta: 'text-jade-300',
    bar: 'bg-jade-400',
  },
  ruby: {
    border: 'border-ruby-400',
    text: 'text-ruby-300',
    badgeBg: 'bg-ruby-400/15',
    badgeText: 'text-ruby-300',
    badgeBorder: 'border-ruby-400/40',
    iconBg: 'bg-ruby-400/10',
    hoverBorder: 'hover:border-ruby-300',
    hoverShadow: 'hover:shadow-[4px_4px_0_0_#c92d44]',
    cta: 'text-ruby-300',
    bar: 'bg-ruby-400',
  },
} as const;

export default function CourseCard({
  course,
  progressPct = 0,
  isFinished = false,
  onPlay,
  onReview,
  onOpenGroup,
}: {
  course: Course;
  /** Real progress (0-100), computed from saved lesson progress. Defaults to 0. */
  progressPct?: number;
  /** Si ya se completó la era — cambia el CTA a "Repasar" en vez de "Jugar". */
  isFinished?: boolean;
  onPlay?: (lessonId: string) => void;
  onReview?: (lessonId: string) => void;
  /** Para tarjetas con `isModuleGroup`: abre la vista de módulos en vez de una lección. */
  onOpenGroup?: (courseId: string) => void;
}) {
  const a = accentMap[course.accent];
  const StatusIcon = statusIcon[course.status];
  const Icon = course.icon;
  const locked = course.status === 'locked';
  const pct = locked ? 0 : Math.max(0, Math.min(100, Math.round(progressPct)));

  return (
    <article
      className={`group relative flex flex-col border-2 ${a.border} bg-ink-800 p-5 shadow-pixel transition-all duration-200 ${a.hoverBorder} ${a.hoverShadow} hover:-translate-y-1 card-shine ${
        locked ? 'opacity-90' : ''
      }`}
    >
      {/* Top row: icon + status */}
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`grid h-14 w-14 place-items-center border-2 ${a.border} ${a.iconBg} transition-transform group-hover:scale-110`}
        >
          <Icon className={`h-7 w-7 ${a.text}`} />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 border-2 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest ${
            locked
              ? 'border-ink-500 bg-ink-700 text-slate2-400'
              : `${a.badgeBorder} ${a.badgeBg} ${a.badgeText}`
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {statusLabel[course.status]}
        </span>
      </div>

      {/* Category badge */}
      <span className="mb-2 inline-block w-fit border-2 border-ink-500 bg-ink-700 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate2-300">
        {course.category}
      </span>

      {/* Title */}
      <h3 className={`font-pixel text-sm leading-tight ${a.text} text-shadow-pixel`}>
        {course.title}
      </h3>

      {/* Era */}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
        {course.era}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 font-terminal text-lg leading-snug text-slate2-300">
        {course.description}
      </p>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-slate2-400">
          <span>Progreso</span>
          <span className={locked ? 'text-slate2-500' : a.text}>{pct}%</span>
        </div>
        <div className="h-2 w-full border border-ink-500 bg-ink-700">
          <div
            className={`h-full ${locked ? 'bg-ink-500' : a.bar} opacity-80 transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-center gap-4 border-t-2 border-ink-600 pt-4 font-mono text-[10px] uppercase tracking-widest text-slate2-400">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gold-400" />
          {course.hours}h
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-gold-400" />
          {course.lessons} pasos
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={locked}
        onClick={() => {
          if (locked) return;
          if (course.isModuleGroup) {
            onOpenGroup?.(course.id);
            return;
          }
          if (!course.lessonId) return;
          if (isFinished) onReview?.(course.lessonId);
          else onPlay?.(course.lessonId);
        }}
        className={`mt-4 flex items-center justify-center gap-2 border-2 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
          locked
            ? 'cursor-not-allowed border-ink-500 bg-ink-700 text-slate2-500'
            : `${a.border} bg-ink-700 ${a.cta} hover:bg-ink-600`
        }`}
      >
        {locked
          ? 'Bloqueado'
          : course.isModuleGroup
            ? 'Ver módulos'
            : isFinished
              ? 'Repasar'
              : course.lessonId
                ? 'Jugar'
                : 'Comenzar'}
        {!locked &&
          (course.isModuleGroup ? (
            <Layers className="h-3.5 w-3.5" />
          ) : isFinished ? (
            <RotateCcw className="h-3.5 w-3.5" />
          ) : course.lessonId ? (
            <Play className="h-3.5 w-3.5 fill-current" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          ))}
      </button>
    </article>
  );
}
