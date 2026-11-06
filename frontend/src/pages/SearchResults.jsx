import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { getProductId } from '../utils/slug';

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'name-asc', label: 'Nome (A - Z)' },
  { id: 'name-desc', label: 'Nome (Z - A)' },
];

export default function SearchResults({
  vinylRecords = [],
  sceneObjects = [],
  onAddToCart,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').trim();

  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'vinyl' | 'object'
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');

  // Reset filters when search query changes
  useEffect(() => {
    setTypeFilter('all');
    setCategoryFilter('Todos');
    setSortBy('relevance');
  }, [query]);

  // Combine catalog items with type metadata
  const allProducts = [
    ...vinylRecords.map((item) => ({ ...item, _isVinyl: true })),
    ...sceneObjects.map((item) => ({ ...item, _isVinyl: false })),
  ];

  // Match items against query (name, artist, category, description, tracks)
  const matchesSearch = (item, q) => {
    if (!q) return true;
    const normalized = q.toLowerCase();
    const inName = item.name && item.name.toLowerCase().includes(normalized);
    const inArtist = item.artist && item.artist.toLowerCase().includes(normalized);
    const inCategory =
      item.category && item.category.toLowerCase().includes(normalized);
    const inDesc =
      item.description && item.description.toLowerCase().includes(normalized);
    const inTracks =
      Array.isArray(item.tracklist) &&
      item.tracklist.some(
        (t) => t.title && t.title.toLowerCase().includes(normalized)
      );
    return Boolean(inName || inArtist || inCategory || inDesc || inTracks);
  };

  const queryMatchedItems = allProducts.filter((item) =>
    matchesSearch(item, query)
  );

  // Filter by product type (All / Discos / Objetos)
  const typeFilteredItems = queryMatchedItems.filter((item) => {
    if (typeFilter === 'vinyl') return item._isVinyl;
    if (typeFilter === 'object') return !item._isVinyl;
    return true;
  });

  // Available categories/genres in the current matched set
  const availableCategories = [
    'Todos',
    ...Array.from(
      new Set(typeFilteredItems.map((item) => item.category).filter(Boolean))
    ),
  ];

  // Filter by category/genre
  const finalFilteredItems = typeFilteredItems.filter((item) => {
    if (categoryFilter === 'Todos') return true;
    return (
      item.category &&
      item.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  });

  // Sort results
  const sortedResults = [...finalFilteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'pt-BR');
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'pt-BR');
    return 0;
  });

  const hasActiveFilters =
    typeFilter !== 'all' || categoryFilter !== 'Todos' || sortBy !== 'relevance';

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          RESULTADOS DE BUSCA NO CATÁLOGO
        </span>
        <h1 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
          {query ? `BUSCA POR "${query}"` : 'TODOS OS ITENS DO CATÁLOGO'}
        </h1>
        <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/75 mt-3">
          {sortedResults.length === 1
            ? '1 item encontrado correspondente à sua pesquisa.'
            : `${sortedResults.length} itens encontrados correspondentes à sua pesquisa.`}
        </p>
      </div>

      {/* Filter Bar with Dropdowns */}
      <div className="bg-white border-2 border-[#141512] rounded-lg p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Type Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
            <label
              htmlFor="search-type-filter"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Tipo:
            </label>
            <select
              id="search-type-filter"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCategoryFilter('Todos');
              }}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              <option value="all">Todos ({queryMatchedItems.length})</option>
              <option value="vinyl">
                Discos ({queryMatchedItems.filter((i) => i._isVinyl).length})
              </option>
              <option value="object">
                Objetos ({queryMatchedItems.filter((i) => !i._isVinyl).length})
              </option>
            </select>
          </div>

          {/* Genre / Category Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
            <label
              htmlFor="search-category-filter"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Gênero / Categoria:
            </label>
            <select
              id="search-category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todos' ? 'Todas as categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setTypeFilter('all');
                setCategoryFilter('Todos');
                setSortBy('relevance');
              }}
              className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 hover:text-black cursor-pointer ml-1"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Sort & Counter */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#141512]/10">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
            {String(sortedResults.length).padStart(2, '0')}{' '}
            {sortedResults.length === 1 ? 'ITEM' : 'ITENS'}
          </span>

          <div className="flex items-center gap-1.5">
            <label
              htmlFor="search-sort-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Ordenar:
            </label>
            <select
              id="search-sort-select"
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

      {/* Results Grid */}
      {sortedResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {sortedResults.map((product) => (
            <ProductCard
              key={`${product._isVinyl ? 'vinyl' : 'obj'}-${getProductId(product)}`}
              product={product}
              isVinyl={product._isVinyl}
              onAction={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border-2 border-dashed border-[#141512] rounded-lg p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512] mb-2">
            Nenhum item encontrado para &ldquo;{query}&rdquo;.
          </p>
          <p className="font-['Inter'] text-sm text-[#141512]/70 mb-6">
            Tente buscar por outro álbum, artista, gênero musical ou objeto.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {query && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSearchParams({})}
              >
                Ver todo o catálogo
              </Button>
            )}
            <Link
              to="/discos"
              className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-wider text-xs font-semibold px-4 py-2 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:bg-[#b8e62e] transition-colors"
            >
              Explorar discos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

