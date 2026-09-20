/**
 * Application Footer
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Clean, professional prototype footer without unauthorized claims
 */

import React from 'react';
import { Shield, Lock, Database, Code2 } from 'lucide-react';

interface GovFooterProps {
  onOpenSecurityModal?: () => void;
}

export const GovFooter: React.FC<GovFooterProps> = ({ onOpenSecurityModal }) => {
  return (
    <footer className="bg-[#071322] text-slate-300 border-t border-slate-800 text-xs font-sans mt-auto">
      {/* Top Accent Strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-sky-600 via-amber-500 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/samagrisetu-logo.png"
              alt="SamagriSetu Emblem"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="font-bold text-sm text-white tracking-tight">
                SamagriSetu • समग्रसेतु
              </div>
              <div className="text-[11px] text-slate-400">
                AI-Driven Material Master Harmonization Platform for CPSEs
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSecurityModal}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Security & Governance Overview</span>
            </button>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-slate-400">
          <div className="space-y-1.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono">
              Participating Catalogs
            </h4>
            <p className="text-[11px] leading-relaxed">
              Standardizing legacy material codes across ONGC, IOCL, BHEL, and SAIL using 400 benchmark industry records.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono">
              Technical Stack
            </h4>
            <p className="text-[11px] leading-relaxed">
              React 19 + TypeScript + Vite frontend with modular Python FastAPI harmonization services & deterministic safety rules.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono">
              Hackathon Context
            </h4>
            <p className="text-[11px] leading-relaxed">
              Problem Statement SIH26099 • Ministry of Petroleum & Natural Gas (MoPNG) / CPCL.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © 2026 BodhZ Consortium • Smart India Hackathon Prototype
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            One Nation • One Common Material Code (CNMC)
          </div>
        </div>
      </div>
    </footer>
  );
};
