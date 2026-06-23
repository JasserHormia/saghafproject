"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";
const GRAY_DARK = "#2A2A2A";
const BURGUNDY = "#6B1626";
const BURGUNDY_LIGHT = "#8B2236";

type Perfume = {
  name: string;
  notes: string;
  price: number;
  image: string;
};

const PERFUMES: Perfume[] = [
  { name: "Oud Al Layl", notes: "Dark Oud · Amber · Musk", price: 149, image: "/assets/perfume2.jpeg" },
  { name: "Wardah Gold", notes: "Rose · Saffron · Sandalwood", price: 169, image: "/assets/perfumeimg2.jpeg" },
  { name: "Breeze of Mecca", notes: "Frankincense · Cedar · Neroli", price: 89, image: "/assets/perfumeimg5.jpeg" },
  { name: "Sultana Noir", notes: "Black Iris · Velvet Oud · Vanilla", price: 159, image: "/assets/perfumeimg7.jpeg" },
  { name: "Desert Bloom", notes: "Jasmine · White Musk · Amber", price: 99, image: "/assets/perfumeimg9.jpeg" },
  { name: "Zafaran", notes: "Pure Saffron · Rose · Musk", price: 149, image: "/assets/perfumeimg11.jpeg" },
  { name: "Layl Al Shams", notes: "Bergamot · Amber · Cedarwood", price: 129, image: "/assets/perfume6.jpeg" },
  { name: "Reef Al Noor", notes: "White Musk · Iris · Sandalwood", price: 109, image: "/assets/perfume7.jpeg" },
  { name: "Yasmeen Al Fajr", notes: "Jasmine · Neroli · White Musk", price: 119, image: "/assets/perfume8.jpeg" },
];

export default function CollectionSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollBy = (dir: number) => {
    rowRef.current?.scrollBy({ left: dir * 344, behavior: "smooth" });
  };

  useIsoLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Reduced motion: leave everything visible, no entrance / pulse.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.from(".coll-header", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // 2. Cards stagger in from the right + pop
      gsap.from(".coll-card", {
        x: 80,
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".coll-row", start: "top 80%" },
      });

      // 4. Continuous pulse on the scroll arrows to signal interactivity
      gsap.fromTo(
        ".coll-arrow",
        { scale: 1, opacity: 0.6 },
        { scale: 1.1, opacity: 1, duration: 1, ease: "sine.inOut", repeat: -1, yoyo: true },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      style={{ position: "relative", backgroundColor: "#0A0A0A", padding: "6rem 0" }}
    >
      {/* Header */}
      <div
        className="coll-header"
        style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem) 3rem" }}
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
          The Collection
        </span>
        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: WHITE,
            margin: "0.75rem 0 0",
          }}
        >
          Signature Fragrances
        </h2>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", maxWidth: "1500px", margin: "0 auto" }}>
        <button type="button" aria-label="Previous" className="coll-arrow coll-arrow-left" onClick={() => scrollBy(-1)}>
          ‹
        </button>
        <button type="button" aria-label="Next" className="coll-arrow coll-arrow-right" onClick={() => scrollBy(1)}>
          ›
        </button>

        <div
          ref={rowRef}
          className="coll-row no-scrollbar"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          {PERFUMES.map((p, i) => (
            <div
              key={p.name}
              className="coll-card reveal"
              style={{
                flex: "0 0 auto",
                width: "320px",
                scrollSnapAlign: "start",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {/* image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
                <div className="coll-img" style={{ position: "absolute", inset: 0, transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* hairline divider */}
              <div style={{ height: "1px", backgroundColor: GRAY_DARK, margin: "1.25rem 0" }} />

              {/* text */}
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: WHITE, margin: 0 }}>{p.name}</h3>
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GRAY_LIGHT,
                  margin: "0.5rem 0 0",
                }}
              >
                {p.notes}
              </p>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: BURGUNDY_LIGHT, margin: "0.75rem 0 0" }}>
                AED {p.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* View all */}
      <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
        <Link href="/products" className="coll-viewall">
          View All
        </Link>
      </div>

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .coll-img { will-change: transform; }
        /* 3. Dramatic hover: zoom + slight rotation (~power2.out over 0.6s) */
        .coll-card:hover .coll-img { transform: scale(1.08) rotate(1deg); }

        .coll-arrow {
          position: absolute;
          top: 38%;
          z-index: 4;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(245,245,245,0.5);
          background: rgba(10,10,10,0.4);
          color: ${WHITE};
          font-size: 1.5rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .coll-arrow:hover { background: ${BURGUNDY}; border-color: ${BURGUNDY}; color: ${WHITE}; }
        .coll-arrow-left { left: clamp(0.5rem, 3vw, 2.5rem); }
        .coll-arrow-right { right: clamp(0.5rem, 3vw, 2.5rem); }

        .coll-viewall {
          position: relative;
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${WHITE};
          text-decoration: none;
          padding-bottom: 6px;
        }
        .coll-viewall::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: ${BURGUNDY_LIGHT};
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .coll-viewall:hover { color: ${BURGUNDY_LIGHT}; }
        .coll-viewall:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .coll-card { width: 78vw !important; max-width: 300px; }
          .coll-arrow { display: none; }
          .coll-row { padding: 0 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
