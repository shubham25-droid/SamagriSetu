/**
 * Audit Trail & Governance Event Types
 * BodhZ - SIH26099
 */

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action:
    | 'DATASET_IMPORT'
    | 'HARMONIZATION_RUN'
    | 'AI_RECOMMENDATION_GENERATED'
    | 'APPROVED_HARMONIZATION'
    | 'REJECTED_HARMONIZATION'
    | 'MODIFIED_HARMONIZATION'
    | 'LEGACY_MAPPING_UPDATED'
    | 'EXPORT_REPORT_GENERATED';
  materialCode: string; // e.g. 'CNMC-000184' or 'BATCH-IMP-001'
  previousState: string;
  newState: string;
  reason: string;
  source: string; // e.g. 'Web Governance Portal', 'AI Matching Engine v1.2'
  participatingCPSEs?: string[];
}
