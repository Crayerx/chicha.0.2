import {
  Landmark,
  Megaphone,
  Users,
  Globe,
  Vote,
  type LucideIcon,
} from 'lucide-react';
import type { LoreSlide, QuizQuestion, Artifact } from './lessonArgentina';

export const loreSlidesSociedadDictadura: LoreSlide[] = [
  {
    id: 1,
    title: 'Censura y Control Cultural',
    icon: Landmark,
    tag: '1976-1983',
    accent: 'ember',
    body: 'La dictadura impuso una fuerte censura sobre libros, canciones, películas y medios de comunicación. Se prohibieron obras y autores, se controló la programación radial y televisiva, y muchos artistas e intelectuales debieron exiliarse o adaptarse a la autocensura para poder seguir trabajando.',
  },
  {
    id: 2,
    title: 'Vida Cotidiana bajo Vigilancia',
    icon: Users,
    tag: 'CLIMA SOCIAL',
    accent: 'ruby',
    body: 'El miedo y la incertidumbre atravesaron la vida cotidiana: allanamientos, listas negras y controles policiales generaron un clima de autocensura generalizado. Muchas familias evitaban hablar de política, incluso en privado, ante el temor a la delación o a ser vinculadas con la "subversión".',
  },
  {
    id: 3,
    title: 'El Mundial de Fútbol de 1978',
    icon: Globe,
    tag: 'JUNIO 1978',
    accent: 'gold',
    body: 'La Copa Mundial de fútbol organizada en Argentina en 1978, ganada por la selección local, fue utilizada por el régimen con fines propagandísticos: buscaba proyectar una imagen de normalidad y unidad nacional hacia el exterior, mientras continuaba la represión clandestina.',
  },
  {
    id: 4,
    title: 'Las Madres de Plaza de Mayo',
    icon: Megaphone,
    tag: 'DESDE 1977',
    accent: 'jade',
    body: 'Desde abril de 1977, un grupo de madres de personas desaparecidas comenzó a reunirse los jueves en Plaza de Mayo, frente a la Casa Rosada, para reclamar la aparición con vida de sus hijos e hijas. Fue una de las primeras y más visibles formas de resistencia pública a la dictadura.',
  },
  {
    id: 5,
    title: 'Apoyos y Resistencias',
    icon: Users,
    tag: 'SOCIEDAD DIVIDIDA',
    accent: 'ember',
    body: 'La relación de la sociedad con el régimen fue heterogénea: sectores civiles brindaron apoyo inicial o se beneficiaron económicamente, mientras otros resistieron desde el primer momento, muchas veces a riesgo de su propia vida. Esa resistencia fue creciendo con el paso de los años.',
  },
];

export const quizQuestionsSociedadDictadura: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: '¿Qué evento deportivo de 1978 fue utilizado por la dictadura con fines propagandísticos?',
    options: ['Los Juegos Panamericanos', 'La Copa Mundial de fútbol', 'Los Juegos Olímpicos', 'La Copa América'],
    correctIndex: 1,
    explanation: 'El régimen usó el Mundial de fútbol de 1978, jugado y ganado por Argentina, para proyectar una imagen de normalidad y unidad.',
    accent: 'gold',
  },
  {
    id: 2,
    type: 'truefalse',
    question: 'Durante la dictadura hubo una estricta censura de libros, música y medios de comunicación.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation: 'Verdadero. Se prohibieron obras y autores y se controló fuertemente la programación de radio y televisión.',
    accent: 'ember',
  },
  {
    id: 3,
    type: 'multiple',
    question: '¿En qué año comenzaron las rondas de las Madres de Plaza de Mayo?',
    options: ['1976', '1977', '1980', '1983'],
    correctIndex: 1,
    explanation: 'Las Madres comenzaron a reunirse en Plaza de Mayo en abril de 1977.',
    accent: 'jade',
  },
  {
    id: 4,
    type: 'flashcard',
    question: '¿Qué reclamaban las Madres de Plaza de Mayo en sus rondas semanales?',
    answer: 'La aparición con vida de sus hijos e hijas detenidos-desaparecidos.',
    explanation: 'Su reclamo original —"aparición con vida"— se convirtió en un símbolo de la lucha por los derechos humanos en Argentina.',
    accent: 'ruby',
  },
  {
    id: 5,
    type: 'truefalse',
    question: 'Toda la sociedad argentina resistió activamente a la dictadura desde el primer momento.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 1,
    explanation: 'Falso. La relación de la sociedad con el régimen fue heterogénea: hubo apoyos iniciales en algunos sectores y la resistencia fue creciendo con el tiempo.',
    accent: 'gold',
  },
  {
    id: 6,
    type: 'multiple',
    question: '¿Qué día de la semana realizan (y realizaban) sus rondas las Madres de Plaza de Mayo?',
    options: ['Lunes', 'Miércoles', 'Jueves', 'Sábado'],
    correctIndex: 2,
    explanation: 'Las rondas se realizan los jueves por la tarde en Plaza de Mayo, frente a la Casa Rosada.',
    accent: 'ember',
  },
];

export const lessonArtifactSociedadDictadura: Artifact = {
  name: 'Pañuelo de las Madres',
  rarity: 'LEGENDARIO',
  era: 'DESDE 1977',
  icon: Megaphone,
  description: 'Evoca las rondas de los jueves en Plaza de Mayo, una de las primeras formas de resistencia pública a la dictadura.',
};

export const lessonMetaSociedadDictadura = {
  module: 'Módulo 2',
  title: 'La Sociedad durante la Dictadura',
  subtitle: 'Censura, vida cotidiana y las primeras resistencias',
  steps: [
    { id: 1, label: 'Contexto', icon: Landmark as LucideIcon },
    { id: 2, label: 'Quiz', icon: Vote as LucideIcon },
  ],
};
