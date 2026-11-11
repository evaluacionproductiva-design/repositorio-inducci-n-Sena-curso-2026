import React, { useState } from 'react';
import { Apprentice, InstructorProfile } from '../types';
import { Search, Download, Users, AlertCircle, CheckCircle2, TrendingUp, Eye, Mail, Award, X, ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';

interface InstructorDashboardProps {
  apprentices: Apprentice[];
  selectedFicha: string;
  onSelectFicha: (ficha: string) => void;
  onInspectApprentice: (apprentice: Apprentice) => void;
  designatedInstructor?: InstructorProfile;
  onReturnToPortal?: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  selectedFicha,
  onSelectFicha,
  onInspectApprentice,
  designatedInstructor,
  onReturnToPortal
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Completado' | 'En Progreso' | 'Rezagado'>('Todos');
  const [inspectModalApprentice, setInspectModalApprentice] = useState<Apprentice | null>(null);

  // Available unique fichas
  const uniqueFichas = Array.from(new Set(apprentices.map(a => a.ficha)));

  // Filter apprentices by selected ficha, search term and status
  const currentFichaApprentices = apprentices.filter(a => a.ficha === selectedFicha);

  const filteredApprentices = currentFichaApprentices.filter((app) => {
    const matchesStatus = statusFilter === 'Todos' || app.status === statusFilter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.document.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Calculate stats for current cohorte
  const totalCount = currentFichaApprentices.length;
  const completedCount = currentFichaApprentices.filter(a => a.status === 'Completado').length;
  const inProgressCount = currentFichaApprentices.filter(a => a.status === 'En Progreso').length;
  const atRiskCount = currentFichaApprentices.filter(a => a.status === 'Rezagado').length;

  const avgProgress = totalCount > 0
    ? Math.round(
        currentFichaApprentices.reduce((acc, curr) => {
          let count = 0;
          if (curr.modulesCompleted.identity) count++;
          if (curr.modulesCompleted.regulations) count++;
          if (curr.modulesCompleted.stages) count++;
          if (curr.modulesCompleted.ethicsCase) count++;
          return acc + (count / 4) * 100;
        }, 0) / totalCount
      )
    : 0;

  const avgRegScore = totalCount > 0
    ? Math.round(
        currentFichaApprentices.reduce((acc, curr) => acc + (curr.quizScores.regulations || 0), 0) / totalCount
      )
    : 0;

  // Export report to CSV
  const handleExportCSV = () => {
    const headers = ['Nombre', 'Documento', 'Correo', 'Ficha', 'Programa', 'Estado', 'Quiz Identidad', 'Quiz Reglamento', 'Quiz Etapas', 'Casos Resueltos', 'Ultima Actividad'];
    const rows = currentFichaApprentices.map(a => [
      `"${a.name}"`,
      `"${a.document}"`,
      `"${a.email}"`,
      `"${a.ficha}"`,
      `"${a.program}"`,
      `"${a.status}"`,
      `${a.quizScores.identity}%`,
      `${a.quizScores.regulations}%`,
      `${a.quizScores.stages}%`,
      `${a.casesResolved}`,
      `"${a.lastActive}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Reporte_Induccion_Ficha_${selectedFicha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Designated Instructor Authority Banner */}
      {designatedInstructor && (
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-xs">
              PR
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-white">{designatedInstructor.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instructora Encargada
                </span>
                <span className="text-xs font-mono text-slate-400">CC {designatedInstructor.document}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {designatedInstructor.title} · {designatedInstructor.centro}
              </p>
            </div>
          </div>

          {onReturnToPortal && (
            <button
              onClick={onReturnToPortal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700 shrink-0 self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Portal / Cambiar Rol</span>
            </button>
          )}
        </div>
      )}

      {/* Top Banner & Ficha Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Gestión y Monitoreo de Cohortes</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Panel de Seguimiento a la Inducción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supervisa el avance de los aprendices en identidad institucional, evaluación normativa y casos éticos.
            </p>
          </div>

          {/* Ficha selector & CSV button */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-slate-600 dark:text-slate-400">Ficha:</span>
              <select
                value={selectedFicha}
                onChange={(e) => onSelectFicha(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                {uniqueFichas.map(f => (
                  <option key={f} value={f}>
                    Ficha {f} ({f === '2824910' ? 'ADSO' : 'Gestión'})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Reporte CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Quantitative Rigor Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Total Aprendices</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">{totalCount}</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Matriculados</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Avance Promedio Grupo</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">{avgProgress}%</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Inducción Aprobada</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">{completedCount}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">{totalCount > 0 ? Math.round((completedCount/totalCount)*100) : 0}% del grupo</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Aprendices en Alerta</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono tabular-nums">{atRiskCount}</span>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Requieren contacto</span>
            </div>
          </div>

        </div>
      </div>

      {/* Cohort Table & Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs overflow-hidden transition-colors">
        
        {/* Table Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative min-w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, cédula o correo..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Status Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto scrollbar-none">
            {(['Todos', 'Completado', 'En Progreso', 'Rezagado'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Estado Inducción</th>
                <th className="py-3 px-4">Avance Módulos</th>
                <th className="py-3 px-4 text-center">Quiz Identidad</th>
                <th className="py-3 px-4 text-center">Quiz Normativa</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 dark:text-slate-400">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredApprentices.map((app) => {
                  let completedCount = 0;
                  if (app.modulesCompleted.identity) completedCount++;
                  if (app.modulesCompleted.regulations) completedCount++;
                  if (app.modulesCompleted.stages) completedCount++;
                  if (app.modulesCompleted.ethicsCase) completedCount++;
                  const progressPct = Math.round((completedCount / 4) * 100);

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                            {app.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                              {app.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {app.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {app.document}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            app.status === 'Completado'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : app.status === 'En Progreso'
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          }`}
                        >
                          {app.status === 'Completado' && <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                          {app.status === 'Rezagado' && <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />}
                          <span>{app.status}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 min-w-28">
                          <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                            {progressPct}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-medium">
                        {app.quizScores.identity > 0 ? (
                          <span className="text-emerald-700 dark:text-emerald-400">{app.quizScores.identity}%</span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-medium">
                        {app.quizScores.regulations > 0 ? (
                          <span className="text-emerald-700 dark:text-emerald-400">{app.quizScores.regulations}%</span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setInspectModalApprentice(app)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer"
                          title="Ver detalle del aprendiz"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Mostrando {filteredApprentices.length} de {currentFichaApprentices.length} aprendices</span>
          <span className="font-medium">Última sincronización con SOFIA Plus: Hoy 07:35 AM</span>
        </div>
      </div>

      {/* Inspect Apprentice Modal */}
      {inspectModalApprentice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center">
                  {inspectModalApprentice.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {inspectModalApprentice.name}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    CC {inspectModalApprentice.document}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectModalApprentice(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-1">Programa de Formación:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{inspectModalApprentice.program} (Ficha {inspectModalApprentice.ficha})</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Quiz Identidad</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">{inspectModalApprentice.quizScores.identity}%</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Quiz Normativa</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">{inspectModalApprentice.quizScores.regulations}%</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Quiz Etapas</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">{inspectModalApprentice.quizScores.stages}%</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Casos Éticos</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">{inspectModalApprentice.casesResolved} resueltos</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">Checklist de Inducción:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{inspectModalApprentice.checklistCompletedIds.length} de 10 actividades cumplidas</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Estado actual: <strong>{inspectModalApprentice.status}</strong></span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Activo: {inspectModalApprentice.lastActive}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setInspectModalApprentice(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
