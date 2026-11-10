import React, { useState } from 'react';
import dnaRingImg from '../../assets/logos/confluence_dna_ring.png';
import bulbBrainImg from '../../assets/logos/confluence_bulb_brain.png';

export default function BrainWatermark({
  mode = 'hero',
  className = '',
  isMobile = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Background full-page fixed watermark mode (lightweight, non-laggy)
  if (mode === 'watermark') {
    return (
      <div
        className="fixed inset-0 grid place-items-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative w-[min(70vmin,680px)] aspect-square opacity-[0.06] spin-smooth">
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

  // Hero interactive & responsive mode
  return (
    <div
      className={`relative flex items-center justify-center aspect-square select-none ${
        isMobile ? 'w-full h-full' : 'max-w-[460px] w-full'
      } ${className}`}
    >
      {/* 1. Ambient static radial glow (pure GPU gradient - zero lag) */}
      <div
        className="absolute inset-[-12%] rounded-full pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: isHovered
            ? 'radial-gradient(circle, rgba(120, 190, 255, 0.40) 0%, rgba(196, 144, 154, 0.25) 45%, transparent 72%)'
            : 'radial-gradient(circle, rgba(94, 160, 240, 0.25) 0%, rgba(125, 143, 114, 0.14) 45%, transparent 70%)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          opacity: isHovered ? 1 : 0.85,
        }}
      />

      {/* 2. Rotating Outer DNA Double-Helix Ring (pure GPU compositor thread) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center spin-smooth"
        style={{ willChange: 'transform' }}
      >
        <img
          src={dnaRingImg}
          alt="CONFLUENCE DNA Ring"
          className="w-full h-full object-contain opacity-90"
          loading="eager"
        />
      </div>

      {/* 3. Inner Lightbulb + Brain with gentle floating and hover glow */}
      <div
        className="relative z-10 w-[72%] h-[72%] flex items-center justify-center cursor-pointer pointer-events-auto rounded-full float-smooth transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
        title="CONFLUENCE 2026: Convergence of Medical Knowledge & Research"
      >
        <img
          src={bulbBrainImg}
          alt="CONFLUENCE Brain & Lightbulb"
          className="w-full h-full object-contain transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 24px rgba(120, 190, 255, 0.9)) brightness(1.25)'
              : 'drop-shadow(0 0 12px rgba(120, 190, 255, 0.5))',
          }}
          loading="eager"
        />

        {/* Hover tip badge */}
        {isHovered && !isMobile && (
          <div className="absolute -bottom-7 px-3 py-1 rounded-full bg-[#162030]/95 border border-[rgba(196,216,232,0.30)] text-[var(--accent-blush)] text-xs font-semibold backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap animate-fadeIn">
            ✦ CONFLUENCE 2026
          </div>
        )}
      </div>
    </div>
  );
}
