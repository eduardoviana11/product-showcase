import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import VinylDisc from '../components/shapes/VinylDisc';
import ProductCard, { CoverArtwork } from '../components/ui/ProductCard';
import { resolveAssetUrl } from '../utils/assets';
import {
  getProductId,
  getCreatorName,
  getCreatorHref,
} from '../utils/slug';

export default function ProductDetail({
  vinylRecords = [],
  sceneObjects = [],
  onAddToCart,
}) {
  const { id } = useParams();
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isQtyDropdownOpen, setIsQtyDropdownOpen] = useState(false);
  const [showCustomQtyInput, setShowCustomQtyInput] = useState(false);
  const [customQtyValue, setCustomQtyValue] = useState('6');
  const [failedUrls, setFailedUrls] = useState({});
  const qtyDropdownRef = useRef(null);

  // Locate product across catalog
  const matchedVinyl = vinylRecords.find((item) => getProductId(item) === id);
  const matchedObject = !matchedVinyl
    ? sceneObjects.find((item) => getProductId(item) === id)
    : null;

  const product = matchedVinyl || matchedObject;
  const isVinyl = Boolean(
    matchedVinyl || (product && product.type === 'vinyl')
  );

  // Reset slider and quantity when switching products
  useEffect(() => {
    setActiveSlide(0);
    setQuantity(1);
    setIsQtyDropdownOpen(false);
    setShowCustomQtyInput(false);
    setCustomQtyValue('6');
    setFailedUrls({});
  }, [id]);

  // Close quantity dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        qtyDropdownRef.current &&
        !qtyDropdownRef.current.contains(event.target)
      ) {
        setIsQtyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-20">
        <div className="rounded-lg border border-[#141512]/15 bg-[#FFFFFF] p-8 sm:p-12 max-w-xl mx-auto text-center">
          <h1 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wide text-[#141512] mb-3">
            PRODUTO NÃO ENCONTRADO
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/80 mb-6">
            O item solicitado não está disponível no catálogo no momento.
          </p>
          <Link
            to="/discos"
            className="inline-flex items-center justify-center rounded-lg font-['IBM_Plex_Mono'] uppercase tracking-wider text-xs font-semibold px-6 py-3 bg-[#C5F43B] text-[#141512] border border-[#141512]/25 hover:bg-[#b8e62e] transition-colors"
          >
            Ir para os discos
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    artist,
    store,
    description = '',
    price = 0,
    formatted_price,
    category,
    specs_meta,
    weight_grams = 180,
    tracks_count = 10,
    pickup_location = isVinyl ? 'Estúdio ZUNO' : 'Loja ZUNO',
    file_format,
    cover_variant = 'coastal-bands',
    image,
    images = [],
    vinyl_image,
    vinyl_scale = 1.0,
    tracklist = [],
  } = product;

  const productSlug = getProductId(product);

  // Generic seller / artist label and destination link to the Creator / Store page
  const sellerName = getCreatorName(product);
  const sellerHref = getCreatorHref(product);

  // Build gallery slides from `images` array + primary `image` + optional `vinyl_image`
  const rawImageCandidates = [
    ...(Array.isArray(images) ? images : []),
    image,
    vinyl_image,
  ]
    .map((url) => resolveAssetUrl(url))
    .filter(Boolean);

  const uniqueImageUrls = Array.from(new Set(rawImageCandidates));

  // Build structured slides array for the slider
  const slides = [];
  if (uniqueImageUrls.length > 0) {
    uniqueImageUrls.forEach((src, index) => {
      slides.push({
        id: `img-${index}`,
        type: 'image',
        src,
        alt: `${name} - Imagem ${index + 1}`,
      });
    });
  } else {
    slides.push({
      id: 'fallback-cover',
      type: 'artwork',
      alt: `Capa de ${name}`,
    });
  }

  const totalSlides = slides.length;
  const safeSlideIndex = activeSlide < totalSlides ? activeSlide : 0;
  const currentSlide = slides[safeSlideIndex];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const installmentValue = (Number(price) / 6).toFixed(2).replace('.', ',');

  const handleSelectPresetQty = (val) => {
    setQuantity(val);
    setShowCustomQtyInput(false);
    setIsQtyDropdownOpen(false);
  };

  const handleSelectMoreThanFive = () => {
    setShowCustomQtyInput(true);
    setCustomQtyValue(String(quantity > 5 ? quantity : 6));
    setIsQtyDropdownOpen(false);
  };

  const handleCustomQtyChange = (e) => {
    const raw = e.target.value;
    setCustomQtyValue(raw);
    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 1) {
      setQuantity(parsed);
    }
  };

  const handleCustomQtyBlur = () => {
    const parsed = parseInt(customQtyValue, 10);
    if (Number.isNaN(parsed) || parsed < 1) {
      setQuantity(1);
      setCustomQtyValue('1');
    } else {
      setQuantity(parsed);
      setCustomQtyValue(String(parsed));
    }
  };

  const handleBuyClick = () => {
    if (!onAddToCart) return;
    const validQty = Math.max(1, Number(quantity) || 1);
    for (let i = 0; i < validQty; i += 1) {
      onAddToCart(product);
    }
  };

  const scrollToFullDescription = () => {
    const el = document.getElementById('descricao-completa');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build product characteristics list
  const characteristics = isVinyl
    ? [
      { label: 'Artista', value: sellerName },
      { label: 'Gênero', value: category || 'Vinil' },
      {
        label: 'Gramatura',
        value: `${weight_grams} g (Vinil 12", 33⅓ RPM)`,
      },
      { label: 'Total de faixas', value: `${tracks_count} faixas` },
      { label: 'Retirada ou envio', value: 'Estúdio ZUNO' },
    ]
    : [
      { label: 'Loja', value: sellerName },
      { label: 'Categoria', value: category || 'Objetos' },
      ...(specs_meta
        ? [{ label: 'Especificações', value: specs_meta }]
        : []),
      {
        label: 'Formato / Entrega',
        value: file_format || 'Retirada ou envio: Estúdio ZUNO',
      },
    ];

  // Show "Ver descrição completa ↓" when description or characteristics are long
  const isLongContent =
    description.length > 95 || characteristics.length >= 5;

  // Related products
  const sourcePool = isVinyl
    ? vinylRecords
    : [...sceneObjects, ...vinylRecords];
  const relatedProducts = sourcePool
    .filter((item) => getProductId(item) !== productSlug)
    .slice(0, 4);

  const hasTracklist = Array.isArray(tracklist) && tracklist.length > 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
      {/* 1. BREADCRUMB BAR */}
      <nav
        aria-label="Navegação estrutural"
        className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-[#141512]/15 font-['Inter'] text-xs sm:text-sm text-[#141512]/70"
      >
        <Link
          to="/"
          className="hover:text-[#141512] hover:underline transition-colors"
        >
          Início
        </Link>
        <span>&gt;</span>
        <Link
          to={isVinyl ? '/discos' : '/objetos'}
          className="hover:text-[#141512] hover:underline transition-colors"
        >
          {isVinyl ? 'Discos' : 'Objetos'}
        </Link>
        {category &&
          category.trim().toLowerCase() !== (isVinyl ? 'discos' : 'objetos') && (
            <>
              <span>&gt;</span>
              <Link
                to={
                  isVinyl
                    ? `/discos?category=${encodeURIComponent(category)}`
                    : `/objetos?category=${encodeURIComponent(category)}`
                }
                className="hover:text-[#141512] hover:underline transition-colors"
              >
                {category}
              </Link>
            </>
          )}
        <span>&gt;</span>
        <span className="text-[#141512] font-medium truncate max-w-[240px] sm:max-w-md">
          {name}
        </span>
      </nav>

      {/* 2. MAIN PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: LIGHTER WHITE IMAGE SLIDER + THUMBNAILS */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 lg:sticky lg:top-28">
          {/* Main Slider Viewport */}
          <div className="relative w-full aspect-square rounded-lg bg-[#FFFFFF] border border-[#141512]/15 flex items-center justify-center p-6 sm:p-12 overflow-hidden select-none">
            {/* Previous Arrow */}
            {totalSlides > 1 && (
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Imagem anterior"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#F4F2E9]/90 border border-[#141512]/20 text-[#141512] flex items-center justify-center hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Slide Content */}
            <div className="w-full h-full flex items-center justify-center">
              {currentSlide.type === 'image' &&
                !failedUrls[currentSlide.src] ? (
                <img
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                  onError={() =>
                    setFailedUrls((prev) => ({
                      ...prev,
                      [currentSlide.src]: true,
                    }))
                  }
                />
              ) : currentSlide.type === 'vinyl-disc' ? (
                <div className="w-[78%] max-w-[360px] aspect-square flex items-center justify-center">
                  <VinylDisc
                    labelText={artist ? artist.split(' ')[0] : 'ZUNO'}
                    image={vinyl_image}
                    scale={vinyl_scale}
                  />
                </div>
              ) : (
                <div className="w-[78%] max-w-[360px] aspect-square rounded-none border border-[#141512]/20 shadow-sm overflow-hidden">
                  <CoverArtwork
                    variant={cover_variant}
                    title={name}
                    artist={artist}
                  />
                </div>
              )}
            </div>

            {/* Next Arrow */}
            {totalSlides > 1 && (
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Próxima imagem"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#F4F2E9]/90 border border-[#141512]/20 text-[#141512] flex items-center justify-center hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Thumbnail Strip */}
          {totalSlides > 1 && (
            <div
              className="flex items-center gap-3 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Miniaturas do produto"
            >
              {slides.map((slide, index) => {
                const isSelected = index === safeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveSlide(index)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-md bg-[#FFFFFF] p-1.5 transition-all cursor-pointer flex items-center justify-center overflow-hidden ${isSelected
                        ? 'border-2 border-[#141512] opacity-100'
                        : 'border border-[#141512]/20 opacity-70 hover:opacity-100 hover:border-[#141512]'
                      }`}
                  >
                    {slide.type === 'image' && !failedUrls[slide.src] ? (
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover rounded-none"
                      />
                    ) : slide.type === 'vinyl-disc' ? (
                      <div className="w-full h-full p-1">
                        <VinylDisc
                          labelText={artist ? artist.split(' ')[0] : 'ZUNO'}
                          image={vinyl_image}
                          scale={vinyl_scale}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-none overflow-hidden">
                        <CoverArtwork
                          variant={cover_variant}
                          title={name}
                          artist={artist}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SINGLE UNIFIED WHITE CONTAINER FOR ALL PRODUCT SECTIONS */}
        <div className="lg:col-span-6">
          <div className="rounded-lg bg-[#FFFFFF] border border-[#141512]/15 p-6 sm:p-8 flex flex-col">
            {/* 1. Product Title */}
            <h1 className="font-['Inter'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141512] leading-tight">
              {name}
            </h1>

            {/* 2. Availability Text ("Em estoque") */}
            <span className="font-['Inter'] text-xs sm:text-sm font-bold text-[#00a650] mt-1.5 block">
              Em estoque
            </span>

            {/* 3. Generic Artist or Store Name */}
            <Link
              to={sellerHref}
              className="font-['Inter'] text-xs sm:text-sm font-medium text-[#141512]/75 hover:text-[#141512] hover:underline transition-colors mt-1 self-start"
            >
              {sellerName}
            </Link>

            {/* 4. Price & Standardized Delivery Section */}
            <div className="mt-6 pt-6 border-t border-[#141512]/15">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-['Inter'] text-3xl sm:text-4xl font-bold tracking-tight text-[#141512]">
                  {formatted_price}
                </span>
                <span className="font-['Inter'] text-xs sm:text-sm text-[#141512]/75">
                  à vista ou em até <strong>6x de R$ {installmentValue}</strong>{' '}
                  sem juros
                </span>
              </div>

              <p className="font-['Inter'] text-xs sm:text-sm text-[#141512]/80 mt-2">
                Retirada ou envio: Estúdio ZUNO
              </p>
            </div>

            {/* 5. Quantity Dropdown (Fixed Width so it never resizes the Cart button) + Buy CTA */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Fixed-width Quantity Dropdown Trigger */}
                <div
                  className="relative w-full sm:w-[225px] shrink-0"
                  ref={qtyDropdownRef}
                >
                  <button
                    type="button"
                    onClick={() => setIsQtyDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isQtyDropdownOpen}
                    className="w-full h-12 sm:h-14 px-4 rounded-xl border border-[#141512]/25 bg-[#F4F2E9]/60 hover:border-[#141512] transition-colors flex items-center justify-between gap-2 cursor-pointer font-['Inter'] text-sm text-[#141512]"
                  >
                    <span className="truncate">
                      Quantidade:{' '}
                      <strong className="font-semibold">
                        {quantity} {quantity === 1 ? 'unidade' : 'unidades'}
                      </strong>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-4 h-4 shrink-0 text-[#141512]/70 transition-transform ${isQtyDropdownOpen ? 'rotate-180' : ''
                        }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown Modal Menu (1 to 5 units + More than 5 units) */}
                  {isQtyDropdownOpen && (
                    <div
                      role="listbox"
                      aria-label="Selecionar quantidade"
                      className="absolute left-0 top-full mt-1.5 w-full rounded-xl bg-[#FFFFFF] border border-[#141512]/20 shadow-lg py-1.5 z-30 overflow-hidden"
                    >
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isCurrent =
                          quantity === num && !showCustomQtyInput;
                        return (
                          <button
                            key={num}
                            type="button"
                            role="option"
                            aria-selected={isCurrent}
                            onClick={() => handleSelectPresetQty(num)}
                            className={`w-full text-left px-4 py-2.5 font-['Inter'] text-sm flex items-center justify-between transition-colors cursor-pointer ${isCurrent
                                ? 'bg-[#E5E6DF] font-semibold text-[#141512]'
                                : 'text-[#141512]/85 hover:bg-[#F4F2E9]'
                              }`}
                          >
                            <span>
                              {num} {num === 1 ? 'unidade' : 'unidades'}
                            </span>
                            {isCurrent && (
                              <span className="text-xs font-bold text-[#141512]">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}

                      <div className="border-t border-[#141512]/10 mt-1 pt-1">
                        <button
                          type="button"
                          role="option"
                          aria-selected={showCustomQtyInput || quantity > 5}
                          onClick={handleSelectMoreThanFive}
                          className={`w-full text-left px-4 py-2.5 font-['Inter'] text-sm transition-colors cursor-pointer ${showCustomQtyInput || quantity > 5
                              ? 'bg-[#E5E6DF] font-semibold text-[#141512]'
                              : 'text-[#141512]/85 hover:bg-[#F4F2E9]'
                            }`}
                        >
                          Mais de 5 unidades
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button (Constant width, no shadow) */}
                <button
                  type="button"
                  onClick={handleBuyClick}
                  className="w-full sm:w-auto sm:flex-1 h-14 min-h-[56px] py-3.5 sm:py-0 px-6 rounded-xl bg-[#C5F43B] hover:bg-[#b8e62e] text-[#141512] border border-[#141512]/25 font-['IBM_Plex_Mono'] text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <span className="truncate">ADICIONAR AO CARRINHO</span>
                </button>
              </div>

              {/* Secondary Div for Custom Quantity Input (> 5 units, min=1) */}
              {showCustomQtyInput && (
                <div className="rounded-xl bg-[#F4F2E9]/70 border border-[#141512]/20 p-4 flex flex-wrap items-center justify-between gap-3">
                  <label
                    htmlFor="custom-quantity-input"
                    className="font-['Inter'] text-xs sm:text-sm font-medium text-[#141512]/85"
                  >
                    Informe a quantidade desejada:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="custom-quantity-input"
                      type="number"
                      min="1"
                      value={customQtyValue}
                      onChange={handleCustomQtyChange}
                      onBlur={handleCustomQtyBlur}
                      className="w-24 h-10 rounded-lg border border-[#141512]/30 bg-[#FFFFFF] px-3 font-['IBM_Plex_Mono'] text-sm font-semibold text-[#141512] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleCustomQtyBlur();
                        setShowCustomQtyInput(false);
                      }}
                      className="h-10 px-4 rounded-lg bg-[#141512] text-[#F4F2E9] font-['Inter'] text-xs font-semibold hover:bg-[#2a2c26] transition-colors cursor-pointer"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. "O que você precisa saber sobre este produto" Section */}
            <div className="mt-6 pt-6 border-t border-[#141512]/15">
              <h2 className="font-['Inter'] text-sm font-bold uppercase tracking-wide text-[#141512] mb-2.5">
                O que você precisa saber sobre este produto
              </h2>
              <p
                className={`font-['Inter'] text-sm sm:text-base text-[#141512]/85 leading-relaxed mb-4 ${isLongContent ? 'line-clamp-3' : ''
                  }`}
              >
                {description}
              </p>

              <ul className="space-y-1.5 font-['Inter'] text-sm text-[#141512]/85 list-disc list-inside">
                {characteristics.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>

              {/* Grayish Bar with "Ver descrição completa ↓" when content/specs are long */}
              {isLongContent && (
                <button
                  type="button"
                  onClick={scrollToFullDescription}
                  className="mt-4 w-full rounded-lg bg-[#E5E6DF] hover:bg-[#DADCD3] border border-[#141512]/15 py-2.5 px-4 flex items-center justify-center gap-2 font-['Inter'] text-xs sm:text-sm font-semibold text-[#141512]/85 hover:text-[#141512] transition-colors cursor-pointer"
                >
                  <span>Ver descrição completa</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* 7. UNIFIED SINGLE-FIELD TRACKLIST (FOR VINYL RECORDS) */}
            {isVinyl && (
              <div className="mt-6 pt-6 border-t border-[#141512]/15">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#141512]/10">
                  <h2 className="font-['Inter'] text-sm font-bold uppercase tracking-wide text-[#141512]">
                    Lista de Faixas
                  </h2>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/70">
                    {hasTracklist
                      ? `${tracklist.length} faixas listadas`
                      : `${tracks_count} faixas`}
                  </span>
                </div>

                {hasTracklist ? (
                  <ol className="divide-y divide-[#141512]/10">
                    {tracklist.map((track, idx) => (
                      <li
                        key={`track-${track.number || idx}`}
                        className="py-2.5 flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="flex items-baseline gap-3 min-w-0">
                          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512]/55 w-6 shrink-0">
                            {track.number || String(idx + 1).padStart(2, '0')}.
                          </span>
                          <span className="font-['Inter'] text-[#141512] font-medium truncate">
                            {track.title}
                          </span>
                        </div>
                        {track.duration && (
                          <span className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/65 shrink-0">
                            {track.duration}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="font-['Inter'] text-sm text-[#141512]/75">
                    Prensagem física contendo {tracks_count} faixas no total.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#141512]/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-['Anton'] text-2xl sm:text-4xl text-[#141512] uppercase tracking-wide">
              PRODUTOS RELACIONADOS
            </h2>
            <Link
              to={isVinyl ? '/discos' : '/objetos'}
              className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] hover:underline underline-offset-4"
            >
              Ver mais →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3.5 sm:gap-x-6 gap-y-6 sm:gap-y-10">
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
        </section>
      )}

      {/* 4. FULL DESCRIPTION & CHARACTERISTICS SECTION (ALWAYS PRESENT BETWEEN RELATED PRODUCTS AND FOOTER) */}
      <section
        id="descricao-completa"
        className="mt-16 pt-12 pb-6 border-t border-[#141512]/20 scroll-mt-24"
      >
        <h2 className="font-['Anton'] text-2xl sm:text-4xl text-[#141512] uppercase tracking-wide mb-6">
          DESCRIÇÃO E CARACTERÍSTICAS DO PRODUTO
        </h2>

        <div className="rounded-lg bg-[#FFFFFF] border border-[#141512]/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Complete Description */}
          <div className="lg:col-span-7">
            <h3 className="font-['Inter'] text-sm font-bold uppercase tracking-wide text-[#141512] mb-3">
              Descrição completa
            </h3>
            <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/85 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Complete Characteristics Table */}
          <div className="lg:col-span-5">
            <h3 className="font-['Inter'] text-sm font-bold uppercase tracking-wide text-[#141512] mb-3">
              Características principais
            </h3>
            <dl className="divide-y divide-[#141512]/15 border border-[#141512]/15 rounded-lg overflow-hidden bg-[#F4F2E9]/60">
              {characteristics.map((item) => (
                <div
                  key={`full-${item.label}`}
                  className="px-4 py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
                >
                  <dt className="font-['Inter'] font-semibold text-[#141512]/75">
                    {item.label}
                  </dt>
                  <dd className="font-['Inter'] font-medium text-[#141512] text-right">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
