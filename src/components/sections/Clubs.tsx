"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cloud, Flower, Sparkle, Star, Wave } from "@/components/decor/Shapes";
import { LegoArt, PaletteArt, SandArt, SpeechArt } from "@/components/decor/Illustrations";

type CardStyle = {
  Art: (p: { className?: string }) => React.ReactElement;
  art: string;
  shape: string;
  tag: string;
  accent: string;
  pattern: React.CSSProperties;
  tilt: string;
};

const CARDS: CardStyle[] = [
  {
    Art: SpeechArt,
    art: "bg-[linear-gradient(160deg,#5cc4ff,#1f95e8)]",
    shape: "rounded-[48px_48px_48px_14px]",
    tag: "bg-sky-soft text-sky-deep",
    accent: "#1580d6",
    pattern: { backgroundImage: "radial-gradient(rgb(255 255 255 / .22) 2px, transparent 2.2px)", backgroundSize: "18px 18px" },
    tilt: "sm:-rotate-1",
  },
  {
    Art: PaletteArt,
    art: "bg-[linear-gradient(160deg,#ff8c8c,#f0525c)]",
    shape: "rounded-[14px_48px_48px_48px]",
    tag: "bg-coral-soft text-coral-deep",
    accent: "#e2474f",
    pattern: { backgroundImage: "repeating-linear-gradient(-45deg, rgb(255 255 255 / .12) 0 10px, transparent 10px 22px)" },
    tilt: "sm:rotate-1 xl:translate-y-6",
  },
  {
    Art: LegoArt,
    art: "bg-[linear-gradient(160deg,#ffd75e,#ffb31f)]",
    shape: "rounded-[48px_14px_48px_48px]",
    tag: "bg-sun-soft text-[#a86400]",
    accent: "#d98a00",
    pattern: { backgroundImage: "radial-gradient(circle at 50% 50%, rgb(255 255 255 / .28) 7px, transparent 7.5px)", backgroundSize: "34px 34px" },
    tilt: "sm:rotate-1",
  },
  {
    Art: SandArt,
    art: "bg-[linear-gradient(160deg,#b9a2ff,#8566f5)]",
    shape: "rounded-[48px_48px_14px_48px]",
    tag: "bg-lav-soft text-lav-deep",
    accent: "#7552e6",
    pattern: { backgroundImage: "radial-gradient(ellipse at 50% 120%, rgb(255 255 255 / .25) 30%, transparent 31%)", backgroundSize: "60px 30px" },
    tilt: "sm:-rotate-1 xl:translate-y-6",
  },
];

export function Clubs() {
  const { t } = useLang();

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="relative overflow-hidden bg-[#f4efff] pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28 short:lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="absolute -left-10 top-16 hidden w-40 opacity-80 md:block" />
        <Cloud className="absolute -right-12 bottom-24 hidden w-48 opacity-70 md:block" />
        <Star className="absolute right-[8%] top-10 w-6 animate-twinkle" fill="#9b7bff" />
        <Sparkle className="absolute left-[7%] top-[46%] hidden w-5 animate-twinkle [animation-delay:-2s] lg:block" fill="#ff6b6b" />
        <Flower className="absolute bottom-10 left-[44%] hidden w-9 animate-sway lg:block short:lg:hidden" petal="#ffc93c" center="#ff6b6b" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="clubs-title" eyebrow={t.clubs.eyebrow} title={t.clubs.title} text={t.clubs.text} color="#7552e6" />

        <ul className="mt-8 grid gap-4 sm:mt-14 short:lg:mt-8 sm:grid-cols-2 sm:gap-7 xl:grid-cols-4 xl:gap-6">
          {t.clubs.items.map((item, i) => {
            const c = CARDS[i];
            return (
              <li key={i} className={`reveal ${c.tilt}`} style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                <article
                  className={`group flex h-full flex-row overflow-hidden bg-white sm:flex-col ${c.shape} shadow-[0_24px_50px_-30px_rgb(117_82_230/0.55)] transition-transform duration-300 hover:-translate-y-1.5`}
                >
                  <div className={`relative ${c.art} flex w-[36%] shrink-0 items-center px-2 py-4 sm:block sm:w-auto sm:px-6 sm:pb-4 sm:pt-6`}>
                    <div aria-hidden className="absolute inset-0" style={c.pattern} />
                    <span className="absolute left-2 top-1 font-display text-3xl font-black text-white/35 sm:left-5 sm:top-4 sm:text-5xl" aria-hidden>
                      0{i + 1}
                    </span>
                    <c.Art className="relative mx-auto h-auto w-full max-w-[120px] transition-transform duration-500 group-hover:scale-105 sm:mb-3 sm:h-40 sm:w-auto sm:max-w-none short:lg:h-28" />
                    <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px hidden h-6 w-full sm:block">
                      <path d="M0 24V12c40-14 80-14 120-2s80 12 120 0 40-10 60-6v20Z" fill="#fff" />
                    </svg>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-6 sm:pb-7 sm:pt-3">
                    <span className={`self-start rounded-full px-3 py-1 font-hand text-lg font-bold ${c.tag}`}>{item.tag}</span>
                    <h3 className="mt-2 text-[1.15rem] font-extrabold leading-snug sm:mt-3 sm:text-[1.35rem]" style={{ color: c.accent }}>
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft sm:mt-2 sm:text-base">{item.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      <Wave fill="#fffdf7" variant={0} className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
