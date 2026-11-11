import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { memoriesGallery } from '../../data/about';

export default function MemoriesGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

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

  return (
    <section className="pt-16 pb-20 border-t border-[rgba(100,85,70,0.18)]">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-crimson)] mb-2 block flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Memories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121110] tracking-tight leading-tight mb-2">
          PHOTOS FROM PREVIOUS{' '}
          <span
            className="italic font-normal text-[var(--accent-crimson)]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" }}
          >
            editions
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          A visual retrospective of CONFLUENCE ’25: landmark stage installations, intensive hands-on clinical workshops, research presentations, and vibrant student camaraderie.
        </p>
      </div>

      {/* Responsive Gallery Grid — Clean image cards with subtle hover animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {memoriesGallery.map((photo, idx) => {
          const isFeatured = photo.featured;

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className={`relative rounded-xl overflow-hidden cursor-pointer border border-[rgba(100,85,70,0.20)] hover:border-[var(--accent-blue)] transition-all duration-300 hover:scale-[1.015] bg-[#ded2c0] shadow-sm ${
                isFeatured ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title || 'CONFLUENCE memory'}
                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-95"
                loading="lazy"
              />
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
              <span className="text-xs text-[var(--dusty-400)] font-medium tracking-wide">
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
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg"
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
          </div>
        </div>
      )}
    </section>
  );
}
