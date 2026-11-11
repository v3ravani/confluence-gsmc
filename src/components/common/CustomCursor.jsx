import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CustomCursor() {
  const { isDark } = useTheme();
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  const cursorRef = useRef(null);
  const isVisibleRef = useRef(false);

  // 1. Desktop Cursor Tracking & Guaranteed Default Cursor Suppression
  useEffect(() => {
    const cursorEl = cursorRef.current;

    const enableCustomCursor = () => {
      document.documentElement.classList.add('custom-cursor-active');
      document.body.style.cursor = 'none';
      if (cursorEl) {
        cursorEl.style.opacity = '1';
      }
      isVisibleRef.current = true;
    };

    const disableCustomCursor = () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.style.cursor = '';
      if (cursorEl) {
        cursorEl.style.opacity = '0';
      }
      isVisibleRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isVisibleRef.current) {
        enableCustomCursor();
      }

      // 0ms hardware transform
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering clickable element
      const target = e.target;
      if (target && target.closest) {
        const isClickable = target.closest(
          'a, button, input, textarea, select, label, [role="button"], [tabindex="0"], .cursor-pointer'
        );
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => disableCustomCursor();
    const handleMouseEnter = () => enableCustomCursor();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      disableCustomCursor();
    };
  }, []);

  // 2. Mobile / Touch Tap Ripple Indicator (References 1 & 4)
  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      if (!touch) return;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <>
      {/* ── DESKTOP CUSTOM CURSOR (Hidden until mouse moves) ── */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform opacity-0"
        style={{
          transition: 'opacity 0.12s ease-out',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className="transition-transform duration-100 ease-out origin-top-left"
          style={{
            transform: `${isClicking ? 'scale(0.88)' : isPointer ? 'scale(1.12)' : 'scale(1)'}`,
          }}
        >
          {isDark ? (
            /* ── DESKTOP DARK MODE: Reference Image 2 Arrow ── */
            /* Pointing directly from (0,0) hotspot with bold #18181B outline & diagonal stripes */
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.60)]"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <clipPath id="dark-arrow-clip">
                  <polygon points="0,0 0,29 12,21 25,23" />
                </clipPath>
              </defs>

              {/* Interior diagonal striped fill */}
              <g clipPath="url(#dark-arrow-clip)">
                {/* Purple base fill (Reference 2 top & bottom sections) */}
                <rect x="0" y="0" width="34" height="34" fill="#C084FC" />

                {/* Diagonal sky blue band across center */}
                <polygon points="0,16 14,0 24,0 0,26" fill="#5BC0F8" />

                {/* White divider stripes */}
                <line x1="0" y1="16" x2="14" y2="0" stroke="#FFFFFF" strokeWidth="2.4" />
                <line x1="0" y1="26" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="2.4" />
              </g>

              {/* Bold black outline matching Reference 2 */}
              <polygon
                points="0,0 0,29 12,21 25,23"
                fill="none"
                stroke="#18181B"
                strokeWidth="3.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* ── DESKTOP LIGHT MODE: Reference Image 3 Arrow ── */
            /* Hollow crimson navigation arrow matching Reference 3 */
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_6px_rgba(145,52,51,0.35)]"
              style={{ overflow: 'visible' }}
            >
              <polygon
                points="2,2 30,14 16,16 14,30"
                fill="none"
                stroke="#8B0000"
                strokeWidth="4.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* ── MOBILE / TOUCH INTERACTIVE INDICATOR (Reference 1 & Light variant) ── */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          aria-hidden="true"
          className="fixed pointer-events-none z-[999999] select-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {isDark ? (
            /* ── MOBILE DARK MODE: Reference Image 1 (Dot + Ring -> Expanding Burst) ── */
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full animate-touch-burst"
                style={{
                  width: '56px',
                  height: '56px',
                  border: '3.5px solid #A855F7', // Outer Purple
                  boxShadow:
                    'inset 0 0 0 3px #2DD4BF, inset 0 0 0 6px #10B981', // Middle Cyan, Inner Green
                }}
              />
              <div
                className="rounded-full animate-touch-dot"
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#9333EA', // Solid Purple center
                  boxShadow: '0 0 0 6px rgba(168, 85, 247, 0.35)', // Translucent lilac halo
                }}
              />
            </div>
          ) : (
            /* ── MOBILE LIGHT MODE: Confluence Light Palette Tap Burst ── */
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full animate-touch-burst"
                style={{
                  width: '56px',
                  height: '56px',
                  border: '3.5px solid #913433', // Outer Crimson
                  boxShadow:
                    'inset 0 0 0 3px #2D508A, inset 0 0 0 6px #D99B26', // Middle Confluence Blue, Inner Amber Gold
                }}
              />
              <div
                className="rounded-full animate-touch-dot"
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#913433', // Solid Crimson center
                  boxShadow: '0 0 0 6px rgba(145, 52, 51, 0.25)', // Translucent rose halo
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
