/**
 * Подтверждённые данные детского сада «Super kinder».
 * Все кнопки, ссылки и SEO берут данные только отсюда.
 */
const address2gisQuery = "Алматы, Нұр-Алатау, Таңжарық көшесі, 14";

export const site = {
  name: "Super Kinder",
  phone: { display: "+7 778 985 97 96", href: "tel:+77789859796" },
  whatsappUrl: "https://wa.me/77789859796",
  hours: "08:00–18:30",
  instagramUrl: "https://www.instagram.com/invites/contact/?utm_content=n07vjvm&dlrf=17nqur8dsyv4e",
  instagramHandle: "Superkinder_ balabakhasi",
  twoGisUrl: `https://2gis.kz/almaty/search/${encodeURIComponent(address2gisQuery)}`,
  groups: 3,
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://super-kinder.vercel.app").replace(/\/$/, "");
