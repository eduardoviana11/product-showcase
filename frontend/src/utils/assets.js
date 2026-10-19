/**
 * Resolve an image/media URL or filename to a valid web path.
 * - External URLs (http:// or https://) or data URLs are used as-is.
 * - Paths starting with "/" (e.g. "/images/disc.png" or "/api/media/disc.png") are used as-is.
 * - Bare filenames (e.g. "disc.png") automatically resolve to the backend media endpoint "/api/media/disc.png".
 */
export function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'placeholder.svg') return '';

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Bare filename -> point to backend media endpoint
  return `/api/media/${trimmed}`;
}
