/**
 * National Material Harmonization Pipeline Visualizer
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import {
  Database,
  ArrowRight,
  Filter,
  Cpu,
  UserCheck,
  Network,
} from 'lucide-react';

export const HarmonizationPipelineVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to AI matching

  const steps = [
    {
      id: 1,
      title: '1. CPSE Material Ingestion',
      subtitle: 'ONGC, IOCL, BHEL Raw Masters',
      icon: Database,
      detail: 'Independent CPSE datasets ingested with proprietary schemas, legacy descriptions (e.g. BALL V/V 50MM vs 2" CS), and disparate UOM standards.',
      input: 'Different Material Codes & Descriptions',
      output: 'Standardized Ingestion Data Pool',
    },
    {
      id: 2,
      title: '2. Normalization & Extraction',
      subtitle: 'Metric/Imperial & Term Canonicalization',
      icon: Filter,
      detail: 'NLP and regex extract discrete technical tokens: 50MM -> 2" (DN50), CS -> Carbon Steel, CL150 -> Class 150, SMLS -> Seamless.',
      input: 'Unstructured Free-Text Strings',
      output: 'Structured Technical Attribute Matrix',
    },
    {
      id: 3,
      title: '3. Matching & Conflict Detection',
      subtitle: 'Safety Rules & Cross-CPSE Clustering',
      icon: Cpu,
      detail: 'Multi-criteria comparison identifies Identical, Near-Duplicate, or Equivalent candidates. Safety rules flag hard conflicts (e.g. Class 150 vs Class 300) to stop unsafe merges.',
      input: 'Structured Specifications',
      output: 'Candidate Clusters & Conflict Flags',
    },
    {
      id: 4,
      title: '4. Human Review & Approval',
      subtitle: 'Government Engineer Oversight',
      icon: UserCheck,
      detail: 'Authorized CPSE Material Master Reviewers validate recommendations. Reviewers can approve, modify specifications, or reject with auditable reason.',
      input: 'AI Recommendations + Evidence',
      output: 'Validated Harmonization Decision',
    },
    {
      id: 5,
      title: '5. National Master & Mapping',
      subtitle: 'One Nation • One Code (CNMC)',
      icon: Network,
      detail: 'Generates Common National Material Code (e.g. CNMC-000184) and maintains immutable bi-directional mapping to all original CPSE codes.',
      input: 'Approved Material Standard',
      output: 'CNMC + Bi-directional Legacy Traceability',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              National Unified Material Master Framework Workflow
            </h3>
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-mono font-bold">
              Core Architecture
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end transformation from fragmented CPSE records to an auditable National Material Master.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Click any phase to inspect logic
        </div>
      </div>

      {/* Stepper Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isSelected = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-sky-500/50'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-1.5 rounded-md ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {step.id < 5 && (
                  <ArrowRight
                    className={`w-3.5 h-3.5 hidden md:block ${
                      isSelected ? 'text-sky-400' : 'text-slate-400'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2.5">
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </div>
                <div className={`text-[11px] mt-0.5 truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400">
                PHASE 0{activeStep} ARCHITECTURAL DETAIL:
              </span>
              <span className="text-sm font-bold text-white">
                {steps[activeStep - 1].title}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {steps[activeStep - 1].detail}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 text-xs font-mono">
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Input</span>
              <span className="text-sky-300 font-medium">{steps[activeStep - 1].input}</span>
            </div>
            <div className="hidden sm:block text-slate-600">→</div>
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Output</span>
              <span className="text-emerald-400 font-medium">{steps[activeStep - 1].output}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
