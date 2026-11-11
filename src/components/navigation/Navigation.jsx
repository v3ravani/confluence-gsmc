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
                ? 'text-white bg-[#1D344F] dark:bg-[#F14666] shadow-sm'
                : 'text-[#29405B] hover:text-[#1D344F] hover:bg-[#D4E1EF]/60 dark:text-[#B5B3B0] dark:hover:text-[#F2F0ED] dark:hover:bg-white/[0.06]'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
