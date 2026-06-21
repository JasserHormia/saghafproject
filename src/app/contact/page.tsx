"use client";

import {
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import Navbar from "@/components/Navbar";
import ScrollAnimations from "@/components/ScrollAnimations";
import Footer from "@/components/Footer";

const GOLD = "#8B2236";
const GOLD_LIGHT = "#8B2236";
const WHITE = "#FFFFFF";
const CREAM = "#0A0A0A";
const TEXT_DARK = "#F5F5F5";
const TEXT_MID = "#9A9A9A";
const WA_GREEN = "#25D366";
const SERIF = '"Inter", sans-serif';

const WA_NUMBER = "971501405806";
const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const QUICK_ORDERS = [
  { label: "Ask about Oud Al Layl", msg: "Hello Shaghaf! I am interested in Oud Al Layl, can you tell me more?" },
  { label: "Request Custom Blend", msg: "Hello Shaghaf! I would like to request a custom perfume blend." },
  { label: "Wholesale Inquiry", msg: "Hello Shaghaf! I am interested in wholesale pricing and partnerships." },
];

const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Custom Fragrance",
  "Wholesale & Distribution",
  "Press & Media",
] as const;

const FAQS = [
  { q: "Do you ship internationally?", a: "Yes — we ship to over 40 countries worldwide, with fully tracked delivery on every order." },
  { q: "Can I get a custom blend?", a: "Absolutely. Book a consultation with our perfumers and we'll craft a fragrance unique to you." },
  { q: "What's the minimum wholesale order?", a: "Wholesale terms vary by region and volume — contact us and we'll share current pricing and minimums." },
  { q: "How long does shipping take?", a: "Most orders arrive within 3–7 business days, depending on your destination." },
  { q: "Do you offer samples?", a: "Yes — discovery sample sets are available so you can experience the collection before committing." },
];

