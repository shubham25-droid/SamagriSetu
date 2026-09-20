/**
 * CPSE Material Master Ingestion Gateway
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL / DPE Inter-Ministerial Council
 */

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Database,
  FileUp,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { CPSEDataImportService } from '../../services/CPSEDataImportService';
import { MaterialMatchingService } from '../../services/MaterialMatchingService';
import { MaterialRecord } from '../../types/MaterialMasterTypes';
import { Badge } from '../shared/Badge';

interface CPSEDataUploadPanelProps {
  onImportComplete?: (cpse: string, count: number) => void;
  onNavigateToNext?: () => void;
  onNavigateToMatching?: () => void;
  activeDataset?: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  onSelectDataset?: (id: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL') => void;
}

interface DemoDatasetItem {
  id: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL';
  name: string;
  fullName: string;
  sector: string;
  count: number;
  erp: string;
  fileName: string;
  sampleSpares: string;
  badgeColor: string;
}

const DEMO_DATASETS: DemoDatasetItem[] = [
  {
    id: 'ONGC',
    name: 'ONGC Upstream',
    fullName: 'Oil and Natural Gas Corporation',
    sector: 'Exploration & Production (MoP&NG)',
    count: 100,
    erp: 'SAP S/4HANA (MARA)',
    fileName: 'ONGC.csv',
    sampleSpares: 'Globe & Ball Valves, Seamless Casing Pipes, API 6D Equipment',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'IOCL',
    name: 'IOCL Refining',
    fullName: 'Indian Oil Corporation Limited',
    sector: 'Refining & Petrochemicals (MoP&NG)',
    count: 100,
    erp: 'SAP ECC 6.0 (MARA)',
    fileName: 'IOCL.csv',
    sampleSpares: 'Refinery Maintenance Spares, Class 150/300 Valves, Spiral Gaskets',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
  },
  {
    id: 'BHEL',
    name: 'BHEL Power',
    fullName: 'Bharat Heavy Electricals Limited',
    sector: 'Power & Heavy Engineering (MHI)',
    count: 100,
    erp: 'Oracle EBS (MTL)',
    fileName: 'BHEL.csv',
    sampleSpares: 'Boiler Cast Steel Valves, Turbine Spares, IS 1364 Fasteners',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    id: 'SAIL',
    name: 'SAIL Steel',
    fullName: 'Steel Authority of India Limited',
    sector: 'Steel Plant Heavy Utility (MoS)',
    count: 100,
    erp: 'Integrated Enterprise ERP',
    fileName: 'SAIL.csv',
    sampleSpares: 'Heavy Utility Piping, Blast Furnace Valves, CS Flanges',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    id: 'ALL',
    name: 'Quad-CPSE Pool',
    fullName: 'Combined National Master (All 4)',
    sector: 'Inter-Ministerial Sovereign Federation',
    count: 400,
    erp: 'Multi-Enterprise Gateway',
    fileName: 'All-4-CPSE-Master-Datasets.csv',
    sampleSpares: 'Aggregated Multi-Sectoral Master with Duplicate Clusters',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
];

export const CPSEDataUploadPanel: React.FC<CPSEDataUploadPanelProps> = ({
  onImportComplete,
  onNavigateToNext,
  onNavigateToMatching,
  activeDataset = 'ONGC',
  onSelectDataset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active dataset state
  const [selectedSourceType, setSelectedSourceType] = useState<'EXTERNAL' | 'DEMO'>('DEMO');
  const [selectedDemoId, setSelectedDemoId] = useState<'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL'>(activeDataset);

  const [activeFileName, setActiveFileName] = useState<string>(
    activeDataset === 'ALL' ? 'All-4-CPSE-Master-Datasets.csv' : `${activeDataset}.csv`
  );
  const [activeSourceOrigin, setActiveSourceOrigin] = useState<string>(() => {
    if (activeDataset === 'ALL') return 'Quad-CPSE Sovereign Federation (400 Total Records)';
    const meta = DEMO_DATASETS.find((d) => d.id === activeDataset);
    return `${activeDataset} • ${meta?.erp || 'Enterprise ERP'}`;
  });
  const [stagedRecords, setStagedRecords] = useState<MaterialRecord[]>(() => {
    if (activeDataset === 'ALL') {
      return CPSEDataImportService.getAllImportedRecords();
    }
    const { records } = CPSEDataImportService.loadSyntheticDataset(activeDataset);
    return records;
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showConfirmationBanner, setShowConfirmationBanner] = useState<boolean>(true);
  const [prevActiveDataset, setPrevActiveDataset] = useState(activeDataset);

  // Keep internal state in sync if activeDataset changes from outside
  if (prevActiveDataset !== activeDataset) {
    setPrevActiveDataset(activeDataset);
    setSelectedSourceType('DEMO');
    setSelectedDemoId(activeDataset);
    setShowConfirmationBanner(true);
    if (activeDataset === 'ALL') {
      const all = CPSEDataImportService.getAllImportedRecords();
      setStagedRecords(all);
      setActiveFileName('All-4-CPSE-Master-Datasets.csv');
      setActiveSourceOrigin('Quad-CPSE Sovereign Federation (400 Total Records)');
    } else {
      const { records } = CPSEDataImportService.loadSyntheticDataset(activeDataset);
      setStagedRecords(records);
      setActiveFileName(`${activeDataset}.csv`);
      const meta = DEMO_DATASETS.find((d) => d.id === activeDataset);
      setActiveSourceOrigin(`${activeDataset} • ${meta?.erp || 'Enterprise ERP'}`);
    }
  }

  // Process External CSV File
  const handleProcessFile = (file: File) => {
    setSelectedSourceType('EXTERNAL');
    setActiveFileName(file.name);
    setActiveSourceOrigin(`Custom Plant Catalog (${(file.size / 1024).toFixed(1)} KB)`);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      try {
        const result = CPSEDataImportService.parseAndValidateCSV(text, 'CUSTOM', file.name);
        setStagedRecords(result.validRecords);
        setShowConfirmationBanner(true);
        if (onImportComplete) onImportComplete('CUSTOM', result.validRecords.length);
      } catch (err: any) {
        alert(`Validation error: ${err?.message || 'Failed to read CSV'}`);
      }
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  // Select Demo Dataset
  const handleSelectDemoDataset = (datasetId: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL') => {
    setSelectedSourceType('DEMO');
    setSelectedDemoId(datasetId);
    setShowConfirmationBanner(true);

    if (onSelectDataset) {
      onSelectDataset(datasetId);
    }

    if (datasetId === 'ALL') {
      CPSEDataImportService.loadAllDemoDatasets();
      const all = CPSEDataImportService.getAllImportedRecords();
      setStagedRecords(all);
      setActiveFileName('All-4-CPSE-Master-Datasets.csv');
      setActiveSourceOrigin('Quad-CPSE Sovereign Federation (400 Total Records)');
      if (onImportComplete) onImportComplete('ALL', 400);
    } else {
      const { records } = CPSEDataImportService.loadSyntheticDataset(datasetId);
      setStagedRecords(records);
      setActiveFileName(`${datasetId}.csv`);
      const meta = DEMO_DATASETS.find((d) => d.id === datasetId);
      setActiveSourceOrigin(`${datasetId} • ${meta?.erp || 'Enterprise ERP'}`);
      if (onImportComplete) onImportComplete(datasetId, records.length);
    }
  };

  const handleProceedToNext = () => {
    MaterialMatchingService.harmonizeUploadedRecords(stagedRecords);
    if (onNavigateToNext) {
      onNavigateToNext();
    } else if (onNavigateToMatching) {
      onNavigateToMatching();
    }
  };

  const filteredRecords = stagedRecords.filter((r) =>
    r.sourceMaterialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.originalDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.materialCategory && r.materialCategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedMeta = DEMO_DATASETS.find((d) => d.id === selectedDemoId);

  return (
    <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-xs space-y-5">
      
      {/* 1. SELECTION TILES: OPTION 1 (CSV) & OPTION 2 (PRELOADED DATASETS) */}
      <div className="space-y-4">
        
        {/* Method A: Upload CSV */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-900 text-white flex items-center justify-center text-[11px]">A</span>
              Option A: Upload Plant CSV Catalog
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Accepts SAP MARA, Oracle MTL, or Custom Export
            </span>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const file = e.dataTransfer.files?.[0];
              if (file) handleProcessFile(file);
            }}
            className={`p-5 border-2 border-dashed rounded-lg transition-all text-center space-y-2.5 ${
              selectedSourceType === 'EXTERNAL'
                ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                : 'border-slate-300 hover:border-sky-500 bg-slate-50/50 hover:bg-sky-50/30'
            }`}
          >
            <UploadCloud className="w-8 h-8 text-sky-700 mx-auto" />
            <div>
              <p className="font-semibold text-slate-900 text-xs">
                Drag & drop your CSV file here, or click to browse
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Automatic column detection extracts item codes, descriptions, and engineering specs.
              </p>
            </div>

            <div className="pt-1 flex items-center justify-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                <FileUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Browse File</span>
              </button>
            </div>
          </div>
        </div>

        {/* Method B: Direct One-Click Preloaded Datasets */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-[11px]">B</span>
              Option B: Select Verified Enterprise Dataset (1-Click Staging)
            </span>
            <span className="text-[11px] text-slate-500">
              Click any enterprise dataset to load verified records
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {DEMO_DATASETS.map((ds) => {
              const isSelected = selectedSourceType === 'DEMO' && selectedDemoId === ds.id;
              return (
                <div
                  key={ds.id}
                  onClick={() => handleSelectDemoDataset(ds.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-[#0B192C] bg-sky-50/60 ring-2 ring-[#0B192C] shadow-xs'
                      : 'border-slate-300 hover:border-slate-400 bg-white hover:shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-600" />
                        {ds.name}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${ds.badgeColor}`}>
                        {ds.count}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 truncate">
                      {ds.erp}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-medium">
                    <span className="text-slate-500 truncate">{ds.sector.split(' ')[0]}</span>
                    <span className={isSelected ? 'text-emerald-700 font-bold flex items-center gap-0.5' : 'text-sky-700 font-semibold'}>
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Active</span>
                        </>
                      ) : (
                        <span>Select →</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. IMMEDIATE FEEDBACK & DIRECT STEP 2 PROCEED BANNER */}
      {showConfirmationBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950">
                {selectedSourceType === 'DEMO' ? selectedMeta?.fullName : activeFileName} Staged ({stagedRecords.length} Records)
              </p>
              <p className="text-[11px] text-emerald-800">
                Source: {activeSourceOrigin} • 100% deterministic schema pass. Ready for AI specification normalization.
              </p>
            </div>
          </div>

          <button
            onClick={handleProceedToNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Proceed to Step 2: AI Normalization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. STAGED RECORDS TABLE BUFFER */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-700" />
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">
              Staged Records Buffer ({stagedRecords.length} Total Items Loaded)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter by code, description, size..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 w-60"
            />
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-72 shadow-2xs">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#0B192C] text-white text-[11px] font-mono sticky top-0">
              <tr>
                <th className="py-2.5 px-3 font-semibold">CPSE</th>
                <th className="py-2.5 px-3 font-semibold">Material Code</th>
                <th className="py-2.5 px-3 font-semibold">Raw Description</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Size / Rating</th>
                <th className="py-2.5 px-3 font-semibold">Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredRecords.slice(0, 10).map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 whitespace-nowrap">
                    <Badge value={r.cpse || 'UPLOAD'} size="sm" />
                  </td>
                  <td className="py-2 px-3 font-bold text-[#0B192C] whitespace-nowrap">
                    {r.sourceMaterialCode}
                  </td>
                  <td className="py-2 px-3 text-slate-800 max-w-sm truncate" title={r.originalDescription}>
                    {r.originalDescription}
                  </td>
                  <td className="py-2 px-3 text-slate-700 whitespace-nowrap">{r.materialCategory || 'General Spare'}</td>
                  <td className="py-2 px-3 text-slate-700 whitespace-nowrap">{r.size || r.pressureRating || 'N/A'}</td>
                  <td className="py-2 px-3 text-slate-700 whitespace-nowrap">{r.standard || 'API / ASME'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Showing {Math.min(10, filteredRecords.length)} of {filteredRecords.length} records</span>
          <span className="font-mono">Schema Status: Validated</span>
        </div>
      </div>

      {/* 4. FOOTER ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2 text-slate-700 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active Ingestion: <strong>{activeFileName}</strong> ({stagedRecords.length} Records)</span>
        </div>

        <button
          onClick={handleProceedToNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <span>Proceed to Step 2: AI Spec Normalization</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
