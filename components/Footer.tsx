import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '../lib/lenis';

/**
 * Minimal footer strip. Extra bottom padding keeps the text clear of the fixed
 * 6rem progressive blur strip (and the chat launcher) when scrolled to the end.
 */
const Footer: React.FC = () => {
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();

  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(0);
    // Return focus to the top of the page for keyboard / screen reader users.
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <footer className="gutter container-x relative z-10 pb-28 md:pb-32">
      <div className="hairline" aria-hidden="true" />
      {/* sm+: right padding keeps "Back to top" clear of the fixed chat launcher. */}
      <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pr-20 md:pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
          <span className="wordmark text-ink">Roshan M</span>
          <p className="text-sm text-subtle">
            © {year} Muhammed Roshan M
          </p>
        </div>
        <a href="#top" onClick={toTop} className="footer-top group self-start sm:self-auto">
          Back to top
          <span className="footer-top__icon" aria-hidden="true">
            <ArrowUp size={16} strokeWidth={1.75} />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
