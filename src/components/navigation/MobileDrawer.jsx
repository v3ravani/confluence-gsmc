import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

          {/* Top-down Drawer Panel (Website canvas background, 1 page per line) */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 w-full max-h-[68vh]
                       bg-[#f7f1e6] border-b border-[rgba(100,85,70,0.24)] rounded-b-3xl
                       p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-[#121110]"
          >
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(100,85,70,0.18)]">
                <div className="flex items-center gap-3">
                  <img
                    src={gsmcCrest}
                    alt="Seth GSMC & KEMH Logo"
                    className="w-9 h-9 object-contain drop-shadow-xs"
                  />
                  <div>
                    <h3 className="font-heading font-extrabold text-[#121110] text-base leading-none">
                      {headerBrand.title}
                    </h3>
                    <span className="text-[10px] text-[#6b6459] uppercase tracking-wider block mt-1 font-semibold">
                      GSMC &amp; KEMH, Mumbai
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 rounded-full text-[#121110]/80 hover:text-[#121110]
                             hover:bg-[rgba(100,85,70,0.14)] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links: Exactly 1 page per line (inspired by media_1794378978362_523aa04a.png) */}
              <nav className="flex flex-col gap-1.5 mt-4 sm:mt-5" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `w-full px-5 py-3 rounded-full font-heading font-extrabold text-sm sm:text-base tracking-wider uppercase text-left transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-[#2d508a] shadow-sm'
                          : 'text-[#121110] hover:text-[#2d508a] hover:bg-[#ece1cf]/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-4 mt-4 border-t border-[rgba(100,85,70,0.18)] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#6b6459] font-medium">
                Seth GSMC &amp; KEMH, Mumbai
              </span>
              <a
                href="https://www.instagram.com/confluence_gsmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold
                           text-[#2d508a] hover:text-[#1a3158] transition-colors"
              >
                <span>@confluence_gsmc</span>
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
