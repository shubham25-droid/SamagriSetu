/**
 * CPSE Data Ingestion Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { UploadCloud, ArrowRight, Check } from 'lucide-react';
import { CPSEDataUploadPanel } from '../components/cpse-data/CPSEDataUploadPanel';

interface CPSEDataImportPageProps {
  onNavigateToNext?: () => void;
  onNavigateToMatching?: () => void;
  activeDataset?: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  onSelectDataset?: (id: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL') => void;
  isCompleted?: boolean;
}

export const CPSEDataImportPage: React.FC<CPSEDataImportPageProps> = ({
  onNavigateToNext,
  onNavigateToMatching,
  activeDataset,
  onSelectDataset,
  isCompleted,
}) => {
  return (
    <div className="space-y-5">
      {/* Institutional Top Header */}
      <div className="bg-white rounded-lg border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                STEP 1 COMPLETED • CATALOG STAGED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-[#0B192C] text-sky-200 border border-sky-800 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                STEP 1 OF 5 • IN PROGRESS
              </span>
            )}
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-sky-700" />
              Plant ERP Catalog Ingestion Gateway
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Stage external plant catalogs from SAP (MARA/MAKT), Oracle MTL, or select a pre-verified CPSE dataset below.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {(onNavigateToNext || onNavigateToMatching) && (
            <button
              onClick={onNavigateToNext || onNavigateToMatching}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Next: AI Spec Normalization</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Core Ingestion Panel with CSV Dropzone & Preloaded Datasets */}
      <CPSEDataUploadPanel
        activeDataset={activeDataset}
        onSelectDataset={onSelectDataset}
        onNavigateToNext={onNavigateToNext}
        onNavigateToMatching={onNavigateToMatching}
      />
    </div>
  );
};
