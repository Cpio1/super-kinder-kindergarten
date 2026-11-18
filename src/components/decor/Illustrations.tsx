/** Тематические иллюстрации (SVG), которые заменяют отсутствующие фотографии. */
type P = { className?: string };
const base = { "aria-hidden": true, focusable: false } as const;

/** Плейсхолдер главного фото: здание садика под радугой. */
export function KindergartenScene({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 400 400" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ksSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9D5FF" />
          <stop offset="1" stopColor="#F7F0FF" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ksSky)" />
      {/* радуга */}
      {["#9D4EDD", "#F5C400", "#FFD93D", "#F5C400", "#7B2CBF", "#9D4EDD"].map((c, i) => {
        const r = 170 - i * 14;
        return <path key={c} d={`M${200 - r} 270a${r} ${r} 0 0 1 ${r * 2} 0`} stroke={c} strokeWidth="14" fill="none" opacity=".9" />;
      })}
      {/* облака */}
      <path fill="#fff" d="M40 96c-12 0-20-7-20-16s7-15 16-15c2-11 11-18 22-18 10 0 18 6 21 14 10 0 18 8 18 17s-6 18-15 18Z" />
      <path fill="#fff" d="M300 70c-9 0-15-5-15-12s6-12 13-12c2-8 9-14 17-14 8 0 14 5 16 11 8 0 14 6 14 13s-5 14-11 14Z" />
      {/* холм */}
      <path fill="#C77DFF" d="M0 300c80-40 170-46 260-26s110 10 140 0v126H0Z" />
      <path fill="#F5C400" d="M0 330c90-26 190-30 280-12s90 10 120 4v78H0Z" />
      {/* здание */}
      <rect x="110" y="200" width="180" height="120" rx="14" fill="#FFFFFF" />
      <path d="M96 210 200 140l104 70Z" fill="#9D4EDD" />
      <path d="M96 210 200 140l104 70" stroke="#7B2CBF" strokeWidth="8" strokeLinejoin="round" fill="none" />
      <circle cx="200" cy="182" r="16" fill="#FFD93D" />
      <path d="M200 172v10l7 5" stroke="#39205C" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* окна */}
      <rect x="130" y="228" width="42" height="38" rx="10" fill="#7B2CBF" />
      <path d="M151 228v38M130 247h42" stroke="#fff" strokeWidth="4" />
      <rect x="228" y="228" width="42" height="38" rx="10" fill="#7B2CBF" />
      <path d="M249 228v38M228 247h42" stroke="#fff" strokeWidth="4" />
      {/* дверь */}
      <path d="M182 320v-38a18 18 0 0 1 36 0v38Z" fill="#9D4EDD" />
      <circle cx="210" cy="302" r="3" fill="#fff" />
      {/* кубики ABC */}
      <rect x="306" y="292" width="30" height="30" rx="6" fill="#FFD93D" />
      <rect x="322" y="262" width="30" height="30" rx="6" fill="#7B2CBF" />
      <rect x="338" y="292" width="30" height="30" rx="6" fill="#9D4EDD" />
      <text x="321" y="313" fontSize="18" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Ә</text>
      <text x="337" y="283" fontSize="18" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Қ</text>
      <text x="353" y="313" fontSize="18" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Ү</text>
      {/* дерево */}
      <rect x="58" y="270" width="10" height="44" rx="4" fill="#8A6AAE" />
      <circle cx="63" cy="258" r="28" fill="#5A189A" />
      <circle cx="52" cy="250" r="6" fill="#9D4EDD" />
      <circle cx="74" cy="266" r="6" fill="#9D4EDD" />
      {/* цветы */}
      {[[150, 352, "#9D4EDD"], [250, 360, "#9D4EDD"], [330, 350, "#FFD93D"], [40, 356, "#fff"]].map(([x, y, c]) => (
        <g key={`${x}`} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-7" rx="5" ry="7" fill={c as string} transform={`rotate(${a})`} />
          ))}
          <circle r="4" fill="#FFD93D" stroke="#fff" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

/* ——— Питание ——— */

export function Apple({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M40 22c-6-6-26-6-28 14-2 18 12 38 22 38 3 0 4-2 6-2s3 2 6 2c10 0 24-20 22-38-2-20-22-20-28-14Z" fill="#9D4EDD" />
      <path d="M40 22c0-6 2-12 6-16" stroke="#6B4A8F" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M44 14c6-8 16-8 20-4-4 6-14 8-20 4Z" fill="#F5C400" />
      <ellipse cx="24" cy="38" rx="5" ry="9" fill="#fff" opacity=".4" transform="rotate(18 24 38)" />
    </svg>
  );
}

