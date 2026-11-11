import React from 'react';

export default function GhostButton({
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
  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-[14.5px] text-[#1D344F] dark:text-[#F2F0ED] hover:text-[#536F91] dark:hover:text-[#F14666] bg-[#EAF0F6] dark:bg-[#2B2D30] hover:bg-[#D4E1EF] dark:hover:bg-[#323438] border border-[#829DBB]/45 dark:border-[#3B3D41] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClasses}>
        <span>{children}</span>
        {icon && <span className="inline-flex items-center">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      <span>{children}</span>
      {icon && <span className="inline-flex items-center">{icon}</span>}
    </button>
  );
}

