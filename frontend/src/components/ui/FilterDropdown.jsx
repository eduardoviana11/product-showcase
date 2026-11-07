import React, { useState, useRef, useEffect } from 'react';

export default function FilterDropdown({
  label,
  value,
  options = [],
  onChange,
  isActive = false,
  align = 'left',
  fullWidth = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? 'w-full' : 'w-auto'}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`${
          fullWidth ? 'w-full' : 'w-auto max-w-[230px]'
        } h-10 px-3 rounded-lg border transition-colors flex items-center justify-between gap-2 cursor-pointer font-['IBM_Plex_Mono'] text-xs text-[#141512] ${
          isActive
            ? 'bg-[#C5F43B]/35 border-[#141512] font-semibold'
            : 'bg-[#F4F2E9] border-[#141512]/30 hover:border-[#141512]'
        }`}
      >
        <span className="truncate">
          {label ? (
            <>
              <span className="text-[#141512]/65 font-normal uppercase">
                {label}:{' '}
              </span>
              <strong className="font-semibold uppercase text-[#141512]">
                {selectedOption ? selectedOption.label : value}
              </strong>
            </>
          ) : (
            <strong className="font-semibold uppercase text-[#141512]">
              {selectedOption ? selectedOption.label : value}
            </strong>
          )}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 shrink-0 text-[#141512]/75 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={label || 'Selecionar filtro'}
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } top-full mt-1.5 min-w-[210px] w-full sm:w-max sm:max-w-[280px] rounded-xl bg-[#FFFFFF] border-2 border-[#141512] shadow-[0_10px_24px_rgba(20,21,18,0.18)] py-1.5 z-40 max-h-64 overflow-y-auto`}
        >
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5E6DF] font-bold text-[#141512]'
                    : 'text-[#141512]/85 hover:bg-[#F4F2E9]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <span className="text-xs font-bold text-[#141512] shrink-0">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

