import Link from "next/link";
import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { steps } from "@/lib/data";
import PageHero from "@/components/PageHero";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const l = params.lang;
  return pageMeta(l, "how-it-works", t(l, "কীভাবে কাজ করে", "How It Works"), t(l, "চার ধাপে FileGharBD থেকে ডিজিটাল পণ্য বা সার্ভিস নিন।", "Get a digital product or service from FileGharBD in four steps."));
}
export default function How({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  return (
    <>
      <PageHero lang={lang} title={t(lang, "কীভাবে কাজ করে", "How It Works")} text={t(lang, "অ্যাকাউন্ট নেই, চেকআউট নেই। শুধু খুঁজুন আর WhatsApp-এ কথা বলুন।", "No account, no checkout. Just find what you need and talk to us on WhatsApp.")} crumbs={[{ label: t(lang, "কীভাবে কাজ করে", "How It Works") }]} />
      <section className="section"><div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={i} className="card flex gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-lg font-semibold text-white">{i + 1}</span>
              <div><h2 className="text-lg font-semibold">{s.title[lang]}</h2><p className="mt-1 text-navy/70">{s.text[lang]}</p></div></li>
          ))}
        </ol>
        <img src="/images/how-it-works.svg" alt={t(lang, "অর্ডারের ধাপের চিত্র", "Illustration of the order steps")} width={760} height={560} className="h-auto w-full rounded-card" />
      </div></section>
      <section className="pb-16"><div className="container-page flex flex-wrap gap-3"><Link href={`/${lang}/products/`} className="btn-primary">{t(lang, "পণ্য দেখুন", "Browse products")}</Link><Link href={`/${lang}/faq/`} className="btn-outline">{t(lang, "সাধারণ প্রশ্ন", "Read the FAQ")}</Link></div></section>
    </>
  );
}
