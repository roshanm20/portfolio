import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { AWARDS } from '../constants';
import SectionHeader from './SectionHeader';
import { LineDraw, Reveal } from './Reveal';
import { useReducedMotionSafe } from '../lib/motion';

const Achievements: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  // Scroll-linked progress for the list (motion value, no React re-render per scroll).
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section id="recognition" className="relative bg-surface section-y gutter">
      <div className="container-x">
        <SectionHeader title="Recognition" number="07" />

        <div ref={listRef} className="relative sm:pl-10 md:pl-16">
          {/* Progress rail */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 hidden w-px bg-line sm:block">
            <motion.div
              className="absolute inset-0 origin-top bg-navy"
              style={reduced ? { scaleY: 1 } : { scaleY: progress }}
            />
          </div>

          <ul>
            {AWARDS.map((award) => (
              <li key={award.id} className="group">
                <LineDraw />
                {/* Mobile: year stacks above the title; sm+: year right-aligned in its own column. */}
                <Reveal className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 py-7 sm:grid-cols-[1fr_auto] md:grid-cols-12 md:py-9 lg:pr-[4.5rem]">
                  <div className="transition-transform duration-500 ease-out-cubic group-hover:translate-x-3 motion-reduce:group-hover:translate-x-0 md:col-span-9">
                    <h3 className="text-[1.3125rem] font-semibold leading-[1.15] tracking-[-0.025em] text-balance text-ink md:text-[clamp(1.5rem,2.3vw,2rem)]">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-subtle transition-colors duration-300 group-hover:text-muted md:text-base">
                      {award.organization}
                    </p>
                  </div>
                  <span className="order-first text-[0.8125rem] font-medium tabular-nums whitespace-nowrap text-navy sm:order-none sm:text-right sm:text-[0.9375rem] md:col-span-3 md:text-base">
                    {award.year}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
          <LineDraw />
        </div>
      </div>
    </section>
  );
};

export default Achievements;
