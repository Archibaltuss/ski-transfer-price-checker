# Деплой — Railway + Vercel

## Шаг 1 — GitHub

```bash
git init
git add .
git commit -m "feat: ski transfer price checker"
```

Создай репозиторий на github.com → New repository, затем:

```bash
git remote add origin https://github.com/ТВО_ИМЯ/ski-transfer-price-checker.git
git push -u origin main
```

---

## Шаг 2 — Бэкенд на Railway

1. railway.app → New Project → Deploy from GitHub repo
2. Выбери репозиторий → **Root Directory: `backend`**
3. Railway прочитает `Procfile` и запустит сервер автоматически
4. Скопируй URL: `https://ski-transfer-xxx.up.railway.app`

---

## Шаг 3 — Подключить фронтенд к бэкенду

В `frontend/vercel.json` замени плейсхолдер на реальный Railway URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://ski-transfer-xxx.up.railway.app/api/:path*"
    }
  ]
}
```

```bash
git add frontend/vercel.json
git commit -m "chore: set railway backend url"
git push
```

---

## Шаг 4 — Фронтенд на Vercel

1. vercel.com → New Project → импортируй репозиторий
2. **Root Directory: `frontend`**
3. Deploy
4. Скопируй URL: `https://ski-transfer-xxx.vercel.app`

---

## Шаг 5 — CORS на Railway

Railway → твой проект → Variables → добавь:

```
CORS_ORIGINS = https://ski-transfer-xxx.vercel.app
```

---

## Notion

Вставь Vercel URL через команду `/embed` для живого превью, или просто кнопку со ссылкой.
