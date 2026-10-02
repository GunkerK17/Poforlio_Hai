import { Camera, Tv, Wifi } from 'lucide-react';

// Monthly prices supplied by Hải. Shared by the portfolio and Wi-Fi page.
export const wifiPlans = [
  { id: 'wifi', name: 'Wi-Fi', price: 195, Icon: Wifi, label: 'KẾT NỐI MỖI NGÀY', features: ['Internet / Wi-Fi', 'Học tập, làm việc, giải trí', 'Tư vấn theo không gian nhà'] },
  { id: 'play', name: 'Wi-Fi + FPT Play', price: 220, Icon: Tv, label: 'THÊM GIẢI TRÍ', features: ['Internet / Wi-Fi', 'Thêm truyền hình FPT Play', 'Box được tư vấn riêng nếu cần'] },
  { id: 'camera', name: 'Wi-Fi + FPT Play + Cam', price: 230, Icon: Camera, label: 'KẾT NỐI · GIẢI TRÍ · AN TÂM', features: ['Internet / Wi-Fi + FPT Play', 'Tặng 01 camera — chọn 1 trong 2 mẫu', 'Camera Play 4 hoặc Camera IQ 4S'] },
] as const;
