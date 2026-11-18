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
    art: "bg-[linear-gradient(160deg,#9D4EDD,#7B2CBF)]",
    shape: "rounded-[48px_48px_48px_14px]",
    tag: "bg-sky-soft text-sky-deep",
    accent: "#5A189A",
    pattern: { backgroundImage: "radial-gradient(rgb(255 255 255 / .22) 2px, transparent 2.2px)", backgroundSize: "18px 18px" },
    tilt: "sm:-rotate-1",
  },
  {
    Art: PaletteArt,
    art: "bg-[linear-gradient(160deg,#FFE680,#FFD93D)]",
    shape: "rounded-[14px_48px_48px_48px]",
    tag: "bg-coral-soft text-coral-deep",
    accent: "#7B2CBF",
    pattern: { backgroundImage: "repeating-linear-gradient(-45deg, rgb(255 255 255 / .12) 0 10px, transparent 10px 22px)" },
    tilt: "sm:rotate-1 xl:translate-y-3",
  },
  {
    Art: LegoArt,
    art: "bg-[linear-gradient(160deg,#C77DFF,#9D4EDD)]",
    shape: "rounded-[48px_14px_48px_48px]",
    tag: "bg-sun-soft text-[#5A189A]",
    accent: "#5A189A",
    pattern: { backgroundImage: "radial-gradient(circle at 50% 50%, rgb(255 255 255 / .28) 7px, transparent 7.5px)", backgroundSize: "34px 34px" },
    tilt: "sm:rotate-1",
  },
  {
    Art: SandArt,
    art: "bg-[linear-gradient(160deg,#FFE680,#F5C400)]",
    shape: "rounded-[48px_48px_14px_48px]",
    tag: "bg-lav-soft text-lav-deep",
    accent: "#5A189A",
    pattern: { backgroundImage: "radial-gradient(ellipse at 50% 120%, rgb(255 255 255 / .25) 30%, transparent 31%)", backgroundSize: "60px 30px" },
    tilt: "sm:-rotate-1 xl:translate-y-3",
  },
];

export function Clubs() {
  const { t } = useLang();

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="relative overflow-hidden bg-[#F3E8FF] pb-12 pt-4 sm:pb-16 sm:pt-8 lg:pb-[clamp(3rem,8vh,5rem)] lg:pt-[clamp(1rem,3vh,2.5rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="absolute -left-10 top-16 hidden w-40 opacity-80 md:block" />
        <Cloud className="absolute -right-12 bottom-24 hidden w-48 opacity-70 md:block" />
        <Star className="absolute right-[8%] top-10 w-6 animate-twinkle" fill="#9D4EDD" />
        <Sparkle className="absolute left-[7%] top-[46%] hidden w-5 animate-twinkle [animation-delay:-2s] lg:block" fill="#9D4EDD" />
        <Flower className="absolute bottom-10 left-[44%] hidden w-9 animate-sway lg:block short:lg:hidden" petal="#FFD93D" center="#9D4EDD" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="clubs-title" eyebrow={t.clubs.eyebrow} title={t.clubs.title} text={t.clubs.text} color="#5A189A" />

        <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-[4vh] xl:grid-cols-4 xl:gap-6">
          {t.clubs.items.map((item, i) => {
            const c = CARDS[i];
            return (
              <li key={i} className={`reveal w-[80%] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none ${c.tilt}`} style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                <article
                  className={`group flex h-full flex-col overflow-hidden bg-white ${c.shape} shadow-[0_24px_50px_-30px_rgb(123_44_191/0.55)] transition-transform duration-300 hover:-translate-y-1.5`}
                >
                  <div className={`relative ${c.art} px-6 pb-3 pt-5`}>
                    <div aria-hidden className="absolute inset-0" style={c.pattern} />
                    <span className="absolute left-5 top-3 font-display text-4xl font-black text-white/35 sm:text-5xl" aria-hidden>
                      0{i + 1}
                    </span>
                    <c.Art className="relative mx-auto mb-2 h-24 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-28 lg:h-[clamp(6rem,14vh,10rem)]" />
                    <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px block h-6 w-full">
                      <path d="M0 24V12c40-14 80-14 120-2s80 12 120 0 40-10 60-6v20Z" fill="#fff" />
                    </svg>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
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
      <Wave fill="#FFFFFF" variant={0} className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
