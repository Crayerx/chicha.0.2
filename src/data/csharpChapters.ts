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
  /**
   * Texto que se le manda como entrada de teclado al programa (uno por
   * línea, en el orden en que el código llama a Console.ReadLine()).
   * Judge0 no permite tipear en vivo, así que la "entrada" es fija y se
   * muestra al usuario en la UI para que sepa con qué valores se prueba.
   */
  stdin?: string;
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
    description: 'Variables, identificadores, tipos de datos (int, double, bool, char, string), operadores y cómo leer datos desde el teclado.',
    status: 'unlocked',
    intro: {
      title: 'Variables y Tipos de Datos',
      blocks: [
        {
          type: 'heading',
          emoji: '📖',
          text: 'Sintaxis y semántica',
        },
        {
          type: 'paragraph',
          text: 'Antes de escribir más código, dos palabras que vas a escuchar seguido: la sintaxis son las reglas gramaticales de un lenguaje (cómo se escribe cada instrucción, dónde van los puntos y coma, las llaves, etc.). La semántica es el significado de esas instrucciones: qué hacen realmente cuando se ejecutan.',
        },
        {
          type: 'callout',
          text: 'Sintaxis pregunta "¿está bien escrito esto?". Semántica pregunta "¿qué hace este código?". Un programa puede tener sintaxis correcta y aun así hacer algo distinto a lo que vos querías.',
        },
        {
          type: 'heading',
          emoji: '📦',
          text: 'Variables',
        },
        {
          type: 'paragraph',
          text: 'Una variable es un nombre que representa un espacio de memoria donde se guarda un dato. Declararla reserva ese espacio; asignarle un valor lo llena. En C# hay que decir de entrada qué tipo de dato va a guardar esa variable.',
        },
        {
          type: 'code',
          code: `int primerNumero;      // declaración
primerNumero = 234;    // asignación

// o las dos cosas juntas ("inicializar"):
int segundoNumero = 567;`,
        },
        {
          type: 'paragraph',
          text: 'En C# las mayúsculas y minúsculas son distintas: primerNumero y PrimerNumero son dos variables diferentes para el compilador.',
        },
        {
          type: 'heading',
          emoji: '🏷️',
          text: 'Identificadores (nombres de variables)',
        },
        {
          type: 'list',
          items: [
            'Solo pueden tener letras, números y guion bajo ( _ ).',
            'Tienen que empezar con letra o guion bajo, nunca con un número.',
            'No pueden tener espacios.',
            'Evitá tildes y la ñ: no son "estándar" en todos los entornos.',
            'No podés usar palabras reservadas de C# (como int, class, void) como nombre de variable.',
          ],
        },
        {
          type: 'heading',
          emoji: '🔢',
          text: 'Tipos de datos básicos',
        },
        {
          type: 'paragraph',
          text: 'Un tipo de dato define qué valores puede tomar una variable y qué operaciones son válidas sobre ella. Estos son los que vas a usar todo el tiempo:',
        },
        {
          type: 'list',
          items: [
            'int — números enteros (sin decimales). Ej: int edad = 25;',
            'double — números con decimales, doble precisión. Ej: double precio = 19.99;',
            'float — números con decimales, menos precisión que double. Ej: float x = 12.56f;',
            'bool — solo dos valores posibles: true o false.',
            'char — un único carácter, entre comillas simples. Ej: char inicial = \'A\';',
            'string — texto, entre comillas dobles. Ej: string nombre = "Ada";',
          ],
        },
        {
          type: 'heading',
          emoji: '⌨️',
          text: 'Leer datos desde el teclado',
        },
        {
          type: 'paragraph',
          text: 'Console.ReadLine() lee una línea de texto que escribe el usuario y siempre devuelve un string. Si necesitás un número, tenés que convertirlo explícitamente con Convert.ToInt32() (para enteros) o Convert.ToDouble() (para decimales).',
        },
        {
          type: 'code',
          code: `Console.WriteLine("Ingrese un numero");
int numero = Convert.ToInt32(Console.ReadLine());
Console.WriteLine("El numero es " + numero);`,
        },
        {
          type: 'callout',
          text: 'En los ejercicios de este capítulo no vas a poder tipear en vivo: el editor le manda al programa una entrada de prueba ya escrita (la vas a ver marcada como "Entrada de prueba"). Tu Console.ReadLine() la va a leer como si el usuario la hubiera tipeado.',
        },
        {
          type: 'heading',
          emoji: '➕',
          text: 'Operadores',
        },
        {
          type: 'list',
          items: [
            'Aritméticos: + (suma), - (resta), * (multiplicación), / (división), % (resto o módulo).',
            'Relacionales: == (igual a), != (distinto de), <, >, <=, >= — siempre devuelven true o false.',
            'Lógicos de condición: && (Y), || (O), ! (negación) — combinan condiciones booleanas.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El operador + también sirve para concatenar (unir) strings: "Hola, " + nombre pega el texto con el valor de la variable.',
        },
        {
          type: 'heading',
          emoji: '🧱',
          text: 'Bloques y sentencias',
        },
        {
          type: 'paragraph',
          text: 'Una sentencia es una instrucción que hace algo (por ejemplo, una línea que termina en punto y coma). Un bloque es un grupo de sentencias agrupadas entre llaves { }. El cuerpo de Main() ya es un bloque, y vas a ver bloques anidados dentro de otros más adelante (en if, for, etc.).',
        },
        {
          type: 'paragraph',
          text: 'Ahora sí: a practicar con ejercicios reales, basados en tu Práctica 2.',
        },
      ],
    },
    exercises: [
      {
        id: 'csharpclase2-1',
        number: 1,
        title: 'Declarar e Inicializar',
        instructions: [
          'Declará una variable int llamada edad con el valor 25.',
          'Declará una variable string llamada nombre con el valor "Ana".',
          'Mostrá en pantalla exactamente: Ana tiene 25 años',
          'Pista: podés concatenar con +, mezclando texto y variables.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declará "edad" y "nombre", y después imprimí el mensaje

    }
}
`,
        expectedOutput: 'Ana tiene 25 años',
        hint: 'string nombre = "Ana";\nint edad = 25;\nConsole.WriteLine(nombre + " tiene " + edad + " años");',
      },
      {
        id: 'csharpclase2-2',
        number: 2,
        title: 'El Triple de un Número',
        instructions: [
          'Solicitá que se ingrese un número entero y mostrá su triple (basado en el ejercicio 2 de tu Práctica 2).',
          'Leé el número con Console.ReadLine() y convertilo con Convert.ToInt32().',
          'Mostrá solo el resultado (el número, sin texto extra).',
          'Entrada de prueba: 4 → el resultado esperado es 12.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int numero = Convert.ToInt32(Console.ReadLine());
        // Calculá el triple y mostralo

    }
}
`,
        stdin: '4',
        expectedOutput: '12',
        hint: 'Console.WriteLine(numero * 3);',
      },
      {
        id: 'csharpclase2-3',
        number: 3,
        title: 'Promedio de 3 Notas',
        instructions: [
          'Solicitá 3 notas e imprimí el promedio (ejercicio 4 de tu Práctica 2).',
          'El promedio es la suma de los números dividido la cantidad (3).',
          'Leé cada nota con Console.ReadLine() + Convert.ToInt32(), una por línea.',
          'Entrada de prueba: 6, 9 y 12 (una por línea) → el promedio esperado es 9.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int nota1 = Convert.ToInt32(Console.ReadLine());
        int nota2 = Convert.ToInt32(Console.ReadLine());
        int nota3 = Convert.ToInt32(Console.ReadLine());
        // Calculá el promedio (como double) y mostralo

    }
}
`,
        stdin: '6\n9\n12',
        expectedOutput: '9',
        hint: 'double promedio = (nota1 + nota2 + nota3) / 3.0;\nConsole.WriteLine(promedio);',
      },
      {
        id: 'csharpclase2-4',
        number: 4,
        title: 'División y Resto',
        instructions: [
          'Solicitá 2 números y mostrá la división entre ellos y el resto (ejercicio 6 de tu Práctica 2).',
          'Usá / para la división entera y % para el resto (módulo).',
          'Mostrá primero el cociente y después el resto, cada uno en su propia línea.',
          'Entrada de prueba: 17 y 5 → cociente 3, resto 2.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int num1 = Convert.ToInt32(Console.ReadLine());
        int num2 = Convert.ToInt32(Console.ReadLine());
        // Mostrá la división (cociente) y el resto (módulo)

    }
}
`,
        stdin: '17\n5',
        expectedOutput: '3\n2',
        hint: 'Console.WriteLine(num1 / num2);\nConsole.WriteLine(num1 % num2);',
      },
      {
        id: 'csharpclase2-5',
        number: 5,
        title: 'Saludo con Nombre y Apellido',
        instructions: [
          'Pedí que se ingrese un nombre y un apellido, e imprimí un saludo (basado en el ejercicio 10 de tu Práctica 2).',
          'Leé primero el nombre y después el apellido, cada uno en su propia línea.',
          'Mostrá exactamente: Hola, Juan Perez!',
          'Entrada de prueba: Juan y Perez (uno por línea).',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        string nombre = Console.ReadLine();
        string apellido = Console.ReadLine();
        // Armá y mostrá el saludo

    }
}
`,
        stdin: 'Juan\nPerez',
        expectedOutput: 'Hola, Juan Perez!',
        hint: 'Console.WriteLine("Hola, " + nombre + " " + apellido + "!");',
      },
      {
        id: 'csharpclase2-6',
        number: 6,
        title: 'Comparar con Booleanos',
        instructions: [
          'Solicitá 2 números y mostrá si el primero es mayor que el segundo (true o false).',
          'Usá el operador relacional > y guardá el resultado en una variable bool.',
          'Console.WriteLine() de un bool muestra directamente True o False.',
          'Entrada de prueba: 8 y 3 → el resultado esperado es True.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int num1 = Convert.ToInt32(Console.ReadLine());
        int num2 = Convert.ToInt32(Console.ReadLine());
        // Guardá en una variable bool si num1 es mayor que num2, y mostrala

    }
}
`,
        stdin: '8\n3',
        expectedOutput: 'True',
        hint: 'bool esMayor = num1 > num2;\nConsole.WriteLine(esMayor);',
      },
    ],
  },
  {
    id: 'csharpclase3',
    number: 3,
    title: 'Condicionales',
    description: 'Diagramas de flujo, if / if-else / if-else if-else y switch-case para que tu programa tome decisiones.',
    status: 'unlocked',
    intro: {
      title: 'Estructuras de Control: Condicionales',
      blocks: [
        {
          type: 'heading',
          emoji: '🗺️',
          text: 'Diagramas de flujo',
        },
        {
          type: 'paragraph',
          text: 'Un diagrama de flujo es la representación gráfica de un algoritmo: antes de escribir código en C#, dibujar el problema ayuda a ver con claridad qué condiciones hay y qué pasa en cada camino.',
        },
        {
          type: 'list',
          items: [
            '⭕ Círculo — inicio o fin del programa.',
            '▭ Rectángulo — un proceso interno (ej. un cálculo).',
            '▱ Paralelogramo — entrada o salida (leer teclado, mostrar en pantalla).',
            '◇ Rombo — una decisión (una pregunta con dos caminos posibles).',
          ],
        },
        {
          type: 'callout',
          text: 'La dificultad de los condicionales casi siempre está en escribir el código directamente, sin pensar antes el problema. Si podés dibujar el rombo de la decisión y sus dos caminos, ya tenés medio programa resuelto.',
        },
        {
          type: 'heading',
          emoji: '❓',
          text: 'Sentencia if',
        },
        {
          type: 'paragraph',
          text: 'Es la sentencia condicional más simple: evalúa una condición entre paréntesis y, si es true, ejecuta la sentencia que sigue.',
        },
        {
          type: 'code',
          code: `int numero = Convert.ToInt32(Console.ReadLine());
if (numero > 0)
    Console.WriteLine("El numero es positivo.");`,
        },
        {
          type: 'callout',
          text: 'Ojo con las llaves: si el if controla una sola sentencia, las llaves son opcionales. Pero apenas querés que ejecute dos o más líneas cuando la condición se cumple, necesitás agruparlas entre { }.',
        },
        {
          type: 'heading',
          emoji: '🔀',
          text: 'Sentencia if-else',
        },
        {
          type: 'paragraph',
          text: 'Permite establecer qué hacer cuando la condición NO se cumple.',
        },
        {
          type: 'code',
          code: `if (numero > 0)
    Console.WriteLine("El numero es positivo.");
else
    Console.WriteLine("El numero es cero o negativo.");`,
        },
        {
          type: 'heading',
          emoji: '🔗',
          text: 'Sentencia if-else if-else',
        },
        {
          type: 'paragraph',
          text: 'Cuando hay más de dos condiciones excluyentes entre sí, se encadenan con else if. C# evalúa cada condición en orden y ejecuta la primera que dé true; el else final es el "ninguna de las anteriores".',
        },
        {
          type: 'code',
          code: `if (numero < 0)
    Console.WriteLine("El numero es negativo.");
else if (numero == 0)
    Console.WriteLine("El numero es cero.");
else
    Console.WriteLine("El numero es positivo.");`,
        },
        {
          type: 'heading',
          emoji: '🔁',
          text: 'Sentencia switch-case',
        },
        {
          type: 'paragraph',
          text: 'Cuando hay que comparar una misma variable contra muchos valores posibles, encadenar if-else if seguidos es tedioso. La alternativa es switch: compara la expresión contra cada case y ejecuta ese bloque hasta encontrar un break. Si ningún case coincide, se ejecuta default.',
        },
        {
          type: 'code',
          code: `switch (nombre)
{
    case "Juan":
        Console.WriteLine("Bienvenido, Juan.");
        break;
    case "Pedro":
        Console.WriteLine("Que tal, Pedro.");
        break;
    default:
        Console.WriteLine("Procede con cautela, desconocido.");
        break;
}`,
        },
        {
          type: 'callout',
          text: 'Un case sin break "cae" al siguiente: eso sirve para agrupar varios valores que comparten la misma acción (por ejemplo, case \'1\': case \'2\': case \'3\': ... y recién ahí la sentencia común con su break).',
        },
        {
          type: 'heading',
          emoji: '🔢',
          text: 'Repaso: operadores lógicos',
        },
        {
          type: 'list',
          items: [
            'A && B (and) — true solo si A y B son ambas true.',
            'A || B (or) — true si A es true, si B es true, o ambas.',
            '!A (not) — invierte el valor: !true es false y !false es true.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Estos operadores son claves para condiciones compuestas, como "el número es divisible por 4 pero no por 100". Ahora sí, a practicar con ejercicios basados en tu Práctica 3.',
        },
      ],
    },
    exercises: [
      {
        id: 'csharpclase3-1',
        number: 1,
        title: 'Positivo, Negativo o Cero',
        instructions: [
          'Leé un número entero y mostrá si es positivo, negativo o cero (ejercicio 1 de tu Práctica 3).',
          'Usá if / else if / else.',
          'Mostrá exactamente una de estas tres palabras: Positivo, Negativo o Cero.',
          'Entrada de prueba: -5 → el resultado esperado es Negativo.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int numero = Convert.ToInt32(Console.ReadLine());
        // Mostrá "Positivo", "Negativo" o "Cero" según corresponda

    }
}
`,
        stdin: '-5',
        expectedOutput: 'Negativo',
        hint: 'if (numero > 0) Console.WriteLine("Positivo");\nelse if (numero < 0) Console.WriteLine("Negativo");\nelse Console.WriteLine("Cero");',
      },
      {
        id: 'csharpclase3-2',
        number: 2,
        title: 'Divisible por 6',
        instructions: [
          'Leé un número entero y mostrá si es divisible por 6 (ejercicio 2 de tu Práctica 3).',
          'Un número es divisible por 6 si el resto de dividirlo por 6 es cero (usá el operador %).',
          'Mostrá exactamente: Es divisible por 6  o  No es divisible por 6',
          'Entrada de prueba: 18 → el resultado esperado es "Es divisible por 6".',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int numero = Convert.ToInt32(Console.ReadLine());
        // Verificá si numero % 6 es cero y mostrá el mensaje correspondiente

    }
}
`,
        stdin: '18',
        expectedOutput: 'Es divisible por 6',
        hint: 'if (numero % 6 == 0) Console.WriteLine("Es divisible por 6");\nelse Console.WriteLine("No es divisible por 6");',
      },
      {
        id: 'csharpclase3-3',
        number: 3,
        title: 'Mayor y Menor de 4 Números',
        instructions: [
          'Leé 4 números y mostrá el mayor y el menor de todos (ejercicio 3 de tu Práctica 3).',
          'Arrancá suponiendo que el primer número es a la vez el mayor y el menor, y andá comparando contra los otros tres con if.',
          'Mostrá dos líneas exactamente así: Mayor: X y Menor: Y',
          'Entrada de prueba: 8, 3, 15 y 1 (uno por línea) → Mayor: 15 y Menor: 1.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int n1 = Convert.ToInt32(Console.ReadLine());
        int n2 = Convert.ToInt32(Console.ReadLine());
        int n3 = Convert.ToInt32(Console.ReadLine());
        int n4 = Convert.ToInt32(Console.ReadLine());
        // Encontrá el mayor y el menor entre n1, n2, n3 y n4

    }
}
`,
        stdin: '8\n3\n15\n1',
        expectedOutput: 'Mayor: 15\nMenor: 1',
        hint: 'int mayor = n1, menor = n1;\nif (n2 > mayor) mayor = n2;\nif (n3 > mayor) mayor = n3;\nif (n4 > mayor) mayor = n4;\nif (n2 < menor) menor = n2;\nif (n3 < menor) menor = n3;\nif (n4 < menor) menor = n4;\nConsole.WriteLine("Mayor: " + mayor);\nConsole.WriteLine("Menor: " + menor);',
      },
      {
        id: 'csharpclase3-4',
        number: 4,
        title: 'Año Bisiesto',
        instructions: [
          'Leé un año y mostrá si es bisiesto (ejercicio 4 de tu Práctica 3).',
          'Un año es bisiesto si es divisible por 4 y no por 100 — salvo que también sea divisible por 400, en cuyo caso sí es bisiesto.',
          'Combiná && (y) y || (o) en una sola condición.',
          'Mostrá exactamente: Es bisiesto  o  No es bisiesto',
          'Entrada de prueba: 2024 → el resultado esperado es "Es bisiesto".',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int anio = Convert.ToInt32(Console.ReadLine());
        // Verificá la condición de año bisiesto y mostrá el mensaje

    }
}
`,
        stdin: '2024',
        expectedOutput: 'Es bisiesto',
        hint: 'bool bisiesto = (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);\nif (bisiesto) Console.WriteLine("Es bisiesto");\nelse Console.WriteLine("No es bisiesto");',
      },
      {
        id: 'csharpclase3-5',
        number: 5,
        title: 'Día de la Semana',
        instructions: [
          'Dado un número de 1 a 7, mostrá qué día de la semana representa (ejercicio 6 de tu Práctica 3): 1 es Domingo y 7 es Sabado.',
          'Usá switch-case, con un case por número del 1 al 7.',
          'Mostrá solo el nombre del día, sin texto extra.',
          'Entrada de prueba: 3 → el resultado esperado es Martes.',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int dia = Convert.ToInt32(Console.ReadLine());
        switch (dia)
        {
            // Completá un case por cada número del 1 al 7

        }
    }
}
`,
        stdin: '3',
        expectedOutput: 'Martes',
        hint: 'case 1: Console.WriteLine("Domingo"); break;\ncase 2: Console.WriteLine("Lunes"); break;\ncase 3: Console.WriteLine("Martes"); break;\n... y así hasta case 7: Console.WriteLine("Sabado"); break;',
      },
      {
        id: 'csharpclase3-6',
        number: 6,
        title: 'Mayúscula o Minúscula',
        instructions: [
          'Leé un carácter y mostrá si es una letra mayúscula o minúscula (ejercicio 9 de tu Práctica 3).',
          'Una letra es minúscula si está entre \'a\' y \'z\', y mayúscula si está entre \'A\' y \'Z\'.',
          'Convertí la entrada a char con Convert.ToChar().',
          'Mostrá exactamente: Es una MAYUSCULA  o  Es una MINUSCULA',
          'Entrada de prueba: B → el resultado esperado es "Es una MAYUSCULA".',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        char letra = Convert.ToChar(Console.ReadLine());
        // Verificá el rango de la letra y mostrá el mensaje correspondiente

    }
}
`,
        stdin: 'B',
        expectedOutput: 'Es una MAYUSCULA',
        hint: "if (letra >= 'a' && letra <= 'z') Console.WriteLine(\"Es una MINUSCULA\");\nelse if (letra >= 'A' && letra <= 'Z') Console.WriteLine(\"Es una MAYUSCULA\");",
      },
      {
        id: 'csharpclase3-7',
        number: 7,
        title: '¿Forma un Triángulo?',
        instructions: [
          'Dadas 3 longitudes, decí si forman un triángulo (ejercicio 11 de tu Práctica 3).',
          'Regla: forman un triángulo solo si cada lado es menor que la suma de los otros dos.',
          'Combiná las 3 comparaciones con && en una sola condición.',
          'Mostrá exactamente: Forma un triangulo  o  No forma un triangulo',
          'Entrada de prueba: 3, 4 y 5 (uno por línea) → el resultado esperado es "Forma un triangulo".',
        ],
        starterCode: `using System;

class Program
{
    static void Main()
    {
        double a = Convert.ToDouble(Console.ReadLine());
        double b = Convert.ToDouble(Console.ReadLine());
        double c = Convert.ToDouble(Console.ReadLine());
        // Verificá si a, b y c forman un triángulo, y mostrá el mensaje

    }
}
`,
        stdin: '3\n4\n5',
        expectedOutput: 'Forma un triangulo',
        hint: 'bool esTriangulo = (a < b + c) && (b < a + c) && (c < a + b);\nif (esTriangulo) Console.WriteLine("Forma un triangulo");\nelse Console.WriteLine("No forma un triangulo");',
      },
    ],
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
