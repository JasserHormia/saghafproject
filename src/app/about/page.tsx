"use client";

import {
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Navbar from "@/components/Navbar";
import ScrollAnimations from "@/components/ScrollAnimations";
import Footer from "@/components/Footer";

const GOLD = "#8B2236";
const GOLD_LIGHT = "#8B2236";
const WHITE = "#FFFFFF";
const CREAM = "#0A0A0A";
const DARK = "#6B1626";
const TEXT_DARK = "#F5F5F5";
const TEXT_MID = "#9A9A9A";
const SERIF = '"Inter", sans-serif';

/* ------------------------------------------------------------------ */
/*  Reveal wrapper                                                     */
/* ------------------------------------------------------------------ */
// Delegates to the global .reveal observer in <ScrollAnimations />.
// x<0 -> reveal-left, x>0 -> reveal-right, scale -> reveal-scale, else upward.
function Reveal({
  children,
  delay = 0,
  x = 0,
  scale = false,
  as = "div",
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: boolean;
  as?: "div" | "section" | "li";
  style?: CSSProperties;
  className?: string;
}) {
  const variant = scale
    ? "reveal-scale"
    : x < 0
      ? "reveal-left"
      : x > 0
        ? "reveal-right"
        : "";
  const Tag = as as "div";
  return (
    <Tag
      className={`reveal ${variant} ${className ?? ""}`.trim()}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const SOLUTIONS = [
  { step: "01", title: "Concept Development", text: "We shape the idea, story, and identity behind every fragrance before a single note is set." },
  { step: "02", title: "Formulation", text: "Premium raw materials, carefully selected and blended into a signature accord." },
  { step: "03", title: "Manufacturing", text: "Modern production technologies, held to world-class standards of quality." },
  { step: "04", title: "Premium Packaging", text: "Every bottle designed with meticulous attention to detail and finish." },
];

const VALUES = ["Passion", "Authenticity", "Innovation", "Excellence"];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  const [ctaPrimary, setCtaPrimary] = useState(false);
  const [ctaGhost, setCtaGhost] = useState(false);

  return (
    <div style={{ backgroundColor: CREAM, color: TEXT_DARK }}>
      <ScrollAnimations />
      <Navbar />

      {/* ============ 1. HERO ============ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          padding: "12rem 2rem 7rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            width: "900px",
            maxWidth: "120vw",
            height: "900px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shaghaf_logo.png"
            alt="شغف"
            style={{
              width: "150px",
              height: "auto",
              margin: "0 auto 2rem",
              filter: "brightness(0) invert(1) drop-shadow(0 0 22px rgba(139,34,54,0.4))",
            }}
          />
        </Reveal>
        <Reveal delay={0.08} style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Shaghaf Perfumes
          </span>
        </Reveal>
        <Reveal delay={0.16} style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              margin: "1rem 0 0",
            }}
          >
            Born from Passion.
            <br />
            Crafted to Be{" "}
            <span className="text-accent">Remembered.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.28} style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              maxWidth: "42rem",
              margin: "1.75rem auto 0",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: TEXT_MID,
            }}
          >
            In a world where many fragrances look alike, we chose to create
            something truly different — something that speaks about your identity
            before you even say a word.
          </p>
        </Reveal>
      </section>

      {/* ============ 2. OUR BELIEF ============ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div
          className="about-mission"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          {/* belief pull-quote */}
          <Reveal x={-40} y={0}>
            <div
              className="glass"
              style={{
                padding: "3rem 2.5rem",
                borderRadius: "4px",
                borderColor: "rgba(255,255,255,0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "4rem",
                  color: GOLD,
                  lineHeight: 0.5,
                  display: "block",
                  marginBottom: "1rem",
                }}
                aria-hidden="true"
              >
                “
              </span>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.55rem",
                  lineHeight: 1.5,
                  color: TEXT_DARK,
                  margin: 0,
                }}
              >
                A perfume is not just a scent; it is an{" "}
                <span style={{ color: GOLD }}>emotion</span>, a memory, and a
                silent expression of personality that leaves a lasting
                impression.
              </p>
            </div>
          </Reveal>

          {/* text */}
          <div>
            <Reveal>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                Our Belief
              </span>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  margin: "0.75rem 0 1.5rem",
                }}
              >
                Where It Began
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEXT_MID, margin: "0 0 1.25rem" }}>
                Our journey began with a clear vision and limitless ambition: to
                craft exceptional fragrances inspired by passion and refined
                through world-class standards. From the very beginning, our
                mission has been to transform the art of perfumery into an
                experience that combines creativity, precision, and excellence.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEXT_MID, margin: "0 0 2rem" }}>
                We carefully select premium raw materials and blend them with
                modern manufacturing technologies to create fragrances that
                inspire confidence, elegance, and individuality. Every bottle is
                designed with meticulous attention to detail, reflecting our
                commitment to quality and innovation.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {VALUES.map((v) => (
                  <span
                    key={v}
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: GOLD_LIGHT,
                      padding: "0.55rem 1.2rem",
                      border: `1px solid rgba(255,255,255,0.4)`,
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. WHAT SETS US APART (band) ============ */}
      <section
        style={{
          padding: "5rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          background: DARK,
        }}
      >
        <Reveal style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,245,245,0.7)" }}>
            What Sets Us Apart
          </span>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              lineHeight: 1.5,
              fontWeight: 600,
              color: WHITE,
              margin: "1.25rem 0 0",
            }}
          >
            Our dedication to creating unique olfactory experiences — and
            providing complete fragrance solutions that turn ideas into iconic
            perfume collections, for individuals and private labels alike.
          </p>
        </Reveal>
      </section>

      {/* ============ 4. COMPLETE FRAGRANCE SOLUTIONS ============ */}
      <section style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
              End to End
            </span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, margin: "0.75rem 0 0" }}>
              Complete Fragrance Solutions
            </h2>
            <div className="gold-line" style={{ maxWidth: "120px", margin: "1.5rem auto 0" }} />
          </Reveal>

          <div
            className="about-solutions"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}
          >
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div
                  className="glass"
                  style={{
                    padding: "2.5rem 1.5rem",
                    borderRadius: "4px",
                    height: "100%",
                  }}
                >
                  <div
                    className="font-display"
                    aria-hidden="true"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${GOLD}`,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {s.step}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.6rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: TEXT_MID, margin: 0 }}>
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. OUR AMBITION ============ */}
      <section style={{ padding: "2rem 2rem 7rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
              Our Ambition
            </span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, margin: "0.75rem 0 1.5rem" }}>
              Beyond the Bottle
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: TEXT_MID, margin: 0 }}>
              Our ambition goes beyond producing perfumes. We strive to build a
              globally recognized brand that represents luxury, authenticity, and
              innovation — proudly carrying the spirit of excellence to
              international markets. At Shaghaf, every fragrance tells a story,
              every bottle reflects a vision, and every creation is driven by one
              powerful force: <span style={{ color: GOLD }}>passion</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. CLOSING CTA ============ */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              maxWidth: "1080px",
              margin: "0 auto",
              textAlign: "center",
              padding: "4.5rem 2rem",
              borderRadius: 0,
              border: "1px solid #2A2A2A",
              background:
                "radial-gradient(circle at 50% 0%, rgba(139,34,54,0.18), transparent 60%), #0A0A0A",
            }}
          >
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                margin: "0 0 0.75rem",
              }}
            >
              Crafted with Passion,{" "}
              <span className="text-accent">Remembered Forever.</span>
            </h2>
            <p style={{ fontSize: "1rem", color: TEXT_MID, margin: "0 0 2rem" }}>
              Ready to find the scent that speaks before you do?
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <a
                href="/#collection"
                onMouseEnter={() => setCtaPrimary(true)}
                onMouseLeave={() => setCtaPrimary(false)}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "0.95rem 2.2rem",
                  color: WHITE,
                  backgroundColor: ctaPrimary ? GOLD_LIGHT : GOLD,
                  border: `1px solid ${GOLD}`,
                  borderRadius: "2px",
                  textDecoration: "none",
                  boxShadow: ctaPrimary ? "0 0 28px rgba(255,255,255,0.5)" : "none",
                  transition: "background-color 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                Explore Collection
              </a>
              <a
                href="/#contact"
                onMouseEnter={() => setCtaGhost(true)}
                onMouseLeave={() => setCtaGhost(false)}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "0.95rem 2.2rem",
                  color: ctaGhost ? WHITE : TEXT_DARK,
                  backgroundColor: ctaGhost ? GOLD : "transparent",
                  border: `1px solid ${GOLD}`,
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "background-color 0.35s ease, color 0.35s ease",
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .about-mission { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-solutions { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .about-solutions { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
