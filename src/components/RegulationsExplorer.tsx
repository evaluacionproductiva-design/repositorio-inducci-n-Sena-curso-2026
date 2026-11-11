import React, { useState } from 'react';
import { SENA_REGULATIONS } from '../data/senaData';
import { RegulationArticle } from '../types';
import { Search, BookOpen, Scale, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Tag } from 'lucide-react';

export const RegulationsExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>('art-7');

  const categories = [
    'Todos',
    'Derechos',
    'Deberes',
    'Prohibiciones',
    'Faltas y Sanciones',
    'Etapa Productiva',
    'Comité de Evaluación'
  ];

  const filteredArticles = SENA_REGULATIONS.filter((art) => {
    const matchesCategory = selectedCategory === 'Todos' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.fullText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Derechos':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Deberes':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'Prohibiciones':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'Faltas y Sanciones':
        return <Scale className="w-4 h-4 text-amber-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors">
      {/* Title & description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Marco Normativo Institucional
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Reglamento del Aprendiz SENA
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Acuerdo 007 de 2012: Conoce tus garantías, compromisos, el régimen disciplinario y las opciones de etapa productiva.
          </p>
        </div>

        {/* Search input */}
        <div className="relative min-w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por artículo, tema o palabra..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Categories interactive tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Count */}
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
        <span>Mostrando {filteredArticles.length} artículos normativos</span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      {/* Articles Accordion List */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No se encontraron artículos</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Intenta con otra palabra clave como "inasistencia", "derechos" o "comité".</p>
          </div>
        ) : (
          filteredArticles.map((art: RegulationArticle) => {
            const isExpanded = expandedArticleId === art.id;

            return (
              <div
                key={art.id}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 ring-2 ring-emerald-500/5 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Header item */}
                <button
                  onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0">
                      {getCategoryIcon(art.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-0.5 flex-wrap">
                        <span className="font-semibold text-emerald-800 dark:text-emerald-400">{art.articleNum}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.chapter}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600 dark:text-slate-300">{art.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded text */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <div className="mt-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
                        Texto Reglamentario Oficial:
                      </span>
                      {art.fullText}
                    </div>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>Palabras clave:</span>
                      {art.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-slate-700 dark:text-slate-300 font-medium">
                          #{tag}{tIdx < art.tags.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
