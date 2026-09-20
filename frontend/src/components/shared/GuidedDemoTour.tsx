/**
 * Interactive Guided Evaluation & Demo Tour Component
 * Samagri Setu: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas / Department of Public Enterprises
 * 
 * Provides an on-screen pitch assistant and step-by-step role-specific presentation walkthrough
 * so evaluators, CPSE officers, and central reviewers can follow a clear, zero-confusion demo.
 */

import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronUp,
  ShieldCheck,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface GuidedDemoTourProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser?: { name: string; org: string; role: string };
  onSwitchRole?: (role: { name: string; org: string; role: string }) => void;
}

interface TourStep {
  stepNumber: number;
  targetPage: string;
  title: string;
  roleBadge: string;
  roleType: 'CPSE' | 'CENTRAL';
  whatToShow: string;
  keyTalkingPoint: string;
  buttonLabel: string;
}

// 1. CPSE Enterprise Nodal Officer Journey (Decentralized Plant Operations)
const CPSE_OFFICER_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    targetPage: 'cpse-import',
    title: 'Plant ERP Catalog Ingestion',
    roleBadge: 'Plant Nodal Officer',
    roleType: 'CPSE',
    whatToShow: 'Ingest external plant catalog CSV export or select enterprise datasets across ONGC, IOCL, BHEL, and SAIL.',
    keyTalkingPoint: 'Decentralized Ingestion: Plants retain existing ERP systems (SAP S/4HANA / Oracle MTL) with zero daily disruption.',
    buttonLabel: 'Go to Ingestion',
  },
  {
    stepNumber: 2,
    targetPage: 'standardization',
    title: 'AI Specification Extraction',
    roleBadge: 'Normalization Engine',
    roleType: 'CPSE',
    whatToShow: 'Inspect automated NLP extraction of Noun-Modifier, Class rating, Nominal Size, and ASME/API standards from cryptic lines.',
    keyTalkingPoint: 'Standardization: Converts unstructured legacy descriptions into machine-searchable engineering parameters.',
    buttonLabel: 'Go to Specs',
  },
  {
    stepNumber: 3,
    targetPage: 'duplicate-detection',
    title: 'Intra-Plant Duplicate Elimination',
    roleBadge: 'Plant Inventory Optimizer',
    roleType: 'CPSE',
    whatToShow: 'Review 8 redundant item codes where identical physical spares are already sitting in local plant warehouse racks.',
    keyTalkingPoint: 'Working Capital Recovery: Prevents ordering duplicate stock when equivalent spares already exist locally.',
    buttonLabel: 'Go to Duplicates',
  },
  {
    stepNumber: 4,
    targetPage: 'material-matching',
    title: 'Cross-CPSE Material Matching',
    roleBadge: 'Inter-Enterprise Desk',
    roleType: 'CPSE',
    whatToShow: 'Inspect 22 equivalent materials shared with sister CPSEs (IOCL, BHEL, SAIL) with strict pressure and dimension locks.',
    keyTalkingPoint: 'Cross-Enterprise Synergy: Unlocks mutual emergency spare sharing between CPSE plants during maintenance.',
    buttonLabel: 'Go to Matching',
  },
  {
    stepNumber: 5,
    targetPage: 'national-master',
    title: 'National Master & GeM Federation',
    roleBadge: 'Sovereign Federation',
    roleType: 'CPSE',
    whatToShow: 'Verify plant items mapped to official CNMC-XXXXXX codes with two-way cross-referencing to SAP item numbers.',
    keyTalkingPoint: 'Seamless Federation: Local plant ops continue in SAP, while national procurement is aggregated through GeM.',
    buttonLabel: 'Go to Master',
  },
];

