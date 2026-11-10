import React, { useState } from 'react';

// ── Categories repeated for seamless loop ────────────────────────────────────
const ITEMS = ['EVENT', 'WORKSHOP', 'CME', 'MERCHANDISE'];

export default function CategoryMarquee() {
  const [paused, setPaused] = useState(false);

  // Repeat 6× so the loop is always full at any viewport width
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full overflow-hidden bg-[var(--dusty-700)] border-y border-[rgba(196,216,232,0.15)]
                 py-3.5 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div
        className="flex gap-0 items-center whitespace-nowrap"
        style={{
          display:          'flex',
          width:            'max-content',
          animation:        'marquee 22s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {repeated.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="font-heading font-black uppercase tracking-[0.18em]
                             text-sm md:text-base text-white px-8">
              {item}
            </span>
            {/* Diamond separator */}
            <span className="text-[var(--blush-300)] text-xs font-bold">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

