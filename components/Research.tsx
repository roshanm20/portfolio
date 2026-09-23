import React from 'react';
import SectionHeader from './SectionHeader';
import ResearchCard from './ResearchCard';
import { Reveal } from './Reveal';
import { RESEARCH_EXPERIENCE } from '../constants';

const Research: React.FC = () => {
  return (
    <section id="research" className="relative section-y gutter">
      <div className="container-x">
        <SectionHeader title="Research Background" number="06" />
        <Reveal
          as="p"
          className="-mt-2 mb-12 max-w-[48ch] text-[1.1875rem] font-medium leading-[1.4] tracking-[-0.02em] text-balance text-muted md:-mt-4 md:mb-16 md:text-[1.5rem] md:leading-[1.35]"
        >
          Before AI data work I trained as a physicist. The habits carried over: build the pipeline once, benchmark it honestly, and do not trust a result until it holds up across every case.
        </Reveal>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {RESEARCH_EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.id} as="li" kind="card" delay={(i % 2) * 0.09}>
              <ResearchCard data={exp} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Research;
