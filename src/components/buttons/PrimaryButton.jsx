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
    bg-[#2d508a] hover:bg-[#203c6b] dark:bg-[#F14666] dark:hover:bg-[#d63856]
    shadow-sm hover:shadow-md
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
