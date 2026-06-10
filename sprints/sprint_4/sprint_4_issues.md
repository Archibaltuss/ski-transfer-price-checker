# Sprint 4 Issues — ski-transfer-price-checker

Дата: 2026-06-03
Источник: sprints/sprint_4/02_epics_user_stories.md

## Порядок выполнения: T1 || T2 → T3 → T4

| # | Issue | Агент | Файл | Зависит от |
|---|-------|-------|------|-----------|
| T1 | Деплой бэкенда на Railway/Render | [backend] | backend/requirements.txt | — |
| T2 | ResultsPage: отображение результата | [frontend] | frontend/src/components/ResultsPage.tsx | — |
| T3 | ResultsPage: CTA кнопка | [frontend] | frontend/src/components/ResultsPage.tsx | T2 |
| T4 | Деплой фронтенда на Vercel | [frontend] | frontend/vercel.json | T1 |

---

## T1: Деплой бэкенда на Railway/Render — backend/requirements.txt — создать

**Агент:** [backend]
**Файл:** backend/requirements.txt
**Действие:** создать

**Зависит от:** —

AC:
- [ ] Бэкенд задеплоен на Railway или Render из папки `backend/`
- [ ] Команда запуска: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] `GET {BACKEND_URL}/api/health` возвращает HTTP 200 из интернета
- [ ] CORS настроен: разрешён домен Vercel (`*.vercel.app`)
- [ ] `backend/requirements.txt` актуален (все зависимости перечислены)

---

## T2: ResultsPage — отображение результата — создать

**Агент:** [frontend]
**Файл:** frontend/src/components/ResultsPage.tsx
**Действие:** создать

**Зависит от:** —

AC:
- [ ] Компонент `ResultsPage` отображается вместо `SearchForm` после успешного расчёта
- [ ] Показывает: `price_chf` (форматирован как «CHF 387.50»), `route_name`, `distance_km`, `passengers`
- [ ] Кнопка «← Back» сбрасывает результат и возвращает к `SearchForm`

---

## T3: ResultsPage — CTA кнопка — изменить

**Агент:** [frontend]
**Файл:** frontend/src/components/ResultsPage.tsx
**Действие:** изменить

**Зависит от:** T2

AC:
- [ ] Кнопка «Get a real quote» присутствует на `ResultsPage`
- [ ] Кнопка открывает внешнюю ссылку или `mailto:` в новой вкладке
- [ ] Визуально выделена как основной CTA (контрастный цвет)

---

## T4: Деплой фронтенда на Vercel — frontend/vercel.json — создать

**Агент:** [frontend]
**Файл:** frontend/vercel.json
**Действие:** создать

**Зависит от:** T1

AC:
- [ ] Репозиторий подключён к Vercel, деплой срабатывает автоматически на push в main
- [ ] `vercel.json` содержит rewrite: `/api/*` → `{BACKEND_URL}/api/*`
- [ ] `VITE_API_URL` (если используется) задан через Vercel Environment Variables
- [ ] Публичный URL Vercel открывается, форма отображается
