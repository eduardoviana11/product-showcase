import React from 'react';
import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../../utils/assets';

const DEFAULT_ALBUMS = [
  {
    id: 'bewitched-the-goddess-edition',
    name: 'Bewitched: The Goddess Edition',
    artist: 'Laufey',
    image:
      'https://cdn-images.dzcdn.net/images/cover/d24bc027d049dca1591200130a54dd8f/500x500-000000-80-0-0.jpg',
    vinyl_image: 'laufey-disc.png',
    vinyl_scale: 1.13,
  },
  {
    id: 'acabou-chorare',
    name: 'ACABOU CHORARE',
    artist: 'Novos Baianos',
    image:
      'https://s2-g1.glbimg.com/6decO-W6pm8HCNM5ZubgXSQidMc=/0x0:1500x1500/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/v/v/sIqlXeTTWdgokE2oJEEA/novosbaianoscapa1972.jpg',
  },
  {
    id: 'igor',
    name: 'Igor',
    artist: 'Tyler, the Creator',
    image:
      'https://media.pitchfork.com/photos/6454f9ce60430f8f9be0fb09/1:1/w_320,c_limit/Tyler-the-Creator-Igor.jpg',
  },
  {
    id: 'bad-remastered',
    name: 'Bad (Remastered)',
    artist: 'Michael Jackson',
    image:
      'https://cdn-images.dzcdn.net/images/cover/cad261eafd0c6c15811200d5039b5b50/500x500-000000-80-0-0.jpg',
  },
  {
    id: 'clube-da-esquina',
    name: 'CLUBE DA ESQUINA',
    artist: 'Milton Nascimento & Lô Borges',
    image:
      'https://media.pitchfork.com/photos/5b894e5ddb74e05a6446ffd1/1:1/w_320,c_limit/clube%20da%20esquina.jpg%20.jpg',
  },
];

/**
 * Exact placeholder slots measured from `hero-background-2.png` (1920x1080):
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
  // Resolve the 5 album covers from catalog or fallback defaults
  const resolvedAlbums = COVER_SLOTS.map((slot, index) => {
    const candidate = albums[index];
    const fallback = DEFAULT_ALBUMS[index] || DEFAULT_ALBUMS[0];
    const resolvedCandidateImg = candidate ? resolveAssetUrl(candidate.image) : '';

    if (candidate && resolvedCandidateImg) {
      return {
        ...candidate,
        resolvedImage: resolvedCandidateImg,
      };
    }

    return {
      ...fallback,
      resolvedImage: fallback.image,
    };
  });

  // Find a record with a custom vinyl disc image (e.g. Laufey's laufey-disc.png)
  const customVinylRecord =
    albums.find((a) => a && a.vinyl_image && a.vinyl_image.trim()) ||
    DEFAULT_ALBUMS[0];

  const customDiscSrc =
    resolveAssetUrl(customVinylRecord?.vinyl_image) || '/images/laufey-disc.png';
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
          onError={(e) => {
            if (!e.currentTarget.src.endsWith('/images/laufey-disc.png')) {
              e.currentTarget.src = '/images/laufey-disc.png';
            }
          }}
          style={{ transform: `scale(${customDiscScale})` }}
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* 5 Album Covers over the Red and Black Square Placeholders */}
      {COVER_SLOTS.map((slot, index) => {
        const album = resolvedAlbums[index];
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
