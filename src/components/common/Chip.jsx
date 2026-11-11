import React from 'react';

export default function Chip({ label, pulseColor = '#2d508a', className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f1e6] border border-[rgba(100,85,70,0.22)] text-[#2d508a] text-[13px] font-semibold ${className}`}
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

