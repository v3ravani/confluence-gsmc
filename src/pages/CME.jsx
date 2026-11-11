import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Info,
  X,
  Instagram,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import { cmeConferenceOverview, cmeDays } from '../data/cme';

/* ── CME Session Details Modal (Informational Only — No Register Button) ── */
function CMEDetailsModal({ session, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!session) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#F6F9FC] dark:bg-[#202124] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#29405B] dark:text-[#B5B3B0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header — Midnight Navy Header Banner */}
        <div className="relative bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] p-6 text-white rounded-t-2xl overflow-hidden">
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
              {session.dayBadge}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2 className="relative z-10 font-heading font-black text-white text-2xl sm:text-3xl tracking-tight leading-tight my-2">
            {session.name}
          </h2>

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0F6] dark:bg-[#323438] text-[#1D344F] dark:text-[#F14666] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>APPLIED FOR 4 MMC CREDIT POINTS</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#29405B] dark:text-[#B5B3B0]">
          <p className="text-sm text-[#29405B] dark:text-[#B5B3B0] leading-relaxed">
            {session.summary}
          </p>

          {/* Official Curriculum Topics directly from the brochure */}
          <div className="p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#536F91] dark:text-[#F14666] mb-3">
              Official Brochure Curriculum (Page {session.brochurePage})
            </h4>
            <div className="space-y-2">
              {session.topics.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#29405B] dark:text-[#B5B3B0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536F91] dark:text-[#9CBB98] flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Notice */}
          <div className="p-3.5 rounded-r-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border-l-4 border-[#536F91] dark:border-[#F14666] text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed">
            <b className="text-[#1D344F] dark:text-[#F2F0ED]">MMC Points Eligibility:</b> Maharashtra Medical Council credit points will be awarded upon completion of accredited CME hours. Attendance verification is mandatory at the session hall.
          </div>

          {/* 4 Specs Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Date &amp; Schedule
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {session.date} ({session.time})
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                Main Auditorium, Seth GSMC &amp; KEMH
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Department
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {session.department}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Eligibility
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {session.audience}
              </b>
            </div>
          </div>
        </div>

        {/* Modal Footer — Informational Only (Register Button Removed) */}
        <div className="p-4 sm:p-5 bg-[#D4E1EF]/60 dark:bg-[#252629] border-t border-[#829DBB]/35 dark:border-[#3B3D41] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
              Registration Fee
            </span>
            <div className="text-sm font-extrabold text-[#1D344F] dark:text-[#F14666]">
              {session.registrationFee}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#323438] dark:hover:bg-[#3B3D41] border border-transparent dark:border-[#3B3D41] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── CME Card (Informational — View Details Only, Register Removed) ── */
function CMECard({ session, index, onOpenDetails }) {
  return (
    <div className="rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-sm hover:shadow-md hover:border-[#536F91] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Midnight Navy Header Banner */}
      <div className="relative bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-5 py-4 sm:py-4.5 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        <div className="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-14 -top-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border border-white/20 bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-white/95">
            {session.dayBadge}
          </span>
        </div>

        <div className="relative z-10">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white/95">
            {String((index ?? 0) + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Department */}
          <div className="mb-2.5">
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-xl leading-snug group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors">
              {session.name}
            </h3>
            <span className="text-xs text-[#536F91] dark:text-[#898A89] font-medium block mt-1">
              {session.department}
            </span>
          </div>

          {/* Date & Accreditation */}
          <div className="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
            <span className="font-semibold text-[#536F91] dark:text-[#EE9590] flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {session.date}
            </span>
            <span className="font-bold text-[#1D344F] dark:text-[#FFCCAA] flex items-center gap-1 flex-shrink-0">
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              4 MMC Points
            </span>
          </div>

          {/* Official Brochure Curriculum Topics */}
          <div className="p-3 rounded-xl bg-[#F6F9FC] dark:bg-[#323438] border border-[#829DBB]/30 dark:border-[#3B3D41] mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#536F91] dark:text-[#F14666] block mb-2">
              Curriculum Topics (Brochure Page {session.brochurePage})
            </span>
            <ul className="space-y-1.5">
              {session.topics.map((t, i) => (
                <li key={i} className="text-xs text-[#29405B] dark:text-[#B5B3B0] flex items-start gap-1.5">
                  <span className="text-[#536F91] dark:text-[#F14666] font-bold text-[10px] mt-0.5">✦</span>
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card Footer: View Details Button Only */}
        <div className="pt-3.5 border-t border-[#829DBB]/25 dark:border-[#3B3D41]">
          <button
            type="button"
            onClick={() => onOpenDetails(session)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#323438] dark:hover:bg-[#3B3D41] border border-transparent dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CME() {
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    accreditation,
    venue,
    dates,
    delegationTiers,
  } = cmeConferenceOverview;

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="CME 2026" />
      <div className="wrap relative z-10">

        {/* Back link (Desktop) */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#536F91] hover:text-[#1D344F] dark:text-[#898A89] dark:hover:text-[#F2F0ED] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* 1. Existing CME Page Content */}
        <SectionHeading
          eyebrow="Continuing Medical Education"
          title="CME"
          highlightWord="2026"
          subtitle="Accredited medical masterclasses conducted by clinical and forensic faculty from Seth GS Medical College & KEM Hospital, Mumbai."
        />

        {/* Academic Overview Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1D344F] dark:bg-[#F14666] text-white tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              {dates}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#536F91] dark:bg-[#323438] text-white tracking-wide border dark:border-[#3B3D41]">
              <Award className="w-3.5 h-3.5" />
              {accreditation}
            </span>
            <span className="text-xs text-[#29405B] dark:text-[#B5B3B0] font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#536F91] dark:text-[#F14666]" />
              {venue}
            </span>
          </div>

          <a
            href="https://www.instagram.com/confluence_gsmc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D344F] dark:text-[#F14666] hover:underline"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@confluence_gsmc</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* 2. Delegation Rates (Above Day 1 & Day 2 Events, Register Links Removed) */}
        <div className="mb-14">
          <div className="mb-5">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#536F91] dark:text-[#F14666] block mb-1">
              Official Brochure · Page 23
            </span>
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-xl">
              CME 2026 Delegation Rates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {delegationTiers.map((tier) => (
              <div
                key={tier.role}
                className="rounded-2xl bg-[#D4E1EF]/65 dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
                    <h4 className="font-heading font-bold text-[#1D344F] dark:text-[#F2F0ED] text-base">
                      {tier.role}
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F6F9FC] dark:bg-[#323438] text-[#536F91] dark:text-[#898A89] border border-[#829DBB]/35 dark:border-[#3B3D41]">
                      {tier.badge}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#536F91] dark:text-[#898A89]">Early Bird:</span>
                      <span className="font-extrabold text-[#1D344F] dark:text-[#F14666] text-base">{tier.earlyBird}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#536F91] dark:text-[#898A89]">Regular:</span>
                      <span className="font-bold text-[#1D344F] dark:text-[#F2F0ED]">{tier.regular}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#536F91] dark:text-[#898A89]">Group of 3:</span>
                      <span className="font-semibold text-[#536F91] dark:text-[#EE9590]">{tier.group3}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#536F91] dark:text-[#898A89]">Group of 5:</span>
                      <span className="font-semibold text-[#536F91] dark:text-[#EE9590]">{tier.group5}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#829DBB]/30 dark:border-[#3B3D41] flex items-center justify-between text-[11px] text-[#536F91] dark:text-[#898A89]">
                  <span>4 MMC Points Included</span>
                  <span className="font-bold text-[#1D344F] dark:text-[#FFCCAA]">GSMC &amp; KEMH</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 & 4. Day 1 Events followed by Day 2 Events */}
        <div className="space-y-14 mb-12">
          {cmeDays.map((day) => (
            <div key={day.dayNumber}>
              {/* Day Header */}
              <div className="mb-6 pb-3 border-b border-[#829DBB]/35 dark:border-[#3B3D41]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#536F91] dark:text-[#F14666] block mb-1">
                  {day.dateBadge} · {day.dateLabel}
                </span>
                <h3 className="font-heading font-black text-[#1D344F] dark:text-[#F2F0ED] text-xl sm:text-2xl leading-snug">
                  {day.theme}
                </h3>
              </div>

              {/* Cards Grid (Equal-Height) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {day.sessions.map((session, sIdx) => (
                  <CMECard
                    key={session.id}
                    session={session}
                    index={day.dayNumber === 1 ? sIdx : sIdx + 2}
                    onOpenDetails={(s) => setSelectedSession(s)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-5 rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] flex items-start gap-3 shadow-xs">
          <span className="text-[#536F91] dark:text-[#F14666] mt-0.5 flex-shrink-0 text-lg">✦</span>
          <p className="text-sm text-[#29405B] dark:text-[#B5B3B0] leading-relaxed">
            Attendance verification is conducted via check-in at the Main Auditorium entrance on both days. Certificates with accredited MMC credit points will be provided to registered delegates post-conference.
          </p>
        </div>
      </div>

      {/* Details Modal */}
      {selectedSession && (
        <CMEDetailsModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}
