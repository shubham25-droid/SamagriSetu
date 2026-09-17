/**
 * Human Review Center & Governance Queue Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { CheckSquare, Download } from 'lucide-react';
import { MaterialMatchingService } from '../services/MaterialMatchingService';
import { ReviewWorkflowService } from '../services/ReviewWorkflowService';
import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import { PendingReviewQueue } from '../components/review/PendingReviewQueue';
import { ReviewDecisionModal } from '../components/review/ReviewDecisionModal';
import { HarmonizationReportModal } from '../components/review/HarmonizationReportModal';
import { ExportService } from '../services/ExportService';

interface MaterialReviewPageProps {
  onInspectCandidate: (candidate: MaterialMatchCandidate) => void;
}

export const MaterialReviewPage: React.FC<MaterialReviewPageProps> = ({ onInspectCandidate }) => {
  const [candidates, setCandidates] = useState<MaterialMatchCandidate[]>(
    MaterialMatchingService.getCandidates()
  );

  const [reportCandidate, setReportCandidate] = useState<MaterialMatchCandidate | null>(null);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    candidate: MaterialMatchCandidate | null;
    mode: 'APPROVE' | 'REJECT' | 'MODIFY';
  }>({
    isOpen: false,
    candidate: null,
    mode: 'APPROVE',
  });

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
      reviewerName: 'Er. R. Sundaram (Chief Reviewer, CPSE Council)',
      notes: decisionData.notes,
      rejectionReason: decisionData.rejectionReason,
      modifiedDescription: decisionData.modifiedDescription,
    });

    setCandidates([...MaterialMatchingService.getCandidates()]);
  };

  const pendingCount = candidates.filter((c) => c.reviewStatus === 'PENDING_REVIEW').length;
  const criticalConflictsCount = candidates.filter((c) => c.conflicts.length > 0).length;
  const highConfCount = candidates.filter((c) => c.confidence >= 0.9 && c.conflicts.length === 0).length;
  const approvedCount = candidates.filter((c) => c.reviewStatus === 'APPROVED' || c.reviewStatus === 'MODIFIED_AND_APPROVED').length;

  return (
    <div className="space-y-4">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-sky-950/80 text-sky-300 border border-sky-600/40 shadow-2xs">
              APEX GOVERNANCE WORKSTATION • CMM REVIEW AUTHORITY
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-sky-700" />
              Inter-Ministerial Approval Queue & Engineering Governance
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Mandatory human engineering sign-off under GFR 2017. Certified Chief Material Master Reviewer authorizes Common National Material Codes (CNMC) before GeM publication.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => ExportService.exportHarmonizationCandidates()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-mono font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Queue (CSV)
          </button>
        </div>
      </div>

      {/* Executive KPI Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-300 p-3 rounded-xs shadow-2xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Pending Decision</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</div>
          <div className="text-[10px] text-amber-700 mt-0.5">Awaiting CMM Sign-Off</div>
        </div>

        <div className="bg-white border border-slate-300 p-3 rounded-xs shadow-2xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Safety Conflicts</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
              ALERT
            </span>
          </div>
          <div className="text-2xl font-bold text-rose-900 mt-1">{criticalConflictsCount}</div>
          <div className="text-[10px] text-rose-700 mt-0.5">ASTM / Pressure Mismatch</div>
        </div>

        <div className="bg-white border border-slate-300 p-3 rounded-xs shadow-2xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Pre-Vetted AI Matches</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              READY
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">{highConfCount}</div>
          <div className="text-[10px] text-emerald-700 mt-0.5">≥90% Confidence Matches</div>
        </div>

        <div className="bg-white border border-slate-300 p-3 rounded-xs shadow-2xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Approved for GeM</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
              CNMC
            </span>
          </div>
          <div className="text-2xl font-bold text-sky-900 mt-1">{approvedCount}</div>
          <div className="text-[10px] text-sky-700 mt-0.5">Canonical Master Published</div>
        </div>
      </div>

      {/* Queue Component */}
      <PendingReviewQueue
        candidates={candidates}
        onSelectCandidate={onInspectCandidate}
        onApproveQuick={(c) => setModalState({ isOpen: true, candidate: c, mode: 'APPROVE' })}
        onRejectQuick={(c) => setModalState({ isOpen: true, candidate: c, mode: 'REJECT' })}
        onPrintReport={(c) => setReportCandidate(c)}
      />

      {/* Modal */}
      <ReviewDecisionModal
        candidate={modalState.candidate}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, candidate: null, mode: 'APPROVE' })}
        onSubmit={handleModalSubmit}
      />

      {/* Official Printable Technical Assessment Report Modal */}
      <HarmonizationReportModal
        candidate={reportCandidate}
        isOpen={!!reportCandidate}
        onClose={() => setReportCandidate(null)}
        reviewerName="Er. R. Sundaram, FIE"
        reviewerRole="Chief Materials Manager, Inter-Ministerial CPSE Council"
      />
    </div>
  );
};
