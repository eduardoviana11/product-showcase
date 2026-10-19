import React, { useState, useEffect } from 'react';
import { resolveAssetUrl } from '../../utils/assets';

export default function VinylDisc({
  className = '',
  size = 'w-full h-full',
  labelText = 'ZUNO',
  image = '',
  scale = 1.0,
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [image]);

  const resolvedSrc = resolveAssetUrl(image);
  const hasCustomImage = Boolean(resolvedSrc) && !imageError;

  // Custom vinyl artwork (colored/picture discs). Falls back to the generic black disc.
  if (hasCustomImage) {
    return (
      <div
        className={`rounded-full relative flex items-center justify-center overflow-hidden drop-shadow-xl ${size} ${className}`}
        aria-hidden="true"
      >
        <img
          src={resolvedSrc}
          alt=""
          style={{ transform: `scale(${scale})` }}
          className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-200"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

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
      </div>
    </div>
  );
}
