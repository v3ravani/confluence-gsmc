import React from 'react';

export default function InfoCard({
  icon,
  stepNumber,
  title,
  description,
  badge,
  className = '',
}) {
  return (
    <div
      className={`card-glass p-6 md:p-7 flex flex-col justify-between group transition-all duration-300 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          {stepNumber && (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xl text-confluence-sky bg-white/[0.08] border border-white/[0.14] group-hover:scale-105 group-hover:border-confluence-sky transition-all duration-300">
              {stepNumber}
            </div>
          )}
          {icon && !stepNumber && (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-confluence-blue bg-white/[0.1] border border-white/[0.16] shadow-sm group-hover:scale-105 group-hover:bg-white/[0.18] transition-all duration-300">
              {icon}
            </div>
          )}
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-confluence-blue/20 text-confluence-sky border border-confluence-sky/30">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 group-hover:text-confluence-sky transition-colors">
          {title}
        </h3>
        <p className="text-muted text-[14.5px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

