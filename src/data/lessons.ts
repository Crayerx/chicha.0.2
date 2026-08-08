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
  stepXpPeronista,
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
  stepXpBienestar,
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

export type StepType = 'lore' | 'timeline' | 'match' | 'fill' | 'categorize' | 'truefalse' | 'map' | 'memory' | 'slider' | 'quiz';

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
    totalXp: lessonMeta.totalXp,
    steps: lessonMeta.steps,
    stepTypes: ['lore', 'timeline', 'match', 'fill', 'categorize', 'truefalse', 'map', 'memory', 'slider', 'quiz'] as StepType[],
    stepXp: { 1: 50, 2: 90, 3: 90, 4: 90, 5: 90, 6: 90, 7: 75, 8: 75, 9: 80, 10: 170 },
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
    totalXp: lessonMetaPeronista.totalXp,
    steps: lessonMetaPeronista.steps,
    stepTypes: ['lore', 'timeline', 'match', 'fill', 'categorize', 'truefalse', 'map', 'memory', 'slider', 'quiz'] as StepType[],
    stepXp: stepXpPeronista,
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
    totalXp: lessonMetaBienestar.totalXp,
    steps: lessonMetaBienestar.steps,
    stepTypes: ['lore', 'timeline', 'match', 'fill', 'categorize', 'truefalse', 'map', 'memory', 'slider', 'quiz'] as StepType[],
    stepXp: stepXpBienestar,
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
};

export function getLesson(id: string): LessonConfig | undefined {
  return lessons[id];
}
