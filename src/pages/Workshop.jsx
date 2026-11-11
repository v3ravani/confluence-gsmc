import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Award,
  Sparkles,
  Instagram,
  CheckCircle2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';
import { officialWorkshopsAnnouncement, workshopsData } from '../data/workshops';
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
    <div className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] p-6 md:p-7 flex flex-col justify-between group shadow-xs hover:shadow-md hover:border-[#2d508a] transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#913433]">
            {ws.tag}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[rgba(100,85,70,0.22)] bg-[#f7f1e6] text-[#2d508a]">
            {ws.seats}
          </span>
        </div>

        <h3 className="font-heading font-extrabold text-[#121110] text-lg md:text-xl mb-2 leading-snug group-hover:text-[#2d508a] transition-colors">
          {ws.title}
        </h3>

        <span className="text-xs text-[#6b6459] block mb-3 font-medium">
          {ws.department}
        </span>

        {/* Date & Duration */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#4a453e] mb-4 pb-3 border-b border-[rgba(100,85,70,0.14)]">
          {ws.date && (
            <div className="flex items-center gap-1.5 font-semibold text-[#2d508a]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{ws.date}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[#6b6459]">
            <Clock className="w-3.5 h-3.5 text-[#2d508a]" />
            <span>{ws.duration}</span>
          </div>
        </div>

        <p className="text-sm text-[#2d2b28] leading-relaxed mb-5">
          {ws.desc}
        </p>
      </div>

      {/* Card Footer: Eligibility + Register Button */}
      <div className="pt-4 border-t border-[rgba(100,85,70,0.14)] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[#2d2b28] pr-2">
          <span className="font-semibold text-[#121110] block mb-0.5">Eligibility:</span>
          <span className="text-[#6b6459] leading-tight block">
            {ws.eligibility.join(' · ')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-white bg-[#2d508a] hover:bg-[#203c6b] shadow-sm hover:scale-105 transition-all duration-200 flex-shrink-0 cursor-pointer"
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

  const {
    heading,
    quote,
    preConferenceDates,
    venue,
    instagramNotice,
    accreditation,
    delegationTiers,
  } = officialWorkshopsAnnouncement;

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="WORKSHOPS" />
      <div className="wrap relative z-10">

        {/* Back link (Desktop) */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] hover:text-[#121110] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <SectionHeading
          eyebrow="Hands-On Clinical Masterclasses"
          title="Practical"
          highlightWord="Workshops"
          subtitle="The Crown Jewels of CONFLUENCE — Intensive surgical simulations, emergency life support drills, and diagnostic masterclasses conducted by faculty from Seth GSMC & KEM Hospital."
        />

        {/* Official Brochure Spotlight Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.22)] mb-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#913433] text-white tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Pre-Conference: {preConferenceDates}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2d508a] text-white tracking-wide">
              <Award className="w-3.5 h-3.5" />
              {accreditation}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f7f1e6] text-[#4a453e] border border-[rgba(100,85,70,0.22)]">
              <MapPin className="w-3.5 h-3.5 text-[#2d508a]" />
              {venue}
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-[#121110] text-xl md:text-2xl mb-3">
            {heading}
          </h3>

          <p className="text-sm md:text-base text-[#2d2b28] italic leading-relaxed mb-6 border-l-2 border-[#913433] pl-4">
            "{quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[rgba(100,85,70,0.18)]">
            <p className="text-xs md:text-sm text-[#4a453e] leading-relaxed max-w-2xl">
              {instagramNotice}
            </p>
            <a
              href="https://www.instagram.com/confluence_gsmc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-[#913433] hover:bg-[#782928] shadow-sm hover:scale-105 transition-all flex-shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Instagram className="w-4 h-4" />
              <span>@confluence_gsmc</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Official Delegation Registration Tiers (Brochure Page 23) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#913433] block mb-1">
                Official Delegate Tiers
              </span>
              <h3 className="font-heading font-extrabold text-[#121110] text-lg sm:text-xl">
                Conference & Workshop Delegation Fees
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#2d508a] font-semibold bg-[#ece1cf] px-3 py-1 rounded-full border border-[rgba(100,85,70,0.18)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              MMC Points Eligible
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {delegationTiers.map((tier) => (
              <div
                key={tier.role}
                className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-heading font-bold text-[#121110] text-base mb-3 pb-2 border-b border-[rgba(100,85,70,0.14)]">
                    {tier.role}
                  </h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Early Bird Fee:</span>
                      <span className="font-extrabold text-[#913433] text-sm">{tier.earlyBird}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Regular Fee:</span>
                      <span className="font-bold text-[#121110]">{tier.regular}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group (3 Delegates):</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group3}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6b6459]">Group (5 Delegates):</span>
                      <span className="font-semibold text-[#2d508a]">{tier.group5}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(100,85,70,0.14)] flex items-center justify-between text-[11px] text-[#6b6459]">
                  <span>Pre-Conference + Main Fest</span>
                  <span className="font-bold text-[#2d508a]">GSMC & KEMH</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Banner */}
        <div className="p-5 md:p-6 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#913433] block mb-1">
                Audience Eligibility
              </span>
              <h3 className="font-heading font-extrabold text-[#121110] text-base sm:text-lg">
                OPEN TO:
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {conferenceInfo.openToList.map((aud) => (
                <span
                  key={aud}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f7f1e6] text-[#121110] border border-[rgba(100,85,70,0.22)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d508a]" />
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
        <div className="p-5 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] flex items-start gap-3">
          <span className="text-[#913433] mt-0.5 flex-shrink-0 text-lg">✦</span>
          <p className="text-sm text-[#2d2b28] leading-relaxed">
            Workshop batches have strictly limited seating to maintain faculty-to-student mentor ratios. All registered delegates will receive batch assignments and room details via official email and on Instagram <b>@confluence_gsmc</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
