import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import APIRouter, HTTPException
from typing import List

try:
    from models.schemas import (
        RawMaterialRecord,
        MatchCandidate,
        MatchEvidence,
        CNMCRecord,
        MaterialAttributes
    )
    from services.attribute_parser import AttributeParser
    from services.safety_interceptor import SafetyInterceptor
except ImportError:
    from ..models.schemas import (
        RawMaterialRecord,
        MatchCandidate,
        MatchEvidence,
        CNMCRecord,
        MaterialAttributes
    )
    from ..services.attribute_parser import AttributeParser
    from ..services.safety_interceptor import SafetyInterceptor

router = APIRouter(prefix="/api/harmonize", tags=["Harmonization Engine"])

@router.post("/parse-attributes", response_model=MaterialAttributes)
def parse_attributes(record: RawMaterialRecord):
    return AttributeParser.parse_description(record.description)

@router.post("/evaluate-pair")
def evaluate_pair(rec_a: RawMaterialRecord, rec_b: RawMaterialRecord):
    attrs_a = AttributeParser.parse_description(rec_a.description)
    attrs_b = AttributeParser.parse_description(rec_b.description)
    
    is_safe, conflicts = SafetyInterceptor.evaluate_conflicts(attrs_a, attrs_b)
    
    # Calculate attribute concordance
    matching_attrs = 0
    total_checked = 0
    for key in ["item_type", "nominal_size", "pressure_class", "metallurgy", "end_connection"]:
        val_a = getattr(attrs_a, key)
        val_b = getattr(attrs_b, key)
        if val_a and val_b:
            total_checked += 1
            if val_a == val_b:
                matching_attrs += 1
                
    concordance = (matching_attrs / total_checked * 100.0) if total_checked > 0 else 0.0
    
    return {
        "record_a": rec_a,
        "record_b": rec_b,
        "attributes_a": attrs_a,
        "attributes_b": attrs_b,
        "is_safe": is_safe,
        "conflicts": conflicts,
        "attribute_concordance_pct": round(concordance, 1)
    }
