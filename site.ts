// Site-wide settings. Change contact details here once; the whole site updates.
export const SITE = {
  name: "FileGharBD",
  tagline: "DOWNLOAD MORE, PAY LESS",
  // Set NEXT_PUBLIC_SITE_URL when your domain is ready (see README). No domain is assumed.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  email: "filegharbd@gmail.com",
  phone: "+8801828815653",
  whatsapp: "8801828815653",
  facebook: "https://www.facebook.com/share/1AsrUmesCF/",
};
export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
