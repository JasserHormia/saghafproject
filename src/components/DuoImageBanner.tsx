"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const WHITE = "#F5F5F5";
const BLACK = "#0A0A0A";
const GRAY_LIGHT = "#9A9A9A";
const BURGUNDY = "#6B1626";

type Media = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

type TextPosition = "overlay-center" | "left-half" | "right-half";

interface DuoImageBannerProps {
  left: Media;
  right: Media;
  headline?: ReactNode;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  textPosition?: TextPosition;
  height?: string; // e.g. "80vh"
  grayscale?: boolean;
  centerSeam?: boolean;
  seamColor?: string;
  reverseOnMobile?: boolean;
  preload?: "auto" | "metadata" | "none";
}

function MediaLayer({
  media,
  grayscale,
  preload,
}: {
  media: Media;
  grayscale: boolean;
  preload: "auto" | "metadata" | "none";
}) {
  const filter = grayscale ? "grayscale(100%) contrast(1.1)" : undefined;
  if (media.type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={media.poster}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter }}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.alt ?? ""}
      fill
      sizes="50vw"
      style={{ objectFit: "cover", filter }}
    />
  );
}

export default function DuoImageBanner({
  left,
  right,
  headline,
  subtext,
  ctaText,
  ctaLink = "#",
  textPosition = "overlay-center",
  height = "80vh",
  grayscale = false,
  centerSeam = false,
  seamColor = "rgba(139,34,54,0.6)",
  reverseOnMobile = false,
  preload = "metadata",
}: DuoImageBannerProps) {
  const [hover, setHover] = useState(false);

  const justify =
    textPosition === "overlay-center"
      ? "center"
      : textPosition === "left-half"
        ? "flex-start"
        : "flex-end";
  const align = textPosition === "overlay-center" ? "center" : "flex-start";
  const textAlign = textPosition === "overlay-center" ? "center" : "left";
  const textMaxWidth = textPosition === "overlay-center" ? "760px" : "calc(50% - 4rem)";

  const hasText = Boolean(headline || subtext || ctaText);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height,
        minHeight: "440px",
        overflow: "hidden",
        backgroundColor: BLACK,
      }}
    >
      {/* two media columns */}
      <div
        className={`duo-grid${reverseOnMobile ? " duo-reverse" : ""}`}
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div className="duo-cell" style={{ position: "relative", overflow: "hidden" }}>
          <MediaLayer media={left} grayscale={grayscale} preload={preload} />
        </div>
        <div className="duo-cell" style={{ position: "relative", overflow: "hidden" }}>
          <MediaLayer media={right} grayscale={grayscale} preload={preload} />
        </div>
      </div>

      {/* center seam */}
      {centerSeam && (
        <span
          aria-hidden="true"
          className="duo-seam"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "1px",
            transform: "translateX(-50%)",
            backgroundColor: seamColor,
            zIndex: 1,
          }}
        />
      )}

      {/* legibility gradient */}
      {hasText && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 45%, rgba(10,10,10,0.85) 100%)",
          }}
        />
      )}

      {/* text overlay */}
      {hasText && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: textPosition === "overlay-center" ? "flex-end" : "center",
            alignItems: justify,
            padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(3rem, 9vh, 7rem)",
          }}
        >
          <div className="reveal" style={{ maxWidth: textMaxWidth, textAlign, alignItems: align }}>
            {headline && (
              <h2
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: WHITE,
                  margin: 0,
                }}
              >
                {headline}
              </h2>
            )}
            {subtext && (
              <p
                style={{
                  maxWidth: "30rem",
                  margin: textAlign === "center" ? "1.25rem auto 0" : "1.25rem 0 0",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: GRAY_LIGHT,
                }}
              >
                {subtext}
              </p>
            )}
            {ctaText && (
              <Link
                href={ctaLink}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={
                  {
                    display: "inline-block",
                    marginTop: "2rem",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "1rem 2.5rem",
                    borderRadius: 0,
                    textDecoration: "none",
                    color: hover ? WHITE : BLACK,
                    backgroundColor: hover ? BURGUNDY : WHITE,
                    transition: "background-color 0.35s ease, color 0.35s ease",
                  } as CSSProperties
                }
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .duo-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 1fr 1fr;
          }
          .duo-reverse .duo-cell:first-child { order: 2; }
          .duo-reverse .duo-cell:last-child { order: 1; }
          .duo-seam { display: none !important; }
        }
      `}</style>
    </section>
  );
}
