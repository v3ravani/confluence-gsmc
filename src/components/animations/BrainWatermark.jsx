import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import dnaRingImg from '../../assets/logos/confluence_dna_ring.png';
import heroDnaColored from '../../assets/logos/hero_dna_colored.png';
import heroBulbColored from '../../assets/logos/hero_bulb_colored.png';

export default function BrainWatermark({
  mode = 'hero',
  className = '',
  isMobile = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();

  // Background watermark mode (uses updated sharp bulb + rotating DNA ring)
  if (mode === 'watermark') {
    return (
      <div
        className={`fixed inset-0 grid place-items-center pointer-events-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="relative w-[min(70vmin,680px)] aspect-square opacity-[0.055] dark:opacity-[0.05] spin-smooth-slow dark:invert">
          <img
            src={dnaRingImg}
            alt=""
            className="absolute inset-0 w-full h-full object-contain brightness-0"
            loading="lazy"
            decoding="async"
          />
          <img
            src={heroBulbColored}
            alt=""
            className="absolute inset-0 w-full h-full object-contain brightness-0"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // Hero interactive & responsive mode: yellow glow strictly behind the bulb, never on the bulb itself
  return (
    <div
      className={`relative flex items-center justify-center aspect-square select-none ${
        isMobile ? 'w-full h-full' : 'max-w-[500px] xl:max-w-[530px] w-full'
      } ${className}`}
    >
      {/* 1. Ambient & Hover YELLOW radial glow strictly BEHIND the bulb (Desktop: NO glow by default, gentle yellow glow ONLY on hover; Mobile: unchanged) */}
      <div
        className="absolute inset-[8%] rounded-full pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 45%, rgba(250, 204, 21, 0.26) 0%, rgba(253, 224, 71, 0.11) 42%, rgba(250, 204, 21, 0.02) 68%, transparent 80%)'
            : 'radial-gradient(circle at 50% 45%, rgba(250, 204, 21, 0.36) 0%, rgba(253, 224, 71, 0.17) 44%, rgba(250, 204, 21, 0.03) 70%, transparent 82%)',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          opacity: isMobile ? (isDark ? 0.45 : 0.55) : isHovered ? 0.85 : 0,
        }}
      />

      {/* 2. Rotating Outer DNA Double-Helix Ring */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[5] flex items-center justify-center spin-smooth"
        style={{ willChange: 'transform' }}
      >
        <img
          src={heroDnaColored}
          alt="CONFLUENCE DNA Ring"
          className="w-full h-full object-contain opacity-95 transition-all duration-500"
          style={{
            filter: isDark
              ? 'drop-shadow(0 4px 16px rgba(167,123,72,0.25))'
              : 'hue-rotate(182deg) saturate(0.82) contrast(1.05) drop-shadow(0 6px 20px rgba(83,111,145,0.28))',
          }}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      {/* 3. Inner Sharp Lightbulb + Brain (no glow/drop-shadow filter on the bulb itself; glow stays strictly in back) */}
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
            filter: isDark
              ? 'none'
              : 'hue-rotate(182deg) saturate(0.85)',
          }}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  );
}
