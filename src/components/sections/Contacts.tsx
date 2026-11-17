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
      className="group relative block overflow-hidden rounded-[40px_40px_40px_14px] bg-[#e6f6ea] shadow-[0_30px_60px_-34px_rgb(34_153_90/0.7)]"
    >
      <div className="relative">
      <svg aria-hidden viewBox="0 0 480 400" className="block h-[300px] w-full sm:h-[360px] lg:h-[380px]" preserveAspectRatio="xMidYMid slice">
        <rect width="480" height="400" fill="#e6f6ea" />
        {/* кварталы */}
        <g fill="#d2efd9">
          <rect x="20" y="20" width="130" height="90" rx="18" />
          <rect x="190" y="20" width="110" height="90" rx="18" />
          <rect x="340" y="20" width="120" height="150" rx="18" />
          <rect x="20" y="150" width="130" height="110" rx="18" />
          <rect x="20" y="300" width="130" height="80" rx="18" />
          <rect x="340" y="210" width="120" height="170" rx="18" />
        </g>
        {/* парк */}
        <rect x="190" y="300" width="110" height="80" rx="22" fill="#bfe8c9" />
        <circle cx="220" cy="330" r="14" fill="#3fc27c" />
        <circle cx="250" cy="350" r="12" fill="#22995a" />
        <circle cx="275" cy="325" r="10" fill="#3fc27c" />
        {/* дороги */}
        <g stroke="#fff" strokeWidth="22" strokeLinecap="round" fill="none">
          <path d="M0 130h480" />
          <path d="M170 0v400" />
          <path d="M320 0v400" />
          <path d="M0 280h480" />
        </g>
        <g stroke="#ffd96a" strokeWidth="3" strokeDasharray="10 10" fill="none">
          <path d="M0 130h480" />
          <path d="M320 0v400" />
        </g>
        {/* горы на горизонте */}
        <path d="M0 400l60-46 40 26 50-40 60 60Z" fill="#c6dcef" opacity=".8" />
        {/* здание садика */}
        <g transform="translate(196 166)">
          <rect x="0" y="34" width="98" height="64" rx="12" fill="#fff" />
          <path d="M-8 40 49 2l57 38Z" fill="#ff6b6b" />
          <rect x="14" y="52" width="22" height="20" rx="6" fill="#38b6ff" />
          <rect x="62" y="52" width="22" height="20" rx="6" fill="#38b6ff" />
          <path d="M40 98V80a9 9 0 0 1 18 0v18Z" fill="#9b7bff" />
        </g>
      </svg>

      {/* пин */}
      <div className="absolute left-1/2 top-[18%] -translate-x-1/2 animate-float text-center">
        <span className="relative mx-auto grid size-16 place-items-center rounded-full rounded-br-none bg-coral text-white shadow-[0_14px_26px_-10px_rgb(226_71_79/0.9)] [transform:rotate(45deg)]">
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
        <span className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1fae4b] px-5 text-[15px] font-extrabold text-white transition-transform group-hover:-translate-y-0.5">
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
      color: "#ff6b6b",
      bg: "bg-coral-soft",
      label: t.contacts.address,
      value: t.contacts.addressValue,
      copy: t.contacts.addressValue,
    },
    {
      Icon: Phone,
      color: "#38b6ff",
      bg: "bg-sky-soft",
      label: t.contacts.phone,
      value: site.phone.display,
      href: site.phone.href,
      copy: site.phone.display,
    },
    { Icon: Clock3, color: "#f29d00", bg: "bg-sun-soft", label: t.contacts.hours, value: site.hours },
    {
      Icon: InstagramIcon,
      color: "#e1306c",
      bg: "bg-[#fde6ef]",
      label: t.contacts.instagram,
      value: site.instagramHandle,
      href: site.instagramUrl,
      external: true,
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden bg-paper pb-28 pt-14 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24 short:lg:pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="absolute -right-10 top-8 hidden w-44 opacity-90 md:block" fill="#e8f6ff" />
        <Heart className="absolute left-[5%] top-20 hidden w-7 animate-float md:block" fill="#ff6b6b" />
        <Star className="absolute bottom-8 left-[46%] hidden w-6 animate-twinkle lg:block" />
        <Flower className="absolute bottom-16 right-[4%] hidden w-10 animate-sway lg:block" petal="#38b6ff" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} text={t.contacts.text} color="#22995a" />

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <ul className="grid gap-3.5">
              {rows.map((r, i) => (
                <li
                  key={i}
                  className="reveal flex flex-col gap-3 rounded-[26px] bg-white p-4 shadow-[0_14px_34px_-26px_rgb(31_37_71/0.6)] ring-1 ring-ink/5 min-[440px]:flex-row min-[440px]:items-center sm:p-5"
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3.5">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-[16px] ${r.bg}`} style={{ color: r.color }}>
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
                    <div className="pl-[62px] min-[440px]:pl-0">
                      <CopyButton value={r.copy} />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="reveal mt-6 grid gap-3 min-[440px]:grid-cols-2">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-[16px] font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(37_211_102/0.9)] transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-6" />
                {t.contacts.whatsapp}
              </a>
              <a
                href={site.phone.href}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-sky px-5 text-[16px] font-extrabold text-white shadow-[0_12px_26px_-12px_rgb(21_128_214/0.8)] transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-5" aria-hidden />
                {t.contacts.call}
              </a>
              <a
                href={site.twoGisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-[#1fae4b]/30 bg-white px-5 text-[16px] font-extrabold text-[#178a3b] transition-colors hover:border-[#1fae4b]"
              >
                <Navigation className="size-5" aria-hidden />
                {t.contacts.open2gis}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-[#e1306c]/25 bg-white px-5 text-[16px] font-extrabold text-[#c4245b] transition-colors hover:border-[#e1306c]"
              >
                <InstagramIcon className="size-5" />
                {t.contacts.openInstagram}
              </a>
            </div>
          </div>

          <div className="reveal lg:pt-1">
            <LocationCard />
          </div>
        </div>
      </div>
    </section>
  );
}
