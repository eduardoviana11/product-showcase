import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

const STORE_TABS = [
  {
    id: 'all',
    label: 'Todos os discos',
    blurb: 'Todo nosso acervo em um só lugar',
  },
  {
    id: 'featured',
    label: 'Em destaque',
    blurb: 'Discos que não podem faltar na estante',
  },
  {
    id: 'new',
    label: 'Novidades',
    blurb: 'Acabaram de sair do forno',
  },
];

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'name', label: 'Nome (A - Z)' },
  { id: 'name-desc', label: 'Nome (Z - A)' },
];

const PAGE_SIZE = 8;

export default function Discos({ vinylRecords = [], onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab =
    searchParams.get('tab') ||
    (searchParams.get('filter') === 'em-destaque' ? 'featured' : 'all');
  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'Todos';
  const urlArtist = searchParams.get('artist') || 'Todos';

  const [storeTab, setStoreTab] = useState(urlTab);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [activeArtist, setActiveArtist] = useState(urlArtist);
  const [sortBy, setSortBy] = useState('relevance');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setStoreTab(searchParams.get('tab'));
    } else if (searchParams.get('filter') === 'em-destaque') {
      setStoreTab('featured');
    } else {
      setStoreTab('all');
    }
    setActiveCategory(searchParams.get('category') || 'Todos');
    setActiveArtist(searchParams.get('artist') || 'Todos');
    if (searchParams.get('q') !== null) {
      setSearchQuery(searchParams.get('q'));
    }
  }, [searchParams]);

  const isInTab = (record, tabId) =>
    tabId === 'all' ||
    (tabId === 'featured' && record.featured) ||
    (tabId === 'new' && record.is_new);

  const tabCounts = Object.fromEntries(
    STORE_TABS.map((tab) => [
      tab.id,
      vinylRecords.filter((record) => isInTab(record, tab.id)).length,
    ])
  );

  const activeTab =
    STORE_TABS.find((tab) => tab.id === storeTab) || STORE_TABS[0];
  const tabRecords = vinylRecords.filter((record) => isInTab(record, storeTab));

  const categories = [
    'Todos',
    ...Array.from(new Set(tabRecords.map((r) => r.category).filter(Boolean))),
  ];

  const artists = [
    'Todos',
    ...Array.from(new Set(tabRecords.map((r) => r.artist).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b, 'pt-BR')
    ),
  ];

  const filteredRecords = tabRecords.filter((record) => {
    const matchesCategory =
      activeCategory === 'Todos' ||
      (record.category &&
        record.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesArtist =
      activeArtist === 'Todos' ||
      (record.artist &&
        record.artist.toLowerCase() === activeArtist.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === '' ||
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.artist &&
        record.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.category &&
        record.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesArtist && matchesSearch;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'pt-BR');
    return 0;
  });

  const selectStoreTab = (tabId) => {
    setStoreTab(tabId);
    setActiveCategory('Todos');
    setActiveArtist('Todos');
    setVisibleCount(PAGE_SIZE);
    setSearchParams((prev) => {
      prev.set('tab', tabId);
      prev.delete('category');
      prev.delete('artist');
      return prev;
    });
  };

  const hasActiveFilters =
    activeCategory !== 'Todos' ||
    activeArtist !== 'Todos' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'relevance';

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Page Title */}
      <div className="mb-10 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          ACERVO COMPLETO - EDIÇÕES FÍSICAS EM VINIL
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          {storeTab === 'new' ? 'NOVIDADES EM VINIL' : 'DISCOS EM CATÁLOGO'}
        </h1>
        <p className="font-['Inter'] text-base text-[#141512]/75 mt-3 max-w-2xl">
          Navegue por clássicos atemporais, prensagens comemorativas e novidades da cena independente e internacional.
        </p>
      </div>

      {/* Store tabs */}
      <div
        className="flex flex-wrap gap-x-8 gap-y-2 border-b-2 border-[#141512]"
        role="tablist"
        aria-label="Seções de discos"
      >
        {STORE_TABS.map((tab) => {
          const isActive = storeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectStoreTab(tab.id)}
              className={`font-['Inter'] text-sm sm:text-base font-semibold pb-3 -mb-[2px] border-b-4 transition-colors cursor-pointer ${
                isActive
                  ? 'border-[#141512] text-[#141512]'
                  : 'border-transparent text-[#141512]/55 hover:text-[#141512]'
              }`}
            >
              {tab.label}
              <span className="font-['IBM_Plex_Mono'] text-[11px] ml-2 align-middle">
                {String(tabCounts[tab.id] || 0).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      <p className="font-['Inter'] text-sm text-[#141512]/75 mt-4 mb-6">
        {activeTab.blurb}
      </p>

      {/* Dropdown Filter Bar */}
      <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick filter input */}
          <div className="flex items-center">
            <label htmlFor="discos-quick-filter" className="sr-only">
              Filtrar por álbum ou artista
            </label>
            <input
              id="discos-quick-filter"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Filtrar por nome..."
              className="w-48 sm:w-56 bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:border-[#141512] focus:outline-none"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="genre-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Gênero:
            </label>
            <select
              id="genre-select"
              value={activeCategory}
              onChange={(e) => {
                const cat = e.target.value;
                setActiveCategory(cat);
                setVisibleCount(PAGE_SIZE);
                setSearchParams((prev) => {
                  if (cat === 'Todos') {
                    prev.delete('category');
                  } else {
                    prev.set('category', cat);
                  }
                  return prev;
                });
              }}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todos' ? 'Todos os gêneros' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Artist Dropdown */}
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="artist-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Artista:
            </label>
            <select
              id="artist-select"
              value={activeArtist}
              onChange={(e) => {
                const art = e.target.value;
                setActiveArtist(art);
                setVisibleCount(PAGE_SIZE);
                setSearchParams((prev) => {
                  if (art === 'Todos') {
                    prev.delete('artist');
                  } else {
                    prev.set('artist', art);
                  }
                  return prev;
                });
              }}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer max-w-[210px] truncate focus:outline-none focus:border-[#141512]"
            >
              {artists.map((art) => (
                <option key={art} value={art}>
                  {art === 'Todos' ? 'Todos os artistas' : art}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Todos');
                setActiveArtist('Todos');
                setSearchQuery('');
                setSortBy('relevance');
                setSearchParams((prev) => {
                  prev.delete('category');
                  prev.delete('artist');
                  prev.delete('q');
                  return prev;
                });
              }}
              className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 hover:text-black cursor-pointer ml-1"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Sort & Counter */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#141512]/10">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
            {String(sortedRecords.length).padStart(2, '0')}{' '}
            {sortedRecords.length === 1 ? 'DISCO' : 'DISCOS'}
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

      {/* Product grid */}
      {sortedRecords.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {sortedRecords.slice(0, visibleCount).map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                isVinyl={true}
                onAction={onAddToCart}
              />
            ))}
          </div>

          {visibleCount < sortedRecords.length && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Ver mais discos
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-16 text-center bg-white border-2 border-dashed border-[#141512] rounded-lg p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]">
            Nenhum disco encontrado com estes filtros.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setActiveCategory('Todos');
              setActiveArtist('Todos');
              setSearchQuery('');
              setStoreTab('all');
              setSearchParams({});
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
