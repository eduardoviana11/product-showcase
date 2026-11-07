import React from 'react';
import { Link } from 'react-router-dom';
import AlbumCluster from '../components/hero/AlbumCluster';
import Carousel from '../components/ui/Carousel';
import ProductCard from '../components/ui/ProductCard';
import OffsetCutout from '../components/shapes/OffsetCutout';
import PulseMark from '../components/shapes/PulseMark';
import TiltedTape from '../components/shapes/TiltedTape';
import VinylDisc from '../components/shapes/VinylDisc';
import Button from '../components/ui/Button';
import {
  recordOfTheWeek,
  magazineArticles,
} from '../data/showcaseData';

export default function Home({
  vinylRecords = [],
  sceneObjects = [],
  collections = [],
  onAddToCart,
}) {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION WITH CANVA COLLAGE BACKGROUND & DYNAMIC PLACEHOLDERS */}
      <section className="relative border-b-2 border-[#141512] bg-[#F4F2E9] overflow-hidden lg:h-[calc(100vh-114px)] lg:min-h-[560px]">
        {/* Desktop Single-Screen Hero (1920x1080 background tucked behind navbar & shipping bar) */}
        <div className="hidden lg:block relative w-full h-full">
          {/* Left torn paper layer anchored to the left edge and pulled behind the 114px header */}
          <div
            className="absolute left-0 -top-[114px] h-[100vh] min-h-[674px] aspect-[16/9] pointer-events-none select-none z-0"
            style={{ clipPath: 'inset(0 75% 0 0)' }}
          >
            <img
              src="/images/hero/hero-background-2.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-fill"
            />
          </div>

          {/* Right collage & dynamic placeholders anchored to the right edge and pulled behind the 114px header */}
          <div
            className="absolute right-0 -top-[114px] h-[100vh] min-h-[674px] aspect-[16/9] z-10"
            style={{ clipPath: 'inset(0 0 0 45%)' }}
          >
            <img
              src="/images/hero/hero-background-2.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none z-0"
            />
            <AlbumCluster albums={vinylRecords} />
          </div>

          {/* Hero Text Column (Vertically centered in the visible single-screen hero area) */}
          <div className="relative z-30 h-full w-full flex items-center pointer-events-none">
            <div
              className="pl-[10.5%] pr-6 w-[52%] flex flex-col items-start animate-slide-up opacity-0 pointer-events-auto"
              style={{ animationFillMode: 'forwards' }}
            >
              <h1 className="font-['Anton'] text-[clamp(2.5rem,4.9vw,5.6rem)] text-[#141512] uppercase leading-[1.04] tracking-normal mb-4 xl:mb-5">
                O SEU PRÓXIMO
                <br /> DISCO FAVORITO
                <br /> ESTÁ AQUI
              </h1>

              <p className="font-['Inter'] text-sm xl:text-base text-[#141512]/85 max-w-lg leading-relaxed mb-5 xl:mb-6 font-normal">
                Das edições clássicas que moldaram gerações aos lançamentos que você precisa conhecer hoje.
                Explore o acervo e leve a música além dos fones de ouvido.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/discos"
                  className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs xl:text-sm font-semibold px-6 xl:px-7 py-2.5 xl:py-3 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] active:translate-x-0.5 active:translate-y-0.5 transition-all select-none"
                >
                  Explorar os discos
                </Link>

                <Link
                  to="/colecoes"
                  className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs xl:text-sm font-semibold px-6 xl:px-7 py-2.5 xl:py-3 bg-[#F4F2E9]/90 text-[#141512] border-2 border-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] hover:shadow-[3px_3px_0px_#141512] transition-all select-none"
                >
                  novas coleções
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Stacked Hero (Preserves exact 16:9 placeholder alignment) */}
        <div className="lg:hidden flex flex-col">
          <div className="px-6 sm:px-12 pt-8 pb-4 flex flex-col items-start">
            <h1 className="font-['Anton'] text-[44px] sm:text-[62px] md:text-[72px] text-[#141512] uppercase leading-[1.05] tracking-normal mb-4 sm:mb-5">
              O SEU PRÓXIMO
              <br className="hidden sm:inline" /> DISCO FAVORITO
              <br className="hidden sm:inline" /> ESTÁ AQUI
            </h1>

            <p className="font-['Inter'] text-sm sm:text-base text-[#141512]/85 max-w-lg leading-relaxed mb-5 font-normal">
              Das edições clássicas que moldaram gerações aos lançamentos que você precisa conhecer hoje.
              Explore o acervo e leve a música além dos fones de ouvido.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/discos"
                className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs sm:text-sm font-semibold px-6 sm:px-7 py-2.5 sm:py-3 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] transition-all select-none"
              >
                Explorar os discos
              </Link>

              <Link
                to="/colecoes"
                className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs sm:text-sm font-semibold px-6 sm:px-7 py-2.5 sm:py-3 bg-transparent text-[#141512] border-2 border-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] transition-all select-none"
              >
                novas coleções
              </Link>
            </div>
          </div>

          {/* Cropped Right-Half View of the 16:9 Hero Canvas for Mobile/Tablet */}
          <div className="relative w-full overflow-hidden pb-4">
            <div className="relative w-[195%] -ml-[92%] aspect-[16/9]">
              <img
                src="/images/hero/hero-background-2.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none z-0"
              />
              <AlbumCluster albums={vinylRecords} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-ITEM CAROUSEL SECTION */}
      <section className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <Carousel
            title="CHEGOU. É PRA OUVIR."
            subtitle="GARIMPO FRESCO - EDIÇÕES EM DESTAQUE"
            items={vinylRecords}
            rightAction={
              <Link
                to="/discos"
                className="hidden sm:inline-flex items-center font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] hover:underline underline-offset-4 ml-4"
              >
                Ver todos os discos →
              </Link>
            }
            renderItem={(record) => (
              <ProductCard
                product={record}
                isVinyl={true}
                onAction={onAddToCart}
              />
            )}
          />

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/discos"
              className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] underline underline-offset-4"
            >
              Ver todos os discos →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. COLLECTIONS SECTION */}
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
            {collections.map((col) => (
              <OffsetCutout
                key={col.id}
                className="h-full"
                cutoutColor={col.accent === '#C5F43B' ? 'bg-[#C5F43B]' : 'bg-[#DADCD3]'}
              >
                <div className="bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] p-6 h-full flex flex-col justify-between hover:bg-[#1a1c18] transition-colors">
                  <div>
                    <div className="flex items-center justify-end mb-6">
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
                    <Link
                      to={`/colecoes#${col.id}`}
                      className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#C5F43B] uppercase tracking-wider hover:underline"
                    >
                      EXPLORAR SELEÇÃO →
                    </Link>
                  </div>
                </div>
              </OffsetCutout>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECORD OF THE WEEK */}
      <section className="bg-[#141512] text-[#F4F2E9] border-b-2 border-[#141512] py-20 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-72 sm:w-88 md:w-96 aspect-square">
              <div className="absolute -top-6 -left-6 z-20">
                <PulseMark color="acid" size={34} />
              </div>
              <div className="absolute -bottom-4 left-6 z-30">
                <TiltedTape>{recordOfTheWeek.badge}</TiltedTape>
              </div>

              <div className="relative w-full h-full bg-[#1b262c] border-2 border-[#C5F43B] shadow-[8px_8px_0px_rgba(197,244,59,0.3)]">
                <div className="absolute top-3 bottom-3 right-0 aspect-square translate-x-[34%] z-0">
                  <VinylDisc labelText="MARÉ" />
                </div>

                <div className="relative z-10 w-full h-full bg-[#1a252c] p-6 sm:p-8 flex flex-col justify-between border-r border-[#C5F43B]/30">
                  <div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#C5F43B] uppercase tracking-widest block mb-2">
                      ZUNO DESTAQUE - SEMANA 42
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

            <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#F4F2E9] bg-[#22241F] border-l-4 border-[#C5F43B] py-2 px-4 mb-8">
              {recordOfTheWeek.specs}
            </div>

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
                  onAddToCart({
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

      {/* 5. SCENE OBJECTS PREVIEW */}
      <section className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-[#141512]">
            <div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                A MÚSICA TAMBÉM MORA FORA DO DISCO
              </span>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
                PRA LEVAR A CENA JUNTO.
              </h2>
            </div>
            <Link
              to="/objetos"
              className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-[#141512] hover:underline underline-offset-4"
            >
              Ver todos os objetos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sceneObjects.slice(0, 3).map((obj) => (
              <ProductCard
                key={obj.name}
                product={obj}
                isVinyl={false}
                onAction={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. MAGAZINE SECTION */}
      <section className="border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 bg-[#F4F2E9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-start justify-between mb-10 pb-6 border-b-2 border-[#141512]">
            <div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
                REVISTA - HISTÓRIAS PARA AMPLIAR A ESCUTA
              </span>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl text-[#141512] uppercase tracking-wide leading-none">
                TEM MAIS ENTRE OS SULCOS.
              </h2>
            </div>
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
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#141512] uppercase tracking-wider hover:underline cursor-pointer">
                    LER MATÉRIA COMPLETA →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER BANNER (TEASER TO /newsletter) */}
      <section className="bg-[#C5F43B] text-[#141512] border-b-2 border-[#141512] py-16 px-6 sm:px-12 lg:px-16 select-none">
        <div className="max-w-[1440px] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.1em] text-[#141512] mb-3">
            CARTA DA ESTANTE - ASSINATURA EDITORIAL
          </span>

          <h2 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide leading-tight mb-4 text-[#141512]">
            SEU PRÓXIMO DISCO PODE COMEÇAR AQUI.
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg text-[#141512]/90 max-w-xl leading-relaxed mb-8">
            Ensaios inéditos, primeiras prensagens reservadas e curadoria musical sem ruído, direto na sua caixa de entrada.
          </p>

          <Link
            to="/newsletter"
            className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold px-7 py-3.5 bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] hover:bg-[#252722] hover:shadow-[3px_3px_0px_#141512] transition-all"
          >
            Conhecer os planos da Carta da Estante →
          </Link>
        </div>
      </section>
    </div>
  );
}
