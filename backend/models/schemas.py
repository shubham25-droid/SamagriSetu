from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class MaterialAttributes(BaseModel):
    item_type: Optional[str] = Field(None, description="Standardized component type, e.g. Globe Valve, Ball Valve")
    nominal_size: Optional[str] = Field(None, description="Standardized dimension, e.g. 2 INCH (DN 50)")
    pressure_class: Optional[str] = Field(None, description="Pressure rating, e.g. ASME CLASS 150")
    metallurgy: Optional[str] = Field(None, description="Body material grade, e.g. Carbon Steel (ASTM A216 WCB)")
    end_connection: Optional[str] = Field(None, description="Connection type, e.g. Socket Weld (SW), Flanged RF")
    design_standard: Optional[str] = Field(None, description="Engineering standard, e.g. ASME B16.34, API 600")

class RawMaterialRecord(BaseModel):
    cpse: str = Field(..., description="CPSE identifier: ONGC, IOCL, BHEL, or SAIL")
    source_code: str = Field(..., description="Native CPSE material code")
    description: str = Field(..., description="Raw material short-text description")
    uom: Optional[str] = Field("EA", description="Unit of measure")
    category: Optional[str] = Field("General Mechanical", description="Material category")

class MatchEvidence(BaseModel):
    attribute_concordance: float
    text_similarity: float
    safety_lock_passed: bool
    conflict_reasons: List[str] = []

class MatchCandidate(BaseModel):
    candidate_id: str
    primary_record: RawMaterialRecord
    matched_records: List[RawMaterialRecord]
    extracted_attributes: MaterialAttributes
    composite_score: float
    status: str = "PENDING_REVIEW"
    evidence: MatchEvidence

class CNMCRecord(BaseModel):
    cnmc_code: str
    standard_description: str
    attributes: MaterialAttributes
    mapped_cpse_codes: Dict[str, List[str]]
    created_at: str
    authorized_by: str
