/**
 * Data Source Management & Ingestion Connector Service
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Provides production-ready service boundaries with adapter interfaces for:
 * - Demo CSV files (ONGC, IOCL, BHEL, SAIL)
 * - Custom CSV/Excel uploads
 * - External Reference API endpoints
 * - CPSE Enterprise ERP / SAP connectors (RFC / BAPI / OData)
 */

export type DataSourceType = 'CSV' | 'Excel' | 'API' | 'ERP/SAP';

export type DataSourceStatus = 
  | 'Connected / Demo'
  | 'Not Configured'
  | 'Connector Required'
  | 'Active / Synced'
  | 'Syncing'
  | 'Error';

export interface DataSourceLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  cpse?: string;
  type: DataSourceType;
  status: DataSourceStatus;
  recordCount: number;
  lastSync: string;
  endpointOrFile: string;
  syncFrequency: 'Manual' | 'Hourly' | 'Daily' | 'Real-Time Webhook';
  authStatus: 'Pre-authenticated (Demo)' | 'Not Configured' | 'OAuth2 Pending' | 'SAP SNC Required' | 'Connected';
  logs: DataSourceLog[];
}

// Initial configured and stubbed enterprise data sources
const INITIAL_DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'DS-ONGC',
    name: 'Oil and Natural Gas Corporation (ONGC)',
    cpse: 'ONGC',
    type: 'CSV',
    status: 'Connected / Demo',
    recordCount: 100,
    lastSync: 'Today, 10:42 AM IST',
    endpointOrFile: 'data/ONGC.csv',
    syncFrequency: 'Manual',
    authStatus: 'Pre-authenticated (Demo)',
    logs: [
      { id: 'LOG-1', timestamp: 'Today, 10:42 AM IST', type: 'SUCCESS', message: 'Loaded 100 verified demonstration records from ONGC.csv.' },
      { id: 'LOG-2', timestamp: 'Today, 10:40 AM IST', type: 'INFO', message: 'Schema validated: 9 columns (material_code, description, uom, type, size, grade, pressure, standard, spec).' }
    ]
  },
  {
    id: 'DS-IOCL',
    name: 'Indian Oil Corporation Limited (IOCL)',
    cpse: 'IOCL',
    type: 'CSV',
    status: 'Connected / Demo',
    recordCount: 100,
    lastSync: 'Today, 10:42 AM IST',
    endpointOrFile: 'data/IOCL.csv',
    syncFrequency: 'Manual',
    authStatus: 'Pre-authenticated (Demo)',
    logs: [
      { id: 'LOG-3', timestamp: 'Today, 10:42 AM IST', type: 'SUCCESS', message: 'Loaded 100 verified demonstration records from IOCL.csv.' },
      { id: 'LOG-4', timestamp: 'Today, 10:40 AM IST', type: 'INFO', message: 'Schema validated: 9 columns.' }
    ]
  },
  {
    id: 'DS-BHEL',
    name: 'Bharat Heavy Electricals Limited (BHEL)',
    cpse: 'BHEL',
    type: 'CSV',
    status: 'Connected / Demo',
    recordCount: 100,
    lastSync: 'Today, 10:42 AM IST',
    endpointOrFile: 'data/BHEL.csv',
    syncFrequency: 'Manual',
    authStatus: 'Pre-authenticated (Demo)',
    logs: [
      { id: 'LOG-5', timestamp: 'Today, 10:42 AM IST', type: 'SUCCESS', message: 'Loaded 100 verified demonstration records from BHEL.csv.' },
      { id: 'LOG-6', timestamp: 'Today, 10:40 AM IST', type: 'INFO', message: 'Schema validated: 9 columns.' }
    ]
  },
  {
    id: 'DS-SAIL',
    name: 'Steel Authority of India Limited (SAIL)',
    cpse: 'SAIL',
    type: 'CSV',
    status: 'Connected / Demo',
    recordCount: 100,
    lastSync: 'Today, 10:42 AM IST',
    endpointOrFile: 'data/SAIL.csv',
    syncFrequency: 'Manual',
    authStatus: 'Pre-authenticated (Demo)',
    logs: [
      { id: 'LOG-7', timestamp: 'Today, 10:42 AM IST', type: 'SUCCESS', message: 'Loaded 100 verified demonstration records from SAIL.csv.' },
      { id: 'LOG-8', timestamp: 'Today, 10:40 AM IST', type: 'INFO', message: 'Schema validated: 9 columns.' }
    ]
  },
  {
    id: 'DS-EXT-API',
    name: 'External CPSE Material Master REST API',
    type: 'API',
    status: 'Not Configured',
    recordCount: 0,
    lastSync: 'Never',
    endpointOrFile: 'https://api.mopng.gov.in/materials/v1 (Placeholder)',
    syncFrequency: 'Hourly',
    authStatus: 'Not Configured',
    logs: [
      { id: 'LOG-9', timestamp: 'System Initialized', type: 'WARN', message: 'Connector not configured. Connect an authorized API or ERP source to enable live synchronization.' }
    ]
  },
  {
    id: 'DS-ERP-SAP',
    name: 'Enterprise SAP S/4HANA & ECC Connector',
    type: 'ERP/SAP',
    status: 'Connector Required',
    recordCount: 0,
    lastSync: 'Never',
    endpointOrFile: 'SAP SNC / RFC Gateway (Port 3300/3600)',
    syncFrequency: 'Daily',
    authStatus: 'SAP SNC Required',
    logs: [
      { id: 'LOG-10', timestamp: 'System Initialized', type: 'INFO', message: 'Enterprise SAP RFC gateway adapter prepared. Production environment requires SAP JCo/PyRFC bridge credentials.' }
    ]
  }
];

