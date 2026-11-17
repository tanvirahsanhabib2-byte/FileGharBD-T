import Link from "next/link";
export const metadata = { title: "404 | পেজ পাওয়া যায়নি / Page not found", robots: { index: false } };
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4 py-16 text-center">
      <div className="max-w-md">
        <img src="/images/404.svg" alt="" width={520} height={360} className="mx-auto h-auto w-full max-w-sm rounded-card" />
        <h1 className="mt-8 text-2xl font-semibold">পেজটি পাওয়া যায়নি</h1>
        <p className="mt-2 text-navy/70">আপনি যে পেজটি খুঁজছেন তা সরানো হয়েছে বা ঠিকানাটি ভুল।</p>
        <h2 className="mt-6 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-navy/70">The page you are looking for was moved or the address is wrong.</p>
        <p className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" href="/bn/">হোমে ফিরুন</Link>
          <Link className="btn-outline" href="/en/">Back to home</Link>
        </p>
      </div>
    </main>
  );
}
