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
  Users,
  CheckCircle2,
  Info,
  X,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Instagram,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SectionHeading from '../components/common/SectionHeading';
import { cmeConferenceOverview, cmeDays } from '../data/cme';

/* ── CME Session Details Modal (Styled in Theme Red, matching Event Modal) ── */
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
        {/* Modal Header — Deep Red Curved Header (matches red design requested) */}
        <div className="relative bg-[#913433] p-6 text-white rounded-t-2xl overflow-hidden">
          {/* Decorative faint curves */}
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
              {session.dayBadge || 'CME 2026'}
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

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ece1cf] text-[#913433] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>APPLIED FOR 4 MMC CREDIT POINTS</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2d2b28]">
          {/* Detailed Narrative */}
          <p className="text-sm text-[#2d2b28] leading-relaxed">
            {session.details || session.summary}
          </p>

          {/* Callout Info Cards with Left Solid Red Border */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] border-l-4 border-[#913433] text-xs text-[#2d2b28] leading-relaxed shadow-xs">
              <b>MMC Credit Accreditation:</b> Applied for 4 Maharashtra Medical Council (MMC) credit points. Delegates must attend the full accredited module to be eligible for CME certificate issuance.
            </div>

            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] border-l-4 border-[#913433] text-xs text-[#2d2b28] leading-relaxed shadow-xs">
              <b>Delegate Card Inclusion:</b> Entry to CME masterclasses is covered under the CONFLUENCE Delegate Card (UG, PG, and Post PG tiers). Separate day passes or group bundles are available.
            </div>
          </div>

          {/* Official Curriculum Topics from Brochure */}
          <div className="p-4 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
            <h4 className="font-heading font-bold text-sm text-[#121110] mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#913433]" />
              Official Curriculum Modules (Brochure Page {session.brochurePage})
            </h4>
            <div className="space-y-2">
              {session.topics.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#2d2b28]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#913433] flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Discussion Takeaways */}
          {session.highlights && (
            <div className="p-4 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#913433] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Key Practical Takeaways
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4a453e]">
                {session.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#913433] font-bold">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4 Key Specs Boxes in 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Session Date & Timing
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.date} · {session.time}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.venue}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Conducting Department
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.department}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Target Audience
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {session.audience}
              </b>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Action Bar */}
        <div className="p-4 sm:p-5 bg-[#ece1cf] border-t border-[rgba(100,85,70,0.20)] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6459] block">
              Registration Tier
            </span>
            <div className="text-sm sm:text-base font-extrabold text-[#913433]">
              {session.registrationFee}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold text-[#121110] bg-[#f7f1e6] hover:bg-[#e6dccb] border border-[rgba(100,85,70,0.25)] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold text-white bg-[#913433] hover:bg-[#782928] shadow-md hover:scale-105 transition-all cursor-pointer"
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

/* ── Sleek CME Card (Same Structure as EventCard, with Red Header Design) ── */
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
      {/* Top Red Header Banner (Matching EventCard layout with red palette & curves) */}
      <div className="relative bg-[#913433] px-5 py-4 sm:py-4.5 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        {/* Subtle decorative background curves */}
        <div className="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-14 -top-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border border-white/20 bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-white/95">
            {session.dayBadge || 'CME 2026'}
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
          {/* Title & Subtitle */}
          <div className="mb-2.5">
            <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl leading-snug group-hover:text-[#913433] transition-colors">
              {session.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6459] mt-0.5">
              {session.subtitle}
            </h4>
          </div>

          {/* Quick Date & Accreditation Row */}
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

          {/* Specs Matrix (Compact) */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#f7f1e6] border border-[rgba(100,85,70,0.16)] mb-3 text-xs">
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] block">
                Target Audience
              </span>
              <b className="text-[#121110] font-medium flex items-center gap-1 text-[11px] truncate mt-0.5">
                <Users className="w-3 h-3 text-[#913433] flex-shrink-0" />
                UG · PG · Doctors
              </b>
            </div>
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] block">
                Registration
              </span>
              <b className="text-[#121110] font-medium text-[11px] truncate block mt-0.5">
                Early Bird ₹750+
              </b>
            </div>
          </div>

          {/* Topics Preview List */}
          <div className="space-y-1 mb-4">
            {session.topics.slice(0, 3).map((topic, i) => (
              <div key={i} className="text-xs text-[#2d2b28] flex items-start gap-1.5 line-clamp-1">
                <span className="text-[#913433] text-[10px] mt-0.5">✦</span>
                <span className="truncate">{topic}</span>
              </div>
            ))}
            {session.topics.length > 3 && (
              <span className="text-[10.5px] font-medium text-[#6b6459] block pl-3">
                +{session.topics.length - 3} more curriculum topics
              </span>
            )}
          </div>
        </div>

        {/* Card Action Footer with Equal-Height Two Buttons (matching EventCard) */}
        <div className="pt-3.5 border-t border-[rgba(100,85,70,0.14)] grid grid-cols-2 gap-2.5">
          {/* View Details Button -> Opens Modal Popup */}
          <button
            type="button"
            onClick={() => onOpenDetails(session)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#913433] hover:text-white bg-[#f7f1e6] hover:bg-[#913433] border border-[#913433] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          {/* Register Button */}
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
  const [activeDayTab, setActiveDayTab] = useState('all'); // 'all', '1', '2'
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    title,
    subtitle,
    accreditation,
    venue,
    dates,
    description,
    delegationTiers,
  } = cmeConferenceOverview;

  // Filtered days based on tab
  const displayedDays =
    activeDayTab === 'all'
      ? cmeDays
      : cmeDays.filter((d) => String(d.dayNumber) === activeDayTab);

  return (
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#6b6459] hover:text-[#121110] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Accredited Professional Development"
          title="Continuing Medical"
          highlightWord="Education"
          subtitle={description}
        />

        {/* Official Brochure Spotlight Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.22)] mb-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#913433] text-white tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              {dates}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2d508a] text-white tracking-wide">
              <Award className="w-3.5 h-3.5" />
              {accreditation}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f7f1e6] text-[#4a453e] border border-[rgba(100,85,70,0.22)]">
              <MapPin className="w-3.5 h-3.5 text-[#913433]" />
              {venue}
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-[#121110] text-xl md:text-2xl mb-2">
            {title} — {subtitle}
          </h3>

          <p className="text-sm md:text-base text-[#2d2b28] leading-relaxed mb-6">
            Conducted by senior clinical and forensic faculty from Seth GS Medical College & KEM Hospital. Master vital survival frameworks spanning healthcare economics, clinical violence prevention, medico-legal defense, and evidence-based diagnostic breakthroughs.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[rgba(100,85,70,0.18)]">
            <p className="text-xs md:text-sm text-[#4a453e] leading-relaxed max-w-2xl">
              All registered delegates attending the accredited CME modules will receive official certification and MMC credit points validation. Follow official updates on Instagram.
            </p>
            <a
              href="https://www.instagram.com/confluence_gsmc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-[#913433] hover:bg-[#782928] shadow-sm hover:scale-105 transition-all flex-shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Instagram className="w-4 h-4" />
              <span>@confluence_gsmc</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Day-Wise Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-[rgba(100,85,70,0.18)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b6459] mr-2">
            Schedule View:
          </span>

          <button
            type="button"
            onClick={() => setActiveDayTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeDayTab === 'all'
                ? 'bg-[#913433] text-white shadow-sm'
                : 'bg-[#ece1cf] text-[#4a453e] hover:bg-[#e4d6c2] border border-[rgba(100,85,70,0.18)]'
            }`}
          >
            All Days (4 Masterclasses)
          </button>

          <button
            type="button"
            onClick={() => setActiveDayTab('1')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDayTab === '1'
                ? 'bg-[#913433] text-white shadow-sm'
                : 'bg-[#ece1cf] text-[#4a453e] hover:bg-[#e4d6c2] border border-[rgba(100,85,70,0.18)]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Day 1: 11 Dec (Practitioner Defense & Finance)
          </button>

          <button
            type="button"
            onClick={() => setActiveDayTab('2')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDayTab === '2'
                ? 'bg-[#913433] text-white shadow-sm'
                : 'bg-[#ece1cf] text-[#4a453e] hover:bg-[#e4d6c2] border border-[rgba(100,85,70,0.18)]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Day 2: 12 Dec (Reproductive Care & Psychosomatics)
          </button>
        </div>

        {/* Day-Wise Sections */}
        <div className="space-y-12 mb-16">
          {displayedDays.map((day) => (
            <div key={day.dayNumber} className="relative">
              {/* Day Theme Header Banner */}
              <div className="p-5 md:p-6 rounded-2xl bg-[#ece1cf] border-l-4 border-[#913433] border-t border-r border-b border-[rgba(100,85,70,0.18)] mb-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#913433]">
                    <Calendar className="w-3.5 h-3.5" />
                    {day.dateBadge} · {day.dateLabel}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f7f1e6] text-[#2d508a] border border-[rgba(100,85,70,0.20)] self-start sm:self-auto">
                    2 Accredited Sessions
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl md:text-2xl mb-2 leading-snug">
                  {day.theme}
                </h3>

                <p className="text-xs sm:text-sm text-[#4a453e] leading-relaxed max-w-3xl">
                  {day.summary}
                </p>
              </div>

              {/* Grid of CME Cards for This Day */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {day.sessions.map((session, sIdx) => (
                  <CMECard
                    key={session.id}
                    session={session}
                    index={sIdx}
                    onOpenDetails={(s) => setSelectedSession(s)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Official Delegation Tiers (Brochure Page 23) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#913433] block mb-1">
                Brochure Page 23
              </span>
              <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl">
                CME 2026 Delegation Registration Packages
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#913433] font-bold bg-[#ece1cf] px-3.5 py-1.5 rounded-full border border-[rgba(100,85,70,0.18)]">
              <ShieldCheck className="w-4 h-4" />
              Applied for 4 MMC Credit Points
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {delegationTiers.map((tier) => (
              <div
                key={tier.role}
                className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] p-5 flex flex-col justify-between shadow-xs hover:border-[#913433] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-heading font-bold text-[#121110] text-base">
                      {tier.role}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f7f1e6] text-[#6b6459] border border-[rgba(100,85,70,0.20)]">
                      {tier.badge}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 pt-2 border-t border-[rgba(100,85,70,0.14)]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Early Bird Fee:</span>
                      <span className="font-extrabold text-[#913433] text-base">{tier.earlyBird}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Regular Fee:</span>
                      <span className="font-bold text-[#121110]">{tier.regular}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group (3 Delegates):</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group3}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group (5 Delegates):</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group5}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(100,85,70,0.14)] flex items-center justify-between text-[11px] text-[#6b6459]">
                  <span>MMC Points Included</span>
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
            Attendance verification is conducted via biometric check-in at the Main Auditorium entrance on both days. Certificates with accredited MMC credit points will be dispatched to the registered delegate email address post-conference.
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
