/**
 * Pending Review Queue Table & Filter Component
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  Search,
  Printer,
} from 'lucide-react';
import { MaterialMatchCandidate } from '../../types/MaterialMatchTypes';
import { Badge } from '../shared/Badge';

interface PendingReviewQueueProps {
  candidates: MaterialMatchCandidate[];
  onSelectCandidate: (candidate: MaterialMatchCandidate) => void;
  onApproveQuick: (candidate: MaterialMatchCandidate) => void;
  onRejectQuick: (candidate: MaterialMatchCandidate) => void;
  onPrintReport?: (candidate: MaterialMatchCandidate) => void;
}

export const PendingReviewQueue: React.FC<PendingReviewQueueProps> = ({
  candidates,
  onSelectCandidate,
  onApproveQuick,
  onRejectQuick,
  onPrintReport,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'HIGH_CONFIDENCE' | 'REQUIRES_REVIEW' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = candidates.filter((c) => {
    if (statusFilter === 'PENDING') {
      if (c.reviewStatus !== 'PENDING_REVIEW') return false;
    } else if (statusFilter === 'HIGH_CONFIDENCE') {
      if (c.confidence < 0.9 || c.conflicts.length > 0) return false;
    } else if (statusFilter === 'REQUIRES_REVIEW') {
      if (c.relationshipType !== 'REQUIRES_REVIEW' && c.conflicts.length === 0) return false;
    } else if (statusFilter === 'APPROVED') {
      if (c.reviewStatus !== 'APPROVED' && c.reviewStatus !== 'MODIFIED_AND_APPROVED') return false;
    } else if (statusFilter === 'REJECTED') {
      if (c.reviewStatus !== 'REJECTED') return false;
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchCode = c.recommendedNationalCode.toLowerCase().includes(q);
      const matchDesc = c.recommendedDescription.toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchDesc) return false;
    }
    return true;
  });

  const filterTabs = [
    { id: 'ALL', label: 'All Items', count: candidates.length },
    {
      id: 'PENDING',
      label: 'Pending',
      count: candidates.filter((c) => c.reviewStatus === 'PENDING_REVIEW').length,
    },
    {
      id: 'HIGH_CONFIDENCE',
      label: 'High Confidence (≥90%)',
      count: candidates.filter((c) => c.confidence >= 0.9 && c.conflicts.length === 0).length,
    },
    {
      id: 'REQUIRES_REVIEW',
      label: 'Requires Review / Conflicts',
      count: candidates.filter((c) => c.conflicts.length > 0 || c.relationshipType === 'REQUIRES_REVIEW').length,
    },
    {
      id: 'APPROVED',
      label: 'Approved',
      count: candidates.filter((c) => c.reviewStatus === 'APPROVED' || c.reviewStatus === 'MODIFIED_AND_APPROVED').length,
    },
    {
      id: 'REJECTED',
      label: 'Rejected',
      count: candidates.filter((c) => c.reviewStatus === 'REJECTED').length,
    },
  ];

  return (
    <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
      {/* Header with Search and Filter Tabs */}
      <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#0B192C]" />
              Engineering Sign-Off & Governance Queue
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Review and authorize AI-recommended Common National Material Codes before catalog inclusion.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate queue..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B192C] w-56"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-xs text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-xs text-[10px] font-mono ${
                  statusFilter === tab.id
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
              <th className="py-2.5 px-3 font-bold w-20">Priority</th>
              <th className="py-2.5 px-3 font-bold">Material & CNMC</th>
              <th className="py-2.5 px-3 font-bold">Participating CPSEs</th>
              <th className="py-2.5 px-3 font-bold">Classification</th>
              <th className="py-2.5 px-3 font-bold">Confidence</th>
              <th className="py-2.5 px-3 font-bold">Detected Conflicts / Specs</th>
              <th className="py-2.5 px-3 font-bold">Review Status</th>
              <th className="py-2.5 px-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-500 font-mono text-xs">
                  No review candidates match the selected filter.
                </td>
              </tr>
            ) : (
              filtered.map((cand) => {
                const hasConflict = cand.conflicts.length > 0;
                // Priority logic based on conflicts and confidence
                const priority = hasConflict
                  ? { label: 'CRITICAL', cls: 'bg-rose-100 text-rose-800 border-rose-300' }
                  : cand.confidence < 0.85
                  ? { label: 'HIGH', cls: 'bg-amber-100 text-amber-800 border-amber-300' }
                  : { label: 'NORMAL', cls: 'bg-slate-100 text-slate-700 border-slate-300' };

                return (
                  <tr
                    key={cand.id}
                    className="hover:bg-slate-50/90 transition-colors"
                  >
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 rounded-xs border text-[10px] font-mono font-bold ${priority.cls}`}>
                        {priority.label}
                      </span>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-[#0B192C]">{cand.recommendedNationalCode}</div>
                      <div className="text-slate-800 font-medium line-clamp-1 max-w-xs mt-0.5">
                        {cand.title}
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap items-center gap-1">
                        {cand.sourceMaterials.map((s) => (
                          <span
                            key={s.id}
                            className="px-1.5 py-0.5 rounded-xs bg-slate-100 border border-slate-300 text-[10px] font-mono text-slate-800"
                          >
                            <strong className="text-slate-900">{s.cpse}:</strong> {s.sourceMaterialCode}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge value={cand.relationshipType} size="sm" />
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-slate-900 font-bold">
                      {(cand.confidence * 100).toFixed(0)}%
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {hasConflict ? (
                        <span className="inline-flex items-center gap-1 text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded-xs border border-rose-300 text-[10px] font-mono">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          {cand.conflicts[0].attribute}
                        </span>
                      ) : (
                        <span className="text-emerald-800 font-medium text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Specs
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge value={cand.reviewStatus} size="sm" />
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {onPrintReport && (
                          <button
                            onClick={() => onPrintReport(cand)}
                            className="px-2 py-1 rounded-xs bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
                            title="Print Official Material Harmonization Technical Report"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onSelectCandidate(cand)}
                          className="px-2.5 py-1 rounded-xs bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-bold transition-colors shadow-xs"
                          title="Open Technical Comparison Workstation"
                        >
                          Open Workstation
                        </button>
                        {cand.reviewStatus === 'PENDING_REVIEW' && !hasConflict && (
                          <button
                            onClick={() => onApproveQuick(cand)}
                            className="px-2 py-1 rounded-xs bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                            title="Fast Approve CNMC"
                          >
                            Fast Approve
                          </button>
                        )}
                        {cand.reviewStatus === 'PENDING_REVIEW' && (
                          <button
                            onClick={() => onRejectQuick(cand)}
                            className="px-2 py-1 rounded-xs bg-white hover:bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold transition-colors"
                            title="Reject and Flag Cluster"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
