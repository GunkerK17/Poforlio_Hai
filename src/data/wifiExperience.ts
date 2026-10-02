export const wifiStory = [
  { name: 'Kết nối', title: 'Internet FPT.', accent: 'Nhà mình kết nối.', description: 'Hải tư vấn Wi-Fi, FPT Play và camera tại Cần Thơ. Bắt đầu từ Internet cho việc học, làm việc và những phút thư giãn của cả nhà.', price: '195k', offer: 'Wi-Fi / tháng', device: 'router', sceneLabel: 'Router FPT', point: 0 },
  { name: 'Giải trí', title: 'Thêm FPT Play.', accent: 'Thêm niềm vui.', description: 'Kết hợp Internet và FPT Play để xem truyền hình, phim và chương trình cho gia đình. Hải tư vấn quyền xem theo gói và Box nếu bạn cần.', price: '220k', offer: 'Wi-Fi + FPT Play / tháng', device: 'play', sceneLabel: 'FPT Play & Wi-Fi', point: .52 },
  { name: 'An tâm', title: 'Một combo.', accent: 'Đủ cho cả nhà.', description: 'Wi-Fi + FPT Play + tặng 01 camera. Bạn chọn Camera Play 4 hoặc Camera IQ 4S theo không gian cần quan sát.', price: '230k', offer: 'Combo 3 trong 1 / tháng', device: 'ecosystem', sceneLabel: 'Kết nối · Giải trí · An tâm', point: 1 },
] as const;
export const fptCanTho = {
  name: 'FPT Telecom Ninh Kiều', city: 'Cần Thơ', address: '10 Phan Văn Trị, phường Ninh Kiều, TP. Cần Thơ',
  source: 'https://fpt.vn/vi/khach-hang-ca-nhan/ho-tro/lien-he-24-7/diem-giao-dich',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=FPT+Telecom+10+Phan+Van+Tri+Ninh+Kieu+Can+Tho',
  embedUrl: 'https://maps.google.com/maps?q=FPT%20Telecom%2010%20Phan%20V%C4%83n%20Tr%E1%BB%8B%20Ninh%20Ki%E1%BB%81u%20C%E1%BA%A7n%20Th%C6%A1&z=16&output=embed',
};
export type CameraChoice = 'camera-indoor' | 'camera-outdoor';
