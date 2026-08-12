import { Lesson } from '../components/lesson/LessonView';

export const practicasCulturalesFasciculo1: Lesson[] = [
  {
    id: 'pc-f1-intro',
    title: 'Introducción: Datos Generales y Objetivo',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Prácticas Culturales - UNAJ</h2>
      <p class="mb-4 text-gray-300">Bienvenido al Ciclo Inicial de la Universidad Nacional Arturo Jauretche.</p>
      
      <div class="bg-slate-800/50 p-6 rounded-lg border border-amber-500/30 mb-6">
        <h3 class="text-xl font-semibold text-amber-300 mb-3">Datos de la Materia</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Institución:</strong> Universidad Nacional Arturo Jauretche (UNAJ).</li>
          <li><strong>Ubicación:</strong> Integra el Ciclo Inicial junto con Problemas de la Historia Argentina, Matemática y Taller de Lectura y Escritura.</li>
          <li><strong>Objetivo:</strong> Habilitar preguntas acerca de la cultura para reflexionar sobre prácticas culturales, reconocer el proceso de construcción de la cultura y pensar el rol de cada estudiante como actor social.</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">La Mirada Crítica</h3>
      <p class="mb-4 text-gray-300">
        La materia busca <strong>"desnaturalizar la mirada"</strong> para reconocer la trama que construye prácticas que podrían parecer naturales. 
        Las sociedades cristalizan prácticas, conceptos y creencias que, en medio de conflictos, constituyen un campo cultural preferencial.
      </p>
      <p class="mb-4 text-gray-300">
        Este campo naturaliza determinadas prácticas en detrimento de otras para establecer un sentido común preferencial. 
        La cultura se aborda como espacio de construcción colectiva de producción y reproducción de sentido.
      </p>

      <div class="bg-red-900/20 p-4 rounded border-l-4 border-red-500 mb-4">
        <p class="text-sm text-gray-300 italic">
          "Hay una puja de poder por imponer un sentido construido como único, válido y verdadero."
        </p>
      </div>
    `,
    codeExample: `// Concepto Clave: Desnaturalización
const cultura = "Construcción colectiva de sentidos";
const objetivo = "Desnaturalizar la mirada";
const rolEstudiante = "Actor social crítico";

console.log(\`La cultura no es natural, es \${cultura}\`);`,
    output: "La cultura no es natural, es Construcción colectiva de sentidos",
    explanation: "Esta lección introduce los objetivos fundamentales de la materia: entender la cultura no como algo dado biológicamente, sino como un proceso social conflictivo donde se disputan sentidos."
  },
  {
    id: 'pc-f1-eje',
    title: 'Eje Temático: Cultura y Palabras Clave',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Eje Temático: Cultura</h2>
      <p class="mb-4 text-gray-300">Para abordar este fascículo, debemos manejar las siguientes palabras clave que estructuran nuestro análisis:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-slate-800 p-4 rounded border border-slate-700">
          <h4 class="font-bold text-emerald-400">Conceptos Centrales</h4>
          <ul class="list-disc list-inside text-sm text-gray-300 mt-2">
            <li>¿La Cultura, las culturas o las instituciones?</li>
            <li>Cultura y prácticas culturales</li>
            <li>La cultura como práctica y proceso</li>
            <li>Mecanismos de institucionalización</li>
          </ul>
        </div>
        <div class="bg-slate-800 p-4 rounded border border-slate-700">
          <h4 class="font-bold text-emerald-400">Herramientas de Análisis</h4>
          <ul class="list-disc list-inside text-sm text-gray-300 mt-2">
            <li>El sentido común</li>
            <li>Desnaturalización de la "visión de mundo"</li>
            <li>Sentidos y códigos culturales</li>
            <li>Capital cultural</li>
          </ul>
        </div>
      </div>

      <p class="text-gray-300">
        No hablaremos de "La Cultura" como un bloque monolítico, sino de procesos dinámicos donde intervienen instituciones, conflictos y construcciones sociales.
      </p>
    `,
    codeExample: `// Palabras Clave del Eje
const ejes = [
  "Cultura vs Culturas",
  "Institucionalización",
  "Sentido Común",
  "Desnaturalización"
];

ejes.forEach(tema => console.log("Analizando:", tema));`,
    output: "Analizando: Cultura vs Culturas\nAnalizando: Institucionalización\nAnalizando: Sentido Común\nAnalizando: Desnaturalización",
    explanation: "Estos conceptos son la brújula para navegar el fascículo. Nos permiten distinguir entre la cultura como arte (instituciones) y la cultura como forma de vida (prácticas)."
  },
  {
    id: 'pc-f1-sentido-comun',
    title: 'Cultura y Sentido Común',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Cultura y Sentido Común</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">Preguntas Iniciales</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-300 mb-6">
        <li>¿De qué hablamos cuando hablamos de Cultura?</li>
        <li>¿Por qué la cultura estuvo asociada a las bellas artes y al nivel de instrucción?</li>
        <li>¿Qué relación tienen las prácticas culturales legitimadas con el sentido común?</li>
      </ul>

      <div class="bg-slate-800/50 p-6 rounded-lg border border-amber-500/30 mb-6">
        <h4 class="font-bold text-amber-300 mb-2">"Cultura es culturas"</h4>
        <p class="text-gray-300 mb-4">
          Hay que alejarse de una definición monolítica. La cultura es un espacio dinámico de producción y reproducción colectiva de prácticas cargadas de sentidos construidos socialmente.
        </p>
        <p class="text-gray-300">
          Problematizar las prácticas cotidianas permite identificar sentidos que guían la vida, estableciendo formas "válidas" de estar en el mundo y clasificando "lo bueno" y "lo malo".
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Arturo Jauretche y las Zonceras</h3>
      <p class="mb-4 text-gray-300">
        En su <em>Manual de zonceras argentinas</em>, Jauretche analiza <strong>"la madre de todas las zonceras": civilización y barbarie</strong>.
        Esta lógica sigue vigente en expresiones actuales como <span class="text-red-400 font-bold">"no seas indio"</span>, usada para asociar una acción con la ignorancia.
      </p>
      <p class="mb-4 text-gray-300">
        Se tilda de incorrecto lo que queda fuera de los sentidos preferencialmente establecidos. Reconocer esto obliga a observar una <strong>puja por el poder</strong> para validar el sentido común.
      </p>
    `,
    codeExample: `// Jauretche: Civilización vs Barbarie
const zonceras = {
  madre: "Civilización y Barbarie",
  ejemploActual: "No seas indio",
  funcion: "Asociar lo diferente con la ignorancia"
};

console.log(\`La lógica de \${zonceras.madre} legitima exclusiones\`);`,
    output: "La lógica de Civilización y Barbarie legitima exclusiones",
    explanation: "Jauretche nos enseña que lo que consideramos 'obvio' (sentido común) suele ser una construcción política para mantener privilegios de ciertos grupos sobre otros."
  },
  {
    id: 'pc-f1-construccion',
    title: 'La Cultura como Construcción y Artificio',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Cultura: Construcción y Artificio</h2>
      
      <p class="mb-4 text-gray-300">
        La cultura es una dimensión omnipresente de las relaciones sociales. Funciona como modo de organizar la vida cotidiana. 
        Debemos reconocer la construcción social de la cultura como un <strong>"artificio"</strong>.
      </p>

      <div class="bg-blue-900/20 p-4 rounded border-l-4 border-blue-500 mb-6">
        <h4 class="font-bold text-blue-300">Grimson y Caggiano</h4>
        <p class="text-gray-300 mt-2">
          Invitan a pensar que los discursos raciales son resultado de procesos sociales y políticos, no verdades biológicas universales. 
          Decir que "los blancos son esencialmente más inteligentes" es una postura esencialista usada históricamente para justificar la esclavitud.
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Postura Contingente</h3>
      <p class="mb-4 text-gray-300">
        Las formas de sentir y actuar no están dictadas por la naturaleza humana, sino por sucesos históricos, fuerzas sociales y conflictos políticos.
        <br><strong>Frase clave:</strong> <em>"No hay nada natural"; todo forma parte del engranaje artificial llamado "nuestra cultura".</em>
      </p>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">El Proceso de Naturalización</h3>
      <p class="mb-4 text-gray-300">
        La cultura se presenta como proceso obvio y universal. Ese aparente universalismo borra las marcas de su construcción. 
        Eso es la <strong>naturalización</strong>: hacer aparecer algo como inevitable, borrando las fuerzas que lo construyeron.
      </p>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li>Ejemplos naturalizados: hábitos cotidianos, formas familiares, pobreza y riqueza.</li>
        <li>Frases del sentido común: "Pobres hubo siempre", "El matrimonio normal es entre hombre y mujer".</li>
      </ul>
      <p class="mt-4 text-gray-300 italic">
        "Quien dice que algo es 'por naturaleza' impone un sentido como hecho inapelable." (Nietzsche)
      </p>
    `,
    codeExample: `// Naturalización vs Construcción
const mito = "Los pobres existen por naturaleza";
const realidad = "La pobreza es una construcción social histórica";

if (mito === "Verdad absoluta") {
  console.log("Error: Se ocultan las fuerzas políticas");
} else {
  console.log(realidad);
}`,
    output: "La pobreza es una construcción social histórica",
    explanation: "La naturalización es el mecanismo que hace que lo construido (y por tanto, modificable) parezca eterno e inmutable."
  },
  {
    id: 'pc-f1-lopez',
    title: 'Soledad López: Cultura y Prácticas',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Soledad López: "Cultura, Culturas, Prácticas Culturales"</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">La Cultura es Acción</h3>
      <p class="mb-4 text-gray-300">
        "Cultura" designa prácticas y estilos de vida. También refiere a procesos de significación. 
        No puede entenderse por fuera de la acción humana. Hombres y mujeres construyen colectivamente la cultura en sus prácticas cotidianas.
      </p>
      <p class="mb-4 text-gray-300">
        Los seres humanos necesitan alimento y abrigo, pero <strong>los modos de vivir son múltiples y variables</strong>. No existe una única manera de comer, dormir o relacionarse.
      </p>

      <div class="bg-slate-800 p-6 rounded-lg border border-amber-500/30 mb-6">
        <h4 class="font-bold text-amber-300">Definición Central</h4>
        <p class="text-gray-300 mt-2">
          La cultura es acción humana, material y simbólica, personal, colectiva, histórica y sensible. 
          Se verifica en <strong>prácticas culturales</strong>, relaciones sociales y <strong>artefactos culturales</strong>.
        </p>
        <p class="text-gray-300 mt-2">
          El lenguaje es el artefacto inmaterial por excelencia. También lo son los objetos, instituciones y herramientas.
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Alta y Baja Cultura</h3>
      <p class="mb-4 text-gray-300">
        El sentido común reduce la cultura a las Bellas Artes ("Alta cultura"). Esto invisibiliza desigualdades de acceso y crea la dicotomía <strong>culto/inculto</strong>.
        Pero si la cultura es inherente a lo humano, <span class="text-emerald-400 font-bold">no puede haber humanos carentes de cultura</span>.
      </p>
    `,
    codeExample: `// Artefactos Culturales
const artefactos = {
  inmateriales: ["Lenguaje", "Valores", "Rituales"],
  materiales: ["Libros", "Herramientas", "Edificios"]
};

console.log("La cultura se manifiesta en:", artefactos);`,
    output: "La cultura se manifiesta en: { inmateriales: [...], materiales: [...] }",
    explanation: "López nos ayuda a definir la cultura no como un adorno, sino como la totalidad de la acción humana significativa."
  },
  {
    id: 'pc-f1-cortazar',
    title: 'Julio Cortázar: "Qué tal, López"',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Julio Cortázar: "Qué tal, López"</h2>
      
      <div class="bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500 mb-6">
        <p class="text-gray-300 italic mb-4">
          "Un señor saluda a otro creyendo que lo saluda, pero el saludo ya está inventado: sólo 'calza' en el saludo."
        </p>
        <p class="text-gray-300 italic mb-4">
          "Cuando llueve y un señor se refugia bajo una arcada, resbala por un 'tobogán prefabricado desde la primera lluvia y la primera arcada'."
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Lo Prefabricado vs Lo Auténtico</h3>
      <p class="mb-4 text-gray-300">
        Cortázar ilustra cómo nuestras acciones cotidianas (saludar, guarecernos de la lluvia, amar) siguen guiones ya escritos. 
        Los gestos del amor son un "dulce museo", una "galería de figuras de humo".
      </p>
      <p class="mb-4 text-gray-300">
        Lo verdaderamente nuevo da miedo o maravilla. Hamlet no duda por debilidad, busca la solución auténtica, <strong>"la tangente que triza el misterio"</strong>.
      </p>
      
      <div class="mt-6 text-center">
        <p class="text-lg text-gray-300 font-bold">"Ahí viene López. —¿Qué tal, López? —¿Qué tal, che? Y así es como creen que se saludan."</p>
      </div>
    `,
    codeExample: `// El saludo prefabricado
function saludar(persona) {
  const guionPreestablecido = "¿Qué tal, che?";
  return guionPreestablecido; // Sin pensar, solo repitiendo
}

console.log(saludar("López"));`,
    output: "¿Qué tal, che?",
    explanation: "El cuento de Cortázar es una metáfora perfecta de la naturalización: actuamos en piloto automático, repitiendo patrones culturales sin cuestionarlos."
  },
  {
    id: 'pc-f1-cuche',
    title: 'Denys Cuche: La Noción de Cultura',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Denys Cuche: Ciencias Sociales y Cultura</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">Superando el Biologicismo</h3>
      <p class="mb-4 text-gray-300">
        La noción de cultura sirve para pensar la unidad de la humanidad en la diversidad sin usar términos biológicos. 
        La respuesta "racial" está desacreditada. El hombre es esencialmente un ser de cultura.
      </p>
      <p class="mb-4 text-gray-300">
        La <strong>hominización</strong> consistió en pasar de adaptación genética a adaptación cultural. Hubo regresión de los instintos, reemplazados por la cultura.
      </p>

      <div class="bg-slate-800 p-6 rounded-lg border border-emerald-500/30 mb-6">
        <h4 class="font-bold text-emerald-300">Conceptos Clave de Cuche</h4>
        <ul class="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Orden Simbólico:</strong> La cultura penetra directamente en el sentido. No hay nada puramente natural en el hombre; hasta el hambre o el sueño tienen formato cultural.</li>
          <li><strong>Aculturación:</strong> Modalidad habitual de evolución cultural cuando hay contacto entre grupos. No es necesariamente devastadora.</li>
          <li><strong>Autonomía:</strong> Las culturas populares tienen capacidad de resistencia frente a la cultura dominante.</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Guía de Lectura Sugerida</h3>
      <ol class="list-decimal list-inside text-gray-300 space-y-2">
        <li>Explicar la frase: "No hay nada puramente natural en el hombre" con un ejemplo.</li>
        <li>Definir "orden simbólico" según el autor.</li>
        <li>¿Por qué el concepto de aculturación renovó el concepto de cultura?</li>
      </ol>
    `,
    codeExample: `// Adaptación Cultural vs Genética
const evolucion = {
  biologica: "Lenta, basada en genes",
  cultural: "Rápida, dúctil, transmitida socialmente"
};

console.log(\`La ventaja humana es la adaptación \${evolucion.cultural}\`);`,
    output: "La ventaja humana es la adaptación cultural",
    explanation: "Cuche fundamenta científicamente por qué la cultura es la herramienta principal de supervivencia y adaptación de la especie humana."
  },
  {
    id: 'pc-f1-aira',
    title: 'César Aira: La Utilidad del Arte',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">César Aira: "La Utilidad del Arte"</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">El Mundo de las Cajas Negras</h3>
      <p class="mb-4 text-gray-300">
        Antes, la gente desarmaba máquinas para entenderlas. Hoy, vivimos rodeados de <strong>"cajas negras"</strong>: aparatos donde solo importa el input (apretar botón) y el output (resultado). Ignoramos lo que sucede dentro.
      </p>
      <p class="mb-4 text-gray-300">
        La sociedad entera se volvió una caja negra impredecible. Nadie sabe bien qué pasa con la economía o los flujos globales.
      </p>

      <div class="bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500 mb-6">
        <h4 class="font-bold text-orange-300">El Arte como Arenero Pedagógico</h4>
        <p class="text-gray-300 mt-2">
          El arte es el mejor campo para preservar la inteligencia que busca saber <strong>cómo funcionan las cosas</strong>.
          La radicalidad del arte consiste en desarmar el lenguaje y volverlo a armar según otras premisas.
        </p>
        <p class="text-gray-300 mt-2">
          El artista actúa sobre las cajas negras: les quita funcionalidad y misterio al mostrar sus mecanismos internos.
        </p>
      </div>
    `,
    codeExample: `// Caja Negra vs Arte
class CajaNegra {
  usar() { return "Resultado mágico"; }
}

class Arte {
  desarmar() { return "Mecanismo revelado"; }
  reconstruir() { return "Nuevo sentido"; }
}

console.log(new Arte().desarmar());`,
    output: "Mecanismo revelado",
    explanation: "Airá defiende el arte no como decoración, sino como la última trinchera para comprender la realidad en un mundo tecnificado e incomprensible."
  },
  {
    id: 'pc-f1-grimson',
    title: 'Alejandro Grimson: Los Límites de la Cultura',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Alejandro Grimson: Fronteras e Identidades</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">Construcción Social y Realidad</h3>
      <p class="mb-4 text-gray-300">
        Todo lo humano ha sido construido. Edificios, identidades, música. 
        El problema surge cuando usamos "construcción" solo para denunciar lo ajeno y naturalizamos lo propio.
      </p>
      <p class="mb-4 text-gray-300">
        El sentido común hace creer que hay "blancos" o "negros" como categorías naturales. Pero son <strong>convenciones sociales</strong>. 
        Las fronteras son reales porque nosotros las realizamos; su poder viene de ocultar su contingencia.
      </p>

      <div class="bg-slate-800 p-6 rounded-lg border border-amber-500/30 mb-6">
        <h4 class="font-bold text-amber-300">Ontología de lo Social</h4>
        <p class="text-gray-300">
          Las instituciones son <strong>ontológicamente subjetivas</strong> (dependen de sujetos) pero <strong>epistemológicamente objetivas</strong> (sus efectos son reales y verificables).
          Ejemplo: No puedes entrar a un país sin pasaporte, aunque la frontera sea un invento humano.
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Fetichismo de las Identidades</h3>
      <p class="mb-4 text-gray-300">
        Similar al fetichismo de la mercancía: ocultamos las prácticas humanas que crearon la identidad y la vemos como una "cosa" natural.
        La pobreza y la desigualdad son creaciones humanas contingentes, no leyes naturales.
      </p>
    `,
    codeExample: `// Fronteras Subjetivas pero Objetivas
const frontera = {
  origen: "Invención humana (Subjetiva)",
  efecto: "Impide el paso (Objetiva)"
};

console.log(\`La frontera es real porque \${frontera.efecto}\`);`,
    output: "La frontera es real porque Impide el paso",
    explanation: "Grimson nos enseña que aunque las categorías (raza, nación) sean inventos, tienen consecuencias materiales muy reales en la vida de las personas."
  },
  {
    id: 'pc-f1-gonzalez',
    title: 'Jorge González: Frentes Culturales',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Jorge González: Los Frentes Culturales</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">La Lógica del Conflicto</h3>
      <p class="mb-4 text-gray-300">
        El mundo social es una lucha permanente por definir la realidad. 
        González critica la "política del Formol" (museificar lo popular) y la "política del Avestruz" (ignorar la industria cultural).
      </p>
      <p class="mb-4 text-gray-300">
        La cultura es omnipresente: organiza, sueña, recuerda, define y lucha. Es instrumento para accionar sobre la vida social.
      </p>

      <div class="bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 mb-6">
        <h4 class="font-bold text-red-300">Hegemonía y Frentes Culturales</h4>
        <p class="text-gray-300 mt-2">
          La hegemonía define cómo las clases se relacionan mediante significaciones. 
          Los <strong>frentes culturales</strong> son arenas de lucha por conferir sentido a lo común (ej. qué es "justicia", qué es "familia").
        </p>
        <p class="text-gray-300 mt-2">
          Son fronteras de contacto ideológico donde coexisten y chocan distintas visiones del mundo.
        </p>
      </div>
    `,
    codeExample: `// Dimensiones de la Cultura (González)
const funciones = ["Organizar", "Soñar", "Recordar", "Definir", "Luchar"];

funciones.forEach(fn => {
  console.log(\`La cultura sirve para \${fn.toLowerCase()}\`);
});`,
    output: "La cultura sirve para organizar\nLa cultura sirve para soñar...",
    explanation: "González amplía la visión de la cultura como un campo de batalla activo donde se disputa el significado de nuestra vida cotidiana."
  },
  {
    id: 'pc-f1-caggiano',
    title: 'Sergio Caggiano: Mostrar lo No Dicho',
    content: `
      <h2 class="text-2xl font-bold text-amber-400 mb-4">Sergio Caggiano: Imágenes Visuales</h2>
      
      <h3 class="text-xl font-semibold text-amber-300 mb-3">La Productividad de las Imágenes</h3>
      <p class="mb-4 text-gray-300">
        Las imágenes visuales juegan un papel clave en cómo percibimos y valoramos el entorno. 
        No vemos simplemente lo que está ahí; las formas de representar determinan cómo actuamos.
      </p>
      <p class="mb-4 text-gray-300 italic">
        "Al actuar, creamos lo que ese mundo es." (Poole)
      </p>

      <div class="bg-slate-800 p-6 rounded-lg border border-purple-500/30 mb-6">
        <h4 class="font-bold text-purple-300">Mostrar y Ocultar</h4>
        <p class="text-gray-300">
          Tratar con lo visual implica interrogarse por lo que se muestra y lo que se oculta. 
          ¿Quién es mostrado? ¿De qué manera? ¿Qué actores quedan invisibilizados?
        </p>
        <p class="text-gray-300 mt-2">
          Las imágenes muestran "mucho todo junto": combinan trazos de clase, género y raza. Una imagen puede ser progresista en género pero conservadora en raza.
        </p>
      </div>

      <h3 class="text-xl font-semibold text-amber-300 mb-3">Reflexión Final</h3>
      <p class="text-gray-300">
        Definir cultura incluyendo la idea de "mostrar lo no dicho" nos obliga a analizar críticamente los medios, la publicidad y el arte para ver qué normas se están reforzando silenciosamente.
      </p>
    `,
    codeExample: `// Análisis de Imagen
const imagen = {
  muestra: "Éxito individual",
  oculta: "Privilegios estructurales",
  efecto: "Naturaliza la desigualdad"
};

console.log(\`La imagen \${imagen.muestra} pero \${imagen.oculta}\`);`,
    output: "La imagen Éxito individual pero Privilegios estructurales",
    explanation: "Caggiano nos invita a leer las imágenes no como espejos de la realidad, sino como constructos activos que generan sentidos y jerarquías."
  }
];

export default practicasCulturalesFasciculo1;
