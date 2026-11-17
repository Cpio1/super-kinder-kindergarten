"use client";

import { HeartHandshake, Puzzle, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Balloon, Cloud, Flower, Rainbow, Sparkle, Star } from "@/components/decor/Shapes";

const VALUE_STYLES = [
  { Icon: Sparkles, bg: "bg-sun-soft", icon: "bg-sun text-ink", shape: "rounded-[34px_34px_34px_12px]" },
  { Icon: Puzzle, bg: "bg-lav-soft", icon: "bg-lav text-white", shape: "rounded-[34px_12px_34px_34px]" },
  { Icon: HeartHandshake, bg: "bg-coral-soft", icon: "bg-coral text-white", shape: "rounded-[12px_34px_34px_34px]" },
];

const GROUP_COLORS = [
  { bg: "#ffffff", fg: "#e2474f", shape: "blob-a" },
  { bg: "#ffffff", fg: "#f29d00", shape: "blob-b" },
  { bg: "#ffffff", fg: "#22995a", shape: "blob-c" },
  { bg: "#ffffff", fg: "#7552e6", shape: "blob-b" },
];

export function About() {
  const { t } = useLang();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-paper py-14 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Flower className="absolute right-[3%] top-10 hidden w-10 animate-sway md:block" petal="#ff6b6b" />
        <Sparkle className="absolute left-[4%] top-[40%] hidden w-6 animate-twinkle lg:block" fill="#38b6ff" />
        <Star className="absolute bottom-12 left-[46%] hidden w-6 animate-twinkle [animation-delay:-1.4s] lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} color="#22995a" align="left" />
          <p className="reveal mt-5 text-lg font-semibold leading-relaxed text-ink">{t.about.lead}</p>
          <p className="reveal mt-3 leading-relaxed text-ink-soft sm:text-lg">{t.about.text}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.about.values.map((v, i) => {
              const s = VALUE_STYLES[i];
              return (
                <li key={i} className={`reveal ${s.bg} ${s.shape} p-5`} style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <span className={`grid size-12 place-items-center rounded-2xl ${s.icon}`}>
                    <s.Icon className="size-6" strokeWidth={2.4} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold leading-snug text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Топтар */}
        <div className="reveal relative pt-6 sm:px-6 lg:px-0">
          <Balloon className="absolute -top-2 right-2 w-10 animate-float-slow sm:right-6 lg:-right-2" fill="#ffc93c" />
          <div className="relative overflow-hidden rounded-[44px_44px_44px_16px] bg-[linear-gradient(150deg,#38b6ff_0%,#1580d6_100%)] px-5 pb-6 pt-8 text-white shadow-[0_30px_60px_-30px_rgb(21_128_214/0.8)] sm:rounded-[56px_56px_56px_20px] sm:px-8 sm:pb-8 sm:pt-10">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Cloud className="absolute -right-6 -top-2 w-32 opacity-25" />
              <Cloud className="absolute -bottom-4 -left-8 w-40 opacity-15" />
              <Rainbow className="absolute -bottom-3 right-4 w-24 opacity-60 sm:w-28" />
            </div>
            <div className="relative">
              <p className="font-hand text-2xl font-bold text-sun">{t.about.groupsLead}</p>
              <h3 className="mt-1 text-3xl font-extrabold sm:text-4xl">{t.about.groupsTitle}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                {t.about.groups.map((g, i) => {
                  const c = GROUP_COLORS[i];
                  return (
                    <li key={i} className={`${c.shape} flex min-h-[150px] flex-col items-center justify-center px-2 py-5 text-center sm:min-h-[170px] sm:px-4`} style={{ background: c.bg }}>
                      <span className="font-display text-[2rem] font-black leading-none sm:text-[2.6rem]" style={{ color: c.fg }}>
                        {g.value}
                      </span>
                      <span className="mt-1 text-sm font-extrabold text-ink sm:text-base">{g.unit}</span>
                      <span className="mt-1.5 text-[13px] leading-snug text-ink-soft sm:text-sm">{g.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
