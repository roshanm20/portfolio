import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { cancelFrame, frame } from 'framer-motion';

type ScrollTarget = number | string | HTMLElement;
interface ScrollOptions {
  /**
   * Pixel offset applied to the target. Defaults to an offset that lands the
   * section's first line (after its top padding) ANCHOR_GAP px below the nav.
   */
  offset?: number;
  /** Jump without animating. */
  immediate?: boolean;
}

export interface LenisApi {
  /** The Lenis instance, or null when smooth scroll is inactive (reduced motion / SSR). */
  lenis: Lenis | null;
  /**
   * Scroll to a number, an element, an element id ("contact") or a selector ("#contact").
   * Falls back to native scrolling when Lenis is inactive.
   */
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  /** Lock page scroll (used while the menu is open). */
  stop: () => void;
  /** Unlock page scroll. */
  start: () => void;
}

/** Fixed nav height (px) and the breathing room wanted under it. */
const NAV_H = 57;
const ANCHOR_GAP = 28;

/**
 * Sections carry their own top padding (--section-y). Skip it so the eyebrow /
 * title lands ANCHOR_GAP px under the nav instead of a padding's worth lower.
 */
function defaultOffset(el: HTMLElement): number {
  const pad = Number.parseFloat(getComputedStyle(el).paddingTop) || 0;
  return pad - (NAV_H + ANCHOR_GAP);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resolveTarget(target: ScrollTarget): number | HTMLElement | null {
  if (typeof target === 'number' || target instanceof HTMLElement) return target;
  if (target === '#' || target === '#top' || target === 'top') return 0;
  const id = target.startsWith('#') ? target.slice(1) : target;
  return document.getElementById(id);
}

function nativeScroll(target: ScrollTarget, options?: ScrollOptions) {
  const resolved = resolveTarget(target);
  if (resolved === null) return;
  const behavior: ScrollBehavior = options?.immediate || prefersReducedMotion() ? 'auto' : 'smooth';
  const top =
    typeof resolved === 'number'
      ? resolved
      : resolved.getBoundingClientRect().top + window.scrollY + (options?.offset ?? defaultOffset(resolved));
  window.scrollTo({ top: Math.max(0, top), behavior });
}

const LenisContext = createContext<LenisApi>({
  lenis: null,
  scrollTo: nativeScroll,
  stop: () => {},
  start: () => {},
});

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [reduced, setReduced] = useState<boolean>(prefersReducedMotion);
  const lockedRef = useRef(false);

  // Track the reduced-motion preference live.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setLenis(null);
      return;
    }
    const instance = new Lenis({ duration: 1.1, autoRaf: false, anchors: false });
    // Drive Lenis from framer-motion's frame loop so both share one rAF.
    const update = ({ timestamp }: { timestamp: number }) => instance.raf(timestamp);
    frame.update(update, true);
    setLenis(instance);
    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: ScrollOptions) => {
      if (!lenis) {
        nativeScroll(target, options);
        return;
      }
      const resolved = resolveTarget(target);
      if (resolved === null) return;
      lenis.scrollTo(resolved, {
        offset: typeof resolved === 'number' ? 0 : options?.offset ?? defaultOffset(resolved),
        immediate: options?.immediate,
        force: true,
      });
    },
    [lenis],
  );

  const stop = useCallback(() => {
    lockedRef.current = true;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = 'hidden';
  }, [lenis]);

  const start = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    if (lenis) lenis.start();
    document.documentElement.style.overflow = '';
  }, [lenis]);

  const value = useMemo<LenisApi>(() => ({ lenis, scrollTo, stop, start }), [lenis, scrollTo, stop, start]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
};

export function useLenis(): LenisApi {
  return useContext(LenisContext);
}
