/**
 * Main Application Shell Layout
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Compliant with MeitY Cyber Security Guidelines, GIGW 3.0 & IT Act 2000
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { GovSecurityBanner } from './GovSecurityBanner';
import { GovFooter } from './GovFooter';
import { GovSecurityModal } from '../security/GovSecurityModal';
import { SessionTimeoutModal } from '../security/SessionTimeoutModal';
import { GuidedDemoTour } from '../shared/GuidedDemoTour';

interface AppLayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
  onQuickLoadDemo?: () => void;
  onLogout?: () => void;
  pendingReviewCount?: number;
  currentUser?: { name: string; org: string; role: string };
  onSwitchRole?: (role: { name: string; org: string; role: string }) => void;
  completedSteps?: string[];
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentPage,
  onNavigate,
  onSearch,
  onQuickLoadDemo,
  onLogout,
  pendingReviewCount = 4,
  currentUser,
  onSwitchRole,
  completedSteps,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);

  // MeitY-Mandated 15-Minute (900s) Sliding Inactivity Window
  const [sessionSeconds, setSessionSeconds] = useState(895);

  const resetSessionTimer = useCallback(() => {
    // Only reset automatically if not currently showing the urgent 60s warning modal
    if (!timeoutModalOpen) {
      setSessionSeconds(900);
    }
  }, [timeoutModalOpen]);

  // Track user activity to reset session sliding window
  useEffect(() => {
    const handleActivity = () => {
      resetSessionTimer();
    };

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [resetSessionTimer]);

  // 1-second countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onLogout) onLogout();
          return 0;
        }
        if (prev <= 60 && !timeoutModalOpen) {
          setTimeoutModalOpen(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeoutModalOpen, onLogout]);

  const handleExtendSession = () => {
    setSessionSeconds(900);
    setTimeoutModalOpen(false);
  };

  const handleTriggerInactivityTest = () => {
    setSessionSeconds(45);
    setTimeoutModalOpen(true);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans relative selection:bg-sky-200 selection:text-sky-900">
      {/* Official Government Security & Federation Clearance Banner */}
      <GovSecurityBanner
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
        onQuickLoadDemo={onQuickLoadDemo}
      />

      {/* Main Government Portal Header */}
      <AppHeader
        onNavigate={handleNavigate}
        onSearch={onSearch}
        onLogout={onLogout}
        currentUser={currentUser?.name || 'Er. R. Sundaram, FIE'}
        currentRole={currentUser?.role || 'Chief Materials Manager'}
        currentOrg={currentUser?.org || 'Inter-Ministerial Council / DPE'}
        onSwitchRole={onSwitchRole}
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
        sessionSecondsRemaining={sessionSeconds}
        onExtendSession={handleExtendSession}
      />

      {/* Mobile Navigation Toggle Bar */}
      <div className="md:hidden bg-[#071322] border-b border-slate-700 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 px-2.5 py-1 bg-slate-800 border border-slate-600 rounded-xs text-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          <span className="space-y-1">
            <span className="block w-4 h-0.5 bg-sky-400" />
            <span className="block w-4 h-0.5 bg-sky-400" />
            <span className="block w-4 h-0.5 bg-sky-400" />
          </span>
          <span className="font-bold text-[11px]">MENU</span>
        </button>
        <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
          Current: <span className="text-sky-300 font-bold uppercase">{currentPage}</span>
        </span>
      </div>

      {/* Body Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <AppSidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            pendingReviewCount={pendingReviewCount}
            currentUser={currentUser}
            completedSteps={completedSteps}
          />
        </div>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />
            {/* Drawer */}
            <div className="relative w-64 max-w-[80vw] bg-[#0B192C] z-10 flex flex-col shadow-2xl">
              <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between text-xs font-sans text-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/samagrisetu-logo.png"
                    alt="SamagriSetu"
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#0B192C] tracking-tight block font-sans">
                      SamagriSetu
                    </span>
                    <span className="text-[9px] text-amber-700 font-semibold tracking-normal block">
                      One Nation, One Code
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900 text-xs font-mono"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AppSidebar
                  currentPage={currentPage}
                  onNavigate={handleNavigate}
                  pendingReviewCount={pendingReviewCount}
                  currentUser={currentUser}
                  completedSteps={completedSteps}
                />
              </div>
            </div>
          </div>
        )}

        {/* Content Area with Official Government Footer */}
        <main className="flex-1 overflow-y-auto bg-slate-50 min-h-[calc(100vh-6.5rem)] flex flex-col">
          <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 flex-1 w-full">
            {children}
          </div>

          {/* Official Government Footer */}
          <GovFooter onOpenSecurityModal={() => setSecurityModalOpen(true)} />
        </main>
      </div>

      {/* Prototype Build Tag */}
      <div className="fixed bottom-2 right-2 z-20 pointer-events-none opacity-40 select-none font-mono text-[9px] text-slate-500 hidden xl:block">
        SIH26099 PROTOTYPE // SAMAGRISETU v2.4
      </div>

      {/* Government Cyber Security & CERT-In Compliance Dossier Modal */}
      <GovSecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        onTriggerInactivityTest={handleTriggerInactivityTest}
        currentUser={currentUser}
      />

      {/* Mandatory Inactivity Lock Warning Modal */}
      <SessionTimeoutModal
        isOpen={timeoutModalOpen}
        secondsRemaining={sessionSeconds}
        onExtendSession={handleExtendSession}
        onLogout={onLogout || (() => {})}
      />

      {/* Interactive Guided Evaluation & Pitch Assistant */}
      <GuidedDemoTour
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchRole={onSwitchRole}
      />
    </div>
  );
};
