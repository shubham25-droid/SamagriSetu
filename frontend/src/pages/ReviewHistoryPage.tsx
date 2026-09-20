/**
 * Review History & Decision Archive Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { MaterialMatchingService } from '../services/MaterialMatchingService';
import { Badge } from '../components/shared/Badge';

export const ReviewHistoryPage: React.FC = () => {
  const candidates = MaterialMatchingService.getCandidates();
  const decided = candidates.filter((c) => c.reviewStatus !== 'PENDING_REVIEW');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-sky-100 text-sky-800">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Governance Review History & Audit Decisions
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historical log of reviewer approvals, rejections, and specification refinements across CPSE material proposals.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-mono text-slate-600 uppercase">
                <th className="py-3 px-4 font-bold">National Code</th>
                <th className="py-3 px-4 font-bold">Material Title</th>
                <th className="py-3 px-4 font-bold">Decision</th>
                <th className="py-3 px-4 font-bold">Reviewer</th>
                <th className="py-3 px-4 font-bold">Date & Time</th>
                <th className="py-3 px-4 font-bold">Reviewer Remark / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decided.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-mono text-xs">
                    No finalized reviewer decisions yet. Approve or reject candidates in the Pending Reviews center.
                  </td>
                </tr>
              ) : (
                decided.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-mono font-bold text-sky-900 whitespace-nowrap">
                      {c.recommendedNationalCode}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <Badge value={c.reviewStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                      {c.reviewerDecision?.reviewerName || 'Er. R. Sundaram'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {c.reviewerDecision?.timestamp || '17 Sep 2026 11:20 IST'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs max-w-sm">
                      {c.reviewerDecision?.reason || 'Verified technical attributes and cross-CPSE equivalence.'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
