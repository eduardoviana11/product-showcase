/**
 * Generate a URL-friendly slug from any product name or explicit ID.
 */
export function slugifyProductName(text) {
  if (!text || typeof text !== 'string') return 'produto';
  return (
    text
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'produto'
  );
}

/**
 * Return the canonical route ID/slug for a product object.
 */
export function getProductId(product) {
  if (!product) return 'produto';
  if (product.id && String(product.id).trim()) {
    return String(product.id).trim();
  }
  return slugifyProductName(product.name);
}

/**
 * Return the display name of the creator (artist or store) for any product.
 */
export function getCreatorName(product) {
  if (!product) return 'Loja ZUNO';
  const artist = (product.artist || '').trim();
  if (artist && !artist.toLowerCase().includes('zuno')) {
    return artist;
  }
  const store = (product.store || '').trim();
  if (store) {
    return store;
  }
  const pickup = (product.pickup_location || '').trim();
  if (pickup && product.type !== 'vinyl') {
    return pickup;
  }
  return artist || 'Loja ZUNO';
}

/**
 * Return the URL slug for a product's creator/store.
 */
export function getCreatorSlug(product) {
  return slugifyProductName(getCreatorName(product));
}

/**
 * Return the route path for a product's creator/store page.
 */
export function getCreatorHref(product) {
  const isArtist = Boolean(
    product?.artist &&
      product.artist.trim() &&
      !product.artist.toLowerCase().includes('zuno')
  );
  const slug = getCreatorSlug(product);
  return isArtist ? `/artista/${slug}` : `/loja/${slug}`;
}
