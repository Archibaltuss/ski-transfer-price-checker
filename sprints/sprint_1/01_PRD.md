# ТЗ — Sprint 1: Инфраструктура

## 1. Контекст

Строим веб-приложение для расчёта стоимости трансфера до горнолыжных курортов. MVP-демо в нише Alps2Alps/Amitours, ссылка для портфолио: "Built in 1 day to validate demand in Alps transfer space". Пользователь вводит аэропорт, курорт, дату и количество пассажиров — получает мгновенную оценку цены без реального бронирования.

Sprint 1 закладывает инфраструктурный фундамент: два независимых проекта (frontend/backend) связаны через health-check и готовы к разработке бизнес-логики в Sprint 2.

## 2. Архитектура (ASCII)

```
Пользователь → [Frontend: React/Vite/TS :5173]
                     ↓ /api/* (Vite proxy)
              [Backend: FastAPI :8000]
                     ↓
              [JSON-файлы данных] ← Sprint 2
```

## 3. Что входит в спринт

- Создать Vite + TypeScript проект в `frontend/`
- Создать FastAPI проект в `backend/`
- Настроить `CORSMiddleware` на бэкенде (разрешить `http://localhost:5173`)
- Реализовать `GET /api/health` → `{"status": "ok"}`
- Настроить Vite proxy `/api` → `http://localhost:8000`
- Проверить связность: вызов `/api/health` с фронтенда без CORS-ошибок

## 4. Out of scope

- Логика расчёта цены, routes.json, pricing.json (Sprint 2)
- Компонент SearchForm, валидация (Sprint 3)
- ResultsPage, деплой на Vercel/Railway (Sprint 4)
- Реальное бронирование, оплата, авторизация, БД
