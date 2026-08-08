import {
  ShieldAlert,
  Flame,
  Vote,
  Skull,
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

export const loreSlidesResistencia: LoreSlide[] = [
  {
    id: 1,
    title: 'La Revolución Libertadora',
    icon: ShieldAlert,
    tag: '1955',
    accent: 'ember',
    body: 'Tras el bombardeo a Plaza de Mayo, el golpe cívico-militar triunfó el 16 de septiembre de 1955. El general Eduardo Lonardi asumió con la consigna "ni vencedores ni vencidos", buscando integrar a los sectores peronistas moderados. Sin embargo, en noviembre fue desplazado por el general Pedro Eugenio Aramburu, referente de la línea más dura contra el peronismo.',
  },
  {
    id: 2,
    title: 'La Proscripción del Peronismo',
    icon: Scroll,
    tag: '1956',
    accent: 'gold',
    body: 'En marzo de 1956 el gobierno de facto dictó el Decreto 4161, que prohibió nombrar a Perón, usar sus imágenes, símbolos, marchas y hasta las palabras "peronismo" o "justicialismo". El Partido Peronista fue disuelto, se intervinieron los sindicatos y la CGT, y miles de militantes y dirigentes fueron perseguidos, presos o exonerados de sus empleos.',
  },
  {
    id: 3,
    title: 'Los Fusilamientos de José León Suárez',
    icon: Skull,
    tag: '1956',
    accent: 'ruby',
    body: 'En junio de 1956, tras el fallido levantamiento del general Juan José Valle contra el gobierno de Aramburu, se aplicó la ley marcial. Un grupo de civiles y militares fue fusilado sin juicio previo en los basurales de José León Suárez; algunos lograron escapar y sobrevivir. El propio general Valle fue fusilado poco después. Estos hechos inspiraron años más tarde el libro "Operación Masacre" de Rodolfo Walsh.',
  },
  {
    id: 4,
    title: 'La Resistencia Peronista',
    icon: Flame,
    tag: '1955-1958',
    accent: 'jade',
    body: 'Ante la proscripción, surgió una resistencia clandestina de obreros y militantes: sabotajes en fábricas, pintadas, panfletos y paros sorpresivos. John William Cooke, designado por Perón como su delegado, se convirtió en la máxima referencia política de la Resistencia desde la clandestinidad. En 1955 el cuerpo de Eva Perón fue secuestrado por el gobierno de facto y ocultado durante años, convirtiéndose en símbolo de esa lucha.',
  },
];

export const timelineEventsResistencia: TimelineEvent[] = [
  {
    id: 'libertadora55',
    label: 'Triunfa la Revolución Libertadora, asume Lonardi',
    date: 'Sept. 1955',
    year: 1955,
    emoji: '⚔️',
  },
  {
    id: 'aramburu55',
    label: 'Aramburu desplaza a Lonardi',
    date: 'Nov. 1955',
    year: 1955,
    emoji: '🪖',
  },
  {
    id: 'decreto56',
    label: 'Decreto 4161: se prohíbe el peronismo',
    date: '1956',
    year: 1956,
    emoji: '🚫',
  },
  {
    id: 'fusilamientos56',
    label: 'Levantamiento de Valle y fusilamientos de José León Suárez',
    date: 'Jun. 1956',
    year: 1956,
    emoji: '☠️',
  },
];

// ── Match Pairs ──────────────────────────────────────
export const matchPairsResistencia: MatchPair[] = [
  { id: 'lonardi', concept: 'Eduardo Lonardi', match: '"Ni vencedores ni vencidos"' },
  { id: 'aramburu', concept: 'Pedro Eugenio Aramburu', match: 'Línea dura, endureció la proscripción del peronismo' },
  { id: 'decreto4161', concept: 'Decreto 4161/56', match: 'Prohibición de nombrar a Perón y usar símbolos peronistas' },
  { id: 'valle', concept: 'Juan José Valle', match: 'General fusilado tras su levantamiento de 1956' },
  { id: 'cooke', concept: 'John William Cooke', match: 'Delegado de Perón, referente de la Resistencia' },
  { id: 'walsh', concept: 'Rodolfo Walsh', match: 'Autor de "Operación Masacre" sobre los fusilamientos de 1956' },
];

// ── Fill in the Blanks ──────────────────────────────
export const fillBlankExerciseResistencia: FillBlankExercise = {
  prompt:
    'Completa el texto arrastrando o tocando la palabra correcta para cada espacio.',
  blanks: [
    { id: '1', textBefore: 'El general ', textAfter: ' asumió tras el golpe con la consigna "ni vencedores ni vencidos".', correct: 'Lonardi' },
    { id: '2', textBefore: 'En noviembre de 1955, el general ', textAfter: ' reemplazó a Lonardi con una línea más dura.', correct: 'Aramburu' },
    { id: '3', textBefore: 'El ', textAfter: ' prohibió nombrar a Perón y usar símbolos peronistas.', correct: 'Decreto 4161' },
    { id: '4', textBefore: 'Tras el levantamiento del general Valle, se produjeron los fusilamientos de ', textAfter: '.', correct: 'José León Suárez' },
    { id: '5', textBefore: 'John William Cooke fue designado por Perón como su ', textAfter: ' durante la clandestinidad.', correct: 'delegado' },
    { id: '6', textBefore: 'El cuerpo de ', textAfter: ' fue secuestrado por el gobierno de facto en 1955.', correct: 'Eva Perón' },
  ],
  bank: [
    'Lonardi',
    'Aramburu',
    'Decreto 4161',
    'José León Suárez',
    'delegado',
    'Eva Perón',
    'Ley 13.010',
    'IAPI',
  ],
};

// ── Categorize ──────────────────────────────────────
export const categoriesResistencia: CategoryDef[] = [
  { id: 'gobierno', label: 'Gobierno de la Libertadora', accent: 'ember' },
  { id: 'proscripcion', label: 'Proscripción y Represión', accent: 'ruby' },
  { id: 'resistencia', label: 'La Resistencia Peronista', accent: 'jade' },
];
export const categoryItemsResistencia: CategoryItem[] = [
  { id: 'r1', text: 'Eduardo Lonardi', categoryId: 'gobierno' },
  { id: 'r2', text: 'Pedro Eugenio Aramburu', categoryId: 'gobierno' },
  { id: 'r3', text: '"Ni vencedores ni vencidos"', categoryId: 'gobierno' },
  { id: 'r4', text: 'Decreto 4161/56', categoryId: 'proscripcion' },
  { id: 'r5', text: 'Fusilamientos de José León Suárez', categoryId: 'proscripcion' },
  { id: 'r6', text: 'Intervención de la CGT y los sindicatos', categoryId: 'proscripcion' },
  { id: 'r7', text: 'John William Cooke', categoryId: 'resistencia' },
  { id: 'r8', text: 'Sabotajes y paros sorpresivos', categoryId: 'resistencia' },
  { id: 'r9', text: 'Ocultamiento del cuerpo de Eva Perón', categoryId: 'resistencia' },
];

// ── True/False Grid ──────────────────────────────────
export const trueFalseGridResistencia: TrueFalseItem[] = [
  { id: 'rtf1', statement: 'Eduardo Lonardi fue el primer presidente de facto tras el golpe de 1955 y buscaba una salida más conciliadora con el peronismo.', answer: true, explanation: 'Su lema "ni vencedores ni vencidos" reflejaba esa intención, aunque fue desplazado a los pocos meses.' },
  { id: 'rtf2', statement: 'El Decreto 4161 de 1956 permitió que el peronismo siguiera actuando como partido político legal.', answer: false, explanation: 'Al contrario: el decreto prohibió al Partido Peronista y penalizó el uso de símbolos, imágenes y hasta el nombre "peronismo".' },
  { id: 'rtf3', statement: 'Los fusilamientos de José León Suárez de 1956 se produjeron bajo la ley marcial, sin juicio previo para las víctimas.', answer: true, explanation: 'Fueron ejecutados sumariamente tras el levantamiento fallido del general Valle, hecho narrado por Rodolfo Walsh en "Operación Masacre".' },
  { id: 'rtf4', statement: 'John William Cooke se convirtió en el delegado personal de Perón durante la clandestinidad de la Resistencia.', answer: true, explanation: 'Perón lo designó como su representante político en Argentina mientras él permanecía en el exilio.' },
  { id: 'rtf5', statement: 'El cuerpo de Eva Perón permaneció siempre expuesto públicamente en la CGT tras su muerte.', answer: false, explanation: 'Falso: en 1955 el gobierno de facto lo hizo desaparecer y lo mantuvo oculto durante años, lejos del país.' },
  { id: 'rtf6', statement: 'La Resistencia Peronista incluyó sabotajes en fábricas, panfleteadas y paros sorpresivos organizados desde la clandestinidad.', answer: true, explanation: 'Fue una forma de oposición obrera y militante frente a la proscripción del peronismo.' },
];

// ── Map Hotspot ──────────────────────────────────────
export const mapHotspotsResistencia: MapHotspot[] = [
  { id: 'joseleonsuarez', label: 'José León Suárez', prompt: '¿Dónde se produjeron los fusilamientos clandestinos de junio de 1956?', x: 26, y: 71, radius: 7, explanation: 'En los basurales de José León Suárez, en el Gran Buenos Aires, fue fusilado un grupo de civiles y militares sin juicio previo.' },
  { id: 'casarosada', label: 'Casa Rosada', prompt: '¿Desde dónde gobernaron Lonardi y luego Aramburu tras el golpe de 1955?', x: 25, y: 73, radius: 7, explanation: 'La Casa Rosada, sede del gobierno nacional en Buenos Aires, fue el centro del poder de la Revolución Libertadora.' },
  { id: 'rosario', label: 'Rosario', prompt: '¿En qué polo industrial del interior también se organizaron sabotajes y paros de la Resistencia Peronista?', x: 29, y: 62, radius: 8, explanation: 'Rosario, con fuerte presencia obrera e industrial, fue otro foco de la Resistencia Peronista clandestina.' },
];

// ── Memory Cards ─────────────────────────────────────
export const memoryPairsResistencia: { id: string; a: string; b: string }[] = [
  { id: 'rm1', a: 'Lonardi', b: 'Ni vencedores ni vencidos' },
  { id: 'rm2', a: 'Decreto 4161', b: 'Prohibición del peronismo' },
  { id: 'rm3', a: 'José León Suárez', b: 'Fusilamientos de 1956' },
  { id: 'rm4', a: 'John William Cooke', b: 'Delegado de Perón' },
];
export const memoryCardsResistencia: MemoryCardData[] = memoryPairsResistencia.flatMap((p) => [
  { id: `${p.id}-a`, pairId: p.id, text: p.a },
  { id: `${p.id}-b`, pairId: p.id, text: p.b },
]);

// ── Slider Estimate ──────────────────────────────────
export const sliderQuestionsResistencia: SliderQuestion[] = [
  { id: 'rs1', prompt: '¿En qué año triunfó la Revolución Libertadora y cayó Perón?', min: 1950, max: 1960, correct: 1955, unit: '', tolerance: 1, explanation: 'El golpe cívico-militar triunfó en septiembre de 1955.' },
  { id: 'rs2', prompt: '¿En qué año se dictó el Decreto 4161 y ocurrieron los fusilamientos de José León Suárez?', min: 1953, max: 1960, correct: 1956, unit: '', tolerance: 1, explanation: 'Ambos hechos ocurrieron en 1956, durante el gobierno de Aramburu.' },
];

export const quizQuestionsResistencia: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question:
      '¿Qué cambio se produjo en noviembre de 1955 dentro del gobierno de la Revolución Libertadora?',
    options: [
      'Perón regresó al poder tras un acuerdo con los militares.',
      'Aramburu reemplazó a Lonardi, endureciendo la política antiperonista.',
      'Se convocó de inmediato a elecciones libres sin proscripciones.',
      'Se restituyó la Constitución de 1949.',
    ],
    correctIndex: 1,
    explanation:
      'Lonardi, más conciliador, fue desplazado por Aramburu, referente de una línea mucho más dura contra el peronismo.',
    accent: 'ember',
  },
  {
    id: 2,
    type: 'truefalse',
    question:
      'El Decreto 4161 de 1956 prohibió mencionar el nombre de Perón y utilizar símbolos, marchas o imágenes peronistas.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Verdadero. La proscripción alcanzó incluso al uso de las palabras "peronismo" y "justicialismo" en el discurso público.',
    accent: 'gold',
  },
  {
    id: 3,
    type: 'multiple',
    question:
      '¿Qué relación existe entre el levantamiento del general Valle y los fusilamientos de José León Suárez?',
    options: [
      'No tienen ninguna relación entre sí.',
      'Tras el fallido levantamiento de Valle, se aplicó la ley marcial y se fusiló a un grupo de civiles y militares sin juicio previo.',
      'Los fusilamientos ocurrieron antes del levantamiento de Valle.',
      'Valle lideró personalmente los fusilamientos.',
    ],
    correctIndex: 1,
    explanation:
      'El intento insurreccional de Valle en junio de 1956 fue la excusa para aplicar la ley marcial y ejecutar sumariamente a los detenidos en José León Suárez.',
    accent: 'ruby',
  },
  {
    id: 4,
    type: 'flashcard',
    question:
      '¿Qué papel cumplió John William Cooke durante la Resistencia Peronista?',
    answer:
      'Fue designado por Perón como su delegado político en Argentina y se convirtió en la principal referencia de la Resistencia clandestina frente a la proscripción del peronismo.',
    explanation:
      'Desde la clandestinidad, Cooke organizó y dio dirección política a la resistencia obrera y militante durante estos años.',
    accent: 'jade',
  },
];

export const lessonArtifactResistencia: Artifact = {
  name: 'Panfleto Clandestino de la Resistencia',
  rarity: 'LEGENDARIO',
  era: '1956',
  icon: Flame,
  description:
    'Símbolo de la lucha clandestina de la Resistencia Peronista frente a la proscripción, la censura y la represión de la Revolución Libertadora.',
};

export const lessonMetaResistencia = {
  module: 'Módulo 5',
  title: 'El golpe de 1955, la Revolución Libertadora y la Resistencia Peronista',
  subtitle: 'Proscripción, represión y resistencia clandestina tras la caída de Perón',
  totalXp: 800,
  steps: [
    { id: 1, label: 'Contexto', icon: ShieldAlert },
    { id: 2, label: 'Tiempo', icon: Flame },
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
export const stepXpResistencia: Record<number, number> = {
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
