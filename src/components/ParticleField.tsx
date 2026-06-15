"use client";

import { useEffect, useRef } from "react";

const GOLD = { r: 184, g: 147, b: 42 }; // #B8932A
const MOUSE_RADIUS = 150;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

type Particle = {
  x: number;
  y: number;
  radius: number;
  drift: number; // horizontal sway speed
  speed: number; // upward speed
  phase: number; // for sway + twinkle offset
  maxAlpha: number;
  life: number; // 0 -> 1 across its lifetime
  lifeSpeed: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;

    const mouse = { x: -Infinity, y: -Infinity, active: false };

    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const createParticle = (spawnAnywhere: boolean): Particle => ({
      x: random(0, width),
      // spawn across the screen on first fill, otherwise just below the bottom edge
      y: spawnAnywhere ? random(0, height) : height + random(0, 40),
      radius: random(0.8, 2.6),
      drift: random(-0.25, 0.25),
      speed: random(0.15, 0.6),
      phase: random(0, Math.PI * 2),
      maxAlpha: random(0.12, 0.4), // subtle gold on cream
      life: spawnAnywhere ? Math.random() : 0,
      lifeSpeed: random(0.0015, 0.004),
    });

    const targetCount = () => {
      // scale density with viewport, capped for performance
      const count = Math.round((width * height) / 14000);
      return Math.min(180, Math.max(40, count));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const desired = targetCount();
      if (particles.length === 0) {
        particles = Array.from({ length: desired }, () => createParticle(true));
      } else if (particles.length < desired) {
        while (particles.length < desired) particles.push(createParticle(true));
      } else if (particles.length > desired) {
        particles.length = desired;
      }
    };

    const drawParticle = (p: Particle, alpha: number) => {
      const glow = p.radius * 4;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
      gradient.addColorStop(
        0,
        `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`,
      );
      gradient.addColorStop(
        0.4,
        `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * 0.35})`,
      );
      gradient.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
      ctx.fill();
    };

    const glowMargin = (p: Particle) => p.radius * 4;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (const p of particles) {
        // advance life; recycle when it completes
        p.life += p.lifeSpeed;
        if (p.life >= 1 || p.y < -glowMargin(p)) {
          Object.assign(p, createParticle(false));
          continue;
        }

        // drift upward with a gentle sway
        p.phase += 0.01;
        p.y -= p.speed;
        p.x += p.drift + Math.sin(p.phase) * 0.15;

        // mouse attraction within radius
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const pull = (1 - dist / MOUSE_RADIUS) * 1.4;
            p.x += (dx / dist) * pull;
            p.y += (dy / dist) * pull;
          }
        }

        // wrap horizontally
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        // fade in over first 15%, fade out over last 15%
        const fade =
          p.life < 0.15
            ? p.life / 0.15
            : p.life > 0.85
              ? (1 - p.life) / 0.15
              : 1;
        const twinkle = 0.75 + 0.25 * Math.sin(p.phase * 3);
        const alpha = p.maxAlpha * fade * twinkle;

        if (alpha > 0.01) drawParticle(p, alpha);
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    if (prefersReducedMotion) {
      // render a single static frame, no animation loop
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      for (const p of particles) drawParticle(p, p.maxAlpha * 0.6);
      ctx.globalCompositeOperation = "source-over";
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
