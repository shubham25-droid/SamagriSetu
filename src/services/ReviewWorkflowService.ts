/**
 * Human Review Governance & Validation Service
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Enforces human oversight: AI proposes recommendations;
 * human reviewers validate, reject, or modify technical standards.
 */

import { ReviewActionPayload, ReviewQueueItem } from '../types/ReviewWorkflowTypes';
import { MaterialMatchingService } from './MaterialMatchingService';
import { NationalMaterialService } from './NationalMaterialService';
import { AuditTrailService } from './AuditTrailService';

class ReviewWorkflowServiceImpl {
  public getReviewQueue(): ReviewQueueItem[] {
    const candidates = MaterialMatchingService.getCandidates();
    return candidates.map((cand) => ({
      id: `REV-${cand.id}`,
      candidateId: cand.id,
      recommendedCode: cand.recommendedNationalCode,
      recommendedDescription: cand.recommendedDescription,
      participatingCPSEs: Array.from(new Set(cand.sourceMaterials.map((s) => s.cpse))),
      materialsCount: cand.sourceMaterials.length,
      relationshipType: cand.relationshipType,
      confidence: cand.confidence,
      hasHardConflict: cand.conflicts.some((c) => c.severity === 'HARD_CONFLICT'),
      conflictSummary: cand.conflicts.length > 0 ? cand.conflicts[0].description : undefined,
      submittedAt: '17 Sep 2026',
      status: cand.reviewStatus,
    }));
  }

  /**
   * Process a human review decision (Approve, Reject, or Modify)
   */
  public submitDecision(payload: ReviewActionPayload): void {
    const candidate = MaterialMatchingService.getCandidateById(payload.candidateId);
    if (!candidate) {
      throw new Error(`Candidate ${payload.candidateId} not found.`);
    }

    if (payload.action === 'APPROVE') {
      MaterialMatchingService.updateCandidateStatus(payload.candidateId, 'APPROVED', {
        action: 'APPROVE',
        reviewerName: payload.reviewerName,
        reason: payload.notes || 'Verified specifications and cross-CPSE equivalence.',
      });

      // Promote to National Material Master
      NationalMaterialService.addApprovedMaterialFromCandidate(
        candidate,
        payload.reviewerName,
        payload.notes
      );
    } else if (payload.action === 'REJECT') {
      if (!payload.rejectionReason || payload.rejectionReason.trim().length === 0) {
        throw new Error('Rejection reason is mandatory to maintain data integrity.');
      }

      MaterialMatchingService.updateCandidateStatus(payload.candidateId, 'REJECTED', {
        action: 'REJECT',
        reviewerName: payload.reviewerName,
        reason: payload.rejectionReason,
      });

      AuditTrailService.logEvent({
        user: payload.reviewerName,
        role: 'Chief Material Master Reviewer',
        action: 'REJECTED_HARMONIZATION',
        materialCode: candidate.recommendedNationalCode,
        previousState: 'PENDING_REVIEW',
        newState: 'REJECTED',
        reason: payload.rejectionReason,
        source: 'National Review Center',
        participatingCPSEs: candidate.sourceMaterials.map((s) => s.cpse),
      });
    } else if (payload.action === 'MODIFY') {
      MaterialMatchingService.updateCandidateStatus(payload.candidateId, 'MODIFIED_AND_APPROVED', {
        action: 'MODIFY',
        reviewerName: payload.reviewerName,
        reason: payload.notes || 'Modified standardized description/attributes before approval',
        modifiedDescription: payload.modifiedDescription,
      });

      if (payload.modifiedDescription) {
        candidate.recommendedDescription = payload.modifiedDescription;
      }

      NationalMaterialService.addApprovedMaterialFromCandidate(
        candidate,
        payload.reviewerName,
        `Reviewer Modified: ${payload.notes || 'Specifications edited'}`
      );

      AuditTrailService.logEvent({
        user: payload.reviewerName,
        role: 'Chief Material Master Reviewer',
        action: 'MODIFIED_HARMONIZATION',
        materialCode: candidate.recommendedNationalCode,
        previousState: 'PENDING_REVIEW',
        newState: 'MODIFIED_AND_APPROVED',
        reason: payload.notes || 'Reviewer manually refined description and approved into National Master',
        source: 'National Review Center',
        participatingCPSEs: candidate.sourceMaterials.map((s) => s.cpse),
      });
    }
  }
}

export const ReviewWorkflowService = new ReviewWorkflowServiceImpl();
