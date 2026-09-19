/**
 * Government / Enterprise Navigation Sidebar
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  History,
  GitMerge,
  CopyCheck,
  BookOpen,
  Network,
  RotateCcw,
  CheckSquare,
  ScrollText,
  ShieldCheck,
  Database,
  HelpCircle,
  Globe,
  Check,
} from 'lucide-react';

interface AppSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  pendingReviewCount?: number;
  currentUser?: { name: string; org: string; role: string };
  completedSteps?: string[];
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPage,
  onNavigate,
  pendingReviewCount = 4,
  currentUser,
  completedSteps = [],
}) => {
  const isCPSEOfficer = currentUser?.role === 'CPSE Enterprise Nodal Officer';
  const cpseName = currentUser?.org?.split(' ')[0] || 'CPSE';

  // 1. CPSE Enterprise Officer Navigation (Steps 1 to 5 sequential at the top, auxiliary info below)
  const cpseSections: NavSection[] = [
    {
      title: 'CORE WORKFLOW STEPS',
      items: [
        { id: 'cpse-import', label: '1. Ingest Plant CSV', icon: UploadCloud, badge: 'Step 1' },
        { id: 'standardization', label: '2. AI Spec Normalization', icon: RotateCcw, badge: 'Step 2' },
        { id: 'duplicate-detection', label: '3. Internal Duplicates', icon: CopyCheck, badge: 'Step 3' },
        { id: 'material-matching', label: '4. Sister CPSE Matches', icon: GitMerge, badge: 'Step 4' },
        { id: 'national-master', label: '5. National Master & GeM', icon: BookOpen, badge: 'Step 5' },
      ],
    },
    {
      title: 'PLANT RECORDS & AUDIT',
      items: [
        { id: 'dashboard', label: `${cpseName} Operations Hub`, icon: LayoutDashboard },
        { id: 'cpse-data', label: `${cpseName} Master Records`, icon: Database, badge: cpseName === 'Quad-CPSE' ? '400' : '100' },
        { id: 'import-history', label: 'Upload History & Logs', icon: History },
      ],
    },
    {
      title: 'REFERENCE & KNOWLEDGE',
      items: [
        { id: 'material-mapping', label: 'SAP to CNMC Mapping', icon: Network },
        { id: 'help', label: 'Plant Officer Manual', icon: HelpCircle },
        { id: 'landing', label: 'Public Portal', icon: Globe },
      ],
    },
  ];

  // 2. Central Council / Chief Material Master Reviewer Navigation
  // Streamlined, executive, uncluttered - NO fake steps, only core authority operations
  const centralSections: NavSection[] = [
    {
      title: 'EXECUTIVE GOVERNANCE',
      items: [
        {
          id: 'review-center',
          label: 'Inter-Ministerial Approval Queue',
          icon: CheckSquare,
          badge: pendingReviewCount > 0 ? `${pendingReviewCount} Pending` : undefined,
        },
        {
          id: 'material-matching',
          label: 'Cross-CPSE Matching & Conflicts',
          icon: GitMerge,
        },
        {
          id: 'national-master',
          label: 'National Material Master (CNMC)',
          icon: BookOpen,
        },
        {
          id: 'dashboard',
          label: 'Council Executive Control Room',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'AUDIT & FEDERATED DATA',
      items: [
        {
          id: 'audit-trail',
          label: 'Sovereign Audit Ledger (CVC/CAG)',
          icon: ScrollText,
        },
        {
          id: 'cpse-data',
          label: 'Federated Multi-CPSE Master',
          icon: Database,
          badge: '400',
        },
        {
          id: 'landing',
          label: 'Public Transparency Portal',
          icon: Globe,
        },
      ],
    },
  ];

  const coreStepIds = ['cpse-import', 'standardization', 'duplicate-detection', 'material-matching', 'national-master'];
  const completedCount = coreStepIds.filter((id) => completedSteps?.includes(id)).length;

  const sections = isCPSEOfficer ? cpseSections : centralSections;

  return (
    <aside className="w-60 bg-[#0B192C] border-r border-slate-700 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {/* Status Card: Workflow Progress for CPSE Officer OR Apex Authority Badge for Chief Reviewer */}
        {isCPSEOfficer ? (
          <div className="mx-1 mb-2.5 p-2.5 rounded-md bg-[#071322] border border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Workflow Progress</span>
              <span className="text-emerald-400 font-bold font-mono">
                {completedCount} of 5 Completed
              </span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
            <div className="text-[9px] text-slate-400 mt-1 font-mono text-right">
              {Math.round((completedCount / 5) * 100)}% Complete
            </div>
          </div>
        ) : (
          <div className="mx-1 mb-2.5 p-2.5 rounded-md bg-[#071322] border border-sky-800/40 shadow-2xs font-mono">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-sky-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                Apex Authority
              </span>
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-bold text-[9px] border border-sky-700/50">
                DPE • GeM
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
              Chief Material Master Reviewer
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Federated Oversight Active</span>
            </div>
          </div>
        )}

        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            <h4 className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800/80 mb-1">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                const isWorkflowStep = isCPSEOfficer && coreStepIds.includes(item.id);
                const isCompleted = isWorkflowStep && completedSteps?.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs transition-all text-left font-mono ${
                      isActive
                        ? 'bg-[#1E3A8A] text-white font-semibold border-l-2 border-sky-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isCompleted
                            ? 'text-emerald-400'
                            : isActive
                            ? 'text-sky-300'
                            : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {isWorkflowStep && isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-tight bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)] shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" />
                        <span>Done</span>
                      </span>
                    ) : isWorkflowStep && isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-tight bg-sky-950/80 text-sky-300 border border-sky-500/40 shadow-[0_0_8px_rgba(56,189,248,0.15)] shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        <span>Active</span>
                      </span>
                    ) : item.badge !== undefined ? (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono shrink-0 ${
                          isActive
                            ? 'bg-sky-400 text-[#0B192C]'
                            : typeof item.badge === 'number'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom status indicator */}
      <div className="p-2.5 border-t border-slate-800 bg-[#071322] text-[10px] text-slate-400 font-mono">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            CPSE Master Engine
          </span>
          <span className="text-slate-500">v1.4</span>
        </div>
        <div className="mt-0.5 text-[9px] text-slate-500">
          DPE / Inter-Ministerial CPSE Council
        </div>
      </div>
    </aside>
  );
};
