import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const snapshot = () => window.matchMedia(query).matches;
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};

/** Also updates while the page is open when the device preference changes. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
