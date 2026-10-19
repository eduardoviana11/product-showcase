import React from 'react';

export default function OffsetCutout({ children, className = '', cutoutColor = 'bg-[#C5F43B]' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Cutout acid-green background block shifted +14px right and +14px down */}
      <div
        className={`absolute inset-0 ${cutoutColor} border-2 border-[#141512] translate-x-[14px] translate-y-[14px] -z-10`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
