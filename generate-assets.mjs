// Generates ALL visual assets (logos, favicon, product/service/category art, banners, OG image)
// into /public. Edit colors/shapes here, then run:  npm run assets
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { categories, products, services } from "../src/data/catalog.mjs";

const C = { green: "#0C7C3E", deep: "#095F2F", leaf: "#1FAE5B", tint: "#E6F3EA", navy: "#0B1F3A", navy2: "#14304F", mist: "#F2F7F4", white: "#FFFFFF", line: "#DCE6DF" };
const pub = (...p) => path.join(process.cwd(), "public", ...p);
const write = (rel, content) => { fs.mkdirSync(path.dirname(pub(rel)), { recursive: true }); fs.writeFileSync(pub(rel), content); };

// ---- 100x100 glyphs: (main color, second color) ----
const G = {
  doc: (a, b) => `<rect x="24" y="12" width="52" height="76" rx="8" fill="${a}"/><rect x="34" y="28" width="32" height="5" rx="2.5" fill="${b}"/><rect x="34" y="42" width="32" height="5" rx="2.5" fill="${b}"/><rect x="34" y="56" width="20" height="5" rx="2.5" fill="${b}"/>`,
  book: (a, b) => `<path d="M50 24 C40 16 26 16 14 20 V80 C26 76 40 76 50 84 Z" fill="${a}"/><path d="M50 24 C60 16 74 16 86 20 V80 C74 76 60 76 50 84 Z" fill="${b}"/>`,
  table: (a, b) => `<rect x="12" y="20" width="76" height="60" rx="8" fill="${a}"/><rect x="12" y="38" width="76" height="4" fill="${b}"/><rect x="12" y="58" width="76" height="4" fill="${b}"/><rect x="38" y="20" width="4" height="60" fill="${b}"/>`,
  star: (a, b) => `<path d="M50 10 L61 38 L91 40 L68 59 L76 88 L50 72 L24 88 L32 59 L9 40 L39 38 Z" fill="${a}"/><circle cx="50" cy="50" r="9" fill="${b}"/>`,
  film: (a, b) => `<rect x="12" y="22" width="76" height="56" rx="10" fill="${a}"/><path d="M43 38 L63 50 L43 62 Z" fill="${b}"/>`,
  slides: (a, b) => `<rect x="10" y="18" width="80" height="52" rx="8" fill="${a}"/><rect x="22" y="48" width="8" height="14" fill="${b}"/><rect x="36" y="38" width="8" height="24" fill="${b}"/><rect x="50" y="30" width="8" height="32" fill="${b}"/><rect x="44" y="74" width="12" height="12" fill="${a}"/>`,
  user: (a, b) => `<circle cx="50" cy="34" r="16" fill="${a}"/><path d="M18 88 C18 62 82 62 82 88 Z" fill="${b}"/>`,
  grid: (a, b) => `<rect x="14" y="14" width="32" height="32" rx="8" fill="${a}"/><rect x="54" y="14" width="32" height="32" rx="16" fill="${b}"/><rect x="14" y="54" width="32" height="32" rx="16" fill="${b}"/><rect x="54" y="54" width="32" height="32" rx="8" fill="${a}"/>`,
  layers: (a, b) => `<path d="M50 14 L90 36 L50 58 L10 36 Z" fill="${a}"/><path d="M10 50 L50 72 L90 50" fill="none" stroke="${b}" stroke-width="8" stroke-linejoin="round"/><path d="M10 66 L50 88 L90 66" fill="none" stroke="${a}" stroke-width="8" stroke-linejoin="round"/>`,
  globe: (a, b) => `<circle cx="50" cy="50" r="38" fill="${a}"/><ellipse cx="50" cy="50" rx="16" ry="38" fill="none" stroke="${b}" stroke-width="4"/><path d="M12 50 H88 M18 30 H82 M18 70 H82" stroke="${b}" stroke-width="4" fill="none"/>`,
  code: (a, b) => `<rect x="8" y="16" width="84" height="68" rx="10" fill="${a}"/><path d="M38 36 L24 50 L38 64 M62 36 L76 50 L62 64" fill="none" stroke="${b}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
  moon: (a, b) => `<path d="M62 12 A38 38 0 1 0 88 62 A30 30 0 1 1 62 12 Z" fill="${a}"/><path d="M76 18 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="${b}"/>`,
  gift: (a, b) => `<rect x="14" y="38" width="72" height="48" rx="8" fill="${a}"/><rect x="10" y="26" width="80" height="16" rx="6" fill="${b}"/><rect x="45" y="26" width="10" height="60" fill="${b}"/><path d="M50 26 C40 6 22 14 32 26 Z M50 26 C60 6 78 14 68 26 Z" fill="${a}"/>`,
  briefcase: (a, b) => `<rect x="10" y="28" width="80" height="54" rx="10" fill="${a}"/><path d="M36 28 V20 a6 6 0 0 1 6 -6 h16 a6 6 0 0 1 6 6 V28" fill="none" stroke="${a}" stroke-width="7"/><rect x="10" y="48" width="80" height="6" fill="${b}"/><rect x="43" y="44" width="14" height="14" rx="3" fill="${b}"/>`,
  palette: (a, b) => `<path d="M50 10 C26 10 10 28 10 50 C10 72 28 90 52 90 C62 90 64 80 58 74 C52 68 58 60 68 60 H78 C86 60 90 54 90 48 C90 26 72 10 50 10 Z" fill="${a}"/><circle cx="32" cy="42" r="7" fill="${b}"/><circle cx="50" cy="30" r="7" fill="${b}"/><circle cx="70" cy="38" r="7" fill="${b}"/>`,
  check: (a, b) => `<rect x="22" y="14" width="56" height="74" rx="9" fill="${a}"/><rect x="38" y="8" width="24" height="14" rx="6" fill="${b}"/><path d="M34 44 L42 52 L56 36 M34 68 L42 76 L56 60" fill="none" stroke="${b}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
  pen: (a, b) => `<path d="M64 12 L88 36 L38 86 L10 90 L14 62 Z" fill="${a}"/><path d="M58 18 L82 42" stroke="${b}" stroke-width="7"/><path d="M14 62 L38 86" stroke="${b}" stroke-width="5"/>`,
  search: (a, b) => `<circle cx="42" cy="42" r="28" fill="${a}"/><circle cx="42" cy="42" r="15" fill="${b}"/><path d="M63 63 L88 88" stroke="${a}" stroke-width="11" stroke-linecap="round"/>`,
  chat: (a, b) => `<path d="M14 20 a10 10 0 0 1 10 -10 h52 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 H44 L24 90 V70 a10 10 0 0 1 -10 -10 Z" fill="${a}"/><circle cx="34" cy="40" r="5" fill="${b}"/><circle cx="50" cy="40" r="5" fill="${b}"/><circle cx="66" cy="40" r="5" fill="${b}"/>`,
  download: (a, b) => `<circle cx="50" cy="50" r="40" fill="${a}"/><path d="M50 24 V60 M34 46 L50 62 L66 46" fill="none" stroke="${b}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><rect x="30" y="72" width="40" height="7" rx="3.5" fill="${b}"/>`,
};
const glyph = (name, x, y, size, a, b) => `<g transform="translate(${x} ${y}) scale(${size / 100})">${G[name](a, b)}</g>`;
const svg = (w, h, inner, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" ${extra}>${inner}</svg>`;

// ---- Logo ----
const logoMark = (x, y, s, bg = C.green, fg = C.white, accent = C.navy) => `<g transform="translate(${x} ${y}) scale(${s / 100})">
<path d="M8 30 a10 10 0 0 1 10 -10 h22 a10 10 0 0 1 8 4 l4 5 h30 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 H18 a10 10 0 0 1 -10 -10 Z" fill="${bg}"/>
<path d="M50 44 V70 M38 58 L50 70 L62 58" fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="36" y="76" width="28" height="5" rx="2.5" fill="${fg}"/></g>`;
const FONT = `font-family="Poppins, Arial, sans-serif"`;
write("brand/logo-icon.svg", svg(100, 100, logoMark(0, 0, 100), 'role="img" aria-label="FileGharBD"'));
write("brand/logo-horizontal.svg", svg(420, 100, `${logoMark(0, 0, 100)}<text x="116" y="62" ${FONT} font-size="46" font-weight="700" fill="${C.navy}">File<tspan fill="${C.green}">Ghar</tspan>BD</text>`, 'role="img" aria-label="FileGharBD"'));
write("brand/logo-horizontal-light.svg", svg(420, 100, `${logoMark(0, 0, 100, C.leaf, C.white)}<text x="116" y="62" ${FONT} font-size="46" font-weight="700" fill="${C.white}">File<tspan fill="${C.leaf}">Ghar</tspan>BD</text>`, 'role="img" aria-label="FileGharBD"'));
write("brand/logo-vertical.svg", svg(300, 280, `${logoMark(90, 0, 120)}<text x="150" y="190" text-anchor="middle" ${FONT} font-size="44" font-weight="700" fill="${C.navy}">File<tspan fill="${C.green}">Ghar</tspan>BD</text><text x="150" y="230" text-anchor="middle" ${FONT} font-size="15" font-weight="500" letter-spacing="2" fill="${C.navy2}">DOWNLOAD MORE, PAY LESS</text>`, 'role="img" aria-label="FileGharBD"'));
write("favicon.svg", svg(100, 100, logoMark(0, 0, 100)));
write("icon.svg", svg(100, 100, logoMark(0, 0, 100)));

// ---- Scene art (flat colors only, no gradients) ----
const themes = [
  { bg: C.navy, back: C.navy2, card: C.white, g1: C.green, g2: C.tint, dot: C.leaf },
  { bg: C.green, back: C.deep, card: C.white, g1: C.navy, g2: C.tint, dot: C.leaf },
  { bg: C.tint, back: C.white, card: C.white, g1: C.green, g2: C.tint, dot: C.navy },
  { bg: C.mist, back: C.tint, card: C.white, g1: C.navy, g2: C.leaf, dot: C.green },
];
function tile(g, i) {
  const t = themes[i % themes.length];
  return svg(640, 480, `<rect width="640" height="480" fill="${t.bg}"/>
<circle cx="560" cy="70" r="90" fill="${t.back}"/><circle cx="70" cy="430" r="70" fill="${t.back}"/>
<circle cx="120" cy="90" r="10" fill="${t.dot}"/><circle cx="540" cy="400" r="14" fill="${t.dot}"/><circle cx="590" cy="330" r="6" fill="${t.dot}"/>
<g transform="rotate(7 330 250)"><rect x="200" y="90" width="260" height="300" rx="26" fill="${t.back}"/></g>
<g transform="rotate(-5 320 250)"><path d="M180 130 a24 24 0 0 1 24 -24 h70 a24 24 0 0 1 18 8 l14 16 h134 a24 24 0 0 1 24 24 V366 a24 24 0 0 1 -24 24 H204 a24 24 0 0 1 -24 -24 Z" fill="${t.card}"/>
${glyph(g, 245, 160, 150, t.g1, t.g2)}
<rect x="214" y="330" width="130" height="12" rx="6" fill="${t.g1}" opacity="0.9"/><rect x="214" y="352" width="84" height="10" rx="5" fill="${t.dot}"/></g>`);
}
categories.forEach((c, i) => write(`images/categories/${c.slug}.svg`, tile(c.glyph, i)));
products.forEach((p, i) => { write(`images/products/${p.slug}.svg`, tile(p.glyph, i + 1)); write(`images/products/${p.slug}-2.svg`, tile(p.glyph, i + 2)); write(`images/products/${p.slug}-3.svg`, tile(p.glyph, i + 3)); });
services.forEach((s, i) => write(`images/services/${s.slug}.svg`, tile(s.glyph, i + 2)));

// ---- Hero / page illustrations ----
function stack(w, h, items, bg) {
  const pos = [[80, 150, -8], [300, 70, 5], [520, 170, -4]];
  const cards = items.map((g, i) => { const [x, y, r] = pos[i]; const t = themes[(i + 1) % 4]; return `<g transform="rotate(${r} ${x + 110} ${y + 130})"><path d="M${x} ${y + 40} a22 22 0 0 1 22 -22 h60 a22 22 0 0 1 16 7 l12 15 h98 a22 22 0 0 1 22 22 V${y + 240} a22 22 0 0 1 -22 22 H${x + 22} a22 22 0 0 1 -22 -22 Z" fill="${i === 1 ? C.green : C.white}" stroke="${C.line}" stroke-width="2"/>${glyph(g, x + 55, y + 80, 110, i === 1 ? C.white : C.green, i === 1 ? C.deep : C.tint)}<rect x="${x + 28}" y="${y + 215}" width="90" height="9" rx="4.5" fill="${i === 1 ? C.white : C.navy}"/></g>`; }).join("");
  return svg(w, h, `<rect width="${w}" height="${h}" fill="${bg}"/><circle cx="${w - 120}" cy="110" r="100" fill="${C.tint}"/><circle cx="110" cy="${h - 90}" r="70" fill="${C.tint}"/>${cards}<g transform="translate(${w / 2 - 50} ${h - 150})">${glyph("download", 0, 0, 100, C.navy, C.white)}</g>`);
}
write("images/hero.svg", stack(760, 560, ["doc", "layers", "slides"], C.mist));
write("images/about.svg", stack(760, 560, ["briefcase", "globe", "pen"], C.white));
write("images/how-it-works.svg", stack(760, 560, ["search", "chat", "check"], C.mist));
write("images/why-us.svg", stack(760, 560, ["check", "star", "chat"], C.white));
write("images/404.svg", svg(520, 360, `<rect width="520" height="360" fill="${C.mist}"/><circle cx="260" cy="180" r="140" fill="${C.tint}"/>${logoMark(190, 70, 140, C.green)}<text x="260" y="300" text-anchor="middle" ${FONT} font-size="54" font-weight="700" fill="${C.navy}">404</text>`));
const banner = (bg, fg, a, b, g1, g2, g3) => svg(1200, 400, `<rect width="1200" height="400" fill="${bg}"/><circle cx="1060" cy="60" r="150" fill="${a}"/><circle cx="90" cy="360" r="90" fill="${a}"/>${glyph(g1, 760, 90, 220, fg, b)}${glyph(g2, 900, 150, 150, fg, b)}${glyph(g3, 1010, 70, 110, fg, b)}`);
write("images/banner-templates.svg", banner(C.navy, C.white, C.navy2, C.green, "doc", "slides", "table"));
write("images/banner-services.svg", banner(C.green, C.white, C.deep, C.navy, "pen", "code", "star"));
write("images/banner-resources.svg", banner(C.tint, C.green, C.white, C.navy, "layers", "grid", "book"));

// ---- Social brand graphics ----
const social = (w, h) => svg(w, h, `<rect width="${w}" height="${h}" fill="${C.navy}"/><circle cx="${w * 0.9}" cy="${h * 0.15}" r="${h * 0.5}" fill="${C.navy2}"/>${logoMark(w * 0.08, h * 0.3, h * 0.4, C.leaf, C.white)}<text x="${w * 0.08 + h * 0.5}" y="${h * 0.54}" ${FONT} font-size="${h * 0.14}" font-weight="700" fill="${C.white}">File<tspan fill="${C.leaf}">Ghar</tspan>BD</text><text x="${w * 0.08}" y="${h * 0.86}" ${FONT} font-size="${h * 0.075}" font-weight="500" fill="${C.tint}">DOWNLOAD MORE, PAY LESS</text>`);
write("brand/social-cover.svg", social(1640, 624));
write("brand/social-profile.svg", svg(800, 800, `<rect width="800" height="800" fill="${C.green}"/>${logoMark(150, 150, 500, C.white, C.green)}`));
write("brand/og-image.svg", social(1200, 630));

// ---- PNG exports (OG image, favicon sizes, apple icon) ----
const png = async (rel, w, h, out) => { await sharp(pub(rel), { density: 144 }).resize(w, h).png().toFile(pub(out)); };
await png("brand/og-image.svg", 1200, 630, "og-image.png");
await png("favicon.svg", 32, 32, "favicon-32.png");
await png("favicon.svg", 180, 180, "apple-touch-icon.png");
await png("favicon.svg", 192, 192, "icon-192.png");
await png("favicon.svg", 512, 512, "icon-512.png");
await png("brand/social-profile.svg", 800, 800, "brand/social-profile.png");
await png("brand/social-cover.svg", 1640, 624, "brand/social-cover.png");
await png("brand/logo-horizontal.svg", 840, 200, "brand/logo-horizontal.png");
// favicon.ico (PNG-in-ICO)
const ico32 = fs.readFileSync(pub("favicon-32.png"));
const hdr = Buffer.alloc(22); hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(1, 4);
hdr.writeUInt8(32, 6); hdr.writeUInt8(32, 7); hdr.writeUInt16LE(1, 10); hdr.writeUInt16LE(32, 12); hdr.writeUInt32LE(ico32.length, 14); hdr.writeUInt32LE(22, 18);
fs.writeFileSync(pub("favicon.ico"), Buffer.concat([hdr, ico32]));
// WebP copies of the main illustrations for optional use
for (const n of ["hero", "about", "how-it-works", "why-us"]) await sharp(pub(`images/${n}.svg`), { density: 96 }).webp({ quality: 90 }).toFile(pub(`images/${n}.webp`));
console.log("assets generated");
