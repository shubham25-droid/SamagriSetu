/**
 * Prototype Governance & Security Bar
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Clean, genuine prototype presentation without unauthorized claims
 */

import React from 'react';
import { Shield, Lock, Database, CheckCircle2 } from 'lucide-react';

interface GovSecurityBannerProps {
  onOpenSecurityModal: () => void;
  onQuickLoadDemo?: () => void;
}

export const GovSecurityBanner: React.FC<GovSecurityBannerProps> = ({
  onOpenSecurityModal,
  onQuickLoadDemo,
}) => {
  return (
    <aside
      aria-label="Platform Governance & Security"
      className="bg-[#071322] text-slate-300 border-b border-slate-700 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xs font-mono"
    >
      {/* Left: Project Identification & Core Controls */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="px-2 py-0.5 rounded-xs bg-sky-950 text-sky-300 font-bold border border-sky-600/50 text-[10px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          SIH26099 PROTOTYPE
        </span>

        <span className="text-slate-300 hidden xl:inline text-[11px]">
          AI-Driven Material Master Harmonization Platform • ONGC • IOCL • BHEL • SAIL
        </span>

        <span className="text-slate-600 hidden md:inline">|</span>

        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400">
            <Shield className="w-3 h-3 text-emerald-400" />
            RBAC Access Controls
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-sky-400">
            <Lock className="w-3 h-3 text-sky-400" />
            Deterministic Safety Locks
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Database className="w-3 h-3 text-amber-400" />
            Audit Trail Logging
          </span>
        </div>
      </div>

      {/* Right: Security Architecture Modal & Dataset Sync */}
      <div className="flex items-center gap-2.5">
        {onQuickLoadDemo && (
          <button
            onClick={onQuickLoadDemo}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700 transition-colors"
          >
            Sync CPSE Datasets (400)
          </button>
        )}

        <button
          onClick={onOpenSecurityModal}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 text-[11px] border border-sky-500/60 transition-colors font-semibold cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          <span>Security & Governance</span>
        </button>
      </div>
    </aside>
  );
};
