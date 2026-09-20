from fastapi import APIRouter
import os
import pandas as pd
from typing import List, Dict

router = APIRouter(prefix="/api/catalogs", tags=["CPSE Enterprise Catalogs"])

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

@router.get("/summary")
def get_catalog_summary():
    summary = {}
    for cpse in ["ONGC", "IOCL", "BHEL", "SAIL"]:
        file_path = os.path.join(DATA_DIR, f"{cpse}.csv")
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            summary[cpse] = {
                "records_count": len(df),
                "columns": list(df.columns),
                "status": "Available"
            }
        else:
            summary[cpse] = {
                "records_count": 0,
                "status": "Not Found"
            }
    return summary

@router.get("/{cpse}")
def get_cpse_records(cpse: str, limit: int = 100):
    cpse_upper = cpse.upper()
    file_path = os.path.join(DATA_DIR, f"{cpse_upper}.csv")
    if not os.path.exists(file_path):
        return {"error": f"Catalog for {cpse_upper} not found."}
    
    df = pd.read_csv(file_path)
    records = df.head(limit).to_dict(orient="records")
    return {
        "cpse": cpse_upper,
        "total": len(df),
        "returned": len(records),
        "records": records
    }
