import React from 'react';
import { EDUCATION_HISTORY, SKILLS } from '../constants';
import { GraduationCap, Telescope, Orbit, Atom, Satellite, Activity } from 'lucide-react';

const BentoGrid: React.FC = () => {
  const uni = EDUCATION_HISTORY[0]; // Main University

  return (
    <section id="skills" className="py-20 border-t border-nothing-gray dotted-bg relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Education Block - Large */}
          <div className="md:col-span-2 bg-nothing-black border border-nothing-gray p-6 md:p-8 relative overflow-hidden group hover:border-nothing-white transition-colors">
             <div className="flex items-center gap-3 mb-6">
                 <GraduationCap className="text-nothing-red" size={20} />
                 <h3 className="font-mono text-nothing-red text-sm uppercase tracking-widest">Education</h3>
             </div>
             
             <div className="relative z-10">
                <h4 className="text-xl md:text-2xl text-nothing-white font-bold leading-tight">{uni.institution}</h4>
                <p className="text-lg text-nothing-light mt-2">{uni.degree}</p>
                <p className="text-sm text-nothing-gray mt-1 font-mono text-nothing-light/80">{uni.details}</p>
                <p className="text-sm text-nothing-gray mt-4 font-mono">{uni.period}</p>
                
                {/* Previous Schools Small List */}
                <div className="mt-6 pt-4 border-t border-nothing-gray border-dashed space-y-2">
                    {EDUCATION_HISTORY.slice(1).map((sch, i) => (
                        <div key={i} className="flex justify-between text-xs text-nothing-gray font-mono group-hover:text-nothing-light transition-colors">
                            <span>{sch.institution}</span>
                            <span>{sch.details.split(' ')[1]}</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Scientific Libraries */}
          <div className="md:col-span-1 bg-nothing-gray/10 border border-nothing-gray p-6 flex flex-col justify-between hover:bg-nothing-gray/20 transition-colors">
             <Orbit className="text-nothing-red mb-4" size={24} />
             <div>
                 <h4 className="text-nothing-white font-bold mb-2">Scientific Libs</h4>
                 <div className="flex flex-wrap gap-2">
                    {SKILLS[2].skills.slice(0, 6).map(s => (
                        <span key={s} className="text-[10px] font-mono bg-nothing-black border border-nothing-gray px-2 py-1 text-nothing-light">
                            {s}
                        </span>
                    ))}
                 </div>
             </div>
          </div>

          {/* Domain Skills */}
          <div className="md:col-span-1 bg-nothing-dark border border-nothing-gray p-6 flex flex-col justify-between group hover:border-nothing-red transition-colors">
             <Telescope className="text-nothing-white mb-4 group-hover:text-nothing-red transition-colors" size={24} />
             <div>
                 <h4 className="text-nothing-white font-bold mb-2">Domain Expertise</h4>
                 <ul className="text-xs text-nothing-light space-y-1 font-mono">
                    {SKILLS[4].skills.slice(0,4).map(s => (
                        <li key={s}>+ {s}</li>
                    ))}
                 </ul>
             </div>
          </div>

          {/* Core Physics */}
          <div className="md:col-span-1 bg-nothing-black border border-nothing-gray p-6">
             <Atom className="text-nothing-light mb-4" size={24} />
             <h4 className="text-nothing-white font-bold mb-2">Core Physics</h4>
             <div className="text-xs text-nothing-light font-mono leading-relaxed">
                {SKILLS[3].skills.join(" / ")}
             </div>
          </div>

          {/* Tools & Software */}
          <div className="md:col-span-1 bg-nothing-gray/10 border border-nothing-gray p-6">
             <Satellite className="text-nothing-red mb-4" size={24} />
             <h4 className="text-nothing-white font-bold mb-2">Tools</h4>
             <div className="flex flex-wrap gap-2">
                {SKILLS[1].skills.map(s => (
                    <span key={s} className="text-[10px] uppercase tracking-wider text-nothing-white">
                        {s}
                    </span>
                ))}
             </div>
          </div>

          {/* Languages */}
          <div className="md:col-span-2 bg-nothing-dark border border-nothing-gray p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
             <Activity className="text-nothing-red mb-4 relative z-10" size={32} />
             <h4 className="text-nothing-white font-bold mb-4 relative z-10">Programming Languages</h4>
             <div className="flex flex-wrap justify-center gap-3 relative z-10">
                {SKILLS[0].skills.map(s => (
                    <span key={s} className="font-mono text-sm border border-nothing-gray px-3 py-1 text-nothing-light hover:bg-nothing-white hover:text-nothing-black transition-colors cursor-default">
                        {s}
                    </span>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;