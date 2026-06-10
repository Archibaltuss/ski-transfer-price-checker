# Sprint 3 Issues — ski-transfer-price-checker

Дата: 2026-06-03
Источник: sprints/sprint_3/02_epics_user_stories.md

## Порядок выполнения: T1 || T2 → T3

| # | Issue | Агент | Файл | Зависит от |
|---|-------|-------|------|-----------|
| T1 | SearchForm: загрузка маршрутов и дропдауны | [frontend] | frontend/src/components/SearchForm.tsx | — |
| T2 | SearchForm: поля дата и пассажиры | [frontend] | frontend/src/components/SearchForm.tsx | — |
| T3 | SearchForm: валидация и сабмит | [frontend] | frontend/src/components/SearchForm.tsx | T1, T2 |

---

## T1: SearchForm — загрузка маршрутов и дропдауны — создать

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** создать

**Зависит от:** —

AC:
- [ ] При монтировании `SearchForm` выполняется `GET /api/routes`
- [ ] Дропдаун «Аэропорт» показывает уникальные аэропорты из ответа API (по `from_airport`)
- [ ] Дропдаун «Курорт» фильтруется: показывает только курорты, доступные из выбранного аэропорта
- [ ] Во время загрузки маршрутов дропдауны показывают состояние loading (disabled или placeholder "Loading...")

---

## T2: SearchForm — поля дата и пассажиры — изменить

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** изменить

**Зависит от:** —

AC:
- [ ] Поле «Дата» — `<input type="date">`, не принимает прошедшие даты (min = сегодня)
- [ ] Поле «Пассажиры» — `<input type="number">`, min=1, max=8
- [ ] Оба поля отображают сообщение об ошибке при невалидном вводе

---

## T3: SearchForm — валидация и сабмит — изменить

**Агент:** [frontend]
**Файл:** frontend/src/components/SearchForm.tsx
**Действие:** изменить

**Зависит от:** T1, T2

AC:
- [ ] Кнопка «Calculate» недоступна (disabled), если любое поле не заполнено или невалидно
- [ ] При клике по незаполненным полям показываются inline-сообщения об ошибках
- [ ] При успешной валидации выполняется `POST /api/calculate`
- [ ] Во время запроса кнопка показывает «Calculating...» и disabled
- [ ] При ошибке API (non-200) показывается сообщение об ошибке под формой
- [ ] При успехе вызывается prop `onResult(result)` с данными ответа API
