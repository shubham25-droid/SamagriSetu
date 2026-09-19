/**
 * Root Application Router & State Orchestrator
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas - CPCL
 */

import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CPSEDataImportPage } from './pages/CPSEDataImportPage';
import { CPSEDataPage } from './pages/CPSEDataPage';
import { StandardizationPage } from './pages/StandardizationPage';
import { ImportHistoryPage } from './pages/ImportHistoryPage';
import { MaterialMatchingPage } from './pages/MaterialMatchingPage';
import { DuplicateDetectionPage } from './pages/DuplicateDetectionPage';
import { MaterialSearchPage } from './pages/MaterialSearchPage';
import { NationalMaterialMasterPage } from './pages/NationalMaterialMasterPage';
import { MaterialMappingPage } from './pages/MaterialMappingPage';
import { LegacyRationalizationPage } from './pages/LegacyRationalizationPage';
import { MaterialReviewPage } from './pages/MaterialReviewPage';
import { ReviewHistoryPage } from './pages/ReviewHistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { IntegrationPage } from './pages/IntegrationPage';
import { SettingsPage } from './pages/SettingsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { HelpPage } from './pages/HelpPage';
import { LandingPage } from './pages/LandingPage';
import { CPSEDataImportService } from './services/CPSEDataImportService';
import { MaterialMatchingService } from './services/MaterialMatchingService';
import { MaterialMatchCandidate } from './types/MaterialMatchTypes';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to true for easy evaluation, can logout
  const [currentUser, setCurrentUser] = useState<{ name: string; org: string; role: string }>({
    name: 'Er. R. Sundaram, FIE',
    org: 'Inter-Ministerial Council / DPE',
    role: 'Chief Material Master Reviewer',
  });
  const [activeCpse, setActiveCpse] = useState<'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL'>('ONGC');
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>(undefined);
  const [_selectedCandidateToInspect, setSelectedCandidateToInspect] = useState<MaterialMatchCandidate | null>(null);

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
  };

  const handleSelectCpse = (cpseId: 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL' | 'ALL') => {
    setActiveCpse(cpseId);

    const CPSE_PROFILES: Record<string, { name: string; org: string }> = {
      ONGC: { name: 'ONGC Materials Head', org: 'ONGC (Oil and Natural Gas Corporation)' },
      IOCL: { name: 'IOCL Materials Head', org: 'IOCL (Indian Oil Corporation Limited)' },
      BHEL: { name: 'BHEL Materials Head', org: 'BHEL (Bharat Heavy Electricals Limited)' },
      SAIL: { name: 'SAIL Materials Head', org: 'SAIL (Steel Authority of India Limited)' },
      ALL: { name: 'Quad-CPSE Sovereign Lead', org: 'Quad-CPSE Sovereign Federation' },
    };

    if (CPSE_PROFILES[cpseId]) {
      setCurrentUser((prev) => ({
        ...prev,
        name: prev.role === 'CPSE Enterprise Nodal Officer' ? CPSE_PROFILES[cpseId].name : prev.name,
        org: prev.role === 'CPSE Enterprise Nodal Officer' ? CPSE_PROFILES[cpseId].org : prev.org,
      }));
    }
  };

  const handleLogin = (user: { name: string; org: string; role: string }) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    const detected = user.org?.split(' ')[0] as 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL';
    if (['ONGC', 'IOCL', 'BHEL', 'SAIL'].includes(detected)) {
      setActiveCpse(detected);
    }
    if (user.role === 'CPSE Enterprise Nodal Officer') {
      setCurrentPage('cpse-import');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params?.scenarioId) {
      setActiveScenarioId(params.scenarioId);
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCurrentPage('material-matching');
  };

  const handleInspectCandidateFromReview = (candidate: MaterialMatchCandidate) => {
    setSelectedCandidateToInspect(candidate);
    setActiveScenarioId(candidate.scenarioId);
    setCurrentPage('material-matching');
  };

  const handleQuickLoadAllDemo = () => {
    CPSEDataImportService.loadAllDemoDatasets();
    MaterialMatchingService.runHarmonization();
    setActiveCpse('ALL');
    setCompletedSteps(['cpse-import', 'standardization', 'duplicate-detection', 'material-matching', 'national-master']);
    alert('All 4 Verified CPSE Datasets (ONGC, IOCL, BHEL, SAIL — 400 Total Records) loaded into the Harmonization Pipeline.');
    setCurrentPage('material-matching');
  };

  // If not logged in, render the login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If landing page selected, render full-bleed public government portal
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onEnterApp={(targetPage, user) => {
          if (user) {
            setCurrentUser(user);
            const detected = user.org?.split(' ')[0] as 'ONGC' | 'IOCL' | 'BHEL' | 'SAIL';
            if (['ONGC', 'IOCL', 'BHEL', 'SAIL'].includes(detected)) {
              setActiveCpse(detected);
            }
          }
          setCurrentPage(targetPage || 'dashboard');
        }}
      />
    );
  }

  // Count pending reviews
  const pendingCount = MaterialMatchingService.getCandidates().filter(
    (c) => c.reviewStatus === 'PENDING_REVIEW'
  ).length;

  const isCPSEOfficer = currentUser?.role === 'CPSE Enterprise Nodal Officer';

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onSearch={(q) => {
        setSearchQuery(q);
        setCurrentPage('material-search');
      }}
      onQuickLoadDemo={handleQuickLoadAllDemo}
      onLogout={handleLogout}
      pendingReviewCount={pendingCount}
      currentUser={currentUser}
      onSwitchRole={(role) => setCurrentUser(role)}
      completedSteps={completedSteps}
    >
      {currentPage === 'dashboard' && (
        <DashboardPage
          onNavigate={handleNavigate}
          onSelectScenario={handleSelectScenario}
          currentUser={currentUser}
        />
      )}

      {currentPage === 'cpse-data' && (
        <CPSEDataPage
          activeCpse={activeCpse}
          onNavigateToMatching={(scenarioId) => {
            if (scenarioId) setActiveScenarioId(scenarioId);
            setCurrentPage('material-matching');
          }}
        />
      )}

      {currentPage === 'cpse-import' && (
        <CPSEDataImportPage
          activeDataset={activeCpse}
          onSelectDataset={handleSelectCpse}
          isCompleted={completedSteps.includes('cpse-import')}
          onNavigateToNext={() => {
            markStepCompleted('cpse-import');
            setCurrentPage('standardization');
          }}
          onNavigateToMatching={() => setCurrentPage('material-matching')}
        />
      )}

      {currentPage === 'standardization' && (
        <StandardizationPage
          activeCpse={activeCpse}
          isCompleted={completedSteps.includes('standardization')}
          onNavigateToPrev={() => setCurrentPage('cpse-import')}
          onNavigateToNext={() => {
            markStepCompleted('standardization');
            setCurrentPage('duplicate-detection');
          }}
        />
      )}

      {currentPage === 'import-history' && (
        <ImportHistoryPage
          onNavigateToImport={() => setCurrentPage('cpse-import')}
        />
      )}

      {currentPage === 'duplicate-detection' && (
        <DuplicateDetectionPage
          activeCpse={activeCpse}
          isCompleted={completedSteps.includes('duplicate-detection')}
          onNavigateToPrev={() => setCurrentPage('standardization')}
          onNavigateToNext={() => {
            markStepCompleted('duplicate-detection');
            setCurrentPage('material-matching');
          }}
          onSelectCandidate={(c) => {
            markStepCompleted('duplicate-detection');
            setActiveScenarioId(c.scenarioId);
            setCurrentPage('material-matching');
          }}
        />
      )}

      {currentPage === 'material-matching' && (
        <MaterialMatchingPage
          activeCpse={activeCpse}
          initialScenarioId={activeScenarioId}
          isCompleted={completedSteps.includes('material-matching')}
          isChiefReviewer={!isCPSEOfficer}
          onNavigateToPrev={() => setCurrentPage(isCPSEOfficer ? 'duplicate-detection' : 'review-center')}
          onNavigateToMaster={() => {
            if (isCPSEOfficer) {
              markStepCompleted('material-matching');
              markStepCompleted('national-master');
            }
            setCurrentPage('national-master');
          }}
        />
      )}

      {currentPage === 'material-search' && (
        <MaterialSearchPage
          initialQuery={searchQuery}
          onSelectNationalCode={() => setCurrentPage('national-master')}
        />
      )}

      {currentPage === 'national-master' && (
        <NationalMaterialMasterPage
          isCompleted={completedSteps.includes('national-master')}
          isChiefReviewer={!isCPSEOfficer}
          onNavigateToPrev={() => setCurrentPage('material-matching')}
        />
      )}

      {currentPage === 'material-mapping' && (
        <MaterialMappingPage />
      )}

      {currentPage === 'legacy-rationalization' && (
        <LegacyRationalizationPage />
      )}

      {currentPage === 'review-center' && (
        <MaterialReviewPage
          onInspectCandidate={handleInspectCandidateFromReview}
        />
      )}

      {currentPage === 'review-history' && (
        <ReviewHistoryPage />
      )}

      {currentPage === 'analytics' && (
        <AnalyticsPage />
      )}

      {currentPage === 'audit-trail' && (
        <AuditTrailPage />
      )}

      {currentPage === 'integrations' && (
        <IntegrationPage />
      )}

      {currentPage === 'settings' && (
        <SettingsPage />
      )}

      {currentPage === 'data-sources' && (
        <DataSourcesPage />
      )}

      {currentPage === 'help' && (
        <HelpPage />
      )}
    </AppLayout>
  );
}

export default App;
