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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080d14]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[290px] sm:max-w-xs
                       bg-[#162030] border-l border-[rgba(196,216,232,0.18)]
                       p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(196,216,232,0.12)]">
                <div className="flex items-center gap-3">
                  <img
                    src={gsmcCrest}
                    alt="Seth GSMC & KEMH Logo"
                    className="w-10 h-10 object-contain drop-shadow"
                  />
                  <div>
                    <h3 className="font-heading font-extrabold text-white text-base leading-none">
                      {headerBrand.title}
                    </h3>
                    <span className="text-[10px] text-[var(--dusty-400)] uppercase tracking-wider block mt-1 font-semibold">
                      GSMC & KEMH, Mumbai
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 rounded-full text-white/70 hover:text-white
                             hover:bg-[rgba(74,106,138,0.20)] transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1.5 mt-6" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-[var(--dusty-600)] shadow-md'
                          : 'text-[var(--dusty-200)] hover:text-white hover:bg-[rgba(74,106,138,0.18)]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[rgba(196,216,232,0.10)]">
              <p className="text-xs text-[var(--muted)] mb-3 leading-relaxed">
                Seth GS Medical College & King Edward VII Memorial Hospital,<br />
                Parel, Mumbai — 400012
              </p>
              <a
                href="https://www.instagram.com/confluence_gsmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold
                           text-[var(--dusty-400)] hover:text-white transition-colors"
              >
                <span>Follow on Instagram</span>
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
