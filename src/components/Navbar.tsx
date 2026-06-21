"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PRODUCTS", href: "/products" },
    { label: "CONTACT", href: "/contact" },
  ];

  const linkStyle = (href: string): CSSProperties => ({
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontWeight: 500,
    color: pathname === href ? "#FFFFFF" : "#B0B0B0",
    textDecoration: "none",
    whiteSpace: "nowrap",
  });

  const navBg = scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.55)";

  const logoFilter = "brightness(0) invert(1)";

  return (
    <>
      {/* ===================== DESKTOP NAVBAR ===================== */}
      <nav
        className="nav-desktop"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "110px",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 40px",
          background: navBg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transition: "background 0.4s ease",
        }}
      >
        {/* left links */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {links.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* center logo */}
        <Link href="/" aria-label="Shaghaf home" style={{ justifySelf: "center", display: "flex", alignItems: "center" }}>
          <Image
            src="/shaghaf_logo_eng.png"
            alt="Shaghaf"
            width={280}
            height={98}
            priority
            style={{ width: "280px", height: "98px", objectFit: "contain", filter: logoFilter }}
          />
        </Link>

        {/* right links + shop now */}
        <div style={{ display: "flex", alignItems: "center", justifySelf: "end", gap: "36px" }}>
          {links.slice(2).map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/products"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              padding: "11px 24px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            SHOP NOW
          </Link>
        </div>
      </nav>

      {/* ===================== MOBILE NAVBAR ===================== */}
      <nav
        className="nav-mobile"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "84px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: navBg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transition: "background 0.4s ease",
        }}
      >
        {/* logo left */}
        <Link href="/" aria-label="Shaghaf home" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/shaghaf_logo_eng.png"
            alt="Shaghaf"
            width={170}
            height={58}
            priority
            style={{ width: "170px", height: "58px", objectFit: "contain", filter: logoFilter }}
          />
        </Link>

        {/* hamburger right */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            cursor: "pointer",
            zIndex: 101,
          }}
        >
          <span
            style={{
              width: "24px",
              height: "2px",
              background: "white",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
            }}
          />
          <span
            style={{
              width: "24px",
              height: "2px",
              background: "white",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>

        {/* dropdown menu */}
        <div
          style={{
            position: "fixed",
            top: "84px",
            left: 0,
            right: 0,
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: menuOpen ? "10px 24px 24px" : "0 24px",
            display: "flex",
            flexDirection: "column",
            maxHeight: menuOpen ? "400px" : "0px",
            opacity: menuOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, padding 0.3s ease",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "white",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/*
        Show/hide is driven by a real media query (not Tailwind lg: utilities),
        so it can never be purged from the production CSS bundle.
      */}
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile { display: flex; }
        @media (min-width: 1024px) {
          .nav-desktop { display: grid; }
          .nav-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
