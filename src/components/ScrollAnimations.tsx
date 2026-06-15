"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function ScrollAnimations() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ---------------- Lenis smooth scroll ---------------- */
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    /* ---------------- Scroll progress bar ---------------- */
    const updateProgress = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    lenis.on("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    updateProgress();

    /* ---------------- Global reveal observer ---------------- */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const observed = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          if (prefersReducedMotion) {
            el.classList.add("visible");
          } else {
            io.observe(el);
          }
        }
      });
    };
    observeAll();

    // Catch reveal elements added/replaced after mount (e.g. filtered grids).
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      lenis.destroy();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: "0%",
        zIndex: 100,
        background: "linear-gradient(90deg, #B8932A, #D4A843, #E8D5A3)",
        boxShadow: "0 0 8px rgba(184,147,42,0.5)",
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }}
      ref={barRef}
    />
  );
}
