export interface ZaloHandoff { copied: boolean; opened: boolean }

/** Call directly from a click/submit to retain clipboard and popup activation. */
export async function copyAndOpenZalo(message: string, url: string): Promise<ZaloHandoff> {
  if (!navigator.clipboard?.writeText) return { copied: false, opened: false };
  let copying: Promise<boolean>;
  try { copying = navigator.clipboard.writeText(message).then(() => true, () => false); }
  catch { return { copied: false, opened: false }; }
  let tab: Window | null = null;
  try { tab = window.open('about:blank', '_blank'); if (tab) tab.opener = null; } catch { /* The result keeps a normal Zalo link. */ }
  const copied = await copying;
  if (!copied) { try { tab?.close(); } catch {} return { copied: false, opened: false }; }
  if (tab) {
    try { tab.location.replace(url); return { copied: true, opened: true }; }
    catch { try { tab.close(); } catch {} }
  }
  return { copied: true, opened: false };
}
