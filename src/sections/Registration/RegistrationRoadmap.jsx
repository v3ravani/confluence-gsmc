import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { registrationSteps } from '../../data/registration';

function TimelineStep({ step, index, total }) {
  const ref = useRef(null);
  // Activates only after element has been scrolled up past 40% from bottom of screen
  const inView = useInView(ref, { once: true, margin: '-10% 0px -40% 0px' });
  const reduced = useReducedMotion();

  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex gap-5 md:gap-7">
      {/* Left: node circle + connecting line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={
            inView
              ? { backgroundColor: 'var(--accent-blue)', borderColor: 'var(--accent-blue)', scale: 1.04 }
              : { backgroundColor: 'var(--bg-surface-light)', borderColor: 'var(--line-strong)', scale: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-11 h-11 rounded-full border-2 flex items-center justify-center z-10 shadow-sm"
        >
          <span
            className={`font-heading font-extrabold text-sm transition-colors duration-400 ${
              inView ? 'text-white' : 'text-[var(--muted)]'
            }`}
          >
            {step.step}
          </span>
        </motion.div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-2 transition-colors duration-700 min-h-[48px] ${
              inView ? 'bg-[var(--accent-blue)]/40' : 'bg-[var(--line)]'
            }`}
          />
        )}
      </div>

      {/* Right: step title & details */}
      <div className="flex-1 min-w-0 pb-8">
        <span
          className={`block text-[10.5px] font-bold tracking-[0.22em] uppercase mb-1.5 transition-colors duration-400 ${
            inView ? 'text-[var(--accent-blush)]' : 'text-[var(--muted)]'
          }`}
        >
          STEP {step.step}
        </span>
        <h3
          className={`font-heading font-extrabold text-base md:text-lg mb-2 leading-snug transition-colors duration-400 ${
            inView ? 'text-[var(--ink)]' : 'text-[var(--ink-2)]'
          }`}
        >
          {step.title}
        </h3>
        <p className="text-sm text-[var(--ink-2)] leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function RegistrationRoadmap() {
  const headingRef = useRef(null);
  const headingView = useInView(headingRef, { once: true, margin: '-60px 0px' });
  const reduced = useReducedMotion();

  return (
    <section id="registration" className="py-16 md:py-24 relative border-b border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-72 h-72
                      bg-[var(--accent-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-56 h-56
                      bg-[var(--accent-crimson)]/5 rounded-full blur-[90px] pointer-events-none" />

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
                         text-[#121110] dark:text-[#F2F0ED] tracking-tight leading-tight mb-3">
            How Registration{' '}
            <span
              className="italic font-normal text-[var(--accent-crimson)] dark:text-[#F14666]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" }}
            >
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
              <h3 className="font-heading font-bold text-[#121110] dark:text-[#F2F0ED] text-lg mb-4 leading-snug">
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
