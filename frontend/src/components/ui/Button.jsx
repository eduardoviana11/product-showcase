import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    // Primary: Acid Green fill with vinyl black text and 2px border
    primary:
      "bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] active:translate-x-0.5 active:translate-y-0.5",
    // Secondary: Transparent with 2px vinyl black border
    secondary:
      "bg-transparent text-[#141512] border-2 border-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9]",
    // Dark: Vinyl black fill with warm paper text
    dark:
      "bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] hover:bg-[#252722] hover:shadow-[3px_3px_0px_#C5F43B]",
    // Circular: strictly for functional carousel controls
    circular:
      "w-10 h-10 rounded-full bg-[#F4F2E9] text-[#141512] border-2 border-[#141512] hover:bg-[#C5F43B] active:scale-95 p-0",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-sm",
    circular: "",
  };

  const sizeClass = variant === 'circular' ? sizes.circular : sizes[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
}
