import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { collaboratorsData } from '../../data/collaborators';

// ── Single logo tile ─────────────────────────────────────────────────────────
function LogoTile({ collab }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center
                 w-[220px] sm:w-[260px] h-[115px] sm:h-[130px] rounded-2xl
                 border border-[#829DBB]/40 dark:border-[#3B3D41]
                 bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF]/70 dark:hover:bg-[#323438]
                 hover:border-[#536F91] dark:hover:border-[#F14666]
                 transition-all duration-300 group p-4 sm:p-5 shadow-xs select-none"
      title={`${collab.name} — ${collab.category}`}
      aria-label={collab.name}
    >
      {collab.logoDark ? (
        <>
          {/* Light Mode Logo (Dark text/stethoscope) */}
          <img
            src={collab.logoLight || collab.logo}
            alt={collab.name}
            className="dark:hidden max-h-14 sm:max-h-16 max-w-[180px] sm:max-w-[215px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            loading="lazy"
          />
          {/* Dark Mode Logo (White text/stethoscope) */}
          <img
            src={collab.logoDark}
            alt={collab.name}
            className="hidden dark:block max-h-14 sm:max-h-16 max-w-[180px] sm:max-w-[215px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            loading="lazy"
          />
        </>
      ) : collab.isSquare ? (
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 pointer-events-none shadow-xs">
          <img
            src={collab.logo}
            alt={collab.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="max-h-14 sm:max-h-16 max-w-[175px] sm:max-w-[210px] rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 pointer-events-none">
          <img
            src={collab.logo}
            alt={collab.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
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
      className="relative w-full py-2 group select-none"
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
                      bg-gradient-to-r from-[#F2F6FA] dark:from-[#202124] via-[#F2F6FA]/85 dark:via-[#202124]/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none
                      bg-gradient-to-l from-[#F2F6FA] dark:from-[#202124] via-[#F2F6FA]/85 dark:via-[#202124]/80 to-transparent" />

      {/* User-scrollable track with touch swipe and drag */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
        className="flex gap-5 py-2 overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
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
