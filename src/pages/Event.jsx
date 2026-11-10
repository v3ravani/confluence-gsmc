import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Users, Trophy, MapPin, CheckCircle2 } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SectionHeading from '../components/common/SectionHeading';
import { scientificEvents, conferenceInfo } from '../data/events';

function TrackCard({ track }) {
  const handleRegister = () => {
    if (track.googleFormUrl) {
      window.open(track.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Registration form for "${track.title}" will open shortly.`);
    }
  };

  return (
    <div className="card-glass p-6 md:p-7 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block text-[10.5px] font-semibold tracking-[0.18em] uppercase
                           text-[var(--accent-blush)]">
            {track.tag}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[rgba(196,216,232,0.18)]
                           bg-[rgba(74,106,138,0.12)] text-[var(--dusty-200)]">
            {track.badge}
          </span>
        </div>

        <h3 className="font-heading font-bold text-white text-lg md:text-xl mb-3 leading-snug
                       group-hover:text-[var(--dusty-200)] transition-colors">
          {track.title}
        </h3>

        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
          {track.description}
        </p>

        {/* Schedule & Venue */}
        <div className="space-y-1.5 text-xs text-[var(--dusty-400)] mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[var(--accent-blush)]" />
            <span>{track.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[var(--accent-blush)]" />
            <span>{track.venue}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Eligibility + Register Button */}
      <div className="pt-4 border-t border-[rgba(196,216,232,0.10)] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[var(--muted)]">
          <span className="font-semibold text-white block">Open To:</span>
          <span>{track.eligibility.join(' · ')}</span>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold
                     text-xs text-white bg-gradient-to-r from-[var(--dusty-600)] to-[var(--dusty-700)]
                     hover:from-[#5a7a9a] hover:to-[#3a5068] shadow-sm hover:scale-105
                     transition-all duration-200 flex-shrink-0"
        >
          <span>REGISTER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function Event() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--dusty-400)]
                     hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <SectionHeading
          eyebrow="Academic Programme"
          title="Scientific"
          highlightWord="Events"
          subtitle="Explore competitive scientific paper presentations, case reports, diagnostic challenges and intercollegiate medical quizzes."
        />

        {/* Audience Banner */}
        <div className="p-5 md:p-6 rounded-2xl bg-[rgba(74,106,138,0.10)] border border-[rgba(196,216,232,0.18)] mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-blush)] block mb-1">
                Audience Eligibility
              </span>
              <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                OPEN TO:
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {conferenceInfo.openToList.map((aud) => (
                <span
                  key={aud}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
                             bg-[rgba(74,106,138,0.18)] text-white border border-[rgba(196,216,232,0.22)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {scientificEvents.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-5 rounded-2xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.14)]
                        flex items-start gap-3">
          <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Clicking <b>REGISTER</b> on any event opens its dedicated Google Form in a new tab. Ensure all details are filled accurately according to the submission guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
