import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Sparkles, Maximize2 } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import { memoriesGallery } from '../data/about';

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lightbox handlers
  const openLightbox = (index) => {
    setSelectedIdx(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const nextPhoto = useCallback(() => {
    setSelectedIdx((prev) => (prev + 1) % memoriesGallery.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setSelectedIdx((prev) => (prev - 1 + memoriesGallery.length) % memoriesGallery.length);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIdx, closeLightbox, nextPhoto, prevPhoto]);

  // Bento span config for desktop 12-column grid
  const getBentoClasses = (idx, photo) => {
    // 14 items bento layout
    switch (idx) {
      case 0:
        return 'col-span-12 lg:col-span-8 lg:row-span-2 min-h-[380px] lg:min-h-[440px]';
      case 1:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 lg:row-span-2 min-h-[320px] lg:min-h-[440px]';
      case 2:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 3:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 4:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 5:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      case 6:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      case 7:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 8:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 9:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
      case 10:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      case 11:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      case 12:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      case 13:
        return 'col-span-12 sm:col-span-6 lg:col-span-6 min-h-[280px]';
      default:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]';
    }
  };

  return (
    <div className="pt-0 pb-16 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="GALLERY" />

      <div className="wrap relative z-10">
        {/* Desktop Back Link */}
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] dark:text-[#898A89]
                     hover:text-[#121110] dark:hover:text-[#F2F0ED] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Page Heading */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-crimson)] dark:text-[#F14666] mb-2.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            CONFLUENCE ARCHIVES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121110] dark:text-[#F2F0ED] tracking-tight leading-tight mb-3">
            PHOTOS FROM PREVIOUS{' '}
            <span
              className="italic font-normal text-[var(--accent-crimson)] dark:text-[#EE9590]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" }}
            >
              editions
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] dark:text-[#B5B3B0] max-w-2xl leading-relaxed">
            A visual retrospective of CONFLUENCE ’25: landmark stage installations, intensive hands-on clinical workshops, research presentations, and vibrant student camaraderie.
          </p>
        </div>

        {/* ── MOBILE VIEW: STACKING CARDS ANIMATION ────────────────────────── */}
        <div className="md:hidden space-y-8 pb-12 pt-2">
          {memoriesGallery.map((photo, idx) => (
            <div
              key={photo.id}
              className="sticky transition-all duration-300"
              style={{
                top: `${94 + (idx % 6) * 10}px`,
                zIndex: idx + 10,
              }}
            >
              <div
                onClick={() => openLightbox(idx)}
                className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] bg-[#ece1cf] dark:bg-[#2B2D30] shadow-[0_12px_36px_rgba(0,0,0,0.16)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)] cursor-pointer active:scale-[0.98] transition-transform"
              >
                {/* 1. Top Bar: Counter */}
                <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider text-[#913433] dark:text-[#F14666]">
                    {String(idx + 1).padStart(2, '0')}/{String(memoriesGallery.length).padStart(2, '0')}
                  </span>
                </div>

                {/* 2. Photo Container with Rounded Frame (No Badges) */}
                <div className="px-3.5">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/5">
                    <img
                      src={photo.src}
                      alt={photo.title || 'CONFLUENCE memory'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* 3. Bottom Text: Title & Description */}
                <div className="p-4 pt-3.5">
                  <h3 className="font-heading font-extrabold text-base leading-snug text-[#121110] dark:text-[#F2F0ED] mb-1.5">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-xs text-[#6b6459] dark:text-[#B5B3B0] leading-relaxed">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP VIEW: BENTO GRID ─────────────────────────────────────── */}
        <div className="hidden md:grid grid-cols-12 gap-5 auto-rows-fr">
          {memoriesGallery.map((photo, idx) => {
            const bentoSpan = getBentoClasses(idx, photo);

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41] hover:border-[#2d508a] dark:hover:border-[#F14666] bg-[#ded2c0] dark:bg-[#2B2D30] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-end ${bentoSpan}`}
              >
                {/* Background Image */}
                <img
                  src={photo.src}
                  alt={photo.title || 'CONFLUENCE memory'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Top Corner Quick Maximize Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Tile Content in Bottom Area */}
                <div className="relative z-10 p-5 text-white flex flex-col justify-end">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg lg:text-xl text-white leading-snug drop-shadow-sm group-hover:text-white transition-colors">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mt-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── LIGHTBOX MODAL ─────────────────────────────────────────── */}
        {selectedIdx !== null && memoriesGallery[selectedIdx] && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Counter & Close */}
              <div className="w-full flex items-center justify-between text-white/80 pb-3 mb-2 border-b border-white/10">
                <span className="text-xs text-white/70 font-semibold tracking-wide">
                  {selectedIdx + 1} / {memoriesGallery.length}
                </span>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Frame with Navigation */}
              <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#080d14]/90 shadow-2xl">
                <img
                  src={memoriesGallery[selectedIdx].src}
                  alt={memoriesGallery[selectedIdx].title || 'CONFLUENCE memory'}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
                />

                {/* Prev Button */}
                {memoriesGallery.length > 1 && (
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all hover:scale-105 cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Next Button */}
                {memoriesGallery.length > 1 && (
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all hover:scale-105 cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Image Title & Caption Below */}
              <div className="w-full mt-3 text-center sm:text-left">
                <h4 className="font-heading font-bold text-white text-base">
                  {memoriesGallery[selectedIdx].title}
                </h4>
                {memoriesGallery[selectedIdx].caption && (
                  <p className="text-xs text-white/70 mt-0.5">
                    {memoriesGallery[selectedIdx].caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

