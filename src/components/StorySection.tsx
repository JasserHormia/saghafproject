"use client";

import Link from "next/link";

const GOLD = "#B8932A";
const TEXT_DARK = "#2C1F0A";
const TEXT_MID = "#6B5A3E";
const TEXT_LIGHT = "#9E8B6E";
const IVORY = "#F5EDE0";
const SERIF = '"Cormorant Garamond", Georgia, serif';

const STATS = [
  { value: "120+", label: "Fragrances" },
  { value: "18", label: "Years" },
  { value: "40+", label: "Countries" },
  { value: "10K+", label: "Customers" },
];

const FEATURES = [
  {
    icon: "🌹",
    title: "Rare Ingredients",
    text: "Hand-selected oud, Taif rose, and saffron sourced from their native soils.",
  },
  {
    icon: "⚗️",
    title: "Master Blending",
    text: "Compositions matured by perfumers trained in a lineage of Arabian craft.",
  },
  {
    icon: "🏺",
    title: "Artisan Heritage",
    text: "Every bottle finished, filled, and inspected by hand before it reaches you.",
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #FAF6F0 0%, #F0E8D8 100%)",
        padding: "6rem 0",
      }}
    >
      {/* ============ PART 1 — cinematic banner ============ */}
      <div
        className="reveal"
        style={{
          backgroundColor: TEXT_DARK,
          padding: "4rem 4rem",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          EST. 2007 · Dubai, UAE
        </span>
        <h2
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1.05,
            color: IVORY,
            margin: "1.25rem 0 1.5rem",
          }}
        >
          Eighteen Years of Pure Passion
        </h2>
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: GOLD,
            fontSize: "0.9rem",
          }}
        >
          <span style={{ width: "70px", height: "1px", backgroundColor: "rgba(184,147,42,0.5)" }} />
          ✦
          <span style={{ width: "70px", height: "1px", backgroundColor: "rgba(184,147,42,0.5)" }} />
        </div>
      </div>

      {/* ============ PART 2 — two-column content ============ */}
      <div
        className="story-cols"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "5rem 2rem",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div className="reveal reveal-left" style={{ position: "relative" }}>
          {/* watermark */}
          <span
            aria-hidden="true"
            className="story-watermark"
            style={{
              position: "absolute",
              top: "-3rem",
              left: "-1rem",
              fontFamily: SERIF,
              fontSize: "clamp(6rem, 18vw, 14rem)",
              lineHeight: 1,
              color: "rgba(184,147,42,0.15)",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
          >
            شغف
          </span>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: TEXT_MID,
                margin: "0 0 1.25rem",
              }}
            >
              For eighteen years, Shaghaf has carried the soul of Arabian
              perfumery from the souks of old to the modern world. What began as
              a single family atelier has grown into a house devoted entirely to
              the art of scent — yet every formula still passes through the same
              patient, uncompromising hands.
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: TEXT_MID,
                margin: "0 0 2.25rem",
              }}
            >
              We trade only in the rare: deep Cambodian oud, Taif roses picked at
              dawn, saffron threads worth their weight in gold. These precious
              ingredients are aged, layered, and coaxed into fragrances that do
              not simply perfume the skin — they tell a story.
            </p>

            {/* stats row */}
            <div
              className="story-stats"
              style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      style={{ width: "1px", height: "38px", backgroundColor: "rgba(184,147,42,0.3)" }}
                    />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontSize: "1.85rem",
                        fontWeight: 600,
                        color: GOLD,
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: TEXT_LIGHT,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — feature cards */}
        <div
          className="reveal reveal-right"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.6)",
                padding: "1.5rem 1.5rem 1.5rem 2rem",
                borderRadius: "4px",
                boxShadow: "0 2px 12px rgba(184,147,42,0.08)",
              }}
            >
              {/* gold accent bar */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: GOLD,
                }}
              />
              <span aria-hidden="true" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                {f.icon}
              </span>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: TEXT_DARK,
                  margin: "0.5rem 0 0.4rem",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.55, color: TEXT_MID, margin: 0 }}>
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ PART 3 — CTA strip ============ */}
      <div
        className="reveal"
        style={{
          backgroundColor: "rgba(184,147,42,0.08)",
          borderTop: "1px solid rgba(184,147,42,0.15)",
          borderBottom: "1px solid rgba(184,147,42,0.15)",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 500,
            color: TEXT_DARK,
            margin: "0 0 1.5rem",
          }}
        >
          Ready to experience the art of scent?
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <Link href="/products" className="story-btn story-btn-primary">
            Shop Collection
          </Link>
          <Link href="/#story" className="story-btn story-btn-ghost">
            Our Story
          </Link>
        </div>
      </div>

      <style>{`
        .story-btn {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.85rem 2rem;
          border-radius: 2px;
          text-decoration: none;
          transition: background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
        }
        .story-btn-primary {
          background-color: ${GOLD};
          color: #fff;
          border: 1px solid ${GOLD};
        }
        .story-btn-primary:hover {
          background-color: #D4A843;
          box-shadow: 0 0 24px rgba(184,147,42,0.4);
        }
        .story-btn-ghost {
          background-color: transparent;
          color: ${TEXT_DARK};
          border: 1px solid ${GOLD};
        }
        .story-btn-ghost:hover {
          background-color: ${GOLD};
          color: #fff;
        }
        @media (max-width: 900px) {
          .story-cols { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 767px) {
          .story-watermark { font-size: 3.75rem !important; top: -1.5rem !important; }
          .story-stats {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
          .story-stats > div { gap: 0 !important; }
          .story-stats > div > span[aria-hidden="true"] { display: none !important; }
        }
      `}</style>
    </section>
  );
}
