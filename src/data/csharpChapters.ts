export interface CSharpExercise {
  /** Único en toda la materia, ej. 'csharpclase1-1'. */
  id: string;
  /** Número dentro del capítulo (1-indexado) — coincide con `completed_steps`. */
  number: number;
  title: string;
  /** Párrafos de instrucciones, se renderizan uno debajo del otro. */
  instructions: string[];
  /** Código que aparece precargado en el editor. */
  starterCode: string;
  /** Se compara contra stdout (recortado) para dar por resuelto el ejercicio. */
  expectedOutput: string;
  hint: string;
}

/** Bloques de contenido para la lección de introducción de un capítulo (estilo "lore" de lectura). */
export type CSharpIntroBlock =
  | { type: 'heading'; emoji?: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; code: string }
  | { type: 'callout'; text: string };

export interface CSharpChapterIntro {
  title: string;
  blocks: CSharpIntroBlock[];
}

export interface CSharpChapter {
  /** Coincide con el `lesson_id` usado en la tabla `lesson_progress`. */
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'unlocked' | 'locked';
  /** Lección de lectura opcional que se muestra antes del primer ejercicio. */
  intro?: CSharpChapterIntro;
  exercises: CSharpExercise[];
}

/** XP que otorga resolver un ejercicio de código (más que lore/quiz: implica escribir y compilar). */
export const EXERCISE_XP = 15;

