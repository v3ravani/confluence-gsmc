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
      className={`relative w-full overflow-hidden bg-[#2d508a] border-y border-[#203c6b] py-3.5 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-8">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-6">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-white whitespace-nowrap">
              {item}
            </span>
            <span className="text-white/80 text-xs font-bold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
