import {
  TrendingDown,
  Factory,
  Users,
  Landmark,
  Megaphone,
  Vote,
  Globe,
  Wrench,
  Scroll,
  Scale,
  MapPin,
  Brain,
  SlidersHorizontal,
  Grid3x3,
  Puzzle,
  Target,
  Check,
  type LucideIcon,
} from 'lucide-react';

export interface LoreSlide {
  id: number;
  title: string;
  icon: LucideIcon;
  body: string;
  tag: string;
  accent: 'gold' | 'ember' | 'jade' | 'ruby';
}

export const loreSlides: LoreSlide[] = [
  {
    id: 1,
    title: 'La Crisis de 1930',
    icon: TrendingDown,
    tag: '1930',
    accent: 'ruby',
    body: 'La Gran Depresión de 1929 derrumbó los precios de las exportaciones agropecuarias. El modelo agroexportador, pilar de la economía argentina desde fines del siglo XIX, entró en crisis: menores divisas, desempleo rural y contracción del comercio mundial marcaron el fin de una era de prosperidad basada en la venta de carne y cereales a Europa.',
  },
  {
    id: 2,
    title: 'ISI y Migraciones Internas',
    icon: Factory,
    tag: '1930s',
    accent: 'gold',
    body: 'La imposibilidad de importar bienes empujó al país hacia la Industrialización por Sustitución de Importaciones (ISI): se fabricaban ahora en el país los productos que antes llegaban del exterior. Las nuevas fábricas, concentradas en Gran Buenos Aires, atrajeron a miles de trabajadores desde las zonas rurales del interior en una masiva migración interna que transformó la geografía social argentina.',
  },
  {
    id: 3,
    title: 'Golpe de 1943 y Perón',
    icon: Users,
    tag: '1943-45',
    accent: 'ember',
    body: 'En junio de 1943 el Grupo de Oficiales Unidos (GOU) tomó el poder. Dentro del nuevo gobierno, el coronel Juan Domingo Perón fue designado al frente de la Secretaría de Trabajo y Previsión. Desde allí desplegó una vasta política de derechos laborales: estatutos, convenios colectivos, tribunales del trabajo y agremiación, construyendo un vínculo directo con la clase trabajadora.',
  },
  {
    id: 4,
    title: '17 de Octubre de 1945 y Elecciones 1946',
    icon: Megaphone,
    tag: '1945-46',
    accent: 'jade',
    body: 'Perón fue arrestado el 12 de octubre de 1945. El 17 de octubre, cientos de miles de trabajadores marcharon a Plaza de Mayo para exigir su liberación. Liberado y respaldado por el movimiento obrero, Perón concurrió a las elecciones de febrero de 1946 con la fórmula Perón-Quijano y triunfó sobre la Unión Democrática, inaugurando una nueva etapa política.',
  },
  {
    id: 5,
    title: 'El Contexto Mundial',
    icon: Globe,
    tag: '1929-1946',
    accent: 'gold',
    body: 'El período estuvo atravesado por la crisis de 1929, el ascenso del fascismo, la Segunda Guerra Mundial (1939-1945) y la reconfiguración del orden global. Argentina declaró la guerra al Eje en marzo de 1945, tarde pero decisivo para su inserción postwar. La guerra también reforzó la ISI: las industrias nacionales sustituyeron importaciones cortadas por el conflicto.',
  },
  {
    id: 6,
    title: 'Derechos Laborales y Estatuto del Peón',
    icon: Scale,
    tag: '1944',
    accent: 'ember',
    body: 'En 1944 Perón impulsó el Estatuto del Peón Rural, que regulaba condiciones de trabajo en el campo: jornada, descanso, alimentación, alojamiento y estabilidad. Junto con convenios colectivos, tribunales del trabajo y el sufragio femenino (que llegaría en 1947), estas medidas consolidaron el nuevo vínculo entre el Estado y los trabajadores.',
  },
];

