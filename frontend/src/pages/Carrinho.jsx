import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { CoverArtwork } from '../components/ui/ProductCard';
import { resolveAssetUrl } from '../utils/assets';
import {
  getProductId,
  getCreatorName,
  getCreatorHref,
} from '../utils/slug';

const MAX_QUANTITY = 99;

function formatBRL(value) {
  return `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;
}

function CartThumb({ product }) {
  const [imageError, setImageError] = useState(false);
  const src = resolveAssetUrl(product.image);
  const hasImage = Boolean(src) && !imageError;

  return (
    <div className="w-24 sm:w-28 aspect-square bg-[#141512] border border-black/10 overflow-hidden shrink-0">
      {hasImage ? (
        <img
          src={src}
          alt={`Capa de ${product.name}`}
          className="w-full h-full object-cover select-none pointer-events-none"
          onError={() => setImageError(true)}
        />
      ) : (
        <CoverArtwork
          variant={product.cover_variant}
          title={product.name}
          artist={product.artist}
        />
      )}
    </div>
  );
}

export default function Carrinho({
  cartItems = [],
  onChangeQuantity,
  onRemoveItem,
}) {
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          SUA SELEÇÃO ATÉ AGORA
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          CARRINHO
        </h1>
        <p className="font-['Inter'] text-base text-[#141512]/75 mt-3 max-w-2xl">
          {totalUnits === 0
            ? 'Você ainda não adicionou nenhum item.'
            : `${totalUnits} ${totalUnits === 1 ? 'item' : 'itens'} no carrinho.`}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="border-2 border-[#141512] bg-[#FFFFFF] p-10 text-center">
          <p className="font-['IBM_Plex_Mono'] text-sm uppercase text-[#141512]/70 mb-6">
            Seu carrinho está vazio.
          </p>
          <Link
            to="/discos"
            className="inline-flex items-center justify-center font-['IBM_Plex_Mono'] uppercase tracking-[0.06em] text-xs font-semibold px-6 py-3 bg-[#C5F43B] text-[#141512] border-2 border-[#141512] hover:shadow-[3px_3px_0px_#141512] transition-all"
          >
            Explorar o catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Items */}
          <ul className="flex flex-col border-t-2 border-[#141512]">
            {cartItems.map(({ product, quantity }) => {
              const id = getProductId(product);
              const unitPrice = Number(product.price) || 0;
              return (
                <li
                  key={id}
                  className="flex gap-4 sm:gap-6 py-6 border-b border-[#141512]/30"
                >
                  <Link to={`/produto/${id}`} aria-label={`Ver detalhes de ${product.name}`}>
                    <CartThumb product={product} />
                  </Link>

                  <div className="flex flex-col sm:flex-row flex-grow justify-between gap-4 min-w-0">
                    <div className="min-w-0">
                      <Link to={`/produto/${id}`} className="block focus:outline-none">
                        <h2 className="font-['Inter'] text-lg sm:text-xl font-bold text-[#141512] leading-tight hover:underline underline-offset-4 decoration-2">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="font-['Inter'] text-sm text-[#71736D] mt-1">
                        <Link
                          to={getCreatorHref(product)}
                          className="font-medium text-[#141512]/80 hover:text-[#141512] hover:underline underline-offset-2"
                        >
                          {getCreatorName(product)}
                        </Link>
                      </p>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#141512]/70 mt-3">
                        {formatBRL(unitPrice)} / un.
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                      {/* Quantity stepper */}
                      <div
                        className="inline-flex items-center border-2 border-[#141512] bg-[#FFFFFF]"
                        role="group"
                        aria-label={`Quantidade de ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => onChangeQuantity && onChangeQuantity(id, quantity - 1)}
                          disabled={quantity <= 1}
                          aria-label="Diminuir quantidade"
                          className="w-9 h-9 font-['IBM_Plex_Mono'] text-base font-semibold text-[#141512] hover:bg-[#141512] hover:text-[#F4F2E9] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#141512] cursor-pointer"
                        >
                          −
                        </button>
                        <span
                          className="w-10 text-center font-['IBM_Plex_Mono'] text-sm font-semibold text-[#141512]"
                          aria-live="polite"
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity && onChangeQuantity(id, quantity + 1)}
                          disabled={quantity >= MAX_QUANTITY}
                          aria-label="Aumentar quantidade"
                          className="w-9 h-9 font-['IBM_Plex_Mono'] text-base font-semibold text-[#141512] hover:bg-[#C5F43B] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-['Anton'] text-2xl text-[#141512] tracking-wide">
                        {formatBRL(unitPrice * quantity)}
                      </span>

                      <button
                        type="button"
                        onClick={() => onRemoveItem && onRemoveItem(id)}
                        className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] underline underline-offset-4 hover:text-[#141512]/60 transition-colors cursor-pointer"
                        aria-label={`Remover ${product.name} do carrinho`}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Summary */}
          <aside
            aria-label="Resumo do carrinho"
            className="border-2 border-[#141512] bg-[#FFFFFF] p-6 lg:sticky lg:top-28"
          >
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-4">
              RESUMO
            </span>
            <div className="flex justify-between items-baseline font-['Inter'] text-sm text-[#141512]/80 mb-2">
              <span>
                {totalUnits} {totalUnits === 1 ? 'item' : 'itens'}
              </span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-4 mt-4 border-t-2 border-[#141512]">
              <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider">
                Total
              </span>
              <span className="font-['Anton'] text-3xl text-[#141512] tracking-wide">
                {formatBRL(subtotal)}
              </span>
            </div>
            {/* Visual only: no action is attached on purpose */}
            <Button variant="primary" size="lg" className="w-full mt-6">
              Prosseguir →
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}

