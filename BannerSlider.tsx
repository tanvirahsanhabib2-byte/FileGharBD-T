"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";

// Three promotional banners. Edit the text here; images are /public/images/banner-*.svg
export default function BannerSlider({ lang }: { lang: Lang }) {
  const slides = [
    { img: "/images/banner-templates.svg", dark: true, title: t(lang, "টেমপ্লেট ও ডিজিটাল রিসোর্স", "Templates & digital resources"), text: t(lang, "ডকুমেন্ট, স্লাইড ও শিটের এডিটযোগ্য টেমপ্লেট।", "Editable templates for documents, slides and sheets."), href: `/${lang}/categories/productivity-resources/`, cta: t(lang, "ক্যাটাগরি দেখুন", "Browse category") },
    { img: "/images/banner-services.svg", dark: true, green: true, title: t(lang, "কাস্টম ডিজিটাল সার্ভিস", "Custom digital services"), text: t(lang, "লোগো, ওয়েবসাইট ও কনটেন্টের কাজ আপনার প্রয়োজন অনুযায়ী।", "Logo, website and content work shaped to your needs."), href: `/${lang}/services/`, cta: t(lang, "সার্ভিস দেখুন", "See services") },
    { img: "/images/banner-resources.svg", dark: false, title: t(lang, "ডিজাইন ও ওয়েব রিসোর্স", "Design & web resources"), text: t(lang, "আইকন, মকআপ, UI কিট ও ওয়েবসাইট টেমপ্লেট।", "Icons, mockups, UI kits and website templates."), href: `/${lang}/categories/design-resources/`, cta: t(lang, "রিসোর্স দেখুন", "See resources") },
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [paused, slides.length]);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section aria-roledescription="carousel" aria-label={t(lang, "প্রচার ব্যানার", "Promotional banners")} className="container-page"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-card border border-line">
        {slides.map((s, n) => (
          <div key={n} role="group" aria-roledescription="slide" aria-label={`${n + 1} / ${slides.length}`} hidden={n !== i} className="relative">
            <img src={s.img} alt="" width={1200} height={400} loading={n === 0 ? "eager" : "lazy"} className="h-[260px] w-full object-cover object-right sm:h-[320px] lg:h-[360px]" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-[78%] pl-6 sm:max-w-[52%] sm:pl-10 lg:pl-14">
                <h2 className={`text-xl font-semibold sm:text-3xl ${s.dark ? "text-white" : "text-navy"}`}>{s.title}</h2>
                <p className={`mt-2 hidden text-[15px] sm:block ${s.dark ? "text-white/85" : "text-navy/75"}`}>{s.text}</p>
                <Link href={s.href} className={`mt-4 ${s.green ? "btn bg-white text-navy hover:bg-brand-tint" : s.dark ? "btn bg-brand-light text-navy hover:bg-white" : "btn-primary"} !min-h-[42px]`}>{s.cta}</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-white/90 px-3 py-1.5">
          <button type="button" aria-label={t(lang, "আগের ব্যানার", "Previous banner")} onClick={() => go(i - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-mist"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M8 2L4 6l4 4" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" /></svg></button>
          {slides.map((_, n) => <button key={n} type="button" aria-label={`${t(lang, "ব্যানার", "Banner")} ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} className={`h-2.5 rounded-full transition-all ${n === i ? "w-6 bg-brand" : "w-2.5 bg-navy/25"}`} />)}
          <button type="button" aria-label={t(lang, "পরের ব্যানার", "Next banner")} onClick={() => go(i + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-mist"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M4 2l4 4-4 4" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" /></svg></button>
        </div>
      </div>
    </section>
  );
}
