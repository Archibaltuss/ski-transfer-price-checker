# Архитектурные заметки — Sprint 4

## Ключевые решения

| Решение | Обоснование |
|---------|------------|
| `App.tsx` управляет `result` state | Поднятие состояния вверх: SearchForm и ResultsPage — братья-компоненты, App — общий родитель |
| Vercel rewrite `/api/*` → Railway | Фронтенд и бэкенд на разных доменах; rewrite позволяет фронту вызывать `/api/*` без CORS |
| `*.vercel.app` в CORS allowlist | Точный домен неизвестен заранее; wildcard покрывает preview и production деплои |
| Railway / Render вместо AWS/GCP | Бесплатный тир, деплой из папки, нет нужды в Docker для MVP |

## Backend

### Новые модели / таблицы

Изменений схемы нет.

### Изменения в существующих роутах

```
# main.py — обновить CORSMiddleware origins:
origins = [
    "http://localhost:5173",    # локальная разработка
    "https://*.vercel.app",     # продакшн Vercel
]
```

## Frontend

### Структура компонентов после Sprint 4

```
frontend/src/
  App.tsx                    ← управляет result: null | CalculateResponse
  components/
    SearchForm.tsx            ← Sprint 3
    ResultsPage.tsx           ← Sprint 4 (новый)
  types/
    api.ts
```

### vercel.json

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://<railway-url>/api/:path*" }
  ]
}
```

### App.tsx логика

```typescript
const [result, setResult] = useState<CalculateResponse | null>(null);

return result
  ? <ResultsPage result={result} onBack={() => setResult(null)} />
  : <SearchForm onResult={setResult} />;
```
