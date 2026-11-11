import React from 'react';
import { Link } from 'react-router-dom';

export default function OutlineButton({
  children,
  onClick,
  href,       // internal route → uses <Link>
  externalHref, // external URL → uses <a>
  target,
  rel,
  icon,
  className = '',
  disabled = false,
  type = 'button',
}) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
    font-semibold text-[15px] text-[#1D344F] dark:text-[#F14666]
    bg-[#EAF0F6] dark:bg-[#2B2D30] border border-[#829DBB] dark:border-[#F14666]
    hover:bg-[#1D344F] hover:border-[#1D344F] hover:text-white dark:hover:bg-[#F14666] dark:hover:text-white
    hover:-translate-y-0.5 active:translate-y-0
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    select-none whitespace-nowrap ${className}`;

  if (href) {
    // Internal React Router link
    return (
      <Link to={href} className={base}>
        <span>{children}</span>
        {icon && <span className="inline-flex items-center">{icon}</span>}
      </Link>
    );
  }

  if (externalHref) {
    return (
      <a href={externalHref} target={target || '_blank'} rel={rel || 'noopener noreferrer'} className={base}>
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
