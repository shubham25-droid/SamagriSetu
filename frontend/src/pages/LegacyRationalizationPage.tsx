/**
 * Legacy Code Rationalization & Migration Management Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { Badge } from '../components/shared/Badge';

export const LegacyRationalizationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const legacyRecords = [
    {
      cpseCode: 'ONGC-4582',
      cpse: 'ONGC',
      origDesc: 'BALL VALVE 2 IN CS CL150',
      recommendedCode: 'CNMC-000184',
      status: 'MAPPED',
      rationalizationStrategy: 'Harmonize into National Standard; retain legacy code as alias in SAP S/4HANA.',
      impact: 'Procurement demand aggregated with IOCL & BHEL.',
    },
    {
      cpseCode: 'IOCL-7811',
      cpse: 'IOCL',
      origDesc: '2" CARBON STEEL BALL VALVE CLASS 150',
      recommendedCode: 'CNMC-000184',
      status: 'MAPPED',
      rationalizationStrategy: 'Harmonize into National Standard; cross-reference in IOCL SAP ECC 6.0.',
      impact: 'Identical specification confirmed.',
    },
    {
      cpseCode: 'BHEL-2290',
      cpse: 'BHEL',
      origDesc: 'BALL V/V 50MM CS 150 LB',
      recommendedCode: 'CNMC-000184',
      status: 'MAPPED',
      rationalizationStrategy: 'Migrate metric 50mm representation to 2 Inch (DN 50) national standard.',
      impact: 'Normalized representation without altering fit.',
    },
    {
      cpseCode: 'ONGC-5102',
      cpse: 'ONGC',
      origDesc: 'BALL VALVE 2 IN CS CL150 RF',
      recommendedCode: 'CNMC-000184',
      status: 'POTENTIAL_DUPLICATE',
      rationalizationStrategy: 'Internal ONGC duplicate with ONGC-4582. Rationalize to single internal code.',
      impact: 'Reduces internal ONGC inventory bloat.',
    },
    {
      cpseCode: 'IOCL-9104',
      cpse: 'IOCL',
      origDesc: 'BALL VALVE 2 IN CS CL300',
      recommendedCode: 'CNMC-000210 (Proposed)',
      status: 'RETAIN_SEPARATELY',
      rationalizationStrategy: 'Preserve separately due to Class 300 pressure rating difference.',
      impact: 'Safety critical containment separation.',
    },
    {
      cpseCode: 'ONGC-3312',
      cpse: 'ONGC',
      origDesc: 'HEX BOLT M16 X 75 SS304 WITH NUT',
      recommendedCode: 'CNMC-FASTENER-01',
      status: 'NEEDS_REVIEW',
      rationalizationStrategy: 'Evaluate metallurgy compliance against sour-gas service conditions.',
      impact: 'Human review required prior to ERP consolidation.',
    },
    {
      cpseCode: 'IOCL-6020',
      cpse: 'IOCL',
      origDesc: 'PRESSURE TRANSMITTER 4-20MA 0-10 BAR ROSEMOUNT 3051S',
      recommendedCode: 'CNMC-000492',
      status: 'MAPPED',
      rationalizationStrategy: 'Map under Functional Equivalence group for multi-vendor bidding.',
      impact: 'Allows interchangeable Yokogawa/Rosemount sourcing.',
    },
  ];

  const filtered = legacyRecords.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchCode = r.cpseCode.toLowerCase().includes(q);
      const matchNat = r.recommendedCode.toLowerCase().includes(q);
      const matchDesc = r.origDesc.toLowerCase().includes(q);
      if (!matchCode && !matchNat && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <RotateCcw className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Legacy Material Code Rationalization & Migration Strategy
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Systematic migration roadmap. Original CPSE codes are never deleted; instead, they are cross-referenced, retained separately, or marked for internal consolidation.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xs bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-300 self-start md:self-auto">
          Non-Destructive Rationalization Active
        </span>
      </div>

      <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legacy code or description..."
              className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B192C] w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-xs text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
          >
            <option value="ALL">All Rationalization Statuses</option>
            <option value="MAPPED">Mapped</option>
            <option value="POTENTIAL_DUPLICATE">Potential Duplicate</option>
            <option value="RETAIN_SEPARATELY">Retain Separately</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
                <th className="py-2.5 px-3 font-bold">Existing CPSE Code</th>
                <th className="py-2.5 px-3 font-bold">Original Description</th>
                <th className="py-2.5 px-3 font-bold">Target Common National Code</th>
                <th className="py-2.5 px-3 font-bold">Rationalization Status</th>
                <th className="py-2.5 px-3 font-bold">Recommended Migration Strategy</th>
                <th className="py-2.5 px-3 font-bold">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/90 transition-colors">
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                      <Badge value={r.cpse} size="sm" />
                      <span>{r.cpseCode}</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700 max-w-xs truncate">
                    {r.origDesc}
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-[#0B192C]">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded-xs border border-slate-300">
                      {r.recommendedCode}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <Badge value={r.status} size="sm" />
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 max-w-xs text-[11px] leading-snug">
                    {r.rationalizationStrategy}
                  </td>

                  <td className="py-2.5 px-3 text-emerald-800 font-bold text-[11px] whitespace-nowrap">
                    {r.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
