/**
 * SAP & Enterprise ERP Integration Architecture View
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import {
  Cpu,
  ShieldCheck,
  Server,
} from 'lucide-react';
import { CPSE_ORGANIZATIONS } from '../../types/CPSETypes';

export const SAPConnectorArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Enterprise SAP / ERP Integration Gateway Architecture
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Designed for extensible coupling with CPSE enterprise systems via standard RFC, BAPI, and OData protocols.
            </p>
          </div>

          <span className="px-2.5 py-1 rounded bg-sky-50 text-sky-800 text-xs font-mono font-bold border border-sky-200 self-start md:self-auto">
            Design Phase: Integration Ready
          </span>
        </div>

        {/* Current Demo vs Production Architecture Diagram */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Current Demonstration Pipeline */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                Current Prototype Demonstration
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                Operational Now
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Synthetic Master Datasets (ONGC, IOCL, BHEL)</span>
              </div>
              <div className="text-slate-400 pl-4">↓ Structured Ingestion</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>CSV / Excel Upload Gateway with Schema Verification</span>
              </div>
              <div className="text-slate-400 pl-4">↓ Deterministic Pipeline</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>National Material Harmonization & Review Engine</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Allows immediate evaluation without exposing sensitive CPSE enterprise networks.
            </p>
          </div>

          {/* Planned Enterprise SAP Integration Layer */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                Production SAP / ERP Integration Spec
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-700 text-[10px] font-mono font-bold">
                Planned / Specification Ready
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span>CPSE ERP Source: SAP S/4HANA (MARA / MARC / MAKT tables)</span>
              </div>
              <div className="text-slate-600 pl-4">↓ Secure REST / OData v4 or RFC Connector</div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Government Enterprise Security Gateway (Mutual TLS + OAuth 2.0)</span>
              </div>
              <div className="text-slate-600 pl-4">↓ Real-time Delta Sync</div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>SamagriSetu National Material Master Sync Engine</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Supports bi-directional updates: pushes approved CNMC back to ERP material master fields.
            </p>
          </div>
        </div>
      </div>

      {/* CPSE Connectors Status Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider mb-4">
          CPSE Enterprise System Connector Status
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CPSE_ORGANIZATIONS.map((org) => (
            <div
              key={org.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-slate-900">{org.id}</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono text-[10px] font-bold border border-sky-200">
                  Integration Ready
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-800">{org.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">ERP: {org.erpSystem}</div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 space-y-1 text-[11px] font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>Connector Protocol:</span>
                  <span className="text-slate-900 font-semibold">
                    {org.erpSystem.includes('S/4HANA') ? 'SAP OData API' : 'SAP RFC / IDoc'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Master Table:</span>
                  <span className="text-slate-900 font-semibold">MARA / MAKT</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Data Feed:</span>
                  <span className="text-emerald-700 font-semibold">Synthetic Demo CSV</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
