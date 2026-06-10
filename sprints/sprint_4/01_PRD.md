# ТЗ — Sprint 4: Страница результатов + деплой

## 1. Контекст

Форма поиска готова (Sprint 3). Sprint 4 замыкает user journey: показывает результат расчёта на экране и выкладывает приложение в продакшн. Компонент `ResultsPage` принимает данные от `SearchForm` через `App.tsx` и отображает цену, описание маршрута и CTA-кнопку «Get a real quote». После деплоя ссылка публикуется в портфолио — это главная цель всего MVP.

## 2. Архитектура (ASCII)

```
[App.tsx]  ← управляет state: null | CalculateResponse
  ├── <SearchForm onResult={setResult} />   (Sprint 3)
  └── result !== null → <ResultsPage result={result} onBack={() => setResult(null)} />

Деплой:
  [Vercel]   ← frontend/dist/ (npm run build → автодеплой из GitHub)
  [Railway]  ← backend/ (uvicorn main:app, env PORT)
  Vercel rewrites /api/* → Railway URL
```

## 3. Что входит в спринт

- Компонент `ResultsPage` с отображением: цена в CHF, название маршрута, расстояние, кол-во пассажиров
- CTA-кнопка «Get a real quote» (внешняя ссылка или mailto)
- Кнопка «← Back» возвращает к форме поиска
- Деплой фронтенда на Vercel
- Деплой бэкенда на Railway или Render
- Настройка Vercel rewrites `/api/*` → URL бэкенда
- Публичная ссылка в портфолио (Notion)

## 4. Out of scope

- Реальное бронирование, форма заявки, оплата
- Email-нотификации, авторизация
- Аналитика, A/B тесты
- Мультиязычность
