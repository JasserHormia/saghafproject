"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#B8932A";
const INTERACTIVE = 'a, button, input, textarea, select, label, [data-cursor="hover"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Desktop / fine-pointer only.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let scale = 1;
    let targetScale = 1;
    let hovered = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }
    };

    // mouseover bubbles for every element entered → recompute hover state.
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      hovered = !!target?.closest?.(INTERACTIVE);
      targetScale = hovered ? 1.5 : 1; // 40px -> 60px
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.08;
      ring.y += (mouse.y - ring.y) * 0.08;
      scale += (targetScale - scale) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.backgroundColor = hovered
          ? "rgba(184,147,42,0.1)"
          : "transparent";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Gold dot — follows exactly */}
      <div
        ref={dotRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: GOLD,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      {/* Ring — lerped follow + hover scale/fill */}
      <div
        ref={ringRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1px solid rgba(184,147,42,0.5)`,
          backgroundColor: "transparent",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform, background-color",
          transition: "background-color 0.3s ease",
        }}
      />
    </>
  );
}
