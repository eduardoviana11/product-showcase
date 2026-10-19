import React from 'react';

export default function PulseMark({ color = 'dark', className = '', size = 28 }) {
  const strokeColor = color === 'acid' ? '#C5F43B' : color === 'light' ? '#F4F2E9' : '#141512';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      {/* 3 intersecting lines for asterisk pulse mark */}
      <line x1="12" y1="2" x2="12" y2="22" stroke={strokeColor} strokeWidth="3" strokeLinecap="square" />
      <line x1="3.34" y1="7" x2="20.66" y2="17" stroke={strokeColor} strokeWidth="3" strokeLinecap="square" />
      <line x1="3.34" y1="17" x2="20.66" y2="7" stroke={strokeColor} strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}
