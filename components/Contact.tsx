import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { RevealGroup, RevealItem } from './Reveal';
import { inViewOnce, lineRise, lineRiseGroup, useReducedMotionSafe } from '../lib/motion';

/**
 * Closing section. A giant "Let's talk" display line on the page (same scale
 * family as the hero name), followed by a navy grain closing card holding the
 * paragraph and the contact buttons, mirroring the hero's "headline over cards".
 */
const Contact: React.FC = () => {
  const reduced = useReducedMotionSafe();

  const headline = (
    <>
      Let's <span className="text-navy">talk</span>
    </>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-y gutter container-x relative z-10"
    >
      <RevealGroup as="div" className="mb-5 md:mb-6">
        <RevealItem as="span" className="eyebrow-num block w-fit">
          08
        </RevealItem>
      </RevealGroup>

      {/* Display line: rises out of an overflow-clip wrapper */}
      <h2 id="contact-title" className="display contact-display mb-6 text-ink md:mb-10">
        {reduced ? (
          <span className="block w-fit">{headline}</span>
        ) : (
          <motion.span
            className="-mb-[0.12em] block w-fit overflow-clip pb-[0.12em]"
            variants={lineRiseGroup}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            <motion.span className="block w-fit" variants={lineRise}>
              {headline}
            </motion.span>
          </motion.span>
        )}
      </h2>

      <RevealGroup kind="card" as="div" className="navy-card navy-card--2 navy-card--static contact-card">
        {/* Two columns on desktop: the statement left, the actions stacked right. */}
        <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-8 md:gap-12 md:p-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:p-14">
          <RevealItem
            kind="card"
            as="p"
            className="max-w-[26ch] text-pretty text-[1.375rem] font-medium leading-[1.2] tracking-[-0.025em] text-paper sm:text-[1.75rem] md:text-[2.25rem] lg:max-w-none lg:text-[clamp(2.25rem,2.9vw,3rem)]"
          >
            Open to Strategic Projects, AI data operations and evaluation program roles, anywhere in the world the future of AI is being built.
          </RevealItem>

          <RevealItem kind="card" as="div" className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-paper w-full sm:col-span-3 lg:col-span-1 xl:col-span-3">
              <Mail size={18} aria-hidden="true" />
              Email me
            </a>
            <a
              href={PERSONAL_INFO.cv}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-paper w-full px-3"
            >
              <Download size={18} aria-hidden="true" />
              CV
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-paper w-full px-3"
            >
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-paper w-full px-3"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
};

export default Contact;
