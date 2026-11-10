import React from 'react';

export default function Chip({ label, pulseColor = '#5eead4', className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#93c5fd]/[0.12] border border-[#93c5fd]/[0.28] text-confluence-sky text-[13px] font-medium backdrop-blur-md ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full relative flex items-center justify-center"
        style={{ backgroundColor: pulseColor }}
      >
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-75"
          style={{ backgroundColor: pulseColor }}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}

