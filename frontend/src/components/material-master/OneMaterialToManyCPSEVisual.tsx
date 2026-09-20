/**
 * One Material -> Many CPSE Records Visualizer
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Signature UI element demonstrating 'One Nation - One Material Code'
 * with multi-CPSE traceability branching downward.
 */

import React from 'react';
import { Network, CheckCircle2 } from 'lucide-react';
import { NationalMaterial } from '../../types/MaterialMasterTypes';

interface OneMaterialToManyCPSEVisualProps {
  material: NationalMaterial;
}

export const OneMaterialToManyCPSEVisual: React.FC<OneMaterialToManyCPSEVisualProps> = ({
  material,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
      {/* Subtle blueprint grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Network className="w-4 h-4" />
          One Nation • One Material Code Traceability Tree
        </div>

        {/* Top Node: Approved National Material Code */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-sky-400/60 shadow-xl max-w-lg w-full">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-700/60 pb-2 mb-2">
            <span className="text-sky-300 font-bold uppercase">National Master Entity</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
              {material.approvalStatus}
            </span>
          </div>

          <div className="text-2xl font-black font-mono text-white tracking-tight">
            {material.nationalCode}
          </div>
          <div className="text-xs font-medium text-slate-200 mt-1 line-clamp-2">
            {material.standardDescription}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Category: {material.category} → {material.subcategory}
          </div>
        </div>

        {/* Central Vertical Connector Line */}
        <div className="w-0.5 h-8 bg-sky-400/60 my-0 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-xs" />
        </div>

        {/* Horizontal Distributor Line for multiple CPSEs */}
        <div className="w-4/5 max-w-2xl h-0.5 bg-sky-400/60 relative mb-4">
          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-sky-400" />
          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-sky-400" />
        </div>

        {/* Bottom Branch Nodes: CPSE Records */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {material.mappedSourceRecords.map((src, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors text-left flex flex-col justify-between relative shadow-md"
            >
              {/* Connector line dot */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-sky-400/60 hidden md:block" />

              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-black border ${
                      src.cpse === 'ONGC'
                        ? 'bg-amber-950/70 text-amber-300 border-amber-600/40'
                        : src.cpse === 'IOCL'
                        ? 'bg-orange-950/70 text-orange-300 border-orange-600/40'
                        : 'bg-blue-950/70 text-blue-300 border-blue-600/40'
                    }`}
                  >
                    {src.cpse}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {src.erpSystemOrigin}
                  </span>
                </div>

                <div className="mt-2 text-sm font-mono font-bold text-sky-300">
                  {src.sourceCode}
                </div>

                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  "{src.originalDescription}"
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>UOM: {src.uom}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Bi-directional Link
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
