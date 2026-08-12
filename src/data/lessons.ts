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
  Compass,
  Train,
  Wheat,
  type LucideIcon,
} from 'lucide-react';

import {
  loreSlides,
  timelineEvents,
  matchPairs,
  quizQuestions,
  lessonArtifact,
  lessonMeta,
  fillBlankExercise,
  categories,
  categoryItems,
  trueFalseGrid,
  mapHotspots,
  memoryPairs,
  memoryCards,
  sliderQuestions,
  type LoreSlide,
  type TimelineEvent,
  type MatchPair,
  type QuizQuestion,
  type Artifact,
  type FillBlankExercise,
  type CategoryDef,
  type CategoryItem,
  type TrueFalseItem,
  type MapHotspot,
  type MemoryCardData,
  type SliderQuestion,
} from './lessonArgentina';

import {
  loreSlidesPeronista,
  timelineEventsPeronista,
  quizQuestionsPeronista,
  lessonArtifactPeronista,
  lessonMetaPeronista,
  matchPairsPeronista,
  fillBlankExercisePeronista,
  categoriesPeronista,
  categoryItemsPeronista,
  trueFalseGridPeronista,
  mapHotspotsPeronista,
  memoryPairsPeronista,
  memoryCardsPeronista,
  sliderQuestionsPeronista,
} from './lessonPeronista';

import {
  loreSlidesBienestar,
  timelineEventsBienestar,
  quizQuestionsBienestar,
  lessonArtifactBienestar,
  lessonMetaBienestar,
  matchPairsBienestar,
  fillBlankExerciseBienestar,
  categoriesBienestar,
  categoryItemsBienestar,
  trueFalseGridBienestar,
  mapHotspotsBienestar,
  memoryPairsBienestar,
  memoryCardsBienestar,
  sliderQuestionsBienestar,
} from './lessonBienestar';

import {
  loreSlidesPolitica,
  timelineEventsPolitica,
  quizQuestionsPolitica,
  lessonArtifactPolitica,
  lessonMetaPolitica,
  matchPairsPolitica,
  fillBlankExercisePolitica,
  categoriesPolitica,
  categoryItemsPolitica,
  trueFalseGridPolitica,
  mapHotspotsPolitica,
  memoryPairsPolitica,
  memoryCardsPolitica,
  sliderQuestionsPolitica,
} from './lessonPolitica';

import {
  loreSlidesResistencia,
  timelineEventsResistencia,
  quizQuestionsResistencia,
  lessonArtifactResistencia,
  lessonMetaResistencia,
  matchPairsResistencia,
  fillBlankExerciseResistencia,
  categoriesResistencia,
  categoryItemsResistencia,
  trueFalseGridResistencia,
  mapHotspotsResistencia,
  memoryPairsResistencia,
  memoryCardsResistencia,
  sliderQuestionsResistencia,
} from './lessonResistencia';

// ── Módulo 2 — apartados (formato simple: contexto + quiz) ─────────
import {
  loreSlidesGolpe76,
  quizQuestionsGolpe76,
  lessonArtifactGolpe76,
  lessonMetaGolpe76,
} from './lessonGolpe76';

import {
  loreSlidesPlanEconomico,
  quizQuestionsPlanEconomico,
  lessonArtifactPlanEconomico,
  lessonMetaPlanEconomico,
} from './lessonPlanEconomico';

import {
  loreSlidesTerrorismo,
  quizQuestionsTerrorismo,
  lessonArtifactTerrorismo,
  lessonMetaTerrorismo,
} from './lessonTerrorismo';

import {
  loreSlidesSociedadDictadura,
  quizQuestionsSociedadDictadura,
  lessonArtifactSociedadDictadura,
  lessonMetaSociedadDictadura,
} from './lessonSociedadDictadura';

import {
  loreSlidesMalvinas,
  quizQuestionsMalvinas,
  lessonArtifactMalvinas,
  lessonMetaMalvinas,
} from './lessonMalvinas';

