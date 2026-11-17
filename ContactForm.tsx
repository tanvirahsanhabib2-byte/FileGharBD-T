"use client";
import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

// No server: the form builds a formatted WhatsApp message and opens WhatsApp. The visitor sends it themselves.
export default function ContactForm({ lang, defaultSubject = "" }: { lang: Lang; defaultSubject?: string }) {
  const [v, setV] = useState({ name: "", phone: "", email: "", subject: defaultSubject, message: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [link, setLink] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = t(lang, "আপনার নাম লিখুন।", "Enter your name.");
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(v.phone.replace(/[\s-]/g, "")) && !/^\+?\d{8,15}$/.test(v.phone.replace(/[\s-]/g, ""))) er.phone = t(lang, "সঠিক ফোন নম্বর লিখুন, যেমন 01XXXXXXXXX।", "Enter a valid phone number, e.g. 01XXXXXXXXX.");
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) er.email = t(lang, "ইমেইল ঠিকানাটি সঠিক নয়।", "That email address looks wrong.");
    if (v.subject.trim().length < 2) er.subject = t(lang, "বিষয় লিখুন।", "Enter a subject.");
    if (v.message.trim().length < 5) er.message = t(lang, "আপনার বার্তা লিখুন।", "Write your message.");
    setErrs(er);
    if (Object.keys(er).length) return;
    const text = [
      t(lang, "*FileGharBD — নতুন বার্তা*", "*FileGharBD — New message*"), "",
      `${t(lang, "নাম", "Name")}: ${v.name.trim()}`,
      `${t(lang, "ফোন", "Phone")}: ${v.phone.trim()}`,
      v.email.trim() ? `${t(lang, "ইমেইল", "Email")}: ${v.email.trim()}` : "",
      `${t(lang, "বিষয়", "Subject")}: ${v.subject.trim()}`, "",
      `${t(lang, "বার্তা", "Message")}:`, v.message.trim(),
    ].filter((l, i, a) => l !== "" || (a[i - 1] !== "" && i < a.length - 1)).join("\n");
    const url = waLink(text);
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  const err = (k: string) => errs[k] && <p id={`${k}-err`} role="alert" className="mt-1 text-sm text-red-700">{errs[k]}</p>;
  const lab = "mb-1.5 block text-sm font-semibold";
  return (
    <form onSubmit={submit} noValidate className="card space-y-4 p-5 sm:p-7">
      <div><label htmlFor="cf-name" className={lab}>{t(lang, "আপনার নাম", "Full name")} *</label><input id="cf-name" className="field" value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errs.name} aria-describedby="name-err" />{err("name")}</div>
      <div><label htmlFor="cf-phone" className={lab}>{t(lang, "ফোন নম্বর", "Phone number")} *</label><input id="cf-phone" type="tel" inputMode="tel" className="field" value={v.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errs.phone} aria-describedby="phone-err" />{err("phone")}</div>
      <div><label htmlFor="cf-email" className={lab}>{t(lang, "ইমেইল (ঐচ্ছিক)", "Email (optional)")}</label><input id="cf-email" type="email" className="field" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errs.email} aria-describedby="email-err" />{err("email")}</div>
      <div><label htmlFor="cf-subject" className={lab}>{t(lang, "বিষয়", "Subject")} *</label><input id="cf-subject" className="field" value={v.subject} onChange={set("subject")} aria-invalid={!!errs.subject} aria-describedby="subject-err" />{err("subject")}</div>
      <div><label htmlFor="cf-message" className={lab}>{t(lang, "বার্তা", "Message")} *</label><textarea id="cf-message" rows={5} className="field" value={v.message} onChange={set("message")} aria-invalid={!!errs.message} aria-describedby="message-err" />{err("message")}</div>
      <button type="submit" className="btn-primary w-full">{t(lang, "WhatsApp-এ পাঠান", "Send on WhatsApp")}</button>
      <p className="text-sm text-navy/65">{t(lang, "বোতামে চাপ দিলে আপনার তথ্য দিয়ে সাজানো একটি মেসেজ WhatsApp-এ খুলবে। সেখানে আপনি নিজে “Send” চাপলে মেসেজ আমাদের কাছে যাবে।", "Pressing the button opens WhatsApp with a ready message. The message reaches us only when you press Send there.")}</p>
      {link && (
        <p role="status" className="rounded-2xl bg-brand-tint p-4 text-sm text-brand-dark">
          {t(lang, "WhatsApp খুলে থাকলে মেসেজটি পাঠিয়ে দিন। না খুললে ", "If WhatsApp opened, press Send. If it did not, ")}
          <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{t(lang, "এই লিংকে চাপুন", "use this link")}</a>.
        </p>
      )}
    </form>
  );
}
