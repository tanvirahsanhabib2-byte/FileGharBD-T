# FileGharBD ওয়েবসাইট

হালাল ডিজিটাল পণ্য ও সার্ভিসের দ্বিভাষিক (বাংলা + English) স্ট্যাটিক ওয়েবসাইট।
Next.js 14 · TypeScript · Tailwind CSS · Poppins (বাংলা অক্ষরের জন্য Hind Siliguri)

লগইন, রেজিস্ট্রেশন, অ্যাডমিন, পেমেন্ট, চেকআউট ও কার্ট **নেই**। যোগাযোগ ফর্ম WhatsApp মেসেজ তৈরি করে।

## লোকালহোস্টে চালানো
```bash
npm install
npm run dev          # http://localhost:3000  (/bn/ ও /en/)
```

## বিল্ড
```bash
npm run build        # স্ট্যাটিক সাইট তৈরি হয় out/ ফোল্ডারে
node scripts/check-links.mjs   # সব ইন্টারনাল লিংক ও ছবি যাচাই
```

## ডিপ্লয় (ডোমেইন/হোস্টিং এখনো ঠিক হয়নি)
`out/` ফোল্ডারটি যেকোনো স্ট্যাটিক হোস্টে চলে: Netlify, Vercel, Cloudflare Pages, cPanel (public_html)।
1. ডোমেইন ঠিক হলে `NEXT_PUBLIC_SITE_URL=https://আপনার-ডোমেইন` সেট করে বিল্ড দিন (`.env.example` দেখুন)।
   এটি canonical URL, sitemap.xml, robots.txt ও Open Graph-এর ঠিকানা নির্ধারণ করে। না দিলে `http://localhost:3000` ধরা হয়।
2. Netlify/Vercel: Build command `npm run build`, Publish directory `out`।
3. cPanel: `out/`-এর ভেতরের সব ফাইল `public_html`-এ আপলোড করুন।

## যা পরিবর্তন করবেন কোথায়
| কী | কোথায় |
|---|---|
| পণ্য, ক্যাটাগরি, সার্ভিস, FAQ, ধাপ (বাংলা + English) | `src/data/catalog.mjs` |
| ইমেইল, ফোন, WhatsApp, Facebook | `src/lib/site.ts` |
| রং, বর্ডার রেডিয়াস, ফন্ট | `tailwind.config.ts`, `src/app/globals.css` |
| লোগো, ফেভিকন, সব ছবি | `scripts/generate-assets.mjs` চালিয়ে: `npm run assets` |
| নিজের ছবি ব্যবহার | `public/images/products/<slug>.svg` একই নামে PNG/WebP দিয়ে বদলান এবং `ProductCard.tsx`/`Gallery.tsx`-এ এক্সটেনশন পাল্টান |
| হোমপেজের টেক্সট | `src/app/[lang]/page.tsx` |
| ব্যানার স্লাইডার | `src/components/BannerSlider.tsx` |

নতুন পণ্য যোগ করতে `catalog.mjs`-এ একটি এন্ট্রি যোগ করে `npm run assets` ও `npm run build` চালান।

## গুরুত্বপূর্ণ নোট
- `catalog.mjs`-এর পণ্য ও সার্ভিস **উদাহরণ ক্যাটালগ**। আপনি বাস্তবে যা দেন, তা দিয়ে বদলে নিন। মূল্য ইচ্ছাকৃতভাবে দেওয়া হয়নি; সব পাতায় "WhatsApp-এ জানানো হয়" লেখা আছে।
- ছবিগুলো পণ্যের আসল ছবি নয়, প্রতীকী ইলাস্ট্রেশন (SVG)।
- যোগাযোগ ফর্ম কোনো সার্ভারে ডেটা জমা রাখে না; WhatsApp খুলে ভিজিটর নিজে মেসেজ পাঠান।

## ফোল্ডার কাঠামো
```
src/app/[lang]/...    সব পেজ (bn / en)
src/components/       Header, Footer, ProductBrowser, BannerSlider, Gallery, ContactForm ...
src/data/catalog.mjs  সব কনটেন্ট ডেটা
src/lib/              সাইট কনফিগ, i18n, SEO হেল্পার
scripts/              ছবি তৈরির ও লিংক চেকের স্ক্রিপ্ট
public/               লোগো, আইকন, ছবি (SVG/PNG/WebP)
```
