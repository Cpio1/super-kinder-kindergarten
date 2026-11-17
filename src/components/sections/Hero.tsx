"use client";

import Image from "next/image";
import { ArrowDown, MessageCircleHeart } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { heroPhoto } from "@/lib/media";
import { Balloon, Cloud, Flower, Heart, Rainbow, Sparkle, Star, Sun, Wave } from "@/components/decor/Shapes";
import { KindergartenScene } from "@/components/decor/Illustrations";

const KINDER = [
  ["K", "#ff6b6b"],
  ["i", "#ffa23c"],
  ["n", "#f2b100"],
  ["d", "#3fc27c"],
  ["e", "#38b6ff"],
  ["r", "#9b7bff"],
] as const;

const FACT_STYLES = [
  { bg: "bg-coral-soft", fg: "text-coral-deep", dot: "#ff6b6b", shape: "blob-a" },
  { bg: "bg-sky-soft", fg: "text-sky-deep", dot: "#38b6ff", shape: "blob-b" },
  { bg: "bg-leaf-soft", fg: "text-leaf-deep", dot: "#3fc27c", shape: "blob-c" },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#bfe9ff_0%,#e3f5ff_38%,#fff7e8_100%)] pt-[calc(var(--header-h)+env(safe-area-inset-top))]"
    >
      {/* ——— Декор фона ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="dotted-bg absolute inset-0 opacity-60" />
        <div className="absolute left-[-10%] top-[8%] w-[46%] animate-drift opacity-90 sm:w-[30%] lg:w-[22%]">
          <Cloud className="w-full" />
        </div>
        <div className="absolute right-[-6%] top-[44%] hidden w-[24%] animate-drift opacity-80 [animation-delay:-9s] lg:block">
          <Cloud className="w-full" />
        </div>
        <div className="absolute left-[38%] top-[3%] hidden w-[12%] animate-drift opacity-70 [animation-delay:-16s] md:block">
          <Cloud className="w-full" />
        </div>
        <Sun className="absolute right-2 top-[calc(var(--header-h)+6px)] w-16 sm:w-20 lg:right-[4%] lg:top-[calc(var(--header-h)+18px)] lg:w-28" />
        <Star className="absolute left-[6%] top-[calc(var(--header-h)+90px)] hidden w-6 animate-twinkle sm:block" />
        <Sparkle className="absolute right-[44%] top-[calc(var(--header-h)+30px)] hidden w-5 animate-twinkle [animation-delay:-1s] lg:block" />
        <Star className="absolute bottom-[22%] left-[46%] hidden w-5 animate-twinkle [animation-delay:-2s] lg:block" fill="#ff6b6b" />
        <Flower className="absolute bottom-[9%] left-[3%] hidden w-10 animate-sway lg:block" petal="#9b7bff" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pb-10 lg:pt-14">
        <div className="grid items-center gap-x-12 gap-y-7 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-[auto_auto_auto] lg:gap-y-8">
          {/* Текст */}
          <div className="relative z-10 lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-ink-soft shadow-[0_6px_18px_-10px_rgb(31_37_71/0.4)] backdrop-blur">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-leaf" />
              </span>
              {t.hero.badge}
            </span>

            <h1 id="hero-title" className="mt-5 font-extrabold text-ink">
              <span className="block text-[clamp(2.3rem,11vw,4.75rem)] leading-[1.02] tracking-tight">
                <span className="text-sky-deep">Super</span>{" "}
                <span className="whitespace-nowrap">
                  {KINDER.map(([ch, c], i) => (
                    <span key={i} style={{ color: c }} className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
              <span className="mt-2 block text-[clamp(1.4rem,6.2vw,2.5rem)] leading-[1.18]">
                — {t.hero.titleTail}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">{t.hero.subtitle}</p>
          </div>

          {/* Кнопки */}
          <div className="relative z-10 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap lg:col-start-1 lg:row-start-3">
            <a
              href="#contacts"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-coral px-7 text-[17px] font-extrabold text-white shadow-[0_12px_26px_-10px_rgb(226_71_79/0.8)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircleHeart className="size-5" />
              {t.hero.ctaContact}
            </a>
            <a
              href="#about"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-sky/40 bg-white px-7 text-[17px] font-extrabold text-sky-deep transition-colors hover:border-sky hover:bg-sky-pale"
            >
              {t.hero.ctaAbout}
              <ArrowDown className="size-5" />
            </a>
          </div>

          {/* Фото */}
          <div className="relative mx-auto w-full max-w-[min(100%,30rem)] px-3 pt-4 sm:px-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-none lg:px-4">
            <Rainbow className="absolute -top-2 left-1/2 w-[86%] -translate-x-1/2 opacity-90 sm:-top-4" />
            <div className="relative mt-[12%]">
              <div className={`${heroPhoto ? "rounded-[48px_48px_48px_20px]" : "blob-a"} absolute -inset-2.5 rotate-3 bg-sun sm:-inset-3.5`} aria-hidden />
              {/* С реальным фото контейнер повторяет пропорции снимка — ничего не обрезается */}
              <div
                className={`${heroPhoto ? "rounded-[44px_44px_44px_16px]" : "blob-a aspect-[1/1] sm:aspect-[5/4.4]"} relative overflow-hidden border-[6px] border-white bg-sky-soft shadow-[0_30px_60px_-30px_rgb(21_128_214/0.55)]`}
                style={heroPhoto ? { aspectRatio: `${heroPhoto.width} / ${heroPhoto.height}` } : undefined}
              >
                {heroPhoto ? (
                  <Image
                    src={heroPhoto.src}
                    alt={t.hero.photoAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 480px, 92vw"
                    className="object-cover"
                    quality={80}
                  />
                ) : (
                  <KindergartenScene className="size-full" />
                )}
              </div>

              {/* Наклейка */}
              <div className="absolute -bottom-3 left-0 z-10 max-w-[70%] -rotate-3 rounded-[20px] bg-white px-3.5 py-2.5 shadow-[0_14px_30px_-14px_rgb(31_37_71/0.45)] sm:-left-4 sm:px-4 sm:py-3">
                <span className="flex items-center gap-2 text-sm font-extrabold leading-tight text-ink sm:text-base">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-black text-leaf-deep">KZ</span>
                  {t.hero.sticker}
                </span>
              </div>
              <Heart className="absolute -right-1 top-[18%] w-7 animate-float sm:-right-3 sm:w-9" />
              <Star className="absolute -left-2 top-[6%] w-7 animate-twinkle sm:w-8" fill="#9b7bff" />
            </div>
            <Balloon className="absolute -right-1 top-[18%] hidden w-10 animate-float-slow sm:block lg:-right-6 lg:w-12" fill="#ff6b6b" />
            <Balloon className="absolute right-6 top-[24%] hidden w-8 animate-float [animation-delay:-2s] sm:block lg:right-0 lg:w-9" fill="#9b7bff" />
          </div>

          {/* Три характеристики */}
          <ul className="relative z-10 grid grid-cols-2 gap-2.5 min-[400px]:grid-cols-3 sm:gap-4 lg:col-start-1 lg:row-start-2">
            {t.hero.facts.map((f, i) => {
              const s = FACT_STYLES[i];
              return (
                <li
                  key={i}
                  className={`${s.bg} ${s.shape} ${i === 1 ? "order-first col-span-2 min-h-[84px] min-[400px]:order-none min-[400px]:col-span-1" : "min-h-[104px]"} flex flex-col items-center justify-center px-1.5 py-4 text-center shadow-[inset_0_-6px_0_rgb(31_37_71/0.05)] sm:min-h-[124px] sm:px-3`}
                >
                  <span className={`whitespace-nowrap font-display text-[1.35rem] font-extrabold leading-tight min-[400px]:text-[clamp(0.95rem,3.6vw,1.6rem)] ${s.fg}`}>
                    {f.value}
                  </span>
                  <span className="mt-1 text-[0.8rem] font-bold leading-tight text-ink-soft sm:text-sm">{f.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Wave fill="#fffdf7" variant={0} className="relative -mb-px" />
    </section>
  );
}
