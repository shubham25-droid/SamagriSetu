# Material Harmonization & Normalization Workflow
## SIH26099: National Material Intelligence Platform

---

### 1. The Normalization Engine

Different CPSE ERP records express the same physical material using disparate conventions:
```text
ONGC: BALL VALVE 2 IN CS CL150
IOCL: 2" CARBON STEEL BALL VALVE CLASS 150
BHEL: BALL V/V 50MM CS 150 LB
```

The normalization engine executes a multi-pass pipeline:
1. **Component Type Extraction:** Extracts canonical component name (`Ball Valve`) resolving synonyms (`V/V`, `VLV`, `Ball Valve Units`).
2. **Dimension Standardizing:** Converts metric and imperial representations into standard nominal bore (`50mm == 2" / DN 50`).
3. **Metallurgy Normalization:** Resolves acronyms (`CS` -> `Carbon Steel ASTM A216 WCB`).
4. **Pressure Rating Harmonization:** Normalizes `CL150`, `Class 150`, and `150 LB` into ASME Class 150.
5. **UOM Canonicalization:** Normalizes `EA`, `PCS`, and `NOS` into National Registry standard `NOS`.

### 2. Match Classification Taxonomy

The system strictly classifies every proposed candidate cluster into one of six mutually exclusive categories:
- **Same Material:** Identical fit, form, function, metallurgy, and dimensions across CPSEs.
- **Duplicate:** Redundant codes within the same CPSE or equivalent identical procurement records.
- **Near-Duplicate:** Same component with minor phrasing or non-critical formatting variances.
- **Functionally Equivalent:** Different OEM models with identical application parameters (e.g. Rosemount vs Yokogawa transmitters).
- **Requires Review / Conflict:** Safety-critical technical conflict detected (e.g. Class 150 vs Class 300). Automatic merge blocked.
- **Different:** Material attributes confirm distinct physical items.

### 3. Human Governance Flow
AI generates proposed Common National Material Codes (`CNMC-XXXXXX`). However, only an authorized Material Master Reviewer can approve the harmonization.

Reviewers have three actions:
1. **Approve:** Adds the entry to the National Material Master and publishes the bi-directional mapping.
2. **Modify:** Allows manual refinement of the standardized description or classification prior to sign-off.
3. **Reject:** Requires a mandatory recorded justification (e.g. "Pressure rating differs between source records").
