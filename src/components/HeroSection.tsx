"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import dynamic from "next/dynamic";

// 3D bottle is client-only (WebGL); never render on the server.
const PerfumeBottle3D = dynamic(() => import("./PerfumeBottle3D"), {
  ssr: false,
});

const GOLD = "#B8932A";
const GOLD_LIGHT = "#D4A843";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#2C1F0A";
const TEXT_MID = "#6B5A3E";
const TEXT_LIGHT = "#9E8B6E";
const SERIF = '"Cormorant Garamond", Georgia, serif';

const STATS = [
  { target: 120, suffix: "+", label: "Fragrances" },
  { target: 18, suffix: "", label: "Years Craft" },
  { target: 40, suffix: "+", label: "Countries" },
] as const;

// Eased count-up for the hero stats.
function CountUp({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const duration = 1500;
    const t0 = performance.now();
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setN(Math.round(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function HeroSection({ start = true }: { start?: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [primaryHover, setPrimaryHover] = useState(false);
  const [ghostHover, setGhostHover] = useState(false);

  // Page-load animation sequence — runs once `start` becomes true
  // (after the preloader finishes).
  const [show, setShow] = useState({
    eyebrow: false,
    line1: false,
    line2: false,
    para: false,
    cta: false,
    stats: false,
  });

  useEffect(() => {
    if (!start) return;
    const timers = [
      setTimeout(() => setShow((s) => ({ ...s, eyebrow: true })), 200),
      setTimeout(() => setShow((s) => ({ ...s, line1: true })), 500),
      setTimeout(() => setShow((s) => ({ ...s, line2: true })), 700),
      setTimeout(() => setShow((s) => ({ ...s, para: true })), 900),
      setTimeout(() => setShow((s) => ({ ...s, cta: true })), 1100),
      setTimeout(() => setShow((s) => ({ ...s, stats: true })), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [start]);

  // Track normalized mouse position for the bottle to follow.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Simple fade/translate for non line-reveal elements.
  const fade = (on: boolean, y = 24): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${y}px)`,
    transition:
      "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
  });

  const primaryBtn: CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    padding: "0.9rem 2rem",
    color: WHITE,
    backgroundColor: primaryHover ? GOLD_LIGHT : GOLD,
    border: `1px solid ${GOLD}`,
    borderRadius: "2px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.35s ease, box-shadow 0.35s ease",
    boxShadow: primaryHover ? "0 0 28px rgba(184,147,42,0.45)" : "none",
  };

  const ghostBtn: CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    padding: "0.9rem 2rem",
    color: ghostHover ? WHITE : TEXT_DARK,
    backgroundColor: ghostHover ? GOLD : "transparent",
    border: `1px solid ${GOLD}`,
    borderRadius: "2px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease",
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "visible",
        paddingTop: "64px",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184,147,42,0.06) 0%, transparent 60%), linear-gradient(135deg, #FAF6F0 0%, #F0E8D8 40%, #EDE0CC 100%)",
      }}
    >
      {/* Marble veining texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.04,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(42deg, #2C1F0A 0px, transparent 2px, transparent 60px, #2C1F0A 62px), repeating-linear-gradient(48deg, #6B5A3E 0px, transparent 3px, transparent 110px, #6B5A3E 112px), repeating-linear-gradient(38deg, #2C1F0A 0px, transparent 1px, transparent 180px, #2C1F0A 181px)",
        }}
      />

      {/* Botanical line-art motifs scattered around the visual */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 160"
        style={{ position: "absolute", top: "12%", left: "4%", width: "140px", zIndex: 1, opacity: 0.2, pointerEvents: "none" }}
        fill="none"
        stroke="#B8932A"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M60 155 C60 110 60 70 60 20" />
        <path d="M60 120 C30 110 18 90 14 64 C44 70 56 92 60 118" />
        <path d="M60 96 C90 86 102 66 106 40 C76 46 64 68 60 94" />
        <path d="M60 68 C36 60 26 44 24 24 C48 30 58 48 60 66" />
        <circle cx="60" cy="16" r="6" />
        <path d="M60 10 C57 4 63 4 60 10 Z" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: "16%", right: "6%", width: "110px", zIndex: 1, opacity: 0.2, pointerEvents: "none" }}
        fill="none"
        stroke="#B8932A"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <g transform="translate(50 50)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse key={deg} cx="0" cy="-22" rx="8" ry="20" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="6" />
        </g>
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 140 90"
        style={{ position: "absolute", bottom: "16%", left: "8%", width: "160px", zIndex: 1, opacity: 0.2, pointerEvents: "none" }}
        fill="none"
        stroke="#B8932A"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M4 80 C40 78 90 60 134 14" />
        <path d="M48 70 C44 56 50 44 64 40 C66 54 60 66 48 70" />
        <path d="M82 52 C80 38 88 28 102 26 C102 40 94 50 82 52" />
        <path d="M24 76 C22 64 28 54 40 52 C40 64 34 73 24 76" />
      </svg>

      {/* Silk wave at the bottom of the hero */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "220px", zIndex: 1, pointerEvents: "none" }}
      >
        <path
          d="M0 120 C240 60 420 180 720 130 C1010 82 1180 20 1440 90 L1440 220 L0 220 Z"
          fill="#FAF6F0"
          fillOpacity="0.85"
        />
        <path
          d="M0 160 C260 110 460 200 760 160 C1040 124 1220 70 1440 130 L1440 220 L0 220 Z"
          fill="#F5EDE0"
          fillOpacity="0.9"
        />
      </svg>

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
          gap: 0,
          padding: "0 2rem",
        }}
      >
        {/* ---------------- Left column ---------------- */}
        <div
          className="hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1.5rem",
            minHeight: "calc(100vh - 64px)",
            paddingRight: "clamp(1rem, 4vw, 4rem)",
          }}
        >
          {/* Gold eyebrow — slides in from the left */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              opacity: show.eyebrow ? 1 : 0,
              transform: show.eyebrow ? "translateX(0)" : "translateX(-40px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              style={{
                display: "block",
                width: "42px",
                height: "1px",
                backgroundColor: GOLD,
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Perfume Manufacturing &amp; Sales
            </span>
          </div>

          {/* Headline — line-by-line luxury reveal */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(3.75rem, 8vw, 6rem)",
              lineHeight: 1.02,
              color: TEXT_DARK,
              margin: 0,
            }}
          >
            <span className="line-reveal" style={{ display: "block" }}>
              <span className={`line-reveal-inner ${show.line1 ? "revealed" : ""}`}>
                Where Scent
              </span>
            </span>
            <span className="line-reveal" style={{ display: "block" }}>
              <span
                className={`line-reveal-inner gold-text ${show.line2 ? "revealed" : ""}`}
                style={{ fontStyle: "italic" }}
              >
                Becomes Art
              </span>
            </span>
          </h1>

          {/* Paragraph */}
          <p
            className="hero-para"
            style={{
              maxWidth: "30rem",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: TEXT_MID,
              margin: 0,
              ...fade(show.para),
            }}
          >
            Rooted in the timeless traditions of Arabian perfumery, Shaghaf
            blends rare oud, precious florals, and centuries-old craft into
            fragrances that linger like memory. Every bottle is a passage of
            heritage, distilled.
          </p>

          {/* CTAs */}
          <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", ...fade(show.cta) }}>
            <a
              href="#collection"
              style={primaryBtn}
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
            >
              Explore Collection
            </a>
            <a
              href="#story"
              style={ghostBtn}
              onMouseEnter={() => setGhostHover(true)}
              onMouseLeave={() => setGhostHover(false)}
            >
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div
            className="hero-stats"
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "1.5rem",
              ...fade(show.stats),
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span
                  className="stat-num"
                  style={{
                    fontFamily: SERIF,
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={s.target} suffix={s.suffix} start={show.stats} />
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: TEXT_LIGHT,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Right column: 3D bottle ---------------- */}
        <div
          className="hero-3d relative w-full"
          style={{
            height: "calc(100vh - 64px)",
            minHeight: "600px",
          }}
        >
          <PerfumeBottle3D pointer={pointer} className="h-full w-full" />
        </div>
      </div>

      {/* ---------------- Scroll indicator ---------------- */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: TEXT_LIGHT,
          }}
        >
          Scroll
        </span>
        <span
          aria-hidden="true"
          style={{
            width: "22px",
            height: "36px",
            border: `1px solid rgba(184,147,42,0.6)`,
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <span
            style={{
              width: "3px",
              height: "8px",
              borderRadius: "2px",
              backgroundColor: GOLD,
              animation: "hero-scroll-dot 1.6s ease-in-out infinite",
            }}
          />
        </span>
      </div>

      <style>{`
        @keyframes hero-scroll-dot {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          60% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        /* Below lg: stack vertically — text first, bottle second */
        @media (max-width: 1023px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            padding: 0 !important;
          }
          .hero-left {
            min-height: auto !important;
            width: 100%;
            padding: 6rem 1.5rem 2rem !important;
          }
          .hero-3d {
            order: -1; /* bottle above the text on mobile */
            width: 100%;
            height: 40vh !important;
            min-height: 300px !important;
          }
          .hero-left { order: 1; }
          .hero-headline { font-size: 2.25rem !important; }
          .hero-para { font-size: 0.875rem !important; }
          .hero-cta {
            flex-direction: column !important;
            gap: 0.75rem !important;
            width: 100%;
          }
          .hero-cta a { width: 100% !important; text-align: center !important; }
          .hero-stats { gap: 1.5rem !important; }
          .hero-stats .stat-num { font-size: 1.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-grid * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
