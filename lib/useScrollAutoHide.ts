import { useEffect, useState } from 'react';

/** Delay after the last scroll event before a hidden element comes back. */
const REAPPEAR_MS = 600;
/** Per-event movement below this is treated as settling, not scrolling. */
const DELTA_PX = 6;
/** Never hide near the very top of the page. */
const TOP_ZONE_PX = 120;

/**
 * True while the user is actively scrolling down, false once they scroll up
 * or stop for REAPPEAR_MS. Always false under prefers-reduced-motion or when
 * `disabled` is set (for example while a panel is open).
 */
export function useScrollAutoHide(disabled = false): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      /* ignore */
    }
    if (reduced) return;

    let lastY = window.scrollY;
    let timer = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      // Per-event delta: the slow tail of a smooth (Lenis) scroll does not
      // count as active scrolling, so the launcher returns promptly.
      if (Math.abs(dy) < DELTA_PX) return;
      setHidden(dy > 0 && y > TOP_ZONE_PX);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setHidden(false), REAPPEAR_MS);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [disabled]);

  return hidden;
}
