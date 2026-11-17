export type Lang = "bn" | "en";
export const LANGS: Lang[] = ["bn", "en"];
export const isLang = (v: string): v is Lang => v === "bn" || v === "en";
export const t = (lang: Lang, bn: string, en: string) => (lang === "bn" ? bn : en);
export const otherLang = (lang: Lang): Lang => (lang === "bn" ? "en" : "bn");
