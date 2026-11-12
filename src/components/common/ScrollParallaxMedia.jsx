import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

function ParallaxTrack({ targetRef, offsetPx, scale, className, children }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // As user scrolls down (page & cards move up), image shifts mildly downward (opposite direction)
  const y = useTransform(scrollYProgress, [0, 1], [-offsetPx, offsetPx]);

  return (
    <motion.div
      style={{ y, scale }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Desktop-only mild opposite-direction scroll parallax wrapper for photo frames.
 * Renders children statically on mobile viewports (< 768px) or reduced-motion environments.
 */
export default function ScrollParallaxMedia({
  targetRef,
  offsetPx = 14,
  scale = 1.09,
  className = 'w-full h-full',
  children,
}) {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxTrack
      targetRef={targetRef}
      offsetPx={offsetPx}
      scale={scale}
      className={className}
    >
      {children}
    </ParallaxTrack>
  );
}
