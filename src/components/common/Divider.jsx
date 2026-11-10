import React from 'react';

export default function Divider({ className = '' }) {
  return (
    <div
      className={`w-full border-t border-white/[0.12] my-0 ${className}`}
      role="separator"
    />
  );
}

