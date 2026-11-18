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

type Placed = MediaItem & { index: number; ratio: number };

/**
 * «Ровные ряды»: фото в ряду одной высоты, ширина пропорциональна формату снимка.
 * Ничего не обрезается и не растягивается — контейнер повторяет пропорции фото.
 * Неполный последний ряд не растягивается на всю ширину.
 */
function makeRows(items: Placed[], target: number) {
  const rows: { items: Placed[]; fill: number }[] = [];
  let cur: Placed[] = [];
  let sum = 0;
  for (const it of items) {
    cur.push(it);
    sum += it.ratio;
    if (sum >= target) {
      rows.push({ items: cur, fill: 1 });
      cur = [];
      sum = 0;
    }
  }
  if (cur.length) rows.push({ items: cur, fill: Math.min(1, sum / target) });
  return rows;
}

const RADII = [
  "rounded-[26px_26px_26px_10px]",
  "rounded-[10px_26px_26px_26px]",
  "rounded-[26px_10px_26px_26px]",
  "rounded-[26px_26px_10px_26px]",
];

function Tile({ p, sizes, onOpen, label, alt }: { p: Placed; sizes: string; onOpen: (i: number, el: HTMLButtonElement) => void; label: string; alt: string }) {
  const radius = RADII[p.index % RADII.length];
  return (
    <div className="relative" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
      {/* цветная «подложка»-тень: жёлтая и фиолетовая по очереди */}
      <span aria-hidden className={`absolute inset-0 translate-x-1.5 translate-y-1.5 ${radius} ${p.index % 2 ? "bg-sky-soft" : "bg-sun"}`} />
      <button
        type="button"
        onClick={(e) => onOpen(p.index, e.currentTarget)}
        aria-label={label}
        className={`group absolute inset-0 overflow-hidden ${radius} bg-sky-pale ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1`}
      >
        <Image src={p.src} alt={alt} fill sizes={sizes} quality={70} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-white/95 text-lav-deep opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>
      </button>
    </div>
  );
}

