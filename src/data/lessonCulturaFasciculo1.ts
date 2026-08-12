import type { Lesson } from './lessons';

/**
 * Fascículo 1 — Eje Temático Cultura: Prácticas Culturales UNAJ
 * Contenido extraído y adaptado de Cultura Hack (src/assets/cultura-hack.html)
 * para el motor de lecciones de Chronos.
 */

export const lessonCulturaIntro: Lesson = {
  id: 'cultura-intro',
  title: 'Presentación General de la Materia',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Introducción al eje temático de Cultura según el cuadernillo de Prácticas Culturales UNAJ.',
  steps: [
    {
      type: 'lore',
      text: `**Idea Central:** Prácticas Culturales es una materia del Ciclo Inicial de la UNAJ que busca abrir preguntas sobre la cultura, desnaturalizar nuestra mirada y reconocer la trama que construye nuestras propias prácticas.

### Qué dice el cuadernillo

- La materia forma parte del Ciclo Inicial de todas las carreras de la UNAJ.
- El objetivo es abrir preguntas, no dar definiciones cerradas.
- Se busca reflexionar sobre las prácticas culturales y sobre nuestro rol como actores sociales.
- Las sociedades cristalizan prácticas, conceptos y creencias que, en medio de conflictos, constituyen un campo cultural preferencial.
- Ese campo naturaliza determinadas prácticas en detrimento de otras para establecer un sentido común preferencial.
- La cultura se aborda como un espacio de construcción colectiva de producción y reproducción de sentido.
- Se analiza el rol de las instituciones en la conformación de discursos, valores, formas de estar, sentir y vivir.
- Hay una puja de poder por imponer un sentido construido como si fuera el único, válido y verdadero.

**Concepto clave: desnaturalizar.** Significa dejar de ver algo como "natural" o "obvio" y preguntarse cómo fue construido, por qué y para qué.

**Pregunta para pensar:** ¿Por qué la materia dice que hay que desnaturalizar nuestra mirada?`,
    },
    {
      type: 'quiz',
      question: '¿Cuál es el objetivo principal de la materia Prácticas Culturales?',
      options: [
        'Dar definiciones cerradas sobre cultura',
        'Abrir preguntas y desnaturalizar nuestra mirada',
        'Memorizar autores y fechas',
        'Aprender técnicas de investigación científica',
      ],
      correctIndex: 1,
      explanation: 'La materia busca abrir preguntas sobre la cultura y desnaturalizar nuestra mirada, no dar definiciones cerradas.',
    },
    {
      type: 'lore',
      text: `**La cultura como construcción colectiva**

La cultura no es algo que "tenemos", sino algo que hacemos constantemente en interacción con otros. Es un proceso dinámico de producción y reproducción de sentido.

**Las instituciones** (escuela, familia, medios, Estado, iglesias) juegan un papel fundamental en la conformación de discursos, valores y formas de estar en el mundo.

**El sentido común** no es natural: es el resultado de una puja de poder donde ciertas prácticas se imponen como "únicas", "válidas" y "verdaderas".`,
    },
    {
      type: 'truefalse',
      question: 'La naturalización es el proceso mediante el cual algo construido socialmente aparece como si fuera natural.',
      isTrue: true,
      explanationTrue: '¡Correcto! La naturalización hace que lo construido socialmente parezca "natural" u "obvio", ocultando su origen histórico y social.',
      explanationFalse: 'Incorrecto. La naturalización ES precisamente ese proceso: hacer parecer natural algo que fue construido social e históricamente.',
    },
  ],
};

