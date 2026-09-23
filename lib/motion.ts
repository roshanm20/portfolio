import { useReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

/** Cubic-bezier easings measured from the reference (spec §8.2). */
export const ease = {
  outCubic: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
  inOutCubic: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
  inQuad: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  card: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
  sweep: [0.62, 0.05, 0.01, 0.99] as [number, number, number, number],
};

/** Default viewport for whileInView reveals. */
export const inViewOnce = { once: true, amount: 0.15 } as const;

/* ------------------------------------------------------------------ */
/* Section reveal: 8px rise, y 0.8s outCubic, opacity 0.5s, 0.1s stagger */
/* ------------------------------------------------------------------ */
export const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
export const reveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: { duration: 0.8, ease: ease.outCubic },
      opacity: { duration: 0.5, ease: 'easeInOut' },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Cards: 18px rise, 0.7s card easing, 0.09s stagger                   */
/* ------------------------------------------------------------------ */
export const cardGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
/** Hero variant of cardGrid: waits 0.28s after the headline starts. */
export const cardGridHero: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.28 } },
};
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.card } },
};

/* ------------------------------------------------------------------ */
/* Divider hairline: scaleX 0 -> 1 over 0.9s outCubic                  */
/* ------------------------------------------------------------------ */
export const lineEnter: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: ease.outCubic } },
};
/** Viewport for divider draw-ins: fire as soon as the line clears the bottom 10%. */
export const lineViewport = { once: true, amount: 0, margin: '0px 0px -10% 0px' } as const;

/* ------------------------------------------------------------------ */
/* Headline lines: y 100% -> 0 inside an overflow-clip wrapper         */
/* ------------------------------------------------------------------ */
export const lineRiseGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const lineRise: Variants = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.9, ease: ease.expoOut } },
};

/* ------------------------------------------------------------------ */
/* Splash                                                              */
/* ------------------------------------------------------------------ */
/** Wordmark: fully opaque after 0.35s (so it never exits grey), scale settles over 0.8s. */
export const splashWordmark: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.3, ease: 'easeOut' }, scale: { duration: 0.8, ease: ease.expoOut } },
  },
};

/* ------------------------------------------------------------------ */
/* Menu (backdrop / panel grows from top-right / staggered items)      */
/* ------------------------------------------------------------------ */
export const menuBackdrop: Variants = {
  closed: { opacity: 0, transition: { duration: 0.2, delay: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.25 } },
};
export const menuPanel: Variants = {
  closed: {
    scale: 0,
    opacity: 0,
    transition: {
      scale: { duration: 0.45, ease: ease.inQuad },
      opacity: { duration: 0.25, delay: 0.2 },
    },
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { duration: 0.45, ease: ease.outCubic },
      opacity: { duration: 0.2 },
      delayChildren: 0.15,
      staggerChildren: 0.05,
    },
  },
};
export const menuItem: Variants = {
  closed: { opacity: 0, y: '-2rem', transition: { duration: 0.25 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { y: { duration: 0.35, ease: ease.outCubic }, opacity: { duration: 0.25 } },
  },
};

/* ------------------------------------------------------------------ */
/* Text roll hover: two stacked copies inside overflow: clip.          */
/* Parent: initial="rest" whileHover="hover" (and animate on focus).   */
/* ------------------------------------------------------------------ */
export const rollTop: Variants = {
  rest: { y: '0%', transition: { duration: 0.35, ease: ease.outCubic } },
  hover: { y: '-100%', transition: { duration: 0.35, ease: ease.outCubic } },
};
export const rollBottom: Variants = {
  rest: { y: '0%', transition: { duration: 0.35, ease: ease.outCubic } },
  hover: { y: '-100%', transition: { duration: 0.35, ease: ease.outCubic, delay: 0.05 } },
};
export const rollDot: Variants = {
  rest: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  hover: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: ease.outCubic } },
};

export const microTransition: Transition = { duration: 0.25, ease: 'easeInOut' };

/**
 * `true` when the user prefers reduced motion. Unlike framer's hook this
 * never returns null, so it is safe to branch on directly.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() === true;
}
