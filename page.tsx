import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LANGS, t, type Lang } from "@/lib/i18n";
import { pageMeta, jsonLd } from "@/lib/seo";
import { SITE, waLink } from "@/lib/site";
import { services, getService } from "@/lib/data";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug }))); }
export function generateMetadata({ params }: { params: { lang: Lang; slug: string } }): Metadata {
  const s = getService(params.slug); if (!s) return {};
  return pageMeta(params.lang, `services/${s.slug}`, s.name[params.lang], s.short[params.lang], `/images/services/${s.slug}.svg`);
}
export default function ServicePage({ params }: { params: { lang: Lang; slug: string } }) {
  const lang = params.lang; const s = getService(params.slug); if (!s) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.name[lang], description: s.short[lang], provider: { "@type": "Organization", name: SITE.name, url: SITE.url } };
  return (
    <>
      <PageHero lang={lang} title={s.name[lang]} text={s.short[lang]} crumbs={[{ label: t(lang, "সার্ভিস", "Services"), href: `/${lang}/services/` }, { label: s.name[lang] }]} />
      <section className="section"><div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <img src={`/images/services/${s.slug}.svg`} alt={s.name[lang]} width={640} height={480} className="aspect-[4/3] w-full rounded-card object-cover" />
          <p className="mt-6 text-lg text-navy/80">{s.long[lang]}</p>
          <h2 className="mt-7 text-xl font-semibold">{t(lang, "যা পাবেন", "What you get")}</h2>
          <ul className="mt-3 space-y-2">{s.deliverables.map((d, i) => <li key={i} className="flex gap-3"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-1 shrink-0 text-brand"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{d[lang]}</li>)}</ul>
          <p className="mt-6 text-sm text-navy/60">{t(lang, "কাজের পরিধি, সময় ও মূল্য আলোচনার মাধ্যমে নির্ধারণ করা হয়।", "Scope, timing and price are agreed through discussion.")}</p>
          <a href={waLink(t(lang, `আসসালামু আলাইকুম, "${s.name.bn}" সার্ভিস সম্পর্কে জানতে চাই।`, `Hello, I would like to know about your "${s.name.en}" service.`))} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">{t(lang, "WhatsApp-এ আলোচনা করুন", "Discuss on WhatsApp")}</a>
        </div>
        <div><h2 className="mb-4 text-xl font-semibold">{t(lang, "আপনার প্রয়োজন লিখুন", "Describe what you need")}</h2><ContactForm lang={lang} defaultSubject={s.name[lang]} /></div>
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
    </>
  );
}
