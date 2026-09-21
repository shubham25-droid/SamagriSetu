import re
from typing import Dict, Optional
try:
    from models.schemas import MaterialAttributes
except ImportError:
    from ..models.schemas import MaterialAttributes

class AttributeParser:
    @staticmethod
    def parse_description(text: str) -> MaterialAttributes:
        t = text.upper()
        
        # 1. Item Type
        item_type = None
        if "GLOBE VALVE" in t or "GLB VLV" in t:
            item_type = "Globe Valve"
        elif "BALL VALVE" in t or "BALL V/V" in t:
            item_type = "Ball Valve"
        elif "GATE VALVE" in t or "GATE VLV" in t:
            item_type = "Gate Valve"
        elif "CHECK VALVE" in t or "NRV" in t:
            item_type = "Check Valve"
        elif "PIPE" in t or "SEAMLESS" in t:
            item_type = "Seamless Pipe"
        elif "FLANGE" in t:
            item_type = "Pipe Flange"
        elif "GASKET" in t:
            item_type = "Spiral Wound Gasket"
            
        # 2. Nominal Size
        nominal_size = None
        if re.search(r'\b(2\s*IN|2"|DN\s*50|50\s*MM)\b', t):
            nominal_size = "2 Inch (DN 50)"
        elif re.search(r'\b(3\s*IN|3"|DN\s*80|80\s*MM)\b', t):
            nominal_size = "3 Inch (DN 80)"
        elif re.search(r'\b(4\s*IN|4"|DN\s*100|100\s*MM)\b', t):
            nominal_size = "4 Inch (DN 100)"
        elif re.search(r'\b(6\s*IN|6"|DN\s*150|150\s*MM)\b', t):
            nominal_size = "6 Inch (DN 150)"
            
        # 3. Pressure Rating
        pressure_class = None
        if re.search(r'\b(150#|CL\.?\s*150|CLASS\s*150)\b', t):
            pressure_class = "ASME Class 150"
        elif re.search(r'\b(300#|CL\.?\s*300|CLASS\s*300)\b', t):
            pressure_class = "ASME Class 300"
        elif re.search(r'\b(600#|CL\.?\s*600|CLASS\s*600)\b', t):
            pressure_class = "ASME Class 600"
        elif re.search(r'\b(800#|CL\.?\s*800|CLASS\s*800)\b', t):
            pressure_class = "ASME Class 800"
            
        # 4. Metallurgy
        metallurgy = None
        if re.search(r'\b(A216\s*WCB|WCB|CARBON\s*STEEL|CS)\b', t):
            metallurgy = "Carbon Steel (ASTM A216 WCB)"
        elif re.search(r'\b(SS\s*316|316L?|CF8M|STAINLESS\s*STEEL\s*316)\b', t):
            metallurgy = "Stainless Steel 316 (ASTM A351 CF8M)"
        elif re.search(r'\b(SS\s*304|304L?|CF8|STAINLESS\s*STEEL\s*304)\b', t):
            metallurgy = "Stainless Steel 304 (ASTM A351 CF8)"
        elif re.search(r'\b(A105|FORGED\s*CS)\b', t):
            metallurgy = "Forged Carbon Steel (ASTM A105)"
            
        # 5. End Connection
        end_connection = None
        if re.search(r'\b(SW|SOCKET\s*WELD)\b', t):
            end_connection = "Socket Weld (SW)"
        elif re.search(r'\b(FLANGED|RF|RAISED\s*FACE)\b', t):
            end_connection = "Flanged Raised Face (RF)"
        elif re.search(r'\b(BW|BUTT\s*WELD)\b', t):
            end_connection = "Butt Weld (BW)"
        elif re.search(r'\b(NPT|THREADED|THD)\b', t):
            end_connection = "Threaded (NPT)"
            
        # 6. Standard
        design_standard = "ASME B16.34" if item_type and "Valve" in item_type else "ASME B36.10"
        
        return MaterialAttributes(
            item_type=item_type,
            nominal_size=nominal_size,
            pressure_class=pressure_class,
            metallurgy=metallurgy,
            end_connection=end_connection,
            design_standard=design_standard
        )
