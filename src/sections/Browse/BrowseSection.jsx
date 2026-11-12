import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';

// ── Configurable browse categories ──────────────────────────────────────────
const browseCategories = [
  {
    id:    'events',
    label: 'EVENT',
    desc:  'Scientific paper presentations, case reports, clinical competitions & medical quizzes.',
    to:    '/events',
  },
  {
    id:    'workshops',
    label: 'WORKSHOP',
    desc:  'Hands-on clinical skill modules, simulation masterclasses & procedural training.',
    to:    '/workshops',
  },
  {
    id:    'merchandise',
    label: 'MERCHANDISE',
    desc:  'Official conference apparel, delegate kits & premium CONFLUENCE 2026 collectibles.',
    to:    '/merchandise',
  },
  {
    id:    'cme',
    label: 'CME',
    desc:  'Accredited Continuing Medical Education programmes for residents & consultants.',
    to:    '/cme',
  },
  {
    id:    'gallery',
    label: 'GALLERY',
    desc:  'Photos and visual memories from previous CONFLUENCE editions and medical campus life.',
    to:    '/gallery',
  },
];

export default function BrowseSection() {
  return (
    <section id="browse" className="py-16 md:py-24 relative border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
      <div className="wrap">
        {/* Header row (View All removed per user request) */}
        <div className="mb-10">
          <SectionHeading
            eyebrow="Explore CONFLUENCE"
            title="Browse"
            highlightWord="Categories"
            subtitle="Choose your area of interest and dive into what CONFLUENCE 2026 has to offer."
            className="mb-0"
          />
        </div>

        {/* Category rows */}
        <div className="flex flex-col rounded-2xl overflow-hidden
                        border border-[#829DBB]/40 dark:border-[#3B3D41]
                        bg-[#EAF0F6] dark:bg-[#2B2D30] shadow-sm">
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
                           text-[#829DBB] dark:text-[#898A89] group-hover:text-[var(--accent-blue)] dark:group-hover:text-[#F14666]
                           transition-colors duration-300"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Label + desc */}
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl
                               tracking-tight text-[#1D344F] dark:text-[#F2F0ED]
                               group-hover:text-[var(--accent-blue)] dark:group-hover:text-[#F14666] transition-colors duration-250 mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs md:text-sm text-[var(--muted)] dark:text-[#B5B3B0] dark:group-hover:text-[#F2F0ED]/90 leading-relaxed
                               line-clamp-1 md:line-clamp-none transition-colors">
                  {cat.desc}
                </p>
              </div>

              {/* Slanted thick blue arrow pointing right upwards (badges removed per user request) */}
              <div className="flex items-center flex-shrink-0">
                <ArrowUpRight
                  strokeWidth={2.8}
                  className="w-6 h-6 md:w-7 md:h-7 text-[#1D344F] dark:text-[#F14666] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
