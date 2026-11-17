"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { galleryPhotos, type MediaItem } from "@/lib/media";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Balloon, Heart, Rainbow, Star, Sun } from "@/components/decor/Shapes";

const INITIAL = 12;

function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: MediaItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const total = photos.length;
  const prev = useCallback(() => onIndex((index - 1 + total) % total), [index, total, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % total), [index, total, onIndex]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const photo = photos[index];
  const neighbours = total > 1 ? [photos[(index + 1) % total], photos[(index - 1 + total) % total]] : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.counter} ${index + 1} ${t.gallery.of} ${total}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#10142b]/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-[max(12px,env(safe-area-inset-top))] text-white sm:px-6">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold tabular-nums" aria-live="polite">
          {index + 1} {t.gallery.of} {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="grid size-12 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative size-full">
          <span aria-hidden className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <Image
            key={photo.src}
            src={photo.src}
            alt={`${t.gallery.photoAlt} — ${index + 1}`}
            fill
            sizes="100vw"
            quality={80}
            className="object-contain"
            priority
          />
        </div>
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={t.gallery.prev}
              className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-4 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lg sm:bottom-auto sm:left-5 sm:top-1/2 sm:size-14 sm:-translate-y-1/2"
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.gallery.next}
              className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] right-4 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lg sm:bottom-auto sm:right-5 sm:top-1/2 sm:size-14 sm:-translate-y-1/2"
            >
              <ChevronRight className="size-7" />
            </button>
          </>
        )}
      </div>
      {/* предзагрузка соседних фото */}
      <div className="hidden" aria-hidden>
        {neighbours.map((p) => (
          <Image key={p.src} src={p.src} alt="" width={p.width} height={p.height} sizes="100vw" quality={80} />
        ))}
      </div>
    </div>
  );
}

function EmptyGallery() {
  const { t } = useLang();
  const tiles = [
    { bg: "bg-sky-soft", shape: "blob-a", el: <Sun className="w-1/2" />, span: "row-span-2" },
    { bg: "bg-coral-soft", shape: "rounded-[32px]", el: <Heart className="w-1/3 animate-float" />, span: "" },
    { bg: "bg-leaf-soft", shape: "blob-c", el: <Rainbow className="w-2/3" />, span: "" },
    { bg: "bg-lav-soft", shape: "rounded-[32px]", el: <Balloon className="h-2/3 animate-float-slow" fill="#9b7bff" />, span: "row-span-2" },
    { bg: "bg-sun-soft", shape: "blob-b", el: <Star className="w-1/3 animate-twinkle" />, span: "" },
    { bg: "bg-sky-soft", shape: "rounded-[32px]", el: <Camera className="size-1/3 text-sky" strokeWidth={1.6} />, span: "" },
  ];
  return (
    <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div aria-hidden className="reveal grid auto-rows-[92px] grid-cols-3 gap-3 sm:auto-rows-[130px] sm:gap-4">
        {tiles.map((tile, i) => (
          <div key={i} className={`${tile.bg} ${tile.shape} ${tile.span} grid place-items-center overflow-hidden`}>
            {tile.el}
          </div>
        ))}
      </div>
      <div className="reveal rounded-[36px] bg-white p-6 text-center shadow-[0_24px_50px_-30px_rgb(31_37_71/0.45)] sm:p-8 lg:text-left">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-coral-soft text-coral lg:mx-0">
          <Camera className="size-8" aria-hidden />
        </span>
        <h3 className="mt-4 text-2xl font-extrabold text-ink">{t.gallery.emptyTitle}</h3>
        <p className="mt-2 leading-relaxed text-ink-soft">{t.gallery.emptyText}</p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#f9a03f,#e1306c,#9b4dff)] px-6 py-3 font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(225_48_108/0.8)]"
        >
          <InstagramIcon className="size-5" />
          {t.gallery.instagram}
        </a>
      </div>
    </div>
  );
}

export function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const photos = galleryPhotos;
  const visible = expanded ? photos : photos.slice(0, INITIAL);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-paper py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} color="#e2474f" />

        {photos.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            {/* Кладка без обрезки: фото сохраняют свои пропорции */}
            <ul className="mt-10 columns-2 gap-3 sm:mt-12 sm:gap-4 md:columns-3 xl:columns-4">
              {visible.map((p, i) => (
                <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setOpen(i);
                    }}
                    aria-label={`${t.gallery.openPhoto} ${i + 1}`}
                    className="group relative block w-full overflow-hidden rounded-[22px] bg-sky-soft shadow-[0_14px_30px_-22px_rgb(31_37_71/0.6)] sm:rounded-[28px]"
                  >
                    <Image
                      src={p.src}
                      alt={`${t.gallery.photoAlt} — ${i + 1}`}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1280px) 300px, (min-width: 768px) 32vw, 48vw"
                      quality={70}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {photos.length > INITIAL && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="inline-flex min-h-13 items-center gap-2 rounded-full bg-sky px-7 py-3 font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(21_128_214/0.8)]"
                >
                  {expanded ? t.gallery.showLess : `${t.gallery.showMore} (${photos.length - INITIAL})`}
                  {expanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {open !== null && photos.length > 0 && <Lightbox photos={photos} index={open} onClose={close} onIndex={setOpen} />}
    </section>
  );
}
