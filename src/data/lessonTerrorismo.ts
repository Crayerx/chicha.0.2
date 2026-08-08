import {
  ShieldAlert,
  Landmark,
  Users,
  Scale,
  Vote,
  type LucideIcon,
} from 'lucide-react';
import type { LoreSlide, QuizQuestion, Artifact } from './lessonArgentina';

export const loreSlidesTerrorismo: LoreSlide[] = [
  {
    id: 1,
    title: '¿Qué fue el Terrorismo de Estado?',
    icon: ShieldAlert,
    tag: 'DEFINICIÓN',
    accent: 'ruby',
    body: 'Se llama terrorismo de Estado al uso sistemático y clandestino del aparato estatal —fuerzas armadas, policiales y de inteligencia— para perseguir, secuestrar, torturar y eliminar ilegalmente a opositores reales o presuntos, por fuera de toda ley y de todo proceso judicial.',
  },
  {
    id: 2,
    title: 'Centros Clandestinos de Detención',
    icon: Landmark,
    tag: '1976-1983',
    accent: 'ember',
    body: 'En todo el país funcionaron alrededor de 500 centros clandestinos de detención, muchos dentro de dependencias militares y policiales. Allí eran retenidas, torturadas y en la mayoría de los casos asesinadas las personas secuestradas, sin ningún registro legal de su detención: los "desaparecidos".',
  },
  {
    id: 3,
    title: 'Apropiación de Bebés',
    icon: Users,
    tag: 'ABUELAS DE PLAZA DE MAYO',
    accent: 'gold',
    body: 'Numerosos bebés nacidos en cautiverio, o secuestrados junto a sus padres, fueron apropiados ilegalmente y entregados a otras familias, muchas vinculadas al propio aparato represivo. Las Abuelas de Plaza de Mayo se organizaron para buscarlos y restituirles su identidad.',
  },
  {
    id: 4,
    title: 'Los Desaparecidos',
    icon: ShieldAlert,
    tag: 'CIFRA',
    accent: 'jade',
    body: 'Los organismos de derechos humanos estiman en 30.000 la cantidad de personas desaparecidas durante la dictadura. La desaparición forzada buscaba, además de eliminar a la persona, generar incertidumbre y silencio: sin cuerpo ni registro, el Estado negaba sistemáticamente los hechos.',
  },
  {
    id: 5,
    title: 'La CONADEP y el "Nunca Más"',
    icon: Scale,
    tag: '1983-1984',
    accent: 'ruby',
    body: 'Con el retorno de la democracia en 1983, el presidente Raúl Alfonsín creó la CONADEP (Comisión Nacional sobre la Desaparición de Personas), presidida por Ernesto Sabato. Su informe final, "Nunca Más" (1984), documentó miles de casos y sentó las bases del histórico Juicio a las Juntas de 1985.',
  },
];

export const quizQuestionsTerrorismo: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: '¿Cómo se denomina la práctica sistemática de secuestrar y hacer desaparecer personas sin dejar rastro legal?',
    options: ['Exilio forzado', 'Desaparición forzada', 'Proscripción', 'Deportación'],
    correctIndex: 1,
    explanation: 'La desaparición forzada fue el método central del terrorismo de Estado: secuestro, cautiverio clandestino y eliminación sin registro legal.',
    accent: 'ruby',
  },
  {
    id: 2,
    type: 'truefalse',
    question: 'Los centros clandestinos de detención funcionaron muchas veces dentro de dependencias militares o policiales.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation: 'Verdadero. Alrededor de 500 centros clandestinos operaron en instalaciones militares y policiales de todo el país.',
    accent: 'ember',
  },
  {
    id: 3,
    type: 'multiple',
    question: '¿Qué organismo de derechos humanos se dedica a buscar y restituir la identidad de los niños apropiados durante la dictadura?',
    options: ['Madres de Plaza de Mayo', 'Abuelas de Plaza de Mayo', 'H.I.J.O.S.', 'CELS'],
    correctIndex: 1,
    explanation: 'Las Abuelas de Plaza de Mayo se organizaron específicamente para localizar y restituir la identidad de los nietos apropiados.',
    accent: 'gold',
  },
  {
    id: 4,
    type: 'flashcard',
    question: '¿Qué comisión creada en 1983 investigó las violaciones a los derechos humanos y produjo el informe "Nunca Más"?',
    answer: 'La CONADEP (Comisión Nacional sobre la Desaparición de Personas), presidida por Ernesto Sabato.',
    explanation: 'Su informe sentó las bases probatorias para el Juicio a las Juntas Militares en 1985.',
    accent: 'jade',
  },
  {
    id: 5,
    type: 'multiple',
    question: 'Según los organismos de derechos humanos, ¿cuántas personas se estima que fueron víctimas de desaparición forzada durante la dictadura?',
    options: ['3.000', '10.000', '30.000', '100.000'],
    correctIndex: 2,
    explanation: 'La cifra de 30.000 desaparecidos es la sostenida históricamente por los organismos de derechos humanos.',
    accent: 'ruby',
  },
  {
    id: 6,
    type: 'truefalse',
    question: 'La ESMA (Escuela de Mecánica de la Armada) funcionó como uno de los centros clandestinos de detención más grandes del país.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation: 'Verdadero. La ESMA fue uno de los centros clandestinos más grandes y hoy es Sitio de Memoria.',
    accent: 'ember',
  },
];

export const lessonArtifactTerrorismo: Artifact = {
  name: 'Pañuelo Blanco',
  rarity: 'LEGENDARIO',
  era: '1976 – 1983',
  icon: Scale,
  description: 'Símbolo de la lucha por verdad, memoria y justicia frente al terrorismo de Estado y las desapariciones forzadas.',
};

export const lessonMetaTerrorismo = {
  module: 'Módulo 2',
  title: 'El Terrorismo de Estado',
  subtitle: 'Represión clandestina, desaparecidos y derechos humanos',
  steps: [
    { id: 1, label: 'Contexto', icon: Landmark as LucideIcon },
    { id: 2, label: 'Quiz', icon: Vote as LucideIcon },
  ],
};
