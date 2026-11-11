import React, { useState } from 'react';
import dnaRingImg from '../../assets/logos/confluence_dna_ring.png';
import bulbBrainImg from '../../assets/logos/confluence_bulb_brain.png';
import heroDnaColored from '../../assets/logos/hero_dna_colored.png';
import heroBulbColored from '../../assets/logos/hero_bulb_colored.png';

export default function BrainWatermark({
  mode = 'hero',
  className = '',
  isMobile = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Background watermark mode (fixed in place at center of viewport, calm slow rotation)
  if (mode === 'watermark') {
    return (
      <div
        className={`fixed inset-0 grid place-items-center pointer-events-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="relative w-[min(70vmin,680px)] aspect-square opacity-[0.055] dark:opacity-[0.045] spin-smooth-slow brightness-0 dark:brightness-100 dark:invert">
          <img
            src={dnaRingImg}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
          <img
            src={bulbBrainImg}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // Hero interactive & responsive mode with custom palette & warm golden radial hover glow
  return (
    <div
      className={`relative flex items-center justify-center aspect-square select-none ${
        isMobile ? 'w-full h-full' : 'max-w-[500px] xl:max-w-[530px] w-full'
      } ${className}`}
    >
      {/* 1. Ambient static & hover warm golden radial glow (#E2B96F) */}
      <div
        className="absolute inset-[-14%] rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: isHovered
            ? 'radial-gradient(circle, rgba(226, 185, 111, 0.45) 0%, rgba(226, 185, 111, 0.22) 40%, rgba(197, 139, 120, 0.08) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(226, 185, 111, 0.14) 0%, rgba(167, 123, 72, 0.06) 45%, transparent 70%)',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          opacity: isHovered ? 1 : 0.80,
        }}
      />

      {/* 2. Rotating Outer DNA Double-Helix Ring (Strand 1: #A66F77, Strand 2: #A77B48) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center spin-smooth"
        style={{ willChange: 'transform' }}
      >
        <img
          src={heroDnaColored}
          alt="CONFLUENCE DNA Ring"
          className="w-full h-full object-contain opacity-95 drop-shadow-[0_4px_16px_rgba(167,123,72,0.25)]"
          loading="eager"
        />
      </div>

      {/* 3. Inner Lightbulb (#96734F) + Brain (#C58B78) with smooth golden radial illumination (#E2B96F) on hover */}
      <div
        className="relative z-10 w-[76%] h-[76%] flex items-center justify-center cursor-pointer pointer-events-auto rounded-full float-smooth transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        <img
          src={heroBulbColored}
          alt="CONFLUENCE Brain & Lightbulb"
          className="w-full h-full object-contain transition-all duration-500 ease-out"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 24px rgba(226, 185, 111, 0.90)) drop-shadow(0 0 45px rgba(226, 185, 111, 0.45))'
              : 'drop-shadow(0 4px 12px rgba(150, 115, 79, 0.30))',
          }}
          loading="eager"
        />
      </div>
    </div>
  );
}
