import media from "@/generated/media.json";

export type MediaItem = { name: string; src: string; width: number; height: number };

type Manifest = {
  hero: MediaItem | null;
  about: MediaItem | null;
  video: { src: string; poster: string | null } | null;
  logo: MediaItem | null;
  gallery: MediaItem[];
};

const manifest = media as Manifest;

/** Главное фото: main-page.* (public/hero, public/ или public/gallery). */
export const heroPhoto = manifest.hero;
/** Фото раздела «Біз туралы»: main-page2.* (изображение). */
export const aboutPhoto = manifest.about;
/** Видео раздела «Біз туралы»: main-page2.(mp4|webm|mov). */
export const aboutVideo = manifest.video;
/** PNG-логотип: public/logo.png. */
export const logoImage = manifest.logo;
/** Фото галереи: все изображения из public/gallery (сортировка по имени). */
export const galleryPhotos = manifest.gallery;
