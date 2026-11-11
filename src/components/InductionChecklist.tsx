import React, { useState } from 'react';
import { INDUCTION_CHECKLIST_ITEMS } from '../data/senaData';
import { CheckSquare, Square, CheckCircle, Clock } from 'lucide-react';

interface InductionChecklistProps {
  completedIds: string[];
  onToggleItem: (id: string) => void;
}

export const InductionChecklist: React.FC<InductionChecklistProps> = ({
  completedIds,
  onToggleItem
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const filteredItems = INDUCTION_CHECKLIST_ITEMS.filter((item) => {
    const isDone = completedIds.includes(item.id);
    if (filter === 'pending') return !isDone;
    if (filter === 'done') return isDone;
    return true;
  });

  const percent = Math.round((completedIds.length / INDUCTION_CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Ruta de Aprendizaje del Aprendiz
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Lista de Chequeo de Inducción
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Marca las actividades de inducción que vas completando en tu Centro de Formación.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Todos ({INDUCTION_CHECKLIST_ITEMS.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Pendientes ({INDUCTION_CHECKLIST_ITEMS.length - completedIds.length})
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'done'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Completados ({completedIds.length})
          </button>
        </div>
      </div>

      {/* Progress small bar */}
      <div className="my-5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {completedIds.length} de {INDUCTION_CHECKLIST_ITEMS.length} actividades verificadas
          </span>
        </div>
        <span className="font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">{percent}%</span>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Items list */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          const isDone = completedIds.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                isDone
                  ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs font-bold leading-snug ${
                      isDone
                        ? 'text-emerald-950 dark:text-emerald-200 line-through opacity-80'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                    {item.phase}
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    isDone ? 'text-emerald-800/70 dark:text-emerald-400/80' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
