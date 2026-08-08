import {
  Scale,
  Megaphone,
  Vote,
  Newspaper,
  Scroll,
  Puzzle,
  Grid3x3,
  Check,
  MapPin,
  Brain,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import type {
  LoreSlide,
  TimelineEvent,
  QuizQuestion,
  Artifact,
  MatchPair,
  FillBlankExercise,
  CategoryDef,
  CategoryItem,
  TrueFalseItem,
  MapHotspot,
  MemoryCardData,
  SliderQuestion,
} from './lessonArgentina';

export const loreSlidesPolitica: LoreSlide[] = [
  {
    id: 1,
    title: 'La Reforma Constitucional de 1949',
    icon: Scale,
    tag: '1949',
    accent: 'gold',
    body: 'Una Convención Constituyente reunida en Santa Fe sancionó en 1949 una nueva Constitución que incorporó los derechos del trabajador, de la familia, de la ancianidad y de la educación, y consagró la función social de la propiedad, el capital y la actividad económica. También nacionalizó los servicios públicos y los recursos naturales, y habilitó la reelección presidencial, que Perón ejerció en 1951.',
  },
  {
    id: 2,
    title: 'El Voto Femenino',
    icon: Vote,
    tag: '1947',
    accent: 'ruby',
    body: 'En 1947 se sancionó la Ley 13.010, impulsada activamente por Eva Perón, que otorgó a las mujeres el derecho al voto y a ser elegidas. Eva organizó el Partido Peronista Femenino, con unidades básicas en todo el país. En 1951 las mujeres votaron por primera vez en elecciones nacionales, y decenas de legisladoras peronistas ingresaron al Congreso.',
  },
  {
    id: 3,
    title: 'Peronismo y Antiperonismo',
    icon: Megaphone,
    tag: '1946-1955',
    accent: 'jade',
    body: 'La sociedad argentina se dividió en dos identidades políticas enfrentadas. El peronismo se apoyaba en los sindicatos, la CGT y una fuerte movilización popular; la oposición reunía a radicales, socialistas, conservadores y comunistas, además de sectores empresarios, militares y de la Iglesia que se fueron distanciando del gobierno. El clima de confrontación marcó la vida cotidiana, la prensa y el lenguaje político de la época.',
  },
  {
    id: 4,
    title: 'Censura, Represión y el Fin de una Etapa',
    icon: Newspaper,
    tag: '1951-1955',
    accent: 'ember',
    body: 'El control estatal sobre los medios creció: en 1951 el diario opositor La Prensa fue expropiado. La polarización se agudizó hasta el bombardeo a Plaza de Mayo en junio de 1955, con cientos de muertos, y culminó en septiembre de 1955 con el golpe cívico-militar autodenominado Revolución Libertadora, que derrocó a Perón y lo obligó al exilio.',
  },
];

export const timelineEventsPolitica: TimelineEvent[] = [
  {
    id: 'voto47',
    label: 'Ley 13.010: derecho al voto femenino',
    date: '1947',
    year: 1947,
    emoji: '🗳️',
  },
  {
    id: 'constitucion49',
    label: 'Reforma de la Constitución Nacional',
    date: '1949',
    year: 1949,
    emoji: '📜',
  },
  {
    id: 'elecciones51',
    label: 'Primer voto femenino y reelección de Perón',
    date: '1951',
    year: 1951,
    emoji: '✅',
  },
  {
    id: 'libertadora55',
    label: 'Revolución Libertadora: derrocamiento de Perón',
    date: '1955',
    year: 1955,
    emoji: '⚔️',
  },
];

// ── Match Pairs ──────────────────────────────────────
export const matchPairsPolitica: MatchPair[] = [
  { id: 'ley13010', concept: 'Ley 13.010 (1947)', match: 'Derecho al voto y a ser elegidas para las mujeres' },
  { id: 'ppf', concept: 'Partido Peronista Femenino', match: 'Organización política liderada por Eva Perón' },
  { id: 'constitucion', concept: 'Constitución de 1949', match: 'Derechos sociales y habilitación de la reelección presidencial' },
  { id: 'laprensa', concept: 'Diario La Prensa', match: 'Medio opositor expropiado por el Estado en 1951' },
  { id: 'libertadora', concept: 'Revolución Libertadora', match: 'Golpe cívico-militar que derrocó a Perón en 1955' },
  { id: 'balbin', concept: 'Ricardo Balbín', match: 'Referente de la oposición radical' },
];

// ── Fill in the Blanks ──────────────────────────────
export const fillBlankExercisePolitica: FillBlankExercise = {
  prompt:
    'Completa el texto arrastrando o tocando la palabra correcta para cada espacio.',
  blanks: [
    { id: '1', textBefore: 'En 1947 se sancionó la ', textAfter: ', que otorgó el voto a las mujeres.', correct: 'Ley 13.010' },
    { id: '2', textBefore: 'La reforma constitucional de 1949 habilitó la ', textAfter: ' presidencial.', correct: 'reelección' },
    { id: '3', textBefore: 'En 1951 el diario opositor ', textAfter: ' fue expropiado por el Estado.', correct: 'La Prensa' },
    { id: '4', textBefore: 'Eva Perón organizó el ', textAfter: ' con unidades básicas en todo el país.', correct: 'Partido Peronista Femenino' },
    { id: '5', textBefore: 'En junio de 1955 se produjo el ', textAfter: ' a Plaza de Mayo.', correct: 'bombardeo' },
    { id: '6', textBefore: 'En septiembre de 1955, la ', textAfter: ' derrocó a Perón.', correct: 'Revolución Libertadora' },
  ],
  bank: [
    'Ley 13.010',
    'reelección',
    'La Prensa',
    'Partido Peronista Femenino',
    'bombardeo',
    'Revolución Libertadora',
    'Estatuto del Peón',
    'IAPI',
  ],
};

// ── Categorize ──────────────────────────────────────
export const categoriesPolitica: CategoryDef[] = [
  { id: 'reforma', label: 'Reforma Constitucional', accent: 'gold' },
  { id: 'participacion', label: 'Participación Política', accent: 'jade' },
  { id: 'polarizacion', label: 'Polarización y Represión', accent: 'ruby' },
];
export const categoryItemsPolitica: CategoryItem[] = [
  { id: 'p1', text: 'Función social de la propiedad', categoryId: 'reforma' },
  { id: 'p2', text: 'Nacionalización de servicios públicos', categoryId: 'reforma' },
  { id: 'p3', text: 'Habilitación de la reelección presidencial', categoryId: 'reforma' },
  { id: 'p4', text: 'Ley 13.010 de voto femenino', categoryId: 'participacion' },
  { id: 'p5', text: 'Partido Peronista Femenino', categoryId: 'participacion' },
  { id: 'p6', text: 'Legisladoras electas en 1951', categoryId: 'participacion' },
  { id: 'p7', text: 'Expropiación del diario La Prensa', categoryId: 'polarizacion' },
  { id: 'p8', text: 'Bombardeo a Plaza de Mayo', categoryId: 'polarizacion' },
  { id: 'p9', text: 'Revolución Libertadora', categoryId: 'polarizacion' },
];

// ── True/False Grid ──────────────────────────────────
export const trueFalseGridPolitica: TrueFalseItem[] = [
  { id: 'ptf1', statement: 'La Constitución de 1949 fue redactada por una Convención Constituyente reunida en la ciudad de Santa Fe.', answer: true, explanation: 'La Convención Constituyente sesionó en Santa Fe y sancionó la nueva Constitución en 1949.' },
  { id: 'ptf2', statement: 'La Ley 13.010 otorgó a las mujeres el derecho al voto, pero no el de ser elegidas.', answer: false, explanation: 'Falso: la ley reconoció tanto el derecho a votar como el de ser elegidas para cargos públicos.' },
  { id: 'ptf3', statement: 'En las elecciones de 1951, las mujeres votaron por primera vez en una elección presidencial argentina.', answer: true, explanation: 'Fue la primera elección nacional en la que las mujeres pudieron votar, tras la sanción de la Ley 13.010.' },
  { id: 'ptf4', statement: 'El diario La Prensa apoyaba al gobierno peronista y por eso recibió beneficios estatales.', answer: false, explanation: 'Al contrario: La Prensa era un medio opositor, y en 1951 fue expropiado por el Estado.' },
  { id: 'ptf5', statement: 'La oposición al peronismo incluía a radicales, socialistas, conservadores y comunistas.', answer: true, explanation: 'Distintas fuerzas políticas, junto a sectores empresarios, militares y eclesiásticos, integraron el frente antiperonista.' },
  { id: 'ptf6', statement: 'La Revolución Libertadora de 1955 fue un movimiento pacífico y sin oposición.', answer: false, explanation: 'Fue un golpe cívico-militar que incluyó el bombardeo a Plaza de Mayo y una fuerte represión antes de derrocar a Perón.' },
];

// ── Map Hotspot ──────────────────────────────────────
export const mapHotspotsPolitica: MapHotspot[] = [
  { id: 'santafe', label: 'Santa Fe', prompt: '¿Dónde sesionó la Convención Constituyente que reformó la Constitución en 1949?', x: 29, y: 57, radius: 8, explanation: 'La ciudad de Santa Fe fue sede de la Convención Constituyente de 1949.' },
  { id: 'plazamayo', label: 'Plaza de Mayo', prompt: '¿Dónde ocurrió el bombardeo de junio de 1955 durante el clima de polarización política?', x: 25, y: 73, radius: 7, explanation: 'Plaza de Mayo, en Buenos Aires, fue blanco del bombardeo de junio de 1955, con cientos de víctimas civiles.' },
  { id: 'cordoba', label: 'Córdoba', prompt: '¿Desde qué provincia partió el levantamiento militar que en septiembre de 1955 derrocó a Perón?', x: 19, y: 55, radius: 8, explanation: 'El levantamiento que derivó en la Revolución Libertadora tuvo un foco clave en Córdoba, bajo el mando del general Lonardi.' },
];

// ── Memory Cards ─────────────────────────────────────
export const memoryPairsPolitica: { id: string; a: string; b: string }[] = [
  { id: 'pm1', a: 'Ley 13.010', b: 'Voto femenino' },
  { id: 'pm2', a: 'Convención Constituyente', b: 'Santa Fe, 1949' },
  { id: 'pm3', a: 'La Prensa', b: 'Diario expropiado en 1951' },
  { id: 'pm4', a: 'Revolución Libertadora', b: 'Derrocamiento de Perón' },
];
export const memoryCardsPolitica: MemoryCardData[] = memoryPairsPolitica.flatMap((p) => [
  { id: `${p.id}-a`, pairId: p.id, text: p.a },
  { id: `${p.id}-b`, pairId: p.id, text: p.b },
]);

// ── Slider Estimate ──────────────────────────────────
export const sliderQuestionsPolitica: SliderQuestion[] = [
  { id: 'ps1', prompt: '¿En qué año se sancionó la Ley 13.010 del voto femenino?', min: 1940, max: 1950, correct: 1947, unit: '', tolerance: 1, explanation: 'La Ley 13.010 fue sancionada en 1947, a partir del impulso de Eva Perón.' },
  { id: 'ps2', prompt: '¿En qué año un golpe cívico-militar derrocó a Perón?', min: 1949, max: 1959, correct: 1955, unit: '', tolerance: 1, explanation: 'La Revolución Libertadora derrocó a Perón en septiembre de 1955.' },
];

export const quizQuestionsPolitica: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question:
      '¿Qué habilitó la reforma constitucional de 1949, además de incorporar derechos sociales?',
    options: [
      'La abolición del voto secreto.',
      'La reelección presidencial.',
      'La eliminación del Senado.',
      'El regreso al sistema de voto calificado.',
    ],
    correctIndex: 1,
    explanation:
      'La Constitución de 1949 eliminó la prohibición de reelección inmediata, lo que permitió a Perón presentarse nuevamente en 1951.',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'truefalse',
    question:
      'La Ley 13.010, sancionada en 1947, otorgó a las mujeres argentinas el derecho a votar y a ser elegidas.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Verdadero. Impulsada por Eva Perón, la ley reconoció ambos derechos políticos y se aplicó por primera vez en las elecciones de 1951.',
    accent: 'ruby',
  },
  {
    id: 3,
    type: 'multiple',
    question:
      '¿Qué caracterizó la relación entre peronismo y antiperonismo durante este período?',
    options: [
      'Una convivencia sin conflictos entre gobierno y oposición.',
      'Una fuerte polarización, con censura de medios opositores y creciente confrontación social.',
      'La disolución total de los partidos políticos opositores.',
      'La ausencia total de sindicatos en la vida política.',
    ],
    correctIndex: 1,
    explanation:
      'La sociedad se dividió en dos identidades enfrentadas; el control sobre la prensa opositora, como la expropiación de La Prensa, fue una expresión de esa polarización.',
    accent: 'jade',
  },
  {
    id: 4,
    type: 'flashcard',
    question:
      '¿Qué combinación de hechos condujo a la caída de Perón en 1955?',
    answer:
      'La creciente polarización política, el bombardeo a Plaza de Mayo en junio de 1955 y el golpe cívico-militar de septiembre de 1955 conocido como Revolución Libertadora.',
    explanation:
      'El deterioro del clima político derivó en un golpe de Estado que derrocó al gobierno peronista y obligó a Perón a exiliarse.',
    accent: 'ember',
  },
];

