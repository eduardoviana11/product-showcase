import React from 'react';
import TiltedTape from '../shapes/TiltedTape';

const DEFAULT_FEATURED = [
  // 1. Center Album (Anchor)
  {
    title: 'Clube da Esquina',
    artist: 'Milton & Lô Borges',
    image:
      'https://media.pitchfork.com/photos/5b894e5ddb74e05a6446ffd1/1:1/w_320,c_limit/clube%20da%20esquina.jpg%20.jpg',
    position: 'center',
    containerClasses:
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 sm:w-38 sm:h-38 md:w-42 md:h-42 lg:w-46 lg:h-46 xl:w-50 xl:h-50 rotate-0',
    shadowClasses: 'shadow-[6px_6px_0px_#141512]',
  },
  // 2. Top-Left (Smaller, straight/subtle)
  {
    title: 'Acabou Chorare',
    artist: 'Novos Baianos',
    image:
      'https://s2-g1.glbimg.com/6decO-W6pm8HCNM5ZubgXSQidMc=/0x0:1500x1500/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/v/v/sIqlXeTTWdgokE2oJEEA/novosbaianoscapa1972.jpg',
    position: 'top-left',
    containerClasses:
      'absolute top-[4%] left-[4%] z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-34 xl:h-34 rotate-0',
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 3. Top-Right (Tilted counter-clockwise)
  {
    title: 'Igor',
    artist: 'Tyler, the Creator',
    image:
      'https://media.pitchfork.com/photos/6454f9ce60430f8f9be0fb09/1:1/w_320,c_limit/Tyler-the-Creator-Igor.jpg',
    position: 'top-right',
    containerClasses:
      'absolute top-[3%] right-[4%] z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-34 xl:h-34 -rotate-8 sm:-rotate-10',
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 4. Bottom-Left (Tilted clockwise)
  {
    title: 'Bad',
    artist: 'Michael Jackson',
    image:
      'https://cdn-images.dzcdn.net/images/cover/cad261eafd0c6c15811200d5039b5b50/500x500-000000-80-0-0.jpg',
    position: 'bottom-left',
    containerClasses:
      'absolute bottom-[4%] left-[4%] z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-34 xl:h-34 rotate-8 sm:rotate-10',
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
  // 5. Bottom-Right (Tilted counter-clockwise)
  {
    title: 'Bewitched',
    artist: 'Laufey',
    image:
      'https://cdn-images.dzcdn.net/images/cover/d24bc027d049dca1591200130a54dd8f/500x500-000000-80-0-0.jpg',
    position: 'bottom-right',
    containerClasses:
      'absolute bottom-[3%] right-[4%] z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-34 xl:h-34 -rotate-8 sm:-rotate-10',
    shadowClasses: 'shadow-[4px_4px_0px_#141512]',
  },
];

export default function AlbumCluster({ albums = [] }) {
  // Merge prop albums if available and valid image, otherwise use curated defaults
  const displayItems = DEFAULT_FEATURED.map((item, index) => {
    const propAlbum = albums[index];
    if (propAlbum && propAlbum.image && propAlbum.image !== 'placeholder.svg') {
      return {
        ...item,
        title: propAlbum.name || propAlbum.title || item.title,
        artist: propAlbum.artist || item.artist,
        image: propAlbum.image || item.image,
      };
    }
    return item;
  });

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]">
      {/* Floating editorial badge */}
      <div className="absolute -top-4 sm:-top-5 right-2 sm:right-5 z-40 pointer-events-none">
        <TiltedTape>COLEÇÃO EM DESTAQUE ↗</TiltedTape>
      </div>

      {/* 5-Album Spaced Arrangement */}
      {displayItems.map((album, idx) => (
        <div
          key={`cluster-slot-${idx}`}
          className={`${album.containerClasses} [transform:translateZ(0)] [backface-visibility:hidden]`}
          title={`${album.title} · ${album.artist}`}
        >
          <div
            className={`w-full h-full bg-[#141512] border-2 border-[#141512] ${album.shadowClasses} overflow-hidden`}
          >
            <img
              src={album.image}
              alt={`${album.title} - ${album.artist}`}
              className="w-full h-full object-cover select-none pointer-events-none [backface-visibility:hidden] [transform:translateZ(0)]"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
