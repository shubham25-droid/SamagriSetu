/**
 * Enterprise Report & CSV Export Service
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import { NationalMaterialService } from './NationalMaterialService';
import { MaterialMatchingService } from './MaterialMatchingService';
import { AuditTrailService } from './AuditTrailService';
import { CPSEDataImportService } from './CPSEDataImportService';

class ExportServiceImpl {
  /**
   * Helper to trigger browser CSV download
   */
  private downloadCSV(csvContent: string, fileName: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export National Material Master
   */
  public exportNationalMaterialMaster(): void {
    const materials = NationalMaterialService.getNationalMaterials();
    const headers = [
      'Common National Material Code',
      'Standardized Description',
      'Category',
      'Subcategory',
      'CPSE Coverage Count',
      'Approval Status',
      'Approved By',
      'Last Updated',
    ];

    const rows = materials.map((m) => [
      `"${m.nationalCode}"`,
      `"${m.standardDescription.replace(/"/g, '""')}"`,
      `"${m.category}"`,
      `"${m.subcategory}"`,
      m.coverageCount,
      `"${m.approvalStatus}"`,
      `"${m.approvedBy || 'Pending'}"`,
      `"${m.lastUpdated}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    this.downloadCSV(csv, `National_Material_Master_${new Date().toISOString().split('T')[0]}.csv`);

    AuditTrailService.logEvent({
      user: 'Material Master Reviewer',
      role: 'Governance Officer',
      action: 'EXPORT_REPORT_GENERATED',
      materialCode: 'ALL_NATIONAL_MATERIALS',
      previousState: 'Active Master',
      newState: 'Exported CSV',
      reason: 'Exported official National Material Master registry',
      source: 'Export Engine',
    });
  }

  /**
   * Export CPSE Legacy Code Mappings
   */
  public exportCPSELegacyMappings(): void {
    const mappings = NationalMaterialService.getAllLegacyMappings();
    const headers = [
      'Common National Material Code',
      'National Standard Description',
      'CPSE',
      'Original CPSE Material Code',
      'Original Material Description',
      'Original UOM',
      'Mapping Status',
      'ERP System Origin',
      'Mapped Date',
    ];

    const rows = mappings.map((m) => [
      `"${m.nationalCode}"`,
      `"${m.standardDescription.replace(/"/g, '""')}"`,
      `"${m.cpse}"`,
      `"${m.sourceCode}"`,
      `"${m.originalDescription.replace(/"/g, '""')}"`,
      `"${m.uom}"`,
      `"${m.mappingStatus}"`,
      `"${m.erpSystemOrigin}"`,
      `"${m.mappedAt}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    this.downloadCSV(csv, `CPSE_Material_Mappings_Traceability_${new Date().toISOString().split('T')[0]}.csv`);
  }

  /**
   * Export Audit Trail
   */
  public exportAuditTrail(): void {
    const events = AuditTrailService.getEvents();
    const headers = [
      'Event ID',
      'Timestamp',
      'User',
      'Role',
      'Action',
      'Material Code',
      'Previous State',
      'New State',
      'Governance Reason',
      'Source',
    ];

    const rows = events.map((e) => [
      `"${e.id}"`,
      `"${e.timestamp}"`,
      `"${e.user}"`,
      `"${e.role}"`,
      `"${e.action}"`,
      `"${e.materialCode}"`,
      `"${e.previousState}"`,
      `"${e.newState}"`,
      `"${e.reason.replace(/"/g, '""')}"`,
      `"${e.source}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    this.downloadCSV(csv, `National_Material_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`);
  }

  /**
   * Export Harmonization Candidates Report
   */
  public exportHarmonizationCandidates(): void {
    const candidates = MaterialMatchingService.getCandidates();
    const headers = [
      'Candidate ID',
      'Title',
      'Relationship Classification',
      'Demo Matching Confidence',
      'Recommended National Code',
      'Recommended Standard Description',
      'CPSEs Involved',
      'Conflict Flag',
      'Review Status',
    ];

    const rows = candidates.map((c) => [
      `"${c.id}"`,
      `"${c.title}"`,
      `"${c.relationshipType}"`,
      `"${(c.confidence * 100).toFixed(0)}%"`,
      `"${c.recommendedNationalCode}"`,
      `"${c.recommendedDescription.replace(/"/g, '""')}"`,
      `"${c.sourceMaterials.map((s) => s.cpse).join('; ')}"`,
      `"${c.conflicts.length > 0 ? 'YES: ' + c.conflicts[0].attribute : 'NO'}"`,
      `"${c.reviewStatus}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    this.downloadCSV(csv, `Harmonization_Review_Summary_${new Date().toISOString().split('T')[0]}.csv`);
  }

  /**
   * Export Ingested CPSE Source Records (All or Custom Filtered)
   */
  public exportAllSourceRecords(customRecords?: any[]): void {
    const records = customRecords && customRecords.length > 0
      ? customRecords
      : CPSEDataImportService.getAllImportedRecords();

    const headers = [
      'CPSE',
      'Source Material Code',
      'Original Description',
      'UOM',
      'Category',
      'Size',
      'Grade',
      'Pressure Rating',
      'Standard',
      'Specification'
    ];

    const rows = records.map((r) => [
      `"${r.cpse || ''}"`,
      `"${r.sourceMaterialCode || r.material_code || ''}"`,
      `"${(r.originalDescription || r.material_description || '').replace(/"/g, '""')}"`,
      `"${r.uom || ''}"`,
      `"${r.materialCategory || r.category || ''}"`,
      `"${r.size || ''}"`,
      `"${r.materialGrade || r.material_grade || ''}"`,
      `"${r.pressureRating || r.pressure_rating || ''}"`,
      `"${r.standard || ''}"`,
      `"${r.specification || ''}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    this.downloadCSV(csv, `CPSE_Source_Records_${new Date().toISOString().split('T')[0]}.csv`);
  }
}

export const ExportService = new ExportServiceImpl();
