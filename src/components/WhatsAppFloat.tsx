"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Постоянно доступная плавающая кнопка WhatsApp. */
export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat}
      className="group fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-[#7B2CBF] p-3.5 text-white shadow-[0_14px_30px_-10px_rgb(123_44_191/0.95)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:pr-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#7B2CBF] opacity-25 [animation-duration:2.6s]" aria-hidden />
      <WhatsAppIcon className="size-7" />
      <span className="hidden text-[15px] font-extrabold sm:inline">WhatsApp</span>
    </a>
  );
}
