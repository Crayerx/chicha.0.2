import { Lock, Clock as Unlock, Pyramid, Flame, Flag, Factory, HeartHandshake, Scale, ShieldAlert, Landmark, DollarSign, Code, Brain, Wrench, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { csharpTotals } from './csharpChapters';

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

/**
 * Cursos que viven adentro del Módulo 2 de PHA: la última dictadura
 * cívico-militar (1976-1983). Formato simple: contexto + quiz de 6
 * preguntas (ver `src/data/modules.ts` y `src/data/lessons.ts`).
 */
export const phaCoursesModulo2: Course[] = [
  {
    id: 'golpe76',
    title: 'El Golpe de 1976',
    category: 'SIGLO XX',
    description: 'Causas y objetivos del golpe de Estado del 24 de marzo de 1976 que instauró la dictadura cívico-militar.',
    hours: 1,
    status: 'unlocked',
    icon: Landmark,
    accent: 'ember',
    era: '24 MAR 1976',
    lessons: 2,
    lessonId: 'golpe76',
  },
  {
    id: 'planeconomico',
    title: 'Plan Económico Neoliberal',
    category: 'SIGLO XX',
    description: 'Apertura financiera, endeudamiento externo y desindustrialización durante la gestión de Martínez de Hoz.',
    hours: 1,
    status: 'unlocked',
    icon: DollarSign,
    accent: 'gold',
    era: '1976 – 1981',
    lessons: 2,
    lessonId: 'planeconomico',
  },
  {
    id: 'terrorismo',
    title: 'Terrorismo de Estado',
    category: 'SIGLO XX',
    description: 'Represión clandestina, desaparición forzada, apropiación de bebés y los primeros pasos hacia verdad y justicia.',
    hours: 1,
    status: 'unlocked',
    icon: Scale,
    accent: 'ruby',
    era: '1976 – 1983',
    lessons: 2,
    lessonId: 'terrorismo',
  },
  {
    id: 'sociedaddictadura',
    title: 'La Sociedad durante la Dictadura',
    category: 'SIGLO XX',
    description: 'Censura, vida cotidiana bajo vigilancia, el Mundial 78 y las primeras resistencias como las Madres de Plaza de Mayo.',
    hours: 1,
    status: 'unlocked',
    icon: ShieldAlert,
    accent: 'jade',
    era: '1976 – 1983',
    lessons: 2,
    lessonId: 'sociedaddictadura',
  },
  {
    id: 'malvinas',
    title: 'Guerra de Malvinas y Final de la Dictadura',
    category: 'SIGLO XX',
    description: 'El conflicto del Atlántico Sur de 1982 y su impacto en la caída de la dictadura y el retorno a la democracia en 1983.',
    hours: 1,
    status: 'unlocked',
    icon: Flag,
    accent: 'ember',
    era: '1982 – 1983',
    lessons: 2,
    lessonId: 'malvinas',
  },
];

/**
 * Cursos que viven adentro del Módulo 1 de Prácticas Culturales (Fascículo 1:
 * Eje Temático Cultura). Formato simple: contexto + quiz, igual que el
 * Módulo 2 de PHA (ver `src/data/modules.ts` y `src/data/lessons.ts`).
 */
export const culturaCoursesModulo1: Course[] = [
  {
    id: 'culturasentido',
    title: 'Cultura, sentido común y naturalización',
    category: 'PRÁCTICAS CULTURALES',
    description: 'Presentación de la materia y la mirada de Soledad López: la cultura como acción, alta cultura y capital cultural.',
    hours: 1,
    status: 'unlocked',
    icon: Brain,
    accent: 'gold',
    era: 'FASCÍCULO 1',
    lessons: 2,
    lessonId: 'culturasentido',
  },
  {
    id: 'culturainventada',
    title: 'Prácticas inventadas y cajas negras',
    category: 'PRÁCTICAS CULTURALES',
    description: 'Cortázar, Denys Cuche y César Aira: gestos ya inventados, aculturación y la sociedad como caja negra.',
    hours: 1,
    status: 'unlocked',
    icon: Wrench,
    accent: 'jade',
    era: 'FASCÍCULO 1',
    lessons: 2,
    lessonId: 'culturainventada',
  },
  {
    id: 'culturafronteras',
    title: 'Fronteras, frentes culturales e imágenes',
    category: 'PRÁCTICAS CULTURALES',
    description: 'Alejandro Grimson, Jorge González y Sergio Caggiano: convenciones sociales, hegemonía y lo que las imágenes muestran y ocultan.',
    hours: 1,
    status: 'unlocked',
    icon: MapPin,
    accent: 'ruby',
    era: 'FASCÍCULO 1',
    lessons: 2,
    lessonId: 'culturafronteras',
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
    id: 'csharp',
    title: 'Conceptos de C#',
    category: 'PROGRAMACIÓN',
    description:
      'Escribí y compilá código C# de verdad, capítulo a capítulo: de tu primer "Hola Mundo" a variables, condicionales, bucles y programación orientada a objetos.',
    hours: csharpTotals.chapters,
    status: 'unlocked',
    icon: Code,
    accent: 'ruby',
    era: 'C#',
    lessons: csharpTotals.exercises,
    isModuleGroup: true,
  },
  {
    id: 'feudal',
    title: 'Prácticas Culturales',
    category: 'UNAJ',
    description:
      'Cultura, sentido común y naturalización: recorré el Ciclo Inicial de Prácticas Culturales en módulos temáticos, del Fascículo 1 en adelante.',
    hours: culturaCoursesModulo1.reduce((sum, c) => sum + c.hours, 0),
    status: 'unlocked',
    icon: Brain,
    accent: 'jade',
    era: 'FASCÍCULO 1',
    lessons: culturaCoursesModulo1.reduce((sum, c) => sum + c.lessons, 0),
    isModuleGroup: true,
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
export const allCourses: Course[] = [...courses, ...phaCourses, ...phaCoursesModulo2, ...culturaCoursesModulo1];

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
