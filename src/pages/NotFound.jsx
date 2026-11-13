import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Calendar, BookOpen, Users, Compass } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import SEO from '../components/common/SEO';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'CME', path: '/cme', icon: BookOpen },
    { label: 'Team', path: '/team', icon: Users },
  ];

  return (
    <>
      <SEO
        title="Page Not Found | 404 Error | CONFLUENCE 2026"
        description="The page you requested could not be found on CONFLUENCE 2026. Explore our scientific events, CME conferences, and student initiatives."
        canonicalUrl="https://confluencegsmc.in/404"
        noIndex={true}
      />

      <div className="pt-8 pb-20 md:py-24 relative min-h-[75vh] flex items-center justify-center">
        <BrainWatermark mode="watermark" />

        <div className="wrap relative z-10 max-w-2xl mx-auto text-center px-4">
          {/* 404 Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB]/40 dark:border-[#3B3D41] text-[#1D344F] dark:text-[#F14666] text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
            <Compass className="w-4 h-4 text-[#536F91] dark:text-[#F14666]" />
            <span>Error 404 · Page Not Found</span>
          </div>

          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-[#1D344F] dark:text-[#F2F0ED] tracking-tight leading-none mb-4">
            Lost Your Way?
          </h1>

          <p className="text-base sm:text-lg text-[#536F91] dark:text-[#898A89] max-w-lg mx-auto leading-relaxed mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-[#1D344F] hover:bg-[#15273C] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-sm hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#1D344F] dark:text-[#F2F0ED] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF]/70 dark:hover:bg-[#323438] border border-[#829DBB]/40 dark:border-[#3B3D41] transition-all cursor-pointer shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#536F91] dark:text-[#F14666]" />
              <span>Explore Events</span>
            </Link>
          </div>

          {/* Quick Links Grid */}
          <div className="p-6 rounded-2xl bg-[#EAF0F6]/80 dark:bg-[#252629]/90 border border-[#829DBB]/30 dark:border-[#3B3D41] backdrop-blur-xs text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#536F91] dark:text-[#898A89] block mb-3">
              Popular Destinations
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#2B2D30] border border-[#829DBB]/20 dark:border-[#3B3D41] text-xs font-semibold text-[#1D344F] dark:text-[#F2F0ED] hover:text-[#536F91] dark:hover:text-[#F14666] hover:border-[#536F91] dark:hover:border-[#F14666] transition-all group"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#536F91] dark:text-[#898A89] group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

