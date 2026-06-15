"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

const GOLD = "#B8932A";
const GOLD_LIGHT = "#D4A843";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#2C1F0A";
const TEXT_MID = "#6B5A3E";
const CREAM = "#FAF6F0";
const SERIF = '"Cormorant Garamond", Georgia, serif';

const INQUIRY_TYPES = [
  "General Inquiry",
  "Wholesale & Distribution",
  "Custom Fragrance",
  "Press & Media",
] as const;

const DETAILS = [
  { icon: "📍", label: "Location", value: "Dubai, United Arab Emirates" },
  { icon: "📞", label: "Phone", value: "+971 50 140 5806" },
  { icon: "✉️", label: "Email", value: "hello@shaghaf.com" },
];

export default function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

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
    borderBottom: `1px solid ${focused === name ? GOLD : "rgba(184,147,42,0.35)"}`,
    borderRadius: 0,
    padding: "0.7rem 0.25rem",
    color: TEXT_DARK,
    fontSize: "16px", // 16px min prevents iOS zoom on focus
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease",
  });

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        background: "linear-gradient(180deg, #FAF6F0 0%, #F0E8D8 100%)",
      }}
    >
      {/* gold dotted-grid overlay */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(184,147,42,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto" }}>
        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            className="reveal"
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Get in Touch
          </span>
          <h2
            className="reveal"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 500,
              color: TEXT_DARK,
              margin: "0.75rem 0 0",
              transitionDelay: "0.1s",
            }}
          >
            Begin Your Journey
          </h2>
          <div
            className="gold-line"
            style={{ maxWidth: "120px", margin: "1.5rem auto 0" }}
          />
        </div>

        {/* glass form */}
        <form
          onSubmit={handleSubmit}
          className="glass reveal reveal-left"
          style={{
            padding: "2.5rem",
            borderRadius: "4px",
            transitionDelay: "0.15s",
          }}
        >
          <div
            className="contact-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <label htmlFor="name" style={labelStyle}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                style={fieldStyle("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={fieldStyle("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="inquiry" style={labelStyle}>
              Inquiry Type
            </label>
            <select
              id="inquiry"
              name="inquiry"
              style={{ ...fieldStyle("inquiry"), appearance: "none", cursor: "pointer" }}
              onFocus={() => setFocused("inquiry")}
              onBlur={() => setFocused(null)}
              defaultValue={INQUIRY_TYPES[0]}
            >
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t} style={{ backgroundColor: CREAM }}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label htmlFor="message" style={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us how we can help…"
              style={{ ...fieldStyle("message"), resize: "vertical" }}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />
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
              backgroundColor: submitted
                ? "rgba(184,147,42,0.6)"
                : btnHover
                  ? GOLD_LIGHT
                  : GOLD,
              border: "none",
              borderRadius: "2px",
              cursor: submitted ? "default" : "pointer",
              boxShadow: btnHover && !submitted ? "0 0 28px rgba(184,147,42,0.5)" : "none",
              transition: "background-color 0.35s ease, box-shadow 0.35s ease",
            }}
          >
            {submitted ? "Thank You — We'll Be in Touch" : "Send Message"}
          </button>
        </form>

        {/* contact details */}
        <div
          className="contact-details"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          {DETAILS.map((d, i) => (
            <div
              key={d.label}
              className="reveal reveal-right"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "0.5rem",
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "1.3rem",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: `1px solid rgba(184,147,42,0.3)`,
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                {d.icon}
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginTop: "0.25rem",
                }}
              >
                {d.label}
              </span>
              <span style={{ fontSize: "0.9rem", color: TEXT_MID }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        ::placeholder { color: #9E8B6E; }
        @media (max-width: 767px) {
          .contact-row { grid-template-columns: 1fr !important; }
          .contact-details { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
