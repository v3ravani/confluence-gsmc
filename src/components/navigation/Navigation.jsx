import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/navigation';

export default function Navigation({ className = '' }) {
  return (
    <nav className={`hidden lg:flex items-center gap-1.5 ml-auto ${className}`} aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? 'text-white bg-[var(--accent-blue)] shadow-sm'
                : 'text-[#2d2b28] hover:text-[#121110] hover:bg-[rgba(45,80,138,0.08)]'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
