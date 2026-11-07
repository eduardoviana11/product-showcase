import React from 'react';
import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../../utils/assets';

/**
 * Exact placeholder slots measured from `hero/hero-background-2.png` (1920x1080):
 * - 5 rectangular/square placeholders (2 red + 3 black) for album covers
 * - 1 black circle placeholder for the custom vinyl disc
 */
const COVER_SLOTS = [
  // 0. Big center-left red square/rectangle (main anchor cover)
  {
    id: 'main-red-square',
    left: '66.12%',
    top: '55.65%',
    width: '17.8%',
    height: '33.0%',
    rotate: '-12.95deg',
    zIndex: 20,
    shadowClasses: '',
  },
  // 1. Top-left black square (tucked behind the top of the main red square)
  {
    id: 'top-left-black-square',
    left: '63.31%',
    top: '37.78%',
    width: '8.90%',
    height: '15.75%',
    rotate: '0deg',
    zIndex: 10,
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 2. Top-right smaller red square (overlapping upper-right of the vinyl circle)
  {
    id: 'top-right-red-square',
    left: '83.70%',
    top: '36.99%',
    width: '8.85%',
    height: '15.25%',
    rotate: '-10.37deg',
    zIndex: 30,
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 3. Bottom-left black square (overlapping bottom-left of the main red square)
  {
    id: 'bottom-left-black-square',
    left: '62.92%',
    top: '74.81%',
    width: '8.50%',
    height: '14.35%',
    rotate: '10.89deg',
    zIndex: 30,
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 4. Bottom-right black square
  {
    id: 'bottom-right-black-square',
    left: '83.70%',
    top: '74.86%',
    width: '8.85%',
    height: '15.25%',
    rotate: '-10.37deg',
    zIndex: 30,
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
];

const VINYL_CIRCLE_SLOT = {
  left: '74.30%',
  top: '52.45%',
  width: '17.65%',
  height: '31.38%',
  zIndex: 15,
};

export default function AlbumCluster({ albums = [] }) {
  // Resolve up to 5 album covers from backend catalog
  const resolvedAlbums = COVER_SLOTS.map((slot, index) => {
    const candidate = albums[index];
    const resolvedCandidateImg = candidate ? resolveAssetUrl(candidate.image) : '';

    if (candidate && resolvedCandidateImg) {
      return {
        ...candidate,
        resolvedImage: resolvedCandidateImg,
      };
    }

    return null;
  });

  // Find a record with a custom vinyl disc image from backend
  const customVinylRecord = albums.find(
    (a) => a && a.vinyl_image && a.vinyl_image.trim()
  );

  const customDiscSrc = customVinylRecord
    ? resolveAssetUrl(customVinylRecord.vinyl_image)
    : '';
  const customDiscScale = Number(customVinylRecord?.vinyl_scale) || 1.18;

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Entire Cluster Clickable Overlay -> navigates to Novidades (/discos?tab=new) */}
      <Link
        to="/discos?tab=new"
        aria-label="Ver novidades em discos"
        style={{
          left: '53.5%',
          top: '19%',
          width: '40.5%',
          height: '73%',
          zIndex: 40,
        }}
        className="absolute pointer-events-auto block cursor-pointer"
      />

      {/* Custom Vinyl Disc over the Black Circle Placeholder */}
      {customDiscSrc && (
        <div
          style={{
            left: VINYL_CIRCLE_SLOT.left,
            top: VINYL_CIRCLE_SLOT.top,
            width: VINYL_CIRCLE_SLOT.width,
            height: VINYL_CIRCLE_SLOT.height,
            zIndex: VINYL_CIRCLE_SLOT.zIndex,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute rounded-full overflow-hidden bg-[#141512] shadow-[8px_8px_20px_4px_rgba(20,21,18,0.75)] pointer-events-none block"
        >
          <img
            src={customDiscSrc}
            alt={customVinylRecord?.name || 'Disco personalizado'}
            style={{ transform: `scale(${customDiscScale})` }}
            className="w-full h-full object-contain select-none pointer-events-none"
          />
        </div>
      )}

      {/* 5 Album Covers over the Red and Black Square Placeholders */}
      {COVER_SLOTS.map((slot, index) => {
        const album = resolvedAlbums[index];
        if (!album || !album.resolvedImage) return null;
        return (
          <div
            key={slot.id}
            style={{
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
              zIndex: slot.zIndex,
              transform: `translate(-50%, -50%) rotate(${slot.rotate})`,
            }}
            className={`absolute overflow-hidden bg-[#141512] border-2 border-[#141512] ${slot.shadowClasses} pointer-events-none block`}
          >
            <img
              src={album.resolvedImage}
              alt={`${album.name} - ${album.artist}`}
              className="w-full h-full object-cover select-none pointer-events-none block"
            />
          </div>
        );
      })}
    </div>
  );
}
