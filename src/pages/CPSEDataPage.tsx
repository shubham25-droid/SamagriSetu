/**
 * CPSE Master Records Explorer Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ALL_ACTUAL_RECORDS } from '../data/actualCSVDataset';
import { Badge } from '../components/shared/Badge';
import { ExportService } from '../services/ExportService';
import { MaterialRecord } from '../types/MaterialMasterTypes';
import { MaterialDetailModal } from '../components/cpse-data/MaterialDetailModal';

interface CPSEDataPageProps {
  onNavigateToMatching?: (scenarioId?: string) => void;
  activeCpse?: string;
}

export const CPSEDataPage: React.FC<CPSEDataPageProps> = ({ onNavigateToMatching, activeCpse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCPSE, setSelectedCPSE] = useState<string>(activeCpse || 'ALL');
  const [prevActiveCpse, setPrevActiveCpse] = useState(activeCpse);

  if (prevActiveCpse !== activeCpse) {
    setPrevActiveCpse(activeCpse);
    setSelectedCPSE(activeCpse || 'ALL');
  }
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<MaterialRecord | null>(null);
  const itemsPerPage = 20;

  const categories = useMemo(() => {
    const set = new Set<string>();
    ALL_ACTUAL_RECORDS.forEach((r) => {
      if (r.materialCategory) set.add(r.materialCategory);
    });
    return Array.from(set).sort();
  }, []);

  const filteredRecords = useMemo(() => {
    return ALL_ACTUAL_RECORDS.filter((r) => {
      if (selectedCPSE !== 'ALL' && r.cpse !== selectedCPSE) return false;
      if (selectedCategory !== 'ALL' && r.materialCategory !== selectedCategory) return false;

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const mCode = r.sourceMaterialCode.toLowerCase().includes(q);
        const mDesc = r.originalDescription.toLowerCase().includes(q);
        const mSize = (r.size || '').toLowerCase().includes(q);
        const mGrade = (r.materialGrade || '').toLowerCase().includes(q);
        const mSpec = (r.specification || '').toLowerCase().includes(q);
        const mStd = (r.standard || '').toLowerCase().includes(q);
        if (!mCode && !mDesc && !mSize && !mGrade && !mSpec && !mStd) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCPSE, selectedCategory]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const cpseCounts = useMemo(() => {
    return {
      ONGC: ALL_ACTUAL_RECORDS.filter((r) => r.cpse === 'ONGC').length,
      IOCL: ALL_ACTUAL_RECORDS.filter((r) => r.cpse === 'IOCL').length,
      BHEL: ALL_ACTUAL_RECORDS.filter((r) => r.cpse === 'BHEL').length,
      SAIL: ALL_ACTUAL_RECORDS.filter((r) => r.cpse === 'SAIL').length,
      TOTAL: ALL_ACTUAL_RECORDS.length,
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. Header Bar */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            RAW MASTER DATA REPOSITORY • 4 ENTERPRISES
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            CPSE Master Data Records
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete inventory of 400 verified source records ingested from ONGC, IOCL, BHEL, and SAIL CSV datasets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => ExportService.exportAllSourceRecords(filteredRecords)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-xs font-mono font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Selected ({filteredRecords.length})
          </button>
        </div>
      </div>

      {/* 2. CPSE Filter Tabs / Counts Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border border-slate-300 bg-white divide-x divide-y sm:divide-y-0 divide-slate-200 text-xs font-mono shadow-2xs">
        <button
          onClick={() => { setSelectedCPSE('ALL'); setCurrentPage(1); }}
          className={'p-2.5 text-left transition-colors ' + (selectedCPSE === 'ALL' ? 'bg-sky-50 font-bold text-sky-950 border-b-2 border-sky-600' : 'hover:bg-slate-50 text-slate-700')}
        >
          <span className="text-[10px] text-slate-500 block uppercase">ALL ENTERPRISES</span>
          <span className="text-base font-bold mt-0.5 block">{cpseCounts.TOTAL} Records</span>
        </button>
        <button
          onClick={() => { setSelectedCPSE('ONGC'); setCurrentPage(1); }}
          className={'p-2.5 text-left transition-colors ' + (selectedCPSE === 'ONGC' ? 'bg-amber-50 font-bold text-amber-950 border-b-2 border-amber-600' : 'hover:bg-slate-50 text-slate-700')}
        >
          <span className="text-[10px] text-slate-500 block uppercase">ONGC</span>
          <span className="text-base font-bold mt-0.5 block">{cpseCounts.ONGC} Records</span>
        </button>
        <button
          onClick={() => { setSelectedCPSE('IOCL'); setCurrentPage(1); }}
          className={'p-2.5 text-left transition-colors ' + (selectedCPSE === 'IOCL' ? 'bg-orange-50 font-bold text-orange-950 border-b-2 border-orange-600' : 'hover:bg-slate-50 text-slate-700')}
        >
          <span className="text-[10px] text-slate-500 block uppercase">IOCL</span>
          <span className="text-base font-bold mt-0.5 block">{cpseCounts.IOCL} Records</span>
        </button>
        <button
          onClick={() => { setSelectedCPSE('BHEL'); setCurrentPage(1); }}
          className={'p-2.5 text-left transition-colors ' + (selectedCPSE === 'BHEL' ? 'bg-blue-50 font-bold text-blue-950 border-b-2 border-blue-600' : 'hover:bg-slate-50 text-slate-700')}
        >
          <span className="text-[10px] text-slate-500 block uppercase">BHEL</span>
          <span className="text-base font-bold mt-0.5 block">{cpseCounts.BHEL} Records</span>
        </button>
        <button
          onClick={() => { setSelectedCPSE('SAIL'); setCurrentPage(1); }}
          className={'p-2.5 text-left transition-colors ' + (selectedCPSE === 'SAIL' ? 'bg-emerald-50 font-bold text-emerald-950 border-b-2 border-emerald-600' : 'hover:bg-slate-50 text-slate-700')}
        >
          <span className="text-[10px] text-slate-500 block uppercase">SAIL</span>
          <span className="text-base font-bold mt-0.5 block">{cpseCounts.SAIL} Records</span>
        </button>
      </div>

      {/* 3. Search & Category Filters Bar */}
      <div className="p-3 bg-white border border-slate-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex-1 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search across all 9 CSV columns (e.g. 2 IN, CS, CL.150, A106, 6205, TEFC)..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500 font-bold">
            Showing {filteredRecords.length} records
          </span>
        </div>
      </div>

      {/* 4. Dense Master Records Table */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2.5 px-3">CPSE</th>
                <th className="py-2.5 px-3">Material Code</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">UOM</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Pressure Rating</th>
                <th className="py-2.5 px-3">Standard</th>
                <th className="py-2.5 px-3">Specification</th>
                <th className="py-2.5 px-3 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-10 text-center text-slate-400 text-xs">
                    No CPSE master records match the current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <Badge value={r.cpse} size="sm" />
                    </td>
                    <td
                      onClick={() => setSelectedRecordForDetail(r)}
                      className="py-2 px-3 font-bold text-sky-700 hover:text-sky-900 cursor-pointer whitespace-nowrap hover:underline"
                      title="Inspect record details"
                    >
                      {r.sourceMaterialCode}
                    </td>
                    <td className="py-2 px-3 text-slate-800 max-w-xs truncate" title={r.originalDescription}>
                      {r.originalDescription}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-600 whitespace-nowrap">
                      {r.uom}
                    </td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      {r.materialCategory || '—'}
                    </td>
                    <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                      {r.size || '—'}
                    </td>
                    <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                      {r.materialGrade || '—'}
                    </td>
                    <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                      {r.pressureRating || '—'}
                    </td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      {r.standard || '—'}
                    </td>
                    <td className="py-2 px-3 text-slate-600 max-w-xs truncate" title={r.specification}>
                      {r.specification || '—'}
                    </td>
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedRecordForDetail(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-[11px] font-mono font-bold transition-colors"
                        title="View Material Profile & Evidence"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-500">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span> ({filteredRecords.length} records)
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Material Master Record Detail Modal */}
      <MaterialDetailModal
        record={selectedRecordForDetail}
        isOpen={!!selectedRecordForDetail}
        onClose={() => setSelectedRecordForDetail(null)}
        onNavigateToMatching={onNavigateToMatching}
      />
    </div>
  );
};
