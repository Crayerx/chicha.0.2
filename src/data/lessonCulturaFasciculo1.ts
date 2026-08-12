import type { Lesson } from './lessons';

/**
 * Fascículo 1 — Eje Temático Cultura: Prácticas Culturales UNAJ
 * Basado en el contenido original de Cultura Hack pero adaptado al motor
 * de lecciones de Chronos (lore + actividades interactivas).
 */

export const lessonCulturaIntro: Lesson = {
  id: 'cultura-intro',
  title: 'Introducción a la Cultura',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: '¿Qué es la cultura? Sentido común, naturalización y prácticas sociales.',
  steps: [
    {
      type: 'lore',
      text: `La cultura es todo aquello que creamos los seres humanos para vivir en sociedad. No nacemos sabiendo cómo comportarnos: lo aprendemos de otros, lo transmitimos, lo modificamos.

Cuando pensamos en "cultura", a veces imaginamos museos, teatros o libros. Pero la cultura es mucho más que eso: está en cómo saludamos, en qué comemos, en cómo nos vestimos, en qué consideramos "normal" o "raro".

En este fascículo vamos a explorar cómo funciona la cultura, cómo se construye el sentido común y por qué algunas cosas nos parecen "naturales" cuando en realidad fueron inventadas por otras personas en algún momento histórico.`,
    },
    {
      type: 'lore',
      text: `El **sentido común** es ese conjunto de ideas que damos por sentadas, que no cuestionamos porque "siempre fueron así". Pero si miramos con atención, descubrimos que lo que es "obvio" para nosotros puede ser completamente extraño para alguien de otra época o lugar.

Por ejemplo: ¿es "natural" comer tres veces al día? ¿O es una práctica cultural que aprendimos? ¿Es "natural" usar ropa? ¿O es una invención humana que varía según el clima, la época y el grupo social?

La antropología nos invita a hacer algo simple pero revolucionario: **poner entre paréntesis** lo que damos por sentado y preguntarnos: ¿por qué esto es así? ¿Quiénes lo decidieron? ¿Podría ser de otra manera?`,
    },
    {
      type: 'truefalse',
      question: 'El sentido común es universal y vale para todas las culturas por igual.',
      isTrue: false,
      explanationTrue: 'Incorrecto. El sentido común varía según cada cultura, época y grupo social. Lo que es "obvio" en un lugar puede ser extraño en otro.',
      explanationFalse: '¡Exacto! El sentido común no es universal: cambia según la cultura, la época y el contexto. Lo que parece "natural" en un lugar puede ser completamente diferente en otro.',
    },
    {
      type: 'lore',
      text: `Las **prácticas culturales** son las acciones concretas que realizamos como parte de nuestra vida en sociedad: saludar, comer, trabajar, celebrar, estudiar, jugar.

Algunas prácticas son muy antiguas y se transmitieron por generaciones. Otras son recientes y surgieron como respuesta a nuevas necesidades. Todas ellas, sin embargo, comparten algo: **no son naturales, son inventadas**.

Esto no significa que sean "falsas" o "artificiales" en sentido negativo. Significa que fueron creadas por personas en contextos históricos específicos, y que podrían haber sido (y pueden ser) de otra manera.`,
    },
    {
      type: 'categorize',
      instruction: 'Clasificá estas prácticas como "Naturales" o "Culturales"',
      items: [
        { text: 'Respirar', correctCategory: 'Naturales' },
        { text: 'Saludar con la mano', correctCategory: 'Culturales' },
        { text: 'Dormir', correctCategory: 'Naturales' },
        { text: 'Usar cubiertos', correctCategory: 'Culturales' },
        { text: 'Llorar', correctCategory: 'Naturales' },
        { text: 'Celebrar cumpleaños', correctCategory: 'Culturales' },
      ],
      categories: ['Naturales', 'Culturales'],
      explanation: 'Las prácticas naturales son funciones biológicas que compartimos con otros seres vivos. Las prácticas culturales son invenciones humanas que varían según el contexto social e histórico.',
    },
    {
      type: 'lore',
      text: `Ahora que entendemos la diferencia entre lo natural y lo cultural, podemos empezar a mirar nuestro mundo con otros ojos.

Vamos a explorar conceptos clave como las **prácticas inventadas**, las **cajas negras** (cosas que usamos sin saber cómo funcionan), las **fronteras simbólicas** (límites que trazamos entre "nosotros" y "los otros") y los **frentes culturales** (espacios donde se disputan sentidos).

Cada uno de estos conceptos nos va a ayudar a comprender mejor cómo funciona la cultura y cuál es nuestro lugar en ella.`,
    },
  ],
};

