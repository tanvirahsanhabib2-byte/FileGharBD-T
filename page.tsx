import Link from "next/link";
import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { categories, products } from "@/lib/data";
import PageHero from "@/components/PageHero";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const l = params.lang;
  return pageMeta(l, "categories", t(l, "পণ্যের ক্যাটাগরি", "Product Categories"), t(l, "ডিজিটাল পণ্য ও সার্ভিসের সব ক্যাটাগরি এক জায়গায়।", "All digital product and service categories in one place."));
}
export default function Categories({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  return (
    <>
      <PageHero lang={lang} title={t(lang, "পণ্যের ক্যাটাগরি", "Product Categories")} text={t(lang, "আপনার প্রয়োজনের ধরন অনুযায়ী বেছে নিন।", "Choose by the kind of thing you need.")} crumbs={[{ label: t(lang, "ক্যাটাগরি", "Categories") }]} />
      <section className="section"><div className="container-page">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.slug).length;
            const href = c.slug === "digital-services" ? `/${lang}/services/` : `/${lang}/categories/${c.slug}/`;
            return (
              <li key={c.slug}><Link href={href} className="folder card group block h-full overflow-hidden transition-colors hover:border-brand">
                <img src={`/images/categories/${c.slug}.svg`} alt="" width={640} height={480} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5"><h2 className="text-lg font-semibold group-hover:text-brand-dark">{c.name[lang]}</h2><p className="mt-1 text-[15px] text-navy/70">{c.desc[lang]}</p>
                  <p className="mt-3 text-sm font-semibold text-brand-dark">{c.slug === "digital-services" ? t(lang, "সার্ভিস দেখুন", "View services") : t(lang, `${n}টি পণ্য`, `${n} product${n === 1 ? "" : "s"}`)}</p></div>
              </Link></li>
            );
          })}
        </ul>
      </div></section>
    </>
  );
}
