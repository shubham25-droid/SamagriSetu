/**
 * Platform Governance & Taxonomy Settings Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { Settings, Shield, RefreshCw, Database } from 'lucide-react';
import { AuditTrailService } from '../services/AuditTrailService';

export const SettingsPage: React.FC = () => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = () => {
    setResetSuccess(true);
    AuditTrailService.logEvent({
      user: 'Er. R. Sundaram',
      role: 'Chief Material Master Reviewer',
      action: 'DATASET_IMPORT',
      materialCode: 'GLOBAL_DEMO_RESET',
      previousState: 'Modified',
      newState: 'Restored Initial Synthetic State',
      reason: 'Reviewer reset the prototype demo environment',
      source: 'Settings Console',
    });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-sky-100 text-sky-800">
              <Settings className="w-4 h-4" />
            </span>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Platform Governance & Taxonomy Configuration
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            System settings, official government taxonomy standards, reviewer security profile, and demo dataset controls.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-900 font-mono text-xs font-bold border border-sky-200 self-start md:self-auto">
          Role: CPSE Chief Reviewer
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Governance Profile */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Certified Material Master Reviewer Profile
            </h3>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Official Name & Title</span>
              <span className="font-bold text-slate-900 text-sm">Er. R. Sundaram</span>
              <span className="text-slate-500 block text-[11px]">
                Chief Material Master Reviewer • Inter-Ministerial CPSE Council / DPE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Sign-off Authority</span>
                <span className="text-emerald-700 font-bold">Tier 1 National Code Approval</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Security Clearance</span>
                <span className="text-sky-800 font-bold">CPSE Multi-Enterprise Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Adopted National Taxonomies */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Database className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Adopted Industrial & National Taxonomies
            </h3>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
              <span>UNSPSC Classification:</span>
              <span className="font-bold text-slate-900">v24.0 (Oil & Gas Standard)</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
              <span>Pipeline Valve Standard:</span>
              <span className="font-bold text-slate-900">API 6D / ASME B16.34</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
              <span>Seamless Piping Standard:</span>
              <span className="font-bold text-slate-900">ASME B36.10M / ASTM A106</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
              <span>Fastener Standard:</span>
              <span className="font-bold text-slate-900">IS 1364 / ISO 4014</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Reset Control */}
      <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-rose-950">
              Reset Prototype Demo Environment
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Restores the default deterministic synthetic dataset (ONGC, IOCL, BHEL) and clears temporary mock decisions.
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo Environment
          </button>
        </div>

        {resetSuccess && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
            ✓ Demo state reset successfully. Reloading platform...
          </div>
        )}
      </div>
    </div>
  );
};
