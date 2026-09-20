/**
 * HarmonizationCore.tsx
 * Recreates the exact circular Harmonization Core from the official design specification:
 * - Soft light-blue outer halo
 * - Crisp white circular body with subtle shadow
 * - Inner dashed technical circle
 * - Official SamagriSetu emblem
 * - Text: MATCH / HARMONIZE / STANDARDIZE
 * - Floating label pills: "Harmonization Core" (top) and "Technical Identity + Review" (bottom)
 */

import React from 'react';

interface HarmonizationCoreProps {
  currentStep: number;
  className?: string;
}

export const HarmonizationCore: React.FC<HarmonizationCoreProps> = ({ currentStep, className = '' }) => {
  const isHarmonizing = currentStep === 2;
  const isComplete = currentStep === 3;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 1. Top Pill Badge: "Harmonization Core" */}
      <div className="mb-4 z-20">
        <div className="bg-[#F0F7FE] text-sky-950 border border-sky-300 shadow-xs px-4 py-1 rounded-full text-xs font-semibold tracking-normal flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
          <span>Harmonization Core</span>
        </div>
      </div>

      {/* 2. Main Circular Engine Container */}
      <div className="relative flex items-center justify-center">
        {/* Soft Light Blue Ambient Outer Halo */}
        <div
          className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
            isHarmonizing
              ? 'w-56 h-56 bg-sky-200/70 border-2 border-sky-400 scale-105'
              : isComplete
              ? 'w-56 h-56 bg-emerald-100/70 border border-emerald-300'
              : 'w-52 h-52 bg-sky-100/60 border border-sky-200'
          }`}
        />

        {/* Crisp Circular Core */}
        <div className="relative z-10 w-44 h-44 rounded-full bg-white border border-sky-200 shadow-md flex flex-col items-center justify-center p-3 text-center transition-all duration-300">
          {/* Inner Dashed Precision Circle */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-sky-300/80 pointer-events-none" />

          {/* Official SamagriSetu Emblem */}
          <div className="w-12 h-12 mb-1.5 flex items-center justify-center relative z-10">
            <img
              src="/samagrisetu-logo.png"
              alt="SamagriSetu Core"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          </div>

          {/* Core Institutional Text: MATCH / HARMONIZE / STANDARDIZE */}
          <div className="relative z-10 space-y-0.5 font-bold tracking-normal leading-tight text-slate-800 font-sans">
            <div className={`text-[11px] transition-colors ${isComplete ? 'text-emerald-700' : 'text-[#0B192C]'}`}>
              {isComplete ? 'MATCHED' : 'MATCH'}
            </div>
            <div className={`text-[11px] transition-colors ${isHarmonizing ? 'text-sky-700 animate-pulse font-extrabold' : isComplete ? 'text-sky-800' : 'text-sky-700'}`}>
              {isHarmonizing ? 'HARMONIZING...' : 'HARMONIZE'}
            </div>
            <div className={`text-[10px] transition-colors font-medium ${isComplete ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}>
              {isComplete ? 'STANDARDIZED' : 'STANDARDIZE'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Pill Badge: "Technical Identity + Review" */}
      <div className="mt-4 z-20">
        <div
          className={`px-4 py-1 rounded-full text-xs font-semibold tracking-normal border shadow-xs transition-colors duration-500 flex items-center gap-2 ${
            isComplete
              ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
              : isHarmonizing
              ? 'bg-sky-50 text-sky-950 border-sky-300 ring-1 ring-sky-200'
              : 'bg-[#F0F7FE] text-slate-700 border-sky-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isComplete ? 'bg-emerald-500' : isHarmonizing ? 'bg-sky-600 animate-ping' : 'bg-slate-400'
            }`}
          />
          <span>
            {isComplete
              ? 'Technical Identity Verified & Signed Off'
              : isHarmonizing
              ? 'Safety Gate & Parameter Verification Active'
              : 'Technical Identity + Review'}
          </span>
        </div>
      </div>
    </div>
  );
};
