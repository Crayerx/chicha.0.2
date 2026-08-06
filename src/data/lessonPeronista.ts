import {
  Factory,
  Landmark,
  Train,
  Wheat,
  Vote,
  Check,
  type LucideIcon,
} from 'lucide-react';
import type {
  LoreSlide,
  TimelineEvent,
  QuizQuestion,
  Artifact,
} from './lessonArgentina';

export const loreSlidesPeronista: LoreSlide[] = [
  {
    id: 1,
    title: 'Mercado Interno y Salarios Altos',
    icon: Factory,
    tag: '1946-1950',
    accent: 'gold',
    body: 'Durante el primer gobierno peronista, la política económica se centró en la redistribución del ingreso y el aumento sostenido de los salarios reales. Esto fortaleció el poder adquisitivo de los trabajadores, estimuló el consumo de bienes livianos y expandió activamente el mercado interno nacional.',
  },
  {
    id: 2,
    title: 'Planificación Estatal e IAPI',
    icon: Landmark,
    tag: '1946-1949',
    accent: 'ember',
    body: 'El Estado asumió un rol planificador mediante los Planes Quinquenales. Se creó el IAPI (Instituto Argentino para la Promoción del Intercambio) para centralizar el comercio exterior: compraba cosechas al campo a precios fijados y transfería divisas hacia la industria y la justicia social.',
  },
  {
    id: 3,
    title: 'Nacionalizaciones y Servicios Públicos',
    icon: Train,
    tag: '1947-1948',
    accent: 'jade',
    body: 'Se llevaron a cabo importantes nacionalizaciones de sectores estratégicos, tales como los ferrocarriles, la telefonía, el gas y los servicios de transporte. El objetivo era garantizar la soberanía económica e infraestructura para el crecimiento industrial del país.',
  },
  {
    id: 4,
    title: 'Crisis de 1952 y el Segundo Plan Quinquenal',
    icon: Wheat,
    tag: '1952-1955',
    accent: 'ruby',
    body: 'Hacia 1949-1952, la sequía y la baja de precios internacionales provocaron un desequilibrio en la balanza de pagos. En respuesta, el Segundo Plan Quinquenal (1953) implementó un "giro al campo" para incentivar la producción agrícola, controlar la inflación y financiar la industria pesada y de insumos básicos.',
  },
];

export const timelineEventsPeronista: TimelineEvent[] = [
  {
    id: 'pqp1',
    label: 'Lanzamiento del Primer Plan Quinquenal y creación del IAPI',
    date: '1946-1947',
    year: 1946,
    emoji: '📋',
  },
  {
    id: 'nacionaliza',
    label: 'Nacionalización masiva de los Ferrocarriles Argentinos',
    date: '1948',
    year: 1948,
    emoji: '🚂',
  },
  {
    id: 'cge',
    label: 'Fundación de la CGE (Confederación General Económica)',
    date: '1951',
    year: 1951,
    emoji: '🏭',
  },
  {
    id: 'pqp2',
    label: 'Implementación del Segundo Plan Quinquenal y "giro al campo"',
    date: '1953',
    year: 1953,
    emoji: '🌾',
  },
];

export const quizQuestionsPeronista: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question:
      '¿Cuál de las siguientes medidas caracterizó principalmente la política económica del primer gobierno peronista?',
    options: [
      'Privatización del transporte y de los servicios públicos.',
      'Aumento de los salarios reales y fortalecimiento del mercado interno.',
      'Eliminación de los convenios colectivos de trabajo.',
      'Apertura irrestricta de las importaciones.',
    ],
    correctIndex: 1,
    explanation:
      'El primer peronismo centró su modelo económico en dinamizar el consumo masivo y la industria nacional mediante la redistribución del ingreso y el aumento del salario real de la clase trabajadora.',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'truefalse',
    question:
      'El Instituto Argentino para la Promoción del Intercambio (IAPI) tenía como objetivo privatizar el comercio exterior y desregular las exportaciones agrícolas.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation:
      'Falso. El IAPI era un organismo estatal creado para centralizar y monopolizar el comercio exterior, permitiendo al Estado regular precios y redistribuir recursos del agro hacia la industria y el bienestar social.',
    accent: 'ember',
  },
  {
    id: 3,
    type: 'multiple',
    question:
      '¿Qué cambio de orientación económica introdujo el Segundo Plan Quinquenal lanzado en 1953?',
    options: [
      'Reducción total del presupuesto en salud y educación.',
      'Un "giro al campo" para incentivar las exportaciones agrícolas y financiar la industria de base.',
      'La privatización de YPF y los ferrocarriles.',
      'La prohibición de la actividad industrial en el Gran Buenos Aires.',
    ],
    correctIndex: 1,
    explanation:
      'Ante las dificultades en la balanza de pagos a comienzos de los \'50, el gobierno reorientó incentivos hacia el sector agropecuario para conseguir divisas y sostener la industria pesada.',
    accent: 'ruby',
  },
  {
    id: 4,
    type: 'flashcard',
    question:
      '¿Cuál fue el principal propósito de la nacionalización de servicios públicos (como ferrocarriles, teléfonos y gas) realizada por el Estado peronista?',
    answer:
      'Recuperar la soberanía económica, reducir la dependencia del capital extranjero y garantizar tarifas y logística que promovieran el desarrollo industrial y el consumo interno.',
    explanation:
      'Las nacionalizaciones buscaron garantizar infraestructura estratégica bajo control estatal, reduciendo la dependencia externa y apoyando el modelo de industrialización.',
    accent: 'jade',
  },
];

export const lessonArtifactPeronista: Artifact = {
  name: 'Pase de Tren Nacionalizado',
  rarity: 'LEGENDARIO',
  era: '1948',
  icon: Train,
  description:
    'Simboliza la nacionalización de la red ferroviaria y la soberanía económica alcanzada durante la planificación estatal peronista.',
};

export const lessonMetaPeronista = {
  module: 'Módulo 2',
  title: 'La economía peronista',
  subtitle: 'Industrialización, planificación y el rol del Estado',
  totalXp: 300,
  steps: [
    { id: 1, label: 'Contexto', icon: Factory },
    { id: 2, label: 'Tiempo', icon: Landmark },
    { id: 3, label: 'Quiz', icon: Vote },
  ],
};

// Step XP values (Step 1: 80, Step 2: 100, Step 3: 120 = 300 total)
export const stepXpPeronista: Record<number, number> = {
  1: 80,
  2: 100,
  3: 120,
};
