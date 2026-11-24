import React, { useState } from 'react';

/**
 * ProgressiveImage provides:
 * - Native lazy-loading (`loading="lazy"`) and asynchronous decoding (`decoding="async"`)
 * - Smooth skeleton / shimmer placeholder while the image loads
 * - Graceful fade-in transition on load
 * - Prevents layout shifts
 */
export default function ProgressiveImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#829DBB]/15 dark:bg-[#3B3D41]/35 animate-pulse"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
