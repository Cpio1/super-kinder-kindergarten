import Image from "next/image";
import { logoImage } from "@/lib/media";

/**
 * Логотип. Если в public/ есть logo.png — показывается он (без белой подложки),
 * иначе нарисованное солнышко.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 min-[360px]:gap-2.5">
      {logoImage ? (
        <Image
          src={logoImage.src}
          alt=""
          width={logoImage.width}
          height={logoImage.height}
          sizes="96px"
          priority
          className="h-10 w-auto max-w-24 shrink-0 object-contain min-[360px]:h-11 lg:h-12"
        />
      ) : (
        <span className="relative grid size-10 shrink-0 place-items-center min-[360px]:size-11 lg:size-12" aria-hidden>
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="24" cy="7" rx="5.5" ry="7" fill={["#9D4EDD", "#FFD93D", "#F5C400", "#7B2CBF"][i % 4]} transform={`rotate(${i * 45} 24 24)`} />
            ))}
            <circle cx="24" cy="24" r="13" fill="#fff" />
          </svg>
          <span className="relative font-display text-[17px] font-extrabold leading-none text-sky-deep">S</span>
        </span>
      )}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[16px] font-extrabold tracking-tight text-ink min-[360px]:text-[19px] lg:text-[21px]">
            Super <span className="text-coral">Kinder</span>
          </span>
          <span className="mt-1 font-hand text-[14px] min-[360px]:text-[15px] font-semibold text-ink-soft">балабақшасы</span>
        </span>
      )}
    </span>
  );
}
