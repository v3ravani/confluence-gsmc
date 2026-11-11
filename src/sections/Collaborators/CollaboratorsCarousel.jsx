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
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2
                 w-[160px] h-[88px] rounded-2xl
                 border border-[rgba(196,216,232,0.14)]
                 bg-[rgba(74,106,138,0.08)] hover:bg-[rgba(74,106,138,0.18)]
                 backdrop-blur-sm transition-all duration-300 group px-4"
      title={collab.name}
    >
      {collab.logo ? (
        <img
          src={collab.logo}
          alt={collab.name}
          className="max-h-10 max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <>
          {/* Placeholder monogram until real logo is provided */}
          <span className="font-heading font-extrabold text-xl text-[var(--dusty-400)]
                           group-hover:text-white transition-colors">
            {initials}
          </span>
          <span className="text-[9px] font-semibold tracking-wider uppercase
                           text-[var(--muted)] group-hover:text-[var(--dusty-200)]
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
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Touch support: handled via CSS animation pause
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Meet our collaborators"
      role="region"
    >
      {/* Left & Right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none
                      bg-gradient-to-r from-[#162030] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none
                      bg-gradient-to-l from-[#162030] to-transparent" />

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

