import { useState, type FormEvent } from 'react';
import { X, Mail, Loader2, CheckCircle2, Hourglass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { signInWithMagicLink, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await signInWithMagicLink(email.trim());
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'No se pudo enviar el enlace.');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
      // El navegador redirige a Google; no hace falta más estado acá.
    } catch (err) {
      setGoogleLoading(false);
      setErrorMsg(err instanceof Error ? err.message : 'No se pudo iniciar con Google.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-900/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm border-4 border-gold-400 bg-ink-800 p-6 shadow-pixel-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center border-2 border-ink-500 bg-ink-700 text-slate2-300 transition-colors hover:border-gold-400 hover:text-gold-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center border-2 border-gold-400 bg-ink-900 shadow-pixel-gold">
            <Hourglass className="h-6 w-6 animate-pulse-glow text-gold-300" />
          </span>
          <h2 className="mt-3 font-pixel text-sm text-gold-300 text-shadow-pixel sm:text-base">
            INICIA SESIÓN
          </h2>
          <p className="mt-2 font-terminal text-lg leading-snug text-slate2-400">
            Necesitás una cuenta para guardar tu progreso, XP y racha.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-2 border-2 border-jade-400/50 bg-jade-400/10 px-4 py-5 text-center">
            <CheckCircle2 className="h-6 w-6 text-jade-400" />
            <p className="font-terminal text-lg text-slate2-200">
              Te mandamos un enlace mágico a <span className="text-gold-200">{email}</span>. Abrilo
              desde este mismo dispositivo para entrar.
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-2 border-2 border-ink-500 bg-ink-700 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate2-200 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="h-4 w-4" />
              )}
              Continuar con Google
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-ink-600" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-500">
                o con email
              </span>
              <div className="h-px flex-1 bg-ink-600" />
            </div>

            <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 border-2 border-ink-500 bg-ink-900 px-3 py-2.5 focus-within:border-gold-400">
                <Mail className="h-4 w-4 shrink-0 text-slate2-500" />
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent font-terminal text-lg text-slate2-200 placeholder:text-slate2-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink-900 shadow-pixel-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
                Enviar enlace mágico
              </button>
            </form>

            {errorMsg && (
              <p className="mt-3 border-2 border-ruby-400/50 bg-ruby-400/10 px-3 py-2 text-center font-mono text-[11px] text-ruby-300">
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
