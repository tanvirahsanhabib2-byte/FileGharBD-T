import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

export type CardItem = { slug: string; category: string; categoryName: string; name: string; short: string };
export default function ProductCard({ lang, p }: { lang: Lang; p: CardItem }) {
  return (
    <article className="folder card group flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-brand">
      <Link href={`/${lang}/products/${p.slug}/`} className="block overflow-hidden bg-mist" tabIndex={-1} aria-hidden>
        <img src={`/images/products/${p.slug}.svg`} alt="" width={640} height={480} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/${lang}/categories/${p.category}/`} className="w-fit rounded-pill bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-dark hover:bg-brand hover:text-white">{p.categoryName}</Link>
        <h3 className="mt-3 text-lg font-semibold"><Link href={`/${lang}/products/${p.slug}/`} className="hover:text-brand-dark">{p.name}</Link></h3>
        <p className="mt-1 flex-1 text-[15px] text-navy/70">{p.short}</p>
        <div className="mt-4 flex gap-2">
          <Link href={`/${lang}/products/${p.slug}/`} className="btn-outline !min-h-[42px] flex-1 !px-4 text-sm">{t(lang, "বিস্তারিত", "Details")}</Link>
          <a href={waLink(t(lang, `আসসালামু আলাইকুম, "${p.name}" সম্পর্কে জানতে চাই।`, `Hello, I would like to know about "${p.name}".`))} target="_blank" rel="noopener noreferrer" className="btn-primary !min-h-[42px] flex-1 !px-4 text-sm">{t(lang, "মূল্য জানুন", "Ask price")}</a>
        </div>
      </div>
    </article>
  );
}
