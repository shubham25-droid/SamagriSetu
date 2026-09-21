try:
    from routers.harmonize import router as harmonize_router
    from routers.catalogs import router as catalogs_router
except ImportError:
    from .harmonize import router as harmonize_router
    from .catalogs import router as catalogs_router
