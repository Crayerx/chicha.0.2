import type { LucideIcon } from 'lucide-react';
import { Check, ArrowLeft } from 'lucide-react';

export interface XPBarStep {
  id: number;
  label: string;
  icon: LucideIcon;
}

interface XPBarProps {
  xp: number;
  maxXp: number;
  module: string;
  currentStep: number;
  steps: XPBarStep[];
  onExit: () => void;
}

export default function XPBar({ xp, maxXp, module, currentStep, steps, onExit }: XPBarProps) {
  const pct = Math.min(100, Math.round((xp / maxXp) * 100));

  return (
    <div className="sticky top-0 z-40 border-b-2 border-ink-600 bg-ink-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Back to menu button */}
          <button
            onClick={onExit}
            className="flex shrink-0 items-center gap-1.5 border-2 border-ink-500 bg-ink-800 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate2-300 transition-all hover:border-gold-400 hover:bg-ink-700 hover:text-gold-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Menú</span>
          </button>

          {/* Module label */}
          <div className="hidden shrink-0 items-center gap-2 border-2 border-gold-400/40 bg-ink-800 px-3 py-1.5 sm:flex">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold-200">
              {module}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-pixel text-[9px] text-gold-300 sm:text-[10px]">XP</span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-slate2-300">
                {xp} / {maxXp}
              </span>
            </div>
            <div className="h-3 w-full border-2 border-ink-500 bg-ink-700">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="hidden shrink-0 items-center gap-1.5 md:flex">
            {steps.map((step) => {
              const Icon = step.icon as LucideIcon;
              const done = currentStep > step.id;
              const active = currentStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-1 border-2 px-2 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                    done
                      ? 'border-jade-400 bg-jade-400/10 text-jade-300'
                      : active
                        ? 'border-gold-400 bg-gold-400/10 text-gold-200'
                        : 'border-ink-500 bg-ink-800 text-slate2-500'
                  }`}
                >
                  {done ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
