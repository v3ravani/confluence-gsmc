import React, { useEffect } from 'react';
import ComingSoonSection from '../components/common/ComingSoonSection';
import SEO from '../components/common/SEO';

export default function Workshop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Clinical Skill Workshops | CONFLUENCE 2026 | Seth GSMC"
        description="Hands-on clinical skill workshops and masterclasses at Seth GS Medical College & KEM Hospital during CONFLUENCE 2026. Stay tuned for workshop track reveals."
        canonicalUrl="https://confluencegsmc.in/workshops"
      />
      <ComingSoonSection
        mobileTitle="WORKSHOPS"
        eyebrow="Hands-On Clinical Masterclasses"
        subtitle="Details will be revealed soon. Stay tuned!"
      />
    </>
  );
}
