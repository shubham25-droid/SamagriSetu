# Project Architecture Document
## SIH26099: National Material Intelligence & Harmonization Platform
**Ministry of Petroleum & Natural Gas / Chennai Petroleum Corporation Limited (CPCL)**  
**Team BodhZ**

---

### 1. High-Level Architectural Layers

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        GOVERNMENT PRESENTATION LAYER                   │
│  - National Command Center Dashboard                                   │
│  - 5-Step CPSE Data Ingestion Wizard (ONGC / IOCL / BHEL)              │
│  - Material Matching & Technical Comparison Panel                      │
│  - Convergence Visualizer & 'One Material -> Many CPSEs' Tree         │
│  - Human Review Governance & Validation Modal                          │
│  - Bi-Directional Legacy Mapping & Traceability Table                  │
│  - Chronological Immutable Audit Trail                                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                         SERVICE BOUNDARY LAYER                         │
│  - CPSEDataImportService     (CSV Parser, Schema Validator, Job Log)  │
│  - MaterialMatchingService   (NLP Extraction, UOM Norm, Conflict Lock) │
│  - NationalMaterialService   (CNMC Generator, Master Repo, Mapping)    │
│  - ReviewWorkflowService     (Decision Processing, Mutation Governance)│
│  - AuditTrailService         (Chronological Event Logging)             │
│  - ExportService             (Enterprise CSV & Report Generation)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                           DOMAIN DATA LAYER                            │
│  - Deterministic Synthetic Datasets (ONGC, IOCL, BHEL Raw Masters)     │
│  - 6 Curated SIH Evaluation Scenarios (Same, Conflict, UOM, Near-Dup)  │
│  - Master Schemas: MaterialRecord, NationalMaterial, MatchCandidate    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    ENTERPRISE INTEGRATION GATEWAY                      │
│  - Current: CSV / Excel Upload Gateway with Schema Verification        │
│  - Planned: SAP S/4HANA (OData v4 / MARA) & SAP ECC 6.0 (RFC/BAPI)     │
└────────────────────────────────────────────────────────────────────────┘
```

### 2. Key Architectural Guarantees
1. **Zero Overwrite of Source Records:** A CPSE's original code and description are never mutated or replaced. The National Material Master acts as a federated parent entity that links to existing ERP records.
2. **Safety-First Matching Engine:** High text similarity alone never triggers automatic consolidation. If critical attributes (pressure rating, metallurgy, wall schedule) conflict, an automatic safety lock is enforced and human review is mandated.
3. **Traceability:** Every Common National Material Code (`CNMC-XXXXXX`) maintains active bi-directional pointers to participating CPSE codes (`ONGC-4582`, `IOCL-7811`, `BHEL-2290`).
4. **Auditability:** Every system state transition, upload, approval, or rejection generates an immutable audit record with timestamp, user ID, role, and governance rationale.