/* ------------------------------------------------------------------ */
/*  Reveal                                                            */
/* ------------------------------------------------------------------ */
// Delegates to the global .reveal observer in <ScrollAnimations />.
function Reveal({
  children,
  delay = 0,
  x = 0,
  scale = false,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  const variant = scale
    ? "reveal-scale"
    : x < 0
      ? "reveal-left"
      : x > 0
        ? "reveal-right"
        : "";
  return (
    <div
      className={`reveal ${variant} ${className ?? ""}`.trim()}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */
function WhatsAppIcon({ size = 28, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.23 8.23 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 015.83 2.42 8.2 8.2 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 00-.67.31c-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

const SOCIALS: { label: string; path: ReactNode }[] = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Twitter",
    path: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
    ),
  },
  {
    label: "Snapchat",
    path: (
      <path d="M12 2c2.5 0 4.5 2 4.6 4.5l.04 1.3c.5.3 1 .1 1.4-.1.5-.2 1 .5.6.9-.4.4-1.2.7-1.7.9-.2.5.9 1.9 2.4 2.4.4.1.5.6.1.8-.6.4-1.6.5-1.8.9-.1.3.1.8-.3.9-.4.1-1-.2-1.6-.1-.5.1-.8.9-1.6 1.2-.8.3-1.7-.4-2.6-.4s-1.8.7-2.6.4c-.8-.3-1.1-1.1-1.6-1.2-.6-.1-1.2.2-1.6.1-.4-.1-.2-.6-.3-.9-.2-.4-1.2-.5-1.8-.9-.4-.2-.3-.7.1-.8 1.5-.5 2.6-1.9 2.4-2.4-.5-.2-1.3-.5-1.7-.9-.4-.4.1-1.1.6-.9.4.2.9.4 1.4.1l.04-1.3C7.5 4 9.5 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    ),
  },
  {
    label: "TikTok",
    path: (
      <path d="M16.6 5.82a4.28 4.28 0 01-1.06-2.82h-3.1v12.5a2.5 2.5 0 11-2.5-2.5c.17 0 .34.02.5.05V9.9a5.6 5.6 0 00-.5-.02 5.6 5.6 0 105.6 5.6V8.9a7.3 7.3 0 004.2 1.34V7.14a4.28 4.28 0 01-3.14-1.32z" fill="currentColor" />
    ),
  },
];

function SocialIcon({ label, path }: { label: string; path: ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: `1px solid ${hover ? GOLD : "rgba(255,255,255,0.3)"}`,
        color: hover ? GOLD : TEXT_MID,
        backgroundColor: hover ? "rgba(255,255,255,0.08)" : "transparent",
        transition: "color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        {path}
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ item                                                          */
/* ------------------------------------------------------------------ */
function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.4rem 0.25rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: "1.3rem", color: TEXT_DARK }}>{q}</span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
            color: GOLD,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.35s ease",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "240px" : "0",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease",
          padding: open ? "0 0.25rem 1.4rem" : "0 0.25rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.7, color: TEXT_MID }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [waHover, setWaHover] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontSize: "0.62rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: TEXT_MID,
    marginBottom: "0.5rem",
  };

  const fieldStyle = (name: string): CSSProperties => ({
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? GOLD : "rgba(255,255,255,0.35)"}`,
    borderRadius: 0,
    padding: "0.7rem 0.25rem",
    color: TEXT_DARK,
    fontSize: "16px", // 16px min prevents iOS zoom on focus
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease",
  });

  return (
    <div style={{ backgroundColor: CREAM, color: TEXT_DARK }}>
      <ScrollAnimations />
      <Navbar />

      {/* ============ 1. HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "11rem 2rem 4rem" }}>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            width: "800px",
            maxWidth: "120vw",
            height: "600px",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
            Contact Us
          </span>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", fontWeight: 500, margin: "0.75rem 0 1rem" }}>
            Let&apos;s Talk{" "}
            <span className="text-accent">
              Fragrance
            </span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: TEXT_MID }}>We&apos;re one message away.</p>
        </Reveal>
      </section>

      {/* ============ 2. WHATSAPP ORDER ============ */}
      <section style={{ padding: "1rem 2rem 5rem" }}>
        <Reveal scale style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div
            className="glass"
            style={{
              textAlign: "center",
              padding: "3.5rem 2rem",
              borderRadius: 0,
              backgroundColor: "#141414",
              border: "1px solid #2A2A2A",
              borderLeft: "4px solid #6B1626",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                width: "76px",
                height: "76px",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: WA_GREEN,
                boxShadow: `0 0 30px rgba(37,211,102,0.5)`,
              }}
            >
              <WhatsAppIcon size={40} color="#fff" />
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 0.75rem" }}>
              Order Directly on WhatsApp
            </h2>
            <p style={{ maxWidth: "30rem", margin: "0 auto 2rem", fontSize: "1rem", lineHeight: 1.7, color: TEXT_MID }}>
              Browse our catalogue and send us your order — we&apos;ll confirm within minutes.
            </p>

            <a
              href={waLink("Hello Shaghaf! I would like to order a perfume.")}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setWaHover(true)}
              onMouseLeave={() => setWaHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "1rem 2.4rem",
                color: "#fff",
                backgroundColor: waHover ? "#1EBE5A" : WA_GREEN,
                border: "none",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: waHover ? "0 0 34px rgba(37,211,102,0.6)" : "0 8px 24px rgba(37,211,102,0.3)",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <WhatsAppIcon size={22} color="#fff" />
              Start Your Order
            </a>

            {/* quick-order chips */}
            <div className="wa-chips" style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", justifyContent: "center", marginTop: "2rem" }}>
              {QUICK_ORDERS.map((c) => (
                <a
                  key={c.label}
                  href={waLink(c.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-chip"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    padding: "0.55rem 1.1rem",
                    color: "#8B2236",
                    border: "1px solid rgba(139,34,54,0.45)",
                    borderRadius: 0,
                    textDecoration: "none",
                    backgroundColor: "rgba(139,34,54,0.06)",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 3. FORM + DETAILS ============ */}
      <section style={{ padding: "2rem 2rem 6rem" }}>
        <div
          className="contact-cols"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* form */}
          <Reveal x={-30} y={0}>
            <form onSubmit={handleSubmit} className="glass" style={{ padding: "2.5rem", borderRadius: "4px" }}>
              <h2 style={{ fontFamily: SERIF, fontSize: "1.9rem", fontWeight: 500, margin: "0 0 1.75rem" }}>
                Send a Message
              </h2>
              <div className="contact-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" style={fieldStyle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@example.com" style={fieldStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div className="contact-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+971 …" style={fieldStyle("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label htmlFor="subject" style={labelStyle}>Subject</label>
                  <select id="subject" name="subject" defaultValue={SUBJECTS[0]} style={{ ...fieldStyle("subject"), appearance: "none", cursor: "pointer" }} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} style={{ backgroundColor: "#141414" }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="Tell us how we can help…" style={{ ...fieldStyle("message"), resize: "vertical" }} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
              </div>
              <button
                type="submit"
                disabled={submitted}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  width: "100%",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "0.95rem",
                  color: WHITE,
                  backgroundColor: submitted ? "rgba(255,255,255,0.6)" : btnHover ? GOLD_LIGHT : GOLD,
                  border: "none",
                  borderRadius: "2px",
                  cursor: submitted ? "default" : "pointer",
                  boxShadow: btnHover && !submitted ? "0 0 28px rgba(255,255,255,0.5)" : "none",
                  transition: "background-color 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                {submitted ? "Thank You — We'll Be in Touch" : "Send Message"}
              </button>
            </form>
          </Reveal>

          {/* details */}
          <Reveal x={30} y={0} delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="glass" style={{ padding: "2rem", borderRadius: "4px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: "📍", label: "Location", value: "Dubai, United Arab Emirates" },
                  { icon: "📞", label: "Phone", value: "+971 50 140 5806" },
                  { icon: "✉️", label: "Email", value: "hello@shaghaf.com" },
                  { icon: "🕒", label: "Working Hours", value: "Sat–Thu 9am–9pm GST" },
                ].map((d) => (
                  <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "44px",
                        height: "44px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.3)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      {d.icon}
                    </span>
                    <div>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>{d.label}</div>
                      <div style={{ fontSize: "0.92rem", color: TEXT_DARK, marginTop: "0.15rem" }}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* map placeholder */}
              <div
                style={{
                  position: "relative",
                  minHeight: "180px",
                  borderRadius: "4px",
                  border: `1px solid ${GOLD}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  backgroundColor: "#141414",
                }}
              >
                <span style={{ fontSize: "2rem" }} aria-hidden="true">📍</span>
                <span style={{ fontFamily: SERIF, fontSize: "1.3rem", color: TEXT_DARK }}>Visit Our Showroom</span>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: TEXT_MID }}>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. FAQ ============ */}
      <section style={{ padding: "4rem 2rem 6rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>FAQ</span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, margin: "0.75rem 0 0" }}>
              Common Questions
            </h2>
            <div className="gold-line" style={{ maxWidth: "120px", margin: "1.5rem auto 0" }} />
          </Reveal>
          <Reveal>
            <div>
              {FAQS.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 5. SOCIAL BAR ============ */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: TEXT_MID, marginBottom: "1.5rem" }}>
            Follow the Journey
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {SOCIALS.map((s) => (
              <SocialIcon key={s.label} label={s.label} path={s.path} />
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        ::placeholder { color: #6B6B6B; }
        .wa-chip:hover { background-color: #6B1626 !important; color: #fff !important; }
        @media (max-width: 880px) {
          .contact-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .contact-row { grid-template-columns: 1fr !important; }
          /* quick-order chips stack full width */
          .wa-chips { flex-direction: column !important; }
          .wa-chips > a { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}
