/**
 * Material Matching, Normalization & Conflict Analysis Page (CORE PAGE)
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Printer,
  ArrowLeft,
  ArrowRight,
  Network,
  Check,
} from 'lucide-react';
import { MaterialMatchingService } from '../services/MaterialMatchingService';
import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import { MaterialComparisonPanel } from '../components/material-matching/MaterialComparisonPanel';
import { ReviewDecisionModal } from '../components/review/ReviewDecisionModal';
import { HarmonizationReportModal } from '../components/review/HarmonizationReportModal';
import { ReviewWorkflowService } from '../services/ReviewWorkflowService';
import { Badge } from '../components/shared/Badge';

interface MaterialMatchingPageProps {
  initialScenarioId?: string;
  onNavigateToPrev?: () => void;
  onNavigateToMaster?: () => void;
  activeCpse?: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  isCompleted?: boolean;
  isChiefReviewer?: boolean;
}

export const MaterialMatchingPage: React.FC<MaterialMatchingPageProps> = ({
  initialScenarioId,
  onNavigateToPrev,
  onNavigateToMaster,
  activeCpse = 'ONGC',
  isCompleted,
  isChiefReviewer,
}) => {
  const [candidates, setCandidates] = useState<MaterialMatchCandidate[]>(
    MaterialMatchingService.getCandidates()
  );

  // Find initial candidate by scenario if passed or matching active CPSE
  const findDefaultCandidate = () => {
    if (initialScenarioId) {
      const match = candidates.find((c) => c.scenarioId === initialScenarioId);
      if (match) return match;
    }
    if (activeCpse && activeCpse !== 'ALL') {
      const cpseCand = candidates.find((c) =>
        c.sourceMaterials.some((s) => s.cpse === activeCpse)
      );
      if (cpseCand) return cpseCand;
    }
    return candidates[0];
  };

  const [selectedCandidate, setSelectedCandidate] = useState<MaterialMatchCandidate>(findDefaultCandidate());
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Review Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    candidate: MaterialMatchCandidate | null;
    mode: 'APPROVE' | 'REJECT' | 'MODIFY';
  }>({
    isOpen: false,
    candidate: null,
    mode: 'APPROVE',
  });

  const handleRunHarmonization = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const refreshed = MaterialMatchingService.runHarmonization();
      setCandidates(refreshed);
      setSelectedCandidate(refreshed[0]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleOpenModal = (candidate: MaterialMatchCandidate, mode: 'APPROVE' | 'REJECT' | 'MODIFY') => {
    setModalState({
      isOpen: true,
      candidate,
      mode,
    });
  };

  const handleModalSubmit = (decisionData: {
    action: 'APPROVE' | 'REJECT' | 'MODIFY';
    notes?: string;
    rejectionReason?: string;
    modifiedDescription?: string;
  }) => {
    if (!modalState.candidate) return;

    ReviewWorkflowService.submitDecision({
      candidateId: modalState.candidate.id,
      action: decisionData.action,
      reviewerName: 'Er. R. Sundaram (Chief Reviewer)',
      notes: decisionData.notes,
      rejectionReason: decisionData.rejectionReason,
      modifiedDescription: decisionData.modifiedDescription,
    });

    // Refresh candidate in view
    const updated = MaterialMatchingService.getCandidateById(modalState.candidate.id);
    if (updated) {
      setSelectedCandidate({ ...updated });
      setCandidates(MaterialMatchingService.getCandidates());
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'CONFLICTS') return c.conflicts.length > 0;
    if (activeFilter === 'SAME') return c.relationshipType === 'SAME_MATERIAL';
    if (activeFilter === 'EQUIVALENT') return c.relationshipType === 'FUNCTIONALLY_EQUIVALENT';
    if (activeFilter === 'PENDING') return c.reviewStatus === 'PENDING_REVIEW';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isChiefReviewer ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-sky-950/80 text-sky-300 border border-sky-600/40 shadow-2xs">
                <Network className="w-3 h-3 text-sky-400" />
                APEX HARMONIZATION MATRIX • SPEC CONFLICT RESOLUTION
              </span>
            ) : isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                STEP 4 COMPLETED • MATCHES HARMONIZED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-[#0B192C] text-sky-200 border border-sky-800 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                STEP 4 OF 5 • IN PROGRESS
              </span>
            )}
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Network className="w-5 h-5 text-sky-700" />
              Sister CPSE Material Matching & Conflict Workstation
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Harmonizes multi-CPSE catalogs (ONGC, IOCL, BHEL, SAIL), checks ASTM/ASME specs, and enforces safety locks on critical parameter mismatches.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-500 font-sans font-semibold">Active Enterprise Focus:</span>
            <Badge value={activeCpse} />
            <span className="text-[11px] font-bold text-slate-800 font-mono">
              {activeCpse === 'ALL' ? 'Multi-CPSE Inter-Enterprise Matrix' : `${activeCpse} Catalog Harmonization Active`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {selectedCandidate && (
            <button
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xs text-xs font-mono font-bold transition-colors shrink-0 shadow-2xs cursor-pointer"
              title="Print Official Material Harmonization Technical Report"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print Report
            </button>
          )}

          <button
            onClick={handleRunHarmonization}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-xs font-mono font-bold transition-colors shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Processing...' : 'Re-Run Matcher'}
          </button>

          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isChiefReviewer ? 'Back' : 'Step 3'}</span>
            </button>
          )}

          {onNavigateToMaster && (
            <button
              onClick={onNavigateToMaster}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>{isChiefReviewer ? 'National Master (CNMC)' : 'Next: National Master'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Candidate Clusters List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {/* Filter Pills */}
          <div className="bg-white border border-slate-300 p-2.5 shadow-2xs font-mono">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Candidate Clusters ({filteredCandidates.length})
              </span>
              <span className="text-[10px] text-slate-500">4 CPSEs</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'CONFLICTS', label: 'Conflicts ⚠' },
                { id: 'SAME', label: 'Same Spec' },
                { id: 'EQUIVALENT', label: 'Equivalent' },
                { id: 'PENDING', label: 'Pending' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-2 py-0.5 rounded-xs text-[10px] font-bold transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Candidates Scrollable List */}
          <div className="space-y-1.5 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            {filteredCandidates.map((cand) => {
              const isSelected = selectedCandidate?.id === cand.id;
              const hasConflict = cand.conflicts && cand.conflicts.length > 0;

              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-3 border cursor-pointer transition-all font-mono rounded-xs ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/60 border-l-4 border-l-sky-600 shadow-xs'
                      : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-sky-950">
                      {cand.recommendedNationalCode}
                    </span>
                    <Badge value={cand.relationshipType} size="sm" />
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                    {cand.title}
                  </h4>

                  {/* CPSE badges */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {cand.sourceMaterials.map((s) => (
                      <span
                        key={s.id}
                        className="px-1.5 py-0.2 rounded-xs bg-slate-100 border border-slate-300 text-[9px] font-bold text-slate-700"
                      >
                        {s.cpse}
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-500 ml-auto font-bold">
                      {(cand.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  {hasConflict && (
                    <div className="mt-1.5 text-[10px] text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded-xs border border-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-700 shrink-0" />
                      Hold: {cand.conflicts[0].attribute}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Candidate Deep-Dive (8 cols) */}
        <div className="lg:col-span-8">
          {selectedCandidate ? (
            <MaterialComparisonPanel
              candidate={selectedCandidate}
              onApprove={(cand) => handleOpenModal(cand, 'APPROVE')}
              onReject={(cand) => handleOpenModal(cand, 'REJECT')}
              onModify={(cand) => handleOpenModal(cand, 'MODIFY')}
            />
          ) : (
            <div className="p-12 text-center text-slate-400 font-mono">
              Select a material candidate from the list to inspect.
            </div>
          )}
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
              <span>← Back to Step 3: Duplicates</span>
            </button>
          )}
        </div>

        <div>
          {onNavigateToMaster && (
            <button
              onClick={onNavigateToMaster}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Proceed to Step 5: National Master & GeM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Governance Review Action Modal */}
      <ReviewDecisionModal
        candidate={modalState.candidate}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, candidate: null, mode: 'APPROVE' })}
        onSubmit={handleModalSubmit}
      />

      {/* Printable Material Harmonization Technical Report Modal */}
      <HarmonizationReportModal
        candidate={selectedCandidate}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reviewerName="Er. R. Sundaram, FIE"
        reviewerRole="Chief Materials Manager, Inter-Ministerial CPSE Council"
      />
    </div>
  );
};
