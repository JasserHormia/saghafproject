"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const GOLD = "#8B2236";
const TEXT_MID = "#9A9A9A";

/* ------------------------------------------------------------------ */
/*  Line-art icons                                                     */
/* ------------------------------------------------------------------ */
const iconProps = {
  width: 34,
  height: 34,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: GOLD,
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function BottleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 2h4v3h-4z" />
      <path d="M9.5 5h5l1 3v12a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V8z" />
      <path d="M9 12h6" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 20C5 10 12 4 20 4c0 8-6 15-15 15z" />
      <path d="M5 20C8 15 12 11 18 7" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18" />
      <path d="M12 8v13" />
      <path d="M12 8C9 8 7 6.5 7 5s2-2 3 0 2 3 2 3zM12 8c3 0 5-1.5 5-3s-2-2-3 0-2 3-2 3z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 6h11v10H2z" />
      <path d="M13 9h4l3 3v4h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </svg>
  );
}

const FEATURES: { icon: ReactNode; title: string; text: string }[] = [
  { icon: <BottleIcon />, title: "Premium Quality", text: "Finest ingredients carefully selected" },
  { icon: <LeafIcon />, title: "Unique Scents", text: "Exclusive blends made with passion" },
  { icon: <GiftIcon />, title: "Luxury Experience", text: "Elegant packaging for every moment" },
  { icon: <TruckIcon />, title: "Fast Delivery", text: "Secure & fast delivery to your doorstep" },
];

export default function FeaturesStrip() {
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const item = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
  });

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        padding: "2rem 2rem",
      }}
    >
      <div
        ref={ref}
        className="features-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="features-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem 1.5rem",
              borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
              ...item(i),
            }}
          >
            <span style={{ flexShrink: 0, lineHeight: 0 }}>{f.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: "0.8rem", lineHeight: 1.45, color: TEXT_MID, marginTop: "0.25rem" }}>
                {f.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.75rem 1rem; }
          .features-item {
            border-left: none !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 0.5rem !important;
            padding: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
