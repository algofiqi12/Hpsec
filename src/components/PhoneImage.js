'use client';

import { useState } from 'react';

export default function PhoneImage({ src, alt, width = 600, height = 600, className = '' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="placeholder-img" style={{ minHeight: '280px' }}>
        Foto belum tersedia
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
