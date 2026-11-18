"use client";

import Image from "next/image";
import { ArrowDown, MessageCircleHeart } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { heroPhoto } from "@/lib/media";
import { Balloon, Cloud, Flower, Heart, Rainbow, Sparkle, Star, Sun, Wave } from "@/components/decor/Shapes";
import { KindergartenScene } from "@/components/decor/Illustrations";

const KINDER = [
  ["K", "#7B2CBF"],
  ["i", "#9D4EDD"],
  ["n", "#7B2CBF"],
  ["d", "#9D4EDD"],
  ["e", "#7B2CBF"],
  ["r", "#9D4EDD"],
] as const;

const FACT_STYLES = [
  { bg: "bg-sun-soft", fg: "text-lav-deep", dot: "#9D4EDD", shape: "blob-a" },
  { bg: "bg-sky-soft", fg: "text-sky-deep", dot: "#7B2CBF", shape: "blob-b" },
  { bg: "bg-sun", fg: "text-ink", dot: "#F5C400", shape: "blob-c" },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(170deg,#E9D5FF_0%,#F3E8FF_42%,#FFF4B8_100%)] pt-[calc(var(--header-h)+env(safe-area-inset-top))]"
    >
      {/* ——— Декор фона ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="dotted-bg absolute inset-0 opacity-60" />
        {/* Крупные мягкие пятна фирменных цветов */}
        <div className="blob-a absolute -left-24 top-[30%] size-64 bg-[#D9B8FF]/60 sm:size-80 lg:-left-32 lg:size-[26rem]" />
        <div className="blob-c absolute -bottom-24 right-[-10%] size-72 bg-sun/50 sm:size-96 lg:right-[-4%] lg:size-[30rem]" />
        <svg viewBox="0 0 300 40" className="absolute left-[30%] top-[calc(var(--header-h)+10px)] hidden w-40 opacity-70 lg:block">
          <path d="M2 20c25-24 50-24 75 0s50 24 75 0 50-24 75 0 50 24 71 0" stroke="#FFD93D" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
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
        <Star className="absolute bottom-[22%] left-[46%] hidden w-5 animate-twinkle [animation-delay:-2s] lg:block" fill="#9D4EDD" />
        <Flower className="absolute bottom-[9%] left-[3%] hidden w-10 animate-sway lg:block" petal="#9D4EDD" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pb-[2vh] lg:pt-[clamp(0.75rem,3.5vh,3rem)]">
        <div className="grid items-center gap-x-12 gap-y-6 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-[auto_auto_auto] lg:gap-y-[2.6vh]">
          {/* Текст */}
          <div className="relative z-10 lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-ink-soft shadow-[0_6px_18px_-10px_rgb(57_32_92/0.4)] backdrop-blur">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-leaf" />
              </span>
              {t.hero.badge}
            </span>

            <h1 id="hero-title" className="mt-4 font-extrabold text-ink lg:mt-[2vh]">
              <span className="block text-[clamp(2.3rem,11vw,4.75rem)] leading-[1.02] lg:text-[clamp(3rem,8vh,4.75rem)] tracking-tight">
                <span className="text-sky-deep">Super</span>{" "}
                {/* «Kinder» на жёлтой маркерной подложке */}
                <span className="relative isolate whitespace-nowrap">
                  <span aria-hidden className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-10 h-[0.42em] -rotate-1 rounded-full bg-sun" />
                  {KINDER.map(([ch, c], i) => (
                    <span key={i} style={{ color: c }} className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
              <span className="mt-2 block text-[clamp(1.4rem,6.2vw,2.5rem)] leading-[1.18] lg:text-[clamp(1.6rem,4.2vh,2.5rem)]">
                — {t.hero.titleTail}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[1.05rem] lg:mt-[2vh] leading-relaxed text-ink-soft sm:text-lg">{t.hero.subtitle}</p>
          </div>

          {/* Кнопки */}
          <div className="relative z-10 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap lg:col-start-1 lg:row-start-3">
            <a
              href="#contacts"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-lav px-7 text-[17px] font-extrabold text-white ring-4 ring-sun/70 shadow-[0_12px_26px_-10px_rgb(123_44_191/0.8)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircleHeart className="size-5" />
              {t.hero.ctaContact}
            </a>
            <a
              href="#about"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-sun bg-sun-soft px-7 text-[17px] font-extrabold text-ink transition-colors hover:bg-sun"
            >
              {t.hero.ctaAbout}
              <ArrowDown className="size-5" />
            </a>
          </div>

          {/* Фото */}
          <div className="relative mx-auto w-full max-w-[min(100%,19rem)] px-3 pt-2 sm:max-w-[min(100%,24rem)] sm:px-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-[min(100%,54vh)] lg:px-4">
            <Rainbow className="absolute -top-2 left-1/2 w-[86%] -translate-x-1/2 opacity-90 sm:-top-4" />
            <div className="relative mt-[12%]">
              <div className={`${heroPhoto ? "rounded-[48px_48px_48px_20px]" : "blob-a"} absolute -inset-2.5 rotate-3 bg-sun sm:-inset-3.5`} aria-hidden />
              {/* С реальным фото контейнер повторяет пропорции снимка — ничего не обрезается */}
              <div
                className={`${heroPhoto ? "rounded-[44px_44px_44px_16px]" : "blob-a aspect-[1/1] sm:aspect-[5/4.4]"} relative overflow-hidden border-[6px] border-white bg-sky-soft shadow-[0_30px_60px_-30px_rgb(123_44_191/0.55)]`}
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
              <div className="absolute -bottom-3 left-0 z-10 max-w-[70%] -rotate-3 rounded-[20px] bg-white px-3.5 py-2.5 shadow-[0_14px_30px_-14px_rgb(57_32_92/0.45)] sm:-left-4 sm:px-4 sm:py-3">
                <span className="flex items-center gap-2 text-sm font-extrabold leading-tight text-ink sm:text-base">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-black text-leaf-deep">KZ</span>
                  {t.hero.sticker}
                </span>
              </div>
              <Heart className="absolute -right-3 top-[2%] w-6 animate-float sm:-right-6 sm:w-8" fill="#9D4EDD" />
              <Star className="absolute -left-3 -top-6 w-6 animate-twinkle sm:-left-6 sm:w-8" fill="#FFD93D" />
            </div>
            <Balloon className="absolute -right-1 top-[18%] hidden w-10 animate-float-slow sm:block lg:-right-6 lg:w-12" fill="#9D4EDD" />
            <Balloon className="absolute right-6 top-[24%] hidden w-8 animate-float [animation-delay:-2s] sm:block lg:right-0 lg:w-9" fill="#9D4EDD" />
          </div>

          {/* Три характеристики */}
          <ul className="relative z-10 grid grid-cols-2 gap-2.5 min-[400px]:grid-cols-3 sm:gap-4 lg:col-start-1 lg:row-start-2">
            {t.hero.facts.map((f, i) => {
              const s = FACT_STYLES[i];
              return (
                <li
                  key={i}
                  className={`${s.bg} ${s.shape} ${i === 1 ? "order-first col-span-2 min-h-[72px] min-[400px]:order-none min-[400px]:col-span-1" : "min-h-[92px]"} flex flex-col items-center justify-center px-1.5 py-3 text-center shadow-[inset_0_-6px_0_rgb(57_32_92/0.05)] sm:min-h-[110px] sm:px-3 lg:min-h-[clamp(84px,12vh,124px)]`}
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

      <Wave fill="#FFFFFF" variant={0} className="relative -mb-px" />
    </section>
  );
}
