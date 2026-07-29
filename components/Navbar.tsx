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

      {/* Call to Action & Social Links */}
      <div className="flex items-center gap-2.5">
        {/* GitHub Link */}
        <a
          href="https://github.com/Disha-Singh-Singraur"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          aria-label="GitHub Profile"
          className="bg-cyan-300 text-black border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>

        {/* LeetCode Link */}
        <a
          href="https://leetcode.com/u/Disha-Singh-Singraur"
          target="_blank"
          rel="noopener noreferrer"
          title="LeetCode Profile"
          aria-label="LeetCode Profile"
          className="bg-amber-300 text-black border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.135.695-1.808.695s-1.342-.245-1.808-.695L3.804 14.654c-.988-.955-.988-2.506 0-3.461l5.985-5.887c.466-.45 1.135-.695 1.808-.695s1.342.245 1.808.695l2.697 2.607c.48.464 1.25.464 1.73 0s.48-1.217 0-1.681l-2.697-2.607c-1.03-1.002-2.399-1.554-3.846-1.554s-2.816.552-3.846 1.554L1.454 9.512c-1.939 1.874-1.939 4.913 0 6.787l5.985 5.887c1.03 1.002 2.399 1.554 3.846 1.554s2.816-.552 3.846-1.554l2.697-2.607c.48-.464.48-1.217 0-1.681s-1.25-.464-1.726.012zM22.546 11.155l-7.39-7.142c-.48-.464-1.25-.464-1.73 0s-.48 1.217 0 1.681l7.39 7.142c.48.464 1.25.464 1.73 0s.48-1.217 0-1.681zM14.654 13.065h7.39c.678 0 1.228-.531 1.228-1.187s-.55-1.187-1.228-1.187h-7.39c-.678 0-1.228.531-1.228 1.187s.55 1.187 1.228 1.187z"/>
          </svg>
        </a>

        {/* Let's Talk CTA */}
        <Link
          href="#contact"
          className="bg-pink-300 text-black border-2 border-black font-black uppercase text-xs md:text-sm px-3 md:px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all inline-block"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </nav>
  );
}
