"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if we are at the top (under 10px) or scrolling up
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else {
        // Scrolling up -> show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full bg-[#FFFDEE] border-b-4 border-black py-4 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Brand Logo & GitHub Profile Link */}
      <div className="flex items-center gap-3">
        <Link href="/" className="font-mono font-black text-2xl text-black uppercase tracking-tight flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          Disha
        </Link>
        <a
          href="https://github.com/Disha-Singh-Singraur"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          title="GitHub Profile"
          className="bg-pink-300 text-black border-2 border-black p-1.5 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link 
          href="#about" 
          className="font-mono font-bold text-black border-2 border-transparent px-3 py-1 hover:border-black hover:bg-cyan-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
        >
          About
        </Link>
        <Link 
          href="#skills" 
          className="font-mono font-bold text-black border-2 border-transparent px-3 py-1 hover:border-black hover:bg-yellow-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
        >
          Skills
        </Link>
        <Link 
          href="#projects" 
          className="font-mono font-bold text-black border-2 border-transparent px-3 py-1 hover:border-black hover:bg-emerald-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
        >
          Projects
        </Link>
        <Link 
          href="#coding-profiles" 
          className="font-mono font-bold text-black border-2 border-transparent px-3 py-1 hover:border-black hover:bg-amber-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
        >
          Coding
        </Link>
        <Link 
          href="#contact" 
          className="font-mono font-bold text-black border-2 border-transparent px-3 py-1 hover:border-black hover:bg-pink-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
        >
          Contact
        </Link>
      </div>

      {/* Call to Action Button */}
      <div>
        <Link
          href="#contact"
          className="bg-pink-300 text-black border-2 border-black font-black uppercase text-xs md:text-sm px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all inline-block"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </nav>
  );
}
