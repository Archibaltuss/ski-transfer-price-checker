# Sprint 3 Tasks — ski-transfer-price-checker

Источник: 02_epics_user_stories.md (US 3.1.1, 3.1.2, 3.1.3)

## Порядок выполнения: T1 → T2 → T3 → T4 → T5 → T6

| # | Задача | Агент | Файл | Зависит от |
|---|--------|-------|------|-----------|
| T1 | Создать TypeScript типы для API | [frontend] | frontend/src/types/api.ts | — |
| T2 | Создать SearchForm — скелет и GET /api/routes | [frontend] | frontend/src/components/SearchForm.tsx | T1 |
| T3 | Добавить фильтрацию курортов и loading state | [frontend] | frontend/src/components/SearchForm.tsx | T2 |
| T4 | Добавить поля date и passengers с валидацией | [frontend] | frontend/src/components/SearchForm.tsx | T2 |
| T5 | Добавить submit, POST /api/calculate, onResult и error state | [frontend] | frontend/src/components/SearchForm.tsx | T2, T3, T4 |
| T6 | Подключить SearchForm в App.tsx | [frontend] | frontend/src/App.tsx | T2 |

---

## T1: Создать TypeScript типы для API

**Агент:** [frontend]
**Файл:** frontend/src/types/api.ts
**Действие:** создать

AC:
- [ ] Экспортирует интерфейс `Route` с полями: `id`, `from_airport`, `from_name`, `to_resort`, `to_name`
- [ ] Экспортирует интерфейс `CalculateResponse` с полями: `price_chf`, `route_name`, `distance_km`, `passengers`, `currency`
- [ ] Файл компилируется без ошибок TypeScript

---

## T2: Создать SearchForm — скелет и GET /api/routes

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** создать

AC:
- [ ] Компонент принимает prop `onResult: (result: CalculateResponse) => void`
- [ ] При монтировании выполняется `GET /api/routes`
- [ ] Дропдаун «Аэропорт» показывает уникальные аэропорты из ответа API
- [ ] Во время загрузки маршрутов дропдауны disabled с placeholder «Loading...»

---

## T3: Добавить фильтрацию курортов и loading state

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** изменить

AC:
- [ ] Дропдаун «Курорт» показывает только курорты, доступные из выбранного аэропорта
- [ ] При смене аэропорта — дропдаун курорта сбрасывается

---

## T4: Добавить поля date и passengers с валидацией

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** изменить

AC:
- [ ] Поле «Дата» — `<input type="date">`, `min` = сегодня (нельзя выбрать прошлое)
- [ ] Поле «Пассажиры» — `<input type="number">`, min=1, max=8
- [ ] Каждое поле показывает inline-сообщение об ошибке при невалидном вводе

---

## T5: Добавить submit, POST /api/calculate, onResult и error state

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** изменить

AC:
- [ ] Кнопка «Calculate» disabled, если любое поле не заполнено или невалидно
- [ ] При клике выполняется `POST /api/calculate` с данными формы
- [ ] Во время запроса кнопка показывает «Calculating...» и disabled
- [ ] При ошибке API — inline сообщение об ошибке под формой, кнопка разблокируется
- [ ] При успехе — вызывается `onResult(result)`

---

## T6: Подключить SearchForm в App.tsx

**Агент:** [frontend]
**Файл:** frontend/src/App.tsx
**Действие:** изменить

AC:
- [ ] `SearchForm` импортирован и рендерится в `App.tsx`
- [ ] `onResult` prop передаётся (временно: `console.log(result)` до Sprint 4)
- [ ] `npm run build` проходит без ошибок
