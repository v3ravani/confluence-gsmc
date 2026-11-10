import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Stethoscope, Users, Clock, CheckCircle2 } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SectionHeading from '../components/common/SectionHeading';
import { workshopsData } from '../data/workshops';
import { conferenceInfo } from '../data/events';

function WorkshopCard({ ws }) {
  const handleRegister = () => {
    if (ws.googleFormUrl) {
      window.open(ws.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Registration form for "${ws.title}" will open shortly.`);
    }
  };

  return (
    <div className="card-glass p-6 md:p-7 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block text-[10.5px] font-semibold tracking-[0.18em] uppercase
                           text-[var(--accent-sage)]"
                style={{ color: 'var(--sage-400)' }}>
            {ws.tag}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[rgba(196,216,232,0.18)]
                           bg-[rgba(74,106,138,0.12)] text-[var(--dusty-200)]">
            {ws.seats}
          </span>
        </div>

        <h3 className="font-heading font-bold text-white text-lg md:text-xl mb-2 leading-snug
                       group-hover:text-[var(--dusty-200)] transition-colors">
          {ws.title}
        </h3>

        <span className="text-xs text-[var(--dusty-400)] block mb-3 font-medium">
          {ws.department}
        </span>

        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
          {ws.desc}
        </p>

        <div className="flex items-center gap-2 text-xs text-[var(--dusty-400)] mb-5">
          <Clock className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
          <span>Duration: {ws.duration}</span>
        </div>
      </div>

      {/* Card Footer: Eligibility + Register Button */}
      <div className="pt-4 border-t border-[rgba(196,216,232,0.10)] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[var(--muted)]">
          <span className="font-semibold text-white block">Open To:</span>
          <span>{ws.eligibility.join(' · ')}</span>
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

export default function Workshop() {
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
          eyebrow="Practical Skills"
          title="Hands-On"
          highlightWord="Workshops"
          subtitle="Immersive procedural training, emergency life support simulations, and clinical masterclasses conducted by faculty from Seth GSMC & KEM Hospital."
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workshopsData.map((ws) => (
            <WorkshopCard key={ws.id} ws={ws} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-5 rounded-2xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.14)]
                        flex items-start gap-3">
          <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Workshop seats are strictly allocated on a first-come, first-served basis. Click <b>REGISTER</b> on your chosen workshop to open its dedicated Google Form.
          </p>
        </div>
      </div>
    </div>
  );
}
