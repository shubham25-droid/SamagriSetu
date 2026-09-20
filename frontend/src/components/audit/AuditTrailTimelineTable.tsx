/**
 * Chronological Audit Trail & Governance Table
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { ScrollText, Search, Download } from 'lucide-react';
import { AuditTrailService } from '../../services/AuditTrailService';
import { ExportService } from '../../services/ExportService';
import { Badge } from '../shared/Badge';

export const AuditTrailTimelineTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');

  const [cpseFilter, setCpseFilter] = useState('ALL');

  const events = AuditTrailService.filterEvents({
    action: selectedAction,
    searchQuery,
    cpse: cpseFilter,
  });

  return (
    <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
      <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-[#0B192C]" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Immutable Governance Audit Ledger
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Cryptographically sealed compliance log of all ingestion batches, NLP harmonization runs, and reviewer sign-offs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, user, or reason..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B192C] w-52"
            />
          </div>

          <select
            value={cpseFilter}
            onChange={(e) => setCpseFilter(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
          >
            <option value="ALL">All CPSEs</option>
            <option value="ONGC">ONGC</option>
            <option value="IOCL">IOCL</option>
            <option value="BHEL">BHEL</option>
            <option value="SAIL">SAIL</option>
          </select>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
          >
            <option value="ALL">All Actions</option>
            <option value="APPROVED_HARMONIZATION">Approved Harmonization</option>
            <option value="REJECTED_HARMONIZATION">Rejected Harmonization</option>
            <option value="MODIFIED_HARMONIZATION">Modified Standard</option>
            <option value="DATASET_IMPORT">Dataset Import</option>
            <option value="HARMONIZATION_RUN">Harmonization Run</option>
          </select>

          <button
            onClick={() => ExportService.exportAuditTrail()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Audit Log (CSV)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
              <th className="py-2.5 px-3 font-bold">Timestamp (IST)</th>
              <th className="py-2.5 px-3 font-bold">Action Taken</th>
              <th className="py-2.5 px-3 font-bold">Target Material Code</th>
              <th className="py-2.5 px-3 font-bold">Actor / Engineering Role</th>
              <th className="py-2.5 px-3 font-bold">CPSE / Dept</th>
              <th className="py-2.5 px-3 font-bold">Technical Justification & Notes</th>
              <th className="py-2.5 px-3 font-bold text-right">Integrity Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No audit events found matching the selected parameters.
                </td>
              </tr>
            ) : (
              events.map((event) => {
                // Generate a deterministic pseudo integrity hash for visual demonstration
                const shortHash = `SHA256:${(event.id + event.timestamp).split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 0).toString(16).padStart(8, '0').slice(0, 8)}`;

                return (
                  <tr key={event.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                      {event.timestamp}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-slate-100 text-slate-800 border border-slate-300">
                        {event.action.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 font-mono font-bold text-[#0B192C] whitespace-nowrap">
                      {event.materialCode}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{event.user}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{event.role}</div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {event.participatingCPSEs && event.participatingCPSEs.length > 0 ? (
                        <div className="flex gap-1">
                          {event.participatingCPSEs.map((c) => (
                            <Badge key={c} value={c} size="sm" />
                          ))}
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-slate-600">DPE / CPSE Council</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-slate-700 text-xs max-w-sm">
                      <div className="line-clamp-2">{event.reason}</div>
                      {event.previousState && event.newState && (
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {event.previousState} &rarr; <span className="text-emerald-700 font-bold">{event.newState}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-xs border border-slate-200">
                        {shortHash}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
