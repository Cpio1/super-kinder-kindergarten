"use client";

import { Clock3, Soup, UsersRound } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle, Star, Wave } from "@/components/decor/Shapes";
import { Apple, Banana, Bowl, Broccoli, Carrot, Cup, Pear, Plate, Spoon } from "@/components/decor/Illustrations";

const POINTS = [
  { Icon: Soup, color: "#ff6b6b" },
  { Icon: Clock3, color: "#38b6ff" },
  { Icon: UsersRound, color: "#3fc27c" },
];

const PLATES = ["#ff6b6b", "#ffa23c", "#ffc93c", "#3fc27c", "#38b6ff"];

/** Композиция «стол»: большая тарелка с цифрой 5 и продукты вокруг. */
function FoodTable({ label }: { label: string }) {
  const items = [
    { C: Apple, cls: "left-[4%] top-[8%] w-[20%] animate-float" },
    { C: Carrot, cls: "right-[6%] top-[4%] w-[19%] animate-float-slow" },
    { C: Banana, cls: "right-[0%] top-[42%] w-[20%] animate-float [animation-delay:-2s]" },
    { C: Pear, cls: "left-[0%] top-[44%] w-[17%] animate-float-slow [animation-delay:-3s]" },
    { C: Broccoli, cls: "left-[10%] bottom-[2%] w-[18%] animate-float [animation-delay:-1s]" },
    { C: Cup, cls: "right-[10%] bottom-[2%] w-[17%] animate-float-slow [animation-delay:-4s]" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="blob-b absolute inset-[13%] bg-white shadow-[0_30px_60px_-30px_rgb(242_157_0/0.7)]" />
      <div className="absolute inset-[20%] grid place-items-center rounded-full border-[10px] border-sun bg-sun-soft">
        <div className="text-center">
          <span className="block font-display text-[clamp(4rem,22vw,7.5rem)] font-black leading-[0.9] text-coral">5</span>
          <span className="mx-auto mt-1 block max-w-[11ch] text-[clamp(0.8rem,3.4vw,1rem)] font-extrabold leading-tight text-ink">{label}</span>
        </div>
      </div>
      {/* пять тарелок по кругу */}
      {PLATES.map((c, i) => {
        const a = (-90 + i * 72) * (Math.PI / 180);
        const x = 50 + Math.cos(a) * 30;
        const y = 50 + Math.sin(a) * 30;
        return (
          <div key={c} className="absolute w-[11%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%` }}>
            <Plate color={c} className="w-full drop-shadow-sm" />
          </div>
        );
      })}
      <Bowl className="absolute bottom-[-2%] left-1/2 w-[30%] -translate-x-1/2" />
      <Spoon className="absolute left-[31%] top-[1%] w-[5%] rotate-[-24deg]" />
      {items.map(({ C, cls }, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <C className="w-full drop-shadow-[0_8px_10px_rgb(31_37_71/0.12)]" />
        </div>
      ))}
    </div>
  );
}

export function Food() {
  const { t } = useLang();

  return (
    <section id="food" aria-labelledby="food-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#fff3c7_0%,#ffe8b8_100%)]">
      <Wave fill="#fffdf7" flip variant={1} />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="dotted-bg absolute inset-0 opacity-50" />
        <Star className="absolute right-[6%] top-[14%] hidden w-6 animate-twinkle lg:block" fill="#ff6b6b" />
        <Sparkle className="absolute bottom-[16%] left-[5%] hidden w-6 animate-twinkle [animation-delay:-1.2s] sm:block" fill="#3fc27c" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16 short:lg:py-8">
        <div className="lg:order-2">
          <SectionHeading id="food-title" eyebrow={t.food.eyebrow} title={t.food.title} color="#e2474f" align="left" />
          <p className="reveal mt-5 leading-relaxed text-ink-soft sm:text-lg">{t.food.text}</p>

          <div className="reveal mx-auto my-8 max-w-[340px] sm:max-w-[400px] lg:hidden">
            <FoodTable label={t.food.bigLabel} />
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {t.food.points.map((p, i) => {
              const { Icon, color } = POINTS[i];
              return (
                <li
                  key={i}
                  className="reveal flex gap-3 rounded-[26px] bg-white/85 p-4 shadow-[0_10px_24px_-18px_rgb(31_37_71/0.5)] sm:flex-col lg:flex-row lg:items-center"
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white" style={{ background: color }}>
                    <Icon className="size-5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-base font-extrabold text-ink">{p.title}</span>
                    <span className="mt-0.5 block text-[15px] leading-snug text-ink-soft">{p.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="reveal mt-5 rounded-2xl border-2 border-dashed border-sun-deep/40 px-4 py-3 text-[15px] font-semibold text-ink-soft">
            {t.food.note}
          </p>
        </div>

        <div className="reveal hidden lg:order-1 lg:block short:lg:mx-auto short:lg:w-full short:lg:max-w-[380px]">
          <FoodTable label={t.food.bigLabel} />
        </div>
      </div>
      <Wave fill="#f4efff" variant={2} />
    </section>
  );
}
