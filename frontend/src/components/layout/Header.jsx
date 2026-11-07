import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { resolveAssetUrl } from '../../utils/assets';
import {
  getProductId,
  getCreatorName,
  getCreatorSlug,
  getCreatorHref,
} from '../../utils/slug';

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close search modals on route change
  useEffect(() => {
    setIsSearchModalOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  // Auto-focus mobile search input when modal opens
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Close search modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchModalOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = internalQuery.trim();
    if (onSearchChange) {
      onSearchChange(trimmed);
    }
    setIsSearchModalOpen(false);
    setIsMobileSearchOpen(false);
    if (trimmed) {
      navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/busca');
    }
  };

  const handleClearSearch = (focusMobile = false) => {
    setInternalQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
    if (focusMobile && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    } else if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Combine catalog items for live search suggestions
  const allCatalogItems = [
    ...vinylRecords.map((item) => ({ ...item, _isVinyl: true })),
    ...sceneObjects.map((item) => ({ ...item, _isVinyl: false })),
  ];

  // Build unique artists / stores from the catalog
  const allCreators = Array.from(
    allCatalogItems
      .reduce((map, item) => {
        const name = getCreatorName(item);
        const slug = getCreatorSlug(item);
        const href = getCreatorHref(item);
        const isArtist = href.startsWith('/artista/');
        if (!map.has(slug)) {
          map.set(slug, {
            slug,
            name,
            href,
            isArtist,
            image: resolveAssetUrl(item.image),
            count: 1,
          });
        } else {
          const existing = map.get(slug);
          existing.count += 1;
          if (!existing.image && item.image) {
            existing.image = resolveAssetUrl(item.image);
          }
        }
        return map;
      }, new Map())
      .values()
  );

  const trimmedQuery = normalizeText(internalQuery);

  const suggestedCreators = trimmedQuery
    ? allCreators
        .filter((creator) => normalizeText(creator.name).includes(trimmedQuery))
        .slice(0, 4)
    : [];

  const suggestedProducts = trimmedQuery
    ? allCatalogItems
        .filter((item) => {
          const inName = normalizeText(item.name).includes(trimmedQuery);
          const inArtist = normalizeText(item.artist).includes(trimmedQuery);
          const inCreator = normalizeText(getCreatorName(item)).includes(trimmedQuery);
          const inCategory = normalizeText(item.category).includes(trimmedQuery);
          const inTracks =
            Array.isArray(item.tracklist) &&
            item.tracklist.some((t) =>
              normalizeText(t.title).includes(trimmedQuery)
            );
          return Boolean(inName || inArtist || inCreator || inCategory || inTracks);
        })
        .slice(0, 5)
    : allCatalogItems.slice(0, 5);

  const hasAnySuggestion =
    suggestedCreators.length > 0 || suggestedProducts.length > 0;

  const navLinkClass =
    "font-['Inter'] text-sm font-semibold text-[#141512]/80 hover:text-[#141512] hover:underline underline-offset-4 transition-colors cursor-pointer";

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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-3 lg:py-0 lg:h-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-2.5 gap-x-4 lg:gap-6">
          {/* Brand Wordmark & Desktop Nav Links */}
          <div className="order-1 flex items-center gap-8 md:mr-auto">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-['Anton'] text-3xl sm:text-5xl tracking-wider text-[#141512] uppercase leading-none hover:text-black transition-colors"
            >
              ZUNO
            </Link>

            {/* Desktop Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Navegação principal"
            >
              <Link to="/busca?type=vinyl" className={navLinkClass}>
                Discos
              </Link>
              <Link to="/busca?tab=new" className={navLinkClass}>
                Novidades
              </Link>
              <Link to="/busca?type=object" className={navLinkClass}>
                Objetos
              </Link>
              <Link to="/newsletter" className={navLinkClass}>
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Tablet & Desktop Search Input + Suggestions Modal */}
          <div
            ref={searchContainerRef}
            className="hidden md:block md:order-2 relative md:w-auto"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <label htmlFor="search-input" className="sr-only">
                Buscar discos, artistas ou objetos
              </label>
              <input
                ref={searchInputRef}
                id="search-input"
                type="text"
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
                className="md:w-80 lg:w-[440px] xl:w-[580px] bg-[#FFFFFF] border-2 border-[#141512] rounded-md pl-3.5 pr-10 py-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#141512] placeholder-[#141512]/45 focus:bg-[#FFFFFF] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 !outline-none"
              />

                {/* Custom Larger Black Clear (X) Button */}
                {internalQuery && (
                  <button
                    type="button"
                    onClick={() => handleClearSearch(false)}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#141512] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#141512"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
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

                  {hasAnySuggestion ? (
                    <ul className="divide-y divide-[#141512]/10 max-h-80 overflow-y-auto">
                      {/* Matching Artists / Stores */}
                      {suggestedCreators.map((creator) => (
                        <li key={`creator-${creator.slug}`}>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSearchModalOpen(false);
                              navigate(creator.href);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#F4F2E9] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-full bg-[#141512] border border-[#141512] overflow-hidden shrink-0 flex items-center justify-center">
                                {creator.image ? (
                                  <img
                                    src={creator.image}
                                    alt={creator.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="font-['Anton'] text-xs text-[#C5F43B] uppercase">
                                    {creator.name.charAt(0)}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="font-['Inter'] text-sm font-semibold text-[#141512] truncate">
                                  {creator.name}
                                </p>
                                <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#141512]/60 truncate">
                                  {creator.count}{' '}
                                  {creator.count === 1
                                    ? 'item no catálogo'
                                    : 'itens no catálogo'}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              <span className="inline-block font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#C5F43B] text-[#141512] border border-[#141512]">
                                {creator.isArtist ? 'Artista' : 'Loja'}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}

                      {/* Matching Products */}
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
                    <span className="truncate pr-2">
                      {trimmedQuery
                        ? `Ver todos os resultados para "${internalQuery.trim()}"`
                        : 'Ver todo o catálogo com filtros'}
                    </span>
                    <span className="text-[#C5F43B] shrink-0">ENTER ↵</span>
                  </button>
                </div>
              )}
          </div>

          {/* Mobile Search Lupa + Carrinho Buttons */}
          <div className="order-2 md:order-3 flex items-center gap-1.5 sm:gap-2">
            {/* Mobile Search Lupa Trigger (< md) */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Abrir pesquisa"
              aria-expanded={isMobileSearchOpen}
              className="md:hidden p-2 text-[#141512] hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onCartClick) onCartClick();
                navigate('/carrinho');
              }}
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

          {/* Mobile & Tablet Navigation Bar */}
          <nav
            className="order-4 w-full flex lg:hidden items-center justify-between sm:justify-start gap-4 sm:gap-8 pt-2 border-t border-[#141512]/15 overflow-x-auto"
            aria-label="Navegação mobile"
          >
            <Link to="/busca?type=vinyl" className={navLinkClass}>
              Discos
            </Link>
            <Link to="/busca?tab=new" className={navLinkClass}>
              Novidades
            </Link>
            <Link to="/busca?type=object" className={navLinkClass}>
              Objetos
            </Link>
            <Link to="/newsletter" className={navLinkClass}>
              Newsletter
            </Link>
          </nav>
        </div>

        {/* MOBILE SEARCH MODAL (< md) */}
        {isMobileSearchOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#141512]/55 backdrop-blur-[1px] px-4 pt-4 pb-6"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Pesquisar no catálogo"
              className="w-full max-w-lg mx-auto bg-[#FFFFFF] border-2 border-[#141512] rounded-xl shadow-[0_16px_36px_rgba(20,21,18,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar with Input & Close Button */}
              <div className="p-3 bg-[#F4F2E9] border-b-2 border-[#141512] flex items-center gap-2">
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative flex-1 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-[#141512]/60 absolute left-3 pointer-events-none"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <label htmlFor="mobile-search-input" className="sr-only">
                    Buscar discos, artistas ou objetos
                  </label>
                  <input
                    ref={mobileSearchInputRef}
                    id="mobile-search-input"
                    type="text"
                    autoComplete="off"
                    value={internalQuery}
                    onChange={(e) => {
                      setInternalQuery(e.target.value);
                      if (onSearchChange) onSearchChange(e.target.value);
                    }}
                    placeholder="BUSCAR DISCO, ARTISTA OU OBJETO..."
                    className="w-full h-11 bg-[#FFFFFF] border-2 border-[#141512] rounded-lg pl-9 pr-9 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#141512] placeholder-[#141512]/45 focus:outline-none"
                  />
                  {internalQuery && (
                    <button
                      type="button"
                      onClick={() => handleClearSearch(true)}
                      aria-label="Limpar busca"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#141512] hover:opacity-70 cursor-pointer flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#141512"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </form>

                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(false)}
                  aria-label="Fechar pesquisa"
                  className="h-11 px-3 rounded-lg border-2 border-[#141512] bg-[#FFFFFF] font-['IBM_Plex_Mono'] text-xs font-bold uppercase text-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors cursor-pointer shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Suggestions Header */}
              <div className="px-4 py-2 bg-[#F4F2E9]/60 border-b border-[#141512]/10 flex items-center justify-between">
                <span className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70 truncate">
                  {trimmedQuery
                    ? `Sugestões para "${internalQuery.trim()}"`
                    : 'Sugestões em catálogo'}
                </span>
              </div>

              {/* Suggestions List */}
              {hasAnySuggestion ? (
                <ul className="divide-y divide-[#141512]/10 overflow-y-auto flex-1">
                  {suggestedCreators.map((creator) => (
                    <li key={`mob-creator-${creator.slug}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileSearchOpen(false);
                          navigate(creator.href);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#F4F2E9] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-[#141512] border border-[#141512] overflow-hidden shrink-0 flex items-center justify-center">
                            {creator.image ? (
                              <img
                                src={creator.image}
                                alt={creator.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-['Anton'] text-xs text-[#C5F43B] uppercase">
                                {creator.name.charAt(0)}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-['Inter'] text-sm font-semibold text-[#141512] truncate">
                              {creator.name}
                            </p>
                            <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#141512]/60 truncate">
                              {creator.count}{' '}
                              {creator.count === 1
                                ? 'item no catálogo'
                                : 'itens no catálogo'}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 inline-block font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#C5F43B] text-[#141512] border border-[#141512]">
                          {creator.isArtist ? 'Artista' : 'Loja'}
                        </span>
                      </button>
                    </li>
                  ))}

                  {suggestedProducts.map((item) => {
                    const itemId = getProductId(item);
                    const thumbUrl = resolveAssetUrl(item.image);
                    return (
                      <li key={`mob-${item._isVinyl ? 'v' : 'o'}-${itemId}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobileSearchOpen(false);
                            navigate(`/produto/${itemId}`);
                          }}
                          className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#F4F2E9] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded bg-[#141512] border border-[#141512]/20 overflow-hidden shrink-0 flex items-center justify-center">
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

              {/* Footer Action */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full px-4 py-3 bg-[#141512] text-[#F4F2E9] hover:bg-[#232520] font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer shrink-0"
              >
                <span className="truncate pr-2">
                  {trimmedQuery
                    ? `Ver todos os resultados para "${internalQuery.trim()}"`
                    : 'Ver todo o catálogo com filtros'}
                </span>
                <span className="text-[#C5F43B] shrink-0">BUSCAR →</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
