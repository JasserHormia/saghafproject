"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLACK = "#0A0A0A";
const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";
const BURGUNDY = "#6B1626";
const BURGUNDY_LIGHT = "#8B2236";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HeroSection({ start = true }: { start?: boolean }) {
  const [ctaHover, setCtaHover] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const artRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  /* ---------- Setup once: initial (hidden) states, scroll parallax, mouse parallax ---------- */
  useIsoLayoutEffect(() => {
    const media = mediaRef.current;
    const text = textRef.current;
    const lines = [line1Ref.current, line2Ref.current];
    if (!heroRef.current || !media || !text) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // accessibility: no motion, leave content visible

    let onMove: ((e: MouseEvent) => void) | undefined;

    const ctx = gsap.context(() => {
      /* Initial (hidden) states — revealed by the entrance timeline */
      gsap.set(media, { scale: 1.15, opacity: 0, transformOrigin: "center center" });
      gsap.set(lines, { yPercent: 100 });
      gsap.set(eyebrowRef.current, { y: 30, opacity: 0 });
      gsap.set(subtextRef.current, { y: 20, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0.9, opacity: 0 });

      /* Scroll parallax: background drifts slower, text moves up + fades out */
      gsap.to(media, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(text, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      /* Mouse parallax on the headline (desktop, fine pointer only) */
      const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      if (desktop && headlineRef.current) {
        onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
          const ny = e.clientY / window.innerHeight - 0.5;
          gsap.to(headlineRef.current, { x: -nx * 16, y: -ny * 16, duration: 0.6, ease: "power2.out" });
        };
        window.addEventListener("mousemove", onMove);
      }
    }, heroRef);

    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  /* ---------- Entrance timeline: built AND auto-played the moment `start` is true ---------- */
  useIsoLayoutEffect(() => {
    if (!start) return;
    const media = mediaRef.current;
    const lines = [line1Ref.current, line2Ref.current];
    if (!media || !heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(media, { scale: 1, opacity: 1, duration: 1.4 }, 0)
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
        .to(lines, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.15 }, 0.5)
        // emphasis pulse on the burgundy "ART" word after the line reveal
        .to(artRef.current, { scale: 1.08, duration: 0.22, ease: "power2.out", transformOrigin: "left center" }, ">-0.05")
        .to(artRef.current, { scale: 1, duration: 0.3, ease: "power2.inOut" })
        .to(subtextRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
        .to(ctaRef.current, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.6)" }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "640px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: BLACK,
      }}
    >
      {/* ---------- Two-media split background (oversized so parallax never reveals edges) ---------- */}
      <div
        ref={mediaRef}
        className="hero-split"
        style={{
          position: "absolute",
          top: "-28%",
          left: 0,
          right: 0,
          height: "135%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          willChange: "transform",
        }}
      >
        {/* left (stronger — the one kept on mobile) */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/perfumeimg4.jpeg"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/Perfumevideo3.mp4" type="video/mp4" />
          </video>
        </div>
        {/* right (hidden on mobile) */}
        <div className="hero-media-right" style={{ position: "relative", overflow: "hidden" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/perfumeimg6.jpeg"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/Perfumevideo4.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ---------- Dark gradient overlay ---------- */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.65) 65%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* ---------- Bottom-left content ---------- */}
      <div
        ref={textRef}
        className="hero-content"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(5rem, 12vh, 9rem)",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <span
          ref={eyebrowRef}
          style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GRAY_LIGHT,
          }}
        >
          Perfume Manufacturing &amp; Sales
        </span>

        <h1
          ref={headlineRef}
          className="hero-headline font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(3rem, 8.5vw, 7rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: WHITE,
            margin: "1.25rem 0 0",
            willChange: "transform",
          }}
        >
          <span className="hero-line-mask">
            <span ref={line1Ref} className="hero-line">
              Where Scent
            </span>
          </span>
          <span className="hero-line-mask">
            <span ref={line2Ref} className="hero-line">
              Becomes{" "}
              <span ref={artRef} style={{ color: BURGUNDY_LIGHT, display: "inline-block" }}>
                Art
              </span>
            </span>
          </span>
        </h1>

        <p
          ref={subtextRef}
          style={{
            maxWidth: "500px",
            marginTop: "1.5rem",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: GRAY_LIGHT,
          }}
        >
          Rare oud, precious florals, and eighteen years of Arabian craft —
          distilled into fragrance.
        </p>

        <a
          ref={ctaRef}
          href="#collection"
          className="hero-cta"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            marginTop: "2.25rem",
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "1.1rem 2.75rem",
            borderRadius: 0,
            textDecoration: "none",
            color: ctaHover ? WHITE : BLACK,
            backgroundColor: ctaHover ? BURGUNDY : WHITE,
            transition: "background-color 0.35s ease, color 0.35s ease",
          }}
        >
          Explore Collection
        </a>
      </div>

      {/* ---------- Bottom bar: scroll indicator ---------- */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <div className="hairline-accent" style={{ opacity: 0.6 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem clamp(1.5rem, 6vw, 6rem)",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GRAY_LIGHT,
            }}
          >
            Scroll
          </span>
          <span
            aria-hidden="true"
            style={{
              position: "relative",
              width: "1px",
              height: "26px",
              overflow: "hidden",
              backgroundColor: "rgba(245,245,245,0.15)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1px",
                height: "10px",
                backgroundColor: BURGUNDY_LIGHT,
                animation: "hero-scroll-line 1.8s ease-in-out infinite",
              }}
            />
          </span>
        </div>
      </div>

      <style>{`
        .hero-line-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.05em;
        }
        .hero-line {
          display: block;
          will-change: transform;
        }
        @keyframes hero-scroll-line {
          0% { transform: translateY(-12px); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(26px); opacity: 0; }
        }
        @media (max-width: 768px) {
          .hero-headline { font-size: clamp(2.5rem, 13vw, 4rem) !important; }
          /* show only the stronger (left) media on mobile */
          .hero-split { grid-template-columns: 1fr !important; }
          .hero-media-right { display: none !important; }
          /* full-width tap target on mobile */
          .hero-cta { display: block !important; width: 100%; text-align: center; }
        }
      `}</style>
    </section>
  );
}
