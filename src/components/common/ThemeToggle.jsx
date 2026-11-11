import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full
                   bg-[#ece1cf] dark:bg-[#2B2D30]
                   border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41]
                   text-[#121110] dark:text-[#F2F0ED]
                   hover:bg-[#f7f1e6] dark:hover:bg-[#323438]
                   transition-all duration-200 cursor-pointer focus-visible:outline-none ${className}`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-[#FFCCAA] transition-transform duration-200" />
        ) : (
          <Sun className="w-4 h-4 text-[#2d508a] transition-transform duration-200" />
        )}
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className={`inline-flex items-center p-0.5 rounded-full
                 bg-[#ece1cf] dark:bg-[#2B2D30]
                 border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41]
                 transition-colors duration-200 shadow-xs ${className}`}
    >
      {/* Light Option */}
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`inline-flex items-center justify-center p-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none
          ${!isDark
            ? 'bg-white text-[#2d508a] shadow-xs scale-100'
            : 'text-[#898A89] hover:text-[#121110] dark:hover:text-[#F2F0ED] scale-95'
          }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      {/* Dark Option */}
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`inline-flex items-center justify-center p-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none
          ${isDark
            ? 'bg-[#F14666] text-white shadow-xs scale-100'
            : 'text-[#6b6459] hover:text-[#121110] scale-95'
          }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

