import Image from "next/image";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";
import ProjectsHanging from "../components/ProjectsHanging";
import Contact from "../components/Contact";
import CoolModeToggle from "../components/CoolModeToggle";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FFFBEF] flex flex-col w-full overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <main className="relative w-full flex justify-center pt-28 pb-12 px-6 md:px-12 overflow-hidden">
        {/* Background container to prevent roadmap overflow */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Hero Roadmap SVG in the background */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Curvy Path 1: Smooth Cubic Bezier */}
            <path
              d="M -100 220 C 200 180, 150 420, 500 580 C 850 740, 950 380, 1400 550 C 1600 620, 1900 580, 2200 500"
              fill="none"
              stroke="#111111"
              strokeWidth={2}
              strokeDasharray="12 8"
              opacity={0.2}
            />
            {/* Curvy Path 2: Smooth Cubic Bezier */}
            <path
              d="M -100 500 C 250 590, 400 350, 800 460 C 1100 550, 1200 300, 1600 400 C 1800 450, 2000 550, 2200 520"
              fill="none"
              stroke="#111111"
              strokeWidth={2}
              strokeDasharray="12 8"
              opacity={0.2}
            />

            {/* Hand-drawn Compass Rose / Star in top-right */}
            <g transform="translate(1300, 220)" opacity={0.2} className="hidden lg:block">
              <path d="M 0 -24 L 0 24 M -24 0 L 24 0" stroke="#111111" strokeWidth={2} />
              <path d="M -12 -12 L 12 12 M -12 12 L 12 -12" stroke="#111111" strokeWidth={1.5} strokeDasharray="3 3" />
              <circle cx={0} cy={0} r={5} fill="none" stroke="#111111" strokeWidth={2} />
            </g>

            {/* Hand-drawn Star in bottom-left */}
            <g transform="translate(100, 460)" opacity={0.2} className="hidden md:block">
              <path d="M 0 -18 L 0 18 M -18 0 L 18 0" stroke="#111111" strokeWidth={2} />
              <circle cx={0} cy={0} r={4} fill="none" stroke="#111111" strokeWidth={2} />
            </g>

            {/* Soft color accent spots in the background */}
            <circle cx={100} cy={260} r={7.5} className="fill-rose-400 opacity-35" />
            <circle cx={250} cy={520} r={4} className="fill-emerald-400 opacity-35" />
            <circle cx={150} cy={600} r={3} className="fill-rose-400 opacity-35" />
            
            <circle cx={650} cy={240} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />
            <circle cx={800} cy={550} r={5} className="fill-rose-400 opacity-35 hidden md:block" />
            
            <circle cx={1200} cy={320} r={4} className="fill-rose-400 opacity-35 hidden md:block" />
            <circle cx={1450} cy={480} r={3} className="fill-emerald-400 opacity-35 hidden md:block" />
            <circle cx={1650} cy={280} r={5} className="fill-rose-400 opacity-35 hidden md:block" />
            <circle cx={1850} cy={520} r={4} className="fill-emerald-400 opacity-35 hidden md:block" />
            <circle cx={2050} cy={360} r={5} className="fill-emerald-400 opacity-35 hidden md:block" />
          </svg>
        </div>

        <div className="relative w-full max-w-6xl z-10 flex flex-col md:block">
          {/* Text Card - stacked on mobile, absolutely layered on desktop */}
          <div className="relative md:absolute top-0 left-0 md:top-20 md:left-20 z-20 md:z-0 w-full md:max-w-xl p-6 md:p-8 bg-[#FFFDEE] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] order-1 md:order-none mb-6 md:mb-0">
            <span className="inline-block text-xs font-mono font-black uppercase tracking-wider bg-pink-300 text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              Hi, I&apos;m
            </span>

            <h1 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tight leading-none mb-3">
              Disha
            </h1>

            <h2 className="inline-block text-lg md:text-2xl font-black bg-cyan-300 text-black px-3 md:px-4 py-1 md:py-1.5 border-2 border-black uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Full Stack Developer
            </h2>

            <p className="mt-4 md:mt-6 text-sm md:text-lg font-mono text-black leading-relaxed border-t-2 border-black pt-4">
              I build modern web applications with MERN Stack, Next.js and AI-powered solutions.
            </p>

            <div className="mt-6 md:mt-8 flex gap-3 md:gap-4 flex-wrap">
              <a
                href="#contact"
                className="bg-emerald-300 text-black border-4 border-black px-4 md:px-6 py-2.5 md:py-3 font-black uppercase tracking-wider text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center block"
              >
                Contact Me
              </a>

              <a
                href="#projects"
                className="bg-yellow-300 text-black border-4 border-black px-4 md:px-6 py-2.5 md:py-3 font-black uppercase tracking-wider text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center block"
              >
                Projects
              </a>
            </div>
          </div>

          <Image
            src="/images/girl.png"
            alt="Cartoon tech girl"
            width={1500}
            height={1000}
            priority
            className="pointer-events-none relative z-10 w-full h-auto order-2 md:order-none"
          />
        </div>
      </main>

      {/* About Me Section */}
      <section id="about" className="relative w-full bg-[#FFFBEF] border-t-4 border-black -mt-24 md:-mt-36 pt-28 md:pt-40 pb-24 px-6 md:px-12 z-0">
        <div className="max-w-6xl mx-auto relative">
          {/* Rope Hanging Girl Image Container */}
          <div className="hidden md:block absolute left-[22%] lg:left-[25%] top-[-80px] lg:top-[-115px] z-20 w-[260px] lg:w-[400px] h-[745px] lg:h-[1145px] pointer-events-none">
            {/* Left Trigger (Approach from Left) */}
            <div className="absolute left-[30px] lg:left-[50px] top-0 w-[100px] lg:w-[150px] h-[800px] cursor-pointer pointer-events-auto z-30 peer/left" />
            
            {/* Right Trigger (Approach from Right) */}
            <div className="absolute left-[130px] lg:left-[200px] top-0 w-[100px] lg:w-[150px] h-[800px] cursor-pointer pointer-events-auto z-30 peer/right" />
            
            {/* Rotating Container (sibling to peers) */}
            <div className="w-full h-full origin-top transition-transform duration-700 ease-out 
              peer-hover/left:rotate-[-3deg] peer-hover/right:rotate-[3deg]">
              
              {/* Non-Floating Container */}
              <div className="w-full h-full">
                <Image
                  src="/images/rope.png"
                  alt="Girl hanging on a rope"
                  width={1536}
                  height={4400}
                  className="absolute left-0 top-0 pointer-events-none w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* TABLET VIEW: Hand-drawn curved arrow & hint text pointing to the pink circle below the girl */}
          <div className="hidden md:block lg:hidden absolute left-[calc(22%-150px)] top-[310px] z-10 pointer-events-none select-none">
            <svg width="260" height="120" viewBox="0 0 260 120" className="opacity-55">
              {/* Sketchy double-curved loop arrow pointing to the rope (x=130) */}
              <path
                d="M 55,68 C 55,90 67,98 77,98 C 88,98 100,85 96,72 C 92,60 74,68 74,84 C 74,100 100,100 114,95 C 137,85 210,95 225,75"
                fill="none"
                stroke="#3e3835"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="4 3"
              />
              {/* Arrowhead pointing up-right towards the pink circle */}
              <path
                d="M 225,75 L 213,76 M 225,75 L 220,87"
                stroke="#3e3835"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Cursive-style Monospace Text on two lines */}
              <text
                x="35"
                y="45"
                fill="#3e3835"
                className="font-mono text-[10px] font-bold tracking-wide"
              >
                try clicking
              </text>
              <text
                x="60"
                y="58"
                fill="#3e3835"
                className="font-mono text-[10px] font-bold tracking-wide"
              >
                here
              </text>
            </svg>
          </div>

          {/* DESKTOP VIEW: Hand-drawn curved arrow & hint text pointing to the pink circle below the girl */}
          <div className="hidden lg:block absolute left-[calc(25%-180px)] top-[510px] z-10 pointer-events-none select-none">
            <svg width="350" height="150" viewBox="0 0 350 150" className="opacity-55">
              {/* Sketchy double-curved loop arrow pointing to the rope (x=200) */}
              <path
                d="M 65,70 C 65,100 85,110 100,110 C 115,110 130,95 125,80 C 120,65 95,75 95,95 C 95,115 130,115 150,110 C 180,100 280,110 305,80"
                fill="none"
                stroke="#3e3835"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="4 3"
              />
              {/* Arrowhead pointing up-right towards the pink circle */}
              <path
                d="M 305,80 L 293,81 M 305,80 L 300,92"
                stroke="#3e3835"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Cursive-style Monospace Text on two lines */}
              <text
                x="45"
                y="45"
                fill="#3e3835"
                className="font-mono text-[11px] font-bold tracking-wide"
              >
                try clicking
              </text>
              <text
                x="70"
                y="60"
                fill="#3e3835"
                className="font-mono text-[11px] font-bold tracking-wide"
              >
                here
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Title & Headline */}
            <div className="space-y-6">
              <div className="inline-block bg-pink-400 text-black font-mono font-black text-xs md:text-sm px-3.5 py-1.5 border-2 border-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                Who is Disha?
              </div>
              
              <h2 className="text-6xl md:text-8xl font-black text-black uppercase tracking-tight leading-none">
                About <br /> Me
              </h2>
              
              <p className="font-mono text-lg text-gray-700 max-w-md leading-relaxed">
                Designing interfaces that feel alive and writing clean, scalable code that makes complex things simple.
              </p>
            </div>
            
            {/* Right Column: Bio & Stats Dashboard Card */}
            <div className="relative">
              {/* Rotate Accent Tag */}
              <div className="absolute -top-4 -left-4 z-10 bg-yellow-300 border-2 border-black text-black font-mono font-black uppercase text-xs px-3.5 py-1.5 rotate-[-3deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                My Story
              </div>
              
              {/* The Main Bio Card */}
              <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#FF3B92] relative">
                <p className="font-mono text-base md:text-lg text-black leading-relaxed">
                  I am a Computer Science student and Full Stack Developer who bridges the gap between clean code and creative design. I write responsive frontends and build robust backends to bring user-friendly applications to life.
                </p>
                
                <p className="font-mono text-sm md:text-base text-gray-700 mt-4 leading-relaxed border-t-2 border-dashed border-black pt-4">
                  My background as a digital artist gives me a unique appreciation for visual layout and aesthetics, which I inject into every MERN and Next.js project I build.
                </p>
                
                {/* Integrated Achievements */}
                <div className="border-t-4 border-black mt-8 pt-6 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-black">CSE</div>
                    <div className="font-mono text-xs md:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">Student / Dev</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-black">15+</div>
                    <div className="font-mono text-xs md:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">Projects Built</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section — Hanging Gallery */}
      <ProjectsHanging />

      {/* Contact Me Section */}
      <Contact />

      {/* Easter Egg Cool Mode Toggle */}
      <CoolModeToggle />
    </div>
  );
}