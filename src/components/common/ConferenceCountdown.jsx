import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Pre-Conference Target: 9th December 2026 at 09:30 AM IST (UTC+05:30)
const TARGET_TIMESTAMP = new Date('2026-12-09T09:30:00+05:30').getTime();

export default function ConferenceCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const difference = TARGET_TIMESTAMP - now;

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', hasEnded: true };
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      hasEnded: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="hidden md:flex fixed bottom-5 right-5 z-40 group pointer-events-auto"
      aria-label="Countdown to Pre-Conference"
    >
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-[#202124]/95 backdrop-blur-md border border-[#829DBB]/35 dark:border-[#3B3D41] shadow-md hover:shadow-xl hover:border-[#1D344F]/40 dark:hover:border-[#F14666]/60 transition-all duration-300 ease-out hover:scale-105 select-none cursor-default">
        {/* Clock icon */}
        <Clock className="w-4 h-4 text-[#536F91] dark:text-[#898A89] flex-shrink-0" />

        {/* Expandable Sentence on Hover: "Countdown to pre-conference:" (increased size by 2px) */}
        <div className="overflow-hidden transition-all duration-300 max-w-0 opacity-0 whitespace-nowrap group-hover:max-w-xs group-hover:opacity-100 flex-shrink-0">
          <span className="text-[13.5px] font-semibold text-[#536F91] dark:text-[#A6A4A1] pr-1">
            Countdown to pre-conference:
          </span>
        </div>

        {/* dd:hh:mm Format (increased by 2px: text-sm font-mono and text-xs units) */}
        <div className="flex items-center font-mono font-bold text-sm tracking-tight text-[#1D344F] dark:text-[#F2F0ED] whitespace-nowrap">
          <span>{timeLeft.days}</span>
          <span className="text-xs text-[#536F91] dark:text-[#898A89] font-normal mx-0.5">d</span>
          <span className="text-[#829DBB] dark:text-[#536F91] mx-0.5">:</span>
          <span>{timeLeft.hours}</span>
          <span className="text-xs text-[#536F91] dark:text-[#898A89] font-normal mx-0.5">h</span>
          <span className="text-[#829DBB] dark:text-[#536F91] mx-0.5">:</span>
          <span>{timeLeft.minutes}</span>
          <span className="text-xs text-[#536F91] dark:text-[#898A89] font-normal ml-0.5">m</span>
        </div>
      </div>
    </div>
  );
}
