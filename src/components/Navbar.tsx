"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  const linkStyle = (href: string) => ({
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontWeight: 500,
    color: pathname === href ? "#FFFFFF" : "#B0B0B0",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-[72px] lg:h-[90px] flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between lg:justify-normal px-5 lg:px-10"
      style={{
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "background 0.4s ease",
      }}
    >
      {/* Desktop-only left links */}
      <div className="hidden items-center gap-9 lg:flex">
        {links.slice(0, 2).map((l) => (
          <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Logo — left on mobile, centered on desktop; smaller on mobile */}
      <Link href="/" aria-label="Shaghaf home" className="flex items-center lg:justify-self-center">
        <Image
          src="/shaghaf_logo_eng.png"
          alt="Shaghaf"
          width={190}
          height={64}
          priority
          className="h-[40px] w-[120px] lg:h-[64px] lg:w-[190px]"
          style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
      </Link>

      {/* Desktop-only right links + Shop Now */}
      <div className="hidden items-center gap-9 lg:flex lg:justify-self-end">
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
            flexShrink: 0,
          }}
        >
          SHOP NOW
        </Link>
      </div>

      {/* Mobile-only hamburger */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex flex-col gap-1.25 lg:hidden"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <span
          className="bg-white"
          style={{
            width: "22px",
            height: "1px",
            transform: menuOpen ? "rotate(45deg) translateY(3px)" : "none",
            transition: "transform 0.3s ease",
          }}
        />
        <span
          className="bg-white"
          style={{
            width: "22px",
            height: "1px",
            transform: menuOpen ? "rotate(-45deg) translateY(-3px)" : "none",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {/* Mobile dropdown menu — always rendered, animated via CSS */}
      <div
        className="fixed left-0 right-0 flex flex-col lg:hidden"
        style={{
          top: "72px",
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "8px 24px 24px",
          gap: "4px",
          maxHeight: menuOpen ? "440px" : "0px",
          opacity: menuOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
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
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
              transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
            }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/products"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "16px",
            alignSelf: "flex-start",
            fontSize: "11px",
            letterSpacing: "0.2em",
            fontWeight: 600,
            color: "#FFFFFF",
            border: "1px solid #FFFFFF",
            padding: "11px 24px",
            textDecoration: "none",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
            transition: `opacity 0.4s ease ${links.length * 0.05}s, transform 0.4s ease ${links.length * 0.05}s`,
          }}
        >
          SHOP NOW
        </Link>
      </div>
    </nav>
  );
}
