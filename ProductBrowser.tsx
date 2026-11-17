"use client";
import { useEffect, useMemo, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import ProductCard, { type CardItem } from "./ProductCard";

const PAGE = 9;
type Cat = { slug: string; name: string };
export default function ProductBrowser({ lang, items, cats, initialCategory = "all" }: { lang: Lang; items: CardItem[]; cats: Cat[]; initialCategory?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [shown, setShown] = useState(PAGE);

  useEffect(() => { const p = new URLSearchParams(window.location.search).get("q"); if (p) setQ(p); }, []);
  useEffect(() => setShown(PAGE), [q, cat, sort]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = items.filter((i) => (cat === "all" || i.category === cat) && (!s || `${i.name} ${i.short} ${i.categoryName}`.toLowerCase().includes(s)));
    if (sort === "az") r = [...r].sort((a, b) => a.name.localeCompare(b.name, lang));
    if (sort === "za") r = [...r].sort((a, b) => b.name.localeCompare(a.name, lang));
    return r;
  }, [items, q, cat, sort, lang]);

  const chip = (active: boolean) => `rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${active ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand hover:text-brand-dark"}`;
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">{t(lang, "পণ্য খুঁজুন", "Search products")}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang, "পণ্য খুঁজুন, যেমন: টেমপ্লেট, আইকন…", "Search products, e.g. template, icon…")} className="field !rounded-pill !pl-5" />
        </label>
        <label>
          <span className="sr-only">{t(lang, "সাজান", "Sort")}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="field !rounded-pill sm:w-52">
            <option value="default">{t(lang, "ডিফল্ট ক্রম", "Default order")}</option>
            <option value="az">{t(lang, "নাম: ক → হ / A → Z", "Name: A → Z")}</option>
            <option value="za">{t(lang, "নাম: হ → ক / Z → A", "Name: Z → A")}</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t(lang, "ক্যাটাগরি ফিল্টার", "Category filter")}>
        <button type="button" className={chip(cat === "all")} aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t(lang, "সব", "All")}</button>
        {cats.map((c) => <button key={c.slug} type="button" className={chip(cat === c.slug)} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</button>)}
      </div>
      <p className="mt-5 text-sm text-navy/65" aria-live="polite">{t(lang, `${list.length}টি পণ্য পাওয়া গেছে`, `${list.length} product${list.length === 1 ? "" : "s"} found`)}</p>

      {list.length === 0 ? (
        <div className="card mt-6 p-8 text-center">
          <p className="font-semibold">{t(lang, "এই খোঁজে কোনো পণ্য মেলেনি।", "No products match this search.")}</p>
          <p className="mt-1 text-navy/70">{t(lang, "অন্য শব্দ দিয়ে খুঁজুন, ফিল্টার মুছুন, অথবা আপনার প্রয়োজন WhatsApp-এ জানান।", "Try another word, clear the filter, or tell us what you need on WhatsApp.")}</p>
          <button type="button" className="btn-outline mt-4" onClick={() => { setQ(""); setCat("all"); }}>{t(lang, "ফিল্টার মুছুন", "Clear filters")}</button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((p) => <li key={p.slug}><ProductCard lang={lang} p={p} /></li>)}
        </ul>
      )}
      {shown < list.length && (
        <div className="mt-10 text-center">
          <button type="button" className="btn-dark" onClick={() => setShown(shown + PAGE)}>{t(lang, "আরও দেখুন", "Load more")}</button>
        </div>
      )}
    </div>
  );
}
