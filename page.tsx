"use client";
import { useEffect } from "react";
import Link from "next/link";

// "/" sends visitors to the Bengali site (primary language). Both links work without JavaScript.
export default function RootRedirect() {
  useEffect(() => {
    const saved = typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("en") ? "en" : "bn";
    window.location.replace(`/${saved}/`);
  }, []);
  return (
    <main className="grid min-h-screen place-items-center bg-mist p-6 text-center">
      <noscript><meta httpEquiv="refresh" content="0;url=/bn/" /></noscript>
      <div>
        <img src="/brand/logo-vertical.svg" alt="FileGharBD" width={240} height={224} className="mx-auto" />
        <p className="mt-6 flex justify-center gap-3">
          <Link className="btn-primary" href="/bn/">বাংলা</Link>
          <Link className="btn-outline" href="/en/">English</Link>
        </p>
      </div>
    </main>
  );
}
