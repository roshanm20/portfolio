import React from 'react';
import { EDUCATION_HISTORY, SKILLS } from '../constants';
import SectionHeader from './SectionHeader';
import { GraduationCap, ClipboardCheck, Database, Hammer, Layers, Languages } from 'lucide-react';

const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((s) => (
      <span key={s} className="text-[11px] font-mono bg-nothing-black border border-nothing-gray px-2 py-1 text-nothing-light">
        {s}
      </span>
    ))}
  </div>
);

const BentoGrid: React.FC = () => {
  const uni = EDUCATION_HISTORY[0];
  const [ops, data, build, domains, langs] = SKILLS;

  return (
    <section id="skills" className="py-20 dotted-bg relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Skills & Education" number="04" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Operations - large */}
          <div className="md:col-span-2 bg-nothing-black border border-nothing-gray p-6 md:p-8 hover:border-nothing-red transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardCheck className="text-nothing-red" size={20} />
              <h3 className="font-mono text-nothing-red text-sm uppercase tracking-widest">{ops.category}</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-nothing-white font-mono">
              {ops.skills.map((s) => <li key={s}>+ {s}</li>)}
            </ul>
          </div>

          {/* Education */}
          <div className="md:col-span-2 bg-nothing-dark border border-nothing-gray p-6 md:p-8 hover:border-nothing-white transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="text-nothing-red" size={20} />
              <h3 className="font-mono text-nothing-red text-sm uppercase tracking-widest">Education</h3>
            </div>
            <h4 className="text-xl md:text-2xl text-nothing-white font-bold leading-tight">{uni.institution}</h4>
            <p className="text-base text-nothing-light mt-1">{uni.degree}</p>
            <p className="text-sm text-nothing-light/80 mt-2 font-mono">{uni.details}</p>
            <p className="text-sm text-nothing-gray mt-3 font-mono">{uni.period}</p>
          </div>

          {/* Data & tools */}
          <div className="md:col-span-2 bg-nothing-gray/10 border border-nothing-gray p-6">
            <Database className="text-nothing-red mb-4" size={22} />
            <h4 className="text-nothing-white font-bold mb-3">{data.category}</h4>
            <Chips items={data.skills} />
          </div>

          {/* Build */}
          <div className="md:col-span-1 bg-nothing-dark border border-nothing-gray p-6">
            <Hammer className="text-nothing-light mb-4" size={22} />
            <h4 className="text-nothing-white font-bold mb-3">{build.category}</h4>
            <Chips items={build.skills} />
          </div>

          {/* Languages */}
          <div className="md:col-span-1 bg-nothing-black border border-nothing-gray p-6">
            <Languages className="text-nothing-red mb-4" size={22} />
            <h4 className="text-nothing-white font-bold mb-3">{langs.category}</h4>
            <Chips items={langs.skills} />
          </div>

          {/* Domains */}
          <div className="md:col-span-4 bg-nothing-dark border border-nothing-gray p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3 md:w-1/4">
              <Layers className="text-nothing-red" size={22} />
              <h4 className="text-nothing-white font-bold">{domains.category}</h4>
            </div>
            <div className="md:w-3/4"><Chips items={domains.skills} /></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
