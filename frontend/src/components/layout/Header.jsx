import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header({ cartCount = 0, onCartClick, searchQuery = '', onSearchChange }) {
  const [internalQuery, setInternalQuery] = useState(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(internalQuery);
    }
    navigate(`/discos?q=${encodeURIComponent(internalQuery.trim())}`);
  };

  const isNewActive = location.pathname === '/discos' && location.search.includes('tab=new');
  const isDiscosActive = location.pathname === '/discos' && !location.search.includes('tab=new');
  const isObjetosActive = location.pathname === '/objetos';
  const isNewsletterActive = location.pathname === '/newsletter';

  const getLinkClasses = (isActive) =>
    `font-['Inter'] text-sm font-semibold transition-colors cursor-pointer ${
      isActive
        ? 'text-[#141512] underline underline-offset-4 decoration-2 decoration-[#141512]'
        : 'text-[#141512]/80 hover:text-[#141512] hover:underline underline-offset-4'
    }`;

  return (
    <>
      {/* 1. TOP ACID-GREEN BAR */}
      <section
        className="bg-[#C5F43B] py-2 px-4 text-center select-none"
        aria-label="Aviso de frete"
      >
        <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
          FRETE GRÁTIS A PARTIR DE R$ 299,00 · DISCOS SELECIONADOS, CLÁSSICOS E NOVIDADES
        </p>
      </section>

      {/* 2. HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#F4F2E9] border-b-2 border-[#141512]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between gap-6">
          {/* Brand Wordmark & Nav Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-['Anton'] text-4xl sm:text-5xl tracking-wider text-[#141512] uppercase leading-none hover:text-black transition-colors"
            >
              ZUNO
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
              <Link to="/discos" className={getLinkClasses(isDiscosActive)}>
                Discos
              </Link>
              <Link to="/discos?tab=new" className={getLinkClasses(isNewActive)}>
                Novidades
              </Link>
              <Link to="/objetos" className={getLinkClasses(isObjetosActive)}>
                Objetos
              </Link>
              <Link to="/newsletter" className={getLinkClasses(isNewsletterActive)}>
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Search & Cart Controls */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <label htmlFor="search-input" className="sr-only">
                Buscar discos ou artistas
              </label>
              <input
                id="search-input"
                type="search"
                value={internalQuery}
                onChange={(e) => {
                  setInternalQuery(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="BUSCAR DISCO..."
                className="w-72 sm:w-80 md:w-[420px] lg:w-[520px] xl:w-[600px] bg-transparent border-2 border-[#141512] px-3 py-1.5 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 !outline-none focus:!outline-none focus-visible:!outline-none"
              />
            </form>

            {/* Carrinho Button */}
            <button
              type="button"
              onClick={onCartClick}
              aria-label={`Carrinho de compras com ${cartCount} itens`}
              className="relative p-2 text-[#141512] hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#141512] text-[#F4F2E9] text-[10px] font-['IBM_Plex_Mono'] font-bold rounded-full flex items-center justify-center border border-[#F4F2E9]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
