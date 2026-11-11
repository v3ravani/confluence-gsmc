import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight,
  Phone,
  FileText,
  X,
  ExternalLink,
} from 'lucide-react';

/**
 * Shared Event Detail Modal Popup used across both the Events page and Homepage Featured Events.
 */
export default function EventDetailModal({ event, onClose }) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#e2d4c0] dark:bg-[#202124] border border-[rgba(100,85,70,0.25)] dark:border-[#3B3D41] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#2d2b28] dark:text-[#B5B3B0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header — Deep Blue Curved Header */}
        <div className="relative bg-[#2d508a] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] p-6 text-white rounded-t-2xl overflow-hidden">
          {/* Decorative faint curves — animated floating bubbles */}
          <div
            className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none animate-bubble-primary"
            style={{ animationDuration: '9s' }}
          />
          <div
            className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none animate-bubble-secondary"
            style={{ animationDuration: '12s', animationDelay: '-2s' }}
          />

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

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ece1cf] dark:bg-[#323438] text-[#121110] dark:text-[#F2F0ED] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <span>OPEN FOR REGISTRATION</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2d2b28] dark:text-[#B5B3B0]">
          {/* Description */}
          <p className="text-sm text-[#2d2b28] dark:text-[#B5B3B0] leading-relaxed">
            {event.description}
          </p>

          {/* Callout Info Cards with Left Solid Blue Border */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] dark:bg-[#2B2D30] border-l-4 border-[#2d508a] dark:border-[#F14666] text-xs text-[#2d2b28] dark:text-[#B5B3B0] leading-relaxed shadow-xs">
              <b className="text-[#121110] dark:text-[#F2F0ED]">Multiple registrations allowed.</b> Multiple registrations are allowed if you wish to register for more than one subject: add the event, then choose the number of entries in your cart. Each entry is registered separately.
            </div>

            <div className="p-3.5 rounded-r-xl bg-[#ece1cf] dark:bg-[#2B2D30] border-l-4 border-[#2d508a] dark:border-[#F14666] text-xs text-[#2d2b28] dark:text-[#B5B3B0] leading-relaxed shadow-xs">
              A delegate card is not needed for participation in the preliminary round. However, on selection for the final round, a purchase of the delegate card is mandatory.
            </div>
          </div>

          {/* 4 Key Specs Boxes in 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#6b6459] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Format
              </span>
              <b className="text-xs text-[#121110] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {event.rounds?.[0]?.format || 'Online Prelims and Offline Finals'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#6b6459] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Date
              </span>
              <b className="text-xs text-[#121110] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {event.rounds?.[0]?.date || 'September 2026'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#6b6459] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#121110] dark:text-[#F2F0ED] font-bold block mt-0.5">
                Seth GSMC & KEM Hospital, Mumbai
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#6b6459] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Prize Pool
              </span>
              <b className="text-xs text-[#913433] dark:text-[#F14666] font-bold block mt-0.5">
                {event.totalPrize}
              </b>
            </div>
          </div>

          {/* Eligibility & Team Structure */}
          <div className="p-4 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] space-y-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] dark:text-[#898A89] block">
                Team Structure
              </span>
              <p className="text-xs text-[#121110] dark:text-[#F2F0ED] font-semibold mt-0.5">
                {event.teamStructure.size} — <span className="font-normal text-[#2d2b28] dark:text-[#B5B3B0]">{event.teamStructure.rules}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-[rgba(100,85,70,0.12)] dark:border-[#3B3D41]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] dark:text-[#898A89] block mb-1">
                Eligibility
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.eligibility.map((el) => (
                  <span key={el} className="px-2 py-0.5 rounded-md bg-[#f7f1e6] dark:bg-[#323438] text-[#121110] dark:text-[#F2F0ED] text-[11px] font-medium border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
                    ✦ {el}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cash Prizes Breakdown */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6459] dark:text-[#898A89] block mb-2">
                Prize Breakdown ({event.totalPrize})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {event.prizes.map((prz) => (
                  <div key={prz.rank} className="p-2 rounded-lg bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.16)] dark:border-[#3B3D41] text-center">
                    <span className="text-[10px] text-[#6b6459] dark:text-[#898A89] font-semibold uppercase block">{prz.rank}</span>
                    <b className="text-[#913433] dark:text-[#F14666] text-xs font-bold">{prz.amount}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Contact & Rulebook */}
          <div className="pt-2 border-t border-[rgba(100,85,70,0.16)] dark:border-[#3B3D41] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#2d2b28] dark:text-[#B5B3B0]">
              Coordinator: <b className="text-[#121110] dark:text-[#F2F0ED]">{event.coordinator.name}</b>
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${event.coordinator.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-1.5 text-[#2d508a] dark:text-[#F14666] hover:underline font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                {event.coordinator.phone}
              </a>
              {event.rulebookUrl && (
                <button
                  type="button"
                  onClick={handleOpenRulebook}
                  className="inline-flex items-center gap-1 text-[#913433] dark:text-[#EE9590] hover:underline font-medium cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Rulebook</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] bg-[#ded2c0] dark:bg-[#252629] flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <b className="text-xl sm:text-2xl font-black text-[#121110] dark:text-[#F2F0ED] leading-none">
              {event.pricing.earlyBird.split('(')[0].trim()}
            </b>
            <span className="text-[11px] text-[#6b6459] dark:text-[#898A89] mt-0.5">
              Per participant
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#121110] dark:text-[#F2F0ED] hover:bg-black/5 dark:hover:bg-[#323438] border border-[#121110] dark:border-[#3B3D41] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-xs text-white bg-[#913433] hover:bg-[#782827] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
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

