import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';
import { headerBrand, navLinks } from '../../data/navigation';
import { instagramConfig } from '../../data/collaborators';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative bg-[#1D344F] dark:bg-[#252629] rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] pt-16 pb-10 text-white
                       shadow-[0_-8px_32px_rgba(29,52,79,0.20)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.50)] overflow-hidden">
      {/* Large decorative watermark anchored cleanly at bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center translate-y-3 sm:translate-y-4 md:translate-y-6"
      >
        <span className="font-heading font-black text-[clamp(95px,22vw,240px)]
                         tracking-tighter text-white/[0.045] dark:text-white/[0.035] uppercase leading-none whitespace-nowrap select-none">
          CONFLUENCE
        </span>
      </div>

      <div className="wrap relative z-10">
        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-8
                        pb-14 border-b border-white/10 dark:border-[#3B3D41]">

          {/* Col 1 — Brand (4 cols on desktop, full width on mobile) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-4">
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
                <span className="text-[9.5px] tracking-[0.14em] text-white/80 uppercase mt-0.5">
                  {headerBrand.collegeLine1}
                </span>
                <span className="text-[9px] tracking-[0.12em] text-white/60 uppercase">
                  {headerBrand.collegeLine2}
                </span>
              </div>
            </Link>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-5">
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
                className="w-9 h-9 rounded-full border border-white/20
                           bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-[var(--accent-crimson)] hover:border-[var(--accent-crimson)]
                           hover:text-white transition-all duration-250"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <span className="inline-block mt-5 text-xs font-semibold px-3 py-1 rounded-full
                             bg-white/10 text-white
                             border border-white/20">
              ✦ Est. 2014 · Mumbai, India
            </span>
          </div>

          {/* Col 2 — Navigation (3 cols on desktop, left half on mobile) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/80">
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

          {/* Col 3 — Delegate resources (2 cols on desktop, right half on mobile) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Delegates
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/80">
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
                className="inline-flex items-center gap-1 text-white/70
                           hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 4 — Contact (3 cols on desktop, full width on mobile) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-tight uppercase">
              Contact &amp; Venue
            </h4>
            <div className="flex flex-col gap-3 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                <span>
                  Seth GS Medical College &amp; KEM Hospital,<br />
                  Acharya Donde Marg, Parel,<br />
                  Mumbai — 400012, Maharashtra
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/60 flex-shrink-0" />
                <a
                  href="mailto:confluence.gsmc@gmail.com"
                  className="text-white/80 hover:underline hover:text-white transition-colors"
                >
                  confluence.gsmc@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white/60 flex-shrink-0" />
                <span>Secretariat: +91 22 2410 7000</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-white/60">
          <span>
            © {year} CONFLUENCE · Seth GS Medical College &amp; KEM Hospital, Mumbai
          </span>
          <span className="text-center sm:text-right">
            Build by Prithvi Kharje &amp; Viraj Ravani
          </span>
        </div>
      </div>
    </footer>
  );
}
