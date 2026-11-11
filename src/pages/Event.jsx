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
import SectionHeading from '../components/common/SectionHeading';
import { scientificEvents, conferenceInfo } from '../data/events';

/* ── Uniform Event Card (Equal Height) ─────────────────────────── */
function EventCard({ event, onOpenDetails }) {
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
    <div className="card-glass rounded-2xl p-6 md:p-7 flex flex-col justify-between h-full border border-[rgba(196,216,232,0.14)] hover:border-[rgba(196,216,232,0.36)] transition-all duration-300 group">
      {/* Top Details */}
      <div className="flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-blush)]">
            {event.tag}
          </span>
          <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[rgba(196,216,232,0.22)] bg-[rgba(74,106,138,0.18)] text-[var(--dusty-200)] flex items-center gap-1 flex-shrink-0">
            <Trophy className="w-3 h-3 text-[var(--accent-blush)]" />
            {event.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="font-heading font-extrabold text-white text-2xl tracking-tight leading-tight group-hover:text-[var(--dusty-200)] transition-colors">
            {event.name}
          </h3>
          <h4 className="font-heading font-semibold text-xs tracking-[0.14em] uppercase text-[var(--dusty-400)] mt-0.5">
            {event.subtitle}
          </h4>
        </div>

        {/* Description (Uniform 3-line clamp with fixed min-height for equal card flow) */}
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 line-clamp-3 min-h-[4.2rem]">
          {event.description}
        </p>

        {/* Key Specs Matrix */}
        <div className="mt-auto grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.10)] mb-5 text-xs">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dusty-400)] block mb-0.5">
              Team Size
            </span>
            <b className="text-white font-medium flex items-center gap-1 text-[11.5px] truncate">
              <Users className="w-3.5 h-3.5 text-[var(--accent-blush)] flex-shrink-0" />
              {event.teamStructure.size}
            </b>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dusty-400)] block mb-0.5">
              Winner Prize
            </span>
            <b className="text-[var(--accent-blush)] font-bold flex items-center gap-1 text-[11.5px] truncate">
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              {event.prizes[0] ? event.prizes[0].amount : event.totalPrize}
            </b>
          </div>

          <div className="col-span-2 pt-2 border-t border-[rgba(196,216,232,0.08)] flex items-center justify-between text-[11px]">
            <span className="text-[var(--dusty-400)]">Registration:</span>
            <span className="text-[var(--dusty-200)] font-semibold truncate ml-2">
              {event.pricing.earlyBird.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer with Equal-Height Two Buttons */}
      <div className="pt-4 border-t border-[rgba(196,216,232,0.12)] grid grid-cols-2 gap-2.5">
        {/* View Details Button -> Opens Modal Popup */}
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold text-[var(--dusty-200)] hover:text-white bg-[rgba(74,106,138,0.14)] hover:bg-[rgba(74,106,138,0.26)] border border-[rgba(196,216,232,0.20)] hover:border-[rgba(196,216,232,0.40)] transition-all cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
          <span>VIEW DETAILS</span>
        </button>

        {/* Register Button -> Direct Google Form Action */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[var(--dusty-600)] to-[var(--dusty-700)] hover:from-[#5a7a9a] hover:to-[#3a5068] shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <span>REGISTER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#0f1824] border border-[rgba(196,216,232,0.22)] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[rgba(196,216,232,0.12)] bg-[#162030]/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-blush)]">
                {event.tag}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[rgba(196,216,232,0.22)] bg-[rgba(74,106,138,0.22)] text-[var(--dusty-200)] flex items-center gap-1">
                <Trophy className="w-3 h-3 text-[var(--accent-blush)]" />
                {event.badge}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-white text-2xl sm:text-3xl tracking-tight leading-tight">
              {event.name}
            </h2>
            <h3 className="font-heading font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-[var(--dusty-400)] mt-0.5">
              {event.subtitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[var(--muted)]">
          {/* Overview */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
              Event Overview
            </h4>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.12)]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dusty-400)] block mb-0.5">
                Team Structure
              </span>
              <b className="text-white text-xs">{event.teamStructure.size}</b>
              <p className="text-[11px] text-[var(--dusty-200)] mt-0.5 leading-snug">
                {event.teamStructure.rules}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dusty-400)] block mb-0.5">
                Eligibility
              </span>
              <ul className="space-y-0.5 text-white font-medium">
                {event.eligibility.map((el) => (
                  <li key={el} className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[var(--accent-blush)]">✦</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Syllabus / Focus Subjects */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              Syllabus & Focus Areas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {event.syllabus.map((syl) => (
                <span
                  key={syl}
                  className="px-2.5 py-1 rounded-md bg-[#162030] border border-[rgba(196,216,232,0.16)] text-[var(--dusty-200)] text-[11px]"
                >
                  {syl}
                </span>
              ))}
            </div>
          </div>

          {/* Rounds & Competition Timeline */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              Competition Rounds & Dates
            </h4>
            <div className="space-y-2">
              {event.rounds.map((rnd, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[#162030]/80 border border-[rgba(196,216,232,0.10)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <b className="text-white text-xs">{rnd.stage}</b>
                    <span className="text-[11px] font-semibold text-[var(--accent-blush)]">
                      {rnd.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                    {rnd.format}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prize Breakdown */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              Cash Prizes ({event.totalPrize})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {event.prizes.map((prz) => (
                <div
                  key={prz.rank}
                  className="p-2.5 rounded-lg bg-[#162030] border border-[rgba(196,216,232,0.12)] text-center"
                >
                  <span className="text-[10px] text-[var(--dusty-400)] uppercase block mb-0.5">
                    {prz.rank}
                  </span>
                  <b className="text-white text-xs">{prz.amount}</b>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Fees & Deadline */}
          <div className="p-3.5 rounded-xl bg-[rgba(196,144,154,0.06)] border border-[rgba(196,144,154,0.18)] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[var(--accent-blush)] block mb-0.5">
                Registration Fee
              </span>
              <b className="text-white font-medium">{event.pricing.earlyBird}</b>
              {event.pricing.regular !== event.pricing.earlyBird && (
                <span className="text-[var(--muted)] block text-[11px]">
                  Late Bird: {event.pricing.regular}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-[var(--dusty-400)] block mb-0.5">
                Deadline
              </span>
              <b className="text-white font-medium">{event.pricing.deadline}</b>
            </div>
          </div>

          {/* Coordinator Contact */}
          <div className="pt-2 border-t border-[rgba(196,216,232,0.10)] flex items-center justify-between text-xs">
            <span className="text-[var(--muted)]">
              Event Coordinator: <b className="text-white">{event.coordinator.name}</b>
            </span>
            <a
              href={`tel:${event.coordinator.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-[var(--accent-blush)] hover:underline font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              {event.coordinator.phone}
            </a>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-[rgba(196,216,232,0.12)] bg-[#162030]/80 flex flex-wrap items-center justify-between gap-3">
          {event.rulebookUrl ? (
            <button
              type="button"
              onClick={handleOpenRulebook}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--dusty-200)] hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[var(--accent-blush)]" />
              <span className="underline underline-offset-2">Download Official Rulebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          ) : (
            <span className="text-xs text-[var(--dusty-400)]">
              Seth GSMC & KEM Hospital, Mumbai
            </span>
          )}

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[var(--dusty-200)] hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-[var(--dusty-600)] to-[var(--dusty-700)] hover:from-[#5a7a9a] hover:to-[#3a5068] shadow-md hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
            >
              <span>{event.googleFormUrl ? 'REGISTER VIA FORM' : 'CONTACT COORDINATOR'}</span>
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
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">

        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--dusty-400)]
                     hover:text-white transition-colors mb-8 group"
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
              className="card-glass p-3.5 sm:p-4 rounded-xl border border-[rgba(196,216,232,0.14)]"
            >
              <b className="block font-heading font-bold text-white text-base sm:text-lg leading-tight">
                {stat.value}
              </b>
              <span className="block text-[11px] font-semibold text-[var(--accent-blush)] uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
              <small className="block text-[10.5px] text-[var(--muted)] leading-tight mt-1">
                {stat.sub}
              </small>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0f1824]/80 border border-[rgba(196,216,232,0.14)]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--dusty-600)] text-white shadow-sm'
                    : 'text-[var(--dusty-200)] hover:text-white hover:bg-[rgba(74,106,138,0.15)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-[var(--dusty-400)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by event, subject, rule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0f1824]/90 border border-[rgba(196,216,232,0.18)] focus:border-[var(--accent-blush)] focus:outline-none text-xs text-white placeholder-[var(--dusty-400)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--dusty-400)] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Equal-Height Responsive Event Cards Grid ─────────────── */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-14 items-stretch">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpenDetails={setActiveModalEvent}
              />
            ))}
          </div>
        ) : (
          <div className="card-glass p-12 text-center rounded-2xl mb-14">
            <HelpCircle className="w-10 h-10 text-[var(--dusty-400)] mx-auto mb-3 opacity-60" />
            <h4 className="text-white font-heading font-bold text-lg mb-1">
              No matching events found
            </h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              Try adjusting your search query or reset the category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[rgba(74,106,138,0.20)] text-white hover:bg-[rgba(74,106,138,0.35)] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Registration Notes Banner */}
        <div className="p-6 rounded-2xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.16)] flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[rgba(74,106,138,0.20)] text-[var(--accent-blush)] flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-[var(--muted)] leading-relaxed space-y-1.5">
            <h4 className="text-white font-heading font-bold text-sm">
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
