import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrainWatermark from '../../components/animations/BrainWatermark';
import { conferenceInfo } from '../../data/events';
import { brochureConfig } from '../../data/navigation';

/* ── Stagger timing (subtle & calm) ─────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: Math.min(delay, 0.22), ease: [0.22, 1, 0.36, 1] },
});

/* ── Date box ───────────────────────────────────────────── */
function DateBox({ label, dates, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="flex-1 min-w-0 border border-[rgba(100,85,70,0.20)]
                 bg-[#ece1cf] hover:bg-[#f5ede1]
                 hover:border-[var(--accent-blue)]
                 transition-all duration-300 p-4 sm:p-5 group flex flex-col justify-center"
    >
      <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase
                       text-[var(--accent-blush)] mb-1.5">
        {label}
      </span>
      <p className="font-heading font-extrabold text-[#121110] text-base sm:text-lg lg:text-xl leading-tight
                    group-hover:text-[var(--accent-blue)] transition-colors">
        {dates}
      </p>
    </motion.div>
  );
}

/* ── Brochure button ────────────────────────────────────── */
function BrochureBtn({ children, fileName, url, delay }) {
  const handleClick = (e) => {
    if (!url || url.startsWith('#')) {
      e.preventDefault();
      alert(`The ${fileName} will be released with the official conference compendium.`);
    }
  };

  return (
    <motion.a
      {...fadeUp(delay)}
      href={url || '#'}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-between gap-3
                 border border-[rgba(100,85,70,0.22)]
                 bg-[#ece1cf] hover:bg-[#f5ede1]
                 hover:border-[var(--accent-blue)]
                 px-4 sm:px-5 py-3 sm:py-3.5 text-left transition-all duration-250 group rounded-xl"
    >
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="w-4 h-4 flex-shrink-0 text-[var(--accent-blue)]
                             group-hover:text-[var(--accent-blue-hover)] transition-colors" />
        <span className="text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.14em]
                         text-[#121110] group-hover:text-[var(--accent-blue)] transition-colors truncate">
          {children}
        </span>
      </div>
      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[var(--muted)]
                               group-hover:text-[var(--accent-blue)] group-hover:translate-x-0.5
                               group-hover:-translate-y-0.5 transition-all" />
    </motion.a>
  );
}

/* ── Main Hero ──────────────────────────────────────────── */
export default function Hero() {
  const scrollToBrowse = () => {
    const el = document.getElementById('browse');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative z-20 overflow-hidden text-[#121110]
                        bg-[var(--bg-canvas)]
                        pt-10 sm:pt-14 pb-16 lg:py-20 border-b border-[rgba(100,85,70,0.18)]">
      {/* Background grid mesh */}
      <div className="absolute inset-0 bg-grid-mesh pointer-events-none opacity-40" />

      {/* ── MOBILE WATERMARK: positioned at top-right behind header text ── */}
      {/* On small screens, adjusts responsively according to screen width and NEVER drops below content */}
      <div
        className="lg:hidden absolute top-4 sm:top-8 -right-6 sm:right-2
                   w-[250px] xs:w-[290px] sm:w-[360px] md:w-[420px] aspect-square
                   pointer-events-none z-0 opacity-45 sm:opacity-55"
        aria-hidden="true"
      >
        <BrainWatermark mode="hero" isMobile={true} />
      </div>

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* ── LEFT: Text hierarchy + date boxes + intro + buttons (7 cols on desktop, full width on mobile) ── */}
          <div className="lg:col-span-7 flex flex-col items-start relative z-10">

            {/* 1. CONFLUENCE — primary and most prominent heading */}
            <motion.h1
              {...fadeUp(0)}
              className="font-heading font-black uppercase tracking-tight leading-none
                         text-[clamp(44px,8.5vw,96px)] text-[#121110] mb-2"
            >
              CONFLUENCE
            </motion.h1>

            {/* 2. College Name — clean spaced caps typography hierarchy */}
            <motion.div {...fadeUp(0.16)} className="mb-4">
              <p className="font-body font-semibold tracking-[0.20em] uppercase leading-snug
                            text-[clamp(10.5px,1.2vw,14px)] text-[var(--muted)]">
                SETH GS MEDICAL COLLEGE &amp;
              </p>
              <p className="font-body font-semibold tracking-[0.20em] uppercase leading-snug
                            text-[clamp(10.5px,1.2vw,14px)] text-[var(--muted)]">
                KING EDWARD VII MEMORIAL HOSPITAL
              </p>
            </motion.div>

            {/* 3. WHERE IDEAS MEET — distinctive elegant serif italic tagline */}
            <motion.p
              {...fadeUp(0.32)}
              className="mb-8 leading-none"
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
                fontStyle:  'italic',
                fontSize:   'clamp(22px, 2.8vw, 34px)',
                color:      'var(--accent-crimson)',
                letterSpacing: '0.03em',
                fontWeight: 600,
              }}
            >
              Where Ideas Meet
            </motion.p>

            {/* 4. Date boxes — TWO rectangular boxes side by side on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-0 w-full max-w-xl mb-6 sm:mb-8
                         border border-[rgba(100,85,70,0.22)] rounded-lg overflow-hidden"
            >
              <DateBox
                label="Pre-Conference"
                dates={conferenceInfo.preConferenceDates}
                delay={0.50}
              />
              {/* Divider between the two boxes */}
              <div className="w-px bg-[rgba(100,85,70,0.22)] hidden sm:block" />
              <div className="h-px w-full bg-[rgba(100,85,70,0.22)] sm:hidden" />
              <DateBox
                label="Main Conference"
                dates={conferenceInfo.mainConferenceDates}
                delay={0.56}
              />
            </motion.div>

            {/* Mobile brochure buttons (visible on < lg only, neatly tucked below date boxes) */}
            <div className="lg:hidden w-full max-w-xl flex flex-col sm:flex-row gap-2.5 mb-8">
              <BrochureBtn
                fileName={brochureConfig.eventBrochureFileName}
                url={brochureConfig.eventBrochureUrl}
                delay={0.60}
              >
                VIEW EVENT BROCHURE
              </BrochureBtn>

              <BrochureBtn
                fileName={brochureConfig.workshopBrochureFileName}
                url={brochureConfig.workshopBrochureUrl}
                delay={0.66}
              >
                VIEW WORKSHOP BROCHURE
              </BrochureBtn>
            </div>

            {/* 5. CONFLUENCE Introduction — revised shortened description */}
            <motion.div
              {...fadeUp(0.68)}
              className="space-y-3.5 text-[var(--ink-2)] text-[15px] sm:text-[15.5px] leading-relaxed max-w-xl mb-8"
            >
              <p>
                Initiated in 2014, <b className="text-[#121110] font-bold">CONFLUENCE 2026</b>, organised
                by Seth GS Medical College and KEM Hospital, Mumbai, is a prestigious international
                medical and research conference. Spanning five days, it brings together aspiring medical
                professionals for academic exchange, innovation and exploration.
              </p>
              <p>
                The conference offers hands-on workshops in clinical skills and research methodologies,
                alongside competitions celebrating students' research and innovative ideas. Renowned experts
                lead talks and panel discussions, while CME programmes provide resident doctors and consultants
                with insights into the latest medical advancements.
              </p>
              <p>
                Beyond academics, CONFLUENCE features literary and recreational activities that encourage
                networking and collaboration. Embracing a hybrid format, the conference welcomes
                participants through both virtual and in-person experiences.
              </p>
              <p className="text-[#121110] font-semibold">
                CONFLUENCE 2026 is a celebration of medical knowledge, research and intellectual camaraderie.
              </p>
            </motion.div>

            {/* 6. ONLY TWO buttons below introduction: EXPLORE & ABOUT THE CONFERENCE */}
            <motion.div
              {...fadeUp(0.80)}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Button 1: EXPLORE (smoothly scrolls to Browse section) */}
              <button
                type="button"
                onClick={scrollToBrowse}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                           font-semibold text-sm text-white
                           bg-[#913433] hover:bg-[#782827]
                           shadow-[0_8px_20px_-8px_rgba(145,52,51,0.50)]
                           hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-200 cursor-pointer"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Button 2: ABOUT THE CONFERENCE (navigates to /about) */}
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full
                           font-semibold text-sm text-[#121110]
                           bg-[#ece1cf] border border-[rgba(100,85,70,0.28)]
                           hover:bg-[#f5ede1] hover:border-[var(--accent-blue)]
                           hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-200 whitespace-nowrap"
              >
                ABOUT THE CONFERENCE
              </Link>
            </motion.div>
          </div>

          {/* ── DESKTOP RIGHT COLUMN: Animated Brain Watermark + Brochure Buttons (visible on lg+ only) ── */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center gap-6 pt-2 relative z-10">
            {/* Brain Watermark: large, prominent, glowing, interactive */}
            <div className="w-full flex items-center justify-center">
              <BrainWatermark mode="hero" />
            </div>

            {/* Brochure Buttons: Vertically arranged, one below the other */}
            <div className="w-full max-w-sm flex flex-col gap-3">
              <BrochureBtn
                fileName={brochureConfig.eventBrochureFileName}
                url={brochureConfig.eventBrochureUrl}
                delay={0.48}
              >
                VIEW EVENT BROCHURE
              </BrochureBtn>

              <BrochureBtn
                fileName={brochureConfig.workshopBrochureFileName}
                url={brochureConfig.workshopBrochureUrl}
                delay={0.56}
              >
                VIEW WORKSHOP BROCHURE
              </BrochureBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
