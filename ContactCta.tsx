import { t, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/site";
export default function ContactCta({ lang }: { lang: Lang }) {
  return (
    <div className="mt-10 rounded-card bg-mist p-6 text-center">
      <p className="font-semibold">{t(lang, "উত্তর খুঁজে পাননি?", "Did not find your answer?")}</p>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3">{t(lang, "WhatsApp-এ জিজ্ঞাসা করুন", "Ask on WhatsApp")}</a>
    </div>
  );
}
