import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { resolveAssetUrl } from '../utils/assets';
import {
  getProductId,
  getCreatorName,
  getCreatorSlug,
  slugifyProductName,
} from '../utils/slug';

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'name', label: 'Nome (A - Z)' },
];

export default function CreatorProfile({
  vinylRecords = [],
  sceneObjects = [],
  onAddToCart,
}) {
  const { slug } = useParams();
  const location = useLocation();
  const normalizedSlug = (slug || '').trim().toLowerCase();

  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'vinyl' | 'object'
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    setTypeFilter('all');
    setCategoryFilter('Todos');
    setSortBy('relevance');
  }, [normalizedSlug, location.pathname]);

  // Combine all catalog products
  const allProducts = [
    ...vinylRecords.map((item) => ({ ...item, _isVinyl: true })),
    ...sceneObjects.map((item) => ({ ...item, _isVinyl: false })),
  ];

  const isStorePath = location.pathname.startsWith('/loja');

  // Helper to check if an item belongs to a store vs an artist
  const isItemStoreOwned = (item) => {
    const artist = (item.artist || '').trim();
    return !artist || artist.toLowerCase().includes('zuno');
  };

  // Match items belonging to this artist or store (or all of that route type when no slug is given)
  const ownerItems = allProducts.filter((item) => {
    if (!normalizedSlug) {
      return isStorePath ? isItemStoreOwned(item) : !isItemStoreOwned(item);
    }

    const creatorSlug = getCreatorSlug(item);
    const artistSlug = item.artist ? slugifyProductName(item.artist) : '';
    const storeSlug = item.store ? slugifyProductName(item.store) : '';
    const pickupSlug = item.pickup_location
      ? slugifyProductName(item.pickup_location)
      : '';
    return (
      creatorSlug === normalizedSlug ||
      artistSlug === normalizedSlug ||
      storeSlug === normalizedSlug ||
      (normalizedSlug.includes('zuno') &&
        (creatorSlug.includes('zuno') || pickupSlug === normalizedSlug))
    );
  });

  // Build directory of unique creators for this route when viewing /artista/ or /loja/
  const directoryCreators = !normalizedSlug
    ? Array.from(
        ownerItems.reduce((map, item) => {
          const cSlug = getCreatorSlug(item);
          if (!map.has(cSlug)) {
            map.set(cSlug, {
              slug: cSlug,
              name: getCreatorName(item),
              image: resolveAssetUrl(item.image),
              count: 1,
            });
          } else {
            map.get(cSlug).count += 1;
          }
          return map;
        }, new Map()).values()
      )
    : [];

  // Determine display name and whether this profile is an artist or store
  const firstMatched = ownerItems[0];
  const displayName = !normalizedSlug
    ? isStorePath
      ? directoryCreators.length === 1
        ? directoryCreators[0].name
        : 'Lojas'
      : 'Artistas'
    : firstMatched
      ? getCreatorName(firstMatched)
      : normalizedSlug
          .split('-')
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

  const isStoreRoute =
    isStorePath ||
    displayName.toLowerCase().includes('zuno') ||
    displayName.toLowerCase().includes('loja');

  const ownerVinylCount = ownerItems.filter((i) => i._isVinyl).length;
  const ownerObjectCount = ownerItems.filter((i) => !i._isVinyl).length;

  // Featured cover image for avatar
  const avatarSrc = firstMatched ? resolveAssetUrl(firstMatched.image) : '';

  // Filter by Type (All / Vinyl / Object)
  const typeFiltered = ownerItems.filter((item) => {
    if (typeFilter === 'vinyl') return item._isVinyl;
    if (typeFilter === 'object') return !item._isVinyl;
    return true;
  });

  // Categories available for this creator
  const availableCategories = [
    'Todos',
    ...Array.from(
      new Set(typeFiltered.map((item) => item.category).filter(Boolean))
    ),
  ];

  // Filter by Category
  const categoryFiltered = typeFiltered.filter((item) => {
    if (categoryFilter === 'Todos') return true;
    return (
      item.category &&
      item.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  });

  // Sort items
  const sortedItems = [...categoryFiltered].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    return 0;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Navegação estrutural"
        className="mb-6 flex flex-wrap items-center gap-2 font-['Inter'] text-xs sm:text-sm text-[#141512]/70"
      >
        <Link to="/" className="hover:text-[#141512] transition-colors">
          Início
        </Link>
        <span className="text-[#141512]/40">&gt;</span>
        {normalizedSlug ? (
          <>
            <Link
              to={isStoreRoute ? '/loja' : '/artista'}
              className="hover:text-[#141512] transition-colors"
            >
              {isStoreRoute ? 'Lojas' : 'Artistas'}
            </Link>
            <span className="text-[#141512]/40">&gt;</span>
            <span className="text-[#141512] font-medium truncate max-w-[260px] sm:max-w-md">
              {displayName}
            </span>
          </>
        ) : (
          <span className="text-[#141512] font-medium">
            {isStoreRoute ? 'Lojas' : 'Artistas'}
          </span>
        )}
      </nav>

      {/* Creator / Store Profile Header Card */}
      <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar / Monogram */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#141512] border-2 border-[#141512] overflow-hidden shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#C5F43B]">
            {avatarSrc && (normalizedSlug || directoryCreators.length === 1) ? (
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-['Anton'] text-3xl text-[#C5F43B] uppercase">
                {(displayName || 'Z').charAt(0)}
              </span>
            )}
          </div>

          <div>
            <span className="inline-block font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.08em] px-2.5 py-0.5 bg-[#C5F43B] text-[#141512] border border-[#141512] mb-2">
              {isStoreRoute ? 'LOJA OFICIAL' : 'CRIADOR'}
            </span>
            <h1 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
              {displayName}
            </h1>
            <p className="font-['Inter'] text-sm text-[#141512]/75 mt-2">
              {ownerItems.length === 1
                ? '1 item publicado no catálogo da ZUNO'
                : `${ownerItems.length} itens publicados no catálogo da ZUNO`}
              {ownerVinylCount > 0 && ownerObjectCount > 0
                ? ` (${ownerVinylCount} ${ownerVinylCount === 1 ? 'disco' : 'discos'
                } e ${ownerObjectCount} ${ownerObjectCount === 1 ? 'objeto' : 'objetos'
                })`
                : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Creators when visiting /artista/ or /loja/ without a specific slug */}
      {!normalizedSlug && directoryCreators.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2.5">
          {directoryCreators.map((creator) => (
            <Link
              key={creator.slug}
              to={`${isStorePath ? '/loja' : '/artista'}/${creator.slug}`}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#FFFFFF] border-2 border-[#141512] rounded-md font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] hover:bg-[#C5F43B] transition-colors"
            >
              <span>{creator.name}</span>
              <span className="text-[#141512]/60">({creator.count})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Filter & Sort Bar */}
      {ownerItems.length > 0 && (
        <div className="bg-[#FFFFFF] border-2 border-[#141512] rounded-lg p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <label
                htmlFor="creator-type-select"
                className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
              >
                Tipo:
              </label>
              <select
                id="creator-type-select"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCategoryFilter('Todos');
                }}
                className="bg-[#F4F2E9] border border-[#141512]/30 rounded-md px-3 py-2 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] cursor-pointer focus:outline-none focus:border-[#141512]"
              >
                <option value="all">Todos ({ownerItems.length})</option>
                <option value="vinyl">Discos ({ownerVinylCount})</option>
                <option value="object">Objetos ({ownerObjectCount})</option>
              </select>
            </div>

            {/* Category Filter */}
            {availableCategories.length > 2 && (
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="creator-cat-select"
                  className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
                >
                  Categoria:
                </label>
                <select
                  id="creator-cat-select"
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
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#141512]/10">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
              {String(sortedItems.length).padStart(2, '0')}{' '}
              {sortedItems.length === 1 ? 'ITEM' : 'ITENS'}
            </span>

            <div className="flex items-center gap-1.5">
              <label
                htmlFor="creator-sort-select"
                className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-[#141512]/70"
              >
                Ordenar:
              </label>
              <select
                id="creator-sort-select"
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
      )}

      {/* Owner Items Grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {sortedItems.map((product) => (
            <ProductCard
              key={`${product._isVinyl ? 'v' : 'o'}-${getProductId(product)}`}
              product={product}
              isVinyl={product._isVinyl}
              onAction={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border-2 border-dashed border-[#141512] rounded-lg p-8">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512] mb-4">
            Nenhum item encontrado para este filtro.
          </p>
          {ownerItems.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                setTypeFilter('all');
                setCategoryFilter('Todos');
              }}
              className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] cursor-pointer"
            >
              Mostrar todos os itens de {displayName}
            </button>
          ) : (
            <Link
              to="/busca"
              className="inline-block font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 bg-[#C5F43B] text-[#141512] border-2 border-[#141512]"
            >
              Voltar ao catálogo
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

