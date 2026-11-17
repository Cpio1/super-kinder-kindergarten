"use client";

import { ExternalLink, FileText, FolderOpen, Link2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { documents } from "@/lib/documents";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Sparkle, Star, Wave } from "@/components/decor/Shapes";

const COLORS = ["#38b6ff", "#ff6b6b", "#3fc27c", "#9b7bff", "#ffa23c"];

export function Documents() {
  const { t, lang } = useLang();

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative overflow-hidden bg-sky-pale">
      <Wave fill="#fffdf7" flip variant={2} />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Star className="absolute left-[8%] top-[30%] hidden w-6 animate-twinkle md:block" fill="#38b6ff" />
        <Sparkle className="absolute bottom-[26%] right-[7%] w-5 animate-twinkle [animation-delay:-1.5s]" fill="#ffc93c" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionHeading id="documents-title" eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} color="#1580d6" />

        {documents.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((d, i) => {
              const color = COLORS[i % COLORS.length];
              const Icon = d.kind === "pdf" ? FileText : Link2;
              return (
                <li key={d.url} className="reveal">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-[28px] bg-white p-5 shadow-[0_16px_34px_-24px_rgb(21_128_214/0.6)] transition-transform hover:-translate-y-1"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-[18px] text-white" style={{ background: color }}>
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-extrabold leading-snug text-ink">{d.title[lang]}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-sm font-bold" style={{ color }}>
                        {d.kind === "pdf" ? t.documents.pdf : t.documents.link} · {t.documents.open}
                        <ExternalLink className="size-3.5" aria-hidden />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="reveal relative mx-auto mt-10 max-w-2xl">
            {/* стопка «папок» */}
            <div aria-hidden className="absolute inset-x-8 -top-3 h-10 rotate-[-2deg] rounded-[24px] bg-sun" />
            <div aria-hidden className="absolute inset-x-4 -top-1.5 h-10 rotate-[1.5deg] rounded-[24px] bg-coral" />
            <div className="relative flex flex-col items-center gap-5 rounded-[32px] bg-white p-6 text-center shadow-[0_24px_50px_-30px_rgb(21_128_214/0.6)] sm:flex-row sm:p-8 sm:text-left">
              <span className="grid size-20 shrink-0 place-items-center rounded-[26px] bg-sky-soft text-sky-deep">
                <FolderOpen className="size-10" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{t.documents.emptyTitle}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{t.documents.emptyText}</p>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 font-extrabold text-white shadow-[0_10px_22px_-12px_rgb(37_211_102/0.9)]"
                >
                  <WhatsAppIcon className="size-5" />
                  {t.documents.ask}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Wave fill="#fffdf7" variant={1} />
    </section>
  );
}
