import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Award } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SectionHeading from '../components/common/SectionHeading';
import gsmcCrest from '../assets/logos/gsmc_crest.png';
import { conferenceInfo } from '../data/events';

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--dusty-400)]
                     hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — full description */}
          <div className="lg:col-span-8">
            <span className="text-[12px] font-semibold tracking-[0.22em] uppercase
                             text-[var(--accent-blush)] mb-2 block">
              The Conference
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white
                           tracking-tight leading-tight mb-2">
              CONFLUENCE
            </h1>
            <h2 className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase
                           text-[var(--dusty-400)] mb-8">
              SETH GS MEDICAL COLLEGE & KING EDWARD VII MEMORIAL HOSPITAL
            </h2>

            <div className="space-y-5 text-[var(--muted)] text-base md:text-[16.5px] leading-relaxed">
              <p>
                Initiated in 2014, <b className="text-white font-semibold">CONFLUENCE 2026</b>, organised
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
              <p className="text-white font-medium">
                CONFLUENCE 2026 is a remarkable convergence of medical knowledge, research, and
                intellectual camaraderie, creating a lasting impact on all attendees.
              </p>
            </div>

            {/* Event highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <Award className="w-5 h-5" />,
                  title: 'Scientific Competitions',
                  desc: 'Paper presentations, case reports, poster showcases and medical quizzes recognising outstanding student research.',
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: 'Hands-On Workshops',
                  desc: 'Clinical skill simulations, BLS training, surgical suturing, POCUS and research methodology workshops led by expert faculty.',
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: 'CME Programmes',
                  desc: 'Accredited Continuing Medical Education sessions designed for resident doctors, postgraduate students and consultant physicians.',
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: 'Literati & Networking',
                  desc: 'Medical debates, literary events, recreational activities and networking evenings fostering community beyond academics.',
                },
              ].map(h => (
                <div key={h.title} className="card-glass p-5 group">
                  <div className="text-[var(--dusty-400)] mb-3">{h.icon}</div>
                  <h4 className="font-heading font-bold text-white text-base mb-2">{h.title}</h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — key info card */}
          <div className="lg:col-span-4 w-full">
            <div className="card-glass p-7 sticky top-24">
              <div className="flex items-center gap-4 pb-6 border-b border-[rgba(196,216,232,0.12)] mb-6">
                <img
                  src={gsmcCrest}
                  alt="Seth GSMC & KEMH Crest"
                  className="w-14 h-14 object-contain drop-shadow"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider
                                   text-[var(--dusty-400)] block">
                    At a glance
                  </span>
                  <h3 className="font-heading font-bold text-white text-base leading-tight">
                    Seth GSMC & KEMH
                  </h3>
                  <small className="text-[var(--muted)] text-xs">Parel, Mumbai, India</small>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[var(--dusty-400)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Pre-Conference
                    </small>
                    <b className="font-heading font-semibold text-white text-sm">{conferenceInfo.preConferenceDates}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[var(--dusty-400)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Main Conference
                    </small>
                    <b className="font-heading font-semibold text-white text-sm">{conferenceInfo.mainConferenceDates}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--dusty-400)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-0.5">
                      Venue
                    </small>
                    <b className="font-heading font-semibold text-white text-sm">{conferenceInfo.venue}</b>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[var(--dusty-400)] mt-0.5 flex-shrink-0" />
                  <div>
                    <small className="text-[10px] text-[var(--muted)] block uppercase tracking-wider mb-1">
                      Open To
                    </small>
                    <ul className="text-white text-xs font-semibold space-y-1">
                      {conferenceInfo.openToList.map(item => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span className="text-[var(--accent-blush)]">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[rgba(196,216,232,0.12)]">
                <span className="text-[11px] font-semibold uppercase tracking-wider
                                 text-[var(--dusty-400)] block mb-1">
                  Format
                </span>
                <b className="text-white text-sm font-semibold">Hybrid · Campus & Virtual</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
