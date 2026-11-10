import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';

// ── Configurable browse categories ──────────────────────────────────────────
const browseCategories = [
  {
    id:    'events',
    label: 'EVENT',
    desc:  'Scientific paper presentations, case reports, clinical competitions & medical quizzes.',
    tag:   'Academic Track',
    to:    '/events',
  },
  {
    id:    'workshops',
    label: 'WORKSHOP',
    desc:  'Hands-on clinical skill modules, simulation masterclasses & procedural training.',
    tag:   'Practical Skills',
    to:    '/workshops',
  },
  {
    id:    'merchandise',
    label: 'MERCHANDISE',
    desc:  'Official conference apparel, delegate kits & premium CONFLUENCE 2026 collectibles.',
    tag:   'Official Store',
    to:    '/merchandise',
  },
  {
    id:    'cme',
    label: 'CME',
    desc:  'Accredited Continuing Medical Education programmes for residents & consultants.',
    tag:   'Professional CPD',
    to:    '/cme',
  },
];

export default function BrowseSection() {
  return (
    <section id="browse" className="py-16 md:py-24 relative border-b border-white/[0.08]">
      <div className="wrap">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Explore CONFLUENCE"
            title="Browse"
            highlightWord="Categories"
            subtitle="Choose your area of interest and dive into what CONFLUENCE 2026 has to offer."
            className="mb-0"
          />
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold
                       text-[var(--dusty-200)] hover:text-white
                       transition-colors group flex-shrink-0 whitespace-nowrap"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category rows */}
        <div className="flex flex-col rounded-2xl overflow-hidden
                        border border-[rgba(196,216,232,0.14)]
                        bg-[rgba(74,106,138,0.06)]">
          {browseCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={cat.to}
              className="browse-row group"
              aria-label={`Browse ${cat.label}`}
            >
              {/* Index */}
              <span
                className="font-heading font-bold text-2xl md:text-3xl w-10 flex-shrink-0 select-none
                           text-[rgba(196,216,232,0.25)] group-hover:text-[rgba(196,216,232,0.70)]
                           transition-colors duration-300"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Label + desc */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl
                               tracking-tight text-[var(--ink)]
                               group-hover:text-white transition-colors duration-250 mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed
                               line-clamp-1 md:line-clamp-none">
                  {cat.desc}
                </p>
              </div>

              {/* Tag + arrow */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="hidden sm:inline-flex text-[11px] font-semibold tracking-wider uppercase
                                 px-3 py-1 rounded-full border border-[rgba(196,216,232,0.18)]
                                 bg-[rgba(74,106,138,0.12)] text-[var(--dusty-200)]
                                 group-hover:border-[rgba(196,216,232,0.35)]
                                 group-hover:bg-[rgba(74,106,138,0.22)]
                                 transition-all duration-250 whitespace-nowrap">
                  {cat.tag}
                </span>
                <span className="w-10 h-10 rounded-full border border-[rgba(196,216,232,0.18)]
                                 flex items-center justify-center text-[var(--dusty-200)]
                                 group-hover:bg-[var(--dusty-600)]
                                 group-hover:border-[var(--dusty-600)] group-hover:text-white
                                 group-hover:scale-105 transition-all duration-250 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
