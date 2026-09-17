/**
 * Material Master Analytics Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { BarChart3, TrendingDown, Building2, Boxes, ShieldCheck } from 'lucide-react';
import { CPSEDistributionChart } from '../components/dashboard/CPSEDistributionChart';
import { DuplicateDetectionSummary } from '../components/dashboard/DuplicateDetectionSummary';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              National Material Master Intelligence & Harmonization Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Data-driven insights on redundant code rationalization, cross-CPSE inventory convergence, and classification distributions across ONGC, IOCL, BHEL, and SAIL.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xs bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-300 self-start md:self-auto">
          -48.2% Duplicate Reduction
        </span>
      </div>

      {/* Top 4 Analytical Impact KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xs bg-white border border-slate-300 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Inventory Efficiency</span>
            <TrendingDown className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1.5">48.2%</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">Redundant Code Reduction</div>
          <p className="text-[11px] text-slate-600 mt-1">From 400 sample records to consolidated national clusters.</p>
        </div>

        <div className="p-3.5 rounded-xs bg-white border border-slate-300 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Cross-Enterprise</span>
            <Building2 className="w-4 h-4 text-[#0B192C]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B192C] mt-1.5">76.4%</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">Multi-CPSE Material Overlap</div>
          <p className="text-[11px] text-slate-600 mt-1">High convergence in valves, pipes, plates, and gaskets.</p>
        </div>

        <div className="p-3.5 rounded-xs bg-white border border-slate-300 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Safety Governance</span>
            <ShieldCheck className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1.5">100%</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">Conflict Interception Rate</div>
          <p className="text-[11px] text-slate-600 mt-1">Zero auto-merges on divergent pressure or metallurgy ratings.</p>
        </div>

        <div className="p-3.5 rounded-xs bg-white border border-slate-300 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Strategic Sourcing</span>
            <Boxes className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1.5">₹142 Cr</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">Estimated Demand Aggregation</div>
          <p className="text-[11px] text-slate-600 mt-1">Projected savings through joint CPSE rate contracts.</p>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Harmonization Progress by Industrial Equipment Category
        </h3>
        <div className="space-y-3">
          {[
            { category: 'Piping & Valves (API 6D / ASME B16.34)', count: 94, harmonized: 78, pct: 83 },
            { category: 'Seamless Tubular Goods & Flanges (ASME B36.10)', count: 62, harmonized: 51, pct: 82 },
            { category: 'Gaskets & Sealing Elements (ASME B16.20)', count: 48, harmonized: 42, pct: 87 },
            { category: 'Industrial Fasteners & Hardware (IS 1364)', count: 75, harmonized: 46, pct: 61 },
            { category: 'Structural Steel & Plates (IS 2062)', count: 50, harmonized: 41, pct: 82 },
          ].map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">{cat.category}</span>
                <span className="text-slate-600 font-mono">
                  {cat.harmonized} / {cat.count} items ({cat.pct}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-xs overflow-hidden border border-slate-200">
                <div
                  style={{ width: `${cat.pct}%` }}
                  className="h-full bg-[#0B192C] transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CPSEDistributionChart />
        <DuplicateDetectionSummary />
      </div>
    </div>
  );
};
