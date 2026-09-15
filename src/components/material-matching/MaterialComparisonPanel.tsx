/**
 * Technical Comparison Workstation & Conflict Analysis Panel
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React from 'react';
import {
  CheckCircle2,
  XCircle,
    ShieldAlert,
    Check,
  X,
  } from 'lucide-react';
import { MaterialMatchCandidate } from '../../types/MaterialMatchTypes';
import { Badge } from '../shared/Badge';

interface MaterialComparisonPanelProps {
  candidate: MaterialMatchCandidate;
  onApprove: (candidate: MaterialMatchCandidate) => void;
  onReject: (candidate: MaterialMatchCandidate) => void;
  onModify: (candidate: MaterialMatchCandidate) => void;
}

export const MaterialComparisonPanel: React.FC<MaterialComparisonPanelProps> = ({
  candidate,
  onApprove,
  onReject,
  onModify,
}) => {
  const hasConflict = candidate.conflicts && candidate.conflicts.length > 0;
  const isApproved = candidate.reviewStatus === 'APPROVED' || candidate.reviewStatus === 'MODIFIED_AND_APPROVED';
  const isRejected = candidate.reviewStatus === 'REJECTED';

  return (
    <div className="space-y-4 font-mono">
      {/* 1. Workstation Header */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            TECHNICAL COMPARISON WORKSTATION • CANDIDATE REVIEW
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            {candidate.title}
          </h2>
          <div className="text-xs text-slate-500 font-sans mt-0.5 flex flex-wrap items-center gap-2">
            <span>Cluster: <strong className="font-mono text-slate-800">{candidate.id}</strong></span>
            <span>•</span>
            <span>CPSEs: <strong className="text-slate-800">{candidate.sourceMaterials.map(s => s.cpse).join(', ')}</strong></span>
            <span>•</span>
            <span>Relationship: <strong className="text-sky-950 font-mono">{candidate.relationshipType}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge value={candidate.reviewStatus} />
          {candidate.scenarioLabel && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold">
              Harmonization Case
            </span>
          )}
        </div>
      </div>

      {/* 2. Side-by-Side Source Records Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {candidate.sourceMaterials.map((src, idx) => {
          const letter = String.fromCharCode(65 + idx);
          return (
            <div key={src.id || idx} className="bg-white border border-slate-300 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="px-3 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    SOURCE RECORD {letter}
                  </span>
                  <Badge value={src.cpse} size="sm" />
                </div>

                <div className="p-3 space-y-2 text-xs border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Material Code</span>
                    <span className="font-bold text-sky-950 text-sm">{src.sourceMaterialCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Original Description</span>
                    <div className="p-1.5 bg-slate-50 border border-slate-200 text-slate-800 text-[11px] leading-snug break-words">
                      {src.originalDescription}
                    </div>
                  </div>
                </div>

                {/* Technical Parameters Table */}
                <div className="p-3 text-[11px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                    Technical Attributes:
                  </span>
                  <div className="space-y-1">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Material / Type:</span>
                      <span className="font-bold text-slate-800">{src.materialCategory || '—'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Size / Dia:</span>
                      <span className="font-bold text-slate-800">{src.size || '—'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Grade / Metallurgy:</span>
                      <span className="font-bold text-slate-800">{src.materialGrade || '—'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Unit of Measure (UOM):</span>
                      <span className="font-bold text-slate-800">{src.uom}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Pressure Rating:</span>
                      <span className="font-bold text-slate-800">{src.pressureRating || '—'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Governing Standard:</span>
                      <span className="font-bold text-slate-800">{src.standard || '—'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Specification:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[120px]">{src.specification || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between">
                <span>ERP: {src.cpse === 'ONGC' ? 'SAP S/4HANA' : 'SAP ECC 6.0'}</span>
                <span>Row #{src.sourceRow || (idx + 1)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. HARD CONFLICT SCREEN / PANEL (Section 11) */}
      {hasConflict ? (
        <div className="bg-rose-50/60 border-2 border-rose-400 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-rose-300 pb-2">
            <div className="flex items-center gap-2 text-rose-900">
              <ShieldAlert className="w-5 h-5 text-rose-700" />
              <span className="font-bold text-sm uppercase tracking-wider">
                CRITICAL TECHNICAL CONFLICT DETECTED
              </span>
            </div>
            <span className="px-2 py-0.5 bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wide">
              Automated Merge Blocked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse bg-white border border-rose-300">
              <thead>
                <tr className="border-b border-rose-300 bg-rose-100/70 text-[11px] text-rose-950 uppercase font-bold">
                  <th className="py-2 px-3">Conflicting Parameter</th>
                  <th className="py-2 px-3">Source Record Values</th>
                  <th className="py-2 px-3">Engineering Safety Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-200 text-rose-950">
                {candidate.conflicts.map((cnf, cIdx) => (
                  <tr key={cIdx}>
                    <td className="py-2.5 px-3 font-bold text-rose-900">{cnf.attribute}</td>
                    <td className="py-2.5 px-3">
                      <div className="space-y-0.5">
                        {Object.entries(cnf.conflictingValues).map(([srcCode, val]) => (
                          <div key={srcCode} className="text-xs">
                            <span className="text-slate-500">{srcCode}:</span> <strong className="text-rose-900">{val}</strong>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] leading-snug font-sans text-rose-900">
                      {cnf.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-white border border-rose-300 text-xs text-rose-950 space-y-1">
            <div className="font-bold text-[11px] uppercase tracking-wider text-rose-900">
              SYSTEM GOVERNANCE ASSESSMENT:
            </div>
            <p className="font-sans text-slate-800">
              Potentially different technical or safety requirement. Automatic consolidation is not recommended without mechanical engineering signoff.
            </p>
            <div className="font-mono text-xs text-slate-700 pt-1">
              Status: <strong className="text-rose-800 bg-rose-100 px-2 py-0.5 border border-rose-300">REQUIRES REVIEW</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onReject(candidate)}
              className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xs text-xs font-bold transition-colors"
            >
              Keep Separate (Enforce Distinct National Codes)
            </button>
            <button
              onClick={() => onModify(candidate)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xs text-xs font-bold transition-colors"
            >
              Send for Technical Review
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 p-3 text-xs flex items-center justify-between text-emerald-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>
              <strong>TECHNICAL CONFLICTS:</strong> No critical conflicts detected. Form, fit, function, metallurgy, and pressure specs are compatible across all source records.
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 uppercase">
            Safe for National Standardization
          </span>
        </div>
      )}

      {/* 4. MATCH ASSESSMENT & EVIDENCE CHECKLIST */}
      <div className="bg-white border border-slate-300 shadow-2xs">
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            MATCH ASSESSMENT & EVIDENCE AUDIT
          </span>
          <div className="flex items-center gap-3 text-xs">
            <span>Classification: <strong className="text-slate-900 font-bold">{candidate.relationshipType}</strong></span>
            <span>Confidence: <strong className="text-emerald-800 font-bold">{(candidate.confidence * 100).toFixed(0)}%</strong></span>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Evidence Checklist */}
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
              Rule-Based Verification Evidence:
            </span>
            <div className="space-y-1.5">
              {candidate.evidence.map((ev, eIdx) => (
                <div
                  key={eIdx}
                  className={`p-2 border rounded-xs flex items-start gap-2 ${
                    ev.passed ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  {ev.passed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-700 mt-0.5 shrink-0" />
                  )}
                  <span className="font-sans text-[11px] leading-snug">{ev.point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Normalized Attributes Summary */}
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
              Harmonized Standard Parameters:
            </span>
            <div className="border border-slate-300 divide-y divide-slate-200 text-[11px] bg-slate-50">
              {Object.entries(candidate.normalizedAttributes).map(([key, val]) => (
                <div key={key} className="px-3 py-1.5 flex justify-between">
                  <span className="text-slate-500 uppercase text-[10px]">{key}:</span>
                  <strong className="text-slate-900 font-bold">{val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDATION & GOVERNANCE ACTION BAR (Section 10) */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            STANDARDIZATION RECOMMENDATION
          </span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center mt-2">
            <div className="md:col-span-8">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                Standardized Description:
              </span>
              <div className="font-bold text-slate-900 text-sm mt-0.5 p-2 bg-slate-50 border border-slate-200">
                {candidate.recommendedDescription}
              </div>
            </div>

            <div className="md:col-span-4">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                Recommended Common National Material Code:
              </span>
              <div className="font-mono font-black text-sky-950 text-base mt-0.5 p-2 bg-sky-50 border border-sky-300">
                {candidate.recommendedNationalCode}
              </div>
            </div>
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-slate-500 font-sans">
            Officer decisions are logged immutably in the national audit ledger with timestamp and credentials.
          </div>

          <div className="flex items-center gap-2">
            {isApproved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xs text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Approved & Harmonized into National Master
              </span>
            ) : isRejected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-900 border border-rose-300 rounded-xs text-xs font-bold">
                <XCircle className="w-4 h-4 text-rose-700" />
                Rejected by Reviewer
              </span>
            ) : (
              <>
                <button
                  onClick={() => onApprove(candidate)}
                  disabled={hasConflict}
                  title={hasConflict ? 'Approval prohibited while safety conflict is active' : 'Approve recommendation'}
                  className={`px-4 py-2 text-xs font-bold rounded-xs transition-colors ${
                    hasConflict
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                      : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                  }`}
                >
                  [ APPROVE ]
                </button>

                <button
                  onClick={() => onModify(candidate)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold rounded-xs transition-colors"
                >
                  [ SEND FOR REVIEW ]
                </button>

                <button
                  onClick={() => onReject(candidate)}
                  className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 text-xs font-bold rounded-xs transition-colors"
                >
                  [ REJECT ]
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
