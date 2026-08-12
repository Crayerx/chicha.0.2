import { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle, Circle, ArrowLeft, Lightbulb, Quote, FileText } from 'lucide-react';
import { culturalPracticeData, allFasciculos } from '../data/culturalPractices';

interface CulturalPracticesViewProps {
  onBack: () => void;
}

export function CulturalPracticesView({ onBack }: CulturalPracticesViewProps) {
  const [selectedFasciculo, setSelectedFasciculo] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const currentFasciculo = allFasciculos.find(f => f.id === selectedFasciculo);
  const currentLesson = currentFasciculo?.lessons.find(l => l.id === selectedLesson);

  // Vista de lista de fascículos
  if (!selectedFasciculo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver a Cursos
          </button>

          <div className="glass-effect rounded-2xl p-6 md:p-8 border border-amber-500/20 glow-gold">
            <div className="flex items-start justify-between flex-col md:flex-row gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">📜</span>
                  <h1 className="text-3xl md:text-4xl font-bold neon-text-gold">
                    {culturalPracticeData.title}
                  </h1>
                </div>
                <p className="text-amber-400/80 text-lg mb-4">{culturalPracticeData.institution}</p>
                <p className="text-slate-300 max-w-3xl leading-relaxed">
                  {culturalPracticeData.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{culturalPracticeData.cycle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{culturalPracticeData.semester}</span>
                </div>
              </div>
            </div>

            {/* Objetivos */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {culturalPracticeData.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-4 border border-amber-500/10">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fascículos */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-amber-400" />
            Fascículos del Módulo
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {allFasciculos.map((fasciculo, index) => (
              <button
                key={fasciculo.id}
                onClick={() => setSelectedFasciculo(fasciculo.id)}
                className="group glass-effect rounded-xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition-all hover-lift text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📚</span>
                  <ChevronRight className="w-6 h-6 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-2 group-hover:neon-text-gold transition-all">
                  {fasciculo.title.replace('Fascículo ', 'Fasc. ')}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {fasciculo.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{fasciculo.lessons.length} lecciones</span>
                </div>
              </button>
            ))}
          </div>

          {/* Modalidad */}
          <div className="mt-12 glass-effect rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Modalidad de Cursada</h3>
            <p className="text-slate-400">{culturalPracticeData.modality}</p>
          </div>
        </div>
      </div>
    );
  }

  // Vista de lecciones dentro de un fascículo
  if (!currentLesson && currentFasciculo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header con navegación */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedFasciculo(null)}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Volver a Fascículos
            </button>

            <div className="glass-effect rounded-2xl p-6 border border-amber-500/20">
              <h1 className="text-3xl font-bold neon-text-gold mb-2">
                {currentFasciculo.title}
              </h1>
              <p className="text-slate-400">{currentFasciculo.description}</p>
            </div>
          </div>

          {/* Lista de lecciones */}
          <div className="space-y-4">
            {currentFasciculo.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className="w-full glass-effect rounded-xl p-6 border border-slate-700 hover:border-amber-400/40 transition-all hover-lift text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
                    <span className="text-amber-400 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {lesson.keyPoints.length} puntos clave
                      </span>
                      {lesson.readingGuide && (
                        <span className="flex items-center gap-1 text-amber-400/80">
                          <Lightbulb className="w-4 h-4" />
                          Incluye guía de lectura
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vista de contenido de lección
  if (currentLesson && currentFasciculo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Navegación superior */}
          <div className="mb-6 flex items-center gap-4 text-sm">
            <button
              onClick={() => setSelectedFasciculo(null)}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              Fascículos
            </button>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              {currentFasciculo.title.replace('Fascículo ', 'Fasc. ')}
            </button>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-amber-400">{currentLesson.title}</span>
          </div>

          {/* Contenido de la lección */}
          <article className="glass-effect rounded-2xl p-6 md:p-8 border border-amber-500/20">
            <h1 className="text-2xl md:text-3xl font-bold neon-text-gold mb-6">
              {currentLesson.title}
            </h1>

            {/* Contenido principal renderizado como Markdown simplificado */}
            <div className="prose prose-invert max-w-none">
              {currentLesson.content.split('\n').map((line, idx) => {
                // Títulos H2
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-xl font-bold text-amber-400 mt-8 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                // Títulos H3
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg font-semibold text-slate-200 mt-6 mb-3">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                // Citas
                if (line.startsWith('> ')) {
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-4 border-amber-500 pl-4 my-4 italic text-slate-300 bg-slate-900/50 py-3 pr-3 rounded-r-lg"
                    >
                      {line.replace('> ', '')}
                    </blockquote>
                  );
                }
                // Negritas dentro de líneas normales
                if (line.includes('**')) {
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={idx} className="text-slate-300 my-3 leading-relaxed">
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong key={i} className="text-amber-400 font-semibold">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                // Viñetas
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="text-slate-300 ml-4 my-2">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                // Líneas vacías
                if (line.trim() === '') {
                  return <div key={idx} className="h-4" />;
                }
                // Párrafos normales
                return (
                  <p key={idx} className="text-slate-300 my-3 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Puntos clave */}
            <div className="mt-8 p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20">
              <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Puntos Clave
              </h3>
              <ul className="space-y-2">
                {currentLesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guía de lectura */}
            {currentLesson.readingGuide && (
              <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Guía de Lectura
                </h3>
                <ul className="space-y-4 mb-4">
                  {currentLesson.readingGuide.questions.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs text-amber-400 font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{question}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 italic flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  {currentLesson.readingGuide.note}
                </p>
              </div>
            )}
          </article>

          {/* Navegación inferior */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Lecciones
            </button>

            {/* Botón de siguiente lección si existe */}
            {(() => {
              const currentIndex = currentFasciculo.lessons.findIndex(l => l.id === currentLesson.id);
              const nextLesson = currentFasciculo.lessons[currentIndex + 1];
              if (nextLesson) {
                return (
                  <button
                    onClick={() => setSelectedLesson(nextLesson.id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all hover-lift"
                  >
                    Siguiente Lección
                    <ChevronRight className="w-5 h-5" />
                  </button>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
