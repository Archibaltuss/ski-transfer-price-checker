# Definition of Done — Sprint 2

## Backend

- [ ] `backend/data/routes.json` создан, содержит минимум 6 маршрутов (GVA + ZRH → Verbier, Zermatt, Davos)
- [ ] `backend/data/pricing.json` создан, содержит `base_rate_chf_per_km` и `group_multipliers` (диапазон 1–8)
- [ ] Данные загружаются из JSON при старте приложения (один раз, не на каждый запрос)
- [ ] `GET /api/routes` возвращает HTTP 200 + массив маршрутов
- [ ] `POST /api/calculate` возвращает HTTP 200 + `{price_chf, route_name, distance_km, passengers, currency}`
- [ ] Несуществующий маршрут → HTTP 404 `{"detail": "Route not found"}`
- [ ] `passengers` < 1 или > 8 → HTTP 422

## Тестирование

- [ ] TC-2-01: `GET /api/routes` возвращает ≥ 6 маршрутов
- [ ] TC-2-02: `POST /api/calculate` (1 пассажир) — корректная цена и все поля ответа
- [ ] TC-2-03: `POST /api/calculate` (4 пассажира) — групповой коэффициент ниже
- [ ] TC-2-04: несуществующий маршрут → HTTP 404
- [ ] TC-2-05/06: `passengers = 0` и `passengers = 9` → HTTP 422
- [ ] TC-2-07: unit-тест `calculate_price` проходит (`pytest backend/`)

## Деплой

- [ ] Smoke-тест локально: `POST /api/calculate` с реальным маршрутом возвращает осмысленную цену в CHF
- [ ] `GET /api/routes` доступен и возвращает данные (готово к Sprint 3 SearchForm)
