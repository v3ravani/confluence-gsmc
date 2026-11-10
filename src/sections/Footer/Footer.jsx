import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';
import { headerBrand, navLinks } from '../../data/navigation';
import { instagramConfig } from '../../data/collaborators';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative bg-[#0f1824] pt-16 pb-10 text-white
                       border-t border-[rgba(196,216,232,0.10)] overflow-hidden">
      {/* Large decorative watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-heading font-extrabold text-[clamp(80px,16vw,200px)]
                         tracking-tighter text-white/[0.025] uppercase leading-none whitespace-nowrap">
          CONFLUENCE
        </span>
      </div>

      <div className="wrap relative z-10">
        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8
                        pb-14 border-b border-[rgba(196,216,232,0.10)]">

          {/* Col 1 — Brand (4 cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 select-none mb-5">
              <img
                src={gsmcCrest}
                alt="Seth GSMC & KEMH Crest"
                className="w-12 h-12 object-contain drop-shadow"
              />
              <div className="flex flex-col leading-tight">
                <b className="font-heading font-extrabold text-lg text-white">
                  {headerBrand.title}
                </b>
                <span className="text-[9.5px] tracking-[0.14em] text-[var(--dusty-200)] uppercase mt-0.5">
                  {headerBrand.collegeLine1}
                </span>
                <span className="text-[9px] tracking-[0.12em] text-[var(--dusty-400)] uppercase">
                  {headerBrand.collegeLine2}
                </span>
              </div>
            </Link>

            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-sm mb-5">
              Premier international undergraduate medical and research conference
              organised by Seth GS Medical College &amp; King Edward VII Memorial Hospital, Mumbai.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={instagramConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CONFLUENCE on Instagram"
                className="w-9 h-9 rounded-full border border-[rgba(196,216,232,0.18)]
                           bg-[rgba(74,106,138,0.10)]
                           flex items-center justify-center text-[var(--dusty-400)]
                           hover:bg-[var(--blush-600)] hover:border-[var(--blush-600)]
                           hover:text-white transition-all duration-250"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <span className="inline-block mt-5 text-xs font-semibold px-3 py-1 rounded-full
                             bg-[rgba(74,106,138,0.12)] text-[var(--dusty-200)]
                             border border-[rgba(196,216,232,0.14)]">
              ✦ Est. 2014 · Mumbai, India
            </span>
          </div>

          {/* Col 2 — Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--dusty-200)]">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Delegate resources (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Delegates
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--dusty-200)]">
              <a
                href="#registration"
                className="hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Registration Guide
              </a>
              <Link
                to="/events"
                className="hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Event Brochure
              </Link>
              <Link
                to="/merchandise"
                className="hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                Merchandise Catalogue
              </Link>
              <a
                href={instagramConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--dusty-400)]
                           hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 4 — Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Contact &amp; Venue
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[var(--muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--dusty-400)] flex-shrink-0 mt-0.5" />
                <span>
                  Seth GS Medical College &amp; KEM Hospital,<br />
                  Acharya Donde Marg, Parel,<br />
                  Mumbai — 400012, Maharashtra
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--dusty-400)] flex-shrink-0" />
                <a
                  href="mailto:confluence.gsmc@gmail.com"
                  className="text-[var(--dusty-400)] hover:underline hover:text-white transition-colors"
                >
                  confluence.gsmc@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--dusty-400)] flex-shrink-0" />
                <span>Secretariat: +91 22 2410 7000</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-[var(--muted)]">
          <span>
            © {year} CONFLUENCE · Seth GS Medical College &amp; KEM Hospital, Mumbai
          </span>
          <span className="text-center sm:text-right">
            Official Medical Conference Portal · Built with React &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
