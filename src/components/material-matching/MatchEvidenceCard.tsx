/**
 * Match Evidence & Explainability Component
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Answers the critical question: "Why was this match proposed?"
 * Provides transparent engineering justification, not a black-box percentage.
 */

import React from 'react';
import { CheckCircle2, XCircle, FileText, Info } from 'lucide-react';
import { MatchEvidence } from '../../types/MaterialMatchTypes';

interface MatchEvidenceCardProps {
  evidence: MatchEvidence[];
  confidence: number;
}

export const MatchEvidenceCard: React.FC<MatchEvidenceCardProps> = ({ evidence, confidence }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            AI Explainability: Why Was This Match Proposed?
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Transparent engineering proof points evaluated by the multi-criteria matching engine.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] text-slate-400 font-mono">Demo Matching Confidence:</span>
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono font-bold text-xs border border-sky-200">
            {(confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {evidence.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border flex items-start gap-2.5 transition-colors ${
              item.passed
                ? 'bg-slate-50/70 border-slate-200/80 text-slate-800'
                : 'bg-rose-50/60 border-rose-200 text-rose-900'
            }`}
          >
            {item.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                Category: {item.category.replace(/_/g, ' ')}
              </span>
              <p className="text-xs font-medium leading-relaxed">{item.point}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2 text-[11px] text-slate-600">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <span>
          <strong>Audit Principle:</strong> AI recommendations provide assistive evidence. The Common National Material Code is only published after formal sign-off by a certified CPSE Material Master Reviewer.
        </span>
      </div>
    </div>
  );
};
