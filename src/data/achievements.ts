import { Flame, Trophy, Sparkles, Compass, Crown, Star, type LucideIcon } from 'lucide-react';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const achievementDefs: AchievementDef[] = [
  {
    id: 'racha_3',
    title: 'Constancia',
    description: 'Alcanzá una racha de 3 días seguidos.',
    icon: Flame,
  },
  {
    id: 'racha_7',
    title: 'Semana Completa',
    description: 'Alcanzá una racha de 7 días seguidos.',
    icon: Flame,
  },
  {
    id: 'racha_30',
    title: 'Racha de Hierro',
    description: 'Alcanzá una racha de 30 días seguidos.',
    icon: Crown,
  },
  {
    id: 'primera_era',
    title: 'Primer Paso',
    description: 'Completá tu primera era.',
    icon: Sparkles,
  },
  {
    id: 'coleccionista',
    title: 'Coleccionista',
    description: 'Completá todas las eras disponibles.',
    icon: Trophy,
  },
  {
    id: 'perfeccionista',
    title: 'Perfeccionista',
    description: 'Sacá puntaje perfecto en el quiz final de una era.',
    icon: Star,
  },
  {
    id: 'trilogia_perfecta',
    title: 'Trilogía Perfecta',
    description: '3 lecciones seguidas sin fallar el quiz.',
    icon: Trophy,
  },
  {
    id: 'explorador',
    title: 'Explorador',
    description: 'Empezá al menos 3 eras distintas.',
    icon: Compass,
  },
];
