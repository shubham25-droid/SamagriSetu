/**
 * CPSE Data Import & Validation Service
 * BodhZ - SIH26099
 * 
 * Handles CSV parsing, schema validation, quality checks, and demo dataset loading
 * from the 4 actual uploaded CPSE files: ONGC.csv, IOCL.csv, BHEL.csv, SAIL.csv.
 */

import { MaterialRecord } from '../types/MaterialMasterTypes';
import { ImportJob, ImportValidationError } from '../types/ImportJobTypes';
import {
  ACTUAL_ONGC_RECORDS,
  ACTUAL_IOCL_RECORDS,
  ACTUAL_BHEL_RECORDS,
  ACTUAL_SAIL_RECORDS,
} from '../data/actualCSVDataset';
import { AuditTrailService } from './AuditTrailService';

export const INITIAL_REAL_IMPORT_JOBS: ImportJob[] = [
  {
    id: 'IMP-JOB-ONGC',
    cpse: 'ONGC',
    fileName: 'ONGC.csv',
    recordsCount: 100,
    validRecordsCount: 100,
    invalidRecordsCount: 0,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 08:30 IST',
    status: 'IMPORTED',
    sourceType: 'CSV_UPLOAD',
    validationErrors: [],
  },
  {
    id: 'IMP-JOB-IOCL',
    cpse: 'IOCL',
    fileName: 'IOCL.csv',
    recordsCount: 100,
    validRecordsCount: 100,
    invalidRecordsCount: 0,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 09:15 IST',
    status: 'IMPORTED',
    sourceType: 'CSV_UPLOAD',
    validationErrors: [],
  },
  {
    id: 'IMP-JOB-BHEL',
    cpse: 'BHEL',
    fileName: 'BHEL.csv',
    recordsCount: 100,
    validRecordsCount: 100,
    invalidRecordsCount: 0,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 10:00 IST',
    status: 'IMPORTED',
    sourceType: 'CSV_UPLOAD',
    validationErrors: [],
  },
  {
    id: 'IMP-JOB-SAIL',
    cpse: 'SAIL',
    fileName: 'SAIL.csv',
    recordsCount: 100,
    validRecordsCount: 100,
    invalidRecordsCount: 0,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 10:30 IST',
    status: 'IMPORTED',
    sourceType: 'CSV_UPLOAD',
    validationErrors: [],
  },
];

class CPSEDataImportServiceImpl {
  private importJobs: ImportJob[] = [...INITIAL_REAL_IMPORT_JOBS];
  private importedRecords: Map<string, MaterialRecord[]> = new Map();

  constructor() {
    // Pre-populate with all 4 actual CPSE datasets (400 records total)
    this.importedRecords.set('ONGC', [...ACTUAL_ONGC_RECORDS]);
    this.importedRecords.set('IOCL', [...ACTUAL_IOCL_RECORDS]);
    this.importedRecords.set('BHEL', [...ACTUAL_BHEL_RECORDS]);
    this.importedRecords.set('SAIL', [...ACTUAL_SAIL_RECORDS]);
  }

  public getImportJobs(): ImportJob[] {
    return [...this.importJobs];
  }

  public getRecordsByCPSE(cpse: string): MaterialRecord[] {
    return this.importedRecords.get(cpse) || [];
  }

  public getAllImportedRecords(): MaterialRecord[] {
    const all: MaterialRecord[] = [];
    this.importedRecords.forEach((records) => {
      all.push(...records);
    });
    return all;
  }