export const lessonSentidoComun: Lesson = {
  id: 'cultura-sentido',
  title: 'Cultura, Sentido Común y Naturalización',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Introducción: cultura como acciones cotidianas, sentido común y naturalización.',
  steps: [
    {
      type: 'lore',
      text: `**Idea Central:** La materia propone pensar la cultura como acciones cotidianas que construyen colectivamente sentido, y no solamente como bellas artes o instrucción formal.

### Cultura es culturas

- No hay una definición monolítica de cultura.
- La cultura es un espacio dinámico de producción y reproducción colectiva de prácticas.
- Las prácticas cotidianas están cargadas de sentidos construidos socialmente.
- Problematizar nuestras prácticas permite identificar los sentidos que guían nuestra vida.
- Esos sentidos establecen formas "válidas" de estar en el mundo y clasifican lo bueno y lo malo, lo civilizado y lo bárbaro.`,
    },
    {
      type: 'lore',
      text: `### Jauretche: civilización y barbarie

- Arturo Jauretche analiza la "madre de todas las zonceras": civilización y barbarie.
- Esta lógica sigue vigente en expresiones y prácticas actuales.
- El ejemplo del cuadernillo es "no seas indio", expresión que asocia una acción a barbarie, salvajismo o ignorancia.
- Reconocer esto muestra una puja por el poder y por validar un sentido común.

### Naturalización

- La cultura se presenta como un proceso obvio, omnipresente y universal.
- Esa aparente universalidad es producto de un proceso social que borra las marcas de enunciación y construcción.
- A ese proceso lo llamamos naturalización.
- Lo naturalizado aparece como obvio e inevitable.
- **La naturalización no es un punto de partida: es un punto de llegada.**`,
    },
    {
      type: 'quiz',
      question: '¿Qué significa que la naturalización sea un "punto de llegada" y no un "punto de partida"?',
      options: [
        'Que nacemos naturalizados culturalmente',
        'Que es el resultado de un proceso social que oculta su construcción',
        'Que la naturaleza nos da la cultura al nacer',
        'Que es algo biológico e instintivo',
      ],
      correctIndex: 1,
      explanation: 'La naturalización es un punto de llegada porque es el resultado de un proceso social que hace parecer "natural" lo que en realidad fue construido históricamente.',
    },
    {
      type: 'lore',
      text: `**Ejemplos del cuadernillo:**

"Pobres hubo siempre", "el matrimonio normal es entre hombre y mujer", "no seas indio", hábitos cotidianos, formas de relacionarnos, pobreza, riqueza, educación, amor, lugares que habitamos.

### Nietzsche

El cuadernillo menciona a Nietzsche para decir que no hay nada natural en la realidad, sólo interpretaciones que se ponen en tensión hasta que una se impone como si fuera natural o verdadera.`,
    },
    {
      type: 'truefalse',
      question: 'Según Nietzsche, hay elementos naturales en la realidad que existen independientemente de las interpretaciones humanas.',
      isTrue: false,
      explanationTrue: 'Incorrecto. Nietzsche sostiene que no hay nada natural en la realidad, solo interpretaciones que compiten hasta que una se impone como "verdadera".',
      explanationFalse: '¡Correcto! Para Nietzsche no existe nada naturalmente dado: todo es interpretación, y lo que llamamos "verdad" es simplemente la interpretación que logró imponerse.',
    },
  ],
};

