"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    /* ---- Keep GSAP ScrollTrigger in sync with Lenis smooth scroll ----
       Per-component animations now use ScrollTrigger; updating it on every
       Lenis scroll keeps trigger positions accurate during smooth scrolling. */
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

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

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.off("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      lenis.destroy();
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
        background: "linear-gradient(90deg, #6B1626, #8B2236, #6B1626)",
        boxShadow: "0 0 8px rgba(139,34,54,0.5)",
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }}
      ref={barRef}
    />
  );
}
