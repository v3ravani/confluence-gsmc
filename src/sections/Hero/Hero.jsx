import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrainWatermark from '../../components/animations/BrainWatermark';
import { useTheme } from '../../context/ThemeContext';
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
      className="flex-1 min-w-0 border border-[#829DBB]/40 dark:border-[#3B3D41]
                 bg-[#EAF0F6]/90 dark:bg-[#2B2D30] hover:bg-[#D4E1EF]/80 dark:hover:bg-[#323438]
                 hover:border-[#536F91] dark:hover:border-[#F14666]
                 transition-all duration-300 p-4 sm:p-5 group flex flex-col justify-center"
    >
      <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase
                       text-[var(--accent-blush)] mb-1.5">
        {label}
      </span>
      <p className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-base sm:text-lg lg:text-xl leading-tight
                    group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors">
        {dates}
      </p>
    </motion.div>
  );
}

/* ── Brochure button ────────────────────────────────────── */
function BrochureBtn({ children, fileName, url, delay, className = '' }) {
  const hasExternalFile = Boolean(url && !url.startsWith('#'));

  const handleClick = (e) => {
    if (!hasExternalFile) {
      e.preventDefault();
      alert(`The ${fileName} will be released with the official conference compendium.`);
    }
  };

  const sharedClassName = `w-full flex items-center justify-between gap-3
                 border border-[#829DBB]/45 dark:border-[#3B3D41]
                 bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF]/85 dark:hover:bg-[#323438]
                 hover:border-[#536F91] dark:hover:border-[#F14666]
                 px-4 sm:px-5 py-3 sm:py-3.5 text-left transition-all duration-250 group rounded-xl cursor-pointer ${className}`;

  const content = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="w-4 h-4 flex-shrink-0 text-[var(--accent-blue)]
                             group-hover:text-[var(--accent-blue-hover)] transition-colors" />
        <span className="text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.14em]
                         text-[#1D344F] dark:text-[#F2F0ED] group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors truncate">
          {children}
        </span>
      </div>
      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[var(--muted)]
                               group-hover:text-[var(--accent-blue)] group-hover:translate-x-0.5
                               group-hover:-translate-y-0.5 transition-all" />
    </>
  );

  if (!hasExternalFile) {
    return (
      <motion.button
        type="button"
        {...fadeUp(delay)}
        onClick={handleClick}
        className={sharedClassName}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      {...fadeUp(delay)}
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
    >
      {content}
    </motion.a>
  );
}

const BROCHURE_BUTTONS = [
  {
    key: 'event',
    label: 'VIEW EVENT BROCHURE',
    fileName: brochureConfig.eventBrochureFileName,
    url: brochureConfig.eventBrochureUrl,
    mobileDelay: 0.60,
    desktopDelay: 0.48,
    mobileSpan: 'sm:col-span-2',
  },
  {
    key: 'workshop',
    label: 'VIEW WORKSHOP BROCHURE',
    fileName: brochureConfig.workshopBrochureFileName,
    url: brochureConfig.workshopBrochureUrl,
    mobileDelay: 0.66,
    desktopDelay: 0.54,
    mobileSpan: '',
  },
  {
    key: 'cme',
    label: 'VIEW CME BROCHURE',
    fileName: brochureConfig.cmeBrochureFileName,
    url: brochureConfig.cmeBrochureUrl,
    mobileDelay: 0.72,
    desktopDelay: 0.60,
    mobileSpan: '',
  },
];

/* ── Desktop-Only CONFLUENCE + Overlapping Hollow 2026 Lockup ── */
function DesktopHeroLockup({ isDark }) {
  const confRef = useRef(null);
  const [coords, setCoords] = useState({ yearX: 668, yearY: 115, viewW: 680 });

  useEffect(() => {
    const measure = () => {
      if (!confRef.current) return;
      try {
        const bbox = confRef.current.getBBox();
        if (bbox.width > 0) {
          // Baseline of uppercase CONFLUENCE is y=78; set yearY=115 so top of 2026 (~y=61) cleanly overlaps bottom ~17px of CONFLUENCE
          const yearX = Math.round(bbox.x + bbox.width + 44);
          setCoords({
            yearX,
            yearY: 115,
            viewW: Math.max(680, yearX + 8),
          });
        }
      } catch (e) {}
    };

    measure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
  }, []);

  const confColor = isDark ? '#F2F0ED' : '#1D344F';
  const outerStroke = isDark ? '#FFFFFF' : '#1D344F';
  const overlapStroke = isDark ? '#000000' : '#FFFFFF';

  return (
    <motion.div {...fadeUp(0)} className="hidden lg:block w-full mb-5 relative select-none">
      <h1 className="sr-only">CONFLUENCE 2026</h1>

      <svg
        viewBox={`0 0 ${coords.viewW} 124`}
        className="w-full max-w-[680px] h-auto overflow-visible block"
        aria-hidden="true"
      >
        <defs>
          <text
            id="hero-conf-text"
            ref={confRef}
            x="0"
            y="78"
            fontFamily="'Sora', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="86"
            letterSpacing="-2"
          >
            CONFLUENCE
          </text>

          <text
            id="hero-year-text"
            x={coords.yearX}
            y={coords.yearY}
            textAnchor="end"
            fontFamily="'Sora', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="74"
            letterSpacing="-1.5"
          >
            2026
          </text>

          <mask
            id="hero-overlap-mask"
            maskUnits="userSpaceOnUse"
            x="-10"
            y="-20"
            width={coords.viewW + 40}
            height="170"
          >
            <rect x="-10" y="-20" width={coords.viewW + 40} height="170" fill="black" />
            <use href="#hero-conf-text" fill="white" />
          </mask>

          <mask
            id="hero-outside-mask"
            maskUnits="userSpaceOnUse"
            x="-10"
            y="-20"
            width={coords.viewW + 40}
            height="170"
          >
            <rect x="-10" y="-20" width={coords.viewW + 40} height="170" fill="white" />
            <use href="#hero-conf-text" fill="black" />
          </mask>
        </defs>

        {/* Solid CONFLUENCE letters */}
        <use href="#hero-conf-text" fill={confColor} />

        {/* Hollow 2026 edge OUTSIDE CONFLUENCE */}
        <use
          href="#hero-year-text"
          fill="none"
          stroke={outerStroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
          mask="url(#hero-outside-mask)"
        />

        {/* Hollow 2026 edge WHERE OVERLAPPING CONFLUENCE */}
        <use
          href="#hero-year-text"
          fill="none"
          stroke={overlapStroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
          mask="url(#hero-overlap-mask)"
        />
      </svg>

      {/* College Name nested cleanly on the left underneath CONFLUENCE */}
      <div className="-mt-11 xl:-mt-12 relative z-10 max-w-[66%] select-text">
        <p className="font-body font-semibold tracking-[0.20em] uppercase leading-snug
                      text-[11px] xl:text-[13px] text-[var(--muted)]">
          SETH GS MEDICAL COLLEGE &amp;
        </p>
        <p className="font-body font-semibold tracking-[0.20em] uppercase leading-snug
                      text-[11px] xl:text-[13px] text-[var(--muted)]">
          KING EDWARD VII MEMORIAL HOSPITAL
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Hero ──────────────────────────────────────────── */
export default function Hero() {
  const { isDark } = useTheme();
  const scrollToBrowse = () => {
    const el = document.getElementById('browse');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative z-20 overflow-hidden text-[#1D344F] dark:text-[#F2F0ED]
                        bg-gradient-to-br from-[#F8FBFE] via-[#F2F6FA] to-[#EAF0F6] dark:bg-none dark:bg-[var(--bg-canvas)]
                        pt-10 sm:pt-14 pb-16 lg:py-20 border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
      {/* Background grid mesh */}
      <div className="absolute inset-0 bg-grid-mesh pointer-events-none opacity-40" />

      {/* ── MOBILE WATERMARK: positioned at top-right behind header text ── */}
      {/* On small screens, adjusts responsively according to screen width and NEVER drops below content */}
      <div
        className="lg:hidden absolute top-4 sm:top-8 -right-6 sm:right-2
                   w-[285px] xs:w-[325px] sm:w-[385px] md:w-[430px] aspect-square
                   pointer-events-none z-0 opacity-45 sm:opacity-55"
        aria-hidden="true"
      >
        <BrainWatermark mode="hero" isMobile={true} />
      </div>

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* ── LEFT: Text hierarchy + date boxes + intro + buttons (7 cols on desktop, full width on mobile) ── */}
          <div className="lg:col-span-7 flex flex-col items-start relative z-10">

            {/* Desktop Only: CONFLUENCE + Overlapping Hollow 2026 Lockup */}
            <DesktopHeroLockup isDark={isDark} />

            {/* Mobile Only: Untouched CONFLUENCE + College Name */}
            <div className="lg:hidden">
              {/* 1. CONFLUENCE — primary and most prominent heading */}
              <motion.h1
                {...fadeUp(0)}
                className="font-heading font-black uppercase tracking-tight leading-none
                           text-[clamp(44px,8.5vw,96px)] text-[#1D344F] dark:text-[#F2F0ED] mb-2"
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
            </div>

            {/* 3. WHERE IDEAS MEET — distinctive elegant serif italic tagline */}
            <motion.div
              {...fadeUp(0.32)}
              className="flex items-center gap-4 mb-8"
            >
              <p
                className="leading-none shrink-0"
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
              </p>
              <div className="h-px flex-1 max-w-[200px] bg-[#829DBB]/55 dark:bg-[#3B3D41]" aria-hidden="true" />
            </motion.div>

            {/* 4. Date boxes — TWO rectangular boxes side by side on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-0 w-full max-w-xl mb-6 sm:mb-8
                         border border-[#829DBB]/45 dark:border-[#3B3D41] rounded-lg overflow-hidden"
            >
              <DateBox
                label="Pre-Conference"
                dates={conferenceInfo.preConferenceDates}
                delay={0.50}
              />
              {/* Divider between the two boxes */}
              <div className="w-px bg-[#829DBB]/40 dark:bg-[#3B3D41] hidden sm:block" />
              <div className="h-px w-full bg-[#829DBB]/40 dark:bg-[#3B3D41] sm:hidden" />
              <DateBox
                label="Main Conference"
                dates={conferenceInfo.mainConferenceDates}
                delay={0.56}
              />
            </motion.div>

            {/* Mobile brochure buttons (visible on < lg only, neatly tucked below date boxes) */}
            <div className="lg:hidden w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {BROCHURE_BUTTONS.map((btn) => (
                <BrochureBtn
                  key={btn.key}
                  fileName={btn.fileName}
                  url={btn.url}
                  delay={btn.mobileDelay}
                  className={btn.mobileSpan}
                >
                  {btn.label}
                </BrochureBtn>
              ))}
            </div>

            {/* 5. CONFLUENCE Introduction — revised shortened description */}
            <motion.div
              {...fadeUp(0.68)}
              className="space-y-3.5 text-[var(--ink-2)] text-[15px] sm:text-[15.5px] leading-relaxed max-w-xl mb-8"
            >
              <p>
                Initiated in 2014, <b className="text-[#1D344F] dark:text-[#F2F0ED] font-bold">CONFLUENCE 2026</b>, organised
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
              <p className="text-[#1D344F] dark:text-[#F2F0ED] font-semibold">
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
                           bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253]
                           shadow-[0_8px_20px_-8px_rgba(29,52,79,0.45)] dark:shadow-[0_8px_20px_-8px_rgba(241,70,102,0.40)]
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
                           font-semibold text-sm text-[#1D344F] dark:text-[#F2F0ED]
                           bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/50 dark:border-[#3B3D41]
                           hover:bg-[#D4E1EF]/85 dark:hover:bg-[#323438] hover:border-[#536F91] dark:hover:border-[#F14666]
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
              {BROCHURE_BUTTONS.map((btn) => (
                <BrochureBtn
                  key={btn.key}
                  fileName={btn.fileName}
                  url={btn.url}
                  delay={btn.desktopDelay}
                >
                  {btn.label}
                </BrochureBtn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
