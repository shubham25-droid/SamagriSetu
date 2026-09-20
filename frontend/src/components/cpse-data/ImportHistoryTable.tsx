/**
 * CPSE Data Import History Table
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { History, FileText, CheckCircle2 } from 'lucide-react';
import { ImportJob } from '../../types/ImportJobTypes';
import { Badge } from '../shared/Badge';

interface ImportHistoryTableProps {
  jobs: ImportJob[];
}

export const ImportHistoryTable: React.FC<ImportHistoryTableProps> = ({ jobs }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-4 h-4 text-sky-600" />
            CPSE Master Data Import History
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit log of all catalog files ingested from participating CPSEs (Synthetic Demo).
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
          {jobs.length} Ingestion Batches
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-mono text-slate-600 uppercase">
              <th className="py-3 px-4 font-bold">CPSE</th>
              <th className="py-3 px-4 font-bold">File Name</th>
              <th className="py-3 px-4 font-bold">Records Ingested</th>
              <th className="py-3 px-4 font-bold">Imported By</th>
              <th className="py-3 px-4 font-bold">Timestamp</th>
              <th className="py-3 px-4 font-bold">Source Type</th>
              <th className="py-3 px-4 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap">
                  <Badge value={job.cpse} size="sm" />
                </td>

                <td className="py-3 px-4 font-mono font-semibold text-slate-800 whitespace-nowrap flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  {job.fileName}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="font-mono font-bold text-slate-900">
                    {job.recordsCount.toLocaleString()} records
                  </span>
                  {job.invalidRecordsCount > 0 && (
                    <span className="ml-1 text-[10px] text-amber-700 font-mono">
                      ({job.invalidRecordsCount} flagged)
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{job.importedBy}</td>

                <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                  {job.importDate}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {job.sourceType.replace(/_/g, ' ')}
                  </span>
                </td>

                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
