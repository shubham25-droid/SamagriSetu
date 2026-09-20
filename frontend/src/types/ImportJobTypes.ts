/**
 * Import Job and Data Ingestion Types
 * BodhZ - SIH26099
 */

export interface ImportValidationError {
  row: number;
  field: string;
  sourceValue: string;
  issue: string;
}

export interface ImportJob {
  id: string;
  cpse: string; // 'ONGC' | 'IOCL' | 'BHEL'
  fileName: string;
  recordsCount: number;
  validRecordsCount: number;
  invalidRecordsCount: number;
  importedBy: string;
  importDate: string;
  status: 'IMPORTED' | 'VALIDATION_FAILED' | 'PROCESSING';
  sourceType: 'SYNTHETIC_CSV' | 'CSV_UPLOAD' | 'EXCEL_UPLOAD';
  validationErrors: ImportValidationError[];
}
