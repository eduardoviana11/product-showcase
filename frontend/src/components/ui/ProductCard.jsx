import React, { useState } from 'react';
import VinylDisc from '../shapes/VinylDisc';
import { resolveAssetUrl } from '../../utils/assets';

// Clean geometric fallback artworks for when a local or external image is not available
function CoverArtwork({ variant, title, artist }) {
  switch (variant) {
    case 'coastal-bands':
      return (
        <div className="w-full h-full bg-[#1e2e38] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · VINIL
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col space-y-1 opacity-90">
            <div className="h-6 bg-[#3a586d]" />
            <div className="h-4 bg-[#7697a8]" />
            <div className="h-2 bg-[#C5F43B]" />
          </div>
        </div>
      );

    case 'orange-stripes':
      return (
        <div className="w-full h-full bg-[#3d1810] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · VINIL
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full border-[8px] border-[#e65c00] opacity-90 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-[6px] border-[#f2994a]" />
          </div>
        </div>
      );

    case 'purple-circle':
      return (
        <div className="w-full h-full bg-[#1b1424] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · VINIL
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          <div className="absolute right-4 top-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#8a2be2] via-[#4b0082] to-[#141512] border border-[#C5F43B]/60" />
        </div>
      );

    case 'diagonal-split':
      return (
        <div className="w-full h-full bg-[#1a1c18] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · VINIL
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          <div className="absolute inset-0 bg-[#2b2e25] [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
        </div>
      );

    case 'tote-bag':
      return (
        <div className="w-full h-full bg-[#E5DFCE] flex flex-col items-center justify-center p-6 text-center relative select-none">
          <div className="w-16 h-20 border-2 border-[#141512] rounded-t-sm flex flex-col justify-end p-2 bg-[#FAF7F0] shadow-sm">
            <div className="w-8 h-8 border-2 border-b-0 border-[#141512] rounded-t-full -mt-10 mx-auto" />
            <span className="font-['Anton'] text-[9px] text-[#141512]">ZUNO</span>
          </div>
        </div>
      );

    case 'screenprint-poster':
      return (
        <div className="w-full h-full bg-[#F4F2E9] flex flex-col justify-between p-4 relative overflow-hidden select-none border border-[#141512]/15">
          <div className="font-['Anton'] text-lg leading-none text-[#141512]">
            FREQUÊNCIA<br />COMUM
          </div>
          <div className="w-16 h-16 mx-auto my-auto rounded-full bg-[#C5F43B] border border-[#141512] flex items-center justify-center font-['IBM_Plex_Mono'] text-[8px] font-bold text-[#141512]">
            SERIGRAFIA
          </div>
        </div>
      );

    case 'listening-notebook':
      return (
        <div className="w-full h-full bg-[#20221E] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="font-['IBM_Plex_Mono'] text-[8px] text-[#C5F43B] uppercase tracking-widest">
            CADERNO 01
          </div>
          <div className="font-['Anton'] text-base text-[#F4F2E9] tracking-wider leading-tight">
            ENSAIOS &<br />NOTAS
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-[#141512] flex flex-col items-center justify-center p-4 text-center select-none">
          <span className="font-['Anton'] text-lg text-[#F4F2E9]">{title}</span>
          {artist && <span className="font-['Inter'] text-xs text-[#DADCD3] mt-1">{artist}</span>}
        </div>
      );
  }
}

export default function ProductCard({
  product,
  isVinyl = true,
  onAction,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    name,
    artist,
    formatted_price,
    specs_meta,
    category,
    weight_grams,
    action_label = 'Ver disco',
    cover_variant = 'coastal-bands',
    image,
    delivery,
    vinyl_image,
    vinyl_scale = 1.0,
    featured,
    is_new,
  } = product;

  // Build clean subtitle matching the reference image: "Linha d'Água · vinil preto · 180 g"
  let subtitle = '';
  if (isVinyl) {
    const parts = [
      artist,
      category ? category.toLowerCase() : 'vinil preto',
      weight_grams ? `${weight_grams} g` : '180 g',
    ].filter(Boolean);
    subtitle = parts.join(' · ');
  } else {
    subtitle = specs_meta || delivery || (category ? `Objetos · ${category}` : 'Edição ZUNO');
  }

  const resolvedCoverSrc = resolveAssetUrl(image);
  const hasRealImage = Boolean(resolvedCoverSrc) && !imageError;

  return (
    <article
      className="group flex flex-col justify-between transition-all duration-200 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onAction && onAction(product)}
    >
      {/* 1. TOP CONTAINER WITH SOFT NEUTRAL BACKGROUND */}
      <div className="w-full bg-[#E5E6DF] aspect-[1.14/1] p-5 sm:p-6 flex items-center justify-center relative overflow-hidden">
        {/* Store badges */}
        {(is_new || featured) && (
          <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1">
            {is_new && (
              <span className="bg-[#C5F43B] text-[#141512] border border-[#141512] font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-0.5">
                Novo
              </span>
            )}
            {featured && (
              <span className="bg-[#141512] text-[#F4F2E9] border border-[#141512] font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-0.5">
                Destaque
              </span>
            )}
          </div>
        )}
        {/* Cover + Vinyl Sleeve Center Unit */}
        <div className="relative aspect-square w-[64%] max-w-[220px] flex items-center justify-center">
          {/* Sliding Vinyl Record behind the sleeve */}
          {isVinyl && (
            <div
              className={`absolute inset-y-1 right-0 aspect-square transition-transform duration-300 ease-out pointer-events-none z-0 vinyl-slide-element ${
                isHovered ? 'translate-x-[25%]' : 'translate-x-0'
              }`}
            >
              <VinylDisc
                labelText={artist ? artist.split(' ')[0] : 'ZUNO'}
                image={vinyl_image}
                scale={vinyl_scale}
              />
            </div>
          )}

          {/* Sleeve Cover in the foreground */}
          <div
            className={`relative z-10 w-full h-full aspect-square bg-[#141512] shadow-[0px_4px_16px_rgba(0,0,0,0.18)] overflow-hidden border border-black/10 transition-transform duration-300 ease-out ${
              isVinyl ? 'cover-slide-element' : ''
            } ${isVinyl && isHovered ? '-translate-x-[25%]' : 'translate-x-0'}`}
          >
            {hasRealImage ? (
              <img
                src={resolvedCoverSrc}
                alt={`Capa do álbum ${name}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                onError={() => setImageError(true)}
              />
            ) : (
              <CoverArtwork variant={cover_variant} title={name} artist={artist} />
            )}
          </div>
        </div>
      </div>

      {/* 2. CARD CONTENT & METADATA BELOW THE IMAGE BOX */}
      <div className="pt-3.5 pb-1 flex flex-col flex-grow justify-between">
        <div>
          {/* Album Title */}
          <h3 className="font-['Inter'] text-lg sm:text-[19px] font-bold text-[#141512] leading-tight line-clamp-1">
            {name}
          </h3>

          {/* Subtitle / Artist & Specs */}
          <p className="font-['Inter'] text-xs sm:text-[13px] text-[#71736D] mt-1 mb-3.5 line-clamp-1">
            {subtitle}
          </p>
        </div>

        {/* 3. FULL-WIDTH CTA BUTTON WITH HOVER STATE MATCHING REFERENCE IMAGE */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction && onAction(product);
          }}
          className={`w-full py-2.5 sm:py-3 px-4 border border-[#141512] font-['Inter'] text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors duration-150 cursor-pointer ${
            isHovered
              ? 'bg-[#C5F43B] text-[#141512]'
              : 'bg-transparent text-[#141512]'
          }`}
          aria-label={`${isHovered ? 'Adicionar' : action_label}: ${name}`}
        >
          <span>
            {formatted_price} · {isHovered ? 'Adicionar ↗' : `${action_label} ↗`}
          </span>
        </button>
      </div>
    </article>
  );
}
