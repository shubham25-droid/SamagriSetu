/**
 * National Material Master Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Check } from 'lucide-react';
import { NationalMaterialService } from '../services/NationalMaterialService';
import { NationalMaterial } from '../types/MaterialMasterTypes';
import { NationalMaterialMasterTable } from '../components/material-master/NationalMaterialMasterTable';
import { NationalMaterialDetailModal } from '../components/material-master/NationalMaterialDetailModal';
import { OneMaterialToManyCPSEVisual } from '../components/material-master/OneMaterialToManyCPSEVisual';

interface NationalMaterialMasterPageProps {
  onNavigateToPrev?: () => void;
  isCompleted?: boolean;
  isChiefReviewer?: boolean;
}

export const NationalMaterialMasterPage: React.FC<NationalMaterialMasterPageProps> = ({
  onNavigateToPrev,
  isCompleted,
  isChiefReviewer,
}) => {
  const [materials] = useState<NationalMaterial[]>(
    NationalMaterialService.getNationalMaterials()
  );
  const [selectedMaterial, setSelectedMaterial] = useState<NationalMaterial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectMaterial = (material: NationalMaterial) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-lg border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isChiefReviewer ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
                CANONICAL NATIONAL MASTER • GeM PROCUREMENT REPOSITORY
              </span>
            ) : isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                STEP 5 COMPLETED • REGISTERED IN CNMC MASTER
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wide bg-[#0B192C] text-sky-200 border border-sky-800 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                STEP 5 OF 5 • IN PROGRESS
              </span>
            )}
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-700" />
              National Unified Material Master & GeM Registry
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Governed catalog of approved Common National Material Codes (CNMC). Each standard retains multi-CPSE legacy ERP traceability.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-sm bg-emerald-50 text-emerald-900 font-mono text-xs font-bold border border-emerald-300">
            One Nation • One Material Code
          </span>

          {onNavigateToPrev && (
            <button
              onClick={onNavigateToPrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isChiefReviewer ? 'Cross-CPSE Matching' : 'Step 4'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Featured National Material Signature Traceability Card */}
      {materials.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span className="font-bold text-slate-700 uppercase">
              Featured Harmonized Master Reference
            </span>
            <span className="text-slate-400">Click any row below to inspect its profile</span>
          </div>
          <OneMaterialToManyCPSEVisual material={materials[0]} />
        </div>
      )}

      {/* Full National Material Master Interactive Table */}
      <NationalMaterialMasterTable
        materials={materials}
        onSelectMaterial={handleSelectMaterial}
      />

      {/* Deep-Dive Material Profile Modal */}
      <NationalMaterialDetailModal
        material={selectedMaterial}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMaterial(null);
        }}
      />

      {/* Bottom Step Navigation Bar */}
      {onNavigateToPrev && (
        <div className="bg-white border border-slate-300 p-3.5 rounded-sm shadow-2xs flex items-center justify-between">
          <button
            onClick={onNavigateToPrev}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Step 4: Sister CPSE Matches</span>
          </button>

          <span className="text-xs text-slate-500 font-mono font-bold">
            Workflow Complete: Catalog is fully harmonized & registered
          </span>
        </div>
      )}
    </div>
  );
};
