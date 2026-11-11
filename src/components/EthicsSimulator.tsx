import React, { useState } from 'react';
import { SENA_ETHICAL_CASES } from '../data/senaData';
import { EthicalCase } from '../types';
import { Scale, CheckCircle, AlertCircle, ArrowRight, RotateCcw, BookOpen, ShieldAlert } from 'lucide-react';

interface EthicsSimulatorProps {
  onCaseResolved: (caseId: string) => void;
  resolvedCasesCount: number;
}

export const EthicsSimulator: React.FC<EthicsSimulatorProps> = ({
  onCaseResolved,
  resolvedCasesCount
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submittedOption, setSubmittedOption] = useState<{
    id: string;
    action: string;
    isCorrect: boolean;
    feedback: string;
    regulationReference: string;
  } | null>(null);

  const currentCase: EthicalCase = SENA_ETHICAL_CASES[currentCaseIndex];

  const handleSelect = (optId: string) => {
    if (submittedOption) return;
    setSelectedOptionId(optId);
  };

  const handleEvaluate = () => {
    if (!selectedOptionId) return;
    const option = currentCase.options.find(o => o.id === selectedOptionId);
    if (option) {
      setSubmittedOption(option);
      if (option.isCorrect) {
        onCaseResolved(currentCase.id);
      }
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < SENA_ETHICAL_CASES.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setSubmittedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentCaseIndex(0);
    setSelectedOptionId(null);
    setSubmittedOption(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Simulador de Casos Reales</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              ¿Qué decide el Comité de Evaluación?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Asume el rol del Comité de Evaluación y Seguimiento. Analiza dilemas reales de aprendices y aplica el Reglamento con criterio formativo y debido proceso.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shrink-0">
            <span className="font-medium">Casos resueltos:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">{resolvedCasesCount} / {SENA_ETHICAL_CASES.length}</span>
          </div>
        </div>
      </div>

      {/* Case content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        
        {/* Left: Case Scenario & Context */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-slate-50 dark:bg-slate-950/60 flex flex-col justify-between">
          <div>
            {/* Case number & category */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span className="font-bold text-emerald-800 dark:text-emerald-400">Caso {currentCaseIndex + 1} de {SENA_ETHICAL_CASES.length}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Falta {currentCase.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 dark:text-amber-400 font-medium">Gravedad: {currentCase.gravity}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 leading-snug">
              {currentCase.title}
            </h3>

            {/* Committee Image representation */}
            <div className="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-700 shadow-xs relative">
              <img
                src="/src/assets/images/sena_ethics_committee_1794325245814.jpg"
                alt="Comité de Evaluación y Seguimiento SENA"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-white">
                  Instancia colegiada: Garantía del Debido Proceso
                </span>
              </div>
            </div>

            {/* Scenario description */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Hechos presentados al Comité:
              </span>
              {currentCase.scenario}
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">Implicado:</span>
              <span>{currentCase.involvedActor}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Fundamento: Acuerdo 007 de 2012 y principios de proporcionalidad.</span>
          </div>
        </div>

        {/* Right: Decision Options & Feedback */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              ¿Qué medida o recomendación debe dictaminar el Comité?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Evalúa las tres alternativas según el debido proceso, la gravedad de la conducta y el espíritu pedagógico del SENA.
            </p>

            {/* Options list */}
            <div className="space-y-3">
              {currentCase.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

                if (submittedOption) {
                  if (opt.id === submittedOption.id) {
                    cardStyle = opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-medium ring-2 ring-emerald-500/10'
                      : 'border-rose-400 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200';
                  } else if (opt.isCorrect) {
                    cardStyle = 'border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                  } else {
                    cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-40';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-600/15 text-emerald-900 dark:text-emerald-200 font-medium';
                }

                return (
                  <button
                    key={opt.id}
                    disabled={!!submittedOption}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${cardStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p>{opt.action}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback box */}
            {submittedOption && (
              <div
                className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                  submittedOption.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-2">
                  {submittedOption.isCorrect ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Dictamen Acertado</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Dictamen Inadecuado</span>
                    </>
                  )}
                </div>
                <p className="mb-2">{submittedOption.feedback}</p>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-bold">Base Normativa: </span>
                  {submittedOption.regulationReference}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
            {!submittedOption ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleEvaluate}
                className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
              >
                Dictaminar Medida
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => {
                    setSelectedOptionId(null);
                    setSubmittedOption(null);
                  }}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Intentar otra opción</span>
                </button>

                {currentCaseIndex < SENA_ETHICAL_CASES.length - 1 ? (
                  <button
                    onClick={handleNextCase}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Siguiente Caso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Reiniciar Casos</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
