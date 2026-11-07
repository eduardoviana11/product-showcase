import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { getProductId } from '../utils/slug';

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

  const urlQueryParam = searchParams.get('q') || '';

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
      _creator: item.artist || item.store || 'Estúdio ZUNO',
    })),
    ...sceneObjects.map((item) => ({
      ...item,
      _isVinyl: false,
      _creator: item.store || item.artist || 'Loja ZUNO',
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

  const handleResetAllFilters = () => {
    setTypeFilter('all');
    setSectionFilter('all');
    setActiveCategory('Todos');
    setActiveCreator('Todos');
    setSearchQuery('');
    setSortBy('relevance');
    setVisibleCount(PAGE_SIZE);
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
      <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-3.5 sm:p-4 mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* 1. Search / Filter by term with custom black X button */}
          <div className="relative flex items-center w-full sm:w-auto">
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
              className="w-full sm:w-56 bg-[#F4F2E9] border border-[#141512]/30 rounded-md pl-3 pr-8 py-2 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:border-[#141512] focus:outline-none"
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

          {/* 2. Product Type Dropdown (Todos / Discos / Objetos) */}
          <div className="flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto">
            <label
              htmlFor="type-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70 shrink-0"
            >
              Tipo:
            </label>
            <select
              id="type-select"
              value={typeFilter}
              onChange={(e) => {
                const nextType = e.target.value;
                setTypeFilter(nextType);
                setActiveCategory('Todos');
                setActiveCreator('Todos');
                setVisibleCount(PAGE_SIZE);
                updateUrlParams({
                  type: nextType,
                  category: 'Todos',
                  artist: 'Todos',
                });
              }}
              className="flex-1 sm:flex-initial bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              <option value="all">Todos os produtos</option>
              <option value="vinyl">Discos de Vinil</option>
              <option value="object">Objetos da Cena</option>
            </select>
          </div>

          {/* 3. Section / Highlight Dropdown (Todo o acervo / Novidades / Em destaque) */}
          <div className="flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto">
            <label
              htmlFor="section-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70 shrink-0"
            >
              Seção:
            </label>
            <select
              id="section-select"
              value={sectionFilter}
              onChange={(e) => {
                const nextSec = e.target.value;
                setSectionFilter(nextSec);
                setVisibleCount(PAGE_SIZE);
                updateUrlParams({
                  tab: nextSec === 'all' ? '' : nextSec,
                  type: typeFilter,
                });
              }}
              className="flex-1 sm:flex-initial bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              <option value="all">Todo o acervo</option>
              <option value="new">Novidades</option>
              <option value="featured">Em destaque</option>
            </select>
          </div>

          {/* 4. Generalized Category / Genre Dropdown */}
          <div className="flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto">
            <label
              htmlFor="category-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70 shrink-0"
            >
              Categoria:
            </label>
            <select
              id="category-select"
              value={activeCategory}
              onChange={(e) => {
                const cat = e.target.value;
                setActiveCategory(cat);
                setVisibleCount(PAGE_SIZE);
                updateUrlParams({ category: cat, type: typeFilter });
              }}
              className="flex-1 sm:flex-initial bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todos' ? 'Todas as categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Generalized Artist / Store Dropdown */}
          <div className="flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto">
            <label
              htmlFor="creator-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70 shrink-0"
            >
              Artista / Loja:
            </label>
            <select
              id="creator-select"
              value={activeCreator}
              onChange={(e) => {
                const creator = e.target.value;
                setActiveCreator(creator);
                setVisibleCount(PAGE_SIZE);
                updateUrlParams({ artist: creator, type: typeFilter });
              }}
              className="flex-1 sm:flex-initial bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer sm:max-w-[200px] truncate focus:outline-none focus:border-[#141512]"
            >
              {creators.map((creator) => (
                <option key={creator} value={creator}>
                  {creator === 'Todos' ? 'Todos' : creator}
                </option>
              ))}
            </select>
          </div>

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

          <div className="flex items-center gap-1.5">
            <label
              htmlFor="sort-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Ordenar:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
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
