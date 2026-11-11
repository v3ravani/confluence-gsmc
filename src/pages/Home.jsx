import React, { useEffect } from 'react';
import BrainWatermark from '../components/animations/BrainWatermark';
import Hero from '../sections/Hero/Hero';
import CategoryMarquee from '../sections/Browse/CategoryMarquee';
import BrowseSection from '../sections/Browse/BrowseSection';
import RegistrationRoadmap from '../sections/Registration/RegistrationRoadmap';
import Collaborators from '../sections/Collaborators/Collaborators';
import InstagramSection from '../sections/Instagram/InstagramSection';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. Hero — text hierarchy + responsive brain watermark + date boxes + intro + CTA + brochure buttons */}
      <Hero />

      {/* 2. Marquee — transitions into Browse */}
      <CategoryMarquee />

      {/* 3. Sections Below Marquee — rotating background watermark is ONLY visible here */}
      <div className="relative">
        <BrainWatermark mode="watermark" />

        <div className="relative z-10">
          {/* Browse — 4 clickable categories */}
          <BrowseSection />

          {/* How Registration Works */}
          <RegistrationRoadmap />

          {/* Meet Our Collaborators */}
          <Collaborators />

          {/* Instagram */}
          <InstagramSection />
        </div>
      </div>
    </div>
  );
}
