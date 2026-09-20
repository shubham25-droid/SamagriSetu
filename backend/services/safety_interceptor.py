from typing import Tuple, List
from ..models.schemas import MaterialAttributes

class SafetyInterceptor:
    @staticmethod
    def evaluate_conflicts(attrs_a: MaterialAttributes, attrs_b: MaterialAttributes) -> Tuple[bool, List[str]]:
        conflicts = []
        
        # Rule 1: Pressure Rating Mismatch (e.g. Class 150 vs Class 300)
        if attrs_a.pressure_class and attrs_b.pressure_class:
            if attrs_a.pressure_class != attrs_b.pressure_class:
                conflicts.append(f"Hard-Lock Conflict: Pressure Rating Mismatch ({attrs_a.pressure_class} != {attrs_b.pressure_class})")
                
        # Rule 2: Metallurgy Mismatch (e.g. SS304 vs SS316)
        if attrs_a.metallurgy and attrs_b.metallurgy:
            if attrs_a.metallurgy != attrs_b.metallurgy:
                conflicts.append(f"Hard-Lock Conflict: Metallurgy Discrepancy ({attrs_a.metallurgy} != {attrs_b.metallurgy})")
                
        # Rule 3: Nominal Size Discrepancy
        if attrs_a.nominal_size and attrs_b.nominal_size:
            if attrs_a.nominal_size != attrs_b.nominal_size:
                conflicts.append(f"Hard-Lock Conflict: Dimension Mismatch ({attrs_a.nominal_size} != {attrs_b.nominal_size})")

        # Rule 4: Component Type Incompatibility
        if attrs_a.item_type and attrs_b.item_type:
            if attrs_a.item_type != attrs_b.item_type:
                conflicts.append(f"Hard-Lock Conflict: Component Type Incompatibility ({attrs_a.item_type} != {attrs_b.item_type})")
                
        is_safe = len(conflicts) == 0
        return is_safe, conflicts
