import React from 'react';
import { EDUCATION_HISTORY, SKILLS } from '../constants';
import SectionHeader from './SectionHeader';
import { RevealGroup, RevealItem } from './Reveal';
import { GraduationCap, ClipboardCheck, Database, Hammer, Layers, Languages } from 'lucide-react';

const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((s) => (
      <li key={s} className="chip text-[0.8125rem]">
        {s}
      </li>
    ))}
  </ul>
);

/** Small icon + category label used at the top of each tile. */
const TileHead: React.FC<{ icon: React.ReactNode; label: string; onNavy?: boolean }> = ({ icon, label, onNavy }) => (
  <div className="flex items-center gap-3">
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full border ${
        onNavy ? 'border-paper/20 text-paper/85' : 'border-line bg-page text-navy'
      }`}
    >
      {icon}
    </span>
    <h3 className={`text-[1.0625rem] font-semibold tracking-[-0.02em] ${onNavy ? 'text-paper' : 'text-ink'}`}>
      {label}
    </h3>
  </div>
);

const BentoGrid: React.FC = () => {
  const uni = EDUCATION_HISTORY[0];
  const [ops, data, build, domains, langs] = SKILLS;

  return (
    <section id="skills" className="relative section-y gutter">
      <div className="container-x">
        <SectionHeader title="Skills & Education" number="04" />
        <RevealGroup kind="card" className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
          {/* Operations - large navy */}
          <RevealItem
            kind="card"
            className="navy-card navy-card--1 navy-card--static flex flex-col p-7 md:col-span-2 md:p-10"
          >
            <TileHead icon={<ClipboardCheck size={18} />} label={ops.category} onNavy />
            <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-10">
              {ops.skills.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 border-t border-paper/10 py-3 text-[1rem] font-medium tracking-[-0.015em] text-paper/90 md:py-4 md:text-[1.1875rem]"
                >
                  <span aria-hidden="true" className="text-paper/50">
                    +
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Education - large navy */}
          <RevealItem
            kind="card"
            className="navy-card navy-card--3 navy-card--static flex flex-col p-7 md:col-span-2 md:p-10"
          >
            <TileHead icon={<GraduationCap size={18} />} label="Education" onNavy />
            <div className="mt-8 md:mt-10">
              <h4 className="text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.035em] text-paper md:text-[clamp(2.75rem,4.4vw,4.25rem)]">
                {uni.institution}
              </h4>
              <p className="mt-4 text-[1.0625rem] font-medium text-paper md:text-lg">{uni.degree}</p>
              <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-[1.55] text-paper/75">{uni.details}</p>
              <p className="mt-5 inline-block text-[0.8125rem] font-medium tabular-nums tracking-[0.02em] text-paper/60">
                {uni.period}
              </p>
            </div>
          </RevealItem>

          {/* Data & tools */}
          <RevealItem kind="card" className="surface-card flex flex-col gap-6 p-7 md:col-span-2 md:p-8">
            <TileHead icon={<Database size={18} />} label={data.category} />
            <div>
              <Chips items={data.skills} />
            </div>
          </RevealItem>

          {/* Build */}
          <RevealItem kind="card" className="surface-card flex flex-col gap-6 p-7 md:col-span-1 md:p-8">
            <TileHead icon={<Hammer size={18} />} label={build.category} />
            <div>
              <Chips items={build.skills} />
            </div>
          </RevealItem>

          {/* Languages */}
          <RevealItem kind="card" className="surface-card flex flex-col gap-6 p-7 md:col-span-1 md:p-8">
            <TileHead icon={<Languages size={18} />} label={langs.category} />
            <div>
              <Chips items={langs.skills} />
            </div>
          </RevealItem>

          {/* Domains */}
          {/* Chips follow the label directly on desktop (left-aligned row). */}
          <RevealItem
            kind="card"
            className="surface-card flex flex-col gap-6 p-7 md:col-span-4 md:flex-row md:items-center md:gap-x-8 md:p-8"
          >
            <div className="md:shrink-0">
              <TileHead icon={<Layers size={18} />} label={domains.category} />
            </div>
            <Chips items={domains.skills} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
};

export default BentoGrid;
