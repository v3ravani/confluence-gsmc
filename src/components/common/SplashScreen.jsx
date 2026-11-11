import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import heroBulbColored from '../../assets/logos/hero_bulb_colored.png';
import heroDnaColored from '../../assets/logos/hero_dna_colored.png';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';

export default function SplashScreen({ onComplete, duration = 3200 }) {
  const [dismissed, setDismissed] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Lock scroll during splash screen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [duration]);

  const handleComplete = () => {
    if (!dismissed) {
      setDismissed(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <motion.aside
      aria-label="Welcome to CONFLUENCE 2026"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden cursor-default pointer-events-auto"
      onClick={handleComplete}
    >
      {/* 1. Full-Page Base Color Transition: starts slightly warm/dim and smoothly brightens to luminous canvas */}
      <motion.div
        aria-hidden="true"
        initial={{ backgroundColor: isDark ? '#161719' : '#e8e0d0' }}
        animate={{ backgroundColor: isDark ? '#202124' : '#f7f4ee' }}
        transition={{ duration: 2.8, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 2. Full-Page Light Illumination: radiant bloom that floods the ENTIRE viewport (no harsh circular edges) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.45, 0.85, 1] }}
        transition={{ duration: 2.8, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 42%, rgba(241, 70, 102, 0.28) 0%, rgba(238, 149, 144, 0.14) 40%, rgba(32, 33, 36, 0.05) 75%, transparent 100%)'
            : 'radial-gradient(circle at 50% 42%, rgba(226, 185, 111, 0.48) 0%, rgba(226, 185, 111, 0.25) 40%, rgba(247, 244, 238, 0.05) 75%, transparent 100%)',
        }}
      />

      {/* Secondary ambient soft fill covering all 4 corners */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.55, 0.7] }}
        transition={{ duration: 2.8, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(241, 70, 102, 0.08) 0%, rgba(32, 33, 36, 0) 50%, rgba(241, 70, 102, 0.08) 100%)'
            : 'linear-gradient(180deg, rgba(226, 185, 111, 0.15) 0%, rgba(247, 244, 238, 0) 50%, rgba(226, 185, 111, 0.12) 100%)',
        }}
      />

      {/* 3. Outer Rotating DNA Ring + Illuminated Bulb */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center mb-6 sm:mb-7">
        {/* Gently Rotating DNA Ring */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.85, rotate: 180 }}
          transition={{
            opacity: { duration: 0.9, ease: 'easeOut' },
            rotate: { duration: 9, ease: 'linear', repeat: Infinity },
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src={heroDnaColored}
            alt="CONFLUENCE DNA Ring"
            className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(167,123,72,0.20)]"
          />
        </motion.div>

        {/* The Bulb — Brightness slowly illuminates and radiates out */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            filter: 'brightness(0.50) drop-shadow(0 0 0px rgba(226, 185, 111, 0))',
          }}
          animate={{
            opacity: 1,
            scale: [0.92, 1, 1.05],
            filter: [
              'brightness(0.50) drop-shadow(0 0 0px rgba(226, 185, 111, 0))',
              'brightness(0.85) drop-shadow(0 0 16px rgba(226, 185, 111, 0.45))',
              'brightness(1.22) drop-shadow(0 0 35px rgba(226, 185, 111, 0.95)) drop-shadow(0 0 75px rgba(226, 185, 111, 0.65))',
            ],
          }}
          transition={{
            duration: 2.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center"
        >
          <img
            src={heroBulbColored}
            alt="CONFLUENCE Bulb"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* 4. Text: CONFLUENCE 2026 — Thinner & smaller on desktop, thinner on phone */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 px-4"
      >
        <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl uppercase tracking-normal sm:tracking-tight text-[#121110] dark:text-[#F2F0ED] leading-none">
          CONFLUENCE 2026
        </h1>
      </motion.div>

      {/* 5. Logo (lil big) & 2-Line College Name stacked in separate lines */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6 relative z-10 px-6"
      >
        <img
          src={gsmcCrest}
          alt="Seth GSMC & KEMH Crest"
          className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-sm flex-shrink-0"
        />
        <div className="flex flex-col text-left leading-snug">
          <span className="text-[10px] sm:text-[11.5px] font-semibold tracking-[0.14em] text-[#6b6459] dark:text-[#B5B3B0] uppercase">
            SETH GS MEDICAL COLLEGE &amp;
          </span>
          <span className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.12em] text-[#121110] dark:text-[#F2F0ED] uppercase mt-0.5">
            KING EDWARD VII MEMORIAL HOSPITAL
          </span>
        </div>
      </motion.div>

      {/* 6. Skip button in top corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleComplete();
        }}
        aria-label="Skip splash screen"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 text-[11px] sm:text-xs font-medium text-[#8c8273] dark:text-[#B5B3B0] hover:text-[#121110] dark:hover:text-[#F2F0ED] transition-colors py-1 px-3 rounded-full bg-[#ece1cf]/60 dark:bg-[#2B2D30]/80 hover:bg-[#ece1cf] dark:hover:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]"
      >
        Skip ✕
      </button>
    </motion.aside>
  );
}
