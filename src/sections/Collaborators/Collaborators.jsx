import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import CollaboratorsCarousel from './CollaboratorsCarousel';

export default function Collaborators() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-60px 0px' });
  const reduced = useReducedMotion();

  return (
    <section className="py-16 md:py-24 relative border-b border-white/[0.08] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56
                      bg-[var(--dusty-600)]/12 rounded-full blur-[100px] pointer-events-none" />

      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="Partnerships"
          title="Meet Our"
          highlightWord="Collaborators"
          subtitle="Proudly supported by leading medical associations, academic bodies and healthcare societies."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CollaboratorsCarousel />
        </motion.div>
      </div>
    </section>
  );
}
