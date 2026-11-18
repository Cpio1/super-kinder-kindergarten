"use client";

import { useState } from "react";
import { Check, Clock3, Copy, MapPin, Navigation, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Cloud, Flower, Heart, Star } from "@/components/decor/Shapes";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

function CopyButton({ value }: { value: string }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(value)) {
          setDone(true);
          window.setTimeout(() => setDone(false), 1800);
        }
      }}
      className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 text-sm font-bold text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-ink"
    >
      {done ? <Check className="size-4 text-leaf-deep" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{done ? t.contacts.copied : t.contacts.copy}</span>
    </button>
  );
}

/** Иллюстрированная схема местоположения (не карта), ведёт в 2GIS. */
function LocationCard() {
  const { t } = useLang();
  return (
    <a
      href={site.twoGisUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.contacts.open2gis}: ${t.contacts.addressValue}`}
      className="group relative block overflow-hidden rounded-[40px_40px_40px_14px] bg-[#F7F0FF] shadow-[0_30px_60px_-34px_rgb(123_44_191/0.7)]"
    >
      <div className="relative">
      <svg aria-hidden viewBox="0 0 480 400" className="block h-[170px] w-full sm:h-[240px] lg:h-[clamp(200px,36vh,360px)]" preserveAspectRatio="xMidYMid slice">
        <rect width="480" height="400" fill="#F7F0FF" />
        {/* кварталы */}
        <g fill="#EFE3FF">
          <rect x="20" y="20" width="130" height="90" rx="18" />
          <rect x="190" y="20" width="110" height="90" rx="18" />
          <rect x="340" y="20" width="120" height="150" rx="18" />
          <rect x="20" y="150" width="130" height="110" rx="18" />
          <rect x="20" y="300" width="130" height="80" rx="18" />
          <rect x="340" y="210" width="120" height="170" rx="18" />
        </g>
        {/* парк */}
        <rect x="190" y="300" width="110" height="80" rx="22" fill="#E9D5FF" />
        <circle cx="220" cy="330" r="14" fill="#F5C400" />
        <circle cx="250" cy="350" r="12" fill="#5A189A" />
        <circle cx="275" cy="325" r="10" fill="#F5C400" />
        {/* дороги */}
        <g stroke="#fff" strokeWidth="22" strokeLinecap="round" fill="none">
          <path d="M0 130h480" />
          <path d="M170 0v400" />
          <path d="M320 0v400" />
          <path d="M0 280h480" />
        </g>
        <g stroke="#FFE680" strokeWidth="3" strokeDasharray="10 10" fill="none">
          <path d="M0 130h480" />
          <path d="M320 0v400" />
        </g>
        {/* горы на горизонте */}
        <path d="M0 400l60-46 40 26 50-40 60 60Z" fill="#DCC6F5" opacity=".8" />
        {/* здание садика */}
        <g transform="translate(196 166)">
          <rect x="0" y="34" width="98" height="64" rx="12" fill="#fff" />
          <path d="M-8 40 49 2l57 38Z" fill="#9D4EDD" />
          <rect x="14" y="52" width="22" height="20" rx="6" fill="#7B2CBF" />
          <rect x="62" y="52" width="22" height="20" rx="6" fill="#7B2CBF" />
          <path d="M40 98V80a9 9 0 0 1 18 0v18Z" fill="#9D4EDD" />
        </g>
      </svg>

      {/* пин */}
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 animate-float text-center">
        <span className="relative mx-auto grid size-12 place-items-center rounded-full rounded-br-none sm:size-16 bg-coral text-white shadow-[0_14px_26px_-10px_rgb(123_44_191/0.9)] [transform:rotate(45deg)]">
          <MapPin className="size-7 -rotate-45" aria-hidden />
        </span>
      </div>
      </div>

      <div className="relative mx-3 -mt-10 mb-3 rounded-[24px] bg-white/95 p-4 shadow-lg backdrop-blur sm:mx-5 sm:mb-5 sm:p-5">
        <p className="font-hand text-xl font-bold text-leaf-deep">{t.contacts.mapTitle}</p>
        <p className="font-display text-lg font-extrabold leading-snug text-ink">{t.contacts.addressShort}</p>
        <p className="text-sm text-ink-soft">
          {t.contacts.district}, {t.contacts.city}
        </p>
        <span className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#7B2CBF] px-5 text-[15px] font-extrabold text-white transition-transform group-hover:-translate-y-0.5">
          <Navigation className="size-4" aria-hidden />
          {t.contacts.open2gis}
        </span>
      </div>
    </a>
  );
}

export function Contacts() {
  const { t } = useLang();

  const rows = [
    {
      Icon: MapPin,
      color: "#9D4EDD",
      bg: "bg-coral-soft",
      label: t.contacts.address,
      value: t.contacts.addressValue,
      copy: t.contacts.addressValue,
    },
    {
      Icon: Phone,
      color: "#7B2CBF",
      bg: "bg-sky-soft",
      label: t.contacts.phone,
      value: site.phone.display,
      href: site.phone.href,
      copy: site.phone.display,
    },
    { Icon: Clock3, color: "#5A189A", bg: "bg-sun", label: t.contacts.hours, value: site.hours },
    {
      Icon: InstagramIcon,
      color: "#7B2CBF",
      bg: "bg-[#F3E8FF]",
      label: t.contacts.instagram,
      value: site.instagramHandle,
      href: site.instagramUrl,
      external: true,
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden bg-sky-pale pb-24 pt-10 sm:pt-14 lg:pb-[clamp(2.25rem,5.5vh,4.5rem)] lg:pt-[clamp(1.25rem,3.5vh,3.5rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="absolute -right-10 top-8 hidden w-44 opacity-90 md:block" fill="#F3E8FF" />
        <Heart className="absolute right-[44%] top-10 hidden w-7 animate-float lg:block" fill="#FFD93D" />
        <Star className="absolute bottom-8 left-[46%] hidden w-6 animate-twinkle lg:block" />
        <Flower className="absolute bottom-16 right-[4%] hidden w-10 animate-sway lg:block" petal="#7B2CBF" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} text={t.contacts.text} color="#5A189A" align="left" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {rows.map((r, i) => (
                <li
                  key={i}
                  className={`reveal flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[24px] bg-white p-3.5 shadow-[0_14px_34px_-26px_rgb(57_32_92/0.6)] ring-1 ring-ink/5 ${i < 2 ? "sm:col-span-2" : ""}`}
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div className="flex min-w-0 flex-1 basis-56 items-start gap-3.5">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-[15px] ${r.bg}`} style={{ color: r.color }}>
                      <r.Icon className="size-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink-soft">{r.label}</p>
                      {r.href ? (
                        <a
                          href={r.href}
                          {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-0.5 block break-words text-[17px] font-extrabold leading-snug text-ink underline decoration-2 underline-offset-4 [text-decoration-color:color-mix(in_srgb,currentColor_25%,transparent)] hover:text-sky-deep"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 select-all break-words text-[17px] font-extrabold leading-snug text-ink">{r.value}</p>
                      )}
                    </div>
                  </div>
                  {r.copy && (
                    <div className="ml-auto">
                      <CopyButton value={r.copy} />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="reveal mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full text-center leading-tight sm:min-h-13 sm:gap-2 bg-[#7B2CBF] px-3 py-2 text-[15px] font-extrabold sm:px-5 sm:text-[16px] text-white shadow-[0_12px_26px_-12px_rgb(123_44_191/0.9)] transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-6" />
                {t.contacts.whatsapp}
              </a>
              <a
                href={site.phone.href}
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full text-center leading-tight sm:min-h-13 sm:gap-2 bg-sun px-3 py-2 text-[15px] font-extrabold sm:px-5 sm:text-[16px] text-ink shadow-[0_12px_26px_-12px_rgb(224_168_0/0.9)] transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-5" aria-hidden />
                {t.contacts.call}
              </a>
              <a
                href={site.twoGisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full text-center leading-tight sm:min-h-13 sm:gap-2 border-2 border-[#7B2CBF]/30 bg-white px-3 py-2 text-[15px] font-extrabold sm:px-5 sm:text-[16px] text-[#5A189A] transition-colors hover:border-[#7B2CBF]"
              >
                <Navigation className="size-5" aria-hidden />
                {t.contacts.open2gis}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full text-center leading-tight sm:min-h-13 sm:gap-2 border-2 border-[#7B2CBF]/25 bg-white px-3 py-2 text-[15px] font-extrabold sm:px-5 sm:text-[16px] text-[#5A189A] transition-colors hover:border-[#7B2CBF]"
              >
                <InstagramIcon className="size-5" />
                {t.contacts.openInstagram}
              </a>
            </div>
          </div>

          <div className="reveal">
            <LocationCard />
          </div>
        </div>
      </div>
    </section>
  );
}
