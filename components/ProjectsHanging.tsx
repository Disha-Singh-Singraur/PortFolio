"use client";

import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const projectSparkles = [
  // Left side sparkles
  { top: "8%", left: "4%", size: 24, color: "text-pink-400", delay: "0s", duration: "5s" },
  { top: "12%", left: "14%", size: 18, color: "text-rose-400", delay: "0.8s", duration: "6.2s" },
  { top: "15%", left: "22%", size: 16, color: "text-pink-300", delay: "0.3s", duration: "5.5s" },
  { top: "38%", left: "7%", size: 20, color: "text-pink-400", delay: "0.4s", duration: "6.0s" },
  { top: "54%", left: "15%", size: 24, color: "text-pink-400", delay: "0.9s", duration: "5.4s" },
  { top: "58%", left: "8%", size: 20, color: "text-rose-400", delay: "0.5s", duration: "6s" },
  { top: "72%", left: "5%", size: 22, color: "text-pink-400", delay: "2.7s", duration: "5.8s" },
  { top: "85%", left: "28%", size: 24, color: "text-rose-400", delay: "3.1s", duration: "7.8s" },
  { top: "94%", left: "12%", size: 18, color: "text-rose-300", delay: "1.3s", duration: "5.7s" },

  // Center / Middle sparkles
  { top: "18%", left: "42%", size: 20, color: "text-rose-400", delay: "0.5s", duration: "5.6s" },
  { top: "24%", left: "58%", size: 26, color: "text-pink-300", delay: "2.1s", duration: "7.1s" },
  { top: "30%", left: "48%", size: 18, color: "text-fuchsia-400", delay: "1.0s", duration: "6.3s" },
  { top: "36%", left: "36%", size: 24, color: "text-pink-400", delay: "0.3s", duration: "5.9s" },
  { top: "42%", left: "64%", size: 20, color: "text-rose-300", delay: "1.7s", duration: "6.7s" },
  { top: "48%", left: "38%", size: 22, color: "text-pink-500", delay: "2.5s", duration: "7.2s" },
  { top: "52%", left: "52%", size: 28, color: "text-pink-400", delay: "0.2s", duration: "6.0s" },
  { top: "60%", left: "45%", size: 18, color: "text-rose-400", delay: "1.9s", duration: "5.8s" },
  { top: "65%", left: "62%", size: 18, color: "text-pink-300", delay: "1.0s", duration: "6.0s" },
  { top: "70%", left: "40%", size: 24, color: "text-fuchsia-300", delay: "2.8s", duration: "7.4s" },
  { top: "76%", left: "55%", size: 20, color: "text-pink-400", delay: "0.6s", duration: "6.2s" },
  { top: "82%", left: "46%", size: 22, color: "text-rose-300", delay: "1.4s", duration: "5.5s" },
  { top: "88%", left: "68%", size: 22, color: "text-pink-400", delay: "0.6s", duration: "6.4s" },
  { top: "90%", left: "50%", size: 20, color: "text-pink-500", delay: "0.7s", duration: "6.5s" },

  // Right side sparkles
  { top: "18%", left: "80%", size: 26, color: "text-pink-400", delay: "2.0s", duration: "6.8s" },
  { top: "25%", left: "90%", size: 22, color: "text-fuchsia-400", delay: "1.4s", duration: "5.8s" },
  { top: "32%", left: "93%", size: 30, color: "text-pink-300", delay: "1.5s", duration: "7.5s" },
  { top: "45%", left: "95%", size: 18, color: "text-rose-300", delay: "1.1s", duration: "6.8s" },
  { top: "75%", left: "85%", size: 20, color: "text-fuchsia-300", delay: "1.8s", duration: "6.6s" },
  { top: "78%", left: "75%", size: 18, color: "text-pink-400", delay: "1.4s", duration: "5.2s" },
  { top: "82%", left: "91%", size: 28, color: "text-pink-300", delay: "2.2s", duration: "8.2s" },
  { top: "96%", left: "84%", size: 24, color: "text-pink-400", delay: "2.1s", duration: "7.0s" },
];

