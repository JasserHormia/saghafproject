"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const GOLD = "#B8932A";
const GOLD_LIGHT = "#D4A843";
const TEXT_DARK = "#2C1F0A";
const TEXT_MID = "#6B5A3E";
const SERIF = '"Cormorant Garamond", Georgia, serif';

const STEPS = [
  {
    num: "01",
    icon: "🌱",
    title: "Source",
    text: "We travel to the origin — Cambodian forests, Taif rose fields, Kashmiri saffron farms — to secure only the rarest raw materials.",
  },
  {
    num: "02",
    icon: "⚗️",
    title: "Blend",
    text: "Our master perfumers compose each fragrance by hand, balancing top, heart, and base notes over weeks of careful refinement.",
  },
  {
    num: "03",
    icon: "⏳",
    title: "Age",
    text: "The blend rests in darkness for months, allowing the oils to marry and mature into a single, harmonious accord.",
  },
  {
    num: "04",
    icon: "🍾",
    title: "Bottle",
    text: "Each flacon is filled, sealed, and inspected by hand before being adorned with its gold signature and prepared for you.",
  },
];

function CraftStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const [hover, setHover] = useState(false);

  const style: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    minWidth: 0,
    transitionDelay: `${index * 0.15}s`,
  };

  return (
    <div
      className="reveal"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* gold-bordered circle with emoji */}
      <div
        style={{
          position: "relative",
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          backgroundColor: "#FAF6F0",
          border: `1.5px solid ${hover ? GOLD_LIGHT : GOLD}`,
          boxShadow: hover
            ? `0 0 26px rgba(184,147,42,0.5)`
            : `0 0 0 6px rgba(184,147,42,0.06)`,
          transition: "box-shadow 0.4s ease, border-color 0.4s ease",
        }}
      >
        <span aria-hidden="true">{step.icon}</span>
      </div>

      {/* number */}
      <span
        style={{
          fontFamily: SERIF,
          fontSize: "0.9rem",
          letterSpacing: "0.25em",
          color: GOLD,
          marginTop: "1.25rem",
        }}
      >
        {step.num}
      </span>

      {/* title */}
      <h3
        style={{
          fontFamily: SERIF,
          fontSize: "1.6rem",
          fontWeight: 600,
          color: TEXT_DARK,
          margin: "0.4rem 0 0.75rem",
        }}
      >
        {step.title}
      </h3>

      {/* description */}
      <p
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.65,
          color: TEXT_MID,
          margin: 0,
          maxWidth: "15rem",
        }}
      >
        {step.text}
      </p>
    </div>
  );
}

export default function CraftSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="craft"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        backgroundColor: "#FAF6F0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* heading */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            The Process
          </span>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 500,
              color: TEXT_DARK,
              margin: "0.75rem 0 0",
            }}
          >
            The Art of Craft
          </h2>
          <div
            className="gold-line"
            style={{ maxWidth: "120px", margin: "1.5rem auto 0" }}
          />
        </div>

        {/* steps connected by a horizontal gold line */}
        <div ref={ref} style={{ position: "relative" }}>
          {/* connecting line: spans between the circle centers, animates in */}
          <span
            aria-hidden="true"
            className="craft-line"
            style={{
              position: "absolute",
              top: "42px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              transformOrigin: "left center",
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s",
              background:
                "linear-gradient(90deg, transparent, rgba(184,147,42,0.25) 15%, #D4A843 50%, rgba(184,147,42,0.25) 85%, transparent)",
            }}
          />

          <div
            className="craft-steps"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.5rem",
            }}
          >
            {STEPS.map((step, i) => (
              <CraftStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Tablet: 2 columns */
        @media (max-width: 1023px) and (min-width: 600px) {
          .craft-line { display: none !important; }
          .craft-steps {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        /* Mobile: single column */
        @media (max-width: 599px) {
          .craft-line { display: none !important; }
          .craft-steps {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
