import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SPLASH_KEY = 'rm-splash-seen';
/** Skip the splash when the app mounts later than this after navigation. */
const SLOW_MOUNT_MS = 1200;

let splashDecision: boolean | null = null;

/**
 * Whether the brand splash should play on this page load. Decided once per
 * load: never under reduced motion, and only once per browser session.
 */
export function shouldShowSplash(): boolean {
  if (splashDecision !== null) return splashDecision;
  if (typeof window === 'undefined') return (splashDecision = false);
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return (splashDecision = false);
  } catch {
    /* ignore */
  }
  // Slow device or network: the app mounted late, so do not add a curtain on
  // top of an already long wait. Show the page straight away instead.
  try {
    if (typeof performance !== 'undefined' && performance.now() > SLOW_MOUNT_MS) return (splashDecision = false);
  } catch {
    /* ignore */
  }
  let seen = false;
  try {
    seen = window.sessionStorage.getItem(SPLASH_KEY) === '1';
    window.sessionStorage.setItem(SPLASH_KEY, '1');
  } catch {
    /* storage blocked: still show it, it is short */
  }
  return (splashDecision = !seen);
}

interface PageReadyValue {
  /** True once the splash curtain starts leaving (or immediately when skipped). */
  ready: boolean;
  /** Whether the splash is part of this load. */
  showSplash: boolean;
  /** Called by the splash when its exit begins. */
  markReady: () => void;
}

const PageReadyContext = createContext<PageReadyValue>({
  ready: true,
  showSplash: false,
  markReady: () => {},
});

export const PageReadyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash] = useState(shouldShowSplash);
  const [ready, setReady] = useState(!showSplash);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, showSplash, markReady }), [ready, showSplash, markReady]);
  return <PageReadyContext.Provider value={value}>{children}</PageReadyContext.Provider>;
};

/** Boolean: start hero/load animations when this becomes true. */
export function usePageReady(): boolean {
  return useContext(PageReadyContext).ready;
}

export function usePageReadyContext(): PageReadyValue {
  return useContext(PageReadyContext);
}
