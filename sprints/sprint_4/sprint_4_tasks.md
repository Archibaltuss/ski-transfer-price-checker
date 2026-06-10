# Sprint 4 Tasks — ski-transfer-price-checker

Источник: 02_epics_user_stories.md (US 4.1.1, 4.1.2, 4.2.1, 4.2.2)

## Порядок выполнения: T1 → T2 → T3 → T4 → T5 → T6 → T7

| # | Задача | Агент | Файл | Зависит от |
|---|--------|-------|------|-----------|
| T1 | Создать ResultsPage — отображение цены и маршрута | [frontend] | frontend/src/components/ResultsPage.tsx | — |
| T2 | Добавить CTA "Get a real quote" в ResultsPage | [frontend] | frontend/src/components/ResultsPage.tsx | T1 |
| T3 | Обновить App.tsx — переключение SearchForm ↔ ResultsPage | [frontend] | frontend/src/App.tsx | T1 |
| T4 | Обновить CORS в backend/main.py — добавить *.vercel.app | [backend] | backend/main.py | — |
| T5 | Задеплоить backend на Railway/Render | [backend] | — (деплой) | T4 |
| T6 | Создать vercel.json с rewrite /api/* → Railway URL | [frontend] | frontend/vercel.json | T5 |
| T7 | Задеплоить frontend на Vercel и проверить E2E | [frontend] | — (деплой) | T3, T6 |

---

## T1: Создать ResultsPage — отображение цены и маршрута

**Агент:** [frontend]
**Файл:** frontend/src/components/ResultsPage.tsx
**Действие:** создать

AC:
- [ ] Компонент принимает props: `result: CalculateResponse` и `onBack: () => void`
- [ ] Отображает `price_chf` в формате «CHF X.XX»
- [ ] Отображает `route_name`, `distance_km`, `passengers`
- [ ] Кнопка «← Back» вызывает `onBack()`

---

## T2: Добавить CTA "Get a real quote" в ResultsPage

**Агент:** [frontend]
**Файл:** frontend/src/components/ResultsPage.tsx
**Действие:** изменить

AC:
- [ ] Кнопка «Get a real quote» присутствует ниже результатов
- [ ] Открывает внешнюю ссылку или `mailto:` в новой вкладке (`target="_blank"`, `rel="noopener"`)
- [ ] Визуально выделена как основной CTA

---

## T3: Обновить App.tsx — переключение SearchForm ↔ ResultsPage

**Агент:** [frontend]
**Файл:** frontend/src/App.tsx
**Действие:** изменить

AC:
- [ ] `App.tsx` управляет `result: CalculateResponse | null` через `useState`
- [ ] При `result === null` рендерится `<SearchForm onResult={setResult} />`
- [ ] При `result !== null` рендерится `<ResultsPage result={result} onBack={() => setResult(null)} />`
- [ ] `npm run build` проходит без ошибок

---

## T4: Обновить CORS — добавить *.vercel.app

**Агент:** [backend]
**Файл:** backend/main.py
**Действие:** изменить

AC:
- [ ] `CORSMiddleware` разрешает `http://localhost:5173` и `https://*.vercel.app`
- [ ] Бэкенд запускается без ошибок после изменения

---

## T5: Задеплоить backend на Railway/Render

**Агент:** [backend]
**Файл:** — (конфигурация деплоя в Railway/Render UI)
**Действие:** задеплоить

AC:
- [ ] Бэкенд задеплоен из папки `backend/`
- [ ] Команда запуска: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] `GET {BACKEND_URL}/api/health` возвращает HTTP 200 из интернета
- [ ] `backend/requirements.txt` актуален перед деплоем

---

## T6: Создать vercel.json с rewrite /api/* → Railway URL

**Агент:** [frontend]
**Файл:** frontend/vercel.json
**Действие:** создать

AC:
- [ ] `vercel.json` содержит rewrite: `"/api/:path*"` → `"https://{BACKEND_URL}/api/:path*"`
- [ ] `{BACKEND_URL}` заменён реальным URL Railway/Render из T5

---

## T7: Задеплоить frontend на Vercel и проверить E2E

**Агент:** [frontend]
**Файл:** — (конфигурация деплоя в Vercel UI)
**Действие:** задеплоить и проверить

AC:
- [ ] Репозиторий подключён к Vercel, деплой срабатывает на push в main
- [ ] Публичный URL Vercel открывается, форма отображается
- [ ] E2E: форма заполнена → POST /api/calculate → ResultsPage с ценой (нет CORS-ошибок)
- [ ] Ссылка добавлена в портфолио (Notion)
