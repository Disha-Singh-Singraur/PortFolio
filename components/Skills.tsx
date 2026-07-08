"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const floatAnimations = [
  "gentleFloat1 5.2s ease-in-out infinite",
  "gentleFloat2 6.0s ease-in-out infinite",
  "gentleFloat3 4.8s ease-in-out infinite",
  "gentleFloat1 5.5s ease-in-out infinite",
  "gentleFloat2 4.5s ease-in-out infinite",
  "gentleFloat3 5.8s ease-in-out infinite",
];

const skills = [
  // --- Large featured orbs ---
  { name: "React",       finalTop: "2%",   finalLeft: "8%",   size: 145, bg: "bg-cyan-300",      delay: 400  },
  { name: "Next.js",     finalTop: "4%",   finalLeft: "60%",  size: 140, bg: "bg-gray-200",      delay: 550  },
  { name: "JavaScript",  finalTop: "0%",   finalLeft: "34%",  size: 135, bg: "bg-yellow-300",    delay: 700  },
  // --- Medium orbs ---
  { name: "Node.js",     finalTop: "20%",  finalLeft: "72%",  size: 115, bg: "bg-emerald-300",   delay: 850  },
  { name: "Python",      finalTop: "18%",  finalLeft: "2%",   size: 110, bg: "bg-blue-300",      delay: 1000 },
  { name: "MongoDB",     finalTop: "24%",  finalLeft: "42%",  size: 110, bg: "bg-green-400",     delay: 1150 },
  { name: "Express",     finalTop: "15%",  finalLeft: "22%",  size: 100, bg: "bg-stone-300",     delay: 1300 },
  // --- Smaller orbs ---
  { name: "HTML",        finalTop: "5%",   finalLeft: "82%",  size: 90,  bg: "bg-orange-300",    delay: 600  },
  { name: "CSS",         finalTop: "32%",  finalLeft: "12%",  size: 85,  bg: "bg-sky-300",       delay: 900  },
  { name: "Git",         finalTop: "30%",  finalLeft: "62%",  size: 80,  bg: "bg-red-300",       delay: 1100 },
  { name: "C++",         finalTop: "35%",  finalLeft: "82%",  size: 85,  bg: "bg-purple-300",    delay: 1400 },
  // --- Decorative accent orbs (no text, mixed colors) ---
  { name: "",            finalTop: "0%",   finalLeft: "52%",  size: 35,  bg: "bg-yellow-200",    delay: 500  },
  { name: "",            finalTop: "12%",  finalLeft: "50%",  size: 40,  bg: "bg-pink-300",      delay: 750  },
  { name: "",            finalTop: "38%",  finalLeft: "35%",  size: 45,  bg: "bg-cyan-200",      delay: 1050 },
  { name: "",            finalTop: "28%",  finalLeft: "28%",  size: 30,  bg: "bg-orange-200",    delay: 1200 },
  { name: "",            finalTop: "40%",  finalLeft: "52%",  size: 38,  bg: "bg-emerald-200",   delay: 1350 },
  { name: "",            finalTop: "3%",   finalLeft: "20%",  size: 28,  bg: "bg-purple-200",    delay: 800  },
  { name: "",            finalTop: "22%",  finalLeft: "88%",  size: 32,  bg: "bg-pink-200",      delay: 1250 },
];

const sparklesData = [
  { top: "8%",   left: "12%",  size: 24, color: "text-yellow-400", delay: "0s",   duration: "6s"   },
  { top: "25%",  left: "78%",  size: 32, color: "text-pink-400",   delay: "1.5s", duration: "7.5s" },
  { top: "45%",  left: "5%",   size: 18, color: "text-cyan-400",   delay: "0.5s", duration: "5s"   },
  { top: "58%",  left: "88%",  size: 28, color: "text-yellow-300", delay: "2.2s", duration: "8.2s" },
  { top: "12%",  left: "48%",  size: 20, color: "text-purple-400", delay: "1.1s", duration: "6.8s" },
  { top: "32%",  left: "68%",  size: 22, color: "text-pink-300",   delay: "2.7s", duration: "5.8s" },
  { top: "72%",  left: "18%",  size: 30, color: "text-yellow-400", delay: "0.3s", duration: "7.2s" },
  { top: "85%",  left: "52%",  size: 16, color: "text-cyan-300",   delay: "3.2s", duration: "4.8s" },
  { top: "5%",   left: "30%",  size: 26, color: "text-pink-400",   delay: "0.8s", duration: "6.5s" },
  { top: "52%",  left: "22%",  size: 20, color: "text-purple-300", delay: "1.9s", duration: "7s"   },
];

// The palm center as percentage of the container
const PALM_CENTER_TOP = "72%";
const PALM_CENTER_LEFT = "50%";

const getNeobrutalistClasses = (size: number) => {
  if (size > 120) {
    return "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]";
  }
  if (size >= 100) {
    return "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]";
  }
  if (size >= 50) {
    return "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]";
  }
  return "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]";
};

