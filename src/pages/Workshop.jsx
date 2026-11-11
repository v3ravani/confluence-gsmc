import React, { useEffect } from 'react';
import ComingSoonSection from '../components/common/ComingSoonSection';

export default function Workshop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ComingSoonSection
      mobileTitle="WORKSHOPS"
      eyebrow="Hands-On Clinical Masterclasses"
      subtitle="Details will be revealed soon. Stay tuned!"
    />
  );
}
