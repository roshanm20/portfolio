import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotionSafe } from '../lib/motion';

interface CountUpProps {
  /** Display value such as "25", "2x", "2.5 yrs", "200+". Only the leading number animates. */
  value: string;
  /** Gate the count (e.g. wait for the page-load curtain). Defaults to true. */
  start?: boolean;
  /** Duration in ms. Defaults to 2000. */
  duration?: number;
  className?: string;
  /** Class applied to the suffix ("x", " yrs", "+"). */
  suffixClassName?: string;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function parse(value: string) {
  const m = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;
  return { prefix, target: parseFloat(num), decimals, suffix };
}

const format = (n: number, decimals: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts the numeric part of `value` from 0 to its target over 2s (easeOutQuart)
 * once 40% of it is visible. An invisible copy of the final value sits in the
 * same grid cell so the box never changes size, and screen readers only get
 * the final value.
 */
const CountUp: React.FC<CountUpProps> = ({ value, start = true, duration = 2000, className = '', suffixClassName = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotionSafe();
  const parsed = parse(value);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!parsed || done) return;
    if (reduced) {
      setDone(true);
      return;
    }
    if (!inView || !start) return;
    let raf = 0;
    let t0: number | null = null;
    const tick = (now: number) => {
      if (t0 === null) t0 = now;
      const p = Math.min(1, (now - t0) / duration);
      setCurrent(parsed.target * easeOutQuart(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // parsed is derived from value; depend on the primitive instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, start, reduced, duration, value, done]);

  if (!parsed) return <span className={className}>{value}</span>;

  const render = (n: number) => (
    <>
      {parsed.prefix}
      {format(n, parsed.decimals)}
      {parsed.suffix && <span className={suffixClassName}>{parsed.suffix}</span>}
    </>
  );

  return (
    <span ref={ref} className={`inline-grid justify-items-start tabular-nums ${className}`.trim()}>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {render(parsed.target)}
      </span>
      <span aria-hidden="true" className="[grid-area:1/1]">
        {render(done ? parsed.target : current)}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};

export default CountUp;
