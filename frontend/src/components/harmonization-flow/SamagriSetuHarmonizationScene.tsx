/**
 * SamagriSetuHarmonizationScene.tsx
 * The primary visual storytelling section explaining the complete SamagriSetu workflow.
 * 
 * Recreates the exact visual structure from the user's reference:
 * - Light blueprint grid canvas with attractive light blue engineering accents
 * - Floating label pills: "Fragmented Material Masters", "Harmonization Core", "Common National Code", "Technical Identity + Review"
 * - 4 converging streams (CPSE A, B, C, D) with animated data cards
 * - Central circular Harmonization Core with official SamagriSetu emblem & MATCH/HARMONIZE/STANDARDIZE
 * - Connecting horizontal conduit into the solid navy CNMC Master card
 * - Enterprise UX4G text treatment in Noto Sans with restrained hierarchy and strong contrast
 */

import React from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useHarmonizationAnimation } from './useHarmonizationAnimation';
import { MaterialStream } from './MaterialStream';

interface SamagriSetuHarmonizationSceneProps {
  className?: string;
}

export const SamagriSetuHarmonizationScene: React.FC<SamagriSetuHarmonizationSceneProps> = ({
  className = '',
}) => {
  const {
    currentStep,
    currentStage,
    stages,
    isPlaying,
    containerRef,
    goToStep,
    nextStep,
    prevStep,
    togglePlay,
  } = useHarmonizationAnimation(7000);

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-blueprint-grid border-2 border-sky-300/80 rounded-2xl overflow-hidden shadow-md text-slate-900 font-sans ${className}`}
    >
      {/* 1. SECTION INTRO HEADER (Mandated Section Copy & UX4G Typography on Soft Ice-Blue) */}
      <div className="bg-[#F0F6FD] border-b border-sky-200 px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
            <span className="text-xs font-mono font-bold tracking-normal uppercase text-sky-900">
              SamagriSetu Material Harmonization Flow
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            From Fragmented Material Masters to One Common Code
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            SamagriSetu harmonizes material records across CPSEs by comparing descriptions, technical attributes and specifications-then routes recommendations through human validation before creating a Common National Material Code.
          </p>
        </div>

        {/* Playback Controls & Stage Progress */}
        <div className="flex items-center gap-2 self-start md:self-center font-mono text-xs shrink-0">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-sky-50 rounded border border-sky-300 text-sky-950 transition-colors font-medium shadow-2xs"
            title={isPlaying ? 'Pause workflow animation' : 'Play workflow animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={() => goToStep(1)}
            className="p-1.5 bg-white hover:bg-sky-50 rounded border border-sky-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
            title="Reset to Step 01"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. SIMPLE 3-STAGE SELECTION TABS (Clean, prominent, zero confusion) */}
      <div className="bg-[#E4EFF9] border-b border-sky-200 px-4 sm:px-8 py-2.5 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          {stages.map((st) => (
            <button
              key={st.id}
              onClick={() => goToStep(st.id)}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all text-left font-sans border ${
                currentStep === st.id
                  ? 'bg-white text-[#0B192C] border-sky-500 shadow-sm ring-2 ring-sky-300/70 font-semibold'
                  : currentStep > st.id
                  ? 'bg-white/70 text-slate-800 border-sky-200 hover:bg-white'
                  : 'bg-white/40 text-slate-600 border-sky-100 hover:bg-white/70'
              }`}
            >
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                  currentStep === st.id
                    ? 'bg-[#0B192C] text-white'
                    : currentStep > st.id
                    ? 'bg-emerald-700 text-white'
                    : 'bg-sky-100 text-sky-900 border border-sky-200'
                }`}
              >
                {st.stageNumber}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {st.stageName}
                </div>
                <div className="text-[10px] text-slate-600 truncate mt-0.5">
                  {st.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN VISUAL CANVAS (Light Blue Technical Blueprint Grid) */}
      <div className="relative p-4 sm:p-8 space-y-4">
        {/* Floating Top Label Pills */}
        <div className="flex items-center justify-between px-2 text-xs font-semibold">
          {/* Top-Left Pill */}
          <div className="bg-[#F0F7FE] text-sky-950 border border-sky-300 shadow-xs px-3.5 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8891A]" />
            <span>Fragmented Material Masters</span>
          </div>

          {/* Current Stage Indicator */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-300 text-sky-950 text-xs font-semibold">
            <span>Stage {currentStage.stageNumber}:</span>
            <span className="text-sky-900 font-bold">{currentStage.stageTitle}</span>
          </div>

          {/* Top-Right Pill */}
          <div className="bg-[#F0F7FE] text-sky-950 border border-sky-300 shadow-xs px-3.5 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Common National Code</span>
          </div>
        </div>

        {/* Integrated Harmonization Flow: CPSE Streams -> Conduit & Core -> CNMC Golden Master */}
        <MaterialStream currentStep={currentStep} />

        {/* Bottom Navigation & Step Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-sky-200 text-xs font-sans">
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-sky-50 rounded border border-sky-300 text-slate-800 transition-colors font-medium shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous Stage</span>
          </button>

          <span className="text-slate-600 hidden sm:inline text-xs font-medium">
            3 Clear Stages • Ingest (Inputs) → Harmonize & Safety → Common National Code (CNMC)
          </span>

          <button
            onClick={nextStep}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white font-semibold rounded transition-colors shadow-2xs"
          >
            <span>Next Stage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
