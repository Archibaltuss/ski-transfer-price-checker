# Sprint 2 Issues — ski-transfer-price-checker

Дата: 2026-06-03
Источник: sprints/sprint_2/02_epics_user_stories.md

## Порядок выполнения: T1 → T2 → T3 → T4

| # | Issue | Агент | Файл | Зависит от |
|---|-------|-------|------|-----------|
| T1 | Создать routes.json с маршрутами | [backend] | backend/data/routes.json | — |
| T2 | Создать pricing.json с тарифной сеткой | [backend] | backend/data/pricing.json | — |
| T3 | Реализовать GET /api/routes | [backend] | backend/main.py | T1 |
| T4 | Реализовать POST /api/calculate | [backend] | backend/main.py | T1, T2 |

---

## T1: Создать routes.json — backend/data/routes.json — создать

**Агент:** [backend]
**Файл:** backend/data/routes.json
**Действие:** создать

**Зависит от:** —

AC:
- [ ] Файл `backend/data/routes.json` создан
- [ ] Содержит минимум 6 маршрутов, каждый с полями: `id`, `from_airport` (код IATA), `from_name`, `to_resort`, `to_name`, `distance_km`
- [ ] Охвачены минимум 2 аэропорта (GVA, ZRH) и 3 курорта (Verbier, Zermatt, Davos)
- [ ] JSON валиден (парсится без ошибок)

---

## T2: Создать pricing.json — backend/data/pricing.json — создать

**Агент:** [backend]
**Файл:** backend/data/pricing.json
**Действие:** создать

**Зависит от:** —

AC:
- [ ] Файл `backend/data/pricing.json` создан
- [ ] Содержит `base_rate_chf_per_km` (число) и `group_multipliers` (объект: ключ = макс. число пассажиров, значение = коэффициент)
- [ ] Покрывает диапазон 1–8 пассажиров
- [ ] JSON валиден

---

## T3: GET /api/routes эндпоинт — backend/main.py — изменить

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** изменить

**Зависит от:** T1

AC:
- [ ] `GET /api/routes` возвращает HTTP 200
- [ ] Тело ответа — JSON-массив объектов с полями: `id`, `from_airport`, `from_name`, `to_resort`, `to_name`
- [ ] Данные загружаются из `routes.json` при старте, не читаются с диска при каждом запросе

---

## T4: POST /api/calculate эндпоинт — backend/main.py — изменить

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** изменить

**Зависит от:** T1, T2

AC:
- [ ] `POST /api/calculate` принимает JSON-тело: `{ "from_airport": str, "to_resort": str, "passengers": int, "date": str }`
- [ ] Возвращает HTTP 200 с полями: `price_chf` (float, округлён до 2 знаков), `route_name` (str), `distance_km` (int), `passengers` (int), `currency` (="CHF")
- [ ] Формула: `price = distance_km × base_rate × group_multiplier(passengers)`
- [ ] Если маршрут не найден — возвращает HTTP 404 с `{"detail": "Route not found"}`
- [ ] Если `passengers` < 1 или > 8 — возвращает HTTP 422
