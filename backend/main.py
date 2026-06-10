import json
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

_cors_origins = os.environ.get(
    "CORS_ORIGINS", "http://localhost:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_data_dir = Path(__file__).parent / "data"

with open(_data_dir / "routes.json", encoding="utf-8") as f:
    _routes: list[dict] = json.load(f)

with open(_data_dir / "pricing.json", encoding="utf-8") as f:
    _pricing: dict = json.load(f)

_base_rate: float = _pricing["base_rate_chf_per_km"]
_multipliers: dict[int, float] = {
    int(k): v for k, v in _pricing["group_multipliers"].items()
}
_multiplier_tiers = sorted(_multipliers.keys())


def _get_multiplier(passengers: int) -> float:
    for tier in _multiplier_tiers:
        if passengers <= tier:
            return _multipliers[tier]
    return _multipliers[_multiplier_tiers[-1]]


class CalculateRequest(BaseModel):
    from_airport: str
    to_resort: str
    passengers: int = Field(ge=1, le=8)
    date: str


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/routes")
def get_routes():
    return [
        {
            "id": r["id"],
            "from_airport": r["from_airport"],
            "from_name": r["from_name"],
            "to_resort": r["to_resort"],
            "to_name": r["to_name"],
        }
        for r in _routes
    ]


@app.post("/api/calculate")
def calculate(req: CalculateRequest):
    route = next(
        (
            r
            for r in _routes
            if r["from_airport"].upper() == req.from_airport.upper()
            and r["to_resort"].lower() == req.to_resort.lower()
        ),
        None,
    )
    if route is None:
        raise HTTPException(status_code=404, detail="Route not found")

    multiplier = _get_multiplier(req.passengers)
    price = round(route["distance_km"] * _base_rate * multiplier, 2)

    return {
        "price_chf": price,
        "route_name": f"{route['from_name']} → {route['to_name']}",
        "distance_km": route["distance_km"],
        "passengers": req.passengers,
        "currency": "CHF",
    }
