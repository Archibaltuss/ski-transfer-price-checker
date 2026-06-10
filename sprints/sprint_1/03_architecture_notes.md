# Архитектурные заметки — Sprint 1

## Ключевые решения

| Решение | Обоснование |
|---------|------------|
| Vite как bundler | Быстрый HMR, нативная поддержка TypeScript, стандарт для React MVP |
| FastAPI для бэкенда | Быстрое прототипирование, автогенерация OpenAPI-документации, минимум бойлерплейта |
| Vite proxy `/api` → `:8000` | Упрощает локальную разработку: фронт обращается к `/api`, proxy перенаправляет на порт 8000, CORS не нужен для браузерных запросов через proxy |
| Отдельные папки `frontend/` и `backend/` | Чёткое разделение для независимого деплоя: Vercel (фронт) + Railway/Render (бэкенд) в Sprint 4 |
| Без БД | Концепт: данные хранятся в JSON-файлах, БД вне scope |

## Backend

### Новые модели / таблицы

Изменений схемы нет. Проект без БД (Out of scope по концепту).

### Новые методы / роуты

```
GET /api/health
  Response: {"status": "ok"}
  HTTP 200
```

## Frontend

Структура проекта после Sprint 1:

```
frontend/
  src/
    App.tsx       — корневой компонент, health-check при монтировании
    main.tsx      — точка входа
  index.html
  vite.config.ts  — proxy /api → http://localhost:8000
  tsconfig.json
  package.json
```

Proxy-конфигурация в `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```
