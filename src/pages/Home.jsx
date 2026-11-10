import React, { useEffect } from 'react';
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
    <>
      {/* 1. Hero — text hierarchy + responsive brain watermark + date boxes + intro + CTA + brochure buttons */}
      <Hero />

      {/* 2. Marquee — transitions into Browse */}
      <CategoryMarquee />

      {/* 3. Browse — 4 clickable categories */}
      <BrowseSection />

      {/* 4. How Registration Works */}
      <RegistrationRoadmap />

      {/* 5. Meet Our Collaborators */}
      <Collaborators />

      {/* 6. Instagram */}
      <InstagramSection />
    </>
  );
}
