import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from routers.harmonize import router as harmonize_router
    from routers.catalogs import router as catalogs_router
except ImportError:
    from .routers.harmonize import router as harmonize_router
    from .routers.catalogs import router as catalogs_router

app = FastAPI(
    title="SamagriSetu Enterprise Harmonization Engine",
    description="Backend API for cross-CPSE material code standardization, attribute parsing, and safety hard-lock detection.",
    version="2.0.0"
)

# CORS middleware for frontend communication (supports Vercel, localhost, and custom domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(harmonize_router)
app.include_router(catalogs_router)

@app.get("/")
def root():
    return {
        "platform": "SamagriSetu",
        "tagline": "One Nation. One Common Material Code.",
        "status": "OPERATIONAL",
        "version": "2.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "node": "SamagriSetu Core Engine",
        "uptime": "Active"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
