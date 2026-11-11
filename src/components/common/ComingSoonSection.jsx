import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import BrainWatermark from '../animations/BrainWatermark';
import MobilePageHero from './MobilePageHero';

/**
 * Reusable centered Coming Soon announcement page layout for unfinalized sections.
 */
export default function ComingSoonSection({
  mobileTitle,
  eyebrow,
  subtitle = 'Details will be revealed soon. Stay tuned!',
}) {
  const reduced = useReducedMotion();

  return (
    <div className="pt-0 pb-16 md:py-20 relative min-h-[calc(100vh-140px)] flex flex-col">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title={mobileTitle} />

      <div className="wrap relative z-10 flex-1 flex flex-col">
        {/* Desktop Back Link */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] transition-colors mb-8 group self-start"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Centered Announcement Card */}
        <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl rounded-3xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] px-6 py-12 sm:px-10 sm:py-16 text-center shadow-sm relative overflow-hidden"
          >
            {/* Subtle Ambient Accent Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[var(--accent-blue)]/10 dark:bg-[#F14666]/10 blur-3xl"
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-[#F8FBFE] dark:bg-[#323438] text-[#536F91] dark:text-[#EE9590] border border-[#829DBB]/40 dark:border-[#3B3D41] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </span>

              {/* Subtle Animated Clock Icon */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl bg-[#1D344F] dark:bg-[#252629] border border-[#536F91]/40 dark:border-[#3B3D41] text-white dark:text-[#EE9590] flex items-center justify-center shadow-sm mb-6"
              >
                <Clock className="w-6 h-6" />
              </motion.div>

              {/* Main Title */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#1D344F] dark:text-[#F2F0ED] tracking-tight leading-tight mb-3">
                Coming{' '}
                <span
                  className="italic font-normal text-[var(--accent-crimson)] dark:text-[#F14666]"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Soon
                </span>
              </h1>

              {/* Supporting Line */}
              <p className="text-sm sm:text-base text-[#536F91] dark:text-[#B5B3B0] max-w-sm leading-relaxed mb-8">
                {subtitle}
              </p>

              {/* Return Action */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Homepage</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

