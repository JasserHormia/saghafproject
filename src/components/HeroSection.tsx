"use client";

import { useState, type CSSProperties } from "react";

const BLACK = "#0A0A0A";
const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";
const BURGUNDY = "#6B1626";
const BURGUNDY_LIGHT = "#8B2236";

export default function HeroSection({ start = true }: { start?: boolean }) {
  const [ctaHover, setCtaHover] = useState(false);

  // Staggered content entrance, gated on `start` (after the preloader).
  const enter = (delay: number): CSSProperties => ({
    opacity: start ? 1 : 0,
    transform: start ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "640px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: BLACK,
      }}
    >
      {/* ---------- Two-media split background (stacks to ONE on mobile) ---------- */}
      <div
        className="hero-split"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.65) 65%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* ---------- Bottom-left content ---------- */}
      <div
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
          style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GRAY_LIGHT,
            ...enter(0.1),
          }}
        >
          Perfume Manufacturing &amp; Sales
        </span>

        <h1
          className="hero-headline font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(3rem, 8.5vw, 7rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: WHITE,
            margin: "1.25rem 0 0",
            ...enter(0.25),
          }}
        >
          Where Scent
          <br />
          Becomes <span style={{ color: BURGUNDY_LIGHT }}>Art</span>
        </h1>

        <p
          style={{
            maxWidth: "500px",
            marginTop: "1.5rem",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: GRAY_LIGHT,
            ...enter(0.4),
          }}
        >
          Rare oud, precious florals, and eighteen years of Arabian craft —
          distilled into fragrance.
        </p>

        <a
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
            ...enter(0.55),
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
