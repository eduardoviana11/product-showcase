import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import FilterDropdown from '../components/ui/FilterDropdown';
import { getProductId, getCreatorName } from '../utils/slug';

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'name', label: 'Nome (A - Z)' },
  { id: 'name-desc', label: 'Nome (Z - A)' },
];

const PAGE_SIZE = 12;

export default function Discos({
  vinylRecords = [],
  sceneObjects = [],
  onAddToCart,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Derive initial filter state from route path + query parameters
  const getInitialTypeFromUrl = () => {
    const paramType = searchParams.get('type');
    if (paramType === 'all' || paramType === 'vinyl' || paramType === 'object') {
      return paramType;
    }
    if (location.pathname === '/objetos') return 'object';
    if (location.pathname === '/busca') return 'all';
    if (searchParams.get('tab') === 'new') return 'all';
    return 'vinyl';
  };

  const getInitialSectionFromUrl = () => {
    const tab = searchParams.get('tab');
    if (tab === 'new' || tab === 'featured' || tab === 'all') return tab;
    if (searchParams.get('filter') === 'em-destaque') return 'featured';
    return 'all';
  };

  const [typeFilter, setTypeFilter] = useState(getInitialTypeFromUrl);
  const [sectionFilter, setSectionFilter] = useState(getInitialSectionFromUrl);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'Todos'
  );
  const [activeCreator, setActiveCreator] = useState(
    searchParams.get('artist') || 'Todos'
  );
  const [sortBy, setSortBy] = useState('relevance');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const mobileFiltersRef = useRef(null);

  const urlQueryParam = searchParams.get('q') || '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target)
      ) {
        setIsMobileFiltersOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileFiltersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync filters when URL route/params change from navigation
  useEffect(() => {
    setTypeFilter(getInitialTypeFromUrl());
    setSectionFilter(getInitialSectionFromUrl());
    setActiveCategory(searchParams.get('category') || 'Todos');
    setActiveCreator(searchParams.get('artist') || 'Todos');
    setVisibleCount(PAGE_SIZE);
  }, [location.pathname, searchParams]);

  // Only update local filter input when the URL ?q= parameter itself changes (e.g. submitted from navbar search)
  useEffect(() => {
    setSearchQuery(urlQueryParam);
  }, [urlQueryParam]);

  // Unified product pool with normalized metadata
  const allProducts = [
    ...vinylRecords.map((item) => ({
      ...item,
      _isVinyl: true,
      _creator: getCreatorName(item),
    })),
    ...sceneObjects.map((item) => ({
      ...item,
      _isVinyl: false,
      _creator: getCreatorName(item),
    })),
  ];

  // 1. Filter by Type (All / Vinyl / Object)
  const typeMatched = allProducts.filter((item) => {
    if (typeFilter === 'vinyl') return item._isVinyl;
    if (typeFilter === 'object') return !item._isVinyl;
    return true;
  });

  // 2. Filter by Section (All / Novidades / Em destaque)
  const sectionMatched = typeMatched.filter((item) => {
    if (sectionFilter === 'new') return Boolean(item.is_new);
    if (sectionFilter === 'featured') return Boolean(item.featured);
    return true;
  });

  // Dynamic options for Category/Genre and Artist/Store dropdowns based on current pool
  const categories = [
    'Todos',
    ...Array.from(
      new Set(sectionMatched.map((item) => item.category).filter(Boolean))
    ),
  ];

  const creators = [
    'Todos',
    ...Array.from(
      new Set(sectionMatched.map((item) => item._creator).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b, 'pt-BR')),
  ];

  // 3. Filter by Category, Creator (Artist/Store), and Search Query
  const filteredProducts = sectionMatched.filter((item) => {
    const matchesCategory =
      activeCategory === 'Todos' ||
      (item.category &&
        item.category.toLowerCase() === activeCategory.toLowerCase());

    const matchesCreator =
      activeCreator === 'Todos' ||
      (item._creator &&
        item._creator.toLowerCase() === activeCreator.toLowerCase());

    const q = normalizeText(searchQuery);
    const matchesSearch =
      !q ||
      normalizeText(item.name).includes(q) ||
      normalizeText(item.artist).includes(q) ||
      normalizeText(item._creator).includes(q) ||
      normalizeText(item.category).includes(q) ||
      normalizeText(item.description).includes(q) ||
      (Array.isArray(item.tracklist) &&
        item.tracklist.some((t) => normalizeText(t.title).includes(q)));

    return matchesCategory && matchesCreator && matchesSearch;
  });

  // 4. Sort results
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'pt-BR');
    return 0;
  });

  // Helper to update URL query params cleanly on the unified /busca route
  const updateUrlParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        value === 'Todos' ||
        value === 'all'
      ) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    const queryString = nextParams.toString();
    if (location.pathname !== '/busca') {
      navigate(queryString ? `/busca?${queryString}` : '/busca', { replace: true });
      return;
    }
    setSearchParams(nextParams, { replace: true });
  };

  const hasActiveFilters =
    typeFilter !== 'all' ||
    sectionFilter !== 'all' ||
    activeCategory !== 'Todos' ||
    activeCreator !== 'Todos' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'relevance';

  const activeFilterCount = [
    typeFilter !== 'all',
    sectionFilter !== 'all',
    activeCategory !== 'Todos',
    activeCreator !== 'Todos',
  ].filter(Boolean).length;

  const typeOptions = [
    { value: 'all', label: 'Todos os produtos' },
    { value: 'vinyl', label: 'Discos de Vinil' },
    { value: 'object', label: 'Objetos da Cena' },
  ];

  const sectionOptions = [
    { value: 'all', label: 'Todo o acervo' },
    { value: 'new', label: 'Novidades' },
    { value: 'featured', label: 'Em destaque' },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat === 'Todos' ? 'Todas as categorias' : cat,
  }));

  const creatorOptions = creators.map((creator) => ({
    value: creator,
    label: creator === 'Todos' ? 'Todos' : creator,
  }));

  const sortOptions = SORT_OPTIONS.map((option) => ({
    value: option.id,
    label: option.label,
  }));

  const handleTypeChange = (nextType) => {
    setTypeFilter(nextType);
    setActiveCategory('Todos');
    setActiveCreator('Todos');
    setVisibleCount(PAGE_SIZE);
    updateUrlParams({
      type: nextType,
      category: 'Todos',
      artist: 'Todos',
    });
  };

  const handleSectionChange = (nextSec) => {
    setSectionFilter(nextSec);
    setVisibleCount(PAGE_SIZE);
    updateUrlParams({
      tab: nextSec === 'all' ? '' : nextSec,
      type: typeFilter,
    });
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    updateUrlParams({ category: cat, type: typeFilter });
  };

  const handleCreatorChange = (creator) => {
    setActiveCreator(creator);
    setVisibleCount(PAGE_SIZE);
    updateUrlParams({ artist: creator, type: typeFilter });
  };

  const handleResetAllFilters = () => {
    setTypeFilter('all');
    setSectionFilter('all');
    setActiveCategory('Todos');
    setActiveCreator('Todos');
    setSearchQuery('');
    setSortBy('relevance');
    setVisibleCount(PAGE_SIZE);
    setIsMobileFiltersOpen(false);
    navigate('/busca', { replace: true });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-[#141512]">
        <h1 className="font-['Anton'] text-4xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          CATÁLOGO
        </h1>
      </div>

      {/* Generalized Filter Bar covering all product types */}
      <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-3.5 sm:p-4 mb-8 flex flex-col gap-3">
        {/* MOBILE / SMARTPHONE FILTER BAR (< md) */}
        <div className="flex flex-col gap-2.5 md:hidden" ref={mobileFiltersRef}>
          {/* 1. Search / Filter by term */}
          <div className="relative flex items-center w-full">
            <label htmlFor="catalog-quick-filter-mobile" className="sr-only">
              Filtrar por nome, artista ou categoria
            </label>
            <input
              id="catalog-quick-filter-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                setVisibleCount(PAGE_SIZE);
                if (!val && searchParams.has('q')) {
                  updateUrlParams({ q: '' });
                }
              }}
              placeholder="Filtrar por termo..."
              className="w-full h-10 bg-[#F4F2E9] border border-[#141512]/30 rounded-lg pl-3 pr-8 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:border-[#141512] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setVisibleCount(PAGE_SIZE);
                  if (searchParams.has('q')) {
                    updateUrlParams({ q: '' });
                  }
                }}
                aria-label="Limpar termo de filtro"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#141512] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
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
          </div>

          {/* 2. Compact Dropdown Modal Triggers: [Filtros] & [Ordenar] */}
          <div className="relative grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
              aria-expanded={isMobileFiltersOpen}
              className={`h-10 px-3 rounded-lg border transition-colors flex items-center justify-between gap-2 cursor-pointer font-['IBM_Plex_Mono'] text-xs uppercase font-semibold text-[#141512] ${
                activeFilterCount > 0 || isMobileFiltersOpen
                  ? 'bg-[#C5F43B]/40 border-[#141512]'
                  : 'bg-[#F4F2E9] border-[#141512]/30 hover:border-[#141512]'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                <span>Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#141512] text-[#C5F43B] text-[10px] font-bold">
                    {activeFilterCount}
                  </span>
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
                  isMobileFiltersOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <FilterDropdown
              label="Ordenar"
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
              isActive={sortBy !== 'relevance'}
              align="right"
              fullWidth={true}
            />

            {/* Floating Filters Dropdown Modal for Smartphone */}
            {isMobileFiltersOpen && (
              <div
                role="dialog"
                aria-label="Opções de filtro"
                className="col-span-2 absolute left-0 right-0 top-full mt-2 rounded-xl bg-[#FFFFFF] border-2 border-[#141512] shadow-[0_14px_30px_rgba(20,21,18,0.22)] p-4 z-30 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#141512]/15">
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512]">
                    Filtrar catálogo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    aria-label="Fechar filtros"
                    className="p-1 text-[#141512]/70 hover:text-[#141512] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <FilterDropdown
                    label="Tipo"
                    value={typeFilter}
                    options={typeOptions}
                    onChange={handleTypeChange}
                    isActive={typeFilter !== 'all'}
                    fullWidth={true}
                  />
                  <FilterDropdown
                    label="Seção"
                    value={sectionFilter}
                    options={sectionOptions}
                    onChange={handleSectionChange}
                    isActive={sectionFilter !== 'all'}
                    fullWidth={true}
                  />
                  <FilterDropdown
                    label="Categoria"
                    value={activeCategory}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    isActive={activeCategory !== 'Todos'}
                    fullWidth={true}
                  />
                  <FilterDropdown
                    label="Artista / Loja"
                    value={activeCreator}
                    options={creatorOptions}
                    onChange={handleCreatorChange}
                    isActive={activeCreator !== 'Todos'}
                    fullWidth={true}
                  />
                </div>

                <div className="pt-2 border-t border-[#141512]/15 flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={handleResetAllFilters}
                    className="h-10 px-3 rounded-lg border border-[#141512]/30 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] hover:border-[#141512] cursor-pointer"
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 h-10 px-4 rounded-lg bg-[#C5F43B] border-2 border-[#141512] font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] cursor-pointer"
                  >
                    Ver {sortedProducts.length}{' '}
                    {sortedProducts.length === 1 ? 'item' : 'itens'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Mobile Status Bar (Count + Clear Link) */}
          <div className="flex items-center justify-between pt-2 border-t border-[#141512]/10">
            <span className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#141512]">
              {String(sortedProducts.length).padStart(2, '0')}{' '}
              {sortedProducts.length === 1 ? 'ITEM' : 'ITENS'}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* TABLET & DESKTOP FILTER BAR (>= md) */}
        <div className="hidden md:flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. Search / Filter by term */}
            <div className="relative flex items-center">
              <label htmlFor="catalog-quick-filter" className="sr-only">
                Filtrar por nome, artista ou categoria
              </label>
              <input
                id="catalog-quick-filter"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setVisibleCount(PAGE_SIZE);
                  if (!val && searchParams.has('q')) {
                    updateUrlParams({ q: '' });
                  }
                }}
                placeholder="Filtrar por termo..."
                className="w-56 h-10 bg-[#F4F2E9] border border-[#141512]/30 rounded-lg pl-3 pr-8 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:border-[#141512] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setVisibleCount(PAGE_SIZE);
                    if (searchParams.has('q')) {
                      updateUrlParams({ q: '' });
                    }
                  }}
                  aria-label="Limpar termo de filtro"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-[#141512] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
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
            </div>

            {/* 2. Custom Dropdown Modals for Type, Section, Category, and Artist/Store */}
            <FilterDropdown
              label="Tipo"
              value={typeFilter}
              options={typeOptions}
              onChange={handleTypeChange}
              isActive={typeFilter !== 'all'}
            />

            <FilterDropdown
              label="Seção"
              value={sectionFilter}
              options={sectionOptions}
              onChange={handleSectionChange}
              isActive={sectionFilter !== 'all'}
            />

            <FilterDropdown
              label="Categoria"
              value={activeCategory}
              options={categoryOptions}
              onChange={handleCategoryChange}
              isActive={activeCategory !== 'Todos'}
            />

            <FilterDropdown
              label="Artista / Loja"
              value={activeCreator}
              options={creatorOptions}
              onChange={handleCreatorChange}
              isActive={activeCreator !== 'Todos'}
            />

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 hover:text-black cursor-pointer ml-1"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* Sort & Counter */}
          <div className="flex items-center justify-between xl:justify-end gap-3 pt-3 xl:pt-0 border-t xl:border-t-0 border-[#141512]/10 shrink-0">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
              {String(sortedProducts.length).padStart(2, '0')}{' '}
              {sortedProducts.length === 1 ? 'ITEM' : 'ITENS'}
            </span>

            <FilterDropdown
              label="Ordenar"
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
              isActive={sortBy !== 'relevance'}
              align="right"
            />
          </div>
        </div>
      </div>

      {/* Unified Product Grid */}
      {sortedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3.5 sm:gap-x-6 gap-y-6 sm:gap-y-10">
            {sortedProducts.slice(0, visibleCount).map((product) => (
              <ProductCard
                key={`${product._isVinyl ? 'v' : 'o'}-${getProductId(product)}`}
                product={product}
                isVinyl={product._isVinyl}
                onAction={onAddToCart}
              />
            ))}
          </div>

          {visibleCount < sortedProducts.length && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Ver mais itens
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-16 text-center bg-white border-2 border-dashed border-[#141512] rounded-lg p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]">
            Nenhum produto encontrado com estes filtros.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={handleResetAllFilters}
          >
            Ver todo o catálogo
          </Button>
        </div>
      )}
    </div>
  );
}
