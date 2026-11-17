"use client";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

export default function FloatingActions({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3">
      {show && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t(lang, "উপরে যান", "Back to top")}
          className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-lg hover:bg-navy-2">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden><path d="M9 14V4M4 8l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
      <a href={waLink(t(lang, "আসসালামু আলাইকুম, FileGharBD সম্পর্কে জানতে চাই।", "Hello, I would like to know more about FileGharBD."))} target="_blank" rel="noopener noreferrer"
        aria-label={t(lang, "WhatsApp-এ মেসেজ করুন", "Message on WhatsApp")} className="flex h-14 items-center gap-2 rounded-full bg-brand px-5 font-semibold text-white shadow-lg hover:bg-brand-dark">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.200s.9 2.500 1.100 2.700c.1.200 1.900 2.900 4.600 4 2.300.9 2.700.7 3.200.7.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.100-.1-.2-.2-.5-.3z" /></svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
