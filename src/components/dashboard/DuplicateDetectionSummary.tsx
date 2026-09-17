/**
 * Duplicate & Classification Breakdown Summary
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { CopyCheck, ArrowRight } from 'lucide-react';
import { Badge } from '../shared/Badge';

interface DuplicateDetectionSummaryProps {
  onNavigateToMatching?: (filter?: string) => void;
}

export const DuplicateDetectionSummary: React.FC<DuplicateDetectionSummaryProps> = ({
  onNavigateToMatching,
}) => {
  const categories = [
    {
      type: 'SAME_MATERIAL',
      label: 'Same Material',
      count: 24,
      percentage: '35%',
      description: 'Identical form, fit, function, dimensions, and metallurgy across CPSEs (e.g. 2" CS CL150 Ball Valve).',
      color: 'bg-emerald-500',
      badge: 'SAME_MATERIAL',
    },
    {
      type: 'DUPLICATE',
      label: 'Duplicate',
      count: 18,
      percentage: '26%',
      description: 'Redundant internal codes within the same CPSE or equivalent identical procurement records.',
      color: 'bg-blue-500',
      badge: 'DUPLICATE',
    },
    {
      type: 'NEAR_DUPLICATE',
      label: 'Near-Duplicate',
      count: 12,
      percentage: '18%',
      description: 'Minor non-critical description variance or word order inversions (e.g., 180mm Pump Impeller).',
      color: 'bg-cyan-500',
      badge: 'NEAR_DUPLICATE',
    },
    {
      type: 'FUNCTIONALLY_EQUIVALENT',
      label: 'Functionally Equivalent',
      count: 9,
      percentage: '13%',
      description: 'Different OEM models/brands with identical process parameters (e.g. Rosemount vs Yokogawa Transmitters).',
      color: 'bg-purple-500',
      badge: 'FUNCTIONALLY_EQUIVALENT',
    },
    {
      type: 'REQUIRES_REVIEW',
      label: 'Hard Conflict / Requires Review',
      count: 6,
      percentage: '8%',
      description: 'Technical discrepancy detected (e.g., Class 150 vs Class 300; SS304 vs SS316). Auto-merge blocked.',
      color: 'bg-amber-500',
      badge: 'REQUIRES_REVIEW',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CopyCheck className="w-4 h-4 text-sky-600" />
            Harmonization & Match Classification Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of AI relationship classifications across the current candidate cluster pool.
          </p>
        </div>
        {onNavigateToMatching && (
          <button
            onClick={() => onNavigateToMatching()}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Review Candidates <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Categories List */}
      <div className="mt-4 space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.type}
            onClick={() => onNavigateToMatching && onNavigateToMatching(cat.type)}
            className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color} mt-1.5 shrink-0`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{cat.label}</span>
                  <Badge value={cat.badge} size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed max-w-xl">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 pl-5 md:pl-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
              <div className="text-right">
                <div className="text-sm font-black font-mono text-slate-900">{cat.count}</div>
                <div className="text-[10px] text-slate-400 font-mono">Records ({cat.percentage})</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
