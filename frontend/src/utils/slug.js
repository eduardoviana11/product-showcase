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

