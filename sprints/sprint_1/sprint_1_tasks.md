# Sprint 1 Tasks — ski-transfer-price-checker

Источник: 02_epics_user_stories.md (US 1.1.1, 1.2.1, 1.3.1)

## Порядок выполнения: T1 → T2 → T3 → T4 → T5

| # | Задача | Агент | Файл | Зависит от |
|---|--------|-------|------|-----------|
| T1 | Инициализировать Vite + TypeScript проект | [frontend] | frontend/ (структура) | — |
| T2 | Создать requirements.txt | [backend] | backend/requirements.txt | — |
| T3 | Создать FastAPI app с GET /api/health и CORSMiddleware | [backend] | backend/main.py | T2 |
| T4 | Настроить Vite proxy /api → localhost:8000 | [frontend] | frontend/vite.config.ts | T1 |
| T5 | Добавить fetch /api/health при монтировании App | [frontend] | frontend/src/App.tsx | T1, T4 |

---

## T1: Инициализировать Vite + TypeScript проект

**Агент:** [frontend]
**Файл:** frontend/ (package.json, vite.config.ts, tsconfig.json, src/main.tsx, src/App.tsx, index.html)
**Действие:** создать через `npm create vite@latest frontend -- --template react-ts`

AC:
- [ ] `npm run dev` запускает dev-сервер на порту 5173 без ошибок
- [ ] `npm run build` завершается с кодом 0, генерирует `frontend/dist/`
- [ ] `tsconfig.json` присутствует
- [ ] Зависимости зафиксированы в `frontend/package.json`

---

## T2: Создать requirements.txt

**Агент:** [backend]
**Файл:** backend/requirements.txt
**Действие:** создать

AC:
- [ ] Файл содержит `fastapi` и `uvicorn[standard]`
- [ ] `pip install -r requirements.txt` выполняется без ошибок

---

## T3: Создать FastAPI app с GET /api/health и CORSMiddleware

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** создать

AC:
- [ ] `uvicorn main:app --reload` запускается без ошибок из `backend/`
- [ ] `GET /api/health` возвращает `{"status": "ok"}` и HTTP 200
- [ ] `CORSMiddleware` настроен: разрешает `http://localhost:5173`

---

## T4: Настроить Vite proxy /api → localhost:8000

**Агент:** [frontend]
**Файл:** frontend/vite.config.ts
**Действие:** изменить

AC:
- [ ] `vite.config.ts` содержит `server.proxy: { '/api': 'http://localhost:8000' }`
- [ ] `npm run dev` запускается без ошибок после изменения

---

## T5: Добавить fetch /api/health при монтировании App

**Агент:** [frontend]
**Файл:** frontend/src/App.tsx
**Действие:** изменить

AC:
- [ ] `useEffect` или аналог вызывает `fetch('/api/health')` при монтировании
- [ ] Ответ логируется в `console.log`
- [ ] В Browser DevTools → Network запрос к `/api/health` возвращает 200, ошибок CORS нет
