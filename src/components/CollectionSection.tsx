"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";

const GOLD = "#B8932A";
const TEXT_DARK = "#2C1F0A";
const TEXT_MID = "#6B5A3E";
const WHITE = "#FFFFFF";
const SERIF = '"Cormorant Garamond", Georgia, serif';

type Perfume = {
  name: string;
  arabic: string;
  notes: string;
  description: string;
  accent: string;
  price: number;
  image: string;
};

const PERFUMES: Perfume[] = [
  {
    name: "Oud Al Layl",
    arabic: "عود الليل",
    notes: "Dark Oud · Amber · Musk",
    description:
      "A nocturnal embrace of smoky oud wrapped in warm amber, deepened by a velvet trail of musk.",
    accent: "#8B2040",
    price: 495,
    image: "/perfume1.jpeg",
  },
  {
    name: "Wardah Gold",
    arabic: "وردة الذهب",
    notes: "Rose · Saffron · Sandalwood",
    description:
      "Damascus rose gilded with crimson saffron, settling into a creamy heart of aged sandalwood.",
    accent: "#C9A84C",
    price: 630,
    image: "/perfume2.jpeg",
  },
  {
    name: "Breeze of Mecca",
    arabic: "نسيم مكة",
    notes: "Frankincense · Cedar · Neroli",
    description:
      "Sacred frankincense lifted by bright neroli over a clean, resinous spine of mountain cedar.",
    accent: "#4A7FA5",
    price: 400,
    image: "/perfume3.jpeg",
  },
  {
    name: "Sultana Noir",
    arabic: "سلطانة نوار",
    notes: "Black Iris · Velvet Oud · Vanilla",
    description:
      "Regal black iris meets the darkest velvet oud, sweetened by a whisper of bourbon vanilla.",
    accent: "#6B4C9A",
    price: 765,
    image: "/perfume4.jpeg",
  },
];

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function PerfumeCard({ perfume, index }: { perfume: Perfume; index: number }) {
  const [hover, setHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const cardStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "2.5rem 1.5rem 2rem",
    borderRadius: "3px",
    background: "rgba(255,255,255,0.9)",
    border: `1px solid ${hover ? "rgba(184,147,42,0.4)" : "rgba(184,147,42,0.15)"}`,
    boxShadow: hover
      ? "0 20px 60px rgba(184,147,42,0.15)"
      : "0 4px 30px rgba(184,147,42,0.08)",
    transform: hover ? "translateY(-10px)" : "translateY(0)",
    transition:
      "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, box-shadow 0.5s ease",
  };

  const btnStyle: CSSProperties = {
    marginTop: "1.5rem",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "0.7rem 1.8rem",
    color: btnHover ? WHITE : TEXT_DARK,
    backgroundColor: btnHover ? GOLD : "transparent",
    border: `1px solid ${GOLD}`,
    borderRadius: "2px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease",
    boxShadow: btnHover ? "0 0 22px rgba(184,147,42,0.4)" : "none",
  };

  return (
    <div
      className="reveal"
      style={{ height: "100%", transitionDelay: `${index * 0.1}s` }}
    >
    <div
      className="collection-card"
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* glow that intensifies on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 18%, ${perfume.accent}30, transparent 65%)`,
          opacity: hover ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* perfume image */}
      <div
        className="collection-img"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: hover ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        >
          <Image
            src={perfume.image}
            alt={perfume.name}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Arabic name */}
      <span
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "1.7rem",
          color: GOLD,
          lineHeight: 1.2,
          marginTop: "0.5rem",
        }}
      >
        {perfume.arabic}
      </span>

      {/* English name */}
      <h3
        className="collection-name"
        style={{
          fontFamily: SERIF,
          fontSize: "1.5rem",
          fontWeight: 600,
          color: TEXT_DARK,
          margin: "0.25rem 0 0",
        }}
      >
        {perfume.name}
      </h3>

      {/* notes */}
      <span
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: perfume.accent,
          marginTop: "0.6rem",
        }}
      >
        {perfume.notes}
      </span>

      {/* description */}
      <p
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.6,
          color: TEXT_MID,
          margin: "0.9rem 0 0",
          maxWidth: "16rem",
        }}
      >
        {perfume.description}
      </p>

      {/* price */}
      <span
        className="collection-price"
        style={{
          fontFamily: SERIF,
          fontSize: "1.3rem",
          fontWeight: 600,
          color: GOLD,
          marginTop: "1.1rem",
        }}
      >
        AED {perfume.price}
      </span>

      {/* discover button */}
      <a
        href={`#${perfume.name.toLowerCase().replace(/\s+/g, "-")}`}
        style={btnStyle}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Discover
      </a>
    </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function CollectionSection() {
  return (
    <section
      id="collection"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        backgroundColor: "#F5EDE0",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* heading */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.85rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            <span aria-hidden="true" style={{ opacity: 0.6 }}>✦</span>
            Our Collection
            <span aria-hidden="true" style={{ opacity: 0.6 }}>✦</span>
          </span>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              color: TEXT_DARK,
              margin: "1rem 0 0",
            }}
          >
            Featured Perfumes
          </h2>
          <div
            aria-hidden="true"
            style={{
              fontSize: "0.7rem",
              color: GOLD,
              marginTop: "0.85rem",
              letterSpacing: "0.5em",
            }}
          >
            ◆
          </div>
        </div>

        {/* grid */}
        <div
          className="collection-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.75rem",
          }}
        >
          {PERFUMES.map((p, i) => (
            <PerfumeCard key={p.name} perfume={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes collection-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (max-width: 1024px) {
          .collection-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .collection-grid { grid-template-columns: 1fr !important; }
          .collection-card { padding: 1rem !important; }
          .collection-img { aspect-ratio: 3 / 4 !important; }
          .collection-name { font-size: 1.125rem !important; }
          .collection-price { font-size: 1rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .collection-grid span[aria-hidden="true"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
