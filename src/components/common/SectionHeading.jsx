import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  highlightWord,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignClass = align === 'center'
    ? 'text-center mx-auto items-center'
    : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="text-[12px] font-semibold tracking-[0.22em] uppercase
                         text-[var(--accent-blush)] mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-heading font-extrabold
                     text-[#121110] dark:text-[#F2F0ED] tracking-tight leading-[1.15] mb-3">
        {title}{' '}
        {highlightWord && (
          <span
            className="italic font-normal text-[var(--accent-crimson)] dark:text-[#F14666]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" }}
          >
            {highlightWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted)] dark:text-[#B5B3B0] text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
