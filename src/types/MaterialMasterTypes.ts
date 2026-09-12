/**
 * Domain Models for Source CPSE Materials and Unified National Materials
 * BodhZ - SIH26099
 * Ministry of Petroleum & Natural Gas - CPCL
 */

export type CPSEIdentifier = 'ONGC' | 'IOCL' | 'BHEL' | string;

export interface MaterialRecord {
  id: string;
  cpse: CPSEIdentifier;
  sourceMaterialCode: string; // e.g. 'ONGC-4582', 'IOCL-7811'
  originalMaterialCode?: string; // alias for sourceMaterialCode
  originalDescription: string; // e.g. 'BALL VALVE 2 IN CS CL150'
  normalizedDescription?: string; // e.g. 'BALL VALVE, 2 INCH, CARBON STEEL, CLASS 150'
  materialCategory: string; // e.g. 'Piping & Valves'
  materialSubcategory: string; // e.g. 'Ball Valves'
  uom: string; // e.g. 'EA', 'NOS', 'PCS'
  materialGrade?: string; // e.g. 'Carbon Steel A105', 'SS304', 'SS316'
  size?: string; // e.g. '2 IN', '50MM', '2"'
  diameter?: string;
  length?: string;
  pressureRating?: string; // e.g. 'CL150', 'Class 150', '150 LB', 'CL300'
  temperatureRating?: string; // e.g. '-29C to 200C'
  standard?: string; // e.g. 'API 6D', 'ASME B16.34', 'IS 1364'
  specification?: string; // e.g. 'Reduced Bore, Flanged RF'
  manufacturer?: string; // e.g. 'Audco', 'L&T', 'Generic'
  modelNumber?: string;
  connectionType?: string; // e.g. 'Flanged RF', 'Threaded NPT'
  criticalAttributes: Record<string, string>;
  technicalAttributes?: Record<string, string>; // flexible attribute map per category
  status?: string; // e.g. 'INGESTED', 'NORMALIZED', 'MATCHED', 'HARMONIZED'
  nationalMaterialCode?: string; // Recommended CNMC
  createdAt: string;
  updatedAt?: string;
  sourceFile?: string; // e.g. 'ONGC.csv', 'IOCL.csv'
  sourceRow?: number; // e.g. 14
}


export interface MappedSourceCode {
  cpse: CPSEIdentifier;
  sourceCode: string;
  originalDescription: string;
  uom: string;
  mappedAt: string;
  mappingStatus: 'MAPPED' | 'PENDING_APPROVAL' | 'POTENTIAL_DUPLICATE' | 'RETAIN_SEPARATELY' | 'NEEDS_REVIEW';
  erpSystemOrigin: string;
}

export interface NationalMaterial {
  nationalCode: string; // e.g. 'CNMC-000184' (Recommended/Approved Common National Material Code)
  standardDescription: string; // e.g. 'Ball Valve, 2 Inch, Carbon Steel, Class 150, API 6D, Flanged RF'
  category: string; // e.g. 'Piping & Valves'
  subcategory: string; // e.g. 'Ball Valves'
  normalizedAttributes: {
    materialType: string;
    nominalSize: string;
    bodyMaterial: string;
    pressureRating: string;
    governingStandard: string;
    endConnection: string;
    normalizedUom: string;
    [key: string]: string;
  };
  mappedSourceRecords: MappedSourceCode[];
  approvalStatus: 'AI_RECOMMENDED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'MODIFIED_AND_APPROVED';
  approvedBy?: string;
  approvalTimestamp?: string;
  rejectionReason?: string;
  reviewerNotes?: string;
  lastUpdated: string;
  coverageCount: number; // Number of distinct CPSEs mapped
}
