/**
 * Government / Enterprise Application Header
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Ministry of Petroleum & Natural Gas
 */

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Shield,
  ShieldCheck,
  Lock,
  ChevronDown,
  LogOut,
} from 'lucide-react';

interface AppHeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  currentUser?: string;
  currentRole?: string;
  currentOrg?: string;
  onSwitchRole?: (role: { name: string; org: string; role: string }) => void;
  onOpenSecurityModal?: () => void;
  sessionSecondsRemaining?: number;
  onExtendSession?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSearch,
  onNavigate,
  onLogout,
  currentUser = 'Er. R. Sundaram, FIE',
  currentRole = 'Chief Materials Manager',
  currentOrg = 'Inter-Ministerial Council / DPE',
  onSwitchRole,
  onOpenSecurityModal,
  sessionSecondsRemaining = 890,
  onExtendSession,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
    if (onNavigate) onNavigate('material-search');
  };

  const notifications = [
    {
      id: 1,
      title: 'Technical Conflict Held for Review',
      desc: 'Pressure Transmitter 4-20mA: 0-25 Bar vs 0-100 Bar range variance between ONGC & IOCL.',
      time: '12m ago',
    },
    {
      id: 2,
      title: 'Quad-CPSE Convergence Ready',
      desc: 'Ball Valve 2" SS316 150# Screwed verified across ONGC, IOCL, BHEL, and SAIL.',
      time: '45m ago',
    },
    {
      id: 3,
      title: 'Source Datasets Loaded',
      desc: 'ONGC, IOCL, BHEL, and SAIL (400 total master records) verified and loaded.',
      time: '2h ago',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-300 text-slate-800 sticky top-0 z-40 shadow-2xs">
      {/* Tricolor Ribbon at Top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Official Institutional Branding */}
        <div className="flex items-center gap-3.5 shrink-0">
          <img
            src="/samagrisetu-logo.png"
            alt="SamagriSetu Official Emblem"
            className="w-11 h-11 object-contain shrink-0"
          />
          <div className="h-8 w-px bg-slate-300 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#0B192C] font-sans">
                SamagriSetu
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-amber-700 hidden sm:inline">
                One Nation, One Common Material Code.
              </span>
            </div>
            <div className="text-[11px] text-slate-600 font-sans tracking-normal flex items-center gap-1.5 mt-0.5">
              <span className="font-semibold text-emerald-800">ONGC • IOCL • BHEL • SAIL</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">Department of Public Enterprises (DPE)</span>
            </div>
          </div>
        </div>

        {/* Middle: Material Master Search Input */}
        <div className="flex-1 max-w-lg mx-3 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search Material Master (e.g., ONGC-0001, Ball Valve, ASTM A106, 2 IN)..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:border-sky-600 font-mono shadow-2xs transition-colors"
            />
          </form>
        </div>

        {/* Right: Administrative Notification & User Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Prototype Session Security Timer */}
          <button
            onClick={onOpenSecurityModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded border border-slate-300 text-xs font-mono font-semibold transition-colors shadow-2xs cursor-pointer"
            title="Session Inactivity Timer. Click to open Security & Governance Overview."
          >
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            <span>
              {sessionSecondsRemaining !== undefined
                ? `${Math.floor(sessionSecondsRemaining / 60)}:${(sessionSecondsRemaining % 60).toString().padStart(2, '0')}`
                : '14:48'}
            </span>
            <span className="hidden lg:inline text-[10px] text-sky-800 font-bold bg-sky-100 px-1 py-0.2 rounded border border-sky-300">
              SEC
            </span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-300 text-xs font-mono font-semibold transition-colors shadow-2xs"
            title="Return to Public Portal & Landing Page"
          >
            Portal Home
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-300 transition-colors shadow-2xs"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded shadow-lg border border-slate-300 py-1 z-50">
                <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Administrative Alerts
                  </span>
                  <span className="text-[10px] bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded font-mono font-bold border border-sky-200">
                    3 Active
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-3 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        if (onNavigate) onNavigate('material-matching');
                      }}
                    >
                      <div className="text-xs font-bold text-slate-800">{n.title}</div>
                      <div className="text-[11px] text-slate-600 font-mono mt-0.5">{n.desc}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Role Badge */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-50 border border-slate-300 hover:bg-slate-100 text-left transition-colors shadow-2xs"
            >
              <div className="w-5 h-5 rounded bg-[#0B192C] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                RS
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">{currentUser}</div>
                <div className="text-[10px] text-slate-600 font-mono leading-tight flex items-center gap-1">
                  <span>{currentRole}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sky-700 font-bold flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-sky-600 inline" /> Verified
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded shadow-lg border border-slate-300 py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900">{currentUser}</div>
                  <div className="text-[11px] font-medium text-slate-600">{currentRole}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{currentOrg}</div>
                </div>

                {onSwitchRole && (
                  <div className="p-2 border-b border-slate-200 bg-slate-50/50">
                    <div className="text-[10px] uppercase font-bold text-slate-500 font-mono mb-1.5">
                      Switch Role Persona
                    </div>
                    {currentRole.includes('Chief') ? (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onSwitchRole({
                            name: 'Sh. A. K. Sharma, GM (Procurement)',
                            org: 'IOCL Panipat Refinery',
                            role: 'CPSE Enterprise Nodal Officer',
                          });
                          if (onNavigate) onNavigate('cpse-import');
                        }}
                        className="w-full text-left p-2 rounded bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-sky-900 text-[11px]">Switch to CPSE Officer</div>
                        <div className="text-[10px] text-slate-500 font-mono">IOCL • Plant CSV Ingestion</div>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onSwitchRole({
                            name: 'Er. R. Sundaram, FIE',
                            org: 'Inter-Ministerial Council / DPE',
                            role: 'Chief Material Master Reviewer',
                          });
                          if (onNavigate) onNavigate('review-center');
                        }}
                        className="w-full text-left p-2 rounded bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-sky-900 text-[11px]">Switch to Chief Reviewer</div>
                        <div className="text-[10px] text-slate-500 font-mono">DPE • Sovereign Governance</div>
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onNavigate) onNavigate('settings');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  Governance Role & Credentials
                </button>
                <div className="border-t border-slate-200 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-700 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  Exit Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
