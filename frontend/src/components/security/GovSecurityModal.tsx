/**
 * Platform Security & Governance Architecture Modal
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Realistic, legitimate prototype security controls for hackathon demonstration
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Database,
  FileCheck,
  CheckCircle2,
  Key,
  X,
  Clock,
  Code2
} from 'lucide-react';

interface GovSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerInactivityTest?: () => void;
  currentUser?: { name: string; org: string; role: string };
}

export const GovSecurityModal: React.FC<GovSecurityModalProps> = ({
  isOpen,
  onClose,
  onTriggerInactivityTest,
  currentUser = {
    name: 'Er. R. Sundaram, FIE',
    role: 'Chief Materials Manager',
    org: 'Inter-Ministerial Council / DPE',
  },
}) => {
  const [activeTab, setActiveTab] = useState<'rbac' | 'safety' | 'audit' | 'session'>('rbac');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Accent Strip */}
        <div className="h-1 w-full bg-sky-600" />

        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-sky-300 tracking-wider uppercase font-semibold">
                SIH26099 Prototype Architecture
              </div>
              <h2 className="text-base font-bold text-white font-sans">
                Security, Governance & Data Integrity Architecture
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('rbac')}
            className={`py-3 px-3.5 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
              activeTab === 'rbac'
                ? 'border-sky-600 text-sky-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-sky-600" />
            Role-Based Access (RBAC)
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3 px-3.5 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
              activeTab === 'safety'
                ? 'border-sky-600 text-sky-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            Deterministic Safety Interceptor
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3.5 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
              activeTab === 'audit'
                ? 'border-sky-600 text-sky-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            Audit Trail & Logging
          </button>
          <button
            onClick={() => setActiveTab('session')}
            className={`py-3 px-3.5 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
              activeTab === 'session'
                ? 'border-sky-600 text-sky-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Session Inactivity Security
          </button>
        </div>

        {/* Tab Body Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700 bg-slate-50/50">
          {/* TAB 1: RBAC */}
          {activeTab === 'rbac' && (
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Separation of Concerns & Role Segregation</h4>
                <p className="text-slate-600 leading-relaxed">
                  In an enterprise CPSE procurement ecosystem, plant engineers who ingest catalog data should not unilaterally approve canonical national material codes without chief reviewer oversight.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-sky-900">CPSE Enterprise Nodal Officer</div>
                    <div className="text-slate-500 font-mono text-[11px]">e.g. IOCL, ONGC Plant Procurement</div>
                    <ul className="text-slate-600 list-disc pl-4 space-y-0.5 pt-1 text-[11px]">
                      <li>Uploads & validates plant catalog CSVs</li>
                      <li>Views localized mapping recommendations</li>
                      <li>Cannot finalize national canonical codes</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-emerald-900">Chief Material Master Reviewer</div>
                    <div className="text-slate-500 font-mono text-[11px]">e.g. Inter-Ministerial Council / DPE</div>
                    <ul className="text-slate-600 list-disc pl-4 space-y-0.5 pt-1 text-[11px]">
                      <li>Reviews cross-CPSE similarity suggestions</li>
                      <li>Adjudicates technical conflicts & overrides</li>
                      <li>Approves canonical CNMC issuance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Safety Interceptor */}
          {activeTab === 'safety' && (
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Deterministic Safety Hard-Locks (Non-AI Fallback)</h4>
                <p className="text-slate-600 leading-relaxed">
                  AI embeddings and fuzzy text matching alone are insufficient for high-risk industrial equipment. SamagriSetu implements rule-based deterministic guardrails before suggesting any match:
                </p>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Pressure Rating Hard-Lock:</strong> Never matches Class 150 with Class 300 or Class 600, even if descriptions are 95% semantically similar.
                    </div>
                  </div>

                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Metallurgy & Grade Verification:</strong> Strict verification for stainless steel (SS316 vs SS304 vs Carbon Steel A106).
                    </div>
                  </div>

                  <div className="p-2.5 bg-sky-50 border border-sky-200 rounded text-sky-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Dimensional Tolerances:</strong> Explicit normalization of metric (DN50) and imperial (2 IN / 2") standards before similarity comparison.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Audit Trail */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Full Lineage & Audit Logging</h4>
                <p className="text-slate-600 leading-relaxed">
                  Every action in SamagriSetu is tracked with an immutable event record to support transparency and post-procurement governance:
                </p>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-[11px] space-y-1.5 text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="font-semibold">Logged Attributes:</span>
                    <span className="text-sky-700">ISO Timestamp, User ID, Role, CPSE</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="font-semibold">Event Scope:</span>
                    <span className="text-sky-700">CSV Import, Approval, Rejection, Modification</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">State Snapshots:</span>
                    <span className="text-sky-700">Pre-harmonization and post-harmonization JSON payload</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Session Inactivity */}
          {activeTab === 'session' && (
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Simulated Session Inactivity Guard</h4>
                <p className="text-slate-600 leading-relaxed">
                  To demonstrate best practices for enterprise session management, the prototype includes an inactivity timeout that warns the user when idle.
                </p>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">Test Inactivity Warning Modal</div>
                    <div className="text-slate-500 text-[11px]">Triggers the 60-second warning countdown dialog for demo purposes.</div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      if (onTriggerInactivityTest) onTriggerInactivityTest();
                    }}
                    className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded font-mono text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Simulate Warning
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="font-mono text-slate-500">
            Smart India Hackathon • SIH26099 Functional Prototype
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0B192C] text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
