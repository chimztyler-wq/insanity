import React from 'react';

export function BrandIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 2.5l10 5.77v11.46L14 25.5l-10-5.77V8.27L14 2.5z"
        stroke="white"
        strokeWidth="1.2"
        strokeOpacity="0.4"
        fill="white"
        fillOpacity="0.06"
      />
      <path
        d="M14 6.5l6.5 3.75v7.5L14 21.5l-6.5-3.75v-7.5L14 6.5z"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.2"
        fill="white"
        fillOpacity="0.04"
      />
      <circle cx="14" cy="14" r="2.5" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

export const PumpkinIcon = BrandIcon;
