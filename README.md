# «Super kinder» балабақшасы — лендинг

Next.js (App Router) + TypeScript + Tailwind CSS. Языки: KZ (по умолчанию) / RU.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production-сборка
```

## Фотографии
- **Главное фото** первого экрана: положите файл `public/hero/main-page.jpg` (или любой файл в `public/hero/`).
  Пока его нет — показывается иллюстрация.
- **Галерея**: положите фото в `public/gallery/` (jpg, png, webp, avif). Порядок — по имени файла.
  Пока папка пуста — показывается заглушка со ссылкой на Instagram.

Список фото и их размеры собираются автоматически (`scripts/media-manifest.mjs`) перед `dev` и `build`.

## Документы
Положите файлы в `public/documents/` и добавьте их в `src/lib/documents.ts` (пример — в комментарии файла).

## Контакты и тексты
- Контакты: `src/lib/site.ts`
- Тексты: `src/lib/i18n/kk.ts` и `src/lib/i18n/ru.ts`

## Vercel
Укажите переменную `NEXT_PUBLIC_SITE_URL` (адрес сайта) для корректных canonical/OG/sitemap.