  /**
   * Load demo dataset for a selected CPSE from the 4 actual CSV files
   */
  public loadSyntheticDataset(cpse: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL'): {
    job: ImportJob;
    records: MaterialRecord[];
  } {
    let sourceRecords: MaterialRecord[] = [];
    let fileName = `${cpse}.csv`;

    if (cpse === 'ONGC') {
      sourceRecords = [...ACTUAL_ONGC_RECORDS];
    } else if (cpse === 'IOCL') {
      sourceRecords = [...ACTUAL_IOCL_RECORDS];
    } else if (cpse === 'BHEL') {
      sourceRecords = [...ACTUAL_BHEL_RECORDS];
    } else {
      sourceRecords = [...ACTUAL_SAIL_RECORDS];
    }

    this.importedRecords.set(cpse, sourceRecords);

    const newJob: ImportJob = {
      id: `IMP-JOB-${cpse}-${Date.now().toString().slice(-4)}`,
      cpse,
      fileName,
      recordsCount: sourceRecords.length,
      validRecordsCount: sourceRecords.length,
      invalidRecordsCount: 0,
      importedBy: 'Demo Reviewer (CPCL)',
      importDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'IMPORTED',
      sourceType: 'CSV_UPLOAD',
      validationErrors: [],
    };

    this.importJobs.unshift(newJob);

    AuditTrailService.logEvent({
      user: 'Demo Reviewer (CPCL)',
      role: 'Material Master Specialist',
      action: 'DATASET_IMPORT',
      materialCode: `BATCH-${cpse}-${Date.now().toString().slice(-4)}`,
      previousState: 'Unloaded',
      newState: `${sourceRecords.length} records ingested from ${fileName}`,
      reason: `Loaded demo dataset from uploaded ${fileName}`,
      source: 'CPSE Data Ingestion Pipeline',
      participatingCPSEs: [cpse],
    });

    return { job: newJob, records: sourceRecords };
  }

  /**
   * Load ALL 4 CPSE Datasets simultaneously
   */
  public loadAllDemoDatasets(): {
    totalRecords: number;
    countByCPSE: Record<string, number>;
  } {
    this.importedRecords.set('ONGC', [...ACTUAL_ONGC_RECORDS]);
    this.importedRecords.set('IOCL', [...ACTUAL_IOCL_RECORDS]);
    this.importedRecords.set('BHEL', [...ACTUAL_BHEL_RECORDS]);
    this.importedRecords.set('SAIL', [...ACTUAL_SAIL_RECORDS]);

    AuditTrailService.logEvent({
      user: 'Demo Reviewer (CPCL)',
      role: 'Material Master Specialist',
      action: 'DATASET_IMPORT',
      materialCode: 'BATCH-ALL-4-CPSES',
      previousState: 'Unloaded',
      newState: '400 records ingested across ONGC, IOCL, BHEL, and SAIL',
      reason: 'Batch ingestion of all four demo datasets for cross-CPSE harmonization evaluation',
      source: 'CPSE Data Ingestion Pipeline',
      participatingCPSEs: ['ONGC', 'IOCL', 'BHEL', 'SAIL'],
    });

    return {
      totalRecords: 400,
      countByCPSE: {
        ONGC: 100,
        IOCL: 100,
        BHEL: 100,
        SAIL: 100,
      },
    };
  }

  /**
   * Parse and validate custom CSV data uploaded by user.
   * Tolerant and robust: auto-detects column names (Code, Description, UOM, Size, Rating, etc.)
   * and auto-extracts mechanical parameters from the description if columns are absent.
   */
  public parseAndValidateCSV(
    csvContent: string,
    cpse: string,
    fileName: string
  ): {
    validRecords: MaterialRecord[];
    errors: ImportValidationError[];
    summary: {
      totalRows: number;
      validCount: number;
      invalidCount: number;
    };
  } {
    const lines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      throw new Error('CSV file must contain a header row and at least one data row.');
    }

    // Parse header row
    const rawHeaders = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
    const lowerHeaders = rawHeaders.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

    // Smart column finder
    const findCol = (patterns: RegExp[]): number => {
      for (let i = 0; i < lowerHeaders.length; i++) {
        for (const p of patterns) {
          if (p.test(lowerHeaders[i])) return i;
        }
      }
      return -1;
    };

    let codeIdx = findCol([
      /^materialcode$/, /^materialid$/, /^itemcode$/, /^partnumber$/, /^partno$/,
      /^code$/, /^matnr$/, /^matno$/, /^itemno$/, /^id$/, /^slno$/, /^srno$/, /^recordid$/, /^item$/
    ]);

