import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, X } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { useLenis } from '../lib/lenis';
import { menuBackdrop, menuItem, menuPanel, useReducedMotionSafe } from '../lib/motion';

const links = [
  { name: 'Experience', href: '#experience' },
  { name: 'How I Work', href: '#approach' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Contact', href: '#contact' },
];

const contactLinks = [
  { name: 'Email', href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, external: false },
  { name: 'LinkedIn', href: PERSONAL_INFO.linkedin, icon: Linkedin, external: true },
  { name: 'GitHub', href: PERSONAL_INFO.github, icon: Github, external: true },
  { name: 'CV', href: PERSONAL_INFO.cv, icon: Download, external: true },
];

const TextRoll: React.FC<{ children: string }> = ({ children }) => (
  <span className="text-roll">
    <span className="text-roll__a">{children}</span>
    <span className="text-roll__b" aria-hidden="true">
      {children}
    </span>
  </span>
);

const MENU_ID = 'site-menu';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { scrollTo, stop, start } = useLenis();
  const reduced = useReducedMotionSafe();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const restoreFocusRef = useRef(true);
  const wasOpenRef = useRef(false);

  const close = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }, []);

  // Scroll lock + focus management
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      stop();
      const id = window.requestAnimationFrame(() => firstLinkRef.current?.focus({ preventScroll: true }));
      return () => window.cancelAnimationFrame(id);
    }
    start();
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    if (restoreFocusRef.current && document.activeElement !== toggleRef.current) {
      // Only pull focus back if it was inside the (now closed) menu.
      if (!document.activeElement || document.activeElement === document.body || panelRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus({ preventScroll: true });
      }
    }
    restoreFocusRef.current = true;
  }, [open, stop, start]);

  // Esc to close, Tab trapped inside the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasOpen = open;
    if (wasOpen) {
      restoreFocusRef.current = false;
      setOpen(false);
      start();
    }
    scrollTo(href);
    // Move keyboard focus to the destination for screen-reader / keyboard users.
    const target = href === '#top' ? document.getElementById('main') : document.getElementById(href.slice(1));
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[57px] border-b border-line bg-surface">
        <div className="container-x flex h-full items-center justify-between px-6 md:px-8">
          <a
            href="#top"
            onClick={(e) => goTo(e, '#top')}
            className="wordmark flex items-center gap-1 rounded-md text-ink"
            aria-label="Muhammed Roshan M, back to top"
          >
            Roshan M
          </a>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="#contact"
              onClick={(e) => goTo(e, '#contact')}
              className="btn-primary roll-trigger hidden min-h-0 px-4 py-2.5 text-sm md:inline-flex"
            >
              <TextRoll>Contact</TextRoll>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="group -mr-2.5 flex h-11 w-14 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-md"
            >
              <span className="block h-[2px] w-9 bg-ink transition-transform duration-300 ease-out-cubic group-hover:translate-x-[-3px]" />
              <span className="block h-[2px] w-9 bg-ink transition-transform duration-300 ease-out-cubic group-hover:translate-x-[3px]" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="menu-backdrop"
              className="fixed inset-0 z-[101] bg-black/30 backdrop-blur-[15px]"
              variants={menuBackdrop}
              initial={reduced ? false : 'closed'}
              animate="open"
              exit={reduced ? undefined : 'closed'}
              onClick={() => close()}
              aria-hidden="true"
            />
            <motion.div
              key="menu-wrap"
              initial={reduced ? false : 'closed'}
              animate="open"
              exit={reduced ? undefined : 'closed'}
              className="pointer-events-none fixed right-0 top-0 z-[101] w-full p-3 md:w-[36rem] lg:w-[50vw] lg:max-w-[48rem]"
            >
              <motion.div
                key="menu-panel"
                id={MENU_ID}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                data-lenis-prevent
                className="pointer-events-auto relative max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[20px] bg-surface p-6 pt-20 md:rounded-panel md:p-9 md:pt-24"
                style={{ transformOrigin: '100% 0%' }}
                variants={menuPanel}
              >
                <motion.button
                  type="button"
                  variants={menuItem}
                  onClick={() => close()}
                  aria-label="Close menu"
                  className="absolute right-4 top-4 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-chip text-ink transition-transform duration-200 hover:scale-90 md:h-16 md:w-16"
                >
                  <X size={22} strokeWidth={1.75} />
                </motion.button>

                <nav aria-label="Sections">
                  <ul className="flex flex-col">
                    {links.map((link, i) => (
                      <motion.li key={link.href} variants={menuItem}>
                        <a
                          ref={i === 0 ? firstLinkRef : undefined}
                          href={link.href}
                          onClick={(e) => goTo(e, link.href)}
                          className="roll-trigger menu-link group -mx-2 flex items-center justify-between gap-4 rounded-md px-2 py-1 text-[1.875rem] font-medium leading-[1.15] tracking-[-0.04em] text-ink md:text-[2.25rem]"
                        >
                          <TextRoll>{link.name}</TextRoll>
                          <ArrowUpRight
                            size={20}
                            aria-hidden="true"
                            className="text-subtle opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 group-focus-visible:opacity-100"
                          />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div variants={menuItem} className="navy-card navy-card--1 navy-card--static on-navy mt-8 p-6 md:p-7">
                  <p className="flex items-center gap-1.5 text-lg font-medium text-paper">
                    Contact <ArrowUpRight size={18} aria-hidden="true" />
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="mt-2 block break-all text-sm text-paper/70 underline-offset-4 hover:text-paper hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {contactLinks.map(({ name, href, icon: Icon, external }) => (
                      <li key={name}>
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          className="btn-ghost-paper w-full px-3 text-sm"
                        >
                          <Icon size={16} aria-hidden="true" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