export function Carrot({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M58 22 14 70c-3 3 1 7 4 4l48-44Z" fill="#F5C400" />
      <path d="M30 52l6 4M38 42l6 5M24 61l4 3" stroke="#E0A800" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 22c-2-10 0-16 4-18 2 6 0 12-4 18Zm0 0c8-4 14-4 18-1-5 4-11 4-18 1Zm0 0c6-8 12-10 16-9-2 5-8 8-16 9Z" fill="#F5C400" />
    </svg>
  );
}

export function Banana({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M14 30c4 26 30 40 54 28 4-2 3-6-1-6-20 4-38-6-44-24-2-6-10-4-9 2Z" fill="#FFD93D" />
      <path d="M20 34c8 16 24 24 42 22" stroke="#F5C400" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M14 30c-1-5 2-9 6-8l2 5" fill="#6B4A8F" />
    </svg>
  );
}

export function Pear({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M40 16c-8 0-10 8-10 14 0 6-12 12-12 26 0 12 10 20 22 20s22-8 22-20c0-14-12-20-12-26 0-6-2-14-10-14Z" fill="#FFD93D" />
      <path d="M40 16c0-5 1-8 4-11" stroke="#6B4A8F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M44 9c5-4 11-3 13 0-4 3-9 4-13 0Z" fill="#F5C400" />
      <ellipse cx="30" cy="54" rx="4" ry="8" fill="#fff" opacity=".4" />
    </svg>
  );
}

export function Broccoli({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M34 46h12l4 28H30Z" fill="#FFE680" />
      <circle cx="26" cy="36" r="13" fill="#9D4EDD" />
      <circle cx="54" cy="36" r="13" fill="#9D4EDD" />
      <circle cx="40" cy="24" r="15" fill="#F5C400" />
      <circle cx="40" cy="42" r="12" fill="#F5C400" />
      <circle cx="35" cy="20" r="3" fill="#fff" opacity=".35" />
    </svg>
  );
}

export function Bowl({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 90" className={className}>
      <path d="M44 22c-4-6 4-10 0-16M60 20c-4-6 4-10 0-16M76 22c-4-6 4-10 0-16" stroke="#B79AD9" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
      <ellipse cx="60" cy="40" rx="50" ry="10" fill="#FFE680" />
      <path d="M10 40h100c0 26-22 42-50 42S10 66 10 40Z" fill="#7B2CBF" />
      <path d="M20 52c10 14 26 20 40 20" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".45" />
      <circle cx="44" cy="38" r="5" fill="#9D4EDD" />
      <circle cx="62" cy="36" r="5" fill="#F5C400" />
      <circle cx="78" cy="39" r="5" fill="#F5C400" />
      <rect x="46" y="80" width="28" height="6" rx="3" fill="#5A189A" />
    </svg>
  );
}

export function Cup({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M58 34h6a10 10 0 0 1 0 20h-6" stroke="#9D4EDD" strokeWidth="6" fill="none" />
      <path d="M14 26h46l-5 42c-1 5-4 8-9 8H28c-5 0-8-3-9-8Z" fill="#9D4EDD" />
      <path d="M17 32h40" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".9" />
      <circle cx="36" cy="54" r="7" fill="#fff" opacity=".9" />
      <path d="M33 54h6M36 51v6" stroke="#9D4EDD" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Spoon({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 90" className={className}>
      <ellipse cx="15" cy="16" rx="11" ry="14" fill="#FFD93D" />
      <rect x="12" y="26" width="6" height="60" rx="3" fill="#FFD93D" />
      <ellipse cx="12" cy="12" rx="3" ry="5" fill="#fff" opacity=".5" />
    </svg>
  );
}

export function Plate({ className, color = "#9D4EDD" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 60" className={className}>
      <circle cx="30" cy="30" r="28" fill="#fff" stroke={color} strokeWidth="4" />
      <circle cx="30" cy="30" r="17" fill={color} opacity=".18" />
      <circle cx="30" cy="30" r="17" fill="none" stroke={color} strokeWidth="2" strokeDasharray="3 5" />
    </svg>
  );
}

/* ——— Кружки ——— */

export function SpeechArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 160 130" className={className}>
      <path d="M18 18h84a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14H52l-22 18 4-18H18A14 14 0 0 1 4 72V32a14 14 0 0 1 14-14Z" fill="#fff" />
      <text x="60" y="66" textAnchor="middle" fontSize="34" fontWeight="800" fill="#5A189A" fontFamily="sans-serif">Ә Ң</text>
      <path d="M96 52h48a12 12 0 0 1 12 12v26a12 12 0 0 1-12 12h-6l2 14-18-14H96a12 12 0 0 1-12-12V64a12 12 0 0 1 12-12Z" fill="#FFD93D" />
      <circle cx="104" cy="77" r="5" fill="#fff" />
      <circle cx="120" cy="77" r="5" fill="#fff" />
      <circle cx="136" cy="77" r="5" fill="#fff" />
    </svg>
  );
}

