import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import HostSection from '../components/about/HostSection';
import gsmcCrest from '../assets/logos/gsmc_crest.png';
import { conferenceInfo } from '../data/events';

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="ABOUT" />
      <div className="wrap relative z-10">

        {/* Desktop Back */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] dark:text-[#898A89]
                     hover:text-[#121110] dark:hover:text-[#F2F0ED] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Section 1: The Conference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-6">

          {/* Left — full description */}
          <div className="lg:col-span-8">
            <span className="text-[12px] font-semibold tracking-[0.22em] uppercase
                             text-[var(--accent-crimson)] mb-2 block">
              The Conference
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-[#121110] dark:text-[#F2F0ED]
                           tracking-tight leading-tight mb-2">
              CONFLUENCE
            </h1>
            <h2 className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase
                           text-[var(--muted)] mb-8">
              SETH GS MEDICAL COLLEGE & KING EDWARD VII MEMORIAL HOSPITAL
            </h2>

            <div className="space-y-5 text-[var(--ink-2)] text-base md:text-[16.5px] leading-relaxed">
              <p>
                Initiated in 2014, <b className="text-[#121110] dark:text-[#F2F0ED] font-semibold">CONFLUENCE 2026</b>, organised
                by Seth GS Medical College and KEM Hospital in Mumbai, is a prestigious international
                medical and research conference. Spanning five days, this event provides a platform for
                academic exchange and exploration.
              </p>
              <p>
                It offers a comprehensive learning experience through hands-on workshops covering clinical
                skills, research methodologies, and innovative ideas. Diverse competitions acknowledge
                students' research and innovative prowess, with online screening rounds ensuring wider
                participation.
              </p>
              <p>
                The grand finale takes place on the vibrant campus, showcasing top talents. Renowned
                experts deliver talks and panel discussions, enriching intellectual discourse and inspiring
                attendees. Continuing Medical Education (CME) programmes cater to the professional
                development of resident doctors and consultants, delivering the latest updates and
                breakthroughs in the field.
              </p>
              <p>
                Beyond academics, captivating literati events foster relaxation, recreational activities,
                and networking opportunities. The conference creates a unique space for medical students,
                interns and professionals to connect, collaborate and build lasting academic relationships.
              </p>
              <p>
                Embracing a hybrid format, the conference combines virtual and in-person participation,
                ensuring inclusivity and an immersive experience for delegates across the country and
                internationally.
              </p>
              <p className="text-[#121110] dark:text-[#F2F0ED] font-semibold">
                CONFLUENCE 2026 is a remarkable convergence of medical knowledge, research, and
                intellectual camaraderie, creating a lasting impact on all attendees.
              </p>
            </div>
          </div>

          {/* Right — key info card */}
          <div className="lg:col-span-4 w-full">
            <div className="card-glass p-7 sticky top-24">
              <div className="flex items-center gap-4 pb-6 border-b border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] mb-6">
                <img
                  src={gsmcCrest}
                  alt="Seth GSMC & KEMH Crest"
                  className="w-14 h-14 object-contain drop-shadow"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider
                                   text-[var(--accent-crimson)] block">
                    At a glance
                  </span>
                  <h3 className="font-heading font-bold text-[#121110] dark:text-[#F2F0ED] text-base leading-tight">
                    Seth GSMC & KEMH
                  </h3>
                  <small className="text-[var(--muted)] text-xs">Parel, Mumbai, India</small>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Pre-Conference
                    </small>
                    <b className="font-heading font-semibold text-[#121110] dark:text-[#F2F0ED] text-sm">{conferenceInfo.preConferenceDates}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Main Conference
                    </small>
                    <b className="font-heading font-semibold text-[#121110] dark:text-[#F2F0ED] text-sm">{conferenceInfo.mainConferenceDates}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Venue
                    </small>
                    <b className="font-heading font-semibold text-[#121110] dark:text-[#F2F0ED] text-sm">{conferenceInfo.venue}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-1">
                      Open To
                    </small>
                    <ul className="text-[#121110] dark:text-[#F2F0ED] text-xs font-semibold space-y-1">
                      {conferenceInfo.openToList.map(item => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span className="text-[var(--accent-crimson)]">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41]">
                <span className="text-[11px] font-semibold uppercase tracking-wider
                                 text-[var(--muted)] block mb-1">
                  Format
                </span>
                <b className="text-[#121110] dark:text-[#F2F0ED] text-sm font-semibold">Hybrid · Campus & Virtual</b>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Host — About Seth GSMC & KEMH */}
        <HostSection />
      </div>
    </div>
  );
}
