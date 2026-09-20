/**
 * Technical Attribute Comparison Matrix
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { Check, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { TechnicalComparisonRow } from '../../types/MaterialMatchTypes';
import { MaterialRecord } from '../../types/MaterialMasterTypes';

interface TechnicalAttributeMatrixProps {
  comparisons: TechnicalComparisonRow[];
  sourceMaterials: MaterialRecord[];
}

export const TechnicalAttributeMatrix: React.FC<TechnicalAttributeMatrixProps> = ({
  comparisons,
  sourceMaterials,
}) => {
  const cpseList = Array.from(new Set(sourceMaterials.map((s) => s.cpse)));

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-800 flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5 text-sky-600" />
            Technical Attribute Equivalence Matrix
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Side-by-side comparison of discrete technical parameters extracted from source strings.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" /> Match
          </span>
          <span className="flex items-center gap-1 text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            Normalized
          </span>
          <span className="flex items-center gap-1 text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" /> Conflict
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-mono text-slate-600 uppercase">
              <th className="py-2.5 px-4 font-bold">Technical Attribute</th>
              {cpseList.map((cpse) => (
                <th key={cpse} className="py-2.5 px-4 font-bold">
                  {cpse} Source
                </th>
              ))}
              <th className="py-2.5 px-4 font-bold bg-sky-50/50 text-sky-950">
                Normalized National Standard
              </th>
              <th className="py-2.5 px-4 font-bold text-center">Status</th>
              <th className="py-2.5 px-4 font-bold">Engineering Verification Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisons.map((row, idx) => {
              const isConflict = row.matchStatus === 'CONFLICT';
              const isNormalized = row.matchStatus === 'NORMALIZED_MATCH';
              const isExact = row.matchStatus === 'MATCH';

              return (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isConflict ? 'bg-rose-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {row.attributeName}
                  </td>

                  {cpseList.map((cpse) => (
                    <td key={cpse} className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {row.sourceValues[cpse] || (
                        <span className="text-slate-400 italic">Not Specified</span>
                      )}
                    </td>
                  ))}

                  <td className="py-3 px-4 font-mono font-bold text-sky-900 bg-sky-50/30 whitespace-nowrap">
                    {row.normalizedValue}
                  </td>

                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {isConflict ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold font-mono border border-rose-300">
                        <AlertTriangle className="w-3 h-3" /> Conflict
                      </span>
                    ) : isNormalized ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold font-mono border border-sky-300">
                        <Check className="w-3 h-3" /> Normalized
                      </span>
                    ) : isExact ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono border border-emerald-300">
                        <Check className="w-3 h-3" /> Exact
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                        N/A
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-slate-500 text-[11px] leading-snug">
                    {row.notes || 'Parameter matches standard taxonomy representation.'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
