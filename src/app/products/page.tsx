"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ScrollAnimations from "@/components/ScrollAnimations";
import Footer from "@/components/Footer";

const GOLD = "#8B2236";
const WHITE = "#FFFFFF";
const CREAM = "#0A0A0A";
const TEXT_DARK = "#F5F5F5";
const TEXT_MID = "#9A9A9A";
const SERIF = '"Inter", sans-serif';

type Product = {
  id: number;
  name: string;
  arabic: string;
  notes: string;
  price: number;
  accent: string;
  category: "Oud" | "Floral" | "Fresh" | "Oriental";
  image: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Oud Al Layl", arabic: "عود الليل", notes: "Dark Oud · Amber · Musk", price: 145, accent: "#8B2040", category: "Oud", image: "/assets/perfume1.jpeg" },
  { id: 2, name: "Wardah Gold", arabic: "وردة الذهب", notes: "Rose · Saffron · Sandalwood", price: 169, accent: "#C9A84C", category: "Floral", image: "/assets/perfume2.jpeg" },
  { id: 3, name: "Breeze of Mecca", arabic: "نسيم مكة", notes: "Frankincense · Cedar · Neroli", price: 89, accent: "#4A7FA5", category: "Fresh", image: "/assets/perfume3.jpeg" },
  { id: 4, name: "Sultana Noir", arabic: "سلطانة نوار", notes: "Black Iris · Velvet Oud · Vanilla", price: 159, accent: "#6B4C9A", category: "Oriental", image: "/assets/perfume4.jpeg" },
  { id: 5, name: "Desert Bloom", arabic: "زهرة الصحراء", notes: "Jasmine · White Musk · Amber", price: 99, accent: "#D4956A", category: "Floral", image: "/assets/perfume5.jpeg" },
  { id: 6, name: "Al Majd", arabic: "المجد", notes: "Royal Oud · Leather · Tobacco", price: 165, accent: "#8B6914", category: "Oud", image: "/assets/perfume1.jpeg" },
  { id: 7, name: "Raha", arabic: "راحة", notes: "Green Tea · Bergamot · Vetiver", price: 79, accent: "#4A7A5A", category: "Fresh", image: "/assets/perfume2.jpeg" },
  { id: 8, name: "Layl Al Ward", arabic: "ليل الورد", notes: "Midnight Rose · Oud · Patchouli", price: 119, accent: "#9A3060", category: "Floral", image: "/assets/perfume3.jpeg" },
  { id: 9, name: "Amber Sands", arabic: "رمال العنبر", notes: "Warm Amber · Vanilla · Caramel", price: 95, accent: "#B8860B", category: "Oriental", image: "/assets/perfume4.jpeg" },
  { id: 10, name: "Zafaran", arabic: "زعفران", notes: "Pure Saffron · Rose · Musk", price: 149, accent: "#C8602A", category: "Oriental", image: "/assets/perfume5.jpeg" },
  { id: 11, name: "Cedar Smoke", arabic: "دخان الأرز", notes: "Cedarwood · Smoke · Vetiver", price: 109, accent: "#5A4A3A", category: "Fresh", image: "/assets/perfume1.jpeg" },
  { id: 12, name: "Noor", arabic: "نور", notes: "White Musk · Lily · Soft Woods", price: 85, accent: "#8A9A7A", category: "Floral", image: "/assets/perfume2.jpeg" },
  { id: 13, name: "Layl Al Shams", arabic: "ليل الشمس", notes: "Bergamot · Amber · Cedarwood", price: 129, accent: "#C9A84C", category: "Fresh", image: "/assets/perfume6.jpeg" },
  { id: 14, name: "Reef Al Noor", arabic: "ريف النور", notes: "White Musk · Iris · Sandalwood", price: 109, accent: "#8FA0B0", category: "Floral", image: "/assets/perfume7.jpeg" },
  { id: 15, name: "Yasmeen Al Fajr", arabic: "ياسمين الفجر", notes: "Jasmine · Neroli · White Musk", price: 119, accent: "#B86B8A", category: "Floral", image: "/assets/perfume8.jpeg" },
];

const CATEGORIES = ["All", "Oud", "Floral", "Fresh", "Oriental"] as const;
type Category = (typeof CATEGORIES)[number];

