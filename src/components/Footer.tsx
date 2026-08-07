import { Hourglass, Github, Twitter, BookOpen, Scroll, Compass } from 'lucide-react';

const SOURCES = [
  { label: 'WIKIMEDIA PROJECT', icon: BookOpen },
  { label: 'BRITANNICA OPEN', icon: Scroll },
  { label: 'OPEN HISTORY FOUNDATION', icon: Compass },
];

const COLUMNS = [
  {
    title: 'Explorar',
    links: ['Cursos', 'Códex', 'Comunidad', 'Mapa Mundial'],
  },
  {
    title: 'Recursos',
    links: ['Documentación', 'API Abierta', 'Guías', 'FAQ'],
  },
  {
    title: 'Proyecto',
    links: ['Sobre Chronos', 'Contribuir', 'Licencias', 'Contacto'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink-600 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border-2 border-gold-400 bg-ink-800 shadow-pixel-gold">
                <Hourglass className="h-5 w-5 text-gold-300" />
              </span>
              <span className="font-pixel text-base tracking-wider text-gold-300 text-shadow-pixel">
                CHRONOS
              </span>
            </div>
            <p className="mt-4 max-w-xs font-terminal text-lg leading-snug text-slate2-400">
              Aprende historia jugando. Recorre las grandes eras de la humanidad
              con decisiones, mapas y simulación.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="grid h-9 w-9 place-items-center border-2 border-ink-500 bg-ink-800 text-slate2-300 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="grid h-9 w-9 place-items-center border-2 border-ink-500 bg-ink-800 text-slate2-300 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-gold-200">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-terminal text-lg text-slate2-400 transition-colors hover:text-gold-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div className="mt-12 border-t-2 border-ink-600 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-500">
              Datos de:
            </span>
            {SOURCES.map((src) => (
              <span
                key={src.label}
                className="inline-flex items-center gap-1.5 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate2-300 transition-colors hover:border-gold-400 hover:text-gold-200"
              >
                <src.icon className="h-3 w-3 text-gold-400" />
                {src.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-ink-600 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate2-500">
            © 2026 Chronos ·
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate2-500">
            <span className="h-2 w-2 animate-blink bg-jade-400" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