    let descIdx = findCol([
      /^materialdescription$/, /^description$/, /^originaldescription$/, /^itemdescription$/,
      /^desc$/, /^itemname$/, /^materialname$/, /^shorttext$/, /^specification$/, /^spec$/, /^title$/, /^text$/
    ]);

    const uomIdx = findCol([/^uom$/, /^unit$/, /^unitofmeasure$/, /^u_o_m$/, /^measunit$/]);
    const typeIdx = findCol([/^materialcategory$/, /^category$/, /^materialtype$/, /^type$/, /^subcategory$/, /^group$/]);
    const sizeIdx = findCol([/^size$/, /^nominalsize$/, /^diameter$/, /^dn$/, /^nb$/, /^dim$/, /^dimensions?$/]);
    const pressureIdx = findCol([/^pressurerating$/, /^pressure$/, /^class$/, /^rating$/, /^press?class$/, /^lb$/]);
    const gradeIdx = findCol([/^materialgrade$/, /^grade$/, /^metallurgy$/, /^material$/, /^alloy$/]);
    const standardIdx = findCol([/^standard$/, /^standards$/, /^specstandard$/, /^astm$/, /^isstandard$/]);
    const specIdx = findCol([/^spec$/, /^specification$/, /^details$/, /^remarks$/]);

    // Fallbacks if not explicitly found
    if (descIdx === -1) {
      // Find the column with the longest average text in the first 4 data rows
      let bestCol = 1 < rawHeaders.length ? 1 : 0;
      let maxLen = 0;
      for (let c = 0; c < rawHeaders.length; c++) {
        if (c === codeIdx) continue;
        const sampleLen = lines.slice(1, 4).reduce((acc, l) => acc + (l.split(',')[c]?.length || 0), 0);
        if (sampleLen > maxLen) {
          maxLen = sampleLen;
          bestCol = c;
        }
      }
      descIdx = bestCol;
    }

    if (codeIdx === -1) {
      codeIdx = descIdx === 0 && rawHeaders.length > 1 ? 1 : 0;
    }