export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
  year: number;
  emoji: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'agro',
    label: 'Caída del Modelo Agroexportador',
    date: '1930',
    year: 1930,
    emoji: '🌾',
  },
  {
    id: 'gou',
    label: 'Golpe del GOU y Perón en Secretaría de Trabajo',
    date: '1943',
    year: 1943,
    emoji: '🎖️',
  },
  {
    id: 'plaza',
    label: 'Movilización Obrera a Plaza de Mayo',
    date: '17 Oct 1945',
    year: 1945,
    emoji: '📢',
  },
  {
    id: 'voto',
    label: 'Triunfo electoral de la fórmula Perón-Quijano',
    date: 'Feb 1946',
    year: 1946,
    emoji: '🗳️',
  },
];

export interface MatchPair {
  id: string;
  concept: string;
  match: string;
}

export const matchPairs: MatchPair[] = [
  { id: 'isi', concept: 'ISI', match: 'Sustitución de importaciones' },
  { id: 'gou', concept: 'GOU', match: 'Golpe militar de 1943' },
  { id: 'stp', concept: 'Secretaría de Trabajo y Previsión', match: 'Perón y los derechos laborales' },
  { id: 'plaza', concept: '17 de Octubre de 1945', match: 'Movilización obrera a Plaza de Mayo' },
  { id: 'estatuto', concept: 'Estatuto del Peón', match: 'Derechos del trabajador rural (1944)' },
  { id: 'ud', concept: 'Unión Democrática', match: 'Oposición derrotada en 1946' },
];

export type QuizType = 'multiple' | 'truefalse' | 'flashcard';

export interface QuizQuestion {
  id: number;
  type: QuizType;
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation: string;
  answer?: string;
  accent: 'gold' | 'ember' | 'jade' | 'ruby';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: '¿Cuál fue el motivo principal por el cual se inició el proceso de ISI en Argentina?',
    options: [
      'La falta de mano de obra en el campo.',
      'La caída de las exportaciones y la imposibilidad de importar bienes por la Gran Depresión de 1929.',
      'La promulgación del Estatuto del Peón.',
      'El triunfo de la Unión Democrática.',
    ],
    correctIndex: 1,
    explanation:
      'La Gran Depresión redujo las exportaciones, lo que obligó a fabricar industrialmente dentro del país los productos que antes se importaban.',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'truefalse',
    question:
      'Las migraciones internas ocurridas en la década de 1930 se dieron principalmente desde las grandes ciudades hacia las zonas rurales.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation:
      'Falso. Fueron migraciones internas del campo a la ciudad por empleo en las nuevas fábricas.',
    accent: 'ember',
  },
  {
    id: 3,
    type: 'multiple',
    question:
      '¿Desde qué organismo Juan Domingo Perón comenzó a construir su vínculo con los trabajadores entre 1943 y 1945?',
    options: [
      'Ministerio de Hacienda.',
      'Secretaría de Trabajo y Previsión.',
      'Congreso de la Nación.',
      'Partido Laborista.',
    ],
    correctIndex: 1,
    explanation:
      'Desde la Secretaría de Trabajo y Previsión, Perón impulsó estatutos, convenios colectivos y la agremiación de los trabajadores.',
    accent: 'ruby',
  },
  {
    id: 4,
    type: 'flashcard',
    question:
      '¿Qué hecho histórico acontecido el 17 de octubre de 1945 marcó la irrupción masiva de la clase trabajadora?',
    answer:
      'La masiva movilización popular a Plaza de Mayo efectuada por los trabajadores para exigir la liberación de Perón.',
    explanation:
      'El 17 de octubre de 1945, cientos de miles de trabajadores ocuparon Plaza de Mayo exigiendo la libertad de Perón, marcando la irrupción política de la clase trabajadora.',
    accent: 'jade',
  },
  {
    id: 5,
    type: 'multiple',
    question:
      '¿Qué medida de 1944 reguló las condiciones de trabajo rural en Argentina?',
    options: [
      'La Ley Sáenz Peña.',
      'El Estatuto del Peón Rural.',
      'La Ley de Residencia.',
      'El Pacto Roca-Runciman.',
    ],
    correctIndex: 1,
    explanation:
      'El Estatuto del Peón Rural de 1944 estableció jornada, descanso, alimentación, alojamiento y estabilidad para los trabajadores rurales.',
    accent: 'ember',
  },
  {
    id: 6,
    type: 'truefalse',
    question:
      'En las elecciones de febrero de 1946, la fórmula Perón-Quijano fue derrotada por la Unión Democrática.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation:
      'Falso. La fórmula Perón-Quijano triunfó sobre la Unión Democrática en las elecciones de febrero de 1946.',
    accent: 'jade',
  },
  {
    id: 7,
    type: 'multiple',
    question: '¿Qué conflicto internacional reforzó la ISI al cortar las importaciones?',
    options: [
      'La Guerra de las Malvinas.',
      'La Guerra Fría.',
      'La Segunda Guerra Mundial (1939-1945).',
      'La Revolución Cubana.',
    ],
    correctIndex: 2,
    explanation:
      'La Segunda Guerra Mundial interrumpió el comercio internacional, reforzando la necesidad de producir localmente los bienes que no podían importarse.',
    accent: 'ruby',
  },
  {
    id: 8,
    type: 'flashcard',
    question:
      '¿Qué nombre recibió el grupo de militares que tomó el poder en el golpe de junio de 1943?',
    answer:
      'GOU (Grupo de Oficiales Unidos), también conocido como "el Grupo".',
    explanation:
      'El GOU fue una logia militar que derrocó al presidente Castillo en junio de 1943, abriendo camino a la influencia política de Perón.',
    accent: 'gold',
  },
];

