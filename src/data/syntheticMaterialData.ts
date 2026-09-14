/**
 * Synthetic Demo Material Datasets & Curated Judge Scenarios
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * DISCLAIMER:
 * Demo Environment - Synthetic Material Master Data.
 * Not real confidential CPSE data. Generated strictly for prototype evaluation.
 */

import { MaterialRecord, NationalMaterial } from '../types/MaterialMasterTypes';
import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import { ImportJob } from '../types/ImportJobTypes';
import { AuditEvent } from '../types/AuditTrailTypes';

// ==========================================
// 1. SYNTHETIC RAW MATERIAL RECORDS
// ==========================================

export const SYNTHETIC_ONGC_MATERIALS: MaterialRecord[] = [
  {
    id: 'rec-ongc-001',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-4582',
    originalDescription: 'BALL VALVE 2 IN CS CL150',
    materialCategory: 'Valves & Flow Control',
    materialSubcategory: 'Ball Valves',
    uom: 'EA',
    materialGrade: 'Carbon Steel ASTM A216 WCB',
    size: '2 IN',
    diameter: '50 mm',
    pressureRating: 'CL150',
    temperatureRating: '-29C to 200C',
    standard: 'API 6D',
    specification: 'Reduced Bore, Raised Face Flanged',
    manufacturer: 'Generic Industrial',
    connectionType: 'Flanged RF',
    criticalAttributes: { 'Body Material': 'CS A216 WCB', 'Bore': 'Reduced', 'Seat': 'PTFE' },
    createdAt: '2024-03-12',
  },
  {
    id: 'rec-ongc-002',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-5102',
    originalDescription: 'BALL VALVE 2 IN CS CL150 RF',
    materialCategory: 'Valves & Flow Control',
    materialSubcategory: 'Ball Valves',
    uom: 'NOS',
    materialGrade: 'Carbon Steel A105 / WCB',
    size: '2 IN',
    pressureRating: 'CL150',
    standard: 'API 6D',
    connectionType: 'Flanged RF',
    criticalAttributes: { 'Pressure Class': '150' },
    createdAt: '2024-05-18',
  },
  {
    id: 'rec-ongc-003',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-3312',
    originalDescription: 'HEX BOLT M16 X 75 SS304 WITH NUT',
    materialCategory: 'Fasteners & Hardware',
    materialSubcategory: 'Bolts & Nuts',
    uom: 'PCS',
    materialGrade: 'SS304 (AISI 304)',
    size: 'M16',
    length: '75 mm',
    standard: 'IS 1364 / ISO 4014',
    specification: 'Full Thread Hexagon Bolt with Heavy Hex Nut',
    criticalAttributes: { 'Metallurgy': 'SS304 (Austenitic)', 'Thread Pitch': '2.0mm' },
    createdAt: '2023-11-04',
  },
  {
    id: 'rec-ongc-004',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-8840',
    originalDescription: 'SEAMLESS CS PIPE 50 MM NB SCH 40 ASTM A106 GR B',
    materialCategory: 'Pipes & Tubular Goods',
    materialSubcategory: 'Seamless Carbon Steel Pipes',
    uom: 'MTR',
    materialGrade: 'ASTM A106 Grade B',
    size: '50 MM NB',
    standard: 'ASME B36.10M',
    specification: 'Schedule 40, Plain End Beveled',
    criticalAttributes: { 'Wall Thickness': '3.91 mm', 'Process': 'Seamless' },
    createdAt: '2024-01-20',
  },
  {
    id: 'rec-ongc-005',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-1120',
    originalDescription: 'CENTRIFUGAL PUMP IMPELLER BRONZE 180MM OD',
    materialCategory: 'Rotating Equipment Spares',
    materialSubcategory: 'Pump Impellers',
    uom: 'EA',
    materialGrade: 'Phosphor Bronze B62',
    size: '180MM OD',
    specification: 'Closed Impeller, 6 Vanes, Keyway bore 28mm',
    criticalAttributes: { 'Vanes': '6', 'Shaft Bore': '28 mm' },
    createdAt: '2023-09-15',
  },
  {
    id: 'rec-ongc-006',
    cpse: 'ONGC',
    sourceMaterialCode: 'ONGC-9011',
    originalDescription: 'SPIRAL WOUND GASKET 4 INCH 150# SS316 GRAFOIL',
    materialCategory: 'Gaskets & Sealing',
    materialSubcategory: 'Spiral Wound Gaskets',
    uom: 'NOS',
    materialGrade: 'SS316 with Flexible Graphite Filler',
    size: '4 INCH',
    pressureRating: '150#',
    standard: 'ASME B16.20',
    specification: 'Inner and Outer Rings CS/SS',
    criticalAttributes: { 'Winding': 'SS316', 'Filler': 'Graphite' },
    createdAt: '2024-06-10',
  },
];

