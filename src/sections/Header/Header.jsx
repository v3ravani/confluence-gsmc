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
      className={`sticky top-0 z-50 border-b transition-all duration-300
        ${scrolled
          ? 'bg-[#0f1824]/92 backdrop-blur-md border-[rgba(196,216,232,0.14)] shadow-[0_4px_24px_rgba(15,24,36,0.50)]'
          : 'bg-[#162030]/80 backdrop-blur-sm border-[rgba(196,216,232,0.10)]'
        } text-white`}
    >
      <div className="wrap flex items-center justify-between h-[72px] gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group select-none flex-shrink-0"
          aria-label="CONFLUENCE 2026 — Home"
        >
          <img
            src={gsmcCrest}
            alt="Seth GS Medical College & KEM Hospital Crest"
            className="w-11 h-11 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
                       group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col leading-tight">
            <b className="font-heading font-extrabold text-[17px] tracking-tight text-white
                          group-hover:text-[var(--dusty-200)] transition-colors">
              {headerBrand.title}
            </b>
            <span className="font-body font-medium text-[9.5px] sm:text-[10.5px]
                             tracking-[0.14em] text-[var(--dusty-400)] uppercase mt-0.5">
              {headerBrand.collegeLine1}
            </span>
            <span className="font-body font-medium text-[9px] sm:text-[10px]
                             tracking-[0.12em] text-[var(--dusty-400)]/80 uppercase">
              {headerBrand.collegeLine2}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white
                     hover:bg-[rgba(74,106,138,0.20)] transition-colors focus-visible:outline-none"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
