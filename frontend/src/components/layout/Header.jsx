import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { resolveAssetUrl } from '../../utils/assets';
import { getProductId } from '../../utils/slug';

export default function Header({
  cartCount = 0,
  onCartClick,
  searchQuery = '',
  onSearchChange,
  vinylRecords = [],
  sceneObjects = [],
}) {
  const [internalQuery, setInternalQuery] = useState(searchQuery);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close search modal on route change
  useEffect(() => {
    setIsSearchModalOpen(false);
  }, [location.pathname, location.search]);

  // Close search modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = internalQuery.trim();
    if (onSearchChange) {
      onSearchChange(trimmed);
    }
    setIsSearchModalOpen(false);
    navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
  };

  // Combine catalog items for live search suggestions
  const allCatalogItems = [
    ...vinylRecords.map((item) => ({ ...item, _isVinyl: true })),
    ...sceneObjects.map((item) => ({ ...item, _isVinyl: false })),
  ];

  const trimmedQuery = internalQuery.trim().toLowerCase();

  const suggestedProducts = trimmedQuery
    ? allCatalogItems
        .filter((item) => {
          const inName =
            item.name && item.name.toLowerCase().includes(trimmedQuery);
          const inArtist =
            item.artist && item.artist.toLowerCase().includes(trimmedQuery);
          const inCategory =
            item.category && item.category.toLowerCase().includes(trimmedQuery);
          const inTracks =
            Array.isArray(item.tracklist) &&
            item.tracklist.some(
              (t) => t.title && t.title.toLowerCase().includes(trimmedQuery)
            );
          return Boolean(inName || inArtist || inCategory || inTracks);
        })
        .slice(0, 6)
    : allCatalogItems.slice(0, 5);

  const isNewActive =
    location.pathname === '/discos' && location.search.includes('tab=new');
  const isDiscosActive =
    location.pathname === '/discos' && !location.search.includes('tab=new');
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
          FRETE GRÁTIS A PARTIR DE R$ 299,00 - DISCOS SELECIONADOS, CLÁSSICOS E NOVIDADES
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
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Navegação principal"
            >
              <Link to="/discos" className={getLinkClasses(isDiscosActive)}>
                Discos
              </Link>
              <Link to="/discos?tab=new" className={getLinkClasses(isNewActive)}>
                Novidades
              </Link>
              <Link to="/objetos" className={getLinkClasses(isObjetosActive)}>
                Objetos
              </Link>
              <Link
                to="/newsletter"
                className={getLinkClasses(isNewsletterActive)}
              >
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Search & Cart Controls */}
          <div className="flex items-center gap-4">
            {/* Search Input + Suggestions Modal */}
            <div ref={searchContainerRef} className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <label htmlFor="search-input" className="sr-only">
                  Buscar discos, artistas ou objetos
                </label>
                <input
                  id="search-input"
                  type="search"
                  autoComplete="off"
                  value={internalQuery}
                  onFocus={() => setIsSearchModalOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchModalOpen(false);
                    }
                  }}
                  onChange={(e) => {
                    setInternalQuery(e.target.value);
                    setIsSearchModalOpen(true);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  placeholder="BUSCAR DISCO, ARTISTA OU OBJETO..."
                  className="w-72 sm:w-80 md:w-[420px] lg:w-[520px] xl:w-[600px] bg-[#FFFFFF] border-2 border-[#141512] rounded-md px-3.5 py-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#141512] placeholder-[#141512]/45 focus:bg-[#FFFFFF] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 !outline-none"
                />
              </form>

              {/* Search Suggestions Modal */}
              {isSearchModalOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-[#FFFFFF] border-2 border-[#141512] rounded-lg shadow-[0_12px_28px_rgba(20,21,18,0.18)] overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#F4F2E9]/70 border-b border-[#141512]/10 flex items-center justify-between">
                    <span className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70">
                      {trimmedQuery
                        ? `Sugestões para "${internalQuery.trim()}"`
                        : 'Sugestões em catálogo'}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#141512]/50 uppercase">
                      Enter para buscar tudo
                    </span>
                  </div>

                  {suggestedProducts.length > 0 ? (
                    <ul className="divide-y divide-[#141512]/10 max-h-80 overflow-y-auto">
                      {suggestedProducts.map((item) => {
                        const itemId = getProductId(item);
                        const thumbUrl = resolveAssetUrl(item.image);
                        return (
                          <li key={`${item._isVinyl ? 'v' : 'o'}-${itemId}`}>
                            <button
                              type="button"
                              onClick={() => {
                                setIsSearchModalOpen(false);
                                navigate(`/produto/${itemId}`);
                              }}
                              className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#F4F2E9] transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 rounded bg-[#141512] border border-[#141512]/20 overflow-hidden shrink-0 flex items-center justify-center">
                                  {thumbUrl ? (
                                    <img
                                      src={thumbUrl}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-['Anton'] text-[10px] text-[#C5F43B] uppercase">
                                      ZUNO
                                    </span>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="font-['Inter'] text-sm font-semibold text-[#141512] truncate">
                                    {item.name}
                                  </p>
                                  <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#141512]/60 truncate">
                                    {item.artist || item.category || 'ZUNO'}
                                    {item.category && item.artist
                                      ? ` - ${item.category}`
                                      : ''}
                                  </p>
                                </div>
                              </div>

                              <div className="shrink-0 text-right">
                                <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#141512] block">
                                  {item.formatted_price}
                                </span>
                                <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase text-[#141512]/50">
                                  {item._isVinyl ? 'Disco' : 'Objeto'}
                                </span>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/70 uppercase">
                        Nenhuma sugestão direta para &ldquo;{internalQuery.trim()}&rdquo;.
                      </p>
                    </div>
                  )}

                  {/* Footer action to open full search results page */}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full px-4 py-2.5 bg-[#141512] text-[#F4F2E9] hover:bg-[#232520] font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>
                      {trimmedQuery
                        ? `Ver todos os resultados para "${internalQuery.trim()}"`
                        : 'Ir para a página de busca completa'}
                    </span>
                    <span className="text-[#C5F43B]">ENTER ↵</span>
                  </button>
                </div>
              )}
            </div>

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
