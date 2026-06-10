# Definition of Done — Sprint 1

## Backend

- [ ] `GET /api/health` возвращает `{"status": "ok"}` с HTTP 200
- [ ] `CORSMiddleware` настроен: разрешает `http://localhost:5173`
- [ ] `backend/requirements.txt` содержит `fastapi` и `uvicorn[standard]`
- [ ] Запуск `uvicorn main:app --reload` из `backend/` — без ошибок

## Frontend

- [ ] Проект инициализирован в `frontend/` с TypeScript (`tsconfig.json` присутствует)
- [ ] `npm run dev` запускает сервер без ошибок
- [ ] `npm run build` завершается без ошибок, генерирует `dist/`
- [ ] `vite.config.ts` содержит proxy: `/api` → `http://localhost:8000`
- [ ] `App.tsx` вызывает `fetch('/api/health')` при монтировании и логирует ответ в консоль

## Тестирование

- [ ] TC-1-01: dev-сервер фронтенда запускается на порту 5173
- [ ] TC-1-02: `npm run build` проходит без ошибок, `dist/` создана
- [ ] TC-1-03: `GET /api/health` возвращает HTTP 200 + `{"status": "ok"}`
- [ ] TC-1-04: вызов с фронтенда без CORS-ошибок (Browser DevTools → Network)

## Деплой

- [ ] Smoke-тест локально: Happy Path TC-1-04 проходит (оба сервера запущены, CORS ок)
