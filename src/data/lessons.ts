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

import {
  lessonCulturaIntro,
  lessonSentidoComun,
  lessonPracticasInventadas,
  lessonCajasNegras,
  lessonFronterasSimbolicas,
  lessonFrentesCulturales,
} from './lessonCulturaFasciculo1';

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
  // ── Prácticas Culturales — Fascículo 1 (Eje Temático Cultura) ─────────
  'cultura-intro': {
    id: 'cultura-intro',
    module: 'FASCÍCULO 1',
    title: lessonCulturaIntro.title,
    subtitle: lessonCulturaIntro.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonCulturaIntro.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonCulturaIntro.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonCulturaIntro.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: [],
    quiz: lessonCulturaIntro.steps.filter((s) => s.type === 'quiz').map((s) => ({
      id: 1,
      question: (s as any).question || '',
      options: (s as any).options || [],
      correctIndex: (s as any).correctIndex ?? 0,
      explanation: (s as any).explanation || '',
    })),
    artifact: { type: 'concepto', name: 'Introducción a la Cultura', description: 'Sentido común y prácticas sociales' },
    matchPairs: lessonCulturaIntro.steps.filter((s) => s.type === 'matchpairs').map((s) => (s as any).pairs || [])[0] || [],
    fillBlank: lessonCulturaIntro.steps.filter((s) => s.type === 'fillblanks').map((s) => ({
      text: (s as any).text || '',
      answers: (s as any).answers || [],
      hint: (s as any).hint || '',
      explanation: (s as any).explanation || '',
    }))[0],
    categories: lessonCulturaIntro.steps.filter((s) => s.type === 'categorize').map((s) => ({
      id: 'cat1',
      name: (s as any).categories?.[0] || 'Categoría 1',
    }))[0] ? [{ id: 'cat1', name: lessonCulturaIntro.steps.find((s) => s.type === 'categorize')?.['categories']?.[0] || 'Naturales' }, { id: 'cat2', name: lessonCulturaIntro.steps.find((s) => s.type === 'categorize')?.['categories']?.[1] || 'Culturales' }] : undefined,
    categoryItems: lessonCulturaIntro.steps.filter((s) => s.type === 'categorize').map((s) => (s as any).items || [])[0] || [],
    trueFalseGrid: lessonCulturaIntro.steps.filter((s) => s.type === 'truefalse').map((s) => ({
      id: 1,
      statement: (s as any).question || '',
      isTrue: (s as any).isTrue ?? false,
      explanationTrue: (s as any).explanationTrue || '',
      explanationFalse: (s as any).explanationFalse || '',
    }))[0] ? [{ id: 1, statement: lessonCulturaIntro.steps.find((s) => s.type === 'truefalse')?.['question'] || '', isTrue: lessonCulturaIntro.steps.find((s) => s.type === 'truefalse')?.['isTrue'] ?? false, explanationTrue: lessonCulturaIntro.steps.find((s) => s.type === 'truefalse')?.['explanationTrue'] || '', explanationFalse: lessonCulturaIntro.steps.find((s) => s.type === 'truefalse')?.['explanationFalse'] || '' }] : undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: lessonCulturaIntro.steps.filter((s) => s.type === 'sliderestimate').map((s) => ({
      id: 1,
      question: (s as any).question || '',
      minLabel: (s as any).minLabel || '0',
      maxLabel: (s as any).maxLabel || '100',
      correctMin: (s as any).correctMin ?? 0,
      correctMax: (s as any).correctMax ?? 100,
      explanation: (s as any).explanation || '',
    }))[0] ? [{ id: 1, question: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['question'] || '', minLabel: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['minLabel'] || '0%', maxLabel: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['maxLabel'] || '100%', correctMin: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['correctMin'] ?? 5, correctMax: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['correctMax'] ?? 20, explanation: lessonCulturaIntro.steps.find((s) => s.type === 'sliderestimate')?.['explanation'] || '' }] : undefined,
  },
  'cultura-sentido': {
    id: 'cultura-sentido',
    module: 'FASCÍCULO 1',
    title: lessonSentidoComun.title,
    subtitle: lessonSentidoComun.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonSentidoComun.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonSentidoComun.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonSentidoComun.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: [],
    quiz: lessonSentidoComun.steps.filter((s) => s.type === 'quiz').map((s) => ({
      id: 1,
      question: (s as any).question || '',
      options: (s as any).options || [],
      correctIndex: (s as any).correctIndex ?? 0,
      explanation: (s as any).explanation || '',
    })),
    artifact: { type: 'concepto', name: 'El Sentido Común', description: 'Construcción cultural de lo obvio' },
    matchPairs: [],
    fillBlank: lessonSentidoComun.steps.filter((s) => s.type === 'fillblanks').map((s) => ({
      text: (s as any).text || '',
      answers: (s as any).answers || [],
      hint: (s as any).hint || '',
      explanation: (s as any).explanation || '',
    }))[0],
    categories: undefined,
    categoryItems: [],
    trueFalseGrid: undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: undefined,
  },
  'cultura-practicas': {
    id: 'cultura-practicas',
    module: 'FASCÍCULO 1',
    title: lessonPracticasInventadas.title,
    subtitle: lessonPracticasInventadas.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonPracticasInventadas.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonPracticasInventadas.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonPracticasInventadas.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: lessonPracticasInventadas.steps.filter((s) => s.type === 'timeline').map((s) => (s as any).events || [])[0]?.map((e: any, i: number) => ({
      id: `evt-${i}`,
      label: e.event,
      date: e.year,
      year: parseInt(e.year),
      emoji: '📅',
    })) || [],
    quiz: [],
    artifact: { type: 'concepto', name: 'Prácticas Inventadas', description: 'Tradiciones de creación reciente' },
    matchPairs: lessonPracticasInventadas.steps.filter((s) => s.type === 'matchpairs').map((s) => (s as any).pairs || [])[0] || [],
    fillBlank: undefined,
    categories: undefined,
    categoryItems: [],
    trueFalseGrid: undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: undefined,
  },
  'cultura-cajas': {
    id: 'cultura-cajas',
    module: 'FASCÍCULO 1',
    title: lessonCajasNegras.title,
    subtitle: lessonCajasNegras.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonCajasNegras.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonCajasNegras.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonCajasNegras.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: [],
    quiz: [],
    artifact: { type: 'concepto', name: 'Cajas Negras', description: 'Tecnologías e instituciones opacas' },
    matchPairs: [],
    fillBlank: undefined,
    categories: undefined,
    categoryItems: [],
    trueFalseGrid: lessonCajasNegras.steps.filter((s) => s.type === 'truefalse').map((s) => ({
      id: 1,
      statement: (s as any).question || '',
      isTrue: (s as any).isTrue ?? false,
      explanationTrue: (s as any).explanationTrue || '',
      explanationFalse: (s as any).explanationFalse || '',
    }))[0] ? [{ id: 1, statement: lessonCajasNegras.steps.find((s) => s.type === 'truefalse')?.['question'] || '', isTrue: lessonCajasNegras.steps.find((s) => s.type === 'truefalse')?.['isTrue'] ?? false, explanationTrue: lessonCajasNegras.steps.find((s) => s.type === 'truefalse')?.['explanationTrue'] || '', explanationFalse: lessonCajasNegras.steps.find((s) => s.type === 'truefalse')?.['explanationFalse'] || '' }] : undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: lessonCajasNegras.steps.filter((s) => s.type === 'sliderestimate').map((s) => ({
      id: 1,
      question: (s as any).question || '',
      minLabel: (s as any).minLabel || '0',
      maxLabel: (s as any).maxLabel || '100',
      correctMin: (s as any).correctMin ?? 0,
      correctMax: (s as any).correctMax ?? 100,
      explanation: (s as any).explanation || '',
    }))[0] ? [{ id: 1, question: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['question'] || '', minLabel: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['minLabel'] || '0%', maxLabel: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['maxLabel'] || '100%', correctMin: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['correctMin'] ?? 5, correctMax: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['correctMax'] ?? 20, explanation: lessonCajasNegras.steps.find((s) => s.type === 'sliderestimate')?.['explanation'] || '' }] : undefined,
  },
  'cultura-fronteras': {
    id: 'cultura-fronteras',
    module: 'FASCÍCULO 1',
    title: lessonFronterasSimbolicas.title,
    subtitle: lessonFronterasSimbolicas.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonFronterasSimbolicas.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonFronterasSimbolicas.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonFronterasSimbolicas.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: [],
    quiz: lessonFronterasSimbolicas.steps.filter((s) => s.type === 'quiz').map((s) => ({
      id: 1,
      question: (s as any).question || '',
      options: (s as any).options || [],
      correctIndex: (s as any).correctIndex ?? 0,
      explanation: (s as any).explanation || '',
    })),
    artifact: { type: 'concepto', name: 'Fronteras Simbólicas', description: 'Límites entre nosotros y los otros' },
    matchPairs: [],
    fillBlank: undefined,
    categories: lessonFronterasSimbolicas.steps.filter((s) => s.type === 'categorize').map((s) => ({
      id: 'cat1',
      name: (s as any).categories?.[0] || 'Categoría 1',
    }))[0] ? [{ id: 'cat1', name: lessonFronterasSimbolicas.steps.find((s) => s.type === 'categorize')?.['categories']?.[0] || 'Inclusivas' }, { id: 'cat2', name: lessonFronterasSimbolicas.steps.find((s) => s.type === 'categorize')?.['categories']?.[1] || 'Excluyentes' }] : undefined,
    categoryItems: lessonFronterasSimbolicas.steps.filter((s) => s.type === 'categorize').map((s) => (s as any).items || [])[0] || [],
    trueFalseGrid: undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: undefined,
  },
  'cultura-frentes': {
    id: 'cultura-frentes',
    module: 'FASCÍCULO 1',
    title: lessonFrentesCulturales.title,
    subtitle: lessonFrentesCulturales.description,
    totalXp: DEFAULT_LESSON_TOTAL_XP,
    steps: lessonFrentesCulturales.steps.map((s, i) => ({
      id: i + 1,
      label: s.type === 'lore' ? 'Lectura' : s.type.charAt(0).toUpperCase() + s.type.slice(1),
      icon: Brain,
    })),
    stepTypes: lessonFrentesCulturales.steps.map((s) => s.type as StepType),
    stepXp: DEFAULT_STEP_XP,
    lore: lessonFrentesCulturales.steps.filter((s) => s.type === 'lore').map((s, i) => ({
      id: i + 1,
      title: 'Concepto',
      icon: Brain,
      body: (s as any).text,
      tag: 'Cultura',
      accent: 'jade' as const,
    })),
    timeline: [],
    quiz: [],
    artifact: { type: 'concepto', name: 'Frentes Culturales', description: 'Disputa de sentidos en la cultura' },
    matchPairs: lessonFrentesCulturales.steps.filter((s) => s.type === 'matchpairs').map((s) => (s as any).pairs || [])[0] || [],
    fillBlank: undefined,
    categories: undefined,
    categoryItems: [],
    trueFalseGrid: lessonFrentesCulturales.steps.filter((s) => s.type === 'truefalse').map((s) => ({
      id: 1,
      statement: (s as any).question || '',
      isTrue: (s as any).isTrue ?? false,
      explanationTrue: (s as any).explanationTrue || '',
      explanationFalse: (s as any).explanationFalse || '',
    }))[0] ? [{ id: 1, statement: lessonFrentesCulturales.steps.find((s) => s.type === 'truefalse')?.['question'] || '', isTrue: lessonFrentesCulturales.steps.find((s) => s.type === 'truefalse')?.['isTrue'] ?? false, explanationTrue: lessonFrentesCulturales.steps.find((s) => s.type === 'truefalse')?.['explanationTrue'] || '', explanationFalse: lessonFrentesCulturales.steps.find((s) => s.type === 'truefalse')?.['explanationFalse'] || '' }] : undefined,
    mapHotspots: [],
    memoryPairs: [],
    memoryCards: [],
    sliderQuestions: undefined,
  },
};

// Nota: la materia de C# ('csharpclase1' en adelante) ya no usa este motor
// de lore+quiz — ahora es una serie de ejercicios de código real, compilados
// con Judge0. Ver `src/data/csharpChapters.ts` y `src/components/csharp/`.

export function getLesson(id: string): LessonConfig | undefined {
  return lessons[id];
}
