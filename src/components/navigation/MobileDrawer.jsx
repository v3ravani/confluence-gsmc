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

          {/* Top-Down Mobile Drawer Panel */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 w-full h-auto max-h-[82dvh]
                       bg-[#F6F9FC] dark:bg-[#252629] border-b border-[#829DBB]/40 dark:border-[#3B3D41] rounded-b-3xl
                       px-5 py-4 sm:px-6 sm:py-5 flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar text-[#1D344F] dark:text-[#F2F0ED]"
          >
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={gsmcCrest}
                    alt="Seth GSMC & KEMH Logo"
                    className="w-8 h-8 object-contain object-center drop-shadow-xs"
                  />
                  <div>
                    <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-sm sm:text-base leading-none">
                      {headerBrand.title}
                    </h3>
                    <span className="text-[9.5px] text-[#536F91] dark:text-[#898A89] uppercase tracking-wider block mt-0.5 font-semibold">
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
                    className="p-1.5 rounded-full text-[#1D344F]/80 dark:text-[#F2F0ED]/80 hover:text-[#1D344F] dark:hover:text-[#F2F0ED]
                               hover:bg-[#D4E1EF]/65 dark:hover:bg-[#323438] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Nav links: Slightly larger text with comfortable spacing between items */}
              <nav className="flex flex-col gap-1.5 sm:gap-2 mt-3.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `w-full px-4 py-2 sm:py-2.5 rounded-full font-heading font-extrabold text-[15px] sm:text-base tracking-wider uppercase text-left transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-[#1D344F] dark:bg-[#F14666] shadow-sm'
                          : 'text-[#1D344F] dark:text-[#F2F0ED] hover:text-[#536F91] dark:hover:text-[#F14666] hover:bg-[#D4E1EF]/60 dark:hover:bg-[#323438]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-3 mt-3 border-t border-[#829DBB]/30 dark:border-[#3B3D41] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#536F91] dark:text-[#898A89] font-medium">
                Seth GSMC &amp; KEMH, Mumbai
              </span>
              <a
                href="https://www.instagram.com/confluencegsmc?srtk=MTZmZjA2azczaWVqeA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold
                           text-[#1D344F] dark:text-[#F14666] hover:text-[#536F91] dark:hover:text-[#EE9590] transition-colors"
              >
                <span>@confluencegsmc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
