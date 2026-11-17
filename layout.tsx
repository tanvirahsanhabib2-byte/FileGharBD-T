import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { LANGS, isLang, t } from "@/lib/i18n";
import { catList } from "@/lib/data";
import { SITE } from "@/lib/site";
import { jsonLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.map((lang) => ({ lang })); }

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;
  const org = { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon-512.png`, email: SITE.email, telephone: SITE.phone, sameAs: [SITE.facebook], slogan: SITE.tagline };
  return (
    <div lang={lang}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-pill focus:bg-navy focus:px-4 focus:py-2 focus:text-white">{t(lang, "মূল কনটেন্টে যান", "Skip to content")}</a>
      <Header lang={lang} cats={catList(lang)} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <FloatingActions lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(org)} />
    </div>
  );
}
