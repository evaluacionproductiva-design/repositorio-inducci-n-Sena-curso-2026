import React, { useState, useEffect } from 'react';
import { Apprentice, InstructorProfile } from '../types';
import { SenaLogo } from './SenaLogo';
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Search,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Award,
  Sparkles,
  BookOpen,
  Scale,
  Building2,
  Sun,
  Moon,
  ChevronRight,
  Save,
  Check,
  RotateCcw,
  BadgeCheck,
  TrendingUp,
  UserCheck,
  Play,
  Film
} from 'lucide-react';

interface LandingPageProps {
  apprentices: Apprentice[];
  selectedApprenticeId: string;
  onSelectApprentice: (id: string) => void;
  onEnterAsApprentice: () => void;
  onEnterAsInstructor: () => void;
  onRegisterApprentice: (newApprentice: Omit<Apprentice, 'id' | 'modulesCompleted' | 'quizScores' | 'casesResolved' | 'checklistCompletedIds' | 'lastActive' | 'status'>) => void;
  onSaveAndEnterApprentice: (apprenticeData: Partial<Apprentice> & { name: string; document: string; ficha: string; program: string }) => void;
  designatedInstructor: InstructorProfile;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenVideoManual?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  apprentices,
  selectedApprenticeId,
  onSelectApprentice,
  onEnterAsApprentice,
  onEnterAsInstructor,
  onRegisterApprentice,
  onSaveAndEnterApprentice,
  designatedInstructor,
  isDarkMode,
  toggleDarkMode,
  onOpenVideoManual
}) => {
  // Current active role on the landing page
  const [activeRole, setActiveRole] = useState<'aprendiz' | 'instructor'>('aprendiz');

  // Apprentice identification form state - starts completely clean as requested
  const [docType, setDocType] = useState<'CC' | 'TI' | 'CE'>('CC');
  const [docNumber, setDocNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [fichaNumber, setFichaNumber] = useState<string>('');
  const [programName, setProgramName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [regionalName, setRegionalName] = useState<string>('');
  const [centroName, setCentroName] = useState<string>('');

  // Save feedback state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isNewApprenticeMode, setIsNewApprenticeMode] = useState<boolean>(false);

  // Search term for quick selector
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showApprenticePicker, setShowApprenticePicker] = useState<boolean>(false);

  // Instructor access panel state with generic credentials
  const [isInstructorPanelActive, setIsInstructorPanelActive] = useState<boolean>(false);
  const [instructorUser, setInstructorUser] = useState<string>('');
  const [instructorPass, setInstructorPass] = useState<string>('');
  const [instructorError, setInstructorError] = useState<string | null>(null);

  const handleFillGenericInstructor = () => {
    setInstructorUser('instructor');
    setInstructorPass('sena2026');
    setInstructorError(null);
  };

  const handleInstructorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instructorUser.trim().toLowerCase() === 'instructor' && instructorPass === 'sena2026') {
      setIsInstructorPanelActive(false);
      onEnterAsInstructor();
    } else {
      setInstructorError('Credenciales incorrectas. Usa el usuario "instructor" y contraseña "sena2026".');
    }
  };

  // Clear all form fields to start from scratch
  const handleClearForm = () => {
    setDocNumber('');
    setFullName('');
    setFichaNumber('');
    setProgramName('');
    setEmailAddress('');
    setRegionalName('');
    setCentroName('');
    setIsNewApprenticeMode(true);
  };

  // Match existing apprentice by document in real-time
  const matchedApprentice = apprentices.find(a =>
    a.document.replace(/\./g, '').trim() === docNumber.replace(/\./g, '').trim()
  );

  // Calculate matched or prospective progress
  const progressPercent = matchedApprentice
    ? Math.round(
        ((matchedApprentice.modulesCompleted.identity ? 1 : 0) +
          (matchedApprentice.modulesCompleted.regulations ? 1 : 0) +
          (matchedApprentice.modulesCompleted.stages ? 1 : 0) +
          (matchedApprentice.modulesCompleted.ethicsCase ? 1 : 0)) /
          4 *
          100
      )
    : 0;

  // Filtered apprentices for quick list
  const filteredApprentices = apprentices.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.document.includes(searchTerm) ||
    a.ficha.includes(searchTerm)
  );

  const completedCount = apprentices.filter(a => a.status === 'Completado').length;

  // Handle switching to a known apprentice
  const handleSelectKnownApprentice = (app: Apprentice) => {
    setIsNewApprenticeMode(false);
    onSelectApprentice(app.id);
    setDocNumber(app.document);
    setFullName(app.name);
    setFichaNumber(app.ficha);
    setProgramName(app.program);
    setEmailAddress(app.email);
    setRegionalName(app.regional);
    setCentroName(app.centro);
    setShowApprenticePicker(false);
  };

  // Handle switching to new apprentice mode with completely clean fields
  const handleResetForNewApprentice = () => {
    setIsNewApprenticeMode(true);
    setDocNumber('');
    setFullName('');
    setFichaNumber('');
    setProgramName('');
    setEmailAddress('');
    setRegionalName('');
    setCentroName('');
    setShowApprenticePicker(false);
  };

  // Step 3 & 4: Save Apprentice Profile and Enter Prototype
  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !docNumber.trim()) {
      alert('Por favor diligencie su Nombre Completo y Documento de Identidad.');
      return;
    }

    setIsSaving(true);
    setSaveMessage('Guardando perfil y cargando progreso...');

    // Small delay for tactile reassurance before transition
    setTimeout(() => {
      onSaveAndEnterApprentice({
        id: matchedApprentice?.id,
        name: fullName.trim(),
        document: docNumber.trim(),
        ficha: fichaNumber.trim() || '2824910',
        program: programName,
        email: emailAddress.trim() || `${fullName.toLowerCase().replace(/\s+/g, '')}@misena.edu.co`,
        regional: regionalName,
        centro: centroName
      });
      setIsSaving(false);
      setSaveMessage(null);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors font-sans">
      
      {/* Top Institutional Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark with Official SENA Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0">
              <SenaLogo className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                SENA Inducción
              </span>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                Portal de Acceso y Seguimiento Institucional
              </span>
            </div>
          </div>

          {/* Right Actions: Dark Mode & Institutional Badge */}
          <div className="flex items-center gap-3">
            {onOpenVideoManual && (
              <button
                type="button"
                onClick={onOpenVideoManual}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                title="Ver el video manual interactivo de la plataforma"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-200" />
                <span>Video Manual</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsInstructorPanelActive(prev => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isInstructorPanelActive
                  ? 'border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-900 text-white hover:bg-slate-800'
              }`}
              title="Alternar entre registro de aprendiz y panel de instructor"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">
                {isInstructorPanelActive ? 'Portal Aprendiz' : 'Panel Instructor'}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-3 shadow-2xs">
              <SenaLogo className="w-4 h-4" />
              <span>Servicio Nacional de Aprendizaje · República de Colombia</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
              Sistema Integrado de Inducción SENA
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Portal institucional de registro y seguimiento para aprendices. Diligencia tus datos de perfil e identificación para iniciar o continuar tu recorrido en la inducción virtual.
            </p>

            {/* Video Manual Hero CTA Button */}
            {onOpenVideoManual && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onOpenVideoManual}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-98"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 dark:bg-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current text-white" />
                  </div>
                  <span>Ver Video Manual de la Plataforma (HD)</span>
                </button>
              </div>
            )}



            {/* Quick stats unboxed metadata */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{apprentices.length} Aprendices Registrados</span>
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Instructora Encargada</span>
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{completedCount} Constancias Emitidas</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Apprentice Identification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        <div className="max-w-3xl mx-auto">
          {isInstructorPanelActive ? (
            /* Inline Instructor Authentication Panel */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-900 dark:border-emerald-600 ring-2 ring-slate-900/10 dark:ring-emerald-500/20 transition-all shadow-md p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900 dark:bg-emerald-600" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Panel de Autenticación Docente
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                      Acceso Rol Instructor
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsInstructorPanelActive(false)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>← Volver al Registro de Aprendiz</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Ingresa con el usuario y contraseña genéricos asignados para auditar el progreso de los aprendices, calificar cuestionarios y validar constancias de la instructora <span className="font-semibold text-slate-900 dark:text-slate-100">{designatedInstructor.name}</span> ({designatedInstructor.title}).
              </p>

              {/* Quick Fill Generic Credentials Action */}
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">¿Deseas autocompletar credenciales?</span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Rellena automáticamente con el usuario y contraseña genéricos del sistema</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillGenericInstructor}
                  className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  Rellenar Automático
                </button>
              </div>

              <form onSubmit={handleInstructorLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Usuario Genérico *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: instructor"
                    value={instructorUser}
                    onChange={(e) => setInstructorUser(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Usuario por defecto: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">instructor</code>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contraseña Genérica *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Ej: sena2026"
                    value={instructorPass}
                    onChange={(e) => setInstructorPass(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Contraseña por defecto: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">sena2026</code>
                  </p>
                </div>

                {instructorError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-medium">
                    {instructorError}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInstructorPanelActive(false)}
                    className="py-3 px-6 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Verificar e Ingresar al Panel de Supervisión</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Card 1: ROL DE APRENDIZ (Identificación, Datos de Interés, Progreso y Guardado) */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20 transition-all shadow-md p-6 sm:p-8 relative">
              
              {/* Top decorative accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600 rounded-t-2xl" />

            {/* Header of the Apprentice Section */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                      Paso 1: Rol Seleccionado
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Aprendiz
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                    Identificación y Datos del Aprendiz
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Limpiar todos los campos del formulario para iniciar desde cero"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar Campos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowApprenticePicker(!showApprenticePicker)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
                >
                  {showApprenticePicker ? 'Ocultar Cohorte' : `Ver Aprendices (${apprentices.length})`}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              Diligencia los datos de interés requeridos. Cada campo incluye pistas de ayuda para orientarte; al ingresar tu documento se detectará tu progreso de inducción acumulado.
            </p>

            {/* Quick Cohorte Picker Drawer */}
            {showApprenticePicker && (
              <div className="mb-6 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                  <span>Selecciona un aprendiz para cargar sus datos y progreso:</span>
                  <button
                    onClick={handleResetForNewApprentice}
                    className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Nuevo Aprendiz</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filtrar por nombre, documento o ficha..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                  {filteredApprentices.map(app => (
                    <button
                      key={app.id}
                      onClick={() => handleSelectKnownApprentice(app)}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        docNumber === app.document
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-white dark:bg-slate-900 hover:bg-emerald-100/50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="truncate">
                        <span className="block truncate">{app.name}</span>
                        <span className={`text-[10px] ${docNumber === app.document ? 'text-emerald-100' : 'text-slate-500'}`}>
                          Ficha {app.ficha} · {app.program}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono shrink-0 ml-2">
                        CC {app.document}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Identification & Data Form */}
            <form onSubmit={handleSaveAndProceed} className="space-y-4">
              
              {/* Document and Document Type */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Selecciona el tipo según tu documento legal.
                  </p>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ej: 1036789412 (sin puntos ni espacios)"
                      value={docNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDocNumber(val);
                        // Auto-fill if matching known apprentice
                        const found = apprentices.find(a => a.document.replace(/\./g, '') === val.replace(/\./g, ''));
                        if (found) {
                          setFullName(found.name);
                          setFichaNumber(found.ficha);
                          setProgramName(found.program);
                          setEmailAddress(found.email);
                          setRegionalName(found.regional);
                          setCentroName(found.centro);
                          setIsNewApprenticeMode(false);
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    {matchedApprentice && (
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        Identificado
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Si ya estás registrado en el sistema, detectará tu progreso de inmediato.
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carlos Andrés Gómez Mejía"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Ingresa tus nombres y apellidos tal como aparecen en tu documento oficial.
                </p>
              </div>

              {/* Ficha & Program */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Ficha *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 2824910"
                    value={fichaNumber}
                    onChange={(e) => setFichaNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Código de 7 u 8 dígitos de tu grupo en SOFIA Plus / Zajuna.
                  </p>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Programa de Formación *
                  </label>
                  <select
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Selecciona tu carrera técnica o tecnológica --</option>
                    <option value="Tecnólogo en Análisis y Desarrollo de Software (ADSO)">
                      Tecnólogo en Análisis y Desarrollo de Software (ADSO)
                    </option>
                    <option value="Tecnólogo en Gestión Contable y Financiera">
                      Tecnólogo en Gestión Contable y Financiera
                    </option>
                    <option value="Tecnólogo en Animación Digital y 3D">
                      Tecnólogo en Animación Digital y 3D
                    </option>
                    <option value="Técnico en Sistemas e Infraestructura TI">
                      Técnico en Sistemas e Infraestructura TI
                    </option>
                    <option value="Tecnólogo en Gestión de Redes de Datos">
                      Tecnólogo en Gestión de Redes de Datos
                    </option>
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Elige la titulación a la que fuiste admitido en el SENA.
                  </p>
                </div>
              </div>

              {/* Email & Regional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Institucional o Correo Personal *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Ej: usuario@misena.edu.co o nombre@gmail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">💡 Pista:</span> Puedes ingresar tu correo @misena.edu.co o tu correo personal (Gmail, Outlook, etc.).
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                    <span>Regional y Centro de Formación</span>
                    <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">Ej: Distrito Capital, Antioquia, Valle</span>
                  </label>
                  <input
                    type="text"
                    list="regionales-sena-list"
                    placeholder="Ej: Regional Distrito Capital - Centro de Electricidad y Telecomunicaciones"
                    value={regionalName}
                    onChange={(e) => setRegionalName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                  <datalist id="regionales-sena-list">
                    <option value="Regional Antioquia - Centro de Formación en Tecnologías de la Información" />
                    <option value="Regional Distrito Capital - Centro de Electricidad, Electrónica y Telecomunicaciones" />
                    <option value="Regional Valle - Centro de Diseño Tecnológico Industrial" />
                    <option value="Regional Santander - Centro Industrial del Diseño y la Manufactura" />
                    <option value="Regional Atlántico - Centro Colombo Alemán" />
                    <option value="Regional Cundinamarca - Centro de Desarrollo Agroempresarial" />
                    <option value="Regional Caldas - Centro de Procesos Industriales y Construcción" />
                  </datalist>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">💡 Pista:</span>
                    <span>Indica tu regional SENA (ej: Antioquia, D.C., Valle) y el centro de formación adscrito a tu ficha.</span>
                  </p>
                </div>
              </div>

              {/* Visualizador de Progreso Identificado del Aprendiz */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Progreso de Inducción Identificado:
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {progressPercent}% Completado
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Progress Modules Badge Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className={`p-2 rounded-lg border text-center ${
                    matchedApprentice?.modulesCompleted.identity
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}>
                    <span>Símbolos</span>
                    <span className="block text-[10px] font-normal">{matchedApprentice?.modulesCompleted.identity ? 'Aprobado' : 'Pendiente'}</span>
                  </div>

                  <div className={`p-2 rounded-lg border text-center ${
                    matchedApprentice?.modulesCompleted.regulations
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}>
                    <span>Reglamento</span>
                    <span className="block text-[10px] font-normal">{matchedApprentice?.modulesCompleted.regulations ? 'Aprobado' : 'Pendiente'}</span>
                  </div>

                  <div className={`p-2 rounded-lg border text-center ${
                    matchedApprentice?.modulesCompleted.stages
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}>
                    <span>Etapas</span>
                    <span className="block text-[10px] font-normal">{matchedApprentice?.modulesCompleted.stages ? 'Aprobado' : 'Pendiente'}</span>
                  </div>

                  <div className={`p-2 rounded-lg border text-center ${
                    matchedApprentice?.modulesCompleted.ethicsCase
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}>
                    <span>Comité Ético</span>
                    <span className="block text-[10px] font-normal">{matchedApprentice?.modulesCompleted.ethicsCase ? 'Aprobado' : 'Pendiente'}</span>
                  </div>
                </div>

                {matchedApprentice && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-right">
                    Última actividad registrada: <span className="font-semibold text-slate-700 dark:text-slate-300">{matchedApprentice.lastActive}</span>
                  </p>
                )}
              </div>

              {/* Step 3 & 4 Action: Guardar Perfil y Continuar al Prototipo */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group disabled:opacity-75"
                >
                  {isSaving ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>{saveMessage || 'Guardando perfil del aprendiz...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-emerald-200" />
                      <span>Guardar Perfil y Continuar al Prototipo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                  Al pulsar el botón se guardan tus datos y progreso para continuar en el entorno de inducción interactiva.
                </p>
              </div>

            </form>

          </div>
          )}

        </div>

      </section>

      {/* 4 Pillars of SENA Induction Section */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 sm:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              Contenido Pedagógico
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              Pilares de la Inducción Institucional
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Una experiencia formativa completa para comprender la identidad, normativa y el compromiso ético con Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                01. Identidad & Símbolos
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Escudo de los 3 sectores, bandera de la paz, logosímbolo del caminante y reproductor del himno oficial con sintetizador.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                02. Reglamento del Aprendiz
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                42 artículos clave del Acuerdo 007 de 2012: deberes, derechos, prohibiciones, faltas leves, graves y gravísimas.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                03. Cuestionarios Evaluativos
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Evaluaciones dinámicas con retroalimentación inmediata, temporizadores y banco de preguntas sobre las etapas formativas.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                04. Simulador Ético & Auditoría
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Toma de decisiones ante el Comité de Evaluación y seguimiento transparente por parte de la instructora asignada.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Quiet Institutional Footer */}
      <footer className="mt-auto bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5 shrink-0" />
            <span className="font-bold text-slate-900 dark:text-slate-100">Servicio Nacional de Aprendizaje - SENA</span>
            <span aria-hidden="true">·</span>
            <span>Ministerio del Trabajo · Colombia</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Acuerdo 007 de 2012</span>
            <span aria-hidden="true">·</span>
            <span>Manual de Imagen Institucional</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Formación Profesional Integral</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