/* ─────────────────────────────────────────────────────────────────
   Project type definition
───────────────────────────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  tagColors: string[];
  github: string;
  demo: string;
  cable: number;  // 0 = upper cable, 1 = lower cable
  idx: number;    // index position on its cable (0 to 3)
  threadLen: number;
  swayDuration: number;
  swayDelay: number;
}

/* ─────────────────────────────────────────────────────────────────
   8 projects total (4 on each cable, alternating)
───────────────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    id: 1,
    title: "LabMind",
    description: "A mobile app that guides students through lab experiments step by step, featuring interactive instructions.",
    image: "/images/labmind.jpg",
    tags: ["React Native", "TypeScript"],
    tagColors: ["bg-blue-200", "bg-sky-200"],
    github: "https://github.com/Disha-Singh-Singraur/labmind",
    demo: "#",
    cable: 0,
    idx: 0,
    threadLen: 95,
    swayDuration: 5.8,
    swayDelay: 0,
  },
  {
    id: 2,
    title: "Image Unsplash",
    description: "A responsive search app fetching high-resolution photos in real time utilizing the Unsplash API.",
    image: "/images/unsplash.png",
    tags: ["JavaScript", "Unsplash API"],
    tagColors: ["bg-amber-200", "bg-cyan-200"],
    github: "https://github.com/Disha-Singh-Singraur/image-search-unsplash",
    demo: "#",
    cable: 1,
    idx: 0,
    threadLen: 95,
    swayDuration: 6.4,
    swayDelay: 1.1,
  },
  {
    id: 3,
    title: "EcoCode",
    description: "An environment where AI agents optimize Python code through refactoring, scored by AST grading and carbon footprint estimation.",
    image: "/images/ecocode.png",
    tags: ["Python", "AI", "AST"],
    tagColors: ["bg-yellow-200", "bg-purple-200", "bg-green-200"],
    github: "https://github.com/Disha-Singh-Singraur/EcoCode",
    demo: "#",
    cable: 0,
    idx: 1,
    threadLen: 105,
    swayDuration: 5.2,
    swayDelay: 2.3,
  },
  {
    id: 4,
    title: "Netflix Landing",
    description: "A responsive Netflix-style landing page with a trending carousel, smooth hover animations, and accordions.",
    image: "/images/netflix.png",
    tags: ["HTML", "CSS", "JavaScript"],
    tagColors: ["bg-red-200", "bg-indigo-200", "bg-amber-200"],
    github: "https://github.com/Disha-Singh-Singraur/Netflix-landing-page",
    demo: "#",
    cable: 1,
    idx: 1,
    threadLen: 105,
    swayDuration: 7.0,
    swayDelay: 0.7,
  },
  {
    id: 5,
    title: "ShopEZ",
    description: "A full-stack eCommerce platform built using the MERN stack (MongoDB, Express, React, Node.js).",
    image: "/images/shopez.png",
    tags: ["React", "Node.js", "MERN"],
    tagColors: ["bg-blue-200", "bg-green-200", "bg-emerald-200"],
    github: "https://github.com/Disha-Singh-Singraur/ShopEZ-eCommerce-Platform-",
    demo: "#",
    cable: 0,
    idx: 2,
    threadLen: 90,
    swayDuration: 5.5,
    swayDelay: 1.5,
  },
  {
    id: 6,
    title: "Drag & Drop Boxes",
    description: "A clean interactive drag-and-drop interface that lets users shift elements between containers.",
    image: "/images/draganddrop.png",
    tags: ["HTML", "CSS", "JavaScript"],
    tagColors: ["bg-orange-200", "bg-pink-200", "bg-amber-200"],
    github: "https://github.com/Disha-Singh-Singraur/Drag-and-Drop-Boxes",
    demo: "#",
    cable: 1,
    idx: 2,
    threadLen: 90,
    swayDuration: 6.1,
    swayDelay: 1.9,
  },
  {
    id: 7,
    title: "React Todo App",
    description: "A clean, fast, and responsive task list web application built using React for seamless task tracking.",
    image: "/images/todolist.png",
    tags: ["React", "JavaScript"],
    tagColors: ["bg-blue-200", "bg-amber-200"],
    github: "https://github.com/Disha-Singh-Singraur/To-do-app",
    demo: "#",
    cable: 0,
    idx: 3,
    threadLen: 100,
    swayDuration: 5.9,
    swayDelay: 2.8,
  },
  {
    id: 8,
    title: "More to Come",
    description: "I am constantly designing and coding new projects. Follow my GitHub profile to stay updated with my latest full-stack repositories!",
    image: "/images/heart.png",
    tags: ["Next.js", "AI", "More"],
    tagColors: ["bg-cyan-200", "bg-purple-200", "bg-rose-200"],
    github: "https://github.com/disha-singh-singraur",
    demo: "https://github.com/disha-singh-singraur",
    cable: 1,
    idx: 3,
    threadLen: 100,
    swayDuration: 6.7,
    swayDelay: 0.3,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Quadratic Bezier Math
───────────────────────────────────────────────────────────────── */
type Pt = { x: number; y: number };
function qBez(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const m = 1 - t;
  return {
    x: m * m * p0.x + 2 * m * t * p1.x + t * t * p2.x,
    y: m * m * p0.y + 2 * m * t * p1.y + t * t * p2.y,
  };
}

