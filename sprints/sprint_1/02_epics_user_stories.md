# Эпики и User Stories — Sprint 1

---

## EPIC 1.1: Настройка Frontend-инфраструктуры

Цель: создать рабочую Vite + TypeScript заготовку фронтенда, готовую к разработке компонентов.

---

### US 1.1.1 — Инициализация Vite + TypeScript проекта

**Как** турист, которому нужен быстрый UI,
**я хочу** чтобы фронтенд-проект запускался в dev-режиме и собирался без ошибок,
**чтобы** команда могла разрабатывать React-компоненты с нуля.

**Агент:** `[frontend]`

Acceptance criteria:
- [ ] `npm run dev` запускает dev-сервер на порту 5173 без ошибок
- [ ] `npm run build` завершается с кодом 0, генерирует папку `frontend/dist/`
- [ ] Проект находится в `frontend/`, TypeScript настроен (`tsconfig.json` присутствует)
- [ ] Зависимости зафиксированы в `frontend/package.json`

---

## EPIC 1.2: Настройка Backend-инфраструктуры

Цель: создать рабочий FastAPI-проект с health-check эндпоинтом.

---

### US 1.2.1 — Инициализация FastAPI проекта с health-check

**Как** разработчик,
**я хочу** чтобы бэкенд запускался командой `uvicorn main:app --reload` и отвечал на `/api/health`,
**чтобы** можно было верифицировать работоспособность сервера на любом окружении.

**Агент:** `[backend]`

Зависит от: нет

Acceptance criteria:
- [ ] `uvicorn main:app --reload` запускается без ошибок из `backend/`
- [ ] `GET /api/health` возвращает `{"status": "ok"}` и HTTP 200
- [ ] `backend/requirements.txt` содержит `fastapi` и `uvicorn[standard]`

---

## EPIC 1.3: Связность фронтенда и бэкенда

Цель: убедиться, что фронтенд обращается к API бэкенда без CORS-блокировок.

---

### US 1.3.1 — Настройка CORS и проверка связности через health-check

**Как** фронтенд-разработчик,
**я хочу** чтобы запросы из браузера (`http://localhost:5173`) к бэкенду (`http://localhost:8000`) проходили без CORS-ошибок,
**чтобы** начать разработку SearchForm в Sprint 3 без инфраструктурных блокировок.

**Агент:** `[backend]` + `[frontend]`

Зависит от: US 1.1.1, US 1.2.1

Acceptance criteria:
- [ ] FastAPI настроен с `CORSMiddleware`, разрешающим `http://localhost:5173`
- [ ] `vite.config.ts` содержит proxy: `/api` → `http://localhost:8000`
- [ ] В `App.tsx` при монтировании выполняется `fetch('/api/health')` и ответ логируется в консоль
- [ ] В Browser DevTools → Network запрос к `/api/health` возвращает статус 200, ошибок CORS нет
