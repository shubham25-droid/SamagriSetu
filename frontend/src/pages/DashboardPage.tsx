/**
 * Administrative Control Room Dashboard Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Building2,
  UploadCloud
} from 'lucide-react';
import { MaterialMatchingService } from '../services/MaterialMatchingService';
import { Badge } from '../components/shared/Badge';

interface DashboardPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectScenario: (scenarioId: string) => void;
  currentUser?: { name: string; org: string; role: string };
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectScenario,
  currentUser,
}) => {
  const candidates = MaterialMatchingService.getCandidates();

  const cpseMasterSummary = [
    {
      cpse: 'ONGC',
      fullName: 'Oil and Natural Gas Corporation',
      records: 100,
      potentialMatches: 22,
      pendingReviews: 1,
      harmonized: 48,
      erp: 'SAP S/4HANA (MARA)',
      status: 'Synchronized',
    },
    {
      cpse: 'IOCL',
      fullName: 'Indian Oil Corporation Limited',
      records: 100,
      potentialMatches: 26,
      pendingReviews: 1,
      harmonized: 52,
      erp: 'SAP ECC 6.0 (MAKT)',
      status: 'Synchronized',
    },
    {
      cpse: 'BHEL',
      fullName: 'Bharat Heavy Electricals Limited',
      records: 100,
      potentialMatches: 18,
      pendingReviews: 1,
      harmonized: 44,
      erp: 'SAP ECC 6.0 (MARA)',
      status: 'Synchronized',
    },
    {
      cpse: 'SAIL',
      fullName: 'Steel Authority of India Limited',
      records: 100,
      potentialMatches: 19,
      pendingReviews: 1,
      harmonized: 42,
      erp: 'SAP ECC 6.0 (MARA)',
      status: 'Synchronized',
    },
  ];

  const recentActivityEvents = [
    {
      timestamp: '24 Aug 2026, 10:42 AM',
      user: 'Er. R. Sundaram (Chief Reviewer)',
      action: 'Approved National Code',
      material: 'Ball Valve 2" SS316 150# Screwed (CNMC-000002)',
      prevState: 'PENDING_REVIEW',
      newState: 'APPROVED',
      status: 'VERIFIED',
    },
    {
      timestamp: '24 Aug 2026, 09:30 AM',
      user: 'Safety Rule Engine',
      action: 'Hard Technical Conflict Lock',
      material: 'Pressure Transmitter 4-20mA (0-25 Bar vs 0-100 Bar)',
      prevState: 'UNEVALUATED',
      newState: 'SAFETY_HOLD',
      status: 'FLAGGED',
    },
    {
      timestamp: '24 Aug 2026, 09:15 AM',
      user: 'Safety Rule Engine',
      action: 'Specification Conflict Flag',
      material: 'Seamless Pipe 4" A106 Gr B (SCH 40 vs SCH 80)',
      prevState: 'UNEVALUATED',
      newState: 'TECHNICAL_HOLD',
      status: 'FLAGGED',
    },
    {
      timestamp: '24 Aug 2026, 08:45 AM',
      user: 'CPSE Ingestion Gateway',
      action: 'Ingested Dataset Batch',
      material: 'SAIL Material Master (100 verified records)',
      prevState: 'UPLOADED',
      newState: 'INGESTED',
      status: 'COMPLETED',
    },
    {
      timestamp: '24 Aug 2026, 08:30 AM',
      user: 'CPSE Ingestion Gateway',
      action: 'Ingested Dataset Batch',
      material: 'BHEL Material Master (100 verified records)',
      prevState: 'UPLOADED',
      newState: 'INGESTED',
      status: 'COMPLETED',
    },
  ];

  const isCPSEOfficer = currentUser?.role === 'CPSE Enterprise Nodal Officer';
  const cpseName = currentUser?.org?.includes('IOCL')
    ? 'IOCL'
    : currentUser?.org?.includes('BHEL')
    ? 'BHEL'
    : currentUser?.org?.includes('SAIL')
    ? 'SAIL'
    : 'ONGC';

  return (
    <div className="space-y-4">
      {/* 1. Header: Administrative Overview or CPSE Workstation */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              {isCPSEOfficer ? `PLANT OPERATIONS • ${cpseName} ENTERPRISE WORKSTATION` : 'CONTROL ROOM • Inter-Ministerial CPSE Council'}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300">
              {isCPSEOfficer ? `${cpseName} ERP SYNC ACTIVE` : 'FEDERATED MASTER ACTIVE'}
            </span>
          </div>
          <div className="mt-1">
            <h1 className="text-lg font-bold text-[#0B192C] tracking-tight leading-tight">
              {isCPSEOfficer
                ? `${cpseName} Material Standardization & Catalog Operations`
                : 'National Material Master Harmonization Dashboard'}
            </h1>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              {isCPSEOfficer
                ? `Local plant inventory ingestion, internal duplicate rationalization, and cross-CPSE mapping to GeM National Master.`
                : 'Real-time multi-CPSE master inventory health, candidate cluster duplicate detection, and governance audit status.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          {isCPSEOfficer && (
            <button
              onClick={() => onNavigate('cpse-import')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm text-xs font-bold transition-all shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Plant CSV</span>
            </button>
          )}

          <div className="bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-sm hidden sm:block">
            <div className="text-[10px] text-slate-500">{isCPSEOfficer ? 'Connected ERP:' : 'Connected Nodes:'}</div>
            <div className="font-semibold text-sky-900">
              {isCPSEOfficer ? `${cpseName} SAP S/4HANA (MARA)` : 'ONGC | IOCL | BHEL | SAIL'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY TABLE / KPI STRIP */}
      {isCPSEOfficer ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-slate-300 bg-white divide-x divide-y lg:divide-y-0 divide-slate-200 text-xs font-mono shadow-2xs">
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">{cpseName} Plant Records</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">100</span>
            <span className="text-[10px] text-emerald-700 font-semibold">100% Ingested & Verified</span>
          </div>
          <div className="p-3 bg-amber-50/40">
            <span className="text-[10px] text-amber-800 block uppercase font-bold">Internal Duplicates</span>
            <span className="text-xl font-bold text-amber-900 mt-1 block">8</span>
            <span className="text-[10px] text-amber-700">Intra-Plant Redundancies</span>
          </div>
          <div className="p-3 bg-sky-50/40">
            <span className="text-[10px] text-sky-800 block uppercase font-bold">Sister CPSE Matches</span>
            <span className="text-xl font-bold text-sky-950 mt-1 block">22</span>
            <span className="text-[10px] text-sky-700">Matches with IOCL/BHEL/SAIL</span>
          </div>
          <div className="p-3 bg-emerald-50/40">
            <span className="text-[10px] text-emerald-800 block uppercase font-bold">Mapped to CNMC</span>
            <span className="text-xl font-bold text-emerald-900 mt-1 block">48</span>
            <span className="text-[10px] text-emerald-700">Approved for GeM Cart</span>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">Technical Queries</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">1</span>
            <span className="text-[10px] text-slate-500">Safety Hold Verification</span>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">ERP Gateway</span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">ONLINE</span>
            <span className="text-[10px] text-slate-500">SAP RFC v2.4 Synchronized</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-slate-300 bg-white divide-x divide-y lg:divide-y-0 divide-slate-200 text-xs font-mono shadow-2xs">
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">Total Material Records</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">400</span>
            <span className="text-[10px] text-slate-500">100 / Enterprise</span>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">CPSEs Connected</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">4</span>
            <span className="text-[10px] text-emerald-700">All 4 Verified</span>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-slate-500 block uppercase">Potential Duplicate Groups</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">7</span>
            <span className="text-[10px] text-slate-500">Candidate Clusters</span>
          </div>
          <div className="p-3 bg-amber-50/40">
            <span className="text-[10px] text-amber-800 block uppercase font-bold">Pending Reviews</span>
            <span className="text-xl font-bold text-amber-900 mt-1 block">4</span>
            <span className="text-[10px] text-amber-700">Governance Queue</span>
          </div>
          <div className="p-3 bg-emerald-50/40">
            <span className="text-[10px] text-emerald-800 block uppercase font-bold">Approved Harmonizations</span>
            <span className="text-xl font-bold text-emerald-900 mt-1 block">3</span>
            <span className="text-[10px] text-emerald-700">Quad/Tri CPSE</span>
          </div>
          <div className="p-3 bg-sky-50/40">
            <span className="text-[10px] text-sky-800 block uppercase font-bold">National Materials</span>
            <span className="text-xl font-bold text-sky-950 mt-1 block">2</span>
            <span className="text-[10px] text-sky-700">Active CNMC Masters</span>
          </div>
        </div>
      )}

      {/* 2B. Dedicated Plant Operations Action Hub (Visible for CPSE Officers) */}
      {isCPSEOfficer && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-sans">
          {/* Action 1: Upload Plant CSV */}
          <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col justify-between hover:border-sky-500 transition-colors">
            <div>
              <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                <UploadCloud className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-[#0B192C] uppercase font-mono tracking-wider">
                1. Upload Plant CSV
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Ingest raw material codes from plant ERP (SAP/Oracle/Maximo). Automatic attribute extraction across ASME, API & IS standards.
              </p>
            </div>
            <button
              onClick={() => onNavigate('cpse-import')}
              className="mt-4 inline-flex items-center justify-between px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 text-slate-800 text-xs font-mono font-bold rounded border border-slate-300 transition-colors"
            >
              <span>Upload CSV File</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2: Internal Duplicate Rationalization */}
          <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col justify-between hover:border-sky-500 transition-colors">
            <div>
              <div className="w-8 h-8 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-[#0B192C] uppercase font-mono tracking-wider">
                2. Internal Duplicates
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Eliminate redundant inventory inside {cpseName}. Identify legacy codes referring to identical physical stock to optimize working capital.
              </p>
            </div>
            <button
              onClick={() => onNavigate('duplicate-detection')}
              className="mt-4 inline-flex items-center justify-between px-3 py-1.5 bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-800 text-xs font-mono font-bold rounded border border-slate-300 transition-colors"
            >
              <span>View 8 Duplicates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3: Cross-CPSE Matching Queue */}
          <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col justify-between hover:border-sky-500 transition-colors">
            <div>
              <div className="w-8 h-8 rounded bg-sky-100 text-sky-800 flex items-center justify-center font-bold mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-[#0B192C] uppercase font-mono tracking-wider">
                3. Sister CPSE Matches
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Inspect 22 equivalent items shared with IOCL, BHEL, & SAIL. Enforce safety hard-locks for pressure, schedule, and grade ratings.
              </p>
            </div>
            <button
              onClick={() => onNavigate('material-matching')}
              className="mt-4 inline-flex items-center justify-between px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:text-sky-900 text-slate-800 text-xs font-mono font-bold rounded border border-slate-300 transition-colors"
            >
              <span>Matching Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 4: GeM National Master */}
          <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col justify-between hover:border-sky-500 transition-colors">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold mb-3">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-[#0B192C] uppercase font-mono tracking-wider">
                4. National Master & GeM
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Track 48 catalog items successfully mapped to canonical CNMC codes, enabling bulk pooled procurement and instant procurement validation.
              </p>
            </div>
            <button
              onClick={() => onNavigate('national-master')}
              className="mt-4 inline-flex items-center justify-between px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-800 text-xs font-mono font-bold rounded border border-slate-300 transition-colors"
            >
              <span>GeM Master Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. MATERIAL MASTER STATUS TABLE */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              MATERIAL MASTER STATUS
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Source inventory distribution, potential duplicate matches, and harmonization completion per CPSE enterprise.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cpse-data')}
            className="text-xs font-mono text-sky-800 hover:text-sky-950 font-bold flex items-center gap-1"
          >
            View All 400 Records →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2.5 px-4">CPSE Enterprise</th>
                <th className="py-2.5 px-4 text-right">Master Records</th>
                <th className="py-2.5 px-4 text-right">Potential Matches</th>
                <th className="py-2.5 px-4 text-right">Reviews Pending</th>
                <th className="py-2.5 px-4 text-right">Harmonized Items</th>
                <th className="py-2.5 px-4">Source ERP Origin</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cpseMasterSummary.map((row) => (
                <tr key={row.cpse} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4">
                    <div className="font-bold text-slate-900">{row.cpse}</div>
                    <div className="text-[10px] text-slate-500 font-sans">{row.fullName}</div>
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">{row.records}</td>
                  <td className="py-2.5 px-4 text-right text-slate-700">{row.potentialMatches}</td>
                  <td className="py-2.5 px-4 text-right text-amber-700 font-bold">{row.pendingReviews}</td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 font-bold">{row.harmonized}</td>
                  <td className="py-2.5 px-4 text-slate-600">{row.erp}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <td className="py-2.5 px-4 text-slate-900">TOTAL / MASTER POOL</td>
                <td className="py-2.5 px-4 text-right text-slate-900">400</td>
                <td className="py-2.5 px-4 text-right text-slate-900">85</td>
                <td className="py-2.5 px-4 text-right text-amber-800">4</td>
                <td className="py-2.5 px-4 text-right text-emerald-800">186</td>
                <td className="py-2.5 px-4 text-slate-700">4 Connected Enterprise ERPs</td>
                <td className="py-2.5 px-4 text-right text-emerald-800">100% Ingested</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MATCHING WORK QUEUE TABLE */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              MATCHING WORK QUEUE
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Candidate clusters awaiting technical review, conflict resolution, or standardization approval.
            </p>
          </div>
          <button
            onClick={() => onNavigate('material-matching')}
            className="text-xs font-mono text-sky-800 hover:text-sky-950 font-bold flex items-center gap-1"
          >
            Open Matching Workstation →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Material Specification</th>
                <th className="py-2.5 px-4">CPSEs</th>
                <th className="py-2.5 px-4">Classification</th>
                <th className="py-2.5 px-4 text-right">Confidence</th>
                <th className="py-2.5 px-4">Conflict / Issue Assessment</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {candidates.map((c) => {
                const isConflict = c.conflicts && c.conflicts.length > 0;
                const priority = isConflict
                  ? 'HIGH'
                  : c.reviewStatus === 'APPROVED'
                  ? 'RESOLVED'
                  : 'MEDIUM';

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                          priority === 'HIGH'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : priority === 'RESOLVED'
                            ? 'bg-slate-100 text-slate-700 border border-slate-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {priority === 'HIGH' ? 'High (Hold)' : priority === 'RESOLVED' ? 'Resolved' : 'Medium'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900">{c.title}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-md">
                        {c.recommendedDescription}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {Array.from(new Set(c.sourceMaterials.map((s) => s.cpse))).map((cpse) => (
                          <Badge key={cpse} value={cpse} size="sm" />
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <Badge value={c.relationshipType} size="sm" />
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-800">
                      {(c.confidence * 100).toFixed(0)}%
                    </td>
                    <td className="py-2.5 px-4 text-[11px]">
                      {isConflict ? (
                        <span className="text-rose-700 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          {c.conflicts[0].attribute}: {c.conflicts[0].conflictingValues[Object.keys(c.conflicts[0].conflictingValues)[0]]} vs {c.conflicts[0].conflictingValues[Object.keys(c.conflicts[0].conflictingValues)[1]]}
                        </span>
                      ) : (
                        <span className="text-slate-600">
                          {c.evidence[0]?.point || 'Technical attributes verified'}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (c.scenarioId) onSelectScenario(c.scenarioId);
                          else onNavigate('material-matching');
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                      >
                        Review <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RECENT ACTIVITY TABLE */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              RECENT ACTIVITY & AUDIT LOG
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Chronological log of material standardization, conflict checks, and human governance decisions.
            </p>
          </div>
          <button
            onClick={() => onNavigate('audit-trail')}
            className="text-xs font-mono text-sky-800 hover:text-sky-950 font-bold"
          >
            Full Audit Ledger →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">User / Authority</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Material Reference</th>
                <th className="py-2.5 px-4">Previous State</th>
                <th className="py-2.5 px-4">New State</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentActivityEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 whitespace-nowrap text-slate-500">{evt.timestamp}</td>
                  <td className="py-2.5 px-4 whitespace-nowrap font-bold text-slate-800">{evt.user}</td>
                  <td className="py-2.5 px-4 whitespace-nowrap text-slate-800 font-semibold">{evt.action}</td>
                  <td className="py-2.5 px-4 text-slate-700 max-w-xs truncate">{evt.material}</td>
                  <td className="py-2.5 px-4 whitespace-nowrap text-slate-500">{evt.prevState}</td>
                  <td className="py-2.5 px-4 whitespace-nowrap font-bold text-sky-900">{evt.newState}</td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-300">
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

