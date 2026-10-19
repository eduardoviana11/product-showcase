import React, { useState } from 'react';
import VinylDisc from '../shapes/VinylDisc';
import Button from './Button';

// Geometric SVG Artwork Covers for the ZUNO catalog
function CoverArtwork({ variant, title, artist }) {
  switch (variant) {
    case 'coastal-bands':
      return (
        <div className="w-full h-full bg-[#1e2e38] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · 001
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          {/* Coastal stripes */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col space-y-1.5 opacity-80">
            <div className="h-6 bg-[#3a586d]" />
            <div className="h-4 bg-[#7697a8]" />
            <div className="h-3 bg-[#C5F43B]" />
            <div className="h-8 bg-[#141512]" />
          </div>
        </div>
      );

    case 'orange-stripes':
      return (
        <div className="w-full h-full bg-[#3d1810] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · 002
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          {/* Psychedelic analog waves */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-[10px] border-[#e65c00] opacity-90 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border-[8px] border-[#f2994a]" />
          </div>
          <div className="absolute left-0 bottom-6 w-16 h-2 bg-[#C5F43B]" />
        </div>
      );

    case 'purple-circle':
      return (
        <div className="w-full h-full bg-[#1b1424] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · 003
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          {/* Deep ambient modular sphere */}
          <div className="absolute right-4 top-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#8a2be2] via-[#4b0082] to-[#141512] border-2 border-[#C5F43B]/60" />
          <div className="font-['IBM_Plex_Mono'] text-[8px] text-[#C5F43B] tracking-wider z-10">
            MODULAR SYNTHESIS · 33⅓ RPM
          </div>
        </div>
      );

    case 'diagonal-split':
      return (
        <div className="w-full h-full bg-[#1a1c18] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="space-y-1 z-10">
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#C5F43B]">
              ZUNO · 004
            </span>
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-none">
              {title}
            </div>
            <div className="font-['Inter'] text-xs text-[#DADCD3] font-medium">
              {artist}
            </div>
          </div>
          {/* Diagonal cut geometric architecture */}
          <div className="absolute inset-0 bg-[#2b2e25] [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
          <div className="absolute bottom-4 right-4 z-10">
            <div className="w-8 h-8 rounded-full bg-[#C5F43B] flex items-center justify-center font-['Anton'] text-xs text-[#141512]">
              JAZZ
            </div>
          </div>
        </div>
      );

    case 'tote-bag':
      return (
        <div className="w-full h-full bg-[#E5DFCE] border border-[#141512]/10 flex flex-col items-center justify-center p-6 text-center relative select-none">
          <div className="w-20 h-24 border-2 border-[#141512] rounded-t-sm flex flex-col justify-end p-2 bg-[#FAF7F0] shadow-sm">
            <div className="w-10 h-10 border-2 border-b-0 border-[#141512] rounded-t-full -mt-14 mx-auto" />
            <span className="font-['Anton'] text-[10px] text-[#141512]">ZUNO</span>
          </div>
          <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#141512] uppercase tracking-wider mt-3 font-semibold">
            EDIÇÃO EM ALGODÃO CRU
          </span>
        </div>
      );

    case 'screenprint-poster':
      return (
        <div className="w-full h-full bg-[#F4F2E9] flex flex-col justify-between p-4 relative overflow-hidden select-none border border-[#141512]/20">
          <div className="font-['Anton'] text-xl leading-none text-[#141512]">
            FREQUÊNCIA<br />COMUM
          </div>
          <div className="w-24 h-24 mx-auto my-auto rounded-full bg-[#C5F43B] border-2 border-[#141512] flex items-center justify-center font-['IBM_Plex_Mono'] text-[9px] font-bold text-[#141512]">
            SERIGRAFIA
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[9px] text-[#141512] border-t border-[#141512]/30 pt-1 flex justify-between">
            <span>TIRAGEM LIMITADA</span>
            <span>2 CORES</span>
          </div>
        </div>
      );

    case 'listening-notebook':
      return (
        <div className="w-full h-full bg-[#20221E] flex flex-col justify-between p-4 relative overflow-hidden select-none">
          <div className="font-['IBM_Plex_Mono'] text-[9px] text-[#C5F43B] uppercase tracking-widest">
            CADERNO 01
          </div>
          <div className="space-y-1">
            <div className="font-['Anton'] text-lg text-[#F4F2E9] tracking-wider leading-tight">
              ENSAIOS &<br />NOTAS DE ESTÚDIO
            </div>
            <div className="h-1 w-12 bg-[#C5F43B]" />
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[8px] text-[#DADCD3]">
            64 PÁGINAS · 2026
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-[#141512] flex flex-col items-center justify-center p-4 text-center select-none">
          <span className="font-['Anton'] text-xl text-[#F4F2E9]">{title}</span>
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

  const {
    name,
    artist,
    description,
    formatted_price,
    specs_meta,
    action_label = 'Ver disco',
    cover_variant = 'coastal-bands',
    delivery,
  } = product;

  return (
    <article
      className="group relative flex flex-col bg-[#F4F2E9] border-2 border-[#141512] transition-all duration-200 hover:shadow-[4px_4px_0px_#141512] overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Geometric Artwork Cover + Sliding Vinyl Record */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#141512] border-b-2 border-[#141512]">
        {/* Sliding Vinyl Record behind the sleeve */}
        {isVinyl && (
          <div
            className={`absolute top-2 bottom-2 right-0 aspect-square transition-transform duration-400 ease-out pointer-events-none vinyl-slide-element ${
              isHovered ? 'translate-x-[26%]' : 'translate-x-[8%]'
            }`}
          >
            <VinylDisc labelText={artist ? artist.split(' ')[0] : 'ZUNO'} />
          </div>
        )}

        {/* Sleeve Cover in the foreground */}
        <div className="absolute inset-0 z-10 shadow-[2px_0px_8px_rgba(0,0,0,0.4)]">
          {product.image && product.image !== 'placeholder.svg' ? (
            <img
              src={product.image}
              alt={`Capa do álbum ${name}`}
              className="w-full h-full object-cover select-none"
              onError={(e) => {
                // Graceful fallback to CoverArtwork if image URL fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <CoverArtwork variant={cover_variant} title={name} artist={artist} />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#F4F2E9]">
        <div>
          {/* Technical Metadata in IBM Plex Mono */}
          {specs_meta && (
            <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#141512]/75 uppercase tracking-[0.06em] font-medium mb-1 line-clamp-1">
              {specs_meta}
            </p>
          )}

          {/* Title in Anton */}
          <h3 className="font-['Anton'] text-xl sm:text-[22px] text-[#141512] uppercase tracking-wide leading-tight mb-1">
            {name}
          </h3>

          {/* Artist in Inter */}
          {artist && (
            <p className="font-['Inter'] text-sm font-semibold text-[#141512]/90 mb-2">
              {artist}
            </p>
          )}

          {/* Description */}
          <p className="font-['Inter'] text-xs text-[#141512]/75 line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>

          {/* Delivery specification rendered polymorphically */}
          {delivery && (
            <div className="font-['IBM_Plex_Mono'] text-[10px] text-[#141512]/60 uppercase tracking-wide mb-3 bg-[#DADCD3]/40 p-1.5 border-l-2 border-[#141512]">
              {delivery}
            </div>
          )}
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-2 border-t border-[#141512]/15 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#141512]/60 uppercase block leading-none">
              VALOR
            </span>
            <span className="font-['IBM_Plex_Mono'] text-base font-bold text-[#141512] tracking-tight">
              {formatted_price}
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onAction && onAction(product)}
            ariaLabel={`${action_label}: ${name}`}
          >
            {action_label}
          </Button>
        </div>
      </div>
    </article>
  );
}
