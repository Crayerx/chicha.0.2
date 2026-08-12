/**
 * Datos del módulo "Prácticas Culturales" - UNAJ
 * Basado en: "Cuadernillo de Prácticas Culturales / 1er cuatrimestre 2026 / Fascículo 1 - Eje temático: Cultura"
 */

export interface CulturalPracticeLesson {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  readingGuide?: {
    questions: string[];
    note: string;
  };
}

export interface CulturalPracticeFasciculo {
  id: string;
  title: string;
  description: string;
  lessons: CulturalPracticeLesson[];
}

export const fasciculo1: CulturalPracticeFasciculo = {
  id: 'fasciculo-1',
  title: 'Fascículo 1: Cultura y Sentido Común',
  description: 'Fundamentos teóricos sobre la construcción social de la cultura, naturalización y desnaturalización de prácticas.',
  lessons: [
    {
      id: 'pc-intro',
      title: 'Introducción: Cultura y Sentido Común',
      content: `
## Datos Generales de la Materia

**Materia:** Prácticas Culturales  
**Institución:** Universidad Nacional Arturo Jauretche (UNAJ)  

La materia integra el **Ciclo Inicial** junto con Problemas de la Historia Argentina, Matemática y Taller de Lectura y Escritura. El Ciclo Inicial y el Curso de Preparación Universitaria se inscriben en el Instituto de Estudios Iniciales.

### Objetivo de la Materia

Habilitar preguntas acerca de la cultura para:
- Reflexionar sobre prácticas culturales
- Reconocer el proceso de construcción de la cultura
- Pensar el rol de cada estudiante como actor social

La materia busca **"desnaturalizar la mirada"** para reconocer la trama que construye prácticas que podrían parecer naturales.

### La Cultura como Campo de Disputa

Las sociedades cristalizan prácticas, conceptos y creencias que, en medio de conflictos, constituyen un campo cultural preferencial. Ese campo naturaliza determinadas prácticas en detrimento de otras para establecer un sentido común preferencial.

**Puntos clave:**
- La cultura se aborda como espacio de construcción colectiva de producción y reproducción de sentido
- Se reflexiona sobre el rol de las instituciones en discursos, valores, formas de estar, sentir y vivir
- Hay una puja de poder por imponer un sentido construido como único, válido y verdadero
- Cursada híbrida: encuentro presencial y espacio virtual; hay actividades integradoras obligatorias
`,
      keyPoints: [
        'La cultura es construcción colectiva de sentido',
        'Desnaturalizar la mirada permite ver lo que parece obvio',
        'Existe una puja de poder por definir el sentido común',
        'Las instituciones moldean formas de estar, sentir y vivir'
      ]
    },
    {
      id: 'pc-lopez',
      title: 'Soledad López: Cultura, Culturas, Prácticas Culturales',
      content: `
## La Cultura es Acción

Según Soledad López, "cultura" designa prácticas y estilos de vida, pero también refiere a procesos de significación: producción, articulación y representación de sentidos.

### Definición Central

**La cultura es acción humana, material y simbólica, personal, colectiva, histórica y sensible.**

- La cultura no es singular ni estática
- Se verifica en prácticas culturales, relaciones sociales y artefactos culturales
- El lenguaje es el artefacto inmaterial por excelencia
- También son artefactos: objetos, aparatos, instrumentos, herramientas e instituciones

### Sentidos y Contextos

Prácticas, relaciones y artefactos "cargan sentidos" que no pueden comprenderse fuera de contextos históricos y sociales. Esos sentidos:
- Habilitan y clausuran modos de hacer, ver, decir y ser
- Configuran convenciones y modelos: costumbres, valores, creencias, hábitos, rituales
- Funcionan como dimensión omnipresente de prácticas y relaciones sociales

### Herencia y Cambio

La cultura nunca puede ser individual. Aprendemos prácticas, hábitos y creencias en familia, escuela y medios. Pero **no repetimos el pasado por simple herencia**: la acción humana puede producir cambios e introducir nuevas formas de estar en el mundo.

### Alta y Baja Cultura

El sentido común reduce la cultura a las Bellas Artes. Esta visión:
- Asocia "alta cultura" con pinturas, esculturas, museos, galerías
- Vincula cultura con educación formal: libros, academia, sabios
- Invisibiliza desigualdades de acceso
- Usa el par "culto" / "inculto"

**Pero si la cultura es inherente a lo humano, no puede haber humanos carentes de cultura.**

### Sentido Común según Bauman y May

> "El sentido común es ese conocimiento rico pero desorganizado, asistemático y con frecuencia inarticulado e inefable del que nos valemos para el diario oficio de vivir".

Es un conjunto de significados y apreciaciones construidos socialmente que:
- Guía la práctica cotidiana
- Organiza argumentos de manera desordenada
- Recurre a la experiencia individual
- Da por finalizadas discusiones apelando a "lo obvio", "lo natural", "lo normal"

### Capital Cultural (Bourdieu)

Pierre Bourdieu llama **"capital cultural"** a todo lo aprendido: valores, creencias, futuro deseado, saberes, conocimientos certificados y costumbres. Es el piso desde donde nos movemos, interactuamos, miramos y proponemos.

**El capital cultural nunca es individual:** es producto de una comunidad que lo comparte y lo defiende.
`,
      keyPoints: [
        'Cultura es acción humana material y simbólica',
        'Los sentidos se construyen históricamente',
        'No existe alta vs baja cultura: todos tenemos cultura',
        'El capital cultural es compartido por una comunidad'
      ],
      readingGuide: {
        questions: [
          '¿Por qué la autora afirma que la cultura es acción?',
          'Explicá la diferencia entre "alta cultura" y "cultura popular"',
          '¿Qué es el capital cultural según Bourdieu?',
          '¿Cómo se transmite la cultura?'
        ],
        note: 'Las guías de lectura ayudan a comprender los textos. Salvo indicación docente, no hay que responderlas ni entregarlas.'
      }
    },
    {
      id: 'pc-cortazar',
      title: 'Julio Cortázar: "Qué tal, López"',
      content: `
## Ideas Principales del Texto

Cortázar nos invita a reflexionar sobre cómo las prácticas cotidianas ya están "inventadas":

### El Saludo Inventado

> "Un señor saluda a otro creyendo que lo saluda, pero el saludo ya está inventado: sólo 'calza' en el saludo."

Cuando saludamos, no creamos el saludo: usamos una forma preexistente. Lo mismo ocurre con otros gestos cotidianos.

### El Tobogán Prefabricado

> "Cuando llueve y un señor se refugia bajo una arcada, resbala por un 'tobogán prefabricado desde la primera lluvia y la primera arcada'."

Nuestras acciones siguen caminos ya trazados. Los gestos del amor son un "dulce museo", una "galería de figuras de humo".

### Lo Verdaderamente Nuevo

- Las cosas invisibles necesitan encarnarse
- Las ideas caen como palomas muertas
- **Lo verdaderamente nuevo da miedo o maravilla**
- Hamlet no duda: busca la solución auténtica, no caminos ya hechos
- Quiere "la tangente que triza el misterio", "la quinta hoja del trébol"

### Cuando los Zapatos Aprietan

> "Cuando los zapatos aprietan, buena señal": algo cambia.

Los monstruos son populares porque muestran un esbozo de salto hacia lo otro.

### Final Revelador

> "Ahí viene López. —¿Qué tal, López? —¿Qué tal, che? Y así es como creen que se saludan."

**Relación con la materia:** El texto muestra prácticas cotidianas ya inventadas y la posibilidad de crear algo nuevo. Nos invita a cuestionar lo que hacemos "automáticamente".
`,
      keyPoints: [
        'Las prácticas cotidianas están preestablecidas',
        'Saludamos, actuamos y sentimos siguiendo guiones sociales',
        'Lo verdaderamente nuevo produce incomodidad o maravilla',
        'Podemos elegir crear algo nuevo en lugar de repetir'
      ]
    },
    {
      id: 'pc-cuche',
      title: 'Denys Cuche: La Noción de Cultura en las Ciencias Sociales',
      content: `
## Ideas Centrales

La noción de cultura es inherente a las ciencias sociales. Sirve para pensar la unidad de la humanidad en la diversidad sin usar términos biológicos.

### Del Instinto a la Cultura

- La respuesta "racial" está desacreditada por avances genéticos
- **El hombre es esencialmente un ser de cultura**
- La hominización consistió en pasar de adaptación genética a adaptación cultural
- Hubo regresión de los instintos, reemplazados progresivamente por la cultura
- La cultura es más dúctil que la adaptación genética y se transmite con mayor facilidad

### No Hay Nada Natural en el Hombre

> "No hay nada puramente natural en el hombre."

Todas las poblaciones humanas poseen el mismo bagaje genético. Se diferencian por **elecciones culturales**. Cada grupo inventa soluciones originales.

**La naturaleza en el hombre está totalmente interpretada por la cultura:**
- Hambre, sueño, deseo sexual tienen formato cultural
- La división sexual de roles y tareas es resultado cultural
- Decir "sé natural" equivale a pedir que se actúe según el modelo cultural transmitido

### Orden Simbólico

La cultura penetra directamente en el **orden simbólico**, es decir, en aquello vinculado con el sentido. Esto permite transformar la naturaleza.

### Evolución del Concepto

La idea moderna de cultura provocó debates desde el siglo XVIII:
- De definición **normativa** a definición **descriptiva**
- La cultura se aplica sólo a lo humano
- Permite concebir unidad del hombre en diversidad de modos de vida y creencias

### Aculturación

El encuentro de culturas tiene modalidades diferentes según situaciones de contacto. **La aculturación no es fenómeno ocasional ni devastador**: es una modalidad habitual de evolución cultural.

### Culturas Dominantes y Populares

- Las jerarquías sociales pueden determinar jerarquías culturales
- Pero la cultura dominante **no determina totalmente** a los grupos dominados
- Las culturas populares tienen autonomía y capacidad de resistencia

### Cultura e Identidad

Cultura e identidad remiten a una misma realidad vista desde dos ángulos. La identidad cultural se comprende estudiando relaciones con grupos cercanos.

**Importante:** La cultura no se decreta ni se manipula como herramienta vulgar. Proviene de procesos complejos y con frecuencia inconscientes.
`,
      keyPoints: [
        'El ser humano es esencialmente un ser de cultura',
        'No hay nada puramente natural en el hombre',
        'La aculturación es evolución cultural habitual',
        'Las culturas populares resisten a la cultura dominante'
      ],
      readingGuide: {
        questions: [
          'El autor afirma que "no hay nada puramente natural en el hombre". Explicá esta frase y escribí un ejemplo.',
          '¿A qué se refiere con "orden simbólico"?',
          '¿Por qué el autor plantea que el concepto de aculturación permitió renovar el concepto de cultura?'
        ],
        note: 'Las guías de lectura ayudan a comprender los textos. Salvo indicación docente, no hay que responderlas ni entregarlas.'
      }
    }
  ]
};

