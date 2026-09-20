/**
 * Harmonization Convergence Visualizer
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Visually displays multiple disparate CPSE material records converging
 * into one Common National Material Code (CNMC).
 */

import React from 'react';
import { GitMerge, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { MaterialRecord } from '../../types/MaterialMasterTypes';

interface HarmonizationConvergenceVisualProps {
  sourceMaterials: MaterialRecord[];
  nationalCode: string;
  relationshipType?: string;
  isConflict?: boolean;
}

export const HarmonizationConvergenceVisual: React.FC<HarmonizationConvergenceVisualProps> = ({
  sourceMaterials,
  nationalCode,
  relationshipType: _relationshipType,
  isConflict = false,
}) => {
  return (
    <div className="bg-slate-950 text-white rounded-xl p-5 border border-slate-800 relative overflow-hidden">
      {/* Background blueprint subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <GitMerge className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold tracking-tight text-white uppercase font-mono">
                Multi-CPSE Convergence Architecture
              </h4>
              <p className="text-[11px] text-slate-400">
                AI extraction & normalization funneling diverse records into a unified national standard
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {sourceMaterials.length} Source Records Converging
          </span>
        </div>

        {/* Convergence Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mt-5">
          {/* Left: Disparate CPSE Source Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Source Material Masters (Proprietary CPSE Systems)
            </span>
            {sourceMaterials.map((mat) => (
              <div
                key={mat.id}
                className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-black border ${
                      mat.cpse === 'ONGC'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                        : mat.cpse === 'IOCL'
                        ? 'bg-orange-950/60 text-orange-300 border-orange-600/40'
                        : 'bg-blue-950/60 text-blue-300 border-blue-600/40'
                    }`}
                  >
                    {mat.cpse}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-sky-300 block text-xs">
                      {mat.sourceMaterialCode}
                    </span>
                    <span className="text-[11px] text-slate-300 line-clamp-1">
                      {mat.originalDescription}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  UOM: {mat.uom}
                </span>
              </div>
            ))}
          </div>

          {/* Middle: AI Normalization Engine Node */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-2">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-sky-500/50 flex items-center justify-center shadow-lg relative group">
              <Cpu className="w-5 h-5 text-sky-400 animate-pulse" />
              <div className="absolute -bottom-6 w-max text-[10px] font-mono text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                NLP Normalization
              </div>
            </div>
            <div className="mt-7 flex items-center gap-1 text-slate-500 text-xs font-mono">
              <span>Funneling</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </div>
          </div>

          {/* Right: National Material Destination */}
          <div className="lg:col-span-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Common National Material Master (CNMC)
            </span>
            <div
              className={`p-4 rounded-xl border ${
                isConflict
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-100'
                  : 'bg-slate-900 border-emerald-500/50 shadow-lg text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wide font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {isConflict ? 'Flagged for Review' : 'Harmonized Target'}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isConflict ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {isConflict ? 'CONFLICT HOLD' : 'ONE NATION • ONE CODE'}
                </span>
              </div>

              <div className="mt-3">
                <div className="text-xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                  <span>{nationalCode}</span>
                  {!isConflict && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {isConflict
                    ? 'Automatic unification blocked. Divergent specifications preserved pending engineering sign-off.'
                    : 'Unified master reference code. Original CPSE codes remain fully indexed and mapped for ERP transactions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
