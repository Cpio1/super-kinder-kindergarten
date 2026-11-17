"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Heart, Wave } from "@/components/decor/Shapes";
import { Phone } from "lucide-react";

const LINKS = ["about", "food", "clubs", "gallery", "documents", "contacts"] as const;

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#1f2547] text-white">
      <Wave fill="#1f2547" variant={0} className="absolute inset-x-0 bottom-full" />
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href="#home" aria-label={t.nav.logoLabel} className="inline-block rounded-2xl bg-white px-3 py-2">
              <Logo />
            </a>
            <p className="mt-4 max-w-sm text-white/70">{t.contacts.addressValue}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
              {LINKS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-9 items-center font-bold text-white/85 hover:text-sun">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap gap-3">
            <a href={site.phone.href} aria-label={site.phone.display} className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <Phone className="size-5" aria-hidden />
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <WhatsAppIcon className="size-6" />
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {t.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            {t.footer.madeWith} <Heart className="w-4" fill="#ff6b6b" />
          </p>
        </div>
      </div>
    </footer>
  );
}
