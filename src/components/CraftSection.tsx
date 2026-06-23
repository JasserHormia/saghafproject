"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const BURGUNDY_LIGHT = "#8B2236";
const GRAY_LIGHT = "#9A9A9A";
const TEXT_DARK = "#F5F5F5";
const TEXT_MID = "#9A9A9A";
const SERIF = '"Inter", sans-serif';

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
      {/* hairline circle with emoji */}
      <div
        style={{
          position: "relative",
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          backgroundColor: "#0A0A0A",
          border: `1px solid ${hover ? BURGUNDY_LIGHT : "rgba(245,245,245,0.22)"}`,
          transition: "border-color 0.4s ease",
        }}
      >
        <span aria-hidden="true">{step.icon}</span>
      </div>

      {/* large outlined number */}
      <span
        className="craft-num font-display"
        aria-hidden="true"
        style={{
          fontSize: "3.25rem",
          fontWeight: 800,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1.5px ${BURGUNDY_LIGHT}`,
          marginTop: "1.5rem",
        }}
      >
        {step.num}
      </span>

      {/* title */}
      <h3
        className="craft-title font-display"
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: TEXT_DARK,
          margin: "0.75rem 0 0.75rem",
        }}
      >
        {step.title}
      </h3>

      {/* description */}
      <p
        className="craft-desc"
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
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Dramatic step entrance: numbers bounce + rotate in, titles/descs fade up after.
  useIsoLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".craft-steps", start: "top 80%" } });
      tl.from(".craft-num", { scale: 0, rotate: -15, duration: 0.7, ease: "back.out(1.7)", stagger: 0.15 }, 0)
        .from(".craft-title", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.15 }, 0.3)
        .from(".craft-desc", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.15 }, 0.45);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      id="craft"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        backgroundColor: "#0A0A0A",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* heading */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GRAY_LIGHT,
            }}
          >
            The Process
          </span>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 800,
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
              top: "36px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              transformOrigin: "left center",
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s",
              backgroundColor: "#2A2A2A",
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
