/**
 * Standard Status & Classification Badge
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';

interface BadgeProps {
  variant?: 'status' | 'classification' | 'cpse' | 'neutral' | 'hazard';
  value: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ value, className = '', size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.2 text-[10px]' : 'px-2 py-0.5 text-xs';

  let colorClasses = 'bg-slate-100 text-slate-800 border-slate-300';

  // Classification styling
  if (value === 'SAME_MATERIAL') {
    colorClasses = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
  } else if (value === 'DUPLICATE') {
    colorClasses = 'bg-sky-50 text-sky-950 border-sky-300 font-bold';
  } else if (value === 'NEAR_DUPLICATE') {
    colorClasses = 'bg-slate-100 text-slate-900 border-slate-300 font-bold';
  } else if (value === 'FUNCTIONALLY_EQUIVALENT') {
    colorClasses = 'bg-blue-50 text-blue-950 border-blue-300 font-bold';
  } else if (value === 'REQUIRES_REVIEW' || value === 'HARD_CONFLICT') {
    colorClasses = 'bg-amber-50 text-amber-950 border-amber-300 font-bold';
  } else if (value === 'DIFFERENT' || value === 'REJECTED') {
    colorClasses = 'bg-rose-50 text-rose-950 border-rose-300 font-bold';
  } else if (value === 'APPROVED' || value === 'MODIFIED_AND_APPROVED') {
    colorClasses = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
  } else if (value === 'PENDING_REVIEW' || value === 'PENDING_APPROVAL') {
    colorClasses = 'bg-amber-100 text-amber-950 border-amber-400 font-medium';
  } else if (value === 'ONGC') {
    colorClasses = 'bg-amber-50 text-amber-950 border-amber-300 font-bold';
  } else if (value === 'IOCL') {
    colorClasses = 'bg-orange-50 text-orange-950 border-orange-300 font-bold';
  } else if (value === 'BHEL') {
    colorClasses = 'bg-blue-50 text-blue-950 border-blue-300 font-bold';
  } else if (value === 'SAIL') {
    colorClasses = 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold';
  }

  // Format readable text
  const formattedText = value
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xs border uppercase font-mono tracking-wider ${sizeClasses} ${colorClasses} ${className}`}
    >
      {value === 'REQUIRES_REVIEW' || value === 'HARD_CONFLICT' ? (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block shrink-0" />
      ) : null}
      {formattedText}
    </span>
  );
};