export interface Artifact {
  name: string;
  rarity: 'LEGENDARIO';
  era: string;
  icon: LucideIcon;
  description: string;
}

export const lessonArtifact: Artifact = {
  name: 'Sello de Plaza de Mayo',
  rarity: 'LEGENDARIO',
  era: '17 OCT 1945',
  icon: Megaphone,
  description:
    'Conmemora la movilización obrera que exigió la liberación de Perón y marcó la irrupción política de la clase trabajadora en Argentina.',
};

export const lessonMeta = {
  module: 'Módulo 1',
  title: 'Argentina (1930 - 1946)',
  subtitle: 'De la Crisis del 30 al surgimiento del peronismo',
  totalXp: 800,
  steps: [
    { id: 1, label: 'Contexto', icon: Landmark },
    { id: 2, label: 'Tiempo', icon: TrendingDown },
    { id: 3, label: 'Pares', icon: Scroll },
    { id: 4, label: 'Blanks', icon: Puzzle },
    { id: 5, label: 'Categorías', icon: Grid3x3 },
    { id: 6, label: 'V/F', icon: Check },
    { id: 7, label: 'Mapa', icon: MapPin },
    { id: 8, label: 'Memoria', icon: Brain },
    { id: 9, label: 'Estimar', icon: SlidersHorizontal },
    { id: 10, label: 'Quiz', icon: Vote },
  ],
};

