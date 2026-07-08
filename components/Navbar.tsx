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
      {/* Brand Logo */}
      <Link href="/" className="font-mono font-black text-2xl text-black uppercase tracking-tight flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        Disha
      </Link>

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
