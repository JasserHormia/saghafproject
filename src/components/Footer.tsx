"use client";

import { useState, type CSSProperties } from "react";

const GOLD = "#D4A843";
const MUTED = "rgba(245,237,224,0.6)";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "WhatsApp", href: "https://wa.me/971501405806" },
];

export default function Footer() {
  const [hovered, setHovered] = useState<string | null>(null);

  const link = (key: string): CSSProperties => ({
    fontSize: "0.72rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: hovered === key ? GOLD : MUTED,
    textDecoration: "none",
    transition: "color 0.3s ease",
  });

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#2C1F0A",
        borderTop: "1px solid rgba(184,147,42,0.2)",
        padding: "2.5rem 2rem",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* left: English logo */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shaghaf_logo_eng.png"
            alt="Shaghaf"
            style={{ width: "110px", height: "auto", filter: "brightness(10)" }}
          />
        </div>

        {/* center: copyright */}
        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            color: MUTED,
            whiteSpace: "nowrap",
          }}
        >
          © {new Date().getFullYear()} Shaghaf. All rights reserved.
        </p>

        {/* right: socials */}
        <nav
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1.75rem",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={link(s.label)}
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
            gap: 1.5rem !important;
          }
          .footer-grid > div:first-child { justify-content: center !important; }
          .footer-grid nav { justify-content: center !important; }
        }
      `}</style>
    </footer>
  );
}
