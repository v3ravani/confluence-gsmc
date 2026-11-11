import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Instagram, ArrowUpRight, ExternalLink } from 'lucide-react';
import { instagramConfig } from '../../data/collaborators';

function PostPlaceholder({ post, index }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-40px 0px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="aspect-square rounded-xl overflow-hidden
                 border border-[rgba(100,85,70,0.20)]
                 bg-[#ece1cf]
                 hover:border-[var(--accent-crimson)] hover:bg-[#f7f1e6]
                 transition-all duration-300 group cursor-pointer shadow-sm
                 flex flex-col items-center justify-center gap-2 p-3"
    >
      <div className="w-8 h-8 rounded-full bg-[#faebe8]
                      flex items-center justify-center mb-1
                      group-hover:scale-105 transition-transform">
        <Instagram className="w-4 h-4 text-[var(--accent-crimson)]" />
      </div>
      <span className="text-[10px] font-semibold text-[var(--muted)] text-center
                       group-hover:text-[var(--accent-crimson)] transition-colors leading-tight">
        {post.label}
      </span>
    </motion.div>
  );
}

export default function InstagramSection() {
  const headingRef  = useRef(null);
  const headingView = useInView(headingRef, { once: true, margin: '-60px 0px' });
  const reduced     = useReducedMotion();

  return (
    <section className="py-16 md:py-24 relative border-b border-[rgba(100,85,70,0.18)] overflow-hidden">
      <div className="absolute top-1/2 right-10 w-80 h-80
                      bg-[var(--accent-crimson)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-56 h-56
                      bg-[var(--accent-blue)]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text + CTA */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            animate={headingView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            border border-[rgba(145,52,51,0.25)]
                            bg-[#faebe8] mb-6">
              <Instagram className="w-4 h-4 text-[var(--accent-crimson)]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase
                               text-[var(--accent-crimson)]">
                {instagramConfig.handle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#121110]
                           tracking-tight leading-tight mb-4">
              {instagramConfig.heading}
            </h2>

            <p className="text-[var(--ink-2)] text-base leading-relaxed mb-8 max-w-md">
              {instagramConfig.subtext}
            </p>

            <a
              href={instagramConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold
                         text-sm text-white
                         bg-[var(--accent-crimson)] hover:bg-[#7a2a29]
                         hover:-translate-y-0.5 shadow-md
                         transition-all duration-250 group"
            >
              <Instagram className="w-4 h-4" />
              Visit Instagram
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right: post grid */}
          <div>
            <div className="grid grid-cols-3 gap-2.5">
              {instagramConfig.placeholderPosts.map((post, idx) => (
                <PostPlaceholder key={post.id} post={post} index={idx} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-1.5">
              <a
                href={instagramConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs
                           text-[var(--dusty-400)] hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {instagramConfig.handle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
