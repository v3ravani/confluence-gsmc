import React, { useEffect } from 'react';
import ComingSoonSection from '../components/common/ComingSoonSection';

export default function Merchandise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ComingSoonSection
      mobileTitle="MERCHANDISE"
      eyebrow="Official Store"
      subtitle="Details will be revealed soon. Stay tuned!"
    />
  );
}