export const fasciculo2: CulturalPracticeFasciculo = {
  id: 'fasciculo-2',
  title: 'Fascículo 2: Instituciones y Hegemonía',
  description: 'El rol de las instituciones, el arte como caja negra, y los frentes culturales en la disputa por el sentido.',
  lessons: [
    {
      id: 'pc-aira',
      title: 'César Aira: La Utilidad del Arte',
      content: `
## Ideas Centrales

### De Armar y Desarmar

Antes algunas personas desarmaban autos, relojes, radios, bombas de agua, cajas fuertes, lavarropas. Eso mantenía una **relación comprensiva con las máquinas**.

Con la electrónica y la automatización, eso se volvió más difícil. En el último medio siglo, la humanidad dejó de saber cómo funcionan las máquinas que usa.

### Cajas Negras

Usamos artefactos como **"cajas negras"**:
- **Input:** apretar un botón
- **Output:** resultado
- **Ignoramos** lo que sucede entre esos extremos

> "Sólo importa que funcionen."

La sociedad entera se volvió una caja negra. Economía, desplazamientos poblacionales, flujos de información y estadísticas producen una resignada ceguera. Nadie sabe qué puede pasar. **La civilización misma se hizo impredecible.**

### El Arte como Arenero Pedagógico

La inteligencia es instrumento de adaptación. Hay que preservar un tipo de inteligencia que busca saber cómo funcionan las cosas.

**El arte es el mejor campo de práctica y experimentación de esa vieja inteligencia.**

El arte es un "arenero pedagógico", de práctica o preservación. La práctica artística es la única con consenso social donde puede desarrollarse un saber en extinción.

### Radicalidad del Arte

> "La radicalidad del arte consiste en desarmar por entero el lenguaje con el que opera y volverlo a armar según otras premisas."

Si no retrocede hasta el punto de partida, no es arte, aunque lo parezca. Las vanguardias exploraron esa radicalidad.

**El artista** es el único ciudadano corriente, no financiado por el poder, que trabaja con una materia que puede ser desarmada y reconstruida enteramente.

### El Arte Contra las Cajas Negras

El arte actúa sobre las cajas negras: les quita funcionalidad y misterio al mostrar cómo funcionan en la máquina social.

No importa que los artistas sean fraudes; eso puede intensificar la radicalización.

**Cultura popular y cajas negras:** La cultura popular, cuando usa formatos artísticos, cede a la lógica de la caja negra: usa un lenguaje artístico sin desarticularlo y espera éxito o venta.
`,
      keyPoints: [
        'Vivimos en un mundo de cajas negras: usamos sin entender',
        'El arte preserva la inteligencia que busca saber cómo funcionan las cosas',
        'La radicalidad del arte es desarmar y rearmar el lenguaje',
        'El artista muestra cómo funcionan las cajas negras de la sociedad'
      ]
    },
    {
      id: 'pc-grimson',
      title: 'Alejandro Grimson: Los Límites de la Cultura',
      content: `
## Ideas Centrales

### Construcción Social

La metáfora de construcción social tuvo impacto, pero se agotó. Todavía puede ser liberador constatar que algo es construido y no natural.

**Edificios, automóviles, escuelas, hospitales, autopistas, universidades, obras de arte son construcciones y existen.** La música y las identidades también son producto de prácticas sociales. Cuando cristalizan, existen. **Todo lo humano ha sido construido.**

### El Peligro de la Denuncia Selectiva

> "No hay que usar 'construcción' sólo para denunciar lo ajeno y naturalizar lo propio."

### Sentido Común y Clasificación

El sentido común hace creer que hay blancos, negros, mestizos, indios. **"Blanco" es una convención social.** Las personas consideradas blancas o negras tienen tonalidades múltiples.

Adquirimos un lenguaje que clasifica cosas y personas. Los colores de piel existen, pero **ningún rasgo físico tiene significado intrínseco.** Usamos diferencias para imaginar fronteras entre humanos.

### Fronteras Reales porque las Realizamos

> "Las fronteras son reales porque nosotros las realizamos."

Su poder viene de ocultar su contingencia, historicidad y fragilidad. Consideramos naturales fronteras producidas por humanos. Consideramos objetivos colores que inventamos. Consideramos inevitable lo que es producto de acciones humanas sedimentadas.

### Tipificaciones

Las prácticas sociales devenidas objetos organizan sociedades mediante **tipificaciones**. Las tipificaciones rigen vidas, destinos y derechos. Son inventos humanos sedimentados en percepción, significación y acción.

Según Searle, son **ontológicamente subjetivas y epistemológicamente objetivas**:
- Existen gracias a prácticas humanas
- Su existencia es empíricamente verificable

### Fetichismo de las Identidades

El fetichismo de las identidades oculta prácticas y condiciones sociales que las convirtieron en objetos. Grimson lo compara con el **fetichismo de la mercancía de Marx**.

Tradición, patria y origen aparecen como cosas que interpelan. Símbolos: palabra, bandera, canción, equipo de fútbol. **Los símbolos son la comunidad reificada.**

### Ontológicamente Subjetivo / Epistemológicamente Objetivo

Rituales, obligaciones e ideas son ontológicamente subjetivos. Pero pueden ser objetivamente reales:
- Derecho a votar
- Imposibilidad de ingresar a un país
- Desigualdades de raza o género

**La pobreza y la desigualdad son creaciones humanas contingentes.**

Las naciones son ontológicamente subjetivas y epistemológicamente objetivas. Toda institución social existe por haber sido creada por humanos específicos.

### Metáfora de los Ladrillos

> "Los humanos colocan ladrillos sobre ladrillos y dejan una pared en pie. Otros sujetos pueden vivir esa pared como naturaleza aunque no lo sea."

Los ladrillos pueden ser palabras, gestos, vestimentas, alimentos. Los edificios pueden ser gobiernos, religiones, clases, razas, géneros. **Todo edificio literal o metafórico es trabajo humano cristalizado.**

### Plusvalor Semiótico

El trabajo humano crea **plusvalor semiótico**: un excedente de sentido que oculta el proceso productivo.
`,
      keyPoints: [
        'Todo lo humano ha sido construido',
        'Las fronteras son reales porque las realizamos',
        'Las identidades son fetichismos que ocultan su construcción',
        'Ontológicamente subjetivo ≠ menos real'
      ],
      readingGuide: {
        questions: [
          '¿Cómo se relacionan el sentido común, el lenguaje y la clasificación de las personas según su color de piel y/o etnicidad para Alejandro Grimson?',
          'Grimson plantea que construimos límites alrededor de convenciones sociales. ¿A qué se refiere? ¿Se te ocurre algún ejemplo?',
          'Armá una definición propia de cultura con las ideas de Grimson sobre sentido común, lenguaje, producción de límites, acciones humanas sedimentadas, tipificaciones, percepción, significación y acción.'
        ],
        note: 'Las guías de lectura son recursos para comprender los textos. Salvo indicación docente, no hay que responderlas ni entregarlas.'
      }
    },
    {
      id: 'pc-gonzalez',
      title: 'Jorge A. González: Los Frentes Culturales',
      content: `
## Ideas Centrales

### La Lógica del Mundo Social

> "La lógica del mundo social es una lucha permanente por definir la realidad."

### De lo Popular Romántico a lo Híbrido

Antes, "lo popular" se imaginaba como indígena, colorido, bucólico, autóctono y tradicional. Se lo trataba como piezas para coleccionar, preservar y conservar. Ese panorama excluía lo plástico, repetible, industrial, citadino y moderno.

González critica:
- **Política del Formol:** conservación y disección forzosa
- **Política del Avestruz:** incapacidad de ver relaciones con la cultura mercantil

Esa visión estalló por la presión de culturas modernas, mezcladas y emergentes. **La cultura del aluvión se volvió omnipresente.**

### Las Cinco Dimensiones de la Cultura

1. **Organizar:** la cultura organiza la vida concreta y cotidiana
2. **Soñar:** es sueño y fantasía; abre compuertas de la utopía
3. **Recordar:** es memoria selectiva reconstruida desde el presente
4. **Definir:** permite definir la situación dentro de la vida social y colectiva
5. **Luchar:** es arena de lucha por conferir sentido a lo común

### Cultura Omnipresente

1. La cultura es propiedad consustancial a toda sociedad concreta e histórica
2. No es una entidad flotante que solo refleja la infraestructura económica
3. Tiene materialidad y soportes sociales objetivos
4. Su especificidad sígnica o semiótica es integral a todas las prácticas y relaciones sociales
5. **Porque significa, sirve:** es instrumento para accionar sobre la composición y organización de la vida social

### Hegemonía

Ayuda a entender la relación entre cultura y desigualdad social. Un sistema de hegemonía define cómo las clases se relacionan entre sí desde la construcción de significaciones. Permite leer ideológica y culturalmente la totalidad de relaciones sociales.

### Análisis Detallado de la Cultura

En crisis, la construcción de consenso e identidades es problema político y académico. Importa saber cómo se construye consentimiento social en sociedades desiguales.

Alrededor de la cultura se juegan:
- Memoria social
- Identidades
- Organización capilar de creación sígnica

La cultura organiza un "nosotros" plural ligado a razón, pasiones y vísceras. Elementos transclasistas son base para el poder cultural.

### Frentes Culturales

Son herramienta para interpretar luchas por la definición legítima del sentido de áreas de la cotidianidad.

**Cuatro problemáticas:**
a) La construcción social del sentido  
b) La constitución social de la hegemonía y del poder cultural  
c) La lucha por la legitimidad cultural  
d) Los elementos culturales transclasistas y la vida cotidiana

> "Los frentes culturales son frentes o arenas de lucha. También son fronteras o límites de contacto ideológico entre concepciones y prácticas culturales de distintos grupos y clases que coexisten en una misma sociedad."
`,
      keyPoints: [
        'La cultura tiene cinco dimensiones: organizar, soñar, recordar, definir, luchar',
        'La cultura es omnipresente y tiene materialidad',
        'La hegemonía construye consentimientos en sociedades desiguales',
        'Los frentes culturales son arenas de lucha por el sentido'
      ],
      readingGuide: {
        questions: [
          'Jorge González define un conjunto de características para poder abarcar la complejidad que supone la realidad de las culturas actuales. ¿Cuáles son esas características y cómo explicás cada una?',
          'La cultura está en todas partes y al mismo tiempo. ¿Qué elementos considera el autor para definir esta posición omnipresente?',
          'Según el pensamiento científico la cultura sirve como una dimensión de análisis de las relaciones y prácticas sociales. ¿Por qué los seres humanos tenemos diferentes representaciones del mundo? ¿Qué relación tiene esto con la desigualdad?',
          'Para Jorge González es fundamental realizar un análisis detallado de la cultura. ¿Podrías explicar en qué consiste este análisis y por qué es importante para construir sentido?'
        ],
        note: 'Las guías de lectura son recursos para estudiar. Salvo indicación docente, no hay que responderlas ni entregarlas.'
      }
    }
  ]
};

