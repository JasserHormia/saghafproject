import Image from "next/image";

const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";

const TILES = [
  { image: "/assets/perfumeimg1.jpeg", caption: "Aged Cambodian Oud" },
  { image: "/assets/perfumeimg3.jpeg", caption: "Taif Rose Absolute" },
  { image: "/assets/perfume3.jpeg", caption: "Kashmiri Saffron" },
];

export default function CloseUpGrid() {
  return (
    <section style={{ backgroundColor: "#0A0A0A", padding: "6rem 0 5rem" }}>
      {/* eyebrow */}
      <div
        className="reveal"
        style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem) 2.5rem" }}
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
          The Details
        </span>
      </div>

      {/* photo wall — thin black grout lines between tiles */}
      <div
        className="closeup-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          backgroundColor: "#0A0A0A",
        }}
      >
        {TILES.map((t, i) => (
          <div
            key={t.caption}
            className="closeup-cell reveal"
            style={{ position: "relative", backgroundColor: "#0A0A0A", transitionDelay: `${i * 0.1}s` }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <Image
                src={t.image}
                alt={t.caption}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="closeup-img"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GRAY_LIGHT,
                margin: "1rem 0 0",
                padding: "0 clamp(1rem, 3vw, 2rem)",
              }}
            >
              {t.caption}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .closeup-img {
          transition: filter 0.6s ease, transform 0.6s ease;
        }
        .closeup-cell:hover .closeup-img {
          filter: brightness(1.08);
          transform: scale(1.04);
        }
        .closeup-cell:hover p { color: ${WHITE}; }
        .closeup-cell p { transition: color 0.4s ease; }

        @media (max-width: 768px) {
          .closeup-grid { grid-template-columns: 1fr !important; gap: 2px; }
        }
      `}</style>
    </section>
  );
}