export const lessonPracticasInventadas: Lesson = {
  id: 'cultura-practicas',
  title: 'Julio Cortázar: "Qué tal, López"',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Cortázar muestra que muchas acciones cotidianas ya están inventadas.',
  steps: [
    {
      type: 'lore',
      text: `**Idea Central:** Cortázar muestra que muchas acciones cotidianas ya están inventadas. Las repetimos como si fueran propias, pero en realidad nos "calzamos" en prácticas preexistentes.

### El saludo inventado

Un señor saluda a otro dándole la mano e inclinando la cabeza. Cree que lo saluda, pero el saludo ya está inventado: el señor no hace más que calzar en el saludo.

### El tobogán prefabricado

Cuando un señor se refugia bajo una arcada porque llueve, Cortázar dice que resbala por un tobogán prefabricado desde la primera lluvia y la primera arcada. Es una imagen para mostrar que hasta los gestos cotidianos están moldeados.`,
    },
    {
      type: 'lore',
      text: `### Los gestos del amor

Los gestos del amor aparecen como un "dulce museo", una galería de figuras de humo. Incluso lo más íntimo puede estar lleno de formas heredadas.

### Hamlet

Hamlet no duda: busca la solución auténtica y no los caminos ya hechos. Quiere la tangente que triza el misterio, la quinta hoja del trébol.

### Cuando los zapatos aprietan

Cuando los zapatos aprietan, buena señal: algo cambia. Lo verdaderamente nuevo da miedo o maravilla. Los monstruos muestran un posible salto hacia lo otro.`,
    },
    {
      type: 'quiz',
      question: '¿Qué quiere decir Cortázar con "calzar en el saludo"?',
      options: [
        'Que los saludos son cómodos como zapatos',
        'Que usamos gestos preexistentes como si fueran propios',
        'Que debemos inventar nuevos saludos',
        'Que los saludos son naturales e instintivos',
      ],
      correctIndex: 1,
      explanation: '"Calzar en el saludo" significa que usamos gestos y prácticas que ya existían antes, repitiéndolos como si fueran nuestros cuando en realidad son culturalmente heredados.',
    },
    {
      type: 'lore',
      text: `### Final

Aparece López: "¿Qué tal, López?" "¿Qué tal, che?" Y así es como creen que se saludan.

**Relación con la materia:** Cortázar sirve para pensar que muchas prácticas cotidianas están culturalmente inventadas y que podemos interrogarlas.`,
    },
    {
      type: 'truefalse',
      question: 'Según Cortázar, incluso los gestos más íntimos del amor pueden estar llenos de formas heredadas culturalmente.',
      isTrue: true,
      explanationTrue: '¡Correcto! Cortázar muestra que hasta lo que sentimos como más personal y auténtico (los gestos del amor) puede estar moldeado por formas culturales preexistentes.',
      explanationFalse: 'Incorrecto. Para Cortázar, incluso lo más íntimo (los gestos del amor) aparece como un "dulce museo" de figuras heredadas, no como algo puramente natural o espontáneo.',
    },
  ],
};

export const lessonCajasNegras: Lesson = {
  id: 'cultura-cajas',
  title: 'Cajas Negras',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Cosas que usamos sin saber cómo funcionan.',
  steps: [
    {
      type: 'lore',
      text: `Una **caja negra** es algo que usamos todos los días pero no sabemos cómo funciona por dentro. Apagás la luz y no pensás en el circuito eléctrico. Mandás un WhatsApp y no pensás en los servidores, el código, la red satelital.

Esto no es ignorancia: es **necesidad**. El mundo es demasiado complejo como para saber cómo funciona todo. Delegamos en expertos, confiamos en sistemas, y nos concentramos en lo que necesitamos hacer.

El problema surge cuando tratamos las cajas negras como si fueran mágicas o inevitables, sin reconocer que fueron diseñadas por personas con intereses específicos.`,
    },
    {
      type: 'sliderestimate',
      question: '¿Qué porcentaje de los objetos que usás diariamente sabés explicar cómo funcionan por dentro?',
      minLabel: '0%',
      maxLabel: '100%',
      correctMin: 5,
      correctMax: 20,
      explanation: 'La mayoría de las personas sabe explicar el funcionamiento interno de menos del 20% de los objetos que usa diariamente. ¡Y está bien! No podríamos funcionar si tuviéramos que entender todo desde cero.',
    },
    {
      type: 'lore',
      text: `Las tecnologías digitales son cajas negras particularmente opacas. Usás redes sociales, buscadores, aplicaciones... pero ¿sabés realmente cómo funcionan los algoritmos que deciden qué ves?

Estos algoritmos no son neutrales: están diseñados para maximizar ciertos objetivos (tiempo en pantalla, clics, compras). Y al hacerlo, **moldean nuestro comportamiento** sin que nos demos cuenta.

Abrir la caja negra significa preguntarnos: ¿quién diseñó esto? ¿Para qué propósito? ¿Qué intereses hay detrás? ¿Qué alternativas existen?`,
    },
    {
      type: 'truefalse',
      question: 'Las cajas negras tecnológicas son neutrales y objetivas en su funcionamiento.',
      isTrue: false,
      explanationTrue: 'Incorrecto. Las tecnologías son diseñadas por personas con objetivos e intereses específicos. No son neutrales.',
      explanationFalse: '¡Correcto! Las tecnologías son diseñadas por personas con propósitos específicos. Los algoritmos, por ejemplo, optimizan para ciertos objetivos que reflejan los intereses de quienes los crearon.',
    },
    {
      type: 'lore',
      text: `No solo la tecnología son cajas negras. También lo son muchas **instituciones**: el banco, el gobierno, el sistema educativo. Sabemos que existen, interactuamos con ellas, pero pocas veces entendemos realmente cómo toman decisiones.

Hacer visible lo invisible es una tarea política: cuando entendemos cómo funcionan las cajas negras, podemos decidir si queremos que sigan funcionando así o si preferimos cambiarlas.

La próxima vez que uses algo sin cuestionarlo, preguntate: ¿qué hay adentro de esta caja negra?`,
    },
  ],
};

