import { useState } from 'react';
import { Hourglass, Menu, X, UserCircle } from 'lucide-react';

const NAV_LINKS = [{ label: 'Cursos', href: '#cursos' }];

export default function Navbar({ onProfile }: { onProfile?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-600 bg-ink-900/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border-2 border-gold-400 bg-ink-800 shadow-pixel-gold transition-transform group-hover:-translate-y-0.5">
            <Hourglass className="h-5 w-5 animate-pulse-glow text-gold-300" />
          </span>
          <span className="font-pixel text-lg tracking-wider text-gold-300 text-shadow-pixel">
            CHRONOS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 font-mono text-sm font-medium uppercase tracking-wider text-slate2-300 transition-colors hover:border-b-2 hover:border-gold-400 hover:text-gold-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onProfile}
            className="flex items-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-pixel"
          >
            <UserCircle className="h-4 w-4" />
            Perfil
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center border-2 border-ink-500 bg-ink-700 text-gold-300 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t-2 border-ink-600 bg-ink-900 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate2-300 transition-colors hover:border-gold-400 hover:bg-ink-800 hover:text-gold-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setOpen(false);
                onProfile?.();
              }}
              className="flex items-center justify-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink-900"
            >
              <UserCircle className="h-4 w-4" />
              Perfil
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
