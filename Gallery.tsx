"use client";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";

export default function Gallery({ lang, images, name }: { lang: Lang; images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState(false);
  const n = images.length;
  useEffect(() => {
    if (!box) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setBox(false); if (e.key === "ArrowRight") setActive((a) => (a + 1) % n); if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n); };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [box, n]);
  const alt = (i: number) => `${name} — ${t(lang, "প্রিভিউ", "preview")} ${i + 1}`;
  return (
    <div>
      <button type="button" onClick={() => setBox(true)} aria-label={t(lang, "ছবি বড় করে দেখুন", "View larger image")} className="block w-full overflow-hidden rounded-card border border-line">
        <img src={images[active]} alt={alt(active)} width={640} height={480} className="aspect-[4/3] w-full object-cover" />
      </button>
      <ul className="mt-3 grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <li key={src}><button type="button" onClick={() => setActive(i)} aria-label={alt(i)} aria-current={i === active} className={`block w-full overflow-hidden rounded-2xl border-2 ${i === active ? "border-brand" : "border-line"}`}><img src={src} alt="" width={320} height={240} loading="lazy" className="aspect-[4/3] w-full object-cover" /></button></li>
        ))}
      </ul>
      {box && (
        <div role="dialog" aria-modal="true" aria-label={name} className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-4" onClick={() => setBox(false)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={images[active]} alt={alt(active)} className="w-full rounded-card bg-white" />
            <button type="button" autoFocus onClick={() => setBox(false)} aria-label={t(lang, "বন্ধ করুন", "Close")} className="absolute -top-3 -right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-navy shadow">✕</button>
            {n > 1 && <>
              <button type="button" onClick={() => setActive((active - 1 + n) % n)} aria-label={t(lang, "আগের ছবি", "Previous image")} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow">‹</button>
              <button type="button" onClick={() => setActive((active + 1) % n)} aria-label={t(lang, "পরের ছবি", "Next image")} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow">›</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
