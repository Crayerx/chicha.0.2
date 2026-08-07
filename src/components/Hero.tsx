import { Play, Hourglass } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink-600">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/80 to-ink-900" />

      {/* Floating pixel decorations */}
      <div className="pointer-events-none absolute left-[8%] top-[22%] hidden h-3 w-3 animate-float-slow bg-gold-400 opacity-70 lg:block" />
      <div className="pointer-events-none absolute right-[12%] top-[30%] hidden h-2 w-2 animate-pulse-glow bg-ember-400 opacity-80 lg:block" />
      <div className="pointer-events-none absolute left-[15%] bottom-[20%] hidden h-2 w-2 animate-float-slow bg-jade-400 opacity-70 lg:block" style={{ animationDelay: '1.5s' }} />
      <div className="pointer-events-none absolute right-[18%] bottom-[28%] hidden h-3 w-3 animate-pulse-glow bg-ruby-400 opacity-70 lg:block" style={{ animationDelay: '0.8s' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 border-2 border-gold-400/40 bg-ink-800/80 px-3 py-1.5">
            <span className="h-2 w-2 animate-blink bg-jade-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
              v1.0 · NOW PLAYING
            </span>
          </div>

          <h1 className="font-pixel text-2xl leading-tight text-gold-300 text-shadow-pixel sm:text-3xl md:text-4xl lg:text-5xl">
            COMIENZA TU<br />
            <span className="text-gold-200">AVENTURA</span><br />
            <span className="text-ember-400">POR LA HISTORIA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-terminal text-xl leading-snug text-slate2-300 lg:mx-0 lg:text-2xl">
            La forma más interactiva y ludificada de dominar los grandes eventos
            de la humanidad a través de decisiones, mapas y simulación.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <button className="group relative flex w-full items-center justify-center gap-3 border-2 border-gold-400 bg-gold-400 px-8 py-4 font-mono text-base font-bold uppercase tracking-wider text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-1 hover:bg-gold-300 hover:shadow-pixel-lg sm:w-auto">
              <Play className="h-5 w-5 fill-ink-900" />
              Get Started
            </button>
            
              href="#cursos"
              className="flex w-full items-center justify-center gap-2 border-2 border-ink-500 bg-ink-700 px-6 py-4 font-mono text-base font-bold uppercase tracking-wider text-slate2-300 shadow-pixel-sm transition-all hover:-translate-y-1 hover:border-gold-400 hover:text-gold-200 sm:w-auto"
            >
              <Hourglass className="h-5 w-5" />
              Ver Cursos
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-ink-600 pt-6">
            {[
              { num: '04', label: 'Eras' },
              { num: '120+', label: 'Lecciones' },
              { num: '60h', label: 'Contenido' },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="font-pixel text-lg text-gold-300 sm:text-xl">{s.num}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate2-400 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — pixel portal */}
        <div className="relative mx-auto flex max-w-md items-center justify-center lg:max-w-none">
          <PixelPortal />
        </div>
      </div>
    </section>
  );
}

function PixelPortal() {
  return (
    <div className="group relative aspect-square w-full max-w-sm animate-float-slow">
      {/* Outer frame */}
      <div className="absolute inset-0 border-4 border-gold-500 bg-ink-800 shadow-pixel-xl" />

      {/* Corner studs */}
      {[
        'top-1 left-1',
        'top-1 right-1',
        'bottom-1 left-1',
        'bottom-1 right-1',
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} h-3 w-3 border-2 border-gold-300 bg-gold-500`}
        />
      ))}

      {/* Portal core */}
      <div className="absolute inset-6 overflow-hidden border-2 border-gold-400 bg-ink-900">
        {/* Concentric pixel rings */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute h-[85%] w-[85%] border-2 border-gold-400/30" />
          <div className="absolute h-[65%] w-[65%] border-2 border-gold-300/40" />
          <div className="absolute h-[45%] w-[45%] border-2 border-ember-400/50" />
          <div className="absolute h-[28%] w-[28%] border-2 border-gold-200/60" />
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,204,51,0.25) 0%, rgba(255,122,47,0.12) 40%, transparent 70%)',
          }}
        />

        {/* Center hourglass */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center">
            <Hourglass className="h-16 w-16 animate-pulse-glow text-gold-300 drop-shadow-[0_0_12px_rgba(255,204,51,0.6)]" />
            <span className="mt-3 font-pixel text-[10px] text-gold-200 text-shadow-pixel">
              CHRONOS
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate2-400">
              PORTAL ACTIVO
            </span>
          </div>
        </div>

        {/* Scan line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-8 animate-scan bg-gradient-to-b from-transparent via-gold-300/15 to-transparent" />
        </div>

        {/* Hover burst */}
        <div className="absolute inset-0 scale-0 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-24 w-24 rounded-full bg-gold-300/20 blur-xl" />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 border-2 border-gold-400 bg-ink-900 px-4 py-1.5 shadow-pixel-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-blink bg-jade-400" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}
