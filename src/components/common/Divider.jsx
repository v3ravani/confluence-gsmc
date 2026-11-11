import React from 'react';

export default function Divider({ className = '' }) {
  return (
    <div
      className={`w-full border-t border-[#829DBB]/30 dark:border-[#3B3D41] my-0 ${className}`}
      role="separator"
    />
  );
}

