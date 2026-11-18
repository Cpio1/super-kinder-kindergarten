import { Squiggle } from "@/components/decor/Shapes";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  color?: string;
  align?: "center" | "left";
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, color = "#7B2CBF", align = "center", id }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal ${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 font-hand text-xl font-bold shadow-[0_6px_18px_-8px_rgb(57_32_92/0.25)]"
        style={{ color }}
      >
        <span className="size-2 rounded-full" style={{ background: color }} aria-hidden />
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 text-[1.75rem] font-extrabold leading-[1.15] text-ink sm:text-4xl lg:text-[clamp(2rem,4.4vh,2.75rem)]">
        {title}
      </h2>
      <Squiggle className={`mt-2 h-3 w-24 ${center ? "mx-auto" : ""}`} stroke={color} />
      {text && <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{text}</p>}
    </div>
  );
}
