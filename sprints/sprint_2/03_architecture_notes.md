# Архитектурные заметки — Sprint 2

## Ключевые решения

| Решение | Обоснование |
|---------|------------|
| JSON-файлы вместо БД | Концепт: БД out of scope; JSON достаточен для hardcoded MVP |
| Загрузка данных при старте приложения | Избегаем disk I/O на каждый запрос; данные меняются только при редеплое |
| `backend/data/` как папка данных | Чёткое отделение данных от кода; при деплое на Railway папка попадает в образ |
| Групповые коэффициенты по верхней границе | Ключ в pricing.json = максимальное число пассажиров группы; алгоритм берёт первый ключ, где `passengers ≤ key` |
| Цена округляется до 2 знаков | Финансовые значения не должны показывать длинные дроби |

## Backend

### Новые модели / таблицы

Изменений схемы нет. Данные хранятся в JSON-файлах.

### Новые методы / роуты

```
GET /api/routes
  Response: [{"id": str, "from_airport": str, "from_name": str,
              "to_resort": str, "to_name": str, "distance_km": int}, ...]
  HTTP 200

POST /api/calculate
  Request body: {
    "from_airport": str,   // код IATA, e.g. "GVA"
    "to_resort": str,      // slug, e.g. "VERBIER"
    "passengers": int,     // 1–8
    "date": str            // ISO 8601, e.g. "2026-01-15"
  }
  Response: {
    "price_chf": float,    // округлён до 2 знаков
    "route_name": str,     // "Geneva → Verbier"
    "distance_km": int,
    "passengers": int,
    "currency": "CHF"
  }
  HTTP 200 / 404 / 422
```

### Структура данных

**backend/data/routes.json** (пример):
```json
[
  {"id": "GVA-VERBIER",  "from_airport": "GVA", "from_name": "Geneva Airport",  "to_resort": "VERBIER", "to_name": "Verbier",  "distance_km": 155},
  {"id": "GVA-ZERMATT",  "from_airport": "GVA", "from_name": "Geneva Airport",  "to_resort": "ZERMATT", "to_name": "Zermatt",  "distance_km": 230},
  {"id": "GVA-DAVOS",    "from_airport": "GVA", "from_name": "Geneva Airport",  "to_resort": "DAVOS",   "to_name": "Davos",    "distance_km": 270},
  {"id": "ZRH-VERBIER",  "from_airport": "ZRH", "from_name": "Zurich Airport",  "to_resort": "VERBIER", "to_name": "Verbier",  "distance_km": 210},
  {"id": "ZRH-ZERMATT",  "from_airport": "ZRH", "from_name": "Zurich Airport",  "to_resort": "ZERMATT", "to_name": "Zermatt",  "distance_km": 200},
  {"id": "ZRH-DAVOS",    "from_airport": "ZRH", "from_name": "Zurich Airport",  "to_resort": "DAVOS",   "to_name": "Davos",    "distance_km": 152}
]
```

**backend/data/pricing.json** (пример):
```json
{
  "base_rate_chf_per_km": 2.5,
  "group_multipliers": {
    "1": 1.0,
    "2": 0.95,
    "4": 0.85,
    "6": 0.75,
    "8": 0.65
  },
  "currency": "CHF"
}
```

### Алгоритм расчёта

```
route = найти в routes.json по from_airport + to_resort (HTTP 404 если не найден)
multiplier = первый group_multipliers[k] где passengers ≤ int(k), сортировка по возрастанию k
price = round(route.distance_km × base_rate_chf_per_km × multiplier, 2)
```
