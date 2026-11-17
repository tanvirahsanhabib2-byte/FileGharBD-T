"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { t, otherLang, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

type Cat = { slug: string; name: string };
export default function Header({ lang, cats }: { lang: Lang; cats: Cat[] }) {
  const pathname = usePathname() || `/${lang}/`;
  const [open, setOpen] = useState<null | "products" | "company">(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const other = otherLang(lang);
  const switchHref = pathname.replace(/^\/(bn|en)/, `/${other}`);
  const base = `/${lang}`;

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  const isActive = (p: string) => pathname.replace(/\/$/, "") === `${base}${p}`.replace(/\/$/, "");
  const link = (p: string, label: string) => (
    <Link href={`${base}${p}/`} aria-current={isActive(p) ? "page" : undefined}
      className={`rounded-pill px-3 py-2 text-[15px] font-medium transition-colors hover:text-brand ${isActive(p) ? "text-brand" : "text-navy"}`}>{label}</Link>
  );
  const trigger = (key: "products" | "company", label: string) => (
    <button type="button" aria-expanded={open === key} aria-haspopup="true"
      onClick={() => setOpen(open === key ? null : key)}
      className="flex items-center gap-1 rounded-pill px-3 py-2 text-[15px] font-medium text-navy transition-colors hover:text-brand">
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={`transition-transform ${open === key ? "rotate-180" : ""}`}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
    </button>
  );

  return (
    <header ref={ref} className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_#DCE6DF,0_6px_18px_rgba(11,31,58,.06)]" : "border-b border-line"}`}>
      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link href={`${base}/`} aria-label="FileGharBD"><img src="/brand/logo-horizontal.svg" alt="FileGharBD" width={168} height={40} className="h-10 w-auto" /></Link>

        <nav aria-label={t(lang, "প্রধান মেনু", "Main menu")} className="hidden items-center gap-1 lg:flex">
          {link("", t(lang, "হোম", "Home"))}
          <div className="relative">
            {trigger("products", t(lang, "পণ্য", "Products"))}
            {open === "products" && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[620px] -translate-x-1/2 rounded-card border border-line bg-white p-4 shadow-[0_18px_40px_rgba(11,31,58,.12)]">
                <ul className="grid grid-cols-2 gap-1">
                  {cats.filter((c) => c.slug !== "digital-services").map((c) => (
                    <li key={c.slug}><Link href={`${base}/categories/${c.slug}/`} className="block rounded-xl px-3 py-2 text-[15px] hover:bg-brand-tint hover:text-brand-dark">{c.name}</Link></li>
                  ))}
                </ul>
                <Link href={`${base}/products/`} className="mt-3 block rounded-xl bg-navy px-4 py-3 text-center text-[15px] font-semibold text-white hover:bg-navy-2">{t(lang, "সব পণ্য দেখুন", "View all products")}</Link>
              </div>
            )}
          </div>
          {link("/services", t(lang, "ডিজিটাল সার্ভিস", "Digital Services"))}
          {link("/how-it-works", t(lang, "কীভাবে কাজ করে", "How It Works"))}
          <div className="relative">
            {trigger("company", t(lang, "আমাদের সম্পর্কে", "Company"))}
            {open === "company" && (
              <ul className="absolute left-0 top-full z-50 mt-3 w-56 rounded-card border border-line bg-white p-2 shadow-[0_18px_40px_rgba(11,31,58,.12)]">
                {[["/about", t(lang, "আমাদের সম্পর্কে", "About Us")], ["/why-choose-us", t(lang, "কেন আমরা", "Why Choose Us")], ["/faq", t(lang, "সাধারণ প্রশ্ন", "FAQ")]].map(([p, l]) => (
                  <li key={p}><Link href={`${base}${p}/`} className="block rounded-xl px-3 py-2 text-[15px] hover:bg-brand-tint hover:text-brand-dark">{l}</Link></li>
                ))}
              </ul>
            )}
          </div>
          {link("/contact", t(lang, "যোগাযোগ", "Contact"))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={switchHref} hrefLang={other} lang={other} className="rounded-pill border border-line px-3 py-2 text-sm font-semibold text-navy hover:border-brand hover:text-brand-dark" aria-label={t(lang, "Switch to English", "বাংলায় দেখুন")}>{other === "en" ? "EN" : "বাং"}</Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary hidden !min-h-[42px] !px-5 sm:inline-flex">WhatsApp</a>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden" aria-label={t(lang, "মেনু খুলুন", "Open menu")} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d={mobile ? "M4 4l12 12M16 4L4 16" : "M3 6h14M3 10h14M3 14h14"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {mobile && (
        <nav aria-label={t(lang, "মোবাইল মেনু", "Mobile menu")} className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {[["", t(lang, "হোম", "Home")], ["/products", t(lang, "সব পণ্য", "All Products")], ["/categories", t(lang, "ক্যাটাগরি", "Categories")], ["/services", t(lang, "ডিজিটাল সার্ভিস", "Digital Services")], ["/how-it-works", t(lang, "কীভাবে কাজ করে", "How It Works")], ["/why-choose-us", t(lang, "কেন আমরা", "Why Choose Us")], ["/about", t(lang, "আমাদের সম্পর্কে", "About Us")], ["/faq", t(lang, "সাধারণ প্রশ্ন", "FAQ")], ["/contact", t(lang, "যোগাযোগ", "Contact")]].map(([p, l]) => (
              <li key={p}><Link href={`${base}${p}/`} className={`block rounded-xl px-3 py-3 text-base font-medium ${isActive(p) ? "bg-brand-tint text-brand-dark" : "hover:bg-mist"}`}>{l}</Link></li>
            ))}
            <li className="pt-2"><a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">{t(lang, "WhatsApp-এ মেসেজ করুন", "Message on WhatsApp")}</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
