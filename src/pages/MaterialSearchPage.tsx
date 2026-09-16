/**
 * Material Master Search Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState, useMemo } from 'react';
import { Search, Download, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_ACTUAL_RECORDS } from '../data/actualCSVDataset';
import { ACTUAL_INITIAL_NATIONAL_MATERIALS } from '../data/actualMatchCandidates';
import { ACTUAL_CSV_MATCH_CANDIDATES } from '../data/actualMatchCandidates';
import { Badge } from '../components/shared/Badge';
import { ExportService } from '../services/ExportService';

interface MaterialSearchPageProps {
  initialQuery?: string;
  onSelectNationalCode?: (code: string) => void;
  onNavigateToMatching?: (scenarioId?: string) => void;
}

export const MaterialSearchPage: React.FC<MaterialSearchPageProps> = ({
  initialQuery = '',
  onSelectNationalCode,
  onNavigateToMatching,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCPSE, setSelectedCPSE] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedUOM, setSelectedUOM] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedMatchStatus, setSelectedMatchStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Derive unique filter lists
  const categories = useMemo(() => {
    const set = new Set<string>();
    ALL_ACTUAL_RECORDS.forEach((r) => r.materialCategory && set.add(r.materialCategory));
    return Array.from(set).sort();
  }, []);

  const uoms = useMemo(() => {
    const set = new Set<string>();
    ALL_ACTUAL_RECORDS.forEach((r) => r.uom && set.add(r.uom));
    return Array.from(set).sort();
  }, []);

  const grades = useMemo(() => {
    const set = new Set<string>();
    ALL_ACTUAL_RECORDS.forEach((r) => r.materialGrade && set.add(r.materialGrade));
    return Array.from(set).slice(0, 20).sort();
  }, []);

  // Map each source record to national code or candidate cluster
  const enrichedRecords = useMemo(() => {
    return ALL_ACTUAL_RECORDS.map((record) => {
      // 1. Check approved national materials
      const mappedNational = ACTUAL_INITIAL_NATIONAL_MATERIALS.find((nat) =>
        nat.mappedSourceRecords.some((src) => src.sourceCode === record.sourceMaterialCode)
      );

      // 2. Check candidate match clusters
      const candidateMatch = ACTUAL_CSV_MATCH_CANDIDATES.find((cand) =>
        cand.sourceMaterials.some((src) => src.sourceMaterialCode === record.sourceMaterialCode)
      );

      let matchStatus = 'RAW_INGEST';
      let mappedNationalCode = mappedNational ? mappedNational.nationalCode : '—';

      if (mappedNational) {
        matchStatus = 'MAPPED';
      } else if (candidateMatch) {
        if (candidateMatch.conflicts && candidateMatch.conflicts.length > 0) {
          matchStatus = 'CONFLICT_HOLD';
          mappedNationalCode = candidateMatch.recommendedNationalCode;
        } else {
          matchStatus = 'CANDIDATE_IDENTIFIED';
          mappedNationalCode = candidateMatch.recommendedNationalCode;
        }
      }

      return {
        ...record,
        matchStatus,
        mappedNationalCode,
        candidateMatch,
        mappedNational,
      };
    });
  }, []);

  const filteredResults = useMemo(() => {
    return enrichedRecords.filter((r) => {
      if (selectedCPSE !== 'ALL' && r.cpse !== selectedCPSE) return false;
      if (selectedCategory !== 'ALL' && r.materialCategory !== selectedCategory) return false;
      if (selectedUOM !== 'ALL' && r.uom !== selectedUOM) return false;
      if (selectedGrade !== 'ALL' && r.materialGrade !== selectedGrade) return false;
      if (selectedMatchStatus !== 'ALL' && r.matchStatus !== selectedMatchStatus) return false;

      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        const matchCode = r.sourceMaterialCode.toLowerCase().includes(q);
        const matchDesc = r.originalDescription.toLowerCase().includes(q);
        const matchNatCode = r.mappedNationalCode.toLowerCase().includes(q);
        const matchSpec = (r.specification || '').toLowerCase().includes(q);
        const matchSize = (r.size || '').toLowerCase().includes(q);
        const matchGrade = (r.materialGrade || '').toLowerCase().includes(q);
        if (!matchCode && !matchDesc && !matchNatCode && !matchSpec && !matchSize && !matchGrade) return false;
      }
      return true;
    });
  }, [enrichedRecords, query, selectedCPSE, selectedCategory, selectedUOM, selectedGrade, selectedMatchStatus]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(start, start + itemsPerPage);
  }, [filteredResults, currentPage]);

  return (
    <div className="space-y-4 font-mono">
      {/* 1. Official Header */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            CROSS-CPSE INVENTORY SEARCH & HARMONIZATION LOOKUP
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Material Master Search
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Query across local CPSE legacy codes, technical specifications, metallurgy grades, or mapped Common National Material Codes (CNMC).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => ExportService.exportAllSourceRecords(filteredResults)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Results ({filteredResults.length})
          </button>
        </div>
      </div>

      {/* 2. Primary Search Input */}
      <div className="bg-white border border-slate-300 p-3 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by [ Material Code / Description / Specification / Grade / CNMC ]..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* 6 Requested Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          {/* Filter 1: CPSE */}
          <div>
            <label className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">CPSE Enterprise</label>
            <select
              value={selectedCPSE}
              onChange={(e) => { setSelectedCPSE(e.target.value); setCurrentPage(1); }}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All CPSEs (4)</option>
              <option value="ONGC">ONGC</option>
              <option value="IOCL">IOCL</option>
              <option value="BHEL">BHEL</option>
              <option value="SAIL">SAIL</option>
            </select>
          </div>

          {/* Filter 2: Category */}
          <div>
            <label className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">Material Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: UOM */}
          <div>
            <label className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">Unit of Measure (UOM)</label>
            <select
              value={selectedUOM}
              onChange={(e) => { setSelectedUOM(e.target.value); setCurrentPage(1); }}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All UOMs ({uoms.length})</option>
              {uoms.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Filter 4: Material Grade */}
          <div>
            <label className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">Material Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => { setSelectedGrade(e.target.value); setCurrentPage(1); }}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Grades</option>
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Filter 5: Match & Review Status */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">Match / Review Status</label>
            <select
              value={selectedMatchStatus}
              onChange={(e) => { setSelectedMatchStatus(e.target.value); setCurrentPage(1); }}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="MAPPED">Mapped (Approved CNMC)</option>
              <option value="CANDIDATE_IDENTIFIED">Candidate Identified</option>
              <option value="CONFLICT_HOLD">Technical Conflict Hold</option>
              <option value="RAW_INGEST">Raw Ingest (Unmerged)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Dense Results Table */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-hidden">
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">
            SEARCH RESULTS: <span className="text-sky-950">{filteredResults.length}</span> records matching criteria
          </span>
          <span className="text-slate-500 text-[11px]">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[11px] text-slate-700 uppercase font-bold">
                <th className="py-2 px-3">Original Code</th>
                <th className="py-2 px-3">CPSE</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">UOM</th>
                <th className="py-2 px-3">Technical Attributes</th>
                <th className="py-2 px-3">Match Status</th>
                <th className="py-2 px-3">Mapped National Code</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-400 text-xs">
                    No matching master records found for the applied search criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {r.sourceMaterialCode}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <Badge value={r.cpse} size="sm" />
                    </td>
                    <td className="py-2 px-3 text-slate-800 max-w-xs truncate" title={r.originalDescription}>
                      {r.originalDescription}
                    </td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      {r.materialCategory || '—'}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-700 whitespace-nowrap">
                      {r.uom}
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[11px] whitespace-nowrap">
                      {[r.size, r.materialGrade, r.pressureRating].filter(Boolean).join(' | ') || '—'}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      {r.matchStatus === 'MAPPED' ? (
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-300 text-[10px]">
                          MAPPED
                        </span>
                      ) : r.matchStatus === 'CONFLICT_HOLD' ? (
                        <span className="text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded-xs border border-rose-300 text-[10px]">
                          SAFETY HOLD
                        </span>
                      ) : r.matchStatus === 'CANDIDATE_IDENTIFIED' ? (
                        <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-300 text-[10px]">
                          CANDIDATE
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-xs text-[10px]">
                          RAW INGEST
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      {r.mappedNationalCode !== '—' ? (
                        <button
                          type="button"
                          onClick={() => onSelectNationalCode && onSelectNationalCode(r.mappedNationalCode)}
                          className="font-bold text-sky-900 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-xs border border-sky-300 text-[11px] transition-colors"
                        >
                          {r.mappedNationalCode}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Unassigned</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      {r.candidateMatch ? (
                        <button
                          onClick={() => {
                            if (onNavigateToMatching) onNavigateToMatching(r.candidateMatch?.scenarioId);
                          }}
                          className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xs text-[10px] font-bold inline-flex items-center gap-1 transition-colors"
                        >
                          Inspect <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="text-slate-500">
            Showing <span className="font-bold text-slate-900">{paginated.length}</span> of <span className="font-bold text-slate-900">{filteredResults.length}</span> records
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
    </div>
  );
};
