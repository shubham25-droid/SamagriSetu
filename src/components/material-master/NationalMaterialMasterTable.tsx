/**
 * National Material Master Registry Table
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { NationalMaterial } from '../../types/MaterialMasterTypes';
import { Badge } from '../shared/Badge';
import { ExportService } from '../../services/ExportService';

interface NationalMaterialMasterTableProps {
  materials: NationalMaterial[];
  onSelectMaterial: (material: NationalMaterial) => void;
}

export const NationalMaterialMasterTable: React.FC<NationalMaterialMasterTableProps> = ({
  materials,
  onSelectMaterial,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(materials.map((m) => m.category)))];

  const filteredMaterials = materials.filter((m) => {
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchCode = m.nationalCode.toLowerCase().includes(q);
      const matchDesc = m.standardDescription.toLowerCase().includes(q);
      const matchSrc = m.mappedSourceRecords.some(
        (s) => s.sourceCode.toLowerCase().includes(q) || s.cpse.toLowerCase().includes(q)
      );
      if (!matchCode && !matchDesc && !matchSrc) return false;
    }
    return true;
  });

  return (
    <div className="bg-white border border-slate-300 shadow-2xs font-mono">
      {/* Header Controls */}
      <div className="p-3 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            COMMON NATIONAL MATERIAL CODE (CNMC) REGISTRY
          </div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
            National Unified Material Master
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CNMC, description, CPSE..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-56"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-sky-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <button
            onClick={() => ExportService.exportNationalMaterialMaster()}
            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-xs font-bold transition-colors"
          >
            <Download className="w-3 h-3" />
            Export Master (CSV)
          </button>
        </div>
      </div>

      {/* Table with the 8 Official Registry Columns */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
              <th className="py-2.5 px-3">CNMC</th>
              <th className="py-2.5 px-3">Standard Description</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">UOM</th>
              <th className="py-2.5 px-3">Mapped CPSEs</th>
              <th className="py-2.5 px-3 text-right">Source Records</th>
              <th className="py-2.5 px-3">Review Status</th>
              <th className="py-2.5 px-3">Last Updated</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredMaterials.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                  No approved national materials found matching query.
                </td>
              </tr>
            ) : (
              filteredMaterials.map((material) => (
                <tr
                  key={material.nationalCode}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onSelectMaterial(material)}
                >
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-bold text-sky-950 bg-sky-50 px-2 py-0.5 rounded-xs border border-sky-300">
                      {material.nationalCode}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 font-bold text-slate-900 max-w-sm">
                    <div className="line-clamp-2 leading-relaxed">
                      {material.standardDescription}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-700">
                    <div>{material.category}</div>
                    <div className="text-[10px] text-slate-500 font-sans">{material.subcategory}</div>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap font-bold text-slate-700">
                    {material.normalizedAttributes?.['Normalized UOM'] || material.normalizedAttributes?.['UOM'] || 'NOS'}
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {Array.from(new Set(material.mappedSourceRecords.map((s) => s.cpse))).map(
                        (cpse) => (
                          <Badge key={cpse} value={cpse} size="sm" />
                        )
                      )}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                    {material.mappedSourceRecords.length} records
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <Badge value={material.approvalStatus} size="sm" />
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 text-[11px]">
                    24 Aug 2026
                  </td>

                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMaterial(material);
                      }}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xs text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-slate-600" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Showing {filteredMaterials.length} of {materials.length} approved Common National Materials</span>
        <span>Single Source of Truth across CPSEs</span>
      </div>
    </div>
  );
};