export const csharpChapters: CSharpChapter[] = [
  {
    id: 'csharpclase1',
    number: 1,
    title: 'Fundamentos',
    description: 'Escribí y compilá tus primeros programas: qué es C#, cómo mostrar texto en pantalla y las reglas básicas de sintaxis.',
    status: 'unlocked',
    intro: {
      title: '¿Qué es C#?',
      blocks: [
        {
          type: 'heading',
          emoji: '⚔️',
          text: '¿Qué es C#?',
        },
        {
          type: 'paragraph',
          text: '¡Bienvenido al comienzo de tu viaje como programador! Vamos a aprender C# (se pronuncia "C sharp"), un lenguaje de programación creado por Microsoft en el año 2000, liderado por el ingeniero Anders Hejlsberg.',
        },
        {
          type: 'paragraph',
          text: 'C# es un lenguaje de propósito general: sirve para crear videojuegos, aplicaciones de escritorio, apps web y hasta apps para celulares. Es potente, prolijo y una excelente puerta de entrada a la programación.',
        },
        {
          type: 'paragraph',
          text: 'Un programa es simplemente una lista de instrucciones escritas en un lenguaje que la computadora puede entender y ejecutar en orden, de arriba hacia abajo.',
        },
        {
          type: 'paragraph',
          text: 'C# no funciona solo: forma parte de un ecosistema más grande. Estas son las piezas con las que te vas a cruzar seguido:',
        },
        {
          type: 'list',
          items: [
            '⚔️ C# — el lenguaje: la sintaxis y las reglas con las que escribís tu lógica.',
            '🛡️ .NET — el framework/runtime que ejecuta tu código C# (el motor por detrás).',
            '🎮 Unity — el motor de videojuegos más usado que usa C# como su lenguaje de scripting.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En este curso nos vamos a enfocar en el lenguaje C# en sí: cómo escribir, compilar y ejecutar programas reales, paso a paso.',
        },
        {
          type: 'callout',
          text: 'Todo programa en C# arranca en el mismo lugar: un método especial llamado Main(). Ahí es donde la computadora empieza a leer tus instrucciones.',
        },
        {
          type: 'paragraph',
          text: 'Para mostrar texto en pantalla usamos Console.WriteLine(), que imprime lo que le pases entre paréntesis y comillas. Así se ve un programa mínimo en C#:',
        },
        {
          type: 'code',
          code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hola Mundo");
    }
}`,
        },
        {
          type: 'paragraph',
          text: 'Tenemos un compilador real esperándote en el próximo ejercicio: vas a escribir tu primer programa y ver el resultado en pantalla al toque.',
        },
      ],
    },
    exercises: [
      {
        id: 'csharpclase1-1',
        number: 1,
        title: 'Hola Mundo',
        instructions: [
          'Todo programa en C# necesita un método Main(): es el punto de partida, lo primero que se ejecuta.',
          'Para mostrar texto en pantalla se usa Console.WriteLine("texto");',
          'Completá el programa para que muestre exactamente: Hola Mundo',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Escribí tu código en la línea de abajo

    }
}
`,
        expectedOutput: 'Hola Mundo',
        hint: 'Dentro de Main(), escribí: Console.WriteLine("Hola Mundo");',
      },
      {
        id: 'csharpclase1-2',
        number: 2,
        title: 'Write vs WriteLine',
        instructions: [
          'Console.WriteLine() escribe el texto y salta a la línea siguiente.',
          'Console.Write() escribe el texto pero NO salta de línea: lo próximo que se imprima queda pegado.',
          'Usá dos Console.Write() para que el programa muestre, todo junto en una sola línea: AB',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Escribí tu código en la línea de abajo

    }
}
`,
        expectedOutput: 'AB',
        hint: 'Console.Write("A"); seguido de Console.Write("B"); — sin WriteLine, quedan pegados.',
      },
      {
        id: 'csharpclase1-3',
        number: 3,
        title: 'Comentarios',
        instructions: [
          'Los comentarios documentan el código sin afectar la ejecución: el programa los ignora por completo.',
          'Se escriben con // para una sola línea.',
          'Agregá un comentario arriba de tu código explicando qué hace, y hacé que el programa muestre: Aprendiendo C#',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Escribí un comentario y tu código en las líneas de abajo

    }
}
`,
        expectedOutput: 'Aprendiendo C#',
        hint: '// Este programa imprime un mensaje\nConsole.WriteLine("Aprendiendo C#");',
      },
      {
        id: 'csharpclase1-4',
        number: 4,
        title: 'Operaciones Básicas',
        instructions: [
          'C# puede hacer cuentas directamente dentro de Console.WriteLine().',
          'Hacé que el programa calcule 2 + 3 y muestre el resultado en pantalla (solo el número, sin texto extra).',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Escribí tu código en la línea de abajo

    }
}
`,
        expectedOutput: '5',
        hint: 'Console.WriteLine(2 + 3); — C# calcula la suma antes de imprimir el resultado.',
      },
      {
        id: 'csharpclase1-5',
        number: 5,
        title: 'Tu Primer Programa Completo',
        instructions: [
          'Declará una variable de texto con: string nombre = "Codédex";',
          'Después usala para mostrar en pantalla: Hola, Codédex',
          'Pista: en C#, el símbolo + une (concatena) texto con texto.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declará tu variable "nombre" y después imprimí el saludo

    }
}
`,
        expectedOutput: 'Hola, Codédex',
        hint: 'string nombre = "Codédex";\nConsole.WriteLine("Hola, " + nombre);',
      },
    ],
  },
  {
    id: 'csharpclase2',
    number: 2,
    title: 'Variables y Tipos',
    description: 'Próximamente: variables, tipos de datos (int, string, bool, double) y conversión entre tipos.',
    status: 'locked',
    exercises: [],
  },
  {
    id: 'csharpclase3',
    number: 3,
    title: 'Condicionales',
    description: 'Próximamente: if, else if, else y el operador switch para tomar decisiones en el código.',
    status: 'locked',
    exercises: [],
  },
  {
    id: 'csharpclase4',
    number: 4,
    title: 'Bucles',
    description: 'Próximamente: while, do-while y for para repetir acciones sin escribir el mismo código mil veces.',
    status: 'locked',
    exercises: [],
  },
  {
    id: 'csharpclase5',
    number: 5,
    title: 'Arrays y Colecciones',
    description: 'Próximamente: arrays, listas y cómo guardar y recorrer varios datos juntos.',
    status: 'locked',
    exercises: [],
  },
  {
    id: 'csharpclase6',
    number: 6,
    title: 'Métodos y POO',
    description: 'Próximamente: métodos, parámetros y una primera introducción a clases y objetos.',
    status: 'locked',
    exercises: [],
  },
  {
    id: 'csharpintegradores',
    number: 7,
    title: 'Integradores',
    description: 'Próximamente: ejercicios integradores que combinan todo lo visto en las clases 1 a 6.',
    status: 'locked',
    exercises: [],
  },
];

export function getChapter(chapterId: string): CSharpChapter | undefined {
  return csharpChapters.find((c) => c.id === chapterId);
}

export function getExercise(chapterId: string, exerciseNumber: number): CSharpExercise | undefined {
  return getChapter(chapterId)?.exercises.find((e) => e.number === exerciseNumber);
}

export const csharpTotals = {
  chapters: csharpChapters.length,
  exercises: csharpChapters.reduce((sum, c) => sum + c.exercises.length, 0),
};
