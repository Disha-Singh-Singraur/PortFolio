"use client";

import { useState, useEffect, useRef } from "react";

interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export default function CodingProfiles() {
  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    solvedProblem: 160,
    easySolved: 56,
    mediumSolved: 92,
    hardSolved: 12,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            setIsCardVisible(true);
          } else if (!entry.isIntersecting) {
            setIsCardVisible(false);
          }
        });
      },
      { threshold: [0, 0.7, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fetch live LeetCode stats with verified fallback
    async function fetchLeetCodeStats() {
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/Disha_Singh_Singraur/solved");
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.solvedProblem === "number" && data.solvedProblem > 0) {
            setLcStats({
              solvedProblem: data.solvedProblem,
              easySolved: data.easySolved || 56,
              mediumSolved: data.mediumSolved || 92,
              hardSolved: data.hardSolved || 12,
            });
          }
        }
      } catch (err) {
        console.warn("Using verified LeetCode stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeetCodeStats();
  }, []);

  // Circle Gauge Calculations
  const total = lcStats.solvedProblem || 160;
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~427.25

  const easyArc = (lcStats.easySolved / total) * circumference;
  const mediumArc = (lcStats.mediumSolved / total) * circumference;
  const hardArc = (lcStats.hardSolved / total) * circumference;

  return (
    <section
      id="coding-profiles"
      className="relative w-full bg-[#FFFBEF] border-t-4 border-black pt-24 pb-40 md:pb-52 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background SVG Roadmap Path Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M -100 200 C 300 100, 200 400, 600 300 C 1000 200, 1100 500, 1600 380 C 1800 320, 2000 480, 2200 420"
            fill="none"
            stroke="#111111"
            strokeWidth={2}
            strokeDasharray="12 8"
            opacity={0.2}
          />
          {/* Compass Star Accent */}
          <g transform="translate(1150, 120)" opacity={0.2} className="hidden md:block">
            <path d="M 0 -20 L 0 20 M -20 0 L 20 0" stroke="#111111" strokeWidth={2} />
            <circle cx={0} cy={0} r={4} fill="none" stroke="#111111" strokeWidth={2} />
          </g>
          {/* Soft pink color accent spots */}
          <circle cx={140} cy={220} r={6} className="fill-pink-400 opacity-40" />
          <circle cx={720} cy={380} r={7} className="fill-rose-400 opacity-40" />
          <circle cx={1280} cy={160} r={5} className="fill-pink-300 opacity-40" />
        </svg>

        {/* Floating sparkle stars — same style as Projects section */}
        {([
          { top: "8%",  left: "4%",  size: 22, color: "text-pink-400",    delay: "0s",   duration: "5.5s" },
          { top: "22%", left: "92%", size: 28, color: "text-yellow-400",  delay: "1.2s", duration: "7s"   },
          { top: "55%", left: "6%",  size: 18, color: "text-rose-400",    delay: "0.4s", duration: "6.2s" },
          { top: "78%", left: "90%", size: 26, color: "text-pink-300",    delay: "2.0s", duration: "8s"   },
          { top: "40%", left: "94%", size: 16, color: "text-fuchsia-400", delay: "1.0s", duration: "6.8s" },
          { top: "70%", left: "4%",  size: 20, color: "text-rose-300",    delay: "2.5s", duration: "5.8s" },
          { top: "12%", left: "20%", size: 14, color: "text-yellow-300",  delay: "0.2s", duration: "5.3s" },
          { top: "50%", left: "36%", size: 20, color: "text-pink-400",    delay: "2.3s", duration: "7.4s" },
          { top: "62%", left: "60%", size: 16, color: "text-fuchsia-300", delay: "0.8s", duration: "6.0s" },
          { top: "84%", left: "26%", size: 22, color: "text-rose-400",    delay: "3.0s", duration: "7.8s" },
          { top: "88%", left: "48%", size: 18, color: "text-pink-300",    delay: "0.6s", duration: "6.5s" },
          { top: "18%", left: "78%", size: 24, color: "text-yellow-400",  delay: "1.8s", duration: "6.8s" },
          { top: "76%", left: "72%", size: 16, color: "text-pink-400",    delay: "1.3s", duration: "5.2s" },
        ] as { top: string; left: string; size: number; color: string; delay: string; duration: string }[]).map((sp, idx) => (
          <div
            key={`coding-sparkle-${idx}`}
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
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2 Column Layout matching About Me Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Title & Subtitle */}
          <div className="space-y-6">
            <div className="inline-block bg-pink-400 text-black font-mono font-black text-xs md:text-sm px-3.5 py-1.5 border-2 border-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Problem Solving
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-black uppercase tracking-tight leading-none">
              LeetCode <br /> Profile
            </h2>
            
            <p className="font-mono text-lg text-gray-700 max-w-md leading-relaxed">
              Consistently solving Data Structures, Algorithms, and technical problem-solving challenges with clean, efficient code.
            </p>
          </div>

          {/* Right Column: Clean Pink LeetCode Card */}
          <div className="relative">
            
            {/* Pink Rotate Accent Tag */}
            <div className="absolute -top-4 -left-4 z-10 bg-pink-300 border-2 border-black text-black font-mono font-black uppercase text-xs px-3.5 py-1.5 rotate-[-3deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              @Disha_Singh_Singraur
            </div>

            {/* Main Card with Vibrant Pink Shadow & Shiny Sweep Effect */}
            <div
              ref={cardRef}
              className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#FF3B92] relative space-y-6 overflow-hidden group"
            >
              {/* Sharp Neo-Brutalist Glint Sweep Overlay */}
              <style>{`
                @keyframes cardShineTrigger {
                  0% {
                    left: -120%;
                    opacity: 0;
                  }
                  15% {
                    opacity: 1;
                  }
                  85% {
                    opacity: 1;
                  }
                  100% {
                    left: 180%;
                    opacity: 0;
                  }
                }
                .shine-on-reach {
                  animation: cardShineTrigger 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
                }
              `}</style>
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
                <div
                  className={`absolute -top-1/2 -bottom-1/2 w-28 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.98)_45%,rgba(255,255,255,0.98)_55%,transparent_100%)] skew-x-[-35deg] -left-[120%] opacity-0 ${
                    isCardVisible ? "shine-on-reach" : ""
                  }`}
                />
              </div>

              {/* Header Info */}
              <div className="border-b-2 border-black pb-4 relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Disha Singh Singraur
                </h3>
              </div>

              {/* LEETCODE CIRCULAR PROGRESS GAUGE */}
              <div className="bg-[#FFFDEE] border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-around gap-6">
                
                {/* SVG Circle Ring */}
                <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                    {/* Background Track */}
                    <circle cx="90" cy="90" r={radius} stroke="#FCE7F3" strokeWidth="16" fill="none" />
                    
                    {/* Easy Arc (Emerald Green) */}
                    <circle
                      cx="90"
                      cy="90"
                      r={radius}
                      stroke="#10B981"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${easyArc} ${circumference - easyArc}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />

                    {/* Medium Arc (Vibrant Pink / Rose) */}
                    <circle
                      cx="90"
                      cy="90"
                      r={radius}
                      stroke="#EC4899"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${mediumArc} ${circumference - mediumArc}`}
                      strokeDashoffset={`-${easyArc}`}
                      strokeLinecap="round"
                    />

                    {/* Hard Arc (Deep Magenta) */}
                    <circle
                      cx="90"
                      cy="90"
                      r={radius}
                      stroke="#BE185D"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${hardArc} ${circumference - hardArc}`}
                      strokeDashoffset={`-${easyArc + mediumArc}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Center Solved Number Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-black leading-none">
                      {loading ? "..." : lcStats.solvedProblem}
                    </span>
                    <span className="text-[11px] font-mono font-black text-pink-700 uppercase tracking-widest mt-1">
                      Solved
                    </span>
                  </div>
                </div>

                {/* Difficulty Breakdown List */}
                <div className="w-full sm:w-auto space-y-3 font-mono">
                  <div className="flex items-center justify-between sm:justify-start gap-4 bg-emerald-50 border-2 border-black px-3.5 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black" />
                      <span className="text-xs font-bold text-black uppercase">Easy</span>
                    </div>
                    <span className="text-sm font-black text-emerald-800">{lcStats.easySolved}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-4 bg-pink-50 border-2 border-black px-3.5 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-pink-500 border border-black" />
                      <span className="text-xs font-bold text-black uppercase">Medium</span>
                    </div>
                    <span className="text-sm font-black text-pink-800">{lcStats.mediumSolved}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-4 bg-rose-50 border-2 border-black px-3.5 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-700 border border-black" />
                      <span className="text-xs font-bold text-black uppercase">Hard</span>
                    </div>
                    <span className="text-sm font-black text-rose-900">{lcStats.hardSolved}</span>
                  </div>
                </div>

              </div>

              {/* Clean Direct Pink CTA Button */}
              <div className="pt-4 border-t-2 border-black">
                <a
                  href="https://leetcode.com/u/Disha_Singh_Singraur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-pink-400 text-black border-4 border-black py-3.5 px-4 font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all text-center block cursor-pointer"
                >
                  View LeetCode Profile
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
