/**
 * Data Sources Management & External Ingestion Gateway Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState } from 'react';
import {
  Database,
  RefreshCw,
  Plus,
  Server,
  FileSpreadsheet,
  Network,
  Activity,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { DataSourceService, DataSourceItem } from '../services/DataSourceService';

export const DataSourcesPage: React.FC = () => {
  const [sources, setSources] = useState<DataSourceItem[]>(DataSourceService.getDataSources());
  const [selectedSourceForLogs, setSelectedSourceForLogs] = useState<DataSourceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [testingSourceId, setTestingSourceId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; msg: string } | null>(null);
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);

  // Add source form state
  const [newSourceType, setNewSourceType] = useState<'CSV' | 'Excel' | 'API' | 'ERP/SAP'>('API');
  const [newSourceName, setNewSourceName] = useState('');
  const [newEndpoint, setNewEndpoint] = useState('');
  const [newFrequency, setNewFrequency] = useState<'Manual' | 'Hourly' | 'Daily' | 'Real-Time Webhook'>('Daily');

  const handleTestConnection = async (sourceId: string) => {
    setTestingSourceId(sourceId);
    setTestResult(null);
    const res = await DataSourceService.testConnection(sourceId);
    setTestingSourceId(null);
    setTestResult({ id: sourceId, success: res.success, msg: `[${res.latencyMs}ms] ${res.message}` });
  };

  const handleSyncNow = async (sourceId: string) => {
    setSyncingSourceId(sourceId);
    await DataSourceService.syncSource(sourceId);
    setSources(DataSourceService.getDataSources());
    setSyncingSourceId(null);
  };

  const handleCreateSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName.trim()) return;

    DataSourceService.addDataSource({
      name: newSourceName,
      type: newSourceType,
      status: newSourceType === 'CSV' || newSourceType === 'Excel' ? 'Connected / Demo' : 'Not Configured',
      recordCount: 0,
      lastSync: 'Never',
      endpointOrFile: newEndpoint || 'Not configured',
      syncFrequency: newFrequency,
      authStatus: 'Not Configured'
    });

    setSources(DataSourceService.getDataSources());
    setIsAddModalOpen(false);
    setNewSourceName('');
    setNewEndpoint('');
  };

  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <Database className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Enterprise Data Sources & Integration Connectors
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Manage CPSE material master data sources. Transparently bridges verified demonstration CSV catalogs with extensible ERP / SAP connectors and external reference endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSources(DataSourceService.getDataSources());
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-mono font-semibold rounded-xs shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Status
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-bold rounded-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Data Source
          </button>
        </div>
      </div>

      {/* Data Provenance & Architectural Disclaimer */}
      <div className="bg-slate-50 rounded-xs border border-slate-300 p-3.5 flex items-start gap-3 text-xs">
        <Activity className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-mono">Data Provenance Protocol:</strong> Active demonstration master records are strictly isolated and labeled as <span className="font-mono bg-white px-1 py-0.5 border border-slate-300 rounded-xs text-slate-800 font-bold">Demonstration CPSE Material Master Data</span>. No synthetic responses are represented as live production feeds. External connectors reflect real architectural stubs with authentication prerequisites.
        </div>
      </div>

      {/* Data Sources Table */}
      <div className="bg-white rounded-xs border border-slate-300 overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-slate-300 bg-slate-100/75 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Server className="w-4 h-4 text-[#0B192C]" />
            Configured Material Repositories & Ingestion Streams
          </h3>
          <span className="text-xs font-mono text-slate-600">
            Total Sources: <strong>{sources.length}</strong> (4 Demo CSVs, 2 Connectors)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 bg-[#0B192C] text-[11px] font-mono text-white uppercase tracking-wider">
                <th className="py-2.5 px-3 font-bold">Source Name</th>
                <th className="py-2.5 px-3 font-bold">Type</th>
                <th className="py-2.5 px-3 font-bold">Integration Status</th>
                <th className="py-2.5 px-3 font-bold text-right">Master Records</th>
                <th className="py-2.5 px-3 font-bold">Sync Cadence</th>
                <th className="py-2.5 px-3 font-bold">Last Sync (IST)</th>
                <th className="py-2.5 px-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sources.map((src) => {
                const isDemo = src.status === 'Connected / Demo';
                const isSyncing = syncingSourceId === src.id;
                const isTesting = testingSourceId === src.id;

                return (
                  <tr key={src.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{src.name}</div>
                      <div className="text-[11px] font-mono text-slate-500 truncate max-w-xs">{src.endpointOrFile}</div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-slate-100 text-slate-800 border border-slate-300">
                        {src.type === 'CSV' && <FileSpreadsheet className="w-3 h-3 text-[#0B192C]" />}
                        {src.type === 'API' && <Network className="w-3 h-3 text-sky-700" />}
                        {src.type === 'ERP/SAP' && <Server className="w-3 h-3 text-amber-700" />}
                        {src.type}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {isDemo ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Connected / Demo
                        </span>
                      ) : src.status === 'Connector Required' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Connector Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-300">
                          Not Configured
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {src.recordCount > 0 ? src.recordCount.toLocaleString() : '0 (Pending Sync)'}
                    </td>

                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {src.syncFrequency}
                    </td>

                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {src.lastSync}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTestConnection(src.id)}
                          disabled={isTesting}
                          className="px-2 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xs text-[11px] font-mono font-semibold transition-colors disabled:opacity-50"
                        >
                          {isTesting ? 'Testing...' : 'Test Connection'}
                        </button>

                        <button
                          onClick={() => handleSyncNow(src.id)}
                          disabled={isSyncing}
                          className="px-2 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xs text-[11px] font-mono font-semibold transition-colors disabled:opacity-50"
                        >
                          {isSyncing ? 'Syncing...' : 'Sync Now'}
                        </button>

                        <button
                          onClick={() => setSelectedSourceForLogs(src)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xs text-[11px] font-mono font-semibold transition-colors"
                        >
                          View Logs
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Connection Banner (if tested) */}
      {testResult && (
        <div className={`p-3.5 rounded-xs border text-xs font-mono flex items-start justify-between gap-3 ${
          testResult.success
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-start gap-2">
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div>
              <strong>Connection Verification Result:</strong> {testResult.msg}
            </div>
          </div>
          <button onClick={() => setTestResult(null)} className="text-slate-500 hover:text-slate-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Logs Modal */}
      {selectedSourceForLogs && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xs shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in">
            <div className="p-3.5 border-b border-slate-300 bg-[#0B192C] text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight">Source Audit & Connectivity Logs</h3>
                <p className="text-[11px] text-slate-300 font-mono mt-0.5">{selectedSourceForLogs.name}</p>
              </div>
              <button
                onClick={() => setSelectedSourceForLogs(null)}
                className="text-slate-300 hover:text-white p-1 rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2.5 max-h-80 overflow-y-auto">
              {selectedSourceForLogs.logs.length === 0 ? (
                <div className="text-center py-6 text-slate-400 font-mono text-xs">No logs recorded yet.</div>
              ) : (
                selectedSourceForLogs.logs.map((l) => (
                  <div key={l.id} className="p-2.5 rounded-xs border border-slate-200 bg-slate-50 text-xs font-mono flex items-start gap-2">
                    <span className={`px-1.5 py-0.2 rounded-xs text-[10px] font-bold ${
                      l.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' :
                      l.type === 'WARN' ? 'bg-amber-100 text-amber-800' :
                      l.type === 'ERROR' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {l.type}
                    </span>
                    <div className="flex-1">
                      <div className="text-slate-500 text-[10px]">{l.timestamp}</div>
                      <div className="text-slate-800 mt-0.5">{l.message}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedSourceForLogs(null)}
                className="px-3 py-1 bg-[#0B192C] text-white text-xs font-mono font-bold rounded-xs"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Data Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xs shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in">
            <div className="p-3.5 border-b border-slate-300 bg-[#0B192C] text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight">Configure New Enterprise Data Source</h3>
                <p className="text-[11px] text-slate-300 font-mono mt-0.5">Define connection endpoint or ERP connector</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSource} className="p-4 space-y-4 text-xs">
              {/* Source Type Selector Tabs */}
              <div>
                <label className="block text-slate-800 font-bold mb-1 font-mono uppercase">Source Type *</label>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  {(['CSV', 'Excel', 'API', 'ERP/SAP'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewSourceType(t)}
                      className={`py-2 px-2 text-center rounded-xs border text-xs font-bold transition-all ${
                        newSourceType === t
                          ? 'bg-[#0B192C] text-white border-[#0B192C]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Name */}
              <div>
                <label className="block text-slate-800 font-bold mb-1">Source Repository / Enterprise Name *</label>
                <input
                  type="text"
                  required
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="e.g. GAIL Gas Material Repository / SAP S/4HANA"
                  className="w-full p-2 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              {/* Endpoint / Path */}
              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  {newSourceType === 'CSV' || newSourceType === 'Excel'
                    ? 'Local File Path / Directory *'
                    : newSourceType === 'API'
                    ? 'REST API Endpoint URL *'
                    : 'SAP Application Server / Gateway Host *'}
                </label>
                <input
                  type="text"
                  required
                  value={newEndpoint}
                  onChange={(e) => setNewEndpoint(e.target.value)}
                  placeholder={
                    newSourceType === 'API'
                      ? 'https://gateway.cpse.gov.in/materials/v2'
                      : newSourceType === 'ERP/SAP'
                      ? 'sap-ecc-prod.cpse.internal:3300 (Client 100)'
                      : 'data/custom_dataset.csv'
                  }
                  className="w-full p-2 bg-white border border-slate-300 rounded-xs text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              {/* Cadence */}
              <div>
                <label className="block text-slate-800 font-bold mb-1">Scheduled Synchronization Cadence</label>
                <select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xs text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
                >
                  <option value="Manual">Manual On-Demand Only</option>
                  <option value="Hourly">Hourly Delta Polling</option>
                  <option value="Daily">Daily Nightly Batch Sync</option>
                  <option value="Real-Time Webhook">Real-Time Ingestion Webhook</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-xs border border-amber-200 text-amber-900 font-mono text-[11px] leading-relaxed">
                <strong>Government Governance Notice:</strong> Ingestion channels must comply with MoP&NG procurement guidelines. Real-time API credentials require signed mTLS or Government SSO token validation prior to activation.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-mono font-bold rounded-xs shadow-xs"
                >
                  Save Source Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
