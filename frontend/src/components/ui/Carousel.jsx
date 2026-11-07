import React, { useState } from 'react';

const ITEMS_PER_PAGE = 4;

export default function Carousel({
  items = [],
  renderItem,
  title,
  subtitle,
  rightAction,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Header with Title and Right Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          {subtitle && (
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
              {title}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512]/70">
            {String(currentPage + 1).padStart(2, '0')} /{' '}
            {String(totalPages).padStart(2, '0')}
          </span>
          {rightAction && <div>{rightAction}</div>}
        </div>
      </div>

      {/* 4-Item Grid/Slider with Side Arrow Buttons (matching ProductDetail slider style) */}
      <div className="relative">
        {totalPages > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Página anterior de discos"
            className="absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 lg:top-[calc((100%-118px)/2)] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFFFFF]/95 border border-[#141512]/25 text-[#141512] shadow-sm flex items-center justify-center hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {visibleItems.map((item, idx) => (
            <div key={item.id || item.name || idx} className="h-full">
              {renderItem ? renderItem(item) : null}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próxima página de discos"
            className="absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 lg:top-[calc((100%-118px)/2)] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFFFFF]/95 border border-[#141512]/25 text-[#141512] shadow-sm flex items-center justify-center hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