export const lessonFronterasSimbolicas: Lesson = {
  id: 'cultura-fronteras',
  title: 'Fronteras Simbólicas',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Los límites que trazamos entre "nosotros" y "los otros".',
  steps: [
    {
      type: 'lore',
      text: `Las fronteras no son solo líneas en un mapa. También son **límites simbólicos** que trazamos en nuestra vida cotidiana para separar "lo nuestro" de "lo ajeno", "lo normal" de "lo raro", "nosotros" de "ellos".

Estas fronteras son invisibles pero muy reales en sus efectos. Definen quién pertenece y quién queda afuera, qué comportamientos son aceptables y cuáles no, qué voces merecen ser escuchadas y cuáles pueden ser ignoradas.

Pensemos en el lenguaje: ¿cuándo decimos que alguien "habla bien"? Generalmente, cuando habla como hablamos nosotros. Cuando usa el acento, las palabras, las expresiones de nuestro grupo.`,
    },
    {
      type: 'categorize',
      instruction: 'Clasificá estas expresiones como "Inclusivas" o "Excluyentes"',
      items: [
        { text: '"Gente como uno"', correctCategory: 'Excluyentes' },
        { text: '"Todas las personas"', correctCategory: 'Inclusivas' },
        { text: '"Nuestro tipo de gente"', correctCategory: 'Excluyentes' },
        { text: '"La diversidad nos enriquece"', correctCategory: 'Inclusivas' },
        { text: '"Los de siempre"', correctCategory: 'Excluyentes' },
        { text: '"Cualquiera puede participar"', correctCategory: 'Inclusivas' },
      ],
      categories: ['Inclusivas', 'Excluyentes'],
      explanation: 'Las expresiones excluyentes marcan fronteras entre "nosotros" y "los otros". Las inclusivas buscan ampliar el círculo de pertenencia.',
    },
    {
      type: 'lore',
      text: `Las fronteras simbólicas se vuelven especialmente visibles cuando alguien las cruza. Imaginá una persona que llega a un país nuevo: rápidamente descubre reglas no escritas sobre cómo saludar, cuánto espacio personal dejar, qué temas se pueden hablar.

Si no las cumple, puede recibir miradas raras, comentarios, exclusión. Esas reacciones son las **fronteras haciéndose visibles**: le están diciendo "acá no se hace así".

Pero esas reglas no son naturales: son acuerdos tácitos que ese grupo construyó. En otro lado, podrían ser diferentes.`,
    },
    {
      type: 'quiz',
      question: '¿Qué función cumplen principalmente las fronteras simbólicas?',
      options: [
        'Proteger físicamente a un grupo de peligros externos',
        'Definir quiénes pertenecen al grupo y quiénes quedan afuera',
        'Separar territorios geográficos entre países',
        'Establecer leyes escritas que todos deben cumplir',
      ],
      correctIndex: 1,
      explanation: 'Las fronteras simbólicas definen la pertenencia grupal: marcan quiénes son "uno de nosotros" y quiénes son "los otros". No son físicas sino culturales.',
    },
    {
      type: 'lore',
      text: `Las fronteras también se trazan sobre los cuerpos: qué es "apropiado" vestir, cómo es un cuerpo "saludable" o "bello", qué modificaciones son aceptables y cuáles no.

Estos mandatos cambian con el tiempo y varían entre culturas. Lo que en un lugar se considera "normal", en otro puede ser motivo de rechazo.

Reconocer estas fronteras nos permite elegir: ¿quiero respetarlas? ¿quiero desafiarlas? ¿quiero proponer otras? La cultura no es un destino: es un campo de posibilidades.`,
    },
  ],
};

