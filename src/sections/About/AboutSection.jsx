import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import OutlineButton from '../../components/buttons/OutlineButton';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';
import { conferenceInfo } from '../../data/events';

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 lg:py-28 relative border-b border-[rgba(196,216,232,0.08)]">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <span className="text-[12px] font-semibold tracking-[0.22em] uppercase
                             text-[var(--accent-blush)] mb-2">
              The Conference
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold
                           text-white tracking-tight leading-tight mb-2">
              CONFLUENCE
            </h2>

            <h3 className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase
                           text-[var(--dusty-400)] mb-8">
              SETH GS MEDICAL COLLEGE & KING EDWARD VII MEMORIAL HOSPITAL
            </h3>

            <div className="space-y-4 text-[var(--ink-2)] text-base md:text-[16.5px] leading-relaxed max-w-3xl">
              <p>
                Initiated in 2014, <b>CONFLUENCE 2026</b>, organised by Seth GS Medical College and KEM
                Hospital in Mumbai, is a prestigious international medical and research conference.
                Spanning five days, this event provides a platform for academic exchange and exploration.
              </p>
              <p>
                It offers a comprehensive learning experience through hands-on workshops covering clinical
                skills, research methodologies, and innovative ideas. Diverse competitions acknowledge
                students' research and innovative prowess, with online screening rounds ensuring wider
                participation.
              </p>
              <p>
                The grand finale takes place on the vibrant campus, showcasing top talents. Renowned
                experts deliver talks and panel discussions, enriching intellectual discourse and
                inspiring attendees. Continuing Medical Education (CME) programmes cater to the
                professional development of resident doctors and consultants.
              </p>
              <p>
                Beyond academics, captivating literati events foster relaxation, recreational
                activities, and networking opportunities.
              </p>
              <p className="text-white font-medium">
                CONFLUENCE 2026 is a remarkable convergence of medical knowledge, research, and
                intellectual camaraderie, creating a lasting impact on all attendees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-9">
              <PrimaryButton
                onClick={() => navigate('/events')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                EXPLORE
              </PrimaryButton>
              <OutlineButton
                onClick={() => {
                  const el = document.getElementById('registration');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/events');
                }}
              >
                REGISTER
              </OutlineButton>
            </div>
          </div>

          {/* Right column — At a glance card */}
          <div className="lg:col-span-4 w-full">
            <div className="card-glass p-7 md:p-8 relative overflow-hidden">
              <div className="flex items-center gap-4 pb-6 border-b border-[rgba(196,216,232,0.12)] mb-6">
                <img
                  src={gsmcCrest}
                  alt="Seth GSMC & KEMH Crest"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider
                                   text-[var(--dusty-400)] block">
                    At a glance
                  </span>
                  <h4 className="font-heading font-bold text-white text-lg leading-tight">
                    Seth GSMC & KEMH
                  </h4>
                  <small className="text-[var(--muted)] text-xs">Parel, Mumbai, India</small>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Host Institute',        val: 'Seth GS Medical College & KEM Hospital' },
                  { label: 'Conference Heritage',   val: 'Founded in 2014 · Decade of Excellence' },
                  { label: 'Audience',              val: 'Medical Students, Interns, Residents & Consultants' },
                  { label: 'Participation Format',  val: 'Hybrid (Campus & Virtual)' },
                ].map(item => (
                  <div key={item.label}>
                    <small className="text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
                      {item.label}
                    </small>
                    <b className="font-heading font-semibold text-base sm:text-lg text-white block">
                      {item.val}
                    </b>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(196,216,232,0.12)]
                              flex items-center justify-between text-xs text-[var(--dusty-400)]">
                <span>Official Annual Symposium</span>
                <span className="font-semibold text-[var(--accent-blush)]">✦ GSMC Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