    const errors: ImportValidationError[] = [];
    const validRecords: MaterialRecord[] = [];
    const seenCodes = new Set<string>();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split line respecting quotes
      const cols: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch === '"') {
          if (inQuotes && line[c + 1] === '"') {
            cur += '"';
            c++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === ',' && !inQuotes) {
          cols.push(cur.trim().replace(/^["']|["']$/g, ''));
          cur = '';
        } else {
          cur += ch;
        }
      }
      cols.push(cur.trim().replace(/^["']|["']$/g, ''));

      const rowIdx = i + 1;
      let code = (codeIdx !== -1 ? cols[codeIdx] : '') || `REC-${i.toString().padStart(4, '0')}`;
      const desc = (descIdx !== -1 ? cols[descIdx] : '') || cols[0] || '';

      if (!desc || desc.length < 2) {
        errors.push({ row: rowIdx, field: 'material_description', sourceValue: desc, issue: 'Description is too short or missing' });
        continue;
      }

      if (seenCodes.has(code)) {
        code = `${code}-${i}`;
      }
      seenCodes.add(code);

      // Auto-extract attributes using NLP regex if columns were not separate
      const uom = (uomIdx !== -1 ? cols[uomIdx] : '') || 'NOS';
      let type = (typeIdx !== -1 ? cols[typeIdx] : '') || '';
      let size = (sizeIdx !== -1 ? cols[sizeIdx] : '') || '';
      let grade = (gradeIdx !== -1 ? cols[gradeIdx] : '') || '';
      let pressure = (pressureIdx !== -1 ? cols[pressureIdx] : '') || '';
      let standard = (standardIdx !== -1 ? cols[standardIdx] : '') || '';
      const spec = (specIdx !== -1 ? cols[specIdx] : '') || '';

      // NLP Extraction from description if not in explicit columns
      if (!type) {
        if (/valve/i.test(desc)) type = 'Valves';
        else if (/pipe|tube|casing/i.test(desc)) type = 'Pipes & Tubes';
        else if (/flange/i.test(desc)) type = 'Flanges';
        else if (/gasket/i.test(desc)) type = 'Gaskets & Sealing';
        else if (/bearing/i.test(desc)) type = 'Bearings';
        else if (/transmitter|gauge|meter/i.test(desc)) type = 'Instrumentation';
        else type = 'General Engineering Spares';
      }

      if (!size) {
        const sMatch = desc.match(/\b(\d+(?:\.\d+)?\s*(?:INCH|IN|NB|MM|DN|")|\bDN\s*\d+|\b\d+\s*NB)\b/i);
        if (sMatch) size = sMatch[0];
      }

      if (!pressure) {
        const pMatch = desc.match(/\b(CLASS\s*\d+|CL\.?\s*\d+|\d+\s*#|\d+\s*LB|\bPN\s*\d+)\b/i);
        if (pMatch) pressure = pMatch[0];
      }

      if (!grade) {
        const gMatch = desc.match(/\b(CARBON\s*STEEL|CS|ASTM\s*A\d+(?:\s*GR\.?\s*[A-Z0-9]+)?|A216\s*WCB|SS\s*316L?|SS\s*304L?|ALLOY\s*STEEL|CAST\s*IRON)\b/i);
        if (gMatch) grade = gMatch[0];
      }

      if (!standard) {
        const stdMatch = desc.match(/\b(API\s*6D|ASME\s*B16\.\d+|ASTM\s*A\d+|IS\s*\d+)\b/i);
        if (stdMatch) standard = stdMatch[0];
      }

      validRecords.push({
        id: `rec-upload-${Date.now()}-${i}`,
        cpse,
        sourceMaterialCode: code,
        originalDescription: desc,
        materialCategory: type,
        materialSubcategory: type,
        uom: uom.toUpperCase(),
        materialGrade: grade === 'N/A' ? '' : grade,
        size: size === 'N/A' ? '' : size,
        pressureRating: pressure === 'N/A' ? '' : pressure,
        standard: standard === 'N/A' ? '' : standard,
        specification: spec === 'N/A' ? '' : spec,
        criticalAttributes: {
          'Material Type': type,
          ...(size && size !== 'N/A' ? { 'Size': size } : {}),
          ...(grade && grade !== 'N/A' ? { 'Grade': grade } : {}),
          ...(pressure && pressure !== 'N/A' ? { 'Pressure Rating': pressure } : {}),
          ...(standard && standard !== 'N/A' ? { 'Standard': standard } : {}),
          ...(spec && spec !== 'N/A' ? { 'Specification': spec } : {}),
        },
        createdAt: new Date().toISOString().split('T')[0],
        sourceFile: fileName,
        sourceRow: rowIdx,
      });
    }

    if (validRecords.length > 0) {
      const existing = this.importedRecords.get(cpse) || [];
      this.importedRecords.set(cpse, [...existing, ...validRecords]);

      const job: ImportJob = {
        id: `IMP-JOB-${Date.now().toString().slice(-4)}`,
        cpse,
        fileName,
        recordsCount: lines.length - 1,
        validRecordsCount: validRecords.length,
        invalidRecordsCount: errors.length,
        importedBy: 'CPSE Review Officer',
        importDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
        status: errors.length > 0 && validRecords.length === 0 ? 'VALIDATION_FAILED' : 'IMPORTED',
        sourceType: 'CSV_UPLOAD',
        validationErrors: errors,
      };

      this.importJobs.unshift(job);

      AuditTrailService.logEvent({
        user: 'CPCL Reviewer',
        role: 'Material Master Ingestion Officer',
        action: 'DATASET_IMPORT',
        materialCode: `UPLOAD-${cpse}-${fileName}`,
        previousState: 'File Uploaded',
        newState: `${validRecords.length} records accepted, ${errors.length} rejected`,
        reason: `User CSV file import with schema validation: ${fileName}`,
        source: 'CSV Import Engine',
        participatingCPSEs: [cpse],
      });
    }

    return {
      validRecords,
      errors,
      summary: {
        totalRows: lines.length - 1,
        validCount: validRecords.length,
        invalidCount: errors.length,
      },
    };
  }
}

export const CPSEDataImportService = new CPSEDataImportServiceImpl();
