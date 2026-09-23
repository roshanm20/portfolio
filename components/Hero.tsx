import React from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../constants';

const Hero: React.FC = () => {

  const handleScrollDown = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      const headerOffset = 100;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="min-h-[100dvh] flex flex-col relative overflow-hidden">
      
      {/* Concentric Orbital System with Nucleus */}
      <div className="absolute -top-[100px] -right-[200px] md:-top-[150px] md:-right-[50px] w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center pointer-events-none opacity-60 md:opacity-100">
          
          {/* Nucleus (Star / Black Hole) */}
          <div className="absolute w-4 h-4 bg-nothing-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] z-20 animate-pulse"></div>
          <div className="absolute w-12 h-12 bg-nothing-white/10 rounded-full blur-md z-10"></div>

          {/* Orbit 1 (Largest) */}
          <div className="absolute w-[100%] h-[100%] border border-nothing-gray/10 rounded-full animate-[spin_60s_linear_infinite]">
             <div className="absolute top-[50%] left-[-8px] w-4 h-4 bg-nothing-black border-2 border-nothing-red rounded-full shadow-[0_0_15px_rgba(215,25,33,0.6)] z-10"></div>
          </div>

          {/* Orbit 2 (Medium) */}
          <div className="absolute w-[70%] h-[70%] border border-nothing-gray/20 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]">
             <div className="absolute bottom-0 right-[50%] w-2 h-2 bg-nothing-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          </div>
          
          {/* Orbit 3 (Small) */}
          <div className="absolute w-[40%] h-[40%] border border-nothing-gray/30 rounded-full animate-[spin_20s_linear_infinite]">
             <div className="absolute top-0 right-[50%] w-1.5 h-1.5 bg-nothing-light rounded-full"></div>
          </div>

      </div>

      {/* Horizontal Horizon Line */}
      <div className="absolute top-[50%] right-0 w-[50%] h-[1px] bg-gradient-to-l from-nothing-gray/50 to-transparent pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center px-6 max-w-6xl mx-auto w-full z-10 pt-28 pb-32 md:pb-0">
        <div className="border-l-2 border-nothing-red pl-6 mb-8 relative">
           {/* Decorative Crosshair */}
           <div className="absolute -left-[9px] -top-[9px] w-[16px] h-[16px] border-t-2 border-l-2 border-nothing-red"></div>

          <p className="font-mono text-nothing-red mb-2 tracking-widest text-xs md:text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-nothing-red rounded-full animate-pulse"></span>
            AI DATA OPERATIONS
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tighter text-nothing-white leading-[1.1] md:leading-none mb-3">
            MUHAMMED<br />
            <span className="text-nothing-light glitch-hover cursor-default">ROSHAN M</span>
          </h1>
          <p className="font-mono text-nothing-light/70 text-xs md:text-sm mt-2 tracking-widest uppercase">
            {PERSONAL_INFO.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 md:mt-12">
          <div className="md:col-span-7">
            <div className="border-t border-nothing-gray pt-6 relative">
               <div className="absolute -top-[3px] right-0 w-10 h-[1px] bg-nothing-red"></div>
               <p className="font-mono text-sm md:text-base text-nothing-light leading-relaxed max-w-2xl text-left">
                {PERSONAL_INFO.summary}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-5 flex flex-col justify-between h-full gap-8">
             <div className="flex flex-col gap-4 items-start">
                <div className="inline-flex items-center gap-2 border border-nothing-gray px-4 py-2 rounded-full bg-nothing-black/50 backdrop-blur-sm hover:border-nothing-red transition-colors cursor-default">
                    <div className="w-2 h-2 bg-nothing-red rounded-full animate-ping"></div>
                    <span className="font-mono text-[10px] md:text-xs text-nothing-light">OPEN TO STRATEGIC PROJECTS & AI DATA OPS ROLES</span>
                </div>
                <p className="font-mono text-[10px] md:text-xs text-nothing-light pl-1">{PERSONAL_INFO.location}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href={PERSONAL_INFO.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-nothing-white text-nothing-black px-5 py-2.5 font-mono text-xs font-bold hover:bg-nothing-red hover:text-white transition-colors"
                  >
                    <Download size={14} /> DOWNLOAD CV
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 border border-nothing-gray text-nothing-white px-5 py-2.5 font-mono text-xs font-bold hover:border-nothing-white transition-colors"
                  >
                    <Mail size={14} /> EMAIL
                  </a>
                </div>
             </div>
             <div className="md:text-right">
                <h3 className="font-mono text-nothing-white text-lg md:text-xl mb-1">OPERATIONS x AI DATA</h3>
                <p className="font-mono text-xs text-nothing-gray">PHYSICS-TRAINED OPERATOR</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-nothing-gray mt-12 border border-nothing-gray">
          {STATS.map((s) => (
            <div key={s.label} className="bg-nothing-black p-4 md:p-5">
              <p className="font-mono text-2xl md:text-3xl font-bold text-nothing-white">{s.value}</p>
              <p className="font-mono text-[10px] md:text-xs text-nothing-light mt-1 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Button */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-nothing-gray hover:text-nothing-red transition-colors cursor-pointer z-20 p-4"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default Hero;