export function PaletteArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 160 130" className={className}>
      <path d="M80 10C38 10 8 38 8 70c0 28 22 50 52 50 14 0 16-10 10-18-6-8-2-18 10-18h20c22 0 44-10 44-34 0-24-28-40-64-40Z" fill="#fff" />
      <circle cx="44" cy="60" r="11" fill="#9D4EDD" />
      <circle cx="64" cy="34" r="11" fill="#FFD93D" />
      <circle cx="98" cy="32" r="11" fill="#F5C400" />
      <circle cx="126" cy="50" r="11" fill="#7B2CBF" />
      <circle cx="44" cy="94" r="10" fill="#9D4EDD" />
      <g transform="rotate(38 120 96)">
        <rect x="114" y="54" width="12" height="60" rx="6" fill="#39205C" />
        <rect x="113" y="104" width="14" height="10" fill="#D9CDEB" />
        <path d="M113 114h14c0 10-4 18-7 22-3-4-7-12-7-22Z" fill="#9D4EDD" />
      </g>
    </svg>
  );
}

export function LegoArt({ className }: P) {
  const brick = (x: number, y: number, w: number, c: string, dark: string) => (
    <g>
      {Array.from({ length: w }, (_, i) => (
        <rect key={i} x={x + 6 + i * 24} y={y - 8} width="14" height="10" rx="3" fill={dark} />
      ))}
      <rect x={x} y={y} width={w * 24 + 2} height="28" rx="5" fill={c} />
      <rect x={x + 4} y={y + 4} width={w * 24 - 6} height="5" rx="2.5" fill="#fff" opacity=".3" />
    </g>
  );
  return (
    <svg {...base} viewBox="0 0 160 130" className={className}>
      {brick(14, 92, 3, "#9D4EDD", "#7B2CBF")}
      {brick(86, 92, 2, "#7B2CBF", "#5A189A")}
      {brick(38, 54, 3, "#FFD93D", "#E0A800")}
      {brick(62, 16, 2, "#F5C400", "#5A189A")}
    </svg>
  );
}

export function SandArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 160 130" className={className}>
      <path d="M0 110c30-16 60-18 90-10s50 6 70-2v32H0Z" fill="#FFE680" />
      {/* замок */}
      <path d="M34 108V74h8v-8h8v8h8v-8h8v8h8v34Z" fill="#F5C400" />
      <path d="M46 108V92a8 8 0 0 1 16 0v16Z" fill="#B08ACF" />
      <path d="M54 66V48" stroke="#6B4A8F" strokeWidth="3" />
      <path d="M54 48h16l-5 5 5 5H54Z" fill="#9D4EDD" />
      {/* ведёрко */}
      <path d="M100 66h40l-6 40h-28Z" fill="#9D4EDD" />
      <path d="M102 66c0-18 36-18 36 0" stroke="#5A189A" strokeWidth="4" fill="none" />
      <rect x="98" y="62" width="44" height="8" rx="4" fill="#5A189A" />
      <path d="M108 80h24" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".5" />
      {/* лопатка */}
      <g transform="rotate(-24 140 96)">
        <rect x="136" y="66" width="7" height="34" rx="3.5" fill="#7B2CBF" />
        <path d="M130 98h19l-3 16c-1 4-12 4-13 0Z" fill="#7B2CBF" />
      </g>
      <circle cx="20" cy="100" r="3" fill="#F5C400" />
      <circle cx="96" cy="114" r="3" fill="#E0A800" />
      {/* ракушка */}
      <path d="M120 120c0-8 6-12 10-12s10 4 10 12Z" fill="#E9D5FF" />
    </svg>
  );
}