// ── Fill in the Blanks ──────────────────────────────
export interface FillBlankItem {
  id: string;
  textBefore: string;
  textAfter: string;
  correct: string;
}
export interface FillBlankExercise {
  prompt: string;
  blanks: FillBlankItem[];
  bank: string[];
}
export const fillBlankExercise: FillBlankExercise = {
  prompt:
    'Completa el texto arrastrando o tocando la palabra correcta para cada espacio.',
  blanks: [
    { id: '1', textBefore: 'La ', textAfter: ' de 1929 provocó la caída del modelo', correct: 'Gran Depresión' },
    { id: '2', textBefore: 'modelo ', textAfter: '. La imposibilidad de importar impulsó la', correct: 'agroexportador' },
    { id: '3', textBefore: 'impulsó la ', textAfter: '. Perón, desde la', correct: 'ISI' },
    { id: '4', textBefore: 'desde la ', textAfter: ', consolidó los derechos laborales.', correct: 'Secretaría de Trabajo' },
    { id: '5', textBefore: 'El ', textAfter: ' de 1945 marcó la irrupción obrera en', correct: '17 de Octubre' },
    { id: '6', textBefore: 'en ', textAfter: '.', correct: 'Plaza de Mayo' },
  ],
  bank: [
    'Gran Depresión',
    'agroexportador',
    'ISI',
    'Secretaría de Trabajo',
    '17 de Octubre',
    'Plaza de Mayo',
    'Unión Democrática',
    'Estatuto del Peón',
  ],
};

// ── Categorize ──────────────────────────────────────
export interface CategoryDef {
  id: string;
  label: string;
  accent: 'gold' | 'ember' | 'jade' | 'ruby';
}
export interface CategoryItem {
  id: string;
  text: string;
  categoryId: string;
}
export const categories: CategoryDef[] = [
  { id: 'economy', label: 'Economía', accent: 'gold' },
  { id: 'labor', label: 'Derechos Laborales', accent: 'ember' },
  { id: 'politics', label: 'Política', accent: 'jade' },
];
export const categoryItems: CategoryItem[] = [
  { id: 'c1', text: 'ISI', categoryId: 'economy' },
  { id: 'c2', text: 'Modelo agroexportador', categoryId: 'economy' },
  { id: 'c3', text: 'Gran Depresión de 1929', categoryId: 'economy' },
  { id: 'c4', text: 'Estatuto del Peón Rural', categoryId: 'labor' },
  { id: 'c5', text: 'Convenios colectivos', categoryId: 'labor' },
  { id: 'c6', text: 'Tribunales del trabajo', categoryId: 'labor' },
  { id: 'c7', text: 'Golpe del GOU (1943)', categoryId: 'politics' },
  { id: 'c8', text: '17 de Octubre de 1945', categoryId: 'politics' },
  { id: 'c9', text: 'Elecciones de febrero de 1946', categoryId: 'politics' },
];

// ── True/False Grid ──────────────────────────────────
export interface TrueFalseItem {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
}
export const trueFalseGrid: TrueFalseItem[] = [
  { id: 'tf1', statement: 'La Gran Depresión de 1929 afectó las exportaciones argentinas.', answer: true, explanation: 'Los precios internacionales de carnes y cereales cayeron drásticamente.' },
  { id: 'tf2', statement: 'La ISI consistió en exportar más productos industriales.', answer: false, explanation: 'La ISI consistió en producir localmente lo que antes se importaba.' },
  { id: 'tf3', statement: 'Las migraciones internas fueron del campo a la ciudad.', answer: true, explanation: 'Los trabajadores rurales se trasladaron a Gran Buenos Aires por las fábricas.' },
  { id: 'tf4', statement: 'El GOU fue un grupo de civiles que tomó el poder en 1943.', answer: false, explanation: 'El GOU fue una logia militar, no civil.' },
  { id: 'tf5', statement: 'Perón fue arrestado antes del 17 de Octubre de 1945.', answer: true, explanation: 'Perón fue arrestado el 12 de octubre de 1945.' },
  { id: 'tf6', statement: 'La Unión Democrática triunfó en las elecciones de 1946.', answer: false, explanation: 'La fórmula Perón-Quijano derrotó a la Unión Democrática.' },
];

