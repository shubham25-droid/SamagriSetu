/**
 * MaterialStream.tsx
 * High-precision interactive visual flow for SamagriSetu material harmonization.
 * 
 * Recreates the exact integrated flow from the official design specification:
 * - 4 CPSE input streams on the left with 100% authentic CPSE master records
 * - 4 converging mathematical SVG conduit lines with animated traveling data pulses
 *   using SVG <animateMotion> (zero detached or floating dots)
 * - Centered circular Harmonization Core with official emblem & MATCH/HARMONIZE/STANDARDIZE
 * - Outgoing solid horizontal conduit leading into the Golden CNMC Master Record
 * - Full responsiveness across desktop, tablet, and mobile
 */

import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface MaterialStreamProps {
  currentStep: number;
}

interface CPSERecord {
  id: string;
  cpse: string;
  org: string;
  code: string;
  erp: string;
  raw: string;
  normalized: string;
  color: string;
  normBadge: string;
}

// 100% Certified Authentic Data from actualMatchCandidates.ts & actualCSVDataset.ts
const STREAM_ITEMS: CPSERecord[] = [
  {
    id: 'stream-a',
    cpse: 'CPSE A',
    org: 'ONGC',
    code: 'ONGC-0001',
    erp: 'SAP S/4HANA',
    raw: 'GLOBE VALVE 2 IN CARBON STEEL CL.150 SW',
    normalized: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, Class 150, SW',
    color: '#E8891A', // Warm Saffron
    normBadge: '2 IN → 2 Inch • SW → Socket Weld',
  },
  {
    id: 'stream-b',
    cpse: 'CPSE B',
    org: 'IOCL',
    code: 'IOCL-0001',
    erp: 'SAP ECC 6.0',
    raw: 'GLOBE VALVE 2 IN CL.150 CARBON STEEL SW',
    normalized: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, Class 150, SW',
    color: '#315F7D', // Steel Navy
    normBadge: 'CL.150 → Class 150',
  },
  {
    id: 'stream-c',
    cpse: 'CPSE C',
    org: 'BHEL',
    code: 'BHEL-0001',
    erp: 'Oracle EBS',
    raw: 'GLB VLV 2" A216 WCB 150# SW',
    normalized: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, Class 150, SW',
    color: '#2F7650', // Forest Green
    normBadge: 'GLB VLV → Globe Valve • 150# → Class 150',
  },
  {
    id: 'stream-d',
    cpse: 'CPSE D',
    org: 'SAIL',
    code: 'SAIL-0001',
    erp: 'Integrated ERP',
    raw: 'GLOBE VALVE DN50 CS CL150 SW',
    normalized: 'Globe Valve, 2 Inch (DN 50), Carbon Steel, Class 150, SW',
    color: '#0284C7', // Sky Blue
    normBadge: 'DN50 → 2 Inch • CS → Carbon Steel',
  },
];

