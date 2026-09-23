import React from 'react';
import SectionHeader from './SectionHeader';
import { RevealGroup, RevealItem } from './Reveal';
import { PRINCIPLES } from '../constants';

/* Stepped navy: dark -> light -> dark, like the hero strip. */
const STEPS = ['navy-card--1', 'navy-card--2', 'navy-card--3', 'navy-card--2'];

const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative section-y gutter">
      <div className="container-x">
        <SectionHeader title="How I Work" number="02" />
        <RevealGroup kind="card" as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <RevealItem
              key={p.id}
              as="li"
              kind="card"
              className={`navy-card ${STEPS[i % STEPS.length]} flex min-h-[15rem] flex-col p-7 md:min-h-[18rem] md:p-8`}
            >
              <span className="eyebrow-num">0{i + 1}</span>
              {/* Title + text sit at the top on a shared baseline across the row. */}
              <div className="mt-10 md:mt-14">
                <h3 className="text-[1.5rem] font-semibold leading-[1.1] tracking-[-0.025em] text-balance text-paper md:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.55] text-paper/80">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Approach;
