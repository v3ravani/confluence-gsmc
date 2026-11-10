import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Users } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SectionHeading from '../components/common/SectionHeading';

// ── Configurable placeholder content ────────────────────────────────────────
const cmeInfo = {
  intro: 'CONFLUENCE 2026 offers accredited Continuing Medical Education programmes specifically designed for resident doctors, consultants and healthcare professionals seeking formal CPD credit.',
  note:  'CME accreditation details, credit hours and registration processes will be announced with the official conference brochure. All attending participants receive a certificate of participation.',
  programmes: [
    { id: 1, title: 'Clinical Updates in Internal Medicine', tag: 'Internal Medicine', desc: 'Latest evidence-based guidelines in hypertension, diabetes management and cardiovascular risk reduction.' },
    { id: 2, title: 'Advances in Oncology & Precision Medicine', tag: 'Oncology', desc: 'Cutting-edge developments in immunotherapy, targeted therapy and precision oncology approaches.' },
    { id: 3, title: 'Surgical Innovations & Minimally Invasive Techniques', tag: 'Surgery', desc: 'Updates in laparoscopic and robotic surgery, wound healing and post-operative care protocols.' },
    { id: 4, title: 'Critical Care & Emergency Management', tag: 'Critical Care', desc: 'Evidence-based updates in ICU management, sepsis protocols and ventilator strategies.' },
    { id: 5, title: 'Research Methodology for Clinicians', tag: 'Academic CPD', desc: 'Practical workshop on biostatistics, systematic review writing and clinical trial design.' },
    { id: 6, title: 'Medical Ethics & Professionalism', tag: 'Ethics & Law', desc: 'Panel discussions and case-based sessions on contemporary medical ethics and medicolegal principles.' },
  ],
};

function CMECard({ prog }) {
  return (
    <div className="card-glass p-6 group">
      <span className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: 'var(--dusty-400)' }}>
        {prog.tag}
      </span>
      <h3 className="font-heading font-bold text-white text-base md:text-lg mb-2 leading-snug
                     group-hover:text-[var(--dusty-200)] transition-colors">
        {prog.title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{prog.desc}</p>
      <div className="mt-4 pt-4 border-t border-[rgba(196,216,232,0.10)]">
        <span className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--sage-400)' }}>
          CME Credits · Certificate of Participation
        </span>
      </div>
    </div>
  );
}

export default function CME() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--dusty-400)]
                                hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <SectionHeading
          eyebrow="Professional Development"
          title="Continuing Medical"
          highlightWord="Education"
          subtitle={cmeInfo.intro}
        />

        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
          {[
            { icon: <BookOpen className="w-4 h-4" />, label: 'Programmes', val: '6+' },
            { icon: <Award className="w-4 h-4" />, label: 'Credits', val: 'Accredited' },
            { icon: <Users className="w-4 h-4" />, label: 'For', val: 'Residents +' },
          ].map(s => (
            <div key={s.label} className="card-glass p-4 text-center">
              <div className="text-[var(--dusty-400)] flex justify-center mb-1">{s.icon}</div>
              <b className="font-heading text-white text-lg block">{s.val}</b>
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {cmeInfo.programmes.map(prog => <CMECard key={prog.id} prog={prog} />)}
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.14)]
                        flex items-start gap-3">
          <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{cmeInfo.note}</p>
        </div>
      </div>
    </div>
  );
}