export const lessonArtifactPolitica: Artifact = {
  name: 'Libreta Cívica Femenina',
  rarity: 'LEGENDARIO',
  era: '1951',
  icon: Vote,
  description:
    'Simboliza la conquista del voto femenino y la primera participación de las mujeres en una elección presidencial argentina.',
};

export const lessonMetaPolitica = {
  module: 'Módulo 4',
  title: 'La vida política, la Constitución de 1949 y la polarización',
  subtitle: 'Reforma constitucional, voto femenino y la creciente polarización política',
  totalXp: 800,
  steps: [
    { id: 1, label: 'Contexto', icon: Scale },
    { id: 2, label: 'Tiempo', icon: Megaphone },
    { id: 3, label: 'Pares', icon: Scroll },
    { id: 4, label: 'Completar', icon: Puzzle },
    { id: 5, label: 'Categorías', icon: Grid3x3 },
    { id: 6, label: 'V/F', icon: Check },
    { id: 7, label: 'Mapa', icon: MapPin },
    { id: 8, label: 'Memoria', icon: Brain },
    { id: 9, label: 'Estimar', icon: SlidersHorizontal },
    { id: 10, label: 'Quiz', icon: Vote },
  ] as { id: number; label: string; icon: LucideIcon }[],
};

// Step XP values (60+80+80+80+80+80+70+70+60+140 = 800 total)
export const stepXpPolitica: Record<number, number> = {
  1: 60,
  2: 80,
  3: 80,
  4: 80,
  5: 80,
  6: 80,
  7: 70,
  8: 70,
  9: 60,
  10: 140,
};
