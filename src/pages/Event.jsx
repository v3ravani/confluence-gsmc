import React, { useState, useEffect, useRef } from 'react';
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
  Info,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import EventDetailModal from '../components/events/EventDetailModal';
import { scientificEvents, conferenceInfo } from '../data/events';

/* ── Sleek Compact Event Card (Equal Height, Reduced Height, Badges Removed) ── */
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
    <div className="w-[84vw] max-w-[340px] flex-shrink-0 snap-start md:w-full md:max-w-none md:flex-shrink md:snap-align-none rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-sm hover:shadow-md hover:border-[#536F91] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Blue Header Banner (Slightly increased height with decorative curves & icon design) */}
      <div className="relative bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-5 py-4 sm:py-4.5 text-white flex items-center justify-between rounded-t-2xl overflow-hidden">
        {/* Subtle decorative background curves — independently animated organic floating bubbles */}
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
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-xl leading-snug group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors">
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

          {/* Specs Matrix (Compact) */}
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

          {/* Compact 2-line Description */}
          <p className="text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Card Action Footer with Equal-Height Two Buttons */}
        <div className="pt-3.5 border-t border-[#829DBB]/30 dark:border-[#3B3D41] grid grid-cols-2 gap-2.5">
          {/* View Details Button -> Opens Modal Popup */}
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] hover:text-white dark:hover:text-white bg-[#F8FBFE] dark:bg-[#323438] hover:bg-[#1D344F] dark:hover:bg-[#3B3D41] border border-[#829DBB] dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          {/* Register Button -> Direct Google Form Action */}
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

/* ── Main Events Page ───────────────────────────────────────────── */
export default function Event() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const categories = [
    'All',
    'Medical Quizzes',
    'Healthcare Hackathon',
    'Symposium',
    'Clinical Cases',
    'Research & Presentations',
  ];

  // Filter events — defined before useEffects to avoid TDZ ReferenceError
  const filteredEvents = scientificEvents.filter((ev) => {
    const matchesCategory =
      selectedCategory === 'All' || ev.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ev.name.toLowerCase().includes(q) ||
      ev.aliases?.some((a) => a.toLowerCase().includes(q)) ||
      ev.subtitle.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.syllabus.some((s) => s.toLowerCase().includes(q)) ||
      ev.eligibility.some((el) => el.toLowerCase().includes(q)) ||
      ev.coordinator.name.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync active pagination dot dynamically as user swipes between cards
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let ticking = false;
    const updateActiveDot = () => {
      const scrollLeft = el.scrollLeft;
      const card = el.firstElementChild;
      if (card) {
        const itemWidth = card.offsetWidth + 16; // card width + gap-4 (16px)
        const newIndex = Math.round(scrollLeft / itemWidth);
        const clamped = Math.max(0, Math.min(newIndex, filteredEvents.length - 1));
        setActiveCardIndex(clamped);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveDot);
        ticking = true;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filteredEvents.length]);

  // Reset active card index and scroll position when filters or search change
  useEffect(() => {
    setActiveCardIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedCategory, searchQuery]);

  // Tap pagination dot to scroll directly to card
  const scrollToCard = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.children[index];
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
      setActiveCardIndex(index);
    }
  };

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen overflow-x-clip md:overflow-x-visible">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="EVENTS" />
      <div className="wrap relative z-10">

        {/* Back Link (Desktop) */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Section Heading */}
        <SectionHeading
          eyebrow="Academic Competitions, Hackathons & Quizzes"
          title="Scientific"
          highlightWord="Events"
          subtitle="Eight premier medical competitions spanning foundational sciences, healthcare innovation hackathons, clinicopathological deduction, original research papers, and the flagship intercollegiate symposium."
        />

        {/* Fast Key Stats Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            { label: 'Official Events', value: '8 Competitions', sub: 'Quizzes, Hackathon, Papers & Symposium' },
            { label: 'Total Prize Pool', value: '₹2,20,000+', sub: 'Cash awards & certificates' },
            { label: 'Format', value: 'Hybrid Track', sub: 'Online screening + Campus finals' },
            { label: 'Target Delegates', value: 'UG & PG Streams', sub: 'MBBS, Interns & Residents' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 sm:p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-xs"
            >
              <b className="block font-heading font-bold text-[#1D344F] dark:text-[#F2F0ED] text-base sm:text-lg leading-tight">
                {stat.value}
              </b>
              <span className="block text-[11px] font-semibold text-[#536F91] dark:text-[#F14666] uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
              <small className="block text-[10.5px] text-[#536F91] dark:text-[#898A89] leading-tight mt-1">
                {stat.sub}
              </small>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1D344F] dark:bg-[#F14666] text-white shadow-sm'
                    : 'text-[#29405B] dark:text-[#B5B3B0] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] hover:bg-[#D4E1EF]/70 dark:hover:bg-[#323438]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-[#536F91] dark:text-[#898A89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by event, subject, rule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] focus:border-[#1D344F] dark:focus:border-[#F14666] focus:outline-none text-xs text-[#1D344F] dark:text-[#F2F0ED] placeholder-[#536F91] dark:placeholder-[#898A89] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile Swipe Hint (visible on mobile only) ─────────── */}
        {filteredEvents.length > 0 && (
          <div className="flex md:hidden items-center justify-between text-xs text-[#536F91] dark:text-[#898A89] mb-3 px-1">
            <span className="flex items-center gap-1.5 font-medium">
              <span>← Swipe to explore</span>
            </span>
            <span className="text-[11px] font-semibold text-[#1D344F] dark:text-[#EE9590]">
              {filteredEvents.length} Events →
            </span>
          </div>
        )}

        {/* ── Responsive Event Cards (Horizontal swipe on mobile, 2/3 col Grid on desktop) ── */}
        {filteredEvents.length > 0 ? (
          <>
            <div
              ref={scrollContainerRef}
              className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar touch-pan-x gap-4 sm:gap-5 md:gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3 mb-4 md:mb-14 items-stretch pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
            >
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onOpenDetails={setActiveModalEvent}
                />
              ))}
            </div>

            {/* ── Mobile Horizontal Scroll Pagination Dots (Mobile Only) ── */}
            {filteredEvents.length > 1 && (
              <div
                className="flex md:hidden items-center justify-center gap-1.5 mb-10 select-none"
                aria-label="Event cards pagination"
              >
                {filteredEvents.map((ev, i) => (
                  <button
                    key={ev.id || i}
                    type="button"
                    onClick={() => scrollToCard(i)}
                    aria-label={`Scroll to event ${i + 1}: ${ev.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                      activeCardIndex === i
                        ? 'w-6 bg-[#1D344F] dark:bg-[#EE9590] shadow-sm'
                        : 'w-1.5 bg-[#829DBB]/45 dark:bg-[#525458] hover:bg-[#536F91]/65'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center rounded-2xl mb-14 bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
            <HelpCircle className="w-10 h-10 text-[#536F91] dark:text-[#898A89] mx-auto mb-3 opacity-60" />
            <h4 className="text-[#1D344F] dark:text-[#F2F0ED] font-heading font-bold text-lg mb-1">
              No matching events found
            </h4>
            <p className="text-sm text-[#536F91] dark:text-[#898A89] mb-4">
              Try adjusting your search query or reset the category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] text-white transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Registration Notes Banner */}
        <div className="p-6 rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[#D4E1EF]/80 dark:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] text-[#1D344F] dark:text-[#F14666] flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed space-y-1.5">
            <h4 className="text-[#1D344F] dark:text-[#F2F0ED] font-heading font-bold text-sm">
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
