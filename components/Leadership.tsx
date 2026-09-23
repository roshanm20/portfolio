import React from 'react';
import SectionHeader from './SectionHeader';
import { RevealGroup, RevealItem } from './Reveal';
import { POSITIONS } from '../constants';

const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="relative section-y gutter">
      <div className="container-x">
        <SectionHeader title="Leadership" number="03" />
        <RevealGroup kind="card" as="ul" className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {POSITIONS.map((pos) => (
            <RevealItem
              key={pos.id}
              as="li"
              kind="card"
              className="surface-card surface-card--hover flex flex-col p-7 md:min-h-[13rem] md:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-[1.75rem]">
                  {pos.role}
                </h3>
                <span className="shrink-0 text-[0.8125rem] font-medium tabular-nums text-subtle">{pos.period}</span>
              </div>
              <p className="mt-2 text-[0.9375rem] font-medium text-navy">{pos.organization}</p>
              {pos.detail && (
                <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-[1.55] text-muted md:text-base">
                  {pos.detail}
                </p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Leadership;
