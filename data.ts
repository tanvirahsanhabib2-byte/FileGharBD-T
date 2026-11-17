import { categories, products, services, steps, why, faqs } from "@/data/catalog.mjs";
import type { Lang } from "./i18n";

export { categories, products, services, steps, why, faqs };
export type Product = (typeof products)[number];
export type Service = (typeof services)[number];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const catName = (slug: string, lang: Lang) => getCategory(slug)?.name[lang] ?? slug;

export function cardItems(lang: Lang) {
  return products.map((p) => ({ slug: p.slug, category: p.category, categoryName: catName(p.category, lang), name: p.name[lang], short: p.short[lang] }));
}
export const catList = (lang: Lang) => categories.map((c) => ({ slug: c.slug, name: c.name[lang] }));
