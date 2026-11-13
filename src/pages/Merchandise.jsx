import React, { useEffect } from 'react';
import ComingSoonSection from '../components/common/ComingSoonSection';
import SEO from '../components/common/SEO';

export default function Merchandise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Official Merchandise | CONFLUENCE 2026 | Seth GSMC"
        description="Exclusive CONFLUENCE 2026 conference merchandise, apparel, and student accessories by Seth GS Medical College & KEM Hospital, Mumbai."
        canonicalUrl="https://confluencegsmc.in/merchandise"
      />
      <ComingSoonSection
        mobileTitle="MERCHANDISE"
        eyebrow="Official Store"
        subtitle="Details will be revealed soon. Stay tuned!"
      />
    </>
  );
}
