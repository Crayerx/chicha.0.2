import { ArrowLeft, ArrowRight, Code2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { getChapter, type CSharpIntroBlock } from '@/data/csharpChapters';

function IntroBlockView({ block }: { block: CSharpIntroBlock }) {
  const [copied, setCopied] = useState(false);

  switch (block.type) {
    case 'heading':
      return (
        <h3 className="mt-8 flex items-center gap-2 font-pixel text-base leading-tight text-gold-300 text-shadow-pixel sm:text-lg">
          {block.emoji && <span aria-hidden="true">{block.emoji}</span>}
          {block.text}
        </h3>
      );
    case 'paragraph':
      return <p className="font-terminal text-xl leading-relaxed text-slate2-300">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2 border-l-2 border-ink-600 pl-4">
          {block.items.map((item, i) => (
            <li key={i} className="font-terminal text-xl leading-relaxed text-slate2-300">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="border-2 border-gold-400/60 bg-gold-400/10 px-4 py-3">
          <p className="font-terminal text-xl leading-relaxed text-gold-100">{block.text}</p>
        </div>
      );
    case 'code':
      return (
        <div className="border-2 border-ink-600 bg-ink-800">
          <div className="flex items-center justify-between border-b-2 border-ink-600 px-3 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate2-500">programa.cs</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(block.code);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-slate2-400 hover:text-gold-200"
            >
              {copied ? <Check className="h-3 w-3 text-jade-400" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate2-100">{block.code}</pre>
        </div>
      );
    default:
      return null;
  }
}

export default function CSharpIntroView({
  chapterId,
  onExit,
  onStartExercises,
}: {
  chapterId: string;
  onExit: () => void;
  /** Avanza al primer ejercicio del capítulo. */
  onStartExercises: (chapterId: string) => void;
}) {
  const chapter = getChapter(chapterId);

  if (!chapter || !chapter.intro) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-900 px-4 text-center text-slate2-300">
        <div>
          <p className="font-terminal text-xl">Esta introducción todavía no existe.</p>
          <button
            onClick={onExit}
            className="mt-4 border-2 border-gold-400 bg-ink-800 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-gold-200"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 text-slate2-300">
      <div className="absolute inset-0 bg-dots opacity-50" />
      {/* Top bar */}
      <header className="relative flex items-center gap-4 border-b-2 border-ink-600 bg-ink-800 px-4 py-2.5">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-slate2-300 hover:text-gold-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Salir
        </button>
        <span className="font-mono text-xs uppercase tracking-widest text-slate2-400">
          C# / {chapter.title} / Introducción
        </span>
      </header>

      <main className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-300">
          {String(chapter.number).padStart(2, '0')}. {chapter.title}
        </p>
        <div className="mt-2 mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ruby-400 bg-ruby-400/10">
            <Code2 className="h-6 w-6 text-ruby-300" />
          </div>
          <h2 className="font-pixel text-lg leading-tight text-gold-200 text-shadow-pixel sm:text-xl">
            {chapter.intro.title}
          </h2>
        </div>

        <div className="space-y-5">
          {chapter.intro.blocks.map((block, i) => (
            <IntroBlockView key={i} block={block} />
          ))}
        </div>

        <button
          onClick={() => onStartExercises(chapterId)}
          className="mt-10 inline-flex w-full items-center justify-center gap-2 border-2 border-gold-400 bg-gold-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink-900 shadow-pixel-sm hover:bg-gold-300"
        >
          Empezar ejercicios
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </main>
    </div>
  );
}
