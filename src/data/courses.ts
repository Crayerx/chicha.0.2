import { Lock, Clock as Unlock, Pyramid, Shield, Swords, Flame, Flag, Factory } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CourseStatus = 'unlocked' | 'locked';

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  hours: number;
  status: CourseStatus;
  icon: LucideIcon;
  accent: 'gold' | 'ember' | 'jade' | 'ruby';
  era: string;
  lessons: number;
  lessonId?: string;
}

export const courses: Course[] = [
  {
    id: 'argentina',
    title: 'Argentina 1930-46',
    category: 'SIGLO XX',
    description:
      'De la Crisis del 30 al surgimiento del peronismo: ISI, migraciones, el golpe de 1943 y el 17 de Octubre.',
    hours: 8,
    status: 'unlocked',
    icon: Flag,
    accent: 'ember',
    era: '1930 – 1946',
    lessons: 12,
    lessonId: 'argentina',
  },
  {
    id: 'peronista',
    title: 'Economía Peronista',
    category: 'SIGLO XX',
    description:
      'Industrialización, planificación quinquenal, IAPI y nacionalizaciones: el rol del Estado en la economía peronista.',
    hours: 4,
    status: 'unlocked',
    icon: Factory,
    accent: 'gold',
    era: '1946 – 1953',
    lessons: 3,
    lessonId: 'peronista',
  },
  {
    id: 'rome',
    title: 'Estrategia Romana',
    category: 'IMPERIO',
    description:
      'Dirige legiones, planifica batallas y expande las fronteras del Imperio. Tú decides el destino de Roma.',
    hours: 16,
    status: 'unlocked',
    icon: Shield,
    accent: 'ruby',
    era: '753 a.C. – 476 d.C.',
    lessons: 32,
  },
  {
    id: 'feudal',
    title: 'Feudalismo y Cruzadas',
    category: 'EDAD MEDIA',
    description:
      'Jura vasallaje, gestiona feudos y marcha hacia Tierra Santa en campañas que redefinieron Europa.',
    hours: 14,
    status: 'locked',
    icon: Swords,
    accent: 'ember',
    era: 'siglos V – XV',
    lessons: 28,
  },
  {
    id: 'revolutions',
    title: 'Era de Revoluciones',
    category: 'EDAD MODERNA',
    description:
      'Enciende la pólvora de la independencia, redacta constituciones y lidera levantamientos que cambiaron el mundo.',
    hours: 18,
    status: 'locked',
    icon: Flame,
    accent: 'jade',
    era: '1776 – 1848',
    lessons: 36,
  },
  {
    id: 'egypt',
    title: 'Egipto y el Nilo',
    category: 'ANTIGÜEDAD',
    description:
      'Construye dinastías, domina las crecidas del Nilo y descifra jeroglíficos mientras govern el reino de los faraones.',
    hours: 12,
    status: 'locked',
    icon: Pyramid,
    accent: 'gold',
    era: '3100 a.C. – 30 a.C.',
    lessons: 24,
  },
];

export const statusLabel: Record<CourseStatus, string> = {
  unlocked: 'DESBLOQUEADO',
  locked: 'BLOQUEADO',
};

export const statusIcon: Record<CourseStatus, LucideIcon> = {
  unlocked: Unlock,
  locked: Lock,
};
