import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Info,
  X,
  ShieldCheck,
  Instagram,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import { cmeConferenceOverview, cmeDays } from '../data/cme';

/* ── CME Session Details Modal (Red Header Design, Academic Syllabus) ── */
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

  const handleRegister = () => {
    if (session.googleFormUrl) {
      window.open(session.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Registration for "${session.name}" will open shortly.`);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#e2d4c0] border border-[rgba(100,85,70,0.25)] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#2d2b28]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header — Red Header Banner matching Event Modal */}
        <div className="relative bg-[#913433] p-6 text-white rounded-t-2xl overflow-hidden">
          {/* Subtle curved background circles */}
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

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece1cf] text-[#913433] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>APPLIED FOR 4 MMC CREDIT POINTS</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2d2b28]">
          <p className="text-sm text-[#2d2b28] leading-relaxed">
            {session.summary}
          </p>

          {/* Official Curriculum Topics directly from the brochure */}
          <div className="p-4 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#913433] mb-3">
              Official Brochure Curriculum (Page {session.brochurePage})
            </h4>
            <div className="space-y-2">
              {session.topics.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2d2b28]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#913433] flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Notice */}
          <div className="p-3.5 rounded-r-xl bg-[#ece1cf] border-l-4 border-[#913433] text-xs text-[#2d2b28] leading-relaxed">
            <b>MMC Points Eligibility:</b> Maharashtra Medical Council credit points will be awarded upon completion of accredited CME hours. Attendance verification is mandatory at the session hall.
          </div>

          {/* 4 Specs Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Date &amp; Schedule
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.date} ({session.time})
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                Main Auditorium, Seth GSMC &amp; KEMH
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Department
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.department}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Eligibility
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.audience}
              </b>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-[#ece1cf] border-t border-[rgba(100,85,70,0.20)] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6459] block">
              Registration Fee
            </span>
            <div className="text-sm font-extrabold text-[#913433]">
              {session.registrationFee}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#121110] bg-[#f7f1e6] hover:bg-[#e6dccb] border border-[rgba(100,85,70,0.25)] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#913433] hover:bg-[#782928] shadow-md transition-all cursor-pointer"
            >
              <span>Register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── CME Card (Same layout as EventCard, with Red Header Design) ── */
function CMECard({ session, index, onOpenDetails }) {
  const handleRegister = (e) => {
    e.stopPropagation();
    if (session.googleFormUrl) {
      window.open(session.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Registration for "${session.name}" will open shortly.`);
    }
  };

  return (
    <div className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] shadow-sm hover:shadow-md hover:border-[#913433] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Red Header Banner (Matching EventCard layout with red theme) */}
      <div className="relative bg-[#913433] px-5 py-4 sm:py-4.5 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        {/* Subtle decorative curves */}
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
            <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl leading-snug group-hover:text-[#913433] transition-colors">
              {session.name}
            </h3>
            <span className="text-xs text-[#6b6459] font-medium block mt-1">
              {session.department}
            </span>
          </div>

          {/* Date & Accreditation */}
          <div className="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-[rgba(100,85,70,0.12)]">
            <span className="font-semibold text-[#913433] flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {session.date}
            </span>
            <span className="font-bold text-[#2d508a] flex items-center gap-1 flex-shrink-0">
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              4 MMC Points
            </span>
          </div>

          {/* Official Brochure Curriculum Topics */}
          <div className="p-3 rounded-xl bg-[#f7f1e6] border border-[rgba(100,85,70,0.16)] mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#913433] block mb-2">
              Curriculum Topics (Brochure Page {session.brochurePage})
            </span>
            <ul className="space-y-1.5">
              {session.topics.map((t, i) => (
                <li key={i} className="text-xs text-[#2d2b28] flex items-start gap-1.5">
                  <span className="text-[#913433] font-bold text-[10px] mt-0.5">✦</span>
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card Footer: View Details & Register Buttons */}
        <div className="pt-3.5 border-t border-[rgba(100,85,70,0.14)] grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenDetails(session)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#913433] hover:text-white bg-[#f7f1e6] hover:bg-[#913433] border border-[#913433] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-[#913433] hover:bg-[#782928] transition-all cursor-pointer shadow-xs"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
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
    title,
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
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] hover:text-[#121110] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Continuing Medical Education"
          title="CME"
          highlightWord="2026"
          subtitle="Accredited medical masterclasses conducted by clinical and forensic faculty from Seth GS Medical College & KEM Hospital, Mumbai."
        />

        {/* Academic Overview Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.20)] mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#913433] text-white tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              {dates}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2d508a] text-white tracking-wide">
              <Award className="w-3.5 h-3.5" />
              {accreditation}
            </span>
            <span className="text-xs text-[#4a453e] font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#913433]" />
              {venue}
            </span>
          </div>

          <a
            href="https://www.instagram.com/confluence_gsmc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#913433] hover:underline"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@confluence_gsmc</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Sequential Day-by-Day Curriculum */}
        <div className="space-y-14 mb-16">
          {cmeDays.map((day) => (
            <div key={day.dayNumber}>
              {/* Day Header */}
              <div className="mb-6 pb-3 border-b border-[rgba(100,85,70,0.20)]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#913433] block mb-1">
                  {day.dateBadge} · {day.dateLabel}
                </span>
                <h3 className="font-heading font-black text-[#121110] text-xl sm:text-2xl leading-snug">
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

        {/* Official Delegation Packages (Brochure Page 23) */}
        <div className="mb-12">
          <div className="mb-4">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#913433] block mb-1">
              Official Brochure · Page 23
            </span>
            <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl">
              CME 2026 Delegation Rates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {delegationTiers.map((tier) => (
              <div
                key={tier.role}
                className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[rgba(100,85,70,0.14)]">
                    <h4 className="font-heading font-bold text-[#121110] text-base">
                      {tier.role}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f7f1e6] text-[#6b6459] border border-[rgba(100,85,70,0.20)]">
                      {tier.badge}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Early Bird:</span>
                      <span className="font-extrabold text-[#913433] text-base">{tier.earlyBird}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Regular:</span>
                      <span className="font-bold text-[#121110]">{tier.regular}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group of 3:</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group3}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group of 5:</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group5}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(100,85,70,0.14)] flex items-center justify-between text-[11px] text-[#6b6459]">
                  <span>4 MMC Points Included</span>
                  <a
                    href="https://www.instagram.com/confluence_gsmc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#913433] hover:underline flex items-center gap-1"
                  >
                    REGISTER <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-5 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] flex items-start gap-3">
          <span className="text-[#913433] mt-0.5 flex-shrink-0 text-lg">✦</span>
          <p className="text-sm text-[#2d2b28] leading-relaxed">
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
