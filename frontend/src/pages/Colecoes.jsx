import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { resolveAssetUrl } from '../utils/assets';
import { getProductId } from '../utils/slug';

export default function Colecoes({
  vinylRecords = [],
  collections: collectionData = [],
  onAddToCart,
}) {
  const { hash } = useLocation();

  // Scroll to a specific collection when arriving through /colecoes#id
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  const collections = collectionData.map((col) => ({
    ...col,
    records: (col.product_ids || [])
      .map((id) => vinylRecords.find((record) => getProductId(record) === id))
      .filter(Boolean),
  }));

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          NÃO É UM GÊNERO, É UM PONTO DE PARTIDA.
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          SIGA A SUA CURIOSIDADE.
        </h1>
        <p className="font-['Inter'] text-base text-[#141512]/75 mt-3 max-w-2xl">
          Seleções montadas pela curadoria da ZUNO para você explorar a música por clima, não por rótulo.
        </p>
      </div>

      {/* Collection quick index */}
      <nav
        aria-label="Coleções"
        className="mb-12 flex flex-wrap gap-3"
      >
        {collections.map((col) => (
          <a
            key={col.id}
            href={`#${col.id}`}
            className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider px-4 py-2 border-2 border-[#141512] bg-[#FFFFFF] text-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors"
          >
            {col.title}
          </a>
        ))}
      </nav>

      {/* Collections */}
      <div className="flex flex-col gap-16">
        {collections.map((col) => {
          const bannerUrl = resolveAssetUrl(col.image);
          return (
            <section
              key={col.id}
              id={col.id}
              className="scroll-mt-32"
              aria-labelledby={`${col.id}-title`}
            >
              <div
                className="relative overflow-hidden rounded-lg border-2 border-[#141512] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                style={bannerUrl ? undefined : { backgroundColor: col.accent }}
              >
                {bannerUrl && (
                  <img
                    src={bannerUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] max-w-none object-cover pointer-events-none"
                  />
                )}
                <div className="relative z-10">
                  <h2
                    id={`${col.id}-title`}
                    className="font-['Anton'] text-4xl sm:text-5xl text-[#141512] uppercase tracking-wide leading-none"
                  >
                    {col.title}
                  </h2>
                  <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/80 mt-2">
                    {col.description}
                  </p>
                </div>
                <span className="relative z-10 font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] shrink-0">
                  {String(col.records.length).padStart(2, '0')}{' '}
                  {col.records.length === 1 ? 'disco' : 'discos'}
                </span>
              </div>

              {col.records.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {col.records.map((record) => (
                    <ProductCard
                      key={`${col.id}-${getProductId(record)}`}
                      product={record}
                      isVinyl={true}
                      onAction={onAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]/70">
                  Nenhum disco nesta coleção por enquanto.
                </p>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/discos"
          className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold px-6 py-3 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] transition-all"
        >
          Explorar todos os discos
        </Link>
      </div>
    </div>
  );
}