const SORTS = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
} as const;
type SortKey = keyof typeof SORTS;

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-10-9.2C.4 8.4 2 5 5.4 5c2 0 3.4 1.1 4.3 2.4l.4.6.4-.6C11.2 6.1 12.6 5 14.6 5 18 5 19.6 8.4 22 11.8 19.5 16.4 12 21 12 21z"
        fill={filled ? GOLD : "none"}
        stroke={filled ? GOLD : "rgba(158,139,110,0.8)"}
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                              */
/* ------------------------------------------------------------------ */
function ProductCard({
  product,
  index,
  wishlisted,
  onToggleWishlist,
}: {
  product: Product;
  index: number;
  wishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}) {
  const [hover, setHover] = useState(false);
  const slug = product.name.toLowerCase().replace(/\s+/g, "-");

  return (
    // Wrapper owns the entrance animation; inner card owns hover transform so
    // the two never fight over the `transform` property.
    <div
      className="product-card-wrap"
      style={{
        height: "100%",
        animation: `product-in 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s both`,
      }}
    >
    <div
      className="product-card"
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "6px",
        background: "#141414",
        border: `1px solid ${hover ? "#6B1626" : "#2A2A2A"}`,
        boxShadow: "none",
        transform: hover ? "translateY(-10px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        {/* scaling wrapper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: hover ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, (max-width: 1100px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* wishlist */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => onToggleWishlist(product.id)}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            zIndex: 2,
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(20,20,20,0.7)",
            border: "1px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            lineHeight: 0,
          }}
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* hover overlay with DISCOVER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "1.5rem",
            background:
              "linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 45%, transparent 70%)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: hover ? "auto" : "none",
          }}
        >
          <a
            href={`#${slug}`}
            style={{
              fontSize: "0.66rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: WHITE,
              padding: "0.65rem 1.5rem",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: "2px",
              textDecoration: "none",
              backgroundColor: "rgba(255,255,255,0.08)",
              transform: hover ? "translateY(0)" : "translateY(12px)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Discover →
          </a>
        </div>
      </div>

      {/* details */}
      <div style={{ padding: "1.25rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <span
          style={{
            alignSelf: "flex-start",
            fontSize: "0.55rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: GOLD,
            padding: "0.25rem 0.6rem",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "9999px",
          }}
        >
          {product.category}
        </span>

        <h3 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 500, color: TEXT_DARK, margin: "0.75rem 0 0" }}>
          {product.name}
        </h3>
        <span style={{ fontFamily: SERIF, fontSize: "1.1rem", color: GOLD, lineHeight: 1.2, marginTop: "0.15rem" }}>
          {product.arabic}
        </span>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: TEXT_MID, marginTop: "0.6rem" }}>
          {product.notes}
        </span>
        <span style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 600, color: GOLD, marginTop: "auto", paddingTop: "1rem" }}>
          AED {product.price}
        </span>
      </div>
    </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ProductsPage() {
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [inView, setInView] = useState(false);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = useMemo(() => {
    const filtered =
      activeCat === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCat);
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return sorted;
  }, [activeCat, sort]);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div style={{ backgroundColor: CREAM, color: TEXT_DARK }}>
      <ScrollAnimations />
      <Navbar />

      {/* ============ HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "11rem 2rem 4rem" }}>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            width: "800px",
            maxWidth: "120vw",
            height: "600px",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
            Shop Fragrances
          </span>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", fontWeight: 500, margin: "0.75rem 0 0" }}>
            Our Collection
          </h1>
          <p style={{ maxWidth: "34rem", margin: "1.25rem auto 0", fontSize: "1rem", lineHeight: 1.7, color: TEXT_MID }}>
            Twelve signature fragrances, each a distillation of rare ingredients
            and Arabian craft. Find the scent that becomes your own.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.25rem", marginTop: "1.5rem" }}>
            <div className="gold-line" style={{ width: "80px" }} />
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: GOLD,
                padding: "0.4rem 1rem",
                border: `1px solid rgba(255,255,255,0.4)`,
                borderRadius: "9999px",
              }}
            >
              {PRODUCTS.length} Fragrances
            </span>
            <div className="gold-line" style={{ width: "80px" }} />
          </div>
        </div>
      </section>

      {/* ============ FILTER + SORT + GRID ============ */}
      <section style={{ padding: "0 2rem 7rem" }}>
        <div ref={gridWrapRef} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* controls */}
          <div
            className="products-controls reveal"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.5rem",
            }}
          >
            {/* category pills */}
            <div className="filter-pills" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {CATEGORIES.map((c) => {
                const active = c === activeCat;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    style={{
                      fontSize: "0.66rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "0.55rem 1.3rem",
                      color: active ? WHITE : "#9A9A9A",
                      backgroundColor: active ? "#6B1626" : "transparent",
                      border: `1px solid ${active ? "#6B1626" : "#2A2A2A"}`,
                      borderRadius: 0,
                      cursor: "pointer",
                      transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* sort */}
            <div className="sort-wrap" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <label htmlFor="sort" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT_MID }}>
                Sort
              </label>
              <select
                id="sort"
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                style={{
                  fontSize: "0.8rem",
                  fontFamily: "inherit",
                  color: TEXT_DARK,
                  backgroundColor: "#141414",
                  border: `1px solid rgba(255,255,255,0.3)`,
                  borderRadius: "2px",
                  padding: "0.55rem 0.9rem",
                  cursor: "pointer",
                  outline: "none",
                  appearance: "none",
                }}
              >
                {Object.entries(SORTS).map(([key, label]) => (
                  <option key={key} value={key} style={{ backgroundColor: "#141414" }}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* grid — keyed so cards re-animate on filter/sort change */}
          {inView && (
            <div
              key={`${activeCat}-${sort}`}
              className="products-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
            >
              {visible.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  wishlisted={wishlist.has(p.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          )}

          {inView && visible.length === 0 && (
            <p style={{ textAlign: "center", color: TEXT_MID, padding: "3rem 0" }}>
              No fragrances in this category.
            </p>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes product-in {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        /* Mobile keeps a 2-up grid */
        @media (max-width: 800px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        }
        @media (max-width: 767px) {
          .products-controls { flex-direction: column; align-items: stretch; gap: 1rem; }
          /* horizontally scrollable filter pills */
          .filter-pills {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }
          .filter-pills > button { flex: 0 0 auto; }
          .sort-wrap { width: 100%; }
          .sort-select { width: 100%; flex: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .product-card-wrap { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
