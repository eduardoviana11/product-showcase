import React, { useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'name', label: 'Nome (A - Z)' },
];

export default function Objetos({ sceneObjects = [], onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Todos',
    ...Array.from(new Set(sceneObjects.map((o) => o.category).filter(Boolean))),
  ];

  const filteredObjects = sceneObjects.filter((obj) => {
    const matchesCat =
      activeCategory === 'Todos' ||
      (obj.category &&
        obj.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === '' ||
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (obj.description &&
        obj.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const sortedObjects = [...filteredObjects].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    return 0;
  });

  const hasActiveFilters =
    activeCategory !== 'Todos' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'relevance';

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          ARTEFATOS E PRODUTOS FÍSICOS - MERCH & EDIÇÕES
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          OBJETOS DA CENA
        </h1>
        <p className="font-['Inter'] text-base text-[#141512]/75 mt-3 max-w-2xl">
          A música também mora fora do disco. Ecobags com serigrafia artesanal, cadernos de escuta e cartazes em tiragem numerada.
        </p>
      </div>

      {/* Dropdown Filter Bar */}
      <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <label htmlFor="objetos-quick-filter" className="sr-only">
              Filtrar objetos por nome
            </label>
            <input
              id="objetos-quick-filter"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar objeto..."
              className="w-48 sm:w-56 bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:border-[#141512] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <label
              htmlFor="obj-category-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Categoria:
            </label>
            <select
              id="obj-category-select"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
            >
              {categories.map((cat) => (
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
                setActiveCategory('Todos');
                setSearchQuery('');
                setSortBy('relevance');
              }}
              className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 hover:text-black cursor-pointer ml-1"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#141512]/10">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
            {String(sortedObjects.length).padStart(2, '0')}{' '}
            {sortedObjects.length === 1 ? 'OBJETO' : 'OBJETOS'}
          </span>

          <div className="flex items-center gap-1.5">
            <label
              htmlFor="obj-sort-select"
              className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
            >
              Ordenar:
            </label>
            <select
              id="obj-sort-select"
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

      {/* Grid */}
      {sortedObjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedObjects.map((obj) => (
            <ProductCard
              key={obj.name}
              product={obj}
              isVinyl={false}
              onAction={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border-2 border-dashed border-[#141512] rounded-lg p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]">
            Nenhum objeto encontrado com estes filtros.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setActiveCategory('Todos');
              setSearchQuery('');
              setSortBy('relevance');
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}

      {/* Production & Sustainability Note */}
      <div className="mt-16 bg-[#DADCD3] border-2 border-[#141512] p-8 max-w-3xl">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-widest text-[#141512] block mb-2">
          PRODUÇÃO INDEPENDENTE & CONSCIENTE
        </span>
        <p className="font-['Inter'] text-sm text-[#141512]/85 leading-relaxed">
          Todos os nossos objetos são produzidos em pequenas oficinas locais, utilizando algodão cru, papéis certificados e processos de serigrafia manual. Cada peça carrega o cuidado do fazer artesanal.
        </p>
      </div>
    </div>
  );
}
