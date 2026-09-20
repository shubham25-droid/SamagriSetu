/**
 * Prototype Session Inactivity Modal
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * Demonstrates enterprise session management best practices
 */

import React from 'react';
import { Clock, RefreshCw, LogOut, ShieldAlert } from 'lucide-react';

interface SessionTimeoutModalProps {
  isOpen: boolean;
  secondsRemaining: number;
  onExtendSession: () => void;
  onLogout: () => void;
}

export const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  isOpen,
  secondsRemaining,
  onExtendSession,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-300 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                Enterprise Session Security
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Session Inactivity Warning
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center py-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-center">
              <div className="text-[11px] font-mono text-slate-500 font-semibold uppercase">
                Auto-lock timeout in
              </div>
              <div className="text-3xl font-extrabold text-amber-600 font-mono tracking-wider mt-1">
                00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Click below to stay logged in
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed text-center">
            As a demonstration of enterprise access control, the prototype monitors user inactivity to prevent unattended terminal sessions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={onExtendSession}
              className="flex-1 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Extend Session
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium text-xs flex items-center justify-center gap-2 border border-slate-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
