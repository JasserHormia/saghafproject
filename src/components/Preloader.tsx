"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#8B2236";
const TEXT_DARK = "#F5F5F5";
const SERIF = '"Inter", sans-serif';

const LETTERS = "SHAGHAF".split("");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [logoIn, setLogoIn] = useState(false);
  const [lineIn, setLineIn] = useState(false);
  const [lettersIn, setLettersIn] = useState(false);
  const [subIn, setSubIn] = useState(false);
  const [ringIn, setRingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [gone, setGone] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLogoIn(true)); // phase 1
    const timers = [
      setTimeout(() => setLineIn(true), 800), // phase 2
      setTimeout(() => setLettersIn(true), 1600), // phase 3
      setTimeout(() => setSubIn(true), 2200), // phase 4
      setTimeout(() => setRingIn(true), 2800), // phase 5
      setTimeout(() => setFadingOut(true), 3200), // phase 6
      setTimeout(() => {
        setGone(true);
        if (!done.current) {
          done.current = true;
          onComplete();
        }
      }, 3800),
    ];
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        background: "linear-gradient(135deg, #141414 0%, #1F1F1F 100%)",
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      {/* Phase 1 — logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/shaghaf_logo.png"
        alt="شغف"
        width={200}
        height={200}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          opacity: logoIn ? 1 : 0,
          transform: logoIn ? "scale(1)" : "scale(0.8)",
          filter: "brightness(0) invert(1) drop-shadow(0 0 26px rgba(139,34,54,0.5))",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Phase 2 — gold line */}
      <span
        style={{
          height: "1px",
          width: lineIn ? "180px" : "0px",
          background: "linear-gradient(90deg, transparent, #8B2236, transparent)",
          transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Phase 3 — SHAGHAF letters */}
      <div style={{ display: "flex" }}>
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            style={{
              fontFamily: SERIF,
              fontSize: "0.9rem",
              letterSpacing: "0.5em",
              color: TEXT_DARK,
              opacity: lettersIn ? 1 : 0,
              transform: lettersIn ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Phase 4 — sub-text */}
      <span
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: subIn ? 1 : 0,
          transform: subIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        Perfume Manufacturing &amp; Sales
      </span>

      {/* Phase 5 — progress ring */}
      <div style={{ height: "48px", marginTop: "0.5rem" }}>
        {ringIn && (
          <svg width="48" height="48" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={GOLD}
              strokeWidth="4"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{
                strokeDasharray: 251,
                strokeDashoffset: 251,
                animation: "ringDraw 0.6s ease-out forwards",
              }}
            />
          </svg>
        )}
      </div>
    </div>
  );
}
