import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { collaboratorsData } from '../../data/collaborators';

// ── Single logo tile ─────────────────────────────────────────────────────────
function LogoTile({ collab }) {
  const initials = collab.name
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center gap-3
                 w-[160px] h-[160px] sm:w-[185px] sm:h-[185px] aspect-square rounded-2xl
                 border border-[rgba(100,85,70,0.22)]
                 bg-[#ece1cf] hover:bg-[#f7f1e6] hover:border-[#2d508a]
                 transition-all duration-300 group p-5 sm:p-6 shadow-xs"
      title={collab.name}
    >
      {collab.logo ? (
        <img
          src={collab.logo}
          alt={collab.name}
          className="max-h-14 max-w-[120px] object-contain opacity-85 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <>
          {/* Large Square tile monogram */}
          <span className="font-heading font-black text-3xl sm:text-4xl text-[#121110]
                           group-hover:text-[#2d508a] transition-colors leading-none">
            {initials}
          </span>
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase
                           text-[#6b6459] group-hover:text-[#2d508a]
                           transition-colors text-center leading-tight line-clamp-2">
            {collab.category}
          </span>
        </>
      )}
    </div>
  );
}

// ── Main carousel component ──────────────────────────────────────────────────
export default function CollaboratorsCarousel() {
  const reduced    = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef   = useRef(null);

  // Duplicate list for seamless looping
  const items = [...collaboratorsData, ...collaboratorsData];

  return (
    <div
      className="relative overflow-hidden w-full py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Touch support: handled via CSS animation pause
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Meet our collaborators"
      role="region"
    >
      {/* Left & Right fade masks merging seamlessly into #e2d4c0 canvas */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none
                      bg-gradient-to-r from-[#e2d4c0] via-[#e2d4c0]/85 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none
                      bg-gradient-to-l from-[#e2d4c0] via-[#e2d4c0]/85 to-transparent" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-5 py-2"
        style={{
          width: 'max-content',
          animation: reduced || paused
            ? 'none'
            : 'marquee 45s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
        aria-hidden={reduced}
      >
        {items.map((collab, idx) => (
          <LogoTile key={`${collab.id}-${idx}`} collab={collab} />
        ))}
      </div>

      {/* Reduced-motion fallback: static grid */}
      {reduced && (
        <div className="flex flex-wrap gap-4 justify-center">
          {collaboratorsData.map(collab => (
            <LogoTile key={collab.id} collab={collab} />
          ))}
        </div>
      )}
    </div>
  );
}

