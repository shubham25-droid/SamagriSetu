/**
 * Import History Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { History, UploadCloud } from 'lucide-react';
import { ImportHistoryTable } from '../components/cpse-data/ImportHistoryTable';
import { CPSEDataImportService } from '../services/CPSEDataImportService';

interface ImportHistoryPageProps {
  onNavigateToImport: () => void;
}

export const ImportHistoryPage: React.FC<ImportHistoryPageProps> = ({ onNavigateToImport }) => {
  const jobs = CPSEDataImportService.getImportJobs();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-sky-100 text-sky-800">
              <History className="w-4 h-4" />
            </span>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              CPSE Ingestion History & Data Lineage
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete audit trail of all source catalog files ingested into the platform with timestamp and validator logs.
          </p>
        </div>

        <button
          onClick={onNavigateToImport}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          Ingest New CPSE Dataset
        </button>
      </div>

      <ImportHistoryTable jobs={jobs} />
    </div>
  );
};
