import media from "@/generated/media.json";

export type MediaItem = { name: string; src: string; width: number; height: number };

type Manifest = {
  hero: MediaItem | null;
  video: { src: string; poster: string | null } | null;
  gallery: MediaItem[];
};

const manifest = media as Manifest;

/** Главное фото: public/hero/main-page.* или первый файл из public/hero. */
export const heroPhoto = manifest.hero;
/** Фото галереи: все изображения из public/gallery (сортировка по имени). */
export const galleryPhotos = manifest.gallery;
