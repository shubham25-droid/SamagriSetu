/**
 * CPSE (Central Public Sector Enterprise) domain definitions
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 */

export interface CPSEProfile {
  id: string; // e.g. 'ONGC', 'IOCL', 'BHEL', 'SAIL'
  name: string; // Full Organization Name
  sector: 'Oil & Gas' | 'Power & Heavy Engineering' | 'Steel & Mining';
  location: string;
  erpSystem: 'SAP ECC 6.0' | 'SAP S/4HANA' | 'Oracle ERP Cloud';
  materialMasterCount: number;
  lastSyncDate: string;
  connectionStatus: 'DEMO_SYNTHETIC' | 'PLANNED_CONNECTOR' | 'INTEGRATION_READY';
  logoBadgeColor: string;
  description: string;
}

export const CPSE_ORGANIZATIONS: CPSEProfile[] = [
  {
    id: 'ONGC',
    name: 'Oil and Natural Gas Corporation Limited',
    sector: 'Oil & Gas',
    location: 'Dehradun / Mumbai Offshore Basin',
    erpSystem: 'SAP S/4HANA',
    materialMasterCount: 100,
    lastSyncDate: '2026-09-17 08:30 IST',
    connectionStatus: 'DEMO_SYNTHETIC',
    logoBadgeColor: 'from-amber-600 to-amber-700',
    description: 'Exploration & Production equipment, valves, drilling accessories, casing pipes.',
  },
  {
    id: 'IOCL',
    name: 'Indian Oil Corporation Limited',
    sector: 'Oil & Gas',
    location: 'Refineries Division (Mathura / Panipat)',
    erpSystem: 'SAP ECC 6.0',
    materialMasterCount: 100,
    lastSyncDate: '2026-09-17 09:15 IST',
    connectionStatus: 'DEMO_SYNTHETIC',
    logoBadgeColor: 'from-orange-600 to-amber-600',
    description: 'Refinery piping, catalytic reactor valves, pumps, electrical instrumentation.',
  },
  {
    id: 'BHEL',
    name: 'Bharat Heavy Electricals Limited',
    sector: 'Power & Heavy Engineering',
    location: 'Tiruchirappalli & Haridwar Units',
    erpSystem: 'SAP ECC 6.0',
    materialMasterCount: 100,
    lastSyncDate: '2026-09-17 07:45 IST',
    connectionStatus: 'DEMO_SYNTHETIC',
    logoBadgeColor: 'from-blue-700 to-indigo-800',
    description: 'Boilers, turbine piping, heavy fasteners, high-pressure steam fittings.',
  },
  {
    id: 'SAIL',
    name: 'Steel Authority of India Limited',
    sector: 'Steel & Mining',
    location: 'Bhilai & Rourkela Steel Plants',
    erpSystem: 'SAP S/4HANA',
    materialMasterCount: 100,
    lastSyncDate: '2026-09-17 10:30 IST',
    connectionStatus: 'DEMO_SYNTHETIC',
    logoBadgeColor: 'from-emerald-700 to-teal-800',
    description: 'Blast furnace valves, heavy rolling mill bearings, high-temp piping, and fasteners.',
  },
];
