import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VinylDisc from '../components/shapes/VinylDisc';
import ProductCard, { CoverArtwork } from '../components/ui/ProductCard';
import { resolveAssetUrl } from '../utils/assets';
import { getProductId } from '../utils/slug';

export default function ProductDetail({
  vinylRecords = [],
  sceneObjects = [],
  onAddToCart,
}) {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'cover' | 'vinyl'

  // Combine catalog items and determine if current item is a vinyl record
  const matchedVinyl = vinylRecords.find(
    (item) => getProductId(item) === id
  );
  const matchedObject = !matchedVinyl
    ? sceneObjects.find((item) => getProductId(item) === id)
    : null;

  const product = matchedVinyl || matchedObject;
  const isVinyl = Boolean(
    matchedVinyl || (product && product.type === 'vinyl')
  );

  // Reset local state when navigating between products
  useEffect(() => {
    setImageError(false);
    setViewMode('split');
  }, [id]);

  // 404 / Product Not Found State
  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-20">
        <div className="border-2 border-[#141512] bg-[#E5E6DF] p-8 sm:p-14 max-w-2xl mx-auto text-center">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.1em] text-[#141512]/70 block mb-3">
            ITEM NÃO ENCONTRADO · ACERVO ZUNO
          </span>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-wide text-[#141512] leading-none mb-4">
            ESTE ITEM SAIU DA VITRINE
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/80 leading-relaxed mb-8">
            Não encontramos nenhum produto correspondente ao identificador{' '}
            <code className="font-['IBM_Plex_Mono'] bg-[#DADCD3] px-1.5 py-0.5 border border-[#141512]/30 text-xs">
              {id}
            </code>
            . Explore o catálogo completo para descobrir outros discos e objetos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/discos"
              className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold px-6 py-3 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] transition-all"
            >
              Ver todos os discos →
            </Link>
            <Link
              to="/objetos"
              className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold px-6 py-3 bg-transparent text-[#141512] border-2 border-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] transition-all"
            >
              Ver objetos da cena
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    artist,
    description,
    formatted_price,
    category,
    specs_meta,
    delivery,
    weight_grams = 180,
    tracks_count = 10,
    pickup_location = isVinyl ? 'Estúdio ZUNO' : 'Loja ZUNO',
    file_format,
    cover_variant = 'coastal-bands',
    image,
    vinyl_image,
    vinyl_scale = 1.0,
    featured,
    is_new,
    tracklist = [],
  } = product;

  const resolvedCoverSrc = resolveAssetUrl(image);
  const hasRealImage = Boolean(resolvedCoverSrc) && !imageError;
  const productSlug = getProductId(product);

  // Organize tracklist by Side A / Side B if available
  const hasTracklist = Array.isArray(tracklist) && tracklist.length > 0;
  const sideATracks = hasTracklist
    ? tracklist.filter((t) => !t.side || t.side.toUpperCase() === 'A')
    : [];
  const sideBTracks = hasTracklist
    ? tracklist.filter((t) => t.side && t.side.toUpperCase() === 'B')
    : [];

  // Related items ("Você também pode gostar")
  const sourcePool = isVinyl ? vinylRecords : [...sceneObjects, ...vinylRecords];
  const relatedProducts = sourcePool
    .filter((item) => getProductId(item) !== productSlug)
    .sort((a, b) => {
      const aSameCat = a.category === category ? -1 : 0;
      const bSameCat = b.category === category ? -1 : 0;
      return aSameCat - bSameCat;
    })
    .slice(0, 4);

  // Technical specification cells
  const specRows = isVinyl
    ? [
        { label: 'FORMATO', value: 'Vinil 12" · 33⅓ RPM' },
        { label: 'GRAMATURA', value: `${weight_grams} g` },
        { label: 'FAIXAS', value: `${tracks_count} faixas` },
        { label: 'ORIGEM / RETIRADA', value: pickup_location },
      ]
    : [
        { label: 'CATEGORIA', value: category || 'Objetos da Cena' },
        {
          label: 'FORMATO',
          value:
            product.type === 'digital'
              ? `Digital (${file_format || 'PDF'})`
              : 'Artefato Físico',
        },
        { label: 'ESPECIFICAÇÕES', value: specs_meta || 'Tiragem Especial ZUNO' },
        {
          label: 'DISPONIBILIDADE',
          value: file_format || pickup_location || 'Loja ZUNO',
        },
      ];

  return (
    <div className="flex flex-col">
      {/* 1. BREADCRUMB & BACK NAVIGATION BAR */}
      <div className="border-b-2 border-[#141512] bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Navegação estrutural"
            className="flex items-center flex-wrap gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#141512]/70"
          >
            <Link to="/" className="hover:text-[#141512] hover:underline">
              Início
            </Link>
            <span>/</span>
            <Link
              to={isVinyl ? '/discos' : '/objetos'}
              className="hover:text-[#141512] hover:underline"
            >
              {isVinyl ? 'Discos' : 'Objetos'}
            </Link>
            {category && isVinyl && (
              <>
                <span>/</span>
                <span className="text-[#141512]/80">{category}</span>
              </>
            )}
            <span>/</span>
            <span className="text-[#141512] font-semibold truncate max-w-[220px] sm:max-w-xs">
              {name}
            </span>
          </nav>

          <Link
            to={isVinyl ? '/discos' : '/objetos'}
            className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] hover:underline underline-offset-4 inline-flex items-center gap-1.5"
          >
            ← Voltar para {isVinyl ? 'Discos' : 'Objetos'}
          </Link>
        </div>
      </div>

      {/* 2. PRODUCT HERO SHOWCASE */}
      <section className="border-b-2 border-[#141512] bg-[#F4F2E9] py-10 sm:py-14 lg:py-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: TACTILE EXHIBITION STAGE */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="w-full bg-[#E5E6DF] border-2 border-[#141512] aspect-square sm:aspect-[1.08/1] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden select-none">
              {/* Top-left badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                {is_new && (
                  <span className="bg-[#C5F43B] text-[#141512] border border-[#141512] font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1">
                    Novo
                  </span>
                )}
                {featured && (
                  <span className="bg-[#141512] text-[#F4F2E9] border border-[#141512] font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1">
                    Destaque
                  </span>
                )}
                {!is_new && !featured && (
                  <span className="bg-[#F4F2E9] text-[#141512] border border-[#141512] font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1">
                    {isVinyl ? 'Edição em Vinil' : 'Acervo ZUNO'}
                  </span>
                )}
              </div>

              {/* Top-right catalog ID stamp */}
              <div className="absolute top-4 right-4 z-20 hidden sm:block">
                <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest text-[#141512]/60 bg-[#F4F2E9]/80 border border-[#141512]/20 px-2.5 py-1">
                  ID · {productSlug}
                </span>
              </div>

              {/* Artwork + Vinyl Stage */}
              {isVinyl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Vinyl Disc Layer */}
                  <div
                    className={`aspect-square transition-all duration-500 ease-out flex items-center justify-center ${
                      viewMode === 'vinyl'
                        ? 'w-[74%] max-w-[360px] z-20 translate-x-0 scale-105'
                        : viewMode === 'cover'
                        ? 'w-[60%] max-w-[300px] z-0 translate-x-0 opacity-0 pointer-events-none'
                        : 'w-[58%] sm:w-[60%] max-w-[300px] z-0 translate-x-[28%] sm:translate-x-[30%]'
                    }`}
                  >
                    <VinylDisc
                      labelText={artist ? artist.split(' ')[0] : 'ZUNO'}
                      image={vinyl_image}
                      scale={vinyl_scale}
                    />
                  </div>

                  {/* Album Sleeve Cover Layer */}
                  <div
                    onClick={() =>
                      setViewMode((prev) =>
                        prev === 'split' ? 'cover' : 'split'
                      )
                    }
                    title="Clique para alternar a posição da capa"
                    className={`aspect-square bg-[#141512] shadow-[0px_12px_30px_rgba(0,0,0,0.22)] overflow-hidden border-2 border-[#141512] transition-all duration-500 ease-out cursor-pointer ${
                      viewMode === 'cover'
                        ? 'w-[74%] max-w-[360px] z-20 translate-x-0'
                        : viewMode === 'vinyl'
                        ? 'w-[58%] max-w-[290px] z-0 -translate-x-[35%] opacity-20 scale-90'
                        : 'absolute w-[60%] sm:w-[62%] max-w-[310px] z-10 -translate-x-[18%] sm:-translate-x-[20%]'
                    }`}
                  >
                    {hasRealImage ? (
                      <img
                        src={resolvedCoverSrc}
                        alt={`Capa de ${name}`}
                        className="w-full h-full object-cover select-none"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <CoverArtwork
                        variant={cover_variant}
                        title={name}
                        artist={artist}
                      />
                    )}
                  </div>
                </div>
              ) : (
                /* Scene Object Artwork */
                <div className="relative w-[72%] max-w-[340px] aspect-square bg-[#141512] shadow-[0px_10px_28px_rgba(0,0,0,0.18)] border-2 border-[#141512] overflow-hidden">
                  {hasRealImage ? (
                    <img
                      src={resolvedCoverSrc}
                      alt={name}
                      className="w-full h-full object-cover select-none"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <CoverArtwork
                      variant={cover_variant}
                      title={name}
                      artist={artist}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Interactive View Switcher for Vinyl Records */}
            {isVinyl && (
              <div
                className="grid grid-cols-3 gap-2"
                role="group"
                aria-label="Alternar visualização do disco"
              >
                {[
                  { id: 'split', label: '01 · Capa + Vinil' },
                  { id: 'cover', label: '02 · Só a Capa' },
                  { id: 'vinyl', label: '03 · Só o Disco' },
                ].map((mode) => {
                  const active = viewMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setViewMode(mode.id)}
                      aria-pressed={active}
                      className={`py-2.5 px-3 border-2 border-[#141512] font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#141512] text-[#C5F43B]'
                          : 'bg-[#F4F2E9] text-[#141512] hover:bg-[#DADCD3]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: EDITORIAL DETAILS, SPECS & ACTION */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Kicker / Category */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512] bg-[#DADCD3] border border-[#141512] px-2.5 py-1">
                {category || (isVinyl ? 'Vinil' : 'Objeto')}
              </span>
              {specs_meta && (
                <span className="font-['IBM_Plex_Mono'] text-xs font-medium uppercase tracking-wider text-[#141512]/70">
                  {specs_meta}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-['Anton'] text-4xl sm:text-5xl lg:text-6xl text-[#141512] uppercase leading-[1.03] tracking-wide mb-2">
              {name}
            </h1>

            {/* Artist / Subtitle */}
            {artist && (
              <p className="font-['Inter'] text-lg sm:text-xl font-semibold text-[#141512]/80 mb-6">
                {artist}
              </p>
            )}

            {/* Price & Primary CTA Box */}
            <div className="my-4 p-6 bg-[#E5E6DF] border-2 border-[#141512] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-widest text-[#141512]/65 block mb-1">
                  VALOR DA EDIÇÃO
                </span>
                <div className="font-['IBM_Plex_Mono'] text-3xl sm:text-4xl font-bold text-[#141512] leading-none">
                  {formatted_price}
                </div>
                <span className="font-['Inter'] text-xs text-[#141512]/70 mt-1.5 block">
                  Em estoque · Pronta entrega pela curadoria ZUNO
                </span>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart && onAddToCart(product)}
                className="w-full sm:w-auto font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs sm:text-sm font-semibold px-7 py-4 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[4px_4px_0px_#141512] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
              >
                Adicionar ao carrinho ↗
              </button>
            </div>

            {/* Editorial Description */}
            <div className="mt-6 pb-6 border-b-2 border-[#141512]">
              <h2 className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-[0.08em] text-[#141512] mb-2.5">
                SOBRE ESTA EDIÇÃO
              </h2>
              <p className="font-['Inter'] text-base text-[#141512]/85 leading-relaxed max-w-[65ch]">
                {description}
              </p>
            </div>

            {/* Polymorphic Delivery Highlight (OOP Principle Showcase) */}
            {delivery && (
              <div className="mt-6 bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] p-5 flex items-start gap-4">
                <span className="bg-[#C5F43B] text-[#141512] font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase px-2 py-1 shrink-0 mt-0.5">
                  ENTREGA
                </span>
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-[#C5F43B] block mb-1">
                    ESPECIFICAÇÃO DE FORMATO E ENVIO
                  </span>
                  <p className="font-['Inter'] text-sm text-[#F4F2E9] leading-relaxed">
                    {delivery}
                  </p>
                </div>
              </div>
            )}

            {/* Technical Specifications Grid */}
            <div className="mt-6">
              <h2 className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-[0.08em] text-[#141512] mb-3">
                FICHA TÉCNICA
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-l-2 border-[#141512]">
                {specRows.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 bg-[#F4F2E9] border-r-2 border-b-2 border-[#141512]"
                  >
                    <span className="font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-widest text-[#141512]/60 block mb-1">
                      {spec.label}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-xs sm:text-sm font-bold text-[#141512]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRACKLIST SECTION (FOR VINYL RECORDS) */}
      {isVinyl && (
        <section className="border-b-2 border-[#141512] bg-[#F4F2E9] py-14 px-6 sm:px-12 lg:px-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b-2 border-[#141512]">
              <div>
                <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                  AUDIÇÃO COMPLETA · LADO A & LADO B
                </span>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl text-[#141512] uppercase tracking-wide leading-none">
                  LISTA DE FAIXAS
                </h2>
              </div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] bg-[#DADCD3] border border-[#141512] px-3 py-1.5 self-start sm:self-auto">
                TOTAL: {tracks_count} FAIXAS · PRENSAGEM {weight_grams}G
              </span>
            </div>

            {hasTracklist ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SIDE A */}
                <div className="border-2 border-[#141512] bg-[#E5E6DF]">
                  <div className="bg-[#141512] text-[#F4F2E9] px-5 py-3 flex items-center justify-between">
                    <span className="font-['Anton'] text-xl uppercase tracking-wider text-[#C5F43B]">
                      LADO A
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-[#DADCD3]">
                      {sideATracks.length}{' '}
                      {sideATracks.length === 1 ? 'FAIXA' : 'FAIXAS'}
                    </span>
                  </div>
                  <ol className="divide-y border-t border-[#141512]/15">
                    {sideATracks.map((track, idx) => (
                      <li
                        key={`side-a-${track.number || idx}`}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#DADCD3]/60 transition-colors"
                      >
                        <div className="flex items-baseline gap-3.5 min-w-0">
                          <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#141512]/60 shrink-0">
                            {track.number || String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-['Inter'] text-sm sm:text-base font-semibold text-[#141512] truncate">
                            {track.title}
                          </span>
                        </div>
                        {track.duration && (
                          <span className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/70 shrink-0">
                            {track.duration}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* SIDE B */}
                {sideBTracks.length > 0 && (
                  <div className="border-2 border-[#141512] bg-[#E5E6DF]">
                    <div className="bg-[#141512] text-[#F4F2E9] px-5 py-3 flex items-center justify-between">
                      <span className="font-['Anton'] text-xl uppercase tracking-wider text-[#C5F43B]">
                        LADO B
                      </span>
                      <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-[#DADCD3]">
                        {sideBTracks.length}{' '}
                        {sideBTracks.length === 1 ? 'FAIXA' : 'FAIXAS'}
                      </span>
                    </div>
                    <ol className="divide-y border-t border-[#141512]/15">
                      {sideBTracks.map((track, idx) => (
                        <li
                          key={`side-b-${track.number || idx}`}
                          className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#DADCD3]/60 transition-colors"
                        >
                          <div className="flex items-baseline gap-3.5 min-w-0">
                            <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#141512]/60 shrink-0">
                              {track.number ||
                                String(sideATracks.length + idx + 1).padStart(
                                  2,
                                  '0'
                                )}
                            </span>
                            <span className="font-['Inter'] text-sm sm:text-base font-semibold text-[#141512] truncate">
                              {track.title}
                            </span>
                          </div>
                          {track.duration && (
                            <span className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/70 shrink-0">
                              {track.duration}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback when a record in products.json has tracks_count but no explicit tracklist array */
              <div className="border-2 border-[#141512] bg-[#E5E6DF] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] block mb-1">
                    PRENSAGEM INTEGRAL · {tracks_count} FAIXAS NO TOTAL
                  </span>
                  <p className="font-['Inter'] text-sm text-[#141512]/80">
                    Edição física masterizada para vinil de {weight_grams}g, distribuída entre os Lados A e B.
                  </p>
                </div>
                <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider bg-[#F4F2E9] border border-[#141512] px-3 py-2 text-[#141512] shrink-0">
                  33⅓ RPM · ESTÉREO
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. RELATED PRODUCTS ("VOCÊ TAMBÉM PODE GOSTAR") */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-[#141512]">
              <div>
                <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                  CONTINUE GARIMPANDO NO ACERVO
                </span>
                <h2 className="font-['Anton'] text-4xl sm:text-5xl text-[#141512] uppercase tracking-wide leading-none">
                  VOCÊ TAMBÉM PODE GOSTAR
                </h2>
              </div>
              <Link
                to={isVinyl ? '/discos' : '/objetos'}
                className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] hover:underline underline-offset-4"
              >
                Ver catálogo completo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {relatedProducts.map((relItem) => {
                const relIsVinyl =
                  relItem.type === 'vinyl' ||
                  vinylRecords.some(
                    (v) => getProductId(v) === getProductId(relItem)
                  );
                return (
                  <ProductCard
                    key={getProductId(relItem)}
                    product={relItem}
                    isVinyl={relIsVinyl}
                    onAction={onAddToCart}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

