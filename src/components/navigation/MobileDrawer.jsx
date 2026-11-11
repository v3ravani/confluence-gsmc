import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle';
import { navLinks, headerBrand } from '../../data/navigation';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';

export default function MobileDrawer({ isOpen, onClose }) {
  // Prevent background scrolling and handle Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Translucent Backdrop (the non-menu part below is translucent) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Compact Top-Down Mobile Drawer Panel (~50% mobile display height) */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 w-full h-auto max-h-[55dvh]
                       bg-[#f7f1e6] dark:bg-[#252629] border-b border-[rgba(100,85,70,0.24)] dark:border-[#3B3D41] rounded-b-3xl
                       px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar text-[#121110] dark:text-[#F2F0ED]"
          >
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={gsmcCrest}
                    alt="Seth GSMC & KEMH Logo"
                    className="w-8 h-8 object-contain object-center drop-shadow-xs"
                  />
                  <div>
                    <h3 className="font-heading font-extrabold text-[#121110] dark:text-[#F2F0ED] text-sm sm:text-base leading-none">
                      {headerBrand.title}
                    </h3>
                    <span className="text-[9.5px] text-[#6b6459] dark:text-[#898A89] uppercase tracking-wider block mt-0.5 font-semibold">
                      GSMC &amp; KEMH, Mumbai
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="p-1.5 rounded-full text-[#121110]/80 dark:text-[#F2F0ED]/80 hover:text-[#121110] dark:hover:text-[#F2F0ED]
                               hover:bg-[rgba(100,85,70,0.14)] dark:hover:bg-[#323438] transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Nav links: Exactly 1 page per line, compactly fitted within ~50% height */}
              <nav className="flex flex-col gap-0.5 mt-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `w-full px-4 py-1.5 rounded-full font-heading font-extrabold text-[13px] sm:text-sm tracking-wider uppercase text-left transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-[#2d508a] dark:bg-[#F14666] shadow-sm'
                          : 'text-[#121110] dark:text-[#F2F0ED] hover:text-[#2d508a] dark:hover:text-[#F14666] hover:bg-[#ece1cf]/80 dark:hover:bg-[#323438]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-2.5 mt-2 border-t border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] flex items-center justify-between text-xs">
              <span className="text-[10.5px] text-[#6b6459] dark:text-[#898A89] font-medium">
                Seth GSMC &amp; KEMH, Mumbai
              </span>
              <a
                href="https://www.instagram.com/confluence_gsmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold
                           text-[#2d508a] dark:text-[#F14666] hover:text-[#1a3158] dark:hover:text-[#EE9590] transition-colors"
              >
                <span>@confluence_gsmc</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
