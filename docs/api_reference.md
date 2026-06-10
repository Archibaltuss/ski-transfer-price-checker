# API Reference — ski-transfer-price-checker

Backend: REST (FastAPI)

## Верифицированные форматы (заполняется в процессе разработки)

| Метод | URL | Формат params | Формат response | Статус |
|-------|-----|--------------|----------------|--------|
| GET | `/api/health` | — | `{"status": "ok"}` | ⏳ |
| POST | `/api/calculate` | `{"from": str, "to": str, "date": str, "passengers": int}` | `{"price": float, "currency": str, "duration_min": int}` | ⏳ |
