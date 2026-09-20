/**
 * Material Mapping & Traceability Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { Network } from 'lucide-react';
import { CPSELegacyMappingTable } from '../components/mapping/CPSELegacyMappingTable';

export const MaterialMappingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <Network className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Cross-CPSE Material Mapping & Legacy Rationalization Directory
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Bi-directional mapping directory connecting Common National Material Codes (CNMC) to individual enterprise ERP records across ONGC, IOCL, BHEL, and SAIL.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xs bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-300 self-start md:self-auto">
          Bi-Directional ERP Index Active
        </span>
      </div>

      <CPSELegacyMappingTable />
    </div>
  );
};
