try:
    from services.attribute_parser import AttributeParser
    from services.safety_interceptor import SafetyInterceptor
except ImportError:
    from .attribute_parser import AttributeParser
    from .safety_interceptor import SafetyInterceptor