export const lessonSentidoComun: Lesson = {
  id: 'cultura-sentido',
  title: 'El Sentido Común',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Cómo se construye lo que damos por sentado.',
  steps: [
    {
      type: 'lore',
      text: `El sentido común es esa voz interior que nos dice qué es "lógico", qué es "normal", qué "debería ser así". Pero esta voz no viene de la naturaleza: viene de la cultura.

Imaginá que estás caminando por la calle y ves a alguien gritando solo. Probablemente pienses: "está loco". Pero, ¿y si estuviera grabando un audio? ¿O hablando por teléfono con auricular invisible? Nuestro juicio depende de lo que conocemos, de lo que nos resulta familiar.

El sentido común funciona como un **atajo mental**: nos permite tomar decisiones rápidas sin tener que analizar cada situación desde cero. Pero ese atajo tiene un costo: nos hace creer que nuestras ideas son "evidentes" cuando en realidad son producto de nuestra historia personal y social.`,
    },
    {
      type: 'fillblanks',
      text: 'El sentido común nos hace creer que nuestras ideas son ________, cuando en realidad son producto de nuestra ________ personal y social.',
      answers: ['evidentes', 'historia'],
      hint: 'Pensamos que lo que creemos es obvio, pero viene de nuestro recorrido de vida.',
      explanation: 'El sentido común nos hace pensar que nuestras creencias son evidentes u obvias, pero en realidad son el resultado de nuestra historia personal y del contexto social en el que vivimos.',
    },
    {
      type: 'lore',
      text: `Los **estereotipos** son una forma de sentido común: son ideas simplificadas sobre grupos de personas que tomamos como verdades absolutas.

"Los jóvenes son irresponsables", "las mujeres son más sensibles", "los extranjeros vienen a quitarnos el trabajo": todas estas son generalizaciones que ignoran la complejidad real de las personas.

Los estereotipos no son "mentiras" en el sentido de que alguien las inventó con mala intención. Son **construcciones culturales** que surgen de repetir ciertas ideas hasta que parecen "obvias". El problema es que nos impiden ver a las personas como individuos únicos.`,
    },
    {
      type: 'quiz',
      question: '¿Cuál de estas afirmaciones describe mejor el sentido común?',
      options: [
        'Es un conocimiento innato que todos tenemos al nacer',
        'Es un conjunto de ideas aprendidas que damos por sentadas',
        'Es la suma de todos los conocimientos científicos',
        'Es una verdad universal que vale para todas las épocas',
      ],
      correctIndex: 1,
      explanation: 'El sentido común está formado por ideas que aprendemos de nuestra cultura y que luego damos por sentadas, como si fueran "obvias" o "naturales". No es innato ni universal.',
    },
    {
      type: 'lore',
      text: `Desnaturalizar el sentido común es uno de los objetivos principales de las ciencias sociales. Se trata de **hacer extraño lo familiar**, de mirar con ojos nuevos lo que siempre vimos.

Esto no significa rechazar todo lo que sabemos. Significa preguntarnos: ¿por qué pienso esto? ¿Quién me enseñó que esto es así? ¿Podría ser de otra manera?

Cuando logramos hacer este ejercicio, descubrimos que muchas cosas que parecían "inmutables" en realidad cambiaron a lo largo del tiempo, y que podrían seguir cambiando.`,
    },
  ],
};

export const lessonPracticasInventadas: Lesson = {
  id: 'cultura-practicas',
  title: 'Prácticas Inventadas',
  category: 'PRÁCTICAS CULTURALES',
  era: 'FASCÍCULO 1',
  description: 'Tradiciones que parecen antiguas pero fueron creadas recientemente.',
  steps: [
    {
      type: 'lore',
      text: `Muchas tradiciones que parecen milenarias en realidad fueron inventadas hace poco tiempo. Los historiadores Eric Hobsbawm y Terence Ranger llamaron a esto **"la invención de la tradición"**.

Un ejemplo clásico: las bodas blancas con vestido blanco y ramo de flores. El vestido blanco se popularizó recién en 1840, cuando la reina Victoria se casó así. Antes, las novias usaban simplemente su mejor vestido, de cualquier color.

Otro ejemplo: los escudos y himnos nacionales. Muchos países los adoptaron recién en el siglo XIX, durante el auge de los estados-nación. Parecen "eternos", pero tienen una fecha de creación concreta.`,
    },
    {
      type: 'timeline',
      events: [
        { year: '1840', event: 'La reina Victoria usa vestido blanco de novia', correct: true },
        { year: '1500', event: 'Se establece el vestido blanco como tradición', correct: false },
        { year: '1900', event: 'Se inventa la tradición del ramo de flores', correct: false },
      ],
      instruction: 'Ordená cronológicamente estos eventos sobre la tradición del vestido blanco de novia.',
      explanation: 'El vestido blanco de novia se popularizó en 1840 cuando la reina Victoria lo usó en su boda. Antes de eso, no existía esa "tradición".',
    },
    {
      type: 'lore',
      text: `¿Por qué se inventan tradiciones? Generalmente para **crear continuidad con un pasado idealizado**, incluso si esa continuidad es ficticia.

Las tradiciones inventadas suelen servir para:
- **Unificar** a un grupo bajo símbolos comunes
- **Legitimar** instituciones o relaciones de autoridad
- **Socializar** a las personas en valores específicos

No hay nada "malo" en que las tradiciones sean inventadas. Todas las tradiciones fueron creadas en algún momento. Lo importante es reconocerlo para no caer en la trampa de pensar que "siempre fue así" y por lo tanto "no puede cambiar".`,
    },
    {
      type: 'matchpairs',
      pairs: [
        { term: 'Escudos nacionales', definition: 'Símbolos creados para representar estados-nación' },
        { term: 'Himnos patrios', definition: 'Canciones oficiales que generan identidad nacional' },
        { term: 'Ceremonias escolares', definition: 'Rituales que inculcan valores ciudadanos' },
        { term: 'Fiestas patrias', definition: 'Conmemoraciones que construyen memoria colectiva' },
      ],
      instruction: 'Emparejá cada tradición inventada con su función principal.',
      explanation: 'Las tradiciones inventadas cumplen funciones específicas: unificar, legitimar, socializar y crear identidad colectiva.',
    },
    {
      type: 'lore',
      text: `Pensá en tu propia familia: ¿hay alguna "tradición familiar" que en realidad empezó hace pocos años? Quizás un plato especial para Navidad, o una forma particular de celebrar cumpleaños.

Esas tradiciones no son "menos válidas" por ser recientes. Al contrario: muestran cómo **seguimos creando cultura todo el tiempo**, adaptándonos a nuevas circunstancias y dando sentido a nuestras vidas.

La cultura no es un museo: es un taller abierto donde todos participamos, aunque no nos demos cuenta.`,
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