export const SYNTHETIC_IOCL_MATERIALS: MaterialRecord[] = [
  {
    id: 'rec-iocl-001',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-7811',
    originalDescription: '2" CARBON STEEL BALL VALVE CLASS 150',
    materialCategory: 'Piping & Valves',
    materialSubcategory: 'Ball Valve Units',
    uom: 'NOS',
    materialGrade: 'ASTM A216 Gr. WCB',
    size: '2"',
    diameter: 'DN50',
    pressureRating: 'Class 150',
    temperatureRating: '-29 to 200 Deg C',
    standard: 'API 6D',
    specification: 'Flanged Ends ASME B16.5 RF, Lever Operated',
    manufacturer: 'L&T Valves',
    connectionType: 'Flanged RF',
    criticalAttributes: { 'Body': 'WCB', 'Port': 'Regular', 'Trim': '13Cr / SS410' },
    createdAt: '2024-02-14',
  },
  {
    id: 'rec-iocl-002',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-9104',
    originalDescription: 'BALL VALVE 2 IN CS CL300',
    materialCategory: 'Piping & Valves',
    materialSubcategory: 'Ball Valve Units',
    uom: 'NOS',
    materialGrade: 'ASTM A216 WCB',
    size: '2 IN',
    pressureRating: 'CL300',
    standard: 'API 6D',
    connectionType: 'Flanged RF',
    criticalAttributes: { 'Pressure Class': '300', 'Flange Rating': 'Class 300' },
    createdAt: '2024-04-10',
  },
  {
    id: 'rec-iocl-003',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-4419',
    originalDescription: 'HEX BOLT M16 X 75MM SS316 WITH NUT',
    materialCategory: 'Hardware & Fasteners',
    materialSubcategory: 'Metric Fasteners',
    uom: 'NOS',
    materialGrade: 'SS316 (Marine/Acid Grade)',
    size: 'M16',
    length: '75MM',
    standard: 'IS 1364 / ISO 3506 A4-70',
    specification: 'High corrosion resistance molybdenum steel fastener',
    criticalAttributes: { 'Metallurgy': 'SS316 (Acid resistant with Mo)', 'Grade': 'A4-70' },
    createdAt: '2023-12-05',
  },
  {
    id: 'rec-iocl-004',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-1125',
    originalDescription: 'IMPELLER, CENTRIFUGAL PUMP, BRONZE, OD 180 MM, 6-VANE',
    materialCategory: 'Mechanical Spares',
    materialSubcategory: 'Impellers',
    uom: 'EA',
    materialGrade: 'Cast Bronze ASTM B62',
    size: '180 MM OD',
    specification: 'Dynamically balanced ISO 1940 Grade 2.5, 28mm keyway',
    criticalAttributes: { 'Vanes': '6', 'Balancing': 'ISO G2.5', 'Bore': '28 mm' },
    createdAt: '2023-10-18',
  },
  {
    id: 'rec-iocl-005',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-6020',
    originalDescription: 'PRESSURE TRANSMITTER 4-20MA 0-10 BAR ROSEMOUNT 3051S',
    materialCategory: 'Instrumentation',
    materialSubcategory: 'Pressure Transmitters',
    uom: 'NOS',
    manufacturer: 'Emerson Rosemount',
    modelNumber: '3051S',
    specification: 'Output 4-20 mA with HART protocol, range 0 to 10 bar gauge, 1/2" NPT female',
    criticalAttributes: { 'Output': '4-20 mA HART', 'Range': '0-10 Bar', 'Process Conn': '1/2" NPT' },
    createdAt: '2024-05-02',
  },
  {
    id: 'rec-iocl-006',
    cpse: 'IOCL',
    sourceMaterialCode: 'IOCL-9022',
    originalDescription: 'GASKET SPWD 4" 150# SS316/GRAFOIL ASME B16.20',
    materialCategory: 'Piping Components',
    materialSubcategory: 'Gaskets',
    uom: 'EA',
    materialGrade: 'SS316 / Flexible Graphite',
    size: '4"',
    pressureRating: '150#',
    standard: 'ASME B16.20',
    criticalAttributes: { 'Type': 'Spiral Wound', 'Inner Ring': 'SS316' },
    createdAt: '2024-07-01',
  },
];

export const SYNTHETIC_BHEL_MATERIALS: MaterialRecord[] = [
  {
    id: 'rec-bhel-001',
    cpse: 'BHEL',
    sourceMaterialCode: 'BHEL-2290',
    originalDescription: 'BALL V/V 50MM CS 150 LB',
    materialCategory: 'Valves & Boiler Mountings',
    materialSubcategory: 'Industrial Ball Valves',
    uom: 'NOS',
    materialGrade: 'A216 WCB',
    size: '50MM',
    diameter: 'DN 50',
    pressureRating: '150 LB',
    temperatureRating: 'Up to 200 C',
    standard: 'BS 5351 / API 6D',
    specification: 'Flanged ends class 150, hand lever operated',
    connectionType: 'Flanged RF',
    criticalAttributes: { 'Rating': '150 LB', 'Norm Size': '50 mm' },
    createdAt: '2024-01-19',
  },
  {
    id: 'rec-bhel-002',
    cpse: 'BHEL',
    sourceMaterialCode: 'BHEL-6612',
    originalDescription: 'PIPE CS SMLS 2 INCH SCH 40 A106-B',
    materialCategory: 'Piping & Tubing',
    materialSubcategory: 'Boiler & Steam Piping',
    uom: 'MTR',
    materialGrade: 'ASTM A106 Gr B',
    size: '2 INCH',
    standard: 'ASME B36.10',
    specification: 'Carbon steel seamless pipe, schedule 40',
    criticalAttributes: { 'Nominal Bore': '2 Inch (50NB)', 'Wall Schedule': 'SCH 40' },
    createdAt: '2024-03-08',
  },
  {
    id: 'rec-bhel-003',
    cpse: 'BHEL',
    sourceMaterialCode: 'BHEL-7033',
    originalDescription: 'TX PRESS 4-20MA HART 0-1000 KPA YOKOGAWA EJX110A',
    materialCategory: 'Control & Instrumentation',
    materialSubcategory: 'Transmitters',
    uom: 'NOS',
    manufacturer: 'Yokogawa',
    modelNumber: 'EJX110A',
    specification: 'Smart differential / gauge pressure transmitter, 4-20 mA with HART, 0-1000 kPa (equivalent to 0-10 bar)',
    criticalAttributes: { 'Output': '4-20 mA HART', 'Calibrated Range': '0-1000 kPa (0-10 Bar)', 'Accuracy': '0.04%' },
    createdAt: '2024-04-22',
  },
  {
    id: 'rec-bhel-004',
    cpse: 'BHEL',
    sourceMaterialCode: 'BHEL-9440',
    originalDescription: 'SW GASKET 100 NB CL150 SS316 GRAPHITE ASME B16.20',
    materialCategory: 'Flange Accessories',
    materialSubcategory: 'Gaskets',
    uom: 'NOS',
    materialGrade: 'SS316 / Graphite',
    size: '100 NB',
    pressureRating: 'CL 150',
    standard: 'ASME B16.20',
    specification: 'Spiral wound gasket for 100mm NB (4 Inch) flanges',
    criticalAttributes: { 'Metric NB': '100 NB', 'Imperial Equiv': '4 Inch' },
    createdAt: '2024-05-30',
  },
];

