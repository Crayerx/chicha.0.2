import { ArrowLeft } from 'lucide-react';
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
export default function CulturaHackView({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-900">
      <div className="flex items-center gap-3 border-b-2 border-ink-600 bg-ink-900 px-3 py-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 border-2 border-ink-500 bg-ink-800 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 transition-colors hover:border-gold-300 hover:text-gold-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </button>
        <span className="font-mono text-xs uppercase tracking-widest text-slate2-400">
          🕵️ Cultura Hack — Fascículo 1
        </span>
      </div>
      <iframe
        title="Cultura Hack — Fascículo 1"
        srcDoc={culturaHackHtml}
        className="h-full w-full flex-1 border-0 bg-white"
        sandbox="allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-same-origin"
      />
    </div>
  );
}
