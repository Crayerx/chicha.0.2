import { useState } from 'react';
import { Hourglass, Menu, X, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useUserStats } from '@/contexts/UserStatsContext';
import DailyGoalBar from './DailyGoalBar';

const NAV_LINKS = [{ label: 'Cursos', href: '#cursos' }];

interface NavbarProps {
  isAuthenticated?: boolean;
  userEmail?: string | null;
  onProfile?: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export default function Navbar({
  isAuthenticated = false,
  userEmail,
  onProfile,
  onSignIn,
  onSignOut,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { stats, xpToday, loaded: statsLoaded } = useUserStats();
  const showGoalBar = isAuthenticated && statsLoaded;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-600 bg-ink-900/95 backdrop-blur-sm glass-effect gradient-shimmer">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo mejorado */}
        <a href="#" className="group flex items-center gap-3 hover-lift">
          <span className="grid h-10 w-10 place-items-center border-2 border-gold-400 bg-ink-800 shadow-pixel-glow transition-transform group-hover:-translate-y-0.5 glow-gold">
            <Hourglass className="h-5 w-5 animate-pulse-glow text-gold-300 neon-text-gold" />
          </span>
          <span className="font-pixel text-lg tracking-wider text-gold-300 text-shadow-pixel neon-text-gold">
            CHRONOS
          </span>
        </a>

        {/* Desktop nav mejorado */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 font-mono text-sm font-medium uppercase tracking-wider text-slate2-300 transition-all hover:border-b-2 hover:border-gold-400 hover:text-gold-200 group"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        {/* Desktop actions mejorado */}
        <div className="hidden items-center gap-4 md:flex">
          {showGoalBar && <DailyGoalBar xpToday={xpToday} goalXp={stats.daily_goal_xp} />}
          {isAuthenticated ? (
            <>
              {userEmail && (
                <span className="max-w-[160px] truncate font-mono text-xs uppercase tracking-widest text-gold-200 animate-fade-in neon-text-gold">
                  {userEmail}
                </span>
              )}
              <button
                onClick={onProfile}
                className="group relative flex items-center gap-2 border-2 border-gold-400 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-[0_0_20px_rgba(255,204,51,0.5)] transition-all hover:-translate-y-0.5 hover:from-gold-300 hover:via-gold-200 hover:to-gold-300 hover:shadow-[0_0_35px_rgba(255,204,51,0.8)] hover-lift animated-border"
              >
                <UserCircle className="h-5 w-5 fill-ink-900/20" />
                Perfil
              </button>
              <button
                onClick={onSignOut}
                aria-label="Cerrar sesión"
                className="grid h-10 w-10 place-items-center border-2 border-ruby-400/60 bg-ink-800/90 text-ruby-300 transition-all hover:border-ruby-400 hover:bg-ink-700 hover:text-ruby-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,45,68,0.5)] hover-lift glass-effect gradient-border-glow"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onSignIn}
              className="group relative flex items-center gap-2 border-2 border-gold-400 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-[0_0_20px_rgba(255,204,51,0.5)] transition-all hover:-translate-y-0.5 hover:from-gold-300 hover:via-gold-200 hover:to-gold-300 hover:shadow-[0_0_35px_rgba(255,204,51,0.8)] hover-lift animated-border"
            >
              <LogIn className="h-5 w-5 fill-ink-900/20" />
              Iniciar sesión
            </button>
          )}
        </div>

        {/* Mobile toggle mejorado */}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center border-2 border-ink-500 bg-ink-700 text-gold-300 md:hidden transition-all hover:border-gold-400 hover:text-gold-200 hover:-translate-y-0.5"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu mejorado */}
      {open && (
        <div className="border-t-2 border-ink-600 bg-ink-900 px-4 py-4 md:hidden glass-effect animate-slide-down">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate2-300 transition-colors hover:border-gold-400 hover:bg-ink-800 hover:text-gold-200 hover-lift"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {showGoalBar && (
              <div className="mb-1 px-1">
                <DailyGoalBar xpToday={xpToday} goalXp={stats.daily_goal_xp} compact />
              </div>
            )}
            {isAuthenticated ? (
              <>
                {userEmail && (
                  <p className="truncate px-1 font-mono text-[10px] uppercase tracking-widest text-gold-200 animate-fade-in neon-text-gold">
                    {userEmail}
                  </p>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    onProfile?.();
                  }}
                  className="group relative flex items-center justify-center gap-2 border-2 border-gold-400 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-[0_0_20px_rgba(255,204,51,0.5)] transition-all hover:from-gold-300 hover:via-gold-200 hover:to-gold-300 hover:shadow-[0_0_35px_rgba(255,204,51,0.8)] hover-lift animated-border"
                >
                  <UserCircle className="h-5 w-5 fill-ink-900/20" />
                  Perfil
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    onSignOut?.();
                  }}
                  className="flex items-center justify-center gap-2 border-2 border-ruby-400/60 bg-ink-800/90 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ruby-300 transition-all hover:border-ruby-400 hover:bg-ink-700 hover:text-ruby-200 hover:shadow-[0_0_20px_rgba(201,45,68,0.5)] hover-lift glass-effect gradient-border-glow"
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  onSignIn?.();
                }}
                className="group relative flex items-center justify-center gap-2 border-2 border-gold-400 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-[0_0_20px_rgba(255,204,51,0.5)] transition-all hover:from-gold-300 hover:via-gold-200 hover:to-gold-300 hover:shadow-[0_0_35px_rgba(255,204,51,0.8)] hover-lift animated-border"
              >
                <LogIn className="h-5 w-5 fill-ink-900/20" />
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
