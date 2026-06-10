# Sprint 2 Tasks — ski-transfer-price-checker

Источник: 02_epics_user_stories.md (US 2.1.1, 2.1.2, 2.2.1, 2.2.2)

## Порядок выполнения: T1 → T2 → T3 → T4 → T5

| # | Задача | Агент | Файл | Зависит от |
|---|--------|-------|------|-----------|
| T1 | Создать routes.json (6+ маршрутов GVA/ZRH) | [backend] | backend/data/routes.json | — |
| T2 | Создать pricing.json (base_rate + group_multipliers) | [backend] | backend/data/pricing.json | — |
| T3 | Создать router с GET /api/routes | [backend] | backend/routers/routes_router.py | T1 |
| T4 | Создать router с POST /api/calculate и логикой расчёта | [backend] | backend/routers/calculate_router.py | T1, T2 |
| T5 | Подключить routers в FastAPI app | [backend] | backend/main.py | T3, T4 |

---

## T1: Создать routes.json

**Агент:** [backend]
**Файл:** backend/data/routes.json
**Действие:** создать

AC:
- [ ] Файл `backend/data/routes.json` создан
- [ ] Содержит минимум 6 маршрутов с полями: `id`, `from_airport`, `from_name`, `to_resort`, `to_name`, `distance_km`
- [ ] Покрыты аэропорты GVA и ZRH, курорты Verbier, Zermatt, Davos
- [ ] JSON валиден

---

## T2: Создать pricing.json

**Агент:** [backend]
**Файл:** backend/data/pricing.json
**Действие:** создать

AC:
- [ ] Файл `backend/data/pricing.json` создан
- [ ] Содержит `base_rate_chf_per_km` (число) и `group_multipliers` (объект: ключ = макс. пассажиров, значение = коэффициент)
- [ ] Покрывает диапазон 1–8 пассажиров
- [ ] JSON валиден

---

## T3: Создать router с GET /api/routes

**Агент:** [backend]
**Файл:** backend/routers/routes_router.py
**Действие:** создать

AC:
- [ ] `GET /api/routes` возвращает HTTP 200
- [ ] Тело ответа — JSON-массив объектов: `id`, `from_airport`, `from_name`, `to_resort`, `to_name`
- [ ] Данные загружаются из `routes.json` при старте (lifespan или модульная переменная), не при каждом запросе

---

## T4: Создать router с POST /api/calculate и логикой расчёта

**Агент:** [backend]
**Файл:** backend/routers/calculate_router.py
**Действие:** создать

AC:
- [ ] `POST /api/calculate` принимает `{ "from_airport": str, "to_resort": str, "passengers": int, "date": str }`
- [ ] Возвращает HTTP 200: `{ "price_chf": float, "route_name": str, "distance_km": int, "passengers": int, "currency": "CHF" }`
- [ ] Формула: `price = distance_km × base_rate_chf_per_km × group_multiplier(passengers)`
- [ ] `price_chf` округлён до 2 знаков
- [ ] Несуществующий маршрут → HTTP 404 `{"detail": "Route not found"}`
- [ ] `passengers` < 1 или > 8 → HTTP 422

---

## T5: Подключить routers в FastAPI app

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** изменить

AC:
- [ ] `routes_router` и `calculate_router` подключены через `app.include_router()`
- [ ] Оба эндпоинта (`GET /api/routes`, `POST /api/calculate`) доступны после запуска
- [ ] `GET /api/health` (Sprint 1) продолжает работать
