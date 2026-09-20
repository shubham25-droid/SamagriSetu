/**
 * Material Matching & Technical Comparison Types
 * BodhZ - SIH26099
 */

import { MaterialRecord } from './MaterialMasterTypes';

export type MatchClassification =
  | 'SAME_MATERIAL'
  | 'DUPLICATE'
  | 'NEAR_DUPLICATE'
  | 'FUNCTIONALLY_EQUIVALENT'
  | 'DIFFERENT'
  | 'REQUIRES_REVIEW';

export interface TechnicalComparisonRow {
  attributeName: string;
  sourceValues: Record<string, string>; // e.g. { 'ONGC': '2 IN', 'IOCL': '2"', 'BHEL': '50MM' }
  normalizedValue: string; // e.g. '2 Inch (DN 50)'
  matchStatus: 'MATCH' | 'NORMALIZED_MATCH' | 'CONFLICT' | 'NOT_APPLICABLE';
  notes?: string;
}

export interface MaterialConflict {
  attribute: string;
  severity: 'HARD_CONFLICT' | 'SPECIFICATION_MISMATCH' | 'WARNING';
  description: string;
  conflictingValues: Record<string, string>;
  impact: string;
}

export interface MatchEvidence {
  point: string;
  category: 'MATERIAL_TYPE' | 'DIMENSIONAL' | 'METALLURGY' | 'PRESSURE_TEMP' | 'STANDARD_COMPLIANCE' | 'UOM';
  passed: boolean;
}

export interface MaterialMatchCandidate {
  id: string; // e.g. 'MATCH-CAND-001'
  title: string;
  sourceMaterials: MaterialRecord[];
  relationshipType: MatchClassification;
  confidence: number; // Stored as 0.0 - 1.0 (labeled in UI as "Demo Matching Confidence")
  normalizedAttributes: Record<string, string>;
  technicalComparisons: TechnicalComparisonRow[];
  conflicts: MaterialConflict[];
  evidence: MatchEvidence[];
  recommendedDescription: string;
  recommendedClassification: {
    category: string;
    subcategory: string;
    unspscEquivalentCode?: string;
  };
  recommendedNationalCode: string; // e.g. 'CNMC-000184'
  reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'MODIFIED_AND_APPROVED';
  reviewerDecision?: {
    action: 'APPROVE' | 'REJECT' | 'MODIFY';
    reviewerName: string;
    timestamp: string;
    reason?: string;
    modifiedDescription?: string;
  };
  scenarioId?: 'SCENARIO_1_SAME_MATERIAL' | 'SCENARIO_2_HARD_CONFLICT' | 'SCENARIO_3_MATERIAL_GRADE' | 'SCENARIO_4_UNIT_NORMALIZATION' | 'SCENARIO_5_NEAR_DUPLICATE' | 'SCENARIO_6_FUNCTIONALLY_EQUIVALENT';
  scenarioLabel?: string;
}