// 2. Central Authority / Chief Reviewer Journey (Sovereign Governance & Harmonization)
const CENTRAL_REVIEWER_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    targetPage: 'dashboard',
    title: 'Multi-CPSE Inventory Control Room',
    roleBadge: 'Chief Reviewer (DPE)',
    roleType: 'CENTRAL',
    whatToShow: 'Monitor 400 master records aggregated across 4 CPSEs with live cross-enterprise harmonization metrics.',
    keyTalkingPoint: 'National Visibility: Establishes a single authoritative inventory source across Petroleum and Heavy Industry ministries.',
    buttonLabel: 'Go to Control Room',
  },
  {
    stepNumber: 2,
    targetPage: 'material-matching',
    title: 'Multi-CPSE Similarity Clustering',
    roleBadge: 'Harmonization Core',
    roleType: 'CENTRAL',
    whatToShow: 'Evaluate candidate duplicate clusters across CPSE boundaries with multi-attribute confidence scoring.',
    keyTalkingPoint: 'Automated Harmonization: Detects functionally equivalent items despite completely different naming styles.',
    buttonLabel: 'Go to Matching',
  },
  {
    stepNumber: 3,
    targetPage: 'material-matching',
    title: 'Safety Hard-Locks & Hazard Interceptor',
    roleBadge: 'Safety Rule Engine',
    roleType: 'CENTRAL',
    whatToShow: 'Verify deterministic safety locks preventing merges on pressure rating, schedule, or dimension discrepancies.',
    keyTalkingPoint: 'Zero-Hazard Mandate: Industrial equipment can never be harmonized if pressure containment or sizes conflict.',
    buttonLabel: 'View Safety Locks',
  },
  {
    stepNumber: 4,
    targetPage: 'review-center',
    title: 'Inter-Ministerial Governance Queue',
    roleBadge: 'Inter-Ministerial Council',
    roleType: 'CENTRAL',
    whatToShow: 'Review engineering evidence cards, verify ASME/API compliance, enter audit remarks, and execute statutory approval.',
    keyTalkingPoint: 'Human Accountability: AI recommends with precision, while authorized engineering officers retain full statutory control.',
    buttonLabel: 'Go to Review Queue',
  },
  {
    stepNumber: 5,
    targetPage: 'national-master',
    title: 'Sovereign CNMC Issuance & GeM Federation',
    roleBadge: 'National Secretariat',
    roleType: 'CENTRAL',
    whatToShow: 'Inspect canonical Common National Material Code (CNMC-000001) linked to GeM with 2-way historical mapping to plant ERPs.',
    keyTalkingPoint: 'One Nation, One Material Code: Enables bulk demand aggregation on GeM (saving 20-30% on public tenders) without altering plant ERPs.',
    buttonLabel: 'Go to National Master',
  },
];

