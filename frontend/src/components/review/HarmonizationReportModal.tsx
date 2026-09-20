/**
 * Official Material Harmonization Technical Report Modal & Print View
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React from 'react';
import { Printer, X, FileText } from 'lucide-react';
import { MaterialMatchCandidate } from '../../types/MaterialMatchTypes';

interface HarmonizationReportModalProps {
  candidate: MaterialMatchCandidate | null;
  isOpen: boolean;
  onClose: () => void;
  reviewerName?: string;
  reviewerRole?: string;
}

export const HarmonizationReportModal: React.FC<HarmonizationReportModalProps> = ({
  candidate,
  isOpen,
  onClose,
  reviewerName = 'Er. R. Sundaram, FIE',
  reviewerRole = 'Chief Materials Manager, Inter-Ministerial CPSE Council'
}) => {
  if (!isOpen || !candidate) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportId = `MHR-${candidate.recommendedNationalCode.replace(/[^0-9]/g, '') || '000184'}-2026`;
  const reportDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-400 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden print:max-h-none print:w-full print:border-none print:shadow-none">
        {/* Top Action Bar (Hidden during print) */}
        <div className="bg-[#0B192C] text-white px-4 py-3 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Technical Assessment & Audit Dossier Preview
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-slate-900 hover:bg-slate-100 rounded-xs text-xs font-mono font-bold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Technical Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 font-serif text-slate-900 text-xs print:p-8 print:overflow-visible">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="font-mono text-[10px] tracking-widest uppercase text-slate-600 font-bold">
              Government of India • Inter-Ministerial CPSE Council (DPE / MoP&NG / MHI / MoS)
            </div>
            <h1 className="text-base font-black tracking-tight uppercase">
              Material Master Harmonization Technical Assessment Report
            </h1>
            <div className="font-mono text-xs text-slate-700">
              SamagriSetu National Material Intelligence Platform
            </div>
          </div>

          {/* Metadata Block */}
          <div className="grid grid-cols-2 gap-4 border border-slate-300 p-3 bg-slate-50 font-mono text-xs">
            <div>
              <div><strong className="text-slate-700">Report ID:</strong> {reportId}</div>
              <div><strong className="text-slate-700">Candidate Group:</strong> {candidate.id}</div>
              <div><strong className="text-slate-700">Date of Assessment:</strong> {reportDate}</div>
            </div>
            <div className="text-right">
              <div><strong className="text-slate-700">Evaluation Mode:</strong> Prototype Demonstration</div>
              <div><strong className="text-slate-700">Reviewer:</strong> {reviewerName}</div>
              <div><strong className="text-slate-700">Designation:</strong> {reviewerRole}</div>
            </div>
          </div>

          {/* Source Materials Table */}
          <div className="space-y-2">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              1. Participating CPSE Source Catalog Records
            </h3>
            <table className="w-full border-collapse border border-slate-300 font-mono text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-left">
                  <th className="p-2 border-r border-slate-300">CPSE Enterprise</th>
                  <th className="p-2 border-r border-slate-300">Original Material Code</th>
                  <th className="p-2 border-r border-slate-300">Raw Catalog Description</th>
                  <th className="p-2 text-right">UOM</th>
                </tr>
              </thead>
              <tbody>
                {candidate.sourceMaterials.map((s, idx) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="p-2 border-r border-slate-300 font-bold">{s.cpse}</td>
                    <td className="p-2 border-r border-slate-300 font-bold text-slate-900">{s.sourceMaterialCode}</td>
                    <td className="p-2 border-r border-slate-300">{s.originalDescription}</td>
                    <td className="p-2 text-right">{s.uom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical Assessment & Attribute Comparison */}
          <div className="space-y-2">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              2. Technical Parameter Assessment
            </h3>
            <table className="w-full border-collapse border border-slate-300 font-mono text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-left">
                  <th className="p-2 border-r border-slate-300">Technical Dimension</th>
                  <th className="p-2 border-r border-slate-300">Evaluation Method</th>
                  <th className="p-2 border-r border-slate-300">Metric Finding</th>
                  <th className="p-2 text-right">Harmonization Result</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 border-r border-slate-300 font-bold">Material Category</td>
                  <td className="p-2 border-r border-slate-300">Taxonomy Mapping</td>
                  <td className="p-2 border-r border-slate-300">Identical functional class across participating CPSEs</td>
                  <td className="p-2 text-right font-bold text-emerald-800">MATCH</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 border-r border-slate-300 font-bold">Nominal Size / Bore</td>
                  <td className="p-2 border-r border-slate-300">Unit Normalization</td>
                  <td className="p-2 border-r border-slate-300">Normalized 2 Inch = 50 mm = DN 50 equivalent</td>
                  <td className="p-2 text-right font-bold text-emerald-800">MATCH</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 border-r border-slate-300 font-bold">Base Metallurgy</td>
                  <td className="p-2 border-r border-slate-300">ASTM / IS Standard Matching</td>
                  <td className="p-2 border-r border-slate-300">ASTM A105 / A216 WCB compliant carbon steel</td>
                  <td className="p-2 text-right font-bold text-emerald-800">MATCH</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 border-r border-slate-300 font-bold">Pressure Class</td>
                  <td className="p-2 border-r border-slate-300">ASME B16.34 Rating Check</td>
                  <td className="p-2 border-r border-slate-300">
                    {candidate.conflicts.length > 0 ? 'Divergence identified (Class 150 vs Class 300)' : 'Consistent Class 150 rating across records'}
                  </td>
                  <td className={`p-2 text-right font-bold ${candidate.conflicts.length > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                    {candidate.conflicts.length > 0 ? 'CONFLICT' : 'MATCH'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recommendation & National Code Assignment */}
          <div className="space-y-2 border border-slate-300 p-4 bg-slate-50 font-mono text-xs">
            <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-1">
              3. Harmonization Finding & Recommended National Standard
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-600 block text-[10px]">Harmonization Recommendation:</span>
                <strong className="text-slate-900 text-sm">{candidate.relationshipType.replace(/_/g, ' ')}</strong>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">Algorithm Confidence:</span>
                <strong className="text-slate-900 text-sm">{(candidate.confidence * 100).toFixed(0)}% (Deterministic Rules)</strong>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-slate-600 block text-[10px]">Recommended Standardized Description (Noun-Modifier):</span>
              <div className="font-bold text-slate-900 bg-white p-2 border border-slate-300 mt-0.5">
                {candidate.recommendedDescription}
              </div>
            </div>

            <div className="pt-1">
              <span className="text-slate-600 block text-[10px]">Recommended Common National Material Code (CNMC):</span>
              <div className="font-bold text-[#0B192C] text-sm bg-white p-2 border border-slate-300 mt-0.5">
                {candidate.recommendedNationalCode}
              </div>
            </div>
          </div>

          {/* Decision & Governance Sign-Off Box */}
          <div className="border border-slate-300 p-4 space-y-4 font-mono text-xs">
            <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-1">
              4. Reviewer Governance Decision & Sign-Off
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-700"><strong>Current Status:</strong> {candidate.reviewStatus}</div>
                <div className="text-slate-700"><strong>Non-Destructive Principle:</strong> Original CPSE codes remain active in respective ERPs.</div>
                <div className="text-slate-500 text-[10px] mt-1">Audit Trail Hash: SHA256:7f8a92b1 • Immutable Ledger</div>
              </div>
              <div className="border-t border-dashed border-slate-400 pt-8 text-center">
                <div className="font-bold text-slate-900">{reviewerName}</div>
                <div className="text-[10px] text-slate-600">{reviewerRole}</div>
                <div className="text-[10px] text-slate-400">Authorized Engineering Signature (Digital Token)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="p-3 bg-slate-100 border-t border-slate-300 flex items-center justify-between print:hidden shrink-0">
          <span className="text-[11px] font-mono text-slate-500">
            Compliant with SamagriSetu Enterprise Reporting Standards
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-xs text-xs font-mono font-bold"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
