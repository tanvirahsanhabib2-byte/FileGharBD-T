"use client";
import { useEffect, useRef } from "react";
// Soft fade-in once when a block scrolls into view. Content stays visible without JavaScript.
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    el.classList.add("reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