// Combine all raw demo materials
export const ALL_SYNTHETIC_MATERIALS: MaterialRecord[] = [
  ...SYNTHETIC_ONGC_MATERIALS,
  ...SYNTHETIC_IOCL_MATERIALS,
  ...SYNTHETIC_BHEL_MATERIALS,
];

// ==========================================
// 2. CURATED JUDGE DEMONSTRATION SCENARIOS
// ==========================================

export const DEMO_MATCH_CANDIDATES: MaterialMatchCandidate[] = [
  // ----------------------------------------------------
  // SCENARIO 1: SAME MATERIAL (ONGC, IOCL, BHEL converge into CNMC-000184)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-001',
    scenarioId: 'SCENARIO_1_SAME_MATERIAL',
    scenarioLabel: 'Scenario 1: Multi-CPSE Identical Material Convergence',
    title: 'Ball Valve, 2 Inch, Carbon Steel, Class 150',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[0], // ONGC-4582: BALL VALVE 2 IN CS CL150
      SYNTHETIC_IOCL_MATERIALS[0], // IOCL-7811: 2" CARBON STEEL BALL VALVE CLASS 150
      SYNTHETIC_BHEL_MATERIALS[0], // BHEL-2290: BALL V/V 50MM CS 150 LB
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.94, // Demo Matching Confidence
    recommendedNationalCode: 'CNMC-000184',
    recommendedDescription: 'Ball Valve, 2 Inch, Carbon Steel ASTM A216 WCB, Class 150, API 6D, Flanged RF',
    recommendedClassification: {
      category: 'Valves & Flow Control',
      subcategory: 'Ball Valves',
      unspscEquivalentCode: '40141607',
    },
    normalizedAttributes: {
      'Material Type': 'Ball Valve',
      'Nominal Size': '2 Inch (DN 50)',
      'Body Metallurgy': 'Carbon Steel (ASTM A216 WCB / A105)',
      'Pressure Class': 'ASME Class 150 (150 LB)',
      'Governing Standard': 'API 6D / ASME B16.34',
      'End Connection': 'Flanged Raised Face (RF)',
      'Normalized UOM': 'NOS (Each)',
    },
    technicalComparisons: [
      {
        attributeName: 'Material Type',
        sourceValues: { 'ONGC': 'BALL VALVE', 'IOCL': 'BALL VALVE', 'BHEL': 'BALL V/V' },
        normalizedValue: 'Ball Valve',
        matchStatus: 'MATCH',
        notes: 'Abbreviation "V/V" normalized to "Valve"',
      },
      {
        attributeName: 'Nominal Size',
        sourceValues: { 'ONGC': '2 IN', 'IOCL': '2"', 'BHEL': '50MM' },
        normalizedValue: '2 Inch / DN 50',
        matchStatus: 'NORMALIZED_MATCH',
        notes: '50mm metric dimension matches 2 inch imperial nominal bore',
      },
      {
        attributeName: 'Body Material',
        sourceValues: { 'ONGC': 'CS CL150', 'IOCL': 'CARBON STEEL', 'BHEL': 'CS' },
        normalizedValue: 'Carbon Steel (ASTM A216 WCB)',
        matchStatus: 'MATCH',
        notes: '"CS" normalized to Carbon Steel',
      },
      {
        attributeName: 'Pressure Class',
        sourceValues: { 'ONGC': 'CL150', 'IOCL': 'CLASS 150', 'BHEL': '150 LB' },
        normalizedValue: 'Class 150',
        matchStatus: 'NORMALIZED_MATCH',
        notes: 'CL150, Class 150, and 150 LB represent identical ASME rating',
      },
      {
        attributeName: 'Standard',
        sourceValues: { 'ONGC': 'API 6D', 'IOCL': 'API 6D', 'BHEL': 'API 6D / BS 5351' },
        normalizedValue: 'API 6D',
        matchStatus: 'MATCH',
        notes: 'Harmonized under API 6D pipeline valve standard',
      },
      {
        attributeName: 'Unit of Measure',
        sourceValues: { 'ONGC': 'EA', 'IOCL': 'NOS', 'BHEL': 'NOS' },
        normalizedValue: 'NOS (Number / Each)',
        matchStatus: 'NORMALIZED_MATCH',
        notes: 'Standardized under National UOM Registry',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Equivalent material functional type: Industrial Ball Valve across all 3 CPSEs', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Dimensional equivalence verified: 2 IN == 2" == 50 MM (DN 50 nominal bore)', category: 'DIMENSIONAL', passed: true },
      { point: 'Metallurgy consistency: Carbon Steel ASTM A216 WCB specification confirmed', category: 'METALLURGY', passed: true },
      { point: 'Pressure class alignment: Class 150 rating holds across all source descriptions', category: 'PRESSURE_TEMP', passed: true },
      { point: 'Standard compatibility: API 6D pipeline specification verified', category: 'STANDARD_COMPLIANCE', passed: true },
      { point: 'Unit normalization: EA and NOS resolved to standardized Count (NOS)', category: 'UOM', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 2: HARD CONFLICT (Pressure Class 150 vs Class 300 - High text similarity but MUST NOT MERGE)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-002',
    scenarioId: 'SCENARIO_2_HARD_CONFLICT',
    scenarioLabel: 'Scenario 2: Hard Technical Conflict (Pressure Class 150 vs 300)',
    title: 'Ball Valve 2" CS CL150 vs CL300',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[1], // ONGC-5102: BALL VALVE 2 IN CS CL150 RF
      SYNTHETIC_IOCL_MATERIALS[1], // IOCL-9104: BALL VALVE 2 IN CS CL300
    ],
    relationshipType: 'REQUIRES_REVIEW',
    confidence: 0.88, // High text similarity (88%) but blocked by conflict engine!
    recommendedNationalCode: 'CNMC-CONFLICT-HOLD',
    recommendedDescription: 'Potential Conflict: 2 Inch CS Ball Valve with Mismatched Pressure Rating (CL150 vs CL300)',
    recommendedClassification: {
      category: 'Valves & Flow Control',
      subcategory: 'Ball Valves',
    },
    normalizedAttributes: {
      'Material Type': 'Ball Valve',
      'Nominal Size': '2 Inch (DN 50)',
      'Body Metallurgy': 'Carbon Steel',
      'Pressure Class ONGC': 'ASME Class 150 (Test: 29.3 bar)',
      'Pressure Class IOCL': 'ASME Class 300 (Test: 77.0 bar)',
    },
    technicalComparisons: [
      {
        attributeName: 'Material Type',
        sourceValues: { 'ONGC': 'BALL VALVE', 'IOCL': 'BALL VALVE' },
        normalizedValue: 'Ball Valve',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Nominal Size',
        sourceValues: { 'ONGC': '2 IN', 'IOCL': '2 IN' },
        normalizedValue: '2 Inch',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Material',
        sourceValues: { 'ONGC': 'Carbon Steel A105', 'IOCL': 'ASTM A216 WCB' },
        normalizedValue: 'Carbon Steel',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Pressure Class',
        sourceValues: { 'ONGC': 'CL150 (Class 150)', 'IOCL': 'CL300 (Class 300)' },
        normalizedValue: 'CONFLICT DETECTED',
        matchStatus: 'CONFLICT',
        notes: 'Critical Safety Difference: Class 300 flange has thicker wall and different bolt circle!',
      },
    ],
    conflicts: [
      {
        attribute: 'Pressure Rating',
        severity: 'HARD_CONFLICT',
        description: 'ONGC specifies ASME Class 150 (20 bar safe working pressure) whereas IOCL specifies ASME Class 300 (51 bar safe working pressure). Bolt hole circle and wall thickness are physically incompatible.',
        conflictingValues: { 'ONGC-5102': 'Class 150 (150#)', 'IOCL-9104': 'Class 300 (300#)' },
        impact: 'Merging would risk catastrophic pressure vessel failure if a Class 150 valve was installed in a Class 300 line. Retain as two separate National Material Codes.',
      },
    ],
    evidence: [
      { point: 'Text similarity index is high (0.88) due to common words "BALL VALVE 2 IN CS"', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Safety Rule Triggered: Pressure ratings do not match (150 vs 300)', category: 'PRESSURE_TEMP', passed: false },
      { point: 'Auto-merge blocked by National Harmonization Safety Engine', category: 'STANDARD_COMPLIANCE', passed: false },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 3: MATERIAL GRADE CONFLICT (SS304 vs SS316 Metallurgy)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-003',
    scenarioId: 'SCENARIO_3_MATERIAL_GRADE',
    scenarioLabel: 'Scenario 3: Metallurgy & Corrosion Grade Conflict (SS304 vs SS316)',
    title: 'Hex Bolt M16 x 75mm (SS304 vs SS316 Metallurgy)',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[2], // ONGC-3312: HEX BOLT M16 X 75 SS304
      SYNTHETIC_IOCL_MATERIALS[2], // IOCL-4419: HEX BOLT M16 X 75MM SS316
    ],
    relationshipType: 'REQUIRES_REVIEW',
    confidence: 0.85,
    recommendedNationalCode: 'CNMC-FASTENER-HOLD',
    recommendedDescription: 'Technical Review Required: Hex Bolt M16x75 with Metallurgical Discrepancy (Austenitic 304 vs Molybdenum-Stabilized 316)',
    recommendedClassification: {
      category: 'Fasteners & Hardware',
      subcategory: 'Bolts & Nuts',
    },
    normalizedAttributes: {
      'Fastener Type': 'Hexagon Head Bolt with Nut',
      'Thread Size': 'M16 x 2.0 mm',
      'Shaft Length': '75 mm',
      'ONGC Grade': 'SS304 (Standard Corrosion Resistance)',
      'IOCL Grade': 'SS316 (Marine/Acid Chemical Resistance with 2-3% Mo)',
    },
    technicalComparisons: [
      {
        attributeName: 'Fastener Type',
        sourceValues: { 'ONGC': 'HEX BOLT WITH NUT', 'IOCL': 'HEX BOLT WITH NUT' },
        normalizedValue: 'Hex Bolt with Nut',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Thread Size',
        sourceValues: { 'ONGC': 'M16', 'IOCL': 'M16' },
        normalizedValue: 'M16 (Pitch 2.0mm)',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Length',
        sourceValues: { 'ONGC': '75', 'IOCL': '75MM' },
        normalizedValue: '75 mm',
        matchStatus: 'NORMALIZED_MATCH',
      },
      {
        attributeName: 'Material Metallurgy',
        sourceValues: { 'ONGC': 'SS304', 'IOCL': 'SS316' },
        normalizedValue: 'METALLURGY CONFLICT',
        matchStatus: 'CONFLICT',
        notes: 'SS316 contains 2-3% Molybdenum for pitting resistance in offshore / sour environments.',
      },
    ],
    conflicts: [
      {
        attribute: 'Metallurgical Grade',
        severity: 'SPECIFICATION_MISMATCH',
        description: 'SS304 cannot substitute SS316 in coastal/offshore petroleum refinery environments due to risk of chloride stress corrosion cracking.',
        conflictingValues: { 'ONGC-3312': 'SS304 (A2-70)', 'IOCL-4419': 'SS316 (A4-70)' },
        impact: 'Requires human engineer validation: approve as distinct codes or map as application-restricted equivalent.',
      },
    ],
    evidence: [
      { point: 'Thread pitch and bolt geometry are identical (M16x75)', category: 'DIMENSIONAL', passed: true },
      { point: 'Chemical composition difference detected: SS304 vs SS316', category: 'METALLURGY', passed: false },
      { point: 'Flagged for Human Reviewer Governance', category: 'STANDARD_COMPLIANCE', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 4: UNIT NORMALIZATION (50mm NB vs 2 Inch NB Seamless Pipe)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-004',
    scenarioId: 'SCENARIO_4_UNIT_NORMALIZATION',
    scenarioLabel: 'Scenario 4: Intelligent Unit & Metric/Imperial Normalization',
    title: 'Seamless Carbon Steel Pipe, 2 Inch / 50 NB, Sch 40, ASTM A106 Gr B',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[3], // ONGC-8840: SEAMLESS CS PIPE 50 MM NB SCH 40
      SYNTHETIC_BHEL_MATERIALS[1], // BHEL-6612: PIPE CS SMLS 2 INCH SCH 40 A106-B
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.96,
    recommendedNationalCode: 'CNMC-000245',
    recommendedDescription: 'Carbon Steel Seamless Pipe, 2 Inch (50 NB), Schedule 40, ASTM A106 Grade B, ASME B36.10M',
    recommendedClassification: {
      category: 'Pipes & Tubular Goods',
      subcategory: 'Seamless Carbon Steel Pipes',
      unspscEquivalentCode: '40171501',
    },
    normalizedAttributes: {
      'Product Form': 'Seamless Pipe (SMLS)',
      'Nominal Bore': '2 Inch (50 mm NB)',
      'Outside Diameter': '60.3 mm (2.375 in)',
      'Wall Schedule': 'SCH 40 (3.91 mm wall thickness)',
      'Material Spec': 'ASTM A106 Grade B',
      'Dimensional Standard': 'ASME B36.10M',
    },
    technicalComparisons: [
      {
        attributeName: 'Manufacturing Type',
        sourceValues: { 'ONGC': 'SEAMLESS', 'BHEL': 'SMLS' },
        normalizedValue: 'Seamless',
        matchStatus: 'MATCH',
        notes: '"SMLS" recognized as standard industry synonym for Seamless',
      },
      {
        attributeName: 'Nominal Size',
        sourceValues: { 'ONGC': '50 MM NB', 'BHEL': '2 INCH' },
        normalizedValue: '2 Inch (DN 50 NB)',
        matchStatus: 'NORMALIZED_MATCH',
        notes: '50mm NB is the metric standard designation for 2" pipe (OD 60.3mm)',
      },
      {
        attributeName: 'Schedule',
        sourceValues: { 'ONGC': 'SCH 40', 'BHEL': 'SCH 40' },
        normalizedValue: 'Schedule 40',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Material Grade',
        sourceValues: { 'ONGC': 'ASTM A106 GR B', 'BHEL': 'A106-B' },
        normalizedValue: 'ASTM A106 Grade B',
        matchStatus: 'NORMALIZED_MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Metric/Imperial conversion table validated: 50 MM NB == 2 Inch NB', category: 'DIMENSIONAL', passed: true },
      { point: 'Standard abbreviation mapping: SMLS == Seamless', category: 'MATERIAL_TYPE', passed: true },
      { point: 'ASTM A106 Gr B specification verified across both CPSEs', category: 'METALLURGY', passed: true },
      { point: 'Wall thickness schedule 40 (3.91mm) confirmed', category: 'DIMENSIONAL', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 5: NEAR DUPLICATE (Impeller Bronze 180mm with slight description phrasing)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-005',
    scenarioId: 'SCENARIO_5_NEAR_DUPLICATE',
    scenarioLabel: 'Scenario 5: Near-Duplicate Detection (Description Phrasing Variance)',
    title: 'Centrifugal Pump Impeller, Bronze B62, 180mm OD, 6-Vane',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[4], // ONGC-1120: CENTRIFUGAL PUMP IMPELLER BRONZE 180MM OD
      SYNTHETIC_IOCL_MATERIALS[3], // IOCL-1125: IMPELLER, CENTRIFUGAL PUMP, BRONZE, OD 180 MM, 6-VANE
    ],
    relationshipType: 'NEAR_DUPLICATE',
    confidence: 0.91,
    recommendedNationalCode: 'CNMC-000319',
    recommendedDescription: 'Centrifugal Pump Impeller, Bronze ASTM B62, 180mm Outer Diameter, 6-Vane, 28mm Keyway Bore',
    recommendedClassification: {
      category: 'Rotating Equipment Spares',
      subcategory: 'Pump Impellers',
      unspscEquivalentCode: '40151505',
    },
    normalizedAttributes: {
      'Component': 'Centrifugal Pump Impeller',
      'Material': 'Phosphor / Leaded Bronze ASTM B62',
      'Outer Diameter': '180 mm',
      'Vane Count': '6 Vane',
      'Bore Diameter': '28 mm with standard keyway',
    },
    technicalComparisons: [
      {
        attributeName: 'Component',
        sourceValues: { 'ONGC': 'CENTRIFUGAL PUMP IMPELLER', 'IOCL': 'IMPELLER, CENTRIFUGAL PUMP' },
        normalizedValue: 'Centrifugal Pump Impeller',
        matchStatus: 'MATCH',
        notes: 'Inverted order parsed into canonical entity',
      },
      {
        attributeName: 'Outer Diameter',
        sourceValues: { 'ONGC': '180MM OD', 'IOCL': 'OD 180 MM' },
        normalizedValue: '180 mm OD',
        matchStatus: 'NORMALIZED_MATCH',
      },
      {
        attributeName: 'Material',
        sourceValues: { 'ONGC': 'BRONZE', 'IOCL': 'BRONZE' },
        normalizedValue: 'Bronze ASTM B62',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Vane Count',
        sourceValues: { 'ONGC': 'Not explicitly stated in header', 'IOCL': '6-VANE' },
        normalizedValue: '6 Vane (Verified in technical sub-attributes)',
        matchStatus: 'NORMALIZED_MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Entity extraction identified identical pump impeller geometry', category: 'MATERIAL_TYPE', passed: true },
      { point: 'Outer diameter normalized: 180MM OD == OD 180 MM', category: 'DIMENSIONAL', passed: true },
      { point: 'Material grade: Bronze alloy matches application parameters', category: 'METALLURGY', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 6: FUNCTIONALLY EQUIVALENT (Different Brands: Rosemount 3051S vs Yokogawa EJX110A)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-006',
    scenarioId: 'SCENARIO_6_FUNCTIONALLY_EQUIVALENT',
    scenarioLabel: 'Scenario 6: Functional Equivalence Across Equipment OEM Brands',
    title: 'Smart Pressure Transmitter 4-20mA HART (0-10 Bar / 0-1000 kPa)',
    sourceMaterials: [
      SYNTHETIC_IOCL_MATERIALS[4], // IOCL-6020: ROSEMOUNT 3051S 0-10 BAR
      SYNTHETIC_BHEL_MATERIALS[2], // BHEL-7033: YOKOGAWA EJX110A 0-1000 KPA
    ],
    relationshipType: 'FUNCTIONALLY_EQUIVALENT',
    confidence: 0.89,
    recommendedNationalCode: 'CNMC-000492',
    recommendedDescription: 'Smart Pressure Transmitter, 4-20 mA Output with HART Protocol, Range 0-10 Bar (0-1000 kPa), 1/2" NPT Process Connection',
    recommendedClassification: {
      category: 'Control & Instrumentation',
      subcategory: 'Pressure Transmitters',
      unspscEquivalentCode: '41112403',
    },
    normalizedAttributes: {
      'Instrument Type': 'Smart Gauge Pressure Transmitter',
      'Analog Output': '4-20 mA with digital HART communication',
      'Calibrated Range': '0 to 10 Bar (equivalent to 0 to 1000 kPa)',
      'Process Connection': '1/2 Inch NPT Female',
      'Enclosure Rating': 'IP67 / NEMA 4X Explosion Proof',
    },
    technicalComparisons: [
      {
        attributeName: 'Instrument Type',
        sourceValues: { 'IOCL': 'PRESSURE TRANSMITTER', 'BHEL': 'TX PRESS' },
        normalizedValue: 'Pressure Transmitter',
        matchStatus: 'NORMALIZED_MATCH',
        notes: '"TX PRESS" standardized to Pressure Transmitter',
      },
      {
        attributeName: 'Signal Output',
        sourceValues: { 'IOCL': '4-20MA HART', 'BHEL': '4-20MA HART' },
        normalizedValue: '4-20 mA HART',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Calibrated Span',
        sourceValues: { 'IOCL': '0-10 BAR', 'BHEL': '0-1000 KPA' },
        normalizedValue: '0 - 10 Bar (1000 kPa)',
        matchStatus: 'NORMALIZED_MATCH',
        notes: 'Engineering unit equivalence: 1 Bar = 100 kPa',
      },
      {
        attributeName: 'OEM Brand',
        sourceValues: { 'IOCL': 'Rosemount 3051S', 'BHEL': 'Yokogawa EJX110A' },
        normalizedValue: 'OEM Specific (Interchangeable Function)',
        matchStatus: 'NOT_APPLICABLE',
        notes: 'Different manufacturers, but identical form, fit, and measurement function for process lines.',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Electronic interface compatible: 4-20 mA 2-wire HART', category: 'STANDARD_COMPLIANCE', passed: true },
      { point: 'Measurement range normalized: 0-10 Bar == 0-1000 kPa', category: 'PRESSURE_TEMP', passed: true },
      { point: 'Marked as FUNCTIONALLY EQUIVALENT rather than identical due to separate brand models', category: 'MATERIAL_TYPE', passed: true },
    ],
    reviewStatus: 'PENDING_REVIEW',
  },

  // ----------------------------------------------------
  // SCENARIO 7: SPIRAL WOUND GASKET (Multi-CPSE 4" 150#)
  // ----------------------------------------------------
  {
    id: 'MATCH-CAND-007',
    title: 'Spiral Wound Gasket 4" 150# SS316 with Flexible Graphite Filler',
    sourceMaterials: [
      SYNTHETIC_ONGC_MATERIALS[5], // ONGC-9011: SPIRAL WOUND GASKET 4 INCH 150# SS316 GRAFOIL
      SYNTHETIC_IOCL_MATERIALS[5], // IOCL-9022: GASKET SPWD 4" 150# SS316/GRAFOIL ASME B16.20
      SYNTHETIC_BHEL_MATERIALS[3], // BHEL-9440: SW GASKET 100 NB CL150 SS316 GRAPHITE ASME B16.20
    ],
    relationshipType: 'SAME_MATERIAL',
    confidence: 0.95,
    recommendedNationalCode: 'CNMC-000512',
    recommendedDescription: 'Spiral Wound Gasket, 4 Inch (100 NB), ASME Class 150, SS316 Winding with Flexible Graphite Filler, Outer & Inner Centering Ring, ASME B16.20',
    recommendedClassification: {
      category: 'Gaskets & Sealing',
      subcategory: 'Spiral Wound Gaskets',
      unspscEquivalentCode: '31181504',
    },
    normalizedAttributes: {
      'Gasket Type': 'Spiral Wound Gasket (SWG)',
      'Nominal Pipe Size': '4 Inch (100 NB)',
      'Pressure Class': 'Class 150',
      'Winding Metallurgy': 'Stainless Steel 316',
      'Filler Material': 'Flexible Graphite (Grafoil)',
      'Standard': 'ASME B16.20',
    },
    technicalComparisons: [
      {
        attributeName: 'Gasket Type',
        sourceValues: { 'ONGC': 'SPIRAL WOUND GASKET', 'IOCL': 'GASKET SPWD', 'BHEL': 'SW GASKET' },
        normalizedValue: 'Spiral Wound Gasket',
        matchStatus: 'NORMALIZED_MATCH',
      },
      {
        attributeName: 'Flange Size',
        sourceValues: { 'ONGC': '4 INCH', 'IOCL': '4"', 'BHEL': '100 NB' },
        normalizedValue: '4 Inch (100 NB)',
        matchStatus: 'NORMALIZED_MATCH',
      },
      {
        attributeName: 'Pressure Class',
        sourceValues: { 'ONGC': '150#', 'IOCL': '150#', 'BHEL': 'CL150' },
        normalizedValue: 'Class 150',
        matchStatus: 'MATCH',
      },
      {
        attributeName: 'Filler',
        sourceValues: { 'ONGC': 'GRAFOIL', 'IOCL': 'GRAFOIL', 'BHEL': 'GRAPHITE' },
        normalizedValue: 'Flexible Graphite',
        matchStatus: 'MATCH',
      },
    ],
    conflicts: [],
    evidence: [
      { point: 'Metric and Imperial size match: 100 NB == 4"', category: 'DIMENSIONAL', passed: true },
      { point: 'Metallurgy confirmed: SS316 winding with flexible graphite', category: 'METALLURGY', passed: true },
      { point: 'Standard: ASME B16.20 metallic gaskets for pipe flanges', category: 'STANDARD_COMPLIANCE', passed: true },
    ],
    reviewStatus: 'APPROVED', // Pre-approved in demo to show existing national master
    reviewerDecision: {
      action: 'APPROVE',
      reviewerName: 'Er. R. Sundaram (Chief Material Master Reviewer)',
      timestamp: '2026-09-17 11:20 IST',
      reason: 'Dimensional, metallurgy, and filler specifications harmonized under ASME B16.20.',
    },
  },
];

// ==========================================
// 3. INITIAL APPROVED NATIONAL MASTER
// ==========================================

export const INITIAL_NATIONAL_MATERIALS: NationalMaterial[] = [
  {
    nationalCode: 'CNMC-000512',
    standardDescription: 'Spiral Wound Gasket, 4 Inch (100 NB), ASME Class 150, SS316 Winding with Flexible Graphite Filler, Outer & Inner Centering Ring, ASME B16.20',
    category: 'Gaskets & Sealing',
    subcategory: 'Spiral Wound Gaskets',
    normalizedAttributes: {
      materialType: 'Spiral Wound Gasket (SWG)',
      nominalSize: '4 Inch (100 NB)',
      bodyMaterial: 'SS316 Stainless Steel',
      pressureRating: 'ASME Class 150',
      governingStandard: 'ASME B16.20',
      endConnection: 'Raised Face Flange Centering',
      normalizedUom: 'NOS',
    },
    mappedSourceRecords: [
      {
        cpse: 'ONGC',
        sourceCode: 'ONGC-9011',
        originalDescription: 'SPIRAL WOUND GASKET 4 INCH 150# SS316 GRAFOIL',
        uom: 'NOS',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED',
        erpSystemOrigin: 'SAP S/4HANA (ONGC Offshore)',
      },
      {
        cpse: 'IOCL',
        sourceCode: 'IOCL-9022',
        originalDescription: 'GASKET SPWD 4" 150# SS316/GRAFOIL ASME B16.20',
        uom: 'EA',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED',
        erpSystemOrigin: 'SAP ECC 6.0 (IOCL Mathura)',
      },
      {
        cpse: 'BHEL',
        sourceCode: 'BHEL-9440',
        originalDescription: 'SW GASKET 100 NB CL150 SS316 GRAPHITE ASME B16.20',
        uom: 'NOS',
        mappedAt: '2026-09-17 11:20 IST',
        mappingStatus: 'MAPPED',
        erpSystemOrigin: 'SAP ECC 6.0 (BHEL Trichy)',
      },
    ],
    approvalStatus: 'APPROVED',
    approvedBy: 'Er. R. Sundaram (Chief Material Master Reviewer)',
    approvalTimestamp: '2026-09-17 11:20 IST',
    reviewerNotes: 'Verified metallurgy SS316 with grafoil filler conforming to ASME B16.20.',
    lastUpdated: '2026-09-17 11:20 IST',
    coverageCount: 3,
  },
  {
    nationalCode: 'CNMC-000108',
    standardDescription: 'Gate Valve, 3 Inch (DN 80), Cast Carbon Steel ASTM A216 WCB, Class 300, Flanged RF, OS&Y Rising Stem, API 600',
    category: 'Valves & Flow Control',
    subcategory: 'Gate Valves',
    normalizedAttributes: {
      materialType: 'Gate Valve',
      nominalSize: '3 Inch (DN 80)',
      bodyMaterial: 'ASTM A216 WCB',
      pressureRating: 'ASME Class 300',
      governingStandard: 'API 600',
      endConnection: 'Flanged Raised Face',
      normalizedUom: 'NOS',
    },
    mappedSourceRecords: [
      {
        cpse: 'ONGC',
        sourceCode: 'ONGC-2241',
        originalDescription: 'GATE VLV 3IN CL300 WCB RF OS&Y',
        uom: 'EA',
        mappedAt: '2026-09-16 14:10 IST',
        mappingStatus: 'MAPPED',
        erpSystemOrigin: 'SAP S/4HANA',
      },
      {
        cpse: 'IOCL',
        sourceCode: 'IOCL-3390',
        originalDescription: '3" GATE VALVE CLASS 300 FLANGED CS A216 WCB',
        uom: 'NOS',
        mappedAt: '2026-09-16 14:10 IST',
        mappingStatus: 'MAPPED',
        erpSystemOrigin: 'SAP ECC 6.0',
      },
    ],
    approvalStatus: 'APPROVED',
    approvedBy: 'P. Verma (Senior Inventory Architect)',
    approvalTimestamp: '2026-09-16 14:10 IST',
    lastUpdated: '2026-09-16 14:10 IST',
    coverageCount: 2,
  },
];

// ==========================================
// 4. IMPORT HISTORY MOCK DATA
// ==========================================

export const INITIAL_IMPORT_JOBS: ImportJob[] = [
  {
    id: 'IMP-JOB-001',
    cpse: 'ONGC',
    fileName: 'ONGC_Synthetic_Material_Master.csv',
    recordsCount: 800,
    validRecordsCount: 792,
    invalidRecordsCount: 8,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 08:30 IST',
    status: 'IMPORTED',
    sourceType: 'SYNTHETIC_CSV',
    validationErrors: [
      { row: 14, field: 'uom', sourceValue: 'BOX?', issue: 'Non-standard packaging unit' },
      { row: 42, field: 'pressureRating', sourceValue: 'HIGH', issue: 'Unquantified pressure class' },
    ],
  },
  {
    id: 'IMP-JOB-002',
    cpse: 'IOCL',
    fileName: 'IOCL_Synthetic_Material_Master.csv',
    recordsCount: 650,
    validRecordsCount: 645,
    invalidRecordsCount: 5,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 09:15 IST',
    status: 'IMPORTED',
    sourceType: 'SYNTHETIC_CSV',
    validationErrors: [
      { row: 89, field: 'materialGrade', sourceValue: 'UNKNOWN', issue: 'Missing metallurgy spec' },
    ],
  },
  {
    id: 'IMP-JOB-003',
    cpse: 'BHEL',
    fileName: 'BHEL_Synthetic_Material_Master.csv',
    recordsCount: 520,
    validRecordsCount: 518,
    invalidRecordsCount: 2,
    importedBy: 'Demo Reviewer (CPCL)',
    importDate: '17 Sep 2026 10:00 IST',
    status: 'IMPORTED',
    sourceType: 'SYNTHETIC_CSV',
    validationErrors: [],
  },
];

// ==========================================
// 5. INITIAL AUDIT EVENTS
// ==========================================

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '17 Sep 2026 08:30:15 IST',
    user: 'Demo Reviewer (CPCL Admin)',
    role: 'Material Master Specialist',
    action: 'DATASET_IMPORT',
    materialCode: 'BATCH-ONGC-2026',
    previousState: 'Unloaded',
    newState: '800 records ingested (792 valid, 8 flagged)',
    reason: 'Initial synthetic dataset ingestion for ONGC upstream inventory',
    source: 'CPSE Data Ingestion Pipeline',
    participatingCPSEs: ['ONGC'],
  },
  {
    id: 'AUD-002',
    timestamp: '17 Sep 2026 10:05:00 IST',
    user: 'AI Engine v1.4',
    role: 'Harmonization Pipeline',
    action: 'HARMONIZATION_RUN',
    materialCode: 'RUN-HARMON-88',
    previousState: 'Unprocessed Ingestion',
    newState: '7 Candidate Clusters Generated',
    reason: 'Multi-CPSE NLP attribute parsing & technical conflict detection executed',
    source: 'National Harmonization Engine',
    participatingCPSEs: ['ONGC', 'IOCL', 'BHEL'],
  },
  {
    id: 'AUD-003',
    timestamp: '17 Sep 2026 11:20:45 IST',
    user: 'Er. R. Sundaram',
    role: 'Chief Material Master Reviewer',
    action: 'APPROVED_HARMONIZATION',
    materialCode: 'CNMC-000512',
    previousState: 'PENDING_REVIEW',
    newState: 'APPROVED',
    reason: 'Technical specifications verified: 4" (100NB) Class 150 SS316 Spiral Wound Gasket with Graphite',
    source: 'National Review Center',
    participatingCPSEs: ['ONGC', 'IOCL', 'BHEL'],
  },
];
