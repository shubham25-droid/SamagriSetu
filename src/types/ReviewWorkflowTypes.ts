/**
 * Human Review Governance & Workflow Types
 * BodhZ - SIH26099
 */

import { MatchClassification } from './MaterialMatchTypes';

export type ReviewStatus = 'ALL' | 'PENDING' | 'HIGH_CONFIDENCE' | 'REQUIRES_REVIEW' | 'APPROVED' | 'REJECTED';

export interface ReviewActionPayload {
  candidateId: string;
  action: 'APPROVE' | 'REJECT' | 'MODIFY';
  reviewerName: string;
  notes?: string;
  rejectionReason?: string;
  modifiedDescription?: string;
  modifiedCategory?: string;
  modifiedSubcategory?: string;
  modifiedRelationshipType?: MatchClassification;
}

export interface ReviewQueueItem {
  id: string;
  candidateId: string;
  recommendedCode: string;
  recommendedDescription: string;
  participatingCPSEs: string[];
  materialsCount: number;
  relationshipType: MatchClassification;
  confidence: number;
  hasHardConflict: boolean;
  conflictSummary?: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'MODIFIED_AND_APPROVED';
}
