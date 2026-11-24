import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  Phone,
  Search,
  FileText,
  Award,
  Sparkles,
  Layers,
  ShieldCheck,
  Users,
  Info,
  HelpCircle,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import SEO from '../components/common/SEO';
import {
  workshopsOverview,
  workshopsData,
  workshopCoordinators,
} from '../data/workshops';

/* ── Official WhatsApp Outline Logo SVG (White Outline, Transparent Background) ── */
function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

function getWhatsAppUrl(phone, message = '') {
  let digits = (phone || '').replace(/[^0-9]/g, '');
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}

/* ── Workshop Details Modal ─────────────────────────────────────── */
function WorkshopDetailsModal({ workshop, onClose }) {
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

  if (!workshop) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full h-[88vh] sm:h-auto sm:max-h-[92vh] flex flex-col rounded-2xl bg-[#F6F9FC] dark:bg-[#202124] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#29405B] dark:text-[#B5B3B0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative flex-shrink-0 bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] p-5 sm:p-6 text-white rounded-t-2xl overflow-hidden">
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3 mb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                Track {workshop.number}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15">
                {workshop.category}
              </span>
              {workshop.tagBadge && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/25 dark:bg-[#F14666] dark:text-white dark:border-transparent">
                  {workshop.tagBadge}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2 className="relative z-10 font-heading font-black text-white text-xl sm:text-2xl lg:text-3xl tracking-tight leading-snug break-words">
            {workshop.name}
          </h2>
          <p className="relative z-10 text-white/80 text-xs sm:text-sm font-medium mt-1">
            {workshop.subtitle}
          </p>

          <div className="relative z-10 mt-3 pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/90">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-white/70" />
              <span>{workshop.dateBadge}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/70" />
              <span>{workshop.timing}</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Award className="w-3.5 h-3.5 text-white/80 dark:text-[#F14666]" />
              <span>Registration Fee: {workshop.fee} {workshop.mealsIncluded ? '(Meals Included)' : ''}</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 min-h-0 p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Summary / Overview */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#536F91] dark:text-[#F14666] mb-1.5">
              Workshop Overview
            </h4>
            <p className="text-xs sm:text-sm text-[#29405B] dark:text-[#B5B3B0] leading-relaxed">
              {workshop.summary}
            </p>
          </div>

          {/* Procedural Stations / Skills */}
          <div className="p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#536F91] dark:text-[#F14666] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Hands-On Procedural Stations</span>
              </h4>
              <span className="text-[10px] font-semibold text-[#536F91] dark:text-[#898A89]">
                Brochure Page {workshop.brochurePage}
              </span>
            </div>

            <div className="space-y-2.5">
              {workshop.stations.map((station, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#536F91] dark:text-[#F14666] flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#1D344F] dark:text-[#F2F0ED] leading-snug">
                    {station}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Mentorship */}
          <div className="p-4 rounded-xl bg-[#D4E1EF]/50 dark:bg-[#323438] border border-[#829DBB]/35 dark:border-[#3B3D41]">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1D344F] dark:text-[#F2F0ED] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#536F91] dark:text-[#EE9590]" />
              <span>Core Highlights &amp; Equipment</span>
            </h4>
            <div className="space-y-1.5">
              {workshop.highlights.map((h, idx) => (
                <p key={idx} className="text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed flex items-start gap-2">
                  <span className="text-[#536F91] dark:text-[#F14666] font-bold select-none">•</span>
                  <span>{h}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Faculty Box */}
          <div className="p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#536F91] dark:text-[#F14666] mb-2.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Conducted By &amp; Faculty Leadership</span>
            </h4>
            <p className="font-semibold text-xs text-[#1D344F] dark:text-[#F2F0ED] mb-2">
              {workshop.conductedBy}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {workshop.faculty.map((f, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/70 dark:bg-[#202124]/70 border border-[#829DBB]/20 dark:border-[#3B3D41]">
                  <b className="block text-xs text-[#1D344F] dark:text-[#F2F0ED]">
                    {f.name}
                  </b>
                  <span className="text-[11px] text-[#536F91] dark:text-[#898A89] leading-tight block mt-0.5">
                    {f.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Venue &amp; Location
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#536F91] dark:text-[#F14666] flex-shrink-0" />
                <span>{workshop.venue}</span>
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Student Coordinator
              </span>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold">
                  {workshop.coordinator.name}
                </b>
                <a
                  href={getWhatsAppUrl(workshop.coordinator.phone, `Hi ${workshop.coordinator.name}, I would like to enquire about ${workshop.name} at CONFLUENCE 2026.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#323438] dark:hover:bg-[#3B3D41] text-white transition-all shadow-xs"
                  title="Message on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{workshop.coordinator.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Registration Protocol Notice */}
          <div className="p-3.5 rounded-xl bg-[#D4E1EF]/70 dark:bg-[#252629] border border-[#829DBB]/40 dark:border-[#3B3D41] text-xs">
            <div className="flex items-start gap-2 text-[#1D344F] dark:text-[#F2F0ED]">
              <ShieldCheck className="w-4 h-4 text-[#536F91] dark:text-[#F14666] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Official Registration Form Release: 2nd December 2026</p>
                <p className="text-[11px] text-[#536F91] dark:text-[#A6A4A1] leading-relaxed">
                  Registration links will be distributed inside the official WhatsApp Interest Groups. Seats are strictly allocated on a First-Come, First-Served basis due to laboratory workstation limits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex-shrink-0 p-4 sm:p-5 bg-white dark:bg-[#252629] border-t border-[#829DBB]/30 dark:border-[#3B3D41] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#536F91] dark:text-[#898A89]">
            <Info className="w-3.5 h-3.5" />
            <span>Registration fee: <b className="text-[#1D344F] dark:text-[#F2F0ED]">{workshop.fee}</b> (Meals Included)</span>
          </div>

          <a
            href={workshop.whatsappGroup || '#registration-protocol'}
            target={workshop.whatsappGroup ? '_blank' : undefined}
            rel={workshop.whatsappGroup ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all shadow-xs cursor-pointer group"
          >
            <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
            <span>Join Group</span>
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Sleek Compact Workshop Card (Matching EventCard: Equal Height, No Photos, Sleek Specs) ── */
function WorkshopCard({ workshop, index, onOpenDetails }) {
  return (
    <div className="w-[84vw] max-w-[340px] flex-shrink-0 snap-start md:w-full md:max-w-none md:flex-shrink md:snap-align-none rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-sm hover:shadow-md hover:border-[#536F91] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* Top Blue Header Banner */}
      <div className="relative flex-shrink-0 bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-4 sm:px-5 py-4 sm:py-4.5 text-white flex items-center justify-between gap-2 rounded-t-2xl overflow-hidden">
        {/* Subtle decorative background curves */}
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

        <div className="relative z-10 flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md border border-white/20 bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-white/95 truncate">
            {workshop.category || 'Workshop'}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-shrink-0">
          {workshop.tagBadge && (
            <span className="hidden sm:inline-block text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/25 dark:bg-[#F14666] dark:text-white dark:border-transparent">
              {workshop.tagBadge}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white/95">
            {workshop.number}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
        <div className="min-w-0">
          {/* Title & Subtitle */}
          <div className="mb-2.5 min-w-0">
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-xl leading-snug break-words group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors">
              {workshop.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.14em] uppercase text-[#536F91] dark:text-[#898A89] mt-0.5 leading-snug break-words">
              {workshop.subtitle}
            </h4>
          </div>

          {/* Quick Date & Fee Row */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs mb-3 pb-2.5 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
            <span className="font-semibold text-[#1D344F] dark:text-[#EE9590] flex items-center gap-1.5 min-w-0">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{workshop.dateBadge}</span>
            </span>
            <span className="font-bold text-[#536F91] dark:text-[#F14666] flex items-center gap-1 flex-shrink-0">
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              {workshop.fee}
            </span>
          </div>

          {/* Specs Matrix (Compact) */}
          <div className="grid grid-cols-2 gap-2.5 p-2.5 rounded-xl bg-[#D4E1EF]/60 dark:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] mb-3 text-xs">
            <div className="min-w-0">
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Timing
              </span>
              <b className="text-[#1D344F] dark:text-[#F2F0ED] font-medium flex items-center gap-1 text-[11.5px] mt-0.5 min-w-0">
                <Clock className="w-3 h-3 text-[#536F91] dark:text-[#F14666] flex-shrink-0" />
                <span className="truncate">{workshop.timing}</span>
              </b>
            </div>
            <div className="min-w-0">
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Venue
              </span>
              <b className="text-[#1D344F] dark:text-[#F2F0ED] font-medium flex items-center gap-1 text-[11.5px] truncate block mt-0.5">
                <MapPin className="w-3 h-3 text-[#536F91] dark:text-[#F14666] flex-shrink-0" />
                <span className="truncate">{workshop.venue}</span>
              </b>
            </div>
          </div>

          {/* Compact 2-line Description */}
          <p className="text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed mb-4 line-clamp-2">
            {workshop.summary}
          </p>
        </div>

        {/* Card Action Footer with Equal-Height Two Buttons */}
        <div className="pt-3.5 border-t border-[#829DBB]/30 dark:border-[#3B3D41] grid grid-cols-2 gap-2.5">
          {/* View Details Button -> Opens Modal Popup */}
          <button
            type="button"
            onClick={() => onOpenDetails(workshop)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] hover:text-white dark:hover:text-white bg-[#F8FBFE] dark:bg-[#323438] hover:bg-[#1D344F] dark:hover:bg-[#3B3D41] border border-[#829DBB] dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>VIEW DETAILS</span>
          </button>

          {/* Registration / WhatsApp Group Button */}
          <a
            href={workshop.whatsappGroup || '#registration-protocol'}
            target={workshop.whatsappGroup ? '_blank' : undefined}
            rel={workshop.whatsappGroup ? 'noopener noreferrer' : undefined}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all cursor-pointer shadow-xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>JOIN GROUP</span>
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Main Workshop Page ─────────────────────────────────────────── */
export default function Workshop() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = All, 1 = Day 1, 2 = Day 2, 3 = Day 3
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalWorkshop, setActiveModalWorkshop] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Day filter tabs
  const dayTabs = [
    { label: 'All Days', day: 0 },
    { label: 'Day 1 (9th Dec)', day: 1 },
    { label: 'Day 2 (10th Dec)', day: 2 },
    { label: 'Day 3 (11th Dec)', day: 3 },
  ];

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(workshopsData.map((w) => w.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered workshops
  const filteredWorkshops = useMemo(() => {
    return workshopsData.filter((w) => {
      // Day filter
      if (selectedDay > 0 && !w.days.includes(selectedDay)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && w.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = w.name.toLowerCase().includes(query);
        const matchSubtitle = w.subtitle.toLowerCase().includes(query);
        const matchDept = w.conductedBy.toLowerCase().includes(query);
        const matchVenue = w.venue.toLowerCase().includes(query);
        const matchStations = w.stations.some((s) => s.toLowerCase().includes(query));
        const matchFaculty = w.faculty.some((f) => f.name.toLowerCase().includes(query));
        if (!matchName && !matchSubtitle && !matchDept && !matchVenue && !matchStations && !matchFaculty) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDay, selectedCategory, searchQuery]);

  // Sync active pagination dot dynamically as user swipes between cards on mobile
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let ticking = false;
    const updateActiveDot = () => {
      const scrollLeft = el.scrollLeft;
      const card = el.firstElementChild;
      if (card) {
        const itemWidth = card.offsetWidth + 16;
        const newIndex = Math.round(scrollLeft / itemWidth);
        const clamped = Math.max(0, Math.min(newIndex, filteredWorkshops.length - 1));
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
  }, [filteredWorkshops.length]);

  // Reset active card index and scroll position when filters change
  useEffect(() => {
    setActiveCardIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedDay, selectedCategory, searchQuery]);

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
    <>
      <SEO
        title="Clinical Skill Workshops 2026 | CONFLUENCE | Seth GSMC & KEM Hospital"
        description="Official clinical skill workshops of CONFLUENCE 2026 at Seth GS Medical College & KEM Hospital, Mumbai. 12 hands-on masterclasses across Anaesthesia, Laparoscopy, Trauma Care, Interventional Radiology, Virtual Reality simulation, and Neonatology."
        canonicalUrl="https://confluencegsmc.in/workshops"
      />

      <div className="pt-0 pb-12 md:py-20 relative min-h-screen overflow-x-clip md:overflow-x-visible">
        {/* Subtle Background Watermark */}
        <BrainWatermark mode="watermark" />
        <MobilePageHero title="WORKSHOPS" />

        <div className="wrap relative z-10">
          {/* Back Link (Desktop) - Exact style as in Events */}
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[#536F91] dark:text-[#898A89] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Section Heading - Exact layout as in Events */}
          <SectionHeading
            eyebrow="Hands-On Masterclasses · Simulation Labs & Surgical Suites"
            title="Clinical Skill"
            highlightWord="Workshops"
            subtitle="Twelve intensive hands-on clinical and surgical masterclasses led by distinguished department professors and unit heads across Seth GSMC simulation labs, angio suites, and operating theatres."
          />

          {/* Fast Key Stats Pill Bar - Identical to Events */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {[
              { label: 'Official Tracks', value: '12 Masterclasses', sub: 'Anaesthesia, Surgery, VR & Trauma' },
              { label: 'Dates & Duration', value: '9th–11th Dec', sub: '3 intensive hands-on days' },
              { label: 'Format & Venue', value: 'Hands-On Labs', sub: 'Simulation suites & OT departments' },
              { label: 'Registration', value: 'First-Come Basis', sub: 'Drops 2nd Dec via WhatsApp' },
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

          {/* Quick Actions & Official Brochure Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={workshopsOverview.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all shadow-xs group"
              >
                <FileText className="w-3.5 h-3.5 text-[#829DBB] dark:text-white" />
                <span>View Official Workshop Brochure</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#registration-protocol"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF] dark:hover:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#536F91] dark:text-[#F14666]" />
                <span>Registration Protocol</span>
              </a>

              <a
                href="#workshop-coordinators"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF] dark:hover:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#536F91] dark:text-[#EE9590]" />
                <span>Coordinators</span>
              </a>
            </div>

            <div className="text-xs text-[#536F91] dark:text-[#898A89] font-medium">
              Showing <b className="text-[#1D344F] dark:text-[#F2F0ED]">{filteredWorkshops.length}</b> of 12 clinical tracks
            </div>
          </div>

          {/* Search & Day Filter Controls - Matching Events */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Day Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              {dayTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setSelectedDay(tab.day)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedDay === tab.day
                      ? 'bg-[#1D344F] dark:bg-[#F14666] text-white shadow-sm'
                      : 'text-[#29405B] dark:text-[#B5B3B0] hover:text-[#1D344F] dark:hover:text-[#F2F0ED] hover:bg-[#D4E1EF]/70 dark:hover:bg-[#323438]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input Box - Exactly like Events */}
            <div className="relative min-w-[240px] md:w-72">
              <Search className="w-4 h-4 text-[#536F91] dark:text-[#898A89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search workshop, skill, faculty..."
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
          {filteredWorkshops.length > 0 && (
            <div className="flex md:hidden items-center justify-between text-xs text-[#536F91] dark:text-[#898A89] mb-3 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <span>← Swipe to explore</span>
              </span>
              <span className="text-[11px] font-semibold text-[#1D344F] dark:text-[#EE9590]">
                {filteredWorkshops.length} Workshops →
              </span>
            </div>
          )}

          {/* ── Responsive Workshop Cards (Horizontal swipe on mobile, 3-col Grid on desktop) ── */}
          {filteredWorkshops.length > 0 ? (
            <>
              <div
                ref={scrollContainerRef}
                className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar touch-pan-x gap-4 sm:gap-5 md:gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3 mb-4 md:mb-14 items-stretch pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
              >
                {filteredWorkshops.map((workshop, index) => (
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    index={index}
                    onOpenDetails={setActiveModalWorkshop}
                  />
                ))}
              </div>

              {/* ── Mobile Horizontal Scroll Pagination Dots (Mobile Only) ── */}
              {filteredWorkshops.length > 1 && (
                <div
                  className="flex md:hidden items-center justify-center gap-1.5 mb-10 select-none"
                  aria-label="Workshop cards pagination"
                >
                  {filteredWorkshops.map((w, i) => (
                    <button
                      key={w.id || i}
                      type="button"
                      onClick={() => scrollToCard(i)}
                      aria-label={`Scroll to workshop ${i + 1}: ${w.name}`}
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
                No matching workshops found
              </h4>
              <p className="text-sm text-[#536F91] dark:text-[#898A89] mb-4">
                Try adjusting your search query or reset the day filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(0);
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#1D344F] dark:bg-[#F14666] hover:opacity-90 transition-opacity"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* ── Registration Protocol Banner ────────────────────────── */}
          <div
            id="registration-protocol"
            className="mb-12 p-5 sm:p-6 rounded-2xl bg-[#D4E1EF]/60 dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#829DBB]/30 dark:border-[#3B3D41]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D344F] dark:bg-[#F14666] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-[#1D344F] dark:text-[#F2F0ED] text-base sm:text-lg">
                    {workshopsOverview.registrationNotice.title}
                  </h3>
                  <span className="text-xs text-[#536F91] dark:text-[#A6A4A1] font-medium">
                    {workshopsOverview.registrationNotice.mechanism}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#202124] border border-[#829DBB]/30 dark:border-[#3B3D41] text-xs font-bold text-[#1D344F] dark:text-[#FFCCAA] self-start md:self-auto">
                <Calendar className="w-3.5 h-3.5 text-[#536F91] dark:text-[#F14666]" />
                <span>Form Release: 2nd December 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {workshopsOverview.registrationNotice.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/80 dark:bg-[#202124]/80 border border-[#829DBB]/25 dark:border-[#3B3D41] flex flex-col justify-between"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#536F91] dark:text-[#F14666] mb-1">
                    Step 0{idx + 1}
                  </span>
                  <p className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-medium leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Student Coordinators Directory ──────────────────────── */}
          <div
            id="workshop-coordinators"
            className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#D4E1EF]/60 dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]"
          >
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#536F91] dark:text-[#F14666] block mb-1">
                Student Secretariat
              </span>
              <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-2xl">
                Workshop Coordination Team
              </h3>
              <p className="text-xs text-[#536F91] dark:text-[#A6A4A1] mt-1">
                For questions regarding track prerequisites, batch schedules, or registration interest groups, contact our coordinators:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workshopCoordinators.map((coord) => (
                <div
                  key={coord.name}
                  className="p-4 rounded-xl bg-white/90 dark:bg-[#202124]/90 border border-[#829DBB]/30 dark:border-[#3B3D41] flex flex-col justify-between"
                >
                  <div>
                    <b className="text-sm font-bold text-[#1D344F] dark:text-[#F2F0ED] block">
                      {coord.name}
                    </b>
                    <span className="text-[11px] text-[#536F91] dark:text-[#A6A4A1] block mt-1 leading-snug">
                      {coord.tracks}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#829DBB]/20 dark:border-[#3B3D41] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED]">
                      {coord.phone}
                    </span>
                    <a
                      href={getWhatsAppUrl(coord.phone, `Hi ${coord.name}, I have an enquiry regarding CONFLUENCE 2026 Workshops.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#323438] dark:hover:bg-[#3B3D41] border border-[#829DBB]/30 dark:border-[#3B3D41] text-white transition-all shadow-xs"
                      title="Message on WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Message</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Viewer */}
        {activeModalWorkshop && (
          <WorkshopDetailsModal
            workshop={activeModalWorkshop}
            onClose={() => setActiveModalWorkshop(null)}
          />
        )}
      </div>
    </>
  );
}
