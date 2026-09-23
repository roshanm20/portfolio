import React from 'react';
import SectionHeader from './SectionHeader';
import { LineDraw, RevealGroup, RevealItem } from './Reveal';
import { WORK_EXPERIENCE } from '../constants';
import { ArrowUpRight, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative bg-surface section-y gutter">
      <div className="container-x">
        <SectionHeader title="Experience" number="01" />

        <ol>
          {WORK_EXPERIENCE.map((exp) => (
            <li key={exp.id}>
              <LineDraw />
              <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-6 py-10 md:grid-cols-12 md:py-14">
                {/* Left: organisation, period, location */}
                <RevealItem className="md:col-span-4">
                  <p className="text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-2xl">
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-start gap-1.5 decoration-1 underline-offset-[0.2em] hover:underline"
                      >
                        <span>{exp.organization}</span>
                        <ArrowUpRight
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="mt-[0.2em] shrink-0 text-subtle transition-[color,transform] duration-300 ease-out-cubic group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                        />
                      </a>
                    ) : (
                      exp.organization
                    )}
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-medium tabular-nums text-muted">{exp.period}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.9375rem] text-subtle">
                    <MapPin size={14} aria-hidden="true" className="shrink-0" /> {exp.location}
                  </p>
                </RevealItem>

                {/* Right: role and bullets */}
                <RevealItem className="md:col-span-8 lg:col-span-7 lg:col-start-6 lg:pr-[4.5rem]">
                  <h3 className="text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em] text-balance text-navy md:text-[1.625rem]">
                    {exp.role}
                  </h3>
                  <ul className="mt-5 space-y-3.5 md:mt-6">
                    {exp.description.map((item, j) => (
                      <li key={j} className="relative pl-6 text-[0.9375rem] leading-[1.6] text-muted md:text-base">
                        <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-px w-3 bg-navy/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              </RevealGroup>
            </li>
          ))}
        </ol>
        <LineDraw />
      </div>
    </section>
  );
};

export default Experience;
