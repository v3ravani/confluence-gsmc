import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Desktop-only custom arrow cursor.
 * - Completely disabled on mobile viewports (< 768px) and touch interactions.
 * - Renders the exact same arrow geometry, dimensions (34x34), scale, and hotspot
 *   across both Light Mode and Dark Mode, adjusting only contrast shadow for visibility.
 */
export default function CustomCursor() {
  const { isDark } = useTheme();
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    const wideEnough = window.innerWidth >= 768;
    const coarseOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches;
    return wideEnough && !coarseOnly;
  });

  const cursorRef = useRef(null);
  const isVisibleRef = useRef(false);
  const lastTouchTimeRef = useRef(0);

  // Track responsive layout / pointer environment switches (mobile <-> desktop)
  useEffect(() => {
    const updateDeviceMode = () => {
      const wideEnough = window.innerWidth >= 768;
      const coarseOnly =
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(any-pointer: fine)').matches;
      const nextDesktop = wideEnough && !coarseOnly;
      setIsDesktop(nextDesktop);

      if (!nextDesktop) {
        document.documentElement.classList.remove('custom-cursor-active');
        document.body.style.cursor = '';
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
        isVisibleRef.current = false;
      }
    };

    const handleTouchStart = () => {
      lastTouchTimeRef.current = Date.now();
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.style.cursor = '';
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      isVisibleRef.current = false;
    };

    updateDeviceMode();
    window.addEventListener('resize', updateDeviceMode, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', updateDeviceMode);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Desktop mouse tracking with 0ms direct DOM transform
  useEffect(() => {
    if (!isDesktop) {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.style.cursor = '';
      isVisibleRef.current = false;
      return;
    }

    const enableCustomCursor = () => {
      const el = cursorRef.current;
      document.documentElement.classList.add('custom-cursor-active');
      document.body.style.cursor = 'none';
      if (el) {
        el.style.opacity = '1';
      }
      isVisibleRef.current = true;
    };

    const disableCustomCursor = () => {
      const el = cursorRef.current;
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.style.cursor = '';
      if (el) {
        el.style.opacity = '0';
      }
      isVisibleRef.current = false;
    };

    const handlePointerMove = (e) => {
      // Ignore touch/emulated touch pointers completely
      if (e.pointerType === 'touch') {
        disableCustomCursor();
        return;
      }
      // Ignore synthetic compatibility mouse events shortly after touch
      if (Date.now() - lastTouchTimeRef.current < 500) {
        return;
      }

      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!isVisibleRef.current) {
        enableCustomCursor();
      }
    };

    const handleMouseLeave = () => disableCustomCursor();
    const handleBlur = () => disableCustomCursor();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleBlur);
      disableCustomCursor();
    };
  }, [isDesktop]);

  // Completely omit DOM output on mobile viewports / non-desktop mode
  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform opacity-0"
      style={{
        width: '34px',
        height: '34px',
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Unified desktop cursor across Light Mode and Dark Mode (identical size, proportions & hotspot) */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          filter: isDark
            ? 'drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.45)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.65))'
            : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))',
        }}
      >
        <defs>
          <clipPath id="unified-arrow-clip">
            <polygon points="0,0 0,29 12,21 25,23" />
          </clipPath>
        </defs>

        <g clipPath="url(#unified-arrow-clip)">
          <rect x="0" y="0" width="34" height="34" fill="#C084FC" />
          <polygon points="0,16 14,0 24,0 0,26" fill="#5BC0F8" />
          <line x1="0" y1="16" x2="14" y2="0" stroke="#FFFFFF" strokeWidth="2.4" />
          <line x1="0" y1="26" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="2.4" />
        </g>

        <polygon
          points="0,0 0,29 12,21 25,23"
          fill="none"
          stroke="#18181B"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