export const lessonFrentesCulturales: Lesson = {
  id: 'cultura-frentes',
  title: 'Frentes Culturales',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Espacios donde se disputan los sentidos de la cultura.',
  steps: [
    {
      type: 'lore',
      text: `La cultura no es un acuerdo pacífico: es un **campo de disputa**. Diferentes grupos pugnan por imponer su visión del mundo, sus valores, sus formas de vida.

A estos espacios de lucha los llamamos **frentes culturales**. Pueden ser la escuela, los medios de comunicación, las redes sociales, el arte, la política, la religión.

En cada frente hay actores con distintos poderes: algunos tienen más recursos para difundir sus ideas, otros tienen más acceso a plataformas, otros tienen más reconocimiento social.`,
    },
    {
      type: 'lore',
      text: `Pensemos en el lenguaje: ¿por qué decimos "descubrimiento de América" en lugar de "invasión europea"? ¿Por qué "golpe de Estado" en lugar de "dictadura cívico-militar"?

Las palabras no son inocentes: **nombrar es un acto político**. Quien logra imponer su vocabulario, impone también su interpretación de la realidad.

Los movimientos sociales lo saben: por eso luchan por cambiar términos ("discapacitado" → "persona con discapacidad"), por visibilizar nombres olvidados, por contar historias desde otras perspectivas.`,
    },
    {
      type: 'matchpairs',
      pairs: [
        { term: 'Medios masivos', definition: 'Difunden versiones hegemónicas de la realidad' },
        { term: 'Redes sociales', definition: 'Permiten circular narrativas alternativas' },
        { term: 'Escuela', definition: 'Transmite cultura oficial y también resiste' },
        { term: 'Arte callejero', definition: 'Cuestiona sentidos establecidos' },
      ],
      instruction: 'Emparejá cada espacio cultural con su rol en la disputa de sentidos.',
      explanation: 'Cada frente cultural tiene un rol específico: algunos reproducen la visión dominante, otros permiten expresar visiones alternativas.',
    },
    {
      type: 'truefalse',
      question: 'La cultura es un acuerdo pacífico donde todos coinciden.',
      isTrue: false,
      explanationTrue: 'Incorrecto. La cultura es un campo de disputa donde diferentes grupos pugnan por imponer sus visiones del mundo.',
      explanationFalse: '¡Exacto! La cultura no es un consenso armonioso: es un espacio de conflicto donde se enfrentan diferentes interpretaciones de la realidad.',
    },
    {
      type: 'lore',
      text: `Vos también formás parte de los frentes culturales. Cada vez que compartís algo en redes, que discutís con alguien, que elegís consumir cierto contenido y no otro, estás tomando posición.

No hace falta ser un activista profesional para participar en la disputa cultural. Basta con **no dar por sentado** lo que nos presentan como "obvio", con preguntar "¿quién dice esto?", "¿por qué?", "¿a quién beneficia?".

La cultura la hacemos todos, en cada gesto cotidiano. La pregunta es: ¿qué cultura queremos hacer?`,
    },
  ],
};

/**
 * Array con todas las lecciones del Fascículo 1 de Prácticas Culturales.
 * Se usa en lessons.ts para registrarlas en el sistema.
 */
export const culturaFasciculo1Lessons: Lesson[] = [
  lessonCulturaIntro,
  lessonSentidoComun,
  lessonPracticasInventadas,
  lessonCajasNegras,
  lessonFronterasSimbolicas,
  lessonFrentesCulturales,
];
