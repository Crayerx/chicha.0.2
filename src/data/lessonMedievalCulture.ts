/**
 * Datos para el módulo "Prácticas Culturales Medievales"
 * Contiene los 3 fascículos con su contenido educativo.
 */

export interface Fasciculo {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
}

export const fasciculosMedievales: Fasciculo[] = [
  {
    id: 'fasciculo-1',
    title: 'Fascículo 1',
    description: 'Introducción a las costumbres cotidianas y la vida en el feudo.',
    content: `# Fascículo 1: La Vida Cotidiana

En este fascículo exploraremos cómo era un día típico en la Edad Media para las diferentes clases sociales.

## La Jornada Laboral
El amanecer marcaba el inicio de la jornada para la mayoría de la población. Las tareas agrícolas dependían estrictamente de las estaciones del año.

## Alimentación
La dieta variaba drásticamente según la posición social. Mientras los campesinos se alimentaban principalmente de pan, legumbres y verduras, la nobleza disfrutaba de carnes asadas y especias exóticas.

## Vestimenta
La ropa no solo protegía del clima, sino que indicaba claramente el estatus social. Las leyes suntuarias regulaban qué telas y colores podían usar cada clase.`,
    order: 1
  },
  {
    id: 'fasciculo-2',
    title: 'Fascículo 2',
    description: 'Rituales religiosos, festividades y el papel de la Iglesia en la cultura.',
    content: `# Fascículo 2: Rituales y Festividades

La religión permeaba cada aspecto de la vida medieval, marcando el calendario y las costumbres.

## El Calendario Litúrgico
Las festividades religiosas estructuraban el año. Desde la Navidad hasta la San Juan, cada celebración tenía sus propios rituales y significados comunitarios.

## Peregrinaciones
Los viajes a lugares sagrados como Santiago de Compostela o Roma eran comunes. Estas peregrinaciones combinaban devoción religiosa con aventura y comercio.

## Ritos de Paso
El bautismo, el matrimonio y la extremaunción marcaban los momentos cruciales de la vida, reforzando los lazos comunitarios y espirituales.`,
    order: 2
  },
  {
    id: 'fasciculo-3',
    title: 'Fascículo 3',
    description: 'Arte, música, juegos y la transmisión oral del conocimiento.',
    content: `# Fascículo 3: Arte y Entretenimiento

La cultura medieval floreció a través de diversas expresiones artísticas y formas de ocio.

## Trovadores y Juglares
Estos artistas itinerantes eran los guardianes de la tradición oral, difundiendo noticias, leyendas y poesía musicalizada por castillos y aldeas.

## Juegos y Deportes
Desde el ajedrez, considerado el juego de la nobleza, hasta justas y torneos que demostraban prowess militar, el entretenimiento variaba según la clase.

## Arquitectura y Arte
El estilo románico y posteriormente el gótico transformaron el paisaje con catedrales impresionantes, mientras que los manuscritos iluminados preservaban el conocimiento con delicada artesanía.`,
    order: 3
  }
];
