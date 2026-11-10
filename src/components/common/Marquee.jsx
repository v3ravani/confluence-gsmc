import React from 'react';

export default function Marquee({
  items = [
    'Scientific Paper Presentations',
    'Hands-on Clinical Workshops',
    'National Intercollegiate Mediquiz',
    'Continuing Medical Education (CME)',
    'Clinico-Pathological Case Chronicles',
    'Seth GS Medical College & KEM Hospital',
    'Parel, Mumbai',
    'CONFLUENCE 2026',
  ],
  className = '',
}) {
  const repeatedItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden bg-white/[0.04] border-y border-white/[0.1] py-3 select-none pointer-events-none backdrop-blur-sm ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-8">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-6">
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#cfe0ff]/90 whitespace-nowrap">
              {item}
            </span>
            <span className="text-confluence-sky text-xs font-bold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
