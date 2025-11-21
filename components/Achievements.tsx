import React, { useEffect, useRef, useState } from 'react';
import { AWARDS } from '../constants';
import SectionHeader from './SectionHeader';

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate percentage of section scrolled
        // Start slightly before section enters view, end when it leaves
        let percent = (windowHeight / 2 - elementTop) / (elementHeight / 1.2);
        percent = Math.max(0, Math.min(1, percent));
        setProgress(percent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-nothing-black z-10">
      {/* Parallax Star Background specifically for this section */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nothing-gray/20 via-nothing-black to-nothing-black"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeader title="Achievements" number="06" />
        
        <div className="flex gap-8 md:gap-16 relative">
          {/* Trajectory Line */}
          <div className="hidden md:block w-[2px] bg-nothing-gray/20 relative ml-4">
             {/* The Moving Satellite/Comet */}
             <div 
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-nothing-red rounded-full shadow-[0_0_15px_rgba(215,25,33,0.8)] z-20 transition-all duration-75 ease-linear"
                style={{ top: `${progress * 100}%` }}
             >
                <div className="absolute inset-0 bg-nothing-red blur-sm animate-pulse"></div>
             </div>
             {/* The Trail */}
             <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-nothing-red/50 to-nothing-red"
                style={{ height: `${progress * 100}%` }}
             ></div>
          </div>

          {/* Awards List */}
          <div className="flex-1 space-y-12">
            {AWARDS.map((award, index) => {
                // Determine if this item is "active" based on scroll progress
                // OR if it is being hovered by the mouse
                const itemPosition = index / (AWARDS.length - 1);
                const isScrollActive = Math.abs(progress - itemPosition) < 0.15; 
                const isHovered = hoveredIndex === index;
                const isActive = isScrollActive || isHovered;

                return (
                    <div 
                        key={award.id} 
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative pl-6 md:pl-0 transition-all duration-500 cursor-pointer ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'
                        }`}
                    >
                        {/* Mobile Dot Indicator */}
                        <div className={`md:hidden absolute left-0 top-2 w-2 h-2 rounded-full transition-colors ${
                             isActive ? 'bg-nothing-red shadow-[0_0_10px_#D71921]' : 'bg-nothing-gray'
                        }`}></div>

                        {/* Connection Line to Main Trajectory (Desktop) */}
                        <div className={`hidden md:block absolute -left-[4.25rem] top-1/2 w-16 h-[1px] transition-all duration-500 ${
                            isActive ? 'bg-nothing-red shadow-[0_0_5px_#D71921] opacity-100' : 'bg-nothing-gray/20 opacity-0'
                        }`}></div>

                        <div className={`border-b border-nothing-gray/20 pb-4 group ${
                            isActive ? 'border-nothing-red/50' : ''
                        }`}>
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                                <h4 className={`text-lg md:text-xl font-bold transition-colors ${
                                    isActive ? 'text-nothing-white' : 'text-nothing-light'
                                }`}>
                                    {award.title}
                                </h4>
                                <span className={`font-mono text-xs transition-colors ${
                                    isActive ? 'text-nothing-red' : 'text-nothing-gray'
                                }`}>
                                    {award.year}
                                </span>
                            </div>
                            <p className="font-mono text-sm text-nothing-gray mt-1 group-hover:text-nothing-light transition-colors">
                                {award.organization}
                            </p>
                        </div>
                    </div>
                );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;