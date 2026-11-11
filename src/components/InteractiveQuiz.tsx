import React, { useState } from 'react';
import { SENA_QUIZZES } from '../data/senaData';
import { Quiz, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen } from 'lucide-react';

interface InteractiveQuizProps {
  onCompleteQuiz: (quizId: string, score: number) => void;
  completedQuizzes: Record<string, number>;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  onCompleteQuiz,
  completedQuizzes
}) => {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const currentQuiz: Quiz = SENA_QUIZZES[selectedQuizIndex];
  const currentQuestion: QuizQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleVerifyAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setUserAnswers(prev => [...prev, selectedAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished quiz
      setQuizFinished(true);
      const totalQuestions = currentQuiz.questions.length;
      const finalScorePoints = Math.round(((score + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0)) / totalQuestions) * 100);
      onCompleteQuiz(currentQuiz.id, finalScorePoints);

      if (finalScorePoints >= 70) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setUserAnswers([]);
  };

  const handleSwitchQuiz = (idx: number) => {
    setSelectedQuizIndex(idx);
    handleRestartQuiz();
  };

  const finalPercentage = Math.round((score / currentQuiz.questions.length) * 100);
  const isApproved = finalPercentage >= 70;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
      {/* Quiz Selector bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Evaluación Formativa Interactiva
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Cuestionarios de Inducción
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Valida tus conocimientos y gana insignias oficiales del SENA.
          </p>
        </div>

        {/* Module Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          {SENA_QUIZZES.map((q, idx) => {
            const hasCompleted = completedQuizzes[q.id] !== undefined;
            const pastScore = completedQuizzes[q.id];

            return (
              <button
                key={q.id}
                onClick={() => handleSwitchQuiz(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedQuizIndex === idx
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>Módulo {idx + 1}</span>
                {hasCompleted && (
                  <span className="ml-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    ({pastScore}%)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Area */}
      {!quizFinished ? (
        <div className="mt-6">
          {/* Question progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{currentQuiz.title}</span>
            <span className="font-mono tabular-nums">
              Pregunta {currentQuestionIndex + 1} de {currentQuiz.questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-emerald-600 h-1.5 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`
              }}
            />
          </div>

          {/* Question text */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';

              if (isAnswerSubmitted) {
                if (idx === currentQuestion.correctIndex) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/10';
                } else if (isSelected && idx !== currentQuestion.correctIndex) {
                  optionStyle = 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-40';
                }
              } else if (isSelected) {
                optionStyle = 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-600/15 text-emerald-900 dark:text-emerald-200 font-medium';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQuestion.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Box after submit */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border mb-6 text-xs leading-relaxed ${
                selectedAnswer === currentQuestion.correctIndex
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-amber-50/70 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Respuesta Correcta!</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Retroalimentación Formativa</span>
                  </>
                )}
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isAnswerSubmitted ? 'Lee la explicación y continúa' : 'Selecciona una opción para verificar'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleVerifyAnswer}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
              >
                Verificar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>{currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="mt-8 text-center max-w-lg mx-auto py-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {isApproved ? '¡Módulo Superado con Éxito!' : 'Módulo por Superar'}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {isApproved
              ? `Has obtenido ${score} de ${currentQuiz.questions.length} respuestas correctas (${finalPercentage}%). ¡Has desbloqueado la insignia institucional!`
              : `Has obtenido ${score} de ${currentQuiz.questions.length} respuestas correctas (${finalPercentage}%). Necesitas mínimo 70% para aprobar. Puedes repetirlo ahora mismo.`}
          </p>

          {/* Badge Display */}
          {isApproved && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-3 text-left">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  Insignia Obtenida
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {currentQuiz.badgeName}
                </span>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Cuestionario</span>
            </button>

            {selectedQuizIndex < SENA_QUIZZES.length - 1 && (
              <button
                onClick={() => handleSwitchQuiz(selectedQuizIndex + 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <span>Siguiente Módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
