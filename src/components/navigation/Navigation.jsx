import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/navigation';

export default function Navigation({ className = '' }) {
  return (
    <nav className={`hidden lg:flex items-center gap-1 ml-auto ${className}`} aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `px-3.5 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
              isActive
                ? 'text-white bg-[rgba(74,106,138,0.28)] font-semibold'
                : 'text-[var(--dusty-200)] hover:text-white hover:bg-[rgba(74,106,138,0.16)]'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
