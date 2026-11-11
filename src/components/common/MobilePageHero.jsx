import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Base-pair rung positions across one 320px (2-wavelength) tile
const RUNGS_X = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304];

function DnaHelixTile() {
  const centerY = 43;
  const amp = 28;

  return (
    <svg
      width="320"
      height="86"
      viewBox="0 0 320 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Perpendicular base-pair rungs with node endpoints */}
      {RUNGS_X.map((x) => {
        const angle = (2 * Math.PI * x) / 160;
        const offset = amp * Math.cos(angle);
        const y1 = centerY - offset;
        const y2 = centerY + offset;
        // Skip zero-length crossing point or render tiny subtle center dot
        if (Math.abs(offset) < 4) return null;

        return (
          <g key={x} opacity="0.22">
            <line
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx={x} cy={y1} r="2.2" fill="#FFFFFF" />
            <circle cx={x} cy={y2} r="2.2" fill="#FFFFFF" />
          </g>
        );
      })}

      {/* Back strand */}
      <path
        d="M 0,71 C 29,71 51,15 80,15 C 109,15 131,71 160,71 C 189,71 211,15 240,15 C 269,15 291,71 320,71"
        stroke="#FFFFFF"
        strokeOpacity="0.18"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Front strand */}
      <path
        d="M 0,15 C 29,15 51,71 80,71 C 109,71 131,15 160,15 C 189,15 211,71 240,71 C 269,71 291,15 320,15"
        stroke="#FFFFFF"
        strokeOpacity="0.28"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MobilePageHero({ title }) {
  return (
    <div className="md:hidden relative bg-[#1D344F] dark:bg-[#252629] w-full pt-6 pb-11 px-5 text-white overflow-hidden shadow-md mb-7 border-b border-[#536F91]/40 dark:border-[#3B3D41]">
      {/* Animated Diagonal DNA Double-Helix Visual (replaces bubble circles) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 sm:right-0 top-1/2 -translate-y-1/2 w-[270px] sm:w-[320px] h-[90px] -rotate-[32deg] z-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.95) 82%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.95) 82%, transparent 100%)',
        }}
      >
        <div className="flex w-[640px] animate-dna-helix">
          <DnaHelixTile />
          <DnaHelixTile />
        </div>
      </div>

      {/* Top row: small back to home in grey on left */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-white/60" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Page Name */}
      <h1 className="relative z-10 font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tighter leading-none">
        {title}
      </h1>
    </div>
  );
}
