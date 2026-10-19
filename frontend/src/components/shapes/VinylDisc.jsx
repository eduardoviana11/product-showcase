import React from 'react';

export default function VinylDisc({ className = '', size = 'w-full h-full', labelText = 'ZUNO' }) {
  return (
    <div
      className={`rounded-full relative flex items-center justify-center vinyl-grooves shadow-xl border border-black/50 ${size} ${className}`}
      aria-hidden="true"
    >
      {/* Specular sheen / birefringence reflection over grooves */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.12)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.12)_225deg,transparent_270deg)] pointer-events-none mix-blend-overlay" />

      {/* Center Label in Acid Green */}
      <div className="w-[33%] h-[33%] rounded-full bg-[#C5F43B] border-2 border-[#141512] flex flex-col items-center justify-center text-center p-1 relative z-10 shadow-inner">
        <span className="font-['Anton'] text-[9px] sm:text-[10px] leading-tight text-[#141512] tracking-wider uppercase">
          {labelText}
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[6.5px] text-[#141512]/80 leading-none">
          33⅓ RPM
        </span>
        <div className="w-2 h-2 rounded-full bg-[#F4F2E9] border border-[#141512] mt-0.5" />
      </div>
    </div>
  );
}
