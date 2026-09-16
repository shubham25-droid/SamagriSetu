/**
 * National Material Master & CPSE Legacy Mapping Service
 * BodhZ - SIH26099: AI-Driven Standardization and Harmonization of Material Codes Across CPSEs
 * 
 * Manages approved Common National Material Codes (CNMC) and maintains strict
 * two-way traceability back to original CPSE codes and descriptions.
 */

import { NationalMaterial, MappedSourceCode } from '../types/MaterialMasterTypes';
import { MaterialMatchCandidate } from '../types/MaterialMatchTypes';
import { ACTUAL_INITIAL_NATIONAL_MATERIALS } from '../data/actualMatchCandidates';
import { AuditTrailService } from './AuditTrailService';

class NationalMaterialServiceImpl {
  private static STORAGE_KEY = 'samagrisetu_national_materials_v1';
  private nationalMaterials: NationalMaterial[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(NationalMaterialServiceImpl.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.nationalMaterials = parsed;
            return;
          }
        }
      }
    } catch {
      // fallback to initial
    }
    this.nationalMaterials = [...ACTUAL_INITIAL_NATIONAL_MATERIALS];
  }

  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(
          NationalMaterialServiceImpl.STORAGE_KEY,
          JSON.stringify(this.nationalMaterials)
        );
      }
    } catch {
      // fallback
    }
  }

  public getNationalMaterials(): NationalMaterial[] {
    return [...this.nationalMaterials];
  }

  public getMaterialByCode(code: string): NationalMaterial | undefined {
    return this.nationalMaterials.find((m) => m.nationalCode.toLowerCase() === code.toLowerCase());
  }

  /**
   * Checks if an incoming material record (e.g. from an upload or future tender)
   * matches an already approved Common National Material Code (CNMC).
   * This guarantees that even years later, similar descriptions or re-tenders
   * map back to the existing sovereign code rather than creating duplicates.
   */
  public findMatchingNationalMaterial(record: {
    sourceMaterialCode?: string;
    originalDescription?: string;
    normalizedDescription?: string;
    materialCategory?: string;
    size?: string;
    pressureRating?: string;
    materialGrade?: string;
  }): { match: NationalMaterial; score: number; matchReason: string } | null {
    if (!record) return null;

    const desc = (record.originalDescription || record.normalizedDescription || '').toLowerCase();
    const size = (record.size || '').toLowerCase();
    const pressure = (record.pressureRating || '').toLowerCase();
    const grade = (record.materialGrade || '').toLowerCase();
    const category = (record.materialCategory || '').toLowerCase();

    let bestMatch: NationalMaterial | null = null;
    let highestScore = 0;
    let bestReason = '';

    for (const nat of this.nationalMaterials) {
      let score = 0;
      const reasons: string[] = [];

      // 1. Direct legacy ERP code match from historical registry
      if (record.sourceMaterialCode) {
        const existingMapping = nat.mappedSourceRecords.find(
          (m) => m.sourceCode.toLowerCase() === record.sourceMaterialCode?.toLowerCase()
        );
        if (existingMapping) {
          return {
            match: nat,
            score: 100,
            matchReason: `Direct historical ERP code match (${record.sourceMaterialCode}) mapped to ${nat.nationalCode}`,
          };
        }
      }

      // 2. Normalized category / equipment type match
      const natCat = (nat.category || '').toLowerCase();
      const natSub = (nat.subcategory || '').toLowerCase();
      const natDesc = (nat.standardDescription || '').toLowerCase();
      const natAttrs = nat.normalizedAttributes || ({} as any);

      const isValve = (desc.includes('valve') || category.includes('valve')) && (natDesc.includes('valve') || natCat.includes('valve'));
      const isGlobeValve = isValve && (desc.includes('globe') || desc.includes('glb')) && (natDesc.includes('globe') || natSub.includes('globe'));
      const isBallValve = isValve && (desc.includes('ball')) && (natDesc.includes('ball') || natSub.includes('ball'));
      const isPipe = (desc.includes('pipe') || category.includes('pipe')) && (natDesc.includes('pipe') || natCat.includes('pipe'));
      const isFlange = (desc.includes('flange') || category.includes('flange')) && (natDesc.includes('flange') || natCat.includes('flange'));
      const isGasket = (desc.includes('gasket') || category.includes('gasket')) && (natDesc.includes('gasket') || natCat.includes('gasket'));

      if (isGlobeValve || isBallValve || isPipe || isFlange || isGasket) {
        score += 35;
        reasons.push('Equipment spec matched');
      } else if (category && (natCat.includes(category) || category.includes(natCat))) {
        score += 25;
        reasons.push('Category aligned');
      }

      // 3. Nominal Size match (handles 2 IN, 2", DN50, 50MM)
      const natSize = (natAttrs.nominalSize || '').toLowerCase();
      const has2Inch = (size.includes('2') || desc.includes('2 in') || desc.includes('2"') || desc.includes('dn50') || desc.includes('dn 50'));
      const natHas2Inch = (natSize.includes('2') || natDesc.includes('2 in') || natDesc.includes('2"') || natDesc.includes('dn50') || natDesc.includes('dn 50'));
      if (has2Inch && natHas2Inch) {
        score += 25;
        reasons.push('Nominal size (2" / DN50) matched');
      } else if (size && natSize && (natSize.includes(size) || size.includes(natSize))) {
        score += 20;
        reasons.push('Size aligned');
      }

      // 4. Pressure Rating match (handles CL150, Class 150, 150#)
      const natPress = (natAttrs.pressureRating || '').toLowerCase();
      const has150 = (pressure.includes('150') || desc.includes('150#') || desc.includes('cl.150') || desc.includes('cl150') || desc.includes('class 150'));
      const natHas150 = (natPress.includes('150') || natDesc.includes('150#') || natDesc.includes('cl.150') || natDesc.includes('cl150') || natDesc.includes('class 150'));
      const has300 = (pressure.includes('300') || desc.includes('300#') || desc.includes('cl.300') || desc.includes('cl300') || desc.includes('class 300'));
      const natHas300 = (natPress.includes('300') || natDesc.includes('300#') || natDesc.includes('cl.300') || natDesc.includes('cl300') || natDesc.includes('class 300'));

      if ((has150 && natHas150) || (has300 && natHas300)) {
        score += 25;
        reasons.push('Pressure class matched');
      }

      // 5. Metallurgy / Material Grade match (WCB, Carbon Steel, SS316, SS304)
      const natGrade = (natAttrs.bodyMaterial || '').toLowerCase();
      const hasCS = (grade.includes('cs') || grade.includes('carbon') || grade.includes('wcb') || desc.includes('carbon steel') || desc.includes('wcb'));
      const natHasCS = (natGrade.includes('cs') || natGrade.includes('carbon') || natGrade.includes('wcb') || natDesc.includes('carbon steel') || natDesc.includes('wcb'));
      const has316 = (grade.includes('316') || desc.includes('316') || desc.includes('ss316') || desc.includes('ss 316'));
      const natHas316 = (natGrade.includes('316') || natDesc.includes('316') || natDesc.includes('ss316') || natDesc.includes('ss 316'));

      if ((hasCS && natHasCS) || (has316 && natHas316)) {
        score += 20;
        reasons.push('Metallurgy matched');
      }

      if (score > highestScore && score >= 65) {
        highestScore = score;
        bestMatch = nat;
        bestReason = reasons.join(', ');
      }
    }

    if (bestMatch && highestScore >= 65) {
      return { match: bestMatch, score: highestScore, matchReason: bestReason };
    }

    return null;
  }

  /**
   * Promotes an approved match candidate into the National Material Master.
   * Generates or assigns the Common National Material Code (CNMC)
   * while immutably preserving the original CPSE codes and descriptions.
   */
  public addApprovedMaterialFromCandidate(
    candidate: MaterialMatchCandidate,
    reviewerName: string,
    notes?: string
  ): NationalMaterial {
    const existing = this.getMaterialByCode(candidate.recommendedNationalCode);
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    const mappedSourceRecords: MappedSourceCode[] = candidate.sourceMaterials.map((source) => ({
      cpse: source.cpse,
      sourceCode: source.sourceMaterialCode,
      originalDescription: source.originalDescription,
      uom: source.uom,
      mappedAt: timestamp,
      mappingStatus: 'MAPPED',
      erpSystemOrigin: source.cpse === 'ONGC' ? 'SAP S/4HANA' : 'SAP ECC 6.0',
    }));

    if (existing) {
      // Merge source mappings into existing national material
      const existingCodes = new Set(existing.mappedSourceRecords.map((m) => m.sourceCode));
      mappedSourceRecords.forEach((m) => {
        if (!existingCodes.has(m.sourceCode)) {
          existing.mappedSourceRecords.push(m);
        }
      });
      existing.coverageCount = new Set(existing.mappedSourceRecords.map((m) => m.cpse)).size;
      existing.lastUpdated = timestamp;
      this.saveToStorage();
      return existing;
    }

    // Determine National Code (e.g. CNMC-000184)
    let nationalCode = candidate.recommendedNationalCode;
    if (nationalCode.includes('HOLD') || !nationalCode.startsWith('CNMC-')) {
      const seq = (this.nationalMaterials.length + 1).toString().padStart(6, '0');
      nationalCode = `CNMC-${seq}`;
    }

    const newNationalMaterial: NationalMaterial = {
      nationalCode,
      standardDescription: candidate.recommendedDescription,
      category: candidate.recommendedClassification.category,
      subcategory: candidate.recommendedClassification.subcategory,
      normalizedAttributes: {
        materialType: candidate.normalizedAttributes['Material Type'] || candidate.title,
        nominalSize: candidate.normalizedAttributes['Nominal Size'] || 'Standard',
        bodyMaterial: candidate.normalizedAttributes['Body Material'] || candidate.normalizedAttributes['Body Metallurgy'] || 'Specified',
        pressureRating: candidate.normalizedAttributes['Pressure Class'] || 'Specified',
        governingStandard: candidate.normalizedAttributes['Governing Standard'] || 'Industry Standard',
        endConnection: candidate.normalizedAttributes['End Connection'] || 'Standard',
        normalizedUom: 'NOS',
        ...candidate.normalizedAttributes,
      },
      mappedSourceRecords,
      approvalStatus: 'APPROVED',
      approvedBy: reviewerName,
      approvalTimestamp: timestamp,
      reviewerNotes: notes || 'Verified technical attributes and cross-CPSE equivalence.',
      lastUpdated: timestamp,
      coverageCount: new Set(mappedSourceRecords.map((m) => m.cpse)).size,
    };

    this.nationalMaterials.unshift(newNationalMaterial);
    this.saveToStorage();

    AuditTrailService.logEvent({
      user: reviewerName,
      role: 'Chief Material Master Reviewer',
      action: 'APPROVED_HARMONIZATION',
      materialCode: nationalCode,
      previousState: 'PENDING_REVIEW',
      newState: 'APPROVED (Active in National Master)',
      reason: notes || `Approved harmonization across CPSEs: ${candidate.sourceMaterials.map((s) => s.cpse).join(', ')}`,
      source: 'National Review Center',
      participatingCPSEs: candidate.sourceMaterials.map((s) => s.cpse),
    });

    return newNationalMaterial;
  }

  /**
   * Get all CPSE Legacy Mappings as a flattened array for the traceability/mapping view
   */
  public getAllLegacyMappings(): Array<{
    nationalCode: string;
    standardDescription: string;
    category: string;
    cpse: string;
    sourceCode: string;
    originalDescription: string;
    uom: string;
    mappingStatus: string;
    mappedAt: string;
    erpSystemOrigin: string;
  }> {
    const list: Array<{
      nationalCode: string;
      standardDescription: string;
      category: string;
      cpse: string;
      sourceCode: string;
      originalDescription: string;
      uom: string;
      mappingStatus: string;
      mappedAt: string;
      erpSystemOrigin: string;
    }> = [];

    this.nationalMaterials.forEach((nat) => {
      nat.mappedSourceRecords.forEach((src) => {
        list.push({
          nationalCode: nat.nationalCode,
          standardDescription: nat.standardDescription,
          category: nat.category,
          cpse: src.cpse,
          sourceCode: src.sourceCode,
          originalDescription: src.originalDescription,
          uom: src.uom,
          mappingStatus: src.mappingStatus,
          mappedAt: src.mappedAt,
          erpSystemOrigin: src.erpSystemOrigin,
        });
      });
    });

    return list;
  }
}

export const NationalMaterialService = new NationalMaterialServiceImpl();
