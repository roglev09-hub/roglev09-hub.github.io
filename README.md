# Приглашение на свидание 💕

Статический сайт для телефона. Работает на **GitHub Pages** без сервера.

**Сайт:** https://roglev09-hub.github.io/

## Структура

```
index.html      — главная страница
css/style.css
js/config.js    — тексты и путь к фото
js/app.js
images/         — фото для экрана с посланием
```

## Публикация на GitHub Pages

1. Репозиторий: `roglev09-hub.github.io` (или любой, если URL будет `…/имя-репо/`)
2. В корне `main` лежат `index.html`, `css/`, `js/`, `images/`
3. Settings → Pages → Source: **Deploy from branch** → **main** → **/ (root)**
4. После push подожди 1–2 минуты и обнови сайт

Файл `.nojekyll` отключает Jekyll, чтобы GitHub отдавал сайт как есть.

## Локальный просмотр

```bash
python3 -m http.server 6543
```

Открыть: http://localhost:6543

## Настройка

Редактируй `js/config.js` — план дня, текст «Люблю тебя, ангелочек», путь к фото.
