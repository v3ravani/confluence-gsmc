import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { collaboratorsData } from '../../data/collaborators';

// ── Pure logo tile (no cards, no outlines, scaled-up prominent logos) ────────
function LogoTile({ collab }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-12 py-3 select-none group"
      title={`${collab.name} — ${collab.category}`}
      aria-label={collab.name}
    >
      {collab.logoDark ? (
        <>
          {/* Light Mode Logo (Dark text/stethoscope) */}
          <img
            src={collab.logoLight || collab.logo}
            alt={collab.name}
            className="dark:hidden h-20 sm:h-22 md:h-24 max-w-[270px] sm:max-w-[290px] md:max-w-[320px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            loading="lazy"
            decoding="async"
          />
          {/* Dark Mode Logo (White text/stethoscope) */}
          <img
            src={collab.logoDark}
            alt={collab.name}
            className="hidden dark:block h-20 sm:h-22 md:h-24 max-w-[270px] sm:max-w-[290px] md:max-w-[320px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        </>
      ) : collab.isSquare ? (
        <img
          src={collab.logo}
          alt={collab.name}
          className="h-24 w-24 sm:h-26 sm:w-26 md:h-28 md:w-28 object-contain rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-105 pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <img
          src={collab.logo}
          alt={collab.name}
          className="h-20 sm:h-22 md:h-24 max-w-[270px] sm:max-w-[290px] md:max-w-[320px] w-auto object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-105 pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

// ── Main scrollable carousel component ───────────────────────────────────────
export default function CollaboratorsCarousel() {
  const reduced = useReducedMotion();
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Repeat items 6 times (24 items total, split into two 12-item halves) for seamless infinite looping
  const items = [
    ...collaboratorsData,
    ...collaboratorsData,
    ...collaboratorsData,
    ...collaboratorsData,
    ...collaboratorsData,
    ...collaboratorsData,
  ];

  // Gentle auto-scroll when user is NOT dragging/touching/hovering
  useEffect(() => {
    if (reduced) return;

    let animId;
    const speed = 0.7; // calm subtle auto-scroll

    const step = () => {
      const el = scrollRef.current;
      if (el && !isInteracting) {
        el.scrollLeft += speed;
        // Seamless loop when scrolled past one half of the duplicate sets
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [reduced, isInteracting]);

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsInteracting(false);
  };

  return (
    <div
      className="relative w-full py-4 group select-none"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => {
        isDraggingRef.current = false;
        setIsInteracting(false);
      }}
      aria-label="Meet our collaborators"
      role="region"
    >
      {/* Left & Right fade masks merging into background */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none
                      bg-gradient-to-r from-[#F8FBFE] dark:from-[#202124] via-[#F8FBFE]/85 dark:via-[#202124]/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none
                      bg-gradient-to-l from-[#F8FBFE] dark:from-[#202124] via-[#F8FBFE]/85 dark:via-[#202124]/80 to-transparent" />

      {/* User-scrollable track with touch swipe and drag */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
        className="flex items-center gap-2 sm:gap-4 py-4 overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((collab, idx) => (
          <LogoTile key={`${collab.id}-${idx}`} collab={collab} />
        ))}
      </div>
    </div>
  );
}
