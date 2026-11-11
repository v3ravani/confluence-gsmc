import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
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
                 border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41]
                 bg-[#ece1cf] dark:bg-[#2B2D30] hover:bg-[#f7f1e6] dark:hover:bg-[#323438] hover:border-[#2d508a] dark:hover:border-[#F14666]
                 transition-all duration-300 group p-5 sm:p-6 shadow-xs select-none"
      title={collab.name}
    >
      {collab.logo ? (
        <img
          src={collab.logo}
          alt={collab.name}
          className="max-h-14 max-w-[120px] object-contain opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
      ) : (
        <>
          {/* Large Square tile monogram */}
          <span className="font-heading font-black text-3xl sm:text-4xl text-[#121110] dark:text-[#F2F0ED]
                           group-hover:text-[#2d508a] dark:group-hover:text-[#F14666] transition-colors leading-none pointer-events-none">
            {initials}
          </span>
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase
                           text-[#6b6459] dark:text-[#898A89] group-hover:text-[#2d508a] dark:group-hover:text-[#F14666]
                           transition-colors text-center leading-tight line-clamp-2 pointer-events-none">
            {collab.category}
          </span>
        </>
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

  // Triple items for seamless continuous looping
  const items = [...collaboratorsData, ...collaboratorsData, ...collaboratorsData];

  // Gentle auto-scroll when user is NOT dragging/touching/hovering
  useEffect(() => {
    if (reduced) return;

    let animId;
    const speed = 0.7; // calm subtle auto-scroll

    const step = () => {
      const el = scrollRef.current;
      if (el && !isInteracting) {
        el.scrollLeft += speed;
        // Seamless loop when scrolled past one third of the items
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird * 2) {
          el.scrollLeft -= oneThird;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += oneThird;
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
                      bg-gradient-to-r from-[#e2d4c0] dark:from-[#202124] via-[#e2d4c0]/80 dark:via-[#202124]/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none
                      bg-gradient-to-l from-[#e2d4c0] dark:from-[#202124] via-[#e2d4c0]/80 dark:via-[#202124]/80 to-transparent" />

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
