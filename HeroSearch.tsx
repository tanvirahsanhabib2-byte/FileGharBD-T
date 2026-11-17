"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

export default function HeroSearch({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/${lang}/products/?q=${encodeURIComponent(q.trim())}`); }}
      className="flex w-full max-w-xl items-center gap-2 rounded-pill border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(11,31,58,.07)]">
      <label className="flex-1">
        <span className="sr-only">{t(lang, "পণ্য খুঁজুন", "Search products")}</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang, "কী খুঁজছেন? যেমন: স্লাইড, সিভি, আইকন", "What do you need? e.g. slides, CV, icons")} className="w-full rounded-pill bg-transparent px-4 py-2.5 text-[15px] placeholder:text-navy/45 focus:outline-none" />
      </label>
      <button type="submit" className="btn-primary !min-h-[44px]">{t(lang, "খুঁজুন", "Search")}</button>
    </form>
  );
}
