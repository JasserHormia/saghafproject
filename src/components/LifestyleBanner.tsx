import Link from "next/link";

const WHITE = "#F5F5F5";
const BURGUNDY_LIGHT = "#8B2236";

export default function LifestyleBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        minHeight: "440px",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* Full-bleed video (full colour) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/perfume1.jpeg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/Perfumevideo1.mp4" type="video/mp4" />
      </video>

      {/* legibility gradient top/bottom */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      {/* centered overlay text */}
      <div
        className="reveal"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: WHITE,
            margin: 0,
          }}
        >
          Crafted for the <span style={{ color: BURGUNDY_LIGHT }}>Bold</span>
        </h2>
        <Link href="/products" className="lifestyle-link">
          Discover the House →
        </Link>
      </div>

      <style>{`
        .lifestyle-link {
          position: relative;
          display: inline-block;
          margin-top: 1.75rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${WHITE};
          text-decoration: none;
          padding-bottom: 5px;
        }
        .lifestyle-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: ${BURGUNDY_LIGHT};
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .lifestyle-link:hover { color: ${BURGUNDY_LIGHT}; }
        .lifestyle-link:hover::after { width: 100%; }
      `}</style>
    </section>
  );
}
