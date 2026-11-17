import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { products, services, categories } from "@/lib/data";

export const dynamic = "force-static";
const staticPaths = ["", "products", "categories", "services", "how-it-works", "why-choose-us", "about", "faq", "contact", "privacy-policy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...products.map((p) => `products/${p.slug}`),
    ...categories.map((c) => `categories/${c.slug}`),
    ...services.map((s) => `services/${s.slug}`),
  ];
  return paths.flatMap((p) =>
    (["bn", "en"] as const).map((lang) => ({
      url: `${SITE.url}/${lang}/${p ? p + "/" : ""}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: { bn: `${SITE.url}/bn/${p ? p + "/" : ""}`, en: `${SITE.url}/en/${p ? p + "/" : ""}` } },
    }))
  );
}
