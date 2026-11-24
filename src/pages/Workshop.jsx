import React, { useState, useEffect, useMemo } from 'react';
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
  Eye,
  Info,
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
        className="relative max-w-3xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-[#F6F9FC] dark:bg-[#202124] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#29405B] dark:text-[#B5B3B0]"
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
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F14666] text-white">
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
              <Award className="w-3.5 h-3.5 text-[#F14666]" />
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
                  href={`tel:${workshop.coordinator.tel}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#536F91] dark:text-[#EE9590] hover:underline"
                >
                  <Phone className="w-3 h-3" />
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

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${workshop.coordinator.tel}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#323438] hover:bg-[#D4E1EF] dark:hover:bg-[#3B3D41] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Coordinator</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Workshop Card Component ─────────────────────────────────────── */
function WorkshopCard({ workshop, index, onOpenDetails }) {
  return (
    <div
      onClick={() => onOpenDetails(workshop)}
      className="rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] shadow-sm hover:shadow-lg hover:border-[#536F91] dark:hover:border-[#F14666] transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* Top Banner with Numbering, Category, and Decorative Curves */}
      <div className="relative flex-shrink-0 bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] px-4 sm:px-5 py-3.5 text-white flex items-center justify-between gap-2 overflow-hidden">
        <div
          className="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none animate-bubble-primary"
          style={{ animationDuration: `${8 + (index % 4) * 1.5}s` }}
        />
        <div
          className="absolute right-14 -top-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none animate-bubble-secondary"
          style={{ animationDuration: `${10 + (index % 3) * 2}s` }}
        />

        <div className="relative z-10 flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md border border-white/20 bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-white/90 truncate">
            {workshop.category}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-shrink-0">
          {workshop.tagBadge && (
            <span className="hidden sm:inline-block text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#F14666] text-white">
              {workshop.tagBadge}
            </span>
          )}
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white/95">
            {workshop.number}
          </span>
        </div>
      </div>

      {/* Card Visual Preview (Poster Flyer) */}
      <div className="relative w-full aspect-[16/10] bg-[#1D344F]/5 dark:bg-[#202124] overflow-hidden border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
        <img
          src={workshop.image}
          alt={workshop.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-[#1D344F] shadow-sm">
            <Eye className="w-3 h-3" />
            <span>Click to View Syllabus &amp; Details</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
        <div className="min-w-0">
          {/* Title & Subtitle */}
          <div className="mb-3 min-w-0">
            <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-base sm:text-lg leading-snug group-hover:text-[#536F91] dark:group-hover:text-[#F14666] transition-colors line-clamp-2">
              {workshop.name}
            </h3>
            <h4 className="font-heading font-semibold text-[11px] tracking-[0.12em] uppercase text-[#536F91] dark:text-[#898A89] mt-0.5 truncate">
              {workshop.subtitle}
            </h4>
          </div>

          {/* Schedule Badges */}
          <div className="space-y-1.5 mb-3.5 pb-3 border-b border-[#829DBB]/25 dark:border-[#3B3D41] text-xs">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-[#1D344F] dark:text-[#F2F0ED] font-semibold flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-[#536F91] dark:text-[#F14666] flex-shrink-0" />
                <span className="truncate">{workshop.dateBadge}</span>
              </span>
              <span className="text-[11px] text-[#536F91] dark:text-[#898A89] flex items-center gap-1 flex-shrink-0 font-medium">
                <Clock className="w-3 h-3" />
                <span>{workshop.timing}</span>
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-[11.5px] text-[#536F91] dark:text-[#A6A4A1]">
              <span className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-white/50 dark:text-white/40" />
                <span className="truncate">{workshop.venue}</span>
              </span>
              <span className="font-bold text-[#1D344F] dark:text-[#EE9590] flex-shrink-0">
                {workshop.fee}
              </span>
            </div>
          </div>

          {/* Stations / Highlights Preview */}
          <div className="space-y-1.5 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#536F91] dark:text-[#898A89] block">
              Core Stations ({workshop.stations.length})
            </span>
            <div className="space-y-1">
              {workshop.stations.slice(0, 3).map((st, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-[#29405B] dark:text-[#B5B3B0]">
                  <CheckCircle2 className="w-3 h-3 text-[#536F91] dark:text-[#F14666] flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{st}</span>
                </div>
              ))}
              {workshop.stations.length > 3 && (
                <span className="text-[11px] font-semibold text-[#536F91] dark:text-[#EE9590] pl-4 block">
                  + {workshop.stations.length - 3} more hands-on stations
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-[#829DBB]/25 dark:border-[#3B3D41] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-[#536F91] dark:text-[#898A89] block leading-tight">
              Coordinator
            </span>
            <span className="text-xs font-bold text-[#1D344F] dark:text-[#F2F0ED] truncate block">
              {workshop.coordinator.name}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(workshop);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#1D344F] group-hover:bg-[#15273C] dark:bg-[#F14666] dark:group-hover:bg-[#e03253] transition-all cursor-pointer shadow-xs"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Workshop Page ─────────────────────────────────────────── */
export default function Workshop() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = All, 1 = Day 1, 2 = Day 2, 3 = Day 3
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalWorkshop, setActiveModalWorkshop] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <>
      <SEO
        title="Clinical Skill Workshops 2026 | CONFLUENCE | Seth GSMC & KEM Hospital"
        description="Official clinical skill workshops of CONFLUENCE 2026 at Seth GS Medical College & KEM Hospital, Mumbai. 12 hands-on masterclasses across Anaesthesia, Laparoscopy, Trauma Care, Interventional Radiology, Virtual Reality simulation, and Neonatology."
        canonicalUrl="https://confluencegsmc.in/workshops"
      />

      <MobilePageHero title="Workshops 2026" />

      <main className="relative z-10 bg-[#F6F9FC] dark:bg-[#202124] text-[#29405B] dark:text-[#B5B3B0] pt-4 sm:pt-6 pb-20 transition-colors duration-300">
        {/* Subtle Background Watermark */}
        <BrainWatermark />

        <div className="wrap relative z-10">
          {/* Back Navigation Button */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#536F91] dark:text-[#A6A4A1] hover:text-[#1D344F] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Section Heading Banner */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1D344F] dark:text-[#F14666] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>9th, 10th &amp; 11th December 2026 · Seth GSMC &amp; KEM Hospital</span>
            </div>

            <SectionHeading
              title="Clinical Skill Workshops"
              subtitle="The Crown Jewels of CONFLUENCE — 12 intensive hands-on clinical masterclasses led by distinguished department professors across state-of-the-art simulation labs and hospital surgical suites."
            />

            {/* Quick Actions & Official Brochure Download Bar */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={workshopsOverview.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-all shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official Workshop Brochure (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#registration-protocol"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF] dark:hover:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#536F91] dark:text-[#F14666]" />
                <span>Registration Protocol (Drop: 2nd Dec)</span>
              </a>

              <a
                href="#workshop-coordinators"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF] dark:hover:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all"
              >
                <Phone className="w-4 h-4 text-[#536F91] dark:text-[#EE9590]" />
                <span>Student Coordinators</span>
              </a>
            </div>
          </div>

          {/* Registration Notice Banner */}
          <div
            id="registration-protocol"
            className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#D4E1EF]/60 dark:bg-[#2B2D30] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-xs"
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

          {/* Filters & Search Control Bar */}
          <div className="mb-8 space-y-4">
            {/* Top Row: Day Tabs & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Day Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41] overflow-x-auto">
                {[
                  { label: 'All Workshops', day: 0, count: 12 },
                  { label: 'Day 1 · 9th Dec', day: 1, count: 7 },
                  { label: 'Day 2 · 10th Dec', day: 2, count: 7 },
                  { label: 'Day 3 · 11th Dec', day: 3, count: 1 },
                ].map((tab) => (
                  <button
                    key={tab.day}
                    type="button"
                    onClick={() => setSelectedDay(tab.day)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      selectedDay === tab.day
                        ? 'bg-[#1D344F] text-white dark:bg-[#F14666] shadow-xs'
                        : 'text-[#536F91] dark:text-[#A6A4A1] hover:text-[#1D344F] dark:hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedDay === tab.day
                          ? 'bg-white/20 text-white'
                          : 'bg-[#D4E1EF]/60 dark:bg-[#323438] text-[#536F91] dark:text-[#898A89]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px] md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#536F91] dark:text-[#898A89]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workshop, skill, or faculty..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41] text-[#1D344F] dark:text-[#F2F0ED] placeholder-[#536F91]/70 dark:placeholder-[#898A89] focus:outline-none focus:border-[#1D344F] dark:focus:border-[#F14666] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#536F91] hover:text-[#1D344F] dark:text-[#898A89] dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Row: Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold text-[#536F91] dark:text-[#898A89] uppercase tracking-wider pr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Track:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#536F91] text-white dark:bg-[#EE9590] dark:text-[#202124]'
                      : 'bg-[#EAF0F6] dark:bg-[#2B2D30] text-[#536F91] dark:text-[#A6A4A1] hover:bg-[#D4E1EF] dark:hover:bg-[#323438]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-[#536F91] dark:text-[#898A89]">
            <span>
              Showing <b className="text-[#1D344F] dark:text-[#F2F0ED]">{filteredWorkshops.length}</b> of{' '}
              {workshopsData.length} masterclasses
            </span>
            {(selectedDay > 0 || selectedCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(0);
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#536F91] dark:text-[#F14666] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Workshop Cards Grid */}
          {filteredWorkshops.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/35 dark:border-[#3B3D41] my-8">
              <Layers className="w-10 h-10 text-[#536F91] dark:text-[#898A89] mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-[#1D344F] dark:text-[#F2F0ED]">
                No workshops match your criteria
              </h3>
              <p className="text-xs text-[#536F91] dark:text-[#A6A4A1] mt-1 max-w-sm mx-auto">
                Try selecting a different day or clearing the search query to view all 12 hands-on workshops.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(0);
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#1D344F] dark:bg-[#F14666]"
              >
                View All Workshops
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredWorkshops.map((workshop, idx) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  index={idx}
                  onOpenDetails={setActiveModalWorkshop}
                />
              ))}
            </div>
          )}

          {/* ── Schedule Matrix Breakdown ───────────────────────────── */}
          <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#536F91] dark:text-[#F14666] block mb-1">
                Official Brochure · Pages 2, 3 &amp; 4
              </span>
              <h3 className="font-heading font-extrabold text-[#1D344F] dark:text-[#F2F0ED] text-lg sm:text-2xl">
                Daily Workshop Timetable &amp; Venues
              </h3>
              <p className="text-xs text-[#536F91] dark:text-[#A6A4A1] mt-1">
                Plan your conference schedule across non-conflicting clinical skill batches at Seth GSMC &amp; KEM Hospital.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Day 1: 9th Dec */}
              <div className="rounded-xl bg-white/80 dark:bg-[#202124]/90 border border-[#829DBB]/30 dark:border-[#3B3D41] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#536F91] dark:text-[#F14666] block">
                        Wednesday
                      </span>
                      <h4 className="font-heading font-black text-[#1D344F] dark:text-[#F2F0ED] text-base">
                        Day 1 · 9th Dec 2026
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1D344F] text-white dark:bg-[#F14666]">
                      7 Tracks
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Anesthesia Workshop</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">1:30 PM – 5:00 PM · Anesthesia Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Pediatric Surgery (PediaQuest)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">9:00 AM – 1:00 PM · Dept. of Pediatric Surgery</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Laparoscopy (Scope Craft)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">10:00 AM – 1:00 PM · GI Surgery Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Trauma Care (Sanjeevni)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">8:30 AM &amp; 1:00 PM Sessions · Ladies Common Room</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Virtual Reality (VirtuLab)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">9:00 AM &amp; 2:00 PM Sessions · Pharmacology Demo 1</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Neonatal Resuscitation (NRP)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">1:00 PM – 4:00 PM · Nephrology Seminar Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Oncology 360°</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">1:00 PM – 5:00 PM · Tata Memorial Hospital</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day 2: 10th Dec */}
              <div className="rounded-xl bg-white/80 dark:bg-[#202124]/90 border border-[#829DBB]/30 dark:border-[#3B3D41] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#536F91] dark:text-[#F14666] block">
                        Thursday
                      </span>
                      <h4 className="font-heading font-black text-[#1D344F] dark:text-[#F2F0ED] text-base">
                        Day 2 · 10th Dec 2026
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1D344F] text-white dark:bg-[#F14666]">
                      7 Tracks
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Anesthesia Workshop</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">1:30 PM – 5:00 PM · Anesthesia Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Vascular Interventional Radiology</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">9:00 AM &amp; 1:30 PM Batches · OT / Angio Suite</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Laparoscopy (Scope Craft)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">10:00 AM – 1:00 PM · GI Surgery Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Pediatric Surgery (PediaQuest)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">9:00 AM – 1:00 PM · Dept. of Pediatric Surgery</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Labour &amp; Beyond (OBGY)</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">8:30 AM &amp; 1:00 PM Sessions · Ladies Common Room</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">The Intern Package</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">2:00 PM – 5:00 PM · Nephrology Seminar Hall</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] block">Occupational Therapy Workshop</b>
                      <span className="text-[11px] text-[#536F91] dark:text-[#898A89]">1:00 PM – 5:00 PM · OC Building</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day 3: 11th Dec */}
              <div className="rounded-xl bg-white/80 dark:bg-[#202124]/90 border border-[#829DBB]/30 dark:border-[#3B3D41] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#829DBB]/25 dark:border-[#3B3D41]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#536F91] dark:text-[#F14666] block">
                        Friday
                      </span>
                      <h4 className="font-heading font-black text-[#1D344F] dark:text-[#F2F0ED] text-base">
                        Day 3 · 11th Dec 2026
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1D344F] text-white dark:bg-[#F14666]">
                      Special Track
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-lg bg-[#F6F9FC] dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41]">
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] text-sm block">MedGames 3.0: Gamified Learning</b>
                      <span className="text-xs text-[#536F91] dark:text-[#898A89] block mt-1">1:00 PM – 3:00 PM · MET Hall</span>
                      <p className="text-[11px] text-[#29405B] dark:text-[#B5B3B0] mt-2 leading-relaxed">
                        Over 25 interactive clinical games spanning Cardiology, Neurology, Infectious Diseases, and rapid diagnosis.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#D4E1EF]/50 dark:bg-[#323438] text-[11px] text-[#536F91] dark:text-[#A6A4A1] leading-relaxed">
                      Main Conference Scientific Events and accredited CME Day 2 also take place concurrently across Seth GSMC campus.
                    </div>
                  </div>
                </div>
              </div>
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
                      href={`tel:${coord.tel}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1D344F] hover:bg-[#15273C] text-white dark:bg-[#F14666] dark:hover:bg-[#e03253] transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
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
      </main>
    </>
  );
}