export const MaterialStream: React.FC<MaterialStreamProps> = ({ currentStep }) => {
  const isHarmonizing = currentStep === 2;
  const isComplete = currentStep === 3;

  return (
    <div className="w-full relative py-2 select-none font-sans">
      {/* 1. THE 3-COLUMN INTEGRATED HORIZONTAL FLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* LEFT COLUMN: 4 CPSE Input Cards with Authentic Verified Data (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-2.5">
          {STREAM_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`relative transition-all duration-500 rounded-lg p-3 border bg-white shadow-xs ${
                currentStep === 1
                  ? 'border-slate-300 ring-2 ring-sky-200/80 shadow-sm'
                  : currentStep === 2
                  ? 'border-sky-400 ring-2 ring-sky-100 shadow-sm'
                  : 'border-emerald-300'
              }`}
              style={{
                borderLeftWidth: '5px',
                borderLeftColor: item.color,
              }}
            >
              {/* Stream Header with Organization, Code & ERP System */}
              <div className="flex items-center justify-between text-xs font-mono pb-1 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold" style={{ color: item.color }}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.cpse}</span>
                  <span className="text-slate-600 font-semibold font-sans">({item.org})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">{item.erp}</span>
                  <span className="text-slate-700 font-semibold">{item.code}</span>
                </div>
              </div>

              {/* Animated Material Record Content */}
              <div className="pt-1.5">
                {currentStep === 1 && (
                  <div className="font-mono text-xs text-slate-900 font-semibold bg-slate-50 p-2 rounded border border-slate-200 truncate">
                    "{item.raw}"
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-1 animate-fade-in">
                    <div className="text-[11px] font-mono text-slate-400 line-through truncate">
                      {item.raw}
                    </div>
                    <div className="font-mono text-xs text-sky-950 font-semibold bg-sky-50 p-1.5 rounded border border-sky-200 flex items-center justify-between gap-1">
                      <span className="truncate">{item.normalized}</span>
                      <span className="text-[9px] bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded font-bold shrink-0 font-sans">
                        {item.normBadge}
                      </span>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="font-mono text-xs text-slate-900 font-semibold bg-emerald-50/90 p-1.5 rounded border border-emerald-200 flex items-center justify-between animate-fade-in">
                    <span className="truncate">{item.normalized}</span>
                    <span className="text-[10px] text-emerald-900 font-bold bg-emerald-100 px-1.5 py-0.5 rounded shrink-0 font-sans">
                      Traceable ⇄ CNMC
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN: Converging Conduit Lines + Circular Harmonization Core (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
          {/* Top Pill Badge: "Harmonization Core" */}
          <div className="mb-2 z-20">
            <div className="bg-[#F0F7FE] text-sky-950 border border-sky-300 shadow-xs px-4 py-1 rounded-full text-xs font-semibold tracking-normal flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isHarmonizing ? 'bg-sky-600 animate-ping' : 'bg-sky-600'}`} />
              <span>Harmonization Core</span>
            </div>
          </div>

          {/* Integrated Conduit + Circular Core Canvas */}
          <div className="relative w-full h-[270px] flex items-center justify-center">
            {/* SVG Conduit Paths with Mathematical Curves & Traveling Pulses */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 340 270"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow filters for high-tech conduits */}
                <filter id="glow-saffron" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#E8891A" floodOpacity="0.8" />
                </filter>
                <filter id="glow-steel" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#315F7D" floodOpacity="0.8" />
                </filter>
                <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#2F7650" floodOpacity="0.8" />
                </filter>
                <filter id="glow-sky" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#0284C7" floodOpacity="0.8" />
                </filter>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38BDF8" floodOpacity="0.9" />
                </filter>
              </defs>

              {/* 1. CPSE A (ONGC) Saffron Conduit */}
              <path
                id="conduit-ongc"
                d="M 0 35 C 50 35, 68 112, 102 112"
                stroke="#E8891A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <circle r="4.5" fill="#E8891A" filter="url(#glow-saffron)">
                <animateMotion
                  path="M 0 35 C 50 35, 68 112, 102 112"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* 2. CPSE B (IOCL) Steel Navy Conduit */}
              <path
                id="conduit-iocl"
                d="M 0 102 C 45 102, 70 126, 102 126"
                stroke="#315F7D"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <circle r="4.5" fill="#315F7D" filter="url(#glow-steel)">
                <animateMotion
                  path="M 0 102 C 45 102, 70 126, 102 126"
                  dur="2.4s"
                  begin="0.6s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* 3. CPSE C (BHEL) Forest Green Conduit */}
              <path
                id="conduit-bhel"
                d="M 0 168 C 45 168, 70 144, 102 144"
                stroke="#2F7650"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <circle r="4.5" fill="#2F7650" filter="url(#glow-green)">
                <animateMotion
                  path="M 0 168 C 45 168, 70 144, 102 144"
                  dur="2.4s"
                  begin="1.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* 4. CPSE D (SAIL) Sky Blue Conduit */}
              <path
                id="conduit-sail"
                d="M 0 235 C 50 235, 68 158, 102 158"
                stroke="#0284C7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <circle r="4.5" fill="#0284C7" filter="url(#glow-sky)">
                <animateMotion
                  path="M 0 235 C 50 235, 68 158, 102 158"
                  dur="2.4s"
                  begin="1.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Text labels matching user reference diagram */}
              <text x="6" y="27" fill="#B45309" fontSize="9" fontFamily="Noto Sans" fontWeight="700">CPSE A</text>
              <text x="6" y="94" fill="#1E3E62" fontSize="9" fontFamily="Noto Sans" fontWeight="700">CPSE B</text>
              <text x="6" y="160" fill="#15803D" fontSize="9" fontFamily="Noto Sans" fontWeight="700">CPSE C</text>
              <text x="6" y="227" fill="#0369A1" fontSize="9" fontFamily="Noto Sans" fontWeight="700">CPSE D</text>

              {/* 5. Right Output Conduit into CNMC Card */}
              <path
                d="M 238 135 L 340 135"
                stroke="#0D2E47"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.95"
              />
              {/* Output Traveling Pulse Packet */}
              <circle r="5" fill="#38BDF8" filter="url(#glow-cyan)">
                <animateMotion
                  path="M 238 135 L 340 135"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Circular Harmonization Core (Matches media_1789806228454.png perfectly) */}
            <div className="relative z-10 flex items-center justify-center">
              {/* Outer Light Blue Radiant Halo */}
              <div
                className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
                  isHarmonizing
                    ? 'w-48 h-48 bg-sky-200/70 border-2 border-sky-400 scale-105'
                    : isComplete
                    ? 'w-48 h-48 bg-emerald-100/70 border border-emerald-300'
                    : 'w-44 h-44 bg-sky-100/60 border border-sky-200'
                }`}
              />

              {/* Crisp White Circular Face */}
              <div className="relative z-10 w-36 h-36 rounded-full bg-white border border-sky-200 shadow-md flex flex-col items-center justify-center p-2 text-center transition-all duration-300">
                {/* Inner Dashed Precision Circle */}
                <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-sky-300/80 pointer-events-none" />

                {/* Official SamagriSetu Emblem */}
                <div className="w-10 h-10 mb-1 flex items-center justify-center relative z-10">
                  <img
                    src="/samagrisetu-logo.png"
                    alt="SamagriSetu Core"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>

                {/* Core Institutional Text: MATCH / HARMONIZE / STANDARDIZE */}
                <div className="relative z-10 space-y-0.5 font-bold tracking-normal leading-tight text-slate-800 font-sans">
                  <div className={`text-[10px] transition-colors ${isComplete ? 'text-emerald-700' : 'text-[#0B192C]'}`}>
                    {isComplete ? 'MATCHED' : 'MATCH'}
                  </div>
                  <div className={`text-[10px] transition-colors ${isHarmonizing ? 'text-sky-700 animate-pulse font-extrabold' : isComplete ? 'text-sky-800' : 'text-sky-700'}`}>
                    {isHarmonizing ? 'HARMONIZING...' : 'HARMONIZE'}
                  </div>
                  <div className={`text-[9px] transition-colors font-medium ${isComplete ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}>
                    {isComplete ? 'STANDARDIZED' : 'STANDARDIZE'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pill Badge: "Technical Identity + Review" */}
          <div className="mt-2 z-20">
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

        {/* RIGHT COLUMN: The Golden CNMC Master Output Card (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
          {/* Top Pill: "Common National Code" */}
          <div className="flex justify-start sm:justify-center">
            <div className="bg-[#F0F7FE] text-sky-950 border border-sky-300 shadow-xs px-4 py-1 rounded-full text-xs font-semibold tracking-normal flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Common National Code</span>
            </div>
          </div>

          {/* Master Output Card (Matching user reference navy card) */}
          <div
            className={`rounded-xl p-5 text-white transition-all duration-500 shadow-md ${
              currentStep === 3
                ? 'bg-[#0D2E47] border-2 border-sky-400 ring-4 ring-sky-200 shadow-lg'
                : currentStep === 2
                ? 'bg-[#123B5D] border border-sky-500 shadow-md'
                : 'bg-[#123B5D]/90 border border-slate-600 opacity-90'
            }`}
          >
            <div className="space-y-3">
              {/* Header CNMC Tag */}
              <div className="flex items-center justify-between border-b border-slate-600/70 pb-2">
                <div>
                  <h4 className="text-2xl font-bold tracking-tight text-white font-sans">
                    CNMC
                  </h4>
                  <span className="text-[10px] font-mono tracking-normal text-slate-300 uppercase block">
                    COMMON NATIONAL MATERIAL CODE
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 font-mono text-xs font-bold rounded transition-colors ${
                    currentStep === 3
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {currentStep === 3 ? 'CNMC-000001' : 'PENDING REVIEW'}
                </span>
              </div>

              {/* Standardized Engineering Description */}
              <div className="bg-black/30 border border-white/15 p-3 rounded font-mono text-xs space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block font-sans">
                  Unified National Standard Specification
                </span>
                <div className="text-xs font-semibold text-white leading-relaxed">
                  GLOBE VALVE, 2 INCH (DN 50), CARBON STEEL (ASTM A216 WCB), ASME CLASS 150, SOCKET WELD (SW), ASME B16.34
                </div>
                <div className="text-[10px] text-sky-300 pt-1 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span>Standard: ASME B16.34</span>
                  <span>•</span>
                  <span>UNSPSC: 40141603</span>
                  <span>•</span>
                  <span>4 CPSEs Harmonized</span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-sans font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Two-Way Traceability Active</span>
                </span>
                <span className="text-amber-300 font-medium font-sans">GeM Sync Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC STAGE DETAIL BANNER (PRECISE, SIMPLE, 3 STAGES ONLY) */}
      <div className="mt-5 p-4 bg-[#F0F7FE] rounded-xl border border-sky-300/80 shadow-xs text-xs font-sans">
        {currentStep === 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-800">
            <div>
              <strong className="text-slate-950 font-bold">Stage 1: Fragmented Material Masters - </strong>
              Four independent CPSEs catalog the identical 2" Class 150 carbon steel globe valve under divergent abbreviations (<code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">2 IN</code> vs <code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">DN50</code>, <code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">CL.150</code> vs <code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">150#</code>) and disparate ERP item codes.
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 shrink-0 bg-amber-50 px-2.5 py-1 rounded border border-amber-300">
              4 Disparate Identifiers
            </span>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-800">
              <div>
                <strong className="text-slate-950 font-bold">Stage 2: Core Harmonization & Safety Interception - </strong>
                The engine normalizes abbreviations (<code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">GLB VLV → Globe Valve</code>, <code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">DN50 → 2 Inch</code>, <code className="bg-sky-100/70 px-1 py-0.5 rounded text-sky-950 font-mono">A216 WCB → Carbon Steel</code>), parses engineering attributes, and enforces ASME safety hard-locks.
              </div>
              <span className="text-xs font-mono font-bold text-sky-800 shrink-0 bg-sky-100 px-2.5 py-1 rounded border border-sky-300">
                AI Normalization + Safety Gate
              </span>
            </div>

            {/* Hard-Lock Safety Callout */}
            <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-lg text-[11px] text-rose-950 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Safety Hard-Lock Enforced:</strong> ASME B16.34 Class 150 valves are strictly isolated from Class 300 lines. Mismatches are automatically intercepted before human sign-off to prevent refinery burst hazards.
              </span>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-950 font-bold">Stage 3: Common National Material Code (CNMC-000001) - </strong>
                Unified Golden Record created with permanent non-destructive two-way traceability back to original CPSE plant ERPs: <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-mono text-[11px]">ONGC-0001</code>, <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-mono text-[11px]">IOCL-0001</code>, <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-mono text-[11px]">BHEL-0001</code>, <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-mono text-[11px]">SAIL-0001</code>.
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 shrink-0 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
              National Master Active
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
