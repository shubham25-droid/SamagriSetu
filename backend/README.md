# SamagriSetu Backend Service

FastAPI-powered enterprise material master harmonization and attribute parsing API.

## Requirements
- Python 3.10+
- `pip install -r requirements.txt`

## Running the Backend API
```bash
uvicorn main:app --reload --port 8000
```

## Endpoints
- `GET /`: Platform status
- `GET /health`: Healthcheck probe
- `POST /api/harmonize/parse-attributes`: Parameter extraction from raw descriptions
- `POST /api/harmonize/evaluate-pair`: Conflict detection & safety hard-lock evaluation
- `GET /api/catalogs/summary`: Enterprise catalog status for ONGC, IOCL, BHEL, SAIL
- `GET /api/catalogs/{cpse}`: Ingested enterprise catalog records
- `GET /docs`: Interactive OpenAPI Swagger UI
