// Сканирует public/gallery и public/hero и записывает список изображений
// (с реальными размерами) в src/generated/media.json.
// Запускается автоматически перед `npm run dev` и `npm run build`.
//
// Главное фото первого экрана: файл main-page.* (в public/, public/hero или public/gallery)
// либо первый файл из public/hero. В галерею оно не попадает.
// Видео main-page2.(mp4|webm|mov) подключается в галерею первым элементом,
// постер — main-page2-poster.(jpg|png|webp), если он есть.
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const HERO_NAME = /^main-page\.[a-z]+$/i;

/** Размеры JPEG / PNG / WebP без сторонних зависимостей. */
function imageSize(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: ищем маркер SOFn; учитываем EXIF-поворот (90°/270°)
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    let rotated = false;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue; }
      const marker = buf[offset + 1];
      const len = buf.readUInt16BE(offset + 2);
      if (marker === 0xe1 && buf.toString("ascii", offset + 4, offset + 8) === "Exif") {
        rotated = exifRotated(buf, offset + 10);
      }
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return rotated ? { width: height, height: width } : { width, height };
      }
      offset += 2 + len;
    }
  }
  return null;
}

function exifRotated(buf, tiff) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let i = 0; i < count; i++) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8) >= 5;
    }
  } catch {
    /* повреждённый EXIF — считаем, что поворота нет */
  }
  return false;
}

async function list(dir) {
  const abs = path.join(root, "public", dir);
  let files = [];
  try {
    files = await readdir(abs);
  } catch {
    return [];
  }
  const items = [];
  for (const name of files.filter((f) => IMAGE.test(f) && !f.startsWith("."))) {
    const size = imageSize(await readFile(path.join(abs, name))) ?? { width: 1600, height: 1200 };
    items.push({ name, src: `/${dir}/${name}`, ...size });
  }
  return items.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
}

const galleryAll = await list("gallery");
const heroDir = await list("hero");
const rootDir = (await list("")).map((f) => ({ ...f, src: `/${f.name}` }));

const heroItem =
  heroDir.find((f) => HERO_NAME.test(f.name)) ??
  rootDir.find((f) => HERO_NAME.test(f.name)) ??
  galleryAll.find((f) => HERO_NAME.test(f.name)) ??
  heroDir[0] ??
  null;
const POSTER = /^main-page2-poster\./i;
const poster = [...rootDir, ...heroDir, ...galleryAll].find((f) => POSTER.test(f.name)) ?? null;
const gallery = galleryAll.filter((f) => f !== heroItem && f !== poster);

// Видео main-page2.*
const VIDEO = /^main-page2\.(mp4|webm|mov)$/i;
let video = null;
for (const dir of ["", "hero", "gallery"]) {
  try {
    const found = (await readdir(path.join(root, "public", dir))).find((f) => VIDEO.test(f));
    if (found) {
      video = { src: `${dir ? `/${dir}` : ""}/${found}`, poster: poster?.src ?? null };
      break;
    }
  } catch {
    /* папки нет */
  }
}

const strip = ({ name, ...rest }) => ({ name, ...rest });
await mkdir(path.join(root, "src", "generated"), { recursive: true });
await writeFile(
  path.join(root, "src", "generated", "media.json"),
  JSON.stringify({ hero: heroItem ? strip(heroItem) : null, video, gallery: gallery.map(strip) }, null, 2) + "\n",
);

console.log(`[media] hero: ${heroItem?.src ?? "—"}, video: ${video?.src ?? "—"}, gallery: ${gallery.length} фото`);
