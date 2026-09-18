/**
 * Official Public Portal & Government Landing Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - Chennai Petroleum Corporation Limited (CPCL)
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Factory,
  BadgeCheck,
} from 'lucide-react';
import { SamagriSetu3DTopology } from '../components/shared/SamagriSetu3DTopology';

interface LandingPageProps {
  onEnterApp: (targetPage?: string, user?: { name: string; org: string; role: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  // Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  const slides = [
    {
      badge: 'ENTERPRISE INGESTION • AUTOMATED PIPELINE',
      title: 'Upload Plant Catalog & Harmonize',
      subtitle:
        'Upload your plant CSV export to automatically extract mechanical parameters, detect cross-CPSE duplicates, and generate Common National Material Codes.',
      primaryBtn: 'Upload Plant Catalog (CSV)',
      primaryTarget: 'cpse-import',
      secondaryBtn: 'Explore Sample CPSE Master (400)',
      secondaryTarget: 'cpse-data',
      image: '/cpse-refinery-hero.jpg',
      imagePosition: 'center 35%',
      imageCaption: 'Chennai Petroleum Corporation Limited (CPCL) Manali Petrochemical Complex',
      sector: 'Downstream Refining & Petrochemicals'
    },
    {
      badge: 'CANONICAL MASTER DATA • GeM FEDERATION',
      title: 'National Master for CPSE Procurement',
      subtitle:
        'Federating legacy ERP catalogs into a single canonical master for transparent public sector procurement.',
      primaryBtn: 'Open National Master',
      primaryTarget: 'national-master',
      secondaryBtn: 'Legacy Mapping Registry',
      secondaryTarget: 'material-mapping',
      image: '/secretariat-delhi-hero.jpg',
      imagePosition: 'center 30%',
      imageCaption: 'Digital Public Infrastructure for Central Public Sector Enterprises',
      sector: 'National CPSE Digital Infrastructure'
    },
    {
      badge: 'SAFETY GOVERNANCE • DETERMINISTIC INTERCEPTION',
      title: 'Safety Hard-Locks & Interception',
      subtitle:
        'Automated parameter extraction preventing catastrophic pressure rating and metallurgical mismatches.',
      primaryBtn: 'Inspect Safety Interceptor',
      primaryTarget: 'material-matching',
      secondaryBtn: 'Engineering Review Queue',
      secondaryTarget: 'review-center',
      image: '/cpse-command-center.jpg',
      imagePosition: 'center 35%',
      imageCaption: 'Public Sector Master Data Operations & Engineering Review Command Center',
      sector: 'Central Operations & Digital Infrastructure'
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 font-sans ${fontSize === 'lg' ? 'text-base' : fontSize === 'sm' ? 'text-xs' : 'text-sm'}`}>
      
      {/* National Tricolor Brand Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* 1. TOP PLATFORM SERVICE BAR */}
      <div className="bg-[#071322] border-b border-slate-800 text-slate-300 text-[11px] font-mono py-1.5 px-4 sm:px-8 lg:px-12 w-full">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Left: Platform Identity */}
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-slate-100 font-semibold tracking-tight text-xs font-sans">
              AI-Driven National Material Harmonization Platform
            </span>
          </div>

          {/* Right: Accessibility Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Font Resizer */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
              <span className="text-slate-500 uppercase mr-1 text-[9px] font-sans">Text:</span>
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1 transition-colors ${fontSize === 'sm' ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1 transition-colors ${fontSize === 'md' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
                title="Default font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1 transition-colors ${fontSize === 'lg' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white border-b border-slate-200 shadow-2xs sticky top-0 z-40 w-full px-4 sm:px-8 lg:px-12">
        <div className="w-full py-3 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity Lockup - Clean National Sovereign Typography */}
          <div className="flex items-center gap-3.5">
            <img
              src="/samagrisetu-logo.png"
              alt="SamagriSetu Official Emblem"
              className="w-11 h-11 object-contain shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            />
            <div className="h-9 w-px bg-slate-300/80 hidden sm:block" />
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-extrabold text-[#0B192C] tracking-tight font-sans leading-none">
                  SamagriSetu
                </h1>
                <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
                  | सामग्री सेतु
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium tracking-normal mt-1">
                One Nation, One Common Material Code.
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) - Executive Floating Island */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 border border-slate-200/90 rounded-full p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-xs">
            <a
              href="#overview"
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150"
            >
              Overview
            </a>
            <a
              href="#topology-3d"
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150"
            >
              Harmonization Flow
            </a>
            <a
              href="#problem-solution"
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150"
            >
              National Mandate
            </a>
            <a
              href="#participating-cpses"
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150"
            >
              CPSE Catalogs
            </a>
            <a
              href="#architecture"
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150"
            >
              Pipeline
            </a>
          </nav>

          {/* Dual Officer Entry Buttons - 3D Tactile Executive Design */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* 1. CPSE Officer Button (Clean 3D Pearl / Tactile Elevation) */}
            <button
              onClick={() =>
                onEnterApp('cpse-import', {
                  name: 'ONGC Materials Head',
                  org: 'ONGC Materials Division',
                  role: 'CPSE Enterprise Nodal Officer',
                })
              }
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-800 bg-gradient-to-b from-white via-slate-50 to-slate-100/90 border border-slate-300/80 border-b-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-slate-100 hover:shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-150 cursor-pointer"
              title="Enter as CPSE Enterprise Officer (ONGC / IOCL / BHEL / SAIL)"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-b from-emerald-50 to-emerald-100/90 text-emerald-700 border border-emerald-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                <Factory className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <span className="tracking-tight text-slate-800">
                <span className="hidden sm:inline">1. CPSE Officer</span>
                <span className="sm:hidden">CPSE</span>
              </span>
            </button>

            {/* 2. Central Reviewer Button (Deep 3D Obsidian / Gold Lighting) */}
            <button
              onClick={() =>
                onEnterApp('dashboard', {
                  name: 'Er. R. Sundaram, FIE',
                  org: 'Central Evaluation Authority',
                  role: 'Chief Material Master Reviewer',
                })
              }
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-b from-[#1E3E62] via-[#0B192C] to-[#050D18] border border-slate-700/90 border-t-slate-500/50 border-b-black shadow-[0_3px_8px_rgba(11,25,44,0.35),0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-[#244b77] hover:to-[#071322] hover:shadow-[0_5px_14px_rgba(11,25,44,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-150 cursor-pointer"
              title="Enter as Chief Material Master Reviewer"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-b from-amber-400/20 to-amber-500/10 text-amber-300 border border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <span className="tracking-tight text-white">2. Central Reviewer</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER SECTION (CONTAINED ROUNDED BANNER MATCHING OFFICIAL CPSE PORTALS) */}
      <section id="overview" className="w-full px-4 sm:px-8 lg:px-12 pt-4 pb-4">
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/70 shadow-2xl min-h-[500px] sm:min-h-[540px] lg:min-h-[560px] flex flex-col justify-between bg-[#071322] text-white">
          {/* Smooth Photographic Carousel Layers with Crossfade */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover transition-opacity duration-1000 ease-in-out ${
                activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                backgroundPosition: slide.imagePosition || 'center center'
              }}
            />
          ))}

          {/* Smooth Natural Directional Scrim: Dark on the left for crisp text, fading completely to transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Hero Content (Directly Overlaid, Natural Negative Space, Zero Blocking Box) */}
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16 flex-1 flex flex-col justify-center">
            <div className="max-w-xl space-y-4">
              {/* Clean Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-slate-900/80 border border-slate-700 rounded-xs text-amber-300 font-mono text-[11px] font-medium tracking-normal">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{slides[activeSlide].badge}</span>
              </div>

              {/* Moderate Institutional Headline */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-snug tracking-normal drop-shadow-sm font-sans">
                {slides[activeSlide].title}
              </h2>

              {/* Quality Subtitle */}
              <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-lg">
                {slides[activeSlide].subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onEnterApp(slides[activeSlide].primaryTarget)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-mono font-medium rounded-xs border border-slate-700 shadow-xs transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{slides[activeSlide].primaryBtn}</span>
                </button>

                <button
                  onClick={() => onEnterApp(slides[activeSlide].secondaryTarget)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xs text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-slate-300" />
                  <span>{slides[activeSlide].secondaryBtn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Slider Controls Bar (Clean Bottom Strip with Dots) */}
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-3.5 border-t border-white/10 bg-black/50 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Active Image Location Tag */}
            <div className="flex items-center gap-2 text-[11px] text-slate-200 font-mono bg-black/40 px-3 py-1 rounded-xs border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="truncate">{slides[activeSlide].imageCaption}</span>
            </div>

            {/* Clean Arrow Navigation Controls */}
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="p-1.5 rounded bg-white/10 border border-white/20 hover:bg-white/25 text-white transition-colors"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                className="p-1.5 rounded bg-white/10 border border-white/20 hover:bg-white/25 text-white transition-colors"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* 4B. SAMAGRISETU MATERIAL HARMONIZATION FLOW (INTERACTIVE 3D VISUAL STORY) */}
      <section id="topology-3d" className="py-10 px-4 sm:px-8 lg:px-12 w-full bg-gradient-to-b from-[#E0EFFB] via-[#EDF5FD] to-[#E2EEF9] border-y border-sky-300/80 shadow-inner">
        <SamagriSetu3DTopology />
      </section>

      {/* 5. THE NATIONAL PUBLIC SECTOR MANDATE & INSTITUTIONAL SOLUTION */}
      <section id="problem-solution" className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 w-full space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-block px-3 py-0.5 bg-sky-50 text-sky-900 text-xs font-mono font-bold rounded-md border border-sky-200 shadow-2xs">
            PUBLIC SECTOR ENTERPRISE STANDARDIZATION FRAMEWORK
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Resolving Legacy CPSE Material Master Fragmentation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Independent enterprise catalogs create duplicate equipment under divergent codes, hindering consolidated procurement and inter-plant inventory pooling across public sector units.
          </p>
        </div>

        {/* High-Contrast Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
          {/* Column A: The Problem */}
          <div className="p-6 bg-rose-50/60 border border-rose-200 rounded-xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Legacy CPSE ERP Silos</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded border border-rose-300">
                FRAGMENTED
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-white border border-rose-200 rounded-lg space-y-1.5 font-mono text-[11px]">
                <span className="text-rose-800 font-bold block uppercase text-[10px]">Same 2" Class 150 Globe Valve in 4 ERPs:</span>
                <div className="text-slate-700 truncate">• ONGC: <span className="text-slate-900 font-semibold">GLOBE VALVE 2 IN CARBON STEEL CL.150 SW</span></div>
                <div className="text-slate-700 truncate">• IOCL: <span className="text-slate-900 font-semibold">GLOBE VALVE 2 IN CL.150 CARBON STEEL SW</span></div>
                <div className="text-slate-700 truncate">• BHEL: <span className="text-slate-900 font-semibold">GLB VLV 2" A216 WCB 150# SW</span></div>
                <div className="text-slate-700 truncate">• SAIL: <span className="text-slate-900 font-semibold">GLOBE VALVE DN50 CS CL150 SW</span></div>
              </div>

              <div className="space-y-2 pt-1 text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong>Duplicate Contracts:</strong> Divergent tender pricing and redundant GeM bidding for identical spares.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong>Excess Buffer Inventory:</strong> Warehouses hold identical idle stock within close regional proximity.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong>Safety Hazards:</strong> Unregulated catalog abbreviations risk catastrophic high-pressure rating mismatches.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: The Solution */}
          <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SamagriSetu Harmonized Master</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                STANDARDIZED
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-white border border-emerald-300 rounded-lg space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-900 font-bold text-[10px] uppercase">Unified Canonical Identifier:</span>
                  <span className="font-bold text-[#0B192C] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">CNMC-000001</span>
                </div>
                <div className="text-slate-800 text-[10.5px] font-semibold">
                  GLOBE VALVE, 2 INCH (DN 50), CARBON STEEL (ASTM A216 WCB), ASME CLASS 150, SOCKET WELD (SW), ASME B16.34
                </div>
                <div className="text-[10px] text-slate-500 font-sans pt-1 border-t border-slate-100">
                  Non-destructive federation preserving native ONGC, IOCL, BHEL, SAIL plant codes.
                </div>
              </div>

              <div className="space-y-2 pt-1 text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Aggregated Procurement:</strong> Consolidated national tenders on GeM unlocking significant volume discounts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Turnaround Spare Sharing:</strong> Emergency spare-part loan pooling between plants during shutdowns.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Safety Hard-Locks:</strong> Deterministic interception prevents Class 150 vs Class 300 cross-pressure merges.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTICIPATING CPSE MASTER DATA CATALOGS (MAHARATNA ENTERPRISES) */}
      <section id="participating-cpses" className="py-12 bg-white border-y border-slate-300 px-4 sm:px-8 lg:px-12 w-full">
        <div className="w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                SOURCE ENTERPRISE CATALOGS • MAHARATNA STATUS
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                4 Participating Central Public Sector Enterprises
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                400 verified demonstration records ingested from active enterprise master databases.
              </p>
            </div>
            <button
              onClick={() => onEnterApp('cpse-data')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-mono font-bold rounded-xs shadow-xs self-start md:self-auto"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Browse All 400 Records in Master Explorer →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans text-xs">
            {/* ONGC Card */}
            <div className="p-5 border-t-4 border-t-amber-600 border border-slate-300 rounded-xl bg-white hover:border-amber-400 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900 block tracking-tight">ONGC</span>
                    <span className="text-[10px] text-amber-800 font-semibold uppercase">Maharatna CPSE</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 text-[11px] font-mono font-bold rounded-full border border-amber-300">
                    100 Records
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Oil and Natural Gas Corporation. Upstream exploration, offshore platforms & drilling equipment.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">ERP Engine:</span>
                    <span className="font-mono font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">SAP S/4HANA (MARA/MAKT)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Sample Series:</span>
                    <span className="font-mono font-semibold text-amber-900 bg-amber-50/80 px-1.5 py-0.5 rounded border border-amber-200">ONGC-0001 to 0100</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Primary Class:</span>
                    <span className="text-slate-800 font-medium truncate ml-1">High-Pressure Valves & Casing</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEnterApp('cpse-data')}
                className="w-full py-2 text-center bg-slate-100 hover:bg-[#0B192C] text-slate-800 hover:text-white font-semibold rounded-md text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Inspect ONGC Master</span>
                <span>→</span>
              </button>
            </div>

            {/* IOCL Card */}
            <div className="p-5 border-t-4 border-t-orange-600 border border-slate-300 rounded-xl bg-white hover:border-orange-400 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900 block tracking-tight">IOCL</span>
                    <span className="text-[10px] text-orange-800 font-semibold uppercase">Maharatna CPSE</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-orange-50 text-orange-900 text-[11px] font-mono font-bold rounded-full border border-orange-300">
                    100 Records
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Indian Oil Corporation. Refining units, petrochemical crackers & cross-country pipelines.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">ERP Engine:</span>
                    <span className="font-mono font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">SAP ECC 6.0 (MARA/MAKT)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Sample Series:</span>
                    <span className="font-mono font-semibold text-orange-900 bg-orange-50/80 px-1.5 py-0.5 rounded border border-orange-200">IOCL-0001 to 0100</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Primary Class:</span>
                    <span className="text-slate-800 font-medium truncate ml-1">Spiral Gaskets, Flanges, Valves</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEnterApp('cpse-data')}
                className="w-full py-2 text-center bg-slate-100 hover:bg-[#0B192C] text-slate-800 hover:text-white font-semibold rounded-md text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Inspect IOCL Master</span>
                <span>→</span>
              </button>
            </div>

            {/* BHEL Card */}
            <div className="p-5 border-t-4 border-t-blue-600 border border-slate-300 rounded-xl bg-white hover:border-blue-400 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900 block tracking-tight">BHEL</span>
                    <span className="text-[10px] text-blue-800 font-semibold uppercase">Maharatna CPSE</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-900 text-[11px] font-mono font-bold rounded-full border border-blue-300">
                    100 Records
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Bharat Heavy Electricals. Supercritical power plants, industrial turbines & heavy boilers.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">ERP Engine:</span>
                    <span className="font-mono font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">Oracle EBS (MTL_ITEMS)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Sample Series:</span>
                    <span className="font-mono font-semibold text-blue-900 bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-200">BHEL-0001 to 0100</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Primary Class:</span>
                    <span className="text-slate-800 font-medium truncate ml-1">Bearings, Transmitters, Valves</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEnterApp('cpse-data')}
                className="w-full py-2 text-center bg-slate-100 hover:bg-[#0B192C] text-slate-800 hover:text-white font-semibold rounded-md text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Inspect BHEL Master</span>
                <span>→</span>
              </button>
            </div>

            {/* SAIL Card */}
            <div className="p-5 border-t-4 border-t-emerald-600 border border-slate-300 rounded-xl bg-white hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900 block tracking-tight">SAIL</span>
                    <span className="text-[10px] text-emerald-800 font-semibold uppercase">Maharatna CPSE</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-900 text-[11px] font-mono font-bold rounded-full border border-emerald-300">
                    100 Records
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Steel Authority of India. Integrated blast furnaces, hot rolling mills & specialized alloys.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">ERP Engine:</span>
                    <span className="font-mono font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">Integrated Enterprise ERP</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Sample Series:</span>
                    <span className="font-mono font-semibold text-emerald-900 bg-emerald-50/80 px-1.5 py-0.5 rounded border border-emerald-200">SAIL-0001 to 0100</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Primary Class:</span>
                    <span className="text-slate-800 font-medium truncate ml-1">Structural Steel, Seamless Pipes</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEnterApp('cpse-data')}
                className="w-full py-2 text-center bg-slate-100 hover:bg-[#0B192C] text-slate-800 hover:text-white font-semibold rounded-md text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Inspect SAIL Master</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 4-PILLAR NATIONAL STANDARDIZATION ARCHITECTURE (UNCLUTTERED, PROFESSIONAL) */}
      <section id="architecture" className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 w-full space-y-8 bg-[#F8FAFC]">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-block px-2.5 py-0.5 bg-sky-100 text-sky-900 text-xs font-mono font-bold rounded border border-sky-300">
            NATIONAL STANDARDIZATION PIPELINE • ARCHITECTURE
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Four Core Pillars of the SamagriSetu Harmonization Pipeline
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            From heterogeneous CPSE ERP master ingestion to canonical Common National Material Code governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs font-sans">
          {[
            {
              step: '01',
              title: 'Multi-CPSE Ingestion',
              subtitle: 'ERP Connectors & Lineage',
              desc: 'Ingests heterogeneous records across SAP S/4HANA, SAP ECC 6.0, Oracle EBS, and plant legacy databases without altering local master schemas.',
              badge: 'Non-Destructive Ingestion',
            },
            {
              step: '02',
              title: 'AI Attribute Parsing',
              subtitle: 'Parameter Extraction & UOM',
              desc: 'Decomposes unstructured catalog strings into standardized mechanical parameters: Type, Nominal Size, Material Grade / Metallurgy, Pressure Class, and Standards.',
              badge: 'ASME Parameter Parsing',
            },
            {
              step: '03',
              title: 'Safety Hard-Locks',
              subtitle: 'Conflict Interception & Audit',
              desc: 'Automated engineering safety hard-locks intercept pressure and metallurgical rating mismatches (e.g. Class 150 vs Class 300) before designated CPSE review officer sign-off.',
              badge: 'Zero False-Positive Merges',
            },
            {
              step: '04',
              title: 'Canonical CNMC Master',
              subtitle: 'Two-Way GeM Federation',
              desc: 'Issues verified Common National Material Code (CNMC-000001) with 1-to-many traceability with reverse lookup to source CPSE plant codes.',
              badge: 'GeM Federation Ready',
            },
          ].map((pillar) => (
            <div
              key={pillar.step}
              className="p-5 bg-white border border-slate-300 rounded-xl shadow-xs hover:border-sky-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#0B192C] text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                    {pillar.step}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{pillar.title}</h4>
                  <span className="text-[11px] text-slate-500 block font-medium">{pillar.subtitle}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-sky-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Governance Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Statutory & Engineering Directives Strip */}
        <div className="pt-4 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1 shadow-2xs hover:border-sky-300 transition-colors">
              <span className="text-[#0B192C] font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                MoP&NG Directives
              </span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Ministry guidelines on collaborative CPSE procurement and shared spare inventory pools.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1 shadow-2xs hover:border-sky-300 transition-colors">
              <span className="text-[#0B192C] font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                GeM Categorization
              </span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Mapped to Government e-Marketplace standardized item master categories for bulk tenders.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1 shadow-2xs hover:border-sky-300 transition-colors">
              <span className="text-[#0B192C] font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                Engineering Standards
              </span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Strict parameter indexing per API 6D, ASME B16.34, ASTM A106, and IS 1239 / IS 3589.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1 shadow-2xs hover:border-sky-300 transition-colors">
              <span className="text-[#0B192C] font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                Non-Destructive ERP
              </span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Preserves legacy enterprise material codes non-destructively; zero plant maintenance disruption.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 9. INSTITUTIONAL SMART INDIA HACKATHON FOOTER */}
      <footer className="bg-[#071322] border-t border-slate-800 text-slate-400 font-sans text-xs w-full">
        {/* Subtle Tricolor Brand Accent Line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-70" />

        <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Project Identity & Mandate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs shrink-0">
                  <img src="/samagrisetu-logo.png" alt="SamagriSetu" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-bold text-white tracking-tight">SamagriSetu</span>
              </div>
              <p className="text-xs font-semibold text-amber-400">
                One Nation • One Common Material Code
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                An AI-driven material code standardization and cross-enterprise deduplication platform designed for Indian Central Public Sector Enterprises (CPSEs).
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Material Harmonization Project • Ministry of Petroleum & Natural Gas / CPCL Track
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Platform Navigation
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <a href="#overview" className="hover:text-white transition-colors">Overview</a>
                </li>
                <li>
                  <a href="#topology-3d" className="hover:text-white transition-colors">Harmonization Architecture</a>
                </li>
                <li>
                  <a href="#problem-solution" className="hover:text-white transition-colors">Problem Statement & Scope</a>
                </li>
                <li>
                  <a href="#participating-cpses" className="hover:text-white transition-colors">Participating CPSE Catalogs</a>
                </li>
                <li>
                  <button onClick={() => onEnterApp('cpse-import')} className="hover:text-white transition-colors text-left cursor-pointer">
                    CPSE Officer Workstation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Demonstration & Context */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Harmonization Prototype
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developed as a working software prototype demonstrating automated attribute extraction, ASTM/ASME spec conflict prevention, and Common National Material Code (CNMC) registration.
              </p>
              <div className="pt-1 text-[11px] text-slate-400">
                <span className="text-amber-400 font-medium">Notice:</span> Curated catalog records are used strictly for benchmarking and demonstration purposes.
              </div>
            </div>
          </div>

          {/* Bottom Clean Attribution Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              © 2026 SamagriSetu • Team BodhZ
            </div>
            <div className="text-slate-400 font-mono text-[10px]">
              AI-Driven National Material Harmonization Platform • Demonstration Prototype
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
