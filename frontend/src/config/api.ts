// Centralized API and Media URL configuration for seamless testing across
// Localhost, Same-WiFi Mobile Phones, and Production Cloud (Railway / Vercel).

const DEFAULT_PROD_API = 'https://cambodiastay-production.up.railway.app';
const RAW_API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? DEFAULT_PROD_API : '');
export const API_BASE_URL = RAW_API_URL || '/api';

// Base host for static uploads (strip trailing /api or slash)
const BACKEND_MEDIA_HOST = RAW_API_URL
  ? RAW_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '')
  : '';

/**
 * Normalizes any uploaded media URL (cover photo, gallery photos, videos, host avatars).
 * Converts absolute 'http://localhost:3000/uploads/...' or relative '/uploads/...'
 * into the appropriate production or local URL.
 */
export function normalizeMediaUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('localhost:3000/uploads/')) {
    const rel = trimmed.replace(/^https?:\/\/localhost:3000/, '');
    return BACKEND_MEDIA_HOST ? `${BACKEND_MEDIA_HOST}${rel}` : rel;
  }
  if (trimmed.startsWith('/uploads/')) {
    return BACKEND_MEDIA_HOST ? `${BACKEND_MEDIA_HOST}${trimmed}` : trimmed;
  }
  if (trimmed.startsWith('uploads/')) {
    return BACKEND_MEDIA_HOST ? `${BACKEND_MEDIA_HOST}/${trimmed}` : `/${trimmed}`;
  }
  return trimmed;
}
