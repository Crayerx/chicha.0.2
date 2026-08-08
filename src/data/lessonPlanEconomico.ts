import {
  DollarSign,
  TrendingDown,
  Landmark,
  Factory,
  Vote,
  type LucideIcon,
} from 'lucide-react';
import type { LoreSlide, QuizQuestion, Artifact } from './lessonArgentina';

export const loreSlidesPlanEconomico: LoreSlide[] = [
  {
    id: 1,
    title: 'Martínez de Hoz al frente de la Economía',
    icon: Landmark,
    tag: '1976-1981',
    accent: 'gold',
    body: 'José Alfredo Martínez de Hoz fue el ministro de Economía durante la mayor parte de la dictadura. Impulsó un giro drástico: pasar de un modelo con fuerte intervención estatal a uno de apertura económica, valorización financiera y disciplinamiento de los trabajadores mediante la represión.',
  },
  {
    id: 2,
    title: 'Apertura Económica y "Plata Dulce"',
    icon: DollarSign,
    tag: '1978-1981',
    accent: 'jade',
    body: 'La "tablita cambiaria" fijaba de antemano la devaluación del peso, atrayendo capitales especulativos de corto plazo. Se abarataron las importaciones y el crédito externo, dando lugar al fenómeno conocido popularmente como "plata dulce": viajes al exterior y consumo de productos importados al alcance de sectores medios y altos.',
  },
  {
    id: 3,
    title: 'Desindustrialización',
    icon: Factory,
    tag: 'IMPACTO',
    accent: 'ember',
    body: 'La apertura indiscriminada de importaciones, sin protección para la industria nacional, provocó el cierre de numerosas fábricas que no podían competir. Esto generó desempleo, caída del salario real y una fuerte concentración económica en pocos grupos financieros.',
  },
  {
    id: 4,
    title: 'El Endeudamiento Externo',
    icon: TrendingDown,
    tag: '1976-1983',
    accent: 'ruby',
    body: 'La deuda externa argentina se multiplicó varias veces durante la dictadura. En 1982, ya bajo Domingo Cavallo al frente del Banco Central, el Estado estatizó gran parte de la deuda privada de las empresas, transfiriendo ese costo a toda la sociedad por décadas.',
  },
  {
    id: 5,
    title: 'La Crisis de 1981-1982',
    icon: DollarSign,
    tag: '1981-1982',
    accent: 'gold',
    body: 'El esquema financiero colapsó: fuertes devaluaciones, quiebra de bancos y empresas, y una profunda recesión. La crisis económica se sumó al desgaste político del régimen, debilitando aún más su legitimidad hacia el final de la dictadura.',
  },
];

export const quizQuestionsPlanEconomico: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: '¿Quién fue el ministro de Economía durante la mayor parte de la dictadura (1976-1981)?',
    options: ['Domingo Cavallo', 'José Alfredo Martínez de Hoz', 'Juan Vital Sourrouille', 'Roberto Alemann'],
    correctIndex: 1,
    explanation: 'José Alfredo Martínez de Hoz condujo la política económica entre 1976 y 1981, impulsando la apertura y la valorización financiera.',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'multiple',
    question: '¿Cómo se conoció popularmente al período de apertura financiera y consumo de bienes importados?',
    options: ['"Plata dulce"', '"Mano de obra desocupada"', '"Rodrigazo"', '"Plan Austral"'],
    correctIndex: 0,
    explanation: 'La "plata dulce" describía la posibilidad de comprar dólares baratos y consumir productos importados, gracias a la tablita cambiaria.',
    accent: 'jade',
  },
  {
    id: 3,
    type: 'truefalse',
    question: 'El plan económico de la dictadura fortaleció la industria nacional.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation: 'Falso. La apertura de importaciones sin protección provocó el cierre de numerosas industrias nacionales.',
    accent: 'ember',
  },
  {
    id: 4,
    type: 'multiple',
    question: '¿Qué mecanismo cambiario se usó para atraer capitales especulativos de corto plazo?',
    options: ['El cepo cambiario', 'La convertibilidad', 'La "tablita cambiaria"', 'El corralito'],
    correctIndex: 2,
    explanation: 'La "tablita cambiaria" anunciaba de antemano el ritmo de devaluación del peso, favoreciendo la especulación financiera.',
    accent: 'ruby',
  },
  {
    id: 5,
    type: 'flashcard',
    question: '¿Qué ocurrió con la deuda externa argentina durante la dictadura?',
    answer: 'Se multiplicó varias veces y, en 1982, el Estado estatizó gran parte de la deuda privada de las empresas.',
    explanation: 'El endeudamiento y su posterior estatización condicionaron la economía argentina durante décadas.',
    accent: 'gold',
  },
  {
    id: 6,
    type: 'truefalse',
    question: 'La crisis financiera de 1981-1982 provocó la quiebra de numerosos bancos y empresas.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation: 'Verdadero. El esquema de "plata dulce" colapsó, generando devaluaciones, quiebras y una fuerte recesión.',
    accent: 'jade',
  },
];

export const lessonArtifactPlanEconomico: Artifact = {
  name: 'Tablita Cambiaria',
  rarity: 'LEGENDARIO',
  era: '1978 – 1981',
  icon: DollarSign,
  description: 'Símbolo del plan económico neoliberal de Martínez de Hoz: apertura, especulación financiera y desindustrialización.',
};

export const lessonMetaPlanEconomico = {
  module: 'Módulo 2',
  title: 'El Plan Económico Neoliberal',
  subtitle: 'Apertura, endeudamiento y desindustrialización',
  steps: [
    { id: 1, label: 'Contexto', icon: Landmark as LucideIcon },
    { id: 2, label: 'Quiz', icon: Vote as LucideIcon },
  ],
};
