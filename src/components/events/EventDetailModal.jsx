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
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#F6F9FC] dark:bg-[#202124] border border-[#829DBB]/45 dark:border-[#3B3D41] shadow-2xl overflow-hidden animate-fadeIn text-left my-auto text-[#29405B] dark:text-[#B5B3B0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header — Deep Blue Curved Header */}
        <div className="relative flex-shrink-0 bg-[#1D344F] dark:bg-[#252629] dark:border-b dark:border-[#3B3D41] p-5 sm:p-6 text-white rounded-t-2xl overflow-hidden">
          {/* Decorative faint curves — animated floating bubbles */}
          <div
            className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none animate-bubble-primary"
            style={{ animationDuration: '9s' }}
          />
          <div
            className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none animate-bubble-secondary"
            style={{ animationDuration: '12s', animationDelay: '-2s' }}
          />

          <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
              {event.category || 'Scientific Events'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2 className="relative z-10 font-heading font-black text-white text-2xl sm:text-3xl tracking-tight leading-tight my-2 break-words">
            {event.name}
          </h2>

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4E1EF] dark:bg-[#323438] text-[#1D344F] dark:text-[#F2F0ED] text-[10.5px] font-extrabold tracking-wider uppercase shadow-xs">
            <span>OPEN FOR REGISTRATION</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 min-h-0 p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-[#29405B] dark:text-[#B5B3B0]">
          {/* Description */}
          <p className="text-sm text-[#29405B] dark:text-[#B5B3B0] leading-relaxed">
            {event.description}
          </p>

          {/* Callout Info Cards with Left Solid Blue Border */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-r-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border-l-4 border-[#1D344F] dark:border-[#F14666] text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed shadow-xs">
              <b className="text-[#1D344F] dark:text-[#F2F0ED]">Multiple registrations allowed.</b> Multiple registrations are allowed if you wish to register for more than one subject: add the event, then choose the number of entries in your cart. Each entry is registered separately.
            </div>

            <div className="p-3.5 rounded-r-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border-l-4 border-[#1D344F] dark:border-[#F14666] text-xs text-[#29405B] dark:text-[#B5B3B0] leading-relaxed shadow-xs">
              A delegate card is not needed for participation in the preliminary round. However, on selection for the final round, a purchase of the delegate card is mandatory.
            </div>
          </div>

          {/* 4 Key Specs Boxes in 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Format
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {event.rounds?.[0]?.format || 'Online Prelims and Offline Finals'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Date
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                {event.rounds?.[0]?.date || 'September 2026'}
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Venue
              </span>
              <b className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-bold block mt-0.5">
                Seth GSMC & KEM Hospital, Mumbai
              </b>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase tracking-wider block">
                Prize Pool
              </span>
              <b className="text-xs text-[#536F91] dark:text-[#F14666] font-bold block mt-0.5">
                {event.totalPrize}
              </b>
            </div>
          </div>

          {/* Rounds & Format Breakdown (When multiple rounds exist) */}
          {event.rounds && event.rounds.length > 0 && (
            <div className="p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] space-y-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Rounds &amp; Schedule
              </span>
              <div className="space-y-2">
                {event.rounds.map((r) => (
                  <div
                    key={r.stage}
                    className="p-2.5 rounded-lg bg-[#F8FBFE] dark:bg-[#323438] border border-[#829DBB]/35 dark:border-[#3B3D41] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                  >
                    <div>
                      <b className="text-[#1D344F] dark:text-[#F2F0ED] text-xs font-bold block">{r.stage}</b>
                      <span className="text-[11px] text-[#29405B] dark:text-[#B5B3B0] block">{r.format}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#536F91] dark:text-[#EE9590] whitespace-nowrap">
                      {r.date}
                    </span>
                  </div>
                ))}
              </div>
              {event.pricing?.regular && (
                <div className="pt-2 border-t border-[#829DBB]/25 dark:border-[#3B3D41] text-[11px] text-[#29405B] dark:text-[#B5B3B0] flex flex-wrap gap-x-4 gap-y-1">
                  <span><b className="text-[#1D344F] dark:text-[#F2F0ED]">Early Bird:</b> {event.pricing.earlyBird}</span>
                  <span><b className="text-[#1D344F] dark:text-[#F2F0ED]">Regular/Late:</b> {event.pricing.regular}</span>
                </div>
              )}
            </div>
          )}

          {/* Eligibility & Team Structure */}
          <div className="p-4 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] space-y-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block">
                Team Structure
              </span>
              <p className="text-xs text-[#1D344F] dark:text-[#F2F0ED] font-semibold mt-0.5">
                {event.teamStructure.size} — <span className="font-normal text-[#29405B] dark:text-[#B5B3B0]">{event.teamStructure.rules}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-[#829DBB]/25 dark:border-[#3B3D41]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block mb-1">
                Eligibility
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.eligibility.map((el) => (
                  <span key={el} className="px-2 py-0.5 rounded-md bg-[#D4E1EF]/80 dark:bg-[#323438] text-[#1D344F] dark:text-[#F2F0ED] text-[11px] font-medium border border-[#829DBB]/40 dark:border-[#3B3D41]">
                    ✦ {el}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cash Prizes Breakdown */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block mb-2">
                Prize Breakdown ({event.totalPrize})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {event.prizes.map((prz) => (
                  <div key={prz.rank} className="p-2 rounded-lg bg-[#F8FBFE] dark:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] text-center">
                    <span className="text-[10px] text-[#536F91] dark:text-[#898A89] font-semibold uppercase block">{prz.rank}</span>
                    <b className="text-[#1D344F] dark:text-[#F14666] text-xs font-bold">{prz.amount}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Contact & Rulebook */}
          <div className="pt-2 border-t border-[#829DBB]/35 dark:border-[#3B3D41] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#29405B] dark:text-[#B5B3B0]">
              Coordinator: <b className="text-[#1D344F] dark:text-[#F2F0ED]">{event.coordinator.name}</b>
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {event.coordinator.phone.split('/').map((rawNum) => {
                const clean = rawNum.trim();
                const digits = clean.replace(/[^0-9]/g, '');
                return (
                  <a
                    key={clean}
                    href={`tel:${digits}`}
                    className="inline-flex items-center gap-1.5 text-[#1D344F] dark:text-[#F14666] hover:underline font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {clean}
                  </a>
                );
              })}
              {event.rulebookUrl && (
                <button
                  type="button"
                  onClick={handleOpenRulebook}
                  className="inline-flex items-center gap-1 text-[#536F91] dark:text-[#EE9590] hover:underline font-medium cursor-pointer"
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
        <div className="flex-shrink-0 p-4 sm:px-6 border-t border-[#829DBB]/40 dark:border-[#3B3D41] bg-[#EAF0F6] dark:bg-[#252629] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col">
            <b className="text-xl sm:text-2xl font-black text-[#1D344F] dark:text-[#F2F0ED] leading-none">
              {event.pricing.earlyBird.split('(')[0].trim()}
            </b>
            <span className="text-[11px] text-[#536F91] dark:text-[#898A89] mt-0.5">
              {event.feeLabel || 'Registration Fee'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold text-[#1D344F] dark:text-[#F2F0ED] hover:bg-[#D4E1EF]/70 dark:hover:bg-[#323438] border border-[#829DBB] dark:border-[#3B3D41] transition-colors cursor-pointer"
            >
              Close
            </button>

            {event.registrationLinks && event.registrationLinks.length > 1 ? (
              event.registrationLinks.map((regLink) => (
                <a
                  key={regLink.label}
                  href={regLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
                >
                  <span>{regLink.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))
            ) : (
              <button
                type="button"
                onClick={handleRegister}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-xs text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
              >
                <span>Register</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

