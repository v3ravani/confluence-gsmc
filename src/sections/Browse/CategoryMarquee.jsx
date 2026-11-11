import React, { useState } from 'react';

// ── Categories repeated for seamless loop ────────────────────────────────────
const ITEMS = ['EVENT', 'WORKSHOP', 'CME', 'MERCHANDISE'];

export default function CategoryMarquee() {
  const [paused, setPaused] = useState(false);

  // Repeat 8× so the loop is always full at any viewport width
  const repeated = [
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
    ...ITEMS,
  ];

  return (
    <div
      className="relative overflow-hidden py-10 sm:py-14 select-none z-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      {/* ── 1. RED RIBBON (Underneath, Slanted in Opposite Direction) ── */}
      <div
        className="w-[120%] -ml-[10%] sm:w-[112%] sm:-ml-[6%] bg-[#913433] dark:bg-[#c9304e] border-y border-[#782827] dark:border-[#a3253e]
                   py-2.5 sm:py-3 shadow-md relative z-10 origin-center
                   rotate-[3.2deg] sm:rotate-[1.8deg] overflow-hidden"
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 42s linear infinite reverse',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {repeated.map((item, idx) => (
            <React.Fragment key={`red-${idx}`}>
              <span className="font-heading font-black uppercase tracking-[0.20em]
                               text-xs sm:text-sm md:text-base text-white/95 px-6 sm:px-8">
                {item}
              </span>
              <span className="text-white/70 text-xs font-bold">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── 2. BLUE RIBBON (On Top of Red, More Slanted so Red is Visible on Mobile) ── */}
      <div
        className="w-[120%] -ml-[10%] sm:w-[112%] sm:-ml-[6%] bg-[#2d508a] dark:bg-[#252629] border-y border-[#203c6b] dark:border-[#3B3D41]
                   py-2.5 sm:py-3 shadow-[0_6px_22px_rgba(0,0,0,0.28)] dark:shadow-[0_6px_22px_rgba(0,0,0,0.60)] relative z-20 origin-center
                   -mt-3 sm:-mt-6 -rotate-[4.5deg] sm:-rotate-[2.4deg] overflow-hidden"
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 36s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {repeated.map((item, idx) => (
            <React.Fragment key={`blue-${idx}`}>
              <span className="font-heading font-black uppercase tracking-[0.20em]
                               text-xs sm:text-sm md:text-base text-white dark:text-[#F2F0ED] px-6 sm:px-8">
                {item}
              </span>
              <span className="text-white/80 dark:text-[#FFCCAA] text-xs font-bold">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
