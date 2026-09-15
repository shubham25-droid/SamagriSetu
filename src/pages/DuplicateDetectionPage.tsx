/**
 * Duplicate & Near-Duplicate Detection Hub
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { CopyCheck, Search, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { MaterialMatchingService } from '../services/MaterialMatchingService';
import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import { Badge } from '../components/shared/Badge';

interface DuplicateDetectionPageProps {
  onSelectCandidate: (candidate: MaterialMatchCandidate) => void;
  onNavigateToPrev?: () => void;
  onNavigateToNext?: () => void;
  activeCpse?: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  isCompleted?: boolean;
}

export const DuplicateDetectionPage: React.FC<DuplicateDetectionPageProps> = ({
  onSelectCandidate,
  onNavigateToPrev,
  onNavigateToNext,
  activeCpse = 'ONGC',
  isCompleted,
}) => {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const candidates = MaterialMatchingService.getCandidates();

  const filtered = candidates.filter((c) => {
    if (selectedType !== 'ALL' && c.relationshipType !== selectedType) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.recommendedNationalCode.toLowerCase().includes(q) ||
        c.sourceMaterials.some((s) => s.sourceMaterialCode.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const sortedCandidates = [...filtered].sort((a, b) => {
    if (activeCpse && activeCpse !== 'ALL') {
      const aHas = a.sourceMaterials.some((s) => s.cpse === activeCpse);
      const bHas = b.sourceMaterials.some((s) => s.cpse === activeCpse);
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                STEP 3 COMPLETED • DUPLICATES EVALUATED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-[#0B192C] text-sky-200 border border-sky-800 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                STEP 3 OF 5 • IN PROGRESS
              </span>
            )}
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CopyCheck className="w-5 h-5 text-sky-700" />
              Internal Plant Duplicates & Near-Duplicates Hub
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Identifies internal duplicates, 5mm vs 6mm thickness variations, and functional equivalents within plant catalogs before federation.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-500 font-sans font-semibold">Active Plant Context:</span>
            <Badge value={activeCpse} />
            <span className="text-[11px] font-bold text-slate-800 font-mono">
              {activeCpse === 'ALL' ? 'Quad-CPSE Multi-Enterprise Scope' : `${activeCpse} Plant Catalog Active`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Step 2</span>
            </button>
          )}

          {onNavigateToNext && (
            <button
              onClick={onNavigateToNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Next: Sister CPSE Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search duplicates by title or code..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B192C] w-64"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {[
              { id: 'ALL', label: 'All Classifications' },
              { id: 'SAME_MATERIAL', label: 'Same Material' },
              { id: 'DUPLICATE', label: 'Duplicate' },
              { id: 'NEAR_DUPLICATE', label: 'Near-Duplicate' },
              { id: 'FUNCTIONALLY_EQUIVALENT', label: 'Functionally Equivalent' },
              { id: 'REQUIRES_REVIEW', label: 'Requires Review' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-2.5 py-1 rounded-xs text-xs font-semibold transition-colors ${
                  selectedType === tab.id
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
                <th className="py-2.5 px-3 font-bold">Target National Code</th>
                <th className="py-2.5 px-3 font-bold">Material Title & Normalized Description</th>
                <th className="py-2.5 px-3 font-bold">Classification</th>
                <th className="py-2.5 px-3 font-bold">Participating CPSE Records</th>
                <th className="py-2.5 px-3 font-bold">Confidence</th>
                <th className="py-2.5 px-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedCandidates.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer"
                  onClick={() => onSelectCandidate(c)}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0B192C] whitespace-nowrap">
                    {c.recommendedNationalCode}
                  </td>

                  <td className="py-2.5 px-3 max-w-sm">
                    <div className="font-bold text-slate-900">{c.title}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1 font-mono">
                      {c.recommendedDescription}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <Badge value={c.relationshipType} size="sm" />
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {c.sourceMaterials.map((s) => (
                        <span
                          key={s.id}
                          className="px-1.5 py-0.5 rounded-xs bg-slate-100 border border-slate-300 font-mono text-[10px] text-slate-800"
                        >
                          <strong className="text-slate-900">{s.cpse}:</strong> {s.sourceMaterialCode}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {(c.confidence * 100).toFixed(0)}%
                  </td>

                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(c);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors"
                    >
                      Inspect Attributes <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="bg-white border border-slate-300 p-3.5 rounded-sm shadow-2xs flex items-center justify-between">
        <div>
          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Step 2: Normalization</span>
            </button>
          )}
        </div>

        <div>
          {onNavigateToNext && (
            <button
              onClick={onNavigateToNext}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Proceed to Step 4: Sister CPSE Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
