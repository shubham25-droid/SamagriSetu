/**
 * Real Data Match Candidates & Scenarios Derived from the 4 CPSE CSV Files
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import {
  ACTUAL_ONGC_RECORDS,
  ACTUAL_IOCL_RECORDS,
  ACTUAL_BHEL_RECORDS,
  ACTUAL_SAIL_RECORDS,
} from './actualCSVDataset';

// Helper to lookup record by code
function findRecord(cpse: string, code: string) {
  let list = ACTUAL_ONGC_RECORDS;
  if (cpse === 'IOCL') list = ACTUAL_IOCL_RECORDS;
  else if (cpse === 'BHEL') list = ACTUAL_BHEL_RECORDS;
  else if (cpse === 'SAIL') list = ACTUAL_SAIL_RECORDS;

  const found = list.find((r) => r.sourceMaterialCode === code);
  if (!found) {
    throw new Error(`Record ${code} not found in ${cpse} dataset.`);
  }
  return found;
}

export const ACTUAL_CSV_MATCH_CANDIDATES: MaterialMatchCandidate[] = [
  // ----------------------------------------------------
  // SCENARIO 1: SAME MATERIAL across ONGC, IOCL, SAIL (Globe Valve 2" CS CL150 SW)
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-001',
    scenarioId: 'SCENARIO_1_SAME_MATERIAL',
    scenarioLabel: 'Scenario 1: Cross-CPSE Identical Material Convergence (ONGC, IOCL, SAIL)',
    title: 'Globe Valve 2" (DN50) Carbon Steel Class 150 Socket Weld',
    sourceMaterials: [
      findRecord('ONGC', 'ONGC-0001'), // GLOBE VALVE 2 IN CARBON STEEL CL.150 SW
      findRecord('IOCL', 'IOCL-0001'), // GLOBE VALVE 2 IN CL.150 CARBON STEEL SW
      findRecord('SAIL', 'SAIL-0001'), // GLOBE VALVE DN50 CS CL150 SW
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.95,
    recommendedNationalCode: 'CNMC-000001',
    recommendedDescription: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, ASME Class 150, Socket Weld (SW), ASME B16.34',
    recommendedClassification: {
      category: 'Valves & Flow Control',
      subcategory: 'Globe Valve',
      unspscEquivalentCode: '40141603',
    },
    normalizedAttributes: {
      'Material Type': 'Globe Valve',
      'Nominal Size': '2 Inch (DN 50)',
      'Body Metallurgy': 'Carbon Steel (CS)',
      'Pressure Rating': 'Class 150 (CL.150 / CL150)',
      'Governing Standard': 'ASME B16.34',
      'End Connection': 'Socket Weld (SW)',
      'Normalized UOM': 'NOS',
    },
    technicalComparisons: [
      {
        attributeName: 'Material Type',
        sourceValues: { ONGC: 'Globe Valve', IOCL: 'Globe Valve', SAIL: 'Globe Valve' },
        normalizedValue: 'Globe Valve',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Size',
        sourceValues: { ONGC: '2 IN', IOCL: '2 IN', SAIL: 'DN50' },
        normalizedValue: '2 Inch (DN 50)',
        matchStatus: 'NORMALIZED_MATCH',
        notes: 'DN50 metric designation equals 2 inch nominal bore.',
      },
      {
        attributeName: 'Material Grade',
        sourceValues: { ONGC: 'CARBON STEEL', IOCL: 'CARBON STEEL', SAIL: 'CS' },
        normalizedValue: 'Carbon Steel',
        matchStatus: 'NORMALIZED_MATCH',
        notes: '"CS" normalized to Carbon Steel.',
      },
      {
        attributeName: 'Pressure Class',
        sourceValues: { ONGC: 'CL.150', IOCL: 'CL.150', SAIL: 'CL150' },
        normalizedValue: 'Class 150',
        matchStatus: 'NORMALIZED_MATCH',
        notes: 'CL.150 and CL150 represent identical ASME rating.',
      },
      {
        attributeName: 'Standard',
        sourceValues: { ONGC: 'ASME B16.34', IOCL: 'ASME B16.34', SAIL: 'ASME B16.34' },
        normalizedValue: 'ASME B16.34',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'End Connection',
        sourceValues: { ONGC: 'SW', IOCL: 'SW', SAIL: 'SW' },
        normalizedValue: 'Socket Weld (SW)',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Unit of Measure',
        sourceValues: { ONGC: 'NO', IOCL: 'NOS', SAIL: 'NO' },
        normalizedValue: 'NOS (Each)',
        matchStatus: 'NORMALIZED_MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Identical functional material type: Globe Valve across ONGC, IOCL, and SAIL', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Dimensional conversion verified: 2 IN == DN50', category: 'DIMENSIONAL', passed: true },
      { point: 'Metallurgy confirmed: Carbon Steel (CS)', category: 'METALLURGY', passed: true },
      { point: 'Pressure class verified: Class 150 across all 3 source files', category: 'PRESSURE_TEMP', passed: true },
      { point: 'Governing standard: ASME B16.34 compliant across all records', category: 'STANDARD_COMPLIANCE', passed: true },
      { point: 'UOM normalized from NO and NOS into standard National Unit', category: 'UOM', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 2: SAME MATERIAL across ALL 4 CPSEs (Ball Valve 2" SS316 150# SCRD)
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-002',
    scenarioId: 'SCENARIO_4_UNIT_NORMALIZATION',
    scenarioLabel: 'Scenario 2: Quad-CPSE Material Harmonization (ONGC, IOCL, BHEL, SAIL)',
    title: 'Ball Valve 2 Inch Stainless Steel 316 150# Screwed (SCRD)',
    sourceMaterials: [
      findRecord('ONGC', 'ONGC-0021'), // Ball Vlv 2 In Ss 316 150# Scrd
      findRecord('IOCL', 'IOCL-0022'), // BALL VALVE 2 INCH 316 SS 150# SCRD
      findRecord('BHEL', 'BHEL-0020'), // BALL VALVE 2 INCH SS 316 150# SCRD
      findRecord('SAIL', 'SAIL-0023'), // BALL VLV 2 INCH SS316 150# SCRD
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.97,
    recommendedNationalCode: 'CNMC-000002',
    recommendedDescription: 'Ball Valve, 2 Inch, Stainless Steel 316, Class 150 (150#), Screwed (SCRD), ASME B16.34',
    recommendedClassification: {
      category: 'Valves & Flow Control',
      subcategory: 'Ball Valve',
      unspscEquivalentCode: '40141607',
    },
    normalizedAttributes: {
      'Material Type': 'Ball Valve',
      'Nominal Size': '2 Inch',
      'Body Metallurgy': 'Stainless Steel 316 (SS316 / 316 SS)',
      'Pressure Rating': '150# (Class 150)',
      'Governing Standard': 'ASME B16.34',
      'End Connection': 'Screwed / Threaded (SCRD)',
      'Normalized UOM': 'NOS',
    },
    technicalComparisons: [
      {
        attributeName: 'Component Name',
        sourceValues: { ONGC: 'Ball Vlv', IOCL: 'BALL VALVE', BHEL: 'BALL VALVE', SAIL: 'BALL VLV' },
        normalizedValue: 'Ball Valve',
        matchStatus: 'NORMALIZED_MATCH',
        notes: '"Ball Vlv" normalized to Ball Valve.',
      },
      {
        attributeName: 'Size',
        sourceValues: { ONGC: '2 In', IOCL: '2 INCH', BHEL: '2 INCH', SAIL: '2 INCH' },
        normalizedValue: '2 Inch',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Metallurgy',
        sourceValues: { ONGC: 'Ss 316', IOCL: '316 SS', BHEL: 'SS 316', SAIL: 'SS316' },
        normalizedValue: 'Stainless Steel 316',
        matchStatus: 'MATCH',
        notes: 'SS316, 316 SS, and Ss 316 resolved to AISI 316 grade.',
      },
      {
        attributeName: 'Pressure Class',
        sourceValues: { ONGC: '150#', IOCL: '150#', BHEL: '150#', SAIL: '150#' },
        normalizedValue: 'Class 150 (150#)',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'End Connection',
        sourceValues: { ONGC: 'Scrd', IOCL: 'SCRD', BHEL: 'SCRD', SAIL: 'SCRD' },
        normalizedValue: 'Screwed (SCRD)',
        matchStatus: 'MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Complete 4-CPSE coverage confirmed across ONGC, IOCL, BHEL, and SAIL', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Identical nominal diameter (2 Inch) across all four records', category: 'DIMENSIONAL', passed: true },
      { point: 'Austenitic SS316 grade matches in all datasets', category: 'METALLURGY', passed: true },
      { point: 'Compatible 150# ASME rating', category: 'PRESSURE_TEMP', passed: true },
    ],
    reviewStatus: 'APPROVED',
    reviewerDecision: {
      action: 'APPROVE',
      reviewerName: 'Er. R. Sundaram (Chief Material Master Reviewer)',
      timestamp: '2026-09-17 11:20 IST',
      reason: 'Quad-CPSE match verified across all 4 uploaded CSV files.',
    },
  },

  // ----------------------------------------------------
  // SCENARIO 3: HARD TECHNICAL CONFLICT (Pressure Transmitter 0-25 Bar vs 0-100 Bar)
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-003',
    scenarioId: 'SCENARIO_2_HARD_CONFLICT',
    scenarioLabel: 'Scenario 3: Hard Technical Conflict (Pressure Transmitter 0-25 Bar vs 0-100 Bar)',
    title: 'Pressure Transmitter SS316 4-20mA (0-25 Bar vs 0-100 Bar Range Mismatch)',
    sourceMaterials: [
      findRecord('ONGC', 'ONGC-0036'), // PRESSURE TRANSMITTER 316 SS 4-20MA 0-25 BAR
      findRecord('IOCL', 'IOCL-0031'), // PRESSURE TRANSMITTER SS 316 4 TO 20 MA 0-25 BAR
      findRecord('ONGC', 'ONGC-0016'), // PRESSURE TRANSMITTER 4 TO 20 MA SS 316 0-100 BAR
    ],
    relationshipType: 'REQUIRES_REVIEW',
    confidence: 0.89,
    recommendedNationalCode: 'CNMC-CONFLICT-HOLD',
    recommendedDescription: 'Safety Hold: Pressure Transmitter 4-20mA SS316 with 400% Calibrated Span Discrepancy (0-25 Bar vs 0-100 Bar)',
    recommendedClassification: {
      category: 'Instrumentation & Sensors',
      subcategory: 'Pressure Transmitter',
    },
    normalizedAttributes: {
      'Instrument Type': 'Pressure Transmitter',
      'Wetted Material': 'Stainless Steel 316',
      'Signal Output': '4-20 mA HART',
      'Calibrated Range (Set A)': '0 - 25 Bar',
      'Calibrated Range (Set B)': '0 - 100 Bar',
    },
    technicalComparisons: [
      {
        attributeName: 'Instrument Type',
        sourceValues: { 'ONGC (0036)': 'Pressure Transmitter', 'IOCL (0031)': 'Pressure Transmitter', 'ONGC (0016)': 'Pressure Transmitter' },
        normalizedValue: 'Pressure Transmitter',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Wetted Metallurgy',
        sourceValues: { 'ONGC (0036)': '316 SS', 'IOCL (0031)': 'SS 316', 'ONGC (0016)': 'SS 316' },
        normalizedValue: 'SS 316',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Signal Output',
        sourceValues: { 'ONGC (0036)': '4-20MA', 'IOCL (0031)': '4 TO 20 MA', 'ONGC (0016)': '4 TO 20 MA' },
        normalizedValue: '4-20 mA HART',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Calibrated Measurement Range',
        sourceValues: { 'ONGC (0036)': '0-25 BAR', 'IOCL (0031)': '0-25 BAR', 'ONGC (0016)': '0-100 BAR' },
        normalizedValue: 'CONFLICT: 25 BAR vs 100 BAR',
        matchStatus: 'CONFLICT',
        notes: 'Critical calibration range difference: 100 Bar transmitter cannot replace 25 Bar without loss of loop resolution!',
      },
    ],
    conflicts: [
      {
        attribute: 'Measurement Span',
        severity: 'HARD_CONFLICT',
        description: 'ONGC-0036 / IOCL-0031 specify 0-25 Bar calibrated range, whereas ONGC-0016 specifies 0-100 Bar (4x range difference). High text similarity (89%), but merging would disrupt refinery distributed control loops.',
        conflictingValues: { 'ONGC-0036': '0-25 Bar', 'IOCL-0031': '0-25 Bar', 'ONGC-0016': '0-100 Bar' },
        impact: 'Auto-merge prohibited. Must retain as two distinct National Material Codes for safe DCS operation.',
      },
    ],
    evidence: [
      { point: 'Text similarity index is high (0.89) due to identical sensor phrases', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Safety Rule Triggered: Transmitter calibration ranges are incompatible (0-25 Bar vs 0-100 Bar)', category: 'PRESSURE_TEMP', passed: false },
      { point: 'National Harmonization Engine enforced automatic safety lock', category: 'STANDARD_COMPLIANCE', passed: false },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 4: Forged Union 2" A105 across ALL 4 CPSEs
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-004',
    title: 'Union 2 Inch Forged Carbon Steel ASTM A105 Threaded',
    sourceMaterials: [
      findRecord('ONGC', 'ONGC-0048'), // UNION 2 INCH ASTM A105 THREADED
      findRecord('IOCL', 'IOCL-0058'), // UNION 2" A105 THREADED
      findRecord('BHEL', 'BHEL-0078'), // UNION 2" ASTM A105 THREADED
      findRecord('SAIL', 'SAIL-0041'), // Union 2 Inch A105 Threaded
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.96,
    recommendedNationalCode: 'CNMC-000003',
    recommendedDescription: 'Union, 2 Inch, Forged Carbon Steel ASTM A105, Threaded NPT, ASME B16.11',
    recommendedClassification: {
      category: 'Pipes & Fittings',
      subcategory: 'Union',
      unspscEquivalentCode: '40173505',
    },
    normalizedAttributes: {
      'Fittings Type': 'Pipe Union',
      'Nominal Size': '2 Inch (2" / 2 INCH)',
      'Material Spec': 'Forged Carbon Steel ASTM A105',
      'End Connection': 'Threaded (NPT)',
      'Standard': 'ASME B16.11',
    },
    technicalComparisons: [
      {
        attributeName: 'Fitting Type',
        sourceValues: { ONGC: 'Union', IOCL: 'Union', BHEL: 'Union', SAIL: 'Union' },
        normalizedValue: 'Pipe Union',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Size',
        sourceValues: { ONGC: '2 INCH', IOCL: '2"', BHEL: '2"', SAIL: '2 Inch' },
        normalizedValue: '2 Inch',
        matchStatus: 'NORMALIZED_MATCH',
      },
      {
        attributeName: 'Material Grade',
        sourceValues: { ONGC: 'ASTM A105', IOCL: 'A105', BHEL: 'ASTM A105', SAIL: 'A105' },
        normalizedValue: 'ASTM A105',
        matchStatus: 'MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Verified across all 4 CPSE CSV files: ONGC, IOCL, BHEL, and SAIL', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Threaded connection standard: ASME B16.11 confirmed', category: 'STANDARD_COMPLIANCE', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 5: HARD TECHNICAL CONFLICT (Pipe 4" Sch 40 vs Sch 80 Wall Thickness)
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-005',
    scenarioId: 'SCENARIO_3_MATERIAL_GRADE',
    scenarioLabel: 'Scenario 5: Wall Thickness Schedule Conflict (SCH 40 vs SCH 80)',
    title: 'Seamless Pipe 4" A106 Gr B (Schedule 40 vs Schedule 80 Conflict)',
    sourceMaterials: [
      findRecord('ONGC', 'ONGC-0024'), // PIPE SEAMLESS CS PIPE A106 GRADE B 4 IN SCH40 SEAMLESS
      findRecord('IOCL', 'IOCL-0024'), // PIPE 4" SEAMLESS CS PIPE A106 GRADE B SCH80 SEAMLESS
    ],
    relationshipType: 'REQUIRES_REVIEW',
    confidence: 0.91,
    recommendedNationalCode: 'CNMC-CONFLICT-WALL',
    recommendedDescription: 'Technical Hold: 4 Inch Seamless Pipe A106 Gr B with Incompatible Schedule (SCH 40 vs SCH 80)',
    recommendedClassification: {
      category: 'Pipes & Fittings',
      subcategory: 'Pipe',
    },
    normalizedAttributes: {
      'Product Form': 'Seamless Pipe',
      'Nominal Diameter': '4 Inch',
      'Material Grade': 'ASTM A106 Grade B',
      'Wall Schedule ONGC': 'SCH 40 (6.02 mm wall)',
      'Wall Schedule IOCL': 'SCH 80 (8.56 mm wall)',
    },
    technicalComparisons: [
      {
        attributeName: 'Diameter',
        sourceValues: { ONGC: '4 IN', IOCL: '4"' },
        normalizedValue: '4 Inch (DN 100)',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Material Spec',
        sourceValues: { ONGC: 'A106 GRADE B', IOCL: 'A106 GRADE B' },
        normalizedValue: 'ASTM A106 Grade B',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Schedule (Wall Thickness)',
        sourceValues: { ONGC: 'SCH40', IOCL: 'SCH80' },
        normalizedValue: 'CONFLICT: SCH 40 vs SCH 80',
        matchStatus: 'CONFLICT',
        notes: 'Schedule 80 has a 42% thicker wall than Schedule 40. Flow area and pressure containment differ significantly.',
      },
    ],
    conflicts: [
      {
        attribute: 'Wall Thickness Schedule',
        severity: 'HARD_CONFLICT',
        description: 'ONGC specifies SCH 40 (6.02mm wall thickness, 102.3mm ID) whereas IOCL specifies SCH 80 (8.56mm wall thickness, 97.2mm ID). Mismatched internal diameter causes flow turbulence and flange weld mismatch.',
        conflictingValues: { 'ONGC-0024': 'SCH 40', 'IOCL-0024': 'SCH 80' },
        impact: 'High risk of pipeline over-pressurization if SCH 40 is installed in SCH 80 high-pressure line. Retain as separate codes.',
      },
    ],
    evidence: [
      { point: 'Text similarity index is 0.91 because only one word differs (SCH40 vs SCH80)', category: 'DIMENSIONAL', passed: false },
      { point: 'Engineering Safety Lock engaged: Schedule difference prevents automated merge', category: 'STANDARD_COMPLIANCE', passed: false },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 6: Deep Groove Ball Bearing 6205 across BHEL & SAIL
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-006',
    scenarioId: 'SCENARIO_5_NEAR_DUPLICATE',
    scenarioLabel: 'Scenario 6: Bearing Normalization & Near-Duplicate (BHEL & SAIL)',
    title: 'Deep Groove Ball Bearing 6205 Chromium Steel',
    sourceMaterials: [
      findRecord('BHEL', 'BHEL-0012'), // DEEP GROOVE BALL BEARING CHROME STL 6205
      findRecord('SAIL', 'SAIL-0015'), // DEEP GROOVE BALL BEARING CHROMIUM ALLOY STEEL 6205
      findRecord('SAIL', 'SAIL-0039'), // Deep Groove Ball Bearing Chr Steel 6205
    ],
    relationshipType: 'NEAR_DUPLICATE',
    confidence: 0.96,
    recommendedNationalCode: 'CNMC-000005',
    recommendedDescription: 'Deep Groove Ball Bearing, Chromium Alloy Steel, Size 6205, ISO 15 Standard',
    recommendedClassification: {
      category: 'Bearings & Power Transmission',
      subcategory: 'Deep Groove Ball Bearing',
      unspscEquivalentCode: '31171504',
    },
    normalizedAttributes: {
      'Bearing Type': 'Deep Groove Ball Bearing',
      'Bearing Designation': '6205 (Bore: 25mm, OD: 52mm, Width: 15mm)',
      'Material Grade': 'Chromium Alloy Steel (CHROME STL / CHR STEEL)',
      'Governing Standard': 'ISO 15',
    },
    technicalComparisons: [
      {
        attributeName: 'Bearing Designation',
        sourceValues: { BHEL: '6205', 'SAIL (0015)': '6205', 'SAIL (0039)': '6205' },
        normalizedValue: '6205',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Metallurgy',
        sourceValues: { BHEL: 'CHROME STL', 'SAIL (0015)': 'CHROMIUM ALLOY STEEL', 'SAIL (0039)': 'CHR STEEL' },
        normalizedValue: 'Chromium Alloy Steel',
        matchStatus: 'NORMALIZED_MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Standard ISO 15 radial ball bearing dimension 6205 matched', category: 'DIMENSIONAL', passed: true },
      { point: 'Normalized metallurgy acronyms: CHROME STL == CHR STEEL == CHROMIUM ALLOY STEEL', category: 'METALLURGY', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 7: Slip Ring Motor 3-Phase TEFC 415V 50Hz (BHEL & SAIL)
  // ----------------------------------------------------
  {
    id: 'MATCH-ACTUAL-007',
    scenarioId: 'SCENARIO_6_FUNCTIONALLY_EQUIVALENT',
    scenarioLabel: 'Scenario 7: Industrial Motor Harmonization (BHEL & SAIL)',
    title: 'Slip Ring Motor 3-Phase TEFC 415V 50Hz',
    sourceMaterials: [
      findRecord('BHEL', 'BHEL-0005'), // Slip Ring Motor 3Ph Tefc 415V 50Hz
      findRecord('SAIL', 'SAIL-0004'), // SLIP RING MOTOR 3PH TEFC 415V 50HZ
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.98,
    recommendedNationalCode: 'CNMC-000006',
    recommendedDescription: 'Slip Ring Induction Motor, 3-Phase, TEFC Enclosure, 415V, 50Hz, IS 325 Standard',
    recommendedClassification: {
      category: 'Electrical Motors & Drives',
      subcategory: 'Slip Ring Motor',
      unspscEquivalentCode: '26101202',
    },
    normalizedAttributes: {
      'Motor Type': 'Slip Ring Motor',
      'Phase': '3-Phase (3PH)',
      'Enclosure': 'Totally Enclosed Fan Cooled (TEFC)',
      'Voltage Rating': '415V AC, 50 Hz',
      'Standard': 'IS 325',
    },
    technicalComparisons: [
      {
        attributeName: 'Electrical Phase',
        sourceValues: { BHEL: '3Ph', SAIL: '3PH' },
        normalizedValue: '3-Phase',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Enclosure Rating',
        sourceValues: { BHEL: 'TEFC', SAIL: 'TEFC' },
        normalizedValue: 'TEFC',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Voltage & Frequency',
        sourceValues: { BHEL: '415V 50Hz', SAIL: '415V 50HZ' },
        normalizedValue: '415V, 50 Hz',
        matchStatus: 'MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Identical electrical specifications across heavy engineering & steel plant masters', category: 'STANDARD_COMPLIANCE', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },
];

export const ACTUAL_INITIAL_NATIONAL_MATERIALS = [
  {
    nationalCode: 'CNMC-000002',
    standardDescription: 'Ball Valve, 2 Inch, Stainless Steel 316, Class 150 (150#), Screwed (SCRD), ASME B16.34',
    category: 'Valves & Flow Control',
    subcategory: 'Ball Valve',
    normalizedAttributes: {
      materialType: 'Ball Valve',
      nominalSize: '2 Inch',
      bodyMaterial: 'Stainless Steel 316 (SS316 / 316 SS)',
      pressureRating: 'ASME Class 150 (150#)',
      governingStandard: 'ASME B16.34',
      endConnection: 'Screwed / Threaded (SCRD)',
      normalizedUom: 'NOS',
    },
    mappedSourceRecords: [
      {
        cpse: 'ONGC',
        sourceCode: 'ONGC-0021',
        originalDescription: 'Ball Vlv 2 In Ss 316 150# Scrd',
        uom: 'EA',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP S/4HANA (ONGC E&P)',
      },
      {
        cpse: 'IOCL',
        sourceCode: 'IOCL-0022',
        originalDescription: 'BALL VALVE 2 INCH 316 SS 150# SCRD',
        uom: 'NOS',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP ECC 6.0 (IOCL Refineries)',
      },
      {
        cpse: 'BHEL',
        sourceCode: 'BHEL-0020',
        originalDescription: 'BALL VALVE 2 INCH SS 316 150# SCRD',
        uom: 'NO',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP ECC 6.0 (BHEL Trichy)',
      },
      {
        cpse: 'SAIL',
        sourceCode: 'SAIL-0023',
        originalDescription: 'BALL VLV 2 INCH SS316 150# SCRD',
        uom: 'NOS',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP S/4HANA (SAIL Bhilai)',
      },
    ],
    approvalStatus: 'APPROVED' as const,
    approvedBy: 'Er. R. Sundaram (Chief Material Master Reviewer)',
    approvalTimestamp: '2026-09-17 11:20 IST',
    reviewerNotes: 'Verified full quad-CPSE harmonization across ONGC, IOCL, BHEL, and SAIL uploaded CSV datasets.',
    lastUpdated: '2026-09-17 11:20 IST',
    coverageCount: 4,
  },
  {
    nationalCode: 'CNMC-000003',
    standardDescription: 'Union, 2 Inch, Forged Carbon Steel ASTM A105, Threaded NPT, ASME B16.11',
    category: 'Pipes & Fittings',
    subcategory: 'Union',
    normalizedAttributes: {
      materialType: 'Pipe Union',
      nominalSize: '2 Inch',
      bodyMaterial: 'Forged Carbon Steel ASTM A105',
      pressureRating: 'Specified per ASME B16.11',
      governingStandard: 'ASME B16.11',
      endConnection: 'Threaded (NPT)',
      normalizedUom: 'NOS',
    },
    mappedSourceRecords: [
      {
        cpse: 'ONGC',
        sourceCode: 'ONGC-0048',
        originalDescription: 'UNION 2 INCH ASTM A105 THREADED',
        uom: 'EACH',
        mappedAt: '2026-09-17 10:15 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP S/4HANA',
      },
      {
        cpse: 'IOCL',
        sourceCode: 'IOCL-0058',
        originalDescription: 'UNION 2" A105 THREADED',
        uom: 'NO',
        mappedAt: '2026-09-17 10:15 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP ECC 6.0',
      },
      {
        cpse: 'BHEL',
        sourceCode: 'BHEL-0078',
        originalDescription: 'UNION 2" ASTM A105 THREADED',
        uom: 'NOS',
        mappedAt: '2026-09-17 10:15 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP ECC 6.0',
      },
      {
        cpse: 'SAIL',
        sourceCode: 'SAIL-0041',
        originalDescription: 'Union 2 Inch A105 Threaded',
        uom: 'EACH',
        mappedAt: '2026-09-17 10:15 IST',
        mappingStatus: 'MAPPED' as const,
        erpSystemOrigin: 'SAP S/4HANA',
      },
    ],
    approvalStatus: 'APPROVED' as const,
    approvedBy: 'Er. R. Sundaram (Chief Material Master Reviewer)',
    approvalTimestamp: '2026-09-17 10:15 IST',
    reviewerNotes: 'Quad-CPSE verified for forged carbon steel union (2 inch NPT).',
    lastUpdated: '2026-09-17 10:15 IST',
    coverageCount: 4,
  },
];

