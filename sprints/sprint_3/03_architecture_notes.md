# Архитектурные заметки — Sprint 3

## Ключевые решения

| Решение | Обоснование |
|---------|------------|
| Один компонент `SearchForm.tsx` | Форма небольшая (4 поля), не оправдывает разбивки на атомарные компоненты |
| Фильтрация курортов на фронтенде | Данные уже загружены из `/api/routes`; дополнительный API-запрос избыточен |
| `onResult` prop вместо глобального state | Простейшее поднятие состояния вверх без Redux/Zustand — достаточно для MVP |
| Нет `react-hook-form` | Форма с 4 полями управляется через простой `useState` — overhead библиотеки не оправдан |
| `min` дата = сегодня на `<input type="date">` | Браузерная валидация без дополнительного кода |

## Frontend

### Интерфейс компонента

```typescript
interface SearchFormProps {
  onResult: (result: CalculateResponse) => void;
}

interface CalculateResponse {
  price_chf: number;
  route_name: string;
  distance_km: number;
  passengers: number;
  currency: string;
}
```

### Структура состояния

```typescript
// Данные формы
const [fromAirport, setFromAirport] = useState('');
const [toResort, setToResort] = useState('');
const [date, setDate] = useState('');
const [passengers, setPassengers] = useState(1);

// UI states
const [routes, setRoutes] = useState<Route[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Расположение файлов

```
frontend/src/
  components/
    SearchForm.tsx
  types/
    api.ts    ← CalculateResponse, Route интерфейсы
```
