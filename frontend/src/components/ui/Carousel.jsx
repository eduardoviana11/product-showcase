import React, { useState } from 'react';
import Button from './Button';

const ITEMS_PER_PAGE = 4;

export default function Carousel({ items = [], renderItem, title, subtitle, rightAction }) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="w-full">
      {/* Header with Title and Circular Controls */}
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

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-4">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512]/70">
            {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="circular"
              onClick={handlePrev}
              disabled={currentPage === 0}
              ariaLabel="Página anterior de discos"
            >
              ←
            </Button>
            <Button
              variant="circular"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              ariaLabel="Próxima página de discos"
            >
              →
            </Button>
          </div>

          {rightAction && <div className="ml-2">{rightAction}</div>}
        </div>
      </div>

      {/* 4-Item Grid/Slider for current page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleItems.map((item, idx) => (
          <div key={item.id || item.name || idx} className="h-full">
            {renderItem ? renderItem(item) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