export const GuidedDemoTour: React.FC<GuidedDemoTourProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onSwitchRole,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // Opens automatically on first load, cleanly collapsible
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('samagrisetu_completed_steps');
        if (saved) return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [1]; // Step 1 is started
  });
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('samagrisetu_guide_compact') === 'true';
      }
    } catch {
      // fallback
    }
    return false;
  });

  const toggleCompact = (val: boolean) => {
    setIsCompact(val);
    try {
      window.localStorage.setItem('samagrisetu_guide_compact', String(val));
    } catch {
      // fallback
    }
  };

  const isCentralReviewer =
    currentUser?.role?.includes('Chief') || currentUser?.role?.includes('Central');

  // Select appropriate role-specific journey
  const activeSteps = isCentralReviewer ? CENTRAL_REVIEWER_STEPS : CPSE_OFFICER_STEPS;

  const safeStepIndex = currentStepIndex >= activeSteps.length ? 0 : currentStepIndex;
  const currentStep = activeSteps[safeStepIndex] || activeSteps[0];

  // Auto-mark step as completed when user reaches its target screen
  const markCurrentStepDone = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      const next = [...completedSteps, stepNum];
      setCompletedSteps(next);
      try {
        window.localStorage.setItem('samagrisetu_completed_steps', JSON.stringify(next));
      } catch {
        // fallback
      }
    }
  };

  const handleNextStep = () => {
    markCurrentStepDone(currentStep.stepNumber);
    // If the screen in the background is not yet on Step 1's target page, navigate there first
    if (safeStepIndex === 0 && currentPage !== currentStep.targetPage) {
      onNavigate(currentStep.targetPage);
      return;
    }
    if (safeStepIndex < activeSteps.length - 1) {
      const nextIdx = safeStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onNavigate(activeSteps[nextIdx].targetPage);
    }
  };

  const handlePrevStep = () => {
    if (safeStepIndex > 0) {
      const prevIdx = safeStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onNavigate(activeSteps[prevIdx].targetPage);
    } else {
      onNavigate(activeSteps[0].targetPage);
    }
  };

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index);
    onNavigate(activeSteps[index].targetPage);
  };

  const handleFinishDemo = () => {
    markCurrentStepDone(currentStep.stepNumber);
    setIsOpen(false);
    onNavigate(isCentralReviewer ? 'dashboard' : 'cpse-import');
  };

  const toggleRole = () => {
    if (!onSwitchRole) return;
    setCurrentStepIndex(0);
    if (isCentralReviewer) {
      onSwitchRole({
        name: 'ONGC Materials Head',
        org: 'ONGC (Ministry of Petroleum & Natural Gas)',
        role: 'CPSE Enterprise Nodal Officer',
      });
      onNavigate('cpse-import');
    } else {
      onSwitchRole({
        name: 'Er. R. Sundaram, FIE',
        org: 'Inter-Ministerial Council / DPE',
        role: 'Chief Material Master Reviewer',
      });
      onNavigate('dashboard');
    }
  };

  const isCurrentScreenTarget = currentPage === currentStep.targetPage;

  return (
    <div className={`fixed bottom-4 right-4 z-50 font-sans transition-all duration-200 ${
      !isOpen
        ? 'w-auto'
        : isCompact
        ? 'w-[calc(100vw-2rem)] sm:w-[420px]'
        : 'w-[calc(100vw-2rem)] sm:w-[450px]'
    }`}>
      
      {/* 1. Minimized Floating Capsule Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto flex items-center gap-2.5 px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-full shadow-xl border border-slate-700/80 hover:border-sky-400 text-xs font-semibold cursor-pointer transition-all hover:scale-102 group"
          title="Click to open the Evaluation Walkthrough Guide"
        >
          <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
          <span className="tracking-wide text-xs text-slate-100 font-medium">
            {isCentralReviewer ? 'Central Review Guide' : 'Plant Operations Guide'}
          </span>

          <span className="bg-emerald-900/80 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            {completedSteps.length}/5 Done
          </span>

          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      )}

      {/* 2. Compact View (Ultra-Slim Floating Strip) */}
      {isOpen && isCompact && (
        <div className="bg-[#0B192C] text-white rounded-xl shadow-2xl px-3.5 py-2 flex items-center justify-between gap-2.5 border border-slate-700/80 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center text-[10px] font-bold shrink-0">
              {currentStep.stepNumber}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {currentStep.title}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {isCurrentScreenTarget ? '● On active screen' : `Target: ${currentStep.buttonLabel}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {!isCurrentScreenTarget && (
              <button
                onClick={() => onNavigate(currentStep.targetPage)}
                className="px-2 py-0.5 rounded bg-sky-700 hover:bg-sky-600 text-white text-[10px] font-medium transition-colors cursor-pointer"
                title="Go to screen"
              >
                Go →
              </button>
            )}
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              title="Previous Step"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextStep}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Next Step"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleCompact(false)}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer ml-1"
              title="Expand Guide"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Minimize Guide"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Full Professional Walkthrough Card (Clean Executive Design) */}
      {isOpen && !isCompact && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in text-xs">
          
          {/* Header Bar */}
          <div className="bg-[#0B192C] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-sky-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xs text-white tracking-tight">
                    Samagri Setu Walkthrough
                  </h3>
                  <span className="px-2 py-0.2 rounded-full bg-sky-900/60 border border-sky-600/30 text-sky-200 text-[9px] font-medium">
                    Step {currentStep.stepNumber} of 5
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  Role: <span className="text-slate-200">{isCentralReviewer ? 'Chief Central Reviewer' : `${currentUser?.org?.split(' ')[0] || 'CPSE'} Officer`}</span>
                  {onSwitchRole && (
                    <button
                      onClick={toggleRole}
                      className="ml-2 text-sky-400 hover:text-sky-300 underline cursor-pointer"
                    >
                      (Switch to {isCentralReviewer ? 'CPSE Officer' : 'Chief Reviewer'})
                    </button>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => toggleCompact(true)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Make Small (Compact View)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Guide"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Smooth Thin Progress Bar */}
          <div className="h-1 w-full bg-slate-100">
            <div
              className="h-1 bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${(currentStep.stepNumber / activeSteps.length) * 100}%` }}
            />
          </div>

          {/* Step Body */}
          <div className="p-4 space-y-3">
            {/* Step Title & Target Screen Action */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-800 block mb-0.5">
                  Stage {currentStep.stepNumber} • {currentStep.roleBadge}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {currentStep.title}
                </h4>
              </div>

              {isCurrentScreenTarget ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-medium shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>On Screen</span>
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(currentStep.targetPage)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-sky-800 hover:bg-sky-900 text-white rounded-lg text-[11px] font-medium transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <span>{currentStep.buttonLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Guidance Card (Clean, Single Card, Zero Boxy Clutter) */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5">
              <p className="text-slate-700 text-xs leading-relaxed">
                {currentStep.whatToShow}
              </p>

              <div className="pt-2 border-t border-slate-200/70 flex items-start gap-2 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-emerald-950 font-medium leading-relaxed">
                  {currentStep.keyTalkingPoint}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Navigation Bar */}
          <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                currentStepIndex === 0
                  ? 'text-slate-300 border-slate-200 bg-transparent cursor-not-allowed'
                  : 'text-slate-700 border-slate-300 bg-white hover:bg-slate-100 cursor-pointer shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </button>

            {/* Step Milestone Dots */}
            <div className="flex items-center gap-1.5">
              {activeSteps.map((s, idx) => {
                const isActive = safeStepIndex === idx;
                const isDone = completedSteps.includes(s.stepNumber);
                return (
                  <button
                    key={s.stepNumber}
                    onClick={() => handleGoToStep(idx)}
                    className={`transition-all rounded-full cursor-pointer ${
                      isActive
                        ? 'w-5 h-2 bg-sky-600'
                        : isDone
                        ? 'w-2 h-2 bg-emerald-500'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Step ${s.stepNumber}: ${s.title}`}
                  />
                );
              })}
            </div>

            {currentStepIndex < activeSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishDemo}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Finish Tour</span>
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
