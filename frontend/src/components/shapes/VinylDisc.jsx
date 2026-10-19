import React from 'react';

export default function VinylDisc({ className = '', size = 'w-full h-full', labelText = 'ZUNO' }) {
  return (
    <div
      className={`rounded-full relative flex items-center justify-center vinyl-grooves shadow-xl border border-black/40 ${size} ${className}`}
      aria-hidden="true"
    >
      {/* Center Label in Acid Green */}
      <div className="w-[34%] h-[34%] rounded-full bg-[#C5F43B] border-2 border-[#141512] flex flex-col items-center justify-center text-center p-1 relative z-10 shadow-inner">
        <span className="font-['Anton'] text-[10px] sm:text-[11px] leading-tight text-[#141512] tracking-wider uppercase">
          {labelText}
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[7px] text-[#141512]/80 leading-none">
          33⅓ RPM
        </span>

        {/* Center Spindle Hole in Warm Paper */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#F4F2E9] border border-[#141512] mt-0.5" />
      </div>

      {/* Subtle shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
}
