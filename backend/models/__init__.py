try:
    from models.schemas import (
        MaterialAttributes,
        RawMaterialRecord,
        MatchEvidence,
        MatchCandidate,
        CNMCRecord
    )
except ImportError:
    from .schemas import (
        MaterialAttributes,
        RawMaterialRecord,
        MatchEvidence,
        MatchCandidate,
        CNMCRecord
    )
