import React from 'react';
import { Apprentice } from '../types';
import { X, Printer, Award, Shield, CheckCircle2, QrCode } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface InductionCertificateModalProps {
  apprentice: Apprentice;
  isOpen: boolean;
  onClose: () => void;
}

export const InductionCertificateModal: React.FC<InductionCertificateModalProps> = ({
  apprentice,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = apprentice.certificateIssuedAt || '10 de Noviembre de 2026';
  const verificationCode = `SENA-IND-${apprentice.ficha}-${apprentice.document.replace(/\./g, '')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Constancia Institucional de Inducción</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 md:p-12 bg-white relative print:p-8">
          {/* Certificate Decorative Border */}
          <div className="border-4 border-double border-emerald-800 rounded-xl p-8 md:p-10 relative bg-linear-to-b from-emerald-50/20 via-white to-emerald-50/30">
            
            {/* Watermark Logo in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <SenaLogo className="w-96 h-96" />
            </div>

            {/* Header: Institutional Logos & Authority */}
            <div className="flex items-center justify-between pb-6 border-b border-emerald-200 text-center md:text-left relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-emerald-300 flex items-center justify-center shadow-xs shrink-0">
                  <SenaLogo className="w-11 h-11" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-950 tracking-wide uppercase">
                    Servicio Nacional de Aprendizaje - SENA
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-800">
                    Ministerio del Trabajo · República de Colombia
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[10px] font-mono text-slate-400 block">
                  CÓDIGO DE REGISTRO
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {verificationCode}
                </span>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center my-8 relative z-10">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                La Subdirección de Centro y la Coordinación Misional certifican que:
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight my-3 font-serif">
                {apprentice.name}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Identificado(a) con Cédula de Ciudadanía No. <span className="font-bold text-slate-900">{apprentice.document}</span>
              </p>
            </div>

            {/* Certificate Body Text */}
            <div className="text-center max-w-xl mx-auto my-6 text-xs text-slate-700 leading-relaxed relative z-10">
              <p>
                Ha cursado y aprobado satisfactoriamente todos los módulos del proceso de
                <span className="font-bold text-emerald-900"> Inducción a la Formación Profesional Integral</span>,
                demostrando cabal conocimiento de la identidad institucional, los símbolos de la entidad,
                los valores éticos, y las disposiciones del <span className="font-bold text-emerald-900">Reglamento del Aprendiz (Acuerdo 007 de 2012)</span>.
              </p>

              <div className="mt-4 p-3 bg-white/80 border border-emerald-100 rounded-lg inline-block text-[11px] text-slate-600">
                <span className="font-bold text-slate-900">Programa: </span>{apprentice.program}
                <span className="mx-2">·</span>
                <span className="font-bold text-slate-900">Ficha: </span>{apprentice.ficha}
              </div>
            </div>

            {/* Signatures & Security Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-emerald-200 mt-8 items-end relative z-10">
              {/* Signature 1 */}
              <div className="text-center">
                <div className="w-32 h-0.5 bg-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Dra. Claudia Patricia Silva</span>
                <span className="text-[10px] text-slate-500">Subdirectora de Centro</span>
                <span className="text-[9px] text-emerald-700 block mt-0.5">{apprentice.centro}</span>
              </div>

              {/* Seal / QR Verification */}
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1.5 shadow-xs flex items-center justify-center mb-1.5">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <span className="text-[9px] font-mono text-slate-400">Verificable en SOFIA Plus</span>
                <span className="text-[9px] text-slate-500 font-medium">Expedido el {currentDate}</span>
              </div>

              {/* Signature 2 */}
              <div className="text-center">
                <div className="w-32 h-0.5 bg-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Ing. Carlos Mario Valencia</span>
                <span className="text-[10px] text-slate-500">Coordinador Académico</span>
                <span className="text-[9px] text-emerald-700 block mt-0.5">{apprentice.regional}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Footer (Hidden on print) */}
        <div className="no-print px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Documento oficial con validez académica institucional</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
