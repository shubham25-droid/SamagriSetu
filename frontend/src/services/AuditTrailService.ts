/**
 * Chronological Audit Trail & Governance Service
 * BodhZ - SIH26099
 * 
 * Provides an immutable event log for every ingestion, harmonization, approval, and rejection.
 */

import { AuditEvent } from '../types/AuditTrailTypes';
import { INITIAL_AUDIT_EVENTS } from '../data/syntheticMaterialData';

class AuditTrailServiceImpl {
  private events: AuditEvent[] = [...INITIAL_AUDIT_EVENTS];

  public getEvents(): AuditEvent[] {
    return [...this.events];
  }

  public logEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
    const newEvent: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ...event,
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  public filterEvents(filters: {
    action?: string;
    searchQuery?: string;
    cpse?: string;
  }): AuditEvent[] {
    return this.events.filter((event) => {
      if (filters.action && filters.action !== 'ALL' && event.action !== filters.action) {
        return false;
      }
      if (filters.cpse && filters.cpse !== 'ALL') {
        if (!event.participatingCPSEs || !event.participatingCPSEs.includes(filters.cpse)) {
          return false;
        }
      }
      if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
        const q = filters.searchQuery.toLowerCase();
        const matchesCode = event.materialCode.toLowerCase().includes(q);
        const matchesUser = event.user.toLowerCase().includes(q);
        const matchesReason = event.reason.toLowerCase().includes(q);
        const matchesState = event.newState.toLowerCase().includes(q);
        if (!matchesCode && !matchesUser && !matchesReason && !matchesState) {
          return false;
        }
      }
      return true;
    });
  }
}

export const AuditTrailService = new AuditTrailServiceImpl();
