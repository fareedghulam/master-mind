/**
 * Application Production URLs and Google Play Store Compliance Links
 * Based on the existing production Firebase project: "master-mind-qureshi-enterprise"
 * Configured in .firebaserc, src/lib/firebase.ts, and firebase.json
 */

export const PRODUCTION_FIREBASE_HOSTING_DOMAIN = 'https://master-mind-qureshi-enterprise.web.app';
export const ALT_FIREBASE_HOSTING_DOMAIN = 'https://master-mind-qureshi-enterprise.firebaseapp.com';

/**
 * Returns the canonical public URL for any hosted asset or page.
 * Respects VITE_PUBLIC_URL environment variable if configured,
 * otherwise defaults to the official Firebase Hosting production domain.
 */
export const getCanonicalPublicUrl = (path: string): string => {
  const envUrl = (import.meta as any).env?.VITE_PUBLIC_URL?.replace(/\/$/, '');
  const base = envUrl || PRODUCTION_FIREBASE_HOSTING_DOMAIN;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

export const PRIVACY_POLICY_URL = getCanonicalPublicUrl('/privacy-policy.html');
export const DELETE_ACCOUNT_URL = getCanonicalPublicUrl('/delete-account.html');
