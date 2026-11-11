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
  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-[14.5px] text-[#2d508a] hover:text-[#121110] bg-[#f7f1e6] hover:bg-[#ece1cf] border border-[rgba(100,85,70,0.22)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`;

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

