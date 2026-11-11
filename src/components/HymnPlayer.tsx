import React, { useState, useEffect } from 'react';
import { SENA_HYMN } from '../data/senaData';
import { anthemSynth } from '../utils/audioSynth';
import { Play, Square, Music, Volume2, Sparkles, BookOpen } from 'lucide-react';

export const HymnPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);
  const [selectedDisplayVerse, setSelectedDisplayVerse] = useState<number>(0);

  useEffect(() => {
    return () => {
      anthemSynth.stop();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      anthemSynth.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      anthemSynth.play(
        (_noteIdx, verseIdx) => {
          // Map internal synthesizer verse to display verse index
          if (verseIdx === 1) {
            setActiveVerseIndex(0); // Coro
            setSelectedDisplayVerse(0);
          } else if (verseIdx === 2) {
            setActiveVerseIndex(1); // Estrofa I
            setSelectedDisplayVerse(1);
          }
        },
        () => {
          setIsPlaying(false);
        }
      );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Music className="w-3.5 h-3.5" />
            <span>Himno Oficial del SENA</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            "Estudiantes del SENA Adelante"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Letra: {SENA_HYMN.author} · Música: {SENA_HYMN.composer}
          </p>
        </div>

        {/* Audio Control Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Detener Melodía</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Escuchar Melodía Institucional</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isPlaying && (
        <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 animate-pulse text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">Reproduciendo marcha del himno con sintetizador de audio web...</span>
          </div>
          <span className="text-[11px] font-mono">En vivo</span>
        </div>
      )}

      {/* Verses Explorer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left verse selector */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Estrofas del Himno
          </span>
          {SENA_HYMN.verses.map((verse, idx) => {
            const isCurrent = selectedDisplayVerse === idx;
            const isSinging = isPlaying && activeVerseIndex === idx;

            return (
              <button
                key={verse.title}
                onClick={() => setSelectedDisplayVerse(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{verse.title}</span>
                  {isSinging && (
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full animate-pulse">
                      Sonando
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  "{verse.lines[0]}"
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Lyric Karaoke Display */}
        <div className="md:col-span-8 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 flex flex-col justify-center text-center">
          <div className="max-w-md mx-auto">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3 block">
              {SENA_HYMN.verses[selectedDisplayVerse].title}
            </span>

            <div className="space-y-3">
              {SENA_HYMN.verses[selectedDisplayVerse].lines.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className={`text-base md:text-lg font-medium transition-colors ${
                    isPlaying && activeVerseIndex === selectedDisplayVerse
                      ? 'text-emerald-900 dark:text-emerald-300 font-bold scale-[1.02]'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Se entona con orgullo y respeto en actos cívicos y graduaciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
