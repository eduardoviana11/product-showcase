import React from 'react';

export default function TiltedTape({ children, className = '' }) {
  return (
    <span
      className={`inline-block bg-[#C5F43B] text-[#141512] font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.06em] px-3 py-1 border-2 border-[#141512] -rotate-4 font-semibold select-none shadow-[2px_2px_0px_#141512] ${className}`}
    >
      {children}
    </span>
  );
}
