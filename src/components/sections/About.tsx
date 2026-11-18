"use client";

import { HeartHandshake, Puzzle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { aboutPhoto, aboutVideo } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Balloon, Cloud, Flower, Rainbow, Sparkle, Star } from "@/components/decor/Shapes";

const VALUE_STYLES = [
  { Icon: Sparkles, bg: "bg-sun-soft", icon: "bg-sun text-ink", shape: "rounded-[34px_34px_34px_12px]" },
  { Icon: Puzzle, bg: "bg-lav-soft", icon: "bg-lav text-white", shape: "rounded-[34px_12px_34px_34px]" },
  { Icon: HeartHandshake, bg: "bg-coral-soft", icon: "bg-coral text-white", shape: "rounded-[12px_34px_34px_34px]" },
];

const GROUP_COLORS = [
  { bg: "#ffffff", fg: "#7B2CBF", shape: "blob-a" },
  { bg: "#FFF4B8", fg: "#5A189A", shape: "blob-b" },
  { bg: "#ffffff", fg: "#5A189A", shape: "blob-c" },
  { bg: "#ffffff", fg: "#5A189A", shape: "blob-b" },
];

export function About() {
  const { t } = useLang();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-paper py-10 sm:py-14 lg:py-[clamp(1.75rem,5vh,4rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Flower className="absolute right-[3%] top-10 hidden w-10 animate-sway md:block" petal="#9D4EDD" />
        <Sparkle className="absolute left-[4%] top-[40%] hidden w-6 animate-twinkle lg:block" fill="#7B2CBF" />
        <Star className="absolute right-[46%] top-8 hidden w-6 animate-twinkle [animation-delay:-1.4s] lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} color="#5A189A" align="left" />
          <p className="reveal mt-4 text-[17px] font-semibold sm:text-lg leading-relaxed text-ink">{t.about.lead}</p>
          <p className="reveal mt-3 leading-relaxed text-ink-soft sm:text-lg">{t.about.text}</p>

          {/* Фото / видео main-page2 — только если файл реально есть */}
          {(aboutVideo || aboutPhoto) && (
            <div className="reveal relative mt-6">
              <div className="blob-c absolute -inset-2 -rotate-2 bg-leaf-soft" aria-hidden />
              <div className="relative overflow-hidden rounded-[36px_36px_36px_12px] border-[5px] border-white bg-sky-soft shadow-[0_24px_50px_-30px_rgb(123_44_191/0.7)]">
                {aboutVideo ? (
                  <video
                    src={aboutVideo.src}
                    poster={aboutVideo.poster ?? undefined}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    className="block max-h-[42svh] w-full bg-ink object-contain"
                  />
                ) : (
                  aboutPhoto && (
                    <Image
                      src={aboutPhoto.src}
                      alt={t.about.photoAlt}
                      width={aboutPhoto.width}
                      height={aboutPhoto.height}
                      sizes="(min-width: 1024px) 620px, 92vw"
                      quality={80}
                      className="mx-auto block h-auto max-h-[42svh] w-full object-contain"
                    />
                  )
                )}
              </div>
            </div>
          )}

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-3.5">
            {t.about.values.map((v, i) => {
              const s = VALUE_STYLES[i];
              return (
                <li key={i} className={`reveal ${s.bg} ${s.shape} flex gap-3.5 p-4 sm:block`} style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${s.icon}`}>
                    <s.Icon className="size-6" strokeWidth={2.4} aria-hidden />
                  </span>
                  <span className="block min-w-0">
                    <h3 className="text-[17px] font-extrabold leading-snug text-ink sm:mt-3 sm:text-lg">{v.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft sm:mt-1.5">{v.text}</p>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Топтар */}
        <div id="groups" aria-labelledby="groups-title" role="region">
        <div className="reveal relative pt-4 sm:px-6 lg:px-0">
          <Balloon className="absolute -top-2 right-2 w-10 animate-float-slow sm:right-6 lg:-right-2" fill="#FFD93D" />
          <div className="relative overflow-hidden rounded-[44px_44px_44px_16px] bg-[linear-gradient(150deg,#7B2CBF_0%,#5A189A_100%)] px-5 pb-5 pt-6 text-white shadow-[0_30px_60px_-30px_rgb(123_44_191/0.8)] sm:rounded-[56px_56px_56px_20px] sm:px-8 sm:pb-7 sm:pt-8">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Cloud className="absolute -right-6 -top-2 w-32 opacity-25" />
              <Cloud className="absolute -bottom-4 -left-8 w-40 opacity-15" />
              <Rainbow className="absolute -bottom-3 right-4 w-24 opacity-60 sm:w-28" />
            </div>
            <div className="relative">
              <p className="font-hand text-2xl font-bold text-sun">{t.about.groupsLead}</p>
              <h3 id="groups-title" className="mt-1 text-3xl font-extrabold sm:text-4xl">{t.about.groupsTitle}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {t.about.groups.map((g, i) => {
                  const c = GROUP_COLORS[i];
                  return (
                    <li key={i} className={`${c.shape} flex min-h-[132px] flex-col items-center justify-center px-4 py-4 text-center sm:min-h-[150px] sm:px-6 lg:min-h-[clamp(118px,17vh,170px)]`} style={{ background: c.bg }}>
                      <span className="font-display text-[2rem] font-black leading-none sm:text-[2.6rem]" style={{ color: c.fg }}>
                        {g.value}
                      </span>
                      <span className="mt-1 text-sm font-extrabold text-ink sm:text-base">{g.unit}</span>
                      <span className="mt-1.5 max-w-[16ch] text-[13px] leading-snug text-ink-soft sm:text-sm">{g.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
