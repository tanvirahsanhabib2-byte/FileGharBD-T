import Link from "next/link";
import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { why } from "@/lib/data";
import PageHero from "@/components/PageHero";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const l = params.lang;
  return pageMeta(l, "why-choose-us", t(l, "কেন FileGharBD", "Why Choose FileGharBD"), t(l, "হালাল ও বৈধ ডিজিটাল পণ্য, সরাসরি WhatsApp যোগাযোগ ও কাস্টমাইজযোগ্য কাজ।", "Halal, legitimate digital products, direct WhatsApp contact and customizable work."));
}
export default function Why({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  return (
    <>
      <PageHero lang={lang} title={t(lang, "কেন FileGharBD", "Why Choose FileGharBD")} crumbs={[{ label: t(lang, "কেন আমরা", "Why Choose Us") }]} />
      <section className="section"><div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <img src="/images/why-us.svg" alt={t(lang, "FileGharBD-এর বৈশিষ্ট্যের চিত্র", "Illustration of FileGharBD's strengths")} width={760} height={560} className="h-auto w-full rounded-card" />
        <ul className="space-y-5">{why.map((w, i) => <li key={i} className="card p-5"><h2 className="text-lg font-semibold">{w.title[lang]}</h2><p className="mt-1 text-navy/70">{w.text[lang]}</p></li>)}</ul>
      </div></section>
      <section className="pb-16"><div className="container-page"><Link href={`/${lang}/contact/`} className="btn-primary">{t(lang, "আমাদের সঙ্গে কথা বলুন", "Talk to us")}</Link></div></section>
    </>
  );
}
