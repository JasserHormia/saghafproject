"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GOLD = "#8B2236";
const GOLD_LIGHT = "#8B2236";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#F5F5F5";
const TEXT_MID = "#9A9A9A";
const CREAM = "#0A0A0A";
const SERIF = '"Inter", sans-serif';

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
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useIsoLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Headline line-reveal
      gsap.from(".contact-line", {
        yPercent: 100,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
      });

      // Form card in, then fields cascade (explicit set+to so the hidden
      // start-state always holds — the trigger is the card itself).
      gsap.set(".contact-form", { opacity: 0, y: 60, scale: 0.97 });
      gsap.set(".contact-field", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } });
      tl.to(".contact-form", { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" })
        .to(".contact-field", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }, "-=0.4");

      // Contact detail icons scale-bounce in
      gsap.from(".contact-icon", {
        scale: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.12,
        scrollTrigger: { trigger: ".contact-details", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    borderBottom: `1px solid ${focused === name ? GOLD : "#2A2A2A"}`,
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
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        backgroundColor: "#0A0A0A",
      }}
    >

      <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto" }}>
        {/* heading */}
        <div className="contact-heading" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
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
            className="contact-headline"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 800,
              color: TEXT_DARK,
              margin: "0.75rem 0 0",
            }}
          >
            <span className="contact-line-mask">
              <span className="contact-line">Begin Your Journey</span>
            </span>
          </h2>
          <div
            className="gold-line"
            style={{ maxWidth: "120px", margin: "1.5rem auto 0" }}
          />
        </div>

        {/* glass form */}
        <form
          onSubmit={handleSubmit}
          className="glass reveal reveal-left contact-form"
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
            <div className="contact-field">
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
            <div className="contact-field">
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

          <div className="contact-field" style={{ marginBottom: "1.25rem" }}>
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

          <div className="contact-field" style={{ marginBottom: "1.75rem" }}>
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
            className="contact-field"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              width: "100%",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "1rem",
              color: submitted ? "#9A9A9A" : btnHover ? WHITE : "#0A0A0A",
              backgroundColor: submitted ? "#2A2A2A" : btnHover ? GOLD : WHITE,
              border: "none",
              borderRadius: 0,
              cursor: submitted ? "default" : "pointer",
              transition: "background-color 0.35s ease, color 0.35s ease",
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
                className="contact-icon"
                style={{
                  fontSize: "1.3rem",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: `1px solid rgba(255,255,255,0.3)`,
                  backgroundColor: "rgba(255,255,255,0.05)",
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
        ::placeholder { color: #6B6B6B; }
        .contact-line-mask { display: inline-block; overflow: hidden; padding-bottom: 0.08em; vertical-align: bottom; }
        .contact-line { display: inline-block; will-change: transform; }
        @media (max-width: 767px) {
          .contact-row { grid-template-columns: 1fr !important; }
          .contact-details { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-form { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
