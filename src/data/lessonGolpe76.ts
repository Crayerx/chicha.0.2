import {
  AlertTriangle,
  Landmark,
  ShieldAlert,
  Globe,
  Vote,
  type LucideIcon,
} from 'lucide-react';
import type { LoreSlide, QuizQuestion, Artifact } from './lessonArgentina';

export const loreSlidesGolpe76: LoreSlide[] = [
  {
    id: 1,
    title: 'La Crisis de Isabel Perón',
    icon: AlertTriangle,
    tag: '1974-1976',
    accent: 'ruby',
    body: 'Tras la muerte de Juan Domingo Perón en 1974, su esposa y vicepresidenta María Estela "Isabel" Martínez de Perón asumió la presidencia. Su gobierno atravesó una fuerte crisis económica (inflación galopante), violencia política creciente —con la Triple A operando desde el propio Estado y organizaciones armadas como Montoneros y el ERP— y una profunda inestabilidad institucional.',
  },
  {
    id: 2,
    title: 'El Golpe del 24 de Marzo de 1976',
    icon: Landmark,
    tag: '24 MAR 1976',
    accent: 'ember',
    body: 'En la madrugada del 24 de marzo de 1976, las Fuerzas Armadas derrocaron a Isabel Perón e instauraron una Junta Militar integrada por el teniente general Jorge Rafael Videla (Ejército), el almirante Emilio Massera (Armada) y el brigadier Orlando Agosti (Fuerza Aérea). Videla asumió luego la presidencia de facto.',
  },
  {
    id: 3,
    title: 'El "Proceso de Reorganización Nacional"',
    icon: ShieldAlert,
    tag: '1976',
    accent: 'gold',
    body: 'El nuevo régimen se autodenominó "Proceso de Reorganización Nacional". Sus objetivos declarados eran combatir la "subversión", restaurar el orden y reorganizar la economía y la moral de la nación. En los hechos, disolvió el Congreso, destituyó a las autoridades provinciales, suspendió los partidos políticos e intervino los sindicatos.',
  },
  {
    id: 4,
    title: 'La Doctrina de Seguridad Nacional',
    icon: Globe,
    tag: 'CONTEXTO REGIONAL',
    accent: 'jade',
    body: 'El golpe de 1976 se enmarcó en la Doctrina de Seguridad Nacional, impulsada durante la Guerra Fría, que definía al "enemigo interno" como amenaza prioritaria por sobre cualquier agresión externa. Esta doctrina fue compartida por varias dictaduras sudamericanas de la época, coordinadas luego a través del Plan Cóndor.',
  },
];

export const quizQuestionsGolpe76: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: '¿Qué día se produjo el golpe de Estado que derrocó a Isabel Perón?',
    options: ['24 de marzo de 1976', '17 de octubre de 1976', '2 de abril de 1976', '1° de mayo de 1976'],
    correctIndex: 0,
    explanation:
      'El golpe de Estado se produjo en la madrugada del 24 de marzo de 1976, dando inicio al autodenominado "Proceso de Reorganización Nacional".',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'truefalse',
    question: 'La Junta Militar de 1976 estuvo integrada por representantes de las tres fuerzas armadas (Ejército, Armada y Fuerza Aérea).',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation: 'Verdadero. La integraron Videla (Ejército), Massera (Armada) y Agosti (Fuerza Aérea).',
    accent: 'ember',
  },
  {
    id: 3,
    type: 'multiple',
    question: '¿Quién encabezó la Junta Militar y luego asumió la presidencia de facto?',
    options: ['Emilio Massera', 'Leopoldo Galtieri', 'Jorge Rafael Videla', 'Orlando Agosti'],
    correctIndex: 2,
    explanation: 'Jorge Rafael Videla, al frente del Ejército, presidió la Junta Militar y asumió luego la presidencia de facto.',
    accent: 'ruby',
  },
  {
    id: 4,
    type: 'multiple',
    question: '¿Cómo se autodenominó el gobierno de facto instaurado el 24 de marzo de 1976?',
    options: [
      'Revolución Libertadora',
      'Proceso de Reorganización Nacional',
      'Revolución Argentina',
      'Junta de Reconstrucción Nacional',
    ],
    correctIndex: 1,
    explanation: 'El régimen se autodenominó "Proceso de Reorganización Nacional", con la promesa de reorganizar la política, la economía y la sociedad.',
    accent: 'jade',
  },
  {
    id: 5,
    type: 'flashcard',
    question: '¿Qué marco ideológico, impulsado durante la Guerra Fría, influyó en la represión de las dictaduras sudamericanas de la época, incluida la Argentina de 1976?',
    answer: 'La Doctrina de Seguridad Nacional, que definía al "enemigo interno" como amenaza prioritaria del Estado.',
    explanation: 'Esta doctrina fue el sustento ideológico de la represión y se coordinó regionalmente a través del Plan Cóndor.',
    accent: 'gold',
  },
  {
    id: 6,
    type: 'truefalse',
    question: 'Tras el golpe de 1976, el Congreso Nacional continuó funcionando con normalidad.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation: 'Falso. La Junta Militar disolvió el Congreso Nacional y suspendió la actividad de los partidos políticos.',
    accent: 'ember',
  },
];

export const lessonArtifactGolpe76: Artifact = {
  name: 'Acta del Proceso',
  rarity: 'LEGENDARIO',
  era: '24 MAR 1976',
  icon: Landmark,
  description: 'Recuerda el golpe de Estado que instauró la dictadura cívico-militar y disolvió las instituciones democráticas.',
};

export const lessonMetaGolpe76 = {
  module: 'Módulo 2',
  title: 'El Golpe de Estado de 1976',
  subtitle: 'Causas y objetivos del 24 de marzo',
  steps: [
    { id: 1, label: 'Contexto', icon: Landmark as LucideIcon },
    { id: 2, label: 'Quiz', icon: Vote as LucideIcon },
  ],
};
