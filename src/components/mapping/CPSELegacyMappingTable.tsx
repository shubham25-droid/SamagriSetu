/**
 * CPSE Legacy Code Traceability & Mapping Table
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Demonstrates 'One Nation - One Code' with full bi-directional traceability
 * back to original CPSE legacy codes.
 */

import React, { useState } from 'react';
import { Network, Search, Download, CheckCircle2 } from 'lucide-react';
import { NationalMaterialService } from '../../services/NationalMaterialService';
import { ExportService } from '../../services/ExportService';
import { Badge } from '../shared/Badge';

export const CPSELegacyMappingTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCPSE, setSelectedCPSE] = useState('ALL');

  const mappings = NationalMaterialService.getAllLegacyMappings();

  const filtered = mappings.filter((m) => {
    if (selectedCPSE !== 'ALL' && m.cpse !== selectedCPSE) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchNatCode = m.nationalCode.toLowerCase().includes(q);
      const matchSrcCode = m.sourceCode.toLowerCase().includes(q);
      const matchDesc = m.standardDescription.toLowerCase().includes(q);
      const matchOrig = m.originalDescription.toLowerCase().includes(q);
      if (!matchNatCode && !matchSrcCode && !matchDesc && !matchOrig) return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
      {/* Header Controls */}
      <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#0B192C]" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Bi-Directional CPSE Code Mapping & Legacy Traceability
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Every Common National Material Code retains continuous historical links to legacy enterprise ERP codes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search national or legacy code..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B192C] w-56"
            />
          </div>

          <select
            value={selectedCPSE}
            onChange={(e) => setSelectedCPSE(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
          >
            <option value="ALL">All CPSEs</option>
            <option value="ONGC">ONGC</option>
            <option value="IOCL">IOCL</option>
            <option value="BHEL">BHEL</option>
            <option value="SAIL">SAIL</option>
          </select>

          <button
            onClick={() => ExportService.exportCPSELegacyMappings()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Mapping (CSV)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
              <th className="py-2.5 px-3 font-bold">
                Common National Code (CNMC)
              </th>
              <th className="py-2.5 px-3 font-bold">Standard Description</th>
              <th className="py-2.5 px-3 font-bold">CPSE</th>
              <th className="py-2.5 px-3 font-bold">Original Material Code</th>
              <th className="py-2.5 px-3 font-bold">Original CPSE Description</th>
              <th className="py-2.5 px-3 font-bold">Source ERP</th>
              <th className="py-2.5 px-3 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No legacy mappings match the specified query.
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/90 transition-colors">
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-mono font-bold text-[#0B192C] bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-300">
                      {item.nationalCode}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-slate-900 font-medium max-w-xs truncate">
                    {item.standardDescription}
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <Badge value={item.cpse} size="sm" />
                  </td>

                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {item.sourceCode}
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 font-mono text-[11px] max-w-xs truncate">
                    {item.originalDescription}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                    {item.erpSystemOrigin}
                  </td>

                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {item.mappingStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-300 text-xs text-slate-600 font-mono flex items-center justify-between">
        <span>Mapped Traceability Entries: <strong>{filtered.length}</strong></span>
        <span className="text-emerald-800 font-bold">Bi-Directional Index Active</span>
      </div>
    </div>
  );
};
