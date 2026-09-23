import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileMenuOpen(false);
    
    // If it's a mailto link (legacy check), just let the default behavior happen
    if (id.startsWith('mailto:')) {
      return; 
    }

    e.preventDefault();
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Strip the '#' if present to find the ID
    const targetId = id.startsWith('#') ? id.substring(1) : id;
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const links = [
    { name: 'Experience', href: '#experience' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-nothing-black/90 backdrop-blur-md border-b border-nothing-gray py-3 md:py-2' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-[60]">
        {/* Logo */}
        <a 
          href="#"
          onClick={(e) => handleNavClick(e, 'top')}
          className="flex flex-col justify-center group cursor-pointer"
        >
          <span className="font-mono text-[10px] md:text-xs tracking-[0.6em] text-nothing-light group-hover:text-nothing-white transition-colors pl-0.5">
            MUHAMMED
          </span>
          <div className="flex items-baseline leading-[0.8]">
            <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-nothing-white group-hover:text-nothing-red transition-colors">
              ROSHAN
            </span>
            <span className="font-sans text-3xl md:text-4xl font-bold text-nothing-red ml-1 transform translate-y-0.5">
              M
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono text-xs uppercase tracking-widest text-nothing-light hover:text-nothing-white hover:line-through decoration-nothing-red decoration-2 transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
           <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="font-mono text-xs bg-nothing-white text-nothing-black px-5 py-2.5 hover:bg-nothing-red hover:text-white transition-colors cursor-pointer font-bold tracking-wide"
          >
            CONTACT
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-nothing-white p-2 cursor-pointer hover:text-nothing-red transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 w-screen h-screen bg-nothing-black/95 backdrop-blur-xl z-[55] flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${
          mobileMenuOpen 
            ? 'opacity-100 visible pointer-events-auto' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-dot-pattern bg-dot-size opacity-20 pointer-events-none"></div>
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono text-3xl uppercase tracking-widest text-nothing-white hover:text-nothing-red transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="relative z-10 font-mono text-lg border-2 border-nothing-gray px-12 py-4 text-nothing-red mt-8 cursor-pointer hover:bg-nothing-white hover:text-nothing-black hover:border-nothing-white transition-colors font-bold tracking-wider"
        >
          CONTACT ME
        </a>
      </div>
    </nav>
  );
};

export default Nav;