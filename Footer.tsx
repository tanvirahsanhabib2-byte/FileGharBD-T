import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import { SITE, waLink } from "@/lib/site";
import { categories } from "@/lib/data";

export default function Footer({ lang }: { lang: Lang }) {
  const base = `/${lang}`;
  const col = "mb-3 text-base font-semibold text-white";
  const a = "text-[15px] text-white/75 hover:text-white";
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/brand/logo-horizontal-light.svg" alt="FileGharBD" width={168} height={40} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-[15px] text-white/75">{t(lang, "হালাল ও বৈধ ডিজিটাল পণ্য এবং ডিজিটাল সার্ভিসের ঠিকানা।", "Your place for halal, legitimate digital products and digital services.")}</p>
          <p className="mt-3 text-sm font-semibold text-brand-light">{SITE.tagline}</p>
        </div>
        <div>
          <h2 className={col}>{t(lang, "ক্যাটাগরি", "Categories")}</h2>
          <ul className="space-y-2">{categories.map((c) => <li key={c.slug}><Link className={a} href={`${base}/categories/${c.slug}/`}>{c.name[lang]}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={col}>{t(lang, "দ্রুত লিংক", "Quick links")}</h2>
          <ul className="space-y-2">
            {[["/products", t(lang, "সব পণ্য", "All Products")], ["/services", t(lang, "ডিজিটাল সার্ভিস", "Digital Services")], ["/how-it-works", t(lang, "কীভাবে কাজ করে", "How It Works")], ["/why-choose-us", t(lang, "কেন আমরা", "Why Choose Us")], ["/about", t(lang, "আমাদের সম্পর্কে", "About Us")], ["/faq", t(lang, "সাধারণ প্রশ্ন", "FAQ")], ["/contact", t(lang, "যোগাযোগ", "Contact")], ["/privacy-policy", t(lang, "গোপনীয়তা নীতি", "Privacy Policy")], ["/terms", t(lang, "শর্তাবলি", "Terms & Conditions")]].map(([p, l]) => <li key={p}><Link className={a} href={`${base}${p}/`}>{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={col}>{t(lang, "যোগাযোগ", "Contact")}</h2>
          <ul className="space-y-2">
            <li><a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a className={a} href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li><a className={a} href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a className={a} href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-sm text-white/65">© {new Date().getFullYear()} {SITE.name}. {t(lang, "সর্বস্বত্ব সংরক্ষিত।", "All rights reserved.")}</p>
      </div>
    </footer>
  );
}
