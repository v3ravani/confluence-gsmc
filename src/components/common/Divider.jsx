import React from 'react';

export default function Divider({ className = '' }) {
  return (
    <div
      className={`w-full border-t border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] my-0 ${className}`}
      role="separator"
    />
  );
}

