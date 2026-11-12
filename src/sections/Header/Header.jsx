import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../components/navigation/Navigation';
import MobileDrawer from '../../components/navigation/MobileDrawer';
import ThemeToggle from '../../components/common/ThemeToggle';
import { headerBrand, navLinks } from '../../data/navigation';
import { instagramConfig } from '../../data/collaborators';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';

function BrandLogo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
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
          GSMC &amp; KEMH, Mumbai
        </span>
      </div>
    </Link>
  );
}

function ScrollProgressBar({ progress }) {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent pointer-events-none overflow-hidden">
      <div
        className="h-full bg-[#536F91] dark:bg-[#F14666] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const normalizedPath = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  const isHomePage = normalizedPath === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close mobile navigation whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
  }, [pathname]);

  // Support Escape key for home floating dropdown (MobileDrawer manages its own listener on other pages)
  useEffect(() => {
    if (!isHomePage || !mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHomePage, mobileMenuOpen]);

  // Non-floating original header for all non-home pages
  if (!isHomePage) {
    return (
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300
          ${scrolled
            ? 'bg-[#F6F9FC]/95 dark:bg-[#252629]/95 backdrop-blur-md border-[#829DBB]/35 dark:border-[#3B3D41] shadow-[0_4px_20px_rgba(29,52,79,0.08)]'
            : 'bg-[#F6F9FC]/88 dark:bg-[#252629]/88 backdrop-blur-sm border-[#829DBB]/25 dark:border-[#3B3D41]'
          } text-[var(--ink)]`}
      >
        <div className="wrap flex items-center justify-between h-[72px] gap-2 sm:gap-4">
          <BrandLogo onClick={() => setMobileMenuOpen(false)} />

          <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
            <Navigation />
            <ThemeToggle />

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

        <ScrollProgressBar progress={scrollProgress} />

        <MobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>
    );
  }

  // Floating header with smooth downward-expanding mobile menu on Home page
  return (
    <>
      {/* Translucent backdrop behind the floating header when menu is expanded */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden touch-none"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Flow spacer on mobile/tablet while header uses fixed positioning so menu always opens cleanly at any scroll position */}
      <div className="h-[82px] md:h-[72px] lg:hidden flex-shrink-0" aria-hidden="true" />

      {/* Header: fixed below lg (guarantees menu always opens even when scrolled down), sticky on desktop lg+ */}
      <header className="fixed top-2.5 left-3 right-3 md:top-0 md:left-0 md:right-0 lg:sticky lg:top-0 lg:left-auto lg:right-auto z-50 h-[64px] md:h-[72px] text-[var(--ink)]">
        <div
          className={`w-full rounded-3xl ${
            mobileMenuOpen ? 'md:rounded-b-3xl lg:rounded-none' : 'md:rounded-none'
          } border md:border-x-0 md:border-t-0 md:border-b overflow-hidden transition-[background-color,border-color,box-shadow,border-radius] duration-300
            ${
              scrolled || mobileMenuOpen
                ? 'bg-[#F6F9FC]/95 dark:bg-[#252629]/95 backdrop-blur-md border-[#829DBB]/45 dark:border-[#3B3D41] shadow-[0_14px_34px_rgba(29,52,79,0.16)] md:shadow-[0_4px_20px_rgba(29,52,79,0.08)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.55)]'
                : 'bg-[#F6F9FC]/90 dark:bg-[#252629]/90 backdrop-blur-md border-[#829DBB]/35 dark:border-[#3B3D41] shadow-[0_6px_20px_rgba(29,52,79,0.08)] md:shadow-none dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)] md:dark:shadow-none'
            }`}
        >
          {/* Top Bar Row */}
          <div className="relative w-full px-4 sm:px-5 md:w-[min(1200px,100%-40px)] md:mx-auto md:px-0 flex items-center justify-between h-[64px] md:h-[72px] gap-2 sm:gap-4">
            <BrandLogo onClick={() => setMobileMenuOpen(false)} />

            {/* Right Action Group: Desktop Navigation + Theme Toggle + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
              <Navigation />
              <ThemeToggle />

              {/* Mobile Hamburger / Close Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full text-[#1D344F] dark:text-[#F2F0ED] bg-transparent hover:bg-[#D4E1EF]/50 dark:hover:bg-[#323438] transition-colors flex-shrink-0 cursor-pointer focus-visible:outline-none"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close-icon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <X className="w-6 h-6" strokeWidth={2.35} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu-icon"
                      initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <Menu className="w-6 h-6" strokeWidth={2.35} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {!mobileMenuOpen && <ScrollProgressBar progress={scrollProgress} />}
          </div>

          {/* Smooth Downward-Expanding Dropdown Menu directly attached inside the Floating Header */}
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-dropdown"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden border-t border-[#829DBB]/25 dark:border-[#3B3D41]"
              >
                <div className="px-4 sm:px-5 pt-3 pb-4 max-h-[calc(100dvh-96px)] overflow-y-auto no-scrollbar">
                  <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.025 * idx, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <NavLink
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block w-full px-4 py-2 sm:py-2.5 rounded-full font-heading font-extrabold text-[15px] sm:text-base tracking-wider uppercase text-left transition-all duration-200 ${
                              isActive
                                ? 'text-white bg-[#1D344F] dark:bg-[#F14666] shadow-sm'
                                : 'text-[#1D344F] dark:text-[#F2F0ED] hover:text-[#536F91] dark:hover:text-[#F14666] hover:bg-[#D4E1EF]/60 dark:hover:bg-[#323438]'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Bottom Info inside Floating Menu */}
                  <div className="pt-3 mt-3 border-t border-[#829DBB]/25 dark:border-[#3B3D41] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#536F91] dark:text-[#898A89] font-medium">
                      Seth GSMC &amp; KEMH, Mumbai
                    </span>
                    <a
                      href={instagramConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold
                                 text-[#1D344F] dark:text-[#F14666] hover:text-[#536F91] dark:hover:text-[#EE9590] transition-colors"
                    >
                      <span>{instagramConfig.handle}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
