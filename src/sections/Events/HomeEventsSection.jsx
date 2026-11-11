import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  Trophy,
  Calendar,
  Users,
  Info,
  ArrowUpRight,
  ArrowRight,
  X,
  Clock,
  Sparkles,
  Phone,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { scientificEvents } from '../../data/events';

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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-3xl bg-[#ece1cf] dark:bg-[#252629] border border-[rgba(100,85,70,0.25)] dark:border-[#3B3D41] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#2d508a] dark:bg-[#202124] text-white px-6 py-5 flex items-start justify-between border-b border-white/10 dark:border-[#3B3D41]">
          <div className="relative z-10 pr-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80 block mb-1">
              {event.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight leading-tight">
              {event.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-0.5">
              {event.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2d2b28] dark:text-[#B5B3B0]">
          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#f7f1e6] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6b6459] dark:text-[#898A89] block">
                Total Prize
              </span>
              <b className="font-heading font-extrabold text-[#913433] dark:text-[#F14666] text-sm sm:text-base block mt-0.5">
                {event.totalPrize}
              </b>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6b6459] dark:text-[#898A89] block">
                Team Size
              </span>
              <b className="font-heading font-semibold text-[#121110] dark:text-[#F2F0ED] text-xs sm:text-sm block mt-0.5">
                {event.teamStructure.size}
              </b>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6b6459] dark:text-[#898A89] block">
                Deadline
              </span>
              <b className="font-heading font-semibold text-[#2d508a] dark:text-[#EE9590] text-xs sm:text-sm block mt-0.5 truncate">
                {event.pricing.deadline}
              </b>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#121110] dark:text-[#F2F0ED] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2d508a] dark:text-[#F14666]" />
              Event Overview
            </h4>
            <p className="leading-relaxed text-xs sm:text-[13px] text-[#2d2b28] dark:text-[#B5B3B0]">
              {event.description}
            </p>
          </div>

          {/* Rounds & Important Dates */}
          {event.rounds && event.rounds.length > 0 && (
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#121110] dark:text-[#F2F0ED] mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2d508a] dark:text-[#F14666]" />
                Event Rounds &amp; Format
              </h4>
              <div className="space-y-2">
                {event.rounds.map((round) => (
                  <div
                    key={round.stage}
                    className="p-3 rounded-xl bg-[#f7f1e6] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.16)] dark:border-[#3B3D41]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-heading font-bold text-xs text-[#121110] dark:text-[#F2F0ED]">
                        {round.stage}
                      </span>
                      <span className="text-[11px] font-semibold text-[#2d508a] dark:text-[#EE9590]">
                        {round.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b6459] dark:text-[#898A89]">
                      {round.format}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prize Distribution Breakdown */}
          {event.prizes && event.prizes.length > 0 && (
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#121110] dark:text-[#F2F0ED] mb-2 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#913433] dark:text-[#F14666]" />
                Prize Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {event.prizes.map((prize) => (
                  <div
                    key={prize.rank}
                    className="p-2.5 rounded-xl bg-[#f7f1e6] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.14)] dark:border-[#3B3D41] flex items-center justify-between"
                  >
                    <span className="text-xs text-[#6b6459] dark:text-[#898A89]">
                      {prize.rank}
                    </span>
                    <b className="font-heading font-extrabold text-xs sm:text-sm text-[#913433] dark:text-[#F14666]">
                      {prize.amount}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Helpdesk */}
          {event.coordinator && (
            <div className="p-3 rounded-xl bg-[#ece1cf] dark:bg-[#323438] border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41] flex items-center justify-between text-xs">
              <span className="text-[#6b6459] dark:text-[#898A89] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#2d508a] dark:text-[#F14666]" />
                Coordinator: <b className="text-[#121110] dark:text-[#F2F0ED]">{event.coordinator.name}</b>
              </span>
              <a
                href={`tel:${event.coordinator.phone}`}
                className="font-bold text-[#2d508a] dark:text-[#EE9590] hover:underline"
              >
                +91 {event.coordinator.phone}
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#ece1cf] dark:bg-[#202124] border-t border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <b className="font-heading font-extrabold text-sm sm:text-base text-[#913433] dark:text-[#F14666]">
              {event.pricing.earlyBird.split('(')[0]}
            </b>
            <span className="text-[11px] text-[#6b6459] dark:text-[#898A89]">
              Registration Fee
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-bold text-[#121110] dark:text-[#F2F0ED] hover:bg-black/5 dark:hover:bg-[#323438] border border-[#121110] dark:border-[#3B3D41] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full font-bold text-xs text-white bg-[#913433] hover:bg-[#782827] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm transition-all cursor-pointer"
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

/* ── Individual Event Card ──────────────────────────────────────── */
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
    <div className="rounded-2xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] shadow-sm hover:shadow-md hover:border-[#2d508a] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Blue Header Banner */}
      <div className="relative bg-[#2d508a] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-5 py-4 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
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
          <span className="text-2xl font-black tracking-tight text-white/95">
            {String((index ?? 0) + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <div className="mb-2.5">
            <h3 className="font-heading font-extrabold text-[#121110] dark:text-[#F2F0ED] text-lg leading-snug group-hover:text-[#2d508a] dark:group-hover:text-[#F14666] transition-colors">
              {event.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6459] dark:text-[#898A89] mt-0.5">
              {event.subtitle}
            </h4>
          </div>

          {/* Quick Date & Prize Row */}
          <div className="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-[rgba(100,85,70,0.12)] dark:border-[#3B3D41]">
            <span className="font-semibold text-[#2d508a] dark:text-[#EE9590] flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {event.rounds?.[0]?.date || 'September 2026'}
            </span>
            <span className="font-bold text-[#913433] dark:text-[#F14666] flex items-center gap-1 flex-shrink-0">
              <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
              {event.prizes[0] ? event.prizes[0].amount : event.totalPrize}
            </span>
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.16)] dark:border-[#3B3D41] mb-3 text-xs">
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] dark:text-[#898A89] block">
                Team Size
              </span>
              <b className="text-[#121110] dark:text-[#F2F0ED] font-medium flex items-center gap-1 text-[11.5px] truncate mt-0.5">
                <Users className="w-3 h-3 text-[#2d508a] dark:text-[#F14666] flex-shrink-0" />
                {event.teamStructure.size}
              </b>
            </div>
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#6b6459] dark:text-[#898A89] block">
                Registration Fee
              </span>
              <b className="text-[#121110] dark:text-[#F2F0ED] font-medium text-[11.5px] truncate block mt-0.5">
                {event.pricing.earlyBird.split('(')[0]}
              </b>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#2d2b28] dark:text-[#B5B3B0] leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Card Action Footer */}
        <div className="pt-3.5 border-t border-[rgba(100,85,70,0.14)] dark:border-[#3B3D41] grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#2d508a] dark:text-[#F2F0ED] hover:text-white dark:hover:text-white bg-[#f7f1e6] dark:bg-[#323438] hover:bg-[#2d508a] dark:hover:bg-[#3B3D41] border border-[#2d508a] dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-[#2d508a] hover:bg-[#203c6b] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all cursor-pointer shadow-xs"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Events Section on Home Page ────────────────────────────────── */
export default function HomeEventsSection() {
  const scrollRef = useRef(null);
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const itemWidth = scrollWidth / scientificEvents.length;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(scientificEvents.length - 1, Math.max(0, idx)));
  };

  const scrollToCard = (idx) => {
    if (!scrollRef.current) return;
    const cardEl = scrollRef.current.children[idx];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <section id="featured-events" className="py-16 md:py-24 relative border-b border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[var(--accent-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[var(--accent-crimson)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Header row with Title and View All Events Link in grey */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <SectionHeading
            eyebrow="Scientific Competitions"
            title="Featured"
            highlightWord="Events"
            subtitle="Explore our flagship scientific competitions, clinical case presentations, medical quizzes and hackathons."
            className="mb-0"
          />

          <div className="flex items-center sm:self-end">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6b6459] dark:text-[#898A89] hover:text-[#121110] dark:hover:text-[#F2F0ED] transition-colors"
            >
              <span>View all events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll of all event cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {scientificEvents.map((event, idx) => (
            <div
              key={event.id}
              className="w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0 snap-start flex flex-col"
            >
              <EventCard
                event={event}
                index={idx}
                onOpenDetails={(ev) => setActiveModalEvent(ev)}
              />
            </div>
          ))}
        </div>

        {/* Small dots for scroll reference */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          {scientificEvents.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Scroll to event ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-[#913433] dark:bg-[#F14666]'
                  : 'w-2 bg-[rgba(100,85,70,0.30)] dark:bg-[#3B3D41] hover:bg-[rgba(100,85,70,0.50)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {activeModalEvent && (
        <EventDetailModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </section>
  );
}

