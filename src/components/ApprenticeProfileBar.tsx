import React from 'react';
import { Apprentice } from '../types';
import { Award, BookOpen, CheckCircle, FileText, Sparkles, ChevronRight } from 'lucide-react';

interface ApprenticeProfileBarProps {
  apprentice: Apprentice;
  onOpenCertificate: () => void;
  onNavigateTab: (tab: string) => void;
  onSwitchApprentice?: () => void;
}

export const ApprenticeProfileBar: React.FC<ApprenticeProfileBarProps> = ({
  apprentice,
  onOpenCertificate,
  onNavigateTab,
  onSwitchApprentice
}) => {
  // Calculate completion percentage
  const totalItems = 4; // 3 modules + 1 case
  let completedCount = 0;
  if (apprentice.modulesCompleted.identity) completedCount++;
  if (apprentice.modulesCompleted.regulations) completedCount++;
  if (apprentice.modulesCompleted.stages) completedCount++;
  if (apprentice.modulesCompleted.ethicsCase) completedCount++;

  const progressPercent = Math.round((completedCount / totalItems) * 100);
  const isCompleted = progressPercent === 100;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Learner Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold text-lg shrink-0">
            {apprentice.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {apprentice.name}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                CC {apprentice.document}
              </span>
              {onSwitchApprentice && (
                <button
                  onClick={onSwitchApprentice}
                  className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
                  title="Cambiar de aprendiz en el portal"
                >
                  (Cambiar)
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-1 flex-wrap">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ficha {apprentice.ficha}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="truncate max-w-xs">{apprentice.program}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 dark:text-slate-400">{apprentice.regional}</span>
            </div>
          </div>
        </div>

        {/* Progress & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          {/* Progress Bar with Tabular Digits */}
          <div className="flex flex-col min-w-44">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-600 dark:text-slate-400">Avance de Inducción</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              <span>{completedCount} de {totalItems} requisitos aprobados</span>
            </div>
          </div>

          {/* Badges preview */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigateTab('quizzes')}
              title="Módulo Identidad"
              className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                apprentice.modulesCompleted.identity
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Identidad</span>
            </button>
            <button
              onClick={() => onNavigateTab('quizzes')}
              title="Módulo Reglamento"
              className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                apprentice.modulesCompleted.regulations
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reglamento</span>
            </button>
            <button
              onClick={() => onNavigateTab('casos')}
              title="Simulador de Casos"
              className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                apprentice.modulesCompleted.ethicsCase
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Comité</span>
            </button>
          </div>

          {/* Certificate Trigger Button */}
          <button
            onClick={onOpenCertificate}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Descargar Certificado Oficial</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Previsualizar Certificado</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
