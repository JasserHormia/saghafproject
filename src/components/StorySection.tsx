import Image from "next/image";
import Link from "next/link";

const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";
const GRAY_DARK = "#2A2A2A";
const BURGUNDY_LIGHT = "#8B2236";

const STATS = [
  { value: "120+", label: "Fragrances" },
  { value: "18", label: "Years" },
  { value: "40+", label: "Countries" },
];

export default function StorySection() {
  return (
    <section
      id="story"
      className="story-split"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        width: "100%",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* ---------------- Left: full-bleed photo ---------------- */}
      <div className="story-photo reveal reveal-left" style={{ position: "relative", minHeight: "640px", overflow: "hidden" }}>
        <Image
          src="/assets/perfumeimg8.jpeg"
          alt="Shaghaf — the craft of Arabian perfumery"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* ---------------- Right: editorial copy ---------------- */}
      <div
        className="story-copy reveal reveal-right"
        style={{
          backgroundColor: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(2.5rem, 6vw, 6rem)",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GRAY_LIGHT,
          }}
        >
          Our Heritage
        </span>

        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: WHITE,
            margin: "1.25rem 0 1.75rem",
          }}
        >
          Rooted in
          <br />
          <span style={{ color: BURGUNDY_LIGHT }}>Arabian</span> Tradition
        </h2>

        <p style={{ maxWidth: "34rem", fontSize: "1rem", lineHeight: 1.8, color: GRAY_LIGHT, margin: "0 0 1.25rem" }}>
          For eighteen years, Shaghaf has carried the soul of Arabian perfumery
          from the souks of old to the modern world. What began as a single
          family atelier has grown into a house devoted entirely to the art of
          scent.
        </p>
        <p style={{ maxWidth: "34rem", fontSize: "1rem", lineHeight: 1.8, color: GRAY_LIGHT, margin: "0 0 2.5rem" }}>
          We trade only in the rare: deep Cambodian oud, Taif roses picked at
          dawn, saffron worth its weight in gold — aged, layered, and coaxed into
          fragrances that tell a story.
        </p>

        {/* inline stats with vertical hairlines */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {i > 0 && <span aria-hidden="true" style={{ width: "1px", height: "42px", backgroundColor: GRAY_DARK }} />}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <span className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: WHITE, lineHeight: 1 }}>
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: GRAY_LIGHT,
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* read more link */}
        <div style={{ marginTop: "2.75rem" }}>
          <Link href="/about" className="story-link">
            Read Our Full Story →
          </Link>
        </div>
      </div>

      <style>{`
        .story-link {
          position: relative;
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${BURGUNDY_LIGHT};
          text-decoration: none;
          padding-bottom: 5px;
        }
        .story-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: ${BURGUNDY_LIGHT};
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .story-link:hover::after { width: 100%; }

        @media (max-width: 900px) {
          .story-split { grid-template-columns: 1fr !important; }
          .story-photo { min-height: 60vh !important; }
        }
      `}</style>
    </section>
  );
}
