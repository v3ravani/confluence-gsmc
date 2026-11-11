import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { registrationSteps } from '../../data/registration';

function TimelineStep({ step, index, total }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px 0px' });
  const reduced = useReducedMotion();

  const variants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 10 },
    visible: { opacity: 1, y: 0,
      transition: { duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] } },
  };

  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex gap-5 md:gap-7"
    >
      {/* Left: node + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          className="w-11 h-11 rounded-full border-2 border-[rgba(196,216,232,0.30)]
                     bg-[rgba(74,106,138,0.12)] backdrop-blur-sm
                     flex items-center justify-center z-10
                     shadow-[0_0_14px_rgba(74,106,138,0.22)]"
        >
          <span className="font-heading font-bold text-sm text-[var(--accent-blush)]">
            {step.step}
          </span>
        </motion.div>
        {!isLast && (
          <div className="w-px flex-1 mt-2
                          bg-gradient-to-b from-[rgba(196,216,232,0.22)] to-[rgba(196,216,232,0.06)]
                          min-h-[40px]" />
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0 pb-8">
        <span className="block text-[10px] font-semibold tracking-[0.22em] uppercase
                         text-[var(--accent-blush)] mb-1.5">
          Step {step.step}
        </span>
        <h3 className="font-heading font-bold text-white text-base md:text-lg mb-2 leading-snug">
          {step.title}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function RegistrationRoadmap() {
  const headingRef  = useRef(null);
  const headingView = useInView(headingRef, { once: true, margin: '-60px 0px' });
  const reduced     = useReducedMotion();

  return (
    <section id="registration" className="py-16 md:py-24 relative border-b border-white/[0.08] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-72 h-72
                      bg-[var(--dusty-600)]/16 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-56 h-56
                      bg-[var(--blush-500)]/12 rounded-full blur-[90px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          animate={headingView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase
                           text-[var(--accent-blush)] block mb-2">
            Guidelines
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold
                         text-white tracking-tight leading-tight mb-3">
            How Registration{' '}
            <span className="italic font-normal
                             bg-gradient-to-r from-[var(--dusty-400)] to-[var(--blush-300)]
                             bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-xl leading-relaxed">
            Follow our straightforward registration process to secure your place at CONFLUENCE 2026.
          </p>
        </motion.div>

        {/* Two column on desktop: timeline left, note right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Timeline */}
          <div className="lg:col-span-7">
            {registrationSteps.map((step, idx) => (
              <TimelineStep
                key={step.step}
                step={step}
                index={idx}
                total={registrationSteps.length}
              />
            ))}
          </div>

          {/* Right side info */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:pt-2"
          >
            <div className="card-glass p-7 sticky top-24">
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase
                               text-[var(--accent-blush)] block mb-3">
                Important
              </span>
              <h3 className="font-heading font-bold text-white text-lg mb-4 leading-snug">
                Each Event Has Its Own Registration Form
              </h3>
              <ul className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">◆</span>
                  Navigate to the specific event or workshop page.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">◆</span>
                  Click the REGISTER button on that page.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">◆</span>
                  You will be redirected to the corresponding Google Form.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">◆</span>
                  Complete the form and follow the payment instructions provided.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">◆</span>
                  Contact confluence.gsmc@gmail.com for queries.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