// ── Prácticas Culturales — Módulo 1 (formato simple: contexto + quiz) ──
import {
  loreSlidesCulturaSentido,
  quizQuestionsCulturaSentido,
  lessonArtifactCulturaSentido,
  lessonMetaCulturaSentido,
} from './lessonCulturaSentido';

import {
  loreSlidesCulturaInventada,
  quizQuestionsCulturaInventada,
  lessonArtifactCulturaInventada,
  lessonMetaCulturaInventada,
} from './lessonCulturaInventada';

import {
  loreSlidesCulturaFronteras,
  quizQuestionsCulturaFronteras,
  lessonArtifactCulturaFronteras,
  lessonMetaCulturaFronteras,
} from './lessonCulturaFronteras';

export type StepType = 'lore' | 'timeline' | 'match' | 'fill' | 'categorize' | 'truefalse' | 'map' | 'memory' | 'slider' | 'quiz';

/**
 * XP por tipo de ejercicio, según su dificultad relativa. Rango 5-20:
 * - 5   → "Contexto" (lore): solo lectura, sin desafío.
 * - 20  → "Quiz": desafío final, combina todo lo aprendido en la lección.
 * El resto se ubica entre medio según cuánto razonamiento/memoria exige.
 * Las 5 lecciones comparten la misma secuencia de 10 pasos, así que esta
 * tabla única define el XP de cada paso en todas ellas.
 */
export const STEP_TYPE_XP: Record<StepType, number> = {
  lore: 5, // leer slides de contexto
  timeline: 12, // ordenar eventos cronológicamente
  match: 10, // emparejar conceptos
  fill: 13, // completar espacios de memoria
  categorize: 12, // clasificar ítems en categorías
  truefalse: 8, // verdadero/falso
  map: 9, // ubicar puntos en el mapa
  memory: 9, // juego de memoria (pares)
  slider: 11, // estimar un valor numérico
  quiz: 20, // desafío final de opción múltiple / V-F / flashcards
};

const STEP_SEQUENCE: StepType[] = [
  'lore',
  'timeline',
  'match',
  'fill',
  'categorize',
  'truefalse',
  'map',
  'memory',
  'slider',
  'quiz',
];

/** Arma el `stepXp` (por número de paso 1..10) a partir de `STEP_TYPE_XP`. */
function buildStepXp(sequence: StepType[] = STEP_SEQUENCE): Record<number, number> {
  const entries: Record<number, number> = {};
  sequence.forEach((type, i) => {
    entries[i + 1] = STEP_TYPE_XP[type];
  });
  return entries;
}

const DEFAULT_STEP_XP = buildStepXp();
const DEFAULT_LESSON_TOTAL_XP = Object.values(DEFAULT_STEP_XP).reduce((a, b) => a + b, 0);

/**
 * Secuencia simplificada para los apartados del Módulo 2: solo contexto
 * (lore) + quiz final de 6 preguntas, sin los demás minijuegos.
 */
const MODULO2_STEP_SEQUENCE: StepType[] = ['lore', 'quiz'];
const MODULO2_STEP_XP = buildStepXp(MODULO2_STEP_SEQUENCE);
const MODULO2_TOTAL_XP = Object.values(MODULO2_STEP_XP).reduce((a, b) => a + b, 0);

export interface LessonConfig {
  id: string;
  module: string;
  title: string;
  subtitle: string;
  totalXp: number;
  steps: { id: number; label: string; icon: LucideIcon }[];
  stepTypes: StepType[];
  stepXp: Record<number, number>;
  lore: LoreSlide[];
  timeline: TimelineEvent[];
  quiz: QuizQuestion[];
  artifact: Artifact;
  // Optional — only for the 10-step Argentina lesson
  matchPairs?: MatchPair[];
  fillBlank?: FillBlankExercise;
  categories?: CategoryDef[];
  categoryItems?: CategoryItem[];
  trueFalseGrid?: TrueFalseItem[];
  mapHotspots?: MapHotspot[];
  memoryPairs?: { id: string; a: string; b: string }[];
  memoryCards?: MemoryCardData[];
  sliderQuestions?: SliderQuestion[];
}

