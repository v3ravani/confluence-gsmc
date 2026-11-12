import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import gsmcCrest from '../../assets/logos/gsmc_crest.png';
import { headerBrand, navLinks, brochureConfig } from '../../data/navigation';
import { instagramConfig } from '../../data/collaborators';

export default function Footer() {
  const year = 2026;
  const hasBrochureFile = Boolean(brochureConfig.eventBrochureUrl && !brochureConfig.eventBrochureUrl.startsWith('#'));

  const handleBrochureClick = (e) => {
    if (!hasBrochureFile) {
      e.preventDefault();
      alert(`The ${brochureConfig.eventBrochureFileName} will be released with the official conference compendium.`);
    }
  };

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

            {/* Social & brochure links */}
            <div className="flex items-center gap-3">
              <a
                href={instagramConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CONFLUENCE on Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full border border-white/20
                           bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-[var(--accent-crimson)] hover:border-[var(--accent-crimson)]
                           hover:text-white transition-all duration-250"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/school/gsmedicalcollege/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seth GSMC on LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20
                           bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-[var(--accent-crimson)] hover:border-[var(--accent-crimson)]
                           hover:text-white transition-all duration-250"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={brochureConfig.eventBrochureUrl}
                onClick={handleBrochureClick}
                target={hasBrochureFile ? '_blank' : undefined}
                rel={hasBrochureFile ? 'noopener noreferrer' : undefined}
                aria-label="CONFLUENCE 2026 Brochure"
                title="Brochure"
                className="w-9 h-9 rounded-full border border-white/20
                           bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-[var(--accent-crimson)] hover:border-[var(--accent-crimson)]
                           hover:text-white transition-all duration-250 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
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
                  href="mailto:confluencegsmc@kem.edu"
                  className="text-white/85 hover:underline hover:text-white transition-colors"
                >
                  confluencegsmc@kem.edu
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5 text-xs text-white/80 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span>Danish Sahab</span>
                    <a
                      href="tel:8828988982"
                      className="text-white/85 hover:underline hover:text-white transition-colors whitespace-nowrap"
                    >
                      8828988982
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Rohan Karandikar</span>
                    <a
                      href="tel:7021864720"
                      className="text-white/85 hover:underline hover:text-white transition-colors whitespace-nowrap"
                    >
                      7021864720
                    </a>
                  </div>
                </div>
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
            Website Build by{' '}
            <a
              href="https://www.linkedin.com/in/prithvi-k-195281381"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors"
            >
              Prithvi Kharje
            </a>{' '}
            &amp;{' '}
            <a
              href="https://www.linkedin.com/in/virajravani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors"
            >
              Viraj Ravani
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
