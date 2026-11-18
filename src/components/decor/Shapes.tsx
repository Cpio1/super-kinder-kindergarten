/** Декоративные SVG-фигурки. Все aria-hidden и без событий указателя. */
type P = { className?: string; style?: React.CSSProperties };

const base = { "aria-hidden": true, focusable: false } as const;

export function Cloud({ className, style, fill = "#fff" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 64" className={className} style={style}>
      <path
        fill={fill}
        d="M24 62C11 62 2 54 2 43c0-10 8-18 18-18 2-13 13-23 27-23 11 0 21 6 25 16 3-1 6-2 9-2 12 0 21 9 22 20 9 1 15 8 15 16 0 6-5 10-11 10H24Z"
      />
    </svg>
  );
}

export function Sun({ className, style }: P) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className} style={style}>
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="56" y="2" width="8" height="22" rx="4" fill="#F5C400" transform={`rotate(${i * 30} 60 60)`} />
        ))}
      </g>
      <circle cx="60" cy="60" r="32" fill="#FFD93D" />
      <circle cx="60" cy="60" r="32" fill="url(#sunShine)" />
      <circle cx="49" cy="56" r="3.2" fill="#39205C" />
      <circle cx="71" cy="56" r="3.2" fill="#39205C" />
      <circle cx="44" cy="66" r="5" fill="#E2B6FF" opacity=".6" />
      <circle cx="76" cy="66" r="5" fill="#E2B6FF" opacity=".6" />
      <path d="M51 67c5 6 13 6 18 0" stroke="#39205C" strokeWidth="3" strokeLinecap="round" fill="none" />
      <defs>
        <radialGradient id="sunShine" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Star({ className, style, fill = "#FFD93D" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <path
        fill={fill}
        d="M20 2c1.6 0 2.5 1 3.3 2.7l3.3 7 7.6 1.1c3.3.5 4 3 1.6 5.3l-5.5 5.4 1.3 7.6c.6 3.3-1.6 4.8-4.5 3.2L20 30.8l-6.8 3.6c-3 1.6-5.1 0-4.5-3.2l1.3-7.6-5.5-5.4c-2.4-2.3-1.7-4.8 1.6-5.3l7.6-1.1 3.3-7C17.6 3 18.4 2 20 2Z"
      />
    </svg>
  );
}

export function Sparkle({ className, style, fill = "#9D4EDD" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <path fill={fill} d="M20 0c1.5 10 5 14.5 20 20-15 5.5-18.5 10-20 20-1.5-10-5-14.5-20-20C15 14.5 18.5 10 20 0Z" />
    </svg>
  );
}

export function Flower({ className, style, petal = "#9D4EDD", center = "#FFD93D" }: P & { petal?: string; center?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 60" className={className} style={style}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="30" cy="15" rx="9" ry="13" fill={petal} transform={`rotate(${i * 60} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill={center} />
      <circle cx="27" cy="27" r="2.5" fill="#fff" opacity=".7" />
    </svg>
  );
}

export function Balloon({ className, style, fill = "#9D4EDD" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 50 110" className={className} style={style}>
      <path d="M25 62c-2 10 6 16 0 26s4 14 0 22" stroke="#5E4A7D" strokeWidth="1.6" fill="none" opacity=".55" />
      <ellipse cx="25" cy="30" rx="22" ry="27" fill={fill} />
      <path d="M21 56h8l-4 7z" fill={fill} />
      <ellipse cx="17" cy="20" rx="5" ry="8" fill="#fff" opacity=".45" transform="rotate(20 17 20)" />
    </svg>
  );
}

export function Rainbow({ className, style }: P) {
  const arcs = ["#7B2CBF", "#FFD93D", "#9D4EDD", "#FFE680", "#C77DFF", "#FFF4B8"];
  return (
    <svg {...base} viewBox="0 0 200 104" className={className} style={style}>
      {arcs.map((c, i) => {
        const r = 94 - i * 11;
        return <path key={c} d={`M${100 - r} 100a${r} ${r} 0 0 1 ${r * 2} 0`} stroke={c} strokeWidth="11" fill="none" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function Heart({ className, style, fill = "#9D4EDD" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 36" className={className} style={style}>
      <path fill={fill} d="M20 35S2 24 2 12C2 6 6.5 2 11.5 2c3.7 0 6.6 2 8.5 5 1.9-3 4.8-5 8.5-5C33.5 2 38 6 38 12c0 12-18 23-18 23Z" />
    </svg>
  );
}

export function Squiggle({ className, style, stroke = "#FFD93D" }: P & { stroke?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 20" className={className} style={style} preserveAspectRatio="none">
      <path d="M2 12c10-10 18-10 28 0s18 10 28 0 18-10 28 0 18 10 28 0" stroke={stroke} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Волнообразный переход между секциями. `flip` — волна сверху секции. */
export function Wave({ fill, className = "", flip = false, variant = 0 }: { fill: string; className?: string; flip?: boolean; variant?: 0 | 1 | 2 }) {
  const paths = [
    "M0 48c120-40 240-40 360-8s240 40 360 8 240-40 360-8 240 40 360 8v72H0Z",
    "M0 70c160-50 320-60 480-20s320 50 480 6 320-40 480 4v60H0Z",
    "M0 40c90 30 200 50 330 30s250-60 400-40 260 60 420 40 210-40 290-30v90H0Z",
  ];
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-7 w-full sm:h-10 lg:h-12 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path fill={fill} d={paths[variant]} />
    </svg>
  );
}