export const lessons: Record<string, LessonConfig> = {
  argentina: {
    id: 'argentina',
    module: lessonMeta.module,
    title: lessonMeta.title,
    subtitle: lessonMeta.subtitle,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonMeta.steps,
    stepTypes: STEP_SEQUENCE,
    stepXp: DEFAULT_STEP_XP,
    lore: loreSlides,
    timeline: timelineEvents,
    quiz: quizQuestions,
    artifact: lessonArtifact,
    matchPairs,
    fillBlank: fillBlankExercise,
    categories,
    categoryItems,
    trueFalseGrid,
    mapHotspots,
    memoryPairs,
    memoryCards,
    sliderQuestions,
  },
  peronista: {
    id: 'peronista',
    module: lessonMetaPeronista.module,
    title: lessonMetaPeronista.title,
    subtitle: lessonMetaPeronista.subtitle,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonMetaPeronista.steps,
    stepTypes: STEP_SEQUENCE,
    stepXp: DEFAULT_STEP_XP,
    lore: loreSlidesPeronista,
    timeline: timelineEventsPeronista,
    quiz: quizQuestionsPeronista,
    artifact: lessonArtifactPeronista,
    matchPairs: matchPairsPeronista,
    fillBlank: fillBlankExercisePeronista,
    categories: categoriesPeronista,
    categoryItems: categoryItemsPeronista,
    trueFalseGrid: trueFalseGridPeronista,
    mapHotspots: mapHotspotsPeronista,
    memoryPairs: memoryPairsPeronista,
    memoryCards: memoryCardsPeronista,
    sliderQuestions: sliderQuestionsPeronista,
  },
  bienestar: {
    id: 'bienestar',
    module: lessonMetaBienestar.module,
    title: lessonMetaBienestar.title,
    subtitle: lessonMetaBienestar.subtitle,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonMetaBienestar.steps,
    stepTypes: STEP_SEQUENCE,
    stepXp: DEFAULT_STEP_XP,
    lore: loreSlidesBienestar,
    timeline: timelineEventsBienestar,
    quiz: quizQuestionsBienestar,
    artifact: lessonArtifactBienestar,
    matchPairs: matchPairsBienestar,
    fillBlank: fillBlankExerciseBienestar,
    categories: categoriesBienestar,
    categoryItems: categoryItemsBienestar,
    trueFalseGrid: trueFalseGridBienestar,
    mapHotspots: mapHotspotsBienestar,
    memoryPairs: memoryPairsBienestar,
    memoryCards: memoryCardsBienestar,
    sliderQuestions: sliderQuestionsBienestar,
  },
  politica: {
    id: 'politica',
    module: lessonMetaPolitica.module,
    title: lessonMetaPolitica.title,
    subtitle: lessonMetaPolitica.subtitle,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonMetaPolitica.steps,
    stepTypes: STEP_SEQUENCE,
    stepXp: DEFAULT_STEP_XP,
    lore: loreSlidesPolitica,
    timeline: timelineEventsPolitica,
    quiz: quizQuestionsPolitica,
    artifact: lessonArtifactPolitica,
    matchPairs: matchPairsPolitica,
    fillBlank: fillBlankExercisePolitica,
    categories: categoriesPolitica,
    categoryItems: categoryItemsPolitica,
    trueFalseGrid: trueFalseGridPolitica,
    mapHotspots: mapHotspotsPolitica,
    memoryPairs: memoryPairsPolitica,
    memoryCards: memoryCardsPolitica,
    sliderQuestions: sliderQuestionsPolitica,
  },
  resistencia: {
    id: 'resistencia',
    module: lessonMetaResistencia.module,
    title: lessonMetaResistencia.title,
    subtitle: lessonMetaResistencia.subtitle,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonMetaResistencia.steps,
    stepTypes: STEP_SEQUENCE,
    stepXp: DEFAULT_STEP_XP,
    lore: loreSlidesResistencia,
    timeline: timelineEventsResistencia,
    quiz: quizQuestionsResistencia,
    artifact: lessonArtifactResistencia,
    matchPairs: matchPairsResistencia,
    fillBlank: fillBlankExerciseResistencia,
    categories: categoriesResistencia,
    categoryItems: categoryItemsResistencia,
    trueFalseGrid: trueFalseGridResistencia,
    mapHotspots: mapHotspotsResistencia,
    memoryPairs: memoryPairsResistencia,
    memoryCards: memoryCardsResistencia,
    sliderQuestions: sliderQuestionsResistencia,
  },
  // ── Módulo 2 — apartados (contexto + quiz) ─────────────────────
  golpe76: {
    id: 'golpe76',
    module: lessonMetaGolpe76.module,
    title: lessonMetaGolpe76.title,
    subtitle: lessonMetaGolpe76.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaGolpe76.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesGolpe76,
    timeline: [],
    quiz: quizQuestionsGolpe76,
    artifact: lessonArtifactGolpe76,
  },
  planeconomico: {
    id: 'planeconomico',
    module: lessonMetaPlanEconomico.module,
    title: lessonMetaPlanEconomico.title,
    subtitle: lessonMetaPlanEconomico.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaPlanEconomico.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesPlanEconomico,
    timeline: [],
    quiz: quizQuestionsPlanEconomico,
    artifact: lessonArtifactPlanEconomico,
  },
  terrorismo: {
    id: 'terrorismo',
    module: lessonMetaTerrorismo.module,
    title: lessonMetaTerrorismo.title,
    subtitle: lessonMetaTerrorismo.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaTerrorismo.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesTerrorismo,
    timeline: [],
    quiz: quizQuestionsTerrorismo,
    artifact: lessonArtifactTerrorismo,
  },
  sociedaddictadura: {
    id: 'sociedaddictadura',
    module: lessonMetaSociedadDictadura.module,
    title: lessonMetaSociedadDictadura.title,
    subtitle: lessonMetaSociedadDictadura.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaSociedadDictadura.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesSociedadDictadura,
    timeline: [],
    quiz: quizQuestionsSociedadDictadura,
    artifact: lessonArtifactSociedadDictadura,
  },
  malvinas: {
    id: 'malvinas',
    module: lessonMetaMalvinas.module,
    title: lessonMetaMalvinas.title,
    subtitle: lessonMetaMalvinas.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaMalvinas.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesMalvinas,
    timeline: [],
    quiz: quizQuestionsMalvinas,
    artifact: lessonArtifactMalvinas,
  },
  // ── Prácticas Culturales — Módulo 1 (contexto + quiz) ──────────
  culturasentido: {
    id: 'culturasentido',
    module: lessonMetaCulturaSentido.module,
    title: lessonMetaCulturaSentido.title,
    subtitle: lessonMetaCulturaSentido.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaCulturaSentido.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesCulturaSentido,
    timeline: [],
    quiz: quizQuestionsCulturaSentido,
    artifact: lessonArtifactCulturaSentido,
  },
  culturainventada: {
    id: 'culturainventada',
    module: lessonMetaCulturaInventada.module,
    title: lessonMetaCulturaInventada.title,
    subtitle: lessonMetaCulturaInventada.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaCulturaInventada.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesCulturaInventada,
    timeline: [],
    quiz: quizQuestionsCulturaInventada,
    artifact: lessonArtifactCulturaInventada,
  },
  culturafronteras: {
    id: 'culturafronteras',
    module: lessonMetaCulturaFronteras.module,
    title: lessonMetaCulturaFronteras.title,
    subtitle: lessonMetaCulturaFronteras.subtitle,
    totalXp: MODULO2_TOTAL_XP,
    steps: lessonMetaCulturaFronteras.steps,
    stepTypes: MODULO2_STEP_SEQUENCE,
    stepXp: MODULO2_STEP_XP,
    lore: loreSlidesCulturaFronteras,
    timeline: [],
    quiz: quizQuestionsCulturaFronteras,
    artifact: lessonArtifactCulturaFronteras,
  },
};

// Nota: la materia de C# ('csharpclase1' en adelante) ya no usa este motor
// de lore+quiz — ahora es una serie de ejercicios de código real, compilados
// con Judge0. Ver `src/data/csharpChapters.ts` y `src/components/csharp/`.

export function getLesson(id: string): LessonConfig | undefined {
  return lessons[id];
}