const CARD_W = 230; // width of each card in px
const CARD_H = 265; // height when tags/buttons are removed

/* ─────────────────────────────────────────────────────────────────
   Project Card Component (Simplified to show only photo, name, desc)
───────────────────────────────────────────────────────────────── */
function PhotoCard({
  project: p,
  cardLeft,
  cardTop,
  onClick,
  setIsDraggingParent,
}: {
  project: Project;
  cardLeft: number;
  cardTop: number;
  onClick: () => void;
  setIsDraggingParent: (dragging: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isTransitioningRef = useRef(false);
  
  const dragStartMouseX = useRef(0);
  const dragStartMouseY = useRef(0);
  const dragStartOffsetX = useRef(0);
  const dragStartOffsetY = useRef(0);
  const animationRef = useRef<number | null>(null);


  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    
    // Ignore clicks on links or interactive elements inside the card
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    e.preventDefault();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isTransitioningRef.current = true;
    setIsDragging(true);
    setIsDraggingParent(true);

    dragStartMouseX.current = e.clientX;
    dragStartMouseY.current = e.clientY;
    dragStartOffsetX.current = offsetX;
    dragStartOffsetY.current = offsetY;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isTransitioningRef.current = true;
    setIsDragging(true);
    setIsDraggingParent(true);

    if (e.touches.length > 0) {
      const touch = e.touches[0];
      dragStartMouseX.current = touch.clientX;
      dragStartMouseY.current = touch.clientY;
      dragStartOffsetX.current = offsetX;
      dragStartOffsetY.current = offsetY;
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartMouseX.current;
    const deltaY = e.clientY - dragStartMouseY.current;
    const newOffsetX = dragStartOffsetX.current + deltaX;
    const newOffsetY = dragStartOffsetY.current + deltaY;

    const dist = Math.sqrt(newOffsetX * newOffsetX + newOffsetY * newOffsetY);
    const MAX_DRAG = 480; // maximum allowed drag radius in pixels
    let clampedOffsetX = newOffsetX;
    let clampedOffsetY = newOffsetY;
    
    if (dist > MAX_DRAG) {
      clampedOffsetX = (newOffsetX / dist) * MAX_DRAG;
      clampedOffsetY = (newOffsetY / dist) * MAX_DRAG;
    }

    setOffsetX(clampedOffsetX);
    setOffsetY(clampedOffsetY);

    // Calculate rotation angle matching the stretched thread line relative to vertical
    const angle = Math.atan2(clampedOffsetX, p.threadLen + clampedOffsetY) * (180 / Math.PI);
    setRotation(angle);
  }, [isDragging, p.threadLen]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    
    // Prevent screen scroll while dragging the projects card
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartMouseX.current;
    const deltaY = touch.clientY - dragStartMouseY.current;
    const newOffsetX = dragStartOffsetX.current + deltaX;
    const newOffsetY = dragStartOffsetY.current + deltaY;

    const dist = Math.sqrt(newOffsetX * newOffsetX + newOffsetY * newOffsetY);
    const MAX_DRAG = 480; // maximum allowed drag radius in pixels
    let clampedOffsetX = newOffsetX;
    let clampedOffsetY = newOffsetY;
    
    if (dist > MAX_DRAG) {
      clampedOffsetX = (newOffsetX / dist) * MAX_DRAG;
      clampedOffsetY = (newOffsetY / dist) * MAX_DRAG;
    }

    setOffsetX(clampedOffsetX);
    setOffsetY(clampedOffsetY);

    const angle = Math.atan2(clampedOffsetX, p.threadLen + clampedOffsetY) * (180 / Math.PI);
    setRotation(angle);
  }, [isDragging, p.threadLen]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    let currentOffsetX = offsetX;
    let currentOffsetY = offsetY;
    let velX = 0;
    let velY = 0;
    const stiffness = 0.08; // spring coefficient for elastic bounce
    const damping = 0.88;   // friction/decay damping factor

    const step = () => {
      const forceX = -stiffness * currentOffsetX;
      const forceY = -stiffness * currentOffsetY;

      velX = (velX + forceX) * damping;
      velY = (velY + forceY) * damping;

      currentOffsetX += velX;
      currentOffsetY += velY;

      setOffsetX(currentOffsetX);
      setOffsetY(currentOffsetY);

      // Rotation aligns with the thread direction
      const angle = Math.atan2(currentOffsetX, p.threadLen + currentOffsetY) * (180 / Math.PI);
      setRotation(angle);

      // Check if both dimensions have settled
      if (
        Math.abs(currentOffsetX) > 0.05 ||
        Math.abs(currentOffsetY) > 0.05 ||
        Math.abs(velX) > 0.005 ||
        Math.abs(velY) > 0.005
      ) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setOffsetX(0);
        setOffsetY(0);
        setRotation(0);
        isTransitioningRef.current = false;
        setIsDraggingParent(false);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [isDragging, offsetX, offsetY, p.threadLen]);

  // Global mouse & touch listeners during active drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  const showSwayAnimation = !isDragging && !isTransitioningRef.current;

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`hanging-card-${p.id} hanging-card absolute select-none group ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        left: cardLeft + offsetX,
        top: cardTop + offsetY,
        width: CARD_W,
        animation: showSwayAnimation 
          ? `sway-${p.id} ${p.swayDuration}s ease-in-out ${p.swayDelay}s infinite`
          : "none",
        transformOrigin: "50% 0px",
        willChange: "transform",
        zIndex: isDragging ? 50 : 20,
      }}
    >
      {/* Thread line (string) SVG local to the card, stretching dynamically to anchor point */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width={CARD_W}
        height={p.threadLen + Math.max(0, offsetY)}
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <line
          x1={CARD_W / 2 - offsetX}
          y1={-offsetY}
          x2={CARD_W / 2}
          y2={p.threadLen}
          stroke="#111111"
          strokeWidth={1.75}
          strokeLinecap="round"
        />
      </svg>

      {/* Card container rotated around the clothes-pin attach point */}
      <div
        className="relative w-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${CARD_W / 2}px ${p.threadLen}px`,
          willChange: "transform",
        }}
      >
        <article
          className="
            relative
            bg-white border-4 border-black p-4
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
            group-hover:-translate-y-[4px] group-hover:scale-[1.03]
            transition-[box-shadow,transform] duration-300 ease-out
            focus-within:ring-2 focus-within:ring-black
            select-none
          "
          style={{ marginTop: `${p.threadLen}px` }}
        >
          {/* Wooden Photo Clip / Clothes-pin details */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-6 bg-[#D8B48F] border-[2.5px] border-black rounded-[2px] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] z-30"
            style={{ top: "-14px" }}
          />
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-1 bg-[#A8A29E] border-y-[1px] border-black z-30"
            style={{ top: "-6px" }}
          />

          {/* Photo Container with black border and offset spacing */}
          <div className="relative w-full border-4 border-black mb-3 overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
            <Image
              src={p.image}
              alt={`Screenshot of ${p.title}`}
              fill
              className="object-cover pointer-events-none"
              sizes="230px"
              draggable={false}
            />
          </div>

          {/* Polaroid frame bottom info area (Name & Desc & Arrow button) */}
          <div className="bg-white flex items-end justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-black text-black uppercase text-sm tracking-tight leading-none mb-1.5">
                {p.title}
              </h3>
              <p className="font-mono text-[9px] text-gray-600 leading-relaxed line-clamp-2">
                {p.description}
              </p>
            </div>
            {/* Neobrutalist Arrow Button to open */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="bg-amber-100 text-black border-2 border-black w-8 h-8 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all flex-shrink-0 cursor-pointer text-sm"
              aria-label="Open project details"
            >
              ➔
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────── */
export default function ProjectsHanging() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(1200); // Dynamic viewport width
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [someCardIsDragging, setSomeCardIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const w = entries[0]?.contentRect.width;
    if (w) setW(w);
  }, []);

  useEffect(() => {
    if (!scrollWrapperRef.current) return;
    const ro = new ResizeObserver(handleResize);
    ro.observe(scrollWrapperRef.current);
    const initialWidth = scrollWrapperRef.current.getBoundingClientRect().width || 1200;
    setW(initialWidth);
    return () => ro.disconnect();
  }, [handleResize]);

  const isMobile = W < 768;
  const isTablet = W >= 768 && W < 1024;
  const isDesktop = W >= 1024;

  const verticalStep = isMobile ? 450 : isTablet ? 320 : 0;

  // Dynamic horizontal sagging cables for each project card with alternating tilts
  const cables = useMemo(() => {
    if (isDesktop) {
      // Desktop: 2 main cables + 2 background fainted cables
      return {
        mains: [
          { p0: { x: 0, y: 90 },  p1: { x: W * 0.50, y: 120 }, p2: { x: W, y: 20 } },
          { p0: { x: 0, y: 450 }, p1: { x: W * 0.50, y: 650 }, p2: { x: W, y: 680 } },
        ],
        bgs: [
          { p0: { x: 0, y: 30 },  p1: { x: W * 0.50, y: 220 }, p2: { x: W, y: 300 } },
          { p0: { x: 0, y: 620 }, p1: { x: W * 0.50, y: 550 }, p2: { x: W, y: 410 } },
        ]
      };
    } else if (isTablet) {
      // Tablet: 4 cables vertically, each holding 2 projects
      const mains = [];
      const bgs = [];
      for (let j = 0; j < 4; j++) {
        const baseY = j * 450 + 80;
        const isEven = j % 2 === 0;
        mains.push({
          p0: { x: 0,        y: isEven ? baseY - 20 : baseY + 45 },
          p1: { x: W * 0.50, y: baseY + 75 },
          p2: { x: W,        y: isEven ? baseY + 45 : baseY - 20 },
        });
        bgs.push({
          p0: { x: 0,        y: isEven ? baseY + 35 : baseY - 15 },
          p1: { x: W * 0.50, y: baseY + 85 },
          p2: { x: W,        y: isEven ? baseY - 15 : baseY + 35 },
        });
      }
      return { mains, bgs };
    } else {
      // Mobile: 8 cables vertically, each holding 1 project card
      const mains = [];
      const bgs = [];
      for (let j = 0; j < 8; j++) {
        const baseY = j * 450 + 80;
        const isEven = j % 2 === 0;
        mains.push({
          p0: { x: 0,        y: isEven ? baseY - 30 : baseY + 50 },
          p1: { x: W * 0.50, y: baseY + 80 },
          p2: { x: W,        y: isEven ? baseY + 50 : baseY - 30 },
        });
        bgs.push({
          p0: { x: 0,        y: isEven ? baseY + 40 : baseY - 20 },
          p1: { x: W * 0.50, y: baseY + 90 },
          p2: { x: W,        y: isEven ? baseY - 20 : baseY + 40 },
        });
      }
      return { mains, bgs };
    }
  }, [W, isDesktop, isTablet]);

  // Intermediate fainted background strings between each project level (Mobile only)
  const intermediateCables = useMemo(() => {
    if (!isMobile) return [];
    const list = [];
    for (let i = 0; i < projects.length - 1; i++) {
      const midY = i * 450 + 80 + 450 / 2;
      const isEven = i % 2 === 0;
      list.push({
        p0: { x: 0,        y: isEven ? midY - 100 : midY + 110 },
        p1: { x: W * 0.50, y: midY + 120 },
        p2: { x: W,        y: isEven ? midY + 110 : midY - 100 },
      });
    }
    return list;
  }, [W, isMobile]);

  // Center exactly 1 project card per cable string (at t = 0.5)
  const layoutData = useMemo(() => {
    return projects.map((p, i) => {
      let cableIdx = 0;
      let cardLeft = 0;
      let t = 0.5;

      if (isDesktop) {
        cableIdx = i < 4 ? 0 : 1;
        const idxInCable = i % 4;
        const gap = Math.max(12, (W - 4 * CARD_W) / 5);
        cardLeft = (idxInCable + 1) * gap + idxInCable * CARD_W;
        t = (cardLeft + CARD_W / 2) / W;
      } else if (isTablet) {
        cableIdx = Math.floor(i / 2);
        const idxInCable = i % 2;
        const gap = Math.max(12, (W - 2 * CARD_W) / 3);
        cardLeft = (idxInCable + 1) * gap + idxInCable * CARD_W;
        t = (cardLeft + CARD_W / 2) / W;
      } else {
        cableIdx = i;
        cardLeft = W * 0.5 - CARD_W / 2;
        t = 0.5;
      }

      const c = cables.mains[cableIdx];
      const anchor = qBez(c.p0, c.p1, c.p2, t);

      return {
        project: p,
        cardLeft,
        cardTop: anchor.y,
        anchorX: anchor.x,
        anchorY: anchor.y,
        cardCenterX: cardLeft + CARD_W / 2,
        cableIndex: cableIdx,
      };
    });
  }, [W, cables, isDesktop, isTablet]);

  // Accent items hanging on alternate cables
  const decorativeItems = useMemo(() => {
    const items = isDesktop 
      ? [
          { id: "dec-1", cableIdx: 0, t: 0.08, threadLen: 50, label: "✦", bg: "bg-yellow-300", size: 36 },
          { id: "dec-2", cableIdx: 0, t: 0.92, threadLen: 65, label: "✿", bg: "bg-pink-300", size: 36 },
          { id: "dec-3", cableIdx: 1, t: 0.06, threadLen: 60, label: "★", bg: "bg-cyan-300", size: 36 },
          { id: "dec-4", cableIdx: 1, t: 0.94, threadLen: 55, label: "❤", bg: "bg-purple-300", size: 36 },
        ]
      : isTablet
        ? [
            { id: "dec-1", cableIdx: 0, t: 0.15, threadLen: 50, label: "✦", bg: "bg-yellow-300", size: 36 },
            { id: "dec-2", cableIdx: 1, t: 0.85, threadLen: 65, label: "✿", bg: "bg-pink-300", size: 36 },
            { id: "dec-3", cableIdx: 2, t: 0.12, threadLen: 60, label: "★", bg: "bg-cyan-300", size: 36 },
            { id: "dec-4", cableIdx: 3, t: 0.88, threadLen: 55, label: "❤", bg: "bg-purple-300", size: 36 },
          ]
        : [
            { id: "dec-1", cableIdx: 0, t: 0.15, threadLen: 50, label: "✦", bg: "bg-yellow-300", size: 36 },
            { id: "dec-2", cableIdx: 2, t: 0.85, threadLen: 65, label: "✿", bg: "bg-pink-300", size: 36 },
            { id: "dec-3", cableIdx: 4, t: 0.12, threadLen: 60, label: "★", bg: "bg-cyan-300", size: 36 },
            { id: "dec-4", cableIdx: 6, t: 0.88, threadLen: 55, label: "❤", bg: "bg-purple-300", size: 36 },
          ];

    return items.map((item) => {
      const c = cables.mains[item.cableIdx];
      const anchor = qBez(c.p0, c.p1, c.p2, item.t);
      const cardLeft = anchor.x - item.size / 2;
      return {
        ...item,
        cardLeft,
        cardTop: anchor.y,
        anchorX: anchor.x,
        anchorY: anchor.y,
      };
    });
  }, [W, cables, isDesktop, isTablet]);

  // Determine section height dynamically - tightened to reduce vertical gap below projects
  const canvasH = Math.max(
    ...layoutData.map((d) => d.cardTop + d.project.threadLen + 275),
    700
  ) + 10;

  return (
    <section
      id="projects"
      className={`relative w-full bg-transparent border-t-4 border-black overflow-x-clip ${activeProject || someCardIsDragging ? "z-30" : "z-10"}`}
      style={{ marginTop: "-384px" }}
      aria-label="Projects"
    >
      {/* Cute Sparkles in the background */}
      {projectSparkles.map((sp, idx) => (
        <div
          key={`project-sparkle-${idx}`}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            top: sp.top,
            left: sp.left,
            width: sp.size,
            height: sp.size,
            zIndex: 5,
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
      {/* Header */}
      <div className="pt-16 pb-8 text-center px-6">
        <span className="inline-block bg-yellow-300 text-black font-mono font-black text-xs md:text-sm px-3.5 py-1.5 border-2 border-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
          My Portfolio
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tight leading-none">
          Projects
        </h2>
        <p className="font-mono text-xs text-gray-500 mt-2 tracking-wide">✦ try dragging a project ✦</p>
      </div>

      {/* Hanging Gallery canvas container - flows vertically naturally with no horizontal scroll needed */}
      <div ref={scrollWrapperRef} className="w-full relative py-4 select-none overflow-x-clip">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            height: `${canvasH}px`,
          }}
        >
          {/* Cables SVG */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={W}
            height={canvasH}
            style={{ overflow: "hidden" }}
            aria-hidden="true"
          >
            {/* Intermediate Background Wires (only visible on mobile) */}
            {intermediateCables.map((c, i) => {
              const pathBg = `M ${c.p0.x},${c.p0.y} Q ${c.p1.x},${c.p1.y} ${c.p2.x},${c.p2.y}`;
              return (
                <g key={`mid-cable-${i}`}>
                  <path d={pathBg} fill="none" stroke="#111111" strokeWidth={2.5} opacity={0.2} strokeLinecap="round" />
                  <circle cx={c.p0.x} cy={c.p0.y} r={3} fill="#111111" opacity={0.25} />
                  <circle cx={c.p2.x} cy={c.p2.y} r={3} fill="#111111" opacity={0.25} />
                </g>
              );
            })}

            {/* Background Wires (Fainted) */}
            {cables.bgs.map((c, i) => {
              const pathBg = `M ${c.p0.x},${c.p0.y} Q ${c.p1.x},${c.p1.y} ${c.p2.x},${c.p2.y}`;
              return (
                <g key={`bg-cable-grp-${i}`}>
                  <path d={pathBg} fill="none" stroke="#111111" strokeWidth={2.5} opacity={0.2} strokeLinecap="round" />
                  <circle cx={c.p0.x} cy={c.p0.y} r={3.5} fill="#111111" opacity={0.25} />
                  <circle cx={c.p2.x} cy={c.p2.y} r={3.5} fill="#111111" opacity={0.25} />
                </g>
              );
            })}

            {/* Main Cables */}
            {cables.mains.map((c, i) => {
              const pathMain = `M ${c.p0.x},${c.p0.y} Q ${c.p1.x},${c.p1.y} ${c.p2.x},${c.p2.y}`;

              return (
                <g key={`main-cable-grp-${i}`}>
                  <path d={pathMain} fill="none" stroke="#111111" strokeWidth={4.5} strokeLinecap="round" />
                  <circle cx={c.p0.x} cy={c.p0.y} r={5} fill="#111111" />
                  <circle cx={c.p2.x} cy={c.p2.y} r={5} fill="#111111" />
                </g>
              );
            })}

            {/* Hangers / Hook Dots on Cable */}
            {layoutData.map((d, i) => (
              <circle key={`hang-${i}`} cx={d.anchorX} cy={d.anchorY} r={4.5} fill="#111111" />
            ))}

            {/* Hangers for decorations */}
            {decorativeItems.map((d) => (
              <circle key={`hang-${d.id}`} cx={d.anchorX} cy={d.anchorY} r={3.5} fill="#111111" />
            ))}
          </svg>

          {/* Hanging Decorations */}
          {decorativeItems.map((d, i) => {
            const swayDurations = [5.8, 6.4, 5.2, 7.0];
            const swayDelays = [0, 1.1, 2.3, 0.7];
            const swayIdx = (i % 4) + 1; // sway-1 to sway-4
            
            return (
              <div
                key={d.id}
                className="absolute pointer-events-none"
                style={{
                  left: d.cardLeft,
                  top: d.cardTop,
                  width: d.size,
                  transformOrigin: "50% 0px",
                  animation: `sway-${swayIdx} ${swayDurations[i % 4]}s ease-in-out ${swayDelays[i % 4]}s infinite`,
                  willChange: "transform",
                  zIndex: 15,
                }}
              >
              {/* String */}
              <svg
                className="absolute top-0 left-0"
                width={d.size}
                height={d.threadLen}
                style={{ overflow: "visible" }}
              >
                <line
                  x1={d.size / 2}
                  y1={0}
                  x2={d.size / 2}
                  y2={d.threadLen}
                  stroke="#111111"
                  strokeWidth={1.5}
                />
              </svg>

              {/* Clip & Badge container */}
              <div style={{ marginTop: `${d.threadLen}px` }} className="relative">
                {/* Tiny wooden clip */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-2.5 h-4.5 bg-[#D8B48F] border-[1.5px] border-black rounded-[1px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] z-30"
                  style={{ top: "-9px" }}
                />
                
                {/* Small Neobrutalist Badge */}
                <div className={`w-[36px] h-[36px] ${d.bg} border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-mono font-black text-lg text-black select-none rotate-[-3deg]`}>
                  {d.label}
                </div>
              </div>
            </div>
          );
        })}

          {/* Hanging Cards */}
          {layoutData.map((d) => (
            <PhotoCard
              key={d.project.id}
              project={d.project}
              cardLeft={d.cardLeft}
              cardTop={d.cardTop}
              onClick={() => setActiveProject(d.project)}
              setIsDraggingParent={setSomeCardIsDragging}
            />
          ))}
        </div>
      </div>

      {/* Details Popup Modal */}
      {mounted && activeProject && createPortal(
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white border-4 border-black p-6 md:p-8 max-w-xl w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative"
            style={{ borderRadius: "2px" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute -top-3 -right-3 bg-red-400 border-3 border-black text-black font-black w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all text-sm rounded-sm"
              aria-label="Close details"
            >
              X
            </button>

            {/* Project Image Frame */}
            <div className="relative w-full border-4 border-black mb-4 overflow-hidden bg-gray-100 aspect-video">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Title */}
            <h3 id="modal-title" className="font-black text-black uppercase text-2xl tracking-tight leading-none mb-2">
              {activeProject.title}
            </h3>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`${activeProject.tagColors[idx]} text-black border-2 border-black px-2.5 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Project Description */}
            <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed mb-6 border-t-2 border-dashed border-black pt-4">
              {activeProject.description}
            </p>

            {/* External Links */}
            <div className="flex gap-4">
              {/* GitHub Repository button */}
              {activeProject.id !== 8 ? (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-black text-white border-3 border-black font-black uppercase text-xs md:text-sm py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  GitHub Repository
                </a>
              ) : (
                <button
                  disabled
                  className="flex-1 text-center bg-gray-200 text-gray-400 border-3 border-gray-400 font-black uppercase text-xs md:text-sm py-2.5 cursor-not-allowed select-none opacity-60"
                >
                  GitHub Repository
                </button>
              )}

              {/* Live Demo button - always disabled for all projects */}
              <button
                disabled
                className="flex-1 text-center bg-gray-200 text-gray-400 border-3 border-gray-400 font-black uppercase text-xs md:text-sm py-2.5 cursor-not-allowed select-none opacity-60"
              >
                Live Demo
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="pb-24" />
    </section>
  );
}
