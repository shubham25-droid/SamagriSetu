/**
 * CPSE Contribution & Master Records Distribution
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { Building2 } from 'lucide-react';

interface CPSEDistributionChartProps {
  onSelectCPSE?: (cpse: string) => void;
}

export const CPSEDistributionChart: React.FC<CPSEDistributionChartProps> = ({ onSelectCPSE }) => {
  const cpseStats = [
    {
      cpse: 'ONGC',
      fullName: 'Oil and Natural Gas Corporation',
      records: 100,
      harmonized: 48,
      duplicates: 22,
      erp: 'SAP S/4HANA',
      share: 25,
      color: 'bg-amber-500',
      badgeColor: 'border-amber-300 text-amber-900 bg-amber-50',
    },
    {
      cpse: 'IOCL',
      fullName: 'Indian Oil Corporation Limited',
      records: 100,
      harmonized: 52,
      duplicates: 26,
      erp: 'SAP ECC 6.0',
      share: 25,
      color: 'bg-orange-500',
      badgeColor: 'border-orange-300 text-orange-900 bg-orange-50',
    },
    {
      cpse: 'BHEL',
      fullName: 'Bharat Heavy Electricals Limited',
      records: 100,
      harmonized: 44,
      duplicates: 18,
      erp: 'SAP ECC 6.0',
      share: 25,
      color: 'bg-blue-600',
      badgeColor: 'border-blue-300 text-blue-900 bg-blue-50',
    },
    {
      cpse: 'SAIL',
      fullName: 'Steel Authority of India Limited',
      records: 100,
      harmonized: 42,
      duplicates: 19,
      erp: 'SAP ECC 6.0',
      share: 25,
      color: 'bg-emerald-600',
      badgeColor: 'border-emerald-300 text-emerald-900 bg-emerald-50',
    },
  ];

  const total = cpseStats.reduce((acc, c) => acc + c.records, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            CPSE Master Data Contribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Distribution of material masters across participating enterprises (4 Verified CSV Datasets).
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
          Total: {total.toLocaleString()} Records
        </span>
      </div>

      {/* Stacked Proportional Bar */}
      <div className="mt-4">
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          {cpseStats.map((item) => (
            <div
              key={item.cpse}
              style={{ width: `${item.share}%` }}
              className={`${item.color} h-full transition-all duration-500 relative group`}
              title={`${item.cpse}: ${item.records} records (${item.share}%)`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
          <span>ONGC (25%)</span>
          <span>IOCL (25%)</span>
          <span>BHEL (25%)</span>
          <span>SAIL (25%)</span>
        </div>
      </div>

      {/* Enterprise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {cpseStats.map((item) => (
          <div
            key={item.cpse}
            onClick={() => onSelectCPSE && onSelectCPSE(item.cpse)}
            className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-xs font-black font-mono border ${item.badgeColor}`}>
                {item.cpse}
              </span>
              <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                {item.erp}
              </span>
            </div>

            <div className="mt-2 text-xs font-semibold text-slate-900 truncate">
              {item.fullName}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-200/80 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Source Pool</span>
                <span className="font-bold text-slate-800">{item.records.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Harmonized</span>
                <span className="font-bold text-emerald-700">{item.harmonized} items</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
