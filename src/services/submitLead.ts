import type { LeadData } from '../data/leadForm';
import { submitEmailLead } from './emailLead';

export type LeadSubmission = { mode: 'api' | 'sheets' | 'demo' | 'zalo' | 'email' };
const sheetsUrl = import.meta.env.VITE_LEAD_GOOGLE_SCRIPT_URL?.trim();
const delivery = import.meta.env.VITE_LEAD_DELIVERY || 'email';
export const leadDeliveryMode = delivery === 'sheets' && sheetsUrl ? 'sheets' : delivery === 'api' && import.meta.env.VITE_LEAD_API_URL ? 'api' : delivery === 'demo' ? 'demo' : delivery === 'zalo' ? 'zalo' : 'email';

export function createLeadRequestId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Configure VITE_LEAD_API_URL for a POST JSON endpoint. Never put a private API key in Vite env. */
export async function submitLead(data: LeadData, signal?: AbortSignal, requestId?: string): Promise<LeadSubmission> {
  if (leadDeliveryMode === 'demo') {
    await new Promise<void>((resolve, reject) => {
      if (signal?.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
      const cancel = () => { clearTimeout(timer); signal?.removeEventListener('abort', cancel); reject(new DOMException('Aborted', 'AbortError')); };
      const timer = setTimeout(() => { signal?.removeEventListener('abort', cancel); resolve(); }, 650);
      signal?.addEventListener('abort', cancel, { once: true });
    });
    return { mode: 'demo' };
  }
  // A static site cannot deliver a lead alone: prepare an explicit Zalo handoff.
  if (leadDeliveryMode === 'zalo') return { mode: 'zalo' };
  const controller = new AbortController();
  const cancel = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', cancel, { once: true });
  const timeout = setTimeout(cancel, leadDeliveryMode === 'sheets' || leadDeliveryMode === 'email' ? 25000 : 12000);
  try {
    if (leadDeliveryMode === 'email') {
      await submitEmailLead(data, controller.signal, requestId);
      return { mode: 'email' };
    }
    // Apps Script accepts text/plain JSON without a browser preflight. Read the
    // redirected JSON response; never treat an opaque no-cors response as saved.
    const isSheets = leadDeliveryMode === 'sheets';
    const response = await fetch(isSheets ? sheetsUrl : import.meta.env.VITE_LEAD_API_URL, { method: 'POST', headers: { 'Content-Type': isSheets ? 'text/plain;charset=utf-8' : 'application/json' }, body: JSON.stringify(isSheets ? { ...data, requestId } : data), signal: controller.signal, redirect: 'follow', credentials: 'omit' });
    if (!response.ok) throw new Error('Hệ thống chưa nhận được yêu cầu. Anh/chị thử lại hoặc liên hệ Zalo nhé.');
    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Hệ thống chưa xác nhận nhận thông tin. Anh/chị thử lại hoặc liên hệ Hải nhé.');
    const result = await response.json();
    if (result?.success !== true) throw new Error('Yêu cầu chưa được tiếp nhận. Anh/chị thử lại nhé.');
    return { mode: leadDeliveryMode === 'sheets' ? 'sheets' : 'api' };
  } catch (error) {
    if (signal?.aborted) throw error;
    if (controller.signal.aborted) throw new Error('Gửi hơi lâu. Anh/chị thử lại hoặc nhắn Hải qua Zalo nhé.');
    if (error instanceof TypeError) throw new Error('Chưa kết nối được. Kiểm tra mạng rồi thử lại nhé.');
    throw error;
  } finally { clearTimeout(timeout); signal?.removeEventListener('abort', cancel); }
}