function Rows({ rows, gap, sizes, onOpen, t }: { rows: ReturnType<typeof makeRows>; gap: string; sizes: string; onOpen: (i: number, el: HTMLButtonElement) => void; t: ReturnType<typeof useLang>["t"] }) {
  return (
    <ul className={`grid ${gap}`}>
      {rows.map((row, r) => (
        <li key={r} className={`reveal flex ${gap}`} style={{ width: `${row.fill * 100}%`, "--d": `${r * 90}ms` } as React.CSSProperties}>
          {row.items.map((p) => (
            <div key={p.src} className="min-w-0" style={{ flex: `${p.ratio} 1 0%` }}>
              <Tile p={p} sizes={sizes} onOpen={onOpen} label={`${t.gallery.openPhoto} ${p.index + 1}`} alt={`${t.gallery.photoAlt} — ${p.index + 1}`} />
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}

/** Телефон: горизонтальная лента со свайпом и счётчиком. */
function MobileStrip({ photos, onOpen }: { photos: Placed[]; onOpen: (i: number, el: HTMLButtonElement) => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLUListElement>(null);
  const [cur, setCur] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const n = c as HTMLElement;
      const d = Math.abs(n.offsetLeft + n.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setCur(best);
  };
  const go = (i: number) => {
    const el = ref.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const H = "min(48svh, 400px)";
  return (
    <div className="mt-6 sm:hidden">
      <ul ref={ref} onScroll={onScroll} className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-3 pt-1">
        {photos.map((p) => (
          <li
            key={p.src}
            className="shrink-0 snap-center"
            style={{ width: `min(calc(${H} * ${p.ratio.toFixed(4)}), calc(100vw - 3.5rem))` }}
          >
            <Tile p={p} sizes="86vw" onOpen={onOpen} label={`${t.gallery.openPhoto} ${p.index + 1}`} alt={`${t.gallery.photoAlt} — ${p.index + 1}`} />
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => go(Math.max(0, cur - 1))} disabled={cur === 0} aria-label={t.gallery.prev} className="grid size-11 place-items-center rounded-full bg-sun text-ink shadow-sm disabled:opacity-40">
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex flex-wrap items-center justify-center gap-1.5" aria-hidden>
          {photos.map((p, i) => (
            <span key={p.src} className={`h-2 rounded-full transition-all ${i === cur ? "w-6 bg-lav" : "w-2 bg-lav-soft"}`} />
          ))}
        </div>
        <button type="button" onClick={() => go(Math.min(photos.length - 1, cur + 1))} disabled={cur === photos.length - 1} aria-label={t.gallery.next} className="grid size-11 place-items-center rounded-full bg-sun text-ink shadow-sm disabled:opacity-40">
          <ChevronRight className="size-6" />
        </button>
      </div>
      <p className="mt-2 text-center text-sm font-bold tabular-nums text-ink-soft" aria-live="polite">
        {cur + 1} {t.gallery.of} {photos.length}
      </p>
    </div>
  );
}

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
      className="fixed inset-0 z-[100] flex flex-col bg-[#1E0F33]/95 backdrop-blur-sm"
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
    { bg: "bg-lav-soft", shape: "rounded-[32px]", el: <Balloon className="h-2/3 animate-float-slow" fill="#9D4EDD" />, span: "row-span-2" },
    { bg: "bg-sun-soft", shape: "blob-b", el: <Star className="w-1/3 animate-twinkle" />, span: "" },
    { bg: "bg-sky-soft", shape: "rounded-[32px]", el: <Camera className="size-1/3 text-sky" strokeWidth={1.6} />, span: "" },
  ];
  return (
    <div className="mt-6 grid items-center gap-6 lg:mt-[4vh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div aria-hidden className="reveal grid auto-rows-[70px] grid-cols-3 gap-2.5 sm:auto-rows-[110px] sm:gap-4 lg:auto-rows-[clamp(80px,12vh,130px)]">
        {tiles.map((tile, i) => (
          <div key={i} className={`${tile.bg} ${tile.shape} ${tile.span} grid place-items-center overflow-hidden`}>
            {tile.el}
          </div>
        ))}
      </div>
      <div className="reveal rounded-[36px] bg-white p-5 text-center shadow-[0_24px_50px_-30px_rgb(57_32_92/0.45)] sm:p-8 lg:text-left">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-coral-soft text-coral lg:mx-0">
          <Camera className="size-8" aria-hidden />
        </span>
        <h3 className="mt-4 text-2xl font-extrabold text-ink">{t.gallery.emptyTitle}</h3>
        <p className="mt-2 leading-relaxed text-ink-soft">{t.gallery.emptyText}</p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-lav px-6 py-3 font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(123_44_191/0.8)]"
        >
          <InstagramIcon className="size-5" />
          {t.gallery.instagram}
        </a>
      </div>
    </div>
  );
}

/** Сколько рядов показывать до кнопки «Тағы көрсету». */
const ROWS_DESKTOP = 2;
const ROWS_TABLET = 3;

export function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const photos = galleryPhotos;
  const placed: Placed[] = photos.map((p, index) => ({ ...p, index, ratio: p.width / p.height }));
  const desktopRows = makeRows(placed, 4.4);
  const tabletRows = makeRows(placed, 3);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const onOpen = useCallback((i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setOpen(i);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  const moreDesktop = desktopRows.length > ROWS_DESKTOP;
  const moreTablet = tabletRows.length > ROWS_TABLET;
  const hiddenDesktop = desktopRows.slice(ROWS_DESKTOP).reduce((n, r) => n + r.items.length, 0);
  const hiddenTablet = tabletRows.slice(ROWS_TABLET).reduce((n, r) => n + r.items.length, 0);

  const moreButton = (count: number, cls: string) => (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className={`min-h-12 items-center gap-2 rounded-full bg-lav px-6 py-2.5 font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(123_44_191/0.8)] ${cls}`}
    >
      {expanded ? t.gallery.showLess : `${t.gallery.showMore} (${count})`}
      {expanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
    </button>
  );

  if (photos.length === 0) {
    return (
      <section id="gallery" aria-labelledby="gallery-title" className="relative bg-paper py-10 sm:py-14 lg:py-[clamp(1.75rem,5vh,4rem)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} color="#7B2CBF" />
          <EmptyGallery />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden bg-paper py-10 sm:py-14 lg:py-[clamp(1.75rem,5vh,4rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Star className="absolute left-[3%] top-8 hidden w-6 animate-twinkle lg:block" fill="#FFD93D" />
        <Heart className="absolute bottom-6 left-[20%] hidden w-6 animate-float lg:block" fill="#9D4EDD" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
        <div>
          <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} color="#7B2CBF" align="left" />
          {moreDesktop && <div className="mt-6 hidden lg:block">{moreButton(hiddenDesktop, "inline-flex")}</div>}
        </div>

        <div className="min-w-0">
          {/* Телефон */}
          <MobileStrip photos={placed} onOpen={onOpen} />

          {/* Планшет */}
          <div className="hidden sm:block lg:hidden">
            <Rows rows={expanded ? tabletRows : tabletRows.slice(0, ROWS_TABLET)} gap="gap-4" sizes="(min-width: 640px) 40vw, 90vw" onOpen={onOpen} t={t} />
            {moreTablet && <div className="mt-8 text-center">{moreButton(hiddenTablet, "inline-flex")}</div>}
          </div>

          {/* Ноутбук и десктоп */}
          <div className="hidden lg:block">
            <Rows rows={expanded ? desktopRows : desktopRows.slice(0, ROWS_DESKTOP)} gap="gap-4" sizes="(min-width: 1280px) 300px, 24vw" onOpen={onOpen} t={t} />
          </div>
        </div>
      </div>

      {open !== null && <Lightbox photos={photos} index={open} onClose={close} onIndex={setOpen} />}
    </section>
  );
}
