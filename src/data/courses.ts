import { Lock, Clock as Unlock, Pyramid, Shield, Swords, Flame, Flag, Factory, HeartHandshake, Scale, ShieldAlert } from 'lucide-react';
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
  /** Si es true, la tarjeta no lleva a una lección: abre la vista de módulos (ver PhaView). */
  isModuleGroup?: boolean;
}

/**
 * Cursos que viven adentro del módulo PHA (Problemas de Historia Argentina).
 * Ya no aparecen sueltos en el catálogo principal: se listan dentro de
 * PHA → Módulo 1 (ver `src/data/modules.ts`).
 */
export const phaCourses: Course[] = [
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
    lessons: 10,
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
    lessons: 10,
    lessonId: 'peronista',
  },
  {
    id: 'bienestar',
    title: 'Estado de Bienestar',
    category: 'SIGLO XX',
    description:
      'Derechos sociales, salud, educación y cultura: la Fundación Eva Perón, Ramón Carrillo y la gratuidad universitaria.',
    hours: 4,
    status: 'unlocked',
    icon: HeartHandshake,
    accent: 'ruby',
    era: '1946 – 1955',
    lessons: 10,
    lessonId: 'bienestar',
  },
  {
    id: 'politica',
    title: 'Constitución de 1949 y Polarización',
    category: 'SIGLO XX',
    description:
      'La reforma constitucional de 1949, el voto femenino y la creciente polarización entre peronismo y antiperonismo hasta la caída de Perón.',
    hours: 4,
    status: 'unlocked',
    icon: Scale,
    accent: 'jade',
    era: '1946 – 1955',
    lessons: 10,
    lessonId: 'politica',
  },
  {
    id: 'resistencia',
    title: 'La Resistencia Peronista',
    category: 'SIGLO XX',
    description:
      'El golpe de 1955, la Revolución Libertadora, la proscripción del peronismo y la resistencia clandestina que surgió frente a la represión.',
    hours: 4,
    status: 'unlocked',
    icon: ShieldAlert,
    accent: 'ember',
    era: '1955 – 1958',
    lessons: 10,
    lessonId: 'resistencia',
  },
];

export const courses: Course[] = [
  {
    id: 'pha',
    title: 'PHA',
    category: 'SIGLO XX',
    description:
      'Problemas de Historia Argentina: recorré el siglo XX en tres módulos temáticos, del peronismo clásico a la actualidad.',
    hours: phaCourses.reduce((sum, c) => sum + c.hours, 0),
    status: 'unlocked',
    icon: Flag,
    accent: 'ember',
    era: '1930 – 1955',
    lessons: phaCourses.reduce((sum, c) => sum + c.lessons, 0),
    isModuleGroup: true,
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

/**
 * Todos los cursos "reales" (con lección jugable), estén o no agrupados
 * dentro de un módulo en el catálogo. Profile y useAchievements usan esta
 * lista para calcular XP total, logros, etc. — así los cursos de PHA siguen
 * contando aunque ya no aparezcan sueltos en el catálogo principal.
 */
export const allCourses: Course[] = [...courses, ...phaCourses];

/**
 * Derived catalog stats — computed from `courses` so the Hero banner and the
 * catalog header never drift out of sync with the actual course list again.
 */
export const catalogStats = {
  totalEras: courses.length,
  unlockedEras: courses.filter((c) => c.status === 'unlocked').length,
  lockedEras: courses.filter((c) => c.status === 'locked').length,
  totalLessons: courses.reduce((sum, c) => sum + c.lessons, 0),
  totalHours: courses.reduce((sum, c) => sum + c.hours, 0),
};
