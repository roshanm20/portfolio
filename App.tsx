import React, { Suspense, useEffect, useState } from 'react';
import { PageReadyProvider, usePageReady } from './lib/pageReady';
import { LenisProvider } from './lib/lenis';
import Splash from './components/Splash';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Approach from './components/Approach';
import Leadership from './components/Leadership';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Research from './components/Research';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProgressiveBlur from './components/ProgressiveBlur';

// Lazy: keeps the Gemini SDK, react-markdown and KaTeX out of the initial bundle.
const ChatWidget = React.lazy(() => import('./components/ChatWidget'));

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
const IDLE_FALLBACK_MS = 2500;
/** Let the splash curtain finish its 0.75s wipe before looking for idle time. */
const AFTER_READY_MS = 800;

/**
 * True on the first user interaction, or once the page is idle after load and
 * the splash has gone (requestIdleCallback with a 2.5s timeout, or a 2.5s timer
 * where it is unsupported), whichever comes first. Keeps the chat chunk from
 * competing with the hero and the splash for bandwidth and main-thread time.
 */
function useDeferredMount(): boolean {
  const pageReady = usePageReady();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) return;
    const fire = () => setReady(true);
    INTERACTION_EVENTS.forEach((ev) => window.addEventListener(ev, fire, { once: true, passive: true }));
    return () => INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, fire));
  }, [ready]);
  useEffect(() => {
    if (ready || !pageReady) return;
    let idleId: number | undefined;
    let timerId: number | undefined;
    let delayId: number | undefined;
    const fire = () => setReady(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(fire, { timeout: IDLE_FALLBACK_MS });
      else timerId = window.setTimeout(fire, IDLE_FALLBACK_MS);
    };
    const afterLoad = () => {
      delayId = window.setTimeout(schedule, AFTER_READY_MS);
    };
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });
    return () => {
      window.removeEventListener('load', afterLoad);
      if (delayId !== undefined) window.clearTimeout(delayId);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [ready, pageReady]);
  return ready;
}

/** Mounts the lazy chat chunk only once useDeferredMount says so. */
const DeferredChat: React.FC = () => {
  const show = useDeferredMount();
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <PageReadyProvider>
      <LenisProvider>
        <div id="top" className="relative min-h-screen overflow-x-clip bg-page text-ink">
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <Splash />
          <Nav />

          <main id="main" tabIndex={-1}>
            <Hero />
            <Experience />
            <Approach />
            <Leadership />
            <BentoGrid />
            <Projects />
            <Research />
            <Achievements />
            <Contact />
          </main>

          <Footer />
          <DeferredChat />
          <ProgressiveBlur />
        </div>
      </LenisProvider>
    </PageReadyProvider>
  );
};

export default App;
