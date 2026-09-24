import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../constants';
import { cardGridHero, cardItem, ease, lineRise, lineRiseGroup, useReducedMotionSafe } from '../lib/motion';
import { usePageReady } from '../lib/pageReady';
import { useLenis } from '../lib/lenis';
import CountUp from './CountUp';

/** Safety net: if the splash never reports ready, reveal the hero anyway. */
const READY_FALLBACK_MS = 2500;

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/**
 * The photo card is the LCP element: keep it at opacity 1 and only move it,
 * so the image can paint the moment the splash is gone.
 */
const photoCard = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: 0.7, ease: ease.card } },
};

const photoZoom = {
  hidden: { scale: 1.06 },
  show: { scale: 1, transition: { duration: 1.4, ease: ease.expoOut, delay: 0.28 } },
};

/** Word-like suffixes ("yrs") are set smaller so the numbers stay dominant. */
const suffixClass = (value: string) =>
  /[a-z]{2,}/i.test(value) ? 'ml-[0.14em] text-[0.42em] font-medium tracking-normal text-paper/70' : '';

const hairlineOnNavy = 'border-t border-[rgba(248,247,243,0.14)]';

const Hero: React.FC = () => {
  const reduced = useReducedMotionSafe();
  const pageReady = usePageReady();
  const [fallbackReady, setFallbackReady] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (pageReady) return;
    const id = window.setTimeout(() => setFallbackReady(true), READY_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [pageReady]);

  const ready = pageReady || fallbackReady || reduced;
  const state = ready ? 'show' : 'hidden';
  // Reduced motion: render the final state, never animate.
  const initial = reduced ? false : 'hidden';

  const handleScrollDown = () => scrollTo('#experience');

  const [first, ...rest] = PERSONAL_INFO.name.split(' ');
  const lines = [first, rest.join(' ')];

  return (
    <section
      aria-label="Introduction"
      className="relative flex flex-col pt-[calc(var(--nav-h)+1.75rem)] md:pt-[calc(var(--nav-h)+2.25rem)] short:lg:pt-[calc(var(--nav-h)+1.5rem)] lg:min-h-[100svh]"
    >
      {/* Row 1: eyebrow + tagline + giant name.
          Mobile: eyebrow, name, tagline. sm+: eyebrow and tagline share the top row. */}
      <div className="container-x gutter grid grid-cols-1 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-x-8">
        <motion.p
          className="eyebrow order-1 flex items-center gap-2.5 !text-navy"
          variants={fadeIn}
          initial={initial}
          animate={state}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
          AI Data Operations
        </motion.p>
        <motion.p
          className="order-3 mt-4 max-w-[34ch] text-[0.9375rem] leading-snug text-muted sm:order-2 sm:mt-0 sm:max-w-none sm:text-right"
          variants={fadeIn}
          initial={initial}
          animate={state}
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        <motion.h1
          className="display order-2 mt-4 text-ink text-[clamp(3rem,15.5vw,5.5rem)] sm:order-3 sm:col-span-2 md:mt-5 md:whitespace-nowrap md:text-[clamp(3.5rem,min(8.7vw,17vh),10.75rem)] short:lg:text-[clamp(3.25rem,min(8vw,15.6vh),9.9rem)]"
          variants={lineRiseGroup}
          initial={initial}
          animate={state}
        >
          {lines.map((line, i) => (
            <React.Fragment key={line}>
              {i > 0 && ' '}
              <span className="-mb-[0.12em] block overflow-y-clip pb-[0.12em] md:inline-block">
                <motion.span className="inline-block" variants={lineRise}>
                  {line}
                </motion.span>
              </span>
            </React.Fragment>
          ))}
        </motion.h1>
      </div>

      {/* Row 2: card strip (fills the rest of the viewport on desktop) */}
      <motion.div
        className="container-x mt-6 grid grid-cols-1 gap-3 px-[var(--gutter)] pb-3 md:mt-8 md:grid-cols-2 md:gap-4 lg:mt-7 short:lg:mt-5 lg:max-h-[760px] lg:min-h-[400px] lg:flex-1 lg:grid-cols-3 lg:px-[var(--edge)] lg:pb-[var(--edge)]"
        variants={cardGridHero}
        initial={initial}
        animate={state}
      >
        {/* 1. Photo card */}
        <motion.figure
          variants={photoCard}
          className="relative m-0 aspect-[4/5] overflow-hidden rounded-card bg-navy md:aspect-auto md:min-h-[480px] lg:min-h-0"
        >
          <motion.div className="absolute inset-0" variants={photoZoom}>
            <picture>
              <source
                type="image/webp"
                srcSet="/profile-photo-480.webp 480w, /profile-photo.webp 622w"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <img
                src="/profile-photo.jpg"
                alt="Portrait of Muhammed Roshan M"
                width={622}
                height={830}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
              />
            </picture>
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.82)_0%,rgba(0,0,0,.5)_28%,transparent_58%)]"
            aria-hidden="true"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7 lg:p-8 lg:pb-14 short:lg:pb-8">
            <p className="flex items-start gap-2.5 text-[1.0625rem] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[1.25rem]">
              <span className="relative mt-[0.42em] flex h-2 w-2 flex-none" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
                <span className="relative h-2 w-2 rounded-full bg-white" />
              </span>
              <span>Open to strategic projects &amp; AI data ops roles</span>
            </p>
          </figcaption>
        </motion.figure>

        {/* 2. Summary card */}
        <motion.div
          variants={cardItem}
          className="navy-card navy-card--1 flex flex-col gap-8 p-6 md:p-7 lg:p-8 lg:pb-14 short:lg:gap-5 short:lg:pb-8"
        >
          <span className="eyebrow-num">01</span>
          <p className="max-w-[42ch] text-[1.0625rem] leading-[1.45] text-paper md:text-[clamp(1.0625rem,0.9vw+0.4rem,1.625rem)]">
            {PERSONAL_INFO.summary}
          </p>
          <div className="mt-auto flex flex-wrap gap-2.5">
            <a href={PERSONAL_INFO.cv} target="_blank" rel="noreferrer" className="btn-paper">
              <Download size={16} strokeWidth={1.75} aria-hidden="true" />
              Download CV
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-ghost-paper">
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              Email
            </a>
          </div>
        </motion.div>

        {/* 3. Stats card */}
        <motion.div
          variants={cardItem}
          className="navy-card navy-card--3 flex flex-col gap-6 p-6 md:col-span-2 md:p-7 lg:col-span-1 lg:p-8 lg:pb-14 short:lg:gap-3 short:lg:pb-8"
        >
          <div className="flex items-start justify-between">
            <span className="eyebrow-num">02</span>
            <button
              type="button"
              onClick={handleScrollDown}
              className="round-arrow cursor-pointer [transform:none]"
              aria-label="Scroll to next section"
            >
              <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <dl className="m-0 grid flex-1 grid-cols-2 content-end gap-x-6 md:grid-cols-4 lg:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.label} className={`flex flex-col py-4 lg:py-5 short:lg:py-3 ${hairlineOnNavy}`}>
                <dt className="order-2 mt-2 text-[0.8125rem] leading-[1.35] text-[var(--on-navy-85)] md:text-[0.875rem]">
                  {s.label}
                </dt>
                <dd className="order-1 m-0 text-[clamp(2.5rem,11vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-paper md:text-[clamp(2.75rem,4.4vw,5.5rem)] short:lg:text-[clamp(2.5rem,min(4.4vw,7.2vh),5.5rem)]">
                  <CountUp value={s.value} start={ready} suffixClassName={suffixClass(s.value)} />
                </dd>
              </div>
            ))}
          </dl>

          <div className={`flex flex-col gap-1 pt-5 short:lg:pt-4 ${hairlineOnNavy}`}>
            <p className="w-fit text-[1.0625rem] font-semibold tracking-[-0.02em] text-paper">Operations x AI Data</p>
            <p className="w-fit text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-[var(--on-navy-45)]">
              Physics-trained operator
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
