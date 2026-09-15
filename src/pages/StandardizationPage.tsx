/**
 * Material Normalization & Standardization Pipeline Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Cpu, Check } from 'lucide-react';
import { Badge } from '../components/shared/Badge';

interface StandardizationPageProps {
  onNavigateToPrev?: () => void;
  onNavigateToNext?: () => void;
  activeCpse?: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  isCompleted?: boolean;
}

export const StandardizationPage: React.FC<StandardizationPageProps> = ({
  onNavigateToPrev,
  onNavigateToNext,
  activeCpse = 'ONGC',
  isCompleted,
}) => {
  const examples = [
    {
      id: 'EX-1',
      label: 'Globe Valve 2" (ONGC to National Standard)',
      original: {
        cpse: 'ONGC',
        code: 'ONGC-0001',
        description: 'GLOBE VALVE 2 IN CARBON STEEL CL.150 SW',
        uom: 'NO',
        erp: 'SAP S/4HANA (MARA)',
        rawAttributes: {
          materialType: 'Globe Valve',
          size: '2 IN',
          grade: 'CARBON STEEL',
          pressureRating: 'CL.150',
          standard: 'ASME B16.34',
          spec: 'SW',
        },
      },
      normalized: [
        { parameter: 'Material Type / Component', rawValue: 'GLOBE VALVE', normalizedValue: 'Globe Valve', rule: 'ISO/ISA Standard Valve Lexicon' },
        { parameter: 'Nominal Size', rawValue: '2 IN', normalizedValue: '2 Inch (DN 50)', rule: 'Metric / Imperial Dual Representation' },
        { parameter: 'Body Metallurgy', rawValue: 'CARBON STEEL', normalizedValue: 'Carbon Steel (CS - ASTM A216 WCB)', rule: 'ASME Section II Material Mapping' },
        { parameter: 'Pressure Rating', rawValue: 'CL.150', normalizedValue: 'ASME Class 150 (PN 20)', rule: 'ASME B16.34 Pressure Class Normalization' },
        { parameter: 'End Connection', rawValue: 'SW', normalizedValue: 'Socket Weld (SW)', rule: 'Piping Connection Standard Naming' },
        { parameter: 'Unit of Measure', rawValue: 'NO', normalizedValue: 'NOS (Each)', rule: 'GeM & National UOM Harmonization Standard' },
      ],
      standardizedDesc: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, ASME Class 150, Socket Weld (SW), ASME B16.34',
      nationalCode: 'CNMC-000001',
      category: 'Valves & Flow Control',
      unspsc: '40141603',
      status: 'APPROVED',
      statusNote: 'Approved under One Nation • One Material Code',
    },
    {
      id: 'EX-2',
      label: 'Ball Valve 2" SS316 (IOCL to National Standard)',
      original: {
        cpse: 'IOCL',
        code: 'IOCL-0022',
        description: 'BALL VALVE 2 INCH 316 SS 150# SCRD',
        uom: 'NOS',
        erp: 'SAP ECC 6.0 (MAKT)',
        rawAttributes: {
          materialType: 'BALL VALVE',
          size: '2 INCH',
          grade: '316 SS',
          pressureRating: '150#',
          standard: 'ASME B16.34',
          spec: 'SCRD',
        },
      },
      normalized: [
        { parameter: 'Material Type / Component', rawValue: 'BALL VALVE', normalizedValue: 'Ball Valve', rule: 'Valve Taxonomy Standard' },
        { parameter: 'Nominal Size', rawValue: '2 INCH', normalizedValue: '2 Inch', rule: 'Diameter Normalization' },
        { parameter: 'Body Metallurgy', rawValue: '316 SS', normalizedValue: 'Stainless Steel 316 (AISI 316)', rule: 'Austenitic Stainless Steel Registry' },
        { parameter: 'Pressure Class', rawValue: '150#', normalizedValue: 'Class 150 (150#)', rule: 'Pound-force (#) to ASME Class Conversion' },
        { parameter: 'End Connection', rawValue: 'SCRD', normalizedValue: 'Screwed / NPT Threaded (SCRD)', rule: 'Threaded Connection Abbreviation Normalization' },
        { parameter: 'Unit of Measure', rawValue: 'NOS', normalizedValue: 'NOS (Each)', rule: 'Direct Mapping to National Standard UOM' },
      ],
      standardizedDesc: 'Ball Valve, 2 Inch, Stainless Steel 316, Class 150 (150#), Screwed (SCRD), ASME B16.34',
      nationalCode: 'CNMC-000002',
      category: 'Valves & Flow Control',
      unspsc: '40141607',
      status: 'APPROVED',
      statusNote: 'Harmonized across ONGC, IOCL, BHEL, and SAIL',
    },
    {
      id: 'EX-3',
      label: 'Seamless Pipe 4" (ONGC to National Standard)',
      original: {
        cpse: 'ONGC',
        code: 'ONGC-0024',
        description: 'PIPE SEAMLESS CS PIPE A106 GRADE B 4 IN SCH40 SEAMLESS',
        uom: 'MTR',
        erp: 'SAP S/4HANA (MARA)',
        rawAttributes: {
          materialType: 'PIPE SEAMLESS',
          size: '4 IN',
          grade: 'A106 GRADE B',
          pressureRating: 'SCH40',
          standard: 'ASTM A106',
          spec: 'SEAMLESS',
        },
      },
      normalized: [
        { parameter: 'Product Form', rawValue: 'PIPE SEAMLESS', normalizedValue: 'Seamless Pipe', rule: 'Duplicate word removal and title casing' },
        { parameter: 'Nominal Bore', rawValue: '4 IN', normalizedValue: '4 Inch (DN 100 NB)', rule: 'Piping Schedule Standard Diameter Mapping' },
        { parameter: 'Material Specification', rawValue: 'A106 GRADE B', normalizedValue: 'ASTM A106 Grade B', rule: 'ASTM Spec Standard Prefix' },
        { parameter: 'Wall Thickness Schedule', rawValue: 'SCH40', normalizedValue: 'Schedule 40 (6.02 mm wall)', rule: 'ASME B36.10M Schedule Table' },
        { parameter: 'Unit of Measure', rawValue: 'MTR', normalizedValue: 'MTR (Meter)', rule: 'Metric Length Standard' },
      ],
      standardizedDesc: 'Seamless Carbon Steel Pipe, 4 Inch (DN 100), ASTM A106 Grade B, Schedule 40, ASME B36.10M',
      nationalCode: 'CNMC-PIPE-004',
      category: 'Pipes & Fittings',
      unspsc: '40171501',
      status: 'PENDING_REVIEW',
      statusNote: 'Pending review due to IOCL SCH 80 conflict check',
    },
    {
      id: 'EX-4',
      label: 'Cast Steel Gate Valve 3" (BHEL to National Standard)',
      original: {
        cpse: 'BHEL',
        code: 'BHEL-0001',
        description: 'GATE VALVE 3 INCH ASTM A216 WCB CL.300 FLANGED RF',
        uom: 'NOS',
        erp: 'Oracle EBS (MTL)',
        rawAttributes: {
          materialType: 'GATE VALVE',
          size: '3 INCH',
          grade: 'ASTM A216 WCB',
          pressureRating: 'CL.300',
          standard: 'API 600 / ASME B16.34',
          spec: 'FLANGED RF',
        },
      },
      normalized: [
        { parameter: 'Material Type / Component', rawValue: 'GATE VALVE', normalizedValue: 'Gate Valve', rule: 'Valve Taxonomy Lexicon' },
        { parameter: 'Nominal Size', rawValue: '3 INCH', normalizedValue: '3 Inch (DN 80)', rule: 'Metric/Imperial Dual Standard' },
        { parameter: 'Body Metallurgy', rawValue: 'ASTM A216 WCB', normalizedValue: 'Cast Carbon Steel (WCB)', rule: 'ASTM Spec Standard Prefix' },
        { parameter: 'Pressure Class', rawValue: 'CL.300', normalizedValue: 'ASME Class 300 (PN 50)', rule: 'ASME B16.34 Pressure Class Normalization' },
        { parameter: 'End Connection', rawValue: 'FLANGED RF', normalizedValue: 'Flanged Raised Face (RF)', rule: 'Piping Connection Standard Naming' },
        { parameter: 'Unit of Measure', rawValue: 'NOS', normalizedValue: 'NOS (Each)', rule: 'Direct Mapping to National Standard UOM' },
      ],
      standardizedDesc: 'Gate Valve, 3 Inch (DN 80), Cast Carbon Steel WCB, ASME Class 300, Flanged RF, API 600',
      nationalCode: 'CNMC-000004',
      category: 'Valves & Flow Control',
      unspsc: '40141604',
      status: 'APPROVED',
      statusNote: 'Approved for High-Pressure Boiler Application',
    },
    {
      id: 'EX-5',
      label: 'Heavy Utility Carbon Steel Flange 6" (SAIL to National Standard)',
      original: {
        cpse: 'SAIL',
        code: 'SAIL-0001',
        description: 'FLANGE WELD NECK 6 INCH CS ASTM A105 CL.150 RF SCH40',
        uom: 'NOS',
        erp: 'Integrated Enterprise ERP',
        rawAttributes: {
          materialType: 'FLANGE WELD NECK',
          size: '6 INCH',
          grade: 'ASTM A105',
          pressureRating: 'CL.150',
          standard: 'ASME B16.5',
          spec: 'RF SCH40',
        },
      },
      normalized: [
        { parameter: 'Material Type / Component', rawValue: 'FLANGE WELD NECK', normalizedValue: 'Weld Neck Flange (WNRF)', rule: 'Flange Taxonomy Lexicon' },
        { parameter: 'Nominal Size', rawValue: '6 INCH', normalizedValue: '6 Inch (DN 150)', rule: 'Metric/Imperial Dual Standard' },
        { parameter: 'Body Metallurgy', rawValue: 'ASTM A105', normalizedValue: 'Forged Carbon Steel (ASTM A105)', rule: 'ASTM Spec Standard Prefix' },
        { parameter: 'Pressure Class', rawValue: 'CL.150', normalizedValue: 'ASME Class 150 (PN 20)', rule: 'ASME B16.5 Standard Rating' },
        { parameter: 'Facing & Schedule', rawValue: 'RF SCH40', normalizedValue: 'Raised Face (RF), Schedule 40 Bore', rule: 'Piping Connection Standard Naming' },
        { parameter: 'Unit of Measure', rawValue: 'NOS', normalizedValue: 'NOS (Each)', rule: 'Direct Mapping to National Standard UOM' },
      ],
      standardizedDesc: 'Weld Neck Flange (WNRF), 6 Inch (DN 150), Forged Carbon Steel ASTM A105, ASME Class 150, Schedule 40 Bore, ASME B16.5',
      nationalCode: 'CNMC-000005',
      category: 'Pipes & Fittings',
      unspsc: '40172605',
      status: 'APPROVED',
      statusNote: 'Approved under One Nation • One Material Code for Steel Utility Lines',
    },
  ];

  // Helper to select default index matching active CPSE
  const getIndexForCpse = (cpse: string) => {
    if (cpse === 'IOCL') return 1;
    if (cpse === 'BHEL') return 3;
    if (cpse === 'SAIL') return 4;
    return 0; // ONGC or default
  };

  const [selectedIdx, setSelectedIdx] = useState<number>(() => getIndexForCpse(activeCpse));
  const [prevActiveCpse, setPrevActiveCpse] = useState(activeCpse);

  if (prevActiveCpse !== activeCpse) {
    setPrevActiveCpse(activeCpse);
    setSelectedIdx(getIndexForCpse(activeCpse));
  }

  const active = examples[selectedIdx];

  return (
    <div className="space-y-4 font-mono">
      {/* 1. Header */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                STEP 2 COMPLETED • ATTRIBUTES NORMALIZED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-[#0B192C] text-sky-200 border border-sky-800 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                STEP 2 OF 5 • IN PROGRESS
              </span>
            )}
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-700" />
              AI Technical Attribute Normalization Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Deterministic rule engine: Normalizes raw abbreviations, imperial/metric units, ASME/ASTM metallurgy, and standard noun-first nomenclature.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-500 font-sans font-semibold">Active Ingested Dataset:</span>
            <Badge value={active.original.cpse} />
            <span className="text-[11px] font-bold text-slate-800 font-mono">
              {active.original.cpse} Master Catalog
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600 font-bold font-sans">Scenario:</label>
            <select
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500"
            >
              {examples.map((ex, idx) => (
                <option key={ex.id} value={idx}>{ex.label}</option>
              ))}
            </select>
          </div>

          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Step 1</span>
            </button>
          )}

          {onNavigateToNext && (
            <button
              onClick={onNavigateToNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Next: Internal Duplicates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Step 1: ORIGINAL MATERIAL */}
      <div className="bg-white border border-slate-300 shadow-2xs">
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">1</span>
            ORIGINAL MATERIAL (RAW CPSE INGEST)
          </span>
          <span className="text-[10px] text-slate-500 font-bold">Source ERP: {active.original.erp}</span>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs">
            <span className="text-[10px] text-slate-500 block uppercase">CPSE Enterprise</span>
            <div className="mt-1 flex items-center gap-2">
              <Badge value={active.original.cpse} />
              <span className="font-bold text-slate-900">{active.original.cpse}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs">
            <span className="text-[10px] text-slate-500 block uppercase">Original Material Code</span>
            <div className="mt-1 font-bold text-sky-950 text-sm">{active.original.code}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs sm:col-span-1">
            <span className="text-[10px] text-slate-500 block uppercase">Original UOM</span>
            <div className="mt-1 font-bold text-slate-800">{active.original.uom}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs sm:col-span-3">
            <span className="text-[10px] text-slate-500 block uppercase">Original CPSE Description</span>
            <div className="mt-1 font-bold text-slate-900 bg-white p-2 border border-slate-200 text-xs">
              {active.original.description}
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Divider */}
      <div className="flex justify-center -my-2 text-slate-400">
        <ArrowDown className="w-5 h-5" />
      </div>

      {/* 3. Step 2: NORMALIZED ATTRIBUTES */}
      <div className="bg-white border border-slate-300 shadow-2xs">
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">2</span>
            NORMALIZED TECHNICAL ATTRIBUTES
          </span>
          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
            Parsed via Deterministic Parser Rules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2.5 px-4">Parameter</th>
                <th className="py-2.5 px-4">Raw Ingest Value</th>
                <th className="py-2.5 px-4">Standardized Normalized Value</th>
                <th className="py-2.5 px-4">Transformation Standard / Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {active.normalized.map((n, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-4 font-bold text-slate-900">{n.parameter}</td>
                  <td className="py-2 px-4 text-slate-600 bg-slate-50/50">{n.rawValue}</td>
                  <td className="py-2 px-4 font-bold text-emerald-900 bg-emerald-50/30">{n.normalizedValue}</td>
                  <td className="py-2 px-4 text-slate-500 font-sans text-[11px]">{n.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Down Arrow Divider */}
      <div className="flex justify-center -my-2 text-slate-400">
        <ArrowDown className="w-5 h-5" />
      </div>

      {/* 4. Step 3: STANDARDIZED DESCRIPTION */}
      <div className="bg-white border border-slate-300 shadow-2xs">
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">3</span>
            STANDARDIZED DESCRIPTION
          </span>
          <span className="text-[10px] text-slate-500 font-bold">Noun-First Engineering Syntax</span>
        </div>

        <div className="p-4 bg-slate-50 text-xs">
          <div className="p-3 bg-white border border-slate-300 rounded-xs font-bold text-slate-900 text-sm leading-relaxed">
            {active.standardizedDesc}
          </div>
          <p className="text-[11px] text-slate-500 font-sans mt-2">
            Compliant with Ministry of Petroleum & Natural Gas unified standard naming rules. Eliminates inconsistent CPSE abbreviations like "VLV", "IN", "CL.", "NOS".
          </p>
        </div>
      </div>

      {/* Down Arrow Divider */}
      <div className="flex justify-center -my-2 text-slate-400">
        <ArrowDown className="w-5 h-5" />
      </div>

      {/* 5. Step 4: NATIONAL MATERIAL CODE */}
      <div className="bg-white border border-slate-300 shadow-2xs">
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">4</span>
            NATIONAL MATERIAL CODE (CNMC) & GOVERNANCE STATUS
          </span>
          <Badge value={active.status} />
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-sky-50 border border-sky-300 rounded-xs">
            <span className="text-[10px] text-sky-800 block uppercase font-bold">Assigned National Code</span>
            <div className="mt-1 font-bold font-mono text-sky-950 text-base">{active.nationalCode}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs">
            <span className="text-[10px] text-slate-500 block uppercase">Standard Category</span>
            <div className="mt-1 font-bold text-slate-800">{active.category}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs">
            <span className="text-[10px] text-slate-500 block uppercase">UNSPSC Mapping</span>
            <div className="mt-1 font-bold text-slate-800">{active.unspsc}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs">
            <span className="text-[10px] text-slate-500 block uppercase">Governance Remark</span>
            <div className="mt-1 text-[11px] text-slate-700 font-sans font-semibold">{active.statusNote}</div>
          </div>
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="bg-white border border-slate-300 p-3.5 rounded-sm shadow-2xs flex items-center justify-between">
        <div>
          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Step 1: Ingestion</span>
            </button>
          )}
        </div>

        <div>
          {onNavigateToNext && (
            <button
              onClick={onNavigateToNext}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Proceed to Step 3: Eliminate Internal Duplicates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
