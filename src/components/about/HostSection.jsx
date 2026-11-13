import React from 'react';
import { Building2, GraduationCap, HeartPulse, Award, MapPin } from 'lucide-react';
import { hostInfo } from '../../data/about';

export default function HostSection() {
  const statIcons = [
    <Award className="w-4 h-4 text-[var(--accent-crimson)]" />,
    <GraduationCap className="w-4 h-4 text-[var(--accent-blue)]" />,
    <HeartPulse className="w-4 h-4 text-[var(--accent-crimson)]" />,
    <Building2 className="w-4 h-4 text-[var(--accent-blue)]" />,
  ];

  return (
    <section className="pt-16 pb-14 border-t border-[#829DBB]/30 dark:border-[#3B3D41]">
      {/* Eyebrow & Title */}
      <div className="mb-10">
        <span className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-crimson)] mb-2 block">
          {hostInfo.eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] tracking-tight leading-tight mb-2">
          {hostInfo.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[var(--muted)]">
          <span>{hostInfo.collegeName}</span>
          <span className="text-[var(--accent-crimson)]">·</span>
          <span className="inline-flex items-center gap-1 text-[var(--accent-blue)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
            {hostInfo.location}
          </span>
        </div>
      </div>

      {/* Grid: Description & Stats on Left (7 cols), Campus Visual Showcase on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12">
        {/* Paragraphs from brochure */}
        <div className="lg:col-span-7 space-y-5 text-[var(--ink-2)] text-base md:text-[16.5px] leading-relaxed">
          {hostInfo.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'text-[#1D344F] dark:text-[#F2F0ED] font-semibold' : ''}>
              {p}
            </p>
          ))}

          {/* Institutional Highlights Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {hostInfo.stats.map((s, idx) => (
              <div
                key={s.label}
                className="card-glass p-4 rounded-xl border border-[#829DBB]/40 dark:border-[#3B3D41] bg-[#EAF0F6] dark:bg-[#2B2D30] flex items-start gap-3.5 shadow-sm"
              >
                <div className="p-2 rounded-lg bg-[#D4E1EF]/80 dark:bg-[#323438] flex-shrink-0 mt-0.5 border border-[#829DBB]/35 dark:border-[#3B3D41]">
                  {statIcons[idx % statIcons.length]}
                </div>
                <div>
                  <b className="block text-[#1D344F] dark:text-[#F2F0ED] font-heading font-bold text-base leading-tight">
                    {s.value}
                  </b>
                  <span className="block text-xs font-bold text-[var(--accent-blue)] tracking-wide uppercase mt-0.5">
                    {s.label}
                  </span>
                  <small className="block text-[11px] text-[var(--muted)] leading-snug mt-1">
                    {s.detail}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Campus Photo Card on Right */}
        <div className="lg:col-span-5 w-full">
          <div className="card-glass p-3.5 rounded-2xl overflow-hidden group shadow-sm">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-[#D4E1EF] dark:bg-[#323438]">
              <img
                src={hostInfo.campusPhotos[0].src}
                alt={hostInfo.campusPhotos[0].alt}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h4 className="font-heading font-bold text-[#1D344F] dark:text-[#F2F0ED] text-sm sm:text-base leading-snug px-1 mb-1">
              {hostInfo.campusPhotos[0].title}
            </h4>
            <p className="text-xs text-[var(--muted)] px-1 leading-relaxed">
              {hostInfo.campusPhotos[0].subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

