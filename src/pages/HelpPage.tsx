/**
 * Operational User Manual & Governance Reference Guide
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React from 'react';
import {
  HelpCircle,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Network
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Operational User Manual & Governance Guidance
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Standard operating procedure for CPSE material master managers, technical reviewers, and procurement officers under Ministry of Petroleum & Natural Gas.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-xs bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-300 self-start md:self-auto">
          SamagriSetu SOP v2.4 • MoP&NG Compliance Framework
        </span>
      </div>

      {/* 1. Core Problem & Mission Statement */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0B192C]" />
          1. Problem Statement Context & National Objective
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed">
          Different Central Public Sector Enterprises (CPSEs) maintain material master catalogs independently across heterogeneous ERP systems (SAP ECC 6.0, SAP S/4HANA, Oracle EBS, legacy SQL systems). Functionally equivalent or physically identical materials are cataloged under completely disparate codes, abbreviations, descriptions, and units of measure.
        </p>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs text-xs font-mono space-y-1.5 text-slate-800">
          <div className="font-bold text-slate-900 mb-1">Example of Cross-Enterprise Catalog Fragmentation:</div>
          <div>• <strong>ONGC:</strong> <code className="bg-white px-1 border border-slate-300">ONGC-BV-1023</code> — "BALL V/V 2 IN CS" (SAP S/4HANA)</div>
          <div>• <strong>IOCL:</strong> <code className="bg-white px-1 border border-slate-300">IOCL-VAL-7781</code> — "2" CARBON STEEL BALL VALVE" (SAP ECC 6.0)</div>
          <div>• <strong>BHEL:</strong> <code className="bg-white px-1 border border-slate-300">BHEL-M-5512</code> — "BALL V/V 50MM CS" (Oracle EBS)</div>
          <div>• <strong>SAIL:</strong> <code className="bg-white px-1 border border-slate-300">SAIL-VAL-3301</code> — "BALL VALVE 50 NB CL150 CS FLGD" (Legacy ERP)</div>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          SamagriSetu identifies technical convergence across these records, generates a <strong>Recommended Common National Material Code (CNMC)</strong>, and maintains non-destructive bi-directional cross-indexes without altering internal CPSE general ledgers or plant asset registries.
        </p>
      </div>

      {/* 2. End-to-End Operational Lifecycle */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <Network className="w-4 h-4 text-[#0B192C]" />
          2. End-to-End Operational Lifecycle (9 Distinct Stages)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 1: Ingestion & Staging</span>
            <p className="text-slate-600 text-[11px]">ETL pipeline loads raw CSV / ERP exports. Validates column headers, checks for duplicate source codes, and normalizes UOMs.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 2: Attribute Extraction</span>
            <p className="text-slate-600 text-[11px]">Isolates size, nominal bore, metallurgy grade, pressure class, and governing design standard with exact source evidence pointers.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 3: Multi-Attribute Matching</span>
            <p className="text-slate-600 text-[11px]">Evaluates attribute compatibility across enterprises using deterministic rules rather than relying solely on raw text similarity.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 4: Conflict Interception</span>
            <p className="text-slate-600 text-[11px]">Hard safety constraints (Class 150 vs 300, SS304 vs SS316) trigger immediate review holds and prevent hazardous automated merges.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 5: Standardization & CNMC</span>
            <p className="text-slate-600 text-[11px]">Synthesizes canonical Noun-Modifier descriptions and assigns structured Common National Material Codes (e.g. CNMC-000184).</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 6: Human Engineering Sign-Off</span>
            <p className="text-slate-600 text-[11px]">Authorized CPSE reviewers inspect side-by-side specs, adjust descriptions if necessary, and approve or reject candidates.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 7: National Master Inclusion</span>
            <p className="text-slate-600 text-[11px]">Authorized records enter the official national registry, publishing verified specs and active multi-CPSE coverage counts.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 8: Legacy Traceability Mapping</span>
            <p className="text-slate-600 text-[11px]">Bi-directional lookup tables preserve every native enterprise code. Enables bulk rate procurement without modifying local ERP codes.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-[#0B192C]">STAGE 9: Immutable Audit Trail</span>
            <p className="text-slate-600 text-[11px]">Every ingestion batch, attribute extraction, reviewer decision, and mapping revision is cryptographically timestamped and logged.</p>
          </div>
        </div>
      </div>

      {/* 3. Hard Technical Conflict Rules */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          3. Safety-Critical Technical Conflict Rules Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 font-mono text-[11px] text-slate-800 uppercase">
                <th className="py-2 px-3">Parameter Divergence</th>
                <th className="py-2 px-3">Examined Materials</th>
                <th className="py-2 px-3">Engineering Hazard / Consequence</th>
                <th className="py-2 px-3">System Governance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono font-bold text-rose-800">Pressure Rating</td>
                <td className="py-2 px-3 font-mono text-[11px]">Class 150 (20 Bar) vs Class 300 (50 Bar)</td>
                <td className="py-2 px-3 text-slate-700">Catastrophic flange rupture or seal blow-out under high-pressure hydrocarbons.</td>
                <td className="py-2 px-3 font-mono text-rose-800 font-bold">Hard Lock: Retain Separately</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono font-bold text-rose-800">Metallurgy Grade</td>
                <td className="py-2 px-3 font-mono text-[11px]">Carbon Steel A105 vs SS316L Stainless</td>
                <td className="py-2 px-3 text-slate-700">Accelerated chemical pitting and sour-gas corrosion failure in marine/sour refinery units.</td>
                <td className="py-2 px-3 font-mono text-rose-800 font-bold">Hard Lock: Retain Separately</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono font-bold text-amber-800">Wall Thickness</td>
                <td className="py-2 px-3 font-mono text-[11px]">Schedule 40 (Standard) vs Schedule 80 (Extra Strong)</td>
                <td className="py-2 px-3 text-slate-700">Internal flow velocity restriction and insufficient pipe hoop strength under transient surge.</td>
                <td className="py-2 px-3 font-mono text-amber-800 font-bold">Flag: Technical Review Required</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono font-bold text-amber-800">Seal Material</td>
                <td className="py-2 px-3 font-mono text-[11px]">EPDM Elastomer vs Flexible Graphite Gasket</td>
                <td className="py-2 px-3 text-slate-700">Thermal degradation and fire-safe integrity failure above 150°C operating temperatures.</td>
                <td className="py-2 px-3 font-mono text-amber-800 font-bold">Flag: Technical Review Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Five Standard Match Classifications */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          4. Material Match Classifications & Action Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-emerald-800">SAME MATERIAL</span>
            <p className="text-slate-700 text-[11px]">Identical physical specifications, metallurgy, pressure class, and dimensional fit across CPSEs despite varying phrasing. Eligible for immediate CNMC assignment.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-sky-800">NEAR-DUPLICATE</span>
            <p className="text-slate-700 text-[11px]">Same core equipment with minor non-functional differences (e.g. paint specification, brand stamping, or packaging differences). Recommended for standardized harmonization.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-indigo-800">FUNCTIONALLY EQUIVALENT</span>
            <p className="text-slate-700 text-[11px]">Interchangeable industrial equipment from different certified OEMs (e.g. Rosemount 3051S vs Yokogawa EJX110A transmitters). Allows joint bidding contracts.</p>
          </div>
          <div className="p-3 rounded-xs border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-mono font-bold text-amber-800">REQUIRES REVIEW / CONFLICT</span>
            <p className="text-slate-700 text-[11px]">Textual similarity is high but key engineering constraints diverge. Mandatory human sign-off required; automated merge is strictly blocked.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
