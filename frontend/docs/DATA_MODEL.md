# Domain Data Model Specification
## SIH26099: National Material Intelligence Platform

---

### 1. Entity Relationship Overview

```text
  ┌────────────────────────┐
  │       CPSEProfile      │
  └───────────┬────────────┘
              │ 1
              │
              │ *
  ┌───────────▼────────────┐        *  ┌──────────────────────────────┐
  │     MaterialRecord     ├───────────►   MaterialMatchCandidate     │
  │ (Original CPSE Record) │           │    (NLP Clustered Group)     │
  └───────────┬────────────┘           └──────────────┬───────────────┘
              │                                       │
              │                                       │ (Approved by Reviewer)
              │                                       ▼
              │ *                      1  ┌──────────────────────────────┐
              └───────────────────────────►      NationalMaterial        │
               (Preserved Mappings)       │      (CNMC-XXXXXX)           │
                                          └──────────────┬───────────────┘
                                                         │ 1
                                                         │ *
                                          ┌──────────────▼───────────────┐
                                          │          AuditEvent          │
                                          │    (Immutable Governance)    │
                                          └──────────────────────────────┘
```

### 2. Core Entities Definition

#### A. MaterialRecord (Source CPSE Record)
- `id`: string (Unique system key)
- `cpse`: string (`ONGC` | `IOCL` | `BHEL`)
- `sourceMaterialCode`: string (e.g. `ONGC-4582`)
- `originalDescription`: string (e.g. `BALL VALVE 2 IN CS CL150`)
- `materialCategory`: string
- `uom`: string
- `materialGrade`: string
- `size`: string
- `pressureRating`: string
- `standard`: string
- `criticalAttributes`: Record<string, string>

#### B. NationalMaterial (Unified Master Entity)
- `nationalCode`: string (e.g. `CNMC-000184`)
- `standardDescription`: string
- `category`: string
- `subcategory`: string
- `normalizedAttributes`: Record<string, string>
- `mappedSourceRecords`: Array<{ cpse, sourceCode, originalDescription, uom, mappingStatus, erpOrigin }>
- `approvalStatus`: `APPROVED` | `PENDING_REVIEW` | `MODIFIED_AND_APPROVED`
- `approvedBy`: string
- `approvalTimestamp`: string
- `coverageCount`: number

#### C. MaterialMatchCandidate (Review Cluster)
- `id`: string
- `title`: string
- `sourceMaterials`: MaterialRecord[]
- `relationshipType`: `SAME_MATERIAL` | `DUPLICATE` | `NEAR_DUPLICATE` | `FUNCTIONALLY_EQUIVALENT` | `REQUIRES_REVIEW`
- `confidence`: number (Demo Matching Confidence)
- `technicalComparisons`: TechnicalComparisonRow[]
- `conflicts`: MaterialConflict[]
- `evidence`: MatchEvidence[]
- `recommendedNationalCode`: string
- `recommendedDescription`: string
- `reviewStatus`: `PENDING_REVIEW` | `APPROVED` | `REJECTED`
