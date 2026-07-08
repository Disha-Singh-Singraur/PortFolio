"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  el: HTMLDivElement | null;
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  life: number;
  colorClass: string;
}

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const coords = useRef({ x: -200, y: -200 });
  const poolSize = 24; // Pre-rendered star particles pool

  const isCoolModeRef = useRef(false);

  useEffect(() => {
    // Disable completely on small screens (mobile/tablets)
    if (window.innerWidth < 768) return;

    // Only enable on desktop devices with a mouse
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) return;

    // Add class for custom pink cursor
    document.body.classList.add("custom-cursor-pink");

    const particles = particlesRef.current;
    let nextParticleIndex = 0;

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      isCoolModeRef.current = customEvent.detail;
      
      // If turning cool mode ON: hide all active star particles immediately
      if (isCoolModeRef.current) {
        particles.forEach((p) => {
          p.active = false;
          if (p.el) {
            p.el.style.opacity = "0";
            p.el.style.transform = "translate(-100px, -100px)";
          }
        });
      } else {
        // If turning cool mode OFF: hide the lens immediately
        if (lensRef.current) {
          lensRef.current.style.opacity = "0";
          lensRef.current.style.transform = "translate(-300px, -300px)";
        }
      }
    };

    window.addEventListener("toggle-cool-mode", handleToggle);

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;

      // Do NOT spawn stars if cool mode is active
      if (isCoolModeRef.current) return;

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn a star particle if the mouse moves more than 7px
      if (dist > 7) {
        lastMousePos.current = { x: e.clientX, y: e.clientY };

        const p = particles[nextParticleIndex];
        if (p) {
          p.active = true;
          p.x = e.clientX;
          p.y = e.clientY;
          
          // Random drift velocity: spreads outward and floats slightly upward
          p.vx = (Math.random() - 0.5) * 2.0;
          p.vy = (Math.random() - 0.5) * 2.0 - 0.5;
          
          p.scale = 0.5 + Math.random() * 0.7; // Random size factor
          p.life = 1.0; // Life starts at 100%
          
          if (p.el) {
            p.el.style.opacity = "1";
            p.el.style.transform = `translate(${p.x - 12}px, ${p.y - 12}px) scale(${p.scale}) rotate(0deg)`;
          }
        }

        nextParticleIndex = (nextParticleIndex + 1) % poolSize;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const updateParticles = () => {
      const x = coords.current.x;
      const y = coords.current.y;

      // Update Lens Position instantly if cool mode is active
      if (isCoolModeRef.current) {
        if (lensRef.current && x > -100) {
          lensRef.current.style.transform = `translate3d(${x - 110}px, ${y - 110}px, 0)`;
          lensRef.current.style.opacity = "1";
        }
      } else {
        // Otherwise, make sure the lens stays hidden
        if (lensRef.current) {
          lensRef.current.style.opacity = "0";
          lensRef.current.style.transform = "translate(-250px, -250px)";
        }
      }

      // If cool mode is active, we don't update particles
      if (!isCoolModeRef.current) {
        particles.forEach((p) => {
          if (!p.active || !p.el) return;

          // Decay life over time
          p.life -= 0.035; // Fades out in ~30 frames (0.5s)

          if (p.life <= 0) {
            p.active = false;
            p.el.style.opacity = "0";
            p.el.style.transform = "translate(-100px, -100px)";
            return;
          }

          // Apply drift velocity
          p.x += p.vx;
          p.y += p.vy;

          // Decelerate movement to make the drift feel smooth and floaty
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Compute current size scale and rotation degree
          const currentScale = p.scale * p.life;
          const rotateAngle = (1 - p.life) * 90; // Star spins as it disappears

          p.el.style.transform = `translate(${p.x - 12}px, ${p.y - 12}px) scale(${currentScale}) rotate(${rotateAngle}deg)`;
          p.el.style.opacity = `${p.life}`;
        });
      }

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      document.body.classList.remove("custom-cursor-pink");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("toggle-cool-mode", handleToggle);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const neobrutalistColors = [
    "fill-pink-300",
    "fill-cyan-300",
    "fill-yellow-300",
    "fill-emerald-300",
    "fill-rose-300",
    "fill-purple-300",
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Spyglass / Flashlight Dark Lens */}
      <div
        ref={lensRef}
        className="absolute left-0 top-0 rounded-full border-4 border-black shadow-[0_0_0_3px_#fb7185] pointer-events-none hidden md:block"
        style={{
          width: "220px",
          height: "220px",
          opacity: 0,
          willChange: "transform, opacity, backdrop-filter",
          transform: "translate3d(-250px, -250px, 0)",
          backfaceVisibility: "hidden",
          backdropFilter: "invert(1) hue-rotate(180deg) contrast(1.15) brightness(0.95)",
          WebkitBackdropFilter: "invert(1) hue-rotate(180deg) contrast(1.15) brightness(0.95)",
          zIndex: 1, // behind the trail elements
        }}
      />

      {/* Trail particles (stars) */}
      {Array.from({ length: poolSize }).map((_, idx) => {
        const colorClass = neobrutalistColors[idx % neobrutalistColors.length];

        return (
          <div
            key={idx}
            ref={(el) => {
              if (el) {
                particlesRef.current[idx] = {
                  el,
                  active: false,
                  x: 0,
                  y: 0,
                  vx: 0,
                  vy: 0,
                  scale: 1,
                  life: 0,
                  colorClass,
                };
              }
            }}
            className="absolute w-6 h-6 pointer-events-none"
            style={{
              opacity: 0,
              willChange: "transform, opacity",
              transform: "translate(-100px, -100px)",
              zIndex: 2, // on top of the lens
            }}
          >
            <svg viewBox="0 0 24 24" className={`w-full h-full ${colorClass}`} aria-hidden="true">
              <path
                d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"
                stroke="#111111"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