export const fasciculo3: CulturalPracticeFasciculo = {
  id: 'fasciculo-3',
  title: 'Fascículo 3: Imágenes y Representación',
  description: 'Análisis visual, estereotipos, y lo no dicho en la construcción cultural de la realidad.',
  lessons: [
    {
      id: 'pc-caggiano',
      title: 'Sergio Caggiano: Mostrar lo No Dicho',
      content: `
## Ideas Centrales

### El Poder de las Imágenes Visuales

Las imágenes visuales juegan un papel clave en percepción y valoración del entorno social. Medios de comunicación, libros ilustrados, carteleras, exposiciones y sitios de Internet ofrecen imágenes públicas.

### Preguntas Clave

- ¿Quién es quién en esos paisajes visuales?
- ¿Qué caras y cuerpos son mostrados y de qué manera?
- ¿Cómo se atribuyen características típicas a ciertos actores sociales?
- ¿Qué vinculaciones se establecen entre actores y determinados espacios, circunstancias y prácticas?
- ¿Cómo son asociadas las esferas de la vida como política, doméstica y laboral?
- ¿Qué factores estructuran producción y circulación de imágenes?

### Cita de Poole

> "Ver y representar son actos materiales porque constituyen medios de intervenir en el mundo. No vemos simplemente lo que está ahí. Las formas específicas como vemos y representamos el mundo determinan cómo actuamos. Al actuar, creamos lo que ese mundo es. El acto individual de ver y el acto social de representar ocurren en redes históricamente específicas de relaciones."

### Mostrar y Ocultar

Tratar con lo visual implica interrogarse por **lo que se muestra y lo que se oculta**.

Importa:
- Qué actores muestran y cuáles no
- Qué se muestra en un momento y luego no
- Cómo se muestra

Hay que atender la especificidad de lo visual en la construcción social de sentidos. El reto es dar cuenta de la **productividad de las imágenes**. Las imágenes actúan con otros lenguajes pero sin reducirse a ellos.

### Las Imágenes Muestran Mucho Todo Junto

Las imágenes se ajustan automáticamente a categorías que muchas veces nombran: "negros", "indígenas", "trabajadores".

**No puede haber modos de mostrar estructurados exclusivamente por clase, género, raza o etnia.** Las imágenes combinan trazos de diferentes dimensiones. No necesariamente se completan en la misma dirección.

Una imagen conservadora en clase no será fatalmente conservadora en género. En producciones contrahegemónicas o alternativas también pueden infiltrarse modos de mirar hegemónicos en clave racial o de clase.
`,
      keyPoints: [
        'Las imágenes visuales construyen percepción y valoración social',
        'Ver y representar son actos materiales que intervienen en el mundo',
        'Las imágenes muestran mucho todo junto: combinan clase, género, raza',
        'Hay que interrogar lo que se muestra y lo que se oculta'
      ],
      readingGuide: {
        questions: [
          'Sergio Caggiano inicia el texto con una serie de preguntas acerca del papel que juegan las imágenes visuales para nuestra valoración del entorno social. ¿Qué otra pregunta sumarías?',
          'El autor elige una cita de Poole que dice: "Las formas específicas como vemos y representamos el mundo determina cómo es que actuamos en este mundo y, al hacerlo, creamos lo que ese mundo es". ¿A qué se refiere cuando afirma que creamos lo que el mundo es?',
          '¿Cómo juegan las relaciones de poder en lo que se muestra y lo que se oculta?',
          'Dice el autor que las imágenes muestran mucho todo junto, ¿por qué?',
          '¿Podrías armar una definición de cultura que incluya alguna idea sobre lo que significa para vos el título del texto "mostrar lo no dicho"?'
        ],
        note: 'Las guías de lectura son recursos para estudiar. Salvo indicación docente, no hay que responderlas ni entregarlas.'
      }
    },
    {
      id: 'pc-conceptos',
      title: 'Conceptos Clave para Comprender',
      content: `
## Glosario de Conceptos Fundamentales

Estos son los conceptos que debes poder explicar después de estudiar este módulo:

### Conceptos Básicos
- **Cultura:** Espacio de construcción colectiva de producción y reproducción de sentido
- **Culturas:** Pluralidad de modos de vida y creencias en diferentes grupos humanos
- **Prácticas culturales:** Acciones cotidianas cargadas de sentido construido socialmente
- **Sentido común:** Conocimiento desorganizado que guía la práctica cotidiana apelando a "lo obvio"
- **Naturalización:** Proceso que hace aparecer algo como obvio e inevitable, borrando sus marcas de construcción
- **Desnaturalización:** Ejercicio crítico para reconocer la trama que construye prácticas que parecen naturales

### Construcción Social
- **Construcción social:** Proceso mediante el cual los humanos crean instituciones, categorías y significados
- **Artificio:** Algo creado por humanos que aparece como natural
- **Orden simbólico:** Dimensión vinculada con el sentido, donde la cultura penetra directamente

### Jerarquías Culturales
- **Alta cultura:** Bellas artes, museos, academia (concepto criticado por excluyente)
- **Baja cultura:** Culturas populares, prácticas cotidianas (término problemático)
- **Culto / inculto:** Falsa dicotomía que ignora que todos los humanos tienen cultura
- **Civilización / barbarie:** Zoncera que opone sectores sociales como si fueran categorías naturales

### Herramientas Analíticas
- **Artefactos culturales:** Objetos, herramientas, instituciones y lenguaje que cargan sentidos
- **Relaciones sociales:** Vínculos entre personas donde se construye cultura
- **Instituciones:** Medios masivos, Estado, iglesias, escuela, justicia, familias que moldean el sentido común
- **Capital cultural (Bourdieu):** Recursos culturales aprendidos: valores, creencias, saberes, costumbres
- **Transmisión cultural:** Aquello del presente que confiamos a la generación más joven

### Dinámicas Culturales
- **Dominante / residual / emergente (Williams):** Tradiciones vigentes, en declive y en surgimiento
- **Hominización:** Paso de adaptación genética a adaptación cultural
- **Adaptación cultural:** Modo específicamente humano de sobrevivir y transformarse
- **Aculturación:** Modalidad habitual de evolución cultural en el encuentro entre culturas
- **Identidad:** Realidad que se comprende estudiando relaciones con grupos cercanos

### Conceptos Avanzados
- **Cajas negras:** Artefactos o sistemas cuyo funcionamiento interno ignoramos
- **Arte:** Campo de práctica que desarma y rearma lenguajes para mostrar cómo funcionan las cajas negras
- **Fronteras:** Límites entre humanos que son reales porque los realizamos
- **Tipificaciones:** Clasificaciones que rigen vidas, destinos y derechos
- **Convenciones sociales:** Acuerdos implícitos que organizan la vida cotidiana

### Ontología de lo Social
- **Ontológicamente subjetivo:** Existe gracias a prácticas humanas
- **Epistemológicamente objetivo:** Su existencia es empíricamente verificable
- **Fetichismo de las identidades:** Oculta prácticas y condiciones que convirtieron identidades en objetos
- **Configuraciones culturales:** Tramas simbólicas compartidas, horizontes de posibilidad, desigualdades de poder e historicidad
- **Plusvalor semiótico:** Excedente de sentido que oculta el proceso productivo

### Poder y Hegemonía
- **Clasificaciones interactivas:** Categorías sociales que interactúan con quienes clasifican
- **Hegemonía:** Sistema que define cómo las clases se relacionan desde la construcción de significaciones
- **Frentes culturales:** Arenas de lucha por la definición legítima del sentido
- **Poder cultural:** Capacidad de definir qué sentidos son válidos y deseables
- **Cultura omnipresente:** Dimensión integral a todas las prácticas y relaciones sociales

### Imágenes y Representación
- **Mostrar lo no dicho:** Interrogar lo que las imágenes ocultan mientras muestran
- **Productividad de las imágenes:** Capacidad de las imágenes de actuar en la construcción social de sentidos
`,
      keyPoints: [
        'Todos estos conceptos son herramientas para analizar la cultura',
        'Debes poder explicar cada uno con tus propias palabras',
        'Los conceptos se relacionan entre sí formando una red teórica',
        'Sirven para desnaturalizar prácticas que parecen obvias'
      ]
    },
    {
      id: 'pc-sintesis',
      title: 'Síntesis Integradora',
      content: `
## Síntesis del Módulo: Prácticas Culturales

### Hilo Conductor

Este módulo te invitó a **desnaturalizar la mirada** sobre prácticas que parecen obvias. Recorriste diferentes autores que, desde perspectivas complementarias, muestran cómo la cultura es una construcción social en disputa permanente.

### Los Tres Fascículos en Diálogo

**Fascículo 1** sentó las bases:
- La cultura es acción humana, no algo natural
- El sentido común organiza nuestra vida cotidiana
- Autores como López, Cortázar y Cuche muestran cómo seguimos guiones preestablecidos

**Fascículo 2** profundizó en las estructuras:
- Aira denuncia las "cajas negras" que usamos sin entender
- Grimson revela cómo construimos fronteras que luego naturalizamos
- González propone los "frentes culturales" como arenas de lucha por el sentido

**Fascículo 3** cerró con la dimensión visual:
- Caggiano muestra cómo las imágenes construyen percepción social
- Lo que se muestra y lo que se oculta revela relaciones de poder
- Las imágenes "muestran mucho todo junto": clase, género, raza se entrecruzan

### Conceptos Transversales

1. **Construcción social:** Todo lo humano ha sido construido, nada es natural
2. **Disputa de sentidos:** Hay una puja permanente por definir qué es válido, verdadero, deseable
3. **Naturalización:** Las construcciones humanas aparecen como obvias e inevitables
4. **Desnaturalización:** Ejercicio crítico para revelar lo construido detrás de lo aparente
5. **Hegemonía:** Cómo se construyen consentimientos en sociedades desiguales
6. **Omnipresencia cultural:** La cultura está en todas las prácticas y relaciones sociales

### Para Qué Sirve Todo Esto

La materia busca habilitarte como **actor social crítico**:
- Para reconocer que lo que parece "siempre fue así" tiene historia
- Para identificar quién se beneficia de que ciertas cosas parezcan naturales
- Para imaginar que otro mundo es posible porque este fue construido por humanos
- Para participar activamente en la disputa por el sentido

### Frases para Recordar

> "No hay nada natural en la realidad, sólo interpretaciones que se ponen en tensión hasta que una se impone como natural o verdadera." — Nietzsche

> "Las fronteras son reales porque nosotros las realizamos." — Grimson

> "Cuando los zapatos aprietan, buena señal: algo cambia." — Cortázar

> "El arte es un arenero pedagógico." — Aira

### Próximo Paso

Reflexioná sobre tu propia trayectoria: ¿qué prácticas culturales identificás en tu vida cotidiana que podrías desnaturalizar? ¿Qué "cajas negras" usás sin entender cómo funcionan? ¿Qué imágenes consumís que construyen tu percepción del mundo?

**La cultura es acción. Vos también la construís.**
`,
      keyPoints: [
        'Los tres fascículos muestran diferentes dimensiones de la cultura',
        'La desnaturalización es la herramienta central del módulo',
        'La cultura está en disputa permanente',
        'Sos un actor social que también construye cultura'
      ]
    }
  ]
};

export const allFasciculos: CulturalPracticeFasciculo[] = [fasciculo1, fasciculo2, fasciculo3];

export const culturalPracticeData = {
  title: 'Prácticas Culturales',
  institution: 'Universidad Nacional Arturo Jauretche (UNAJ)',
  semester: '1er Cuatrimestre 2026',
  cycle: 'Ciclo Inicial',
  description: 'Materia que busca habilitar preguntas acerca de la cultura para reflexionar sobre prácticas culturales, reconocer el proceso de construcción de la cultura y pensar el rol de cada estudiante como actor social.',
  objectives: [
    'Desnaturalizar la mirada para reconocer la trama que construye prácticas que podrían parecer naturales',
    'Reflexionar sobre el rol de las instituciones en discursos, valores, formas de estar, sentir y vivir',
    'Comprender la cultura como espacio de construcción colectiva de producción y reproducción de sentido',
    'Analizar la puja de poder por imponer un sentido construido como único, válido y verdadero'
  ],
  modality: 'Híbrida: encuentro presencial y espacio virtual; hay actividades integradoras obligatorias',
  fasciculos: allFasciculos
};
