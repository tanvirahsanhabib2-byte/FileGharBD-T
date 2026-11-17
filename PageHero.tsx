import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

export default function PageHero({ lang, title, text, crumbs }: { lang: Lang; title: string; text?: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-page py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-navy/65">
          <ol className="flex flex-wrap gap-x-2">
            <li><Link href={`/${lang}/`} className="hover:text-brand-dark">{t(lang, "হোম", "Home")}</Link></li>
            {crumbs?.map((c, i) => <li key={i} className="flex gap-2"><span aria-hidden>/</span>{c.href ? <Link href={c.href} className="hover:text-brand-dark">{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
          </ol>
        </nav>
        <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-2xl text-lg text-navy/75">{text}</p>}
      </div>
    </section>
  );
}
