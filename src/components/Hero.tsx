import { Play, Hourglass } from 'lucide-react';
import DragonCompanion from './DragonCompanion';
import { catalogStats } from '@/data/courses';

export default function Hero({ onStart }: { onStart?: () => void }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink-600">
      {/* Background layers mejorados */}
      <div className="absolute inset-0 bg-grid gradient-shimmer" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/80 to-ink-900" />
      <div className="absolute inset-0 gradient-radial-glow opacity-30" />

      {/* Floating pixel decorations mejorados */}
      <div className="pointer-events-none absolute left-[8%] top-[22%] hidden h-3 w-3 animate-float-slow bg-gold-400 opacity-70 lg:block glow-gold" />
      <div className="pointer-events-none absolute right-[12%] top-[30%] hidden h-2 w-2 animate-pulse-glow bg-ember-400 opacity-80 lg:block glow-ember" />
      <div className="pointer-events-none absolute left-[15%] bottom-[20%] hidden h-2 w-2 animate-float-slow bg-jade-400 opacity-70 lg:block glow-jade" style={{ animationDelay: '1.5s' }} />
      <div className="pointer-events-none absolute right-[18%] bottom-[28%] hidden h-3 w-3 animate-pulse-glow bg-ruby-400 opacity-70 lg:block glow-ruby" style={{ animationDelay: '0.8s' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* Left — copy mejorado */}
        <div className="text-center lg:text-left animate-slide-up">
          <div className="mb-5 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800/80 px-3 py-1.5 glass-effect gradient-border-glow">
            <span className="h-2 w-2 animate-blink bg-jade-400 glow-jade" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200 neon-text-gold">
              v1.0 · NOW PLAYING
            </span>
          </div>

          <h1 className="font-pixel text-2xl leading-tight text-gold-300 text-shadow-pixel sm:text-3xl md:text-4xl lg:text-5xl animate-scale-in">
            COMIENZA TU<br />
            <span className="text-gold-200 neon-text-gold">AVENTURA</span><br />
            <span className="text-ember-400 neon-text-ember">POR LA HISTORIA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-terminal text-xl leading-snug text-slate2-300 lg:mx-0 lg:text-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            La forma más interactiva y ludificada de dominar los grandes eventos
            de la humanidad a través de decisiones, mapas y simulación.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onStart}
              className="group relative flex w-full items-center justify-center gap-3 border-2 border-yellow-400 bg-yellow-400 px-8 py-4 font-mono text-base font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(250,204,21,0.8)] transition-all hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[0_0_50px_rgba(250,204,21,1)] sm:w-auto"
            >
              <Play className="h-6 w-6 fill-black" />
              Comenzar Ahora
            </button>
            <a
              href="#cursos"
              className="flex w-full items-center justify-center gap-2 border-2 border-yellow-400 bg-transparent px-6 py-4 font-mono text-base font-bold uppercase tracking-wider text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_40px_rgba(250,204,21,0.9)] sm:w-auto"
            >
              <Hourglass className="h-6 w-6" />
              Ver Cursos
            </a>
          </div>

          {/* Stats mejorados */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-ink-600 pt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { num: `${String(catalogStats.totalEras).padStart(2, '0')}`, label: 'Eras' },
              { num: `${catalogStats.totalLessons}`, label: 'Lecciones' },
              { num: `${catalogStats.totalHours}h`, label: 'Contenido' },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left group hover-lift">
                <div className="font-pixel text-lg text-gold-300 sm:text-xl neon-text-gold transition-all duration-300 group-hover:scale-110">{s.num}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate2-400 sm:text-xs transition-colors group-hover:text-gold-200">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — pixel portal mejorado */}
        <div className="relative mx-auto flex max-w-md items-center justify-center lg:max-w-none animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <PixelPortal />
        </div>
      </div>
    </section>
  );
}

function PixelPortal() {
  return (
    <div className="group relative aspect-square w-full max-w-sm animate-float-slow">
      {/* Outer frame mejorado */}
      <div className="absolute inset-0 border-4 border-gold-500 bg-ink-800 shadow-pixel-xl glow-gold-lg transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(255,204,51,0.8)]" />

      {/* Corner studs mejorados */}
      {[
        'top-1 left-1',
        'top-1 right-1',
        'bottom-1 left-1',
        'bottom-1 right-1',
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} h-3 w-3 border-2 border-gold-300 bg-gold-500 animate-pulse-glow`}
        />
      ))}

      {/* Portal core mejorado */}
      <div className="absolute inset-6 overflow-hidden border-2 border-gold-400 bg-ink-900 gradient-border-glow">
        {/* Concentric pixel rings mejorados */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute h-[85%] w-[85%] border-2 border-gold-400/30 animate-pulse-glow" />
          <div className="absolute h-[65%] w-[65%] border-2 border-gold-300/40 animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
          <div className="absolute h-[45%] w-[45%] border-2 border-ember-400/50 animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
          <div className="absolute h-[28%] w-[28%] border-2 border-gold-200/60 animate-pulse-glow" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Radial glow mejorado */}
        <div
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100 gradient-radial-glow"
        />

        {/* Center hourglass mejorado */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center animate-scale-in">
            <Hourglass className="h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_12px_rgba(255,204,51,0.6)] neon-text-gold" />
            <span className="mt-3 font-pixel text-[10px] text-gold-200 text-shadow-pixel neon-text-gold">
              CHRONOS
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate2-400 animate-blink">
              PORTAL ACTIVO
            </span>
          </div>
        </div>

        {/* Scan line mejorado */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-8 animate-scan bg-gradient-to-b from-transparent via-gold-300/20 to-transparent blur-sm" />
        </div>

        {/* Hover burst mejorado */}
        <div className="absolute inset-0 scale-0 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-24 w-24 rounded-full bg-gold-300/20 blur-xl animate-pulse-glow" />
          </div>
        </div>
      </div>

      <DragonCompanion />
    </div>
  );
}
