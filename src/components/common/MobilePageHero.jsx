import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Base-pair rung positions across one 360px (2-wavelength) tile
const RUNGS_X = [0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288, 306, 324, 342];

function DnaHelixTile() {
  const centerY = 54;
  const amp = 34;

  return (
    <svg
      width="360"
      height="108"
      viewBox="0 0 360 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Layer 1 (Back half-turns): thinner and dimmer for true 3D depth */}
      <g stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2.4" strokeLinecap="round">
        {/* Strand 2 back on [0..90] and [180..270] */}
        <path d="M 0,88 C 32.8,88 57.2,20 90,20" />
        <path d="M 180,88 C 212.8,88 237.2,20 270,20" />
        {/* Strand 1 back on [90..180] and [270..360] */}
        <path d="M 90,88 C 122.8,88 147.2,20 180,20" />
        <path d="M 270,88 C 302.8,88 327.2,20 360,20" />
      </g>

      {/* Layer 2 (Base-pair rungs + 3D depth-cued phosphate nodes) */}
      {RUNGS_X.map((x) => {
        const angle = (2 * Math.PI * x) / 180;
        const offset = amp * Math.cos(angle);
        const z1 = Math.sin(angle); // > 0 means Strand 1 is in front
        const y1 = centerY - offset;
        const y2 = centerY + offset;

        const strand1Front = z1 >= 0;
        const r1 = strand1Front ? 3.2 : 1.9;
        const r2 = strand1Front ? 1.9 : 3.2;
        const op1 = strand1Front ? 0.58 : 0.22;
        const op2 = strand1Front ? 0.22 : 0.58;

        return (
          <g key={x}>
            {Math.abs(offset) >= 5 && (
              <line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="#FFFFFF"
                strokeOpacity="0.24"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            )}
            <circle cx={x} cy={y1} r={r1} fill="#FFFFFF" fillOpacity={op1} />
            <circle cx={x} cy={y2} r={r2} fill="#FFFFFF" fillOpacity={op2} />
          </g>
        );
      })}

      {/* Layer 3 (Front half-turns): thicker and brighter weaving in front */}
      <g stroke="#FFFFFF" strokeOpacity="0.44" strokeWidth="4.2" strokeLinecap="round">
        {/* Strand 1 front on [0..90] and [180..270] */}
        <path d="M 0,20 C 32.8,20 57.2,88 90,88" />
        <path d="M 180,20 C 212.8,20 237.2,88 270,88" />
        {/* Strand 2 front on [90..180] and [270..360] */}
        <path d="M 90,20 C 122.8,20 147.2,88 180,88" />
        <path d="M 270,20 C 302.8,20 327.2,88 360,88" />
      </g>
    </svg>
  );
}

export default function MobilePageHero({ title }) {
  return (
    <div className="md:hidden relative bg-[#1D344F] dark:bg-[#252629] w-full pt-6 pb-11 px-5 text-white overflow-hidden shadow-md mb-7 border-b border-[#536F91]/40 dark:border-[#3B3D41]">
      {/* Animated Diagonal 3D-Rotating DNA Double-Helix Visual (enlarged on mobile) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-6 sm:right-2 top-1/2 -translate-y-1/2 w-[330px] sm:w-[380px] h-[112px] -rotate-[30deg] z-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.96) 18%, rgba(0,0,0,0.96) 82%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.96) 18%, rgba(0,0,0,0.96) 82%, transparent 100%)',
        }}
      >
        <div className="flex w-[720px] animate-dna-helix">
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
