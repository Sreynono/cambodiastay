// Centralized API and Media URL configuration for seamless testing across
// Localhost, Same-WiFi Mobile Phones, and Public Internet Tunnels (Cloudflare / ngrok).

export const API_BASE_URL = '/api';

/**
 * Normalizes any uploaded media URL (cover photo, gallery photos, videos, host avatars).
 * Converts absolute 'http://localhost:3000/uploads/...' into relative '/uploads/...'
 * so that Vite proxy routes it properly on any device without Mixed-Content or CORS issues.
 */
export function normalizeMediaUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('localhost:3000/uploads/')) {
    return trimmed.replace(/^https?:\/\/localhost:3000/, '');
  }
  if (trimmed.startsWith('/uploads/')) {
    return trimmed;
  }
  if (trimmed.startsWith('uploads/')) {
    return `/${trimmed}`;
  }
  return trimmed;
}
