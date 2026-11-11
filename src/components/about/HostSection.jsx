import React from 'react';
import { Building2, GraduationCap, HeartPulse, Award, MapPin } from 'lucide-react';
import { hostInfo } from '../../data/about';

export default function HostSection() {
  const statIcons = [
    <Award className="w-4 h-4 text-[var(--accent-blush)]" />,
    <GraduationCap className="w-4 h-4 text-[var(--dusty-400)]" />,
    <HeartPulse className="w-4 h-4 text-[var(--accent-blush)]" />,
    <Building2 className="w-4 h-4 text-[var(--dusty-400)]" />,
  ];

  return (
    <section className="pt-16 pb-14 border-t border-[rgba(196,216,232,0.12)]">
      {/* Eyebrow & Title */}
      <div className="mb-10">
        <span className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-blush)] mb-2 block">
          {hostInfo.eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-2">
          {hostInfo.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[var(--dusty-400)]">
          <span>{hostInfo.collegeName}</span>
          <span className="text-[var(--accent-blush)]">·</span>
          <span className="inline-flex items-center gap-1 text-[var(--dusty-200)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
            {hostInfo.location}
          </span>
        </div>
      </div>

      {/* Grid: Description & Stats on Left (7 cols), Campus Visual Showcase on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12">
        {/* Paragraphs from brochure */}
        <div className="lg:col-span-7 space-y-5 text-[var(--muted)] text-base md:text-[16.5px] leading-relaxed">
          {hostInfo.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'text-white/95 font-medium' : ''}>
              {p}
            </p>
          ))}

          {/* Institutional Highlights Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {hostInfo.stats.map((s, idx) => (
              <div
                key={s.label}
                className="card-glass p-4 rounded-xl border border-[rgba(196,216,232,0.14)] bg-[rgba(74,106,138,0.08)] flex items-start gap-3.5"
              >
                <div className="p-2 rounded-lg bg-[rgba(74,106,138,0.18)] flex-shrink-0 mt-0.5">
                  {statIcons[idx % statIcons.length]}
                </div>
                <div>
                  <b className="block text-white font-heading font-bold text-base leading-tight">
                    {s.value}
                  </b>
                  <span className="block text-xs font-semibold text-[var(--dusty-200)] tracking-wide uppercase mt-0.5">
                    {s.label}
                  </span>
                  <small className="block text-[11px] text-[var(--dusty-400)] leading-snug mt-1">
                    {s.detail}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Campus Photo Card on Right */}
        <div className="lg:col-span-5 w-full">
          <div className="card-glass p-3.5 rounded-2xl overflow-hidden group">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-[#0f1824]">
              <img
                src={hostInfo.campusPhotos[0].src}
                alt={hostInfo.campusPhotos[0].alt}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-snug px-1 mb-1">
              {hostInfo.campusPhotos[0].title}
            </h4>
            <p className="text-xs text-[var(--muted)] px-1 leading-relaxed">
              {hostInfo.campusPhotos[0].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Campus Photos Gallery: 3-column responsive row */}
      <div>
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[var(--dusty-400)]">
            Campus Architecture & Medical Facilities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hostInfo.campusPhotos.map((photo) => (
            <div
              key={photo.title}
              className="card-glass rounded-xl overflow-hidden group hover:border-[rgba(196,216,232,0.35)] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1824]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-bold text-white text-sm mb-1.5 group-hover:text-[var(--dusty-200)] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

