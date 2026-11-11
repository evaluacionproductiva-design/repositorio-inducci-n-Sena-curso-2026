import React from 'react';
import { UserCheck, ShieldCheck, Sun, Moon, ArrowLeft, LogOut, Film, Play } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInstructorMode: boolean;
  setIsInstructorMode: (val: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onReturnToLanding?: () => void;
  onOpenVideoManual?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isInstructorMode,
  setIsInstructorMode,
  isDarkMode,
  toggleDarkMode,
  onReturnToLanding,
  onOpenVideoManual
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inducción SENA' },
    { id: 'identidad', label: 'Identidad & Símbolos' },
    { id: 'normativa', label: 'Reglamento & Normativa' },
    { id: 'quizzes', label: 'Cuestionarios' },
    { id: 'casos', label: 'Simulador Ético' },
    { id: 'seguimiento', label: 'Panel de Seguimiento' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Institutional Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
        >
          <div className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <SenaLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none whitespace-nowrap">
              SENA Inducción
            </span>
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 tracking-wide uppercase mt-0.5">
              Formación Profesional Integral
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                activeTab === item.id
                  ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Video Manual + Role switch + Dark Mode Button in Top Right */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onOpenVideoManual && (
            <button
              type="button"
              onClick={onOpenVideoManual}
              title="Ver el video manual interactivo de la plataforma"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current text-emerald-200" />
              <span className="whitespace-nowrap">Video Manual</span>
            </button>
          )}


          {onReturnToLanding && (
            <button
              onClick={onReturnToLanding}
              title="Volver a la página principal y selector de roles"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cambiar Rol</span>
            </button>
          )}

          <button
            onClick={() => {
              const nextMode = !isInstructorMode;
              setIsInstructorMode(nextMode);
              if (nextMode) {
                setActiveTab('seguimiento');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isInstructorMode
                ? 'bg-emerald-800 text-white shadow-xs hover:bg-emerald-900'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isInstructorMode ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span className="whitespace-nowrap hidden sm:inline">Modo Instructor</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="whitespace-nowrap hidden sm:inline">Rol Instructor</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle in the top right corner */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro (con transición difusa)'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-xs"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="text-[11px] font-medium hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="text-[11px] font-medium hidden sm:inline">Oscuro</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 gap-2 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === item.id
                ? 'bg-emerald-600 text-white font-medium'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
