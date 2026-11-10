import React from 'react';

export default function PrimaryButton({
  children,
  onClick,
  href,
  target,
  rel,
  icon,
  className = '',
  disabled = false,
  type = 'button',
}) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
    font-semibold text-[15px] text-white
    bg-gradient-to-r from-[var(--dusty-600)] to-[var(--dusty-700)]
    hover:from-[#5a7a9a] hover:to-[#3a5068]
    shadow-[0_10px_24px_-10px_rgba(58,80,104,0.80)]
    hover:shadow-[0_14px_28px_-10px_rgba(58,80,104,0.95)]
    hover:-translate-y-0.5 active:translate-y-0
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    select-none whitespace-nowrap ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={base}>
        <span>{children}</span>
        {icon && <span className="inline-flex items-center">{icon}</span>}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      <span>{children}</span>
      {icon && <span className="inline-flex items-center">{icon}</span>}
    </button>
  );
}
