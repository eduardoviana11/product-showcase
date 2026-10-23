import React from 'react';
import ProductCard from '../components/ui/ProductCard';

export default function Objetos({ sceneObjects = [], onAddToCart }) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          ARTEFATOS E PRODUTOS FÍSICOS · MERCH & EDIÇÕES
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          OBJETOS DA CENA
        </h1>
        <p className="font-['Inter'] text-base text-[#141512]/75 mt-3 max-w-2xl">
          A música também mora fora do disco. Ecobags com serigrafia artesanal, cadernos de escuta e cartazes em tiragem numerada.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sceneObjects.map((obj) => (
          <ProductCard
            key={obj.name}
            product={obj}
            isVinyl={false}
            onAction={onAddToCart}
          />
        ))}
      </div>

      {/* Production & Sustainability Note */}
      <div className="mt-16 bg-[#DADCD3] border-2 border-[#141512] p-8 max-w-3xl">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-widest text-[#141512] block mb-2">
          PRODUÇÃO INDEPENDENTE & CONSCIENTE
        </span>
        <p className="font-['Inter'] text-sm text-[#141512]/85 leading-relaxed">
          Todos os nossos objetos são produzidos em pequenas oficinas locais, utilizando algodão cru, papéis certificados e processos de serigrafia manual. Cada peça carrega o cuidado do fazer artesanal.
        </p>
      </div>
    </div>
  );
}
