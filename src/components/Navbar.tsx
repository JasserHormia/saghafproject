"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const linkClass = (active: boolean) =>
  [
    "text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300",
    active ? "text-gold" : "text-text-dark hover:text-gold",
  ].join(" ");

const mobileLinkClass = (active: boolean) =>
  [
    "block w-full text-center py-4 text-base font-medium tracking-[0.25em] uppercase transition-colors duration-300",
    active ? "text-gold" : "text-text-dark hover:text-gold",
  ].join(" ");

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection — switch to glass state past 50px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(250,246,240,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(184,147,42,0.15)" : "transparent"}`,
      }}
      className="site-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 px-6 lg:px-16 transition-all duration-500"
    >
      {/* Left: logo */}
      <Link href="/" aria-label="Shaghaf home" className="flex items-center">
        <Image
          src="/shaghaf_logo_eng.png"
          alt="Shaghaf"
          width={140}
          height={50}
          priority
          className="brightness-[0.2] h-auto w-30 md:w-35"
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
      </Link>

      {/* Center: desktop links */}
      <div className="hidden items-center gap-10 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(pathname === link.href)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: shop button (desktop) + hamburger (mobile) */}
      <div className="flex items-center gap-4">
        <Link
          href="/products"
          className="hidden rounded-sm border border-gold px-5 py-2 text-xs font-light uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-white hover:shadow-[0_0_24px_rgba(184,147,42,0.4)] md:inline-block"
        >
          Shop Now
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-6 rounded bg-gold transition-all duration-300 ${
              menuOpen ? "translate-y-1.75 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 rounded bg-gold transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 rounded bg-gold transition-all duration-300 ${
              menuOpen ? "-translate-y-1.75 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay menu — onClick on wrapper closes it */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#FAF6F0]/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-3"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={mobileLinkClass(pathname === link.href)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/products"
          className="mt-4 rounded-sm border border-gold px-5 py-2 text-xs font-light uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-white"
        >
          Shop Now
        </Link>
      </div>

      {/* On phones the bar is always slightly opaque for legibility. */}
      <style>{`
        @media (max-width: 768px) {
          .site-nav {
            background-color: rgba(250,246,240,0.98) !important;
            backdrop-filter: blur(14px) saturate(140%) !important;
            -webkit-backdrop-filter: blur(14px) saturate(140%) !important;
            border-bottom: 1px solid rgba(184,147,42,0.15) !important;
          }
        }
      `}</style>
    </nav>
  );
}
