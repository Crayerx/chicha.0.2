import {
  HeartHandshake,
  Stethoscope,
  GraduationCap,
  Ticket,
  Vote,
  Check,
  Scroll,
  Puzzle,
  Grid3x3,
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

export const loreSlidesBienestar: LoreSlide[] = [
  {
    id: 1,
    title: 'La Fundación Eva Perón',
    icon: HeartHandshake,
    tag: '1948',
    accent: 'ruby',
    body: 'Creada en 1948, la Fundación de Ayuda Social María Eva Duarte de Perón canalizó asistencia directa hacia los sectores más postergados: entrega de viviendas, útiles escolares, juguetes, hogares de tránsito y hogares-escuela. Se financiaba con aportes del Estado, contribuciones sindicales y donaciones empresarias, y operaba por fuera de la burocracia estatal tradicional.',
  },
  {
    id: 2,
    title: 'Derechos del Trabajador y de la Ancianidad',
    icon: Scroll,
    tag: '1947-1948',
    accent: 'gold',
    body: 'En 1947 se proclamó la Declaración de los Derechos del Trabajador, con diez principios fundamentales: derecho al trabajo, a una retribución justa, a la capacitación, a condiciones dignas, a la salud, al bienestar, a la seguridad social, a la protección de la familia, al mejoramiento económico y a la defensa de los intereses profesionales. En 1948 se sumó la Declaración de los Derechos de la Ancianidad.',
  },
  {
    id: 3,
    title: 'Salud Pública y Ramón Carrillo',
    icon: Stethoscope,
    tag: '1946-1954',
    accent: 'jade',
    body: 'El médico Ramón Carrillo encabezó la Secretaría de Salud Pública, elevada a rango de Ministerio en 1949. Impulsó la construcción masiva de hospitales, policlínicos y centros sanitarios, y lideró campañas que redujeron drásticamente enfermedades como el paludismo, la tuberculosis y la sífilis, llevando la salud pública a rincones del país antes desatendidos.',
  },
  {
    id: 4,
    title: 'Educación y Cultura Popular',
    icon: GraduationCap,
    tag: '1949',
    accent: 'gold',
    body: 'En 1949 se estableció la gratuidad de la enseñanza universitaria, ampliando el acceso de los hijos de trabajadores a la universidad. En paralelo, el turismo social permitió a empleados y obreros acceder a hoteles y colonias de vacaciones (como Chapadmalal), mientras los Torneos Infantiles Evita fomentaban el deporte y la Fundación editaba libros y organizaba actividades culturales masivas.',
  },
];

export const timelineEventsBienestar: TimelineEvent[] = [
  {
    id: 'salud46',
    label: 'Creación de la Secretaría de Salud Pública',
    date: '1946',
    year: 1946,
    emoji: '🏥',
  },
  {
    id: 'derechos47',
    label: 'Declaración de los Derechos del Trabajador',
    date: '1947',
    year: 1947,
    emoji: '📜',
  },
  {
    id: 'fundacion48',
    label: 'Creación de la Fundación Eva Perón',
    date: '1948',
    year: 1948,
    emoji: '🤝',
  },
  {
    id: 'gratuidad49',
    label: 'Gratuidad de la enseñanza universitaria y Ministerio de Salud',
    date: '1949',
    year: 1949,
    emoji: '🎓',
  },
];

// ── Match Pairs ──────────────────────────────────────
export const matchPairsBienestar: MatchPair[] = [
  { id: 'fep', concept: 'Fundación Eva Perón', match: 'Asistencia social directa a sectores vulnerables' },
  { id: 'carrillo', concept: 'Ramón Carrillo', match: 'Primer ministro de Salud Pública, campañas sanitarias' },
  { id: 'dt47', concept: 'Derechos del Trabajador (1947)', match: 'Diez principios laborales fundamentales' },
  { id: 'torneos', concept: 'Torneos Infantiles Evita', match: 'Fomento del deporte infantil y juvenil' },
  { id: 'turismo', concept: 'Turismo Social', match: 'Acceso de trabajadores a hoteles y colonias de vacaciones' },
  { id: 'gratuidad', concept: 'Gratuidad Universitaria (1949)', match: 'Eliminación de aranceles en la universidad pública' },
];

// ── Fill in the Blanks ──────────────────────────────
export const fillBlankExerciseBienestar: FillBlankExercise = {
  prompt:
    'Completa el texto arrastrando o tocando la palabra correcta para cada espacio.',
  blanks: [
    { id: '1', textBefore: 'En 1946 se creó la Secretaría de Salud Pública, elevada a ', textAfter: ' en 1949.', correct: 'Ministerio' },
    { id: '2', textBefore: 'La ', textAfter: ' canalizó ayuda social directa hacia los sectores más necesitados.', correct: 'Fundación Eva Perón' },
    { id: '3', textBefore: 'En 1947 se proclamó la ', textAfter: ', con diez derechos laborales.', correct: 'Declaración de los Derechos del Trabajador' },
    { id: '4', textBefore: 'El médico ', textAfter: ' impulsó la construcción masiva de hospitales.', correct: 'Ramón Carrillo' },
    { id: '5', textBefore: 'En 1949 se estableció la ', textAfter: ' de la enseñanza universitaria.', correct: 'gratuidad' },
    { id: '6', textBefore: 'Los ', textAfter: ' promovían el deporte infantil en todo el país.', correct: 'Torneos Evita' },
  ],
  bank: [
    'Ministerio',
    'Fundación Eva Perón',
    'Declaración de los Derechos del Trabajador',
    'Ramón Carrillo',
    'gratuidad',
    'Torneos Evita',
    'Estatuto del Peón',
    'IAPI',
  ],
};

// ── Categorize ──────────────────────────────────────
export const categoriesBienestar: CategoryDef[] = [
  { id: 'salud', label: 'Salud', accent: 'jade' },
  { id: 'derechos', label: 'Derechos Sociales', accent: 'ruby' },
  { id: 'educacion', label: 'Educación y Cultura', accent: 'gold' },
];
export const categoryItemsBienestar: CategoryItem[] = [
  { id: 'b1', text: 'Ministerio de Salud Pública', categoryId: 'salud' },
  { id: 'b2', text: 'Ramón Carrillo', categoryId: 'salud' },
  { id: 'b3', text: 'Erradicación del paludismo', categoryId: 'salud' },
  { id: 'b4', text: 'Declaración de los Derechos del Trabajador', categoryId: 'derechos' },
  { id: 'b5', text: 'Derechos de la Ancianidad', categoryId: 'derechos' },
  { id: 'b6', text: 'Fundación Eva Perón', categoryId: 'derechos' },
  { id: 'b7', text: 'Gratuidad universitaria', categoryId: 'educacion' },
  { id: 'b8', text: 'Torneos Infantiles Evita', categoryId: 'educacion' },
  { id: 'b9', text: 'Turismo social', categoryId: 'educacion' },
];

// ── True/False Grid ──────────────────────────────────
export const trueFalseGridBienestar: TrueFalseItem[] = [
  { id: 'btf1', statement: 'La Fundación Eva Perón se financiaba con aportes estatales, sindicales y donaciones empresarias.', answer: true, explanation: 'Combinaba presupuesto público, contribuciones de sindicatos y aportes de empresas.' },
  { id: 'btf2', statement: 'Ramón Carrillo fue el primer titular de la Secretaría (luego Ministerio) de Salud Pública.', answer: true, explanation: 'Carrillo encabezó la cartera de salud durante casi toda la etapa peronista, impulsando hospitales y campañas sanitarias.' },
  { id: 'btf3', statement: 'La Declaración de los Derechos del Trabajador de 1947 no incluía el derecho al descanso.', answer: false, explanation: 'Falso: el derecho al bienestar y al descanso formaban parte de los diez principios declarados.' },
  { id: 'btf4', statement: 'En 1949 la enseñanza universitaria dejó de ser gratuita en Argentina.', answer: false, explanation: 'Al contrario: en 1949 se estableció justamente la gratuidad de la enseñanza universitaria.' },
  { id: 'btf5', statement: 'Los Torneos Infantiles Evita eran competencias deportivas organizadas para niños y jóvenes.', answer: true, explanation: 'Fomentaban la práctica deportiva masiva entre la niñez y la juventud de todo el país.' },
  { id: 'btf6', statement: 'El turismo social estaba reservado exclusivamente a las clases altas.', answer: false, explanation: 'Todo lo contrario: el turismo social buscaba que trabajadores y empleados accedieran a hoteles y colonias de vacaciones.' },
];

// ── Map Hotspot ──────────────────────────────────────
export const mapHotspotsBienestar: MapHotspot[] = [
  { id: 'ciudad-evita', label: 'Ciudad Evita', prompt: '¿Dónde se construyó un barrio planificado por la Fundación Eva Perón para familias trabajadoras?', x: 24, y: 74, radius: 8, explanation: 'Ciudad Evita, en La Matanza, fue un barrio-modelo construido por la Fundación para alojar a familias de trabajadores.' },
  { id: 'chapadmalal', label: 'Chapadmalal', prompt: '¿Dónde se ubicaron las colonias de vacaciones emblemáticas del turismo social?', x: 32, y: 88, radius: 8, explanation: 'Cerca de Mar del Plata, las Unidades Turísticas de Chapadmalal recibían a trabajadores y sus familias durante sus vacaciones.' },
  { id: 'policlinico', label: 'Gran Buenos Aires', prompt: '¿Dónde se concentró buena parte de la nueva red de hospitales y policlínicos impulsada por Ramón Carrillo?', x: 27, y: 70, radius: 9, explanation: 'El Gran Buenos Aires concentró gran parte de los nuevos policlínicos construidos durante el plan sanitario de Carrillo.' },
];

// ── Memory Cards ─────────────────────────────────────
export const memoryPairsBienestar: { id: string; a: string; b: string }[] = [
  { id: 'bm1', a: 'Ramón Carrillo', b: 'Salud Pública' },
  { id: 'bm2', a: 'Fundación Eva Perón', b: 'Asistencia social' },
  { id: 'bm3', a: 'Torneos Evita', b: 'Deporte infantil' },
  { id: 'bm4', a: '1949', b: 'Gratuidad universitaria' },
];
export const memoryCardsBienestar: MemoryCardData[] = memoryPairsBienestar.flatMap((p) => [
  { id: `${p.id}-a`, pairId: p.id, text: p.a },
  { id: `${p.id}-b`, pairId: p.id, text: p.b },
]);

// ── Slider Estimate ──────────────────────────────────
export const sliderQuestionsBienestar: SliderQuestion[] = [
  { id: 'bs1', prompt: '¿En qué año se proclamó la Declaración de los Derechos del Trabajador?', min: 1940, max: 1950, correct: 1947, unit: '', tolerance: 1, explanation: 'La Declaración de los Derechos del Trabajador se proclamó en 1947.' },
  { id: 'bs2', prompt: '¿En qué año se estableció la gratuidad de la enseñanza universitaria?', min: 1945, max: 1955, correct: 1949, unit: '', tolerance: 1, explanation: 'La gratuidad universitaria se estableció en 1949, el mismo año en que Salud Pública pasó a ser Ministerio.' },
];

export const quizQuestionsBienestar: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question:
      '¿Cuál fue el objetivo principal de la Fundación Eva Perón?',
    options: [
      'Administrar el comercio exterior de granos.',
      'Canalizar asistencia social directa hacia los sectores más necesitados, por fuera de la burocracia estatal tradicional.',
      'Regular las tarifas de los ferrocarriles nacionalizados.',
      'Fiscalizar las exportaciones agropecuarias.',
    ],
    correctIndex: 1,
    explanation:
      'La Fundación distribuía ayuda directa (viviendas, útiles escolares, hogares de tránsito) con una lógica más ágil que la administración estatal tradicional.',
    accent: 'ruby',
  },
  {
    id: 2,
    type: 'truefalse',
    question:
      'Ramón Carrillo, como titular de la Secretaría y luego Ministerio de Salud Pública, impulsó campañas que redujeron enfermedades como el paludismo y la tuberculosis.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Verdadero. Bajo su gestión se construyeron cientos de establecimientos sanitarios y se llevaron adelante campañas que redujeron drásticamente estas enfermedades.',
    accent: 'jade',
  },
  {
    id: 3,
    type: 'multiple',
    question:
      '¿Qué cambio educativo se implementó en 1949 y amplió el acceso de los hijos de trabajadores a la universidad?',
    options: [
      'La creación de becas exclusivas para estudiantes extranjeros.',
      'La gratuidad de la enseñanza universitaria.',
      'El cierre de las universidades nacionales.',
      'La obligatoriedad del examen de ingreso pago.',
    ],
    correctIndex: 1,
    explanation:
      'La eliminación de los aranceles universitarios en 1949 amplió notablemente el acceso a la universidad pública para sectores populares.',
    accent: 'gold',
  },
  {
    id: 4,
    type: 'flashcard',
    question:
      '¿Qué combinaban los Torneos Infantiles Evita y el turismo social dentro de la política de bienestar peronista?',
    answer:
      'El fomento del deporte y la recreación masiva entre niños, jóvenes y trabajadores, con acceso estatal a colonias de vacaciones como Chapadmalal.',
    explanation:
      'Ambas iniciativas buscaban democratizar el acceso al deporte, el descanso y el ocio, antes reservados a sectores con mayores recursos.',
    accent: 'ember',
  },
];

export const lessonArtifactBienestar: Artifact = {
  name: 'Carnet de Turismo Social',
  rarity: 'LEGENDARIO',
  era: '1949',
  icon: Ticket,
  description:
    'Simboliza el acceso masivo de trabajadores y sus familias al descanso y la recreación en las colonias de vacaciones del Estado de Bienestar peronista.',
};

export const lessonMetaBienestar = {
  module: 'Módulo 3',
  title: 'Estado de Bienestar',
  subtitle: 'Derechos sociales, salud, educación y cultura',
  totalXp: 800,
  steps: [
    { id: 1, label: 'Contexto', icon: HeartHandshake },
    { id: 2, label: 'Tiempo', icon: Stethoscope },
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
export const stepXpBienestar: Record<number, number> = {
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
