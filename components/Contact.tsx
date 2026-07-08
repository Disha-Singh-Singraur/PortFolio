"use client";

import React from "react";
import Image from "next/image";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#FFFBEF] border-t-4 border-black py-20 px-6 md:px-12 z-20 flex flex-col items-center"
      aria-label="Contact Me"
    >
      {/* Background container to prevent roadmap overflow while letting the girl's illustration overlap freely */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Treasure Roadmap SVG in the background */}
        <svg
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Curved Road Line wrapping under the card */}
          <path
            d="M -100 120 C 200 80, 150 320, 500 480 C 850 640, 950 280, 1400 450 C 1600 520, 1900 480, 2200 400"
            fill="none"
            stroke="#111111"
            strokeWidth={2}
            strokeDasharray="12 8"
            opacity={0.2}
          />
          <path
            d="M -100 400 C 250 490, 400 250, 800 360 C 1100 450, 1200 200, 1600 300 C 1800 350, 2000 450, 2200 420"
            fill="none"
            stroke="#111111"
            strokeWidth={2}
            strokeDasharray="12 8"
            opacity={0.2}
          />

          {/* Hand-drawn Compass Rose / Star in top-left */}
          <g transform="translate(180, 110)" opacity={0.2} className="hidden md:block">
            <path d="M 0 -24 L 0 24 M -24 0 L 24 0" stroke="#111111" strokeWidth={2} />
            <path d="M -12 -12 L 12 12 M -12 12 L 12 -12" stroke="#111111" strokeWidth={1.5} strokeDasharray="3 3" />
            <circle cx={0} cy={0} r={5} fill="none" stroke="#111111" strokeWidth={2} />
          </g>

          {/* Hand-drawn Star in bottom-right */}
          <g transform="translate(1120, 520)" opacity={0.2} className="hidden lg:block">
            <path d="M 0 -18 L 0 18 M -18 0 L 18 0" stroke="#111111" strokeWidth={2} />
            <circle cx={0} cy={0} r={4} fill="none" stroke="#111111" strokeWidth={2} />
          </g>

          {/* Soft color accent spots in the background */}
          <circle cx={250} cy={110} r={7.5} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={420} cy={340} r={3} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={850} cy={200} r={5} className="fill-yellow-400 opacity-35 hidden md:block" />
          <circle cx={980} cy={480} r={4} className="fill-cyan-400 opacity-35 hidden md:block" />
          
          {/* Additional Pink & Green Dots (Both Mobile and Desktop visible) */}
          <circle cx={120} cy={330} r={7} className="fill-rose-400 opacity-35" />
          <circle cx={280} cy={530} r={3} className="fill-emerald-400 opacity-35" />
          <circle cx={820} cy={380} r={5} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={700} cy={120} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={1050} cy={240} r={3} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={1180} cy={360} r={5} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={550} cy={180} r={4} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={950} cy={100} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />

          {/* Far-Right Pink & Green Dots (Desktop) */}
          <circle cx={1300} cy={530} r={4} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={1400} cy={200} r={4} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={1480} cy={150} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={1550} cy={420} r={3} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={1680} cy={120} r={5} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={1820} cy={480} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />
          <circle cx={1950} cy={280} r={3} className="fill-rose-400 opacity-35 hidden md:block" />
          <circle cx={2100} cy={180} r={5} className="fill-emerald-400 opacity-35 hidden md:block" />
        </svg>
      </div>

      <div className="w-full max-w-xl flex flex-col items-center relative z-10">
        
        {/* Top: Flipped girl illustration sitting on the projects section's bottom line */}
        <div className="relative z-10 w-full max-w-[420px] md:max-w-[500px] -mt-[150px] md:-mt-[210px] mb-0 pointer-events-none">
          <Image
            src="/images/bye.png"
            alt="Goodbye illustration"
            width={1000}
            height={800}
            className="pointer-events-none w-full h-auto object-contain scale-x-[-1]"
            priority
          />
        </div>

        {/* Bottom: Vertical Contact details card */}
        <div className="relative z-10 w-full bg-[#FFFDEE] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6 text-left -mt-12 md:-mt-16">
          
          <div className="space-y-3">
            <span className="inline-block text-xs font-mono font-black uppercase tracking-wider bg-emerald-300 text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Connect With Me
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-none">
              Contact Me
            </h2>
            <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed border-t-2 border-dashed border-black pt-4">
              Have a project in mind, want to collaborate, or just want to say hello? Shoot me a message on WhatsApp or send an email. I will get back to you as soon as possible!
            </p>
          </div>

          {/* Links Block (Vertical Stack) */}
          <div className="flex flex-col gap-4">
            {/* Gmail Button */}
            <a
              href="mailto:disha3004singh@gmail.com"
              className="bg-rose-300 text-black border-4 border-black px-6 py-4 font-black uppercase tracking-wider text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between gap-4 group cursor-pointer"
            >
              <span>Send an Email</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/917389519456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-300 text-black border-4 border-black px-6 py-4 font-black uppercase tracking-wider text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between gap-4 group cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
