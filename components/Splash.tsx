import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease, splashWordmark } from '../lib/motion';
import { usePageReadyContext } from '../lib/pageReady';

/** Font the wordmark is set in. */
const FONT_SPEC = '600 56px "Schibsted Grotesk"';
/** Longest we wait for the brand font before showing the wordmark anyway. */
const FONT_WAIT_MS = 200;
/** ...and never wait for it past this point after navigation (performance.now). */
const FONT_DEADLINE_MS = 650;
/** Wordmark opacity reaches 1 after this (see splashWordmark). */
const FADE_MS = 300;
/** Hold at full opacity before the curtain lifts. */
const HOLD_MS = 150;
/** Curtain wipe duration. FONT_WAIT + FADE + HOLD + EXIT <= 1.3s. */
const EXIT_S = 0.6;

/**
 * Black brand curtain shown once per session on first load. Skipped entirely
 * under prefers-reduced-motion, and on slow loads where the app mounts more
 * than 1.2s after navigation (see shouldShowSplash in lib/pageReady).
 * The exit is a clip-path wipe (bottom edge rises), so nothing changes size
 * and the page underneath never shifts.
 */
const Splash: React.FC = () => {
  const { showSplash, markReady } = usePageReadyContext();
  const [visible, setVisible] = useState(showSplash);
  const [fontsReady, setFontsReady] = useState(false);

  // Wait (briefly) for the wordmark font so it never swaps mid-animation.
  // Layout effect: the clock starts at commit, not after the first paint.
  // A font that is already available (cache) starts the fade on the first frame.
  const goAtRef = useRef(0);
  useLayoutEffect(() => {
    if (!showSplash) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      goAtRef.current = performance.now();
      setFontsReady(true);
    };
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    let cached = false;
    try {
      cached = !!fonts?.check?.(FONT_SPEC, 'Roshan M');
    } catch {
      /* ignore */
    }
    if (cached || !fonts?.load) {
      go();
      return;
    }
    // Wait at most FONT_WAIT_MS, and never past FONT_DEADLINE_MS after navigation.
    const wait = Math.max(0, Math.min(FONT_WAIT_MS, FONT_DEADLINE_MS - performance.now()));
    const t = window.setTimeout(go, wait);
    fonts.load(FONT_SPEC, 'Roshan M').then(go, go);
    return () => {
      done = true;
      window.clearTimeout(t);
    };
  }, [showSplash]);

  useEffect(() => {
    if (!showSplash || !fontsReady) return;
    // The curtain lifts HOLD_MS after the fade ends, measured from when the
    // font was ready. If the main thread stalls, the stall absorbs the hold
    // instead of adding to it, but the fade itself (anchored to the first
    // frame it animates) always completes before the curtain moves.
    let t = 0;
    const raf = window.requestAnimationFrame((frameAt) => {
      const now = performance.now();
      const exitAt = Math.max(frameAt + FADE_MS, goAtRef.current + FADE_MS + HOLD_MS);
      t = window.setTimeout(() => {
        setVisible(false);
        markReady();
      }, Math.max(0, exitAt - now));
    });
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [showSplash, fontsReady, markReady]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          aria-hidden="true"
          className="fixed inset-0 z-[102] flex items-center justify-center overflow-hidden bg-black"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            pointerEvents: 'none',
            transition: { duration: EXIT_S, ease: ease.inOutCubic },
          }}
        >
          <motion.span
            className="font-brand select-none text-white"
            style={{ fontSize: '3.5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}
            variants={splashWordmark}
            initial="hidden"
            animate={fontsReady ? 'show' : 'hidden'}
            exit={{ y: '-40%', transition: { duration: EXIT_S, ease: ease.inOutCubic } }}
          >
            Roshan M
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
