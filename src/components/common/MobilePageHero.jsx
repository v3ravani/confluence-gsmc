import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MobilePageHero({ title }) {
  return (
    <div className="md:hidden relative bg-[#2d508a] dark:bg-[#252629] w-full pt-6 pb-11 px-5 text-white overflow-hidden shadow-md mb-7 border-b border-[#203c6b] dark:border-[#3B3D41]">
      {/* Decorative background curves */}
      <div className="absolute -right-10 -bottom-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute right-20 -top-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -left-12 -bottom-10 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

      {/* Top row: small back to home in grey on left */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-white/50" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Page Name: Thick, just like CONFLUENCE in footer */}
      <h1 className="relative z-10 font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tighter leading-none">
        {title}
      </h1>
    </div>
  );
}

