/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // static site: works on Netlify, Vercel, Cloudflare Pages, cPanel, any static host
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
