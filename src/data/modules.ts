export type ModuleStatus = 'unlocked' | 'locked';

export interface CourseModuleGroup {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  /** IDs de `phaCourses` (ver src/data/courses.ts) que viven dentro de este módulo. */
  courseIds: string[];
}

/**
 * Submódulos del curso PHA (Problemas de Historia Argentina).
 * Módulo 1 agrupa las cinco eras del peronismo clásico y su resistencia.
 * Módulo 2 y 3 quedan como próximos contenidos hasta que se definan.
 */
export const phaModules: CourseModuleGroup[] = [
  {
    id: 'modulo-1',
    title: 'Módulo 1',
    description:
      'Del 30 al 55: la crisis del 30, el peronismo clásico, el Estado de Bienestar y la resistencia peronista.',
    status: 'unlocked',
    courseIds: ['argentina', 'peronista', 'bienestar', 'politica', 'resistencia'],
  },
  {
    id: 'modulo-2',
    title: 'Módulo 2',
    description: 'Próximamente.',
    status: 'locked',
    courseIds: [],
  },
  {
    id: 'modulo-3',
    title: 'Módulo 3',
    description: 'Próximamente.',
    status: 'locked',
    courseIds: [],
  },
];
