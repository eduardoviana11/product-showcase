import React, { useState, useEffect } from 'react';
import {
  showcasePromises,
  fallbackVinylRecords,
  fallbackSceneObjects,
  showcaseCollections,
  recordOfTheWeek,
  magazineArticles,
} from './data/showcaseData';
import VinylDisc from './components/shapes/VinylDisc';
import TiltedTape from './components/shapes/TiltedTape';
import PulseMark from './components/shapes/PulseMark';
import OffsetCutout from './components/shapes/OffsetCutout';
import Button from './components/ui/Button';
import ProductCard from './components/ui/ProductCard';

export default function App() {
  const [vinylRecords, setVinylRecords] = useState(fallbackVinylRecords);
  const [sceneObjects, setSceneObjects] = useState(fallbackSceneObjects);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  // Fetch live catalog from Flask API /api/showcase
  useEffect(() => {
    fetch('/api/showcase')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API fetch failed');
      })
      .then((data) => {
        if (data.vinyl_records && data.vinyl_records.length > 0) {
          setVinylRecords(data.vinyl_records);
        }
        if (data.scene_objects && data.scene_objects.length > 0) {
          setSceneObjects(data.scene_objects);
        }
      })
      .catch((err) => {
        console.info('Operating with built-in showcase catalog data:', err.message);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Adicionado à sacola: ${product.name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = ['Todos', 'Canção', 'Psicodelia', 'Eletrônica', 'Jazz'];

  // Filter vinyl records by active category & search query
  const filteredRecords = vinylRecords.filter((record) => {
    const matchesCategory =
      activeCategory === 'Todos' || record.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.artist && record.artist.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Carousel pagination: 4 cards visible on desktop, 1 on mobile
  const visibleCardsCount = 4;
  const maxIndex = Math.max(0, filteredRecords.length - visibleCardsCount);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => setEmailSubscribed(false), 5000);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2E9] text-[#141512] font-['Inter'] selection:bg-[#C5F43B] selection:text-[#141512] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141512] text-[#F4F2E9] border-2 border-[#C5F43B] px-5 py-3 font-['IBM_Plex_Mono'] text-xs font-semibold shadow-[4px_4px_0px_#C5F43B]">
          {toastMessage}
        </div>
      )}

      {/* 1. TOP ACID-GREEN BAR */}
      <section
        className="bg-[#C5F43B] border-b-2 border-[#141512] py-2 px-4 text-center select-none"
        aria-label="Aviso de frete"
      >
        <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
          FRETE GRÁTIS A PARTIR DE R$ 299,00 · DISCOS INDEPENDENTES, NOVAS DESCOBERTAS
        </p>
      </section>

      {/* 2. HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#F4F2E9] border-b-2 border-[#141512]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-['Anton'] text-4xl sm:text-5xl tracking-wider text-[#141512] uppercase leading-none hover:text-black transition-colors"
            >
              ZUNO
            </a>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
              <a
                href="#catalogo"
                className="font-['Inter'] text-sm font-semibold text-[#141512] hover:underline underline-offset-4"
              >
                Novidades
              </a>
              <a
                href="#catalogo"
                className="font-['Inter'] text-sm font-semibold text-[#141512] hover:underline underline-offset-4"
              >
                Discos
              </a>
              <a
                href="#colecoes"
                className="font-['Inter'] text-sm font-semibold text-[#141512] hover:underline underline-offset-4"
              >
                Coleções
              </a>
              <a
                href="#objetos"
                className="font-['Inter'] text-sm font-semibold text-[#141512] hover:underline underline-offset-4"
              >
                Objetos
              </a>
              <a
                href="#revista"
                className="font-['Inter'] text-sm font-semibold text-[#141512] hover:underline underline-offset-4"
              >
                Revista
              </a>
            </nav>
          </div>

          {/* Search & Bag Controls */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <label htmlFor="search-input" className="sr-only">
                Buscar discos ou artistas
              </label>
              <input
                id="search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR DISCO..."
                className="w-44 lg:w-56 bg-transparent border-2 border-[#141512] px-3 py-1.5 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#141512] placeholder-[#141512]/50 focus:bg-white"
              />
            </div>

            {/* Sacola Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setToastMessage(`Sacola: ${cartCount} itens adicionados.`);
                setTimeout(() => setToastMessage(''), 3000);
              }}
              ariaLabel={`Sacola de compras com ${cartCount} itens`}
            >
              SACOLA ({cartCount})
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="border-b-2 border-[#141512] bg-[#F4F2E9] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.1em] mb-4 bg-[#DADCD3] px-2.5 py-1 border border-[#141512]">
              INDEPENDENTE POR NATUREZA
            </span>

            <h1 className="font-['Anton'] text-[64px] sm:text-[90px] lg:text-[130px] xl:text-[145px] text-[#141512] uppercase leading-[0.92] tracking-normal mb-6">
              NÃO É SÓ<br />UM DISCO.
            </h1>

            <p className="font-['Inter'] text-base sm:text-lg lg:text-xl text-[#141512]/85 max-w-xl leading-relaxed mb-8 font-normal">
              É o encontro que muda a sua escuta. Vinis, objetos e histórias de uma
              cena que não para de inventar.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explorar os discos
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  document.getElementById('colecoes')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Nossa curadoria
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Artwork with Sliding Vinyl & Tape */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pr-6 pt-4 pb-8">
            <div className="relative w-64 sm:w-80 md:w-96 aspect-square">
              {/* Tilted tape label */}
              <div className="absolute -top-4 -left-4 z-30">
                <TiltedTape>EDIÇÃO LIMITADA</TiltedTape>
              </div>

              {/* Offset Cutout green block + Album sleeve */}
              <OffsetCutout className="w-full h-full">
                <div className="relative w-full h-full bg-[#141512] border-2 border-[#141512] shadow-2xl">
                  {/* Sliding Vinyl Record peeking out */}
                  <div className="absolute top-2 bottom-2 right-0 aspect-square translate-x-[36%] z-0">
                    <VinylDisc labelText="ZUNO 01" />
                  </div>

                  {/* Album Cover Artwork */}
                  <div className="relative z-10 w-full h-full bg-[#1e2e38] p-6 flex flex-col justify-between border-r border-[#141512]">
                    <div className="space-y-1">
                      <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#C5F43B] uppercase tracking-widest">
                        CATÁLOGO DE ESTREIA · 2026
                      </span>
                      <div className="font-['Anton'] text-3xl sm:text-4xl text-[#F4F2E9] uppercase leading-none">
                        DEPOIS DA CHUVA
                      </div>
                      <div className="font-['Inter'] text-sm text-[#DADCD3] font-medium">
                        Clara Breu
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-6 bg-[#3a586d]" />
                      <div className="h-4 bg-[#7697a8]" />
                      <div className="h-2 bg-[#C5F43B]" />
                      <div className="font-['IBM_Plex_Mono'] text-[9px] text-[#F4F2E9]/70 pt-2 uppercase">
                        PRENSAGEM EM 180G · 33⅓ RPM
                      </div>
                    </div>
                  </div>
                </div>
              </OffsetCutout>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLACK PROMISE STRIP */}
      <section
        className="bg-[#141512] text-[#F4F2E9] border-b-2 border-[#141512] py-8 px-6 sm:px-12 lg:px-16"
        aria-label="Compromissos ZUNO"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcasePromises.map((promise, idx) => (
            <div
              key={idx}
              className="border-l-2 border-[#C5F43B] pl-4 flex flex-col justify-center"
            >
              <h3 className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-[0.08em] font-semibold text-[#F4F2E9] mb-1">
                {promise.title}
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#DADCD3]/80 leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CATALOG SECTION */}
      <section id="catalogo" className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          {/* Header & Filter Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-[#141512]">
            <div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                GARIMPO FRESCO · EDIÇÕES DE 2026
              </span>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
                CHEGOU. É PRA OUVIR.
              </h2>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtro de gêneros">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCarouselIndex(0);
                    }}
                    role="tab"
                    aria-selected={isActive}
                    className={`font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider px-4 py-2 border-2 border-[#141512] transition-colors cursor-pointer ${isActive
                        ? 'bg-[#141512] text-[#F4F2E9]'
                        : 'bg-transparent text-[#141512] hover:bg-[#DADCD3]'
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Navigation Indicator & Controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.08em] text-[#141512]">
              {filteredRecords.length > 0
                ? `${String(carouselIndex + 1).padStart(2, '0')} A ${String(
                  Math.min(carouselIndex + visibleCardsCount, filteredRecords.length)
                ).padStart(2, '0')} DE ${String(filteredRecords.length).padStart(2, '0')} DISCOS`
                : 'NENHUM DISCO ENCONTRADO'}
            </span>

            {/* Functional Circular Carousel Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="circular"
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                ariaLabel="Ver discos anteriores"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Button>

              <Button
                variant="circular"
                onClick={handleNext}
                disabled={carouselIndex >= maxIndex}
                ariaLabel="Ver próximos discos"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Horizontal Product Grid / Carousel */}
          {filteredRecords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRecords
                .slice(carouselIndex, carouselIndex + visibleCardsCount)
                .map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    isVinyl={true}
                    onAction={handleAddToCart}
                  />
                ))}
            </div>
          ) : (
            <div className="py-16 text-center border-2 border-dashed border-[#141512] p-8">
              <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]">
                Nenhum título encontrado com este filtro.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setActiveCategory('Todos');
                  setSearchQuery('');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. COLLECTIONS SECTION */}
      <section id="colecoes" className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 pb-6 border-b-2 border-[#141512]">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
              NÃO É UM GÊNERO, É UM PONTO DE PARTIDA.
            </span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
              SIGA A SUA CURIOSIDADE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCollections.map((col) => (
              <OffsetCutout
                key={col.id}
                className="h-full"
                cutoutColor={col.accent === '#C5F43B' ? 'bg-[#C5F43B]' : 'bg-[#DADCD3]'}
              >
                <div className="bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] p-6 h-full flex flex-col justify-between hover:bg-[#1a1c18] transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest text-[#C5F43B] font-semibold">
                        {col.tag}
                      </span>
                      <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-[#DADCD3]">
                        {col.count}
                      </span>
                    </div>

                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide mb-3 leading-tight text-[#F4F2E9]">
                      {col.title}
                    </h3>

                    <p className="font-['Inter'] text-sm text-[#DADCD3] leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#F4F2E9]/20 mt-8 flex justify-between items-center">
                    <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#C5F43B] uppercase tracking-wider">
                      EXPLORAR SELEÇÃO
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-lg font-bold text-[#C5F43B]">
                      →
                    </span>
                  </div>
                </div>
              </OffsetCutout>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECORD OF THE WEEK (DARK CONTRAST SECTION) */}
      <section className="bg-[#141512] text-[#F4F2E9] border-b-2 border-[#141512] py-20 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Album Cover Artwork */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-72 sm:w-88 md:w-96 aspect-square">
              {/* PulseMark accent */}
              <div className="absolute -top-6 -left-6 z-20">
                <PulseMark color="acid" size={34} />
              </div>

              {/* Tilted Tape */}
              <div className="absolute -bottom-4 left-6 z-30">
                <TiltedTape>{recordOfTheWeek.badge}</TiltedTape>
              </div>

              <div className="relative w-full h-full bg-[#1b262c] border-2 border-[#C5F43B] shadow-[8px_8px_0px_rgba(197,244,59,0.3)]">
                {/* Protruding vinyl disc */}
                <div className="absolute top-3 bottom-3 right-0 aspect-square translate-x-[34%] z-0">
                  <VinylDisc labelText="MARÉ" />
                </div>

                {/* Album Cover Front */}
                <div className="relative z-10 w-full h-full bg-[#1a252c] p-6 sm:p-8 flex flex-col justify-between border-r border-[#C5F43B]/30">
                  <div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#C5F43B] uppercase tracking-widest block mb-2">
                      ZUNO DESTAQUE · SEMANA 42
                    </span>
                    <h3 className="font-['Anton'] text-4xl sm:text-5xl text-[#F4F2E9] uppercase leading-none">
                      {recordOfTheWeek.title}
                    </h3>
                    <p className="font-['Inter'] text-base text-[#DADCD3] font-medium mt-1">
                      {recordOfTheWeek.artist}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-8 bg-[#2d404d]" />
                    <div className="h-4 bg-[#415b6d]" />
                    <div className="h-2 bg-[#C5F43B]" />
                    <p className="font-['IBM_Plex_Mono'] text-[9px] text-[#DADCD3]/70 pt-2 uppercase">
                      EDIÇÃO ESPECIAL NUMERADA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Record Description & Specs */}
          <div className="lg:col-span-6 flex flex-col items-start lg:pl-6">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#C5F43B] uppercase tracking-[0.1em] mb-3">
              {recordOfTheWeek.kicker}
            </span>

            <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#F4F2E9] uppercase tracking-wide leading-tight mb-4">
              {recordOfTheWeek.title}
            </h2>

            <p className="font-['Inter'] text-lg font-semibold text-[#DADCD3] mb-4">
              {recordOfTheWeek.artist}
            </p>

            <p className="font-['Inter'] text-base text-[#DADCD3]/85 leading-relaxed mb-6 max-w-xl">
              {recordOfTheWeek.description}
            </p>

            {/* Technical Metadata Specs */}
            <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#F4F2E9] bg-[#22241F] border-l-4 border-[#C5F43B] py-2 px-4 mb-8">
              {recordOfTheWeek.specs}
            </div>

            {/* Price & Purchase Button */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#DADCD3]/60 uppercase block">
                  VALOR DE LANÇAMENTO
                </span>
                <span className="font-['IBM_Plex_Mono'] text-2xl font-bold text-[#C5F43B]">
                  {recordOfTheWeek.price}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  handleAddToCart({
                    name: recordOfTheWeek.title,
                    formatted_price: recordOfTheWeek.price,
                  })
                }
              >
                {recordOfTheWeek.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SCENE OBJECTS SECTION */}
      <section id="objetos" className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 pb-6 border-b-2 border-[#141512]">
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
              A MÚSICA TAMBÉM MORA FORA DO DISCO
            </span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
              PRA LEVAR A CENA JUNTO.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sceneObjects.map((obj) => (
              <ProductCard
                key={obj.name}
                product={obj}
                isVinyl={false}
                onAction={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. MAGAZINE SECTION */}
      <section id="revista" className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-start justify-between mb-10 pb-6 border-b-2 border-[#141512]">
            <div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                REVISTA · HISTÓRIAS PARA AMPLIAR A ESCUTA
              </span>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
                TEM MAIS ENTRE OS SULCOS.
              </h2>
            </div>
            {/* Exactly 1 PulseMark in the section header per spec */}
            <PulseMark color="dark" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {magazineArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#F4F2E9] border-2 border-[#141512] p-6 flex flex-col justify-between hover:shadow-[4px_4px_0px_#141512] transition-all"
              >
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512]/75 uppercase tracking-wider block mb-3">
                    {article.kicker}
                  </span>

                  <h3 className="font-['Anton'] text-2xl uppercase tracking-wide text-[#141512] leading-tight mb-2">
                    {article.title}
                  </h3>

                  <p className="font-['Inter'] text-xs font-semibold text-[#141512]/80 mb-3">
                    {article.author}
                  </p>

                  <p className="font-['Inter'] text-sm text-[#141512]/75 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#141512]/15 mt-6">
                  <a
                    href="#revista"
                    className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#141512] uppercase tracking-wider hover:underline"
                  >
                    LER MATÉRIA COMPLETA →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER BLOCK (ACID GREEN BACKGROUND) */}
      <section className="bg-[#C5F43B] text-[#141512] border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 select-none">
        <div className="max-w-[1440px] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.1em] text-[#141512] mb-3">
            CARTA DA ESTANTE · SEM RUÍDO, SÓ DESCOBERTA
          </span>

          <h2 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide leading-tight mb-4 text-[#141512]">
            SEU PRÓXIMO DISCO PODE COMEÇAR AQUI.
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg text-[#141512]/90 max-w-xl leading-relaxed mb-8">
            Novos discos, pequenas tiragens e leituras escolhidas. Uma carta a cada
            quinze dias, no seu tempo.
          </p>

          {emailSubscribed ? (
            <div className="bg-[#141512] text-[#F4F2E9] px-6 py-4 font-['IBM_Plex_Mono'] text-sm uppercase tracking-wide border-2 border-[#141512]">
              ✓ Inscrição confirmada! Boas descobertas na sua caixa de entrada.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <div className="flex-grow text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  SEU E-MAIL
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="voce@exemplo.com.br"
                  className="w-full bg-[#F4F2E9] text-[#141512] border-2 border-[#141512] px-4 py-3 font-['IBM_Plex_Mono'] text-xs placeholder-[#141512]/50 focus:bg-white"
                />
              </div>

              <Button variant="dark" size="md" type="submit" className="whitespace-nowrap">
                Quero receber
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#141512] text-[#F4F2E9] py-16 px-6 sm:px-12 lg:px-16 mt-auto">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-[#F4F2E9]/20">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="font-['Anton'] text-4xl text-[#F4F2E9] tracking-wider uppercase mb-3">
              ZUNO
            </h3>
            <p className="font-['Inter'] text-sm text-[#DADCD3]/80 max-w-sm leading-relaxed mb-6">
              Uma loja independente para quem nunca termina de descobrir música.
            </p>
            <div className="font-['IBM_Plex_Mono'] text-[11px] text-[#C5F43B] uppercase tracking-wider">
              FORTALEZA · BRASIL · 2026
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 font-['Inter'] text-sm text-[#DADCD3]/80">
              <li><a href="#catalogo" className="hover:text-[#C5F43B]">Todos os discos</a></li>
              <li><a href="#catalogo" className="hover:text-[#C5F43B]">Novidades</a></li>
              <li><a href="#colecoes" className="hover:text-[#C5F43B]">Coleções</a></li>
              <li><a href="#objetos" className="hover:text-[#C5F43B]">Objetos da cena</a></li>
              <li><a href="#revista" className="hover:text-[#C5F43B]">Revista</a></li>
            </ul>
          </div>

          {/* Conte com a gente */}
          <div>
            <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
              CONTE COM A GENTE
            </h4>
            <ul className="space-y-2.5 font-['Inter'] text-sm text-[#DADCD3]/80">
              <li><a href="#" className="hover:text-[#C5F43B]">Entrega e frete</a></li>
              <li><a href="#" className="hover:text-[#C5F43B]">Trocas e devoluções</a></li>
              <li><a href="#" className="hover:text-[#C5F43B]">Fale com a loja</a></li>
            </ul>
          </div>

          {/* A cena continua */}
          <div>
            <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
              A CENA CONTINUA
            </h4>
            <div className="space-y-2.5 font-['IBM_Plex_Mono'] text-xs text-[#DADCD3]/80 leading-relaxed">
              <p className="text-[#C5F43B]">contato@zuno.com.br</p>
              <p>PIX e cartão em até 3x sem juros</p>
              <p>Seg a Sex · 10h às 18h</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['IBM_Plex_Mono'] text-[11px] text-[#DADCD3]/60">
          <p>© 2026 ZUNO DISCOS · TODOS OS DIREITOS RESERVADOS</p>
          <p>EDITORIAL ÁCIDO COM FORMAS DE CORTE</p>
        </div>
      </footer>
    </div>
  );
}
