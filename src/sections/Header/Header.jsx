import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navigation from '../../components/navigation/Navigation';
import MobileDrawer from '../../components/navigation/MobileDrawer';
import { headerBrand } from '../../data/navigation';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300
        ${scrolled
          ? 'bg-[#0f1824]/92 backdrop-blur-md border-[rgba(196,216,232,0.14)] shadow-[0_4px_24px_rgba(15,24,36,0.50)]'
          : 'bg-[#162030]/80 backdrop-blur-sm border-[rgba(196,216,232,0.10)]'
        } text-white`}
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
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
                       group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
          />
          <div className="flex flex-col leading-tight min-w-0">
            <b className="font-heading font-extrabold text-[15px] sm:text-[17px] tracking-tight text-white
                          group-hover:text-[var(--dusty-200)] transition-colors truncate">
              {headerBrand.title}
            </b>
            <span className="font-body font-medium text-[9px] sm:text-[10.5px]
                             tracking-[0.14em] text-[var(--dusty-400)] uppercase mt-0.5 truncate hidden sm:block">
              {headerBrand.collegeLine1}
            </span>
            <span className="font-body font-medium text-[8.5px] sm:text-[10px]
                             tracking-[0.12em] text-[var(--dusty-400)]/80 uppercase truncate hidden md:block">
              {headerBrand.collegeLine2}
            </span>
            <span className="font-body font-medium text-[9.5px] tracking-[0.12em] text-[var(--dusty-400)] uppercase sm:hidden truncate">
              GSMC & KEMH, Mumbai
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 rounded-xl text-white bg-[rgba(74,106,138,0.22)] hover:bg-[rgba(74,106,138,0.38)] border border-[rgba(196,216,232,0.24)] transition-all flex-shrink-0 ml-auto cursor-pointer focus-visible:outline-none"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
