import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Users, Award } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import ScrollParallaxMedia from '../components/common/ScrollParallaxMedia';
import SectionHeading from '../components/common/SectionHeading';
import SEO from '../components/common/SEO';
import { chiefOrganisers, organisers } from '../data/team';

function ChiefOrganiserCard({ member }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="group rounded-2xl overflow-hidden bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] hover:border-[#536F91] dark:hover:border-[#F14666] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      {/* Main Focus: Prominent Portrait Photo with mild desktop opposite-direction scroll parallax */}
      <div className="relative h-44 sm:h-60 md:h-64 w-full overflow-hidden bg-[#D4E1EF] dark:bg-[#1E2022]">
        <ScrollParallaxMedia targetRef={cardRef} offsetPx={10} scale={1.08} className="w-full h-full">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.designation}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </ScrollParallaxMedia>
      </div>

      {/* Details: Name, Designation & Clickable Number */}
      <div className="p-3 sm:p-4 bg-[#1D344F] dark:bg-[#252629] text-white text-center flex-1 flex flex-col items-center justify-center border-t border-[#536F91]/40 dark:border-[#3B3D41] relative z-10">
        <h2 className="font-heading font-black text-xs sm:text-base tracking-wide text-white leading-tight break-words">
          {member.name}
        </h2>
        <span className="inline-block mt-0.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#D4E1EF] dark:text-[#EE9590]">
          {member.designation}
        </span>
        <a
          href={`tel:${member.phone}`}
          className="mt-2 inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 hover:bg-white/25 dark:bg-[#F14666]/20 dark:hover:bg-[#F14666]/35 text-white border border-white/20 dark:border-[#F14666]/40 transition-colors"
        >
          <Phone className="w-3 h-3 flex-shrink-0" />
          <span>{member.phone}</span>
        </a>
      </div>
    </div>
  );
}

function OrganiserCard({ member, isLast }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`group rounded-xl sm:rounded-2xl overflow-hidden bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] hover:border-[#536F91] dark:hover:border-[#F14666] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${
        isLast ? 'col-span-2 sm:col-span-1 max-w-[calc(50%-6px)] sm:max-w-none mx-auto w-full' : ''
      }`}
    >
      {/* Compact Portrait Frame with mild desktop opposite-direction scroll parallax */}
      <div className="relative h-32 sm:h-40 lg:h-44 w-full overflow-hidden bg-[#D4E1EF] dark:bg-[#1E2022]">
        <ScrollParallaxMedia targetRef={cardRef} offsetPx={9} scale={1.08} className="w-full h-full">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.designation}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        </ScrollParallaxMedia>
      </div>

      {/* Compact Name & Role */}
      <div className="p-2.5 sm:p-3 bg-[#1D344F] dark:bg-[#252629] text-white text-center border-t border-[#536F91]/40 dark:border-[#3B3D41] flex-1 flex flex-col justify-center relative z-10">
        <h3 className="font-heading font-extrabold text-xs sm:text-[13px] tracking-wide text-white leading-tight break-words">
          {member.name}
        </h3>
        <span className="inline-block mt-0.5 text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#D4E1EF] dark:text-[#EE9590]">
          {member.designation}
        </span>
      </div>
    </div>
  );
}

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Organising Committee & Secretariat | CONFLUENCE 2026 | Seth GSMC Mumbai"
        description="Meet the Organising Committee, Chief Organisers, and student leadership behind CONFLUENCE 2026 at Seth GS Medical College & KEM Hospital, Mumbai."
        canonicalUrl="https://confluencegsmc.in/team"
      />
      <div className="pt-0 pb-10 md:py-10 relative min-h-screen overflow-x-clip">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="MEET THE TEAM" />

      <div className="wrap relative z-10">
        {/* Back link (Desktop) */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-xs sm:text-sm text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Organising Committee"
          title="Meet the"
          highlightWord="Team"
          subtitle="Chief Organisers and Organisers of CONFLUENCE 2026 at Seth GS Medical College & KEM Hospital, Mumbai."
          className="mb-6 md:mb-7"
        />

        {/* ── 1. Chief Organisers (Photo-First Vertical Portrait Cards) ── */}
        <section className="mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <span className="h-px w-8 sm:w-14 bg-[#829DBB]/50 dark:bg-[#3B3D41]" />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#1D344F] dark:text-[#F14666]">
              <Award className="w-3.5 h-3.5" />
              Chief Organisers
            </span>
            <span className="h-px w-8 sm:w-14 bg-[#829DBB]/50 dark:bg-[#3B3D41]" />
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-6 max-w-xl mx-auto">
            {chiefOrganisers.map((member) => (
              <ChiefOrganiserCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* ── 2. Organisers (Single Row on Desktop, Compact Grid on Mobile) ─ */}
        <section className="mb-7 md:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 sm:w-14 bg-[#829DBB]/50 dark:bg-[#3B3D41]" />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#536F91] dark:text-[#EE9590]">
              <Users className="w-3.5 h-3.5" />
              Organisers
            </span>
            <span className="h-px w-8 sm:w-14 bg-[#829DBB]/50 dark:bg-[#3B3D41]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {organisers.map((member, idx) => (
              <OrganiserCard
                key={member.id}
                member={member}
                isLast={idx === organisers.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Compact Official Secretariat Email Strip */}
        <div className="max-w-4xl mx-auto px-4 py-3.5 rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#536F91] dark:text-[#F14666] mr-2">
              Organising Secretariat:
            </span>
            <span className="text-xs text-[#29405B] dark:text-[#B5B3B0]">
              Official delegate enquiries, submissions &amp; correspondence
            </span>
          </div>
          <a
            href="mailto:confluencegsmc@kem.edu"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>confluencegsmc@kem.edu</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
