import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Clock, Film, RefreshCw, Volume2, VolumeX, Maximize } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  time: string;
  seconds: number;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { time: '0:00', seconds: 0, title: 'Presentación del Sistema Integrado' },
  { time: '0:10', seconds: 10, title: 'Ecosistema Digital de Inducción' },
  { time: '0:24', seconds: 24, title: 'Delimitación de Roles (Aprendiz / Instructor)' },
  { time: '0:38', seconds: 38, title: 'Registro Inteligente y Datos' },
  { time: '0:48', seconds: 48, title: 'Panel de Supervisión Docente' },
  { time: '1:01', seconds: 61, title: 'Ruta de 6 Módulos' },
  { time: '1:12', seconds: 72, title: 'Módulo 1: Símbolos e Identidad' },
  { time: '1:23', seconds: 83, title: 'Módulo 2: Reglamento del Aprendiz' },
  { time: '1:36', seconds: 96, title: 'Módulo 3: Etapas y Alternativas Productivas' },
  { time: '1:47', seconds: 107, title: 'Módulos 4 y 5: Evaluaciones y Simulador Ético' },
  { time: '2:01', seconds: 121, title: 'Módulo 6: Constancia Oficial' },
  { time: '2:13', seconds: 133, title: 'Accesibilidad y Modo Oscuro' },
  { time: '2:26', seconds: 146, title: 'Motor Tecnológico y Cierre' }
];

export const VideoManualModal: React.FC<VideoManualModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number>(0);

  const videoSources = [
    '/assets/video_manual.mp4',
    '/video_manual.mp4',
    '/assets/aistudio/2026__5_17_p.m._f129c05f.mp4'
  ];

  // Try auto-playing video when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasError(false);
      setIsPlaying(false);

      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.log('Autoplay prevented by browser, waiting for user click:', err);
            setIsPlaying(false);
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isOpen, activeSourceIndex]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch((e) => {
        console.error('Playback error:', e);
        // Try muted play if blocked
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
        }
      });
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleJumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {});
    }
  };

  const handleVideoError = () => {
    console.warn(`Video source failed: ${videoSources[activeSourceIndex]}`);
    if (activeSourceIndex < videoSources.length - 1) {
      setActiveSourceIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Videotutorial Institucional SENA
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  HD 1080p
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline">
                  Duración: 02:58 min
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-100 mt-0.5 flex items-center gap-2">
                <span>Manual Interactivo de la Plataforma</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex justify-center items-center overflow-hidden shrink-0 group">
          <video
            ref={videoRef}
            src={videoSources[activeSourceIndex]}
            controls
            preload="auto"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={handleVideoError}
            className="w-full max-h-[52vh] sm:max-h-[58vh] object-contain bg-black shadow-inner"
          >
            <source src="/assets/video_manual.mp4" type="video/mp4" />
            <source src="/video_manual.mp4" type="video/mp4" />
            <source src="/assets/aistudio/2026__5_17_p.m._f129c05f.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>

          {/* Large Center Play Overlay (Visible when paused or stopped) */}
          {!isPlaying && !hasError && (
            <div 
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-black/40 hover:bg-black/25 flex flex-col items-center justify-center cursor-pointer transition-all z-10"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 border-4 border-white/20">
                <Play className="w-10 h-10 fill-current ml-1 text-white" />
              </div>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-slate-900/90 text-slate-100 text-xs font-bold border border-slate-700 shadow-lg">
                Haz clic para reproducir el video
              </span>
            </div>
          )}

          {/* Quick Floating Action Overlay Controls */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-colors shadow-md cursor-pointer"
              title={isMuted ? "Activar Sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-colors shadow-md cursor-pointer"
              title="Pantalla Completa"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          {/* Error Banner state */}
          {hasError && (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mb-3">
                <Film className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">No se pudo cargar la vista previa del video</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Asegúrate de permitir el acceso al reproductor en tu navegador o haz clic en reintentar.
              </p>
              <button
                onClick={() => {
                  setHasError(false);
                  setActiveSourceIndex(0);
                  if (videoRef.current) {
                    videoRef.current.load();
                    videoRef.current.play().catch(() => {});
                  }
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reintentar Reproducción</span>
              </button>
            </div>
          )}
        </div>

        {/* Chapters & Timestamps Section */}
        <div className="p-4 sm:p-5 bg-slate-900 overflow-y-auto flex-1 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Navegación por Marcas de Tiempo (Capítulos):</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Haz clic en cualquier punto para saltar directamente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpToTimestamp(ch.seconds)}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/70 hover:bg-emerald-950/70 border border-slate-700/60 hover:border-emerald-600 text-left transition-all group cursor-pointer"
              >
                <div className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-mono text-[11px] font-bold shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {ch.time}
                </div>
                <span className="text-xs text-slate-200 group-hover:text-white truncate font-medium">
                  {ch.title}
                </span>
                <Play className="w-3 h-3 text-slate-500 ml-auto shrink-0 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <SenaLogo className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-slate-300">Servicio Nacional de Aprendizaje SENA</span>
            <span aria-hidden="true">·</span>
            <span>Sistema Integrado de Inducción</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