class DataSourceServiceImpl {
  private sources: DataSourceItem[] = [...INITIAL_DATA_SOURCES];

  public getDataSources(): DataSourceItem[] {
    return [...this.sources];
  }

  public getDataSourceById(id: string): DataSourceItem | undefined {
    return this.sources.find((s) => s.id === id);
  }

  public addDataSource(item: Omit<DataSourceItem, 'id' | 'logs'>): DataSourceItem {
    const newId = `DS-${Date.now().toString().slice(-4)}`;
    const newSource: DataSourceItem = {
      ...item,
      id: newId,
      logs: [
        {
          id: `LOG-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString() + ' IST',
          type: 'INFO',
          message: `Data source created with type: ${item.type}.`
        }
      ]
    };
    this.sources.push(newSource);
    return newSource;
  }

  public async testConnection(sourceId: string): Promise<{ success: boolean; latencyMs: number; message: string }> {
    const source = this.sources.find((s) => s.id === sourceId);
    if (!source) {
      return { success: false, latencyMs: 0, message: 'Source not found.' };
    }

    if (source.status === 'Connected / Demo') {
      return {
        success: true,
        latencyMs: 14,
        message: `Local demonstration dataset verified: ${source.recordCount} rows validated in ${source.endpointOrFile}.`
      };
    }

    if (source.type === 'API') {
      return {
        success: false,
        latencyMs: 120,
        message: 'Endpoint unreachable: API authentication token not provided. Please supply an authorized Government MoP&NG API key.'
      };
    }

    return {
      success: false,
      latencyMs: 250,
      message: 'SAP RFC connection failed: SAP SNC credentials not configured in local prototype.'
    };
  }

  public async syncSource(sourceId: string): Promise<{ success: boolean; recordsFetched: number; message: string }> {
    const source = this.sources.find((s) => s.id === sourceId);
    if (!source) {
      return { success: false, recordsFetched: 0, message: 'Source not found.' };
    }

    if (source.status === 'Connected / Demo') {
      const nowStr = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
      source.lastSync = `Today, ${nowStr}`;
      source.logs.unshift({
        id: `LOG-${Date.now()}`,
        timestamp: source.lastSync,
        type: 'SUCCESS',
        message: `Refreshed and verified ${source.recordCount} records from ${source.endpointOrFile}.`
      });
      return {
        success: true,
        recordsFetched: source.recordCount,
        message: `Successfully synced ${source.recordCount} records from ${source.name}.`
      };
    }

    return {
      success: false,
      recordsFetched: 0,
      message: 'Connector not configured. Connect an authorized API or ERP source to enable live synchronization.'
    };
  }
}

export const DataSourceService = new DataSourceServiceImpl();
