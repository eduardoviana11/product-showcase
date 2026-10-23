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
  { id: 'name', label: 'A – Z' },
];

const PAGE_SIZE = 8;

export default function Discos({ vinylRecords = [], onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') || (searchParams.get('filter') === 'em-destaque' ? 'featured' : 'all');
  const urlQuery = searchParams.get('q') || '';

  const [storeTab, setStoreTab] = useState(urlTab);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setStoreTab(searchParams.get('tab'));
    } else if (searchParams.get('filter') === 'em-destaque') {
      setStoreTab('featured');
    }
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

  const activeTab = STORE_TABS.find((tab) => tab.id === storeTab) || STORE_TABS[0];
  const tabRecords = vinylRecords.filter((record) => isInTab(record, storeTab));

  const categories = [
    'Todos',
    ...Array.from(new Set(tabRecords.map((r) => r.category).filter(Boolean))),
  ];

  const filteredRecords = tabRecords.filter((record) => {
    const matchesCategory =
      activeCategory === 'Todos' || record.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.artist && record.artist.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    return 0;
  });

  const selectStoreTab = (tabId) => {
    setStoreTab(tabId);
    setActiveCategory('Todos');
    setVisibleCount(PAGE_SIZE);
    setSearchParams((prev) => {
      prev.set('tab', tabId);
      return prev;
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Page Title */}
      <div className="mb-10 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          ACERVO COMPLETO · EDICÕES FÍSICAS EM VINIL
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          DISCOS EM CATÁLOGO
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
              className={`font-['Inter'] text-sm sm:text-base font-semibold pb-3 -mb-[2px] border-b-4 transition-colors cursor-pointer ${isActive
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

      {/* Genre chips & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtro de gêneros">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-pressed={isActive}
                className={`font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 border-2 border-[#141512] transition-colors cursor-pointer ${isActive
                    ? 'bg-[#141512] text-[#F4F2E9]'
                    : 'bg-transparent text-[#141512] hover:bg-[#DADCD3]'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
            {String(sortedRecords.length).padStart(2, '0')}{' '}
            {sortedRecords.length === 1 ? 'DISCO' : 'DISCOS'}
          </span>
          <label htmlFor="sort-select" className="sr-only">
            Ordenar discos
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#F4F2E9] border-2 border-[#141512] px-3 py-1.5 font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512] cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
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
        <div className="py-16 text-center border-2 border-dashed border-[#141512] p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]">
            Nenhum disco encontrado com estes filtros.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setActiveCategory('Todos');
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
