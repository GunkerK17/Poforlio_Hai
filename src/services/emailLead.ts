import { leadMessage, packageOptions, type LeadData } from '../data/leadForm';

export const leadEmailRecipient = import.meta.env.VITE_LEAD_EMAIL?.trim() || 'chihai11102003@gmail.com';

export function leadEmailPayload(lead: LeadData, requestId?: string) {
  return {
    _subject: 'Yêu cầu tư vấn Internet FPT từ website của Hải',
    _template: 'table',
    _url: new URL(`${import.meta.env.BASE_URL}wifi/dang-ky/`, window.location.origin).href,
    name: lead.fullName,
    'Số điện thoại': lead.phone,
    'Khu vực cần lắp': lead.area,
    'Gói quan tâm': packageOptions.find(option => option.id === lead.packageInterest)?.label,
    'Nhu cầu': lead.usageNeeds.join(', ') || 'Cần Hải tư vấn',
    'Nhà / số lầu': lead.homeFloors || 'Chưa cung cấp',
    'Loại TV': lead.tvType || 'Chưa rõ loại TV',
    'TV kết nối Wi-Fi': lead.tvType === 'Không dùng TV' ? 'Không áp dụng' : lead.tvWifi || 'Chưa rõ',
    'Dự kiến lắp': lead.installationTime || 'Trao đổi thêm với Hải',
    'Ghi chú': lead.note || 'Không có',
    'Thời gian gửi': lead.createdAt,
    'Mã yêu cầu': requestId || '',
    message: leadMessage(lead),
  };
}

export async function submitEmailLead(lead: LeadData, signal: AbortSignal, requestId?: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(leadEmailRecipient)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(leadEmailPayload(lead, requestId)), credentials: 'omit', signal,
  });
  if (!response.ok) {
    throw new Error('Chưa gửi được yêu cầu. Anh/chị thử lại hoặc liên hệ Hải qua Zalo nhé.');
  }
  // The live AJAX endpoint returns JSON with text/html headers. Validate the
  // parsed payload instead of trusting its Content-Type; real HTML still fails.
  const result = await response.json().catch(() => null);
  // FormSubmit uses string booleans. Activation is a failed delivery, even on HTTP 200.
  if (/activat|confirm.*email/i.test(String(result?.message || ''))) {
    throw new Error('Kênh nhận yêu cầu đang chờ kích hoạt. Anh/chị liên hệ Hải qua Zalo hoặc gọi điện nhé.');
  }
  if (result?.success !== true && result?.success !== 'true') {
    throw new Error('Hệ thống chưa tiếp nhận yêu cầu. Anh/chị thử lại hoặc liên hệ Hải qua Zalo nhé.');
  }
}
