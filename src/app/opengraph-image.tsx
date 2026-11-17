import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "«Super Kinder» балабақшасы — бақытты балалық шақ мекені!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const nunito = await readFile(path.join(process.cwd(), "src/app/_og/Nunito-700.ttf"));
  const arcs = ["#ff6b6b", "#ffa23c", "#ffc93c", "#3fc27c", "#38b6ff", "#9b7bff"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg, #bfe9ff 0%, #fff7e8 100%)",
          padding: "0 80px",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", position: "absolute", right: 40, top: 150, width: 420, height: 220 }}>
          {arcs.map((c, i) => (
            <div
              key={c}
              style={{
                position: "absolute",
                left: i * 22,
                top: i * 22,
                width: 420 - i * 44,
                height: 420 - i * 44,
                borderRadius: 999,
                border: `22px solid ${c}`,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 720 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", borderRadius: 999, padding: "10px 22px", fontSize: 28, color: "#545a7c" }}>
            Алматы · Нұр-Алатау
          </div>
          <div style={{ display: "flex", fontSize: 96, color: "#1580d6", marginTop: 24 }}>
            Super&nbsp;<span style={{ color: "#ff6b6b" }}>Kinder</span>
          </div>
          <div style={{ display: "flex", fontSize: 46, color: "#1f2547", marginTop: 4 }}>бақытты балалық шақ мекені!</div>
          <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
            {[
              ["2–5 жас", "#ffe4e1", "#e2474f"],
              ["08:00–18:30", "#dff3ff", "#1580d6"],
              ["5 мезгіл тамақтану", "#ddf7e8", "#22995a"],
            ].map(([label, bg, fg]) => (
              <div key={label} style={{ display: "flex", background: bg, color: fg, borderRadius: 999, padding: "10px 22px", fontSize: 28 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Nunito", data: nunito, weight: 700, style: "normal" }] },
  );
}
