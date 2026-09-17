/**
 * Human Reviewer Governance Action Modal
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { MaterialMatchCandidate } from '../../types/MaterialMatchTypes';
import { Modal } from '../shared/Modal';

interface ReviewDecisionModalProps {
  candidate: MaterialMatchCandidate | null;
  mode: 'APPROVE' | 'REJECT' | 'MODIFY';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    action: 'APPROVE' | 'REJECT' | 'MODIFY';
    notes?: string;
    rejectionReason?: string;
    modifiedDescription?: string;
  }) => void;
}

export const ReviewDecisionModal: React.FC<ReviewDecisionModalProps> = ({
  candidate,
  mode,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [modifiedDescription, setModifiedDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [prevCandidateId, setPrevCandidateId] = useState<string | null>(null);
  if (candidate && candidate.id !== prevCandidateId) {
    setPrevCandidateId(candidate.id);
    setModifiedDescription(candidate.recommendedDescription);
    setNotes('');
    setRejectionReason('');
    setErrorMsg('');
  }

  if (!candidate) return null;

  const hasHardConflict = candidate.conflicts.some((c) => c.severity === 'HARD_CONFLICT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'REJECT') {
      if (!rejectionReason.trim()) {
        setErrorMsg('A governance rejection reason is mandatory to maintain data integrity.');
        return;
      }
      onSubmit({ action: 'REJECT', rejectionReason });
    } else if (mode === 'MODIFY') {
      if (!modifiedDescription.trim()) {
        setErrorMsg('Standardized description cannot be empty.');
        return;
      }
      onSubmit({ action: 'MODIFY', modifiedDescription, notes });
    } else {
      // APPROVE
      if (hasHardConflict) {
        setErrorMsg('Approval blocked: resolve or dismiss hard technical conflict first.');
        return;
      }
      onSubmit({ action: 'APPROVE', notes });
    }
    onClose();
  };

  const title =
    mode === 'APPROVE'
      ? 'Approve National Material Harmonization'
      : mode === 'REJECT'
      ? 'Reject Harmonization Recommendation'
      : 'Modify Technical Specifications & Standardize';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Material Identity Summary */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
          <div className="text-slate-500">Candidate ID: {candidate.id}</div>
          <div className="font-bold text-slate-900">{candidate.title}</div>
          <div className="text-sky-700">Target CNMC: {candidate.recommendedNationalCode}</div>
        </div>

        {hasHardConflict && mode === 'APPROVE' && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>
              <strong>Hard Conflict Alert:</strong> Incompatible specifications detected. Use "Reject" or "Modify" to retain separately.
            </span>
          </div>
        )}

        {/* Action Specific Fields */}
        {mode === 'APPROVE' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Engineering Approval Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Verified dimensional drawing and metallurgical compliance with API 6D standard."
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        )}

        {mode === 'REJECT' && (
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Mandatory Governance Rejection Reason *
            </label>
            <textarea
              rows={3}
              required
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Pressure class differs between source records (Class 150 vs Class 300). Cannot safely substitute."
              className="w-full p-2.5 bg-white border border-rose-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
          </div>
        )}

        {mode === 'MODIFY' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Refined Standardized Description
              </label>
              <textarea
                rows={3}
                value={modifiedDescription}
                onChange={(e) => setModifiedDescription(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-mono focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Modification Justification Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Corrected nominal bore representation from metric to imperial standard."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {errorMsg && (
          <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-xs font-bold text-white rounded-lg shadow-xs transition-colors ${
              mode === 'APPROVE'
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : mode === 'REJECT'
                ? 'bg-rose-600 hover:bg-rose-500'
                : 'bg-sky-600 hover:bg-sky-500'
            }`}
          >
            {mode === 'APPROVE'
              ? 'Confirm Official Approval'
              : mode === 'REJECT'
              ? 'Confirm Rejection'
              : 'Save Standard & Approve'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
