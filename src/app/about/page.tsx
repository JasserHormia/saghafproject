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
const STATS = [
  { value: "120+", label: "Fragrances" },
  { value: "18", label: "Years" },
  { value: "40+", label: "Countries" },
  { value: "10K+", label: "Happy Customers" },
];

const TEAM = [
  {
    initials: "OA",
    name: "Omar Al-Rashidi",
    role: "Master Perfumer",
    bio: "Thirty years coaxing oud, rose, and amber into unforgettable accords.",
  },
  {
    initials: "LM",
    name: "Layla Mansour",
    role: "Creative Director",
    bio: "Blending the soul of tradition with the language of the modern world.",
  },
  {
    initials: "KS",
    name: "Khalid Al-Shaghaf",
    role: "Brand Founder",
    bio: "The vision and passion from which every Shaghaf fragrance flows.",
  },
];

const TIMELINE = [
  { year: "2007", title: "Founded", text: "Shaghaf opens its first atelier, born from a single family's devotion to scent." },
  { year: "2010", title: "First 50 Fragrances", text: "Our debut library of fifty signature compositions reaches the souks of Arabia." },
  { year: "2015", title: "International Expansion", text: "Shaghaf crosses borders, introducing Arabian perfumery to the wider world." },
  { year: "2019", title: "Award-Winning Collection", text: "Our craft is recognised internationally with acclaim for the Noir collection." },
  { year: "2024", title: "100+ Global Stockists", text: "Now carried by over a hundred stockists across forty countries and counting." },
];

const VALUES = ["Heritage", "Purity", "Passion"];

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
        <Reveal delay={0.12} style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Our Passion is{" "}
            <span className="text-accent" style={{ }}>
              Perfume
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.24} style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              maxWidth: "40rem",
              margin: "1.75rem auto 0",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: TEXT_MID,
            }}
          >
            For eighteen years, Shaghaf has devoted itself to the ancient art of
            Arabian perfumery — distilling rare oud, precious florals, and
            centuries of heritage into fragrances that become a part of who you
            are.
          </p>
        </Reveal>
      </section>

      {/* ============ 2. MISSION ============ */}
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
          {/* quote card */}
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
                  fontSize: "1.7rem",
                  lineHeight: 1.5,
                  color: TEXT_DARK,
                  margin: 0,
                }}
              >
                <span style={{ color: GOLD }}>شغف</span> — the Arabic word for
                deep passion and infatuation.
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
                Our Mission
              </span>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  margin: "0.75rem 0 1.5rem",
                }}
              >
                Why We Exist
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEXT_MID, margin: "0 0 1.25rem" }}>
                We exist to carry the authentic soul of Arabian fragrance to
                every corner of the world — without dilution, without
                compromise. Each composition honours the traditions of the
                perfumers who came before us.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEXT_MID, margin: "0 0 2rem" }}>
                From the oud forests of the East to the rose fields of Taif, we
                source, blend, and age with patience — so that what reaches your
                skin is nothing less than a story worth wearing.
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

      {/* ============ 3. STATS BAR ============ */}
      <section
        style={{
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          background: DARK,
        }}
      >
        <div
          className="about-stats"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(2.5rem, 5vw, 3.6rem)",
                    fontWeight: 600,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,245,245,0.6)",
                    marginTop: "0.6rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 4. TEAM ============ */}
      <section style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
              Our People
            </span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, margin: "0.75rem 0 0" }}>
              The Minds Behind the Scent
            </h2>
            <div className="gold-line" style={{ maxWidth: "120px", margin: "1.5rem auto 0" }} />
          </Reveal>

          <div
            className="about-team"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}
          >
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div
                  className="glass"
                  style={{
                    padding: "2.5rem 1.5rem",
                    borderRadius: "4px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "96px",
                      height: "96px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: SERIF,
                      fontSize: "1.8rem",
                      fontWeight: 600,
                      color: GOLD,
                      border: `1.5px solid ${GOLD}`,
                      background: "radial-gradient(circle at 50% 30%, rgba(139,34,54,0.35), rgba(255,255,255,0.05))",
                      boxShadow: "0 0 0 6px rgba(255,255,255,0.05)",
                      marginBottom: "1rem",
                    }}
                  >
                    {m.initials}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
                    {m.name}
                  </h3>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>
                    {m.role}
                  </span>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: TEXT_MID, margin: "0.5rem 0 0" }}>
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. TIMELINE ============ */}
      <section style={{ padding: "7rem 2rem", backgroundColor: "#0A0A0A" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
              Through the Years
            </span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, margin: "0.75rem 0 0" }}>
              Our Journey
            </h2>
            <div className="gold-line" style={{ maxWidth: "120px", margin: "1.5rem auto 0" }} />
          </Reveal>

          <div className="about-timeline" style={{ position: "relative" }}>
            {/* center spine */}
            <span
              aria-hidden="true"
              className="timeline-spine"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: "1px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.5) 10%, rgba(255,255,255,0.5) 90%, transparent)",
              }}
            />
            {TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={t.year}
                  x={left ? -40 : 40}
                  y={0}
                  className="timeline-row"
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: left ? "flex-start" : "flex-end",
                    marginBottom: "2.5rem",
                  }}
                >
                  {/* dot */}
                  <span
                    aria-hidden="true"
                    className="timeline-dot"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "0.4rem",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: GOLD,
                      boxShadow: "0 0 14px rgba(255,255,255,0.7), 0 0 0 5px rgba(255,255,255,0.12)",
                    }}
                  />
                  <div
                    className="timeline-card"
                    style={{
                      width: "calc(50% - 2.5rem)",
                      textAlign: left ? "right" : "left",
                    }}
                  >
                    <div style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 600, color: GOLD, lineHeight: 1 }}>
                      {t.year}
                    </div>
                    <h3 style={{ fontFamily: SERIF, fontSize: "1.35rem", fontWeight: 600, margin: "0.4rem 0 0.4rem" }}>
                      {t.title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: TEXT_MID, margin: 0 }}>
                      {t.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 6. CLOSING CTA ============ */}
      <section style={{ padding: "6rem 2rem" }}>
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
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                margin: "0 0 2rem",
              }}
            >
              Ready to Find Your{" "}
              <span className="text-accent" style={{ }}>
                Signature Scent?
              </span>
            </h2>
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
          .about-team { grid-template-columns: 1fr !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .timeline-spine { left: 8px !important; }
          .timeline-dot { left: 8px !important; }
          .about-timeline .timeline-row { justify-content: flex-end !important; }
          .about-timeline .timeline-card {
            width: calc(100% - 2.5rem) !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}
