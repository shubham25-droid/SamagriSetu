/**
 * Top-level Metrics for National Material Master Command Center
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import {
  Database,
  Building2,
  CopyX,
  Clock,
  CheckCircle2,
  Boxes,
} from 'lucide-react';

interface MaterialStatisticsCardsProps {
  totalSourceRecords: number;
  cpsesConnectedCount: number;
  potentialDuplicatesCount: number;
  pendingReviewsCount: number;
  approvedHarmonizationsCount: number;
  uniqueNationalMaterialsCount: number;
  duplicateReductionPercentage?: number;
}

export const MaterialStatisticsCards: React.FC<MaterialStatisticsCardsProps> = ({
  totalSourceRecords,
  cpsesConnectedCount,
  potentialDuplicatesCount,
  pendingReviewsCount,
  approvedHarmonizationsCount,
  uniqueNationalMaterialsCount,
  duplicateReductionPercentage = 48.2,
}) => {
  const cards = [
    {
      title: 'Total Source Records',
      value: totalSourceRecords.toLocaleString(),
      subtitle: 'Across active CPSE registries',
      icon: Database,
      badge: 'Synthetic Ingest',
      color: 'text-slate-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700',
    },
    {
      title: 'Participating CPSEs',
      value: cpsesConnectedCount,
      subtitle: 'ONGC, IOCL, BHEL connected',
      icon: Building2,
      badge: '3 Enterprises',
      color: 'text-sky-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-200',
      iconBg: 'bg-sky-50 text-sky-700',
    },
    {
      title: 'Potential Duplicates',
      value: potentialDuplicatesCount,
      subtitle: 'Clustered candidate records',
      icon: CopyX,
      badge: 'AI Flagged',
      color: 'text-amber-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-200',
      iconBg: 'bg-amber-50 text-amber-700',
    },
    {
      title: 'Pending Reviews',
      value: pendingReviewsCount,
      subtitle: 'Awaiting human sign-off',
      icon: Clock,
      badge: 'Action Required',
      color: 'text-amber-900',
      bgColor: 'bg-amber-50/40',
      borderColor: 'border-amber-300',
      iconBg: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Approved Harmonizations',
      value: approvedHarmonizationsCount,
      subtitle: 'Promoted to National Master',
      icon: CheckCircle2,
      badge: 'Governance Passed',
      color: 'text-emerald-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Unique National Materials',
      value: uniqueNationalMaterialsCount,
      subtitle: `CNMC Catalog (-${duplicateReductionPercentage}% Duplication)`,
      icon: Boxes,
      badge: 'One Nation • One Code',
      color: 'text-indigo-950',
      bgColor: 'bg-white',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-50 text-indigo-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${card.borderColor} ${card.bgColor} shadow-xs hover:shadow-md transition-shadow relative overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
                {card.badge}
              </span>
              <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className={`text-2xl font-black tracking-tight ${card.color}`}>
                {card.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">{card.title}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-snug">{card.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