// ── Map Hotspot ──────────────────────────────────────
export interface MapHotspot {
  id: string;
  label: string;
  prompt: string;
  x: number;
  y: number;
  radius: number;
  explanation: string;
}
export const mapHotspots: MapHotspot[] = [
  { id: 'bsas', label: 'Buenos Aires', prompt: '¿Hacia dónde se dirigieron las migraciones internas durante la ISI?', x: 26, y: 72, radius: 9, explanation: 'Las fábricas de Gran Buenos Aires atrajeron a los trabajadores del interior.' },
  { id: 'pampa', label: 'Región Pampeana', prompt: '¿Qué región fue el corazón del modelo agroexportador?', x: 28, y: 64, radius: 10, explanation: 'La Pampa Húmeda producía cereales y carnes para la exportación a Europa.' },
  { id: 'plaza', label: 'Plaza de Mayo', prompt: '¿Dónde se concentró la movilización obrera del 17 de Octubre de 1945?', x: 25, y: 73, radius: 7, explanation: 'Cientos de miles de trabajadores ocuparon Plaza de Mayo exigiendo la libertad de Perón.' },
];

// ── Memory Cards ─────────────────────────────────────
export interface MemoryCardData {
  id: string;
  pairId: string;
  text: string;
}
export const memoryPairs: { id: string; a: string; b: string }[] = [
  { id: 'm1', a: 'ISI', b: 'Sustitución de importaciones' },
  { id: 'm2', a: 'GOU', b: 'Golpe de 1943' },
  { id: 'm3', a: 'Estatuto del Peón', b: '1944' },
  { id: 'm4', a: '17 de Octubre', b: 'Plaza de Mayo' },
];
export const memoryCards: MemoryCardData[] = memoryPairs.flatMap((p) => [
  { id: `${p.id}-a`, pairId: p.id, text: p.a },
  { id: `${p.id}-b`, pairId: p.id, text: p.b },
]);

// ── Slider Estimate ──────────────────────────────────
export interface SliderQuestion {
  id: string;
  prompt: string;
  min: number;
  max: number;
  correct: number;
  unit: string;
  tolerance: number;
  explanation: string;
}
export const sliderQuestions: SliderQuestion[] = [
  { id: 's1', prompt: '¿En qué año comenzó la Gran Depresión que impactó a Argentina?', min: 1910, max: 1940, correct: 1929, unit: '', tolerance: 1, explanation: 'La crisis estalló en octubre de 1929 con el crack de la Bolsa de Nueva York.' },
  { id: 's2', prompt: '¿En qué año se promulgó el Estatuto del Peón Rural?', min: 1940, max: 1948, correct: 1944, unit: '', tolerance: 1, explanation: 'El Estatuto del Peón Rural fue promulgado en 1944 bajo impulso de Perón.' },
];

export const accentClasses = {
  gold: {
    border: 'border-gold-400',
    text: 'text-gold-300',
    bg: 'bg-gold-400',
    bgSoft: 'bg-gold-400/15',
    borderSoft: 'border-gold-400/40',
    textSoft: 'text-gold-200',
    shadow: 'shadow-pixel-gold',
  },
  ember: {
    border: 'border-ember-400',
    text: 'text-ember-300',
    bg: 'bg-ember-400',
    bgSoft: 'bg-ember-400/15',
    borderSoft: 'border-ember-400/40',
    textSoft: 'text-ember-300',
    shadow: 'shadow-[4px_4px_0_0_#b8430e]',
  },
  jade: {
    border: 'border-jade-400',
    text: 'text-jade-300',
    bg: 'bg-jade-400',
    bgSoft: 'bg-jade-400/15',
    borderSoft: 'border-jade-400/40',
    textSoft: 'text-jade-300',
    shadow: 'shadow-[4px_4px_0_0_#16a06b]',
  },
  ruby: {
    border: 'border-ruby-400',
    text: 'text-ruby-300',
    bg: 'bg-ruby-400',
    bgSoft: 'bg-ruby-400/15',
    borderSoft: 'border-ruby-400/40',
    textSoft: 'text-ruby-300',
    shadow: 'shadow-[4px_4px_0_0_#c92d44]',
  },
} as const;

export type AccentKey = keyof typeof accentClasses;
