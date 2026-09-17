/**
 * SAP & Enterprise ERP Integration Page
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

import React from 'react';
import { Cpu } from 'lucide-react';
import { SAPConnectorArchitectureView } from '../components/integration/SAPConnectorArchitectureView';

export const IntegrationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xs border border-slate-300 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#0B192C] text-white">
              <Cpu className="w-4 h-4" />
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Enterprise SAP & ERP Integration Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            System architecture designed to synchronize material masters with SAP ECC 6.0 and SAP S/4HANA via secure enterprise APIs and RFC/BAPI connectors.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-900 font-mono text-xs font-bold border border-sky-300 self-start md:self-auto">
          Planned / Integration Ready
        </span>
      </div>

      <SAPConnectorArchitectureView />
    </div>
  );
};
