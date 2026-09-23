import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  cardGrid,
  cardItem,
  lineEnter,
  lineViewport,
  reveal,
  revealGroup,
  useReducedMotionSafe,
} from '../lib/motion';

/*
 * Scroll reveal primitives. All animate opacity/transform only, fire once when
 * 15% of the element is in view, and render plain, fully visible elements when
 * the user prefers reduced motion.
 *
 * Note: an element taller than ~6x the viewport can never reach 15% visibility.
 * Wrap blocks (headers, rows, cards), not whole long sections, or pass amount="some".
 */

type Tag =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'ul'
  | 'ol'
  | 'li'
  | 'p'
  | 'span'
  | 'h2'
  | 'h3'
  | 'h4';

type Kind = 'reveal' | 'card';

type BaseProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> & {
  as?: Tag;
  children?: React.ReactNode;
  /** Intersection ratio needed to trigger. Default 0.15. */
  amount?: number | 'some' | 'all';
};

/** Add a start delay (seconds) to every transition inside a variant's `show` state. */
function withDelay(variants: Variants, delay?: number): Variants {
  if (!delay) return variants;
  const show = variants.show as { transition?: Record<string, unknown> } & Record<string, unknown>;
  const t = show.transition ?? {};
  const shifted: Record<string, unknown> = { ...t, delay };
  for (const [key, val] of Object.entries(t)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      shifted[key] = { ...(val as object), delay };
    }
  }
  return { ...variants, show: { ...show, transition: shifted } } as Variants;
}

function motionTag(as: Tag): React.ElementType {
  return (motion as unknown as Record<Tag, React.ElementType>)[as];
}

/** Single-element section reveal (8px rise + fade). */
export const Reveal: React.FC<BaseProps & { delay?: number; kind?: Kind }> = ({
  as = 'div',
  amount = 0.15,
  delay,
  kind = 'reveal',
  children,
  ...rest
}) => {
  const reduced = useReducedMotionSafe();
  const variants = useMemo(() => withDelay(kind === 'card' ? cardItem : reveal, delay), [kind, delay]);
  if (reduced) return React.createElement(as, rest, children);
  const M = motionTag(as);
  return (
    <M {...rest} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </M>
  );
};

/**
 * Stagger container. kind="reveal" -> 0.1s stagger for RevealItem (section text),
 * kind="card" -> 0.09s stagger for card items.
 */
export const RevealGroup: React.FC<BaseProps & { kind?: Kind; delay?: number }> = ({
  as = 'div',
  amount = 0.15,
  kind = 'reveal',
  delay,
  children,
  ...rest
}) => {
  const reduced = useReducedMotionSafe();
  const variants = useMemo<Variants>(() => {
    const base = kind === 'card' ? cardGrid : revealGroup;
    if (!delay) return base;
    const show = base.show as { transition?: object };
    return { ...base, show: { ...show, transition: { ...(show.transition ?? {}), delayChildren: delay } } } as Variants;
  }, [kind, delay]);
  if (reduced) return React.createElement(as, rest, children);
  const M = motionTag(as);
  return (
    <M {...rest} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </M>
  );
};

/** Child of RevealGroup. Inherits the group's hidden/show state. */
export const RevealItem: React.FC<Omit<BaseProps, 'amount'> & { kind?: Kind }> = ({
  as = 'div',
  kind = 'reveal',
  children,
  ...rest
}) => {
  const reduced = useReducedMotionSafe();
  if (reduced) return React.createElement(as, rest, children);
  const M = motionTag(as);
  return (
    <M {...rest} variants={kind === 'card' ? cardItem : reveal}>
      {children}
    </M>
  );
};

/** Hairline divider that draws in left-to-right (scaleX 0 -> 1, 0.9s). */
export const LineDraw: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay }) => {
  const reduced = useReducedMotionSafe();
  const variants = useMemo(() => withDelay(lineEnter, delay), [delay]);
  const cls = `hairline ${className}`.trim();
  if (reduced) return <div className={cls} aria-hidden="true" />;
  return (
    <motion.div
      className={cls}
      aria-hidden="true"
      style={{ originX: 0 }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={lineViewport}
    />
  );
};

export default Reveal;
