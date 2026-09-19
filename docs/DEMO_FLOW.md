# Judge Demonstration Script & Walkthrough
## SIH26099: National Material Intelligence Platform (Team BodhZ)

---

### Step-by-Step Hackathon Evaluation Sequence

1. **Access Demo:**
   - Open platform in browser (`http://localhost:5173`).
   - Observe Login Screen with clear "Demo Environment" badge. Click **"Enter Demo Environment as Material Reviewer"**.

2. **Command Center Dashboard:**
   - Review top statistics: Total Source Records (4,460), Participating CPSEs (3), Potential Duplicates, Pending Reviews.
   - Point out the duplicate reduction metric (-48.2%).
   - Inspect the **Harmonization Pipeline Visualizer** and click through the 5 architectural phases.

3. **CPSE Data Ingestion:**
   - In sidebar, click **CPSE Data → Import Material Data**.
   - Select **ONGC**, click **Load Demo Dataset**, inspect the automated schema validation results, and click **Commit Ingestion**.
   - Show how the platform handles proprietary CPSE schemas without overwriting source identifiers.

4. **Scenario 1: Multi-CPSE Identical Material (The Signature Case):**
   - Click **Material Intelligence → Material Matching**.
   - Select **Scenario 1: Ball Valve, 2 Inch, Carbon Steel, Class 150**.
   - Show the **Harmonization Convergence Visualizer**:
     - `ONGC-4582: BALL VALVE 2 IN CS CL150`
     - `IOCL-7811: 2" CARBON STEEL BALL VALVE CLASS 150`
     - `BHEL-2290: BALL V/V 50MM CS 150 LB`
     - Converging into `CNMC-000184`.
   - Scroll to the **Technical Attribute Equivalence Matrix**:
     - Point out `50MM` normalized to `2 Inch (DN 50)`.
     - Point out `V/V` expanded to `Valve`.
     - Point out `CS` normalized to `Carbon Steel`.
   - Show the **AI Explainability Evidence Card** ("Why was this match proposed?").

5. **Human Governance & Approval:**
   - Click **Approve Harmonization**.
   - Enter validation notes: *"Dimensional and metallurgical compliance verified under API 6D."*
   - Confirm approval.

6. **National Material Master & Traceability Tree:**
   - Navigate to **National Material Master → Approved Materials**.
   - Show the signature **'One Material → Many CPSE Records' Traceability Tree**:
     - `CNMC-000184` at top
     - Branching downward to `ONGC-4582`, `IOCL-7811`, and `BHEL-2290`.
   - Emphasize that original CPSE ERP codes remain 100% active and mapped.

7. **Scenario 2: Hard Technical Conflict (Safety Engine):**
   - Return to **Material Matching** and select **Scenario 2: Ball Valve 2" CS CL150 vs CL300**.
   - Explain that text similarity is very high (88%), but **auto-merge is strictly blocked** by the safety conflict engine.
   - Show the **Hard Technical Conflict Banner**:
     - Warning: Pressure rating mismatch (Class 150 vs Class 300).
     - Notice that the "Approve Harmonization" button is automatically disabled to prevent accidental catastrophic pressure failure!

8. **Scenario 3 & 4 Proof Points:**
   - Show **Scenario 3 (SS304 vs SS316 Metallurgy conflict)**.
   - Show **Scenario 4 (Metric/Imperial Seamless Pipe 50 NB == 2" NB)**.

9. **Legacy Code Rationalization & Audit Trail:**
   - Open **National Material Master → Legacy Rationalization**. Show how old codes are mapped without deletion.
   - Open **Audit Trail**. Show the tamper-evident chronological event log recording the approvals and imports made in this session.

10. **Enterprise SAP Integration Readiness:**
    - Open **SAP / ERP Integration**.
    - Explain that current demo runs on synthetic CSVs with schema verification, and the integration layer is architected for production SAP S/4HANA (OData API) and SAP ECC 6.0 (RFC/BAPI).
