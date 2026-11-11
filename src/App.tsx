import React, { useState, useEffect } from 'react';
import { Apprentice } from './types';
import { MOCK_APPRENTICES, SENA_IDENTITY, DESIGNATED_INSTRUCTOR } from './data/senaData';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ApprenticeProfileBar } from './components/ApprenticeProfileBar';
import { InteractiveSymbolsViewer } from './components/InteractiveSymbolsViewer';
import { HymnPlayer } from './components/HymnPlayer';
import { RegulationsExplorer } from './components/RegulationsExplorer';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { EthicsSimulator } from './components/EthicsSimulator';
import { InductionChecklist } from './components/InductionChecklist';
import { InductionCertificateModal } from './components/InductionCertificateModal';
import { InstructorDashboard } from './components/InstructorDashboard';
import { SenaLogo } from './components/SenaLogo';
import { VideoManualModal } from './components/VideoManualModal';
import {
  Shield,
  BookOpen,
  Award,
  Scale,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Heart,
  Globe,
  Sparkles,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isInstructorMode, setIsInstructorMode] = useState<boolean>(false);
  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sena_apprentices');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Error loading stored apprentices', e);
      }
    }
    return MOCK_APPRENTICES;
  });
  const [currentApprenticeId, setCurrentApprenticeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sena_active_apprentice_id');
      if (saved) return saved;
    }
    return 'app-1';
  });
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [selectedFicha, setSelectedFicha] = useState<string>('2824910');

  // Sync apprentices to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentices', JSON.stringify(apprentices));
    } catch (e) {
      console.error('Error saving apprentices', e);
    }
  }, [apprentices]);

  // Sync active apprentice ID to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_active_apprentice_id', currentApprenticeId);
    } catch (e) {
      console.error('Error saving active apprentice id', e);
    }
  }, [currentApprenticeId]);

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sena_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Blur screen transition effect
  const [blurActive, setBlurActive] = useState<boolean>(false);
  const [transitionNotice, setTransitionNotice] = useState<string | null>(null);

  // Sync initial theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const willBeDark = !isDarkMode;
    setTransitionNotice(willBeDark ? 'Activando Modo Oscuro...' : 'Activando Modo Claro...');
    setBlurActive(true);

    // Step 1: Screen gets blurry, then swap color theme
    setTimeout(() => {
      setIsDarkMode(willBeDark);
      if (willBeDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sena_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sena_theme', 'light');
      }

      // Step 2: Smoothly unblur to reveal the new theme
      setTimeout(() => {
        setBlurActive(false);
        setTransitionNotice(null);
      }, 300);
    }, 240);
  };

  // Current active logged apprentice
  const currentApprentice = apprentices.find(a => a.id === currentApprenticeId) || apprentices[0];

  // Completed quizzes mapping for the current apprentice
  const completedQuizzes: Record<string, number> = {
    'quiz-identity': currentApprentice.quizScores.identity,
    'quiz-regulations': currentApprentice.quizScores.regulations,
    'quiz-stages': currentApprentice.quizScores.stages
  };

  // Handler for completing a quiz
  const handleCompleteQuiz = (quizId: string, score: number) => {
    setApprentices(prev =>
      prev.map(app => {
        if (app.id === currentApprenticeId) {
          const updatedScores = { ...app.quizScores };
          const updatedModules = { ...app.modulesCompleted };

          if (quizId === 'quiz-identity') {
            updatedScores.identity = score;
            if (score >= 70) updatedModules.identity = true;
          } else if (quizId === 'quiz-regulations') {
            updatedScores.regulations = score;
            if (score >= 70) updatedModules.regulations = true;
          } else if (quizId === 'quiz-stages') {
            updatedScores.stages = score;
            if (score >= 70) updatedModules.stages = true;
          }

          const allDone =
            updatedModules.identity &&
            updatedModules.regulations &&
            updatedModules.stages &&
            updatedModules.ethicsCase;

          return {
            ...app,
            quizScores: updatedScores,
            modulesCompleted: updatedModules,
            status: allDone ? 'Completado' : 'En Progreso'
          };
        }
        return app;
      })
    );
  };

  // Handler for resolving ethical case
  const handleCaseResolved = (_caseId: string) => {
    setApprentices(prev =>
      prev.map(app => {
        if (app.id === currentApprenticeId) {
          const nextCount = Math.min(app.casesResolved + 1, 3);
          const updatedModules = { ...app.modulesCompleted, ethicsCase: true };
          const allDone =
            updatedModules.identity &&
            updatedModules.regulations &&
            updatedModules.stages &&
            updatedModules.ethicsCase;

          return {
            ...app,
            casesResolved: nextCount,
            modulesCompleted: updatedModules,
            status: allDone ? 'Completado' : 'En Progreso'
          };
        }
        return app;
      })
    );
  };

  // Handler for toggling checklist items
  const handleToggleChecklistItem = (id: string) => {
    setApprentices(prev =>
      prev.map(app => {
        if (app.id === currentApprenticeId) {
          const exists = app.checklistCompletedIds.includes(id);
          const nextIds = exists
            ? app.checklistCompletedIds.filter(itemId => itemId !== id)
            : [...app.checklistCompletedIds, id];

          return {
            ...app,
            checklistCompletedIds: nextIds
          };
        }
        return app;
      })
    );
  };

  // Handler for saving apprentice profile and entering induction prototype
  const handleSaveAndEnterApprentice = (apprenticeData: Partial<Apprentice> & { name: string; document: string; ficha: string; program: string }) => {
    const cleanDoc = apprenticeData.document.trim();
    const existingIndex = apprentices.findIndex(
      a => (apprenticeData.id && a.id === apprenticeData.id) || a.document.replace(/\./g, '') === cleanDoc.replace(/\./g, '')
    );

    let targetId = '';

    if (existingIndex >= 0) {
      // Update existing apprentice data
      targetId = apprentices[existingIndex].id;
      setApprentices(prev =>
        prev.map(a =>
          a.id === targetId
            ? {
                ...a,
                name: apprenticeData.name.trim(),
                document: apprenticeData.document.trim(),
                ficha: apprenticeData.ficha.trim(),
                program: apprenticeData.program,
                email: apprenticeData.email?.trim() || a.email,
                regional: apprenticeData.regional || a.regional,
                centro: apprenticeData.centro || a.centro,
                lastActive: 'Hace un momento'
              }
            : a
        )
      );
    } else {
      // Create new apprentice
      targetId = `app-${Date.now()}`;
      const newApp: Apprentice = {
        id: targetId,
        name: apprenticeData.name.trim(),
        document: apprenticeData.document.trim(),
        email: apprenticeData.email?.trim() || `${apprenticeData.name.toLowerCase().replace(/\s+/g, '')}@misena.edu.co`,
        program: apprenticeData.program,
        ficha: apprenticeData.ficha.trim(),
        regional: apprenticeData.regional || 'Regional Antioquia',
        centro: apprenticeData.centro || 'Centro de Formación en Tecnologías de la Información',
        modulesCompleted: {
          identity: false,
          regulations: false,
          stages: false,
          ethicsCase: false
        },
        quizScores: {
          identity: 0,
          regulations: 0,
          stages: 0
        },
        casesResolved: 0,
        checklistCompletedIds: [],
        lastActive: 'Hace un momento',
        status: 'En Progreso'
      };
      setApprentices(prev => [newApp, ...prev]);
    }

    setCurrentApprenticeId(targetId);
    setIsInstructorMode(false);
    setCurrentView('workspace');
    setActiveTab('inicio');
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300 ${
        blurActive ? 'screen-blur-active' : 'screen-blur-settling'
      }`}
    >
      {/* Floating Transition Indicator during blur */}
      {blurActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center backdrop-blur-md bg-black/10 dark:bg-black/30 transition-all duration-200">
          <div className="px-5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-2xl flex items-center gap-2.5 text-xs font-bold text-slate-900 dark:text-slate-100">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{transitionNotice}</span>
          </div>
        </div>
      )}

      {currentView === 'landing' ? (
        <LandingPage
          apprentices={apprentices}
          selectedApprenticeId={currentApprenticeId}
          onSelectApprentice={(id) => setCurrentApprenticeId(id)}
          onEnterAsApprentice={() => {
            setIsInstructorMode(false);
            setCurrentView('workspace');
            setActiveTab('inicio');
          }}
          onEnterAsInstructor={() => {
            setIsInstructorMode(true);
            setCurrentView('workspace');
            setActiveTab('seguimiento');
          }}
          onRegisterApprentice={handleSaveAndEnterApprentice}
          onSaveAndEnterApprentice={handleSaveAndEnterApprentice}
          designatedInstructor={DESIGNATED_INSTRUCTOR}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenVideoManual={() => setIsVideoModalOpen(true)}
        />
      ) : (
        <>
          {/* Institutional Top Bar */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isInstructorMode={isInstructorMode}
            setIsInstructorMode={setIsInstructorMode}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onReturnToLanding={() => setCurrentView('landing')}
            onOpenVideoManual={() => setIsVideoModalOpen(true)}
          />

          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            
            {/* Learner Progress Bar (Only visible when in learner context) */}
            {!isInstructorMode && (
              <ApprenticeProfileBar
                apprentice={currentApprentice}
                onOpenCertificate={() => setIsCertificateOpen(true)}
                onNavigateTab={setActiveTab}
                onSwitchApprentice={() => setCurrentView('landing')}
              />
            )}

        {/* Tab 1: INICIO / INDUCCIÓN GENERAL */}
        {activeTab === 'inicio' && (
          <div className="space-y-8">
            {/* Hero Split Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch transition-colors">
              
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
                    <SenaLogo className="w-4 h-4" />
                    <span>Programa de Inducción Institucional SENA</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                    Construyendo tu futuro con Formación Profesional Integral
                  </h1>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Bienvenido a la comunidad SENA. En esta plataforma interactiva aprenderás todo sobre la historia,
                    los símbolos patrios de la institución, el <span className="font-semibold text-slate-800 dark:text-slate-200">Reglamento del Aprendiz (Acuerdo 007 de 2012)</span>,
                    tus derechos y deberes, evaluando tus conocimientos con cuestionarios dinámicos y simuladores de casos.
                  </p>
                </div>

                {/* Quick CTA Actions */}
                <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveTab('identidad')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Explorar Símbolos & Himno</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('normativa')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Consultar Reglamento</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('quizzes')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Realizar Cuestionarios</span>
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="lg:col-span-5 relative min-h-64 lg:min-h-full bg-slate-100 dark:bg-slate-800">
                <img
                  src="/src/assets/images/hero_sena_induction_1794325244176.jpg"
                  alt="Aprendices SENA en ambiente de formación tecnológica"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-medium bg-emerald-700/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      Colombia · Paz y Trabajo
                    </span>
                    <p className="text-xs text-slate-200 mt-1">
                      Más de 65 años formando el talento técnico y tecnológico del país
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* 4 Feature Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div
                onClick={() => setActiveTab('identidad')}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  01. Símbolos e Identidad
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Conoce el escudo de los 3 sectores, la bandera de la paz, el caminante y entona el himno con el reproductor.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <span>Ver símbolos</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('normativa')}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  02. Reglamento del Aprendiz
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Buscador instantáneo de derechos, deberes, prohibiciones, clasificación de faltas y etapa productiva.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <span>Explorar artículos</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('quizzes')}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  03. Cuestionarios Dinámicos
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Evalúa lo aprendido con preguntas situacionales, retroalimentación inmediata y medallas institucionales.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <span>Empezar quiz</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('casos')}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  04. Simulador del Comité
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Toma decisiones reales en casos de plagio, ausentismo y accidentes de taller aplicando el debido proceso.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <span>Analizar casos</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

            </div>

            {/* Checklist of Induction */}
            <InductionChecklist
              completedIds={currentApprentice.checklistCompletedIds}
              onToggleItem={handleToggleChecklistItem}
            />

            {/* Institutional Values & Platforms Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Values Card */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Cultura Institucional</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Principios y Valores SENA
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  La formación profesional integral no solo enseña un oficio, sino que forja ciudadanos honestos y solidarios.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SENA_IDENTITY.values.map((val) => (
                    <div key={val.name} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{val.name}</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platforms Card */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Ecosistema Digital</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Plataformas Clave
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Herramientas oficiales que utilizarás durante tu etapa lectiva y productiva.
                  </p>

                  <div className="space-y-2.5">
                    {SENA_IDENTITY.platforms.slice(0, 4).map((plat) => (
                      <div key={plat.name} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{plat.name}</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{plat.desc}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Soporte en línea: mesa de ayuda SENA</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">018000 910270</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: IDENTIDAD & SÍMBOLOS */}
        {activeTab === 'identidad' && (
          <div className="space-y-6">
            <InteractiveSymbolsViewer />
            <HymnPlayer />
          </div>
        )}

        {/* Tab 3: REGLAMENTO & NORMATIVA */}
        {activeTab === 'normativa' && (
          <div className="space-y-6">
            <RegulationsExplorer />
          </div>
        )}

        {/* Tab 4: CUESTIONARIOS */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <InteractiveQuiz
              onCompleteQuiz={handleCompleteQuiz}
              completedQuizzes={completedQuizzes}
            />
          </div>
        )}

        {/* Tab 5: SIMULADOR ÉTICO */}
        {activeTab === 'casos' && (
          <div className="space-y-6">
            <EthicsSimulator
              onCaseResolved={handleCaseResolved}
              resolvedCasesCount={currentApprentice.casesResolved}
            />
          </div>
        )}

        {/* Tab 6: PANEL DE SEGUIMIENTO (INSTRUCTOR) */}
        {activeTab === 'seguimiento' && (
          <div className="space-y-6">
            <InstructorDashboard
              apprentices={apprentices}
              selectedFicha={selectedFicha}
              onSelectFicha={setSelectedFicha}
              onInspectApprentice={(app) => {
                setCurrentApprenticeId(app.id);
                setIsCertificateOpen(true);
              }}
              designatedInstructor={DESIGNATED_INSTRUCTOR}
              onReturnToPortal={() => setCurrentView('landing')}
            />
          </div>
        )}

      </main>

      {/* Official Certificate Modal */}
      <InductionCertificateModal
        apprentice={currentApprentice}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      {/* Floating Video Manual Modal */}
      <VideoManualModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Quiet Institutional Footer */}
      <footer className="no-print mt-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5 shrink-0" />
            <span className="font-bold text-slate-900 dark:text-slate-100">Servicio Nacional de Aprendizaje - SENA</span>
            <span aria-hidden="true">·</span>
            <span>Ministerio del Trabajo · Colombia</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              Portal de Roles
            </button>
            <button
              onClick={() => setActiveTab('normativa')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Acuerdo 007 de 2012
            </button>
            <button
              onClick={() => setActiveTab('identidad')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Manual de Imagen
            </button>
            <button
              onClick={() => {
                setIsInstructorMode(!isInstructorMode);
                setActiveTab(isInstructorMode ? 'inicio' : 'seguimiento');
              }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              {isInstructorMode ? 'Regresar a Vista Aprendiz' : 'Acceso Instructor'}
            </button>
          </div>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}
