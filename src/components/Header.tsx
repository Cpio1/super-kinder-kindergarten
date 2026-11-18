"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

// «Басты бет» в меню нет: на главную ведёт логотип.
const NAV = [
  { id: "about", color: "#7B2CBF" },
  { id: "groups", color: "#FFD93D" },
  { id: "food", color: "#7B2CBF" },
  { id: "clubs", color: "#FFD93D" },
  { id: "gallery", color: "#7B2CBF" },
  { id: "documents", color: "#FFD93D" },
  { id: "contacts", color: "#7B2CBF" },
] as const;

type NavId = (typeof NAV)[number]["id"] | "home";

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const opts: { v: Lang; label: string }[] = [
    { v: "kk", label: "KZ" },
    { v: "ru", label: "RU" },
  ];
  return (
    <div role="group" aria-label={t.nav.langLabel} className={`flex rounded-full bg-sky-soft p-1 ${className}`}>
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => setLang(o.v)}
          aria-pressed={lang === o.v}
          lang={o.v}
          className={`min-h-9 min-w-10 rounded-full px-2.5 text-sm min-[360px]:min-w-11 min-[360px]:px-3 font-extrabold transition-colors ${
            lang === o.v ? "bg-white text-sky-deep shadow-sm" : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavId>("home");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const probe = window.innerHeight * 0.35;
      let current: NavId = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= probe) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Мобильное меню: блокировка прокрутки, Escape, фокус
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? "bg-white/90 shadow-[0_8px_30px_-16px_rgb(57_32_92/0.35)] backdrop-blur-md" : "bg-white/0"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <a href="#home" aria-label={t.nav.logoLabel} className="shrink-0 rounded-2xl" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full bg-white/80 p-1.5 shadow-[0_6px_24px_-14px_rgb(57_32_92/0.4)] backdrop-blur">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    aria-current={active === n.id ? "true" : undefined}
                    className="relative block whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-bold text-ink-soft transition-colors hover:text-ink xl:px-3.5"
                    style={active === n.id ? { background: "#FFD93D", color: "#39205C" } : undefined}
                  >
                    {t.nav[n.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 min-[360px]:gap-2">
            <LangSwitch />
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full bg-sun text-ink shadow-[0_6px_16px_-6px_rgb(224_168_0/0.7)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" strokeWidth={2.6} /> : <Menu className="size-6" strokeWidth={2.6} />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top))] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-md px-4 pb-10 pt-4">
          <ul className="grid grid-cols-2 gap-3">
            {NAV.map((n, i) => (
              <li key={n.id} className={i === NAV.length - 1 && NAV.length % 2 ? "col-span-2" : ""}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center gap-3 rounded-[22px] px-4 py-3 text-[17px] font-extrabold text-ink"
                  style={{ background: n.color === "#FFD93D" ? "#FFF4B8" : "#F3E8FF" }}
                >
                  <span className="size-3 shrink-0 rounded-full" style={{ background: n.color }} aria-hidden />
                  {t.nav[n.id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#7B2CBF] px-6 font-extrabold text-white"
            >
              <WhatsAppIcon className="size-6" />
              {t.contacts.whatsapp}
            </a>
            <a href={site.phone.href} className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-sky-soft px-6 font-extrabold text-sky-deep">
              <Phone className="size-5" />
              {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
