// Verifies every internal link and image in the built site (out/) points to a real file.
import fs from "node:fs"; import path from "node:path";
const root = path.join(process.cwd(), "out");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const pages = walk(root).filter((f) => f.endsWith(".html"));
const exists = (u) => { const p = decodeURIComponent(u.split("#")[0].split("?")[0]); if (!p) return true; const f = path.join(root, p); return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, "index.html"))); };
let bad = 0, checked = 0;
for (const f of pages) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) { const u = m[1]; if (u.startsWith("//")) continue; checked++; if (!exists(u)) { bad++; console.log("BROKEN", path.relative(root, f), u); } }
}
console.log(`${pages.length} pages, ${checked} internal references checked, ${bad} broken`);
process.exit(bad ? 1 : 0);
