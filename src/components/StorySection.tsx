"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WHITE = "#F5F5F5";
const GRAY_LIGHT = "#9A9A9A";
const GRAY_DARK = "#2A2A2A";
const BURGUNDY_LIGHT = "#8B2236";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STATS = [
  { value: 120, suffix: "+", label: "Fragrances" },
  { value: 18, suffix: "", label: "Years" },
  { value: 40, suffix: "+", label: "Countries" },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(overlayRef.current, { scaleX: 0 }); // reveal the image, no motion
        return;
      }

      /* 1. Image wipe reveal (one-time) + subtle zoom-out */
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
          transformOrigin: "right",
          scrollTrigger: { trigger: photoRef.current, start: "top 70%" },
        },
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: photoRef.current, start: "top 70%" },
        },
      );

      /* 2. Headline line reveal (mask) */
      gsap.from(".story-line", {
        yPercent: 100,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: copyRef.current, start: "top 75%" },
      });

      /* 3. Layered parallax (scrub) — image and text move at different speeds */
      gsap.to(parallaxRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(copyRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      /* 4. Count-up stats */
      gsap.utils.toArray<HTMLElement>(".story-stat-value").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || "";
        const counter = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(counter, {
          v: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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
      {/* ---------------- Left: full-bleed photo with wipe reveal ---------------- */}
      <div ref={photoRef} className="story-photo" style={{ position: "relative", minHeight: "640px", overflow: "hidden" }}>
        {/* parallax layer (oversized so the shift never reveals edges) */}
        <div ref={parallaxRef} style={{ position: "absolute", top: "-25%", left: 0, right: 0, height: "150%", willChange: "transform" }}>
          {/* zoom layer */}
          <div ref={imageRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
            <Image
              src="/assets/perfumeimg8.jpeg"
              alt="Shaghaf — the craft of Arabian perfumery"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        {/* wipe overlay — starts hidden (no-JS shows image); JS covers then wipes */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundColor: "#0A0A0A",
            transform: "scaleX(0)",
            transformOrigin: "right",
          }}
        />
      </div>

      {/* ---------------- Right: editorial copy ---------------- */}
      <div
        ref={copyRef}
        className="story-copy"
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
          className="story-headline font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: WHITE,
            margin: "1.25rem 0 1.75rem",
          }}
        >
          <span className="story-line-mask">
            <span className="story-line">Rooted in</span>
          </span>
          <span className="story-line-mask">
            <span className="story-line">
              <span style={{ color: BURGUNDY_LIGHT }}>Arabian</span> Tradition
            </span>
          </span>
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
                <span
                  className="story-stat-value font-display"
                  data-value={s.value}
                  data-suffix={s.suffix}
                  style={{ fontSize: "2rem", fontWeight: 800, color: WHITE, lineHeight: 1 }}
                >
                  {s.value}
                  {s.suffix}
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
        .story-line-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
        }
        .story-line {
          display: block;
          will-change: transform;
        }
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
