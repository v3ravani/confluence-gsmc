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
  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-[14.5px] text-confluence-sky hover:text-white bg-transparent hover:bg-white/[0.08] border border-white/[0.18] hover:border-white/[0.35] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`;

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

