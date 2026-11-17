import Link from "next/link";
import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { pageMeta, jsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cardItems, categories, services, steps, why } from "@/lib/data";
import HeroSearch from "@/components/HeroSearch";
import BannerSlider from "@/components/BannerSlider";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const l = params.lang;
  const title = t(l, "FileGharBD | হালাল ডিজিটাল পণ্য ও সার্ভিস", "FileGharBD | Halal Digital Products & Services");
  return { ...pageMeta(l, "", title, t(l, "টেমপ্লেট, ই-বুক, ডিজাইন রিসোর্স ও ডিজিটাল সার্ভিস, শুধু হালাল ও বৈধ। DOWNLOAD MORE, PAY LESS।", "Templates, e-books, design resources and digital services, halal and legitimate only. DOWNLOAD MORE, PAY LESS.")), title: { absolute: title } };
}

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const base = `/${lang}`;
  const items = cardItems(lang).slice(0, 6);
  const site = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: `${SITE.url}/${lang}/`, inLanguage: lang };
  return (
    <>
      <section className="bg-mist">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">{t(lang, "বেশি ডাউনলোড করুন, কম খরচ করুন।", "Download more. Pay less.")}</h1>
            <p className="mt-4 max-w-xl text-lg text-navy/75">{t(lang, "টেমপ্লেট, ই-বুক, ডিজাইন রিসোর্স আর ডিজিটাল সার্ভিস, সবই হালাল ও বৈধ। অ্যাকাউন্ট ছাড়াই, সরাসরি WhatsApp-এ কথা বলুন।", "Templates, e-books, design resources and digital services, all halal and legitimate. No account needed; talk to us directly on WhatsApp.")}</p>
            <div className="mt-7"><HeroSearch lang={lang} /></div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {categories.filter((c) => c.slug !== "digital-services").slice(0, 5).map((c) => <li key={c.slug}><Link href={`${base}/categories/${c.slug}/`} className="rounded-pill border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand-dark">{c.name[lang]}</Link></li>)}
            </ul>
          </div>
          <img src="/images/hero.svg" alt={t(lang, "ফাইল কার্ডের একটি স্তূপ ও ডাউনলোড আইকন", "A stack of file cards with a download icon")} width={760} height={560} className="h-auto w-full rounded-card" />
        </div>
      </section>

      <div className="py-8 sm:py-12"><BannerSlider lang={lang} /></div>

      <section className="section pt-4">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><h2 className="text-2xl font-semibold sm:text-3xl">{t(lang, "ক্যাটাগরি অনুযায়ী খুঁজুন", "Browse by category")}</h2><p className="mt-2 text-navy/70">{t(lang, "আপনার প্রয়োজনের ধরন বেছে নিন।", "Pick the kind of thing you need.")}</p></div>
              <Link href={`${base}/categories/`} className="btn-outline">{t(lang, "সব ক্যাটাগরি", "All categories")}</Link>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`${base}/categories/${c.slug}/`} className="card group flex h-full items-center gap-4 p-3 transition-colors hover:border-brand">
                  <img src={`/images/categories/${c.slug}.svg`} alt="" width={96} height={72} loading="lazy" className="h-[72px] w-24 shrink-0 rounded-2xl object-cover" />
                  <span><span className="block font-semibold group-hover:text-brand-dark">{c.name[lang]}</span><span className="mt-0.5 block text-sm text-navy/65">{c.desc[lang]}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="text-2xl font-semibold sm:text-3xl">{t(lang, "জনপ্রিয় ক্যাটালগ থেকে", "From the catalog")}</h2><p className="mt-2 text-navy/70">{t(lang, "মূল্য ও প্রাপ্যতা WhatsApp-এ নিশ্চিত করা হয়।", "Price and availability are confirmed on WhatsApp.")}</p></div>
            <Link href={`${base}/products/`} className="btn-dark">{t(lang, "সব পণ্য দেখুন", "View all products")}</Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <li key={p.slug}><ProductCard lang={lang} p={p} /></li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <img src="/images/how-it-works.svg" alt={t(lang, "অর্ডারের ধাপ: খুঁজুন, মেসেজ করুন, নিশ্চিত করুন", "Order steps: search, message, confirm")} width={760} height={560} loading="lazy" className="h-auto w-full rounded-card" />
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t(lang, "চার ধাপে পণ্য পান", "Get a product in four steps")}</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-semibold text-white">{i + 1}</span>
                  <div><h3 className="font-semibold">{s.title[lang]}</h3><p className="text-[15px] text-navy/70">{s.text[lang]}</p></div>
                </li>
              ))}
            </ol>
            <Link href={`${base}/how-it-works/`} className="btn-outline mt-7">{t(lang, "বিস্তারিত দেখুন", "Learn more")}</Link>
          </div>
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container-page">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t(lang, "ডিজিটাল সার্ভিস", "Digital services")}</h2>
          <p className="mt-2 max-w-2xl text-white/75">{t(lang, "রেডিমেড পণ্যে না মিললে আপনার জন্য আলাদা করে কাজ করে দেওয়া হয়।", "If a ready-made product is not a fit, we can do the work for you.")}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <li key={s.slug}><Link href={`${base}/services/${s.slug}/`} className="block h-full rounded-card border border-white/15 p-5 transition-colors hover:border-brand-light">
                <h3 className="font-semibold">{s.name[lang]}</h3><p className="mt-1 text-[15px] text-white/75">{s.short[lang]}</p></Link></li>
            ))}
          </ul>
          <Link href={`${base}/services/`} className="btn mt-8 bg-white text-navy hover:bg-brand-tint">{t(lang, "সব সার্ভিস", "All services")}</Link>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t(lang, "কেন FileGharBD", "Why FileGharBD")}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => <li key={i} className="card p-5"><h3 className="font-semibold">{w.title[lang]}</h3><p className="mt-2 text-[15px] text-navy/70">{w.text[lang]}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="rounded-card bg-brand p-8 text-white sm:p-12">
            <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">{t(lang, "কী দরকার, সরাসরি জানান।", "Tell us what you need.")}</h2>
            <p className="mt-2 max-w-xl text-white/90">{t(lang, "পণ্য খুঁজে না পেলে বা কাস্টম কাজ চাইলে WhatsApp-এ লিখুন।", "Can't find a product, or need custom work? Write to us on WhatsApp.")}</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href={`${base}/contact/`} className="btn bg-white text-navy hover:bg-brand-tint">{t(lang, "যোগাযোগ করুন", "Contact us")}</Link></div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(site)} />
    </>
  );
}
