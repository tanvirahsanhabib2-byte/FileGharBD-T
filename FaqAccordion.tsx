"use client";
import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="card overflow-hidden">
          <h3>
            <button type="button" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold hover:text-brand-dark">
              {it.q}
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className={`shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </h3>
          <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={open !== i}><p className="px-5 pb-5 text-navy/75">{it.a}</p></div>
        </li>
      ))}
    </ul>
  );
}
