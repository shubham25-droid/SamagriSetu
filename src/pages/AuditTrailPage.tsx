/**
 * Audit Trail & Governance Compliance Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { ScrollText, ShieldCheck } from 'lucide-react';
import { AuditTrailTimelineTable } from '../components/audit/AuditTrailTimelineTable';

export const AuditTrailPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <ScrollText className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              National Material Master Governance & Compliance Audit Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Tamper-evident chronological log of all ingestion batches, automated NLP harmonization executions, reviewer approvals, and specification refinements across participating CPSEs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Immutable Ledger Verified
          </span>
        </div>
      </div>

      <AuditTrailTimelineTable />
    </div>
  );
};
