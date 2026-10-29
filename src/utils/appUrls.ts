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

/**
 * Safely opens an external URL in the user's default web browser or system browser.
 * Works seamlessly across desktop web, mobile web, and Capacitor Android WebViews.
 * Ensures the app does NOT attempt to navigate to 'https://localhost/...' or trap users in a local webview.
 */
export const openExternalUrl = (url: string) => {
  if (typeof window === 'undefined') return;

  try {
    // In browser or Capacitor Android WebView, window.open with _blank and noopener
    // hands off external URLs to the system browser.
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.assign(url);
    }
  } catch (error) {
    console.warn('Falling back to direct window.location navigation for URL:', url, error);
    window.location.href = url;
  }
};
