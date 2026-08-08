import { useState, useEffect } from 'react';
import { UserCircle, Check } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function UsernameEditor() {
  const { username, loaded, saving, error, updateUsername } = useProfile();
  const [draft, setDraft] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (loaded && username) setDraft(username);
  }, [loaded, username]);

  if (!loaded) return null;

  const dirty = draft.trim() !== (username ?? '') && draft.trim().length > 0;

  const handleSave = async () => {
    const ok = await updateUsername(draft);
    if (ok) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 border-2 border-ink-600 bg-ink-800/50 px-4 py-3">
      <UserCircle className="h-4 w-4 shrink-0 text-slate2-400" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-400">
        Nombre en la liga:
      </span>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        maxLength={20}
        placeholder="tu-nombre"
        className="min-w-0 flex-1 border-2 border-ink-500 bg-ink-900 px-2 py-1 font-mono text-xs text-slate2-200 outline-none focus:border-gold-400"
      />
      <button
        onClick={handleSave}
        disabled={!dirty || saving}
        className="flex shrink-0 items-center gap-1.5 border-2 border-gold-400 bg-gold-400 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 transition-all disabled:cursor-not-allowed disabled:border-ink-500 disabled:bg-ink-700 disabled:text-slate2-500"
      >
        {justSaved ? <Check className="h-3 w-3" /> : null}
        {saving ? 'Guardando…' : justSaved ? 'Listo' : 'Guardar'}
      </button>
      {error && <p className="w-full font-mono text-[10px] text-ruby-300">{error}</p>}
    </div>
  );
}
