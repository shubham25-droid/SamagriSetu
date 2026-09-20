/**
 * Hook for orchestrating the simplified 3-stage SamagriSetu Harmonization Flow.
 * 3 intuitive, non-confusing stages:
 * 1. Fragmented CPSE Masters (Inputs)
 * 2. Core Harmonization & Safety (Match, Harmonize, Standardize)
 * 3. Common National Code (CNMC Master + Traceability)
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface StageDefinition {
  id: number;
  stageNumber: string;
  stageName: string;
  stageTitle: string;
  shortExplanation: string;
  category: string;
}

export const HARMONIZATION_STAGES: StageDefinition[] = [
  {
    id: 1,
    stageNumber: '01',
    stageName: 'Fragmented Masters',
    stageTitle: 'Multiple CPSE Material Masters',
    shortExplanation: 'Four independent CPSE ERPs catalog the identical 2" Class 150 ball valve under conflicting descriptions, item codes, and units.',
    category: 'INPUT STREAMS',
  },
  {
    id: 2,
    stageNumber: '02',
    stageName: 'Harmonization & Safety',
    stageTitle: 'Core Harmonization & Safety Interception',
    shortExplanation: 'The engine normalizes abbreviations (V/V → Valve, 50MM → 2 Inch), extracts parameters, and intercepts safety conflicts before human sign-off.',
    category: 'INTELLIGENCE ENGINE',
  },
  {
    id: 3,
    stageNumber: '03',
    stageName: 'Common National Code',
    stageTitle: 'Unified CNMC Master & Traceability',
    shortExplanation: 'Generates Common National Material Code (CNMC-000184) with permanent 1-to-many bi-directional traceability back to original CPSE codes.',
    category: 'GOLDEN MASTER',
  },
];

export function useHarmonizationAnimation(autoAdvanceIntervalMs = 7000) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Subscribe to prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Intersection Observer to pause rendering/animation when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Timer loop
  useEffect(() => {
    if (!isPlaying || !isIntersecting || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= HARMONIZATION_STAGES.length ? 1 : prev + 1));
    }, autoAdvanceIntervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, isIntersecting, prefersReducedMotion, autoAdvanceIntervalMs]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= HARMONIZATION_STAGES.length) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev >= HARMONIZATION_STAGES.length ? 1 : prev + 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev <= 1 ? HARMONIZATION_STAGES.length : prev - 1));
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const currentStage = HARMONIZATION_STAGES[currentStep - 1];

  return {
    currentStep,
    currentStage,
    stages: HARMONIZATION_STAGES,
    isPlaying,
    prefersReducedMotion,
    containerRef,
    goToStep,
    nextStep,
    prevStep,
    togglePlay,
  };
}
