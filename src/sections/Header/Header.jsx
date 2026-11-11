import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Navigation from '../../components/navigation/Navigation';
import MobileDrawer from '../../components/navigation/MobileDrawer';
import ThemeToggle from '../../components/common/ThemeToggle';
import { headerBrand } from '../../data/navigation';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300
        ${scrolled
          ? 'bg-[#F6F9FC]/95 backdrop-blur-md border-[#829DBB]/35 shadow-[0_4px_20px_rgba(29,52,79,0.08)]'
          : 'bg-[#F6F9FC]/88 backdrop-blur-sm border-[#829DBB]/25'
        } text-[var(--ink)]`}
    >
      <div className="wrap flex items-center justify-between h-[72px] gap-2 sm:gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 group select-none min-w-0"
          aria-label="CONFLUENCE 2026 — Home"
        >
          <img
            src={gsmcCrest}
            alt="Seth GS Medical College & KEM Hospital Crest"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_2px_8px_rgba(29,52,79,0.14)]
                       group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
          />
          <div className="flex flex-col leading-tight min-w-0">
            <b className="font-heading font-extrabold text-[15px] sm:text-[17px] tracking-tight text-[#1D344F] dark:text-[#F2F0ED]
                          group-hover:text-[var(--accent-blue)] transition-colors truncate">
              {headerBrand.title}
            </b>
            <span className="font-body font-medium text-[9px] sm:text-[10.5px]
                             tracking-[0.14em] text-[var(--muted)] uppercase mt-0.5 truncate hidden sm:block">
              {headerBrand.collegeLine1}
            </span>
            <span className="font-body font-medium text-[8.5px] sm:text-[10px]
                             tracking-[0.12em] text-[var(--muted)]/80 uppercase truncate hidden md:block">
              {headerBrand.collegeLine2}
            </span>
            <span className="font-body font-medium text-[9.5px] tracking-[0.12em] text-[var(--muted)] uppercase sm:hidden truncate">
              GSMC & KEMH, Mumbai
            </span>
          </div>
        </Link>

        {/* Right Action Group: Desktop Navigation + Theme Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
          {/* Desktop Navigation */}
          <Navigation />

          {/* Theme Toggle (Desktop & Mobile) */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-[#1D344F] dark:text-[#F2F0ED] bg-transparent hover:opacity-75 transition-opacity flex-shrink-0 cursor-pointer focus-visible:outline-none"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6 text-[#1D344F] dark:text-[#F2F0ED]" strokeWidth={2.35} />
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator Line on Bottom Border (Slate blue ribbon accent) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent pointer-events-none overflow-hidden">
        <div
          className="h-full bg-[#536F91] dark:bg-[#F14666] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
