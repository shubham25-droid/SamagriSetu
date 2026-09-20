/**
 * Demo Environment & Synthetic Data Disclaimer Banner
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DemoDisclaimerBannerProps {
  onQuickLoadDemo?: () => void;
}

export const DemoDisclaimerBanner: React.FC<DemoDisclaimerBannerProps> = ({ onQuickLoadDemo }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Administrative Environment Notice"
      className="bg-[#071322] text-slate-300 border-b border-slate-700 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xs font-mono"
    >
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-sm bg-emerald-950 text-emerald-300 font-bold border border-emerald-600/50 text-[10px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          CENTRAL FEDERATION GATEWAY
        </span>
        <span className="text-slate-300 hidden lg:inline text-[11px]">
          Department of Public Enterprises (DPE) • Inter-Ministerial Council (MoP&NG / MHI / MoS) • Master Sync Active: ONGC (100) | IOCL (100) | BHEL (100) | SAIL (100) - Total: 400 Real Records
        </span>
      </div>

      <div className="flex items-center gap-3">
        {onQuickLoadDemo && (
          <button
            onClick={onQuickLoadDemo}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-sky-900/80 hover:bg-sky-800 text-sky-200 font-medium text-[11px] border border-sky-600/60 transition-colors"
          >
            Resynchronize CPSE Master Data (400 Records)
          </button>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-500 hover:text-slate-300 p-0.5"
          title="Dismiss notice"
          aria-label="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
