import type { Metadata } from "next";
import { SITE } from "./site";
import type { Lang } from "./i18n";

// Builds title/description/canonical/hreflang/Open Graph for any page.
export function pageMeta(lang: Lang, path: string, title: string, description: string, image = "/og-image.png"): Metadata {
  const p = path ? `/${path}/` : "/";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/${lang}${p === "/" ? "/" : p}`,
      languages: { bn: `${SITE.url}/bn${p}`, en: `${SITE.url}/en${p}`, "x-default": `${SITE.url}/bn${p}` },
    },
    openGraph: {
      title, description, type: "website", siteName: SITE.name,
      locale: lang === "bn" ? "bn_BD" : "en_US", url: `${SITE.url}/${lang}${p}`,
      images: [{ url: `${SITE.url}${image}`, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE.url}${image}`] },
  };
}
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data) });
