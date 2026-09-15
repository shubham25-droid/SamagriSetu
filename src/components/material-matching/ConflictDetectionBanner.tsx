/**
 * Hard Technical Conflict & Near-Duplicate Safety Banner
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { AlertOctagon, Lock } from 'lucide-react';
import { MaterialConflict } from '../../types/MaterialMatchTypes';

interface ConflictDetectionBannerProps {
  conflicts: MaterialConflict[];
}

export const ConflictDetectionBanner: React.FC<ConflictDetectionBannerProps> = ({ conflicts }) => {
  if (conflicts.length === 0) return null;

  return (
    <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 text-amber-950 shadow-sm animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-tight text-amber-950 uppercase font-mono flex items-center gap-2">
              Hard Technical Conflict Detected — Auto-Merge Strictly Blocked
            </h4>
            <p className="text-xs text-amber-800 font-medium">
              High text similarity detected, but critical engineering parameters are incompatible.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-200/80 text-amber-900 text-xs font-mono font-bold border border-amber-300 self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          Safety Lock Active
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {conflicts.map((conflict, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg bg-white/90 border border-amber-300 shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-rose-900 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                Conflict Attribute: {conflict.attribute}
              </span>
              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                Severity: {conflict.severity}
              </span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {conflict.description}
            </p>

            <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(conflict.conflictingValues).map(([code, val]) => (
                <div key={code}>
                  <span className="text-slate-500 block text-[10px]">{code}</span>
                  <span className="font-bold text-amber-950">{val}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-rose-800 font-semibold flex items-center gap-1.5 pt-1">
              <span>Risk Impact:</span>
              <span className="font-normal text-slate-700">{conflict.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
