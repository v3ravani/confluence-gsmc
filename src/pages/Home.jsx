import React, { useEffect } from 'react';
import SEO from '../components/common/SEO';
import BrainWatermark from '../components/animations/BrainWatermark';
import Hero from '../sections/Hero/Hero';
import CategoryMarquee from '../sections/Browse/CategoryMarquee';
import BrowseSection from '../sections/Browse/BrowseSection';
import RegistrationRoadmap from '../sections/Registration/RegistrationRoadmap';
import HomeEventsSection from '../sections/Events/HomeEventsSection';
import Collaborators from '../sections/Collaborators/Collaborators';
import InstagramSection from '../sections/Instagram/InstagramSection';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="CONFLUENCE 2026 | Seth GS Medical College & KEM Hospital, Mumbai"
        description="Official portal of CONFLUENCE 2026, the premier international undergraduate medical conference organized by Seth GS Medical College & KEM Hospital, Mumbai. Explore 8 scientific events, workshops, accredited CME, and register online."
        canonicalUrl="https://confluencegsmc.in/"
      />
      <div className="relative min-h-screen overflow-x-clip">
      {/* 1. Hero — text hierarchy + responsive brain watermark + date boxes + intro + CTA + brochure buttons */}
      <Hero />

      {/* 2. Marquee — transitions into Browse */}
      <CategoryMarquee />

      {/* 3. Sections Below Marquee — rotating background watermark is ONLY visible here */}
      <div className="relative">
        <BrainWatermark mode="watermark" />

        <div className="relative z-10">
          {/* Browse — clickable categories */}
          <BrowseSection />

          {/* Featured Events (Horizontal Scroll of all Event Cards) */}
          <HomeEventsSection />

          {/* How Registration Works */}
          <RegistrationRoadmap />

          {/* Meet Our Collaborators */}
          <Collaborators />

          {/* Instagram */}
          <InstagramSection />
        </div>
      </div>
    </div>
    </>
  );
}