const getRotationClass = (index: number) => {
  const rotations = ["rotate-2", "-rotate-2", "rotate-1", "-rotate-1", "rotate-3", "-rotate-3"];
  return rotations[index % rotations.length];
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [animStep, setAnimStep] = useState(0); // 0: hidden, 1: hand high, 2: hand down & orbs emerge, 3: floating
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Choreograph the magic sequence steps
  useEffect(() => {
    let t0: NodeJS.Timeout;
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    if (isVisible) {
      // Step 1: Hand appears high up
      t0 = setTimeout(() => {
        setAnimStep(1);
      }, 0);

      // Step 2: Hand moves down to bottom after 1s
      t1 = setTimeout(() => {
        setAnimStep(2);
      }, 1000);

      // Step 3: All orbs settled, start floating after transitions finish (1s hand move + delays)
      const maxDelay = Math.max(...skills.map((s) => s.delay));
      t2 = setTimeout(() => {
        setAnimStep(3);
      }, 1000 + maxDelay + 1200);
    } else {
      // Reset instantly on scroll out
      t0 = setTimeout(() => {
        setAnimStep(0);
      }, 0);
    }

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible]);

  const settled = animStep >= 2;
  const orbsSettled = animStep === 3;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-transparent border-t-4 border-black pb-96 z-20"
    >
      {/* Background wrapper for Skills content (excluding bottom overlap padding) */}
      <div className="absolute inset-0 bg-[#FFFBEF] -z-10" style={{ height: "550px" }} />

      {/* Section Title */}
      <div className="pt-20 pb-16 text-center relative z-20">
        <span className="inline-block bg-pink-400 text-black font-mono font-black text-xs md:text-sm px-3 py-1.5 border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
          My Superpowers
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tight leading-none">
          Skills
        </h2>
      </div>

      {/* Canvas */}
      <div className="relative w-full max-w-7xl mx-auto" style={{ height: "90vh", minHeight: "750px" }}>

        {/* Cute Sparkles */}
        {sparklesData.map((sp, idx) => (
          <div
            key={`sparkle-${idx}`}
            className="absolute pointer-events-none animate-sparkle"
            style={{
              top: sp.top,
              left: sp.left,
              width: sp.size,
              height: sp.size,
              zIndex: 11,
              // @ts-ignore
              "--sparkle-delay": sp.delay,
              "--sparkle-duration": sp.duration,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full ${sp.color} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]`}>
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
          </div>
        ))}

        {/* The Big Hand — choreographically positioned and scaled */}
        <div
          className="absolute inset-0 -bottom-52 flex items-end justify-center pointer-events-none"
          style={{
            opacity: animStep > 0 ? 1 : 0,
            transform: animStep === 1
              ? "scale(1.1) translateY(-25%)"
              : animStep >= 2
                ? "scale(0.95) translateY(0)"
                : "scale(0) translateY(-25%)",
            transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease",
            zIndex: 20,
          }}
        >
          <Image
            src="/images/hand.png"
            alt="Magic hand casting skills"
            width={1500}
            height={1000}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* SVG Threads — curvy Bézier strings from palm to each orb */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ zIndex: 25 }}
        >
          {skills.map((skill, i) => {
            const palmX = parseFloat(PALM_CENTER_LEFT);
            const palmY = parseFloat(PALM_CENTER_TOP);

            const orbLeftNum = parseFloat(skill.finalLeft);
            const orbTopNum = parseFloat(skill.finalTop);
            const offsetX = (skill.size / 1280) * 100 / 2;
            const offsetY = (skill.size / 700) * 100 / 2;

            const endX = orbLeftNum + offsetX;
            const endY = orbTopNum + offsetY;

            // Direction vector
            const dx = endX - palmX;
            const dy = endY - palmY;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;

            // Perpendicular unit vector
            const perpX = -dy / len;
            const perpY = dx / len;

            // Alternate S-curve direction per orb
            const curviness = 5 + (i % 4) * 2.5;
            const sign = i % 2 === 0 ? 1 : -1;

            const cp1x = palmX + dx * 0.3 + perpX * curviness * sign;
            const cp1y = palmY + dy * 0.3 + perpY * curviness * sign;
            const cp2x = palmX + dx * 0.7 - perpX * curviness * sign;
            const cp2y = palmY + dy * 0.7 - perpY * curviness * sign;

            const d = settled
              ? `M ${palmX},${palmY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`
              : `M ${palmX},${palmY} C ${palmX},${palmY} ${palmX},${palmY} ${palmX},${palmY}`;

            return (
              <path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="#FF69B4"
                strokeWidth="0.15"
                opacity={settled ? 0.6 : 0}
                style={{
                  transition: settled
                    ? `d 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${skill.delay}ms, opacity 0.4s ease ${skill.delay}ms`
                    : "d 0.5s ease-in, opacity 0.3s ease-in",
                }}
              />
            );
          })}
        </svg>

        {/* Skill Cards — start at palm, transition to final positions */}
        {skills.map((skill, i) => {
          const rotationClass = getRotationClass(i);
          const shadowHoverClass = getNeobrutalistClasses(skill.size);
          const floatAnim = orbsSettled ? floatAnimations[i % floatAnimations.length] : "none";

          return (
            <div
              key={`skill-${i}`}
              className={`absolute flex items-center justify-center border-4 border-black font-black uppercase text-center select-none cursor-pointer transition-all duration-300 ${skill.bg} ${rotationClass} ${shadowHoverClass}`}
              style={{
                width: skill.size,
                height: skill.size,
                left: settled
                  ? skill.finalLeft
                  : `calc(${PALM_CENTER_LEFT} - ${skill.size / 2}px)`,
                top: settled
                  ? skill.finalTop
                  : `calc(${PALM_CENTER_TOP} - ${skill.size / 2}px)`,
                opacity: settled ? 1 : 0,
                transform: settled ? "scale(1)" : "scale(0)",
                transition: settled
                  ? `left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${skill.delay}ms, top 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${skill.delay}ms, opacity 0.8s ease ${skill.delay}ms, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${skill.delay}ms`
                  : "left 0.5s ease-in, top 0.5s ease-in, opacity 0.3s ease-in, transform 0.5s ease-in",
                animation: floatAnim,
                zIndex: 30,
              }}
            >
              {skill.name && (
                <span
                  style={{
                    fontSize: skill.size > 120 ? "1.1rem" : skill.size >= 100 ? "0.9rem" : "0.75rem",
                    lineHeight: "1.1",
                  }}
                  className="px-2"
                >
                  {skill.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
