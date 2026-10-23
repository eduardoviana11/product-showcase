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
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 lg:w-42 lg:h-42 rotate-0',
    shadowClasses: 'shadow-[6px_6px_0px_#141512] group-hover:shadow-[8px_8px_0px_#141512]',
  },
  // 2. Top-Left (Smaller, straight/subtle)
  {
    title: 'Acabou Chorare',
    artist: 'Novos Baianos',
    image:
      'https://s2-g1.glbimg.com/6decO-W6pm8HCNM5ZubgXSQidMc=/0x0:1500x1500/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/v/v/sIqlXeTTWdgokE2oJEEA/novosbaianoscapa1972.jpg',
    position: 'top-left',
    containerClasses:
      'absolute top-[4%] left-[4%] z-10 w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 rotate-0',
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
      'absolute top-[3%] right-[4%] z-10 w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 -rotate-8 sm:-rotate-10',
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
      'absolute bottom-[4%] left-[4%] z-10 w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 rotate-8 sm:rotate-10',
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
      'absolute bottom-[3%] right-[4%] z-10 w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 -rotate-8 sm:-rotate-10',
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
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[430px] xl:max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none group">
      {/* Floating editorial badge */}
      <div className="absolute -top-3 sm:-top-5 right-1 sm:right-4 z-40 pointer-events-none">
        <TiltedTape>COLEÇÃO EM DESTAQUE ↗</TiltedTape>
      </div>

      {/* 5-Album Spaced Arrangement */}
      {displayItems.map((album, idx) => (
        <div
          key={album.title + idx}
          className={`${album.containerClasses} transition-all duration-300 group-hover:scale-105 hover:!scale-110 hover:!z-30 hover:rotate-0 cursor-pointer`}
          title={`${album.title} · ${album.artist}`}
        >
          <div
            className={`w-full h-full bg-[#141512] border-2 border-[#141512] ${album.shadowClasses} overflow-hidden`}
          >
            <img
              src={album.image}
              alt={`${album.title} - ${album.artist}`}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
