import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function EventCard({
  title,
  category,
  badge,
  status,
  description,
  venue,
  date,
  onClick,
  className = '',
}) {
  return (
    <div
      className={`card-glass p-6 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-confluence-blue/10 rounded-full blur-2xl pointer-events-none group-hover:bg-confluence-blue/20 transition-all duration-500" />
      
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-confluence-sky">
            {category}
          </span>
          {badge && (
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-confluence-teal/15 text-confluence-teal border border-confluence-teal/30">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 leading-snug group-hover:text-confluence-sky transition-colors">
          {title}
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-confluence-sky" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-confluence-sky" />
            <span className="truncate max-w-[120px]">{venue}</span>
          </div>
        </div>

        {onClick && (
          <button
            onClick={onClick}
            className="mt-2 inline-flex items-center justify-between text-xs font-semibold text-confluence-sky group-hover:text-white transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

