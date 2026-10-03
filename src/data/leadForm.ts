import { Camera, MessageCircle, Tv, Wifi } from 'lucide-react';
export { leadPageTitle, leadPageDescription } from './leadPageMeta.mjs';

export const packageOptions = [
  { id: 'wifi', label: 'Internet / Wi-Fi', Icon: Wifi },
  { id: 'play', label: 'Internet + FPT Play', Icon: Tv },
  { id: 'camera', label: 'Internet + FPT Play + Camera', Icon: Camera },
  { id: 'advice', label: 'Chưa biết – Cần tư vấn', Icon: MessageCircle },
] as const;
export type PackageInterest = typeof packageOptions[number]['id'];
export const usageOptions = ['Wi-Fi gia đình', 'Học tập / Làm việc', 'Chơi game', 'Xem bóng đá', 'Xem phim', 'Truyền hình', 'Nhiều thiết bị', 'Camera'] as const;
export const installationOptions = ['Càng sớm càng tốt', 'Trong 1–3 ngày', 'Trong tuần này', 'Đang tham khảo'] as const;
export const homeOptions = ['Nhà trệt, không có lầu', 'Có 1 lầu', 'Có từ 2 lầu', 'Chưa rõ'] as const;
export const tvOptions = ['Smart TV', 'TV thường / đời cũ', 'Chưa rõ loại TV', 'Không dùng TV'] as const;
export const tvWifiOptions = ['Kết nối Wi-Fi được', 'Không kết nối Wi-Fi', 'Chưa rõ'] as const;
export interface LeadFormValues {
  fullName: string;
  phone: string;
  area: string;
  packageInterest: PackageInterest | '';
  usageNeeds: string[];
  installationTime: string;
  homeFloors: string;
  tvType: string;
  tvWifi: string;
  note: string;
}
export interface LeadData extends Omit<LeadFormValues, 'packageInterest'> {
  packageInterest: PackageInterest;
  createdAt: string;
  source: 'Website Form';
}
export type LeadErrors = Partial<Record<keyof LeadFormValues, string>>;
export const registrationUrl = (interest?: PackageInterest, camera?: 'camera-indoor' | 'camera-outdoor') => {
  const query = new URLSearchParams();
  if (interest) query.set('goi', interest);
  if (interest === 'camera' && camera) query.set('camera', camera);
  return `${import.meta.env.BASE_URL}wifi/dang-ky/${query.size ? `?${query}` : ''}`;
};
export function initialLeadValues(): LeadFormValues {
  const query = new URLSearchParams(window.location.search), selected = query.get('goi');
  const camera = selected === 'camera' ? ({ 'camera-indoor': 'Camera Play 4', 'camera-outdoor': 'Camera IQ 4S' } as Record<string, string>)[query.get('camera') ?? ''] : '';
  return { fullName: '', phone: '', area: '', packageInterest: packageOptions.some(option => option.id === selected) ? selected as PackageInterest : '', usageNeeds: [], installationTime: '', homeFloors: '', tvType: '', tvWifi: '', note: camera ? `Muốn nhận 01 ${camera}.` : '' };
}
export function normalizePhone(raw: string) {
  return raw.trim().replace(/[\s.()-]/g, '').replace(/^(?:\+84|0084)/, '0');
}
export function validateLead(values: LeadFormValues): LeadErrors {
  const errors: LeadErrors = {};
  const name = values.fullName.trim();
  if (name.length < 2) errors.fullName = 'Anh/chị nhập họ và tên nhé.';
  else if (name.length > 80 || /[^\p{L}\p{M}\s.'’\-]/u.test(name)) errors.fullName = 'Họ tên chỉ gồm chữ, tối đa 80 ký tự.';
  if (!/^0[35789]\d{8}$/.test(normalizePhone(values.phone))) errors.phone = 'Nhập số di động Việt Nam hợp lệ, ví dụ 0912 345 678.';
  if (values.area.trim().length < 3 || values.area.trim().length > 180) errors.area = 'Nhập phường/xã, quận/huyện cần lắp.';
  if (!packageOptions.some(option => option.id === values.packageInterest)) errors.packageInterest = 'Chọn một nhu cầu để Hải tư vấn nhé.';
  if (values.usageNeeds.some(need => !(usageOptions as readonly string[]).includes(need))) errors.usageNeeds = 'Vui lòng chọn nhu cầu trong danh sách.';
  if (values.installationTime && !(installationOptions as readonly string[]).includes(values.installationTime)) errors.installationTime = 'Vui lòng chọn thời gian trong danh sách.';
  if (values.homeFloors && !(homeOptions as readonly string[]).includes(values.homeFloors)) errors.homeFloors = 'Chọn kiểu nhà trong danh sách nhé.';
  if (values.tvType && !(tvOptions as readonly string[]).includes(values.tvType)) errors.tvType = 'Chọn loại TV trong danh sách nhé.';
  if (values.tvWifi && (!(tvWifiOptions as readonly string[]).includes(values.tvWifi) || values.tvType === 'Không dùng TV')) errors.tvWifi = 'Kiểm tra lại khả năng kết nối của TV nhé.';
  if (values.note.length > 600) errors.note = 'Ghi chú tối đa 600 ký tự.';
  return errors;
}
export function buildLead(values: LeadFormValues): LeadData {
  if (Object.keys(validateLead(values)).length) throw new Error('Thông tin chưa hợp lệ.');
  return { ...values, fullName: values.fullName.trim().replace(/\s+/g, ' '), phone: normalizePhone(values.phone), area: values.area.trim(), note: values.note.trim(), usageNeeds: [...values.usageNeeds], packageInterest: values.packageInterest as PackageInterest, createdAt: new Date().toISOString(), source: 'Website Form' };
}
export function leadMessage(lead: LeadData) {
  const interest = packageOptions.find(option => option.id === lead.packageInterest)?.label;
  return ['Hải ơi, mình muốn được tư vấn Internet FPT.', `Họ tên: ${lead.fullName}`, `Số điện thoại: ${lead.phone}`, `Khu vực cần lắp: ${lead.area}`, `Quan tâm: ${interest}`, `Nhu cầu: ${lead.usageNeeds.join(', ') || 'Cần Hải tư vấn'}`, `Nhà: ${lead.homeFloors || 'Chưa cung cấp'}`, `TV: ${lead.tvType || 'Chưa rõ loại TV'}`, `Kết nối TV: ${lead.tvType === 'Không dùng TV' ? 'Không áp dụng' : lead.tvWifi || 'Chưa rõ'}`, `Dự kiến lắp: ${lead.installationTime || 'Trao đổi thêm với Hải'}`, `Ghi chú: ${lead.note || 'Không có'}`, 'Nhờ Hải kiểm tra hạ tầng và tư vấn giúp mình.'].join('\n');
}
