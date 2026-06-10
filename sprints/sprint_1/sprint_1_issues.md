# Sprint 1 Issues — ski-transfer-price-checker

Дата: 2026-06-03
Источник: sprints/sprint_1/02_epics_user_stories.md

## Порядок выполнения: T1 → T2 → T3 → T4

| # | Issue | Агент | Файл | Зависит от |
|---|-------|-------|------|-----------|
| T1 | Инициализация FastAPI + health-check | [backend] | backend/main.py | — |
| T2 | Инициализация Vite + TypeScript проекта | [frontend] | frontend/package.json | — |
| T3 | Настройка CORS в FastAPI | [backend] | backend/main.py | T1, T2 |
| T4 | Proxy и health-check fetch в App.tsx | [frontend] | frontend/vite.config.ts, frontend/src/App.tsx | T3 |

---

## T1: Инициализация FastAPI — backend/main.py — создать

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** создать

**Зависит от:** —

AC:
- [ ] `uvicorn main:app --reload` запускается без ошибок из `backend/`
- [ ] `GET /api/health` возвращает `{"status": "ok"}` и HTTP 200
- [ ] `backend/requirements.txt` содержит `fastapi` и `uvicorn[standard]`

---

## T2: Инициализация Vite + TypeScript — frontend/ — создать

**Агент:** [frontend]
**Файл:** frontend/package.json
**Действие:** создать

**Зависит от:** —

AC:
- [ ] `npm run dev` запускает dev-сервер на порту 5173 без ошибок
- [ ] `npm run build` завершается с кодом 0, генерирует папку `frontend/dist/`
- [ ] Проект находится в `frontend/`, TypeScript настроен (`tsconfig.json` присутствует)
- [ ] Зависимости зафиксированы в `frontend/package.json`

---

## T3: Настройка CORS в FastAPI — backend/main.py — изменить

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** изменить

**Зависит от:** T1, T2

AC:
- [ ] FastAPI настроен с `CORSMiddleware`, разрешающим `http://localhost:5173`

---

## T4: Proxy и health-check fetch в App.tsx — frontend/vite.config.ts + App.tsx — изменить

**Агент:** [frontend]
**Файл:** frontend/vite.config.ts, frontend/src/App.tsx
**Действие:** изменить

**Зависит от:** T3

AC:
- [ ] `vite.config.ts` содержит proxy: `/api` → `http://localhost:8000`
- [ ] В `App.tsx` при монтировании выполняется `fetch('/api/health')` и ответ логируется в консоль
- [ ] В Browser DevTools → Network запрос к `/api/health` возвращает статус 200, ошибок CORS нет
