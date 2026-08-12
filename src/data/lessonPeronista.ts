import {
  Factory,
  Landmark,
  Train,
  Wheat,
  Vote,
  Check,
  Scroll,
  Puzzle,
  Grid3x3,
  MapPin,
  Brain,
  SlidersHorizontal,
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

// ── Match Pairs ──────────────────────────────────────
export const matchPairsPeronista: MatchPair[] = [
  { id: 'iapi', concept: 'IAPI', match: 'Centralizaba y monopolizaba el comercio exterior' },
  { id: 'pq', concept: 'Plan Quinquenal', match: 'Planificación estatal de la economía' },
  { id: 'nac', concept: 'Nacionalización', match: 'El Estado toma control de servicios estratégicos' },
  { id: 'mi', concept: 'Mercado Interno', match: 'Impulsado por el aumento del salario real' },
  { id: 'cge', concept: 'CGE', match: 'Confederación General Económica, empresarios nacionales' },
  { id: 'giro', concept: 'Giro al Campo', match: 'Reorientación hacia las exportaciones agrícolas (1953)' },
];

// ── Fill in the Blanks ──────────────────────────────
export const fillBlankExercisePeronista: FillBlankExercise = {
  prompt:
    'Completa el texto arrastrando o tocando la palabra correcta para cada espacio.',
  blanks: [
    { id: '1', textBefore: 'El primer gobierno peronista impulsó el aumento de los ', textAfter: ' para fortalecer el mercado interno.', correct: 'salarios reales' },
    { id: '2', textBefore: 'Se creó el ', textAfter: ' para centralizar el comercio exterior.', correct: 'IAPI' },
    { id: '3', textBefore: 'En 1948 se nacionalizaron los ', textAfter: '.', correct: 'ferrocarriles' },
    { id: '4', textBefore: 'Hacia 1952, la sequía y la caída de precios provocaron una crisis en la ', textAfter: '.', correct: 'balanza de pagos' },
    { id: '5', textBefore: 'El Segundo ', textAfter: ' impulsó un giro hacia el campo.', correct: 'Plan Quinquenal' },
    { id: '6', textBefore: 'Ese giro buscaba obtener ', textAfter: ' para sostener la industria.', correct: 'divisas' },
  ],
  bank: [
    'salarios reales',
    'IAPI',
    'ferrocarriles',
    'balanza de pagos',
    'Plan Quinquenal',
    'divisas',
    'CGE',
    'privatización',
  ],
};

// ── Categorize ──────────────────────────────────────
export const categoriesPeronista: CategoryDef[] = [
  { id: 'economia', label: 'Economía', accent: 'gold' },
  { id: 'nacionalizaciones', label: 'Nacionalizaciones', accent: 'jade' },
  { id: 'actores', label: 'Actores y Consecuencias', accent: 'ember' },
];
export const categoryItemsPeronista: CategoryItem[] = [
  { id: 'p1', text: 'IAPI', categoryId: 'economia' },
  { id: 'p2', text: 'Plan Quinquenal', categoryId: 'economia' },
  { id: 'p3', text: 'Giro al campo (1953)', categoryId: 'economia' },
  { id: 'p4', text: 'Ferrocarriles', categoryId: 'nacionalizaciones' },
  { id: 'p5', text: 'Teléfonos', categoryId: 'nacionalizaciones' },
  { id: 'p6', text: 'Gas', categoryId: 'nacionalizaciones' },
  { id: 'p7', text: 'CGE', categoryId: 'actores' },
  { id: 'p8', text: 'Aumento del salario real', categoryId: 'actores' },
  { id: 'p9', text: 'Expansión del mercado interno', categoryId: 'actores' },
];

// ── True/False Grid ──────────────────────────────────
export const trueFalseGridPeronista: TrueFalseItem[] = [
  { id: 'ptf1', statement: 'El IAPI centralizaba el comercio exterior del país.', answer: true, explanation: 'El IAPI compraba las cosechas a precios fijados y monopolizaba las exportaciones e importaciones.' },
  { id: 'ptf2', statement: 'El primer gobierno peronista redujo los salarios reales de los trabajadores.', answer: false, explanation: 'Al contrario: la política económica buscó aumentar sostenidamente los salarios reales.' },
  { id: 'ptf3', statement: 'Los ferrocarriles fueron nacionalizados en 1948.', answer: true, explanation: 'La nacionalización de los Ferrocarriles Argentinos se concretó en 1948.' },
  { id: 'ptf4', statement: 'El Segundo Plan Quinquenal ignoró por completo al sector agropecuario.', answer: false, explanation: 'Todo lo contrario: implementó un "giro al campo" para incentivar la producción agrícola.' },
  { id: 'ptf5', statement: 'La CGE representaba a los empresarios nacionales adherentes al peronismo.', answer: true, explanation: 'La Confederación General Económica agrupaba a los empresarios industriales y comerciales del país.' },
  { id: 'ptf6', statement: 'La crisis de 1952 se debió a un superávit récord de divisas.', answer: false, explanation: 'Fue lo opuesto: la sequía y la caída de precios internacionales generaron un déficit en la balanza de pagos.' },
];

// ── Map Hotspot ──────────────────────────────────────
export const mapHotspotsPeronista: MapHotspot[] = [
  { id: 'bsas-industria', label: 'Gran Buenos Aires', prompt: '¿Dónde se concentró la industrialización financiada por el Estado peronista?', x: 26, y: 72, radius: 9, explanation: 'Gran Buenos Aires concentró gran parte de la nueva industria nacional impulsada por el IAPI y los Planes Quinquenales.' },
  { id: 'pampa-iapi', label: 'Región Pampeana', prompt: '¿Qué región proveía las cosechas que el IAPI compraba a precios fijados?', x: 28, y: 64, radius: 10, explanation: 'La Pampa Húmeda concentraba la producción agropecuaria que el IAPI adquiría para luego exportar.' },
  { id: 'rio-turbio', label: 'Río Turbio', prompt: '¿En qué región patagónica se impulsó la explotación de carbón durante el segundo gobierno peronista?', x: 20, y: 95, radius: 8, explanation: 'En Santa Cruz, Río Turbio se convirtió en un centro clave para la producción de carbón nacional durante el Segundo Plan Quinquenal.' },
];

// ── Memory Cards ─────────────────────────────────────
export const memoryPairsPeronista: { id: string; a: string; b: string }[] = [
  { id: 'pm1', a: 'IAPI', b: 'Comercio exterior centralizado' },
  { id: 'pm2', a: 'CGE', b: 'Empresarios nacionales' },
  { id: 'pm3', a: 'Plan Quinquenal', b: 'Planificación estatal' },
  { id: 'pm4', a: 'Giro al campo', b: '1953' },
];
export const memoryCardsPeronista: MemoryCardData[] = memoryPairsPeronista.flatMap((p) => [
  { id: `${p.id}-a`, pairId: p.id, text: p.a },
  { id: `${p.id}-b`, pairId: p.id, text: p.b },
]);

// ── Slider Estimate ──────────────────────────────────
export const sliderQuestionsPeronista: SliderQuestion[] = [
  { id: 'ps1', prompt: '¿En qué año se creó el IAPI?', min: 1940, max: 1950, correct: 1946, unit: '', tolerance: 1, explanation: 'El IAPI fue creado en 1946, al inicio del primer gobierno peronista.' },
  { id: 'ps2', prompt: '¿En qué año se implementó el Segundo Plan Quinquenal con su "giro al campo"?', min: 1948, max: 1958, correct: 1953, unit: '', tolerance: 1, explanation: 'El Segundo Plan Quinquenal se lanzó en 1953, reorientando la política económica hacia el agro.' },
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
  totalXp: 800,
  steps: [
    { id: 1, label: 'Contexto', icon: Factory },
    { id: 2, label: 'Tiempo', icon: Landmark },
    { id: 3, label: 'Pares', icon: Scroll },
    { id: 4, label: 'Completar', icon: Puzzle },
    { id: 5, label: 'Categorías', icon: Grid3x3 },
    { id: 6, label: 'V/F', icon: Check },
    { id: 7, label: 'Mapa', icon: MapPin },
    { id: 8, label: 'Memoria', icon: Brain },
    { id: 9, label: 'Estimar', icon: SlidersHorizontal },
    { id: 10, label: 'Quiz', icon: Vote },
  ],
};

// Step XP values (60+80+80+80+80+80+70+70+60+140 = 800 total)
export const stepXpPeronista: Record<number, number> = {
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
