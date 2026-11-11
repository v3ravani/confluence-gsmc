import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Users,
  Trophy,
  MapPin,
  Phone,
  FileText,
  Search,
  BookOpen,
  Award,
  Sparkles,
  AlertCircle,
  HelpCircle,
  X,
  ExternalLink,
  Info,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import { scientificEvents, conferenceInfo } from '../data/events';

/* ── Sleek Compact Event Card (Equal Height, Reduced Height, Badges Removed) ── */
function EventCard({ event, index, onOpenDetails }) {
  const handleRegister = (e) => {
    e.stopPropagation();
    if (event.googleFormUrl) {
      window.open(event.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `Registration for "${event.name}" is coordinated directly through the event desk.\n\nPlease contact event coordinator: ${event.coordinator.name} at ${event.coordinator.phone}.`
      );
    }
  };

  return (
    <div className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] shadow-sm hover:shadow-md hover:border-[#2d508a] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Blue Header Banner (Slightly increased height with decorative curves & icon design) */}
      <div className="relative bg-[#2d508a] px-5 py-4 sm:py-4.5 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        {/* Subtle decorative background curves */}
        <div className="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-14 -top-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border border-white/20 bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-white/95">
            {event.category || 'Scientific'}
          </span>
        </div>

        <div className="relative z-10">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white/95">
            {String((index ?? 0) + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Card Body — Trimmed vertical spacing for compact height */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <div className="mb-2.5">
            <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl leading-snug group-hover:text-[#2d508a] transition-colors">
              {event.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6459] mt-0.5">
              {event.subtitle}
            </h4>
          </div>

          {/* Quick Date & Prize Row */}
          <div className="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-[rgba(100,85,70,0.12)]">
            <span className="font-semibold text-[#2d508a] flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {event.rounds?.[0]?.date || 'September 2026'}
            </span>
            <span className="font-bold text-[#913433] flex items-center gap-1 flex-shrink-0">
              <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
              {event.prizes[0] ? event.prizes[0].amount : event.totalPrize}
            </span>
          </div>

          {/* Specs Matrix (Compact) */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#f7f1e6] border border-[rgba(100,85,70,0.16)] mb-3 text-xs">
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] block">
                Team Size
              </span>
              <b className="text-[#121110] font-medium flex items-center gap-1 text-[11.5px] truncate mt-0.5">
                <Users className="w-3 h-3 text-[#2d508a] flex-shrink-0" />
                {event.teamStructure.size}
              </b>
            </div>
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] block">
                Registration Fee
              </span>
              <b className="text-[#121110] font-medium text-[11.5px] truncate block mt-0.5">
                {event.pricing.earlyBird.split('(')[0]}
              </b>
            </div>
          </div>

          {/* Compact 2-line Description */}
          <p className="text-xs text-[#2d2b28] leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Card Action Footer with Equal-Height Two Buttons */}
        <div className="pt-3.5 border-t border-[rgba(100,85,70,0.14)] grid grid-cols-2 gap-2.5">
          {/* View Details Button -> Opens Modal Popup */}
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#2d508a] hover:text-white bg-[#f7f1e6] hover:bg-[#2d508a] border border-[#2d508a] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          {/* Register Button -> Direct Google Form Action */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-[#2d508a] hover:bg-[#203c6b] transition-all cursor-pointer shadow-xs"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Event Detail Modal Popup ───────────────────────────────────── */
function EventDetailModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleRegister = () => {
    if (event.googleFormUrl) {
      window.open(event.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `Registration for "${event.name}" is coordinated directly through the event desk.\n\nPlease contact event coordinator: ${event.coordinator.name} at ${event.coordinator.phone}.`
      );
    }
  };

  const handleOpenRulebook = () => {
    if (event.rulebookUrl) {
      window.open(event.rulebookUrl, '_blank', 'noopener,noreferrer');
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
        {/* Modal Header — Deep Blue Curved Header (matches Inspo Image 2) */}
        <div className="relative bg-[#2d508a] p-6 text-white rounded-t-2xl overflow-hidden">
          {/* Decorative faint curves */}
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
              {event.category || 'Scientific Events'}
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
            {event.name}
          </h2>

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ece1cf] text-[#121110] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <span>OPEN FOR REGISTRATION</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2d2b28]">
          {/* Description */}
          <p className="text-sm text-[#2d2b28] leading-relaxed">
            {event.description}
          </p>

          {/* Callout Info Cards with Left Solid Blue Border (matches Inspo Image 2) */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] border-l-4 border-[#2d508a] text-xs text-[#2d2b28] leading-relaxed shadow-xs">
              <b>Multiple registrations allowed.</b> Multiple registrations are allowed if you wish to register for more than one subject: add the event, then choose the number of entries in your cart. Each entry is registered separately.
            </div>

            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] border-l-4 border-[#2d508a] text-xs text-[#2d2b28] leading-relaxed shadow-xs">
              A delegate card is not needed for participation in the preliminary round. However, on selection for the final round, a purchase of the delegate card is mandatory.
            </div>
          </div>

          {/* 4 Key Specs Boxes in 2x2 Grid (matches Inspo Image 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Format
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {event.rounds?.[0]?.format || 'Online Prelims and Offline Finals'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Date
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                {event.rounds?.[0]?.date || 'September 2026'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#121110] font-bold block mt-0.5">
                Seth GSMC & KEM Hospital, Mumbai
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] text-[#6b6459] font-semibold uppercase tracking-wider block">
                Prize Pool
              </span>
              <b className="text-xs text-[#913433] font-bold block mt-0.5">
                {event.totalPrize}
              </b>
            </div>
          </div>

          {/* Eligibility & Team Structure */}
          <div className="p-4 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] space-y-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] block">
                Team Structure
              </span>
              <p className="text-xs text-[#121110] font-semibold mt-0.5">
                {event.teamStructure.size} — <span className="font-normal text-[#2d2b28]">{event.teamStructure.rules}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-[rgba(100,85,70,0.12)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] block mb-1">
                Eligibility
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.eligibility.map((el) => (
                  <span key={el} className="px-2 py-0.5 rounded-md bg-[#f7f1e6] text-[#121110] text-[11px] font-medium border border-[rgba(100,85,70,0.18)]">
                    ✦ {el}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cash Prizes Breakdown */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] block mb-2">
                Prize Breakdown ({event.totalPrize})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {event.prizes.map((prz) => (
                  <div key={prz.rank} className="p-2 rounded-lg bg-[#f7f1e6] border border-[rgba(100,85,70,0.16)] text-center">
                    <span className="text-[10px] text-[#6b6459] font-semibold uppercase block">{prz.rank}</span>
                    <b className="text-[#913433] text-xs font-bold">{prz.amount}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Contact & Rulebook */}
          <div className="pt-2 border-t border-[rgba(100,85,70,0.16)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#2d2b28]">
              Coordinator: <b className="text-[#121110]">{event.coordinator.name}</b>
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${event.coordinator.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-1.5 text-[#2d508a] hover:underline font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                {event.coordinator.phone}
              </a>
              {event.rulebookUrl && (
                <button
                  type="button"
                  onClick={handleOpenRulebook}
                  className="inline-flex items-center gap-1 text-[#913433] hover:underline font-medium cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Rulebook</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions (matches Inspo Image 2 with red Register button) */}
        <div className="p-4 sm:px-6 border-t border-[rgba(100,85,70,0.22)] bg-[#ded2c0] flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <b className="text-xl sm:text-2xl font-black text-[#121110] leading-none">
              {event.pricing.earlyBird.split('(')[0].trim()}
            </b>
            <span className="text-[11px] text-[#6b6459] mt-0.5">
              Per participant
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#121110] hover:bg-black/5 border border-[#121110] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-xs text-white bg-[#913433] hover:bg-[#782827] shadow-sm hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
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

/* ── Main Events Page ───────────────────────────────────────────── */
export default function Event() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Medical Quizzes',
    'Symposium',
    'Clinical Cases',
    'Research & Presentations',
  ];

  // Filter events
  const filteredEvents = scientificEvents.filter((ev) => {
    const matchesCategory =
      selectedCategory === 'All' || ev.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ev.name.toLowerCase().includes(q) ||
      ev.subtitle.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.syllabus.some((s) => s.toLowerCase().includes(q)) ||
      ev.eligibility.some((el) => el.toLowerCase().includes(q)) ||
      ev.coordinator.name.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="EVENTS" />
      <div className="wrap relative z-10">

        {/* Back Link (Desktop) */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] hover:text-[#121110] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Section Heading */}
        <SectionHeading
          eyebrow="Academic Competitions & Quizzes"
          title="Scientific"
          highlightWord="Events"
          subtitle="Seven premier medical competitions spanning foundational sciences, clinicopathological deduction, original research papers, and the flagship intercollegiate symposium."
        />

        {/* Fast Key Stats Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            { label: 'Official Events', value: '7 Competitions', sub: 'Quizzes, Papers, Cases & Symposium' },
            { label: 'Total Prize Pool', value: '₹1,70,000+', sub: 'Cash awards & certificates' },
            { label: 'Format', value: 'Hybrid Track', sub: 'Online screening + Campus finals' },
            { label: 'Target Delegates', value: 'UG & PG Streams', sub: 'MBBS, Interns & Residents' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 sm:p-4 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] shadow-xs"
            >
              <b className="block font-heading font-bold text-[#121110] text-base sm:text-lg leading-tight">
                {stat.value}
              </b>
              <span className="block text-[11px] font-semibold text-[#913433] uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
              <small className="block text-[10.5px] text-[#6b6459] leading-tight mt-1">
                {stat.sub}
              </small>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#913433] text-white shadow-sm'
                    : 'text-[#2d2b28] hover:text-[#121110] hover:bg-[rgba(100,85,70,0.12)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-[#6b6459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by event, subject, rule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.20)] focus:border-[#2d508a] focus:outline-none text-xs text-[#121110] placeholder-[#6b6459] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6b6459] hover:text-[#121110]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Equal-Height Responsive Event Cards Grid ─────────────── */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-14 items-stretch">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onOpenDetails={setActiveModalEvent}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl mb-14 bg-[#ece1cf] border border-[rgba(100,85,70,0.18)]">
            <HelpCircle className="w-10 h-10 text-[#6b6459] mx-auto mb-3 opacity-60" />
            <h4 className="text-[#121110] font-heading font-bold text-lg mb-1">
              No matching events found
            </h4>
            <p className="text-sm text-[#6b6459] mb-4">
              Try adjusting your search query or reset the category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#2d508a] text-white hover:bg-[#203c6b] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Registration Notes Banner */}
        <div className="p-6 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[#f7f1e6] border border-[rgba(100,85,70,0.16)] text-[#913433] flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-[#2d2b28] leading-relaxed space-y-1.5">
            <h4 className="text-[#121110] font-heading font-bold text-sm">
              Official Registration & Submission Guidelines
            </h4>
            <p>
              1. <b>Google Form Verification</b>: Clicking <b>REGISTER</b> on any event card or inside the popup opens the official Google Form. Early bird pricing applies automatically based on submission timestamps.
            </p>
            <p>
              2. <b>Abstract Submissions</b>: All abstracts for <i>Colloquium</i>, <i>Apophenia</i>, <i>Cognitio</i>, and <i>Dhanvantari</i> must follow the official structure detailed in their respective Google Drive rulebooks.
            </p>
            <p>
              3. <b>Student Coordinator Helpdesk</b>: For cross-college eligibility or scheduling questions, view the event details to call the designated student coordinators directly.
            </p>
          </div>
        </div>

      </div>

      {/* ── Event Detail Modal Popup ─────────────────────────────── */}
      {activeModalEvent && (
        <EventDetailModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </div>
  );
}
