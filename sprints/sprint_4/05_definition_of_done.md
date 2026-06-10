# Definition of Done — Sprint 4

## Backend

- [ ] `CORSMiddleware` обновлён: разрешены `http://localhost:5173` и `https://*.vercel.app`
- [ ] Команда запуска для продакшн: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] `backend/requirements.txt` актуален
- [ ] `GET {BACKEND_URL}/api/health` возвращает HTTP 200 из интернета (Railway/Render)

## Frontend

- [ ] Компонент `ResultsPage.tsx` создан в `frontend/src/components/`
- [ ] Отображает: `price_chf` (формат «CHF X.XX»), `route_name`, `distance_km`, `passengers`
- [ ] CTA-кнопка «Get a real quote» открывает ссылку в новой вкладке (`target="_blank"`)
- [ ] Кнопка «← Back» вызывает `onBack` prop
- [ ] `App.tsx` управляет переключением SearchForm ↔ ResultsPage через `result` state
- [ ] `vercel.json` создан с rewrite `/api/*` → Railway/Render URL
- [ ] `npm run build` проходит без ошибок

## Тестирование

- [ ] TC-4-01: ResultsPage отображает все поля корректно
- [ ] TC-4-02: кнопка «← Back» возвращает к SearchForm
- [ ] TC-4-03: CTA открывает новую вкладку
- [ ] TC-4-04: `/api/health` и `/api/routes` доступны из интернета на Railway/Render
- [ ] TC-4-05: E2E на Vercel — форма → расчёт → ResultsPage без ошибок CORS

## Деплой

- [ ] Фронтенд задеплоен на Vercel, публичный URL работает
- [ ] Бэкенд задеплоен на Railway или Render, `PORT` из env переменной
- [ ] Ссылка добавлена в портфолио (Notion)
- [ ] Smoke-тест TC-4-05 на продакшн-URL пройден
