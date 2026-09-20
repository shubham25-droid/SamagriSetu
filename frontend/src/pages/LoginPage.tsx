/**
 * Enterprise Login Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React, { useState } from 'react';
import { ShieldCheck, Building2, Award } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { name: string; org: string; role: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loginRole, setLoginRole] = useState<'CPSE_OFFICER' | 'CENTRAL_REVIEWER'>('CENTRAL_REVIEWER');
  const [selectedOrg, setSelectedOrg] = useState('Inter-Ministerial CPSE Council (DPE)');
  const [email, setEmail] = useState('chief.reviewer@dpe.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleSelectRole = (role: 'CPSE_OFFICER' | 'CENTRAL_REVIEWER') => {
    setLoginRole(role);
    if (role === 'CPSE_OFFICER') {
      setSelectedOrg('ONGC (Ministry of Petroleum & Natural Gas)');
      setEmail('materials.manager@ongc.co.in');
    } else {
      setSelectedOrg('Inter-Ministerial CPSE Council (DPE)');
      setEmail('chief.reviewer@dpe.gov.in');
    }
  };

  const handleEnterDemo = () => {
    if (loginRole === 'CENTRAL_REVIEWER') {
      onLogin({
        name: 'Er. R. Sundaram, FIE',
        org: 'Inter-Ministerial Council / DPE',
        role: 'Chief Material Master Reviewer',
      });
    } else {
      const cpseName = selectedOrg.split(' ')[0];
      onLogin({
        name: `${cpseName} Materials Head`,
        org: selectedOrg,
        role: 'CPSE Enterprise Nodal Officer',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEnterDemo();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800 relative overflow-hidden font-sans">
      {/* Tricolor Ribbon at Top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Top Bar */}
      <header className="px-6 py-3.5 border-b border-slate-300 flex items-center justify-between relative z-10 bg-white shadow-2xs">
        <div className="flex items-center gap-3.5">
          <img
            src="/samagrisetu-logo.png"
            alt="SamagriSetu Official Emblem"
            className="w-11 h-11 object-contain shrink-0"
          />
          <div className="h-8 w-px bg-slate-300 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#0B192C]">
                SamagriSetu
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-semibold text-amber-700">
                One Nation, One Common Material Code.
              </span>
            </div>
            <span className="text-[11px] text-slate-600 block font-sans">
              Government of India • Department of Public Enterprises (DPE) • Inter-Ministerial CPSE Council
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          SECURE OFFICER GATEWAY (SSO)
        </span>
      </header>

      {/* Center Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white border border-slate-300 rounded-xl p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <img
                src="/samagrisetu-logo.png"
                alt="SamagriSetu Official Emblem"
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-[#0B192C] tracking-tight font-sans">
              SamagriSetu Officer Portal
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              National CPSE Material Master Standardization, Safety Interception & Central GeM Federation Gateway.
            </p>
          </div>

          {/* Dual Officer Login Roles */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSelectRole('CENTRAL_REVIEWER')}
              className={`py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                loginRole === 'CENTRAL_REVIEWER'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Central Reviewer</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectRole('CPSE_OFFICER')}
              className={`py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                loginRole === 'CPSE_OFFICER'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. CPSE Officer</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                Participating CPSE / Ministry
              </label>
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600 font-mono"
              >
                <option value="Inter-Ministerial CPSE Council (DPE)">
                  Inter-Ministerial CPSE Council (DPE / MoP&NG / MHI / MoS)
                </option>
                <option value="ONGC (Ministry of Petroleum & Natural Gas)">
                  Oil and Natural Gas Corporation (ONGC - MoP&NG)
                </option>
                <option value="IOCL (Ministry of Petroleum & Natural Gas)">
                  Indian Oil Corporation Limited (IOCL - MoP&NG)
                </option>
                <option value="BHEL (Ministry of Heavy Industries)">
                  Bharat Heavy Electricals Limited (BHEL - MHI)
                </option>
                <option value="SAIL (Ministry of Steel)">
                  Steel Authority of India Limited (SAIL - MoS)
                </option>
                <option value="CPCL (Host Refinery Node)">
                  Chennai Petroleum Corporation Limited (CPCL - Host Plant Node)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                Official Officer ID / Gov Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-sky-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                Digital Signature / Security Token
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-sky-600"
              />
            </div>

            <button
              type="button"
              onClick={handleEnterDemo}
              className="w-full py-2.5 px-4 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-sans font-semibold rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authenticate & Launch Enterprise Workstation</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-500">
            Authorized Personnel Only • Standard GeM / NIC SSO Encryption (AES-256)
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-slate-300 text-center text-[11px] text-slate-600 bg-white font-sans">
        © 2026 SamagriSetu. Ministry of Petroleum & Natural Gas, Government of India.
      </footer>
    </div>
  );
};
