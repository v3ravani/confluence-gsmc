import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Calendar,
  Users,
  Info,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import EventDetailModal from '../../components/events/EventDetailModal';
import { scientificEvents } from '../../data/events';

/* ── Individual Event Card ──────────────────────────────────────── */
function EventCard({ event, index, onOpenDetails }) {
  const handleRegister = (e) => {
    e.stopPropagation();
    if (event.registrationLinks && event.registrationLinks.length > 1) {
      onOpenDetails(event);
    } else if (event.googleFormUrl) {
      window.open(event.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `Registration for "${event.name}" is coordinated directly through the event desk.\n\nPlease contact event coordinator: ${event.coordinator.name} at ${event.coordinator.phone}.`
      );
    }
  };

  return (
    <div className="rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-sm hover:shadow-md hover:border-[#536F91] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Blue Header Banner */}
      <div className="relative bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-5 py-4 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        <div
          className="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none animate-bubble-primary"
          style={{
            animationDuration: `${8 + ((index ?? 0) % 4) * 1.5}s`,
            animationDelay: `${-(((index ?? 0) % 5) * 1.6)}s`,
          }}
        />
        <div
          className="absolute right-14 -top-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none animate-bubble-secondary"
          style={{
            animationDuration: `${10 + ((index ?? 0) % 3) * 2}s`,
            animationDelay: `${-(((index ?? 0) % 4) * 2.1)}s`,
          }}
        />

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
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg leading-snug group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors">
              {event.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.14em] uppercase text-[#536F91] dark:text-[#898A89] mt-0.5">
              {event.subtitle}
            </h4>
          </div>

          {/* Quick Date & Prize Row */}
          <div className="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
            <span className="font-semibold text-[#1D344F] dark:text-[#EE9590] flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {event.rounds?.[0]?.date || 'September 2026'}
            </span>
            <span className="font-bold text-[#536F91] dark:text-[#F14666] flex items-center gap-1 flex-shrink-0">
              <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
              {event.prizes[0] ? event.prizes[0].amount : event.totalPrize}
            </span>
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#D4E1EF]/60 dark:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] mb-3 text-xs">
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Team Size
              </span>
              <b className="text-[#1D344F] dark:text-[#F2F0ED] font-medium flex items-center gap-1 text-[11.5px] truncate mt-0.5">
                <Users className="w-3 h-3 text-[#536F91] dark:text-[#F14666] flex-shrink-0" />
                {event.teamStructure.size}
              </b>
            </div>
            <div>
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Registration Fee
              </span>
              <b className="text-[#1D344F] dark:text-[#F2F0ED] font-medium text-[11.5px] truncate block mt-0.5">
                {event.pricing.earlyBird.split('(')[0]}
              </b>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Card Action Footer */}
        <div className="pt-3.5 border-t border-[#829DBB]/30 dark:border-[#3B3D41] grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] hover:text-white dark:hover:text-white bg-[#F8FBFE] dark:bg-[#323438] hover:bg-[#1D344F] dark:hover:bg-[#3B3D41] border border-[#829DBB] dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all cursor-pointer shadow-xs"
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
    <section id="featured-events" className="py-16 md:py-24 relative border-b border-[#829DBB]/30 dark:border-[#3B3D41] overflow-x-clip">
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
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] transition-colors"
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
          className="flex gap-5 sm:gap-6 overflow-x-auto overflow-y-hidden pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
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
                  ? 'w-6 bg-[#1D344F] dark:bg-[#F14666]'
                  : 'w-2 bg-[#829DBB]/45 dark:bg-[#3B3D41] hover:bg-[#536F91]/65'
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

