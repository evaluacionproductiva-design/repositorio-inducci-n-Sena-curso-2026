import React, { useState } from 'react';
import { SENA_SYMBOLS } from '../data/senaData';
import { Shield, Flag, Info, Check, Sparkles } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const InteractiveSymbolsViewer: React.FC = () => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);

  const currentSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors">
      {/* Header section */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Identidad e Imagen Institucional
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Símbolos Oficiales del SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Explora en detalle los elementos heráldicos e históricos que representan la misión de formación técnica de Colombia.
            </p>
          </div>

          {/* Symbol Segmented Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => {
                setSelectedSymbolId('escudo');
                setActiveElementIndex(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedSymbolId === 'escudo'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Escudo</span>
            </button>
            <button
              onClick={() => {
                setSelectedSymbolId('bandera');
                setActiveElementIndex(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedSymbolId === 'bandera'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Bandera</span>
            </button>
            <button
              onClick={() => {
                setSelectedSymbolId('logosimbolo');
                setActiveElementIndex(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedSymbolId === 'logosimbolo'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <SenaLogo className="w-3.5 h-3.5" />
              <span>Logosímbolo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main interactive split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        
        {/* Left Visual Stage */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-slate-50 dark:bg-slate-950/60 flex flex-col justify-between items-center text-center">
          
          <div className="w-full flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-medium text-slate-700 dark:text-slate-300">{currentSymbol.name}</span>
            <span>Haz clic en los componentes a la derecha</span>
          </div>

          {/* Symbol Display Box */}
          <div className="relative w-full max-w-sm aspect-square bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 flex flex-col items-center justify-center overflow-hidden my-auto">
            {selectedSymbolId === 'escudo' && (
              <div className="relative flex flex-col items-center">
                <img
                  src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                  alt="Escudo Oficial del SENA"
                  className="w-48 h-48 object-contain drop-shadow-md transition-transform hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/src/assets/images/sena_symbols_banner_1794325244590.jpg";
                  }}
                />
                <span className="mt-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Heráldica de los Tres Sectores Económicos
                </span>
              </div>
            )}

            {selectedSymbolId === 'bandera' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div className="w-full h-40 bg-white dark:bg-slate-100 border-2 border-slate-300 shadow-md rounded-md flex items-center justify-center relative overflow-hidden">
                  {/* Flagpole strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-amber-700/60 border-r border-amber-900/30" />
                  {/* Center Shield representation */}
                  <div className="w-20 h-20 flex items-center justify-center p-1">
                    <img
                      src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                      alt="Escudo Oficial en Bandera"
                      className="w-16 h-16 object-contain drop-shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Proporción oficial 2:3 sobre fondo blanco</span>
                </div>
              </div>
            )}

            {selectedSymbolId === 'logosimbolo' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                {/* Official Vector Logosymbol of SENA */}
                <div className="w-44 h-44 flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-800/80 shadow-xs border border-slate-100 dark:border-slate-800">
                  <SenaLogo className="w-36 h-36" alt="Logosímbolo Oficial SENA - El Caminante" />
                </div>
                <span className="mt-3 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  "El Caminante" - Sendero de Formación y Superación
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-4">
            {currentSymbol.shortDesc}
          </p>
        </div>

        {/* Right Interactive Anatomy Breakdown */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Desglose y Significado de Elementos
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {currentSymbol.elements.length} componentes clave
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              {currentSymbol.fullMeaning}
            </p>

            {/* Elements Interactive List */}
            <div className="space-y-3">
              {currentSymbol.elements.map((elem, idx) => {
                const isActive = activeElementIndex === idx;
                return (
                  <button
                    key={elem.name}
                    onClick={() => setActiveElementIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {elem.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {elem.significance}
                          </p>
                        </div>
                      </div>

                      {isActive && (
                        <div className="shrink-0 text-emerald-600 dark:text-emerald-400">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick didactic takeaway */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Para recordar en el quiz: </span>
              {selectedSymbolId === 'escudo' && 'El escudo reúne los 3 sectores de la economía colombiana: Primario (Café), Secundario (Piñón) y Terciario (Caduceo).'}
              {selectedSymbolId === 'bandera' && 'El fondo blanco simboliza la paz y convivencia; en el centro va el escudo del SENA.'}
              {selectedSymbolId === 'logosimbolo' && 'El logosímbolo sintetiza al ser humano libre caminando erguido hacia el porvenir a través de la educación técnica.'}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
